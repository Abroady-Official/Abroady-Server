import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { rm } from 'src/common/constants';
import { PrismaService } from '../prisma/prisma.service';
import { PostGetCategoryParamDTO } from './dto/posts-get-category.params.dto';
import { PostPostReqDTO } from './dto/posts-post.req.dto';
import { PostPutParamDTO } from './dto/posts-put.params.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  //* 전체 게시글 조회
  async getPosts() {
    const posts = await this.prisma.post.findMany();
    return posts;
  }

  //* 카테고리별 게시글 조회
  async getPostsByCategoryId(param: PostGetCategoryParamDTO) {
    const category = await this.findCategoryById(param.categoryId);
    const posts = await this.prisma.post.findMany({
      where: {
        categoryId: category.id,
      },
    });
    return posts;
  }

  //* 게시글 추가
  async createPost(userId: number, dto: PostPostReqDTO) {
    await this.checkCategoryPublic(dto.categoryId, dto.isAnonymous);
    await this.prisma.post.create({
      data: {
        userId: userId,
        categoryId: dto.categoryId,
        title: dto.title,
        content: dto.content,
        isAnonymous: dto.isAnonymous,
      },
    });
  }

  //* 게시글 수정
  async updatePost(userId: number, param: PostPutParamDTO, dto: PostPostReqDTO) {
    await this.checkPostWriter(userId, param.postId);
    await this.checkCategoryPublic(dto.categoryId, dto.isAnonymous);
    await this.prisma.post.update({
      where: {
        id: param.postId,
      },
      data: {
        categoryId: dto.categoryId,
        title: dto.title,
        content: dto.content,
        isAnonymous: dto.isAnonymous,
      },
    });
  }

  //* 게시글 삭제
  async deletePost(userId: number, param: PostPutParamDTO) {
    await this.checkPostWriter(userId, param.postId);
    await this.prisma.post.deleteMany({
      where: {
        id: param.postId,
      },
    });
  }

  //^ 존재하는 카테고리인지 확인
  private async findCategoryById(categoryId: number) {
    const category = await this.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (category === null) {
      throw new NotFoundException(rm.NOT_FOUND_CATEGORY);
    }

    return category;
  }

  //^ 글 수정, 삭제 권한 확인
  private async checkPostWriter(userId: number, postId: number) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (post === null) {
      throw new NotFoundException(rm.NOT_FOUND_POST);
    }

    if (post.userId !== userId) {
      throw new ForbiddenException(rm.NO_ACCESS_POST);
    }
  }

  //^ 익명이 가능한 카테고리인지 확인
  private async checkCategoryPublic(categoryId: number, isAnonymous: boolean) {
    const category = await this.findCategoryById(categoryId);

    if (category.isPublic && isAnonymous === true) {
      throw new ForbiddenException(rm.NO_ACCESS_ANONYMOUS);
    }
  }
}

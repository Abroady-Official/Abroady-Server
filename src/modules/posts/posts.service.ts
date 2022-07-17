import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
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

  async createPost(dto: PostPostReqDTO) {
    await this.prisma.post.create({
      data: {
        userId: dto.userId,
        categoryId: dto.categoryId,
        title: dto.title,
        content: dto.content,
        isAnonymous: dto.isAnonymous,
        image: dto.image,
      },
    });
  }

  async updatePost(param: PostPutParamDTO, dto: PostPostReqDTO) {
    await this.prisma.post.update({
      where: {
        id: param.postId,
      },
      data: {
        userId: dto.userId,
        categoryId: dto.categoryId,
        title: dto.title,
        content: dto.content,
        isAnonymous: dto.isAnonymous,
        image: dto.image,
      },
    });
  }

  async deletePost(param: PostPutParamDTO) {
    await this.prisma.post.deleteMany({
      where: {
        id: param.postId,
      },
    });
  }
}

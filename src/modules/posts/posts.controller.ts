import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { rm } from 'src/common/constants';
import { ResponseEntity } from 'src/common/constants/responseEntity';
import { PostGetCategoryParamDTO } from './dto/posts-get-category.params.dto';
import { PostGetParamDTO } from './dto/posts-get.params.dto';
import { PostPostReqDTO } from './dto/posts-post.req.dto';
import { PostPutParamDTO } from './dto/posts-put.params.dto';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  //^ 해당 api 필요한 뷰 없음 (확인용)
  //* 전체 게시글 조회
  @Get()
  @ApiOperation({
    summary: '전체 게시글 조회',
    description: ``,
  })
  async getPosts() {
    const posts = await this.postsService.getPosts();
    return ResponseEntity.OK_WITH_DATA('', posts);
  }

  //TODO 뷰 나오면 response dto 수정
  //* 상세 게시글 조회
  @Get('/:postId')
  @ApiOperation({
    summary: '상세 게시글 조회',
    description: ``,
  })
  async getPostByPostId(@Param() param: PostGetParamDTO) {
    const post = await this.postsService.getPostByPostId(param);
    return ResponseEntity.OK_WITH_DATA(rm.READ_POST_SUCCESS, post);
  }

  //TODO 이미지 추가 후 response dto 수정
  //* 카테고리별 게시글 조회
  @Get('/category/:categoryId')
  @ApiOperation({
    summary: '카테고리별 게시글 조회',
    description: ``,
  })
  async getPostsByCategoryId(@Param() param: PostGetCategoryParamDTO) {
    const posts = await this.postsService.getPostsByCategoryId(param);
    return ResponseEntity.OK_WITH_DATA(rm.READ_CATEGORY_POST_SUCCESS, posts);
  }

  //TODO 이미지 최대 5개 파일 추가
  //* 게시글 추가
  @Post()
  @ApiOperation({
    summary: '게시글 추가',
    description: ``,
  })
  async createPost(@Body() dto: PostPostReqDTO): Promise<any> {
    //TODO @Token으로 변경
    const userId = 2;
    const post = await this.postsService.createPost(userId, dto);
    return ResponseEntity.OK_WITH_DATA(rm.CREATE_POST_SUCCESS, post);
  }

  //* 게시글 수정
  @Put('/:postId')
  @ApiOperation({
    summary: '게시글 수정',
    description: ``,
  })
  async updatePost(@Param() param: PostPutParamDTO, @Body() dto: PostPostReqDTO): Promise<any> {
    //TODO @Token으로 변경
    const userId = 2;
    const post = await this.postsService.updatePost(userId, param, dto);
    return ResponseEntity.OK_WITH_DATA(rm.UPDATE_POST_SUCCESS, post);
  }

  //* 게시글 삭제
  @Delete('/:postId')
  @ApiOperation({
    summary: '게시글 삭제',
    description: ``,
  })
  async deletePost(@Param() param: PostPutParamDTO): Promise<any> {
    //TODO @Token으로 변경
    const userId = 2;
    const post = await this.postsService.deletePost(userId, param);
    return ResponseEntity.OK_WITH_DATA(rm.DELETE_POST_SUCCESS, post);
  }
}

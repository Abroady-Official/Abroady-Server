import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from 'src/common/constants/responseEntity';
import { PostPostReqDTO } from './dto/posts-post.req.dto';
import { PostPutParamDTO } from './dto/posts-put.params.dto';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

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

  //* 게시글 추가
  @Post()
  @ApiOperation({
    summary: '게시글 추가',
    description: ``,
  })
  async createPost(@Body() dto: PostPostReqDTO): Promise<any> {
    const post = await this.postsService.createPost(dto);
    return ResponseEntity.OK_WITH_DATA('', post);
  }

  //* 게시글 수정
  @Put('/:postId')
  @ApiOperation({
    summary: '게시글 수정',
    description: ``,
  })
  async updatePost(@Param() param: PostPutParamDTO, @Body() dto: PostPostReqDTO): Promise<any> {
    const post = await this.postsService.updatePost(param, dto);
    return ResponseEntity.OK_WITH_DATA('', post);
  }

  //* 게시글 삭제
  @Delete('/:postId')
  @ApiOperation({
    summary: '게시글 삭제',
    description: ``,
  })
  async deletePost(@Param() param: PostPutParamDTO): Promise<any> {
    const post = await this.postsService.deletePost(param);
    return ResponseEntity.OK_WITH_DATA('', post);
  }
}
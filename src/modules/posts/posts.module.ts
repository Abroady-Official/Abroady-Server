import { Module } from '@nestjs/common';

import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [],
  providers: [PostsService],
  exports: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}

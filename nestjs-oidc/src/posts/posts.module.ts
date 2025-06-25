import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';

@Module({
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}

import { Injectable } from '@nestjs/common';
import { Post } from './models/post.model';

@Injectable()
export class PostsService {
  findAll(filter: { authorId: number }): Post[] {
    return [
      {
        id: filter.authorId * 10,
        title: 'foo',
      },
      {
        id: filter.authorId * 10 + 1,
        title: 'bar',
      },
    ];
  }
}

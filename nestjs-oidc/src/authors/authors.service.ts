import { Injectable } from '@nestjs/common';
import { Author } from './models/author.model';
import { Field, InputType } from '@nestjs/graphql';

@Injectable()
export class AuthorsService {
  findOneById(id: number): Author {
    return {
      id: id,
      firstName: 'foo',
      lastName: 'bar',
      posts: [],
    };
  }
}

@InputType()
export class UpvotePostInput {
  @Field()
  postId: number;
}

import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/posts/models/post.model';

@ObjectType()
export class Author {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field((type) => [Post], { nullable: 'items' }) // 'itemsAndList'
  posts: Post[];
}

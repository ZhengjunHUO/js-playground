import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field((type) => Int)
  id: number;

  // @Field({ description: `Book title`, deprecationReason: 'Not useful in v2 schema' })
  @Field()
  title: string;

  @Field((type) => Int, { nullable: true })
  votes?: number;
}

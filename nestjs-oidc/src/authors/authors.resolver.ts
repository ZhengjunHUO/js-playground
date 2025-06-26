import {
  Args,
  Field,
  InputType,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Author } from './models/author.model';
import { AuthorsService, UpvotePostInput } from './authors.service';
import { PostsService } from 'src/posts/posts.service';
import { Post } from 'src/posts/models/post.model';

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorsService,
    private postsService: PostsService,
  ) {}

  @Query(() => Author, { name: 'author' })
  async getAuthor(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.findOneById(id);
  }

  @ResolveField('posts', () => [Post])
  async getPosts(@Parent() author: Author) {
    const { id } = author;
    return this.postsService.findAll({ authorId: id });
  }

  @Mutation(() => Post)
  // async upvotePost(@Args({ name: 'postId', type: () => Int }) postId: number) {
  async upvotePost(@Args('upvotePostData') upvotePostData: UpvotePostInput) {
    return this.postsService.upvoteById({ id: upvotePostData.postId });
  }
}

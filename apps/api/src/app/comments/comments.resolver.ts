import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Post } from '../posts/post';
import { PostsService } from '../posts/posts.service';
import { User } from '../users/user';
import { UsersService } from '../users/users.service';
import { Comment } from './comment';
import { CommentsService } from './comments.service';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(
    private commentsService: CommentsService,
    private postService: PostsService,
    private userService: UsersService
  ) {}

  @Query(() => [Comment])
  async comments(): Promise<Comment[]> {
    return await this.commentsService.findMany();
  }

  @ResolveField()
  async author(@Parent() { authorId }: Comment): Promise<User> {
    return await this.userService.findOne({ where: { id: authorId } });
  }

  @ResolveField()
  async post(@Parent() { postId }: Comment): Promise<Post> {
    return await this.postService.findOne({ where: { id: postId } });
  }
}

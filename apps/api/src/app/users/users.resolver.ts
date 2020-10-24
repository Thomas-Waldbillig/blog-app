import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import * as DataLoader from 'dataloader';
import { Comment } from '../comments/comment';
import { CommentsService } from '../comments/comments.service';
import { Post } from '../posts/post';
import { PostsService } from '../posts/posts.service';
import { User } from './user';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private commentsService: CommentsService,
    private postService: PostsService,
    private userService: UsersService
  ) {}

  @Query(() => [User])
  async users() {
    return this.userService.findMany();
  }

  @ResolveField()
  async posts(@Parent() { id }: User): Promise<Post[]> {
    return await this.userPostsLoader.load(id);
  }

  @ResolveField()
  async comments(@Parent() { id }: User): Promise<Comment[]> {
    return await this.userCommentsLoader.load(id);
  }

  private userPostsLoader = new DataLoader(
    async (usersIds: string[]): Promise<Post[][]> => {
      const posts = await this.postService.findMany({
        where: { authorId: { in: usersIds } },
      });
      return usersIds.map((id) =>
        posts.filter(({ authorId }) => authorId === id)
      );
    }
  );

  private userCommentsLoader = new DataLoader(
    async (usersIds: string[]): Promise<Comment[][]> => {
      const comments = await this.commentsService.findMany({
        where: { authorId: { in: usersIds } },
      });
      return usersIds.map((id) =>
        comments.filter(({ authorId }) => authorId === id)
      );
    }
  );
}

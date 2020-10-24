import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import * as DataLoader from 'dataloader';
import { Post } from '../posts/post';
import { PostsService } from '../posts/posts.service';
import { User } from './user';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
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
}

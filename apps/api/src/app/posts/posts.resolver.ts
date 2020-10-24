import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from '../users/user';
import { UsersService } from '../users/users.service';
import { Post } from './post';
import { PostsService } from './posts.service';

@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private userService: UsersService,
    private postService: PostsService
  ) {}

  @Query(() => [Post])
  async posts() {
    return await this.postService.findMany();
  }

  @ResolveField('author')
  async author(@Parent() { authorId }: Post): Promise<User> {
    return await this.userService.findOne({ where: { id: authorId } });
  }
}

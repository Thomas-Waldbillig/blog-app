import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import * as DataLoader from 'dataloader';
import { Comment } from '../comments/comment';
import { CommentsService } from '../comments/comments.service';
import { User } from '../users/user';
import { UsersService } from '../users/users.service';
import { FindManyPostsDto } from './dto/find-many-posts.dto';
import { FindOnePostDto } from './dto/find-one-post.dto';
import { Post } from './post';
import { PostsService } from './posts.service';

@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private commentsService: CommentsService,
    private postService: PostsService,
    private userService: UsersService
  ) {}

  @Query(() => Post)
  async post(@Args() args: FindOnePostDto) {
    return await this.postService.findOne({ where: { id: args.id } });
  }

  @Query(() => [Post])
  async posts(@Args() args: FindManyPostsDto) {
    return await this.postService.findMany({
      orderBy: { [args.sortBy]: args.sortDirection },
      take: args.take,
      skip: args.skip,
      cursor: args.cursor ? { id: args.cursor } : undefined,
    });
  }

  @ResolveField()
  async author(@Parent() { authorId }: Post): Promise<User> {
    return await this.userService.findOne({ where: { id: authorId } });
  }

  @ResolveField()
  async comments(@Parent() { id }: User): Promise<Comment[]> {
    return await this.postCommentsLoader.load(id);
  }

  private postCommentsLoader = new DataLoader(
    async (postIds: string[]): Promise<Comment[][]> => {
      const comments = await this.commentsService.findMany({
        where: { postId: { in: postIds } },
      });
      return postIds.map((id) =>
        comments.filter(({ postId }) => postId === id)
      );
    }
  );
}

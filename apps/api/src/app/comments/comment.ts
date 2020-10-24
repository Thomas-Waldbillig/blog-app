import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from '../posts/post';
import { User } from '../users/user';

@ObjectType()
export class Comment {
  @Field(() => String)
  id: string;

  @Field(() => String)
  content: string;

  @Field(() => User)
  author?: User;

  @Field(() => String)
  authorId: string;

  @Field(() => Post)
  post?: Post;

  @Field(() => String)
  postId: string;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}

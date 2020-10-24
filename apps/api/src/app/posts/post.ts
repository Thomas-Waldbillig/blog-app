import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../users/user';

@ObjectType()
export class Post {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => String)
  slug: string;

  @Field(() => Date)
  publishedAt: Date;

  @Field(() => User)
  author?: User;

  @Field(() => String)
  authorId: string;

  // @Field(() => String)
  // comments    Comment[]

  // @Field(() => String)
  // categories  Category[]

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostDao {
  @Field(() => String)
  authorId: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => String)
  slug: string;

  @Field(() => String, { nullable: true })
  publishedAt: Date;
}

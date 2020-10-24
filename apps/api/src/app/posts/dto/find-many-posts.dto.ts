import { ArgsType, Field, Int, registerEnumType } from '@nestjs/graphql';

export enum SortOder {
  asc = 'asc',
  desc = 'desc',
}

export enum PostOrderField {
  title = 'title',
  createdAt = 'createdAt',
  publishedAt = 'publishedAt',
  updatedAt = 'updatedAt',
}

registerEnumType(SortOder, { name: 'SortOder' });
registerEnumType(PostOrderField, { name: 'PostOrderField' });

@ArgsType()
export class FindManyPostsDto {
  @Field(() => PostOrderField, { nullable: true })
  sortBy?: PostOrderField;

  @Field(() => SortOder, { nullable: true })
  sortDirection?: SortOder;

  @Field(() => Int, { defaultValue: 0 })
  skip?: number;

  @Field(() => Int, { defaultValue: 25 })
  take?: number;

  @Field(() => String, { nullable: true })
  cursor?: string;
}

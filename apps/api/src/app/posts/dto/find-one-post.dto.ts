import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FindOnePostDto {
  @Field()
  id: string;
}

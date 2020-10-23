import { GqlModuleOptions } from '@nestjs/graphql';
import { join } from 'path';

export const graphqlOptions: GqlModuleOptions = {
  debug: true,
  playground: true,
  autoSchemaFile: join(process.cwd(), 'apps/qpi/schema.gql'),
  sortSchema: true,
};

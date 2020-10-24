import { GqlModuleOptions } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { join } from 'path';

export const graphqlOptions: GqlModuleOptions = {
  autoSchemaFile: join(process.cwd(), 'apps/api/schema.gql'),
  debug: true,
  installSubscriptionHandlers: true,
  playground: true,
  context: { pubSub: new PubSub() },
};

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { graphqlOptions } from './graphql-options';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [GraphQLModule.forRoot(graphqlOptions), PostsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

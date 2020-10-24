import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { CommentsModule } from './comments/comments.module';
import { graphqlOptions } from './graphql-options';
import { PostsModule } from './posts/posts.module';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot(graphqlOptions),
    CommentsModule,
    PostsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}

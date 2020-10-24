import { Module } from '@nestjs/common';
import { CommentsService } from '../comments/comments.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

@Module({
  providers: [
    PostsResolver,

    CommentsService,
    PostsService,
    PrismaService,
    UsersService,
  ],
})
export class PostsModule {}

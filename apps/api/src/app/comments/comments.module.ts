import { Module } from '@nestjs/common';
import { PostsService } from '../posts/posts.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';

@Module({
  providers: [
    CommentsResolver,

    CommentsService,
    PostsService,
    PrismaService,
    UsersService,
  ],
})
export class CommentsModule {}

import { Module } from '@nestjs/common';
import { PostsService } from '../posts/posts.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  providers: [PostsService, PrismaService, UsersResolver, UsersService],
})
export class UsersModule {}

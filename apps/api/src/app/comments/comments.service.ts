import { Injectable } from '@nestjs/common';
import {
  Comment as RawComment,
  FindManyCommentArgs,
  FindOneCommentArgs,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Comment } from './comment';

@Injectable()
export class CommentsService {
  constructor(private prismaService: PrismaService) {}

  async findOne(args?: FindOneCommentArgs): Promise<Comment> {
    const data = await this.prismaService.comment.findOne(args);
    return this.parse(data);
  }

  async findMany(args?: FindManyCommentArgs): Promise<Comment[]> {
    const data = await this.prismaService.comment.findMany(args);
    return data.map((datum) => this.parse(datum));
  }

  private parse(datum: RawComment): Comment {
    return {
      id: datum.id,
      content: datum.content,
      authorId: datum.authorId,
      postId: datum.postId,
      createdAt: datum.createdAt,
      updatedAt: datum.updatedAt,
    };
  }
}

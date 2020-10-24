import { Injectable } from '@nestjs/common';
import {
  FindManyPostArgs,
  FindOnePostArgs,
  Post as RawPost,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Post } from './post';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}

  async findOne(args?: FindOnePostArgs): Promise<Post> {
    const data = await this.prismaService.post.findOne(args);
    return this.parse(data);
  }

  async findMany(args?: FindManyPostArgs): Promise<Post[]> {
    const data = await this.prismaService.post.findMany(args);
    return data.map((datum) => this.parse(datum));
  }

  private parse(datum: RawPost): Post {
    return {
      id: datum.id,
      title: datum.title,
      content: datum.content,
      slug: datum.slug,
      publishedAt: datum.publishedAt,
      createdAt: datum.createdAt,
      updatedAt: datum.updatedAt,
      authorId: datum.authorId,
    };
  }
}

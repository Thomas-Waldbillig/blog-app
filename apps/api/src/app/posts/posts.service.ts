import { Injectable } from '@nestjs/common';
import { FindManyPostArgs, Post as RawPost } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Post } from './post';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}

  async findMany(args?: FindManyPostArgs): Promise<Post[]> {
    const posts = await this.prismaService.post.findMany(args);
    return posts.map((rawPost) => this.parse(rawPost));
  }

  private parse(rawPost: RawPost): Post {
    return {
      id: rawPost.id,
      title: rawPost.title,
      content: rawPost.content,
      slug: rawPost.slug,
      publishedAt: rawPost.publishedAt,
      createdAt: rawPost.createdAt,
      updatedAt: rawPost.updatedAt,
      authorId: rawPost.authorId,
    };
  }
}

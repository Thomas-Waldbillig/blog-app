import { Injectable } from '@nestjs/common';
import {
  FindManyPostArgs,
  FindOnePostArgs,
  Post as RawPost,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDao } from './dao/create-post.dao';
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

  async create(createPostDao: CreatePostDao): Promise<Post> {
    return await this.prismaService.post.create({
      data: {
        author: { connect: { id: createPostDao.authorId } },
        title: createPostDao.title,
        content: createPostDao.content,
        slug: createPostDao.slug,
        publishedAt: createPostDao.publishedAt,
      },
    });
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

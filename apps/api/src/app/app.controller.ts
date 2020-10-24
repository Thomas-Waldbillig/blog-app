import { Controller, Get } from '@nestjs/common';
import { Comment, Post, User } from '@prisma/client';
import * as faker from 'faker';
import { date, internet, lorem, name, random } from 'faker';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async seed() {
    await this.prismaService.comment.deleteMany({});
    await this.prismaService.post.deleteMany({});
    await this.prismaService.user.deleteMany({});

    faker.seed(42);

    const users = await Promise.all(
      [...Array(10)].map(() => this.createUser())
    );

    const posts = await Promise.all(
      [...Array(100)].map(() => this.createPost(users))
    );

    const comments = await Promise.all(
      [...Array(250)].map(() => this.createComment(users, posts))
    );

    return { users, posts, comments };
  }

  private async createUser(): Promise<User> {
    const firstName = name.firstName();
    const lastName = name.lastName();

    return await this.prismaService.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        userName: internet.userName(firstName, lastName),
        email: internet.email(firstName, lastName),
        passwordHash: internet.password(),
      },
    });
  }

  private async createPost(users: User[]): Promise<Post> {
    const user = users[random.number(users.length - 1)];
    return await this.prismaService.post.create({
      data: {
        content: lorem.paragraphs(),
        publishedAt: date.recent(),
        slug: lorem.slug(),
        title: lorem.sentence(),
        author: { connect: { id: user.id } },
      },
    });
  }

  private async createComment(users: User[], posts: Post[]): Promise<Comment> {
    const user = users[random.number(users.length - 1)];
    const post = posts[random.number(posts.length - 1)];
    return await this.prismaService.comment.create({
      data: {
        author: { connect: { id: user.id } },
        content: lorem.sentence(),
        post: { connect: { id: post.id } },
      },
    });
  }
}

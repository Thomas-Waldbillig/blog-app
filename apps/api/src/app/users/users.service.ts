import { Injectable } from '@nestjs/common';
import {
  FindManyUserArgs,
  FindOneUserArgs,
  User as RawUser,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './user';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findOne(args: FindOneUserArgs): Promise<User> {
    return this.parse(await this.prismaService.user.findOne(args));
  }

  async findMany(args?: FindManyUserArgs): Promise<User[]> {
    const users = await this.prismaService.user.findMany(args);
    return users.map((rawUser) => this.parse(rawUser));
  }

  private parse(rawUser: RawUser): User {
    return {
      id: rawUser.id,
      firstName: rawUser.firstName,
      lastName: rawUser.lastName,
      email: rawUser.email,
      userName: rawUser.userName,
      passwordHash: rawUser.passwordHash,
      createdAt: rawUser.createdAt,
      updatedAt: rawUser.updatedAt,
    };
  }
}

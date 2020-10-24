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
    const data = await this.prismaService.user.findOne(args);
    return this.parse(data);
  }

  async findMany(args?: FindManyUserArgs): Promise<User[]> {
    const data = await this.prismaService.user.findMany(args);
    return data.map((datum) => this.parse(datum));
  }

  private parse(datum: RawUser): User {
    return {
      id: datum.id,
      firstName: datum.firstName,
      lastName: datum.lastName,
      email: datum.email,
      userName: datum.userName,
      passwordHash: datum.passwordHash,
      createdAt: datum.createdAt,
      updatedAt: datum.updatedAt,
    };
  }
}

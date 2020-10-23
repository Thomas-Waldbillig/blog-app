import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { graphqlOptions } from './graphql-options';

@Module({
  imports: [GraphQLModule.forRoot(graphqlOptions)],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

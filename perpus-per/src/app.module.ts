import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from './providers/queue/rabbbitmq/rmq.module';
import { MongoDbModule } from './providers/database/mongodb/mongo.module';
import { MongooseModule } from '@nestjs/mongoose';

import { APP_FILTER } from '@nestjs/core';
import { ExceptionFilter } from './common/filter/rpc-exeption.filter';
import { SeedService } from './seeds/seed.seevice';
import configs from './common/configs';
import { Member, MemberSchema } from './member/schema/member.schema';
import { Book, BookSchema } from './books/schema/books.schema';
import { MemberController } from './member/member.controller';
import { BookController } from './books/book.controller';
import { MemberService } from './member/member.service';
import { BookService } from './books/book.service';
import { TransactionController } from './transaction/transaction.controller';
import { TransactionService } from './transaction/transaction.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configs,
      ignoreEnvFile: false,
      isGlobal: true,
      cache: true,
      envFilePath: ['env/.env'],
    }),
    MongooseModule.forFeature([
      {
        name: Member.name,
        schema: MemberSchema,
      },
      {
        name: Book.name,
        schema: BookSchema,
      },
    ]),
    RmqModule,
    MongoDbModule,
    AppModule,
  ],
  controllers: [MemberController, BookController, TransactionController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
    MemberService,
    BookService,
    TransactionService,
    SeedService,
  ],
})
export class AppModule {}

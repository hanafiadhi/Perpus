import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Configs from 'src/common/configs/index';
import { RmqModule } from './providers/queue/rabbitmq/rmq.module';
import { MemberModule } from './member/member.module';
import { BookModule } from './book/book.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      load: Configs,
      ignoreEnvFile: false,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
    }),
    RmqModule,
    MemberModule,
    BookModule,
    TransactionModule,
  ],
})
export class AppModule {}

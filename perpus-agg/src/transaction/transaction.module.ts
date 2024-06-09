import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { RmqModule } from '../providers/queue/rabbitmq/rmq.module';
import { PERPUS_SERVICE } from '../common/constants/services';

@Module({
  imports: [RmqModule.register({ name: PERPUS_SERVICE })],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}

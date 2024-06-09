import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { RmqModule } from 'src/providers/queue/rabbitmq/rmq.module';
import { PERPUS_SERVICE } from 'src/common/constants/services';

@Module({
  imports: [RmqModule.register({ name: PERPUS_SERVICE })],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}

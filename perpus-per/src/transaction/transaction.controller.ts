import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly appService: TransactionService) {}

  @MessagePattern('create-transaction')
  async create(@Payload() payload: any): Promise<any> {
    return await this.appService.borrowBook(
      payload.book_code,
      payload.member_code,
    );
  }

  @MessagePattern('send-back-book')
  async back(@Payload() payload: any): Promise<any> {
    return await this.appService.returnBook(
      payload.book_code,
      payload.member_code,
    );
  }

  @MessagePattern('nice')
  async nice(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log({
      payload: data,
      ctx: context.getMessage(),
      pattern: context.getPattern(),
    });
  }
}

import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @MessagePattern('create-book')
  async create(@Payload() payload: any): Promise<any> {
    return this.bookService.create(payload);
  }

  @MessagePattern('get-book-list')
  async getBookList(@Payload() payload: any) {
    return this.bookService.findAll(payload);
  }

  @MessagePattern('get-book')
  async getOne(@Payload() payload: string): Promise<any> {
    return this.bookService.get(payload);
  }

  @MessagePattern('delete-book')
  async delete(@Payload() bookId: string) {
    return this.bookService.delete(bookId);
  }

  @MessagePattern('update-book')
  async update(@Payload() payload: any) {
    return this.bookService.update(payload);
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

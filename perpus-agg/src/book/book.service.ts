import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EmptyError, firstValueFrom, lastValueFrom } from 'rxjs';
import { PERPUS_SERVICE } from 'src/common/constants/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';

@Injectable()
export class BookService {
  constructor(
    @Inject(PERPUS_SERVICE) private readonly clientPerpus: ClientProxy,
  ) {}

  async create(createUserDto: any) {
    const book = await firstValueFrom(
      this.clientPerpus.send('create-book', createUserDto),
    );
    return book;
  }

  async findAll(payload: any) {
    const getListBook = await firstValueFrom(
      this.clientPerpus.send('get-book-list', payload),
    );
    return getListBook;
  }

  async findOne(bookId: string) {
    const getBook = await firstValueFrom(
      this.clientPerpus.send('get-book', bookId),
    );
    if (!getBook) throw new NotFoundException('Data tidak ditemukan');
    return getBook;
  }

  async update(bookId: string, updateBookDto: any) {
    const updateBook = await firstValueFrom(
      this.clientPerpus.send('update-book', {
        data: updateBookDto,
        bookId,
      }),
    );
    return updateBook;
  }

  async remove(bookId: string) {
    const deleteBook = await firstValueFrom(
      this.clientPerpus.send('delete-book', bookId),
    );

    if (deleteBook.deleted == 0)
      throw new NotFoundException('Data tidak ditemukan');
  }
}

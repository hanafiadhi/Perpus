import { Inject, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PERPUS_SERVICE } from '../common/constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TransactionService {
  constructor(
    @Inject(PERPUS_SERVICE) private readonly clientPepus: ClientProxy,
  ) {}
  async create(createTransactionDto: CreateTransactionDto) {
    const transaction = await firstValueFrom(
      this.clientPepus.send('create-transaction', createTransactionDto),
    );
    return transaction;
  }

  async back(createTransactionDto: CreateTransactionDto) {
    const transaction = await firstValueFrom(
      this.clientPepus.send('send-back-book', createTransactionDto),
    );
    return transaction;
  }
}

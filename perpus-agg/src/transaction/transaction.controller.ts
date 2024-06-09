import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorBadRequestExecption } from '../common/swagger/api/respone/response.error';
import { MemberSuccesCreate } from '../common/swagger/api/respone/member.respone';
import { TransactionSuccesCreate } from '../common/swagger/api/respone/transaction.respone';
@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @Version('1')
  @ApiOperation({ summary: 'transaksi pinjam buku' })
  @ApiCreatedResponse({ type: TransactionSuccesCreate })
  @ApiBadRequestResponse({ type: ErrorBadRequestExecption })
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @Patch()
  @Version('1')
  @ApiOperation({ summary: 'transaksi pengembalian buku' })
  @ApiOkResponse({ type: TransactionSuccesCreate })
  @ApiBadRequestResponse({ type: ErrorBadRequestExecption })
  returnBook(@Body() updateTransactionDto: CreateTransactionDto) {
    return this.transactionService.back(updateTransactionDto);
  }
}

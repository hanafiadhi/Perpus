import {
  Controller,
  Get,
  Delete,
  Post,
  Param,
  Patch,
  Body,
  Version,
  Res,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { BookService } from './book.service';

import { MongoIdValidationPipe } from 'src/pipes/validator/mongoid.validator';

import { AccessTokenGuard } from 'src/guard/acccess-token.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ActiveUser } from 'src/decorator/active-user.decorator';
import { MemberSuccesCreate } from '../common/swagger/api/respone/member.respone';
import {
  ErrorBadRequestExecption,
  ErrorNotFoundExeption,
} from '../common/swagger/api/respone/response.error';
import { Response } from 'express';
import {
  DeletingData,
  Pagination,
} from '../common/swagger/api/respone/response.success';
import { BookDto } from './dto/create-book.dto';
import { BookSuccesCreate } from '../common/swagger/api/respone/book.response';
import { UpdateBookBody, UpdateBookDto } from './dto/update-book.dto';

// @ApiBearerAuth('jwt')
// @UseGuards(AccessTokenGuard)
@ApiTags('Book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Version('1')
  @ApiOperation({ summary: 'membuat buku' })
  @ApiCreatedResponse({ type: BookSuccesCreate })
  @ApiBadRequestResponse({ type: ErrorBadRequestExecption })
  @Post()
  createv2(@Body() createBookDto: BookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  @Version('1')
  @ApiOperation({
    summary: 'Pencarian member secara handal',
    description: `Dalam api ini bisa:\n
        1. Mencari data field\n
        2. Menampilkan beberapa field (data yang dibutuhkan, Multiple) ex:name\n
        3. Sorting (ASC/DESC ,Multiple field) ex:-created_at\n
        4. Pagination \n`,
    externalDocs: {
      url: 'http://localhost:3001/member?name[regex]=hanafi&page=1&limit=10&fields=name,role&sort=-name',
      description: `
        Ex: pencarian handal. \n
        1. filds[regex]=value -> mencari string di suatu field yang mengandung kata dari value(case in sensitive) ex:name[regex]=hanafi\n
        2. filds[in]=value -> mencari sebuah string dalam filed yang bertipe array string\n
        3. filds[eq]=value -> mencari sebuah kata yang sama dengan value pada fild yang di cari(case Sensitive)\n
        4. fileds[ne]=value -> mencari data yang tidak sama dengan value pada sebuah field\n
        5. fields[or]=value -> mengkombine beberapa filed untuk mencari data tertentu
      `,
    },
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'sort', required: false, type: String })
  @ApiQuery({ name: 'fields', required: false, type: String })
  @ApiBadRequestResponse({ type: ErrorBadRequestExecption })
  @ApiOkResponse({ type: Pagination })
  findAll(@Query() query: any) {
    return this.bookService.findAll(query);
  }

  @Version('1')
  @ApiOperation({ summary: 'mendapatkan satu book' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id yang di gunakan untuk paramester harus mongo id',
  })
  @ApiOkResponse({ type: BookSuccesCreate })
  @ApiBadRequestResponse({ type: ErrorBadRequestExecption })
  @ApiNotFoundResponse({ type: ErrorNotFoundExeption })
  @Get('/:id')
  findOne(@Param('id', MongoIdValidationPipe) id: string) {
    return this.bookService.findOne(id);
  }

  @Version('1')
  @Patch('/:id')
  @ApiOperation({ summary: 'update satu buku' })
  @ApiOkResponse({ type: BookSuccesCreate })
  @ApiBadRequestResponse({ type: ErrorBadRequestExecption })
  @ApiNotFoundResponse({ type: ErrorNotFoundExeption })
  @ApiBody({ type: UpdateBookBody })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id yang di gunakan untuk paramester harus mongo id',
  })
  async update(
    @Param('id', MongoIdValidationPipe) bookId: string,
    @Payload() updateBookDto: UpdateBookDto,
  ) {
    return await this.bookService.update(bookId, updateBookDto);
  }

  @Version('1')
  @ApiOperation({ summary: 'menghapus satu member' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id yang di gunakan untuk paramester harus mongo id',
  })
  @ApiBadRequestResponse({ type: ErrorBadRequestExecption })
  @ApiOkResponse({ type: DeletingData })
  @ApiNotFoundResponse({ type: ErrorNotFoundExeption })
  @Delete(':id')
  async remove(
    @Res() response: Response,
    @Param('id', MongoIdValidationPipe) id: string,
  ) {
    await this.bookService.remove(id);
    return response.status(200).json({
      message: 'Berhasil menghapus data',
      statuCode: 200,
    });
  }

  @Version('1')
  @Post('health')
  async health() {
    return true;
  }
}

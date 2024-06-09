import { ApiProperty } from '@nestjs/swagger';
import { IBooksSchema } from '../../../interface/book.interface';

export class BookSuccesCreate implements IBooksSchema {
  @ApiProperty({
    description: 'Id auto generate dari mongodb',
    example: '66580386572c487d00eef243',
    uniqueItems: true,
  })
  _id: string;
  @ApiProperty({
    description: 'Title dari sebuah buku',
    example: 'naruto',
    uniqueItems: true,
  })
  title: string;
  @ApiProperty({
    description: 'Nama penulis buku',
    example: 'masashi',
    uniqueItems: true,
  })
  author: string;

  @ApiProperty({
    description: 'Jumlah stok buku yang ada',
    example: 1,
    type: Number,
  })
  stock: number;

  @ApiProperty({
    description: 'Code pada booku',
    example: 'RX-7',
    required: true,
  })
  code: string;
}

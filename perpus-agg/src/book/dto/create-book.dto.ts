import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
export class BookDto {
  @ApiProperty({
    description: 'code Unik Setiap Member',
    example: 'RX-7',
    uniqueItems: true,
  })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({
    description: 'nama buku',
    example: 'the lord of the ring',
    uniqueItems: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'pencipta',
    example: 'the lord of the ring',
    uniqueItems: true,
  })
  @IsNotEmpty()
  @IsString()
  author: string;

  @ApiProperty({
    description: 'stock buku',
    example: 1,
    uniqueItems: true,
  })
  @IsNumber()
  @Min(1)
  stock: number;
}

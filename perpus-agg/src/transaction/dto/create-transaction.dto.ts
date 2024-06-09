import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'code book',
  })
  @IsNotEmpty()
  @IsString()
  book_code: string;

  @ApiProperty({
    description: 'code member',
  })
  @IsNotEmpty()
  @IsString()
  member_code: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class MemberDto {
  @ApiProperty({
    description: 'code Unik Setiap Member',
    example: 'RX-7',
    uniqueItems: true,
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description: 'orang yang menyewa',
    example: 'hanafi',
    uniqueItems: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

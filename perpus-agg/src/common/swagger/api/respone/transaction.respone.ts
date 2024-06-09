import { ApiProperty } from '@nestjs/swagger';

export class TransactionSuccesCreate {
  @ApiProperty({
    description: 'Berisikan Satus Code',
  })
  statuCode: number;

  @ApiProperty({
    description: 'Berisikan message dari backend',
  })
  message: string;

  @ApiProperty({
    description: 'Berisikan data perubahan yang terbaru',
  })
  data: Array<{}>;
}

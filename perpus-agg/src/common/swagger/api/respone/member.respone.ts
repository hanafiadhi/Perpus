import { ApiProperty } from '@nestjs/swagger';

import { IMemberSchema } from '../../../interface/member.interface';

export class MemberSuccesCreate implements IMemberSchema {
  @ApiProperty({
    description: 'Id auto generate dari mongodb',
    example: '66580386572c487d00eef243',
  })
  _id: string;
  @ApiProperty({
    description: 'silahkan masukan code member',
    example: 'M001',
  })
  code: string;

  @ApiProperty({
    description: 'orang yang menyewa',
    example: 'hanafi',
  })
  name: string;

  @ApiProperty({
    description:
      'Jika member Pernah meminjam buku akan ada historynya jika tidak ada maka cuma array kosong',
    isArray: true,
    required: true,
  })
  books: Array<{
    code: string;
    title: string;
    author: string;
    penalty_date: Date | null;
  }>;
}

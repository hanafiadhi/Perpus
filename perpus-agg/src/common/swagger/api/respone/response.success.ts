import { ApiProperty } from '@nestjs/swagger';

export class DeletingData {
  /** Success deleting suatu data */
  @ApiProperty({
    description: 'Berisi description tentang success',
    example: 'Berhasil menghapus data',
    type: String,
  })
  message: string;

  @ApiProperty({
    description: 'Berisi status code yang di dapatkan',
    example: 200,
    type: Number,
  })
  statuCode: number;
}
class paging {
  @ApiProperty({
    description: 'Page',
    example: 1,
    type: Number,
  })
  page: number;

  @ApiProperty({
    description: 'seberapa banyak data yang inign di tampilkan',
    example: 100,
    type: Number,
  })
  size: number;

  @ApiProperty({
    description: 'seberapa banyak data yang di peroleh',
    example: 200,
    type: Number,
  })
  totalItems: number;

  @ApiProperty({
    description: 'seberapa banyak page yang di peroleh dari perhitungan limit',
    example: 200,
    type: Number,
  })
  totalPages: number;
}
export class Pagination {
  @ApiProperty({
    type: paging,
  })
  paging: paging;
  @ApiProperty({
    description:
      'Berisi data dari pagination bila datanya biasanya array object jika tidak ada cuma array kosong',
    type: Array<any>,
  })
  data: Array<any>;
}

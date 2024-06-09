import { PartialType } from '@nestjs/mapped-types';
import { BookDto } from './create-book.dto';

import { PartialType as Partial } from '@nestjs/swagger';

export class UpdateBookDto extends PartialType(BookDto) {}
export class UpdateBookBody extends Partial(BookDto) {}

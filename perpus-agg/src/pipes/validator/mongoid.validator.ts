import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class MongoIdValidationPipe implements PipeTransform {
  transform(value: string) {
    if (Types.ObjectId.isValid(value)) {
      return value;
    }
    throw new BadRequestException('Parameter salah');
  }
}

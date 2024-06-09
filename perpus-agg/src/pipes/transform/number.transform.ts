import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class NumberTransformPipe implements PipeTransform {
  transform(value: number) {
    if (isNaN(value)) {
      throw new BadRequestException('Must be a number');
    }
    return Number(value);
  }
}

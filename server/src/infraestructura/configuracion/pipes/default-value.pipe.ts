import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { isNil } from '@nestjs/common/utils/shared.utils';

/**
 * Defines the built-in DefaultValue Pipe
 *
 * @see [Built-in Pipes](https://docs.nestjs.com/pipes#built-in-pipes)
 *
 * @publicApi
 */
@Injectable()
export class DefaultNumberPipe implements PipeTransform {
  constructor( private readonly defaultValue: number ){}
  transform(value?: number, _metadata?: ArgumentMetadata) {
    if (
      isNil(value) ||
      (typeof value === 'number' && isNaN((value as unknown) as number))
    ) {
      return this.defaultValue;
    }
    return value;
  }
}

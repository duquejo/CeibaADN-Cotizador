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
// eslint-disable-next-line
export class DefaultValuePipe implements PipeTransform {
  constructor( private readonly defaultValue: any ){}
  transform(value?: any, _metadata?: ArgumentMetadata) {
    if (
      isNil(value) ||
      (typeof value === 'number' && isNaN((value as unknown) as number))
    ) {
      return this.defaultValue;
    }
    return value;
  }
}

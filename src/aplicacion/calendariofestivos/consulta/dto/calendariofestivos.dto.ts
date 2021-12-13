import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
@Exclude()
export class CalendarioFestivosDto {

  @Expose()
  @ApiProperty({ example: 1 })
  readonly id: number;

  @Expose()  
  @ApiProperty({ example: 'Amazonía salvaje' })
  readonly nombre: string;

  @Expose()  
  @ApiPropertyOptional({ type: 'string', example: 'Diviértete en medio de la fauna y flora' })
  readonly descripcion: string;

  @Expose()  
  @ApiPropertyOptional({ type: 'simple-array', example: [ '2021-12-18' ], examples: [[ '2021-12-16', '2021-12-24', '2021-12-31' ], [ '2021-12-18' ]], default: [] })
  readonly festivos: string[];
}

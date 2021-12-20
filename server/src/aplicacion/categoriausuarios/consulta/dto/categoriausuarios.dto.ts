import { Exclude, Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
@Exclude()
export class CategoriaUsuariosDto {

  @Expose()
  @ApiProperty({ example: 1 })
  readonly id: number;

  @Expose()  
  @ApiProperty({ type: 'string', example: 'Categoría #2' })
  readonly nombre: string;

  @Expose()  
  @ApiPropertyOptional({ type: 'string', example: 'Menor a $800.000 COP' })
  readonly descripcion: string;

  @Expose()
  @ApiProperty({ type: 'integer', example: 25000 })
  readonly valorAlta: number;

  @Expose()  
  @ApiProperty({ type: 'integer', example: 30000 })
  readonly valorBaja: number;
}

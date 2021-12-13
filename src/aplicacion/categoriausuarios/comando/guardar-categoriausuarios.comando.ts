import { IsNotEmpty, IsString, IsOptional, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class ComandoGuardarCategoriaUsuarios {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Menor a $800.000 COP', description: 'Nombre público' })
  readonly nombre: string;

  @IsOptional()
  @IsString()  
  @ApiPropertyOptional({ type: 'string', example: 'Cartagena' })
  readonly descripcion: string;  

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({ type: 'integer', example: 30000 })
  readonly valorAlta: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ type: 'integer', example: 25000 })
  readonly valorBaja: number;
}

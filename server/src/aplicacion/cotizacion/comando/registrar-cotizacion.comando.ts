import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class ComandoCrearCotizacion {

  @IsNotEmpty()
  @IsNumber()  
  @ApiProperty({ example: 1 })  
  public centroVacacional: number;

  @IsNotEmpty()
  @IsNumber()  
  @ApiProperty({ example: 2 })  
  public categoriaUsuarios: number;
  
  @IsNotEmpty()
  @IsNumber()  
  @ApiProperty({ example: 3 })  
  public personas: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '2021-12-10' })
  public fechaInicio: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '2021-12-18' })
  public fechaFin: string;
}

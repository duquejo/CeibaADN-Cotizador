import { IsDateString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ComandoRegistrarUsuario {
  @IsString()
  @ApiProperty({ example: 'William'})
  public nombre: string;

  @IsString()
  @ApiProperty({ minLength: 4, example: '1234' })
  public clave: string;

  @IsDateString()
  @ApiProperty({ type: Date })
  public fechaCreacion: string;
}

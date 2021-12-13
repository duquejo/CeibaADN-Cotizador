import { ApiProperty } from '@nestjs/swagger';
export class UsuarioDto {

  @ApiProperty({ example: 'William' })
  nombre: string;

  @ApiProperty({ type: Date })
  fechaCreacion: string;
}

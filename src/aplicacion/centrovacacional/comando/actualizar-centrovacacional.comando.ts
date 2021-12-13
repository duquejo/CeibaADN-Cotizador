import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CalendarioFestivosEntidad } from 'src/infraestructura/calendariofestivos/entidad/calendariofestivos.entidad';
import { CategoriaUsuariosEntidad } from 'src/infraestructura/categoriausuarios/entidad/categoriausuarios.entidad';

const exampleDescripcion: number[] = [ 0, 2, 4 ];
const exampleCategoriaUsuarios: number[] = [ 1, 3, 5 ];
export class ComandoActualizarCentroVacacional {

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Cartagena Resort'})
  public nombre: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Descansa en un lugar increíble', default: '' })
  public descripcion: string;
  
  @IsArray()
  @ApiPropertyOptional({ type: [ CalendarioFestivosEntidad ], example: exampleDescripcion })
  @IsOptional()
  public calendarios: CalendarioFestivosEntidad[];
  
  @IsArray()
  @ApiPropertyOptional({ type: [ Number ], example: exampleCategoriaUsuarios })
  @IsOptional()
  public categoriaUsuarios: CategoriaUsuariosEntidad[];

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 1, description: 'Sólo estará activo si los calendarios asociados existen' })
  public calendarioActivo: number;
}

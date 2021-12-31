import { Controller, Post, UsePipes, Body, ValidationPipe, Get, Delete, ParseIntPipe, Param } from '@nestjs/common';

// Transactional Imports
import { ManejadorBorrarCategoriaUsuarios } from '../../../aplicacion/categoriausuarios/comando/borrar-categoriausuarios.manejador';
import { ComandoGuardarCategoriaUsuarios } from 'src/aplicacion/categoriausuarios/comando/guardar-categoriausuarios.comando';
import { ManejadorGuardarCategoriaUsuarios } from 'src/aplicacion/categoriausuarios/comando/guardar-categoriausuarios.manejador';

// Reading Imports
import { ManejadorObtenerCategoriaUsuarios } from 'src/aplicacion/categoriausuarios/consulta/obtener-categoriausuarios.manejador';
import { CategoriaUsuariosDto } from 'src/aplicacion/categoriausuarios/consulta/dto/categoriausuarios.dto';

@Controller('categoriasUsuarios')
export class CategoriaUsuariosControlador {
  constructor(
    private readonly _manejadorGuardarCategoriaUsuarios: ManejadorGuardarCategoriaUsuarios,
    private readonly _manejadorObtenerCategoriaUsuarios: ManejadorObtenerCategoriaUsuarios,
    private readonly _manejadorBorrarCategoriaUsuarios : ManejadorBorrarCategoriaUsuarios,
  ) {}

  /**
   * Crear Categoria Usuarios EndPoint
   */
   @Post()
   @UsePipes( new ValidationPipe({ transform: true }) )
   crearCategoriaUsuarios ( 
     @Body() comandoGuardarCategoriaUsuarios: ComandoGuardarCategoriaUsuarios
   ): Promise<ComandoGuardarCategoriaUsuarios> {
    return this._manejadorGuardarCategoriaUsuarios.ejecutar( comandoGuardarCategoriaUsuarios );
   }

  /**
   * Obtener todas las Categorías de Usuarios Endpoint
   */
   @Get()
   async obtenerCategoriasUsuarios(): Promise<CategoriaUsuariosDto[]> {
     return this._manejadorObtenerCategoriaUsuarios.ejecutar();
   }


  /**
   * Borrar Calendario Endpoint
   */
   @Delete(':categoriaId')
   @UsePipes( new ValidationPipe({ transform: true }) )
   async borrarCategoriaUsuarios ( 
     @Param( 'categoriaId', ParseIntPipe ) categoriaId: number
   ) {
     await this._manejadorBorrarCategoriaUsuarios.ejecutar( categoriaId );
   }   
}

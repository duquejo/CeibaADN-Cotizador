import { Controller, Post, UsePipes, Body, ValidationPipe, Get, Patch, Param, ParseIntPipe, Delete } from '@nestjs/common';

// Transactional Imports
import { ComandoGuardarCentroVacacional } from 'src/aplicacion/centrovacacional/comando/guardar-centrovacacional.comando';
import { ComandoActualizarCentroVacacional } from 'src/aplicacion/centrovacacional/comando/actualizar-centrovacacional.comando';

import { ManejadorGuardarCentroVacacional } from 'src/aplicacion/centrovacacional/comando/guardar-centrovacacional.manejador';
import { ManejadorActualizarCentroVacacional } from 'src/aplicacion/centrovacacional/comando/actualizar-centrovacacional.manejador';
import { ManejadorBorrarCentroVacacional } from 'src/aplicacion/centrovacacional/comando/borrar-centrovacacional.manejador';

// Reading Imports
import { ManejadorObtenerCentroVacacional } from 'src/aplicacion/centrovacacional/consulta/obtener-centrovacacional.manejador';
import { CentroVacacionalDto } from 'src/aplicacion/centrovacacional/consulta/dto/centrovacacional.dto';

@Controller('centrosVacacionales')
export class CentroVacacionalControlador {
  constructor(
    private readonly _manejadorGuardarCentroVacacional: ManejadorGuardarCentroVacacional,
    private readonly _manejadorActualizarCentroVacacional: ManejadorActualizarCentroVacacional,
    private readonly _manejadorBorrarCentroVacacional: ManejadorBorrarCentroVacacional,
    private readonly _manejadorObtenerCentroVacacional: ManejadorObtenerCentroVacacional
  ) {}

  /**
   * Crear Centro Vacacional EndPoint
   */
   @Post()
   @UsePipes( new ValidationPipe({ transform: true }) )
   crearCentroVacacional ( 
     @Body() comandoGuardarCentroVacacional: ComandoGuardarCentroVacacional
   ): Promise<ComandoGuardarCentroVacacional> {
    return this._manejadorGuardarCentroVacacional.ejecutar( comandoGuardarCentroVacacional );
   }
 
   /**
    * Actualizar Centro Vacacional Endpoint
    */
   @Patch(':centroVacacionalId')
   @UsePipes( new ValidationPipe({ transform: true }) )
   async actualizarCentroVacacional ( 
     @Param( 'centroVacacionalId', ParseIntPipe ) centroVacacionalId: number, 
     @Body() comandoActualizarCentroVacacional: ComandoActualizarCentroVacacional
     ) {
     await this._manejadorActualizarCentroVacacional.ejecutar( centroVacacionalId, comandoActualizarCentroVacacional );
   }
 
   /**
    * Borrar Centro Vacacional Endpoint
    */
   @Delete(':centroVacacionalId')
   @UsePipes( new ValidationPipe({ transform: true }) )
   async borrarCentroVacacional ( 
     @Param( 'centroVacacionalId', ParseIntPipe ) centroVacacionalId: number
   ) {
     await this._manejadorBorrarCentroVacacional.ejecutar( centroVacacionalId );
   }
 
  /**
   * Obtener todos Centros Vacacionales Endpoint
   */
   @Get()
   async obtenerCentrosVacacionales(): Promise<CentroVacacionalDto[]> {
     return this._manejadorObtenerCentroVacacional.ejecutar();
   }
}

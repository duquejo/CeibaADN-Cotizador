import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Importanciones Generales
import { CategoriaUsuariosEntidad } from 'src/infraestructura/categoriausuarios/entidad/categoriausuarios.entidad';

// Transactional Operations
import { RepositorioCategoriaUsuarios } from 'src/dominio/categoriausuarios/puerto/repositorio/repositorio-categoriausuarios';
import { repositorioCategoriaUsuariosProvider } from 'src/infraestructura/categoriausuarios/proveedor/repositorio/repositorio-categoriausuarios.proveedor';

/**
 * Guardar
 */
import { ServicioGuardarCategoriaUsuarios } from 'src/dominio/categoriausuarios/servicio/servicio-guardar-categoriausuarios';
import { ManejadorGuardarCategoriaUsuarios } from 'src/aplicacion/categoriausuarios/comando/guardar-categoriausuarios.manejador';
import { servicioGuardarCategoriaUsuariosProveedor } from 'src/infraestructura/categoriausuarios/proveedor/servicio/servicio-guardar-categoriausuarios.proveedor';

/**
 * Operaciones de lectura
 */
import { ManejadorObtenerCategoriaUsuarios } from 'src/aplicacion/categoriausuarios/consulta/obtener-categoriausuarios.manejador';
import { daoCategoriaUsuariosProvider } from 'src/infraestructura/categoriausuarios/proveedor/dao/dao-categoriausuarios.proveedor';
import { DaoCategoriaUsuarios } from 'src/dominio/categoriausuarios/puerto/dao/dao-categoriausuarios';

/**
 * Borrar
 */
import { ServicioBorrarCategoriaUsuarios } from '../../../dominio/categoriausuarios/servicio/servicio-borrar-categoriausuarios';
import { servicioBorrarCategoriaUsuariosProveedor } from './servicio/servicio-borrar-calendariofestivos.proveedor';
import { ManejadorBorrarCategoriaUsuarios } from '../../../aplicacion/categoriausuarios/comando/borrar-categoriausuarios.manejador';

@Module({
  imports: [TypeOrmModule.forFeature( [ CategoriaUsuariosEntidad ] ) ],
  providers: [
    {
      provide: ServicioGuardarCategoriaUsuarios,
      inject: [ RepositorioCategoriaUsuarios ],
      useFactory: servicioGuardarCategoriaUsuariosProveedor
    },
    {
      provide: ServicioBorrarCategoriaUsuarios,
      inject: [ RepositorioCategoriaUsuarios ],
      useFactory: servicioBorrarCategoriaUsuariosProveedor
    },

    // Read Operations
    ManejadorObtenerCategoriaUsuarios, // Aplicación / Consulta / DTO
    daoCategoriaUsuariosProvider, // Infraestructura / Proveedor / DAO

    // Transactional Operations
    ManejadorGuardarCategoriaUsuarios, // Aplicación / Comando
    ManejadorBorrarCategoriaUsuarios, // Aplicación / Comando

    repositorioCategoriaUsuariosProvider, // Aplicación / Proveedor / Repositorio
  ],
  exports: [

    // Read Operations
    ManejadorObtenerCategoriaUsuarios, // Aplicación / Comando
    DaoCategoriaUsuarios, // Dominio / Puerto / DAO

    // Transactional Operations
    RepositorioCategoriaUsuarios, // Dominio / Repositorio

    ServicioGuardarCategoriaUsuarios, // Dominio / Servicio
    ManejadorGuardarCategoriaUsuarios, // Aplicación / Comando

    ServicioBorrarCategoriaUsuarios, // Dominio / Servicio
    ManejadorBorrarCategoriaUsuarios, // Aplicación / Comando
  ]
})
export class CategoriaUsuariosProveedorModule {}

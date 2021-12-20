import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Importaciones generales
import { CentroVacacionalEntidad } from 'src/infraestructura/centrovacacional/entidad/centrovacacional.entidad';
import { CategoriaUsuariosEntidad } from 'src/infraestructura/categoriausuarios/entidad/categoriausuarios.entidad';
import { CalendarioFestivosEntidad } from 'src/infraestructura/calendariofestivos/entidad/calendariofestivos.entidad';

// Transactional Operations
import { RepositorioCentroVacacional } from 'src/dominio/centrovacacional/puerto/repositorio/repositorio-centrovacacional';
import { RepositorioCategoriaUsuarios } from 'src/dominio/categoriausuarios/puerto/repositorio/repositorio-categoriausuarios';
import { RepositorioCalendarioFestivos } from 'src/dominio/calendariofestivos/puerto/repositorio/repositorio-calendariofestivos';
import { repositorioCentroVacacionalProvider } from 'src/infraestructura/centrovacacional/proveedor/repositorio/repositorio-centrovacacional.proveedor';

// Proveedores externos
import { repositorioCategoriaUsuariosProvider } from 'src/infraestructura/categoriausuarios/proveedor/repositorio/repositorio-categoriausuarios.proveedor';
import { repositorioCalendarioFestivosProvider } from 'src/infraestructura/calendariofestivos/proveedor/repositorio/repositorio-calendariofestivos.proveedor';

/**
 * Guardar
 */
import { ServicioGuardarCentroVacacional } from 'src/dominio/centrovacacional/servicio/servicio-guardar-centrovacacional';
import { ManejadorGuardarCentroVacacional } from 'src/aplicacion/centrovacacional/comando/guardar-centrovacacional.manejador';
import { servicioGuardarCentroVacacionalProveedor } from 'src/infraestructura/centrovacacional/proveedor/servicio/servicio-guardar-centrovacacional.proveedor';

/**
 * Actualizar
 */
import { ServicioActualizarCentroVacacional } from 'src/dominio/centrovacacional/servicio/servicio-actualizar-centrovacacional';
import { ManejadorActualizarCentroVacacional } from 'src/aplicacion/centrovacacional/comando/actualizar-centrovacacional.manejador';
import { servicioActualizarCentroVacacionalProveedor } from 'src/infraestructura/centrovacacional/proveedor/servicio/servicio-actualizar-centrovacacional.proveedor';

/**
 * Borrar
 */
import { ServicioBorrarCentroVacacional } from 'src/dominio/centrovacacional/servicio/servicio-borrar-centrovacacional';
import { ManejadorBorrarCentroVacacional } from 'src/aplicacion/centrovacacional/comando/borrar-centrovacacional.manejador';
import { servicioBorrarCentroVacacionalProveedor } from 'src/infraestructura/centrovacacional/proveedor/servicio/servicio-borrar-centrovacacional.proveedor';

/**
 * Operaciones de lectura
 */
import { DaoCentroVacacional } from 'src/dominio/centrovacacional/puerto/dao/dao-centrovacacional';
import { daoCentroVacacionalProvider } from 'src/infraestructura/centrovacacional/proveedor/dao/dao-centrovacacional.proveedor';
import { ManejadorObtenerCentroVacacional } from 'src/aplicacion/centrovacacional/consulta/obtener-centrovacacional.manejador';

@Module({
  imports: [TypeOrmModule.forFeature( [ CentroVacacionalEntidad, CalendarioFestivosEntidad, CategoriaUsuariosEntidad ] ) ],
  providers: [
    {
      provide: ServicioGuardarCentroVacacional,
      inject: [ RepositorioCentroVacacional, RepositorioCalendarioFestivos, RepositorioCategoriaUsuarios ],
      useFactory: servicioGuardarCentroVacacionalProveedor
    },
    {
      provide: ServicioActualizarCentroVacacional,
      inject: [ RepositorioCentroVacacional, RepositorioCalendarioFestivos, RepositorioCategoriaUsuarios ],
      useFactory: servicioActualizarCentroVacacionalProveedor
    },
    {
      provide: ServicioBorrarCentroVacacional,
      inject: [ RepositorioCentroVacacional ],
      useFactory: servicioBorrarCentroVacacionalProveedor
    },

    ManejadorObtenerCentroVacacional, // Aplicación / Consulta / DTO
    daoCentroVacacionalProvider, // Infraestructura / Proveedor / DAO

    // Transactional Operations
    ManejadorGuardarCentroVacacional, // Aplicación / Comando
    ManejadorActualizarCentroVacacional, // Aplicación / Comando
    ManejadorBorrarCentroVacacional, // Aplicación / Comando

    repositorioCentroVacacionalProvider, // Aplicación / Proveedor / Repositorio
    repositorioCalendarioFestivosProvider, // Aplicación / Proveedor / Repositorio (Externo - CalendarioFestivos )
    repositorioCategoriaUsuariosProvider // Aplicación / Proveedor / Repositorio (Externo - CategoriaUsuarios )
  ],
  exports: [
    
    // Read Operations
    ManejadorObtenerCentroVacacional, // Aplicación / Consulta / DTO
    DaoCentroVacacional, // Dominio / Puerto / DAO

    // Transactional Operations
    RepositorioCentroVacacional, // Dominio / Repositorio

    ServicioGuardarCentroVacacional, // Dominio / Servicio
    ManejadorGuardarCentroVacacional, // Aplicación / Comando

    ServicioActualizarCentroVacacional, // Dominio / Servicio
    ManejadorActualizarCentroVacacional, // Aplicación / Comando

    ServicioBorrarCentroVacacional, // Dominio / Servicio
    ManejadorBorrarCentroVacacional, // Aplicación / Comando
  ]
})
export class CentroVacacionalProveedorModule {}

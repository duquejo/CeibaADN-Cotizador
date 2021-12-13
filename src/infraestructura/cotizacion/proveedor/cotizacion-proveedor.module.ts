import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Importaciones generales
import { CotizacionEntidad } from 'src/infraestructura/cotizacion/entidad/cotizacion.entidad';
import { CentroVacacionalEntidad } from 'src/infraestructura/centrovacacional/entidad/centrovacacional.entidad';
import { CategoriaUsuariosEntidad } from 'src/infraestructura/categoriausuarios/entidad/categoriausuarios.entidad';

// Transactional Operations
import { RepositorioCotizacion } from 'src/dominio/cotizacion/puerto/repositorio/repositorio-cotizacion';
import { RepositorioCentroVacacional } from 'src/dominio/centrovacacional/puerto/repositorio/repositorio-centrovacacional';
import { RepositorioCategoriaUsuarios } from 'src/dominio/categoriausuarios/puerto/repositorio/repositorio-categoriausuarios';
import { repositorioCotizacionProvider } from 'src/infraestructura/cotizacion/proveedor/repositorio/repositorio-cotizacion.proveedor';

// Proveedores externos
import { repositorioCentroVacacionalProvider } from 'src/infraestructura/centrovacacional/proveedor/repositorio/repositorio-centrovacacional.proveedor';
import { repositorioCategoriaUsuariosProvider } from 'src/infraestructura/categoriausuarios/proveedor/repositorio/repositorio-categoriausuarios.proveedor';

/**
 * Crear
 */
import { ServicioCrearCotizacion } from 'src/dominio/cotizacion/servicio/servicio-registrar-cotizacion';
import { ManejadorCrearCotizacion } from 'src/aplicacion/cotizacion/comando/registrar-cotizacion.manejador';
import { servicioCrearCotizacionProveedor } from 'src/infraestructura/cotizacion/proveedor/servicio/servicio-registrar-cotizacion.proveedor';

/**
 * Operaciones de lectura
 */
import { daoCotizacionProvider } from 'src/infraestructura/cotizacion/proveedor/dao/dao-cotizacion.proveedor';
import { ManejadorObtenerCotizacion } from 'src/aplicacion/cotizacion/consulta/obtener-cotizacion.manejador';
import { DaoCotizacion } from 'src/dominio/cotizacion/puerto/dao/dao-cotizacion';

@Module({
  imports: [TypeOrmModule.forFeature( [ CotizacionEntidad, CentroVacacionalEntidad, CategoriaUsuariosEntidad ] ) ],
  providers: [
    {
      provide: ServicioCrearCotizacion,
      inject: [ RepositorioCotizacion, RepositorioCentroVacacional, RepositorioCategoriaUsuarios ],
      useFactory: servicioCrearCotizacionProveedor
    },

    ManejadorObtenerCotizacion, // Aplicación / Consulta / DTO
    daoCotizacionProvider, // Infraestructura / Proveedor / DAO

    // Transactional Operations
    ManejadorCrearCotizacion, // Aplicación / Comando

    repositorioCotizacionProvider, // Aplicación / Proveedor / Repositorio
    repositorioCentroVacacionalProvider, // Aplicación / Proveedor / Repositorio (Externo- CentroVacacional )
    repositorioCategoriaUsuariosProvider // Aplicación / Proveedor / Repositorio (Externo - CategoriaUsuarios )    
  ],
  exports: [

    // Read Operations
    ManejadorObtenerCotizacion, // Aplicación / Consulta / DTO
    DaoCotizacion, // Dominio / Puerto / DAO

    // Transactional Operations
    RepositorioCotizacion, // Dominio / Repositorio

    ServicioCrearCotizacion, // Dominio / Servicio
    ManejadorCrearCotizacion, // Aplicación / Comando    
  ]
})
export class CotizacionProveedorModule {}
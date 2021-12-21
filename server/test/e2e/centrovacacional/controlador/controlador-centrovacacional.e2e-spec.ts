import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { createStubObj } from '../../../util/create-object.stub';
import { HttpStatus, INestApplication, Body, HttpCode } from '@nestjs/common';
import { createSandbox, SinonStubbedInstance } from 'sinon';

import { AppLogger } from '../../../../src/infraestructura/configuracion/ceiba-logger.service';
import { FiltroExcepcionesDeNegocio } from '../../../../src/infraestructura/excepciones/filtro-excepciones-negocio';

// Generales
import { CategoriaUsuariosEntidad } from '../../../../src/infraestructura/categoriausuarios/entidad/categoriausuarios.entidad';
import { CalendarioFestivosEntidad } from '../../../../src/infraestructura/calendariofestivos/entidad/calendariofestivos.entidad';
import { CentroVacacionalControlador } from '../../../../src/infraestructura/centrovacacional/controlador/centrovacacional.controlador';
import { RepositorioCentroVacacional } from '../../../../src/dominio/centrovacacional/puerto/repositorio/repositorio-centrovacacional';
import { RepositorioCalendarioFestivos } from '../../../../src/dominio/calendariofestivos/puerto/repositorio/repositorio-calendariofestivos';

// Leer
import { DaoCentroVacacional } from '../../../../src/dominio/centrovacacional/puerto/dao/dao-centrovacacional';
import { ManejadorObtenerCentroVacacional } from '../../../../src/aplicacion/centrovacacional/consulta/obtener-centrovacacional.manejador';

// Guardar
// import { ComandoGuardarCentroVacacional } from '../../../../src/aplicacion/centrovacacional/comando/guardar-centrovacacional.comando';
import { ServicioGuardarCentroVacacional } from '../../../../src/dominio/centrovacacional/servicio/servicio-guardar-centrovacacional';
import { ManejadorGuardarCentroVacacional } from '../../../../src/aplicacion/centrovacacional/comando/guardar-centrovacacional.manejador';
import { servicioGuardarCentroVacacionalProveedor } from '../../../../src/infraestructura/centrovacacional/proveedor/servicio/servicio-guardar-centrovacacional.proveedor';

// Actualizar
import { ServicioActualizarCentroVacacional } from '../../../../src/dominio/centrovacacional/servicio/servicio-actualizar-centrovacacional';
import { servicioActualizarCentroVacacionalProveedor } from '../../../../src/infraestructura/centrovacacional/proveedor/servicio/servicio-actualizar-centrovacacional.proveedor';
import { ManejadorActualizarCentroVacacional } from '../../../../src/aplicacion/centrovacacional/comando/actualizar-centrovacacional.manejador';

// Borrar
import { ServicioBorrarCentroVacacional } from '../../../../src/dominio/centrovacacional/servicio/servicio-borrar-centrovacacional';
import { ManejadorBorrarCentroVacacional } from '../../../../src/aplicacion/centrovacacional/comando/borrar-centrovacacional.manejador';
import { servicioBorrarCentroVacacionalProveedor } from '../../../../src/infraestructura/centrovacacional/proveedor/servicio/servicio-borrar-centrovacacional.proveedor';
import { RepositorioCategoriaUsuarios } from '../../../../src/dominio/categoriausuarios/puerto/repositorio/repositorio-categoriausuarios';

/**
 * Un sandbox es util cuando el módulo de nest se configura una sola vez durante el ciclo completo de pruebas
 * */
const sinonSandbox = createSandbox();

describe('Pruebas al controlador del centro vacacional', () => {

  let app: INestApplication;

  let repositorioCentroVacacional: SinonStubbedInstance<RepositorioCentroVacacional>;
  let daoCentroVacacional: SinonStubbedInstance<DaoCentroVacacional>;
  
  // Externos
  let repositorioCalendarioFestivos: SinonStubbedInstance<RepositorioCalendarioFestivos>;
  let repositorioCategoriaUsuarios: SinonStubbedInstance<RepositorioCategoriaUsuarios>;

  /**
   * Mock dependencias
   */
  const categoriaUsuariosDataMock = [{
    id: 1,
    nombre: "Menor a $800.000 COP",
    descripcion: "Cartagena",
    valorAlta: 50000,
    valorBaja: 25000
  }] as CategoriaUsuariosEntidad[];

  const calendarioDataMock = [{
    id: 1,
    nombre: 'Campaña empleados Diciembre', // Nombre
    descripcion: 'Campaña para empleados aguinaldo navideño', // Descripción
    festivos: [ '2021-12-18' ] // Festivos
  }] as CalendarioFestivosEntidad[];

  /**
   * No Inyectar los módulos completos (Se trae TypeORM y genera lentitud al levantar la prueba, traer una por una las dependencias)
   **/
  beforeAll( async () => {

    repositorioCentroVacacional = createStubObj<RepositorioCentroVacacional>([
      'guardar',
      'existeCentroVacacional',
      'existeNombreCentroVacacional',
      'actualizar',
      'borrar'
    ], sinonSandbox);

    repositorioCalendarioFestivos = createStubObj<RepositorioCalendarioFestivos>([
      'validarCalendarios',
    ], sinonSandbox);

    repositorioCategoriaUsuarios = createStubObj<RepositorioCategoriaUsuarios>([
      'validarCategorias',
    ], sinonSandbox);

    daoCentroVacacional         = createStubObj<DaoCentroVacacional>(['obtenerCentrosVacacionales'], sinonSandbox);
    
    const moduleRef = await Test.createTestingModule({
      controllers: [ CentroVacacionalControlador ],
      providers: [
        AppLogger,
        {
          provide:    ServicioGuardarCentroVacacional,
          inject:     [ RepositorioCentroVacacional, RepositorioCategoriaUsuarios, RepositorioCalendarioFestivos ],
          useFactory: servicioGuardarCentroVacacionalProveedor,
        },
        {
          provide:    ServicioActualizarCentroVacacional,
          inject:     [ RepositorioCentroVacacional ],
          useFactory: servicioActualizarCentroVacacionalProveedor,
        },
        {
          provide:    ServicioBorrarCentroVacacional,
          inject:     [ RepositorioCentroVacacional ],
          useFactory: servicioBorrarCentroVacacionalProveedor,
        },
        { provide: RepositorioCentroVacacional, useValue: repositorioCentroVacacional },
        { provide: RepositorioCategoriaUsuarios, useValue: repositorioCategoriaUsuarios },
        { provide: RepositorioCalendarioFestivos, useValue: repositorioCalendarioFestivos },
        { provide: DaoCentroVacacional, useValue: daoCentroVacacional },

        /**
         * CRUD Handlers
         */
        ManejadorGuardarCentroVacacional,
        ManejadorObtenerCentroVacacional,
        ManejadorActualizarCentroVacacional,
        ManejadorBorrarCentroVacacional
      ],
    }).compile();

    app = moduleRef.createNestApplication();

    const logger = await app.resolve( AppLogger );
    logger.customError = sinonSandbox.stub();

    app.useGlobalFilters( new FiltroExcepcionesDeNegocio( logger ) );

    await app.init();
  });

  afterEach( () => sinonSandbox.restore() );

  afterAll( async () => await app.close() );

  // it('Debería crear un centro vacacional de manera exitosa', async () => {

  //   const centroVacacionalBaseData: any = {
  //     nombre: 'Parque Tayrona',
  //     descripcion: 'Aventúrate con tu familia',
  //     calendarios: [ 1,2,3 ],
  //     categoriaUsuarios: [1,2,3 ],
  //     calendarioActivo: 3
  //   };

  //   const calendariosFestivosMock = [{
  //     id: 1,
  //     nombre: 'Campaña empleados Diciembre', // Nombre
  //     descripcion: 'Campaña para empleados aguinaldo navideño', // Descripción
  //     festivos: [ '2021-12-18' ] // Festivos
  //   }] as CalendarioFestivosEntidad[];

  //   repositorioCentroVacacional.existeNombreCentroVacacional.returns( Promise.resolve( false ) );
    
  //   // // Calendarios válidos ( Uno válido por ej )
  //   repositorioCalendarioFestivos.validarCalendarios.returns( Promise.resolve([ calendariosFestivosMock,2]) );
    
  //   // // Categorías válidas ( Dos válidas por ej )
  //   // repositorioCategoriaUsuarios.validarCategorias.returns( Promise.resolve([[],2]) );

  //   const response = await request( app.getHttpServer() ).post('/centrosVacacionales')
  //     .send( centroVacacionalBaseData )
  //     .expect( HttpStatus.CREATED );
  // });

  it('Debería obtener los centros vacacionales almacenadas', () => {

    const centroVacacionalBaseData: any[] = [{
      nombre: 'Parque Tayrona',
      descripcion: 'Aventúrate con tu familia',
      categoriaUsuarios: categoriaUsuariosDataMock,
      calendarios: calendarioDataMock,
      calendarioActivo: 3
    }];

    daoCentroVacacional.obtenerCentrosVacacionales.returns( Promise.resolve( centroVacacionalBaseData ) );

    return request( app.getHttpServer() ).get( '/centrosVacacionales' )
      .expect( HttpStatus.OK )
      .expect( centroVacacionalBaseData );
  });

  it('Debería fallar al intentar borrar un centro vacacional inexistente', async () => {

    // Arrange
    const centroVacacionalId = 1;

    repositorioCentroVacacional.existeCentroVacacional.returns( Promise.resolve( [[], 0]) );

    const response = await request( app.getHttpServer() )
      .delete( `/centrosVacacionales/${ centroVacacionalId }`)
      .expect( HttpStatus.NOT_FOUND );

    expect(response.body.message).toBe( `El centro vacacional {${ centroVacacionalId }} no existe` );
    expect(response.body.statusCode).toBe(HttpStatus.NOT_FOUND);
  });

  // it('Debería fallar al actualizar un centro vacacional que no existe', async () => {

  //   const centroVacacionalBaseData: ComandoActualizarCentroVacacional = {
  //     nombre: 'Parque Tayrona',
  //     descripcion: 'Aventúrate con tu familia',
  //     categoriaUsuarios: categoriaUsuariosDataMock,
  //     calendarios: calendarioDataMock,
  //     calendarioActivo: 3
  //   };

  //   const centroVacacionalId = 1;

  //   repositorioCentroVacacional.existeCentroVacacional.returns( Promise.resolve( [[],1]) );
    
  //   // Calendarios válidos ( Uno válido por ej )
  //   repositorioCalendarioFestivos.validarCalendarios.returns( Promise.resolve([[],1]) );
    
  //   // Categorías válidas ( Dos válidas por ej )
  //   repositorioCategoriaUsuarios.validarCategorias.returns( Promise.resolve([[],2]) );    

  //   const response = await request( app.getHttpServer() )
  //     .patch( `/centrosVacacionales/${ centroVacacionalId }`)
  //     .send( centroVacacionalBaseData )
  //     .expect( HttpStatus.NOT_FOUND );
  // }); 
});

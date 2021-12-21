import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { createStubObj } from '../../../util/create-object.stub';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { createSandbox, SinonStubbedInstance } from 'sinon';

import { AppLogger } from '../../../../src/infraestructura/configuracion/ceiba-logger.service';
import { FiltroExcepcionesDeNegocio } from '../../../../src/infraestructura/excepciones/filtro-excepciones-negocio';

// Generales
import { CalendarioFestivosControlador } from '../../../../src/infraestructura/calendariofestivos/controlador/calendariofestivos.controlador';
import { RepositorioCalendarioFestivos } from '../../../../src/dominio/calendariofestivos/puerto/repositorio/repositorio-calendariofestivos';

// Leer
import { DaoCalendarioFestivos } from '../../../../src/dominio/calendariofestivos/puerto/dao/dao-calendariofestivos';
import { ManejadorObtenerCalendarioFestivos } from '../../../../src/aplicacion/calendariofestivos/consulta/obtener-calendariofestivos.manejador';

// Guardar
import { ServicioGuardarCalendarioFestivos } from '../../../../src/dominio/calendariofestivos/servicio/servicio-guardar-calendariofestivos';
import { ManejadorGuardarCalendarioFestivos } from '../../../../src/aplicacion/calendariofestivos/comando/guardar-calendariofestivos.manejador';
import { servicioGuardarCalendarioFestivosProveedor } from '../../../../src/infraestructura/calendariofestivos/proveedor/servicio/servicio-guardar-calendariofestivos.proveedor';
import { ComandoGuardarCalendarioFestivos } from '../../../../src/aplicacion/calendariofestivos/comando/guardar-calendariofestivos.comando';

// Borrar
import { ServicioBorrarCalendarioFestivos } from '../../../../src/dominio/calendariofestivos/servicio/servicio-borrar-calendariofestivos';
import { ManejadorBorrarCalendarioFestivos } from '../../../../src/aplicacion/calendariofestivos/comando/borrar-calendariofestivos.manejador';
import { servicioBorrarCalendarioFestivosProveedor } from '../../../../src/infraestructura/calendariofestivos/proveedor/servicio/servicio-borrar-calendariofestivos.proveedor';

// Actualizar
import { ServicioActualizarCalendarioFestivos } from '../../../../src/dominio/calendariofestivos/servicio/servicio-actualizar-calendariofestivos';
import { ManejadorActualizarCalendarioFestivos } from '../../../../src/aplicacion/calendariofestivos/comando/actualizar-calendariofestivos.manejador';
import { servicioActualizarCalendarioFestivosProveedor } from '../../../../src/infraestructura/calendariofestivos/proveedor/servicio/servicio-actualizar-calendariofestivos.proveedor';
import { ComandoActualizarCalendarioFestivos } from '../../../../src/aplicacion/calendariofestivos/comando/actualizar-calendariofestivos.comando';


/**
 * Un sandbox es util cuando el módulo de nest se configura una sola vez durante el ciclo completo de pruebas
 * */
const sinonSandbox = createSandbox();

describe('Pruebas al controlador del calendario de festivos', () => {

  let app: INestApplication;
  let repositorioCalendarioFestivos: SinonStubbedInstance<RepositorioCalendarioFestivos>;
  let daoCalendarioFestivos: SinonStubbedInstance<DaoCalendarioFestivos>;

  /**
   * No Inyectar los módulos completos (Se trae TypeORM y genera lentitud al levantar la prueba, traer una por una las dependencias)
   **/
  beforeAll( async () => {

    repositorioCalendarioFestivos = createStubObj<RepositorioCalendarioFestivos>([
      'guardar',
      'actualizar',
      'borrar',
      'existeCalendario'
    ], sinonSandbox);
    daoCalendarioFestivos         = createStubObj<DaoCalendarioFestivos>(['obtener'], sinonSandbox);
    
    const moduleRef = await Test.createTestingModule({
      controllers: [ CalendarioFestivosControlador ],
      providers: [
        AppLogger,
        {
          provide:    ServicioGuardarCalendarioFestivos,
          inject:     [ RepositorioCalendarioFestivos ],
          useFactory: servicioGuardarCalendarioFestivosProveedor,
        },
        {
          provide:    ServicioActualizarCalendarioFestivos,
          inject:     [ RepositorioCalendarioFestivos ],
          useFactory: servicioActualizarCalendarioFestivosProveedor,
        },
        {
          provide:    ServicioBorrarCalendarioFestivos,
          inject:     [ RepositorioCalendarioFestivos ],
          useFactory: servicioBorrarCalendarioFestivosProveedor,
        },
        { provide: RepositorioCalendarioFestivos, useValue: repositorioCalendarioFestivos },
        { provide: DaoCalendarioFestivos, useValue: daoCalendarioFestivos },

        /**
         * CRUD Handlers
         */
        ManejadorGuardarCalendarioFestivos,
        ManejadorObtenerCalendarioFestivos,
        ManejadorActualizarCalendarioFestivos,
        ManejadorBorrarCalendarioFestivos
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

  it('Debería obtener los calendarios de festivos almacenados', () => {

    const calendariosFestivosMock: any[] = [{
      nombre: 'Campaña empleados Diciembre', // Nombre
      descripcion: 'Campaña para empleados aguinaldo navideño', // Descripción
      festivos: [ '2021-12-18' ] // Festivos
    }];

    daoCalendarioFestivos.obtener.returns( Promise.resolve( calendariosFestivosMock ) );

    return request( app.getHttpServer() ).get( '/calendariosFestivos' )
      .expect( HttpStatus.OK )
      .expect( calendariosFestivosMock );
  });

  it('Debería fallar al actualizar un calendario que no existe', async () => {

    // Arrange
    const calendariosFestivosMockBase: ComandoActualizarCalendarioFestivos = {
      nombre: 'Campaña empleados Diciembre', // Nombre
      descripcion: 'Campaña para empleados aguinaldo navideño', // Descripción
      festivos: [ '2021-12-18' ] // Festivos
    };

    const calendarioId = 1;

    const response = await request( app.getHttpServer() )
      .patch( `/calendariosFestivos/${ calendarioId }`)
      .send( calendariosFestivosMockBase )
      .expect( HttpStatus.NOT_FOUND );

    expect(response.body.message).toBe( `El calendario {${ calendarioId }} no existe` );
    expect(response.body.statusCode).toBe(HttpStatus.NOT_FOUND);
  });

  it('Debería fallar al borrar un calendario que no existe', async () => {

    // Arrange
    const calendarioId = 1;

    const response = await request( app.getHttpServer() )
      .delete( `/calendariosFestivos/${ calendarioId }`)
      .expect( HttpStatus.NOT_FOUND );

    expect(response.body.message).toBe( `El calendario {${ calendarioId }} no existe` );
    expect(response.body.statusCode).toBe(HttpStatus.NOT_FOUND);
  });


  it('Debería guardar un calendario de manera exitosa', async () => {

    const calendariosFestivosMock: ComandoGuardarCalendarioFestivos = {
      nombre: 'Campaña empleados Diciembre', // Nombre
      descripcion: 'Campaña para empleados aguinaldo navideño', // Descripción
      festivos: [ '2021-12-18' ] // Festivos
    };

    await request( app.getHttpServer() ).post('/calendariosFestivos')
      .send( calendariosFestivosMock )
      .expect( HttpStatus.CREATED );
  });  
});
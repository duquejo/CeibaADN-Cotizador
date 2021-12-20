import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { createStubObj } from '../../../util/create-object.stub';
import { HttpStatus, INestApplication, Body, HttpCode } from '@nestjs/common';
import { createSandbox, SinonStubbedInstance } from 'sinon';

import { AppLogger } from '../../../../src/infraestructura/configuracion/ceiba-logger.service';
import { FiltroExcepcionesDeNegocio } from '../../../../src/infraestructura/excepciones/filtro-excepciones-negocio';

// Generales
import { RepositorioCategoriaUsuarios } from '../../../../src/dominio/categoriausuarios/puerto/repositorio/repositorio-categoriausuarios';
import { CategoriaUsuariosControlador } from '../../../../src/infraestructura/categoriausuarios/controlador/categoriausuarios.controlador';

// Leer
import { DaoCategoriaUsuarios } from '../../../../src/dominio/categoriausuarios/puerto/dao/dao-categoriausuarios';
import { ManejadorObtenerCategoriaUsuarios } from '../../../../src/aplicacion/categoriausuarios/consulta/obtener-categoriausuarios.manejador';

// Guardar
import { ServicioGuardarCategoriaUsuarios } from '../../../../src/dominio/categoriausuarios/servicio/servicio-guardar-categoriausuarios';
import { ManejadorGuardarCategoriaUsuarios } from '../../../../src/aplicacion/categoriausuarios/comando/guardar-categoriausuarios.manejador';
import { servicioGuardarCategoriaUsuariosProveedor } from '../../../../src/infraestructura/categoriausuarios/proveedor/servicio/servicio-guardar-categoriausuarios.proveedor';
import { ComandoGuardarCategoriaUsuarios } from '../../../../src/aplicacion/categoriausuarios/comando/guardar-categoriausuarios.comando';

/**
 * Un sandbox es util cuando el módulo de nest se configura una sola vez durante el ciclo completo de pruebas
 * */
const sinonSandbox = createSandbox();

describe('Pruebas al controlador de las categorías de usuarios', () => {

  let app: INestApplication;
  let repositorioCategoriaUsuarios: SinonStubbedInstance<RepositorioCategoriaUsuarios>;
  let daoCategoriaUsuarios: SinonStubbedInstance<DaoCategoriaUsuarios>;

  /**
   * No Inyectar los módulos completos (Se trae TypeORM y genera lentitud al levantar la prueba, traer una por una las dependencias)
   **/
  beforeAll( async () => {

    repositorioCategoriaUsuarios = createStubObj<RepositorioCategoriaUsuarios>([
      'guardar', 
      'validarCategorias', 
      'existeCategoriaUsuarios',
      'obtenerUnaCategoriaUsuarios'
    ], sinonSandbox);

    daoCategoriaUsuarios         = createStubObj<DaoCategoriaUsuarios>(['obtenerCategoriaUsuarios'], sinonSandbox);
    
    const moduleRef = await Test.createTestingModule({
      controllers: [ CategoriaUsuariosControlador ],
      providers: [
        AppLogger,
        {
          provide:    ServicioGuardarCategoriaUsuarios,
          inject:     [ RepositorioCategoriaUsuarios ],
          useFactory: servicioGuardarCategoriaUsuariosProveedor,
        },
        { provide: RepositorioCategoriaUsuarios, useValue: repositorioCategoriaUsuarios },
        { provide: DaoCategoriaUsuarios, useValue: daoCategoriaUsuarios },

        /**
         * CRUD Handlers
         */
        ManejadorGuardarCategoriaUsuarios,
        ManejadorObtenerCategoriaUsuarios
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

  it('Debería obtener las categorías de usuario almacenadas', () => {

    const categoriaUsuariosMock: any[] = [{
      nombre: "Categoría de asociados 1",
      descripcion: "Plan de pruebas",
      valorAlta: 50000,
      valorBaja: 25000
    }];

    daoCategoriaUsuarios.obtenerCategoriaUsuarios.returns( Promise.resolve( categoriaUsuariosMock ) );

    return request( app.getHttpServer() ).get( '/categoriasUsuarios' )
      .expect( HttpStatus.OK )
      .expect( categoriaUsuariosMock );
  });

  it('Debería crear una categoría de usuarios de manera exitosa', async () => {

    const categoriaUsuariosMock: ComandoGuardarCategoriaUsuarios = {
      nombre: "Categoría de asociados 1",
      descripcion: "Plan de pruebas",
      valorAlta: 50000,
      valorBaja: 25000
    };

    const response = await request( app.getHttpServer() ).post('/categoriasUsuarios')
      .send( categoriaUsuariosMock )
      .expect( HttpStatus.CREATED );
  });
});

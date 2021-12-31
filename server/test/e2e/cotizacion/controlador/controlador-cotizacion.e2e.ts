import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { CalendarioFestivosBuilder, CategoriaUsuariosBuilder, CentroVacacionalBuilder, CotizacionBuilder } from '../../../util/test-builder';

describe('Cotizaciones (e2e)', () => {

  let app: INestApplication;
  let moduleFixture: TestingModule;

  // Arrange
  const _calendarioFestivos = new CalendarioFestivosBuilder( 'Campaña empleados Diciembre' )
  .setDescripcion( 'Campaña para empleados aguinaldo navideño' )
  .setFestivos( [ '2021-12-18' ] );

  const _categoriaUsuarios = new CategoriaUsuariosBuilder( 'Categoría de asociados de prueba', 50000, 45000 )
  .setDescripcion( 'Descripción de categoría de pruebas' );

  const _centroVacacional = new CentroVacacionalBuilder( 'Centro Vacacional de prueba' )
  .setDescripcion( 'Descripción de centro vacacional de prueba' );

  /**
   * Operaciones al inicial el ciclo de pruebas paralelas
   */
  beforeAll( async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [ AppModule ],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  /**
   * Operaciones al culminar el ciclo de pruebas paralelas
   */
  afterAll( async () => {
    await app.close();
  });

  it('Debería fallar al registrar si la cotización no tiene un formato válido', () => {
    return request( app.getHttpServer() )
    .post( `/cotizaciones` )
    .expect( HttpStatus.BAD_REQUEST );
  });

  it('Debería retornar 404 si no hay cotizaciones', () => {
    return request( app.getHttpServer() ).get( `/cotizaciones` )
    .expect( HttpStatus.NOT_FOUND );
  });  

  it('Debería retornar 404 si la cotización suministrada no existe', () => {
    // Arrange
    const cotizacionId = 10000;
    // Act & Assert
    return request( app.getHttpServer() ).get( `/cotizaciones/${ cotizacionId }` )
    .expect( ({ body }: request.Response ) => {
      expect( body ).toEqual({});
    })
    .expect( HttpStatus.OK );
  });

  it('Debería fallar si el centro vacacional a asignar no existe', () => {
    // Arrange
    const cotizacionId = 10000;
    // Act & Assert
    return request( app.getHttpServer() ).get( `/cotizaciones/${ cotizacionId }` )
    .expect( ({ body }: request.Response ) => {
      expect( body ).toEqual({});
    })
    .expect( HttpStatus.OK );
  });

  it('Debería guardar/obtener una cotización de manera exitosa', async () => {

    // Arrange
    /**
     * Seteo del Calendario Festivos
     */
    const { body: calendarioFestivosBody } = await request( app.getHttpServer() ).post( '/calendariosFestivos' )
    .set( 'Accept', 'application/json' )
    .send({
      nombre: _calendarioFestivos.nombre,
      descripcion: _calendarioFestivos.descripcion,
      festivos: _calendarioFestivos.festivos
    });
     
     /**
      * Seteo de las Categorías de Usuarios
      */
    const { body: categoriasUsuariosBody } = await request( app.getHttpServer() ).post( '/categoriasUsuarios' )
    .set( 'Accept', 'application/json' )
    .send({
      nombre: _categoriaUsuarios.nombre,
      descripcion: _categoriaUsuarios.descripcion,
      valorAlta: _categoriaUsuarios.valorAlta,
      valorBaja: _categoriaUsuarios.valorBaja
    });

    /**
     * Seteo del Centro Vacacional
     */
    const _centroVacacionalGuardar = new CentroVacacionalBuilder( _centroVacacional.nombre )
    .setDescripcion( _centroVacacional.descripcion )
    .setCalendarios( [ calendarioFestivosBody.id ] )
    .setCategoriasUsuarios( [ categoriasUsuariosBody.id ] );

    // Act & Assert
    const { body: centrosVacacionalesBody } = await request( app.getHttpServer() ).post( '/centrosVacacionales' )
    .set('Accept', 'application/json')
    .send({
      nombre: _centroVacacionalGuardar.nombre,
      descripcion: _centroVacacionalGuardar.descripcion,
      calendarios: _centroVacacionalGuardar.calendarios,
      categoriaUsuarios: _centroVacacionalGuardar.categoriasUsuarios
    });

    /**
     * Seteo Cotización
     */
    const _cotizacionGuardar = new CotizacionBuilder(
      centrosVacacionalesBody.id,
      categoriasUsuariosBody.id,
      3,
      '2021-12-15',
      '2021-12-19',
    );
    const { body: cotizacionBody } = await request( app.getHttpServer() ).post( '/cotizaciones' )
    .set('Accept', 'application/json')
    .send({
      centroVacacional: _cotizacionGuardar.centroVacacional,
      categoriaUsuarios: _cotizacionGuardar.categoriaUsuarios,
      personas: _cotizacionGuardar.personas,
      fechaInicio: _cotizacionGuardar.fechaInicio,
      fechaFin: _cotizacionGuardar.fechaFin
    })
    .expect( ({ body }: request.Response ) => {
      expect( body.codigo ).toBeDefined();
      expect( body.id ).toBeDefined();
      expect( body.personas ).toBe( _cotizacionGuardar.personas );
      expect( body.fechaCreacion ).toBeDefined();
      expect( body.fechaActualizacion ).toBeDefined();
      expect( body.categoriaUsuarios ).toBeDefined();
      expect( body.centroVacacional ).toBeDefined();
      expect( body.total ).toBeDefined();
    })
    .expect( HttpStatus.CREATED );

    // Assert: Debe obtenerse este resultado
    return request( app.getHttpServer() ).get( `/cotizaciones/${ cotizacionBody.id }` )
    .expect( ({ body }: request.Response ) => {
      expect( body.id ).toBe( cotizacionBody.id );
      expect( body.codigo ).toBe( cotizacionBody.codigo );
      expect( body.total ).toBe( cotizacionBody.total );
    })
    .expect( HttpStatus.OK );
  });
});

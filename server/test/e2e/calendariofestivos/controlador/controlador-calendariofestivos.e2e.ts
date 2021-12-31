import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { CalendarioFestivosEntidad } from '../../../../src/infraestructura/calendariofestivos/entidad/calendariofestivos.entidad';
import { CalendarioFestivosBuilder } from '../../../util/test-builder';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe('Calendario de festivos (e2e)', () => {

  let app: INestApplication;
  let moduleFixture: TestingModule;

  // Arrange
  const _calendarioFestivos = new CalendarioFestivosBuilder( 'Campaña empleados Diciembre' )
  .setDescripcion( 'Campaña para empleados aguinaldo navideño' )
  .setFestivos( [ '2021-12-18' ] );

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

  /**
   * Ejecuciones antes de cada iteración individual
   */
  beforeEach( async () => {
    const uncleared = await request( app.getHttpServer() ).get( '/calendariosFestivos' );
    await Promise.all(
      uncleared.body.map( async ( calendario: CalendarioFestivosEntidad ) => {
        return request( app.getHttpServer() ).delete( `/calendariosFestivos/${ calendario.id }` );
      }),
    );
  });

  it('Debería guardar un calendario de manera exitosa', () => {

    // Arrange
    const _calendarioFestivosGuardar = new CalendarioFestivosBuilder(
      'Campaña empleados Enero'
    )
    .setDescripcion( 'Campaña para empleados nuevo año' )
    .setFestivos( [ '2022-01-18' ] );

    /**
     * Act & Assert
     */
    return request( app.getHttpServer() ).post( '/calendariosFestivos' )
    .set( 'Accept', 'application/json' )
    .send({
      nombre: _calendarioFestivosGuardar.nombre,
      descripcion: _calendarioFestivosGuardar.descripcion,
      festivos: _calendarioFestivosGuardar.festivos
    })
    .expect( ({ body }: request.Response ) => {
      // Convert festivos to moment date
      _calendarioFestivosGuardar.setFestivosMoment();
      expect( body.id ).toBeDefined();
      expect( body.fechaCreacion ).toBeDefined();
      expect( body.fechaActualizacion ).toBeDefined();
      expect( body.nombre ).toBe( _calendarioFestivosGuardar.nombre );
      expect( body.descripcion ).toBe( _calendarioFestivosGuardar.descripcion );
      expect( body.festivos ).toEqual( _calendarioFestivosGuardar.festivos );
    })
    .expect( HttpStatus.CREATED )
  });

  it('Debería actualizar un calendario existente', async () => {

    // Arrange
    const { body } = await request( app.getHttpServer() ).post( '/calendariosFestivos' )
    .set( 'Accept', 'application/json' )
    .send({
      nombre: _calendarioFestivos.nombre,
      descripcion: _calendarioFestivos.descripcion,
      festivos: _calendarioFestivos.festivos
    });

    // Act & Assert
    return request( app.getHttpServer() )
    .patch( `/calendariosFestivos/${ body.id }`)
    .send({
      nombre: 'Calendario actualizado',
      descripcion: _calendarioFestivos.descripcion,
      festivos: _calendarioFestivos.festivos
    })
    .expect( HttpStatus.OK );
  });

  it('Debería fallar al actualizar un calendario que no existe', () => {
    // Arrange
    const calendarId = 100000;

    // Act & Assert
    return request( app.getHttpServer() )
    .patch( `/calendariosFestivos/${ calendarId }`)
    .send({
      nombre: _calendarioFestivos.nombre,
      descripcion: _calendarioFestivos.descripcion
    })
    .expect( HttpStatus.NOT_FOUND );
  });

  it('Debería obtener los calendarios de festivos almacenados con los valores por defecto', async () => {

    // Arrange
    await request( app.getHttpServer() ).post( '/calendariosFestivos' )
    .set( 'Accept', 'application/json' )
    .send({
      nombre: _calendarioFestivos.nombre,
      descripcion: _calendarioFestivos.descripcion,
      festivos: _calendarioFestivos.festivos
    });

    // 3A
    return request( app.getHttpServer() ).get( '/calendariosFestivos' )
    .expect( HttpStatus.OK )
    .expect( ({ body }: request.Response ) => {
      expect( body.length ).toBeGreaterThan(0);
    });
  });

  it('Debería obtener los calendarios de festivos almacenados a través de la paginación', async () => {
    
    // Arrange
    const page = 1;
    const limit = 2;
    await request( app.getHttpServer() ).post( '/calendariosFestivos' )
    .set( 'Accept', 'application/json' )
    .send({
      nombre: _calendarioFestivos.nombre,
      descripcion: _calendarioFestivos.descripcion,
      festivos: _calendarioFestivos.festivos
    });

    // Act & Assert    
    return request( app.getHttpServer() ).get( '/calendariosFestivos' )
    .query({ page, limit })
    .expect( HttpStatus.OK )
    .expect( ({ body }: request.Response ) => {
      expect( body.length ).toBeGreaterThan(0);
    });
  });

  it('Debería obtener un arreglo vacío si no hay resultados sobre una página al obtener los calendarios', () => {
    // Arrange
    const page = 3;
    const limit = 2; 

    // Act & Assert    
    return request( app.getHttpServer() ).get( '/calendariosFestivos' )
    .query({ page, limit })
    .expect( HttpStatus.OK )
    .expect( ({ body }: request.Response ) => {
      expect( body.length ).toBe(0);
      expect( body ).toEqual([]);
    });
  });  

  it('Debería borrar un calendario existente', async () => {
    // Arrange
    const { body } = await request( app.getHttpServer() ).post( '/calendariosFestivos' )
    .set( 'Accept', 'application/json' )
    .send({
      nombre: _calendarioFestivos.nombre,
      descripcion: _calendarioFestivos.descripcion,
      festivos: _calendarioFestivos.festivos
    });

    // Act & Assert
    return request( app.getHttpServer() )
    .delete( `/calendariosFestivos/${ body.id }`)
    .expect( HttpStatus.OK );
  });

  it('Debería fallar al borrar un calendario que no existe', () => {
    // Arrange
    const calendarId = 100000;

    // Act & Assert
    return request( app.getHttpServer() )
    .delete( `/calendariosFestivos/${ calendarId }`)
    .expect( HttpStatus.NOT_FOUND );
  });
});
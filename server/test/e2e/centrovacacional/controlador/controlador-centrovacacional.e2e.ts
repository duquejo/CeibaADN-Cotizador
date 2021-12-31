import * as request from 'supertest';
import { CentroVacacionalBuilder, CategoriaUsuariosBuilder, CalendarioFestivosBuilder } from '../../../util/test-builder';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { CalendarioFestivosEntidad } from '../../../../src/infraestructura/calendariofestivos/entidad/calendariofestivos.entidad';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';

describe('Centro Vacacional (e2e)', () => {

  let app: INestApplication;
  let moduleFixture: TestingModule;

  // Arrange
  const _calendarioFestivos = new CalendarioFestivosBuilder( 'Campaña empleados Diciembre' )
  .setDescripcion( 'Campaña para empleados aguinaldo navideño' )
  .setFestivos( [ '2021-12-18' ] );

  const _categoriaUsuarios = new CategoriaUsuariosBuilder( 'Categoría de asociados de prueba', 50000, 45000 )
  .setDescripcion( 'Descripción de categoría de pruebas' );

  const _centroVacacional = new CentroVacacionalBuilder( `Centro Vacacional de prueba ${ Date.now() }` )
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

  /**
   * Ejecuciones antes de cada iteración individual
   */
  afterEach( async () => {
    const uncleared = await request( app.getHttpServer() ).get( '/centrosVacacionales' );
    await Promise.all(
      uncleared.body.map( async ( centroVacacional: CalendarioFestivosEntidad ) => {
        return request( app.getHttpServer() ).delete( `/centrosVacacionales/${ centroVacacional.id }` );
      }),
    );
  });

  it('Debería permitir crear un centro vacacional con la información opcional', () => {

    // Arrange 
    const _centroVacacionalGuardar = new CentroVacacionalBuilder( _centroVacacional.nombre );

    // Act & Assert
    return request( app.getHttpServer() ).post( '/centrosVacacionales' )
    .set('Accept', 'application/json')
    .send({ nombre: _centroVacacionalGuardar.nombre })
    .expect( ({ body }: request.Response ) => {
      expect( body.nombre ).toBe( _centroVacacionalGuardar.nombre );
      expect( body.calendarios ).toBeUndefined();
      expect( body.categoriaUsuarios ).toBeUndefined();
      expect( body.calendarioActivo ).toBeNull();
    })
    .expect( HttpStatus.CREATED );
  }); 

  it('Debería obtener un arreglo vacío si no hay centros vacacionales', () => {
    return request( app.getHttpServer() ).get( `/centrosVacacionales` )
    .expect( ({ body }: request.Response ) => {
      expect( body ).toEqual([]);
    })
    .expect( HttpStatus.OK );    
  });  

  it('Debería fallar al crear un centro vacacional cuyo calendario no existe', () => {

    // Arrange 
    const _centroVacacionalGuardar = new CentroVacacionalBuilder( _centroVacacional.nombre )
    .setCalendarios( [ 1000, 1200 ] );

    // Act & Assert
    return request( app.getHttpServer() ).post( '/centrosVacacionales' )
    .set('Accept', 'application/json')
    .send({ 
      nombre: _centroVacacionalGuardar.nombre,
      calendarios: _centroVacacionalGuardar.calendarios
    })
    .expect( HttpStatus.UNPROCESSABLE_ENTITY );
  });

  it('Debería fallar al crear un centro vacacional cuya categoría de usuarios no existe', () => {

    // Arrange 
    const _centroVacacionalGuardar = new CentroVacacionalBuilder( _centroVacacional.nombre )
    .setCategoriasUsuarios( [ 2000, 4000 ] );

    // Act & Assert
    return request( app.getHttpServer() ).post( '/centrosVacacionales' )
    .set('Accept', 'application/json')
    .send({ 
      nombre: _centroVacacionalGuardar.nombre,
      categoriaUsuarios: _centroVacacionalGuardar.categoriasUsuarios
    })
    .expect( HttpStatus.UNPROCESSABLE_ENTITY );
  });

  it('Debería fallar al actualizar un centro vacacional que no existe', () => {
    // Arrange
    const centroVacacionalId = 10000;
    const _centroVacacionalActualizar = new CentroVacacionalBuilder( 'Centro vacacional modificado' );

    // Act & Assert
    return request( app.getHttpServer() )
    .patch( `/centrosVacacionales/${ centroVacacionalId }`)
    .send({
      nombre: _centroVacacionalActualizar.nombre
    })
    .expect( HttpStatus.NOT_FOUND );
  });

  it('Debería fallar al borrar un centro vacacional que no existe', () => {
    // Arrange
    const centroVacacionalId = 100000;

    // Act & Assert
    return request( app.getHttpServer() )
    .delete( `/centrosVacacionales/${ centroVacacionalId }`)
    .expect( HttpStatus.NOT_FOUND );
  });  

  it('Debería guardar/actualizar/obtener/borrar un centro vacacional de manera exitosa', async () => {

    // Arrange
    let centroVacacionalGuardarId: number;

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
    await request( app.getHttpServer() ).post( '/centrosVacacionales' )
    .set('Accept', 'application/json')
    .send({
      nombre: _centroVacacionalGuardar.nombre,
      descripcion: _centroVacacionalGuardar.descripcion,
      calendarios: _centroVacacionalGuardar.calendarios,
      categoriaUsuarios: _centroVacacionalGuardar.categoriasUsuarios,
      calendarioActivo: _centroVacacionalGuardar.calendarioActivo
    })
    .expect( ({ body }: request.Response ) => {
      // Asignación de ID para otra prueba local
      centroVacacionalGuardarId = body.id;

      expect( body.id ).toBeDefined();
      expect( body.fechaCreacion ).toBeDefined();
      expect( body.fechaActualizacion ).toBeDefined();
      expect( body.calendarios ).toBeDefined();
      expect( body.categoriaUsuarios ).toBeDefined();
      expect( body.calendarioActivo ).not.toBeNull();

      expect( body.nombre ).toBe( _centroVacacionalGuardar.nombre );
      expect( body.descripcion ).toBe( _centroVacacionalGuardar.descripcion );
    })
    .expect( HttpStatus.CREATED );

    // Assert: Debe impedir que se cree otro centro vacacional con el mismo nombre
    // Act & Assert
    await request( app.getHttpServer() ).post( '/centrosVacacionales' )
    .set('Accept', 'application/json')
    .send({ nombre: _centroVacacionalGuardar.nombre })
    .expect( HttpStatus.BAD_REQUEST );   
    
    // Act & Assert
    await request( app.getHttpServer() )
    .patch( `/centrosVacacionales/${ centroVacacionalGuardarId }`)
    .send({
      nombre: 'Centro vacacional de prueba actualizado'
    })
    .expect( HttpStatus.OK );

    // Assert: Debe obtenerse este resultado
    await request( app.getHttpServer() ).get( `/centrosVacacionales` )
    .expect( ({ body }: request.Response ) => {
      expect( body.length ).toBeGreaterThan(0);
    })
    .expect( HttpStatus.OK );

    // Assert: Debe borrar el centro vacacional de manera exitosa
    return request( app.getHttpServer() )
    .delete( `/centrosVacacionales/${ centroVacacionalGuardarId }`)
    .expect( HttpStatus.OK );
  });
});
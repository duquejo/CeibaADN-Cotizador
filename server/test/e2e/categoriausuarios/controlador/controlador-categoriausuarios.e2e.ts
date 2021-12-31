import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { CategoriaUsuariosBuilder } from '../../../util/test-builder';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { CategoriaUsuariosEntidad } from '../../../../src/infraestructura/categoriausuarios/entidad/categoriausuarios.entidad';

describe('Categoría de usuarios (e2e)', () => {

  let app: INestApplication;
  let moduleFixture: TestingModule

  // Arrange
  const _categoriaUsuarios = new CategoriaUsuariosBuilder(
    'Categoría de asociados de prueba', 
    50000, 
    45000
  )
  .setDescripcion( 'Descripción de categoría de pruebas' );

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
    const uncleared = await request( app.getHttpServer() ).get( '/categoriasUsuarios' );
    await Promise.all(
      uncleared.body.map( async ( categoria: CategoriaUsuariosEntidad ) => {
        return request( app.getHttpServer() ).delete( `/categoriasUsuarios/${ categoria.id }` );
      }),
    );
  });

  it('Debería guardar/obtener/borrar una categoría de usuarios de forma exitosa', async () => {

    // Arrange
    let categoriaGuardarId: number;

    // Act & Assert
    await request( app.getHttpServer() ).post( '/categoriasUsuarios' )
    .set('Accept', 'application/json')
    .send({
      nombre: _categoriaUsuarios.nombre,
      descripcion: _categoriaUsuarios.descripcion,
      valorAlta: _categoriaUsuarios.valorAlta,
      valorBaja: _categoriaUsuarios.valorBaja
    })
    .expect( ({ body }: request.Response ) => {

      // Almacenar ID para otras pruebas locales
      categoriaGuardarId = body.id;

      expect( body.id ).toBeDefined();
      expect( body.fechaCreacion ).toBeDefined();
      expect( body.fechaActualizacion ).toBeDefined();
      expect( body.nombre ).toBe( _categoriaUsuarios.nombre );
      expect( body.descripcion ).toBe( _categoriaUsuarios.descripcion );
      expect( body.valorAlta ).toBe( _categoriaUsuarios.valorAlta );
      expect( body.valorBaja ).toBe( _categoriaUsuarios.valorBaja );
    })
    .expect( HttpStatus.CREATED );

    // Assert: Debe obtener las categorías de usuarios almacenadas
    await request( app.getHttpServer() ).get( '/categoriasUsuarios' )
    .expect( ({ body }: request.Response ) => {
      expect( body.length ).toBeGreaterThan(0);
    })
    .expect( HttpStatus.OK );  
    
    // Assert: Debe borrar la categoría de usuarios de manera exitosa
    return request( app.getHttpServer() )
    .delete( `/categoriasUsuarios/${ categoriaGuardarId }`)
    .expect( HttpStatus.OK );    
  });
});
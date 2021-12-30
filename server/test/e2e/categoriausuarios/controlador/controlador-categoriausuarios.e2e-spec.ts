import * as request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { connection, app } from 'test/util/test-connection';
import { CategoriaUsuariosBuilder } from '../../../util/test-builder';

describe('Pruebas al controlador de categorías de usuarios', () => {

  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Debería guardar una categoría de usuarios de forma exitosa', () => {

    // Arrange
    const _categoriaUsuarios = new CategoriaUsuariosBuilder(
      'Categoría de asociados de prueba', 50000, 45000
    )
    .setDescripcion( 'Descripción de categoría de pruebas' );

    // Act & Assert
    return request( app ).post( '/categoriasUsuarios' )
    .set('Accept', 'application/json')
    .send({
      nombre: _categoriaUsuarios.nombre,
      descripcion: _categoriaUsuarios.descripcion,
      valorAlta: _categoriaUsuarios.valorAlta,
      valorBaja: _categoriaUsuarios.valorBaja
    })
    .expect( HttpStatus.CREATED )
    .expect( ({ body }: request.Response ) => {
      expect( body.id ).toBeDefined();
      expect( body.fechaCreacion ).toBeDefined();
      expect( body.fechaActualizacion ).toBeDefined();
      expect( body.nombre ).toBe( _categoriaUsuarios.nombre );
      expect( body.descripcion ).toBe( _categoriaUsuarios.descripcion );
      expect( body.valorAlta ).toBe( _categoriaUsuarios.valorAlta );
      expect( body.valorBaja ).toBe( _categoriaUsuarios.valorBaja );
    });
  });

  it('Debería obtener las categorías de usuarios almacenadas', () => {
    // Arrange & Act & Assert    
    return request( app ).get( '/categoriasUsuarios' )
    .expect( HttpStatus.OK )
    .expect( ({ body }: request.Response ) => {
      expect( body.length ).toBeGreaterThan(0);
    });
  });
});
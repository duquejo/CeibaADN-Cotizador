import * as request from 'supertest';
import { CentroVacacionalBuilder, CategoriaUsuariosBuilder, CalendarioFestivosBuilder } from '../../../util/test-builder';
import { HttpStatus } from '@nestjs/common';
import { axiosInstance } from '../../../../../client/src/app/core/config/AxiosConfig';
import { CategoriaUsuariosEntidad } from '../../../../src/infraestructura/categoriausuarios/entidad/categoriausuarios.entidad';
import { CalendarioFestivosEntidad } from '../../../../src/infraestructura/calendariofestivos/entidad/calendariofestivos.entidad';
import { CentroVacacionalEntidad } from '../../../../src/infraestructura/centrovacacional/entidad/centrovacacional.entidad';
import { connection, app } from 'test/util/test-connection';

describe('Pruebas al controlador de Centros Vacacionales', () => {

  let newCategory: CategoriaUsuariosEntidad;
  let newCalendar: CalendarioFestivosEntidad;
  let newCV: CentroVacacionalEntidad;

  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();  

    /**
     * 
     * Categoría de usuarios
     */
    const _categoriaUsuarios = new CategoriaUsuariosBuilder(
      'Categoría de asociados de prueba', 50000, 45000
    );

    try {
      const { data: respuestaCategoriaUsuarios } = await axiosInstance.post( 
        `${ app }/categoriasUsuarios`, {
        nombre: _categoriaUsuarios.nombre,
        valorAlta: _categoriaUsuarios.valorAlta,
        valorBaja: _categoriaUsuarios.valorBaja
      });
      newCategory = respuestaCategoriaUsuarios;  
    } catch (error) {
      throw new Error(`Error generando categoría de usuario de pruebas: ${ error }`);
    }

    /**
     * Calendarios
     */
    const _calendarioFestivos = new CalendarioFestivosBuilder(
      'Campaña empleados Diciembre'
    );

    try {
      const { data: respuestaCalendarioFestivos } = await axiosInstance.post( 
        `${ app }/calendariosFestivos`, {
        nombre: _calendarioFestivos.nombre
      });  
      newCalendar = respuestaCalendarioFestivos;
    } catch (error) {
      throw new Error(`Error generando calendario de pruebas: ${ error }`);
    }
    

    /**
     * 
     * Centro Vacacional
     */
     const _centroVacacional = new CentroVacacionalBuilder(
      'Categoría de asociados de prueba',
    )
    .setDescripcion( 'Descripción del centro vacacional de prueba' )
    .setCalendarios( [ newCalendar.id ] )
    .setCategoriasUsuarios( [ newCategory.id ] )
    .setCalendarioActivo( newCalendar.id );

    try {
      const { data: respuestaCentroVacacional } = await axiosInstance.post( 
        `${ app }/centrosVacacionales`, {
        nombre: _centroVacacional.nombre,
        descripcion: _centroVacacional.descripcion,
        calendarios: _centroVacacional.calendarios,
        categoriaUsuarios: _centroVacacional.categoriasUsuarios,
        calendarioActivo: _centroVacacional.calendarioActivo,
      });      
      newCV = respuestaCentroVacacional;
    } catch( error ) {
      throw new Error(`Error generando centro vacacional de prueba: ${ error }`);
    }
  });

  /**
   * @TODO falta obtener
   */
  it('Debería guardar un centro vacacional de manera exitosa', () => {

    // Arrange
    const _calendario = newCalendar;
    const _categoria = newCategory;
    const _centroVacacional = new CentroVacacionalBuilder(
      'Centro Vacacional de prueba'
    )
    .setDescripcion( 'Descripción del centro vacacional de prueba' )
    .setCalendarios( [ _calendario.id ] )
    .setCategoriasUsuarios( [ _categoria.id ] )
    .setCalendarioActivo( _calendario.id );

    // Act & Assert
    return request( app ).post( '/centrosVacacionales' )
    .set('Accept', 'application/json')
    .send({
      nombre: _centroVacacional.nombre,
      descripcion: _centroVacacional.descripcion,
      calendarios: _centroVacacional.calendarios,
      categoriaUsuarios: _centroVacacional.categoriasUsuarios,
      calendarioActivo: _centroVacacional.calendarioActivo,
    })
    .expect( ({ body }: request.Response ) => {
      expect( body.id ).toBeDefined();
      expect( body.fechaCreacion ).toBeDefined();
      expect( body.fechaActualizacion ).toBeDefined();
      expect( body.nombre ).toBe( _centroVacacional.nombre );
      expect( body.descripcion ).toBe( _centroVacacional.descripcion );
      expect( body.calendarios ).toEqual( [ _calendario ] );
      expect( body.categoriaUsuarios ).toEqual( [ _categoria ] );
      expect( body.calendarioActivo ).toBe( _centroVacacional.calendarioActivo );
    })
    .expect( HttpStatus.CREATED );
  });

  it('Debería guardar un centro vacacional asignando por calendario activo el primero si se envía null', () => {

    // Arrange
    const _calendario = newCalendar;
    const _categoria = newCategory;
    const _centroVacacional = new CentroVacacionalBuilder(
      'Centro vacacional de prueba con calendario activo asignado'
    )
    .setCalendarios( [ _calendario.id ] )
    .setCategoriasUsuarios( [ _categoria.id ] )

    // Act & Assert
    return request( app ).post( '/centrosVacacionales' )
    .set('Accept', 'application/json')
    .send({
      nombre: _centroVacacional.nombre,
      calendarios: _centroVacacional.calendarios,
      categoriaUsuarios: _centroVacacional.categoriasUsuarios
    })
    .expect( ({ body }: request.Response ) => {
      expect( body.nombre ).toBe( _centroVacacional.nombre );
      expect( body.calendarioActivo ).toBe( _calendario.id );
    })
    .expect( HttpStatus.CREATED );
  });

  it('Debería permitir crear un centro vacacional con la información opcional', () => {

    // Arrange 
    const _centroVacacional = new CentroVacacionalBuilder(
      'Centro vacacional de prueba con información por defecto'
    );

    // Act & Assert
    return request( app ).post( '/centrosVacacionales' )
    .set('Accept', 'application/json')
    .send({ nombre: _centroVacacional.nombre })
    .expect( ({ body }: request.Response ) => {
      expect( body.nombre ).toBe( _centroVacacional.nombre );
      expect( body.calendarioActivo ).toBeNull();
    })
    .expect( HttpStatus.CREATED );    
  });

  it('Debería fallar al intentar crear un centro vacacional con nombre existente', () => {

    // Arrange 
    const centroVacacionalExistente = newCV;
    const _centroVacacional = new CentroVacacionalBuilder(
      centroVacacionalExistente.nombre
    );

    // Act & Assert
    return request( app ).post( '/centrosVacacionales' )
    .set('Accept', 'application/json')
    .send({ nombre: _centroVacacional.nombre })
    .expect( HttpStatus.BAD_REQUEST );
  });  

  it('Debería fallar al crear un centro vacacional cuyo calendario no existe', () => {

    // Arrange 
    const _centroVacacional = new CentroVacacionalBuilder(
      'Centro vacacional de prueba con calendario que no existe'
    ).setCalendarios( [ 1000, 1200 ] );

    // Act & Assert
    return request( app ).post( '/centrosVacacionales' )
    .set('Accept', 'application/json')
    .send({ 
      nombre: _centroVacacional.nombre,
      calendarios: _centroVacacional.calendarios
    })
    .expect( HttpStatus.UNPROCESSABLE_ENTITY );
  });

  it('Debería fallar al crear un centro vacacional cuya categoría de usuarios no existe', () => {

    // Arrange 
    const newCentroVacacionalObj = newCV;
    const _centroVacacional = new CentroVacacionalBuilder(
      'Centro vacacional de prueba con categorías que no existen'
    ).setCategoriasUsuarios( [ 2000, 4000 ] );

    // Act & Assert
    return request( app ).post( '/centrosVacacionales' )
    .set('Accept', 'application/json')
    .send({ 
      nombre: _centroVacacional.nombre,
      categoriaUsuarios: _centroVacacional.categoriasUsuarios
    })
    .expect( HttpStatus.UNPROCESSABLE_ENTITY );
  });

  it('Debería actualizar un centro vacacional existente', () => {
    // Arrange
    const newCentroVacacionalObj = newCV;
    const _centroVacacional = new CentroVacacionalBuilder(
      'Centro vacacional modificado'
    );

    // Act & Assert
    return request( app )
    .patch( `/centrosVacacionales/${ newCentroVacacionalObj.id }`)
    .send({
      nombre: _centroVacacional.nombre
    })
    .expect( HttpStatus.OK );
  });

  it('Debería fallar al actualizar un centro vacacional que no existe', () => {
    // Arrange
    const centroVacacionalId = 10000;
    const _centroVacacional = new CentroVacacionalBuilder(
      'Centro vacacional de prueba con información por defecto'
    ).setNombre( 'Centro vacacional modificado' );

    // Act & Assert
    return request( app )
    .patch( `/centrosVacacionales/${ centroVacacionalId }`)
    .send({
      nombre: _centroVacacional.nombre
    })
    .expect( HttpStatus.NOT_FOUND );
  });

  it('Debería borrar un centro vacacional existente', () => {
    // Arrange
    const newCentroVacacionalObj = newCV;

    // Act & Assert
    return request( app )
    .delete( `/centrosVacacionales/${ newCentroVacacionalObj.id }`)
    .expect( HttpStatus.OK );
  });

  it('Debería fallar al borrar un centro vacacional que no existe', () => {
    // Arrange
    const centroVacacionalId = 100000;

    // Act & Assert
    return request( app )
    .delete( `/centrosVacacionales/${ centroVacacionalId }`)
    .expect( HttpStatus.NOT_FOUND );
  });
});
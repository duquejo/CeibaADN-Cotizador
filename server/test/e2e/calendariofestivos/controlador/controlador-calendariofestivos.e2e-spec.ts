import * as request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { CalendarioFestivosBuilder } from '../../../util/test-builder';
import { CalendarioFestivosEntidad } from '../../../../src/infraestructura/calendariofestivos/entidad/calendariofestivos.entidad';
import { axiosInstance } from '../../../../../client/src/app/core/config/AxiosConfig';
import { connection, app } from 'test/util/test-connection';

describe('Pruebas al controlador del calendario de festivos', () => {

  let newCalendar: CalendarioFestivosEntidad;
  beforeAll(async () => {
    await connection.create();
    await connection.clear();

    /**
     * Calendarios
     */
     const _calendarioFestivos = new CalendarioFestivosBuilder(
      'Campaña empleados Diciembre'
    )
    .setDescripcion( 'Campaña para empleados aguinaldo navideño' )
    .setFestivos( [ '2021-12-18', '2021-12-24' ] );

    const { data: respuestaCalendarioFestivos } = await axiosInstance.post( 
      `${ app }/calendariosFestivos`, {
      nombre: _calendarioFestivos.nombre,
      descripcion: _calendarioFestivos.descripcion,
      festivos: _calendarioFestivos.festivos
    });  
    newCalendar = respuestaCalendarioFestivos;     
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Debería guardar un calendario de manera exitosa', () => {

    // Arrange
    const _calendarioFestivos = new CalendarioFestivosBuilder(
      'Campaña empleados Diciembre'
    )
    .setDescripcion( 'Campaña para empleados aguinaldo navideño' )
    .setFestivos( [ '2021-12-18' ] );

    // Act & Assert
    return request( app ).post( '/calendariosFestivos' )
    .set('Accept', 'application/json')
    .send({
      nombre: _calendarioFestivos.nombre,
      descripcion: _calendarioFestivos.descripcion,
      festivos: _calendarioFestivos.festivos
    })
    .expect( HttpStatus.CREATED )
    .expect( ({ body }: request.Response ) => {
      // Convert festivos to moment date
      _calendarioFestivos.setFestivosMoment();

      expect( body.id ).toBeDefined();
      expect( body.fechaCreacion ).toBeDefined();
      expect( body.fechaActualizacion ).toBeDefined();
      expect( body.nombre ).toBe( _calendarioFestivos.nombre );
      expect( body.descripcion ).toBe( _calendarioFestivos.descripcion );
      expect( body.festivos ).toEqual( _calendarioFestivos.festivos );
    });
  });

  // it('Debería actualizar un calendario existente', () => {
  //   // Arrange
  //   const calendarObj = newCalendar;
  //   const _calendarioFestivos = new CalendarioFestivosBuilder(
  //     'Campaña empleados Enero'
  //   );

  //   // Act & Assert
  //   return request( app )
  //   .patch( `/calendariosFestivos/${ calendarObj.id }`)
  //   .send({
  //     nombre: _calendarioFestivos.nombre,
  //     descripcion: _calendarioFestivos.descripcion,
  //     festivos: _calendarioFestivos.festivos
  //   })
  //   .expect( HttpStatus.OK );
  // });

  // it('Debería fallar al actualizar un calendario que no existe', () => {
  //   // Arrange
  //   const calendarId = 100000;
  //   const _calendarioFestivos = new CalendarioFestivosBuilder(
  //     'Campaña empleados Enero'
  //   )
  //   .setDescripcion( 'Campaña de nuevo año Enero' );

  //   // Act & Assert
  //   return request( app )
  //   .patch( `/calendariosFestivos/${ calendarId }`)
  //   .send({
  //     nombre: _calendarioFestivos.nombre,
  //     descripcion: _calendarioFestivos.descripcion
  //   })
  //   .expect( HttpStatus.NOT_FOUND );
  // });

  // it('Debería obtener los calendarios de festivos almacenados con los valores por defecto', () => {
  //   // Arrange & Act & Assert    
  //   return request( app ).get( '/calendariosFestivos' )
  //   .expect( HttpStatus.OK )
  //   .expect( ({ body }: request.Response ) => {
  //     expect( body.length ).toBeGreaterThan(0);
  //   });
  // });

  // it('Debería obtener los calendarios de festivos almacenados a través de la paginación', () => {
  //   // Arrange
  //   const page = 1;
  //   const limit = 2;

  //   // Act & Assert    
  //   return request( app ).get( '/calendariosFestivos' )
  //   .query({ page, limit })
  //   .expect( HttpStatus.OK )
  //   .expect( ({ body }: request.Response ) => {
  //     expect( body.length ).toBeGreaterThan(0);
  //   });
  // });

  // it('Debería obtener un arreglo vacío si no hay resultados sobre una página al obtener los calendarios', () => {
  //   // Arrange
  //   const page = 3;
  //   const limit = 2;

  //   // Act & Assert    
  //   return request( app ).get( '/calendariosFestivos' )
  //   .query({ page, limit })
  //   .expect( HttpStatus.OK )
  //   .expect( ({ body }: request.Response ) => {
  //     expect( body.length ).toBe(0);
  //     expect( body ).toEqual([]);
  //   });    
  // });  

  // it('Debería borrar un calendario existente', () => {
  //   // Arrange
  //   const deleteCalendarObj = newCalendar;

  //   // Act & Assert
  //   return request( app )
  //   .delete( `/calendariosFestivos/${ deleteCalendarObj.id }`)
  //   .expect( HttpStatus.OK );
  // });

  // it('Debería fallar al borrar un calendario que no existe', () => {
  //   // Arrange
  //   const calendarId = 100000;

  //   // Act & Assert
  //   return request( app )
  //   .delete( `/calendariosFestivos/${ calendarId }`)
  //   .expect( HttpStatus.NOT_FOUND );
  // });
});
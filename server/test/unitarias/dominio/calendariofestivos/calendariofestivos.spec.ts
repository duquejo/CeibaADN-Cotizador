import * as moment from 'moment';

import { CalendarioFestivos } from '../../../../src/dominio/calendariofestivos/modelo/calendariofestivos';
import { ErrorFechaInvalida } from '../../../../src/dominio/errores/error-fecha-invalida';
import { CalendarioFestivosBuilder } from '../../../util/test-builder';

describe('Calendario Festivos', () => {

  const _CalendarioFestivos = CalendarioFestivos as any;
  
  const calendarioTestData = {
    nombre: 'Campaña empleados Diciembre', // Nombre
    descripcion: 'Campaña para empleados aguinaldo navideño', // Descripción
    festivos: [ '2021-12-18' ] // Festivos
  };

  it('Calendario festivos debería crear bien', () => {
    
    // Arrange & Act
    const _calendario: CalendarioFestivos = new CalendarioFestivosBuilder( 
      calendarioTestData.nombre 
    )
    .setDescripcion( calendarioTestData.descripcion )
    .setFestivos( calendarioTestData.festivos )
    .build();

    // Assert
    expect( _calendario.nombre ).toBe( calendarioTestData.nombre );
    expect( _calendario.descripcion ).toBe( calendarioTestData.descripcion );
    expect( _calendario.festivos[0] ).toEqual( moment( calendarioTestData.festivos[0] ).format() );
  });

  it('Calendario festivos debería crear bien mapeando multiples fechas', () => {

    // Arrange
    const festivosPlanos = [ '2021-12-16', '2021-12-24', '2021-12-31' ];
    const festivosFormatted = festivosPlanos.map( festivo => ( moment( festivo ).format() ) );

    // Act
    const _calendario: CalendarioFestivos = new CalendarioFestivosBuilder(
      calendarioTestData.nombre
    )
    .setDescripcion( calendarioTestData.descripcion )
    .setFestivos( festivosPlanos )
    .build();    

    // Assert
    expect( calendarioTestData.nombre ).toBe( _calendario.nombre );
    expect( calendarioTestData.descripcion ).toBe( _calendario.descripcion );
    expect( festivosFormatted ).toEqual( _calendario.festivos );
  });

  it('Calendario festivos debería crear bien sin festivos', () => {

    // Arrange & Act
    const _calendario: CalendarioFestivos = new CalendarioFestivosBuilder(
      calendarioTestData.nombre
    )
    .setDescripcion( calendarioTestData.descripcion )
    .build(); 

    // Assert
    expect( _calendario.nombre ).toBe( calendarioTestData.nombre );
    expect( _calendario.descripcion ).toBe( calendarioTestData.descripcion );
    expect( _calendario.festivos ).toEqual([]);
  });  

  it('Calendario festivos debería fallar si la fecha no es válida', () => {
    
    // 3A
    const bisiesto = [ '2020-02-30' ];
    return expect( async () => {

        const _calendario: CalendarioFestivos = new CalendarioFestivosBuilder(
          calendarioTestData.nombre
        )
        .setFestivos( bisiesto )
        .build();
        
        return _calendario;
      } )
      .rejects
      .toStrictEqual( new ErrorFechaInvalida( `{${ bisiesto[0] }} no es una fecha válida` ));
  });

  it('Calendario festivos debería crearlo con los valores por defecto', () => {

    const nombre = 'Campaña Septiembre 2022';
    // Arrange & Act
    const _calendario: CalendarioFestivos = new CalendarioFestivosBuilder(
      nombre
    ).build();

    // Assert
    expect( _calendario.nombre ).toEqual( nombre );
    expect( _calendario.descripcion ).toBe('');
    expect( _calendario.festivos ).toEqual([]);
  });  
});

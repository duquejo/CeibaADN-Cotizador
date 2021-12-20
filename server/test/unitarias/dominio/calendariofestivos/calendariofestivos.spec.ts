import * as moment from 'moment';

import { CalendarioFestivos } from '../../../../src/dominio/calendariofestivos/modelo/calendariofestivos';
import { ErrorFechaInvalida } from '../../../../src/dominio/errores/error-fecha-invalida';

describe('Calendario Festivos', () => {

  const _CalendarioFestivos = CalendarioFestivos as any;
  
  const calendarioTestData = {
    nombre: 'Campaña empleados Diciembre', // Nombre
    descripcion: 'Campaña para empleados aguinaldo navideño', // Descripción
    festivos: [ '2021-12-18' ] // Festivos
  };

  it('Calendario festivos debería crear bien', () => {
    
    // Arrange
    const calendarioTestValues = Object.values( calendarioTestData );

    // Act
    const calendarioFestivos = new _CalendarioFestivos( ...calendarioTestValues );
    
    // Assert
    expect( calendarioFestivos.nombre ).toEqual( calendarioTestData.nombre );
    expect( calendarioFestivos.descripcion ).toEqual( calendarioTestData.descripcion );
    expect( calendarioFestivos.festivos[0] ).toEqual( moment( calendarioTestData.festivos[0] ).format() );
  });

  it('Calendario festivos debería crear bien mapeando multiples fechas', () => {

    // Arrange
    const multipleFestivoCalendario = {
      ...calendarioTestData,
      festivos: [ '2021-12-16', '2021-12-24', '2021-12-31' ]
    };
    const multipleFestivoCalendarioValues = Object.values( multipleFestivoCalendario );
    const festivosFormatted = multipleFestivoCalendario.festivos.map( festivo => ( moment( festivo ).format() ) );

    // Act
    const calendarioFestivos = new _CalendarioFestivos( ...multipleFestivoCalendarioValues );

    // Assert
    expect( multipleFestivoCalendario.nombre ).toEqual( calendarioFestivos.nombre );
    expect( multipleFestivoCalendario.descripcion ).toEqual( calendarioFestivos.descripcion );
    expect( festivosFormatted ).toEqual( calendarioFestivos.festivos );
  });

  it('Calendario festivos debería crear bien sin festivos', () => {

    // Arrange
    const calendarioCopia = Object.assign( {}, calendarioTestData );
    delete calendarioCopia.festivos;
    const calendarioCopiaValues = Object.values( calendarioCopia );

    // Act
    const calendarioFestivos = new _CalendarioFestivos( ...calendarioCopiaValues );

    // Assert
    expect( calendarioCopia.nombre ).toEqual( calendarioFestivos.nombre );
    expect( calendarioCopia.descripcion ).toEqual( calendarioFestivos.descripcion );
    expect( calendarioFestivos.festivos ).toEqual([]);
  });  

  it('Calendario festivos debería fallar si la fecha no es válida', () => {

    // Arrange
    const festivoCalendarioErroneo = {
      ...calendarioTestData,
      festivos: [ '2020-02-30' ] // Bisiesto
    };
    const calendarioCopiaValues = Object.values( festivoCalendarioErroneo );

    // Act & Assert
    return expect( async () => new _CalendarioFestivos( ...calendarioCopiaValues ) )
          .rejects
          .toStrictEqual( new ErrorFechaInvalida( `{${ festivoCalendarioErroneo.festivos[0] }} no es una fecha válida` ));
  });

  it('Calendario festivos debería crearlo con los valores por defecto', () => {

    // Arrange
    const calendarioSinParametros = {
      nombre: 'Campaña Septiembre 2022'
    };
    
    // Act
    const calendarioFestivos = new _CalendarioFestivos( ...Object.values( calendarioSinParametros ) );

    // Assert
    expect( calendarioFestivos.nombre ).toEqual( calendarioSinParametros.nombre );
    expect( calendarioFestivos.descripcion ).toBe('');
    expect( calendarioFestivos.festivos ).toEqual([]);
  });  
});

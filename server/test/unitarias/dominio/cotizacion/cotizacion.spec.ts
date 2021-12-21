import * as moment from 'moment';
import { constantes } from 'src/dominio/shared/constantes.enum';

import { Cotizacion } from '../../../../src/dominio/cotizacion/modelo/cotizacion';
import { ErrorFechaInvalida } from '../../../../src/dominio/errores/error-fecha-invalida';
import { ErrorValorRequerido } from '../../../../src/dominio/errores/error-valor-requerido';

import { CentroVacacionalEntidad } from '../../../../src/infraestructura/centrovacacional/entidad/centrovacacional.entidad';
import { CategoriaUsuariosEntidad } from '../../../../src/infraestructura/categoriausuarios/entidad/categoriausuarios.entidad';
import { ErrorCotizacionInvalida } from '../../../../src/dominio/errores/error-cotizacion-invalida';


describe('Cotizaciones', () => {

  const _Cotizacion = Cotizacion as any;
  
  const cotizacionDataTest = {
    centroVacacional: 1,
    categoriaUsuarios: 2,
    personas: 3,
    fechaInicio: '2021-12-10',
    fechaFin: '2021-12-18'
  };

  const centroVacacionalDataMock = {
    calendarioActivo: 1,
    calendarios: [{
      id: 1,
      festivos: [
        "2021-12-18"
      ]
    }]
  } as CentroVacacionalEntidad;

  const categoriaUsuariosDataMock = {
    nombre: "Menor a $800.000 COP",
    descripcion: "Cartagena",
    valorAlta: 50000,
    valorBaja: 25000
  } as CategoriaUsuariosEntidad;  

  it( 'La base de la cotización debería crear bien', () => {
    
    // Arrange
    const cotizacionValues = Object.values( cotizacionDataTest );

    // Act
    const cotizacion = new _Cotizacion( ...cotizacionValues );
    
    // Assert
    expect( cotizacion.centroVacacional ).toBe( cotizacionDataTest.centroVacacional );
    expect( cotizacion.categoriaUsuarios ).toBe( cotizacionDataTest.categoriaUsuarios );
    expect( cotizacion.personas ).toBe( cotizacionDataTest.personas );

    expect( cotizacion.fechaInicio ).toBe( moment( cotizacionDataTest.fechaInicio ).format() );
    expect( cotizacion.fechaFin ).toBe( moment( cotizacionDataTest.fechaFin ).format() );

  });

  it('La base de la cotización debería fallar si no se proveen las fechas', () => {
    // 3A
    return expect( async () => new _Cotizacion() )
          .rejects
          .toStrictEqual( new ErrorValorRequerido( `Debes proporcionar una fecha` ) );
  });

  it('La cotización debería validar que la fecha inicial sea inferior que la fecha final', () => {

    // Arrange
    const cotizacionDataTestCopia = Object.assign( {}, cotizacionDataTest );

    cotizacionDataTestCopia.fechaInicio = '2021-12-10';
    cotizacionDataTestCopia.fechaFin = '2021-10-18';

    const cotizacionDataTestCopiaValues = Object.values( cotizacionDataTestCopia );

    // Act & Assert
    return expect( async () => new _Cotizacion( ...cotizacionDataTestCopiaValues ) )
          .rejects
          .toStrictEqual( new ErrorFechaInvalida( `{${ moment( cotizacionDataTestCopia.fechaFin ).format( constantes.FORMATO_FECHA ) }} debe ser mayor que {${ moment( cotizacionDataTestCopia.fechaInicio ).format( constantes.FORMATO_FECHA ) }}` ) );
  });

  it('La cotización debería aceptar solo el formato \'YYYY-MM-DD\'', () => {

    // Arrange
    const cotizacionDataTestCopia = Object.assign( {}, cotizacionDataTest );
    cotizacionDataTestCopia.fechaInicio = '1-10-1998';
    const cotizacionDataTestCopiaValues = Object.values( cotizacionDataTestCopia );

    // Act & Assert
    return expect( async () => new _Cotizacion( ...cotizacionDataTestCopiaValues ) )
          .rejects
          .toStrictEqual( new ErrorFechaInvalida( `{${ cotizacionDataTestCopia.fechaInicio }} no es una fecha válida` ) );
  });

  it('La cotización debería aceptar solo el formato \'YYYY-MM-DD\'', () => {

    // Arrange
    const cotizacionDataTestCopia = Object.assign( {}, cotizacionDataTest );
    cotizacionDataTestCopia.fechaInicio = '1-10-1998';
    const cotizacionDataTestCopiaValues = Object.values( cotizacionDataTestCopia );

    // Act & Assert
    return expect( async () => new _Cotizacion( ...cotizacionDataTestCopiaValues ) )
          .rejects
          .toStrictEqual( new ErrorFechaInvalida( `{${ cotizacionDataTestCopia.fechaInicio }} no es una fecha válida` ) );
  });

  it('Cotización debería tener disponible el método calcularCotizacion', () => {

    // Arrange
    const cotizacionValues = Object.values( cotizacionDataTest );

    // Act
    const cotizacion = new _Cotizacion( ...cotizacionValues );

    // Assert
    const spy = jest.spyOn( cotizacion, 'calcularCotizacion' ).mockImplementation( () => '' );
    expect( cotizacion.calcularCotizacion() ).toBe('');
    expect( cotizacion.calcularCotizacion ).toHaveBeenCalledTimes(1);
    spy.mockRestore(); // Clear mock
  });

  it('Cotización debería validar si el calendario está disponible para el cálculo', () => {

    // Arrange 
    const cotizacionValues = Object.values( cotizacionDataTest );
    const centroVacacionalSinCalendarios = Object.assign( {}, centroVacacionalDataMock );
    delete centroVacacionalSinCalendarios.calendarios;

    // Act
    const cotizacion = new _Cotizacion( ...cotizacionValues );

    return expect( async () => cotizacion.calcularCotizacion(
      centroVacacionalSinCalendarios,
      categoriaUsuariosDataMock
    ) )
    .rejects
    .toStrictEqual( new ErrorCotizacionInvalida( `El centro vacacional no tiene calendarios disponibles en el momento` ) );
  });

  it('Cotización debería validar si el centro vacacional tiene un calendario activo', () => {

    // Arrange 
    const cotizacionValues = Object.values( cotizacionDataTest );
    const centroVacacionalSinCalendarioActivo = Object.assign( {}, centroVacacionalDataMock );
    centroVacacionalSinCalendarioActivo.calendarioActivo = undefined;

    // Act
    const cotizacion = new _Cotizacion( ...cotizacionValues );

    return expect( async () => cotizacion.calcularCotizacion(
      centroVacacionalSinCalendarioActivo,
      categoriaUsuariosDataMock
    ) )
    .rejects
    .toStrictEqual( new ErrorCotizacionInvalida( `El centro vacacional no tiene calendarios disponibles en el momento` ) );
  });

  it('Cotización debería calcular el valor correspondiente a partir de toda la información entregada', () => {

    // Arrange 
    const cotizacionValues = Object.values( cotizacionDataTest );

    // Act
    const cotizacion = new _Cotizacion( ...cotizacionValues );

    const totalCotizacion = cotizacion.calcularCotizacion(
      centroVacacionalDataMock,
      categoriaUsuariosDataMock
    );
    
    // Assert
    expect( typeof totalCotizacion.diasBaja ).toBe( 'number' );
    expect( typeof totalCotizacion.diasAlta ).toBe( 'number' );
    expect( typeof totalCotizacion.diasTotales ).toBe( 'number' );
    expect( typeof totalCotizacion.totalBaja ).toBe( 'number' );
    expect( typeof totalCotizacion.totalAlta ).toBe( 'number' );
    expect( typeof totalCotizacion.totalIndividual ).toBe( 'number' );
    expect( typeof totalCotizacion.totalGrupo ).toBe( 'number' );
    expect( typeof totalCotizacion.fechaDeInicio ).toBe( 'string' );
    expect( typeof totalCotizacion.fechaDeFin ).toBe( 'string' );
    
    /**
     * Valor alta 50000
     * Valor baja 25000
     * 
     * Fecha Inicial 2021-12-10
     * Fecha Final 2021-12-18
     * Festivo 2021-12-18
     * 
     * Personas 3
     * 
     * 9 días en total
     * 1 día alta
     * 8 días baja
     * 
     * 8 x 25000 = 200000 ( Total baja )
     * 1 x 50000 = 500000 ( Total alta )
     * 
     * 250000 * 3 = 750000 (Total grupo)
     */
    expect( totalCotizacion.totalGrupo ).toBe( 750000 );
  });

  it('Cotización debería calcular los días de alta y baja de manera efectiva', () => {

    // Arrange 
    let diasAlta = 0;

    const fechaInicio = cotizacionDataTest.fechaInicio; 
    const fechaFin = cotizacionDataTest.fechaFin;

    const momFechaInicio: moment.Moment = moment( fechaInicio, constantes.FORMATO_FECHA ),
        momFechaFin:    moment.Moment = moment( fechaFin, constantes.FORMATO_FECHA );

    const cotizacionValues = Object.values( cotizacionDataTest );

    // días alta check
    centroVacacionalDataMock.calendarios[0].festivos.forEach( festivo => {
      const momFestivo  = moment( festivo, constantes.FORMATO_FECHA );
      const rangoFechas = moment( momFestivo ).isBetween( momFechaInicio, momFechaFin, undefined, '[]' );
      if( rangoFechas ) {
        diasAlta++;
      }
    });
  

    // Act
    const cotizacion = new _Cotizacion( ...cotizacionValues );

    const totalCotizacion = cotizacion.calcularCotizacion(
      centroVacacionalDataMock,
      categoriaUsuariosDataMock
    );
    
    // Assert
    expect( diasAlta ).toBe( totalCotizacion.diasAlta );
    expect( ( totalCotizacion.diasTotales - diasAlta ) ).toBe(totalCotizacion.diasBaja);

    /**
     * Valor alta 50000
     * Valor baja 25000
     * 
     * Fecha Inicial 2021-12-10
     * Fecha Final 2021-12-18
     * Festivo 2021-12-18
     * 
     * Personas 3
     * 
     * 9 días en total
     * 1 día alta
     * 8 días baja
     * 
     * 8 x 25000 = 200000 ( Total baja )
     * 1 x 50000 = 500000 ( Total alta )
     * 
     * 250000 * 3 = 750000 (Total grupo)
     */
    expect( totalCotizacion.totalGrupo ).toBe( 750000 );
  });
});
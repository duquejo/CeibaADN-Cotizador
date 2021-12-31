import * as moment from 'moment';
import { constantes } from 'src/dominio/shared/constantes.enum';

import { Cotizacion } from '../../../../src/dominio/cotizacion/modelo/cotizacion';
import { ErrorFechaInvalida } from '../../../../src/dominio/errores/error-fecha-invalida';
import { ErrorValorRequerido } from '../../../../src/dominio/errores/error-valor-requerido';

import { CentroVacacionalEntidad } from '../../../../src/infraestructura/centrovacacional/entidad/centrovacacional.entidad';
import { CategoriaUsuariosEntidad } from '../../../../src/infraestructura/categoriausuarios/entidad/categoriausuarios.entidad';
import { ErrorCotizacionInvalida } from '../../../../src/dominio/errores/error-cotizacion-invalida';
import { CotizacionBuilder } from '../../../util/test-builder';


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
    const _cotizacion: Cotizacion = new CotizacionBuilder( 
      cotizacionDataTest.centroVacacional,
      cotizacionDataTest.categoriaUsuarios,
      cotizacionDataTest.personas,
      cotizacionDataTest.fechaInicio,
      cotizacionDataTest.fechaFin
    )
    .build();
    
    // Assert
    expect( _cotizacion.centroVacacional ).toBe( cotizacionDataTest.centroVacacional );
    expect( _cotizacion.categoriaUsuarios ).toBe( cotizacionDataTest.categoriaUsuarios );
    expect( _cotizacion.personas ).toBe( cotizacionDataTest.personas );
    expect( _cotizacion.fechaInicio ).toBe( moment( cotizacionDataTest.fechaInicio ).format() );
    expect( _cotizacion.fechaFin ).toBe( moment( cotizacionDataTest.fechaFin ).format() );
  });

  it('La base de la cotización debería fallar si no se proveen las fechas', () => {
    // 3A
    return expect( async () => {
      return new CotizacionBuilder( 
        cotizacionDataTest.centroVacacional,
        cotizacionDataTest.categoriaUsuarios,
        cotizacionDataTest.personas,
        cotizacionDataTest.fechaInicio,
        cotizacionDataTest.fechaFin
      )
      .setFechaInicio('')
      .setFechaFin('')
      .build();  
    })
    .rejects
    .toStrictEqual( new ErrorValorRequerido( `Debes proporcionar una fecha` ) );
  });

  it('La cotización debería validar que la fecha inicial sea inferior que la fecha final', () => {

    // Arrange
    const nuevaFechaInicio = '2021-12-10';
    const nuevaFechaFin = '2021-10-18';

    // Act & Assert
    return expect( async () => {
      return new CotizacionBuilder( 
        cotizacionDataTest.centroVacacional,
        cotizacionDataTest.categoriaUsuarios,
        cotizacionDataTest.personas,
        cotizacionDataTest.fechaInicio,
        cotizacionDataTest.fechaFin
      )
      .setFechaInicio( nuevaFechaInicio )
      .setFechaFin( nuevaFechaFin )
      .build();
    })
    .rejects
    .toStrictEqual( new ErrorFechaInvalida( 
      `{${ moment( nuevaFechaFin ).format( constantes.FORMATO_FECHA ) }} debe ser mayor que {${ moment( nuevaFechaInicio ).format( constantes.FORMATO_FECHA ) }}`
    ) );
  });

  it('La cotización debería aceptar solo el formato \'YYYY-MM-DD\'', () => {

    // Arrange
    const nuevaFechaInicio = '1-10-1998';

    // Act & Assert
    return expect( async () => {
      return new CotizacionBuilder( 
        cotizacionDataTest.centroVacacional,
        cotizacionDataTest.categoriaUsuarios,
        cotizacionDataTest.personas,
        cotizacionDataTest.fechaInicio,
        cotizacionDataTest.fechaFin
      )
      .setFechaInicio( nuevaFechaInicio )
      .build();      
    })
    .rejects
    .toStrictEqual( new ErrorFechaInvalida( `{${ nuevaFechaInicio }} no es una fecha válida` ) );
  });

  it('Cotización debería tener disponible el método calcularCotizacion', () => {

    // Arrange & Act
    const _cotizacion: Cotizacion = new CotizacionBuilder( 
      cotizacionDataTest.centroVacacional,
      cotizacionDataTest.categoriaUsuarios,
      cotizacionDataTest.personas,
      cotizacionDataTest.fechaInicio,
      cotizacionDataTest.fechaFin
    )
    .build();

    // Assert
    expect( _cotizacion.calcularCotizacion ).toBeDefined();
  });

  it('Cotización debería validar si el calendario está disponible para el cálculo', () => {

    // Arrange 
    const centroVacacionalSinCalendarios = Object.assign( {}, centroVacacionalDataMock );
    delete centroVacacionalSinCalendarios.calendarios;

    // Act
    const _cotizacion: Cotizacion = new CotizacionBuilder( 
      cotizacionDataTest.centroVacacional,
      cotizacionDataTest.categoriaUsuarios,
      cotizacionDataTest.personas,
      cotizacionDataTest.fechaInicio,
      cotizacionDataTest.fechaFin
    )
    .build();

    // Assert
    return expect( async () => _cotizacion.calcularCotizacion(
      centroVacacionalSinCalendarios,
      categoriaUsuariosDataMock
    ))
    .rejects
    .toStrictEqual( new ErrorCotizacionInvalida( `El centro vacacional no tiene calendarios disponibles en el momento` ) );
  });

  it('Debería validarse la cotización si el centro vacacional tiene un calendario activo', () => {

    // Arrange
    const centroVacacionalSinCalendarioActivo = Object.assign( {}, centroVacacionalDataMock );
    centroVacacionalSinCalendarioActivo.calendarioActivo = undefined;

    // Act
    const _cotizacion: Cotizacion = new CotizacionBuilder( 
      cotizacionDataTest.centroVacacional,
      cotizacionDataTest.categoriaUsuarios,
      cotizacionDataTest.personas,
      cotizacionDataTest.fechaInicio,
      cotizacionDataTest.fechaFin
    )
    .build();

    return expect( async () => _cotizacion.calcularCotizacion(
      centroVacacionalSinCalendarioActivo,
      categoriaUsuariosDataMock
    ) )
    .rejects
    .toStrictEqual( new ErrorCotizacionInvalida( `El centro vacacional no tiene calendarios disponibles en el momento` ) );
  });

  it('Debería calcularse el valor de la cotización a partir de toda la información suministrada', () => {

    // Arrange & Act
    const _cotizacion: Cotizacion = new CotizacionBuilder( 
      cotizacionDataTest.centroVacacional,
      cotizacionDataTest.categoriaUsuarios,
      cotizacionDataTest.personas,
      cotizacionDataTest.fechaInicio,
      cotizacionDataTest.fechaFin
    )
    .setPersonas( 5 )
    .setCentroVacacional( cotizacionDataTest.centroVacacional )
    .setCategoriaUsuarios( cotizacionDataTest.categoriaUsuarios )
    .build();

    const totalCotizacion = _cotizacion.calcularCotizacion(
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
    expect( totalCotizacion.totalGrupo ).toBe( 1250000 );
  });

  it('Debería calcularse efectivamente una cotización si los días de alta y baja son suministrados', () => {

    // Arrange 
    let diasAlta = 0;

    const _cotizacion: Cotizacion = new CotizacionBuilder( 
      cotizacionDataTest.centroVacacional,
      cotizacionDataTest.categoriaUsuarios,
      cotizacionDataTest.personas,
      cotizacionDataTest.fechaInicio,
      cotizacionDataTest.fechaFin
    )
    .build();

    const momFechaInicio: moment.Moment = moment( 
      _cotizacion.fechaInicio, 
      constantes.FORMATO_FECHA
    );

    const momFechaFin: moment.Moment = moment( 
      _cotizacion.fechaFin, 
      constantes.FORMATO_FECHA 
    );

    // días alta check
    centroVacacionalDataMock.calendarios[0].festivos.forEach( festivo => {
      const momFestivo  = moment( festivo, constantes.FORMATO_FECHA );
      const rangoFechas = moment( momFestivo ).isBetween( 
        momFechaInicio, 
        momFechaFin, 
        undefined, 
        '[]'
      );

      if( rangoFechas ) {
        diasAlta++;
      }
    });

    // Act
    const totalCotizacion = _cotizacion.calcularCotizacion(
      centroVacacionalDataMock,
      categoriaUsuariosDataMock
    );
    
    // Assert
    expect( diasAlta ).toBe( totalCotizacion.diasAlta );
    expect( ( totalCotizacion.diasTotales - diasAlta ) ).toBe( totalCotizacion.diasBaja );
  });
});
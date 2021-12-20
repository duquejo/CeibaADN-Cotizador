import { createStubObj } from '../../../util/create-object.stub';
import { NotFoundException } from '@nestjs/common';
import { SinonStubbedInstance } from 'sinon';

import { Cotizacion } from '../../../../src/dominio/cotizacion/modelo/cotizacion';
import { ICotizacion } from '../../../../src/dominio/cotizacion/modelo/interface.cotizacion';
import { ServicioCrearCotizacion } from '../../../../src/dominio/cotizacion/servicio/servicio-registrar-cotizacion';

import { CentroVacacionalEntidad } from '../../../../src/infraestructura/centrovacacional/entidad/centrovacacional.entidad';
import { CategoriaUsuariosEntidad } from '../../../../src/infraestructura/categoriausuarios/entidad/categoriausuarios.entidad';

import { RepositorioCotizacion } from '../../../../src/dominio/cotizacion/puerto/repositorio/repositorio-cotizacion';
import { RepositorioCentroVacacional } from '../../../../src/dominio/centrovacacional/puerto/repositorio/repositorio-centrovacacional';
import { RepositorioCategoriaUsuarios } from '../../../../src/dominio/categoriausuarios/puerto/repositorio/repositorio-categoriausuarios';

describe('ServicioCrearCotizacion', () => {

  const _Cotizacion = Cotizacion as any;

  let servicioCrearCotizacion: ServicioCrearCotizacion;

  /**
   * Repositorios
   */  
  let repositorioCotizacionStub: SinonStubbedInstance<RepositorioCotizacion>;  
  let repositorioCentroVacacionalStub: SinonStubbedInstance<RepositorioCentroVacacional>;
  let repositorioCategoriaUsuariosStub: SinonStubbedInstance<RepositorioCategoriaUsuarios>;
  
  const cotizacionDataTest = {
    cotizacion: 1,
    categoriaUsuarios: 2,
    personas: 3,
    fechaInicio: '2021-12-10',
    fechaFin: '2021-12-18'
  };

  const centroVacacionalDataMock = {
    calendarios: [{
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

  beforeEach(() => {
    
    // Stub Repository Methods
    repositorioCotizacionStub = createStubObj<RepositorioCotizacion>([ 
      'crear'
    ]);
    repositorioCentroVacacionalStub = createStubObj<RepositorioCentroVacacional>([
      'obtenerUnCentroVacacional'
    ]);
    repositorioCategoriaUsuariosStub = createStubObj<RepositorioCategoriaUsuarios>([
      'obtenerUnaCategoriaUsuarios'
    ]);

    // Re-instanciate service
    servicioCrearCotizacion = new ServicioCrearCotizacion( 
      repositorioCotizacionStub,
      repositorioCentroVacacionalStub,
      repositorioCategoriaUsuariosStub
    );
  });

  it( 'La cotización debería registrarse si el centro vacacional es válido y existe', async () => {

    // Arrange
    const cotizacionValues = Object.values( cotizacionDataTest );
    const cotizacion = new _Cotizacion( ...cotizacionValues );

    // Centro vacacional es inválido o no existe
    repositorioCentroVacacionalStub.obtenerUnCentroVacacional.returns( Promise.resolve( undefined ) );

    /**
     * Act & Assert
     * Send any number & class {Cotizacion} Object
     */
    await expect( servicioCrearCotizacion.ejecutar( cotizacion ) )
      .rejects
      .toThrowError( NotFoundException );
  });

  it( 'Un cotización debería registrarse si la categoría de usuarios es válida y existe', async () => {

    // Arrange
    const cotizacionValues = Object.values( cotizacionDataTest );
    const cotizacion = new _Cotizacion( ...cotizacionValues );

    // Centro vacacional válido y existente
    repositorioCentroVacacionalStub.obtenerUnCentroVacacional.returns( Promise.resolve( centroVacacionalDataMock ) );

    // Categoría es inválida o no existe
    repositorioCategoriaUsuariosStub.obtenerUnaCategoriaUsuarios.returns( Promise.resolve( undefined ) );

    /**
     * Act & Assert
     * Send any number & class {Cotizacion} Object
     */
    await expect( servicioCrearCotizacion.ejecutar( cotizacion ) )
      .rejects
      .toThrowError( NotFoundException );
  });  

  it( 'Un cotización debería registrarse en el repositorio si están dadas todas las condiciones', async () => {

    // Arrange
    const cotizacionValues = Object.values( cotizacionDataTest );
    const cotizacion = new _Cotizacion( ...cotizacionValues );


    const categoriaUsuarios = new CategoriaUsuariosEntidad();

    // Centro vacacional válido y existente
    repositorioCentroVacacionalStub.obtenerUnCentroVacacional.returns( Promise.resolve( centroVacacionalDataMock ) );

    // Categoría es inválida o no existe
    repositorioCategoriaUsuariosStub.obtenerUnaCategoriaUsuarios.returns( Promise.resolve( categoriaUsuariosDataMock ) );

    const resultado: ICotizacion = cotizacion.calcularCotizacion(
      centroVacacionalDataMock,
      categoriaUsuariosDataMock,
      cotizacionDataTest.personas,
      cotizacionDataTest.fechaInicio,
      cotizacionDataTest.fechaFin
    );

    /**
     * Act
     * Send any number & class {Cotizacion} Object
     */
    await servicioCrearCotizacion.ejecutar( cotizacion );

    // Assert
    expect( repositorioCentroVacacionalStub.obtenerUnCentroVacacional.getCalls().length ).toBe(1);
    expect( repositorioCategoriaUsuariosStub.obtenerUnaCategoriaUsuarios.getCalls().length ).toBe(1);
    expect( repositorioCotizacionStub.crear.getCalls().length ).toBe(1);
    expect( repositorioCotizacionStub.crear.calledWith( cotizacion, resultado )).toBeTruthy();
  });     
});
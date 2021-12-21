import { createStubObj } from '../../../util/create-object.stub';
import { BadRequestException, UnprocessableEntityException } from '@nestjs/common';
import { SinonStubbedInstance } from 'sinon';

import { CentroVacacional } from '../../../../src/dominio/centrovacacional/modelo/centrovacacional';
import { ServicioGuardarCentroVacacional } from '../../../../src/dominio/centrovacacional/servicio/servicio-guardar-centrovacacional';

import { RepositorioCentroVacacional } from '../../../../src/dominio/centrovacacional/puerto/repositorio/repositorio-centrovacacional';
import { RepositorioCalendarioFestivos } from '../../../../src/dominio/calendariofestivos/puerto/repositorio/repositorio-calendariofestivos';
import { RepositorioCategoriaUsuarios } from '../../../../src/dominio/categoriausuarios/puerto/repositorio/repositorio-categoriausuarios';


describe('ServicioGuardarCentroVacacional', () => {

  const _CentroVacacional = CentroVacacional as any;

  let servicioGuardaCentroVacacional: ServicioGuardarCentroVacacional;

  /**
   * Repositorios
   */  
  let repositorioCentroVacacionalStub: SinonStubbedInstance<RepositorioCentroVacacional>;  
  let repositorioCalendarioFestivosStub: SinonStubbedInstance<RepositorioCalendarioFestivos>;
  let repositorioCategoriaUsuariosStub: SinonStubbedInstance<RepositorioCategoriaUsuarios>;
  
  const centroVacacionalBaseData = {
    nombre: 'Parque Tayrona',
    descripcion: 'Aventúrate con tu familia',
    calendarios: [ 3, 5, 7 ],
    categoriaUsuarios: [ 1, 2, 3],
    calendarioActivo: 3
  };

  beforeEach(() => {
    
    // Stub Repository Methods
    repositorioCentroVacacionalStub = createStubObj<RepositorioCentroVacacional>([ 
      'existeNombreCentroVacacional',
      'guardar'
    ]);
    repositorioCalendarioFestivosStub = createStubObj<RepositorioCalendarioFestivos>([
      'validarCalendarios'
    ]);
    repositorioCategoriaUsuariosStub = createStubObj<RepositorioCategoriaUsuarios>([
      'validarCategorias'
    ]);    

    // Re-instanciate service
    servicioGuardaCentroVacacional = new ServicioGuardarCentroVacacional( 
      repositorioCentroVacacionalStub,
      repositorioCategoriaUsuariosStub,
      repositorioCalendarioFestivosStub
    );
  });

  it( 'Un centro vacacional debería no guardarse en el repositorio si su nombre existe', async () => {

    // Arrange
    const centroVacacionalValues = Object.values( centroVacacionalBaseData );
    const centroVacacional = new _CentroVacacional( ...centroVacacionalValues );

    repositorioCentroVacacionalStub.existeNombreCentroVacacional.returns( Promise.resolve( true ) );

    /**
     * Act & Assert
     * Send any number & class {CentroVacacional} Object
     */
    await expect( servicioGuardaCentroVacacional.ejecutar( centroVacacional ) )
      .rejects
      .toThrowError( BadRequestException );
  });

  it( 'Un centro vacacional no debería guardarse en el repositorio si todos los calendarios que serán asignados no existen', async () => {

    // Arrange
    const centroVacacionalValues = Object.values( centroVacacionalBaseData );
    const centroVacacional = new _CentroVacacional( ...centroVacacionalValues );

    // Nombre válido
    repositorioCentroVacacionalStub.existeNombreCentroVacacional.returns( Promise.resolve( false ) );
    
    // Calendarios válidos
    repositorioCalendarioFestivosStub.validarCalendarios.returns( Promise.resolve([[],0]));

    /**
     * Act & Assert
     * Send any number & class {CentroVacacional} Object
     */
    await expect( servicioGuardaCentroVacacional.ejecutar( centroVacacional ) )
      .rejects
      .toThrowError( UnprocessableEntityException );
  });   

  it( 'Un centro vacacional no debería guardarse en el repositorio si todas las categorías de usuarios que serán asignadas no existen', async () => {

    // Arrange
    const centroVacacionalValues = Object.values( centroVacacionalBaseData );
    const centroVacacional = new _CentroVacacional( ...centroVacacionalValues );

    // Nombre válido
    repositorioCentroVacacionalStub.existeNombreCentroVacacional.returns( Promise.resolve( false ) );
    
    // Calendarios válidos
    repositorioCalendarioFestivosStub.validarCalendarios.returns( Promise.resolve([[],1]) );
    
    // Calendarios válidos
    repositorioCategoriaUsuariosStub.validarCategorias.returns( Promise.resolve([[],0]) );

    /**
     * Act & Assert
     * Send any number & class {CentroVacacional} Object
     */
    await expect( servicioGuardaCentroVacacional.ejecutar( centroVacacional ) )
      .rejects
      .toThrowError( UnprocessableEntityException );     
  });    

  it( 'Un centro vacacional debería guardarse en el repositorio si están dadas todas las condiciones', async () => {

    // Arrange
    const centroVacacionalValues = Object.values( centroVacacionalBaseData );
    const centroVacacional = new _CentroVacacional( ...centroVacacionalValues );

    // Nombre válido
    repositorioCentroVacacionalStub.existeNombreCentroVacacional.returns( Promise.resolve( false ) );
    
    // Calendarios válidos ( Uno válido por ej )
    repositorioCalendarioFestivosStub.validarCalendarios.returns( Promise.resolve([[],1]) );
    
    // Categorías válidas ( Dos válidas por ej )
    repositorioCategoriaUsuariosStub.validarCategorias.returns( Promise.resolve([[],2]) );

    /**
     * Act
     * Send any number & class {CentroVacacional} Object
     */
    await servicioGuardaCentroVacacional.ejecutar( centroVacacional );

    // Assert
    expect( repositorioCentroVacacionalStub.existeNombreCentroVacacional.getCalls().length ).toBe(1);
    expect( repositorioCalendarioFestivosStub.validarCalendarios.getCalls().length ).toBe(1);
    expect( repositorioCategoriaUsuariosStub.validarCategorias.getCalls().length ).toBe(1);
    expect( repositorioCentroVacacionalStub.guardar.getCalls().length ).toBe(1);

    expect( repositorioCentroVacacionalStub.guardar.calledWith( centroVacacional )).toBeTruthy();
  });     
});
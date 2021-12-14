import { SinonStubbedInstance } from 'sinon';
import { NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { createStubObj } from '../../../util/create-object.stub';

import { CentroVacacional } from '../../../../src/dominio/centrovacacional/modelo/centrovacacional';
import { ServicioActualizarCentroVacacional } from '../../../../src/dominio/centrovacacional/servicio/servicio-actualizar-centrovacacional';

import { RepositorioCentroVacacional } from '../../../../src/dominio/centrovacacional/puerto/repositorio/repositorio-centrovacacional';
import { RepositorioCalendarioFestivos } from '../../../../src/dominio/calendariofestivos/puerto/repositorio/repositorio-calendariofestivos';
import { RepositorioCategoriaUsuarios } from '../../../../src/dominio/categoriausuarios/puerto/repositorio/repositorio-categoriausuarios';


RepositorioCalendarioFestivos
describe('ServicioActualizarCentroVacacional', () => {

  const _CentroVacacional = CentroVacacional as any;

  let servicioActualizarCentroVacacional: ServicioActualizarCentroVacacional;

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
    categoriaUsuarios: [ 1, 3, 5 ],
    calendarioActivo: 3
  };

  const centroVacacionalTestId = 1;  

  beforeEach(() => {

    // Stub Repository Methods
    repositorioCentroVacacionalStub = createStubObj<RepositorioCentroVacacional>([
      'existeCentroVacacional',
      'actualizar'
    ]);
    repositorioCalendarioFestivosStub = createStubObj<RepositorioCalendarioFestivos>([
      'validarCalendarios'
    ]);
    repositorioCategoriaUsuariosStub = createStubObj<RepositorioCategoriaUsuarios>([
      'validarCategorias'
    ]);

    // Re-instanciate service for every test
    servicioActualizarCentroVacacional = new ServicioActualizarCentroVacacional(
      repositorioCentroVacacionalStub,
      repositorioCategoriaUsuariosStub,
      repositorioCalendarioFestivosStub
    );

  });

  it( 'Un centro vacacional no debería actualizarse en el repositorio si no existe', async () => {

    // Arrange
    const centroVacacionalValues = Object.values( centroVacacionalBaseData );
    const centroVacacional = new _CentroVacacional( ...centroVacacionalValues );

    repositorioCentroVacacionalStub.existeCentroVacacional.returns( Promise.resolve([[],0]));

    /**
     * Act & Assert
     * Send any number & class {CentroVacacional} Object
     */
    await expect( servicioActualizarCentroVacacional.ejecutar( centroVacacionalTestId, centroVacacional ) )
      .rejects
      .toThrowError( NotFoundException );
  });

  it( 'Un centro vacacional no debería actualizarse en el repositorio si todos los calendarios que serán asignados no existen', async () => {

    // Arrange
    const centroVacacionalValues = Object.values( centroVacacionalBaseData );
    const centroVacacional = new _CentroVacacional( ...centroVacacionalValues );

    // Existe el Centro Vacacional ( Dos válidos )
    repositorioCentroVacacionalStub.existeCentroVacacional.returns( Promise.resolve([[], 2 ]));
    
    // Calendarios válidos
    repositorioCalendarioFestivosStub.validarCalendarios.returns( Promise.resolve([[], 0]));

    /**
     * Act & Assert
     * Send any number & class {CentroVacacional} Object
     */
    await expect( servicioActualizarCentroVacacional.ejecutar( centroVacacionalTestId, centroVacacional ) )
      .rejects
      .toThrowError( UnprocessableEntityException );
  });


  it( 'Un centro vacacional no debería actualizarse en el repositorio si todas las categorías de usuarios que serán asignadas no existen', async () => {

    // Arrange
    const centroVacacionalValues = Object.values( centroVacacionalBaseData );
    const centroVacacional = new _CentroVacacional( ...centroVacacionalValues );

    // Existe el Centro Vacacional ( Dos válidos )
    repositorioCentroVacacionalStub.existeCentroVacacional.returns( Promise.resolve([[],2]) );
    
    // Calendarios válidos
    repositorioCalendarioFestivosStub.validarCalendarios.returns( Promise.resolve([[],1]) );
    
    // Categorías válidos
    repositorioCategoriaUsuariosStub.validarCategorias.returns( Promise.resolve([[],0]) );

    /**
     * Act & Assert
     * Send any number & class {CentroVacacional} Object
     */
    await expect( servicioActualizarCentroVacacional.ejecutar( centroVacacionalTestId, centroVacacional ) )
      .rejects
      .toThrowError( UnprocessableEntityException );     
  });  

  it( 'Un centro vacacional debería actualizarse en el repositorio si están dadas todas las condiciones', async () => {

    // Arrange
    const centroVacacionalValues = Object.values( centroVacacionalBaseData );
    const centroVacacional = new _CentroVacacional( ...centroVacacionalValues );

    // Existe el Centro Vacacional ( Dos válidos por ej )
    repositorioCentroVacacionalStub.existeCentroVacacional.returns( Promise.resolve([[],2]) );
    
    // Calendarios válidos ( Uno válido por ej )
    repositorioCalendarioFestivosStub.validarCalendarios.returns( Promise.resolve([[],1]) );
    
    // Categorías válidas ( Dos válidas por ej )
    repositorioCategoriaUsuariosStub.validarCategorias.returns( Promise.resolve([[],1]) );

    /**
     * Act
     * Send any number & class {CentroVacacional} Object
     */
    await servicioActualizarCentroVacacional.ejecutar( centroVacacionalTestId, centroVacacional );

    // Assert
    expect( repositorioCentroVacacionalStub.existeCentroVacacional.getCalls().length ).toBe(1);
    expect( repositorioCalendarioFestivosStub.validarCalendarios.getCalls().length ).toBe(1);
    expect( repositorioCategoriaUsuariosStub.validarCategorias.getCalls().length ).toBe(1);
    expect( repositorioCentroVacacionalStub.actualizar.getCalls().length ).toBe(1);

    expect( repositorioCentroVacacionalStub.actualizar.calledWith( centroVacacionalTestId, centroVacacional )).toBeTruthy();
  });
});
import { SinonStubbedInstance } from 'sinon';
import { NotFoundException } from '@nestjs/common';
import { createStubObj } from '../../../util/create-object.stub';

import { ServicioBorrarCentroVacacional } from '../../../../src/dominio/centrovacacional/servicio/servicio-borrar-centrovacacional';

import { RepositorioCentroVacacional } from '../../../../src/dominio/centrovacacional/puerto/repositorio/repositorio-centrovacacional';
import { RepositorioCalendarioFestivos } from '../../../../src/dominio/calendariofestivos/puerto/repositorio/repositorio-calendariofestivos';
import { RepositorioCategoriaUsuarios } from '../../../../src/dominio/categoriausuarios/puerto/repositorio/repositorio-categoriausuarios';

describe('ServicioBorrarCentroVacacional', () => {

  let servicioBorrarCentroVacacional: ServicioBorrarCentroVacacional;

  /**
   * Repositorios
   */  
  let repositorioCentroVacacionalStub: SinonStubbedInstance<RepositorioCentroVacacional>;

  beforeEach(() => {

    // Stub Repository Methods
    repositorioCentroVacacionalStub = createStubObj<RepositorioCentroVacacional>([
      'existeCentroVacacional',
      'borrar'
    ]);   

    // Re-instanciate service
    servicioBorrarCentroVacacional = new ServicioBorrarCentroVacacional( 
      repositorioCentroVacacionalStub
    );
  });

  it( 'Un centro vacacional no debería borrarse en el repositorio si no existe', async () => {

    // Arrange
    const calendarioId = 1;
    repositorioCentroVacacionalStub.existeCentroVacacional.returns( Promise.resolve([[],0]));

    /**
     * Act & Assert
     * Send any number
     */
    await expect( servicioBorrarCentroVacacional.ejecutar( calendarioId ) )
      .rejects
      .toThrowError( NotFoundException );
  });

  it( 'Un centro vacacional debería borrarse en el repositorio si existe', async () => {

    // Arrange
    const calendarioId = 1;
    repositorioCentroVacacionalStub.existeCentroVacacional.returns( Promise.resolve([[],1]));

    /**
     * Act
     * Send any number & class {CentroVacacional} Object
     */
    await servicioBorrarCentroVacacional.ejecutar( calendarioId );

    // Assert
    expect( repositorioCentroVacacionalStub.borrar.getCalls().length ).toBe(1);
    expect( repositorioCentroVacacionalStub.borrar.calledWith( calendarioId )).toBeTruthy();
  });
});
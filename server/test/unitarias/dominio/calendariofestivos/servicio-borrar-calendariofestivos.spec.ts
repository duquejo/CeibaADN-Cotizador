import { SinonStubbedInstance } from 'sinon';
import { NotFoundException } from '@nestjs/common';
import { createStubObj } from '../../../util/create-object.stub';

import { CalendarioFestivos } from '../../../../src/dominio/calendariofestivos/modelo/calendariofestivos';
import { RepositorioCalendarioFestivos } from '../../../../src/dominio/calendariofestivos/puerto/repositorio/repositorio-calendariofestivos';
import { ServicioBorrarCalendarioFestivos } from '../../../../src/dominio/calendariofestivos/servicio/servicio-borrar-calendariofestivos';


describe('ServicioBorrarCalendarioFestivos', () => {

  const _CalendarioFestivos = CalendarioFestivos as any;

  let servicioBorrarCalendarioFestivos: ServicioBorrarCalendarioFestivos;
  let repositorioCalendarioFestivosStub: SinonStubbedInstance<RepositorioCalendarioFestivos>;

  beforeEach(() => {

    // Stub Repository Methods
    repositorioCalendarioFestivosStub = createStubObj<RepositorioCalendarioFestivos>([
      'existeCalendario',
      'borrar'
    ]);

    // Re-instanciate service
    servicioBorrarCalendarioFestivos = new ServicioBorrarCalendarioFestivos( repositorioCalendarioFestivosStub );
  });

  it( 'Un calendario de festivos no debería borrarse en el repositorio si no existe', async () => {

    // Arrange
    const calendarioId = 1;
    repositorioCalendarioFestivosStub.existeCalendario.returns( Promise.resolve( false ) );

    /**
     * Act & Assert
     * Send any number
     */
    await expect( servicioBorrarCalendarioFestivos.ejecutar( calendarioId ) )
      .rejects
      .toThrowError( NotFoundException );
  });

  it( 'Un calendario de festivos debería borrarse en el repositorio si existe', async () => {

    // Arrange
    const calendarioId = 1;
    repositorioCalendarioFestivosStub.existeCalendario.returns( Promise.resolve( true ) );

    /**
     * Act
     * Send any number & class {CalendarioFestivos} Object
     */
    await servicioBorrarCalendarioFestivos.ejecutar( calendarioId );

    // Assert
    expect( repositorioCalendarioFestivosStub.borrar.getCalls().length ).toBe(1);
    expect( repositorioCalendarioFestivosStub.borrar.calledWith( calendarioId )).toBeTruthy();
  });
});
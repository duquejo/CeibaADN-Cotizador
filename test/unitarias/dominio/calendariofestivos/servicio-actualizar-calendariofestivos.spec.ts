import { SinonStubbedInstance } from 'sinon';
import { NotFoundException } from '@nestjs/common';
import { createStubObj } from '../../../util/create-object.stub';

import { CalendarioFestivos } from '../../../../src/dominio/calendariofestivos/modelo/calendariofestivos';
import { ServicioActualizarCalendarioFestivos } from '../../../../src/dominio/calendariofestivos/servicio/servicio-actualizar-calendariofestivos';
import { RepositorioCalendarioFestivos } from '../../../../src/dominio/calendariofestivos/puerto/repositorio/repositorio-calendariofestivos';


describe('ServicioActualizarCalendarioFestivos', () => {

  const _CalendarioFestivos = CalendarioFestivos as any;

  let servicioActualizarCalendarioFestivos: ServicioActualizarCalendarioFestivos;
  let repositorioCalendarioFestivosStub: SinonStubbedInstance<RepositorioCalendarioFestivos>;
  
  const calendarioTestData = {
    nombre: 'Campaña empleados Diciembre', // Nombre
    descripcion: 'Campaña para empleados aguinaldo navideño', // Descripción
    festivos: [ '2021-12-18' ] // Festivos
  };

  beforeEach(() => {

    // Stub Repository Methods
    repositorioCalendarioFestivosStub = createStubObj<RepositorioCalendarioFestivos>([
      'existeCalendario',
      'actualizar'
    ]);

    // Re-instanciate service
    servicioActualizarCalendarioFestivos = new ServicioActualizarCalendarioFestivos( repositorioCalendarioFestivosStub );
  });

  it( 'Un centro vacacional no debería actualizarse en el repositorio si no existe', async () => {

    // Arrange
    const centroVacacionalId = 1;
    const centroVacacionalValues = Object.values( calendarioTestData );
    const centroVacacional = new _CalendarioFestivos( ...centroVacacionalValues );

    repositorioCalendarioFestivosStub.existeCalendario.returns( Promise.resolve( false ) );

    /**
     * Act & Assert
     * Send any number & class {CalendarioFestivos} Object
     */
    await expect( servicioActualizarCalendarioFestivos.ejecutar( centroVacacionalId, centroVacacional ) )
      .rejects
      .toThrowError( NotFoundException );
  });

  it( 'Un centro vacacional debería actualizarse en el repositorio si existe', async () => {

    // Arrange
    const centroVacacionalId = 1;
    const centroVacacionalValues = Object.values( calendarioTestData );
    const centroVacacional = new _CalendarioFestivos( ...centroVacacionalValues );

    repositorioCalendarioFestivosStub.existeCalendario.returns( Promise.resolve( true ) );

    /**
     * Act
     * Send any number & class {CalendarioFestivos} Object
     */
    await servicioActualizarCalendarioFestivos.ejecutar( centroVacacionalId, centroVacacional );

    // Assert
    expect( repositorioCalendarioFestivosStub.actualizar.getCalls().length ).toBe(1);
    expect( repositorioCalendarioFestivosStub.actualizar.calledWith( centroVacacionalId, centroVacacional )).toBeTruthy();
  });
});
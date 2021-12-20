import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';

import { CalendarioFestivos } from '../../../../src/dominio/calendariofestivos/modelo/calendariofestivos';
import { RepositorioCalendarioFestivos } from '../../../../src/dominio/calendariofestivos/puerto/repositorio/repositorio-calendariofestivos';
import { ServicioGuardarCalendarioFestivos } from '../../../../src/dominio/calendariofestivos/servicio/servicio-guardar-calendariofestivos';


describe('ServicioGuardarCalendarioFestivos', () => {

  const _CalendarioFestivos = CalendarioFestivos as any;

  let servicioGuardarCalendarioFestivos: ServicioGuardarCalendarioFestivos;
  let repositorioCalendarioFestivosStub: SinonStubbedInstance<RepositorioCalendarioFestivos>;
  
  const calendarioTestData = {
    nombre: 'Campaña empleados Diciembre', // Nombre
    descripcion: 'Campaña para empleados aguinaldo navideño', // Descripción
    festivos: [ '2021-12-18' ] // Festivos
  };

  beforeEach(() => {
    
    // Stub Repository Methods
    repositorioCalendarioFestivosStub = createStubObj<RepositorioCalendarioFestivos>([ 
      'guardar'
    ]);

    // Re-instanciate service
    servicioGuardarCalendarioFestivos = new ServicioGuardarCalendarioFestivos(repositorioCalendarioFestivosStub);
  });

  it( 'Un calendario de festivos debería guardarse en el repositorio', async () => {

    // Arrange
    const calendarioFestivosValues = Object.values( calendarioTestData );
    const calendarioFestivos = new _CalendarioFestivos( ...calendarioFestivosValues );

    await servicioGuardarCalendarioFestivos.ejecutar( calendarioFestivos );

    expect( repositorioCalendarioFestivosStub.guardar.getCalls().length ).toBe(1);
    expect( repositorioCalendarioFestivosStub.guardar.calledWith( calendarioFestivos )).toBeTruthy();
  });

});
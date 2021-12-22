import * as React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import { GestionCotizaciones } from './index';
import { SinonStub, stub } from 'sinon';
import { CentroVacacional } from '../../../Admin/models/CentroVacacional';


describe('GestionCotizaciones Test', () => {

  let componentWrapper: ShallowWrapper;

  let componentProps: React.ComponentProps<typeof GestionCotizaciones> & {
    centrosVacacionales: CentroVacacional[];
    onSubmit: SinonStub;
    listarCentrosVacacionales:SinonStub;
    agregarNuevaCotizacion: SinonStub;
  };

  beforeEach( () => {
    componentProps = {
      onSubmit: stub(),
      listarCentrosVacacionales: stub(),
      agregarNuevaCotizacion: stub(),
      centrosVacacionales: [{
        id: 1,
        nombre: 'Centro de prueba',
        descripcion: 'Descripción de prueba',
        calendarios: [],
        categoriaUsuarios: [],
        calendarioActivo: 1
      }]
    };
    componentWrapper = shallow(<GestionCotizaciones { ...componentProps } />);
});  

  it('Debería renderizar el componente', () => {
    expect(componentWrapper).toMatchSnapshot();
  });

});

import * as React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import { SinonStub, stub } from 'sinon';
import { CentroVacacional } from '../../../../Admin/models/CentroVacacional';
import { SeleccionCentroVacacional } from './index';

describe('SeleccionCentroVacacional Test', () => {

  let componentWrapper: ShallowWrapper;

  let componentProps: React.ComponentProps<typeof SeleccionCentroVacacional> & {
    elementos: CentroVacacional[];
    handlerSeleccion: SinonStub;
  };

  beforeEach( () => {
        componentProps = {
        handlerSeleccion: stub(),
        elementos: [{
                id: 1,
                nombre: 'Centro de prueba',
                descripcion: 'Descripción de prueba',
                calendarios: [],
                categoriaUsuarios: [],
                calendarioActivo: 1
            }]
        };
        componentWrapper = shallow(<SeleccionCentroVacacional { ...componentProps } />);
        jest.clearAllMocks();
    });  

  it('Debería renderizar el componente', () => {
    expect(componentWrapper).toMatchSnapshot();
  });
});

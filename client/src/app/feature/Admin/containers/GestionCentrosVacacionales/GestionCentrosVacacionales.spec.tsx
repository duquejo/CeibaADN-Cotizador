import * as React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import { GestionCentrosVacacionales } from './index';
import { SinonStub } from 'sinon';
import { agregarNuevoCentroVacacional } from '../../../../core/redux/acciones/centrosvacacionales/CentrosVacacionalesAcciones';

describe('GestionCentrosVacacionales Test', () => {

  let componentWrapper: ShallowWrapper;
  let componentProps: React.ComponentProps<typeof GestionCentrosVacacionales> & {
    listarCentrosVacacionales: SinonStub;
    agregarNuevoCentroVacacional: SinonStub;
    actualizarCentroVacacional: SinonStub;
    eliminarCentroVacacional: SinonStub;    
  };

  it('Debería renderizar el componente', () => {
    componentWrapper = shallow( <GestionCentrosVacacionales { ...componentProps } /> );
    expect(componentWrapper).toMatchSnapshot();
  });

});

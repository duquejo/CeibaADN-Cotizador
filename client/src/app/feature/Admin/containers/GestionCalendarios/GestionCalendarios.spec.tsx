import * as React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import { GestionCalendarios } from './index';
import { SinonStub } from 'sinon';

describe('GestionCalendarios Test', () => {

  let componentWrapper: ShallowWrapper;
  let componentProps: React.ComponentProps<typeof GestionCalendarios> & {
    agregarNuevoCalendario:SinonStub;
    actualizarCalendario: SinonStub;
    eliminarCalendario: SinonStub;
  };

  it('Debería renderizar el componente', () => {
    componentWrapper = shallow( <GestionCalendarios { ...componentProps } /> );
    expect(componentWrapper).toMatchSnapshot();
  });

});
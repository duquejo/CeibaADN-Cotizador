import * as React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import { GestionCategoriasUsuarios } from './index';
import { SinonStub } from 'sinon';

describe('GestionCategoriasUsuarios Test', () => {

  let componentWrapper: ShallowWrapper;
  let componentProps: React.ComponentProps<typeof GestionCategoriasUsuarios> & {
    listarCategoriasUsuarios: SinonStub;
    agregarNuevaCategoriaUsuarios: SinonStub; 
  };

  it('Debería renderizar el componente', () => {
    componentWrapper = shallow( <GestionCategoriasUsuarios { ...componentProps } /> );
    expect(componentWrapper).toMatchSnapshot();
  });

});
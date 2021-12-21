import * as React from 'react';
import { SinonStub, stub } from 'sinon';
import { SelectorMultiple } from '.';
import { shallow, ShallowWrapper } from 'enzyme';

describe('SelectorMultiple test', () => {
    
  let componentWrapper: ShallowWrapper;
  let componentProps: React.ComponentProps<typeof SelectorMultiple> & {
    onSubmit: SinonStub;
    handlerSelection: SinonStub;
  };

  beforeEach(() => {
    componentProps = {
        handlerSeleccion: stub(),
        options: [
            {
                id: 5,
                nombre: 'Categoría de usuarios de prueba',
                descripcion: 'Descripción de categoría de usuarios',
                valorAlta: 64000,
                valorBaja: 30000
            },
            {
                id: 12,
                nombre: 'Otra categoría de prueba',
                valorAlta: 32000,
                valorBaja: 12000
            }
      ],
      containerClass: 'clase_prueba',
      initialValues: [{
        label: 'Categoría de usuarios de prueba',
        value: 5
      }],
      selectText: 'Prueba - Seleccionar todos'
    },

    jest.clearAllMocks();
    componentWrapper = shallow( <SelectorMultiple {...componentProps} /> );
  });

  afterEach(() => {
    componentWrapper.unmount();
  });

  test('Debería renderizar <SelectorMultiple /> satisfactoriamente', () => {
    expect( componentWrapper ).toMatchSnapshot();
  });

  test('Debería verificar si el contenedor posee la clase establecida', () => {

    const container = componentWrapper.find('MultiSelect');
    expect(container.hasClass(componentProps.containerClass)).toBeTruthy();
  });  
});

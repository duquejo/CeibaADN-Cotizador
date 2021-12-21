import * as React from 'react';
import { RenderResult, fireEvent, render, wait } from '@testing-library/react';
import { BuscarCotizacion } from '.';
import { shallow, mount, ReactWrapper } from 'enzyme';

describe('BuscarCotizacion test', () => {
    
  let componentWrapper: RenderResult;
  let wrapper: ReactWrapper;
  let value = {
    name: 'id',
    value: 1
  };
  const obtenerCotizacionAsync = jest.fn();

  beforeEach(() => {
    componentWrapper = render(<BuscarCotizacion />);
    wrapper = mount(<BuscarCotizacion />);
  });

  afterEach(() => {
    componentWrapper.unmount();
  });

  it('Debería coincidir con el snapshot', () => {
    expect( componentWrapper.container ).toMatchSnapshot();
    expect( wrapper ).toMatchSnapshot();
  });

  it('Debería fallar al no tener el valor obligatorio presente', async () => {

    // Arrange
    const elem = componentWrapper.container;
    const submitButton = elem.querySelector('button[type="submit"]');

    // Act
    await wait(() => {
      submitButton && fireEvent.click( submitButton );
    });

    // Assert
    const spans = elem.querySelectorAll('span');
    expect( spans.length ).toBe(1);
    expect( spans[0].textContent ).toBe('El campo ID debe ser positivo');
  });
});

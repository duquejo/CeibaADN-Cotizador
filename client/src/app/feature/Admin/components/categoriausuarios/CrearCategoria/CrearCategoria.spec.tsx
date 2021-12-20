import * as React from 'react';
import { RenderResult, fireEvent, render, wait } from '@testing-library/react';
import { SinonStub, stub } from 'sinon';
import { CrearCategoria } from '.';
import { setTextEvent } from 'app/shared/utils/test';

describe('CrearCategoria test', () => {
    
  let componentWrapper: RenderResult;
  let componentProps: React.ComponentProps<typeof CrearCategoria> & {
    onSubmit: SinonStub;
  };

  beforeEach(() => {
    componentProps = {
      onSubmit: stub(),
    };
    componentWrapper = render(<CrearCategoria { ...componentProps } />);
  });

  it('Debería coincidir con el snapshot', () => {
    expect( componentWrapper.container ).toMatchSnapshot();
  });

  it('Debería fallar al no tener los valores obligatorios presentes', async () => {

    // Arrange
    const elem = componentWrapper.container;
    const submitButton = elem.querySelector('button[type="submit"]');

    // Act
    await wait(() => {
      submitButton && fireEvent.click( submitButton );
    });

    // Assert
    const spans = elem.querySelectorAll('span');
    expect( spans.length ).toBe(3);
    expect( spans[0].textContent ).toBe('El campo título es requerido.');
    expect( spans[1].textContent ).toBe('El campo valor alta es requerido');
    expect( spans[2].textContent ).toBe('El campo valor baja es requerido');
  });

  it('Debería fallar con dos campos obligatorios restantes', async () => {
    
    // Arrange
    const elem = componentWrapper.container;
    const title = elem.querySelector('input[name="title"]');
    const submitButton = elem.querySelector('button[type="submit"]');

    // Act
    await wait(() => {
      title && fireEvent.change(title, setTextEvent('title', 'Categoría de prueba'));
    });
    await wait(() => {
      submitButton && fireEvent.click( submitButton );
    });    

    // Assert
    const spans = elem.querySelectorAll('span');
    expect( spans.length ).toBe(2);
    expect( spans[0].textContent ).toBe('El campo valor alta es requerido');
    expect( spans[1].textContent ).toBe('El campo valor baja es requerido');
  }); 

  it('Debería fallar con un campo obligatorio restante', async () => {
    
    // Arrange
    const elem = componentWrapper.container;
    const title = elem.querySelector('input[name="title"]');
    const priceHigh = elem.querySelector('input[name="priceHigh"]');
    const submitButton = elem.querySelector('button[type="submit"]');

    // Act
    await wait(() => {
      title && fireEvent.change(title, setTextEvent('title', 'Categoría de prueba'));
    });
    await wait(() => {
      priceHigh && fireEvent.change(priceHigh, setTextEvent('priceHigh', '50000' ));
    });
    await wait(() => {
      submitButton && fireEvent.click( submitButton );
    });    

    // Assert
    const spans = elem.querySelectorAll('span');
    expect( spans.length ).toBe(1);
    expect( spans[0].textContent ).toBe('El campo valor baja es requerido');
  }); 

  it('Debería realizar el submit con la información básica', async () => {

    // Arrange
    const elem = componentWrapper.container;
    const title = elem.querySelector('input[name="title"]');
    const priceHigh = elem.querySelector('input[name="priceHigh"]');    
    const priceLow = elem.querySelector('input[name="priceLow"]');    
    const submitButton = elem.querySelector('button[type="submit"]');

    // Act
    await wait(() => {
      title && fireEvent.change(title, setTextEvent('title', 'Calendario de prueba'));
    });
    await wait(() => {
      priceHigh && fireEvent.change(priceHigh, setTextEvent('priceHigh', '50000' ));
    });
    await wait(() => {
      priceLow && fireEvent.change(priceLow, setTextEvent('priceLow', '60000' ));
    });        
    await wait(() => {
      submitButton && fireEvent.click(submitButton);
    });

    // Assert
    const formSubmitted = componentProps.onSubmit.firstCall.args[0];
    expect( formSubmitted.nombre ).toBe('Calendario de prueba');
    expect( formSubmitted.valorAlta ).toBe(50000);
    expect( formSubmitted.valorBaja ).toBe(60000);
  });

  it('Debería realizar el submit con toda la información', async () => {

    // Arrange
    const elem = componentWrapper.container;
    const title = elem.querySelector('input[name="title"]');
    const description = elem.querySelector('textarea[name="description"]');
    const priceHigh = elem.querySelector('input[name="priceHigh"]');    
    const priceLow = elem.querySelector('input[name="priceLow"]');
    const submitButton = elem.querySelector('button[type="submit"]');

    // Act
    await wait(() => {
      title && fireEvent.change(title, setTextEvent('title', 'Calendario de prueba'));
    });
    await wait(() => {
      description && fireEvent.change(description, setTextEvent('description', 'Descripción del calendario de prueba'));
    });
    await wait(() => {
      priceHigh && fireEvent.change(priceHigh, setTextEvent('priceHigh', '50000' ));
    });
    await wait(() => {
      priceLow && fireEvent.change(priceLow, setTextEvent('priceLow', '60000' ));
    });  
    await wait(() => {
      submitButton && fireEvent.click(submitButton);
    });

    // // Assert
    const formSubmitted = componentProps.onSubmit.firstCall.args[0];
    expect( formSubmitted.nombre ).toBe('Calendario de prueba');
    expect( formSubmitted.descripcion ).toBe('Descripción del calendario de prueba');
    expect( formSubmitted.valorAlta ).toBe(50000);
    expect( formSubmitted.valorBaja ).toBe(60000);
  });
});
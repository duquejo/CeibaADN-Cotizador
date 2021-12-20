import * as React from 'react';
import { RenderResult, fireEvent, render, wait } from '@testing-library/react';
import { SinonStub, stub } from 'sinon';
import { CrearCalendario } from './';
import { setTextEvent } from 'app/shared/utils/test';

describe('CrearCalendario test', () => {
    
  let componentWrapper: RenderResult;
  let componentProps: React.ComponentProps<typeof CrearCalendario> & {
    onSubmit: SinonStub;
  };

  beforeEach(() => {
    componentProps = {
      onSubmit: stub(),
    };
    componentWrapper = render(<CrearCalendario { ...componentProps } />);
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
    const spans = elem.querySelectorAll('span:not(.DayPicker-NavButton)');
    expect( spans.length ).toBe(1);
    expect( spans[0].textContent ).toBe('El campo título es requerido.');
  });

  it('Debería realizar el submit con la información básica', async () => {

    // Arrange
    const elem = componentWrapper.container;
    const title = elem.querySelector('input[name="title"]');
    const submitButton = elem.querySelector('button[type="submit"]');

    // Act
    await wait(() => {
      title && fireEvent.change(title, setTextEvent('title', 'Calendario de prueba'));
    });
    await wait(() => {
      submitButton && fireEvent.click(submitButton);
    });

    // Assert
    const formSubmitted = componentProps.onSubmit.firstCall.args[0];
    expect( formSubmitted.nombre ).toBe('Calendario de prueba');
  });

  it('Debería realizar el submit con toda la información', async () => {

    // Arrange
    const elem = componentWrapper.container;
    const title = elem.querySelector('input[name="title"]');
    const description = elem.querySelector('textarea[name="description"]');
    const day = elem.querySelector('.DayPicker-Month:nth-child(2) .DayPicker-Week:nth-child(4) .DayPicker-Day:first-child');

    const submitButton = elem.querySelector('button[type="submit"]');

    // Act
    await wait(() => {
      title && fireEvent.change(title, setTextEvent('title', 'Calendario de prueba'));
    });
    await wait(() => {
      description && fireEvent.change(description, setTextEvent('description', 'Descripción del calendario de prueba'));
    });
    await wait(() => {
      day && fireEvent.click(day)
    });
    await wait(() => {
      submitButton && fireEvent.click(submitButton);
    });

    // // Assert
    const formSubmitted = componentProps.onSubmit.firstCall.args[0];
    expect( formSubmitted.nombre ).toBe('Calendario de prueba');
    expect( formSubmitted.descripcion ).toBe('Descripción del calendario de prueba');
    expect( formSubmitted.festivos.length ).toBe( 1 );
  });
});
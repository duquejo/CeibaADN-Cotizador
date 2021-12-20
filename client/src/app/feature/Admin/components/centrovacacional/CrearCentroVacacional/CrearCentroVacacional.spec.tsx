import * as React from 'react';
import { RenderResult, fireEvent, render, wait } from '@testing-library/react';
import { SinonStub, stub } from 'sinon';
import { CrearCentroVacacional } from '.';
import { setTextEvent } from 'app/shared/utils/test';

describe('CrearCentroVacacional test', () => {
    
  let componentWrapper: RenderResult;
  let componentProps: React.ComponentProps<typeof CrearCentroVacacional> & {
    onSubmit: SinonStub;
  };

  beforeEach(() => {
    componentProps = {
      onSubmit: stub(),
      optionCalendarios: [
        {
          id: 1,
          nombre: 'Calendario de prueba festivos',
          descripcion: 'Descripción de prueba',
          festivos: [ 
            '2021-12-18T00:00:00-05:00',
            '2022-02-22T00:00:00-05:00'
          ]
        },
        {
          id: 3,
          nombre: 'Calendario de prueba festivos II',
          festivos: [ 
            '2022-02-11T00:00:00-05:00',
            '2022-06-18T00:00:00-05:00',
            '2022-04-03T00:00:00-05:00',
          ]
        }
      ],
      optionCategoriasUsuarios: [
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
      ]
    };
    componentWrapper = render(<CrearCentroVacacional { ...componentProps } />);
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
    expect( spans[0].textContent ).toBe('El campo título es requerido');
  });

  it('Debería realizar el submit con la información básica', async () => {

    // Arrange
    const elem = componentWrapper.container;
    const title = elem.querySelector('input[name="title"]');
    const submitButton = elem.querySelector('button[type="submit"]');

    // Act
    await wait(() => {
      title && fireEvent.change(title, setTextEvent('title', 'Centro vacacional de prueba'));
    });     
    await wait(() => {
      submitButton && fireEvent.click(submitButton);
    });

    // Assert
    const formSubmitted = componentProps.onSubmit.firstCall.args[0];
    expect( formSubmitted.nombre ).toBe('Centro vacacional de prueba');
    expect( formSubmitted.descripcion ).toBe('');
    expect( formSubmitted.calendarioActivo ).toBe(null);
    expect( typeof formSubmitted.calendarios ).toBe('object');
    expect( typeof formSubmitted.categoriaUsuarios ).toBe('object');
  });

  it('Debería realizar el submit con la descripción y los datos obligatorios', async () => {

    // Arrange
    const elem = componentWrapper.container;
    const title = elem.querySelector('input[name="title"]');
    const description = elem.querySelector('textarea[name="description"]');
    const submitButton = elem.querySelector('button[type="submit"]');

    // Act
    await wait(() => {
      title && fireEvent.change(title, setTextEvent('title', 'Centro vacacional de prueba'));
    });
    await wait(() => {
      description && fireEvent.change(description, setTextEvent('description', 'Descripción del calendario de prueba'));
    });
    await wait(() => {
      submitButton && fireEvent.click(submitButton);
    });

    // Assert
    const formSubmitted = componentProps.onSubmit.firstCall.args[0];
    expect( formSubmitted.nombre ).toBe('Centro vacacional de prueba');
    expect( formSubmitted.descripcion ).toBe('Descripción del calendario de prueba');
    expect( formSubmitted.calendarioActivo ).toBe(null);
    expect( typeof formSubmitted.calendarios ).toBe('object');
    expect( typeof formSubmitted.categoriaUsuarios ).toBe('object');
  });
});
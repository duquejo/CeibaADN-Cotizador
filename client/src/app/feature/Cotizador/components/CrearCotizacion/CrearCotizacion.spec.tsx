import * as React from 'react';
import { RenderResult, fireEvent, render, wait } from '@testing-library/react';
import { SinonStub, stub } from 'sinon';
import { CrearCotizacion } from '.';
import { CentroVacacional } from '../../../Admin/models/CentroVacacional';

describe('CrearCotizacion test', () => {
    
  interface FormValues {
    personas: number;
    categoriaUsuarios: string | number;
  }

  let componentWrapper: RenderResult;
  let componentProps: React.ComponentProps<typeof CrearCotizacion> & {
    onSubmit: SinonStub;
    centrosvacacionales: CentroVacacional[];
    initialValues?: FormValues 
  };

  beforeEach(() => {
    componentProps = {
      centrosvacacionales: [{
        id: 1,
        nombre: 'Centro de prueba',
        descripcion: 'Descripción de prueba',
        calendarios: [],
        categoriaUsuarios: [],
        calendarioActivo: 1
      }],
      onSubmit: stub(),
      initialValues: {
        personas: 0,
        categoriaUsuarios: ''
      }
    };
    componentWrapper = render(<CrearCotizacion { ...componentProps } />);
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

    expect( spans.length ).toBe(4);
    expect( spans[0].textContent ).toBe('Debes seleccionar un centro vacacional para continuar');
    expect( spans[1].textContent ).toBe('Debe cotizar para por lo menos una persona');
    expect( spans[2].textContent ).toBe('Debes seleccionar una categoría de usuario');
    expect( spans[3].textContent ).toBe('Debes seleccionar un rango de fechas para proceder con la cotización');
  });

  // it('Debería realizar el submit con la información básica', async () => {

  //   // Arrange
  //   const elem = componentWrapper.container;
  //   const title = elem.querySelector('input[name="title"]');
  //   const submitButton = elem.querySelector('button[type="submit"]');

  //   // Act
  //   await wait(() => {
  //     title && fireEvent.change(title, setTextEvent('title', 'Calendario de prueba'));
  //   });
  //   await wait(() => {
  //     submitButton && fireEvent.click(submitButton);
  //   });

  //   // Assert
  //   const formSubmitted = componentProps.onSubmit.firstCall.args[0];
  //   expect( formSubmitted.nombre ).toBe('Calendario de prueba');
  // });

  // it('Debería realizar el submit con toda la información', async () => {

  //   // Arrange
  //   const elem = componentWrapper.container;
  //   const title = elem.querySelector('input[name="title"]');
  //   const description = elem.querySelector('textarea[name="description"]');
  //   const day = elem.querySelector('.DayPicker-Month:nth-child(2) .DayPicker-Week:nth-child(4) .DayPicker-Day:first-child');

  //   const submitButton = elem.querySelector('button[type="submit"]');

  //   // Act
  //   await wait(() => {
  //     title && fireEvent.change(title, setTextEvent('title', 'Calendario de prueba'));
  //   });
  //   await wait(() => {
  //     description && fireEvent.change(description, setTextEvent('description', 'Descripción del calendario de prueba'));
  //   });
  //   await wait(() => {
  //     day && fireEvent.click(day);
  //   });
  //   await wait(() => {
  //     submitButton && fireEvent.click(submitButton);
  //   });

  //   // // Assert
  //   const formSubmitted = componentProps.onSubmit.firstCall.args[0];
  //   expect( formSubmitted.nombre ).toBe('Calendario de prueba');
  //   expect( formSubmitted.descripcion ).toBe('Descripción del calendario de prueba');
  //   expect( formSubmitted.festivos.length ).toBe( 1 );
  // });
});

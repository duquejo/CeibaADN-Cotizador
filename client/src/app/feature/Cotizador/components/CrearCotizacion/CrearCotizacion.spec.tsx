import * as React from 'react';
import { RenderResult, fireEvent, render, wait } from '@testing-library/react';
import { SinonStub, stub } from 'sinon';
import { CentroVacacional } from '../../../Admin/models/CentroVacacional';
import { CrearCotizacion } from './index';
import { setTextEvent } from '../../../../shared/utils/test';

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
        categoriaUsuarios: [{
          id: 1,
          nombre: 'Categoría prueba',
          descripcion: '',
          valorAlta: 200,
          valorBaja: 100
        }],
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

  it('Debería realizar submit con toda la información', async () => {

    // Arrange
    const elem = componentWrapper.container;
  
    const centroVacacional = elem.querySelector('.swiper-slide:first-child');
    const personas = elem.querySelector('input[name="personas"]');
    const categoriaUsuarios = elem.querySelector('select[name="categoriaUsuarios"]');
    const submitButton = elem.querySelector('button[type="submit"]');
    const day = elem.querySelector('.DayPicker-Month:nth-child(2) .DayPicker-Week:nth-child(4) .DayPicker-Day:first-child');

    // Act
    await wait(() => {
      centroVacacional && fireEvent.click(centroVacacional);
    });    
    await wait(() => {
      personas && fireEvent.change(personas, setTextEvent('personas', '3'));
    });    
    await wait(() => {
      personas && fireEvent.change(personas, setTextEvent('personas', '3'));
    });
    await wait(() => {
      categoriaUsuarios && fireEvent.change( categoriaUsuarios, setTextEvent('categoriaUsuarios', '1'));
    });    
    await wait(() => {
      day && fireEvent.click(day);
    });    
    await wait(() => {
      submitButton && fireEvent.click(submitButton);
    });

    // Assert
    const spans = elem.querySelectorAll('span:not(.DayPicker-NavButton)');
    expect( spans.length ).toBe(0);
    const formSubmitted = componentProps.onSubmit.firstCall.args[0];
    expect( formSubmitted.centroVacacional ).toBe( 1 );
    expect( formSubmitted.categoriaUsuarios ).toBe( 1 );
    expect( formSubmitted.personas ).toBe( 3 );
    expect( formSubmitted.fechaInicio ).not.toBeUndefined();
    expect( formSubmitted.fechaFin ).not.toBeUndefined();
  });
});

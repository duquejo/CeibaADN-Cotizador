import '@testing-library/jest-dom';
import { BrowserRouter, Router } from 'react-router-dom';
import { CotizadorRouter } from './CotizadorRouter';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

describe('Pruebas en <CotizadorRouter />', () => {

    it('debería mostrar el espere...', () => {
        const store = mockStore();
        const wrapper = mount(
            <Provider store={ store } >
                <BrowserRouter>
                    <CotizadorRouter />
                </BrowserRouter>
            </Provider>
        );
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('span').text() ).toBe('Cargando página...');
    })
    

    it('Debe mostrar la vista del Cotizador', () => {
        const store = mockStore({});
        const wrapper = mount(
            <Provider store={ store } >
                <BrowserRouter>
                    <CotizadorRouter />
                </BrowserRouter>
            </Provider>
        );
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('h1').text() ).toBe('Generación de cotizaciones');
        
    });
})
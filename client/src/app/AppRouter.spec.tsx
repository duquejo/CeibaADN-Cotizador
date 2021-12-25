import '@testing-library/jest-dom';
import { BrowserRouter, Router } from 'react-router-dom';
import { AppRouter } from './AppRouter';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

describe('Pruebas en <AppRouter />', () => {
    it('Debe mostrar la página principal y la barra de navegación', () => {
        const store = mockStore({});
        const wrapper = mount(
            <Provider store={ store } >
                <BrowserRouter>
                    <AppRouter />
                </BrowserRouter>
            </Provider>
        );
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('h1').text() ).toBe('Inicio');
        expect( wrapper.find('nav').exists() ).toBeTruthy();
    });
});

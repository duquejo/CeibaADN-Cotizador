import '@testing-library/jest-dom';
import { AppRouter } from './AppRouter';
import React from 'react';
import { mount } from 'enzyme';

describe('Pruebas en <App />', () => {
    it('Debe renderizar todo el componente', () => {
        const wrapper = mount( <AppRouter /> );
        expect( wrapper ).toMatchSnapshot();
    });
});

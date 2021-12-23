import * as React from 'react';
import { ShallowWrapper, mount, render, shallow } from 'enzyme';
import { Layout } from './index';

jest.mock('GestionCalendarios', () => {
    return ( <span>GestionCalendarios</span> );
}, { virtual: true });

describe('Pruebas sobre componente <Layout />', () => {

    let componentWrapper: ShallowWrapper;
    let componentProps: React.ComponentProps<typeof Layout>;

    beforeEach( () => {
        componentProps = {
            title: 'Página de prueba',
            description: 'Esta es la descripción de una página de prueba',
            children: require( 'GestionCalendarios' )
        };
        componentWrapper = shallow(<Layout { ...componentProps } />);
    });

    it('Debería renderizar el elemento', () => {
        expect( componentWrapper ).toMatchSnapshot();
    });
});
import * as React from 'react';
import { ShallowWrapper, mount, render, shallow } from 'enzyme';
import { NavItem } from './index';

describe('Pruebas sobre componente <NavList />', () => {

    let componentWrapper: ShallowWrapper;
    let componentProps: React.ComponentProps<typeof NavItem>;

    beforeEach( () => {
        componentProps = {
            label: 'Item menú 1',
            to: '/menu1'
        };
        componentWrapper = shallow(<NavItem { ...componentProps } />);
    });

    it('Debería renderizar el elemento', () => {
        expect( componentWrapper ).toMatchSnapshot();
    });
});
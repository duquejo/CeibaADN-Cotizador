import * as React from 'react';
import { ShallowWrapper, mount, render, shallow } from 'enzyme';
import { NavList } from './index';

describe('Pruebas sobre componente <NavList />', () => {

    let componentWrapper: ShallowWrapper;
    let componentProps: React.ComponentProps<typeof NavList>;

    beforeEach( () => {
        componentProps = {
            items: [{
                label: 'Item menú 1',
                url: '/menu1'
            },{
                label: 'Item menú 2',
                url: '/menu2'
            },{
                label: 'Item menú 2',
                url: '/menu2'
            }
        ]};
        componentWrapper = shallow(<NavList { ...componentProps } />);
    });

    it('Debería renderizar el elemento', () => {
        expect( componentWrapper ).toMatchSnapshot();
    });
});
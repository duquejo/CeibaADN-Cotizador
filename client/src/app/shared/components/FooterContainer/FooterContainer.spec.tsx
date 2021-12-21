import * as React from 'react';
import { render, mount, ShallowWrapper, shallow } from 'enzyme';
import { FooterContainer } from './index';


describe('Pruebas sobre componente <FooterContainer />', () => {

    let componentWrapper: ShallowWrapper;

    beforeEach( () => {
        componentWrapper = shallow(<FooterContainer/>);
    });

    it('Debería renderizar el elemento', () => {
        expect( componentWrapper ).toMatchSnapshot();
    });
});
import * as React from 'react';
import { ShallowWrapper, mount, render, shallow } from 'enzyme';
import { CheckBox } from './index';


describe('Pruebas sobre componente <CheckBox />', () => {

    let componentWrapper: ShallowWrapper;

    beforeEach( () => {
        componentWrapper = shallow(<CheckBox/>);
    });

    it('Debería renderizar el elemento', () => {
        expect( componentWrapper ).toMatchSnapshot();
    });
});
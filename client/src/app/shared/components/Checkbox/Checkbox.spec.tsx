import * as React from 'react';
import { render, mount, ShallowWrapper, shallow } from 'enzyme';
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
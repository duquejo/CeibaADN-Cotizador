import * as React from 'react';
import { render, mount, ShallowWrapper, shallow } from 'enzyme';
import { CheckBoxLabel } from './index';


describe('Pruebas sobre componente <CheckBoxLabel />', () => {

    let componentWrapper: ShallowWrapper;

    beforeEach( () => {
        componentWrapper = shallow(<CheckBoxLabel/>);
    });

    it('Debería renderizar el elemento', () => {
        expect( componentWrapper ).toMatchSnapshot();
    });
});
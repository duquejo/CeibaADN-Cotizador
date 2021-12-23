import * as React from 'react';
import { NavigationHeader } from './index';
import { shallow } from 'enzyme';

describe('Pruebas sobre componentes del header <NavigationHeader />', () => {

    it('Debería renderizar el elemento adecuadamente', () => {
        const wrapper = shallow( <NavigationHeader /> );
        expect( wrapper ).toMatchSnapshot();
    }); 
});

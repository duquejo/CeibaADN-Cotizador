import * as React from 'react';
import { shallow } from 'enzyme';
import { NavigationHeader } from './index';

describe('Pruebas sobre componentes del header <NavigationHeader />', () => {

    it('Debería renderizar el elemento adecuadamente', () => {
        const wrapper = shallow( <NavigationHeader /> );
        expect( wrapper ).toMatchSnapshot();
    }); 
});

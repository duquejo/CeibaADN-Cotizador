import * as React from 'react';
import AdminMainPage from 'app/feature/Admin/pages/Main';
import { ShallowWrapper, shallow } from 'enzyme';

describe('Pruebas sobre <AdminMainPage />', () => {

    let componentWrapper: ShallowWrapper;

    const defaultProps: any = {
        foo: true,
        bar: false,
        history: {
          replace: jest.fn(),
        },
    };

    it('Debería renderizar bien el elemento padre', () => {
        componentWrapper = shallow( <AdminMainPage {...defaultProps} /> );
        expect( componentWrapper ).toMatchSnapshot();
    });
});

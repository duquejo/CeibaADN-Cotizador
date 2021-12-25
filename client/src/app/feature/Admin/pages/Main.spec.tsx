import * as React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import AdminMainPage from 'app/feature/Admin/pages/Main';

jest.mock('ChildrenNode', () => {
    return ( <span>ChildrenNode</span> );
}, { virtual: true });

const historyMock = { push: jest.fn() };

describe('Pruebas sobre <AdminMainPage />', () => {

    let componentWrapper: ShallowWrapper;
    let componentProps: React.ComponentProps<typeof AdminMainPage> & {
        children: ChildNode
    };
    
    beforeEach( () => {
        componentWrapper = shallow( <AdminMainPage {...componentProps} /> );
    });

    it('Debería renderizar bien el elemento padre', () => {
        expect( componentWrapper ).toMatchSnapshot();
    });
});
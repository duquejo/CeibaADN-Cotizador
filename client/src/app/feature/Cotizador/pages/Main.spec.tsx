import * as React from 'react';
import AdminMainPage from 'app/feature/Admin/pages/Main';
import { ShallowWrapper, shallow } from 'enzyme';

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



// jest.mock('GestionCalendarios', () => {
//     return ( <span>GestionCalendarios</span> );
// }, { virtual: true });

// describe('Pruebas sobre componente <Layout />', () => {

//     let componentWrapper: ShallowWrapper;
//     let componentProps: React.ComponentProps<typeof Layout>;

//     beforeEach( () => {
//         componentProps = {
//             title: 'Página de prueba',
//             description: 'Esta es la descripción de una página de prueba',
//             children: require( 'GestionCalendarios' )
//         };
//         componentWrapper = shallow(<Layout { ...componentProps } />);
//     });

//     it('Debería renderizar el elemento', () => {
//         expect( componentWrapper ).toMatchSnapshot();
//     });
// });
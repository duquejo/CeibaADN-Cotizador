import { 
    listarCalendarios, 
    agregarNuevoCalendario,
    actualizarCalendario,
    eliminarCalendario,
    activarCalendarioEdicion,
    limpiarCalendario
} from './CalendariosAcciones';
import { TiposAcciones } from './CalendariosTiposAcciones';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { calendarioMock } from '../../reductores/__mocks__/reductoresMock';
import { EstadoCalendario } from '../../modelo/EstadoCalendario';

describe('Acciones de Calendarios', () => {

    const middlewares = [thunk];
    const mockStore = configureMockStore( middlewares );
    
    const estadoInicial: EstadoCalendario = {
        calendarioActivo: null,
        calendarios: []
    };

    let store = mockStore({ calendarios: [ estadoInicial ] });    

    beforeEach( () => {
        store = mockStore({ calendarios: [ estadoInicial ] });
        jest.resetAllMocks();
    });

    /**
     * NETWORK NOT FOUND ISSUE
     */
    // it( 'Ejecuta LISTAR_CALENDARIO después de realizar un fetch exitoso', () => {
    //     return store.dispatch<any>( listarCalendariosAsync() ).then( () => {
    //         // expect(store.getActions()).toEqual([]);
    //         console.log( store.getActions() );
    //     });
    // });

    it( 'Ejecuta LISTAR_CALENDARIO mediante el dispatch', () => {

        const expectedPayload  = [
            { type: TiposAcciones.LISTAR_CALENDARIO, payload: expect.any(Array) }
        ];
        store.dispatch( listarCalendarios( [ calendarioMock ] ) );
        expect( store.getActions() ).toEqual( expectedPayload );
    });

    it( 'Ejecuta ELIMINAR_CALENDARIO mediante el dispatch', () => {

        const expectedPayload  = [
            { type: TiposAcciones.ELIMINAR_CALENDARIO, payload: expect.any(Object) }
        ];
        store.dispatch( eliminarCalendario( calendarioMock ) );
        expect( store.getActions() ).toEqual( expectedPayload );
    });

    it( 'Ejecuta ELIMINAR_CALENDARIO mediante el dispatch', () => {

        const expectedPayload  = [
            { type: TiposAcciones.ELIMINAR_CALENDARIO, payload: expect.any(Object) }
        ];
        store.dispatch( eliminarCalendario( calendarioMock ) );
        expect( store.getActions() ).toEqual( expectedPayload );
    });

    it( 'Ejecuta ACTUALIZAR_CALENDARIO mediante el dispatch', () => {

        const expectedPayload  = [
            { type: TiposAcciones.ACTUALIZAR_CALENDARIO, payload: expect.any(Object) }
        ];
        store.dispatch( actualizarCalendario( calendarioMock ) );
        expect( store.getActions() ).toEqual( expectedPayload );
    });

    it( 'Ejecuta AGREGAR_CALENDARIO mediante el dispatch', () => {

        const expectedPayload  = [
            { type: TiposAcciones.AGREGAR_CALENDARIO, payload: expect.any(Object) }
        ];
        store.dispatch( agregarNuevoCalendario( calendarioMock ) );
        expect( store.getActions() ).toEqual( expectedPayload );
    });

    it( 'Ejecuta ACTIVAR_CALENDARIO_EDICION mediante el dispatch', () => {

        const expectedPayload  = [
            { type: TiposAcciones.ACTIVAR_CALENDARIO_EDICION, payload: expect.any(Object) }
        ];
        store.dispatch( activarCalendarioEdicion( calendarioMock ) );
        expect( store.getActions() ).toEqual( expectedPayload );
    });

    it( 'Ejecuta DESACTIVAR_CALENDARIO_EDICION mediante el dispatch', () => {

        const expectedPayload  = [
            { type: TiposAcciones.DESACTIVAR_CALENDARIO_EDICION }
        ];
        store.dispatch( limpiarCalendario() );
        expect( store.getActions() ).toEqual( expectedPayload );
    });
});
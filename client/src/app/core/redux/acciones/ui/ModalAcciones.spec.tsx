import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { abrirModal, cerrarModal } from './ModalAcciones';
import { TiposAcciones } from './ModalTiposAcciones';
import { EstadoUI, tiposModal } from '../../modelo/EstadoUI';

describe('Acciones de categoriasUsuarios', () => {

    const middlewares = [thunk];
    const mockStore = configureMockStore( middlewares );
    
    const estadoInicial: EstadoUI = {
        modalOpen: false,
        type: false
    };

    let store = mockStore({ ui: [ estadoInicial ] });    

    beforeEach( () => {
        store = mockStore({ ui: [ estadoInicial ] });
        jest.resetAllMocks();
    });

    it( 'Ejecuta ABRIR_MODAL de calendarios mediante el dispatch', () => {

        const expectedPayload  = [
            { type: TiposAcciones.ABRIR_MODAL, payload: expect.any(String) }
        ];
        store.dispatch( abrirModal( tiposModal.MODAL_CALENDARIOS ) );
        expect( store.getActions() ).toEqual( expectedPayload );
    });

    it( 'Ejecuta ABRIR_MODAL de centros vacacionales mediante el dispatch', () => {

        const expectedPayload  = [
            { type: TiposAcciones.ABRIR_MODAL, payload: expect.any(String) }
        ];
        store.dispatch( abrirModal( tiposModal.MODAL_CENTROS_VACACIONALES ) );
        expect( store.getActions() ).toEqual( expectedPayload );
    });

    it( 'Ejecuta CERRAR_MODAL mediante el dispatch', () => {

        const expectedPayload  = [
            { type: TiposAcciones.CERRAR_MODAL }
        ];
        store.dispatch( cerrarModal() );
        expect( store.getActions() ).toEqual( expectedPayload );
    });
});
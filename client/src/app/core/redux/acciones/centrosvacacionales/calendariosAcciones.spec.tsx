import { 
    activarCentroVacacionalEdicion,
    actualizarCentroVacacional, 
    agregarNuevoCentroVacacional,
    eliminarCentroVacacional,
    limpiarCentroVacacional,
    listarCentrosVacacionales
} from './CentrosVacacionalesAcciones';
import { EstadoCentroVacacional } from '../../modelo/EstadoCentroVacacional';
import { TiposAcciones } from './CentrosVacacionalesTiposAcciones';
import { centroVacacionalMock } from '../../__mocks__/reductoresMock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

describe('Acciones de centrosVacacionales', () => {

    const middlewares = [thunk];
    const mockStore = configureMockStore( middlewares );
    
    const estadoInicial: EstadoCentroVacacional = {
        centroVacacionalActivo: null,
        centrosVacacionales: []
    };

    let store = mockStore({ centrosVacacionales: [ estadoInicial ] });    

    beforeEach( () => {
        store = mockStore({ centrosVacacionales: [ estadoInicial ] });
        jest.resetAllMocks();
    });

    it( 'Ejecuta LISTAR_CENTRO_VACACIONAL mediante el dispatch', () => {

        const expectedPayload  = [
            { type: TiposAcciones.LISTAR_CENTRO_VACACIONAL, payload: expect.any(Array) }
        ];
        store.dispatch( listarCentrosVacacionales( [ centroVacacionalMock ] ) );
        expect( store.getActions() ).toEqual( expectedPayload );
    });

    it( 'Ejecuta ELIMINAR_CENTRO_VACACIONAL mediante el dispatch', () => {

        const expectedPayload  = [
            { type: TiposAcciones.ELIMINAR_CENTRO_VACACIONAL, payload: expect.any(Object) }
        ];
        store.dispatch( eliminarCentroVacacional( centroVacacionalMock ) );
        expect( store.getActions() ).toEqual( expectedPayload );
    });

    it( 'Ejecuta ACTUALIZAR_CENTRO_VACACIONAL mediante el dispatch', () => {

        const expectedPayload  = [
            { type: TiposAcciones.ACTUALIZAR_CENTRO_VACACIONAL, payload: expect.any(Object) }
        ];
        store.dispatch( actualizarCentroVacacional( centroVacacionalMock ) );
        expect( store.getActions() ).toEqual( expectedPayload );
    });

    it( 'Ejecuta AGREGAR_CENTRO_VACACIONAL mediante el dispatch', () => {

        const expectedPayload  = [
            { type: TiposAcciones.AGREGAR_CENTRO_VACACIONAL, payload: expect.any(Object) }
        ];
        store.dispatch( agregarNuevoCentroVacacional( centroVacacionalMock ) );
        expect( store.getActions() ).toEqual( expectedPayload );
    });

    it( 'Ejecuta ACTUALIZAR_CENTRO_VACACIONAL mediante el dispatch', () => {

        const expectedPayload  = [
            { type: TiposAcciones.ACTUALIZAR_CENTRO_VACACIONAL, payload: expect.any(Object) }
        ];
        store.dispatch( actualizarCentroVacacional( centroVacacionalMock ) );
        expect( store.getActions() ).toEqual( expectedPayload );
    });

    it( 'Ejecuta ACTIVAR_CENTRO_VACACIONAL_EDICION mediante el dispatch', () => {

        const expectedPayload  = [
            { type: TiposAcciones.ACTIVAR_CENTRO_VACACIONAL_EDICION, payload: expect.any(Object) }
        ];
        store.dispatch( activarCentroVacacionalEdicion( centroVacacionalMock ) );
        expect( store.getActions() ).toEqual( expectedPayload );
    });

    it( 'Ejecuta DESACTIVAR_CENTRO_VACACIONAL_EDICION mediante el dispatch', () => {

        const expectedPayload  = [
            { type: TiposAcciones.DESACTIVAR_CENTRO_VACACIONAL_EDICION }
        ];
        store.dispatch( limpiarCentroVacacional() );
        expect( store.getActions() ).toEqual( expectedPayload );
    });
});
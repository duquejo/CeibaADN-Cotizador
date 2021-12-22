import { 
    agregarNuevaCotizacion,
    obtenerCotizacionAsync,
    guardarNuevaCotizacionAsync
} from './CotizacionesAcciones';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { TiposAcciones } from '../cotizaciones/CotizacionesTiposAcciones';
import { cotizacionMock } from '../../__mocks__/reductoresMock';

describe('Acciones de centros Vacacionales', () => {

    const middlewares = [thunk];
    const mockStore = configureMockStore( middlewares );

    let store = mockStore({});    

    beforeEach( () => {
        store = mockStore({});
        jest.resetAllMocks();
    });

    it( 'Ejecuta AGREGAR_COTIZACIONES mediante el dispatch', () => {

        const expectedPayload  = [
            { type: TiposAcciones.AGREGAR_COTIZACIONES, payload: expect.any(Object) }
        ];
        store.dispatch( agregarNuevaCotizacion( cotizacionMock ) );
        expect( store.getActions() ).toEqual( expectedPayload );
    });    

});
import { agregarNuevaCategoriaUsuarios, listarCategoriasUsuarios } from './CategoriasUsuariosAcciones';
import { EstadoCategoriaUsuarios } from '../../modelo/EstadoCategoriaUsuarios';
import { TiposAcciones } from './CategoriasUsuariosTiposAcciones';
import { categoriaUsuariosMock } from '../../__mocks__/reductoresMock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

describe('Acciones de categoriasUsuarios', () => {

    const middlewares = [thunk];
    const mockStore = configureMockStore( middlewares );
    
    const estadoInicial: EstadoCategoriaUsuarios = {
        categoriasUsuarios: []
    };

    let store = mockStore({ categoriasUsuarios: [ estadoInicial ] });    

    beforeEach( () => {
        store = mockStore({ categoriasUsuarios: [ estadoInicial ] });
        jest.resetAllMocks();
    });

    it( 'Ejecuta LISTAR_CATEGORIA_USUARIOS mediante el dispatch', () => {

        const expectedPayload  = [
            { type: TiposAcciones.LISTAR_CATEGORIA_USUARIOS, payload: expect.any(Array) }
        ];
        store.dispatch( listarCategoriasUsuarios( [ categoriaUsuariosMock ] ) );
        expect( store.getActions() ).toEqual( expectedPayload );
    });

    it( 'Ejecuta AGREGAR_CATEGORIA_USUARIOS mediante el dispatch', () => {

        const expectedPayload  = [
            { type: TiposAcciones.AGREGAR_CATEGORIA_USUARIOS, payload: expect.any(Object) }
        ];
        store.dispatch( agregarNuevaCategoriaUsuarios( categoriaUsuariosMock ) );
        expect( store.getActions() ).toEqual( expectedPayload );
    });
});
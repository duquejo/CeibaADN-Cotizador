import reducer from './categoriaUsuariosReductor';
import { TiposAcciones, TiposAccionesCategoriaUsuarios } from '../../acciones/categoriasusuarios/CategoriasUsuariosTiposAcciones';
import { categoriaUsuariosMock } from '../../__mocks__/reductoresMock';
import { EstadoCategoriaUsuarios } from '../../modelo/EstadoCategoriaUsuarios';

describe('Pruebas sobre los reducers de las categorías de usuarios', () => {

    const estadoInicial: EstadoCategoriaUsuarios = {
        categoriasUsuarios: []
    };

    it('Debería retornar el estado inicial', () => {
        expect( reducer( undefined, {} as TiposAccionesCategoriaUsuarios ) ).toEqual(estadoInicial);
    });

    it('Debería retornar LISTAR_CATEGORIA_USUARIOS', () => {

        const accionExitosa: TiposAccionesCategoriaUsuarios = {
            type: TiposAcciones.LISTAR_CATEGORIA_USUARIOS,
            payload: [ categoriaUsuariosMock ]
        };

        expect( reducer( undefined, accionExitosa ) ).toEqual({
            ...estadoInicial,
            categoriasUsuarios: [
                categoriaUsuariosMock
            ]
        });
    } );

    it('Debería retornar AGREGAR_CATEGORIA_USUARIOS', () => {

        const accionExitosa: TiposAccionesCategoriaUsuarios = {
            type: TiposAcciones.AGREGAR_CATEGORIA_USUARIOS,
            payload: categoriaUsuariosMock
        };

        expect( reducer( undefined, accionExitosa ) ).toEqual({
            ...estadoInicial,
            categoriasUsuarios: [
                categoriaUsuariosMock
            ]
        });
    } );
});
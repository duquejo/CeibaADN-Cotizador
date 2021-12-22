import reducer from './centrosVacacionalesReductor';
import { TiposAcciones, TiposAccionesCentroVacacional } from '../../acciones/centrosvacacionales/CentrosVacacionalesTiposAcciones';
import { centroVacacionalMock } from '../../__mocks__/reductoresMock';
import { CentroVacacional } from 'app/feature/Admin/models/CentroVacacional';
import { EstadoCentroVacacional } from '../../modelo/EstadoCentroVacacional';

describe('Pruebas sobre los reducers de los centros vacacionales', () => {

    const estadoInicial: EstadoCentroVacacional = {
        'centrosVacacionales': [],
        'centroVacacionalActivo': null
    };

    it('Debería retornar el estado inicial', () => {
        expect( reducer( undefined, {} as TiposAccionesCentroVacacional ) ).toEqual(estadoInicial);
    });

    it('Debería retornar ACTIVAR_CENTRO_VACACIONAL_EDICION', () => {

        const accionExitosa: TiposAccionesCentroVacacional = {
            type: TiposAcciones.ACTIVAR_CENTRO_VACACIONAL_EDICION,
            payload: centroVacacionalMock
        };

        expect( reducer( undefined, accionExitosa ) ).toEqual({
            ...estadoInicial,
            centroVacacionalActivo: centroVacacionalMock
        });
    } );

    it('Debería retornar DESACTIVAR_CENTRO_VACACIONAL_EDICION', () => {

        const accionExitosa: TiposAccionesCentroVacacional = {
            type: TiposAcciones.DESACTIVAR_CENTRO_VACACIONAL_EDICION
        };

        expect( reducer( undefined, accionExitosa ) ).toEqual({
            ...estadoInicial,
            centroVacacionalActivo: null
        });
    } );

    it('Debería retornar LISTAR_CENTRO_VACACIONAL', () => {

        const accionExitosa: TiposAccionesCentroVacacional = {
            type: TiposAcciones.LISTAR_CENTRO_VACACIONAL,
            payload: [ centroVacacionalMock ]
        };

        expect( reducer( undefined, accionExitosa ) ).toEqual({
            ...estadoInicial,
            centrosVacacionales: [
                centroVacacionalMock
            ]
        });
    } );

    it('Debería retornar AGREGAR_CENTRO_VACACIONAL', () => {

        const accionExitosa: TiposAccionesCentroVacacional = {
            type: TiposAcciones.AGREGAR_CENTRO_VACACIONAL,
            payload: centroVacacionalMock
        };

        expect( reducer( undefined, accionExitosa ) ).toEqual({
            ...estadoInicial,
            centrosVacacionales: [
                centroVacacionalMock
            ]
        });
    } );

    it('Debería retornar ACTUALIZAR_CENTRO_VACACIONAL efectivamente si lo encuentra', () => {

        const calendarioModificadoMock: CentroVacacional = {
            ...centroVacacionalMock,
            nombre: 'Centro vacacional modificado'
        };

        const accionExitosa: TiposAccionesCentroVacacional = {
            type: TiposAcciones.ACTUALIZAR_CENTRO_VACACIONAL,
            payload: calendarioModificadoMock
        };

        expect( reducer( { 
            centrosVacacionales: [ centroVacacionalMock ],
            centroVacacionalActivo: null
        } , accionExitosa ) ).toEqual({
            ...estadoInicial,
            centrosVacacionales: [
                calendarioModificadoMock,
            ]
        });
    } );

    it('Debería retornar el mismo objeto ACTUALIZAR_CENTRO_VACACIONAL si no encuentra', () => {

        const calendarioModificadoMock: CentroVacacional = {
            ...centroVacacionalMock,
            id: 2,
            nombre: 'Centro vacacional 2',
        };

        const accionExitosa: TiposAccionesCentroVacacional = {
            type: TiposAcciones.ACTUALIZAR_CENTRO_VACACIONAL,
            payload: calendarioModificadoMock
        };

        expect( reducer( { 
            centrosVacacionales: [ centroVacacionalMock ],
            centroVacacionalActivo: null
        } , accionExitosa ) ).toEqual({
            ...estadoInicial,
            centrosVacacionales: [
                centroVacacionalMock,
            ]
        });
    } );

    it('Debería retornar ELIMINAR_CENTRO_VACACIONAL', () => {

        const accionExitosa: TiposAccionesCentroVacacional = {
            type: TiposAcciones.ELIMINAR_CENTRO_VACACIONAL,
            payload: centroVacacionalMock
        };

        expect( reducer( { 
            centrosVacacionales: [ centroVacacionalMock ],
            centroVacacionalActivo: null
        } , accionExitosa ) ).toEqual({
            ...estadoInicial,
            centrosVacacionales: []
        });
    } );
});
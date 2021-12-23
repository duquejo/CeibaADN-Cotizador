import { TiposAcciones, TiposAccionesCalendario } from '../../acciones/calendarios/CalendariosTiposAcciones';
import { Calendario } from '../../../../feature/Admin/models/Calendario';
import { EstadoCalendario } from '../../modelo/EstadoCalendario';
import { calendarioMock } from '../../__mocks__/reductoresMock';
import reducer from './calendariosReductor';

describe('Pruebas sobre los reducers del calendario', () => {

    const estadoInicial: EstadoCalendario = {
        'calendarios': [],
        'calendarioActivo': null
    };

    it('Debería retornar el estado inicial', () => {
        expect( reducer( undefined, {} as TiposAccionesCalendario ) ).toEqual(estadoInicial);
    });

    it('Debería retornar ACTIVAR_CALENDARIO_EDICION', () => {

        const accionExitosa: TiposAccionesCalendario = {
            type: TiposAcciones.ACTIVAR_CALENDARIO_EDICION,
            payload: calendarioMock
        };

        expect( reducer( undefined, accionExitosa ) ).toEqual({
            ...estadoInicial,
            calendarioActivo: calendarioMock
        });
    } );

    it('Debería retornar DESACTIVAR_CALENDARIO_EDICION', () => {

        const accionExitosa: TiposAccionesCalendario = {
            type: TiposAcciones.DESACTIVAR_CALENDARIO_EDICION
        };

        expect( reducer( undefined, accionExitosa ) ).toEqual({
            ...estadoInicial,
            calendarioActivo: null
        });
    } );

    it('Debería retornar LISTAR_CALENDARIO', () => {

        const accionExitosa: TiposAccionesCalendario = {
            type: TiposAcciones.LISTAR_CALENDARIO,
            payload: [ calendarioMock ]
        };

        expect( reducer( undefined, accionExitosa ) ).toEqual({
            ...estadoInicial,
            calendarios: [
                calendarioMock
            ]
        });
    } );

    it('Debería retornar AGREGAR_CALENDARIO', () => {

        const accionExitosa: TiposAccionesCalendario = {
            type: TiposAcciones.AGREGAR_CALENDARIO,
            payload: calendarioMock
        };

        expect( reducer( undefined, accionExitosa ) ).toEqual({
            ...estadoInicial,
            calendarios: [
                calendarioMock
            ]
        });
    } );

    it('Debería retornar ACTUALIZAR_CALENDARIO efectivamente si lo encuentra', () => {

        const calendarioModificadoMock: Calendario = {
            ...calendarioMock,
            nombre: 'Calendario de prueba modificado'
        };

        const accionExitosa: TiposAccionesCalendario = {
            type: TiposAcciones.ACTUALIZAR_CALENDARIO,
            payload: calendarioModificadoMock
        };

        expect( reducer( { 
            calendarios: [ calendarioMock ],
            calendarioActivo: null
        } , accionExitosa ) ).toEqual({
            ...estadoInicial,
            calendarios: [
                calendarioModificadoMock,
            ]
        });
    } );

    it('Debería retornar el mismo objeto ACTUALIZAR_CALENDARIO si no encuentra', () => {

        const calendarioModificadoMock: Calendario = {
            ...calendarioMock,
            id: 2,
            nombre: 'Calendario de prueba 2',
        };

        const accionExitosa: TiposAccionesCalendario = {
            type: TiposAcciones.ACTUALIZAR_CALENDARIO,
            payload: calendarioModificadoMock
        };

        expect( reducer( { 
            calendarios: [ calendarioMock ],
            calendarioActivo: null
        } , accionExitosa ) ).toEqual({
            ...estadoInicial,
            calendarios: [
                calendarioMock,
            ]
        });
    } );

    it('Debería retornar ELIMINAR_CALENDARIO', () => {

        const accionExitosa: TiposAccionesCalendario = {
            type: TiposAcciones.ELIMINAR_CALENDARIO,
            payload: calendarioMock
        };

        expect( reducer( { 
            calendarios: [ calendarioMock ],
            calendarioActivo: null
        } , accionExitosa ) ).toEqual({
            ...estadoInicial,
            calendarios: []
        });
    } );
});
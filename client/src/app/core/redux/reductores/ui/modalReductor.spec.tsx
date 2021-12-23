import { EstadoUI, tiposModal } from '../../modelo/EstadoUI';
import { TiposAcciones, TiposAccionesModal } from '../../acciones/ui/ModalTiposAcciones';
import reducer from './modalReductor';


describe('Pruebas sobre los reducers de las categorías de usuarios', () => {

    const estadoInicial: EstadoUI = {
        modalOpen: false,
        type: false
    };

    it('Debería retornar el estado inicial', () => {
        expect( reducer( undefined, {} as TiposAccionesModal ) ).toEqual(estadoInicial);
    });

    it('Debería activar el modal calendarios ABRIR_MODAL', () => {

        const accionExitosa: TiposAccionesModal = {
            type: TiposAcciones.ABRIR_MODAL,
            payload: tiposModal.MODAL_CALENDARIOS
        };

        expect( reducer( undefined, accionExitosa ) ).toEqual({
            ...estadoInicial,
            modalOpen: true,
            type: tiposModal.MODAL_CALENDARIOS
        });
    } );

    it('Debería activar el modal centros vacacionales ABRIR_MODAL', () => {

        const accionExitosa: TiposAccionesModal = {
            type: TiposAcciones.ABRIR_MODAL,
            payload: tiposModal.MODAL_CENTROS_VACACIONALES
        };

        expect( reducer( undefined, accionExitosa ) ).toEqual({
            ...estadoInicial,
            modalOpen: true,
            type: tiposModal.MODAL_CENTROS_VACACIONALES
        });
    } );

    it('Debería desactivar el modal y reestablecerlo CERRAR_MODAL', () => {

        const accionExitosa: TiposAccionesModal = {
            type: TiposAcciones.CERRAR_MODAL
        };

        expect( reducer( undefined, accionExitosa ) ).toEqual({
            ...estadoInicial
        });
    } );
});
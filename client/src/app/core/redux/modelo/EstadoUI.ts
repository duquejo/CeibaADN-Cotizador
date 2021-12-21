export enum tiposModal {
  MODAL_CALENDARIOS = 'MODAL_CALENDARIOS',
  MODAL_CENTROS_VACACIONALES = 'MODAL_CENTROS_VACACIONALES',
}

export interface EstadoUI {
  modalOpen: boolean;
  type: tiposModal|boolean;
}

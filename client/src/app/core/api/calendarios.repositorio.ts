import { Calendario } from 'app/feature/Admin/models/Calendario';

import { axiosInstance } from '../config/AxiosConfig';

export const CalendariosRepositorio = {
  obtener: () => {
    return axiosInstance.get(`/calendariosFestivos`);
  },
  guardar: ( calendario: Calendario ) => {
    return axiosInstance.post(`/calendariosFestivos`, calendario );
  },
  actualizar: ( calendario: Calendario ) => {
    return  axiosInstance.patch(`/calendariosFestivos/${ calendario.id }`, calendario );
  },
  eliminar: ( calendario: Calendario ) => {
    return  axiosInstance.delete(`/calendariosFestivos/${ calendario.id }` );
  },
};

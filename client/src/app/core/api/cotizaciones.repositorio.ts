import { Cotizacion } from 'app/feature/Cotizador/models/Cotizacion';

import { axiosInstance } from '../config/AxiosConfig';

export const CotizacionRepositorio = {
  obtener: ( cotizacionId: number ) => {
    return axiosInstance.get(`/cotizaciones/${ cotizacionId }`);
  },
  guardar: ( cotizacion: Cotizacion ) => {
    return axiosInstance.post(`/cotizaciones`, cotizacion );
  }
};

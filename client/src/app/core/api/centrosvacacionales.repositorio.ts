import { CentroVacacional } from 'app/feature/Admin/models/CentroVacacional';

import { axiosInstance } from '../config/AxiosConfig';

export const CentrosVacacionalesRepositorio = {
  obtener: () => {
    return axiosInstance.get(`/centrosVacacionales`);
  },
  guardar: ( centroVacacional: CentroVacacional ) => {
    return axiosInstance.post(`/centrosVacacionales`, centroVacacional );
  },
  actualizar: ( centroVacacional: CentroVacacional ) => {
    return  axiosInstance.patch(`/centrosVacacionales/${ centroVacacional.id }`, centroVacacional );
  },
  eliminar: ( centroVacacional: CentroVacacional ) => {
    return  axiosInstance.delete(`/centrosVacacionales/${ centroVacacional.id }` );
  },
};

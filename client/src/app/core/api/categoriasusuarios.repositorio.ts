import { CategoriaUsuarios } from 'app/feature/Admin/models/CategoriaUsuarios';

import { axiosInstance } from '../config/AxiosConfig';

export const CategoriaUsuariosRepositorio = {
  obtener: () => {
    return axiosInstance.get('/categoriasUsuarios');
  },
  guardar: ( categoriaUsuarios: CategoriaUsuarios ) => {
    return axiosInstance.post('/categoriasUsuarios', categoriaUsuarios );
  }
};

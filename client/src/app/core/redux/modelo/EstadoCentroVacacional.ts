import { CentroVacacional } from 'app/feature/Admin/models/CentroVacacional';

export interface EstadoCentroVacacional {
  centrosVacacionales: CentroVacacional[];
  centroVacacionalActivo: CentroVacacional|null;
}

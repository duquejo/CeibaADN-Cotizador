import { Calendario } from 'app/feature/Admin/models/Calendario';

export interface EstadoCalendario {
  calendarios: Calendario[];
  calendarioActivo: Calendario | null;
}

import { CentroVacacionalDto } from 'src/aplicacion/centrovacacional/consulta/dto/centrovacacional.dto';

export abstract class DaoCentroVacacional {

  /**
   * Read OP
   */
  abstract obtenerCentrosVacacionales(): Promise<CentroVacacionalDto[]>;
}
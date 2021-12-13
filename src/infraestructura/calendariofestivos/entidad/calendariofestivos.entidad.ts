import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { CentroVacacionalEntidad } from 'src/infraestructura/centrovacacional/entidad/centrovacacional.entidad';
@Entity({ name: 'calendariofestivos' }) // Nombre de la tabla
export class CalendarioFestivosEntidad {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({ type: 'varchar', length: 500 })
  descripcion: string;

  @ManyToMany( () => CentroVacacionalEntidad, ( centroVacacional: CentroVacacionalEntidad ) => centroVacacional.calendarios )
  centroVacacional: CentroVacacionalEntidad[];

  @Column({ type: 'simple-array' })
  festivos: string[];

  @CreateDateColumn({ type: 'timestamp', name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'fecha_actualizacion' })
  fechaActualizacion: Date;
}

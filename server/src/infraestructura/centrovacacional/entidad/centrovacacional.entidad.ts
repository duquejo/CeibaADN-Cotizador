import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable, UpdateDateColumn } from 'typeorm';

import { CalendarioFestivosEntidad } from 'src/infraestructura/calendariofestivos/entidad/calendariofestivos.entidad';
import { CategoriaUsuariosEntidad } from 'src/infraestructura/categoriausuarios/entidad/categoriausuarios.entidad';

@Entity({ name: 'centrovacacional' }) // Nombre de la tabla
export class CentroVacacionalEntidad {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombre!: string;

  @Column({ type: 'varchar', length: 500, default: '' })
  descripcion: string;

  @Column({ type: 'integer', nullable: true })
  calendarioActivo: number;

  // calendarioFestivos.entidad.ts
  @ManyToMany( () => CalendarioFestivosEntidad, ( calendario: CalendarioFestivosEntidad ) => calendario.centroVacacional, { cascade: true, eager: true } ) 
  @JoinTable({ name: 'centrovacacional_calendariofestivos' })
  calendarios: CalendarioFestivosEntidad[];

  // categoriaUsuarios.entidad.ts
  @ManyToMany( () => CategoriaUsuariosEntidad, ( categoriaUsuarios: CategoriaUsuariosEntidad ) => categoriaUsuarios.centroVacacional,  { cascade: true, eager: true } )
  @JoinTable({ name: 'centrovacacional_categoriausuarios' })
  categoriaUsuarios!: CategoriaUsuariosEntidad[];

  @CreateDateColumn({ type: 'timestamp', name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'fecha_actualizacion' })
  fechaActualizacion: Date;
}

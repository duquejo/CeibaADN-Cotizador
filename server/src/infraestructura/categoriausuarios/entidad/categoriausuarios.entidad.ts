import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany } from 'typeorm';

import { CentroVacacionalEntidad } from 'src/infraestructura/centrovacacional/entidad/centrovacacional.entidad';

@Entity({ name: 'categoriausuarios' }) // Nombre de la tabla
export class CategoriaUsuariosEntidad {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombre!: string;

  @Column({ type: 'varchar', length: 500 })
  descripcion: string;

  @Column({ type: 'integer', nullable: false })
  valorAlta: number;

  @Column({ type: 'integer', nullable: false })
  valorBaja: number;

  // centroVacacional.entidad.ts
  @ManyToMany( () => CentroVacacionalEntidad, centroVacacional => centroVacacional.categoriaUsuarios )
  centroVacacional!: CentroVacacionalEntidad;

  @CreateDateColumn({ type: 'timestamp', name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'fecha_actualizacion' })
  fechaActualizacion: Date;
}

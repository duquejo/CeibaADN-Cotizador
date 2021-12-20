import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';

import { CentroVacacionalEntidad } from 'src/infraestructura/centrovacacional/entidad/centrovacacional.entidad';
import { CategoriaUsuariosEntidad } from 'src/infraestructura/categoriausuarios/entidad/categoriausuarios.entidad';

@Entity({ name: 'cotizacion' }) // Nombre de la tabla
export class CotizacionEntidad {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Generated('uuid')
  @Column({ type: 'varchar', length: 100, nullable: false })
  codigo: string;

  @ManyToOne( () => CentroVacacionalEntidad, { 
    cascade: true,
    eager: true,
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL'
  })
  @JoinColumn({ name: 'centroVacacionalId' })
  centroVacacional: CentroVacacionalEntidad;

  @ManyToOne( () => CategoriaUsuariosEntidad, { 
    cascade: true,
    eager: true,
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL'
  })
  @JoinColumn({ name: 'categoriaUsuariosId' })
  categoriaUsuarios: CategoriaUsuariosEntidad;

  @Column({ type: 'integer', nullable: false })
  personas: number;

  @Column({ type: 'integer', nullable: false })
  total: number;

  @Column({ type: 'varchar', length: 100 })
  fechaInicio: string;

  @Column({ type: 'varchar', length: 100 })
  fechaFin: string;

  @CreateDateColumn({ type: 'timestamp', name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'fecha_actualizacion' })
  fechaActualizacion: Date;
}

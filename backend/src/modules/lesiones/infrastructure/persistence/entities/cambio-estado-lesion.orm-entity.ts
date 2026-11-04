import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { EstadoLesion } from '../../../domain/enums';

import { LesionOrmEntity } from './lesion.orm-entity';

@Entity('cambios_estado_lesion')
export class CambioEstadoLesionOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  lesionId!: number;

  @ManyToOne(() => LesionOrmEntity)
  @JoinColumn({ name: 'lesionId' })
  lesion!: LesionOrmEntity;

  @Column({ type: 'enum', enum: EstadoLesion, nullable: true })
  estadoAnterior!: EstadoLesion | null;

  @Column({ type: 'enum', enum: EstadoLesion })
  estadoActual!: EstadoLesion;

  @Column({ type: 'timestamp' })
  fecha!: Date;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { RutinaOrmEntity } from './rutina.orm-entity';

@Entity('ejercicios')
export class EjercicioOrmEntity {
  @PrimaryGeneratedColumn()
  idEjercicio: number;

  @Column({ type: 'integer' })
  rutinaId: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 500 })
  descripcion: string;

  @Column({ type: 'integer' })
  repeticiones: number;

  @Column({ type: 'varchar', length: 100 })
  series: string;

  @Column({
    type: 'numeric',
    precision: 7,
    scale: 2,
    nullable: true,
  })
  peso: number | null;

  @Column({ type: 'boolean', default: false })
  completado: boolean;

  @ManyToOne(
    () => RutinaOrmEntity,
    (rutina) => rutina.ejercicios,
    { nullable: false },
  )
  @JoinColumn({ name: 'rutinaId' })
  rutina: RutinaOrmEntity;
}
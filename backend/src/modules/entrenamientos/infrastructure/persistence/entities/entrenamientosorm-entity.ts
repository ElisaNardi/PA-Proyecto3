import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { RutinaOrmEntity } from './rutina.orm-entity';

export enum TipoEntrenamiento {
  RUTINARIO = 'RUTINARIO',
  PRE_PELEA = 'PRE_PELEA',
  POST_PELEA = 'POST_PELEA',
}

@Entity('entrenamientos')
export class EntrenamientoOrmEntity {
  @PrimaryGeneratedColumn()
  idEntrenamiento: number;

  @Column({ type: 'integer' })
  boxeadorId: number;

  @Column({ type: 'integer' })
  entrenadorId: number;

  @Column({
    type: 'enum',
    enum: TipoEntrenamiento,
  })
  tipoEntrenamiento: TipoEntrenamiento;

  @Column({ type: 'date' })
  fechaInicio: string;

  @Column({ type: 'date' })
  fechaFin: string;

  @Column({ type: 'date', nullable: true })
  fechaPelea: string | null;

  @OneToMany(
    () => RutinaOrmEntity,
    (rutina) => rutina.entrenamiento,
  )
  rutinas: RutinaOrmEntity[];
}
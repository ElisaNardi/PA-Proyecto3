import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { EntrenamientoOrmEntity } from  './entrenamientosorm-entity';
import { EjercicioOrmEntity } from './ejercicio.orm-entity';
import { ObjetivoOrmEntity } from './objetivo.orm-entity';

@Entity('rutinas')
export class RutinaOrmEntity {
  @PrimaryGeneratedColumn()
  idRutina: number;

  @Column({ type: 'integer' })
  entrenamientoId: number;

  @ManyToOne(
    () => EntrenamientoOrmEntity,
    (entrenamiento) => entrenamiento.rutinas,
    { nullable: false },
  )
  @JoinColumn({ name: 'entrenamientoId' })
  entrenamiento: EntrenamientoOrmEntity;

  @OneToMany(
    () => EjercicioOrmEntity,
    (ejercicio) => ejercicio.rutina,
  )
  ejercicios: EjercicioOrmEntity[];

  @OneToMany(
    () => ObjetivoOrmEntity,
    (objetivo) => objetivo.rutina,
  )
  objetivos: ObjetivoOrmEntity[];
}
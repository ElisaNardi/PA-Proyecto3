import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { RutinaOrmEntity } from './rutina.orm-entity';

@Entity('objetivos')
export class ObjetivoOrmEntity {
  @PrimaryGeneratedColumn()
  idObjetivo: number;

  @Column({ type: 'integer' })
  rutinaId: number;

  @Column({ type: 'varchar', length: 500 })
  descripcion: string;

  @Column({
    type: 'numeric',
    precision: 7,
    scale: 2,
    nullable: true,
  })
  pesoObjetivo: number | null;

  @ManyToOne(
    () => RutinaOrmEntity,
    (rutina) => rutina.objetivos,
    { nullable: false },
  )
  @JoinColumn({ name: 'rutinaId' })
  rutina: RutinaOrmEntity;
}
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { DecimalColumn } from '../../../../../shared/infrastructure/persistence/decorators';

import { EntrenamientoOrmEntity } from './entrenamiento.orm-entity';

@Entity('objetivos')
export class ObjetivoOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  entrenamientoId!: number;

  @ManyToOne(() => EntrenamientoOrmEntity)
  @JoinColumn({ name: 'entrenamientoId' })
  entrenamiento!: EntrenamientoOrmEntity;

  @Column({ type: 'varchar', length: 255 })
  descripcion!: string;

  @DecimalColumn({ precision: 5, scale: 2 })
  pesoObjetivo!: number;
}

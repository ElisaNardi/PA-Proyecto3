import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EntrenamientoOrmEntity } from './entrenamiento.orm-entity';

@Entity('rutinas')
export class RutinaOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  entrenamientoId!: number;

  @ManyToOne(() => EntrenamientoOrmEntity)
  @JoinColumn({ name: 'entrenamientoId' })
  entrenamiento!: EntrenamientoOrmEntity;
}

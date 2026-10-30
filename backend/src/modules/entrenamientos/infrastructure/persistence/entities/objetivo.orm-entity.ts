import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EntrenamientoOrmEntity } from './entrenamiento.orm-entity';
import { DecimalColumn } from '../../../../../shared/infrastructure/decorators/decimal-column.decorator';

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

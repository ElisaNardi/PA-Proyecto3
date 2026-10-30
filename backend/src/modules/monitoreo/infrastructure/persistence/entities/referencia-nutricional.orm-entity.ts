import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DecimalColumn } from '../../../../../shared/infrastructure/decorators/decimal-column.decorator';
import { ObjetivoOrmEntity } from '../../../../entrenamientos/infrastructure/persistence/entities/objetivo.orm-entity';

@Entity('referencias_nutricionales')
export class ReferenciaNutricionalOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  objetivoId!: number;

  @ManyToOne(() => ObjetivoOrmEntity)
  @JoinColumn({ name: 'objetivoId' })
  objetivo!: ObjetivoOrmEntity;

  @DecimalColumn({ precision: 6, scale: 2 })
  caloriasDiarias!: number;

  @DecimalColumn({ precision: 5, scale: 2 })
  proteinas!: number;

  @DecimalColumn({ precision: 5, scale: 2 })
  carbohidratos!: number;

  @DecimalColumn({ precision: 5, scale: 2 })
  grasas!: number;

  @Column({ type: 'timestamp' })
  fechaInicio!: Date;

  @Column({ type: 'timestamp', nullable: true })
  fechaFin!: Date | null;

  @Column({ type: 'timestamp' })
  fechaPesaje!: Date;
}

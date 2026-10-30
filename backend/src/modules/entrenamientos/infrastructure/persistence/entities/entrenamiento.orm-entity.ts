import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BoxeadorOrmEntity } from '../../../../usuarios/infrastructure/persistence/entities/boxeador.orm-entity';
import { TipoEntrenamiento } from '../../../domain/enums/tipo-entrenamiento.enum';

@Entity('entrenamientos')
export class EntrenamientoOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  boxeadorId!: number;

  @ManyToOne(() => BoxeadorOrmEntity)
  @JoinColumn({ name: 'boxeadorId' })
  boxeador!: BoxeadorOrmEntity;

  @Column({ type: 'enum', enum: TipoEntrenamiento })
  tipo!: TipoEntrenamiento;

  @Column({ type: 'timestamp' })
  fechaInicio!: Date;

  @Column({ type: 'timestamp', nullable: true })
  fechaFin!: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  fechaPelea!: Date | null;
}

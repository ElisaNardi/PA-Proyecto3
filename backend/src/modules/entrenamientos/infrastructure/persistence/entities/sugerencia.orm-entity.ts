import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { EntrenadorOrmEntity, BoxeadorOrmEntity } from '../../../../usuarios/infrastructure/persistence/entities';

import { EstadoSugerencia } from '../../../domain/enums';

@Entity('sugerencias')
export class SugerenciaOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  entrenadorId!: number;

  @ManyToOne(() => EntrenadorOrmEntity)
  @JoinColumn({ name: 'entrenadorId' })
  entrenador!: EntrenadorOrmEntity;

  @Column()
  boxeadorId!: number;

  @ManyToOne(() => BoxeadorOrmEntity)
  @JoinColumn({ name: 'boxeadorId' })
  boxeador!: BoxeadorOrmEntity;

  @Column({ type: 'varchar', length: 255 })
  texto!: string;

  @Column({ type: 'enum', enum: EstadoSugerencia, default: EstadoSugerencia.PENDIENTE })
  estado!: EstadoSugerencia;
}

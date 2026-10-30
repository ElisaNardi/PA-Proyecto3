import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EntrenadorOrmEntity } from '../../../../usuarios/infraestructure/persistence/entities/entrenador.orm-entity';
import { BoxeadorOrmEntity } from '../../../../usuarios/infraestructure/persistence/entities/boxeador.orm-entity';
import { EstadoSugerencia } from '../../../domain/enums/estado-sugerencia.enum';

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

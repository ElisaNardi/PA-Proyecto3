import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LesionOrmEntity } from './lesion.orm-entity';
import { EstadoLesion } from '../../../domain/enums/estado-lesion.enum';

@Entity('cambios_estado_lesion')
export class CambioEstadoLesionOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  lesionId!: number;

  @ManyToOne(() => LesionOrmEntity)
  @JoinColumn({ name: 'lesionId' })
  lesion!: LesionOrmEntity;

  @Column({ type: 'enum', enum: EstadoLesion })
  estadoAnterior!: EstadoLesion;

  @Column({ type: 'enum', enum: EstadoLesion })
  estadoActual!: EstadoLesion;

  @Column({ type: 'timestamp' })
  fecha!: Date;
}

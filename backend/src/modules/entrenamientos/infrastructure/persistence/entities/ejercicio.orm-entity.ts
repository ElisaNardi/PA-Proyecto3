import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RutinaOrmEntity } from './rutina.orm-entity';
import { DecimalColumn } from '../../../../../shared/infraestructure/decorators/decimal-column.decorator';

@Entity('ejercicios')
export class EjercicioOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  rutinaId!: number;

  @ManyToOne(() => RutinaOrmEntity)
  @JoinColumn({ name: 'rutinaId' })
  rutina!: RutinaOrmEntity;

  @Column({ type: 'varchar', length: 100 })
  nombre!: string;

  @Column({ type: 'varchar', length: 255 })
  descripcion!: string;

  @Column({ type: 'int' })
  repeticiones!: number;

  @Column({ type: 'varchar', length: 50 })
  series!: string;

  @DecimalColumn({ precision: 5, scale: 2, nullable: true })
  peso!: number | null;

  @Column({ type: 'boolean', default: false })
  completado!: boolean;

  @DecimalColumn({ precision: 5, scale: 2, nullable: true })
  pesoRealizado!: number | null;

  @Column({ type: 'int', nullable: true })
  repeticionesRealizadas!: number | null;
}

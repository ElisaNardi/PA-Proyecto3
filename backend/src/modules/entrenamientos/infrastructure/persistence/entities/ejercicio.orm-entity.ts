import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { RutinaOrmEntity } from './rutina.orm-entity';
import { DecimalColumn } from '../../../../../shared/infraestructure/decorators/decimal-column.decorator';

@Entity('ejercicios')
export class EjercicioOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column({ type: 'varchar', length: 100 })
  nombre!: string;
  
  @Column({ type: 'varchar', length: 500 })
  descripcion!: string;
  
  @Column({ type: 'int' })
  repeticiones!: number;
  
  @Column({ type: 'varchar', length: 100 })
  series!: string;
  
  @DecimalColumn({ nullable: true })
  peso!: number | null;
  
  @Column({ type: 'boolean', default: false })
  completado!: boolean;

  @Column({ type: 'int' })
  rutinaId!: number;

  @ManyToOne(
    () => RutinaOrmEntity,
    (rutina) => rutina.ejercicios,
    { nullable: false },
  )
  @JoinColumn()
  rutina!: RutinaOrmEntity;
}
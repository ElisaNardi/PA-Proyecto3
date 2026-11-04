import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { DecimalColumn } from '../../../../../shared/infrastructure/persistence/decorators';

import { BoxeadorOrmEntity } from '../../../../usuarios/infrastructure/persistence/entities';

@Entity('registros_consumo')
export class RegistroConsumoOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  boxeadorId!: number;

  @ManyToOne(() => BoxeadorOrmEntity)
  @JoinColumn({ name: 'boxeadorId' })
  boxeador!: BoxeadorOrmEntity;

  @Column({ type: 'timestamp' })
  fecha!: Date;

  @DecimalColumn({ precision: 6, scale: 2 })
  caloriasConsumidas!: number;

  @DecimalColumn({ precision: 5, scale: 2 })
  proteinasConsumidas!: number;

  @DecimalColumn({ precision: 5, scale: 2 })
  carbohidratosConsumidos!: number;

  @DecimalColumn({ precision: 5, scale: 2 })
  grasasConsumidas!: number;
}

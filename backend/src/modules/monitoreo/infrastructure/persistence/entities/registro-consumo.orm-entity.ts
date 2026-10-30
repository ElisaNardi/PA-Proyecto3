import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BoxeadorOrmEntity } from '../../../../usuarios/infrastructure/persistence/entities/boxeador.orm-entity';
import { DecimalColumn } from '../../../../../shared/infrastructure/decorators/decimal-column.decorator';

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

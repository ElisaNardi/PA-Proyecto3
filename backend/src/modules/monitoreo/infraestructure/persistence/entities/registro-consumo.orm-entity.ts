import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BoxeadorOrmEntity } from '../../../../usuarios/infraestructure/persistence/entities/boxeador.orm-entity';
import { DecimalColumn } from '../../../../../shared/infraestructure/decorators/decimal-column.decorator';

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

  @DecimalColumn({ precision: 5, scale: 2 })
  caloriasConsumidas!: number;

  @DecimalColumn({ precision: 5, scale: 2 })
  proteinasConsumidas!: number;

  @DecimalColumn({ precision: 5, scale: 2 })
  carbohidratosConsumidos!: number;

  @DecimalColumn({ precision: 5, scale: 2 })
  grasasConsumidas!: number;
}

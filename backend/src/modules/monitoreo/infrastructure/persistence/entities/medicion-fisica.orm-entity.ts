import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BoxeadorOrmEntity } from '../../../../usuarios/infrastructure/persistence/entities/boxeador.orm-entity';
import { DecimalColumn } from '../../../../../shared/infraestructure/decorators/decimal-column.decorator';

@Entity('mediciones_fisicas')
export class MedicionFisicaOrmEntity {
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
  peso!: number;

  @DecimalColumn({ precision: 5, scale: 2 })
  altura!: number;

  @DecimalColumn({ precision: 5, scale: 2, nullable: true })
  porcentajeGrasa!: number | null;

  @DecimalColumn({ precision: 5, scale: 2, nullable: true })
  perimetroBrazo!: number | null;

  @DecimalColumn({ precision: 5, scale: 2, nullable: true })
  perimetroCintura!: number | null;

  @DecimalColumn({ precision: 5, scale: 2, nullable: true })
  perimetroCadera!: number | null;

  @DecimalColumn({ precision: 5, scale: 2, nullable: true })
  perimetroPecho!: number | null;

  @DecimalColumn({ precision: 5, scale: 2, nullable: true })
  perimetroMuslo!: number | null;

  @DecimalColumn({ precision: 5, scale: 2, nullable: true })
  perimetroPantorrilla!: number | null;

  @DecimalColumn({ precision: 5, scale: 2, nullable: true })
  envergadura!: number | null;
}

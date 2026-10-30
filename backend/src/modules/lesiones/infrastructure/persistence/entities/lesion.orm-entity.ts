import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BoxeadorOrmEntity } from '../../../../usuarios/infrastructure/persistence/entities/boxeador.orm-entity';
import { Gravedad } from '../../../domain/enums/gravedad.enum';

@Entity('lesiones')
export class LesionOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  boxeadorId!: number;

  @ManyToOne(() => BoxeadorOrmEntity)
  @JoinColumn({ name: 'boxeadorId' })
  boxeador!: BoxeadorOrmEntity;

  @Column({ type: 'varchar', length: 255 })
  descripcion!: string;

  @Column({ type: 'varchar', length: 100 })
  zona!: string;

  @Column({ type: 'enum', enum: Gravedad })
  gravedad!: Gravedad;

  @Column({ type: 'timestamp' })
  fecha!: Date;
}

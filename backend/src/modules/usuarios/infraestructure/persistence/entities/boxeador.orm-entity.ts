import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { UsuarioOrmEntity } from './usuario.orm-entity';
import { EntrenadorOrmEntity } from './entrenador.orm-entity';
import { DecimalColumn } from '../../../../../shared/infraestructure/decorators/decimal-column.decorator';
import { CategoriaPeso } from '../../../../../shared/domain/enums/categoria-peso.enum';
import { Sexo } from '../../../domain/enums/sexo.enum';

@Entity('boxeadores')
export class BoxeadorOrmEntity {
  @PrimaryColumn()
  id!: number;

  @OneToOne(() => UsuarioOrmEntity)
  @JoinColumn({ name: 'id' })
  usuario!: UsuarioOrmEntity;

  @Column({ nullable: true })
  entrenadorId!: number | null;

  @ManyToOne(() => EntrenadorOrmEntity, { nullable: true })
  @JoinColumn({ name: 'entrenadorId' })
  entrenador!: EntrenadorOrmEntity | null;

  @DecimalColumn({ precision: 5, scale: 2 })
  pesoInicial!: number;

  @DecimalColumn({ precision: 5, scale: 2 })
  alturaInicial!: number;

  @Column({ type: 'enum', enum: CategoriaPeso })
  categoria!: CategoriaPeso;

  @Column({ type: 'enum', enum: Sexo })
  sexo!: Sexo;
}

import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';

import { DecimalColumn } from '../../../../../shared/infrastructure/decorators/decimal-column.decorator';
import { CategoriaPeso } from '../../../../../shared/domain/enums/categoria-peso.enum';

import { Sexo } from '../../../domain/enums/sexo.enum';

import { UsuarioOrmEntity } from './usuario.orm-entity';
import { EntrenadorOrmEntity } from './entrenador.orm-entity';

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

  @DecimalColumn({ precision: 5, scale: 2, nullable: true })
  pesoInicial!: number | null;

  @DecimalColumn({ precision: 5, scale: 2, nullable: true })
  alturaInicial!: number | null;

  @Column({ type: 'enum', enum: CategoriaPeso, nullable: true })
  categoria!: CategoriaPeso | null;

  @Column({ type: 'enum', enum: Sexo })
  sexo!: Sexo;
}

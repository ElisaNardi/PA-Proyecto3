import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";

import { DecimalColumn } from "../../../../../shared/infraestructure/decorators/decimal-column.decorator";
import { CategoriaPeso } from "../../../../../shared/domain/enums/categoria-peso.enum";

import { Sexo } from "../../../domain/enums/sexo.enum";

import { UsuarioOrmEntity } from "./usuario.orm-entity";
import { EntrenadorOrmEntity } from "./entrenador.orm-entity";

@Entity('boxeadores')
export class BoxeadorOrmEntity {
    @PrimaryColumn()
    id!: number;

    @OneToOne(() => UsuarioOrmEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id' })
    usuario!: UsuarioOrmEntity;

    @Column({ nullable: true })
    entrenadorId!: number | null;

    @ManyToOne(() => EntrenadorOrmEntity, { nullable: true })
    @JoinColumn()
    entrenador?: EntrenadorOrmEntity | null;

    @DecimalColumn({ nullable: true })
    pesoInicial!: number | null;

    @DecimalColumn({ nullable: true })
    alturaInicial!: number | null;

    @Column({ type: 'enum', enum: CategoriaPeso, nullable: true })
    categoria!: CategoriaPeso | null;

    @Column({ type: 'enum', enum: Sexo })
    sexo!: Sexo;
}

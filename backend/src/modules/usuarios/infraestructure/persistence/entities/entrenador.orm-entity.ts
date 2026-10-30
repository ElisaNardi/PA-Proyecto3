import { Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

import { UsuarioOrmEntity } from "./usuario.orm-entity";

@Entity('entrenadores')
export class EntrenadorOrmEntity {
    @PrimaryColumn()
    id!: number;

    @OneToOne(() => UsuarioOrmEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id' })
    usuario!: UsuarioOrmEntity;
}

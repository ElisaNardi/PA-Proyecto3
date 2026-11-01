import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { USUARIOS_REPOSITORY_TOKEN } from "../../domain/ports/usuarios-repository.port";

import { UsuarioOrmEntity } from "./entities/usuario.orm-entity";
import { BoxeadorOrmEntity } from "./entities/boxeador.orm-entity";
import { EntrenadorOrmEntity } from "./entities/entrenador.orm-entity";
import { UsuariosRepository } from "./repositories/usuarios-repository.adapter";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UsuarioOrmEntity,
            BoxeadorOrmEntity,
            EntrenadorOrmEntity
        ])
    ],
    providers: [
        {
            provide: USUARIOS_REPOSITORY_TOKEN,
            useClass: UsuariosRepository
        }
    ],
    exports: [
        TypeOrmModule,
        USUARIOS_REPOSITORY_TOKEN
    ]
})
export class UsuariosPersistenceModule {}

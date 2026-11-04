import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { USUARIOS_REPOSITORY_TOKEN } from "../../domain/ports";

import { UsuarioOrmEntity, BoxeadorOrmEntity, EntrenadorOrmEntity } from "./entities";
import { UsuariosRepository } from "./repositories";

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

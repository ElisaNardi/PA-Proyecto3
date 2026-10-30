import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UsuarioOrmEntity } from "./entities/usuario.orm-entity";
import { BoxeadorOrmEntity } from "./entities/boxeador.orm-entity";
import { EntrenadorOrmEntity } from "./entities/entrenador.orm-entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UsuarioOrmEntity,
            BoxeadorOrmEntity,
            EntrenadorOrmEntity
        ])
    ],
    providers: [
        // acá ponemos todos los repos y tokens, como { provide: USUARIOS_REPOSITORY_TOKEN, useClass: UsuariosRepository }
    ],
    exports: [
        TypeOrmModule,
        // acá los tokens, como USUARIOS_REPOSITORY_TOKEN
    ]
})
export class UsuariosPersistenceModule {}

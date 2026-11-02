import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { LESIONES_REPOSITORY_TOKEN } from "../../domain/ports/lesiones-repository.port";
import { LesionesRepository } from "./repositories/lesiones-repository.adapter";

import { LesionOrmEntity, CambioEstadoLesionOrmEntity } from "./entities";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CambioEstadoLesionOrmEntity,
            LesionOrmEntity
        ])
    ],
    providers: [
        {
            provide: LESIONES_REPOSITORY_TOKEN,
            useClass: LesionesRepository
        }
    ],
    exports: [
        TypeOrmModule,
        LESIONES_REPOSITORY_TOKEN
    ]
})
export class LesionesPersistenceModule {}

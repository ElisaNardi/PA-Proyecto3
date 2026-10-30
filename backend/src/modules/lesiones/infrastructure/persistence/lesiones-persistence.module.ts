import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CambioEstadoLesionOrmEntity } from "./entities/cambio-estado-lesion.orm-entity";
import { LesionOrmEntity } from "./entities/lesion.orm-entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CambioEstadoLesionOrmEntity,
            LesionOrmEntity
        ])
    ],
    providers: [
        // acá ponemos todos los repos y tokens, como { provide: LESIONES_REPOSITORY_TOKEN, useClass: LesionesRepository }
    ],
    exports: [
        TypeOrmModule,
        // acá los tokens, como LESIONES_REPOSITORY_TOKEN
    ]
})
export class LesionesPersistenceModule {}

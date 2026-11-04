import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { EjercicioOrmEntity, EntrenamientoOrmEntity, ObjetivoOrmEntity, RutinaOrmEntity, SugerenciaOrmEntity } from "./entities";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            EjercicioOrmEntity,
            EntrenamientoOrmEntity,
            ObjetivoOrmEntity,
            RutinaOrmEntity,
            SugerenciaOrmEntity
        ])
    ],
    providers: [
        // acá ponemos todos los repos y tokens, como { provide: EJERCICIOS_REPOSITORY_TOKEN, useClass: EjerciciosRepository }
    ],
    exports: [
        TypeOrmModule,
        // acá los tokens, como EJERCICIOS_REPOSITORY_TOKEN
    ]
})
export class EntrenamientosPersistenceModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { EjercicioOrmEntity } from "./entities/ejercicio.orm-entity";
import { EntrenamientoOrmEntity } from "./entities/entrenamiento.orm-entity";
import { ObjetivoOrmEntity } from "./entities/objetivo.orm-entity";
import { RutinaOrmEntity } from "./entities/rutina.orm-entity";
import { SugerenciaOrmEntity } from "./entities/sugerencia.orm-entity";

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

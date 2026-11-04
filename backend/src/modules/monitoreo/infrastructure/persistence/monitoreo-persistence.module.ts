import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { MedicionFisicaOrmEntity, ReferenciaNutricionalOrmEntity, RegistroConsumoOrmEntity } from "./entities";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            MedicionFisicaOrmEntity,
            ReferenciaNutricionalOrmEntity,
            RegistroConsumoOrmEntity
        ])
    ],
    providers: [
        // acá ponemos todos los repos y tokens, como { provide: MEDICIONES_FISICAS_REPOSITORY_TOKEN, useClass: MedicionesFisicasRepository }
    ],
    exports: [
        TypeOrmModule,
        // acá los tokens, como MEDICIONES_FISICAS_REPOSITORY_TOKEN
    ]
})
export class MonitoreoPersistenceModule {}

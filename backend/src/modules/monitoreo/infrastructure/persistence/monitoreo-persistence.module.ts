import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MedicionFisicaOrmEntity } from "./entities/medicion-fisica.orm-entity";
import { ReferenciaNutricionalOrmEntity } from "./entities/referencia-nutricional.orm-entity";
import { RegistroConsumoOrmEntity } from "./entities/registro-consumo.orm-entity";

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

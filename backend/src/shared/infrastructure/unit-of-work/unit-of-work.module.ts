import { Global, Module } from "@nestjs/common";
import { GestorEntityManager } from "./gestor-entity-manager";
import { UNIT_OF_WORK_TOKEN } from "../../application/unit-of-work/unit-of-work.port";
import { UnitOfWork } from "./unit-of-work.adapter";

@Global()
@Module({
    providers: [
        GestorEntityManager,
        {
            provide: UNIT_OF_WORK_TOKEN,
            useClass: UnitOfWork
        }
    ],
    exports: [
        GestorEntityManager,
        UNIT_OF_WORK_TOKEN
    ]
})
export class UnitOfWorkModule {}

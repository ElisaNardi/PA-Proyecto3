import { Injectable } from "@nestjs/common";
import { IUnitOfWork } from "../../application/unit-of-work/unit-of-work.port";
import { GestorEntityManager } from "./gestor-entity-manager";

@Injectable()
export class UnitOfWork implements IUnitOfWork {
    constructor(
        private readonly gestor: GestorEntityManager
    ) {}

    async runInTransaction<T>(work: () => Promise<T>): Promise<T> {
        return this.gestor.runInTransaction(work);
    }
}
import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { AsyncLocalStorage } from "node:async_hooks";
import { DataSource, EntityManager } from "typeorm";

const transactionStore = new AsyncLocalStorage<EntityManager>();

@Injectable()
export class GestorEntityManager {
    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource
    ) {}

    async runInTransaction<T>(work: () => Promise<T>): Promise<T> {
        if (this.inActualTransaction) {
            return work();
        }
        return this.dataSource.transaction(async (manager) => transactionStore.run(manager, work));
    }

    get actual(): EntityManager {
        return transactionStore.getStore() ?? this.dataSource.manager;
    }

    get inActualTransaction(): boolean {
        return transactionStore.getStore() !== undefined;
    }
}

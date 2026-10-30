export const UNIT_OF_WORK_TOKEN = Symbol('IUnitOfWork');

export interface IUnitOfWork {
    runInTransaction<T>(work: () => Promise<T>): Promise<T>;
}

export const HASHER_TOKEN = Symbol('IHasher');

export interface IHasher {
    hashearPassword(password: string): Promise<string>;
    compararPassword(password: string, hash: string): Promise<boolean>;
}

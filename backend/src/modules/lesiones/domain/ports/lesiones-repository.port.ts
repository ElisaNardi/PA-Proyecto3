import { Lesion } from "../entities";

export const LESIONES_REPOSITORY_TOKEN = Symbol('ILesionesRepository');

export interface ILesionesRepository {
    save(lesion: Lesion): Promise<Lesion>;
}

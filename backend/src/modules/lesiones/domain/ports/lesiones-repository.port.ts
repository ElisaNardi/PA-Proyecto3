import { Lesion } from "../entities";

export const LESIONES_REPOSITORY_TOKEN = Symbol('ILesionesRepository');

export interface ILesionesRepository {
    save(lesion: Lesion): Promise<Lesion>;
    findById(id: number): Promise<Lesion | null>;
    findByBoxeadorId(boxeadorId: number): Promise<Lesion[]>;
}

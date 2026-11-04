import { Usuario, Boxeador } from "../entities";

export const USUARIOS_REPOSITORY_TOKEN = Symbol('IUsuariosRepository');

export interface IUsuariosRepository {
    save(usuario: Usuario): Promise<Usuario>;
    findByEmail(email: string): Promise<Usuario | null>;
    findById(id: number): Promise<Usuario | null>;
    findBoxeadoresByEntrenador(entrenadorId: number): Promise<Boxeador[]>;
}

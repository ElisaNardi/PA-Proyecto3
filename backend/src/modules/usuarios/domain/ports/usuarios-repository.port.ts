import { Usuario } from "../entities/usuario.entity";

export const USUARIOS_REPOSITORY_TOKEN = Symbol('IUsuariosRepository');

export interface IUsuariosRepository {
    save(usuario: Usuario): Promise<Usuario>;
    findByEmail(email: string): Promise<Usuario | null>;
    findById(id: number): Promise<Usuario | null>;
}

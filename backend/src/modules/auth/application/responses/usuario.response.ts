import { Rol } from "../../../../shared/domain/enums";

export interface UsuarioResponse {
    idUsuario: number;
    nombre: string;
    email: string;
    rol: Rol;
}

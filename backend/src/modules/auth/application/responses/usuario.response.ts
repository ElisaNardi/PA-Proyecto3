import { Rol } from "../../../usuarios/domain/enums/rol.enum";

export interface UsuarioResponse {
    idUsuario: number;
    nombre: string;
    email: string;
    rol: Rol;
}

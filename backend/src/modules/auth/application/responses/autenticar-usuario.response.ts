import { Rol } from "../../../usuarios/domain/enums/rol.enum";

export interface AutenticarUsuarioResponse {
    accessToken: string;
    usuario: {
        idUsuario: number;
        nombre: string;
        rol: Rol;
    };
}

import { Rol } from "../../../../shared/domain/enums";

export interface AutenticarUsuarioResponse {
    accessToken: string;
    usuario: {
        idUsuario: number;
        nombre: string;
        rol: Rol;
    };
}

import { Rol } from "../../../../shared/domain/enums/rol.enum";

export interface AutenticarUsuarioResponse {
    accessToken: string;
    usuario: {
        idUsuario: number;
        nombre: string;
        rol: Rol;
    };
}

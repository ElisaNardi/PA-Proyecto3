import { Usuario } from "../../../usuarios/domain/entities/usuario.entity";
import { AutenticarUsuarioResponse } from "../responses/autenticar-usuario.response";
import { UsuarioResponse } from "../responses/usuario.response";

export class UsuarioResponseMapper {
    static toUsuarioResponse(usuario: Usuario): UsuarioResponse {
        return {
            idUsuario: usuario.getId()!,
            nombre: usuario.getNombre(),
            email: usuario.getEmail(),
            rol: usuario.getRol()
        };
    }

    static toAutenticarUsuarioResponse(usuario: Usuario, accessToken: string): AutenticarUsuarioResponse {
        return {
            accessToken,
            usuario: {
                idUsuario: usuario.getId()!,
                nombre: usuario.getNombre(),
                rol: usuario.getRol()
            }
        };
    }
}

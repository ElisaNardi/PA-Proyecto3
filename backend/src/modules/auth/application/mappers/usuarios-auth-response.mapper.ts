import { Usuario } from "../../../usuarios/domain/entities";

import { UsuarioResponse, AutenticarUsuarioResponse } from "../responses";

export class UsuarioAuthResponseMapper {
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

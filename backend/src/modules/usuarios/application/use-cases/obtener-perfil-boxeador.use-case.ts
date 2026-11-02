import { ForbiddenException, Inject, Injectable } from "@nestjs/common";

import { Rol } from "../../../../shared/domain/enums/rol.enum";

import { type IUsuariosRepository, USUARIOS_REPOSITORY_TOKEN } from "../../domain/ports/usuarios-repository.port";
import { Boxeador } from "../../domain/entities";

import { PerfilBoxeadorResponse } from "../responses";
import { UsuariosResponseMapper } from "../mappers/usuarios-response.mapper";
import { BoxeadorNoEncontradoException } from "../exceptions/boxeador-no-encontrado.exception";

@Injectable()
export class ObtenerPerfilBoxeadorUseCase {
    constructor(
        @Inject(USUARIOS_REPOSITORY_TOKEN)
        private readonly usuarios: IUsuariosRepository
    ) {}

    async execute(idBoxeadorRuta: number, idUsuarioAutenticado: number, rolAutenticado: Rol): Promise<PerfilBoxeadorResponse> {
        const usuario = await this.usuarios.findById(idBoxeadorRuta);
        if (!usuario || !(usuario instanceof Boxeador)) {
            throw new BoxeadorNoEncontradoException();
        }

        const esElPropioBoxeador = rolAutenticado === Rol.BOXEADOR && idUsuarioAutenticado === usuario.getId();
        const esSuEntrenador = rolAutenticado === Rol.ENTRENADOR && idUsuarioAutenticado === usuario.getEntrenadorId();

        if (!esElPropioBoxeador && !esSuEntrenador) {
            throw new ForbiddenException();
        }

        return UsuariosResponseMapper.toPerfilBoxeadorResponse(usuario);
    }
}

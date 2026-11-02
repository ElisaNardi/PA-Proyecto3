import { ForbiddenException, Injectable } from "@nestjs/common";

import { Rol } from "../../../../shared/domain/enums/rol.enum";


import { PerfilBoxeadorResponse } from "../responses";
import { UsuariosResponseMapper } from "../mappers/usuarios-response.mapper";
import { BoxeadorFinder } from "../services/boxeador.finder";

@Injectable()
export class ObtenerPerfilBoxeadorUseCase {
    constructor(
        private readonly finder: BoxeadorFinder
    ) {}

    async execute(idBoxeadorRuta: number, idUsuarioAutenticado: number, rolAutenticado: Rol): Promise<PerfilBoxeadorResponse> {
        const usuario = await this.finder.findOrFail(idBoxeadorRuta);

        const esElPropioBoxeador = rolAutenticado === Rol.BOXEADOR && idUsuarioAutenticado === usuario.getId();
        const esSuEntrenador = rolAutenticado === Rol.ENTRENADOR && idUsuarioAutenticado === usuario.getEntrenadorId();

        if (!esElPropioBoxeador && !esSuEntrenador) {
            throw new ForbiddenException();
        }

        return UsuariosResponseMapper.toPerfilBoxeadorResponse(usuario);
    }
}

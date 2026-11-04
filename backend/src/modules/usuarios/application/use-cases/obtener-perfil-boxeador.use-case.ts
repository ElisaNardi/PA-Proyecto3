import { ForbiddenException, Injectable } from "@nestjs/common";

import { Rol } from "../../../../shared/domain/enums";


import { PerfilBoxeadorResponse } from "../responses";
import { UsuariosResponseMapper } from "../mappers";
import { BoxeadorFinder } from "../services";

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

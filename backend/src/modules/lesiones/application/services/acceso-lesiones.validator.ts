import { ForbiddenException, Injectable } from "@nestjs/common";

import { Rol } from "../../../../shared/domain/enums";

import { BoxeadorFinder } from "../../../usuarios/application/services";

@Injectable()
export class AccesoLesionesValidator {
    constructor(
        private readonly finder: BoxeadorFinder
    ) {}

    async validar(idBoxeador: number, idUsuarioAutenticado: number, rolAutenticado: Rol): Promise<void> {
        const usuario = await this.finder.findOrFail(idBoxeador);

        const esElPropioBoxeador = rolAutenticado === Rol.BOXEADOR && idUsuarioAutenticado === usuario.getId()!;
        const esSuEntrenador = rolAutenticado === Rol.ENTRENADOR && idUsuarioAutenticado === usuario.getEntrenadorId()!;

        if (!esElPropioBoxeador && !esSuEntrenador) {
            throw new ForbiddenException();
        }
    }
}

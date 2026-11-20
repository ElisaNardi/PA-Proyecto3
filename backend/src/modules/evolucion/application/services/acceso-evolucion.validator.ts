import { ForbiddenException, Injectable } from "@nestjs/common";

import { Rol } from "../../../../shared/domain/enums";

import { BoxeadorFinder } from "../../../usuarios/application/services";

@Injectable()
export class AccesoEvolucionValidator {
    constructor(
        private readonly finder: BoxeadorFinder
    ) {}

    // Puede ver la evolución el propio boxeador o su entrenador vinculado.
    async validar(idBoxeador: number, idUsuarioAutenticado: number, rolAutenticado: Rol): Promise<void> {
        const boxeador = await this.finder.findOrFail(idBoxeador);

        const esElPropioBoxeador = rolAutenticado === Rol.BOXEADOR && idUsuarioAutenticado === boxeador.getId();
        const esSuEntrenador = rolAutenticado === Rol.ENTRENADOR && idUsuarioAutenticado === boxeador.getEntrenadorId();

        if (!esElPropioBoxeador && !esSuEntrenador) {
            throw new ForbiddenException();
        }
    }
}

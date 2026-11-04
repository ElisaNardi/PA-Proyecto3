import { Inject, Injectable } from "@nestjs/common";

import { Rol } from "../../../../shared/domain/enums";

import { type ILesionesRepository, LESIONES_REPOSITORY_TOKEN } from "../../domain/ports";

import { LesionDetalleResponse } from "../responses";
import { LesionesResponseMapper } from "../mappers";
import { LesionNoEncontradaException } from "../exceptions";
import { AccesoLesionesValidator } from "../services";

@Injectable()
export class ObtenerLesionUseCase {
    constructor(
        @Inject(LESIONES_REPOSITORY_TOKEN)
        private readonly repo: ILesionesRepository,
        private readonly acceso: AccesoLesionesValidator
    ) {}

    async execute(idLesion: number, idUsuarioAutenticado: number, rolAutenticado: Rol): Promise<LesionDetalleResponse> {
        const lesion = await this.repo.findById(idLesion);
        if (!lesion) {
            throw new LesionNoEncontradaException();
        }

        await this.acceso.validar(lesion.getBoxeadorId(), idUsuarioAutenticado, rolAutenticado);

        return LesionesResponseMapper.toDetalleResponse(lesion);
    }
}

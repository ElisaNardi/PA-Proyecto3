import { Injectable } from "@nestjs/common";

import { RegistrarLesionUseCase } from "../use-cases/registrar-lesion.use-case";
import { RegistrarLesionDto } from "../dtos/registrar-lesion.dto";
import { LesionResponse } from "../responses/lesion.response";

@Injectable()
export class LesionesFacade {
    constructor(
        private readonly registrarLesionUseCase: RegistrarLesionUseCase
    ) {}

    async registrarLesion(idBoxeadorRuta: number, idBoxeadorAutenticado: number, dto: RegistrarLesionDto): Promise<LesionResponse> {
        return this.registrarLesionUseCase.execute(idBoxeadorRuta, idBoxeadorAutenticado, dto);
    }
}

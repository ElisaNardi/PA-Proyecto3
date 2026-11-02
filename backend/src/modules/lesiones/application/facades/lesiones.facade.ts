import { Injectable } from "@nestjs/common";

import { RegistrarLesionUseCase, ActualizarEstadoLesionUseCase } from "../use-cases";
import { LesionResponse, ActualizarEstadoLesionResponse } from "../responses";
import { RegistrarLesionDto, ActualizarEstadoLesionDto } from "../dtos";

@Injectable()
export class LesionesFacade {
    constructor(
        private readonly registrarLesionUseCase: RegistrarLesionUseCase,
        private readonly actualizarEstadoLesionUseCase: ActualizarEstadoLesionUseCase
    ) {}

    async registrarLesion(idBoxeadorRuta: number, idBoxeadorAutenticado: number, dto: RegistrarLesionDto): Promise<LesionResponse> {
        return this.registrarLesionUseCase.execute(idBoxeadorRuta, idBoxeadorAutenticado, dto);
    }

    async actualizarEstadoLesion(idLesion: number, idBoxeadorAutenticado: number, dto: ActualizarEstadoLesionDto): Promise<ActualizarEstadoLesionResponse> {
        return this.actualizarEstadoLesionUseCase.execute(idLesion, idBoxeadorAutenticado, dto);
    }
}

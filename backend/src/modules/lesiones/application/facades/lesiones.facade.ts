import { Injectable } from "@nestjs/common";

import { Rol } from "../../../../shared/domain/enums/rol.enum";

import { EstadoLesion } from "../../domain/enums/estado-lesion.enum";

import { RegistrarLesionUseCase, ActualizarEstadoLesionUseCase, ConsultarLesionesUseCase } from "../use-cases";
import { LesionResponse, ActualizarEstadoLesionResponse } from "../responses";
import { RegistrarLesionDto, ActualizarEstadoLesionDto } from "../dtos";

@Injectable()
export class LesionesFacade {
    constructor(
        private readonly registrarLesionUseCase: RegistrarLesionUseCase,
        private readonly actualizarEstadoLesionUseCase: ActualizarEstadoLesionUseCase,
        private readonly consultarLesionesUseCase: ConsultarLesionesUseCase
    ) {}

    async registrarLesion(idBoxeadorRuta: number, idBoxeadorAutenticado: number, dto: RegistrarLesionDto): Promise<LesionResponse> {
        return this.registrarLesionUseCase.execute(idBoxeadorRuta, idBoxeadorAutenticado, dto);
    }

    async actualizarEstadoLesion(idLesion: number, idBoxeadorAutenticado: number, dto: ActualizarEstadoLesionDto): Promise<ActualizarEstadoLesionResponse> {
        return this.actualizarEstadoLesionUseCase.execute(idLesion, idBoxeadorAutenticado, dto);
    }

    async consultarLesiones(idBoxeador: number, idUsuarioAutenticado: number, rolAutenticado: Rol, estado?: EstadoLesion): Promise<LesionResponse[]> {
        return this.consultarLesionesUseCase.execute(idBoxeador, idUsuarioAutenticado, rolAutenticado, estado);
    }
}

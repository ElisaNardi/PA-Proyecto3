import { Injectable } from "@nestjs/common";

import { Rol } from "../../../../shared/domain/enums";

import { EstadoLesion } from "../../domain/enums";

import { RegistrarLesionUseCase, ActualizarEstadoLesionUseCase, ConsultarLesionesUseCase, ObtenerLesionUseCase } from "../use-cases";
import { LesionResponse, ActualizarEstadoLesionResponse, LesionDetalleResponse } from "../responses";
import { RegistrarLesionDto, ActualizarEstadoLesionDto } from "../dtos";

@Injectable()
export class LesionesFacade {
    constructor(
        private readonly registrarLesionUseCase: RegistrarLesionUseCase,
        private readonly actualizarEstadoLesionUseCase: ActualizarEstadoLesionUseCase,
        private readonly consultarLesionesUseCase: ConsultarLesionesUseCase,
        private readonly obtenerLesionUseCase: ObtenerLesionUseCase
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

    async obtenerLesion(idLesion: number, idUsuarioAutenticado: number, rolAutenticado: Rol): Promise<LesionDetalleResponse> {
        return this.obtenerLesionUseCase.execute(idLesion, idUsuarioAutenticado, rolAutenticado);
    }
}

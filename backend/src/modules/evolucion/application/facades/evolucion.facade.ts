import { Injectable } from "@nestjs/common";

import { Rol } from "../../../../shared/domain/enums";

import { ObtenerEvolucionQueryDto } from "../dtos";
import { EvolucionResponse } from "../responses";
import { ObtenerEvolucionBoxeadorUseCase } from "../use-cases";

@Injectable()
export class EvolucionFacade {
    constructor(
        private readonly obtenerEvolucionBoxeador: ObtenerEvolucionBoxeadorUseCase
    ) {}

    async obtenerEvolucion(idBoxeadorRuta: number, idUsuarioAutenticado: number, rolAutenticado: Rol, query: ObtenerEvolucionQueryDto): Promise<EvolucionResponse> {
        return this.obtenerEvolucionBoxeador.execute(idBoxeadorRuta, idUsuarioAutenticado, rolAutenticado, query);
    }
}

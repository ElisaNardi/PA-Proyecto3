import { Injectable } from "@nestjs/common";

import { VincularBoxeadorDto } from "../dtos/vincular-boxeador.dto";
import { VincularBoxeadorResponse } from "../responses/vincular-boxeador.response";
import { VincularBoxeadorAEntrenadorUseCase } from "../use-cases/vincular-boxeador-a-entrenador.use-case";

@Injectable()
export class UsuariosFacade {
    constructor(
        private readonly vincularBoxeador: VincularBoxeadorAEntrenadorUseCase
    ) {}

    async vincular(idEntrenadorRuta: number, idEntrenadorAutenticado: number, dto: VincularBoxeadorDto): Promise<VincularBoxeadorResponse> {
        return this.vincularBoxeador.execute(idEntrenadorRuta, idEntrenadorAutenticado, dto);
    }
}
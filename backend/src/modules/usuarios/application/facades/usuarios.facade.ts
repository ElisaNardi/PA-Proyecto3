import { Injectable } from "@nestjs/common";

import { VincularBoxeadorDto } from "../dtos/vincular-boxeador.dto";
import { VincularBoxeadorResponse, BoxeadorVinculadoResponse } from "../responses";
import { VincularBoxeadorAEntrenadorUseCase, ObtenerBoxeadoresDeEntrenadorUseCase } from "../use-cases";

@Injectable()
export class UsuariosFacade {
    constructor(
        private readonly vincularBoxeador: VincularBoxeadorAEntrenadorUseCase,
        private readonly obtenerBoxeadoresDeEntrenador: ObtenerBoxeadoresDeEntrenadorUseCase
    ) {}

    async vincular(idEntrenadorRuta: number, idEntrenadorAutenticado: number, dto: VincularBoxeadorDto): Promise<VincularBoxeadorResponse> {
        return this.vincularBoxeador.execute(idEntrenadorRuta, idEntrenadorAutenticado, dto);
    }

    async obtenerBoxeadores(idEntrenadorRuta: number, idEntrenadorAutenticado: number): Promise<BoxeadorVinculadoResponse[]> {
        return this.obtenerBoxeadoresDeEntrenador.execute(idEntrenadorRuta, idEntrenadorAutenticado);
    }
    
}

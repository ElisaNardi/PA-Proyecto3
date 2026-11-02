import { Injectable } from "@nestjs/common";

import { Rol } from "../../../../shared/domain/enums/rol.enum";

import { VincularBoxeadorDto } from "../dtos/vincular-boxeador.dto";
import { VincularBoxeadorResponse, BoxeadorVinculadoResponse, PerfilBoxeadorResponse } from "../responses";
import { VincularBoxeadorAEntrenadorUseCase, ObtenerBoxeadoresDeEntrenadorUseCase, ObtenerPerfilBoxeadorUseCase } from "../use-cases";

@Injectable()
export class UsuariosFacade {
    constructor(
        private readonly vincularBoxeador: VincularBoxeadorAEntrenadorUseCase,
        private readonly obtenerBoxeadoresDeEntrenador: ObtenerBoxeadoresDeEntrenadorUseCase,
        private readonly obtenerPerfilBoxeador: ObtenerPerfilBoxeadorUseCase
    ) {}

    async vincular(idEntrenadorRuta: number, idEntrenadorAutenticado: number, dto: VincularBoxeadorDto): Promise<VincularBoxeadorResponse> {
        return this.vincularBoxeador.execute(idEntrenadorRuta, idEntrenadorAutenticado, dto);
    }

    async obtenerBoxeadores(idEntrenadorRuta: number, idEntrenadorAutenticado: number): Promise<BoxeadorVinculadoResponse[]> {
        return this.obtenerBoxeadoresDeEntrenador.execute(idEntrenadorRuta, idEntrenadorAutenticado);
    }
    
    async obtenerPerfilDeBoxeador(idBoxeadorRuta: number, idUsuarioAutenticado: number, rolAutenticado: Rol): Promise<PerfilBoxeadorResponse> {
        return this.obtenerPerfilBoxeador.execute(idBoxeadorRuta, idUsuarioAutenticado, rolAutenticado);
    }
}

import { Inject, Injectable } from "@nestjs/common";

import { type IUsuariosRepository, USUARIOS_REPOSITORY_TOKEN } from "../../domain/ports";

import { BoxeadorVinculadoResponse } from "../responses";
import { UsuariosResponseMapper } from "../mappers";
import { AutorizacionValidator } from "../services";

@Injectable()
export class ObtenerBoxeadoresDeEntrenadorUseCase {
    constructor(
        @Inject(USUARIOS_REPOSITORY_TOKEN)
        private readonly usuarios: IUsuariosRepository
    ) {}

    async execute(idEntrenadorRuta: number, idEntrenadorAutenticado: number): Promise<BoxeadorVinculadoResponse[]> {
        AutorizacionValidator.validar(idEntrenadorRuta, idEntrenadorAutenticado);

        const boxeadores = await this.usuarios.findBoxeadoresByEntrenador(idEntrenadorRuta);
        return boxeadores.map((b) => UsuariosResponseMapper.toBoxeadorVinculadoResponse(b));
    }
}

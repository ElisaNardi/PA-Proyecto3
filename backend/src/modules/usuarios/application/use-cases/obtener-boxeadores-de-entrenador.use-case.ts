import { Inject, Injectable } from "@nestjs/common";

import { type IUsuariosRepository, USUARIOS_REPOSITORY_TOKEN } from "../../domain/ports/usuarios-repository.port";

import { BoxeadorVinculadoResponse } from "../responses";
import { UsuariosResponseMapper } from "../mappers/usuarios-response.mapper";
import { AutorizacionValidator } from "../services/autorizacion.validator";

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

import { Inject, Injectable } from "@nestjs/common";

import { Rol } from "../../../../shared/domain/enums";

import { type ILesionesRepository, LESIONES_REPOSITORY_TOKEN } from "../../domain/ports";
import { EstadoLesion } from "../../domain/enums";

import { LesionResponse } from "../responses";
import { LesionesResponseMapper } from "../mappers";
import { AccesoLesionesValidator } from "../services";

@Injectable()
export class ConsultarLesionesUseCase {
    constructor(
        @Inject(LESIONES_REPOSITORY_TOKEN)
        private readonly repo: ILesionesRepository,
        private readonly acceso: AccesoLesionesValidator
    ) {}

    async execute(
        idBoxeadorRuta: number,
        idUsuarioAutenticado: number,
        rolAutenticado: Rol,
        estado?: EstadoLesion
    ): Promise<LesionResponse[]> {
        await this.acceso.validar(idBoxeadorRuta, idUsuarioAutenticado, rolAutenticado);

        const lesiones = await this.repo.findByBoxeadorId(idBoxeadorRuta);
        const filtradas = estado ? lesiones.filter(e => e.getEstadoActual() === estado) : lesiones;
        return filtradas.map(LesionesResponseMapper.toResponse);
    }
}

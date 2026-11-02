import { ForbiddenException, Inject, Injectable } from "@nestjs/common";

import { Rol } from "../../../../shared/domain/enums/rol.enum";

import { BoxeadorFinder } from "../../../usuarios/application/services/boxeador.finder";

import { type ILesionesRepository, LESIONES_REPOSITORY_TOKEN } from "../../domain/ports/lesiones-repository.port";
import { EstadoLesion } from "../../domain/enums/estado-lesion.enum";

import { LesionResponse } from "../responses";
import { LesionesResponseMapper } from "../mappers/lesiones-response.mapper";

@Injectable()
export class ConsultarLesionesUseCase {
    constructor(
        @Inject(LESIONES_REPOSITORY_TOKEN)
        private readonly repo: ILesionesRepository,
        private readonly finder: BoxeadorFinder
    ) {}

    async execute(
        idBoxeadorRuta: number,
        idUsuarioAutenticado: number,
        rolAutenticado: Rol,
        estado?: EstadoLesion
    ): Promise<LesionResponse[]> {
        const usuario = await this.finder.findOrFail(idBoxeadorRuta);

        const esElPropioBoxeador = rolAutenticado === Rol.BOXEADOR && idUsuarioAutenticado === usuario.getId()!;
        const esSuEntrenador = rolAutenticado === Rol.ENTRENADOR && idUsuarioAutenticado === usuario.getEntrenadorId()!;

        if (!esElPropioBoxeador && !esSuEntrenador) {
            throw new ForbiddenException();
        }

        const lesiones = await this.repo.findByBoxeadorId(idBoxeadorRuta);
        const filtradas = estado ? lesiones.filter(e => e.getEstadoActual() === estado) : lesiones;
        return filtradas.map(LesionesResponseMapper.toResponse);
    }
}

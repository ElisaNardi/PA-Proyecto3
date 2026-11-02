import { ForbiddenException, Inject, Injectable } from "@nestjs/common";

import { type IUnitOfWork, UNIT_OF_WORK_TOKEN } from "../../../../shared/application/unit-of-work/unit-of-work.port";

import { type ILesionesRepository, LESIONES_REPOSITORY_TOKEN } from "../../domain/ports/lesiones-repository.port";
import { EstadoLesion } from "../../domain/enums/estado-lesion.enum";

import { ActualizarEstadoLesionDto } from "../dtos";
import { ActualizarEstadoLesionResponse } from "../responses";
import { LesionesResponseMapper } from "../mappers/lesiones-response.mapper";
import { LesionNoEncontradaException } from "../exceptions/lesion-no-encontrada.exception";

@Injectable()
export class ActualizarEstadoLesionUseCase {
    constructor(
        @Inject(LESIONES_REPOSITORY_TOKEN)
        private readonly repo: ILesionesRepository,
        @Inject(UNIT_OF_WORK_TOKEN)
        private readonly uow: IUnitOfWork
    ) {}

    async execute(idLesion: number, idBoxeadorAutenticado: number, dto: ActualizarEstadoLesionDto): Promise<ActualizarEstadoLesionResponse> {
        const lesion = await this.repo.findById(idLesion);
        if (!lesion) {
            throw new LesionNoEncontradaException();
        }

        if (lesion.getBoxeadorId() !== idBoxeadorAutenticado) {
            throw new ForbiddenException();
        }

        if (dto.estado === EstadoLesion.ACTIVA) {
            lesion.marcarActiva();
        } else {
            lesion.marcarRecuperada();
        }

        return this.uow.runInTransaction(async () => {
            const lesionGuardada = await this.repo.save(lesion);
            return LesionesResponseMapper.toActualizarEstadoResponse(lesionGuardada);
        });
    }
}

import { ForbiddenException, Inject, Injectable } from "@nestjs/common";

import { type IUnitOfWork, UNIT_OF_WORK_TOKEN } from "../../../../shared/application/unit-of-work";

import { type ILesionesRepository, LESIONES_REPOSITORY_TOKEN } from "../../domain/ports";
import { LesionesFactory } from "../../domain/factories";

import { RegistrarLesionDto } from "../dtos";
import { LesionResponse } from "../responses";
import { LesionesResponseMapper } from "../mappers";

@Injectable()
export class RegistrarLesionUseCase {
    constructor(
        @Inject(LESIONES_REPOSITORY_TOKEN)
        private readonly repo: ILesionesRepository,
        @Inject(UNIT_OF_WORK_TOKEN)
        private readonly uow: IUnitOfWork
    ) {}

    async execute(idBoxeadorRuta: number, idBoxeadorAutenticado: number, dto: RegistrarLesionDto): Promise<LesionResponse> {
        if (idBoxeadorRuta !== idBoxeadorAutenticado) {
            throw new ForbiddenException();
        }

        return this.uow.runInTransaction(async () => {
            const lesion = LesionesFactory.crear({
                boxeadorId: idBoxeadorRuta,
                zona: dto.zona,
                descripcion: dto.descripcion,
                gravedad: dto.gravedad,
                fecha: new Date(dto.fecha)
            });

            const lesionGuardada = await this.repo.save(lesion);
            return LesionesResponseMapper.toResponse(lesionGuardada);
        });
    }
}

import { ForbiddenException, Inject, Injectable } from "@nestjs/common";

import { type IUnitOfWork, UNIT_OF_WORK_TOKEN } from "../../../../shared/application/unit-of-work/unit-of-work.port";

import { type ILesionesRepository, LESIONES_REPOSITORY_TOKEN } from "../../domain/ports/lesiones-repository.port";
import { LesionesFactory } from "../../domain/factories/lesiones.factory";

import { RegistrarLesionDto } from "../dtos/registrar-lesion.dto";
import { LesionResponse } from "../responses/lesion.response";
import { LesionesResponseMapper } from "../mappers/lesiones-response.mapper";

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
                idBoxeador: idBoxeadorRuta,
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

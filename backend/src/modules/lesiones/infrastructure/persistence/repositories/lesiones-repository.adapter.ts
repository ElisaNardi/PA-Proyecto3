import { Injectable } from "@nestjs/common";

import { GestorEntityManager } from "../../../../../shared/infrastructure/unit-of-work/gestor-entity-manager";

import { ILesionesRepository } from "../../../domain/ports/lesiones-repository.port";
import { Lesion } from "../../../domain/entities";

import { LesionesOrmMapper } from "../mappers/lesiones-orm.mapper";

@Injectable()
export class LesionesRepository implements ILesionesRepository {
    constructor(
        private readonly gestor: GestorEntityManager
    ) {}

    async save(lesion: Lesion): Promise<Lesion> {
        const lesionGuardada = await this.gestor.actual.save(
            LesionesOrmMapper.lesionToOrm(lesion)
        );
        const cambiosGuardados = await this.gestor.actual.save(
            LesionesOrmMapper.cambiosToOrm(lesion, lesionGuardada.id)
        );
        return LesionesOrmMapper.toDomain(lesionGuardada, cambiosGuardados);
    }
}
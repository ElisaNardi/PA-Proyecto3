import { Injectable } from "@nestjs/common";

import { GestorEntityManager } from "../../../../../shared/infrastructure/unit-of-work/gestor-entity-manager";

import { ILesionesRepository } from "../../../domain/ports/lesiones-repository.port";
import { Lesion } from "../../../domain/entities";

import { LesionesOrmMapper } from "../mappers/lesiones-orm.mapper";
import { CambioEstadoLesionOrmEntity, LesionOrmEntity } from "../entities";

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

    async findById(id: number): Promise<Lesion | null> {
        const lesion = await this.gestor.actual.createQueryBuilder(LesionOrmEntity, 'lesiones')
                                               .where('lesiones.id = :id', { id })
                                               .getOne();
        if (!lesion) return null;

        const cambios = await this.gestor.actual.createQueryBuilder(CambioEstadoLesionOrmEntity, 'cambios')
                                                .where('cambios.lesionId = :lesionId', { lesionId: lesion.id })
                                                .orderBy('cambios.fecha', 'ASC')
                                                .getMany();
        return LesionesOrmMapper.toDomain(lesion, cambios);
    }

    async findByBoxeadorId(boxeadorId: number): Promise<Lesion[]> {
        const lesiones = await this.gestor.actual.createQueryBuilder(LesionOrmEntity, 'lesiones')
                                                 .where('lesiones.boxeadorId = :boxeadorId',  { boxeadorId })
                                                 .getMany();
        if (lesiones.length === 0) return [];

        const lesionesIds = lesiones.map(l => l.id);
        const cambios = await this.gestor.actual.createQueryBuilder(CambioEstadoLesionOrmEntity, 'cambios')
                                                .where('cambios.lesionId IN (:...lesionesIds)', { lesionesIds })
                                                .orderBy('cambios.fecha', 'ASC')
                                                .getMany();
        return lesiones.map(lesion => {
            const cambiosDeLesion = cambios.filter(c => c.lesionId === lesion.id);
            return LesionesOrmMapper.toDomain(lesion, cambiosDeLesion);
        });
    }
}

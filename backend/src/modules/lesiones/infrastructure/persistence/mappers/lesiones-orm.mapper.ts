import { Lesion } from "../../../domain/entities";
import { LesionesFactory } from "../../../domain/factories/lesiones.factory";

import { LesionOrmEntity, CambioEstadoLesionOrmEntity } from "../entities";

export class LesionesOrmMapper {
    static lesionToOrm(domain: Lesion): LesionOrmEntity {
        const orm = new LesionOrmEntity();

        if (domain.getId() !== null) {
            orm.id = domain.getId()!;
        }
        orm.boxeadorId = domain.getBoxeadorId();
        orm.descripcion = domain.getDescripcion();
        orm.zona = domain.getZona();
        orm.gravedad = domain.getGravedad();
        orm.fecha = domain.getFecha();

        return orm;
    }

    static cambiosToOrm(lesion: Lesion, lesionId: number): CambioEstadoLesionOrmEntity[] {
        return lesion.getCambiosEstado().map(cambio => {
            const orm = new CambioEstadoLesionOrmEntity();

            if (cambio.getId() !== null) {
                orm.id = cambio.getId()!;
            }
            orm.lesionId = lesionId;
            orm.estadoAnterior = cambio.getEstadoAnterior();
            orm.estadoActual = cambio.getEstadoActual();
            orm.fecha = cambio.getFecha();

            return orm;
        });
    }

    static toDomain(orm: LesionOrmEntity, cambios: CambioEstadoLesionOrmEntity[]): Lesion {
        return LesionesFactory.reconstruir({
            id: orm.id,
            boxeadorId: orm.boxeadorId,
            descripcion: orm.descripcion,
            zona: orm.zona,
            gravedad: orm.gravedad,
            fecha: orm.fecha,
            cambiosEstado: cambios.map(c => ({
                id: c.id,
                estadoAnterior: c.estadoAnterior,
                estadoActual: c.estadoActual,
                fecha: c.fecha
            }))
        });
    }
}

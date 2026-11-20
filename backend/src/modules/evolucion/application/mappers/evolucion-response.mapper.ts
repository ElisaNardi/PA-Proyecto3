import { CumplimientoRutinas, ProgresoPeso, ConsumoCalorico } from "../../domain/value-objects";

import { EvolucionResponse } from "../responses";

export class EvolucionResponseMapper {
    static toResponse(
        desde: Date,
        hasta: Date,
        cumplimiento: CumplimientoRutinas,
        peso: ProgresoPeso,
        consumo: ConsumoCalorico
    ): EvolucionResponse {
        return {
            periodo: {
                desde: desde.toISOString().slice(0, 10),
                hasta: hasta.toISOString().slice(0, 10)
            },
            cumplimientoRutinas: {
                asignadas: cumplimiento.getAsignadas(),
                completadas: cumplimiento.getCompletadas(),
                porcentaje: cumplimiento.getPorcentaje()
            },
            peso: {
                inicial: peso.getInicial(),
                actual: peso.getActual(),
                objetivo: peso.getObjetivo()
            },
            nutricion: {
                promedioCaloriasDiarias: consumo.getPromedioDiario(),
                metaCaloriasDiarias: consumo.getMetaDiaria()
            }
        };
    }
}

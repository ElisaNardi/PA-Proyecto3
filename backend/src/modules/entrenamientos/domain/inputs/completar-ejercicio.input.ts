import { Medida } from "../../../../shared/domain/value-objects/medida.vo";

export interface CompletarEjercicioInput {
    pesoRealizado?: number | null;
    repeticionesRealizadas?: number | null;
    segundosRealizados?: number | null;
}

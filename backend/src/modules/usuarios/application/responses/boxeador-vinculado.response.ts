import { CategoriaPeso } from "../../../../shared/domain/enums";

export interface BoxeadorVinculadoResponse {
    idBoxeador: number;
    nombre: string;
    categoria: CategoriaPeso | null;
}

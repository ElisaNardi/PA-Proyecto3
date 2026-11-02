import { CategoriaPeso } from "../../../../shared/domain/enums/categoria-peso.enum";

export interface BoxeadorVinculadoResponse {
    idBoxeador: number;
    nombre: string;
    categoria: CategoriaPeso | null;
}

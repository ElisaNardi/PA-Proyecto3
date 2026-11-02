import { CategoriaPeso } from "../../../../shared/domain/enums/categoria-peso.enum";

import { Sexo } from "../../domain/enums/sexo.enum";

export interface PerfilBoxeadorResponse {
    idBoxeador: number;
    nombre: string;
    email: string;
    sexo: Sexo;
    categoria: CategoriaPeso | null;
    pesoInicial: number | null;
    alturaInicial: number | null;
    entrenadorId: number | null;
}

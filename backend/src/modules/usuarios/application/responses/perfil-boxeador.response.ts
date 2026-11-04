import { CategoriaPeso } from "../../../../shared/domain/enums";

import { Sexo } from "../../domain/enums";

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

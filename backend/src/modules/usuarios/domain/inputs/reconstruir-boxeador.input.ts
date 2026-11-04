import { CategoriaPeso } from "../../../../shared/domain/enums";

import { Sexo } from "../enums";

export interface ReconstruirBoxeadorInput {
    id: number;
    nombre: string;
    email: string;
    passwordHash: string;
    entrenadorId: number | null,
    pesoInicial: number | null,
    alturaInicial: number | null,
    sexo: Sexo,
    categoria: CategoriaPeso | null
}

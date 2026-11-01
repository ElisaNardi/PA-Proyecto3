import { CategoriaPeso } from "../../../../shared/domain/enums/categoria-peso.enum";
import { Sexo } from "../enums/sexo.enum";

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

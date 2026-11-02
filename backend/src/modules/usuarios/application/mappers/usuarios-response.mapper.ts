import { Boxeador } from "../../domain/entities";

import { VincularBoxeadorResponse, BoxeadorVinculadoResponse, PerfilBoxeadorResponse } from "../responses";

export class UsuariosResponseMapper {
    static toVincularBoxeadorResponse(idEntrenador: number, idBoxeador: number): VincularBoxeadorResponse {
        return {
            idEntrenador,
            idBoxeador,
            vinculadoEl: new Date().toISOString().slice(0, 10)
        };
    }

    static toBoxeadorVinculadoResponse(boxeador: Boxeador): BoxeadorVinculadoResponse {
        return {
            idBoxeador: boxeador.getId()!,
            nombre: boxeador.getNombre(),
            categoria: boxeador.getCategoria()
        };
    }

    static toPerfilBoxeadorResponse(boxeador: Boxeador): PerfilBoxeadorResponse {
        return {
            idBoxeador: boxeador.getId()!,
            nombre: boxeador.getNombre(),
            email: boxeador.getEmail(),
            sexo: boxeador.getSexo(),
            categoria: boxeador.getCategoria(),
            pesoInicial: boxeador.getPesoInicial(),
            alturaInicial: boxeador.getAlturaInicial(),
            entrenadorId: boxeador.getEntrenadorId()
        };
    }
}

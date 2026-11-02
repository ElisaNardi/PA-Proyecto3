import { Boxeador } from "../../domain/entities";

import { VincularBoxeadorResponse, BoxeadorVinculadoResponse } from "../responses";

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
}

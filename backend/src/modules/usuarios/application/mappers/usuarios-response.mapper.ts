import { VincularBoxeadorResponse } from "../responses/vincular-boxeador.response";

export class UsuariosResponseMapper {
    static toVincularBoxeadorResponse(idEntrenador: number, idBoxeador: number): VincularBoxeadorResponse {
        return {
            idEntrenador,
            idBoxeador,
            vinculadoEl: new Date().toISOString().slice(0, 10)
        };
    }
}

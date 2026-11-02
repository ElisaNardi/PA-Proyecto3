import { ForbiddenException } from "@nestjs/common";

export class AutorizacionValidator {
    static validar(idEsperado: number, idAutenticado: number): void {
        if (idEsperado !== idAutenticado) {
            throw new ForbiddenException();
        }
    }
}

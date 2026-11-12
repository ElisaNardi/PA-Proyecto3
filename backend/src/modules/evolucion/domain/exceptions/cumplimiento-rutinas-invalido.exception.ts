import { DomainException } from "../../../../shared/domain/exceptions";
import { AppErrorCode } from "../../../../shared/exceptions";

export class CumplimientoRutinasInvalidoException extends DomainException {
    constructor() {
        super(
            'Las rutinas completadas no pueden ser negativas ni superar a las asignadas',
            AppErrorCode.INVALID_INPUT
        );
    }
}

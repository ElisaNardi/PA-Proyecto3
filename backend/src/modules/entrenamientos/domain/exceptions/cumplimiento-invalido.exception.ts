import { DomainException } from "../../../../shared/domain/exceptions";
import { AppErrorCode } from "../../../../shared/exceptions";

export class CumplimientoInvalidoException extends DomainException {
    constructor() {
        super(
            'Cumplimiento inválido para el tipo de ejercicio',
            AppErrorCode.INVALID_INPUT
        );
    }
}

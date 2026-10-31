import { DomainException } from "../../../../shared/domain/exceptions/domain-exception";
import { AppErrorCode } from "../../../../shared/exceptions/app-error-code.enum";

export class CumplimientoInvalidoException extends DomainException {
    constructor() {
        super(
            'Cumplimiento inválido para el tipo de ejercicio',
            AppErrorCode.INVALID_INPUT
        );
    }
}

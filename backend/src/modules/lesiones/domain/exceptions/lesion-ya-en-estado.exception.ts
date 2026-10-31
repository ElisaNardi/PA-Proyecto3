import { DomainException } from "../../../../shared/domain/exceptions/domain-exception";
import { AppErrorCode } from "../../../../shared/exceptions/app-error-code.enum";

export class LesionYaEnEseEstadoException extends DomainException {
    constructor() {
        super(
            'No es posible cambiar al mismo estado actual',
            AppErrorCode.CONFLICT
        );
    }
}

import { DomainException } from "../../../../shared/domain/exceptions";
import { AppErrorCode } from "../../../../shared/exceptions";

export class FechaLesionFuturaException extends DomainException {
    constructor() {
        super(
            'La fecha de la lesión no puede ser futura',
            AppErrorCode.INVALID_INPUT
        );
    }
}

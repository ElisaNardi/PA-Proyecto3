import { DomainException } from "../../../../shared/domain/exceptions";
import { AppErrorCode } from "../../../../shared/exceptions";

export class LesionYaEnEseEstadoException extends DomainException {
    constructor() {
        super(
            'No es posible cambiar al mismo estado actual',
            AppErrorCode.CONFLICT
        );
    }
}

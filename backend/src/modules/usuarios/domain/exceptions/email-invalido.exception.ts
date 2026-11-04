import { DomainException } from "../../../../shared/domain/exceptions";
import { AppErrorCode } from "../../../../shared/exceptions";

export class EmailInvalidoException extends DomainException {
    constructor() {
        super(
            'Email con formato inválido',
            AppErrorCode.INVALID_INPUT
        );
    }
}

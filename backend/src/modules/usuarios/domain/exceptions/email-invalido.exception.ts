import { DomainException } from "../../../../shared/domain/exceptions/domain-exception";
import { AppErrorCode } from "../../../../shared/exceptions/app-error-code.enum";

export class EmailInvalidoException extends DomainException {
    constructor() {
        super(
            'Email con formato inválido',
            AppErrorCode.INVALID_INPUT
        );
    }
}

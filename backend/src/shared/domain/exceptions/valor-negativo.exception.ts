import { AppErrorCode } from "../../exceptions/app-error-code.enum";
import { DomainException } from "./domain-exception";

export class ValorNegativoException extends DomainException {
    constructor() {
        super(
            'Valor negativo no permitido',
            AppErrorCode.INVALID_INPUT
        );
    }
}

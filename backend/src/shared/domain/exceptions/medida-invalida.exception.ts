import { AppErrorCode } from "../../exceptions/app-error-code.enum";
import { DomainException } from "./domain-exception";

export class MedidaInvalidaException extends DomainException {
    constructor() {
        super(
            'Medida de valor negativo no permitida',
            AppErrorCode.INVALID_INPUT
        );
    }
}

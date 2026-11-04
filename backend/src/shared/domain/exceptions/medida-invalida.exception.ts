import { AppErrorCode } from "../../exceptions";
import { DomainException } from "./domain-exception";

export class MedidaInvalidaException extends DomainException {
    constructor() {
        super(
            'Medida de valor negativo no permitida',
            AppErrorCode.INVALID_INPUT
        );
    }
}

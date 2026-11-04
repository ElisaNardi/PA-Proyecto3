import { AppErrorCode } from "../../exceptions";

import { DomainException } from "./domain-exception";

export class ValorNegativoException extends DomainException {
    constructor() {
        super(
            'Valor negativo no permitido',
            AppErrorCode.INVALID_INPUT
        );
    }
}

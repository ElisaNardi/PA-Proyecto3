import { ApplicationException } from "../../../../shared/application/exceptions";
import { AppErrorCode } from "../../../../shared/exceptions";

export class PeriodoInvalidoException extends ApplicationException {
    constructor() {
        super(
            'La fecha desde no puede ser posterior a la fecha hasta',
            AppErrorCode.INVALID_INPUT
        );
    }
}

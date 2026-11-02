import { ApplicationException } from "../../../../shared/application/exceptions/application-exception";
import { AppErrorCode } from "../../../../shared/exceptions/app-error-code.enum";

export class LesionNoEncontradaException extends ApplicationException {
    constructor() {
        super(
            'Lesion no encontrada con ese id',
            AppErrorCode.NOT_FOUND
        )
    }
}

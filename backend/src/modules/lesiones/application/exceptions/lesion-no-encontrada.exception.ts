import { ApplicationException } from "../../../../shared/application/exceptions";
import { AppErrorCode } from "../../../../shared/exceptions";

export class LesionNoEncontradaException extends ApplicationException {
    constructor() {
        super(
            'Lesion no encontrada con ese id',
            AppErrorCode.NOT_FOUND
        )
    }
}

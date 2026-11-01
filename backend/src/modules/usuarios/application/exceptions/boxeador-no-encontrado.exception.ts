import { ApplicationException } from "../../../../shared/application/exceptions/application-exception";
import { AppErrorCode } from "../../../../shared/exceptions/app-error-code.enum";

export class BoxeadorNoEncontradoException extends ApplicationException {
    constructor() {
        super(
            'No existe un boxeador con ese id',
            AppErrorCode.NOT_FOUND
        );
    }
}

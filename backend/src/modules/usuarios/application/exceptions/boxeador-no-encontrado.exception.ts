import { ApplicationException } from "../../../../shared/application/exceptions";
import { AppErrorCode } from "../../../../shared/exceptions";

export class BoxeadorNoEncontradoException extends ApplicationException {
    constructor() {
        super(
            'No existe un boxeador con ese id',
            AppErrorCode.NOT_FOUND
        );
    }
}

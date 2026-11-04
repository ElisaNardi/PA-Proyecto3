import { ApplicationException } from "../../../../shared/application/exceptions";
import { AppErrorCode } from "../../../../shared/exceptions";

export class BoxeadorEmailNoEncontradoException extends ApplicationException {
    constructor() {
        super(
            'No existe un boxeador con ese email',
            AppErrorCode.NOT_FOUND
        );
    }
}

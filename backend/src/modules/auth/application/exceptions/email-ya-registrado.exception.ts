import { ApplicationException } from "../../../../shared/application/exceptions";
import { AppErrorCode } from "../../../../shared/exceptions";

export class EmailYaRegistradoException extends ApplicationException {
    constructor() {
        super(
            'El email ya está registrado',
            AppErrorCode.CONFLICT
        );
    }
}

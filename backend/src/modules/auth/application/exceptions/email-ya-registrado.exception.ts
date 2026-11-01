import { ApplicationException } from "../../../../shared/application/exceptions/application-exception";
import { AppErrorCode } from "../../../../shared/exceptions/app-error-code.enum";

export class EmailYaRegistradoException extends ApplicationException {
    constructor() {
        super(
            'El email ya está registrado',
            AppErrorCode.CONFLICT
        );
    }
}

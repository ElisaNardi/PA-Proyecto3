import { ApplicationException } from "../../../../shared/application/exceptions/application-exception";
import { AppErrorCode } from "../../../../shared/exceptions/app-error-code.enum";

export class BoxeadorYaVinculadoException extends ApplicationException {
    constructor() {
        super(
            'El boxeador ya tiene un entrenador asignado',
            AppErrorCode.CONFLICT
        );
    }
}

import { ApplicationException } from "../../../../shared/application/exceptions";
import { AppErrorCode } from "../../../../shared/exceptions";

export class BoxeadorYaVinculadoException extends ApplicationException {
    constructor() {
        super(
            'El boxeador ya tiene un entrenador asignado',
            AppErrorCode.CONFLICT
        );
    }
}

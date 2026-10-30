import { AppErrorCode } from "../../exceptions/app-error-code.enum";
import { AppException } from "../../exceptions/app-exception";

export class DomainException extends AppException {
    constructor(
        message: string,
        code: AppErrorCode
    ) {
        super(message, code);
    }
}

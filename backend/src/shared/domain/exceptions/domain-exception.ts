import { AppErrorCode } from "../../exceptions";
import { AppException } from "../../exceptions";

export class DomainException extends AppException {
    constructor(
        message: string,
        code: AppErrorCode
    ) {
        super(message, code);
    }
}

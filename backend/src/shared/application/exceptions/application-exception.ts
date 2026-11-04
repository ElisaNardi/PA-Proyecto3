import { AppErrorCode, AppException } from "../../exceptions";

export class ApplicationException extends AppException {
    constructor(
        message: string,
        code: AppErrorCode
    ) {
        super(message, code);
    }
}

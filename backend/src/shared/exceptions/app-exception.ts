import { AppErrorCode } from "./app-error-code.enum";

export class AppException extends Error {
    constructor(
        message: string,
        public readonly code: AppErrorCode
    ) {
        super(message);
    }
}

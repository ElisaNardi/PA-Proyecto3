import { AppErrorCode } from "../exceptions/app-error-code.enum";

export const STATUS_BY_CODE: Record<AppErrorCode, number> = {
    [AppErrorCode.NOT_FOUND]: 404,
    [AppErrorCode.CONFLICT]: 409,
    [AppErrorCode.INVALID_INPUT]: 400
};

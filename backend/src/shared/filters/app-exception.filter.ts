import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";

import { AppException } from "../exceptions/app-exception";

import { STATUS_BY_CODE } from "./status-by-code";

@Catch(AppException)
export class AppExceptionFilter implements ExceptionFilter {
    catch(exception: AppException, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>();
        const statusCode = STATUS_BY_CODE[exception.code] ?? 500;
        
        response.status(statusCode).json({
            message: exception.message,
            statusCode
        });
    }
}

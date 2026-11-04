import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";

import { AppException } from "../exceptions";

import { STATUS_BY_CODE } from "./status-by-code";

@Catch(AppException, HttpException)
export class AppExceptionFilter implements ExceptionFilter {
    catch(exception: AppException | HttpException, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>();
        
        if (exception instanceof AppException) {
            const statusCode = STATUS_BY_CODE[exception.code] ?? 500;
            response.status(statusCode).json({
                message: exception.message,
                statusCode
            });
            return;
        }

        const statusCode = exception.getStatus();
        const body = exception.getResponse() as {
            message?: string | string[]
        };
        const message = Array.isArray(body.message) ? body.message.join('; ') : (body.message ?? exception.message);
        response.status(statusCode).json({
            message,
            statusCode
        });
    }
}

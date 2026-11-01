import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { JwtPayload } from '../interfaces/jwt-payload.interface';

export const UsuarioAutenticado = createParamDecorator(
    (_: unknown, context: ExecutionContext): JwtPayload => {
        return context.switchToHttp().getRequest<Request & { user: JwtPayload }>().user;
    }
);

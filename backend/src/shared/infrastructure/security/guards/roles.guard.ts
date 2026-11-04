import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { Rol } from '../../../domain/enums/rol.enum';

import { ROLES_KEY } from '../decorators';
import { JwtPayload } from '../interfaces';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector
    ) {}

    canActivate(context: ExecutionContext): boolean {
        const rolesRequeridos = this.reflector.getAllAndOverride<Rol[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        if (!rolesRequeridos?.length) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest<Request & { user: JwtPayload }>();
        return rolesRequeridos.includes(user.rol);
    }
}

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request & { user: JwtPayload }>();
        const token = this.extraerToken(request);

        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            request.user = await this.jwtService.verifyAsync<JwtPayload>(token);
        } catch {
            throw new UnauthorizedException();
        }

        return true;
    }

    private extraerToken(request: Request): string | undefined {
        const [tipo, token] = request.headers['authorization']?.split(' ') ?? [];
        return tipo === 'Bearer' ? token : undefined;
    }
}

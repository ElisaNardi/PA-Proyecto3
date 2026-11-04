import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthFacade } from '../../application/facades';
import { RegistrarUsuarioDto, AutenticarUsuarioDto } from '../../application/dtos';
import { UsuarioResponse, AutenticarUsuarioResponse } from '../../application/responses';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authFacade: AuthFacade
    ) {}

    @Post('registro')
    async registrar(@Body() body: RegistrarUsuarioDto): Promise<UsuarioResponse> {
        return this.authFacade.registrar(body);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() body: AutenticarUsuarioDto): Promise<AutenticarUsuarioResponse> {
        return this.authFacade.login(body);
    }
}

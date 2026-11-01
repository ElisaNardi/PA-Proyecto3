import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthFacade } from '../../application/facades/auth.facade';
import { RegistrarUsuarioDto } from '../../application/dtos/registrar-usuario.dto';
import { AutenticarUsuarioDto } from '../../application/dtos/autenticar-usuario.dto';
import { UsuarioResponse } from '../../application/responses/usuario.response';
import { AutenticarUsuarioResponse } from '../../application/responses/autenticar-usuario.response';

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

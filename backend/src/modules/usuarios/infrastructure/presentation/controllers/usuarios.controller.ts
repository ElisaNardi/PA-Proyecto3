import { Body, Controller, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";

import { Rol } from "../../../../../shared/domain/enums/rol.enum";

import { type JwtPayload } from "../../../../../shared/infrastructure/security/interfaces/jwt-payload.interface";
import { RolesGuard, JwtAuthGuard } from "../../../../../shared/infrastructure/security/guards";
import { Roles, UsuarioAutenticado } from "../../../../../shared/infrastructure/security/decorators";

import { VincularBoxeadorDto } from "../../../application/dtos/vincular-boxeador.dto";
import { UsuariosFacade } from "../../../application/facades/usuarios.facade";

@Controller()
export class UsuariosController {
    constructor(
        private readonly usuariosFacade: UsuariosFacade
    ) {}

    @Post('entrenadores/:idEntrenador/boxeadores')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Rol.ENTRENADOR)
    vincular(
        @Param('idEntrenador', ParseIntPipe) idEntrenador: number,
        @UsuarioAutenticado() usuario: JwtPayload,
        @Body() dto: VincularBoxeadorDto
    ) {
        return this.usuariosFacade.vincular(idEntrenador, usuario.sub, dto);
    }
}

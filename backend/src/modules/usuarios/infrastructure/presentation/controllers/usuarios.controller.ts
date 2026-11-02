import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";

import { Rol } from "../../../../../shared/domain/enums/rol.enum";

import { type JwtPayload } from "../../../../../shared/infrastructure/security/interfaces/jwt-payload.interface";
import { RolesGuard, JwtAuthGuard } from "../../../../../shared/infrastructure/security/guards";
import { Roles, UsuarioAutenticado } from "../../../../../shared/infrastructure/security/decorators";

import { VincularBoxeadorDto } from "../../../application/dtos/vincular-boxeador.dto";
import { UsuariosFacade } from "../../../application/facades/usuarios.facade";
import { BoxeadorVinculadoResponse, PerfilBoxeadorResponse, VincularBoxeadorResponse } from "../../../application/responses";

@Controller()
export class UsuariosController {
    constructor(
        private readonly usuariosFacade: UsuariosFacade
    ) {}

    @Post('entrenadores/:idEntrenador/boxeadores')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Rol.ENTRENADOR)
    async vincular(
        @Param('idEntrenador', ParseIntPipe) idEntrenador: number,
        @UsuarioAutenticado() usuario: JwtPayload,
        @Body() dto: VincularBoxeadorDto
    ): Promise<VincularBoxeadorResponse> {
        return this.usuariosFacade.vincular(idEntrenador, usuario.sub, dto);
    }

    @Get('entrenadores/:idEntrenador/boxeadores')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Rol.ENTRENADOR)
    async obtenerBoxeadores(
        @Param('idEntrenador', ParseIntPipe) idEntrenador: number,
        @UsuarioAutenticado() usuario: JwtPayload
    ): Promise<BoxeadorVinculadoResponse[]> {
        return this.usuariosFacade.obtenerBoxeadores(idEntrenador, usuario.sub);
    }

    @Get('boxeadores/:idBoxeador')
    @UseGuards(JwtAuthGuard)
    async obtenerPerfilBoxeador(
        @Param('idBoxeador', ParseIntPipe) idBoxeador: number,
        @UsuarioAutenticado() usuario: JwtPayload
    ): Promise<PerfilBoxeadorResponse> {
        return this.usuariosFacade.obtenerPerfilDeBoxeador(idBoxeador, usuario.sub, usuario.rol);
    }
}

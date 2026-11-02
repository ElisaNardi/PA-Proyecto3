import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";

import { type JwtPayload } from "../../../../../shared/infrastructure/security/interfaces/jwt-payload.interface";
import { JwtAuthGuard, RolesGuard } from "../../../../../shared/infrastructure/security/guards";
import { Roles, UsuarioAutenticado } from "../../../../../shared/infrastructure/security/decorators";
import { Rol } from "../../../../../shared/domain/enums/rol.enum";

import { RegistrarLesionDto, ActualizarEstadoLesionDto, ConsultarLesionesQueryDto } from "../../../application/dtos";
import { LesionResponse, ActualizarEstadoLesionResponse } from "../../../application/responses";
import { LesionesFacade } from "../../../application/facades/lesiones.facade";

@Controller()
export class LesionesController {
    constructor(
        private readonly facade: LesionesFacade
    ) {}

    @Get('boxeadores/:idBoxeador/lesiones')
    @UseGuards(JwtAuthGuard)
    async consultarLesiones(
        @Param('idBoxeador', ParseIntPipe) idBoxeador: number,
        @UsuarioAutenticado() usuario: JwtPayload,
        @Query() query: ConsultarLesionesQueryDto
    ): Promise<LesionResponse[]> {
        return this.facade.consultarLesiones(idBoxeador, usuario.sub, usuario.rol, query.estado);
    }

    @Post('boxeadores/:idBoxeador/lesiones')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Rol.BOXEADOR)
    async registrarLesion(
        @Param('idBoxeador', ParseIntPipe) idBoxeador: number,
        @UsuarioAutenticado() usuario: JwtPayload,
        @Body() body: RegistrarLesionDto
    ): Promise<LesionResponse> {
        return this.facade.registrarLesion(idBoxeador, usuario.sub, body);
    }

    @Patch('lesiones/:idLesion/estado')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Rol.BOXEADOR)
    async actualizarEstadoLesion(
        @Param('idLesion', ParseIntPipe) idLesion: number,
        @UsuarioAutenticado() usuario: JwtPayload,
        @Body() body: ActualizarEstadoLesionDto
    ): Promise<ActualizarEstadoLesionResponse> {
        return this.facade.actualizarEstadoLesion(idLesion, usuario.sub, body);
    }
}

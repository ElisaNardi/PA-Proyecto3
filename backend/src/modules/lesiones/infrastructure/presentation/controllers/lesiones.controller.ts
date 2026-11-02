import { Body, Controller, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";

import { type JwtPayload } from "../../../../../shared/infrastructure/security/interfaces/jwt-payload.interface";
import { JwtAuthGuard, RolesGuard } from "../../../../../shared/infrastructure/security/guards";
import { Roles, UsuarioAutenticado } from "../../../../../shared/infrastructure/security/decorators";
import { Rol } from "../../../../../shared/domain/enums/rol.enum";

import { LesionResponse, ActualizarEstadoLesionResponse } from "../../../application/responses";
import { LesionesFacade } from "../../../application/facades/lesiones.facade";
import { RegistrarLesionDto } from "../../../application/dtos/registrar-lesion.dto";
import { ActualizarEstadoLesionDto } from "../../../application/dtos";

@Controller()
export class LesionesController {
    constructor(
        private readonly facade: LesionesFacade
    ) {}

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

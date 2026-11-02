import { Body, Controller, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";

import { type JwtPayload } from "../../../../../shared/infrastructure/security/interfaces/jwt-payload.interface";
import { JwtAuthGuard, RolesGuard } from "../../../../../shared/infrastructure/security/guards";
import { Roles, UsuarioAutenticado } from "../../../../../shared/infrastructure/security/decorators";
import { Rol } from "../../../../../shared/domain/enums/rol.enum";

import { LesionResponse } from "../../../application/responses/lesion.response";
import { LesionesFacade } from "../../../application/facades/lesiones.facade";
import { RegistrarLesionDto } from "../../../application/dtos/registrar-lesion.dto";

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
}

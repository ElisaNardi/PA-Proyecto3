import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from "@nestjs/common";

import { type JwtPayload } from "../../../../shared/infrastructure/security/interfaces";
import { JwtAuthGuard } from "../../../../shared/infrastructure/security/guards";
import { UsuarioAutenticado } from "../../../../shared/infrastructure/security/decorators";

import { ObtenerEvolucionQueryDto } from "../../application/dtos";
import { EvolucionResponse } from "../../application/responses";
import { EvolucionFacade } from "../../application/facades";

@Controller()
export class EvolucionController {
    constructor(
        private readonly evolucionFacade: EvolucionFacade
    ) {}

    @Get('boxeadores/:idBoxeador/evolucion')
    @UseGuards(JwtAuthGuard)
    async obtenerEvolucion(
        @Param('idBoxeador', ParseIntPipe) idBoxeador: number,
        @UsuarioAutenticado() usuario: JwtPayload,
        @Query() query: ObtenerEvolucionQueryDto
    ): Promise<EvolucionResponse> {
        return this.evolucionFacade.obtenerEvolucion(idBoxeador, usuario.sub, usuario.rol, query);
    }
}

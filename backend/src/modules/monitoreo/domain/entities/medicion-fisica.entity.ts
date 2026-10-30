import { NotImplementedException } from "@nestjs/common";

import { CategoriaPeso } from "../../../../shared/domain/enums/categoria-peso.enum";
import { Medida } from "../../../../shared/domain/value-objects/medida.vo";

import { Perimetros } from "../value-objects/perimetros.vo";

export class MedicionFisica {
    constructor(
        private readonly id: number | null,
        private readonly boxeadorId: number,
        private readonly fecha: Date,
        private readonly peso: Medida,
        private readonly altura: Medida,
        private readonly porcentajeGrasa: Medida | null,
        private readonly perimetros: Perimetros | null,
        private readonly envergadura: Medida | null
    ) {}

    // TODO: implementar calculo de distancia a categoria
    public distanciaAcategoria(categoria: CategoriaPeso): number {
        throw new NotImplementedException();
    }

    // TODO: implementar o quitar, está en el diagrama de clases pero no sé qué utilidad tiene
    public calcularVariacionesPeso(pesoReferencia: Medida): number {
        throw new NotImplementedException();
    }

    public getId(): number | null {
        return this.id;
    }

    public getBoxeadorId(): number {
        return this.boxeadorId;
    }

    public getFecha(): Date {
        return this.fecha;
    }

    public getPeso(): number {
        return this.peso.getMedida();
    }

    public getAltura(): number {
        return this.altura.getMedida();
    }

    public getPorcentajeGrasa(): number | null {
        return this.porcentajeGrasa ? this.porcentajeGrasa.getMedida() : null;
    }

    public getPerimetroBrazo(): number | null {
        return this.perimetros ? this.perimetros.getBrazo() : null;
    }

    public getPerimetroCintura(): number | null {
        return this.perimetros ? this.perimetros.getCintura() : null;
    }

    public getPerimetroCadera(): number | null {
        return this.perimetros ? this.perimetros.getCadera() : null;
    }

    public getPerimetroPecho(): number | null {
        return this.perimetros ? this.perimetros.getPecho() : null;
    }

    public getPerimetroMuslo(): number | null {
        return this.perimetros ? this.perimetros.getMuslo() : null;
    }

    public getPerimetroPantorrilla(): number | null {
        return this.perimetros ? this.perimetros.getPantorrilla() : null;
    }

    public getEnvergadura(): number | null {
        return this.envergadura ? this.envergadura.getMedida() : null;
    }
}

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
        private readonly porcentajeGrasa: Medida,
        private readonly perimetros: Perimetros,
        private readonly envergadura: Medida
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

    public getPorcentajeGrasa(): number {
        return this.porcentajeGrasa.getMedida();
    }

    public getPerimetroBrazo(): number {
        return this.perimetros.getBrazo();
    }

    public getPerimetroCintura(): number {
        return this.perimetros.getCintura();
    }

    public getPerimetroCadera(): number {
        return this.perimetros.getCadera();
    }

    public getPerimetroPecho(): number {
        return this.perimetros.getPecho();
    }

    public getPerimetroMuslo(): number {
        return this.perimetros.getMuslo();
    }

    public getPerimetroPantorrilla(): number {
        return this.perimetros.getPantorrilla();
    }

    public getEnvergadura(): number {
        return this.envergadura.getMedida();
    }
}

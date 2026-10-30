import { Medida } from "../../../../shared/domain/value-objects/medida.vo";

export class Perimetros {
    private constructor(
        private readonly brazo: Medida,
        private readonly cintura: Medida,
        private readonly cadera: Medida,
        private readonly pecho: Medida,
        private readonly muslo: Medida,
        private readonly pantorrilla: Medida
    ) {}

    public static crear(
        brazo: number,
        cintura: number,
        cadera: number,
        pecho: number,
        muslo: number,
        pantorrilla: number
    ): Perimetros {
        const brazoValidado = Medida.crear(brazo);
        const cinturaValidada = Medida.crear(cintura);
        const caderaValidada = Medida.crear(cadera);
        const pechoValidado = Medida.crear(pecho);
        const musloValidado = Medida.crear(muslo);
        const pantorrillaValidada = Medida.crear(pantorrilla);
        
        return new Perimetros(
            brazoValidado,
            cinturaValidada,
            caderaValidada,
            pechoValidado,
            musloValidado,
            pantorrillaValidada
        );
    }

    public getBrazo(): number {
        return this.brazo.getMedida();
    }

    public getCintura(): number {
        return this.cintura.getMedida();
    }

    public getCadera(): number {
        return this.cadera.getMedida();
    }

    public getPecho(): number {
        return this.pecho.getMedida();
    }

    public getMuslo(): number {
        return this.muslo.getMedida();
    }

    public getPantorrilla(): number {
        return this.pantorrilla.getMedida();
    }
}

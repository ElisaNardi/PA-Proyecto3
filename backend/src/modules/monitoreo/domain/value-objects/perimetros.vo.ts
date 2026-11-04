import { Medida } from "../../../../shared/domain/value-objects";

import { CrearPerimetrosInput } from "../inputs";

export class Perimetros {
    private constructor(
        private readonly brazo: Medida,
        private readonly cintura: Medida,
        private readonly cadera: Medida,
        private readonly pecho: Medida,
        private readonly muslo: Medida,
        private readonly pantorrilla: Medida
    ) {}

    public static crear(input: CrearPerimetrosInput): Perimetros {
        const brazoValidado = Medida.crear(input.brazo);
        const cinturaValidada = Medida.crear(input.cintura);
        const caderaValidada = Medida.crear(input.cadera);
        const pechoValidado = Medida.crear(input.pecho);
        const musloValidado = Medida.crear(input.muslo);
        const pantorrillaValidada = Medida.crear(input.pantorrilla);
        
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

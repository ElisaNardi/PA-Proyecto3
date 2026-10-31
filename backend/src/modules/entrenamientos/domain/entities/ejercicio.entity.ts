import { ValorNegativoException } from "../../../../shared/domain/exceptions/valor-negativo.exception";
import { Medida } from "../../../../shared/domain/value-objects/medida.vo";

import { CumplimientoInvalidoException } from "../exceptions/cumplimiento-invalido.exception";
import { CompletarEjercicioInput } from "../inputs/completar-ejercicio.input";

export class Ejercicio {
    constructor(
        private readonly id: number | null,
        private nombre: string,
        private descripcion: string,
        private repeticiones: number | null,
        private duracionSegundos: number | null,
        private series: number,
        private peso: Medida | null,
        private completado: boolean,
        private pesoRealizado: Medida | null,
        private repeticionesRealizadas: number | null,
        private segundosRealizados: number | null
    ) {}
    
    public completar(resultado: CompletarEjercicioInput): void {
        const { pesoRealizado = null, repeticionesRealizadas = null, segundosRealizados = null } = resultado;
        
        if (this.esPorTiempo() ? repeticionesRealizadas !== null : segundosRealizados !== null) {
            throw new CumplimientoInvalidoException();
        }
        
        if ((repeticionesRealizadas ?? 0) < 0 || (segundosRealizados ?? 0) < 0) {
            throw new ValorNegativoException();
        }

        this.completado = true;
        this.pesoRealizado = pesoRealizado !== null ? Medida.crear(pesoRealizado) : null;
        this.repeticionesRealizadas = repeticionesRealizadas;
        this.segundosRealizados = segundosRealizados;
    }
    
    public esPorTiempo(): boolean {
        return this.duracionSegundos !== null;
    }

    public fueCompletado(): boolean {
        return this.completado;
    }

    public getId(): number | null {
        return this.id;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getDescripcion(): string {
        return this.descripcion;
    }

    public getRepeticiones(): number | null {
        return this.repeticiones;
    }

    public getDuracionSegundos(): number | null {
        return this.duracionSegundos;
    }

    public getSeries(): number {
        return this.series;
    }

    public getPeso(): number | null {
        return this.peso ? this.peso.getMedida() : null;
    }

    public getPesoRealizado(): number | null {
        return this.pesoRealizado ? this.pesoRealizado.getMedida() : null;
    }

    public getRepeticionesRealizadas(): number | null {
        return this.repeticionesRealizadas;
    }

    public getSegundosRealizados(): number | null {
        return this.segundosRealizados;
    }
}

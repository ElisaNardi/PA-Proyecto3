import { CumplimientoRutinasInvalidoException } from "../exceptions";

export class CumplimientoRutinas {
    private constructor(
        private readonly asignadas: number,
        private readonly completadas: number
    ) {}

    public static calcular(asignadas: number, completadas: number): CumplimientoRutinas {
        this.validar(asignadas, completadas);
        return new CumplimientoRutinas(asignadas, completadas);
    }

    private static validar(asignadas: number, completadas: number): void {
        const sonEnteros = Number.isInteger(asignadas) && Number.isInteger(completadas);
        const sonNoNegativos = asignadas >= 0 && completadas >= 0;

        if (!sonEnteros || !sonNoNegativos || completadas > asignadas) {
            throw new CumplimientoRutinasInvalidoException();
        }
    }

    // Sin rutinas asignadas no hay nada que cumplir: se informa 0 %, no un error.
    public getPorcentaje(): number {
        if (this.asignadas === 0) {
            return 0;
        }
        return Math.round((this.completadas / this.asignadas) * 100);
    }

    public getAsignadas(): number {
        return this.asignadas;
    }

    public getCompletadas(): number {
        return this.completadas;
    }
}

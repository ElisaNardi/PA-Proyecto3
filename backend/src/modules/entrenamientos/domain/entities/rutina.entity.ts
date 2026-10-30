import { Ejercicio } from "./ejercicio.entity";

export class Rutina {
    constructor(
        private readonly id: number | null,
        private readonly ejercicios: Ejercicio[]
    ) {}

    public estaCompletada(): boolean {
        return this.ejercicios.length > 0 && this.ejercicios.every(e => e.fueCompletado());
    }

    public getId(): number | null {
        return this.id;
    }

    public getEjercicios(): Ejercicio[] {
        return this.ejercicios;
    }
}

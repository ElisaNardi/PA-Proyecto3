import { Ejercicio } from "./ejercicio.entity";

export class Rutina {
    constructor(
        private readonly id: number | null,
        private readonly ejercicios: Ejercicio[]
    ) {}

    public getId(): number | null {
        return this.id;
    }

    public getEjercicios(): Ejercicio[] {
        return this.ejercicios;
    }
}

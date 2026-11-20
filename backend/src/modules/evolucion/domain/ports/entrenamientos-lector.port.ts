export const ENTRENAMIENTOS_LECTOR_TOKEN = Symbol('IEntrenamientosLector');

export interface RutinaAsignada {
    completada: boolean;
}

// Lo que Evolución necesita saber de Entrenamientos.
export interface IEntrenamientosLector {
    // Rutinas asignadas al boxeador en el período. "completada" sale de Rutina.estaCompletada().
    findRutinasEntre(boxeadorId: number, desde: Date, hasta: Date): Promise<RutinaAsignada[]>;

    // Peso objetivo del objetivo vigente (null si el boxeador no tiene objetivo cargado).
    findPesoObjetivoVigente(boxeadorId: number): Promise<number | null>;
}

export const MEDICIONES_LECTOR_TOKEN = Symbol('IMedicionesLector');

export interface PesoRegistrado {
    fecha: Date;
    peso: number;
}

// Lo que Evolución necesita saber de Monitoreo sobre el peso (mediciones físicas).
export interface IMedicionesLector {
    // Pesos medidos entre desde y hasta (inclusive), ordenados de la fecha más vieja a la más nueva.
    // Si desde es null, trae todas las mediciones hasta la fecha "hasta".
    findPesosEntre(boxeadorId: number, desde: Date | null, hasta: Date): Promise<PesoRegistrado[]>;
}

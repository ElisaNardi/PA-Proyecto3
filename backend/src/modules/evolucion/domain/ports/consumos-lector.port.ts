export const CONSUMOS_LECTOR_TOKEN = Symbol('IConsumosLector');

export interface ConsumoRegistrado {
    fecha: Date;
    calorias: number;
}

// Lo que Evolución necesita saber de Monitoreo sobre la alimentación.
export interface IConsumosLector {
    // Consumos registrados entre desde y hasta (inclusive), un item por día con registro.
    findConsumosEntre(boxeadorId: number, desde: Date, hasta: Date): Promise<ConsumoRegistrado[]>;

    // Meta de calorías diarias de la referencia nutricional vigente a la fecha dada (null si no tiene).
    findMetaDiariaVigente(boxeadorId: number, fecha: Date): Promise<number | null>;
}

export interface EvolucionResponse {
    periodo: {
        desde: string;
        hasta: string;
    };
    cumplimientoRutinas: {
        asignadas: number;
        completadas: number;
        porcentaje: number;
    };
    peso: {
        inicial: number | null;
        actual: number | null;
        objetivo: number | null;
    };
    nutricion: {
        promedioCaloriasDiarias: number | null;
        metaCaloriasDiarias: number | null;
    };
}

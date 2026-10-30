import { MedidaInvalidaException } from "../exceptions/medida-invalida.exception";

export class Medida {
    private constructor(
        private readonly medida: number
    ) {}

    public static crear(medida: number): Medida {
        this.validar(medida);
        return new Medida(medida);
    }

    private static validar(medida: number): void {
        if (medida <= 0) {
            throw new MedidaInvalidaException();
        }
    }

    public getMedida(): number {
        return this.medida;
    }
}

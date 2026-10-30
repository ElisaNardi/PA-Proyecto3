import { EmailInvalidoException } from "../exceptions/email-invalido.exception";

export class Email {
    private constructor(
        private readonly direccion: string
    ) {}

    public static crear(direccion: string): Email {
        this.validar(direccion);
        return new Email(direccion);
    }

    private static validar(direccion: string): void {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(direccion)) {
            throw new EmailInvalidoException();
        }
    }

    public getDireccion(): string {
        return this.direccion;
    }
}

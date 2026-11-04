import type { Rol } from './enums';

export interface UsuarioSesion {
  idUsuario: number;
  nombre: string;
  rol: Rol;
}

/** Igual a la respuesta de POST /auth/login. */
export interface Sesion {
  accessToken: string;
  usuario: UsuarioSesion;
}

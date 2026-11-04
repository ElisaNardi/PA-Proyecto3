import { api } from '../../../core/api';
import type { Rol, Sesion, Sexo } from '../../../core/types';

/** AutenticarUsuarioDto */
export interface AutenticarUsuarioRequest {
  email: string;
  password: string;
}

/** RegistrarUsuarioDto. `sexo` solo para BOXEADOR. */
export interface RegistrarUsuarioRequest {
  nombre: string;
  email: string;
  password: string;
  rol: Rol;
  sexo?: Sexo;
}

/** UsuarioResponse (respuesta de POST /auth/registro; no trae token). */
export interface UsuarioResponse {
  idUsuario: number;
  nombre: string;
  email: string;
  rol: Rol;
}

/** POST /auth/login → AutenticarUsuarioResponse, que es la forma de la sesión. */
export async function login(datos: AutenticarUsuarioRequest): Promise<Sesion> {
  const { data } = await api.post<Sesion>('/auth/login', datos);
  return data;
}

export async function registrar(datos: RegistrarUsuarioRequest): Promise<UsuarioResponse> {
  const { data } = await api.post<UsuarioResponse>('/auth/registro', datos);
  return data;
}

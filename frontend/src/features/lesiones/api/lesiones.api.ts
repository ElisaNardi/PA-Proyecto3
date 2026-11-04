import { api } from '../../../core/api';
import type { EstadoLesion, Gravedad } from '../../../core/types';

// Tipos de backend/src/modules/lesiones/application/{dtos,responses}.

export interface LesionResponse {
  idLesion: number;
  zona: string;
  descripcion: string;
  gravedad: Gravedad;
  estado: EstadoLesion;
  /** 'YYYY-MM-DD' */
  fecha: string;
}

export interface CambioEstadoResponse {
  idCambioEstadoLesion: number;
  /** null en el primer cambio (alta de la lesión). */
  estadoAnterior: EstadoLesion | null;
  estadoActual: EstadoLesion;
  fecha: string;
}

export interface LesionDetalleResponse extends LesionResponse {
  cambios: CambioEstadoResponse[];
}

export interface ActualizarEstadoLesionResponse {
  idLesion: number;
  estado: EstadoLesion;
  cambios: CambioEstadoResponse[];
}

/** RegistrarLesionDto */
export interface RegistrarLesionRequest {
  zona: string;
  descripcion: string;
  gravedad: Gravedad;
  /** 'YYYY-MM-DD', no futura. */
  fecha: string;
}

/** ActualizarEstadoLesionDto */
export interface ActualizarEstadoLesionRequest {
  estado: EstadoLesion;
}

export async function listarLesiones(idBoxeador: number, estado?: EstadoLesion): Promise<LesionResponse[]> {
  const { data } = await api.get<LesionResponse[]>(`/boxeadores/${idBoxeador}/lesiones`, {
    params: estado ? { estado } : undefined,
  });
  return data;
}

export async function obtenerLesion(idLesion: number): Promise<LesionDetalleResponse> {
  const { data } = await api.get<LesionDetalleResponse>(`/lesiones/${idLesion}`);
  return data;
}

export async function registrarLesion(idBoxeador: number, datos: RegistrarLesionRequest): Promise<LesionResponse> {
  const { data } = await api.post<LesionResponse>(`/boxeadores/${idBoxeador}/lesiones`, datos);
  return data;
}

export async function actualizarEstadoLesion(
  idLesion: number,
  datos: ActualizarEstadoLesionRequest,
): Promise<ActualizarEstadoLesionResponse> {
  const { data } = await api.patch<ActualizarEstadoLesionResponse>(`/lesiones/${idLesion}/estado`, datos);
  return data;
}

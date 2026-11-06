import { api } from '../../../core/api';
import type { CategoriaPeso, Sexo } from '../../../core/types';

// Tipos de backend/src/modules/usuarios/application/{dtos,responses}.

/** BoxeadorVinculadoResponse (GET /entrenadores/:id/boxeadores, orden alfabético). */
export interface BoxeadorVinculadoResponse {
  idBoxeador: number;
  nombre: string;
  categoria: CategoriaPeso | null;
}

/** VincularBoxeadorDto */
export interface VincularBoxeadorRequest {
  email: string;
}

export interface VincularBoxeadorResponse {
  idEntrenador: number;
  idBoxeador: number;
  vinculadoEl: string;
}

/** PerfilBoxeadorResponse (GET /boxeadores/:id). */
export interface PerfilBoxeadorResponse {
  idBoxeador: number;
  nombre: string;
  email: string;
  sexo: Sexo;
  categoria: CategoriaPeso | null;
  pesoInicial: number | null;
  alturaInicial: number | null;
  entrenadorId: number | null;
}

export async function listarBoxeadores(idEntrenador: number): Promise<BoxeadorVinculadoResponse[]> {
  const { data } = await api.get<BoxeadorVinculadoResponse[]>(`/entrenadores/${idEntrenador}/boxeadores`);
  return data;
}

export async function vincularBoxeador(
  idEntrenador: number,
  datos: VincularBoxeadorRequest,
): Promise<VincularBoxeadorResponse> {
  const { data } = await api.post<VincularBoxeadorResponse>(`/entrenadores/${idEntrenador}/boxeadores`, datos);
  return data;
}

export async function obtenerPerfilBoxeador(idBoxeador: number): Promise<PerfilBoxeadorResponse> {
  const { data } = await api.get<PerfilBoxeadorResponse>(`/boxeadores/${idBoxeador}`);
  return data;
}

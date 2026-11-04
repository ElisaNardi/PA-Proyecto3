import { EstadoLesion, Gravedad } from '../../../core/types';
import type { TagTono } from '../../../shared/ui';

export const TONO_ESTADO: Record<EstadoLesion, TagTono> = {
  [EstadoLesion.ACTIVA]: 'peligro',
  [EstadoLesion.RECUPERADA]: 'ok',
};

export const TONO_GRAVEDAD: Record<Gravedad, TagTono> = {
  [Gravedad.LEVE]: 'neutro',
  [Gravedad.MODERADA]: 'aviso',
  [Gravedad.GRAVE]: 'peligro',
};

import type { ReactNode } from 'react';

/** `peligro` = rojo (.rd), `ok` = verde, `aviso` = amarillo (.wn), `neutro` = gris. */
export type TagTono = 'neutro' | 'peligro' | 'ok' | 'aviso';

const CLASE_POR_TONO: Record<TagTono, string> = {
  neutro: '',
  peligro: 'rd',
  ok: 'ok',
  aviso: 'wn',
};

interface TagProps {
  tono?: TagTono;
  children: ReactNode;
}

export function Tag({ tono = 'neutro', children }: TagProps) {
  const clases = ['tag', CLASE_POR_TONO[tono]].filter(Boolean).join(' ');
  return <span className={clases}>{children}</span>;
}

import type { ReactNode } from 'react';

import { IconInbox } from './icons';

interface EmptyProps {
  titulo: string;
  descripcion?: string;
  icono?: ReactNode;
  /** Por defecto va dentro de una `.card`, como en el prototipo. */
  enCard?: boolean;
}

export function Empty({ titulo, descripcion, icono, enCard = true }: EmptyProps) {
  const contenido = (
    <div className="empty">
      {icono ?? <IconInbox />}
      <h3 style={{ fontFamily: 'var(--f-body)', fontSize: 15 }}>{titulo}</h3>
      {descripcion && <p>{descripcion}</p>}
    </div>
  );
  return enCard ? <div className="card">{contenido}</div> : contenido;
}

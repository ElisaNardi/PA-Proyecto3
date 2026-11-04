import type { ReactNode } from 'react';

interface ViewHeaderProps {
  titulo: string;
  subtitulo?: string;
  acciones?: ReactNode;
}

export function ViewHeader({ titulo, subtitulo, acciones }: ViewHeaderProps) {
  return (
    <div className="view-head">
      <div>
        <h2>{titulo}</h2>
        {subtitulo && <p className="sub">{subtitulo}</p>}
      </div>
      {acciones && <div className="actions">{acciones}</div>}
    </div>
  );
}

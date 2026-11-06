import { useLocation, useNavigate } from 'react-router';

import { useAuth } from '../../core/auth';

import { NAVEGACION, estaActivo } from './navegacion';

/** Navegación inferior en pantallas angostas (≤ 860 px); el CSS la oculta en desktop. */
export function BottomTabs() {
  const { usuario } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  if (!usuario) return null;

  return (
    <nav className="bottom-tabs" aria-label="Navegación principal">
      {NAVEGACION[usuario.rol].map(({ ruta, etiqueta, Icono }) => {
        const activo = estaActivo(pathname, ruta);
        return (
          <button
            key={ruta}
            type="button"
            className={activo ? 'on' : undefined}
            aria-current={activo ? 'page' : undefined}
            onClick={() => navigate(ruta)}
          >
            <Icono />
            <span>{etiqueta}</span>
          </button>
        );
      })}
    </nav>
  );
}

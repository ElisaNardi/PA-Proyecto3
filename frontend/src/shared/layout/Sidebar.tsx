import { useLocation, useNavigate } from 'react-router';

import gloves from '../../assets/gloves.png';
import { useAuth } from '../../core/auth';
import { IconLogout, Wordmark } from '../ui';
import { etiquetaEnum, iniciales } from '../utils';

import { NAVEGACION, estaActivo } from './navegacion';
import { useCerrarSesion } from './useCerrarSesion';

export function Sidebar() {
  const { usuario } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const salir = useCerrarSesion();

  if (!usuario) return null;

  return (
    <aside>
      <div className="logo">
        <img className="glove" src={gloves} alt="" />
        <Wordmark />
      </div>
      <nav aria-label="Navegación principal">
        {NAVEGACION[usuario.rol].map(({ ruta, etiqueta, Icono }) => {
          const activo = estaActivo(pathname, ruta);
          return (
            <button
              key={ruta}
              type="button"
              className={activo ? 'nav-item on' : 'nav-item'}
              aria-current={activo ? 'page' : undefined}
              onClick={() => navigate(ruta)}
            >
              <Icono />
              <span>{etiqueta}</span>
            </button>
          );
        })}
      </nav>
      <div className="who">
        <div className="id">
          <div className="av" aria-hidden="true">
            {iniciales(usuario.nombre)}
          </div>
          <div>
            <div className="nm">{usuario.nombre}</div>
            <div className="rl">{etiquetaEnum(usuario.rol)}</div>
          </div>
        </div>
        <button type="button" className="btn-link danger" style={{ marginLeft: 40 }} onClick={salir}>
          <IconLogout /> Salir
        </button>
      </div>
    </aside>
  );
}

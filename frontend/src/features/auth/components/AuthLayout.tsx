import type { ReactNode } from 'react';
import { useNavigate } from 'react-router';

import gloves from '../../../assets/gloves.png';
import { Wordmark } from '../../../shared/ui';

interface AuthLayoutProps {
  modo: 'login' | 'registro';
  children: ReactNode;
}

/** Marco común de login y registro: guante, marca y selector de modo, como el prototipo. */
export function AuthLayout({ modo, children }: AuthLayoutProps) {
  const navigate = useNavigate();
  const esLogin = modo === 'login';

  return (
    <div className="auth-screen">
      <div className="auth-box">
        <img className="glove" src={gloves} alt="" />
        <div className="wordmark">
          <h1 style={{ font: 'inherit' }}>
            <Wordmark />
          </h1>
        </div>
        <p className="lead">{esLogin ? 'Ingresá con tu cuenta.' : 'Creá tu cuenta para empezar.'}</p>
        <div className="seg">
          <button type="button" className={esLogin ? 'on' : undefined} aria-pressed={esLogin} onClick={() => navigate('/login')}>
            Iniciar sesión
          </button>
          <button type="button" className={!esLogin ? 'on' : undefined} aria-pressed={!esLogin} onClick={() => navigate('/registro')}>
            Crear cuenta
          </button>
        </div>
        {children}
        <p className="auth-foot">
          {esLogin ? '¿No tenés cuenta todavía?' : '¿Ya tenés cuenta?'}{' '}
          <button type="button" className="btn-link" onClick={() => navigate(esLogin ? '/registro' : '/login')}>
            {esLogin ? 'Creá una' : 'Iniciá sesión'}
          </button>
        </p>
      </div>
    </div>
  );
}

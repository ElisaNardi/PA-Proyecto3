import { useState, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { inicioDeRol, useAuth } from '../../../core/auth';
import { Button, ErrorFormulario, Field } from '../../../shared/ui';

import { AuthLayout } from '../components/AuthLayout';
import { mensajeErrorLogin, useLogin } from '../hooks/useLogin';

/** Estado que deja el registro cuando la cuenta se creó pero el login automático falló. */
interface EstadoLogin {
  aviso?: string;
  email?: string;
}

export default function LoginPage() {
  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();
  const estado = (useLocation().state ?? {}) as EstadoLogin;
  const loginMutation = useLogin();

  const [email, setEmail] = useState(estado.email ?? '');
  const [password, setPassword] = useState('');

  const enviar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (sesion) => {
          iniciarSesion(sesion);
          navigate(inicioDeRol(sesion.usuario.rol), { replace: true });
        },
      },
    );
  };

  const procesando = loginMutation.isPending;

  return (
    <AuthLayout modo="login">
      {estado.aviso && !loginMutation.isError && (
        <p className="hint" role="status" style={{ marginBottom: 14, color: 'var(--ok)' }}>
          {estado.aviso}
        </p>
      )}
      <ErrorFormulario mensaje={loginMutation.isError ? mensajeErrorLogin(loginMutation.error) : null} />
      <form onSubmit={enviar}>
        <Field label="Email" htmlFor="login-email">
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="tu@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <Field label="Contraseña" htmlFor="login-password">
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        <Button type="submit" block disabled={procesando}>
          {procesando ? 'Ingresando…' : 'Ingresar'}
        </Button>
      </form>
    </AuthLayout>
  );
}

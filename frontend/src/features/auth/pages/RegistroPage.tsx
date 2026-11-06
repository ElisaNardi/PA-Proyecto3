import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';

import { getApiErrorMessage } from '../../../core/api';
import { inicioDeRol, useAuth } from '../../../core/auth';
import { Rol, Sexo } from '../../../core/types';
import { Button, ErrorFormulario, Field, IconGlove, IconUsers } from '../../../shared/ui';

import { AuthLayout } from '../components/AuthLayout';
import { useRegistro } from '../hooks/useRegistro';

const MIN_PASSWORD = 8;

export default function RegistroPage() {
  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();
  const registroMutation = useRegistro();

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState<Rol>(Rol.BOXEADOR);
  const [sexo, setSexo] = useState<Sexo | ''>('');

  const esBoxeador = rol === Rol.BOXEADOR;

  const enviar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registroMutation.mutate(
      {
        nombre: nombre.trim(),
        email,
        password,
        rol,
        ...(esBoxeador && sexo ? { sexo } : {}),
      },
      {
        onSuccess: (resultado) => {
          if (resultado.estado === 'con-sesion') {
            iniciarSesion(resultado.sesion);
            navigate(inicioDeRol(resultado.sesion.usuario.rol), { replace: true });
            return;
          }
          navigate('/login', {
            replace: true,
            state: { aviso: 'Tu cuenta se creó. Iniciá sesión para entrar.', email },
          });
        },
      },
    );
  };

  const procesando = registroMutation.isPending;

  return (
    <AuthLayout modo="registro">
      <ErrorFormulario mensaje={registroMutation.isError ? getApiErrorMessage(registroMutation.error) : null} />
      <form onSubmit={enviar}>
        <Field label="Nombre completo" htmlFor="registro-nombre">
          <input
            id="registro-nombre"
            autoComplete="name"
            placeholder="Nombre y apellido"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </Field>
        <Field label="Email" htmlFor="registro-email">
          <input
            id="registro-email"
            type="email"
            autoComplete="email"
            placeholder="tu@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <Field label="Contraseña" htmlFor="registro-password" hint={`Mínimo ${MIN_PASSWORD} caracteres.`}>
          <input
            id="registro-password"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            required
            minLength={MIN_PASSWORD}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        <div className="field" role="radiogroup" aria-labelledby="registro-rol">
          <label id="registro-rol">Rol</label>
          <div className="role-pick">
            <button
              type="button"
              role="radio"
              aria-checked={esBoxeador}
              className={esBoxeador ? 'on' : undefined}
              onClick={() => setRol(Rol.BOXEADOR)}
            >
              <IconGlove /> Boxeador
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={!esBoxeador}
              className={!esBoxeador ? 'on' : undefined}
              onClick={() => setRol(Rol.ENTRENADOR)}
            >
              <IconUsers /> Entrenador
            </button>
          </div>
        </div>
        {esBoxeador && (
          <>
            <Field label="Sexo" htmlFor="registro-sexo">
              <select id="registro-sexo" required value={sexo} onChange={(e) => setSexo(e.target.value as Sexo | '')}>
                <option value="" disabled>
                  Seleccioná una opción
                </option>
                <option value={Sexo.FEMENINO}>Femenino</option>
                <option value={Sexo.MASCULINO}>Masculino</option>
              </select>
            </Field>
            <p className="hint" style={{ marginBottom: 14 }}>
              Peso y altura se registran con tu primera medición física, no hace falta ahora.
            </p>
          </>
        )}
        <Button type="submit" block disabled={procesando}>
          {procesando ? 'Creando cuenta…' : 'Crear cuenta'}
        </Button>
      </form>
    </AuthLayout>
  );
}

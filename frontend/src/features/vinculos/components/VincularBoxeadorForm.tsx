import { useState, type FormEvent } from 'react';

import { getApiErrorMessage } from '../../../core/api';
import { Button, Card, ErrorFormulario, IconLink, useToast } from '../../../shared/ui';

import { useVincularBoxeador } from '../hooks/useBoxeadores';

export function VincularBoxeadorForm({ idEntrenador }: { idEntrenador: number }) {
  const [email, setEmail] = useState('');
  const vincular = useVincularBoxeador(idEntrenador);
  const { mostrar } = useToast();

  const enviar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    vincular.mutate(
      { email: email.trim() },
      {
        onSuccess: () => {
          mostrar('Boxeador vinculado', 'ok');
          setEmail('');
          vincular.reset();
        },
      },
    );
  };

  return (
    <Card style={{ marginBottom: 14 }}>
      <form className="actions" onSubmit={enviar} style={{ alignItems: 'flex-end' }}>
        <div className="field" style={{ flex: 1, marginBottom: 0, minWidth: 200 }}>
          <label htmlFor="vincular-email">Vincular boxeador por email</label>
          <input
            id="vincular-email"
            type="email"
            placeholder="boxeador@evobox.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button type="submit" variant="secondary" disabled={vincular.isPending}>
          <IconLink /> {vincular.isPending ? 'Vinculando…' : 'Vincular'}
        </Button>
      </form>
      {vincular.isError && (
        <div style={{ marginTop: 10 }}>
          <ErrorFormulario mensaje={getApiErrorMessage(vincular.error)} />
        </div>
      )}
    </Card>
  );
}

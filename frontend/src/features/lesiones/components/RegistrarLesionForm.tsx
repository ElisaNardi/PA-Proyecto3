import { useState, type FormEvent } from 'react';

import { getApiErrorMessage } from '../../../core/api';
import { Gravedad } from '../../../core/types';
import { Button, Card, ErrorFormulario, Field, useToast } from '../../../shared/ui';
import { etiquetaEnum, hoyISO } from '../../../shared/utils';

import { useRegistrarLesion } from '../hooks/useMutacionesLesion';

const inicial = () => ({ zona: '', gravedad: Gravedad.MODERADA, fecha: hoyISO(), descripcion: '' });

export function RegistrarLesionForm({ idBoxeador }: { idBoxeador: number }) {
  const [datos, setDatos] = useState(inicial);
  const registrar = useRegistrarLesion(idBoxeador);
  const { mostrar } = useToast();
  const hoy = hoyISO();

  const cambiar = <K extends keyof ReturnType<typeof inicial>>(campo: K, valor: ReturnType<typeof inicial>[K]) =>
    setDatos((actual) => ({ ...actual, [campo]: valor }));

  const enviar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registrar.mutate(
      { ...datos, zona: datos.zona.trim(), descripcion: datos.descripcion.trim() },
      {
        onSuccess: () => {
          mostrar('Lesión registrada', 'ok');
          setDatos(inicial());
          registrar.reset();
        },
      },
    );
  };

  return (
    <Card>
      <h3 className="sec">Registrar lesión</h3>
      <ErrorFormulario mensaje={registrar.isError ? getApiErrorMessage(registrar.error) : null} />
      <form onSubmit={enviar}>
        <div className="field-row">
          <Field label="Zona del cuerpo" htmlFor="lesion-zona">
            <input
              id="lesion-zona"
              placeholder="Ej: Hombro derecho"
              required
              maxLength={100}
              value={datos.zona}
              onChange={(e) => cambiar('zona', e.target.value)}
            />
          </Field>
          <Field label="Gravedad" htmlFor="lesion-gravedad">
            <select
              id="lesion-gravedad"
              required
              value={datos.gravedad}
              onChange={(e) => cambiar('gravedad', e.target.value as Gravedad)}
            >
              {Object.values(Gravedad).map((g) => (
                <option key={g} value={g}>
                  {etiquetaEnum(g)}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Fecha" htmlFor="lesion-fecha">
            <input
              id="lesion-fecha"
              type="date"
              required
              max={hoy}
              value={datos.fecha}
              onChange={(e) => cambiar('fecha', e.target.value)}
            />
          </Field>
        </div>
        <Field label="Descripción" htmlFor="lesion-descripcion">
          <input
            id="lesion-descripcion"
            placeholder="¿Qué sentís y cuándo?"
            required
            maxLength={255}
            value={datos.descripcion}
            onChange={(e) => cambiar('descripcion', e.target.value)}
          />
        </Field>
        <Button type="submit" disabled={registrar.isPending}>
          {registrar.isPending ? 'Registrando…' : 'Registrar lesión'}
        </Button>
      </form>
    </Card>
  );
}

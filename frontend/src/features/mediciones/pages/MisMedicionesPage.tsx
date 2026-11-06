import { Empty, ViewHeader } from '../../../shared/ui';

export default function MisMedicionesPage() {
  return (
    <>
      <ViewHeader titulo="Mediciones físicas" subtitulo="Peso y altura son obligatorios, el resto es opcional." />
      <Empty titulo="En construcción" />
    </>
  );
}

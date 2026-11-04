import { Empty, ViewHeader } from '../../../shared/ui';

export default function LandingPage() {
  return (
    <main className="container">
      <ViewHeader titulo="EVOBOX" subtitulo="Disciplina de hoy · resultados mañana" />
      <Empty titulo="En construcción" />
    </main>
  );
}

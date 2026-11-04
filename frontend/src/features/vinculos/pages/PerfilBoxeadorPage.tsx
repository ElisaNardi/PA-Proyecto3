import { useNavigate, useParams, useSearchParams } from 'react-router';
import axios from 'axios';

import { getApiErrorMessage } from '../../../core/api';
import { ListaLesiones } from '../../lesiones';
import { Button, Cargando, Empty, IconBack, ViewHeader } from '../../../shared/ui';
import { etiquetaEnum } from '../../../shared/utils';

import { ResumenBoxeador } from '../components/ResumenBoxeador';
import { usePerfilBoxeador } from '../hooks/usePerfilBoxeador';

const PESTANAS = [
  ['resumen', 'Resumen'],
  ['lesiones', 'Lesiones'],
  ['entrenamientos', 'Entrenamientos'],
  ['nutricion', 'Nutrición'],
  ['evolucion', 'Evolución'],
] as const;

type Pestana = (typeof PESTANAS)[number][0];

const esPestana = (valor: string | null): valor is Pestana => PESTANAS.some(([clave]) => clave === valor);

/** 404 y 403 traen mensajes técnicos ("…con ese id", "Forbidden"): se reemplazan por uno claro. */
function mensajeErrorPerfil(error: unknown): string {
  const status = axios.isAxiosError(error) ? error.response?.status : undefined;
  if (status === 404) return 'Ese boxeador no existe.';
  if (status === 403) return 'Este boxeador no está vinculado a vos.';
  return getApiErrorMessage(error);
}

export default function PerfilBoxeadorPage() {
  const navigate = useNavigate();
  const { idBoxeador: param } = useParams();
  const idBoxeador = Number(param);
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const pestana: Pestana = esPestana(tabParam) ? tabParam : 'resumen';
  const { data: perfil, isPending, isError, error } = usePerfilBoxeador(idBoxeador);

  const migas = (
    <div className="breadcrumb">
      <button type="button" onClick={() => navigate('/entrenador/boxeadores')}>
        <IconBack /> Mis boxeadores
      </button>
    </div>
  );

  if (!Number.isInteger(idBoxeador) || idBoxeador <= 0) {
    return (
      <>
        {migas}
        <Empty titulo="Boxeador no encontrado" />
      </>
    );
  }
  if (isPending) {
    return (
      <>
        {migas}
        <Cargando />
      </>
    );
  }
  if (isError) {
    return (
      <>
        {migas}
        <Empty titulo="No se pudo cargar el perfil" descripcion={mensajeErrorPerfil(error)} />
        <Button variant="secondary" onClick={() => navigate('/entrenador/boxeadores')}>
          Volver a mis boxeadores
        </Button>
      </>
    );
  }

  const subtitulo = [perfil.categoria && etiquetaEnum(perfil.categoria), etiquetaEnum(perfil.sexo)]
    .filter(Boolean)
    .join(' · ');

  return (
    <>
      {migas}
      <ViewHeader titulo={perfil.nombre} subtitulo={subtitulo} />
      <div className="tabs-sec" role="tablist" aria-label="Secciones del perfil">
        {PESTANAS.map(([clave, etiqueta]) => (
          <button
            key={clave}
            type="button"
            role="tab"
            aria-selected={pestana === clave}
            className={pestana === clave ? 'on' : undefined}
            onClick={() => setSearchParams(clave === 'resumen' ? {} : { tab: clave }, { replace: true })}
          >
            {etiqueta}
          </button>
        ))}
      </div>
      <div role="tabpanel">
        {pestana === 'resumen' && <ResumenBoxeador perfil={perfil} />}
        {pestana === 'lesiones' && <ListaLesiones idBoxeador={perfil.idBoxeador} soloLectura />}
        {(pestana === 'entrenamientos' || pestana === 'nutricion' || pestana === 'evolucion') && (
          <Empty titulo="En construcción" />
        )}
      </div>
    </>
  );
}

import { AdvertenciaLesionesActivas } from '../../lesiones';
import { Card } from '../../../shared/ui';
import { etiquetaEnum } from '../../../shared/utils';

import type { PerfilBoxeadorResponse } from '../api/vinculos.api';

const guion = '—';

export function ResumenBoxeador({ perfil }: { perfil: PerfilBoxeadorResponse }) {
  const datos: [string, string][] = [
    ['Email', perfil.email],
    ['Sexo', etiquetaEnum(perfil.sexo)],
    ['Categoría', perfil.categoria ? etiquetaEnum(perfil.categoria) : guion],
  ];

  return (
    <>
      <div className="grid two">
        <div className="stat">
          <div className="lbl">Peso inicial</div>
          <div className="val">
            {perfil.pesoInicial ?? guion}
            {perfil.pesoInicial !== null && <span className="u">kg</span>}
          </div>
        </div>
        <div className="stat">
          <div className="lbl">Altura inicial</div>
          <div className="val">
            {perfil.alturaInicial ?? guion}
            {perfil.alturaInicial !== null && <span className="u">m</span>}
          </div>
        </div>
      </div>
      <AdvertenciaLesionesActivas idBoxeador={perfil.idBoxeador} />
      <Card style={{ marginTop: 16 }}>
        <h3 className="sec">Datos</h3>
        {datos.map(([etiqueta, valor]) => (
          <div className="list-item" key={etiqueta} style={{ padding: '10px 0' }}>
            <span className="mu">{etiqueta}</span>
            <span style={{ overflowWrap: 'anywhere', textAlign: 'right' }}>{valor}</span>
          </div>
        ))}
      </Card>
    </>
  );
}

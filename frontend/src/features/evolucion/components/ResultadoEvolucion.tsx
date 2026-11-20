import { Bar, Card, Empty, Table } from '../../../shared/ui';
import { formatearFecha } from '../../../shared/utils';

import type { EvolucionResponse } from '../api/evolucion.api';
import { formatearConSigno, formatearNumero, porcentajeDeLaMeta, progresoPeso, variacionPeso } from '../utils/calculos';

const guion = '—';

interface ResultadoEvolucionProps {
  evolucion: EvolucionResponse;
  /** Suma la tabla "Plan vs. real" (vista del entrenador). */
  comparar?: boolean;
}

export function ResultadoEvolucion({ evolucion, comparar = false }: ResultadoEvolucionProps) {
  const { periodo, cumplimientoRutinas: rutinas, peso, nutricion } = evolucion;

  const variacion = variacionPeso(peso.inicial, peso.actual);
  const avancePeso = progresoPeso(peso.inicial, peso.actual, peso.objetivo);
  const pctMeta = porcentajeDeLaMeta(nutricion.promedioCaloriasDiarias, nutricion.metaCaloriasDiarias);

  const sinDatos =
    peso.actual === null && rutinas.asignadas === 0 && nutricion.promedioCaloriasDiarias === null;

  const encabezado = (
    <p className="mu" style={{ margin: '4px 0 14px' }}>
      Período: {formatearFecha(periodo.desde)} al {formatearFecha(periodo.hasta)}
    </p>
  );

  if (sinDatos) {
    return (
      <>
        {encabezado}
        <Empty
          titulo="Todavía no hay datos para este período"
          descripcion="Cuando haya mediciones, rutinas y consumos registrados, vas a ver la evolución acá."
        />
      </>
    );
  }

  return (
    <>
      {encabezado}
      <div className="grid">
        <div className="stat">
          <div className="lbl">Peso</div>
          <div className="val">
            {variacion === null ? guion : formatearConSigno(variacion)}
            {variacion !== null && <span className="u">kg</span>}
          </div>
          {avancePeso !== null && <Bar porcentaje={avancePeso} ok etiqueta="Avance hacia el peso objetivo" />}
          <p className="mu" style={{ marginTop: 8 }}>
            {peso.inicial === null || peso.actual === null
              ? 'Sin mediciones en el período'
              : `${formatearNumero(peso.inicial)} → ${formatearNumero(peso.actual)} kg`}
            {peso.objetivo === null ? ' · sin peso objetivo' : ` · objetivo ${formatearNumero(peso.objetivo)} kg`}
          </p>
        </div>

        <div className="stat">
          <div className="lbl">Rutinas cumplidas</div>
          <div className="val">
            {rutinas.porcentaje}
            <span className="u">%</span>
          </div>
          <Bar porcentaje={rutinas.porcentaje} ok etiqueta="Rutinas cumplidas" />
          <p className="mu" style={{ marginTop: 8 }}>
            {rutinas.asignadas === 0
              ? 'Sin rutinas asignadas en el período'
              : `${rutinas.completadas} de ${rutinas.asignadas} rutinas completadas`}
          </p>
        </div>

        <div className="stat">
          <div className="lbl">Calorías vs meta</div>
          <div className="val">
            {pctMeta ?? guion}
            {pctMeta !== null && <span className="u">%</span>}
          </div>
          <Bar porcentaje={pctMeta ?? 0} ok etiqueta="Calorías respecto de la meta" />
          <p className="mu" style={{ marginTop: 8 }}>
            {nutricion.promedioCaloriasDiarias === null
              ? 'Sin registros de consumo'
              : `Promedio ${formatearNumero(nutricion.promedioCaloriasDiarias)} kcal`}
            {nutricion.metaCaloriasDiarias === null
              ? ' · sin meta calórica'
              : ` · meta ${formatearNumero(nutricion.metaCaloriasDiarias)} kcal`}
          </p>
        </div>
      </div>

      {comparar && (
        <Card style={{ marginTop: 16 }}>
          <h3 className="sec">Plan vs. real</h3>
          <Table>
            <thead>
              <tr>
                <th>Indicador</th>
                <th>Plan</th>
                <th>Real</th>
                <th>Avance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Peso</td>
                <td className="num">
                  {peso.inicial === null ? guion : `${formatearNumero(peso.inicial)} kg`}
                  {' → '}
                  {peso.objetivo === null ? guion : `${formatearNumero(peso.objetivo)} kg`}
                </td>
                <td className="num">{peso.actual === null ? guion : `${formatearNumero(peso.actual)} kg`}</td>
                <td className="num">
                  {avancePeso === null ? guion : `${avancePeso} % del camino`}
                </td>
              </tr>
              <tr>
                <td>Rutinas</td>
                <td className="num">{rutinas.asignadas} asignadas</td>
                <td className="num">{rutinas.completadas} completadas</td>
                <td className="num">{rutinas.porcentaje} %</td>
              </tr>
              <tr>
                <td>Calorías diarias</td>
                <td className="num">
                  {nutricion.metaCaloriasDiarias === null ? guion : `Meta ${formatearNumero(nutricion.metaCaloriasDiarias)} kcal`}
                </td>
                <td className="num">
                  {nutricion.promedioCaloriasDiarias === null
                    ? guion
                    : `Promedio ${formatearNumero(nutricion.promedioCaloriasDiarias)} kcal`}
                </td>
                <td className="num">{pctMeta === null ? guion : `${pctMeta} % de la meta`}</td>
              </tr>
            </tbody>
          </Table>
        </Card>
      )}
    </>
  );
}

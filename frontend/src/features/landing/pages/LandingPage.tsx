import { useNavigate } from 'react-router';

import gloves from '../../../assets/gloves.png';
import heroMan from '../../../assets/hero-man.png';
import heroWoman from '../../../assets/hero-woman.png';
import { Button, IconArrow } from '../../../shared/ui';

const DESTACADOS = [
  ['+40', 'Boxeadores activos'],
  ['7', 'Módulos de seguimiento'],
  ['100%', 'Trazabilidad de lesiones'],
  ['24/7', 'Acceso desde cualquier equipo'],
] as const;

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <div className="landing-nav">
        <Button variant="secondary" size="sm" onClick={() => navigate('/login')}>
          Iniciar sesión
        </Button>
      </div>
      <section className="hero">
        <div className="hero-photos">
          <div className="ph man">
            <img src={heroMan} alt="" />
          </div>
          <div className="ph woman">
            <img src={heroWoman} alt="" />
          </div>
        </div>
        <div className="hero-split-line" />
        <div className="hero-content">
          <img className="glove" src={gloves} alt="" />
          <h1>
            EVO<span>BOX</span>
          </h1>
          <p className="tag-line">Disciplina de hoy · resultados mañana</p>
          <br />
          <Button onClick={() => navigate('/registro')}>
            Comenzar a entrenar <IconArrow />
          </Button>
        </div>
      </section>
      <div className="landing-strip">
        <div className="container">
          {DESTACADOS.map(([valor, texto]) => (
            <div className="it" key={texto}>
              <b>{valor}</b>
              <span>{texto}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

'use strict';
/* brand */
const GLOVE_IMG = 'assets/gloves.png';
function wordmark(){ return `<span class="wm">EVO<span>BOX</span></span>`; }
/* ================= ICONS (inline, stroke-based, consistent) ================= */
const I = {
  glove:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 13c-1.2-2.4-.6-5.4 1.4-7A5 5 0 0 1 16 8v3.2c1.4.4 2.4 1.7 2.4 3.2 0 1.9-1.5 3.4-3.4 3.4H10l-1.5 3H6l.8-3.6C5.7 16.3 5 14.7 5 13"/><path d="M16 8V5.6C16 4.2 17.1 3 18.5 3S21 4.2 21 5.6V11"/></svg>',
  home:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9h12v-9"/></svg>',
  bandage:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="8" width="18" height="8" rx="3" transform="rotate(-45 12 12)"/><circle cx="9.5" cy="9.5" r="1"/><circle cx="14.5" cy="14.5" r="1"/></svg>',
  scale:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="13" r="8"/><path d="M12 13 15 9"/><path d="M9 3h6"/></svg>',
  apple:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 7c-3.5 0-6 2.8-6 6.6C6 17.8 8.6 21 11 21c1 0 1.3-.5 2-.5s1 .5 2 .5c2 0 4.6-3.3 4.6-6.6 0-1.7-.7-3.1-1.8-4"/><path d="M14.5 6.2c.8-.9.9-2.2.7-3.2-1 .1-2.1.7-2.8 1.6-.7.8-1 2-.8 3.1 1 .1 2.2-.6 2.9-1.5Z"/></svg>',
  chat:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5h16v11H8l-4 4V5Z"/></svg>',
  chart:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20V10M12 20V4M20 20v-7"/></svg>',
  users:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17.5" cy="9" r="2.6"/><path d="M15.5 14.2c2.6.3 4.5 2.4 4.5 5.1"/></svg>',
  link:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 15 15 9"/><path d="M11 6.5 12.4 5a3.8 3.8 0 1 1 5.4 5.4L16.3 12"/><path d="M13 17.5 11.6 19a3.8 3.8 0 1 1-5.4-5.4L7.7 12"/></svg>',
  plus:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 5v14M5 12h14"/></svg>',
  trash:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>',
  edit:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20h4L18 10l-4-4L4 16v4Z"/></svg>',
  back:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M15 5 8 12l7 7"/></svg>',
  logout:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 4H5v16h4"/><path d="M14 8l4 4-4 4M18 12H9"/></svg>',
  warn:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3 2 20h20L12 3Z"/><path d="M12 10v4M12 17h.01"/></svg>',
  check:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12.5 9 18 20 6"/></svg>',
  arrow:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  inbox:'<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 12h5l1.5 3h5L16 12h5"/><path d="M5 12 6.5 5h11L19 12v6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-6Z"/></svg>',
  mail:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6 8.5 7 8.5-7"/></svg>',
  lock:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4.5" y="10.5" width="15" height="9.5" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/></svg>',
  chevron:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 6l6 6-6 6"/></svg>',
};

/* ================= DOMAIN HELPERS ================= */
const CAT = [['MÍNIMO',47.6],['MOSCA',50.8],['GALLO',53.5],['PLUMA',57.2],['LIGERO',61.2],['WELTER',66.7],['MEDIANO',72.6],['SEMIPESADO',79.4],['CRUCERO',90.7],['PESADO',999]];
const categoriaDe = p => (CAT.find(c => p <= c[1]) || CAT[CAT.length-1])[0];
const imc = (peso,altura) => altura ? +(peso/(altura*altura)).toFixed(1) : null;
const fmtFecha = d => { const x = d instanceof Date ? d : new Date(d); return x.toLocaleDateString('es-AR',{day:'2-digit',month:'2-digit',year:'numeric'}); };
const fmtFechaCorta = d => { const x = d instanceof Date ? d : new Date(d); return x.toLocaleDateString('es-AR',{day:'2-digit',month:'2-digit'}); };
const todayISO = () => new Date().toISOString().slice(0,10);
const uid = (() => { let n = 1000; return () => ++n; })();
const esc = s => (s ?? '').toString().replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function tag(estado){
  const t = (estado || '').toString();
  const cls = /ACTIVA|PRE_PELEA|GRAVE|PENDIENTE/.test(t) ? 'rd' : /RECUPERADA|TOMADA|MODERADA|REALIZADO/.test(t) ? 'ok' : /LEVE|RUTINARIO/.test(t) ? '' : '';
  const label = t.replace(/_/g,' ').toLowerCase();
  return `<span class="tag ${cls}">${label}</span>`;
}
function bar(pct,ok){ const v = Math.max(0,Math.min(100,pct)); return `<div class="bar${ok?' ok':''}"><i style="width:${v}%"></i></div>`; }

function calcularReferencia(objetivo, pesoActual){
  // bajar: déficit moderado, mantener: mantenimiento, subir: superávit — cálculo simplificado para prototipo
  const base = Math.round(pesoActual * 31);
  const kcal = objetivo === 'BAJAR' ? base - 450 : objetivo === 'SUBIR' ? base + 350 : base;
  return {
    kcalDiaria: kcal,
    kcalSemanal: kcal * 7,
    proteinas: Math.round(pesoActual * 2.0),
    carbohidratos: Math.round(kcal * 0.45 / 4),
    grasas: Math.round(kcal * 0.25 / 9),
  };
}

/* ================= MOCK DATA ================= */
const DB = {
  usuarios: {
    1: { id:1, rol:'ENTRENADOR', nombre:'Marcos Vega', email:'marcos@evobox.com' },
    2: { id:2, rol:'BOXEADOR', nombre:'Lucía Paredes', email:'lucia@evobox.com', entrenadorId:1, sexo:'F', pesoInicial:59.4, alturaInicial:1.65 },
    3: { id:3, rol:'BOXEADOR', nombre:'Tomás Giménez', email:'tomas@evobox.com', entrenadorId:1, sexo:'M', pesoInicial:67.0, alturaInicial:1.78 },
    4: { id:4, rol:'BOXEADOR', nombre:'Ana Ruiz', email:'ana@evobox.com', entrenadorId:1, sexo:'F', pesoInicial:52.0, alturaInicial:1.6 },
    5: { id:5, rol:'BOXEADOR', nombre:'Diego Sosa', email:'diego@evobox.com', entrenadorId:null, sexo:'M', pesoInicial:71.0, alturaInicial:1.75 },
  },
  mediciones: {
    2:[{fecha:'2026-09-30',peso:59.4,altura:1.65,grasa:21,cintura:70,env:166},{fecha:'2026-10-14',peso:58.6,altura:1.65,grasa:20,cintura:68,env:166},{fecha:'2026-10-28',peso:57.8,altura:1.65,grasa:19,cintura:67,env:166}],
    3:[{fecha:'2026-10-25',peso:66.1,altura:1.78,grasa:14,cintura:78,env:180}],
    4:[{fecha:'2026-10-30',peso:51.2,altura:1.6,grasa:18,cintura:64,env:160}],
  },
  lesiones: {
    2:[
      {id:201,zona:'Hombro derecho',descripcion:'Dolor al hacer press',fecha:'2026-10-12',gravedad:'MODERADA',cambios:[{estado:'ACTIVA',fecha:'2026-10-12'}]},
      {id:202,zona:'Muñeca izquierda',descripcion:'Sobrecarga por saco',fecha:'2026-09-02',gravedad:'LEVE',cambios:[{estado:'ACTIVA',fecha:'2026-09-02'},{estado:'RECUPERADA',fecha:'2026-09-20'}]},
    ],
    3:[], 4:[],
  },
  entrenamientos: {
    2:[
      { id:101, tipo:'PRE_PELEA', fechaInicio:'2026-11-01', fechaFin:'2026-11-14', fechaPelea:'2026-11-15',
        objetivo:{descripcion:'Bajar a 57 kg para el pesaje', pesoObjetivo:57},
        rutinas:[
          {id:1001,nombre:'Rutina A · Fuerza',ejercicios:[{id:10001,nombre:'Press banca',series:4,reps:8,peso:40,hSeries:null,hReps:null,hPeso:null},{id:10002,nombre:'Dominadas',series:3,reps:6,peso:0,hSeries:null,hReps:null,hPeso:null}]},
          {id:1002,nombre:'Rutina B · Técnica',ejercicios:[{id:10003,nombre:'Sombra',series:5,reps:3,peso:0,hSeries:null,hReps:null,hPeso:null},{id:10004,nombre:'Saco pesado',series:6,reps:3,peso:0,hSeries:null,hReps:null,hPeso:null}]},
        ]},
      { id:102, tipo:'RUTINARIO', fechaInicio:'2026-10-20', fechaFin:'2026-10-31', fechaPelea:null,
        objetivo:{descripcion:'Mantener resistencia de base', pesoObjetivo:null},
        rutinas:[{id:1003,nombre:'Rutina A · Resistencia',ejercicios:[{id:10005,nombre:'Soga',series:5,reps:3,peso:0,hSeries:5,hReps:3,hPeso:0}]}] },
    ],
    3:[], 4:[],
  },
  sugerencias: [
    {id:301,boxeadorId:2,texto:'Quiero trabajar más piernas esta semana',estado:'TOMADA_EN_CUENTA'},
    {id:302,boxeadorId:2,texto:'Me siento cansada, veníamos entrenando fuerte',estado:'PENDIENTE'},
    {id:303,boxeadorId:3,texto:'¿Podemos sumar más trabajo de cardio?',estado:'PENDIENTE'},
  ],
  referencias: {
    2:{objetivo:'BAJAR',fechaPesaje:'2026-11-14', ...calcularReferencia('BAJAR',57.8)},
  },
  consumos: { 2:[{fecha:'2026-11-02',kcal:1650,proteinas:110,carbohidratos:170,grasas:50}] },
};

/* ================= APP STATE ================= */
const S = {
  screen:'landing',      // landing | auth | app
  authMode:'login',
  authRole:'BOXEADOR',
  session:null,           // {id, rol, nombre}
  view:'inicio',
  boxId:null,             // selected boxeador id (coach drill-down)
  boxTab:'resumen',
  draft:null,             // training builder draft
  toasts:[],
};

function boxeadoresDe(entrenadorId){
  return Object.values(DB.usuarios).filter(u => u.rol === 'BOXEADOR' && u.entrenadorId === entrenadorId);
}
function ultimaMedicion(boxId){ const l = DB.mediciones[boxId]||[]; return l[l.length-1] || null; }
function lesionActiva(boxId){ return (DB.lesiones[boxId]||[]).find(l => estadoLesion(l) === 'ACTIVA') || null; }
function estadoLesion(l){ return l.cambios[l.cambios.length-1].estado; }
function categoriaBox(boxId){ const m = ultimaMedicion(boxId); return m ? categoriaDe(m.peso) : null; }

function toast(msg, ok){
  const id = uid(); S.toasts.push({id,msg,ok}); render();
  setTimeout(() => { S.toasts = S.toasts.filter(t => t.id !== id); render(); }, 2400);
}

/* ================= RENDER: SHELL ================= */
const $root = document.getElementById('root');

function render(){
  if(S.screen === 'landing') return renderLanding();
  if(S.screen === 'auth') return renderAuth();
  renderApp();
}

function renderLanding(){
  $root.innerHTML = `
  <div class="landing">
    <div class="landing-nav">
      <button class="btn secondary sm" data-a="goto-auth" data-mode="login">Iniciar sesión</button>
    </div>
    <section class="hero">
      <div class="hero-photos">
        <div class="ph man"><img src="assets/hero-man.png" alt=""></div>
        <div class="ph woman"><img src="assets/hero-woman.png" alt=""></div>
      </div>
      <div class="hero-split-line"></div>
      <div class="hero-content">
        <img class="glove" src="${GLOVE_IMG}" alt="">
        <h1>EVO<span>BOX</span></h1>
        <p class="tag-line">Disciplina de hoy · resultados mañana</p><br>
        <button class="btn" data-a="goto-auth" data-mode="registro">Comenzar a entrenar ${I.arrow}</button>
      </div>
    </section>
    <div class="landing-strip">
      <div class="container">
        <div class="it"><b>+40</b><span>Boxeadores activos</span></div>
        <div class="it"><b>7</b><span>Módulos de seguimiento</span></div>
        <div class="it"><b>100%</b><span>Trazabilidad de lesiones</span></div>
        <div class="it"><b>24/7</b><span>Acceso desde cualquier equipo</span></div>
      </div>
    </div>
  </div>`;
}

function renderAuth(){
  const isLogin = S.authMode === 'login';
  $root.innerHTML = `
  <div class="auth-screen"><div class="auth-box">
    <img class="glove" src="${GLOVE_IMG}" alt="">
    <div class="wordmark">${wordmark()}</div>
    <p class="lead">${isLogin ? 'Ingresá con tu cuenta.' : 'Creá tu cuenta para empezar.'}</p>
    <div class="seg">
      <button class="${isLogin?'on':''}" data-a="auth-mode" data-v="login">Iniciar sesión</button>
      <button class="${!isLogin?'on':''}" data-a="auth-mode" data-v="registro">Crear cuenta</button>
    </div>
    <form id="authForm">
      ${!isLogin ? `<div class="field"><label>Nombre completo</label><input id="af-nombre" placeholder="Nombre y apellido" required></div>` : ''}
      <div class="field"><label>Email</label><input id="af-email" type="email" value="${isLogin?'lucia@evobox.com':''}" placeholder="tu@email.com" required></div>
      <div class="field"><label>Contraseña</label><input id="af-pass" type="password" value="${isLogin?'12345678':''}" placeholder="••••••••" required minlength="8"></div>
      ${!isLogin ? `
      <div class="field"><label>Rol</label>
        <div class="role-pick">
          <button type="button" class="${S.authRole==='BOXEADOR'?'on':''}" data-a="auth-role" data-v="BOXEADOR">${I.glove} Boxeador</button>
          <button type="button" class="${S.authRole==='ENTRENADOR'?'on':''}" data-a="auth-role" data-v="ENTRENADOR">${I.users} Entrenador</button>
        </div>
      </div>
      <div class="field-row">
        <div class="field"><label>Fecha de nacimiento</label><input type="date" value="2000-05-14"></div>
        <div class="field"><label>Sexo</label><select><option>Femenino</option><option>Masculino</option></select></div>
      </div>
      <p class="hint" style="margin-bottom:14px">Peso y altura se registran con tu primera medición física, no hace falta ahora.</p>
      ` : ''}
      <button class="btn block" type="submit">${isLogin ? 'Ingresar' : 'Crear cuenta'}</button>
    </form>
    <p class="auth-foot">${isLogin ? '¿No tenés cuenta todavía?' : '¿Ya tenés cuenta?'}
      <button class="btn-link" data-a="auth-mode" data-v="${isLogin?'registro':'login'}">${isLogin?'Creá una':'Iniciá sesión'}</button>
    </p>
  </div></div>`;
}

const NAV = {
  BOXEADOR: [
    ['inicio','Mi entrenamiento','home'],
    ['lesiones','Lesiones','bandage'],
    ['mediciones','Mediciones','scale'],
    ['nutricion','Nutrición','apple'],
    ['sugerencias','Sugerencias','chat'],
    ['evolucion','Mi evolución','chart'],
  ],
  ENTRENADOR: [
    ['inicio','Boxeadores','users'],
    ['sugerencias','Sugerencias','chat'],
    ['evolucion','Evolución','chart'],
  ],
};

function renderApp(){
  const rol = S.session.rol;
  const nav = NAV[rol];
  const initials = S.session.nombre.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
  $root.innerHTML = `
  <div class="app">
    <aside>
      <div class="logo"><img class="glove" src="${GLOVE_IMG}" alt="">${wordmark()}</div>
      <nav>
        ${nav.map(([v,label,icon]) => `<button class="nav-item ${S.view===v?'on':''}" data-a="go" data-v="${v}">${I[icon]}<span>${label}</span></button>`).join('')}
      </nav>
      <div class="who">
        <div class="id"><div class="av">${initials}</div><div><div class="nm">${esc(S.session.nombre)}</div><div class="rl">${rol}</div></div></div>
        <button class="btn-link danger" data-a="logout" style="margin-left:40px">${I.logout} Salir</button>
      </div>
    </aside>
    <main>${renderView(rol)}</main>
    <div class="bottom-tabs">
      ${nav.map(([v,label,icon]) => `<button class="${S.view===v?'on':''}" data-a="go" data-v="${v}">${I[icon]}<span>${label}</span></button>`).join('')}
    </div>
  </div>
  <div class="toast-wrap">${S.toasts.map(t=>`<div class="toast ${t.ok?'ok':''}">${t.ok?'<span class="dot"></span>':''}${esc(t.msg)}</div>`).join('')}</div>`;
}

function renderView(rol){
  if(rol === 'BOXEADOR') return VIEWS_BOXEADOR[S.view] ? VIEWS_BOXEADOR[S.view]() : empty('Vista no encontrada');
  return VIEWS_ENTRENADOR[S.view] ? VIEWS_ENTRENADOR[S.view]() : empty('Vista no encontrada');
}
function empty(msg, hint){
  return `<div class="card"><div class="empty">${I.inbox}<h3 style="font-family:var(--f-body);font-size:15px">${esc(msg)}</h3>${hint?`<p>${esc(hint)}</p>`:''}</div></div>`;
}
function head(title,sub){ return `<div class="view-head"><div><h2>${title}</h2>${sub?`<p class="sub">${sub}</p>`:''}</div></div>`; }

/* ================= VIEWS: BOXEADOR ================= */
const VIEWS_BOXEADOR = {
  inicio(){
    const me = S.session.id;
    const entrenos = DB.entrenamientos[me] || [];
    return head('Mi entrenamiento','Lo que te asignó tu entrenador.') +
    (entrenos.length ? entrenos.map(t => {
      const hecho = t.rutinas.every(r => r.ejercicios.every(e => e.hSeries !== null));
      return `<div class="card">
        <div class="card-head">
          <div><h3>${fmtFechaCorta(t.fechaInicio)} – ${fmtFechaCorta(t.fechaFin)}</h3>
            <div class="actions" style="margin-top:6px">${tag(t.tipo)}${tag(hecho?'REALIZADO':'PENDIENTE')}</div></div>
        </div>
        ${t.fechaPelea ? `<p class="mu">🥊 Pelea: <b style="color:var(--ink)">${fmtFecha(t.fechaPelea)}</b></p>` : ''}
        ${t.objetivo?.descripcion ? `<p class="mu" style="margin-top:6px">Objetivo: <b style="color:var(--ink)">${esc(t.objetivo.descripcion)}</b>${t.objetivo.pesoObjetivo?` · ${t.objetivo.pesoObjetivo} kg`:''}</p>` : ''}
        ${t.rutinas.map(r => `
          <h3 class="sec" style="margin-top:16px">${esc(r.nombre)}</h3>
          <div class="ex-row-head"><span>Ejercicio</span><span>Series</span><span>Reps</span><span>Kg</span></div>
          ${r.ejercicios.map(e => `
            <div class="ex-row">
              <div><div class="nm">${esc(e.nombre)}</div><div class="plan">Plan: ${e.series}×${e.reps}${e.peso?` · ${e.peso} kg`:' · sin peso'}</div></div>
              <input type="number" min="0" placeholder="0" value="${e.hSeries ?? ''}" data-ex="${e.id}" data-f="hSeries" aria-label="Series realizadas de ${esc(e.nombre)}">
              <input type="number" min="0" placeholder="0" value="${e.hReps ?? ''}" data-ex="${e.id}" data-f="hReps" aria-label="Repeticiones realizadas de ${esc(e.nombre)}">
              <input type="number" min="0" placeholder="0" value="${e.hPeso ?? ''}" data-ex="${e.id}" data-f="hPeso" aria-label="Peso usado en ${esc(e.nombre)}">
            </div>`).join('')}
        `).join('')}
        <div class="actions" style="margin-top:14px">
          <button class="btn ${hecho?'subtle':''}" data-a="marcar-cumplimiento" data-t="${t.id}" ${hecho?'disabled':''}>${I.check} ${hecho?'Rutina registrada':'Marcar como realizada'}</button>
        </div>
      </div>`;
    }).join('') : empty('Todavía no tenés entrenamientos asignados','Tu entrenador va a asignarte un plan pronto. Mientras tanto podés revisar tus lesiones y mediciones.'));
  },

  lesiones(){
    const me = S.session.id;
    const ls = DB.lesiones[me] || [];
    return head('Mis lesiones','Tu entrenador las ve antes de asignarte trabajo.') +
    (ls.length ? ls.map(l => {
      const est = estadoLesion(l);
      return `<div class="card list-item" style="padding:16px 20px">
        <div class="l-main"><h4>${esc(l.zona)}</h4><p class="mu">${esc(l.descripcion)} · desde ${fmtFecha(l.fecha)}</p></div>
        <div class="actions">${tag(l.gravedad)}${tag(est)}
          <button class="btn secondary sm" data-a="toggle-lesion" data-l="${l.id}">${est==='ACTIVA'?'Marcar recuperada':'Reactivar'}</button>
        </div>
      </div>`;
    }).join('') : '') +
    `<div class="card">
      <h3 class="sec">Registrar lesión</h3>
      <form id="lesForm">
        <div class="field-row">
          <div class="field"><label>Zona del cuerpo</label><input id="lf-zona" placeholder="Ej: Hombro derecho" required></div>
          <div class="field"><label>Gravedad</label><select id="lf-grav"><option>LEVE</option><option selected>MODERADA</option><option>GRAVE</option></select></div>
        </div>
        <div class="field"><label>Descripción</label><input id="lf-desc" placeholder="¿Qué sentís y cuándo?" required></div>
        <button class="btn" type="submit">Registrar lesión</button>
      </form>
    </div>`;
  },

  mediciones(){
    const me = S.session.id;
    const hist = DB.mediciones[me] || [];
    const ultima = hist[hist.length-1];
    return head('Mediciones físicas','Peso y altura son obligatorios, el resto es opcional.') +
    `<div class="card">
      <form id="medForm">
        <div class="field-row">
          <div class="field"><label>Peso (kg) *</label><input id="mf-peso" type="number" step=".1" min="1" value="${ultima?.peso ?? ''}" required></div>
          <div class="field"><label>Altura (m) *</label><input id="mf-altura" type="number" step=".01" min="1" value="${ultima?.altura ?? 1.65}" required></div>
          <div class="field"><label>% grasa</label><input id="mf-grasa" type="number" step=".1" min="0"></div>
          <div class="field"><label>Cintura (cm)</label><input id="mf-cintura" type="number" min="0"></div>
          <div class="field"><label>Envergadura (cm)</label><input id="mf-env" type="number" min="0"></div>
        </div>
        <div class="actions between">
          <button class="btn" type="submit">Guardar medición</button>
          ${ultima ? `<span class="mu">IMC actual: <b class="num" style="color:var(--ink)">${imc(ultima.peso,ultima.altura)}</b> · Categoría <b style="color:var(--ink)">${categoriaDe(ultima.peso)}</b></span>` : ''}
        </div>
      </form>
    </div>
    <div class="card">
      <h3 class="sec">Historial</h3>
      ${hist.length ? `<div class="table-wrap"><table><tr><th>Fecha</th><th>Peso</th><th>% grasa</th><th>IMC</th></tr>
        ${[...hist].reverse().map(m=>`<tr><td>${fmtFecha(m.fecha)}</td><td class="num">${m.peso} kg</td><td class="num">${m.grasa??'—'}%</td><td class="num">${imc(m.peso,m.altura)}</td></tr>`).join('')}
      </table></div>` : empty('Todavía no registraste mediciones')}
    </div>`;
  },

  nutricion(){
    const me = S.session.id;
    const ref = DB.referencias[me];
    const hoy = (DB.consumos[me]||[])[(DB.consumos[me]||[]).length-1] || {kcal:0,proteinas:0,carbohidratos:0,grasas:0};
    return head('Nutrición','Tu meta calórica según tu objetivo.') +
    (!ref ? `<div class="card">
      <h3 class="sec">Definir objetivo</h3>
      <form id="refForm">
        <div class="field-row">
          <div class="field"><label>Objetivo</label><select id="rf-obj"><option value="BAJAR">Bajar de peso</option><option value="MANTENER">Mantener</option><option value="SUBIR">Subir de categoría</option></select></div>
          <div class="field"><label>Fecha de pesaje</label><input id="rf-fecha" type="date" value="${todayISO()}"></div>
        </div>
        <button class="btn" type="submit">Calcular mi referencia</button>
      </form>
    </div>` : `
    <div class="grid two">
      <div class="stat"><div class="lbl">Meta diaria</div><div class="val">${ref.kcalDiaria.toLocaleString('es-AR')}<span class="u">kcal</span></div><span class="mu">Objetivo: ${ref.objetivo.toLowerCase()} · pesaje ${fmtFecha(ref.fechaPesaje)}</span></div>
      <div class="stat"><div class="lbl">Meta semanal</div><div class="val">${ref.kcalSemanal.toLocaleString('es-AR')}<span class="u">kcal</span></div><span class="mu">7 días de preparación</span></div>
    </div>
    <div class="card">
      <h3 class="sec">Hoy</h3>
      ${[['Calorías',hoy.kcal,ref.kcalDiaria,'kcal'],['Proteínas',hoy.proteinas,ref.proteinas,'g'],['Carbohidratos',hoy.carbohidratos,ref.carbohidratos,'g'],['Grasas',hoy.grasas,ref.grasas,'g']]
        .map(m=>`<div class="actions between mu" style="margin-top:10px"><span>${m[0]}</span><span class="num">${m[1]} / ${m[2]} ${m[3]}</span></div>${bar(m[1]/m[2]*100,true)}`).join('')}
    </div>
    <div class="card">
      <h3 class="sec">Registrar consumo de hoy</h3>
      <form id="consForm">
        <div class="field-row">
          <div class="field"><label>Calorías</label><input id="cf-kcal" type="number" min="0" placeholder="kcal"></div>
          <div class="field"><label>Proteínas (g)</label><input id="cf-p" type="number" min="0"></div>
          <div class="field"><label>Carbohidratos (g)</label><input id="cf-c" type="number" min="0"></div>
          <div class="field"><label>Grasas (g)</label><input id="cf-g" type="number" min="0"></div>
        </div>
        <button class="btn" type="submit">Registrar consumo</button>
      </form>
    </div>`);
  },

  sugerencias(){
    const me = S.session.id;
    const mias = DB.sugerencias.filter(s => s.boxeadorId === me);
    return head('Sugerencias','No son vinculantes: tu entrenador decide.') +
    `<div class="card">
      <form id="sugForm">
        <div class="field"><label>¿Qué querés trabajar o cómo te sentís?</label><textarea id="sf-texto" rows="3" required></textarea></div>
        <button class="btn" type="submit">Enviar sugerencia</button>
      </form>
    </div>` +
    (mias.length ? mias.slice().reverse().map(s => `<div class="card list-item"><div class="l-main"><p>${esc(s.texto)}</p></div>${tag(s.estado)}</div>`).join('') : '');
  },

  evolucion(){
    const me = S.session.id;
    const hist = DB.mediciones[me] || [];
    const first = hist[0], last = hist[hist.length-1];
    const deltaPeso = first && last ? (last.peso - first.peso).toFixed(1) : '—';
    const entrenos = DB.entrenamientos[me] || [];
    const totalEj = entrenos.flatMap(t=>t.rutinas.flatMap(r=>r.ejercicios));
    const cumplidos = totalEj.filter(e=>e.hSeries!==null).length;
    const pctCumpl = totalEj.length ? Math.round(cumplidos/totalEj.length*100) : 0;
    const ref = DB.referencias[me];
    const hoy = (DB.consumos[me]||[])[(DB.consumos[me]||[]).length-1];
    const pctKcal = ref && hoy ? Math.round(hoy.kcal/ref.kcalDiaria*100) : null;
    return head('Mi evolución','Cómo venís hacia tus objetivos.') +
    `<div class="grid">
      <div class="stat"><div class="lbl">Peso</div><div class="val">${deltaPeso>0?'+':''}${deltaPeso}<span class="u">kg</span></div>${bar(50+(-deltaPeso*10),true)}</div>
      <div class="stat"><div class="lbl">Rutinas cumplidas</div><div class="val">${pctCumpl}<span class="u">%</span></div>${bar(pctCumpl,true)}</div>
      <div class="stat"><div class="lbl">IMC actual</div><div class="val">${last?imc(last.peso,last.altura):'—'}</div>${bar(last?(imc(last.peso,last.altura)/35*100):0,true)}</div>
      <div class="stat"><div class="lbl">Calorías vs meta</div><div class="val">${pctKcal??'—'}<span class="u">${pctKcal!==null?'%':''}</span></div>${bar(pctKcal||0,true)}</div>
    </div>`;
  },
};

/* ================= VIEWS: ENTRENADOR ================= */
const VIEWS_ENTRENADOR = {
  inicio(){
    const mios = boxeadoresDe(S.session.id).sort((a,b)=>a.nombre.localeCompare(b.nombre));
    return head('Mis boxeadores','Orden alfabético · última medición y peso actual.') +
    `<div class="card" style="margin-bottom:14px"><form id="vincForm" class="actions">
      <div class="field" style="flex:1;margin-bottom:0"><label>Vincular boxeador por email</label><input id="vf-email" type="email" placeholder="boxeador@evobox.com" required></div>
      <button class="btn secondary" type="submit" style="margin-top:20px">${I.link} Vincular</button>
    </form></div>` +
    (mios.length ? `<div class="card flush"><div class="table-wrap"><table>
      <tr><th>Boxeador</th><th>Categoría</th><th>Peso</th><th>Última medición</th><th></th></tr>
      ${mios.map(b => { const m = ultimaMedicion(b.id); const les = lesionActiva(b.id);
        return `<tr class="clickable" data-a="ver-boxeador" data-b="${b.id}">
          <td><div class="avatar-row"><div class="avatar">${b.nombre.split(' ').map(w=>w[0]).slice(0,2).join('')}</div>
            <div>${esc(b.nombre)}${les?` ${tag('LESIÓN ACTIVA')}`:''}</div></div></td>
          <td>${m?categoriaDe(m.peso):'—'}</td><td class="num">${m?m.peso+' kg':'—'}</td><td>${m?fmtFecha(m.fecha):'—'}</td>
          <td><button class="btn-link" data-a="ver-boxeador" data-b="${b.id}">Ver perfil ${I.chevron}</button></td>
        </tr>`; }).join('')}
    </table></div></div>` : empty('Todavía no tenés boxeadores vinculados','Vinculá uno con el formulario de arriba para empezar a armarle su plan.'));
  },

  boxeador(){
    const b = DB.usuarios[S.boxId];
    if(!b) return empty('Boxeador no encontrado');
    const m = ultimaMedicion(b.id), les = DB.lesiones[b.id]||[], activa = lesionActiva(b.id);
    const entrenos = DB.entrenamientos[b.id]||[];
    const tabs = [['resumen','Resumen'],['lesiones','Lesiones'],['entrenamientos','Entrenamientos'],['nutricion','Nutrición'],['evolucion','Evolución']];
    let body = '';
    if(S.boxTab==='resumen'){
      body = `<div class="grid two">
        <div class="stat"><div class="lbl">Peso actual</div><div class="val">${m?m.peso:'—'}<span class="u">kg</span></div><span class="mu">${m?'Categoría '+categoriaDe(m.peso):'Sin mediciones'}</span></div>
        <div class="stat"><div class="lbl">IMC</div><div class="val">${m?imc(m.peso,m.altura):'—'}</div><span class="mu">Última medición ${m?fmtFecha(m.fecha):'—'}</span></div>
      </div>
      ${activa ? `<div class="warn-box">${I.warn}<div><b>Lesión activa:</b> ${esc(activa.zona)} (${activa.gravedad.toLowerCase()}). Tenela en cuenta al planificar.</div></div>` : ''}
      <div class="card"><h3 class="sec">Historial de mediciones</h3>
        ${(DB.mediciones[b.id]||[]).length ? `<div class="table-wrap"><table><tr><th>Fecha</th><th>Peso</th><th>% grasa</th><th>Cintura</th></tr>
        ${[...(DB.mediciones[b.id]||[])].reverse().map(x=>`<tr><td>${fmtFecha(x.fecha)}</td><td class="num">${x.peso} kg</td><td class="num">${x.grasa??'—'}%</td><td class="num">${x.cintura??'—'}${x.cintura?' cm':''}</td></tr>`).join('')}
        </table></div>` : empty('Sin mediciones registradas')}
      </div>`;
    } else if(S.boxTab==='lesiones'){
      body = les.length ? les.map(l=>{ const est=estadoLesion(l);
        return `<div class="card">
          <div class="card-head"><h3>${esc(l.zona)}</h3><div>${tag(l.gravedad)}${tag(est)}</div></div>
          <p class="mu">${esc(l.descripcion)}</p>
          <h3 class="sec" style="margin-top:14px">Historial de estado</h3>
          <div class="table-wrap"><table><tr><th>Estado</th><th>Fecha</th></tr>
          ${l.cambios.map(c=>`<tr><td>${tag(c.estado)}</td><td>${fmtFecha(c.fecha)}</td></tr>`).join('')}</table></div>
        </div>`; }).join('') : empty('Sin lesiones registradas','Buenas noticias: este boxeador no tiene lesiones en su historial.');
    } else if(S.boxTab==='entrenamientos'){
      body = `<div class="actions end" style="margin-bottom:14px"><button class="btn" data-a="nuevo-entreno" data-b="${b.id}">${I.plus} Asignar entrenamiento</button></div>` +
      (entrenos.length ? entrenos.map(t=>`<div class="card">
        <div class="card-head"><div><h3>${fmtFechaCorta(t.fechaInicio)} – ${fmtFechaCorta(t.fechaFin)}</h3>
          <div class="actions" style="margin-top:6px">${tag(t.tipo)}${t.fechaPelea?`<span class="mu">Pelea ${fmtFecha(t.fechaPelea)}</span>`:''}</div></div>
          <button class="btn secondary sm" data-a="editar-entreno" data-t="${t.id}">${I.edit} Ajustar</button>
        </div>
        ${t.rutinas.map(r=>`<p class="mu" style="margin-top:6px">${esc(r.nombre)} · ${r.ejercicios.length} ejercicio${r.ejercicios.length!==1?'s':''}</p>`).join('')}
      </div>`).join('') : empty('Sin entrenamientos asignados todavía'));
    } else if(S.boxTab==='nutricion'){
      const ref = DB.referencias[b.id]; const cons = DB.consumos[b.id]||[];
      body = ref ? `<div class="grid two">
        <div class="stat"><div class="lbl">Meta diaria</div><div class="val">${ref.kcalDiaria}<span class="u">kcal</span></div><span class="mu">Objetivo ${ref.objetivo.toLowerCase()}</span></div>
        <div class="stat"><div class="lbl">Macros</div><div class="val" style="font-size:20px">P ${ref.proteinas}g · C ${ref.carbohidratos}g · G ${ref.grasas}g</div></div>
      </div>
      <div class="card"><h3 class="sec">Ajustar referencia calórica</h3>
        <form id="ajusteRefForm" data-b="${b.id}">
          <div class="field"><label>Calorías diarias</label><input id="arf-kcal" type="number" value="${ref.kcalDiaria}"></div>
          <button class="btn secondary" type="submit">Guardar ajuste</button>
        </form>
      </div>
      <div class="card"><h3 class="sec">Consumo registrado</h3>
        ${cons.length ? `<div class="table-wrap"><table><tr><th>Fecha</th><th>Kcal</th><th>P</th><th>C</th><th>G</th></tr>
        ${[...cons].reverse().map(c=>`<tr><td>${fmtFecha(c.fecha)}</td><td class="num">${c.kcal}</td><td class="num">${c.proteinas}</td><td class="num">${c.carbohidratos}</td><td class="num">${c.grasas}</td></tr>`).join('')}
        </table></div>` : empty('Sin registros de consumo')}
      </div>` : empty('Este boxeador todavía no definió su objetivo nutricional');
    } else if(S.boxTab==='evolucion'){
      const hist = DB.mediciones[b.id]||[]; const first=hist[0], last=hist[hist.length-1];
      body = (first && last) ? `<div class="card"><h3 class="sec">Antes / después</h3><div class="table-wrap"><table>
        <tr><th></th><th>${fmtFecha(first.fecha)}</th><th>${fmtFecha(last.fecha)}</th><th>Cambio</th></tr>
        <tr><td>Peso</td><td class="num">${first.peso} kg</td><td class="num">${last.peso} kg</td><td class="num">${(last.peso-first.peso).toFixed(1)} kg</td></tr>
        <tr><td>% grasa</td><td class="num">${first.grasa??'—'}</td><td class="num">${last.grasa??'—'}</td><td class="num">${first.grasa&&last.grasa?(last.grasa-first.grasa):'—'}</td></tr>
        <tr><td>IMC</td><td class="num">${imc(first.peso,first.altura)}</td><td class="num">${imc(last.peso,last.altura)}</td><td class="num">${(imc(last.peso,last.altura)-imc(first.peso,first.altura)).toFixed(1)}</td></tr>
      </table></div></div>` : empty('Hacen falta al menos dos mediciones para comparar evolución');
    }
    return `<div class="breadcrumb"><button data-a="go" data-v="inicio">${I.back} Mis boxeadores</button></div>` +
    head(esc(b.nombre), (m?categoriaDe(m.peso)+' · ':'')+(b.sexo==='F'?'Femenino':'Masculino')) +
    `<div class="tabs-sec">${tabs.map(([v,l])=>`<button class="${S.boxTab===v?'on':''}" data-a="box-tab" data-v="${v}">${l}</button>`).join('')}</div>` +
    body;
  },

  asignar(){ return renderEntrenoForm(false); },
  editar(){ return renderEntrenoForm(true); },

  sugerencias(){
    const mios = boxeadoresDe(S.session.id).map(b=>b.id);
    const sugs = DB.sugerencias.filter(s=>mios.includes(s.boxeadorId));
    return head('Sugerencias recibidas','Marcá si la tuviste en cuenta al planificar.') +
    (sugs.length ? sugs.slice().reverse().map(s=>{ const b=DB.usuarios[s.boxeadorId];
      return `<div class="card list-item"><div class="l-main"><p>${esc(s.texto)}</p><p class="mu">${esc(b?.nombre||'')}</p></div>
        <div class="actions">${tag(s.estado)}${s.estado==='PENDIENTE'?`
          <button class="btn sm" data-a="resolver-sug" data-s="${s.id}" data-v="TOMADA_EN_CUENTA">Tomada</button>
          <button class="btn secondary sm" data-a="resolver-sug" data-s="${s.id}" data-v="NO_TOMADA_EN_CUENTA">No tomada</button>`:''}</div>
      </div>`; }).join('') : empty('Sin sugerencias por ahora'));
  },

  evolucion(){
    const mios = boxeadoresDe(S.session.id);
    if(!S.boxId && mios[0]) S.boxId = mios[0].id;
    const b = DB.usuarios[S.boxId];
    const hist = b ? (DB.mediciones[b.id]||[]) : [];
    const first = hist[0], last = hist[hist.length-1];
    return head('Evolución','Antes y después de cada boxeador.') +
    `<div class="card"><label>Boxeador</label><select id="evoSel">${mios.map(x=>`<option value="${x.id}" ${x.id===S.boxId?'selected':''}>${esc(x.nombre)}</option>`).join('')}</select></div>` +
    (first && last ? `<div class="card"><h3 class="sec">${esc(b.nombre)}</h3><div class="table-wrap"><table>
      <tr><th></th><th>${fmtFecha(first.fecha)}</th><th>${fmtFecha(last.fecha)}</th><th>Cambio</th></tr>
      <tr><td>Peso</td><td class="num">${first.peso} kg</td><td class="num">${last.peso} kg</td><td class="num">${(last.peso-first.peso).toFixed(1)} kg</td></tr>
      <tr><td>IMC</td><td class="num">${imc(first.peso,first.altura)}</td><td class="num">${imc(last.peso,last.altura)}</td><td class="num">${(imc(last.peso,last.altura)-imc(first.peso,first.altura)).toFixed(1)}</td></tr>
    </table></div></div>` : empty('Hacen falta al menos dos mediciones para este boxeador'));
  },
};

function blankRutina(){ return {id:uid(),nombre:'Rutina '+String.fromCharCode(65+Math.random()*4|0),ejercicios:[blankEjercicio()]}; }
function blankEjercicio(){ return {id:uid(),nombre:'',series:3,reps:10,peso:0,hSeries:null,hReps:null,hPeso:null}; }

function renderEntrenoForm(isEdit){
  const b = DB.usuarios[S.draft.boxeadorId];
  const activa = lesionActiva(S.draft.boxeadorId);
  return `<div class="breadcrumb"><button data-a="go" data-v="inicio">${I.back} ${esc(b?.nombre||'')}</button></div>` +
  head(isEdit?'Ajustar entrenamiento':'Asignar entrenamiento', isEdit?'Modificá fechas, rutinas y ejercicios.':'Elegí tipo y armá las rutinas.') +
  (activa ? `<div class="warn-box">${I.warn}<div><b>Lesión activa:</b> ${esc(activa.zona)}, ${activa.gravedad.toLowerCase()}. Podés asignar igual — es una advertencia, no un bloqueo.</div></div>` : '') +
  `<form id="entrenoForm">
    <div class="card">
      <div class="field-row">
        <div class="field"><label>Tipo</label><select id="ef-tipo">
          <option value="RUTINARIO" ${S.draft.tipo==='RUTINARIO'?'selected':''}>Rutinario</option>
          <option value="PRE_PELEA" ${S.draft.tipo==='PRE_PELEA'?'selected':''}>Pre-pelea</option>
          <option value="POST_PELEA" ${S.draft.tipo==='POST_PELEA'?'selected':''}>Post-pelea</option>
        </select></div>
        <div class="field"><label>Inicio</label><input id="ef-inicio" type="date" value="${S.draft.fechaInicio}"></div>
        <div class="field"><label>Fin</label><input id="ef-fin" type="date" value="${S.draft.fechaFin}"></div>
        <div class="field" id="ef-pelea-wrap" style="${S.draft.tipo==='PRE_PELEA'?'':'display:none'}"><label>Fecha de pelea</label><input id="ef-pelea" type="date" value="${S.draft.fechaPelea||''}"></div>
      </div>
    </div>
    <div class="card">
      <div class="card-head"><h3 class="sec" style="margin:0">Rutinas</h3><button type="button" class="btn-link" data-a="add-rutina">${I.plus} Agregar rutina</button></div>
      ${S.draft.rutinas.map((r,ri)=>`
      <div class="rutina-block">
        <div class="rb-head"><input value="${esc(r.nombre)}" data-rutina="${r.id}" data-f="nombre" placeholder="Nombre de la rutina">
          ${S.draft.rutinas.length>1?`<button type="button" class="btn-link danger" data-a="del-rutina" data-r="${r.id}">${I.trash}</button>`:''}</div>
        <div class="ex-row-head builder"><span>Ejercicio</span><span>Series</span><span>Reps</span><span>Kg</span><span></span></div>
        ${r.ejercicios.map(e=>`
          <div class="ex-row builder">
            <input placeholder="Nombre del ejercicio" value="${esc(e.nombre)}" data-rutina="${r.id}" data-ej="${e.id}" data-f="nombre">
            <input type="number" min="1" placeholder="0" value="${e.series}" data-rutina="${r.id}" data-ej="${e.id}" data-f="series" aria-label="Series">
            <input type="number" min="1" placeholder="0" value="${e.reps}" data-rutina="${r.id}" data-ej="${e.id}" data-f="reps" aria-label="Repeticiones">
            <input type="number" min="0" placeholder="0" value="${e.peso}" data-rutina="${r.id}" data-ej="${e.id}" data-f="peso" aria-label="Peso en kilogramos">
            ${r.ejercicios.length>1?`<button type="button" class="btn-link danger icon-only" data-a="del-ejercicio" data-r="${r.id}" data-e="${e.id}">${I.trash}</button>`:'<span></span>'}
          </div>`).join('')}
        <button type="button" class="btn-link" style="margin-top:8px" data-a="add-ejercicio" data-r="${r.id}">${I.plus} Agregar ejercicio</button>
      </div>`).join('')}
    </div>
    <div class="card">
      <h3 class="sec">Objetivo</h3>
      <div class="field-row">
        <div class="field" style="flex:2"><label>Descripción</label><input id="ef-objdesc" value="${esc(S.draft.objetivoDescripcion||'')}" placeholder="Ej: Bajar a 57 kg para el pesaje"></div>
        <div class="field"><label>Peso objetivo (kg)</label><input id="ef-objpeso" type="number" min="1" value="${S.draft.objetivoPeso||''}"></div>
      </div>
    </div>
    <div class="actions end">
      <button type="button" class="btn secondary" data-a="go" data-v="inicio">Cancelar</button>
      <button class="btn" type="submit">${isEdit?'Guardar cambios':'Confirmar asignación'}</button>
    </div>
  </form>`;
}

/* ================= EVENTS ================= */
function syncDraftFromInputs(){
  const tipo = document.getElementById('ef-tipo'); if(tipo) S.draft.tipo = tipo.value;
  const ini = document.getElementById('ef-inicio'); if(ini) S.draft.fechaInicio = ini.value;
  const fin = document.getElementById('ef-fin'); if(fin) S.draft.fechaFin = fin.value;
  const pelea = document.getElementById('ef-pelea'); if(pelea) S.draft.fechaPelea = pelea.value;
  const od = document.getElementById('ef-objdesc'); if(od) S.draft.objetivoDescripcion = od.value;
  const op = document.getElementById('ef-objpeso'); if(op) S.draft.objetivoPeso = op.value ? +op.value : null;
}

document.addEventListener('submit', e => {
  const f = e.target; e.preventDefault();
  if(f.id === 'authForm'){
    const email = document.getElementById('af-email').value.trim();
    const isLogin = S.authMode === 'login';
    let user = Object.values(DB.usuarios).find(u => u.email === email);
    if(isLogin){
      if(!user){ toast('No encontramos esa cuenta'); return; }
      S.session = {id:user.id, rol:user.rol, nombre:user.nombre};
    } else {
      const nombre = document.getElementById('af-nombre').value.trim() || 'Nuevo usuario';
      const id = uid();
      user = {id, rol:S.authRole, nombre, email: email || `usuario${id}@evobox.com`, entrenadorId:null};
      DB.usuarios[id] = user;
      S.session = {id, rol:S.authRole, nombre};
      toast('Cuenta creada', true);
    }
    S.screen = 'app'; S.view = 'inicio'; S.boxId = null;
    render(); return;
  }
  if(f.id === 'lesForm'){
    const me = S.session.id;
    DB.lesiones[me] = DB.lesiones[me] || [];
    DB.lesiones[me].unshift({ id:uid(), zona:document.getElementById('lf-zona').value, descripcion:document.getElementById('lf-desc').value,
      gravedad:document.getElementById('lf-grav').value, fecha:todayISO(), cambios:[{estado:'ACTIVA',fecha:todayISO()}] });
    toast('Lesión registrada', true); render(); return;
  }
  if(f.id === 'medForm'){
    const me = S.session.id;
    const peso = +document.getElementById('mf-peso').value, altura = +document.getElementById('mf-altura').value;
    DB.mediciones[me] = DB.mediciones[me] || [];
    DB.mediciones[me].push({ fecha:todayISO(), peso, altura, grasa:+document.getElementById('mf-grasa').value || null,
      cintura:+document.getElementById('mf-cintura').value || null, env:+document.getElementById('mf-env').value || null });
    toast(`Medición guardada · IMC ${imc(peso,altura)} · categoría ${categoriaDe(peso)}`, true); render(); return;
  }
  if(f.id === 'refForm'){
    const me = S.session.id;
    const objetivo = document.getElementById('rf-obj').value, fechaPesaje = document.getElementById('rf-fecha').value;
    const m = ultimaMedicion(me);
    DB.referencias[me] = { objetivo, fechaPesaje, ...calcularReferencia(objetivo, m?m.peso:60) };
    toast('Referencia calórica calculada', true); render(); return;
  }
  if(f.id === 'consForm'){
    const me = S.session.id;
    DB.consumos[me] = DB.consumos[me] || [];
    DB.consumos[me].push({ fecha:todayISO(), kcal:+document.getElementById('cf-kcal').value||0, proteinas:+document.getElementById('cf-p').value||0,
      carbohidratos:+document.getElementById('cf-c').value||0, grasas:+document.getElementById('cf-g').value||0 });
    toast('Consumo registrado', true); render(); return;
  }
  if(f.id === 'sugForm'){
    const me = S.session.id;
    DB.sugerencias.push({ id:uid(), boxeadorId:me, texto:document.getElementById('sf-texto').value, estado:'PENDIENTE' });
    toast('Sugerencia enviada', true); render(); return;
  }
  if(f.id === 'vincForm'){
    const email = document.getElementById('vf-email').value.trim();
    const user = Object.values(DB.usuarios).find(u => u.email === email && u.rol === 'BOXEADOR');
    if(!user){ toast('No encontramos un boxeador con ese email'); return; }
    if(user.entrenadorId){ toast('Ese boxeador ya está vinculado a un entrenador'); return; }
    user.entrenadorId = S.session.id;
    toast(`${user.nombre} vinculado`, true); render(); return;
  }
  if(f.id === 'ajusteRefForm'){
    const bId = +f.dataset.b;
    DB.referencias[bId].kcalDiaria = +document.getElementById('arf-kcal').value;
    toast('Referencia ajustada', true); render(); return;
  }
  if(f.id === 'entrenoForm'){
    syncDraftFromInputs();
    const d = S.draft;
    if(!d.fechaInicio || !d.fechaFin){ toast('Faltan las fechas'); return; }
    if(d.tipo === 'PRE_PELEA' && !d.fechaPelea){ toast('Los entrenamientos pre-pelea necesitan fecha de pelea'); return; }
    if(d.rutinas.some(r=>!r.nombre.trim() || r.ejercicios.some(e=>!e.nombre.trim()))){ toast('Completá el nombre de cada rutina y ejercicio'); return; }
    const payload = { tipo:d.tipo, fechaInicio:d.fechaInicio, fechaFin:d.fechaFin, fechaPelea:d.tipo==='PRE_PELEA'?d.fechaPelea:null,
      objetivo:{descripcion:d.objetivoDescripcion||'', pesoObjetivo:d.objetivoPeso||null},
      rutinas: d.rutinas.map(r=>({id:r.id,nombre:r.nombre,ejercicios:r.ejercicios.map(e=>({id:e.id,nombre:e.nombre,series:+e.series,reps:+e.reps,peso:+e.peso,hSeries:e.hSeries??null,hReps:e.hReps??null,hPeso:e.hPeso??null}))})) };
    DB.entrenamientos[d.boxeadorId] = DB.entrenamientos[d.boxeadorId] || [];
    if(d.entrenoId){
      const idx = DB.entrenamientos[d.boxeadorId].findIndex(t=>t.id===d.entrenoId);
      DB.entrenamientos[d.boxeadorId][idx] = {id:d.entrenoId, ...payload};
      toast('Entrenamiento actualizado', true);
    } else {
      DB.entrenamientos[d.boxeadorId].unshift({id:uid(), ...payload});
      toast('Entrenamiento asignado', true);
    }
    S.draft = null; S.view = 'boxeador'; S.boxTab = 'entrenamientos'; render(); return;
  }
});

document.addEventListener('click', e => {
  const b = e.target.closest('[data-a]'); if(!b) return;
  const a = b.dataset.a, v = b.dataset.v;
  if(a === 'goto-auth'){ S.screen='auth'; S.authMode=v||'login'; render(); }
  else if(a === 'auth-mode'){ S.authMode=v; render(); }
  else if(a === 'auth-role'){ S.authRole=v; render(); }
  else if(a === 'logout'){ S.session=null; S.screen='landing'; S.view='inicio'; S.boxId=null; render(); }
  else if(a === 'go'){ S.view=v; if(v==='inicio') S.boxId=null; render(); }
  else if(a === 'ver-boxeador'){ S.boxId=+b.dataset.b; S.boxTab='resumen'; S.view='boxeador'; render(); }
  else if(a === 'box-tab'){ S.boxTab=v; render(); }
  else if(a === 'marcar-cumplimiento'){
    const t = +b.dataset.t; const entreno = DB.entrenamientos[S.session.id].find(x=>x.id===t);
    document.querySelectorAll(`[data-ex]`).forEach(inp=>{
      const exId = +inp.dataset.ex, field = inp.dataset.f;
      for(const r of entreno.rutinas) for(const ex of r.ejercicios) if(ex.id===exId) ex[field] = inp.value===''?0:+inp.value;
    });
    toast('Rutina registrada', true); render();
  }
  else if(a === 'toggle-lesion'){
    const lId = +b.dataset.l; const l = DB.lesiones[S.session.id].find(x=>x.id===lId);
    const est = estadoLesion(l);
    l.cambios.push({estado: est==='ACTIVA'?'RECUPERADA':'ACTIVA', fecha: todayISO()});
    toast('Estado actualizado', true); render();
  }
  else if(a === 'resolver-sug'){
    DB.sugerencias.find(s=>s.id===+b.dataset.s).estado = v; toast('Sugerencia resuelta', true); render();
  }
  else if(a === 'nuevo-entreno'){
    S.draft = { boxeadorId:+b.dataset.b, entrenoId:null, tipo:'RUTINARIO', fechaInicio:todayISO(), fechaFin:'', fechaPelea:'', objetivoDescripcion:'', objetivoPeso:null, rutinas:[blankRutina()] };
    S.view='asignar'; render();
  }
  else if(a === 'editar-entreno'){
    const t = +b.dataset.t; const bx = S.boxId; const en = DB.entrenamientos[bx].find(x=>x.id===t);
    S.draft = { boxeadorId:bx, entrenoId:t, tipo:en.tipo, fechaInicio:en.fechaInicio, fechaFin:en.fechaFin, fechaPelea:en.fechaPelea||'',
      objetivoDescripcion:en.objetivo?.descripcion||'', objetivoPeso:en.objetivo?.pesoObjetivo||null,
      rutinas: en.rutinas.map(r=>({id:r.id,nombre:r.nombre,ejercicios:r.ejercicios.map(e=>({...e}))})) };
    S.view='editar'; render();
  }
  else if(a === 'add-rutina'){ syncDraftFromInputs(); S.draft.rutinas.push(blankRutina()); render(); }
  else if(a === 'del-rutina'){ syncDraftFromInputs(); S.draft.rutinas = S.draft.rutinas.filter(r=>r.id!==+b.dataset.r); render(); }
  else if(a === 'add-ejercicio'){ syncDraftFromInputs(); S.draft.rutinas.find(r=>r.id===+b.dataset.r).ejercicios.push(blankEjercicio()); render(); }
  else if(a === 'del-ejercicio'){ syncDraftFromInputs(); const r=S.draft.rutinas.find(r=>r.id===+b.dataset.r); r.ejercicios = r.ejercicios.filter(x=>x.id!==+b.dataset.e); render(); }
});

document.addEventListener('change', e => {
  const t = e.target;
  if(t.id === 'ef-tipo'){ syncDraftFromInputs(); S.draft.tipo = t.value; render(); }
  if(t.id === 'evoSel'){ S.boxId = +t.value; render(); }
  if(t.dataset.rutina && !t.dataset.ej){
    const r = S.draft.rutinas.find(r=>r.id===+t.dataset.rutina); r.nombre = t.value;
  }
  if(t.dataset.ej){
    const r = S.draft.rutinas.find(r=>r.id===+t.dataset.rutina); const ex = r.ejercicios.find(e=>e.id===+t.dataset.ej);
    ex[t.dataset.f] = t.dataset.f==='nombre' ? t.value : +t.value;
  }
});

render();

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwEFxV9NGQ17-pzimIFn2GhiyUHVhc3hlA3kwyYQ9f-KBJE43aKV8jixrxq_uAY6pBQ/exec';
const WA_NUMBER = '593995007148';

const state = {
  step: 1, service: '', subtype: '', bodaTipo: '', mode: 'foto', 
  comboType: 'standard', expressHrs: 1, customHrs: 4, bodaCombo: 'civil_solo',       
  price: 0, details: '', exactHrs: 3, currentInclusions: [],
  includeSaveTheDate: false
};

const RATES = {
  cumple: {
    foto: { 1: 70, 2: 60, base: 50 },
    fotovideo: { 1: 90, 2: 80, base: 70 }
  },
  quince: {
    foto: { 1: 80, 2: 70, base: 60 },
    fotovideo: { 1: 100, 2: 90, base: 80 }
  },
  boda: {
    civil_solo:       { hrs: 2, foto: 140, fotovideo: 180 },
    civil_recep:      { hrs: 4, foto: 240, fotovideo: 320 },
    civil_todo_recep: { hrs: 5, foto: 300, fotovideo: 400 },
    ecle_completa:    { hrs: 8, foto: 480, fotovideo: 640 }
  }
};

const INCLUSIONS = {
  cumple: {
    foto: ["<strong>Fotografía ilimitada profesional:</strong> Cobertura de cada segundo relevante.", "<strong>Entrega digital en alta definición:</strong> Revelado profesional.", "<strong>Flexibilidad y Cobertura Total:</strong> Registro de interacciones familiares."],
    fotovideo: ["<strong>Fotografía ilimitada profesional.</strong>", "<strong>Recap Cinematográfico Corto (Highlight).</strong>", "<strong>Video Resumen Extendido Documental.</strong>"]
  },
  quince: {
    foto: ["<strong>Fotografía ilimitada profesional:</strong> Cobertura del protocolo.", "<strong>Revelado y Corrección de Color Premium.</strong>", "<strong>Garantía de Momentos Espontáneos.</strong>"],
    fotovideo: ["<strong>Fotografía ilimitada profesional.</strong>", "<strong>Quinceanera Highlight Reel.</strong>", "<strong>Película Documental Extendida.</strong>"]
  },
  boda: {
    foto: ["<strong>Fotografía de Bodas Documental y Artística.</strong>", "<strong>Revelado de Autor Fine-Art.</strong>", "<strong>Galería Intacta de Recuerdos.</strong>"],
    fotovideo: ["<strong>Fotografía Documental Completa.</strong>", "<strong>Wedding Fine Highlight Film.</strong>", "<strong>Película Documental de Bodas.</strong>"]
  }
};

function goStep(n) {
  state.step = n;
  [1,2,3,4].forEach(i => {
    document.getElementById('step'+i).classList.toggle('hidden', i !== n);
    document.getElementById('pd'+i).className = 'prog-dot' + (i < n ? ' done' : i === n ? ' active' : '');
    document.getElementById('pl'+i).className = 'prog-label' + (i === n ? ' active' : '');
    if (i < n) document.getElementById('pd'+i).textContent = '✓';
    else document.getElementById('pd'+i).textContent = i;
  });
  if (n === 2 && state.service === 'social') regresarAEventos();
  if(n === 4) renderFinal();
}

function pickService(s) { state.service = s; state.subtype = ''; goStep(2); if (s === 'social') { document.getElementById('sub-social').classList.remove('hidden'); document.getElementById('sub-boda-tipo').classList.add('hidden'); document.getElementById('det-cumple').classList.add('hidden'); } else { document.getElementById('det-generic').classList.remove('hidden'); } }
function pickSubtype(t) { state.subtype = t; document.getElementById('sub-social').classList.add('hidden'); if (t === 'boda') { document.getElementById('sub-boda-tipo').classList.remove('hidden'); } else { document.getElementById('det-cumple').classList.remove('hidden'); updateCumpleUI(); } }
function pickBodaTipo(tipo) { state.bodaTipo = tipo; document.getElementById('sub-boda-tipo').classList.add('hidden'); document.getElementById('det-cumple').classList.remove('hidden'); state.bodaCombo = (tipo === 'civil') ? 'civil_solo' : 'ecle_completa'; updateCumpleUI(); }
function regresarAEventos() { document.getElementById('sub-social').classList.remove('hidden'); document.getElementById('sub-boda-tipo').classList.add('hidden'); document.getElementById('det-cumple').classList.add('hidden'); document.getElementById('det-generic').classList.add('hidden'); }

function setMode(m) { state.mode = m; document.getElementById('m-btn-foto').classList.toggle('on', m === 'foto'); document.getElementById('m-btn-fotovideo').classList.toggle('on', m === 'fotovideo'); updateCumpleUI(); }
function setCombo(type) { state.comboType = type; updateCumpleUI(); }
function setBodaCombo(bCombo) { state.bodaCombo = bCombo; updateCumpleUI(); }
function setExpressHours(h) { state.expressHrs = h; document.getElementById('exp-h1').classList.toggle('on', h === 1); document.getElementById('exp-h2').classList.toggle('on', h === 2); updateCumpleUI(); }
function updateRange(v) { state.customHrs = parseInt(v); document.getElementById('val-hrs').textContent = v + ' h'; updateCumpleUI(); }

function updateCumpleUI() {
  const listContainer = document.getElementById('inc-list');
  listContainer.innerHTML = '';
  const esBoda = (state.subtype === 'boda');
  const esBodaEcle = (esBoda && state.bodaTipo === 'ecle');
  
  const saveOption = document.getElementById('save-option-container');
  if(saveOption) saveOption.classList.toggle('hidden', !esBodaEcle);

  document.getElementById('combos-tiempo-estandar').classList.toggle('hidden', esBoda);
  document.getElementById('express-hours-selector').classList.add('hidden');
  document.getElementById('custom-slider').classList.add('hidden');
  document.getElementById('combos-boda-civil').classList.toggle('hidden', !esBoda || state.bodaTipo !== 'civil');
  document.getElementById('combos-boda-ecle').classList.toggle('hidden', !esBoda || state.bodaTipo !== 'ecle');

  let hrs = 3, totalCalculated = 0, ratePorHora = 0, esPrecioFijo = false;

  if (esBoda) {
    state.currentInclusions = INCLUSIONS.boda[state.mode];
    if (state.bodaTipo === 'civil') {
      const bSel = state.bodaCombo;
      hrs = RATES.boda[bSel].hrs;
      totalCalculated = RATES.boda[bSel][state.mode];
    } else {
      hrs = RATES.boda.ecle_completa.hrs;
      totalCalculated = RATES.boda.ecle_completa[state.mode];
    }
    esPrecioFijo = true;
  } else {
    state.currentInclusions = INCLUSIONS[state.subtype][state.mode];
    const eventRates = RATES[state.subtype];
    if (state.comboType === 'express') { document.getElementById('express-hours-selector').classList.remove('hidden'); hrs = state.expressHrs; ratePorHora = eventRates[state.mode][hrs]; }
    else if (state.comboType === 'custom') { document.getElementById('custom-slider').classList.remove('hidden'); hrs = state.customHrs; ratePorHora = eventRates[state.mode].base; }
    else { hrs = 3; ratePorHora = eventRates[state.mode].base; }
    totalCalculated = hrs * ratePorHora;
  }

  if (esBodaEcle && state.includeSaveTheDate) totalCalculated += 70;

  state.currentInclusions.forEach(text => { const li = document.createElement('li'); li.innerHTML = text; listContainer.appendChild(li); });

  state.exactHrs = hrs;
  state.price = totalCalculated;
  const nombreModalidad = state.mode === 'foto' ? 'Solo Fotografía' : 'Foto + Video';
  const filaPrecioHTML = esPrecioFijo ? `<div class="sum-row"><span>Esquema</span><span>Paquete Cerrado</span></div>` : `<div class="sum-row"><span>Precio/hora</span><span>$${ratePorHora}</span></div>`;
  const saveDateRow = (esBodaEcle && state.includeSaveTheDate) ? `<div class="sum-row"><span>Save the Date:</span><span>+$70</span></div>` : '';

  document.getElementById('cumple-sum').innerHTML = `
    <div class="sum-row"><span>Modalidad</span><strong>${nombreModalidad}</strong></div>
    ${filaPrecioHTML}
    <div class="sum-row"><span>Cobertura</span><span>${hrs} horas</span></div>
    ${saveDateRow}
    <div class="sum-row sum-total"><span>Total Presupuesto</span><span class="amount">$${totalCalculated}</span></div>
  `;
}

function openModal() { document.getElementById('portfolio-modal').classList.add('open'); }
function closeModalDirect() { document.getElementById('portfolio-modal').classList.remove('open'); }
function closeModal(e) { if(e.target.id === 'portfolio-modal') closeModalDirect(); }

function renderFinal() {
  const f_fecha = document.getElementById('inp-fecha').value || 'Por definir';
  document.getElementById('final-summary').innerHTML = `<div class="sum-row"><span>Servicio</span><span>${state.details}</span></div><div class="sum-row"><span>Fecha</span><strong>${f_fecha}</strong></div><div class="sum-row sum-total"><span>Inversión</span><span class="amount">$${state.price}</span></div>`;
  guardarDatos();
}

function guardarDatos() {
  const payload = { nombre: document.getElementById('inp-nombre').value, evento: document.getElementById('inp-evento').value, fecha: document.getElementById('inp-fecha').value, total: state.price, detalle: state.details };
  fetch(GOOGLE_SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(payload) });
}

function sendWA(actionType) {
  const msg = actionType === 'agenda' ? `¡Hola LemonFilmz! Soy ${document.getElementById('inp-nombre').value}. Deseo agendar: ${state.details}. Total: $${state.price}.` : '...';
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`);
}

function copiarCotizacion() {
  const saveDateText = (state.includeSaveTheDate) ? '\n• Save the Date: Sí (+$70)' : '';
  const textoCopiar = `COTIZACIÓN LEMONFILMZ\nServicio: ${state.details}${saveDateText}\nTotal: $${state.price}`;
  navigator.clipboard.writeText(textoCopiar).then(() => alert('¡Copiado!'));
}

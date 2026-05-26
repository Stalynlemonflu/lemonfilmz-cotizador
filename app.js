const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwEFxV9NGQ17-pzimIFn2GhiyUHVhc3hlA3kwyYQ9f-KBJE43aKV8jixrxq_uAY6pBQ/exec';
const WA_NUMBER = '593995007148';

const state = {
  step: 1, service: '', subtype: '', bodaTipo: '', mode: 'foto',
  customHrs: 3, includeSaveTheDate: false,
  price: 0, details: '', exactHrs: 3, currentInclusions: []
};

// --- TABLA DE TARIFAS (Basada en tus datos) ---
const RATES = {
  cumple: { foto: 50, fotovideo: 70 },
  quinceañera: { foto: 60, fotovideo: 80 },
  boda_civil: { foto: 60, fotovideo: 80 },
  boda_ecle: { foto: 70, fotovideo: 90 },
  paquetes: {
    '3h': { foto: 210, fotovideo: 210 },
    '5h': { foto: 350, fotovideo: 400 },
    '8h': { foto: 400, fotovideo: 640 }
  }
};

const INCLUSIONS = {
  cumple: {
    foto: ["Fotografía ilimitada profesional", "Revelado minucioso", "Cobertura de momentos espontáneos"],
    fotovideo: ["Fotografía ilimitada", "Recap Cinematográfico", "Video Documental"]
  },
  quinceañera: {
    foto: ["Cobertura completa protocolo", "Revelado Premium", "Fotos espontáneas"],
    fotovideo: ["Cobertura total", "Highlight Reel", "Película Documental"]
  },
  boda: {
    foto: ["Fotografía Artística", "Revelado Fine-Art", "Registro detalles"],
    fotovideo: ["Fotografía Documental", "Wedding Highlight Film", "Película Documental"]
  }
};

function goStep(n) {
  state.step = n;
  [1,2,3,4].forEach(i => {
    document.getElementById('step'+i).classList.toggle('hidden', i !== n);
    document.getElementById('pd'+i).className = 'prog-dot' + (i < n ? ' done' : i === n ? ' active' : '');
    document.getElementById('pl'+i).className = 'prog-label' + (i === n ? ' active' : '');
  });
  if(n === 4) renderFinal();
}

function pickService(s) {
  state.service = s;
  goStep(2);
  document.getElementById('sub-social').classList.toggle('hidden', s !== 'social');
}

function pickSubtype(t) {
  state.subtype = t;
  document.getElementById('sub-social').classList.add('hidden');
  if (t === 'boda') {
    document.getElementById('sub-boda-tipo').classList.remove('hidden');
  } else {
    document.getElementById('det-cumple').classList.remove('hidden');
    updateCumpleUI();
  }
}

function pickBodaTipo(tipo) {
  state.bodaTipo = tipo;
  document.getElementById('sub-boda-tipo').classList.add('hidden');
  document.getElementById('det-cumple').classList.remove('hidden');
  updateCumpleUI();
}

function setMode(m) {
  state.mode = m;
  updateCumpleUI();
}

function updateRange(v) {
  state.customHrs = parseInt(v);
  document.getElementById('val-hrs').textContent = v + ' h';
  updateCumpleUI();
}

function updateCumpleUI() {
  let tipo = state.subtype;
  if (state.subtype === 'boda') tipo = (state.bodaTipo === 'civil') ? 'boda_civil' : 'boda_ecle';
  
  // Cálculo
  let base = RATES[tipo][state.mode];
  let total = base * state.customHrs;
  
  // Lógica Save the Date
  let extra = 0;
  if (tipo === 'boda_ecle' && state.includeSaveTheDate) {
    extra = RATES.boda_ecle.foto;
    total += extra;
  }
  
  state.price = total;
  state.exactHrs = state.customHrs;
  
  const saveDiv = document.getElementById('save-option');
  if(saveDiv) saveDiv.classList.toggle('hidden', tipo !== 'boda_ecle');

  document.getElementById('cumple-sum').innerHTML = `
    <div class="sum-row"><span>Modalidad:</span><strong>${state.mode.toUpperCase()}</strong></div>
    <div class="sum-row"><span>Cobertura:</span><strong>${state.customHrs} Horas</strong></div>
    ${state.includeSaveTheDate ? `<div class="sum-row"><span>Save the Date:</span><strong>+$${extra}</strong></div>` : ''}
    <div class="sum-row sum-total"><span>Total:</span><span class="amount">$${total}</span></div>
  `;
}

function renderFinal() {
  document.getElementById('final-summary').innerHTML = `
    <div class="sum-row"><span>Servicio</span><span>${state.subtype} ${state.mode}</span></div>
    <div class="sum-row sum-total"><span>Inversión Final:</span><span class="amount">$${state.price}</span></div>
  `;
  guardarDatos();
}

function guardarDatos() {
  const payload = {
    nombre: document.getElementById('inp-nombre').value,
    total: state.price
  };
  fetch(GOOGLE_SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(payload) });
}

function sendWA(actionType) {
  const msg = `¡Hola! Quiero contratar el servicio de LemonFilmz por $${state.price}.`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`);
}

function copiarCotizacion() {
  const texto = `Cotización LemonFilmz: $${state.price}`;
  navigator.clipboard.writeText(texto);
  alert("Copiado!");
}

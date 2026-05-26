const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwEFxV9NGQ17-pzimIFn2GhiyUHVhc3hlA3kwyYQ9f-KBJE43aKV8jixrxq_uAY6pBQ/exec';
const WA_NUMBER = '593995007148';

const state = {
  step: 1, service: '', subtype: '', bodaTipo: '', mode: 'foto', 
  comboType: 'standard', expressHrs: 1, customHrs: 4, bodaCombo: 'civil_solo',     
  price: 0, details: '', exactHrs: 3, currentInclusions: []
};

// Matriz de Tarifas Exactas para cálculo por hora o paquete cerrado
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

// Textos Publicitarios de Inclusión (Conservados idénticos)
const INCLUSIONS = {
  cumple: {
    foto: [
      "<strong>Fotografía ilimitada profesional:</strong> Cobertura de cada segundo relevante. Se registran momentos espontáneos, poses creativas con invitados, protocolo, abrazos y emociones auténticas.",
      "<strong>Entrega digital en alta definición:</strong> Revelado minucioso de todo el material con corrección de color y estilo profesional de autor.",
      "<strong>Flexibilidad y Cobertura Total:</strong> El lente estará listo para capturar las interacciones y dinámicas familiares al ritmo que dicte tu evento."
    ],
    fotovideo: [
      "<strong>Fotografía ilimitada profesional:</strong> Cobertura de cada segundo relevante con revelado digital de alta resolución.",
      "<strong>Recap Cinematográfico Corto (Highlight):</strong> Video dinámico, estético y de alto impacto, editado en formato ideal para compartir en redes sociales (Reels/TikTok).",
      "<strong>Video Resumen Extendido Documental:</strong> Cobertura audiovisual cronológica de larga duración que registra discursos, sorpresas y momentos clave sin perderse de nada."
    ]
  },
  quince: {
    foto: [
      "<strong>Fotografía ilimitada profesional:</strong> Cobertura completa del protocolo (entrada, vals, cambio de zapatilla, brindis) capturando la esencia y elegancia de la quinceañera junto a su corte de honor e invitados.",
      "<strong>Revelado y Corrección de Color Premium:</strong> Todo el material pasa por un revelado digital minucioso para resaltar tonos de piel, texturas del vestido y la iluminación del evento.",
      "<strong>Garantía de Momentos Espontáneos:</strong> Además de las fotos formales y de mesas, registramos las risas, el baile y la energía de la fiesta de inicio a fin."
    ],
    fotovideo: [
      "<strong>Fotografía ilimitada profesional:</strong> Cobertura total del protocolo y momentos clave con revelado digital en alta definición.",
      "<strong>Quinceanera Highlight Reel:</strong> Un video resumen dinámico, moderno y cinematográfico con transiciones de alto impacto, perfecto para compartir en tus redes sociales.",
      "<strong>Película Documental Extendida:</strong> Registro completo y cronológico en alta definición que preserva intactos los discursos, sorpresas, el vals familiar y toda la diversión de la pista de baile."
    ]
  },
  boda: {
    foto: [
      "<strong>Fotografía de Bodas Documental y Artística:</strong> Cobertura de miradas, emociones reales y la complicidad de la pareja. Cero poses acartonadas, priorizamos la narrativa orgánica de su amor.",
      "<strong>Revelado de Autor Fine-Art:</strong> Tratamiento de color atemporal de nivel cinematográfico, optimizando la iluminación, el blanco del vestido y la elegancia de los trajes.",
      "<strong>Galería Intacta de Recuerdos:</strong> Registro detallado de firmas, anillos, lágrimas de los padres, abrazos de los amigos y la fiesta."
    ],
    fotovideo: [
      "<strong>Fotografía Documental Completa:</strong> Captura fotográfica ilimitada revelada en alta resolución.",
      "<strong>Wedding Fine Highlight Film:</strong> Película corta de autor sumamente emotiva y artística, musicalizada con diseño sonoro fino, perfecta para revivir en redes y pantallas.",
      "<strong>Película Documental de Bodas:</strong> Edición extendida cronológica que guarda de principio a fin los votos completos, las lecturas, el brindis de los padrinos y la locura del baile."
    ]
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
  
  if (n === 2 && state.service === 'social') {
    regresarAEventos();
  }
  
  if(n === 4) renderFinal();
}

function pickService(s) {
  state.service = s;
  state.subtype = ''; 
  goStep(2);
  
  if (s === 'social') {
    document.getElementById('sub-social').classList.remove('hidden');
    document.getElementById('sub-boda-tipo').classList.add('hidden');
    document.getElementById('det-cumple').classList.add('hidden');
    document.getElementById('det-generic').classList.add('hidden');
  } else {
    document.getElementById('sub-social').classList.add('hidden');
    document.getElementById('det-generic').classList.remove('hidden');
  }
}

function pickSubtype(t) {
  state.subtype = t;
  document.getElementById('sub-social').classList.add('hidden');
  
  if (t === 'boda') {
    document.getElementById('sub-boda-tipo').classList.remove('hidden');
  } else if (t === 'cumple' || t === 'quince') {
    document.getElementById('det-cumple').classList.remove('hidden');
    updateCumpleUI();
  } else {
    document.getElementById('det-generic').classList.remove('hidden');
  }
}

function pickBodaTipo(tipo) {
  state.bodaTipo = tipo;
  document.getElementById('sub-boda-tipo').classList.add('hidden');
  document.getElementById('det-cumple').classList.remove('hidden');
  state.bodaCombo = (tipo === 'civil') ? 'civil_solo' : 'ecle_completa';
  updateCumpleUI();
}

function regresarAEventos() {
  document.getElementById('sub-social').classList.remove('hidden');
  document.getElementById('sub-boda-tipo').classList.add('hidden');
  document.getElementById('det-cumple').classList.add('hidden');
  document.getElementById('det-generic').classList.add('hidden');
}

function setMode(m) {
  state.mode = m;
  document.getElementById('m-btn-foto').classList.toggle('on', m === 'foto');
  document.getElementById('m-btn-fotovideo').classList.toggle('on', m === 'fotovideo');
  updateCumpleUI();
}

function setCombo(type) {
  state.comboType = type;
  updateCumpleUI();
}

function setBodaCombo(bCombo) {
  state.bodaCombo = bCombo;
  updateCumpleUI();
}

function setExpressHours(h) {
  state.expressHrs = h;
  document.getElementById('exp-h1').classList.toggle('on', h === 1);
  document.getElementById('exp-h2').classList.toggle('on', h === 2);
  updateCumpleUI();
}

function updateRange(v) {
  state.customHrs = parseInt(v);
  document.getElementById('val-hrs').textContent = v + ' h';
  updateCumpleUI();
}

function updateCumpleUI() {
  const listContainer = document.getElementById('inc-list');
  listContainer.innerHTML = '';
  
  const esBoda = (state.subtype === 'boda');
  
  // Ocultar selectores especiales por defecto
  document.getElementById('combos-tiempo-estandar').classList.toggle('hidden', esBoda);
  document.getElementById('express-hours-selector').classList.add('hidden');
  document.getElementById('custom-slider').classList.add('hidden');
  
  document.getElementById('combos-boda-civil').classList.toggle('hidden', !esBoda || state.bodaTipo !== 'civil');
  document.getElementById('combos-boda-ecle').classList.toggle('hidden', !esBoda || state.bodaTipo !== 'ecle');

  let hrs = 3;
  let totalCalculated = 0;
  let ratePorHora = 0;
  let esPrecioFijo = false;

  if (esBoda) {
    state.currentInclusions = INCLUSIONS.boda[state.mode];
    if (state.bodaTipo === 'civil') {
      const bSel = state.bodaCombo;
      document.getElementById('boda-c1').classList.toggle('selected', bSel === 'civil_solo');
      document.getElementById('boda-c2').classList.toggle('selected', bSel === 'civil_recep');
      document.getElementById('boda-c3').classList.toggle('selected', bSel === 'civil_todo_recep');
      
      hrs = RATES.boda[bSel].hrs;
      totalCalculated = RATES.boda[bSel][state.mode];
    } else {
      hrs = RATES.boda.ecle_completa.hrs;
      totalCalculated = RATES.boda.ecle_completa[state.mode];
    }
    esPrecioFijo = true;
    document.getElementById('cobertura-heading').textContent = "2. Configuración de Cobertura de Boda";
  } else {
    document.getElementById('cobertura-heading').textContent = "2. Elige tu Combo de Cobertura";
    state.currentInclusions = INCLUSIONS[state.subtype][state.mode];
    const eventRates = RATES[state.subtype];
    
    if (state.comboType === 'express') {
      document.getElementById('express-hours-selector').classList.remove('hidden');
      hrs = state.expressHrs;
      ratePorHora = eventRates[state.mode][hrs];
    } else if (state.comboType === 'custom') {
      document.getElementById('custom-slider').classList.remove('hidden');
      hrs = state.customHrs;
      ratePorHora = eventRates[state.mode].base;
    } else {
      hrs = 3;
      ratePorHora = eventRates[state.mode].base;
    }
    
    totalCalculated = hrs * ratePorHora;

    document.getElementById('combo-express').classList.toggle('selected', state.comboType === 'express');
    document.getElementById('combo-3').classList.toggle('selected', state.comboType === 'standard');
    document.getElementById('combo-custom').classList.toggle('selected', state.comboType === 'custom');
    
    document.getElementById('p-combo1').textContent = `$${eventRates[state.mode][state.expressHrs]} / hora`;
    document.getElementById('p-combo3').textContent = `$${eventRates[state.mode].base} / hora`;
    document.getElementById('p-combo-custom').textContent = `$${eventRates[state.mode].base} / hora`;
  }

  state.currentInclusions.forEach(text => {
    const li = document.createElement('li');
    li.innerHTML = text;
    listContainer.appendChild(li);
  });

  state.exactHrs = hrs;
  state.price = totalCalculated;
  
  let nombreResumenEvento = state.subtype === 'cumple' ? 'Cumpleaños' : 'Quinceañera';
  if (esBoda) nombreResumenEvento = state.bodaTipo === 'civil' ? 'Boda Civil' : 'Boda Eclesiástica';
  
  const nombreModalidad = state.mode === 'foto' ? 'Solo Fotografía' : 'Foto + Video';
  state.details = `${nombreResumenEvento}: ${nombreModalidad} x ${hrs} horas.`;

  const discountArea = document.getElementById('discount-area');
  if (!esBoda) {
    const precioBaseUnaHora = RATES[state.subtype][state.mode][1]; 
    const costoSiFueranHorasSueltas = hrs * precioBaseUnaHora;
    const ahorroTotal = costoSiFueranHorasSueltas - totalCalculated;

    if (ahorroTotal > 0) {
      discountArea.innerHTML = `
        <div class="discount-badge">
          🏷️ ¡Excelente elección! Estás ahorrando <strong>$${ahorroTotal} USD</strong> con esta tarifa especial por volumen.
        </div>
      `;
    } else {
      discountArea.innerHTML = '';
    }
  } else {
    discountArea.innerHTML = '';
  }

  const filaPrecioHTML = esPrecioFijo 
    ? `<div class="sum-row"><span>Esquema de precios</span><span>Tarifa de Paquete Cerrado</span></div>`
    : `<div class="sum-row"><span>Precio especial por hora</span><span>$${ratePorHora} / h</span></div>`;

  document.getElementById('cumple-sum').innerHTML = `
    <div class="sum-row"><span>Modalidad elegida</span><strong>${nombreModalidad}</strong></div>
    ${filaPrecioHTML}
    <div class="sum-row"><span>Tiempo de cobertura</span><span>${hrs} ${hrs === 1 ? 'hora' : 'horas'}</span></div>
    <div class="sum-row sum-total"><span>Total Presupuesto</span><span class="amount">$${totalCalculated}</span></div>
  `;
}

function openModal() { document.getElementById('portfolio-modal').classList.add('open'); }
function closeModalDirect() { document.getElementById('portfolio-modal').classList.remove('open'); }
function closeModal(e) { if(e.target.id === 'portfolio-modal') closeModalDirect(); }

function renderFinal() {
  const f_fecha = document.getElementById('inp-fecha').value || 'Por definir';
  document.getElementById('final-summary').innerHTML = `
    <div class="sum-row"><span>Servicio</span><span>${state.details}</span></div>
    <div class="sum-row"><span>Fecha seleccionada</span><strong>${f_fecha}</strong></div>
    <div class="sum-row sum-total"><span>Inversión</span><span class="amount">$${state.price}</span></div>
  `;
  guardarDatos();
}

function guardarDatos() {
  let userTel = document.getElementById('inp-tel').value.replace(/\s+/g, '');
  if(userTel.startsWith('0')) userTel = userTel.substring(1);

  const payload = {
    nombre: document.getElementById('inp-nombre').value,
    evento: document.getElementById('inp-evento').value,
    fecha: document.getElementById('inp-fecha').value,
    email: document.getElementById('inp-email').value,
    telefono: '+593' + userTel,
    detalle: state.details,
    nota: document.getElementById('inp-nota').value,
    total: state.price
  };
  fetch(GOOGLE_SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(payload) });
}

function sendWA(actionType) {
  const name = document.getElementById('inp-nombre').value;
  const eventName = document.getElementById('inp-evento').value;
  const eventDate = document.getElementById('inp-fecha').value;
  const eventLocation = document.getElementById('inp-nota').value;

  let msg = '';

  if (actionType === 'agenda') {
    msg = `¡Hola LemonFilmz! Soy ${name}.\n\nAcabo de realizar una cotización para un evento y me gustaría agendar:\n📌 *Evento:* ${eventName}\n📅 *Fecha:* ${eventDate}\n⏱️ *Servicio:* ${state.details}\n📍 *Ubicación/Notas:* ${eventLocation}\n\n💰 *Total Estimado:* $${state.price} USD.\n\n¿Me confirman disponibilidad por favor?`;
  } else if (actionType === 'portfolio') {
    msg = `¡Hola LemonFilmz! Soy ${name}. Acabo de terminar de cotizar mi evento (${eventName} para el día ${eventDate}) a través de su web. Me interesó mucho su propuesta, ¿podrían compartirme el enlace a su portafolio completo para ver más de su trabajo?`;
  }
  
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`);
}

function copiarCotizacion() {
  const name = document.getElementById('inp-nombre').value || 'Cliente';
  const eventName = document.getElementById('inp-evento').value || 'Por definir';
  const eventDate = document.getElementById('inp-fecha').value || 'Por definir';
  const eventLocation = document.getElementById('inp-nota').value || 'Guayaquil (Ecuador)';
  
  const descripcionesPlanas = state.currentInclusions.map(text => {
    return "✨ " + text.replace(/<\/?strong>/g, '');
  }).join("\n");

  const textoCopiar = `📄 COTIZACIÓN DE SERVICIO AUDIOVISUAL — LEMONFILMZ
--------------------------------------------------
👤 Cliente: ${name}
📌 Evento: ${eventName}
📅 Fecha: ${eventDate}
📍 Ubicación/Notas: ${eventLocation}

⚙️ DETALLE DEL SERVICIO:
• Cobertura: ${state.details}
• Tiempo exacto: ${state.exactHrs} ${state.exactHrs === 1 ? 'hora' : 'horas'}

📦 INCLUSIONES DETALLADAS:
${descripcionesPlanas}

--------------------------------------------------
💰 INVERSIÓN TOTAL: $${state.price}.00 USD
--------------------------------------------------
* Las tarifas aplican dentro de Guayaquil. Sujeto a cambios fuera de la ciudad.`;

  navigator.clipboard.writeText(textoCopiar).then(() => {
    const btn = document.getElementById('btn-copiar');
    const originalText = btn.innerHTML;
    btn.innerHTML = '✅ ¡Copiado al Portapapeles!';
    btn.style.background = '#2a6b4a';
    
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
    }, 2000);
  }).catch(err => {
    console.error('Error al copiar el texto: ', err);
    alert('No se pudo copiar automáticamente. Por favor, selecciona el texto manualmente.');
  });
}

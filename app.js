function updateCumpleUI() {
  const listContainer = document.getElementById('inc-list');
  listContainer.innerHTML = '';
  
  const esBoda = (state.subtype === 'boda');
  const esBodaEcle = (esBoda && state.bodaTipo === 'ecle');
  
  // Mostrar/Ocultar "Save the Date"
  const saveOption = document.getElementById('save-option-container');
  if(saveOption) saveOption.classList.toggle('hidden', !esBodaEcle);

  // Lógica de visibilidad de elementos
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
  }

  // Integración del extra
  if (esBodaEcle && state.includeSaveTheDate) totalCalculated += 70;

  state.currentInclusions.forEach(text => {
    const li = document.createElement('li');
    li.innerHTML = text;
    listContainer.appendChild(li);
  });

  state.exactHrs = hrs;
  state.price = totalCalculated;

  // Restaurar el mensaje de ahorro
  const discountArea = document.getElementById('discount-area');
  if (!esBoda && state.comboType !== 'express') {
    const precioBaseUnaHora = RATES[state.subtype][state.mode][1]; 
    const costoSiFueranHorasSueltas = hrs * precioBaseUnaHora;
    const ahorroTotal = costoSiFueranHorasSueltas - totalCalculated;
    if (ahorroTotal > 0) {
      discountArea.innerHTML = `<div class="discount-badge">🏷️ ¡Excelente elección! Estás ahorrando <strong>$${ahorroTotal} USD</strong> con esta tarifa especial.</div>`;
    } else { discountArea.innerHTML = ''; }
  } else { discountArea.innerHTML = ''; }

  const nombreModalidad = state.mode === 'foto' ? 'Solo Fotografía' : 'Foto + Video';
  const filaPrecioHTML = esPrecioFijo ? `<div class="sum-row"><span>Esquema de precios</span><span>Tarifa de Paquete Cerrado</span></div>` : `<div class="sum-row"><span>Precio especial por hora</span><span>$${ratePorHora} / h</span></div>`;
  const saveDateRow = (esBodaEcle && state.includeSaveTheDate) ? `<div class="sum-row"><span>Save the Date:</span><span>+$70</span></div>` : '';

  document.getElementById('cumple-sum').innerHTML = `
    <div class="sum-row"><span>Modalidad elegida</span><strong>${nombreModalidad}</strong></div>
    ${filaPrecioHTML}
    <div class="sum-row"><span>Tiempo de cobertura</span><span>${hrs} ${hrs === 1 ? 'hora' : 'horas'}</span></div>
    ${saveDateRow}
    <div class="sum-row sum-total"><span>Total Presupuesto</span><span class="amount">$${totalCalculated}</span></div>
  `;
}

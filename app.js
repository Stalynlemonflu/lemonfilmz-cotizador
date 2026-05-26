const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwEFxV9NGQ17-pzimIFn2GhiyUHVhc3hlA3kwyYQ9f-KBJE43aKV8jixrxq_uAY6pBQ/exec';
const WA_NUMBER = '593995007148';

const state = {
  step: 1, service: '', subtype: '', bodaTipo: '', mode: 'foto', 
  comboType: 'standard', expressHrs: 1, customHrs: 4, bodaCombo: 'civil_solo',       
  price: 0, details: '', exactHrs: 3, currentInclusions: [],
  includeSaveTheDate: false // <--- NUEVO
};

// ... (MANTÉN TU OBJETO RATES Y INCLUSIONS IGUALES QUE ANTES) ...
// (Omite copiar esta parte aquí por brevedad, pero asegúrate de mantener tus datos originales)

// MODIFICA ESTA FUNCIÓN EN TU ARCHIVO
function updateCumpleUI() {
  const listContainer = document.getElementById('inc-list');
  listContainer.innerHTML = '';
  
  const esBoda = (state.subtype === 'boda');
  const esBodaEcle = (esBoda && state.bodaTipo === 'ecle');
  
  // Mostrar/Ocultar "Save the Date"
  const saveOption = document.getElementById('save-option-container');
  if(saveOption) saveOption.classList.toggle('hidden', !esBodaEcle);

  // ... (TODA TU LÓGICA DE HRS Y TOTALES IGUAL) ...
  // Cuando llegues al cálculo del total:
  let totalCalculated = ... // (tu lógica de cálculo)
  
  if (esBodaEcle && state.includeSaveTheDate) {
    totalCalculated += 70;
  }

  // ... (TUS VALIDACIONES DE DESCUENTO IGUAL) ...

  // EN EL RESUMEN (cumple-sum):
  const saveDateRow = (esBodaEcle && state.includeSaveTheDate) 
    ? `<div class="sum-row"><span>Save the Date:</span><span>$70</span></div>` 
    : '';

  document.getElementById('cumple-sum').innerHTML = `
    <div class="sum-row"><span>Modalidad elegida</span><strong>${nombreModalidad}</strong></div>
    ${filaPrecioHTML}
    <div class="sum-row"><span>Tiempo de cobertura</span><span>${hrs} horas</span></div>
    ${saveDateRow}
    <div class="sum-row sum-total"><span>Total Presupuesto</span><span class="amount">$${totalCalculated}</span></div>
  `;
  state.price = totalCalculated;
}

// Y en copiarCotizacion(), añade al texto:
// ${state.includeSaveTheDate ? '• Save the Date: Sí (+$70)' : ''}

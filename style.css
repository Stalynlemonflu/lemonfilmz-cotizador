*, *::before, *::after { 
  box-sizing: border-box; 
  margin: 0; 
  padding: 0; 
}

:root {
  --black: #0f0f0e;
  --ink: #1e1e1c;
  --muted: #6b6b66;
  --faint: #a8a8a2;
  --line: #e4e4de;
  --surface: #f7f7f4;
  --white: #ffffff;
  --accent: #2a6b4a;
  --accent-light: #e8f3ec;
  --wa: #25d366;
  --radius: 12px;
  --radius-lg: 20px;
  --sale-green: #155724;
  --sale-bg: #d4edda;
}

html { 
  font-size: 16px; 
}

body {
  font-family: 'Instrument Sans', sans-serif;
  background: var(--surface);
  color: var(--ink);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem 4rem;
}

.page-header {
  text-align: center;
  margin-bottom: 2.5rem;
  animation: fadeUp .5s ease both;
}

.logo {
  font-family: 'Fraunces', serif;
  font-size: 2.2rem;
  font-weight: 300;
  letter-spacing: -0.01em;
  color: var(--black);
}

.logo em { 
  font-style: italic; 
  color: var(--accent); 
}

.logo-sub {
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--faint);
  margin-top: 4px;
}

.card {
  background: var(--white);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 2rem;
  width: 100%;
  max-width: 620px;
  animation: fadeUp .4s ease both;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.progress {
  display: flex;
  align-items: center;
  gap: 0;
  margin-bottom: 2rem;
}

.prog-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 6px;
}

.prog-dot {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1.5px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
  color: var(--faint);
  background: var(--white);
  transition: all .25s;
  position: relative;
  z-index: 1;
}

.prog-dot.active { border-color: var(--accent); color: var(--accent); }
.prog-dot.done { background: var(--accent); border-color: var(--accent); color: #fff; }

.prog-label {
  font-size: 10px;
  color: var(--faint);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-align: center;
}

.prog-label.active { 
  color: var(--accent); 
}

.prog-line {
  flex: 1;
  height: 1px;
  background: var(--line);
  margin-bottom: 22px;
  margin-left: -2px;
  margin-right: -2px;
}

.section-heading {
  font-family: 'Fraunces', serif;
  font-size: 1.3rem;
  font-weight: 300;
  color: var(--black);
  margin-bottom: 1.25rem;
  line-height: 1.3;
}

.grid-2 { 
  display: grid; 
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); 
  gap: 10px; 
}

.opt {
  border: 1.5px solid var(--line);
  border-radius: var(--radius);
  padding: 1rem;
  cursor: pointer;
  transition: border-color .15s, background .15s;
  text-align: left;
  position: relative;
}

.opt:hover { border-color: #aaa; background: var(--surface); }
.opt.selected { border-color: var(--accent); background: var(--accent-light); }

.badge-rec {
  position: absolute;
  top: -10px;
  right: 10px;
  background: var(--accent);
  color: #fff;
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 100px;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.opt-name { font-size: 0.875rem; font-weight: 500; color: var(--black); margin-bottom: 3px; }
.opt-desc { font-size: 0.75rem; color: var(--muted); line-height: 1.4; }
.opt-price { font-size: 0.85rem; color: var(--accent); font-weight: 600; margin-top: 6px; }

.field-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid var(--line);
}

.mode-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-bottom: 1rem;
}

.mode-btn {
  border: 1.5px solid var(--line);
  border-radius: var(--radius);
  padding: 12px 16px;
  cursor: pointer;
  background: var(--white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all .15s;
}
.mode-btn:hover { border-color: #aaa; }
.mode-btn.on { border-color: var(--accent); background: var(--accent-light); }
.mode-btn-title { font-size: 0.9rem; font-weight: 500; color: var(--black); }
.mode-btn-sub { font-size: 0.75rem; color: var(--muted); margin-top: 2px; }

.mode-indicator { 
  width: 16px; 
  height: 16px; 
  border-radius: 50%; 
  border: 1.5px solid var(--line); 
  background: #fff; 
  display:flex; 
  align-items:center; 
  justify-content:center; 
}
.mode-btn.on .mode-indicator { border-color: var(--accent); background: var(--accent); }
.mode-btn.on .mode-indicator::after { content:''; width: 6px; height: 6px; background:#fff; border-radius:50%; }

.inclusion-box {
  background: #fafafa;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 14px 16px;
  margin-bottom: 1.5rem;
  animation: fadeIn 0.3s ease both;
}
.inclusion-title { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--muted); margin-bottom: 8px; font-weight: 600; }
.inclusion-list { list-style: none; }
.inclusion-list li { font-size: 0.85rem; color: var(--ink); line-height: 1.5; margin-bottom: 6px; display: flex; align-items: flex-start; gap: 8px; }
.inclusion-list li::before { content: "✨"; font-size: 0.85rem; }

.portfolio-inline-btn {
  display: inline-block;
  font-size: 0.8rem;
  color: var(--accent);
  background: var(--accent-light);
  padding: 5px 12px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  margin-top: 8px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.2s;
}
.portfolio-inline-btn:hover { border-color: var(--accent); }

.portfolio-hint-text {
  font-size: 0.75rem;
  color: var(--muted);
  margin-top: 6px;
  line-height: 1.3;
}

/* MODAL DEL PORTAFOLIO INTERNO */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0; pointer-events: none;
  transition: opacity 0.3s ease;
}
.modal-overlay.open { opacity: 1; pointer-events: auto; }

.modal-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  padding: 20px;
  position: relative;
  transform: scale(0.9);
  transition: transform 0.3s ease;
}
.modal-overlay.open .modal-card { transform: scale(1); }

.modal-close { 
  position: absolute; 
  top: 15px; right: 15px; 
  background: var(--surface); 
  border: none; 
  width: 30px; height: 30px; 
  border-radius: 50%; 
  cursor: pointer; 
  font-weight: bold; 
}

.modal-gallery { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 15px; }
.modal-gallery img { width: 100%; height: 140px; object-fit: cover; border-radius: 8px; background: var(--surface); }

@keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }

.chips { display: flex; gap: 6px; flex-wrap: wrap; }
.chip { border: 1px solid var(--line); border-radius: 100px; padding: 5px 14px; font-size: 0.75rem; cursor: pointer; color: var(--muted); transition: all .15s; }
.chip.on { border-color: var(--accent); background: var(--accent-light); color: var(--accent); }

.slider-wrap { display: flex; align-items: center; gap: 10px; flex: 1; }
input[type=range] { flex: 1; height: 4px; -webkit-appearance: none; background: var(--line); border-radius: 2px; }
input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: var(--accent); cursor: pointer; border: 2px solid #fff; }
.slider-val { font-size: 0.875rem; font-weight: 500; color: var(--accent); min-width: 28px; text-align: right; }

.summary-box { background: var(--surface); border-radius: var(--radius); padding: 1rem 1.25rem; margin-top: 1.25rem; border: 1px solid var(--line); }
.sum-row { display: flex; justify-content: space-between; align-items: baseline; font-size: 0.8rem; color: var(--muted); padding: 6px 0; border-bottom: 1px solid var(--line); }
.discount-badge { background: var(--sale-bg); color: var(--sale-green); font-size: 0.8rem; font-weight: 600; padding: 8px 12px; border-radius: 8px; margin-bottom: 10px; display: flex; align-items: center; gap: 6px; }
.sum-total { font-size: 1rem; font-weight: 500; color: var(--black); padding-top: 10px; }
.sum-total .amount { font-family: 'Fraunces', serif; font-size: 1.4rem; color: var(--accent); }

.input-label-text { font-size: 0.8rem; font-weight: 500; color: var(--muted); margin-bottom: 4px; display: block; }
input[type=text], input[type=email], input[type=date], textarea { width: 100%; padding: 10px 14px; border: 1.5px solid var(--line); border-radius: var(--radius); font-family: 'Instrument Sans', sans-serif; font-size: 0.875rem; margin-bottom: 14px; outline: none; background: var(--white); }

.tel-container { display: flex; align-items: center; border: 1.5px solid var(--line); border-radius: var(--radius); background: var(--white); margin-bottom: 14px; overflow: hidden; }
.tel-prefix { background: var(--surface); padding: 10px 14px; font-size: 0.875rem; font-weight: 500; color: var(--ink); border-right: 1px solid var(--line); }
.tel-container input { border: none; margin-bottom: 0; padding: 10px 14px; width: 100%; outline: none; font-family: 'Instrument Sans', sans-serif; font-size: 0.875rem; }

.geo-notice { font-size: 0.78rem; color: var(--muted); line-height: 1.4; margin: 1rem 0 0.5rem; padding: 10px 12px; background: #fffcee; border: 1px solid #fbe6a2; border-radius: 8px; display: flex; gap: 6px; }

.btn { width: 100%; padding: 13px; border: none; border-radius: var(--radius); font-family: 'Instrument Sans', sans-serif; font-size: 0.875rem; font-weight: 500; cursor: pointer; margin-top: 8px; transition: all 0.2s; }
.btn-primary { background: var(--black); color: #fff; }
.btn-wa { background: var(--wa); color: #fff; }
.btn-portfolio { background: var(--white); color: var(--black); border: 1px solid var(--line); display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: 500; }
.btn-portfolio:hover { background: var(--surface); border-color: #aaa; }
.btn-copy { background: #555552; color: #fff; display: flex; align-items: center; justify-content: center; gap: 8px; }
.btn-copy:hover { background: var(--black); }
.btn-ghost { background: transparent; color: var(--muted); border: 1px solid var(--line); }

/* Clases de Control de Interfaz Extra */
.selector-extra-box { margin-top: 20px; background: var(--surface); border: 1px dashed var(--line); padding: 15px; border-radius: 12px; }
.slider-extra-box { margin-top: 20px; background: var(--accent-light); padding: 15px; border-radius: 12px; }

.hidden { display: none !important; }

@media (max-width: 480px) {
  .logo { font-size: 1.8rem; }
  .card { padding: 1.5rem 1.25rem; }
}

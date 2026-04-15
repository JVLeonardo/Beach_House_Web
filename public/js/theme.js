// 1. Diccionario de temas y sus colores de acento
const THEMES = {
  playa: { class: 'theme-playa', label: 'Playa', accentFrom: '#FF7E5F', accentTo: '#FEB47B' },
  cumple: { class: 'theme-cumple', label: 'Cumpleaños', accentFrom: '#ff4757', accentTo: '#ff6b81' }, // Rojo/Coral
  aniversario: { class: 'theme-aniversario', label: 'Aniversario', accentFrom: '#9b59b6', accentTo: '#8e44ad' }, // Morado
  amigos: { class: 'theme-amigos', label: 'Amigos', accentFrom: '#f1c40f', accentTo: '#f39c12' }, // Amarillo
  familia: { class: 'theme-familia', label: 'Familia', accentFrom: '#00bcd4', accentTo: '#48dbfb' }  // Cian
};

// 2. Función que hace el cambio
function setTheme(key) {
  if (!THEMES[key]) return;

  // A. Efecto Flash visual
  const flash = document.getElementById('themeFlash');
  if (flash) {
    flash.classList.add('active');
    setTimeout(() => flash.classList.remove('active'), 300);
  }

  // B. Cambiar la clase del Body (Esto cambia los colores base y los h2)
  Object.values(THEMES).forEach(t => document.body.classList.remove(t.class));
  document.body.classList.add(THEMES[key].class);

  // C. INYECTAR LOS COLORES A LOS BOTONES (Aquí está el truco que faltaba)
  document.body.style.setProperty('--dynamic-accent-1', THEMES[key].accentFrom);
  document.body.style.setProperty('--dynamic-accent-2', THEMES[key].accentTo);

  // D. Marcar la tarjeta como activa
  document.querySelectorAll('.theme-selector-card').forEach(card => {
    if (card.dataset.tema === key) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });
}

// 3. Activar los botones cuando cargue la página
document.addEventListener('DOMContentLoaded', () => {

  // Escuchar clics en las temáticas
  document.querySelectorAll('.theme-selector-card').forEach(card => {
    card.addEventListener('click', () => {
      const temaElegido = card.getAttribute('data-tema');
      setTheme(temaElegido);
    });
  });

  // Forzar inicio en Playa
  setTheme('playa');
});
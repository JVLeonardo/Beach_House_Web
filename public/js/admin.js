// ── DATA ────────────────────────────────────────────────
let reservas = [
  { id: 'BH-001', nombre: 'Carlos Mendoza', pkg: 2, checkin: '2026-04-18', checkout: '2026-04-19', pax: 12, total: 970, garantia: 350, estado: 'confirmado' },
  { id: 'BH-002', nombre: 'Ana Quispe', pkg: 1, checkin: '2026-04-25', checkout: '2026-04-26', pax: 8, total: 680, garantia: 350, estado: 'pendiente' },
  { id: 'BH-003', nombre: 'Familia Torres', pkg: 3, checkin: '2026-05-02', checkout: '2026-05-04', pax: 20, total: 1200, garantia: 350, estado: 'confirmado' },
  { id: 'BH-004', nombre: 'Grupo Universitario', pkg: 2, checkin: '2026-05-10', checkout: '2026-05-11', pax: 15, total: 800, garantia: 350, estado: 'pendiente' },
  { id: 'BH-005', nombre: 'Diego & Lucía', pkg: 1, checkin: '2026-04-22', checkout: '2026-04-23', pax: 6, total: 680, garantia: 350, estado: 'confirmado' },
];

const pkgNames = { 1: 'Paquete 1 · 24h', 2: 'Paquete 2 · 2D/1N', 3: 'Paquete 3 · 3D/2N' };

// ── UTILS ────────────────────────────────────────────────
function fmt(dateStr) {
  const [y, m, d] = dateStr.split('-');
  const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  return `${parseInt(d)} ${months[parseInt(m) - 1]}`;
}

function updateDate() {
  const dateObj = document.getElementById('liveDate');
  if (dateObj) {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateObj.textContent = now.toLocaleDateString('es-PE', options);
  }
}

// ── TOAST ────────────────────────────────────────────────
function showToast(msg, icon = '✅') {
  const t = document.getElementById('adminToast');
  document.getElementById('toastMsg').textContent = msg;
  document.getElementById('toastIcon').textContent = icon;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ── NAVEGACIÓN BOOTSTRAP TABS (Eventos Nativos) ───────────
document.addEventListener('DOMContentLoaded', () => {
  // Escuchar cuando el usuario cambia de tab en el Sidebar
  const tabEls = document.querySelectorAll('button[data-bs-toggle="pill"]');
  tabEls.forEach(tabEl => {
    tabEl.addEventListener('shown.bs.tab', event => {
      const targetId = event.target.getAttribute('data-bs-target');

      // Cerrar menú offcanvas en móviles si está abierto
      const offcanvasEl = document.getElementById('sidebarMenu');
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
      if (bsOffcanvas) bsOffcanvas.hide();

      // Renderizados dinámicos según el tab
      if (targetId === '#section-calendario') renderCalendar();
      if (targetId === '#section-estadisticas') renderCharts();
      if (targetId === '#section-reservas') renderFullTable('all');
      if (targetId === '#section-dashboard') renderDonutDash();
    });
  });
});

// ── DASHBOARD TABLE & STATS ──────────────────────────────
function renderDashboardTable() {
  const tbody = document.getElementById('dashboardTableBody');
  if (!tbody) return;
  tbody.innerHTML = reservas.slice(0, 5).map(r => `
    <tr>
      <td><span class="guest-avatar">${r.nombre[0]}</span>${r.nombre}</td>
      <td style="color:var(--text-soft)">${pkgNames[r.pkg]}</td>
      <td style="color:var(--gold);font-weight:600">S/ ${r.total.toLocaleString()}</td>
      <td><span class="badge-estado badge-${r.estado}">${r.estado}</span></td>
    </tr>
  `).join('');
}

function updateStats() {
  const elTotal = document.getElementById('totalReservas');
  const elConf = document.getElementById('confirmadas');
  const elPend = document.getElementById('pendientes');
  const elIngr = document.getElementById('ingresos');
  const badge = document.getElementById('badgeReservas');

  if (elTotal) elTotal.textContent = reservas.length;
  if (badge) badge.textContent = reservas.length;
  if (elConf) elConf.textContent = reservas.filter(r => r.estado === 'confirmado').length;
  if (elPend) elPend.textContent = reservas.filter(r => r.estado === 'pendiente').length;
  if (elIngr) {
    const total = reservas.reduce((a, r) => a + (r.estado !== 'cancelado' ? r.total : 0), 0);
    elIngr.textContent = `S/ ${total.toLocaleString()}`;
  }
}

// ── FULL TABLE & ACTIONS ─────────────────────────────────
let activeFilter = 'all';

function renderFullTable(filter) {
  activeFilter = filter;
  const data = filter === 'all' ? reservas : reservas.filter(r => r.estado === filter);
  const countEl = document.getElementById('reservasCount');
  if (countEl) countEl.textContent = `${data.length} reservas`;

  const tbody = document.getElementById('fullReservasTable');
  if (!tbody) return;

  tbody.innerHTML = data.map((r) => `
    <tr data-id="${r.id}">
      <td style="color:var(--text-soft);font-size:.75rem;font-family:monospace">${r.id}</td>
      <td><span class="guest-avatar">${r.nombre[0]}</span>${r.nombre}</td>
      <td style="color:var(--text-soft);font-size:.8rem">${pkgNames[r.pkg]}</td>
      <td style="font-size:.82rem">${fmt(r.checkin)}</td>
      <td style="font-size:.82rem">${fmt(r.checkout)}</td>
      <td style="text-align:center">${r.pax}</td>
      <td style="color:var(--gold);font-weight:600">S/ ${r.total.toLocaleString()}</td>
      <td style="color:#55efc4;font-size:.82rem">S/ ${r.garantia}</td>
      <td><span class="badge-estado badge-${r.estado}">${r.estado}</span></td>
      <td style="text-align:center;white-space:nowrap">
        ${r.estado === 'pendiente' ? `<button class="action-btn confirm" title="Confirmar" onclick="confirmarReserva('${r.id}')"><i class="fas fa-check"></i></button>` : ''}
        <button class="action-btn" title="WhatsApp" onclick="wsReserva('${r.id}')"><i class="fab fa-whatsapp"></i></button>
        <button class="action-btn delete" title="Eliminar" onclick="eliminarReserva('${r.id}')"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

function filterReservas(filter, btn) {
  document.querySelectorAll('[onclick^="filterReservas"]').forEach(b => b.classList.remove('active-filter'));
  if (btn) btn.classList.add('active-filter');
  renderFullTable(filter);
}

function confirmarReserva(id) {
  const r = reservas.find(x => x.id === id);
  if (r) { r.estado = 'confirmado'; renderFullTable(activeFilter); renderDashboardTable(); updateStats(); showToast('Reserva confirmada ✔️', '✅'); }
}

function eliminarReserva(id) {
  reservas = reservas.filter(x => x.id !== id);
  renderFullTable(activeFilter); renderDashboardTable(); updateStats();
  showToast('Reserva eliminada', '🗑️');
}

function wsReserva(id) {
  const r = reservas.find(x => x.id === id);
  if (!r) return;
  const msg = `*Beach House* 🏖️\nConfirmando reserva:\n👤 ${r.nombre}\n📅 ${fmt(r.checkin)} → ${fmt(r.checkout)}\n📦 ${pkgNames[r.pkg]}\n💰 S/ ${r.total}`;
  window.open(`https://wa.me/51999999999?text=${encodeURIComponent(msg)}`, '_blank');
}

// ── MODAL NUEVA RESERVA (Nativo de Bootstrap) ─────────────
document.addEventListener('DOMContentLoaded', () => {
  const formReserva = document.getElementById('formNuevaReserva');
  if (formReserva) {
    formReserva.addEventListener('submit', function (e) {
      e.preventDefault(); // Evita recargar la página

      const nombre = document.getElementById('newNombre').value.trim();
      const checkin = document.getElementById('newCheckin').value;
      const checkout = document.getElementById('newCheckout').value;
      const pkg = parseInt(document.getElementById('newPkg').value);
      const pax = parseInt(document.getElementById('newPax').value) || 10;
      const precios = { 1: 680, 2: 970, 3: 1200 };

      const newId = 'BH-' + String(reservas.length + 1).padStart(3, '0');
      reservas.push({ id: newId, nombre, pkg, checkin, checkout, pax, total: precios[pkg], garantia: 350, estado: 'pendiente' });

      renderFullTable(activeFilter);
      renderDashboardTable();
      updateStats();

      // Cerrar modal usando API de Bootstrap
      const modalEl = document.getElementById('newReservaModal');
      const bsModal = bootstrap.Modal.getInstance(modalEl);
      bsModal.hide();

      // Limpiar formulario
      formReserva.reset();

      showToast('Reserva agregada exitosamente', '🎉');
    });
  }
});

// Variable global para el calendario
let adminCalendar;

// ── NAVEGACIÓN BOOTSTRAP TABS (Eventos Nativos) ───────────
document.addEventListener('DOMContentLoaded', () => {
    const tabEls = document.querySelectorAll('button[data-bs-toggle="pill"]');
    tabEls.forEach(tabEl => {
        tabEl.addEventListener('shown.bs.tab', event => {
            const targetId = event.target.getAttribute('data-bs-target');
            
            const offcanvasEl = document.getElementById('sidebarMenu');
            const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
            if (bsOffcanvas) bsOffcanvas.hide();

            if(targetId === '#section-estadisticas') renderCharts();
            if(targetId === '#section-reservas') renderFullTable('all');
            if(targetId === '#section-dashboard') renderDonutDash();
            
            // INICIALIZAR FULLCALENDAR
            if(targetId === '#section-calendario') {
                initFullCalendar();
            }
        });
    });
});

// ── LÓGICA DE FULLCALENDAR ────────────────────────────────
function initFullCalendar() {
    const calendarEl = document.getElementById('calendar');
    
    // Si ya existe, solo lo redimensionamos (por si giraron el móvil)
    if (adminCalendar) {
        adminCalendar.render();
        return;
    }

    // Adaptar tus reservas al formato que entiende FullCalendar
    const eventosCalendario = reservas.filter(r => r.estado !== 'cancelado').map(r => {
        return {
            id: r.id,
            title: `${r.nombre} (${r.pax} pax)`,
            start: r.checkin,
            // FullCalendar requiere que el end date sea exclusivo, por eso sumamos 1 día al checkout
            end: new Date(new Date(r.checkout).getTime() + 86400000).toISOString().split('T')[0],
            backgroundColor: r.estado === 'confirmado' ? '#00b894' : 'var(--gold)',
            borderColor: 'transparent',
            textColor: r.estado === 'confirmado' ? '#fff' : '#112b50' // Letra oscura si el fondo es dorado
        };
    });

    adminCalendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'es', // Calendario en español
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay' // Botones como en AdminLTE
        },
        buttonText: {
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Día'
        },
        events: eventosCalendario,
        editable: true, // Permite arrastrar eventos dentro del calendario
        droppable: true,
        eventClick: function(info) {
            // Al hacer clic en un evento, mostramos tu modal o un Toast
            showToast('Reserva seleccionada: ' + info.event.title, '🔍');
        }
    });

    adminCalendar.render();
}

// ── CHARTS (Mantiene tu lógica igual) ──────────────────────
let miBarChart, miPieChart, miLineChart;
let chartsRendered = false;
function renderCharts() {
  if (chartsRendered) return;
  chartsRendered = true;
  const barCanvas = document.getElementById('barChart');
  if (!barCanvas) return;
  if (miBarChart) miBarChart.destroy();
  if (miPieChart) miPieChart.destroy();
  if (miLineChart) miLineChart.destroy();
  const isLight = document.body.getAttribute('data-theme') === 'light';
  const textColor = isLight ? '#6c757d' : 'rgba(255,255,255,.6)';
  const gridColor = isLight ? 'rgba(0,0,0,.05)' : 'rgba(255,255,255,.05)';
  const legendMinimalista = { position: 'top', align: 'end', labels: { color: textColor, font: { family: 'Poppins', size: 11 }, usePointStyle: true, pointStyle: 'circle', boxWidth: 8, padding: 20 } };

  miBarChart = new Chart(barCanvas, {
    type: 'bar',
    data: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'],
      datasets: [{ label: 'Ingresos (S/)', data: [2400, 3100, 2800, 4330, 3900, 5200, 4800, 6100], backgroundColor: 'rgba(0,151,230,.7)', borderRadius: 8 }, { label: 'Meta (S/)', data: [3000, 3000, 3000, 4000, 4000, 5000, 5000, 6000], type: 'line', borderColor: isLight ? '#fbc531' : 'rgba(251,197,49,.6)', backgroundColor: 'transparent', pointBackgroundColor: '#fbc531', tension: .4, borderDash: [5, 3] }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: legendMinimalista }, scales: { x: { grid: { color: gridColor }, ticks: { color: textColor, font: { family: 'Poppins' } } }, y: { grid: { color: gridColor }, ticks: { color: textColor, font: { family: 'Poppins' }, callback: v => 'S/ ' + v } } } }
  });

  miPieChart = new Chart(document.getElementById('pieChart'), {
    type: 'doughnut',
    data: { labels: ['Pkg 1', 'Pkg 2', 'Pkg 3'], datasets: [{ data: [30, 50, 20], backgroundColor: ['#0097e6', '#fbc531', '#00b894'], borderWidth: 0 }] },
    options: { responsive: true, maintainAspectRatio: false, cutout: '65%', plugins: { legend: { position: 'bottom', labels: { color: textColor, font: { family: 'Poppins', size: 11 }, usePointStyle: true, pointStyle: 'circle' } } } }
  });

  miLineChart = new Chart(document.getElementById('lineChart'), {
    type: 'line',
    data: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'],
      datasets: [{ label: 'Fin de semana', data: [6, 8, 7, 9, 10, 12, 11, 14], borderColor: '#0097e6', backgroundColor: 'rgba(0,151,230,.1)', fill: true, tension: .4 }, { label: 'Lun–Jue', data: [3, 4, 3, 5, 6, 7, 6, 8], borderColor: '#fbc531', backgroundColor: 'rgba(251,197,49,.08)', fill: true, tension: .4 }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: legendMinimalista }, scales: { x: { grid: { color: gridColor }, ticks: { color: textColor } }, y: { grid: { color: gridColor }, ticks: { color: textColor } } } }
  });
}

// ── LOGICA MODO CLARO / OSCURO ───────────────────────────
const themeBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');
function applyTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('admin_theme', theme);
  if (themeIcon) {
    if (theme === 'light') themeIcon.classList.replace('fa-sun', 'fa-moon');
    else themeIcon.classList.replace('fa-moon', 'fa-sun');
  }
  renderDonutDash();
  chartsRendered = false;
  renderCharts();
}
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });
}

function renderDonutDash() {
  const canvas = document.getElementById('donutChart');
  if (!canvas) return;
  const chartExistente = Chart.getChart(canvas);
  if (chartExistente) chartExistente.destroy();
  const isLight = document.body.getAttribute('data-theme') === 'light';
  const trackColor = isLight ? '#e2e8f0' : 'rgba(255,255,255,0.08)';
  new Chart(canvas, {
    type: 'doughnut',
    data: { labels: ['Ocupado', 'Disponible'], datasets: [{ data: [82, 18], backgroundColor: ['#0097e6', trackColor], borderWidth: 0, hoverOffset: 4 }] },
    options: { responsive: true, maintainAspectRatio: false, cutout: '75%', plugins: { legend: { display: false } } }
  });
}

// ── ARRANQUE (INIT) ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateDate();
  renderDashboardTable();
  updateStats();
  const savedTheme = localStorage.getItem('admin_theme') || 'dark';
  applyTheme(savedTheme);
  setTimeout(() => renderDonutDash(), 200);
});

// ── LOGOUT / CERRAR SESIÓN ───────────────────────────────
function cerrarSesion() {
    // 1. Mostramos tu toast de despedida
    showToast('Cerrando sesión...', '👋');
    
    // 2. Borramos la "sesión" de la memoria del navegador
    localStorage.removeItem('sesion_activa');
    
    // 3. Hacemos una pausa de 800 milisegundos para que 
    // el usuario alcance a ver la animación antes de salir
    setTimeout(() => {
        // 4. Retrocedemos dos carpetas (pages -> views -> raíz)
        window.location.href = '../../index.html'; 
    }, 800);
}
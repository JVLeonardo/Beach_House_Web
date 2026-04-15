/*LA VER ANTES ERA LA MAS ESTABLE */

// public/js/main.js

// 1. FUNCION APARA CARGAR LOS COMPONENETES PARA INYECTAR
async function cargarComponente(idContenedor, rutaArchivo) {
    try {
        const respuesta = await fetch(rutaArchivo);
        if (respuesta.ok) {
            const html = await respuesta.text();
            document.getElementById(idContenedor).innerHTML = html;
        } else {
            console.error(`Error al cargar ${rutaArchivo}`);
        }
    } catch (error) {
        console.error("Hubo un problema con la petición Fetch:", error);
    }
}

//PARA INYECTAR TODOS

// Cuando la página cargue, inyectamos todo
document.addEventListener('DOMContentLoaded', () => {
    // Inyectar Navbar
    cargarComponente('navbar-container', 'views/partials/navbar.html');

    // Inyectar Footer
    cargarComponente('footer-container', 'views/partials/footer.html');

    // Inyectar modales EN CONTENEDORES SEPARADOS
    cargarComponente('modal-login-container', 'views/modals/modal-login.html');
    cargarComponente('modal-reserva-container', 'views/modals/modal-reserva.html');
});

// ┌────────────────────────────────────────────────────────┐
// │ NUEVO: FUNCIÓN MAESTRA PARA ABRIR MODALES SIN BUGS     │
// └────────────────────────────────────────────────────────┘
function safeShowModal(modalId) {
    const modalEl = document.getElementById(modalId);
    if (!modalEl) {
        console.error(`El modal ${modalId} no se encuentra en el HTML.`);
        return;
    }

    // 1. Forzar cierre de cualquier otro modal abierto
    document.querySelectorAll('.modal.show').forEach(modal => {
        if (modal.id !== modalId) {
            const instanciaVieja = bootstrap.Modal.getInstance(modal);
            if (instanciaVieja) instanciaVieja.hide();
        }
    });

    // 2. Limpiar fondos oscuros fantasma y descongelar el scroll
    setTimeout(() => {
        const backdrops = document.querySelectorAll('.modal-backdrop');
        if (backdrops.length > 0 && document.querySelectorAll('.modal.show').length === 0) {
            backdrops.forEach(b => b.remove());
            document.body.classList.remove('modal-open');
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }
    }, 300);

    // 3. Abrir el modal solicitado
    const myModal = bootstrap.Modal.getOrCreateInstance(modalEl);
    myModal.show();
}

// 2. FUNCION PARA CAMBIAR ENTRE LOGIN Y REGISTRO
function switchAuthTab(tabName) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const buttons = document.querySelectorAll('.auth-tab-btn');

    // Quitar clase activa de ambos botones
    buttons.forEach(btn => {
        btn.classList.remove('active', 'fw-bold');
        btn.classList.add('text-muted');
    });

    if (tabName === 'login') {
        loginForm.classList.remove('d-none');
        registerForm.classList.add('d-none');
        buttons[0].classList.add('active', 'fw-bold');
        buttons[0].classList.remove('text-muted');
    } else {
        loginForm.classList.add('d-none');
        registerForm.classList.remove('d-none');
        buttons[1].classList.add('active', 'fw-bold');
        buttons[1].classList.remove('text-muted');
    }
}

// Funciones de prueba (Las reemplazarás con tu backend luego)
function openAuthModal() {
    // USAMOS LA FUNCIÓN SEGURA
    safeShowModal('authModal');
}

function doLogin() {
    console.log("Iniciando sesión...");
    // Aquí irá tu lógica
}

function doRegister() {
    console.log("Registrando usuario...");
    // Aquí irá tu lógica
}


//3. 
// ┌────────────────────────────────────────────────────────┐
// │ 3. MÓDULO DE RESERVAS Y CALENDARIO INTERACTIVO         │
// └────────────────────────────────────────────────────────┘

const bookingData = {
    pkgId: 1,
    checkInDate: null,
    checkOutDate: null,
    pkgDetails: {
        1: { nombre: 'Paquete 1 (24 Horas)', dias: 1, precio: 'S/ 680' },
        2: { nombre: 'Paquete 2 (2D/1N)', dias: 2, precio: 'S/ 970' },
        3: { nombre: 'Paquete 3 (3D/2N)', dias: 3, precio: 'S/ 1200' }
    }
};

// Variable para saber qué mes estamos "mirando" en el calendario
let currentViewDate = new Date();
currentViewDate.setDate(1); // Lo fijamos al día 1 para evitar saltos raros de meses

function openBookingPanel(pkgNumber = 1) {
    // Al abrir, el calendario siempre muestra el mes actual
    currentViewDate = new Date();
    currentViewDate.setDate(1);

    selectPackage(pkgNumber);
    renderCalendar();
    goToStep(1);

    // USAMOS LA FUNCIÓN SEGURA
    safeShowModal('bookingModal');
}

function goToStep(step) {
    if (step === 2 && !bookingData.checkInDate) {
        alert("Por favor selecciona una fecha de ingreso en el calendario.");
        return;
    }
    if (step === 3) prepareSummary();

    document.querySelectorAll('.booking-step').forEach(el => el.classList.add('d-none'));
    const stepEl = document.getElementById(`step-${step}`);
    if (stepEl) stepEl.classList.remove('d-none');

    document.querySelectorAll('.step-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index < step);
    });
    const progress = document.getElementById('bookingProgress');
    if (progress) progress.style.width = step === 1 ? '0%' : step === 2 ? '50%' : '100%';
}

function selectPackage(pkgId) {
    bookingData.pkgId = pkgId;
    document.querySelectorAll('.pkg-card').forEach(card => card.classList.remove('active'));

    const activeCard = document.querySelector(`.pkg-card[data-pkg="${pkgId}"]`);
    if (activeCard) activeCard.classList.add('active');

    if (bookingData.checkInDate) {
        calculateCheckOut();
        renderCalendar();
    }

    const priceLbl = document.getElementById('lblPrice');
    if (priceLbl) priceLbl.innerText = bookingData.pkgDetails[pkgId].precio;
}

function calculateCheckOut() {
    let date = new Date(bookingData.checkInDate);
    date.setDate(date.getDate() + (bookingData.pkgDetails[bookingData.pkgId].dias - 1));
    bookingData.checkOutDate = date;

    const lblIn = document.getElementById('lblCheckIn');
    const lblOut = document.getElementById('lblCheckOut');
    if (lblIn) lblIn.innerText = bookingData.checkInDate.toLocaleDateString('es-ES');
    if (lblOut) lblOut.innerText = bookingData.checkOutDate.toLocaleDateString('es-ES');
}

// NUEVO: Función para cambiar el mes en el calendario
function changeMonth(direction) {
    currentViewDate.setMonth(currentViewDate.getMonth() + direction);
    renderCalendar();
}

// MEJORADO: Renderiza el calendario completo con botones de navegación
function renderCalendar() {
    const cal = document.getElementById('miniCalendar');
    if (!cal) return;

    const year = currentViewDate.getFullYear();
    const month = currentViewDate.getMonth();
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Hoy sin horas para cálculos exactos

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthName = currentViewDate.toLocaleString('es-ES', { month: 'long' }).toUpperCase();

    // Controles del Calendario (Navegación)
    let html = `
    <div class="d-flex justify-content-between align-items-center mb-3 px-2">
        <button class="btn btn-sm btn-light border" onclick="changeMonth(-1)"><i class="bi bi-chevron-left"></i></button>
        <span class="fw-bold text-dark" style="font-size: 0.95rem;">${monthName} ${year}</span>
        <button class="btn btn-sm btn-light border" onclick="changeMonth(1)"><i class="bi bi-chevron-right"></i></button>
    </div>`;

    html += `<div class="cal-grid"><div class="cal-header">Dom</div><div class="cal-header">Lun</div><div class="cal-header">Mar</div><div class="cal-header">Mié</div><div class="cal-header">Jue</div><div class="cal-header">Vie</div><div class="cal-header">Sáb</div>`;

    // Relleno de días iniciales vacíos
    const firstDay = new Date(year, month, 1).getDay();
    for (let i = 0; i < firstDay; i++) html += `<div></div>`;

    // Pintar los días y el rango seleccionado
    for (let i = 1; i <= daysInMonth; i++) {
        let loopDate = new Date(year, month, i);
        let classes = "cal-day";

        // Bloquear los días que ya pasaron
        if (loopDate < today) classes += " disabled";

        // Magia visual: Pintar Rango (Fecha A hasta Fecha B)
        let tLoop = loopDate.getTime();

        if (bookingData.checkInDate && bookingData.checkOutDate) {
            let tIn = bookingData.checkInDate.getTime();
            let tOut = bookingData.checkOutDate.getTime();

            if (tLoop === tIn && tLoop === tOut) classes += " selected-start selected-end";
            else if (tLoop === tIn) classes += " selected-start";
            else if (tLoop === tOut) classes += " selected-end";
            else if (tLoop > tIn && tLoop < tOut) classes += " selected-range";
        }
        // Mostrar tu 1er clic pintado mientras espera que hagas el 2do clic
        else if (bookingData.checkInDate) {
            if (tLoop === bookingData.checkInDate.getTime()) classes += " selected-start";
        }

        html += `<div class="${classes}" onclick="selectDate(${year}, ${month}, ${i})">${i}</div>`;
    }
    html += `</div>`;
    cal.innerHTML = html;
}

function selectDate(y, m, d) {
    let selected = new Date(y, m, d);
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selected < today) return; // Bloquear días pasados

    // Si NO hay ingreso, o si ya completaste ambas fechas antes (Inicia nueva selección)
    if (!bookingData.checkInDate || (bookingData.checkInDate && bookingData.checkOutDate)) {
        bookingData.checkInDate = selected;
        bookingData.checkOutDate = null; // Borramos la salida y esperamos tu 2do clic

        // Actualizamos textos
        const lblIn = document.getElementById('lblCheckIn');
        const lblOut = document.getElementById('lblCheckOut');
        if (lblIn) lblIn.innerText = bookingData.checkInDate.toLocaleDateString('es-ES');
        if (lblOut) lblOut.innerText = "Selecciona salida...";
    }
    // Si ya hiciste el 1er clic (Ingreso) y estás haciendo el 2do clic (Salida)
    else if (!bookingData.checkOutDate) {
        // Si por error elegiste una fecha de salida ANTERIOR a la de ingreso, la invertimos
        if (selected < bookingData.checkInDate) {
            bookingData.checkInDate = selected;
            const lblIn = document.getElementById('lblCheckIn');
            if (lblIn) lblIn.innerText = bookingData.checkInDate.toLocaleDateString('es-ES');
        } else {
            // ¡Éxito! 2do clic completado
            bookingData.checkOutDate = selected;
            const lblOut = document.getElementById('lblCheckOut');
            if (lblOut) lblOut.innerText = bookingData.checkOutDate.toLocaleDateString('es-ES');

            // Auto-seleccionar paquete según los días marcados
            let diffTime = Math.abs(bookingData.checkOutDate - bookingData.checkInDate);
            let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 porque el mismo día cuenta como 1

            if (diffDays === 1) selectPackage(1);
            else if (diffDays === 2) selectPackage(2);
            else if (diffDays >= 3) selectPackage(3);
        }
    }

    renderCalendar();
}

function prepareSummary() {
    const pkg = bookingData.pkgDetails[bookingData.pkgId];
    const inputNombre = document.getElementById('bNombre');
    const inputPax = document.getElementById('bPax');

    const nombre = inputNombre ? inputNombre.value : "No especificado";
    const pax = inputPax ? inputPax.value : "1";

    document.getElementById('resumenPkg').innerText = pkg.nombre + " - " + pkg.precio;
    document.getElementById('resumenFechas').innerText = `${bookingData.checkInDate.toLocaleDateString('es-ES')} al ${bookingData.checkOutDate.toLocaleDateString('es-ES')}`;
    document.getElementById('resumenPax').innerText = pax;
    document.getElementById('resumenNombre').innerText = nombre;
}

function sendWhatsApp() {
    const inputNombre = document.getElementById('bNombre');
    const inputPax = document.getElementById('bPax');

    const nombre = inputNombre ? inputNombre.value : "";
    const pax = inputPax ? inputPax.value : "";
    const pkg = bookingData.pkgDetails[bookingData.pkgId];

    if (!nombre) { alert("Ingresa tu nombre por favor."); return; }

    let msg = `*¡Hola Beach House!* 🏖️ Deseo confirmar una reserva:\n\n`;
    msg += `👤 *A nombre de:* ${nombre}\n`;
    msg += `👥 *Personas:* ${pax}\n`;
    msg += `📦 *Paquete:* ${pkg.nombre} (${pkg.precio})\n`;
    msg += `📅 *Ingreso:* ${bookingData.checkInDate.toLocaleDateString('es-ES')}\n`;
    msg += `📅 *Salida:* ${bookingData.checkOutDate.toLocaleDateString('es-ES')}\n\n`;
    msg += `Quedo atento(a) para coordinar el depósito de garantía.`;

    const phone = "51999999999";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
}

// ── LÓGICA DEL MODAL DE AUTENTICACIÓN ────────────────────────

// 1. Función principal de Login
function doLogin() {
    // Obtenemos los valores de los inputs usando sus IDs
    const user = document.getElementById('loginUser').value.trim();
    const pass = document.getElementById('loginPass').value.trim();

    // Validamos las credenciales exactas
    if (user === 'admin' && pass === 'beachhouse') {
        
        // Guardamos la sesión en el navegador
        localStorage.setItem('sesion_activa', 'true');
        
        // Redirigimos al panel de administrador (Ruta según tu estructura de carpetas)
        window.location.href = 'views/pages/admin.html';
        
    } else {
        // Mostramos error si se equivocan
        alert('Credenciales incorrectas. Por favor, verifica el usuario y contraseña.');
        
        // Limpiamos el campo de contraseña por comodidad
        document.getElementById('loginPass').value = '';
    }
}

// 2. Función para alternar entre "Iniciar Sesión" y "Registrarse"
function switchAuthTab(tabName) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const btns = document.querySelectorAll('.auth-tab-btn');

    if (tabName === 'login') {
        // Mostrar Login, ocultar Registro
        loginForm.classList.remove('d-none');
        registerForm.classList.add('d-none');
        
        // Estilos del botón Login
        btns[0].classList.add('active', 'fw-bold');
        btns[0].classList.remove('text-muted');
        
        // Estilos del botón Registro
        btns[1].classList.remove('active', 'fw-bold');
        btns[1].classList.add('text-muted');
        
    } else if (tabName === 'register') {
        // Mostrar Registro, ocultar Login
        registerForm.classList.remove('d-none');
        loginForm.classList.add('d-none');
        
        // Estilos del botón Registro
        btns[1].classList.add('active', 'fw-bold');
        btns[1].classList.remove('text-muted');
        
        // Estilos del botón Login
        btns[0].classList.remove('active', 'fw-bold');
        btns[0].classList.add('text-muted');
    }
}

// 3. Función temporal para el botón de Registro (para que no de error si lo presionan)
function doRegister() {
    const nombre = document.getElementById('regNombre').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const pass = document.getElementById('regPass').value.trim();

    if(!nombre || !email || !pass) {
        alert('Por favor, completa todos los campos para registrarte.');
        return;
    }

    alert('¡Gracias por tu interés, ' + nombre + '! El registro de nuevos administradores está cerrado temporalmente.');
}
import { api, clearAdminAuth } from "./api.js";

const state = {
  blockedDates: [],
  promotions: []
};

const formatDate = new Intl.DateTimeFormat("es-PE", {
  year: "numeric",
  month: "short",
  day: "2-digit"
});

function byId(id) {
  return document.getElementById(id);
}

function swal() {
  return window.Swal;
}

function dateLabel(value) {
  return formatDate.format(new Date(`${value}T00:00:00`));
}

function errorMessage(error, fallback = "No se pudo completar la operacion.") {
  if (error?.details?.errors) {
    const details = Object.values(error.details.errors).filter(Boolean);
    if (details.length) {
      return details.join("\n");
    }
  }
  return error?.message || fallback;
}

async function showSuccess(message) {
  if (!swal()) return;
  await swal().fire({
    icon: "success",
    title: "Listo",
    text: message,
    timer: 1700,
    showConfirmButton: false
  });
}

async function showError(message) {
  if (!swal()) return;
  await swal().fire({
    icon: "error",
    title: "Revisa esto",
    text: message,
    confirmButtonColor: "#c5a059"
  });
}

async function confirmAction(title, text, confirmText) {
  if (!swal()) return true;
  const result = await swal().fire({
    icon: "question",
    title,
    text,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#c5a059",
    cancelButtonColor: "#111111"
  });
  return result.isConfirmed;
}

function setButtonLoading(button, loadingText) {
  if (!button) return () => {};
  const originalHtml = button.innerHTML;
  button.disabled = true;
  button.innerHTML = loadingText;
  return () => {
    button.disabled = false;
    button.innerHTML = originalHtml;
  };
}

async function requireAdminSession() {
  try {
    const user = await api.get("/api/auth/me");
    byId("adminUser").textContent = user.username;
    byId("apiStatus").textContent = "Conectada";
  } catch {
    clearAdminAuth();
    window.location.href = "index.html";
  }
}

async function loadDashboard() {
  const [blockedDates, promotions] = await Promise.all([
    api.get("/api/admin/blocked-dates"),
    api.get("/api/admin/promotions")
  ]);

  state.blockedDates = blockedDates;
  state.promotions = promotions;

  renderBlockedDates();
  renderPromotions();
  renderCounters();
}

async function refreshDashboardData() {
  try {
    await loadDashboard();
  } catch {
    byId("apiStatus").textContent = "Sincronizacion pendiente";
  }
}

function renderCounters() {
  byId("activeBlockedDatesCount").textContent = state.blockedDates.filter((item) => item.active).length;
  byId("activePromotionsCount").textContent = state.promotions.filter((item) => item.active).length;
}

function renderBlockedDates() {
  const container = byId("blockedDatesList");
  if (!state.blockedDates.length) {
    container.innerHTML = '<div class="admin-empty">Todavia no hay fechas bloqueadas.</div>';
    return;
  }

  container.innerHTML = [...state.blockedDates]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((item) => `
      <article class="admin-list-item">
        <div>
          <h3>${dateLabel(item.date)}</h3>
          <p>${item.reason}</p>
          <span class="status-pill ${item.active ? "active" : "inactive"}">${item.active ? "Bloqueada" : "Inactiva"}</span>
        </div>
        <div class="admin-actions">
          <button class="btn btn-sm btn-outline-dark rounded-0" data-action="toggle-blocked" data-id="${item.id}">
            ${item.active ? "Desactivar" : "Activar"}
          </button>
          <button class="btn btn-sm btn-outline-danger rounded-0" data-action="delete-blocked" data-id="${item.id}">
            Eliminar
          </button>
        </div>
      </article>
    `)
    .join("");
}

function renderPromotions() {
  const container = byId("promotionsList");
  if (!state.promotions.length) {
    container.innerHTML = '<div class="admin-empty">Todavia no hay promociones creadas.</div>';
    return;
  }

  container.innerHTML = [...state.promotions]
    .sort((a, b) => a.targetDate.localeCompare(b.targetDate))
    .map((item) => `
      <article class="admin-list-item">
        <div>
          <h3>${item.title}</h3>
          <p>${item.packageType} · S/ ${Number(item.promotionalPrice).toFixed(2)} · ${dateLabel(item.targetDate)}</p>
          <p>Tema visual: ${item.visualTheme}</p>
          <span class="status-pill ${item.active ? "active" : "inactive"}">${item.active ? "Activa" : "Inactiva"}</span>
        </div>
        <div class="admin-actions">
          <button class="btn btn-sm btn-outline-dark rounded-0" data-action="toggle-promotion" data-id="${item.id}">
            ${item.active ? "Desactivar" : "Activar"}
          </button>
          <button class="btn btn-sm btn-outline-danger rounded-0" data-action="delete-promotion" data-id="${item.id}">
            Eliminar
          </button>
        </div>
      </article>
    `)
    .join("");
}

function syncBlockedDate(response) {
  const index = state.blockedDates.findIndex((item) => item.id === response.id);
  if (index >= 0) {
    state.blockedDates[index] = response;
  } else {
    state.blockedDates.push(response);
  }
  renderBlockedDates();
  renderCounters();
}

function syncPromotion(response) {
  const index = state.promotions.findIndex((item) => item.id === response.id);
  if (index >= 0) {
    state.promotions[index] = response;
  } else {
    state.promotions.push(response);
  }
  renderPromotions();
  renderCounters();
}

function removeBlockedDate(id) {
  state.blockedDates = state.blockedDates.filter((item) => item.id !== Number(id));
  renderBlockedDates();
  renderCounters();
}

function removePromotion(id) {
  state.promotions = state.promotions.filter((item) => item.id !== Number(id));
  renderPromotions();
  renderCounters();
}

function setupForms() {
  byId("blockedDateForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const restoreButton = setButtonLoading(
      submitButton,
      '<span class="spinner-border spinner-border-sm me-2"></span>Guardando'
    );

    try {
      const response = await api.post("/api/admin/blocked-dates", {
        date: formData.get("date"),
        reason: formData.get("reason")
      });
      syncBlockedDate(response);
      form.reset();
      await refreshDashboardData();
      await showSuccess("La fecha se guardo y ya aparece en el panel.");
    } catch (error) {
      await showError(errorMessage(error, "No se pudo guardar la fecha bloqueada."));
    } finally {
      restoreButton();
    }
  });

  byId("promotionForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const restoreButton = setButtonLoading(
      submitButton,
      '<span class="spinner-border spinner-border-sm me-2"></span>Guardando'
    );

    try {
      const response = await api.post("/api/admin/promotions", {
        title: formData.get("title"),
        packageType: formData.get("packageType"),
        promotionalPrice: formData.get("promotionalPrice"),
        targetDate: formData.get("targetDate"),
        visualTheme: formData.get("visualTheme"),
        active: formData.get("active") === "on"
      });
      syncPromotion(response);
      form.reset();
      await refreshDashboardData();
      await showSuccess("La promocion se guardo y ya aparece en el panel.");
    } catch (error) {
      await showError(errorMessage(error, "No se pudo crear la promocion."));
    } finally {
      restoreButton();
    }
  });
}

function setupListActions() {
  document.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;

    const { action, id } = button.dataset;

    if (action === "toggle-blocked") {
      const confirmed = await confirmAction("Cambiar estado", "Actualizaremos esta fecha bloqueada.", "Continuar");
      if (!confirmed) return;
    }

    if (action === "delete-blocked") {
      const confirmed = await confirmAction(
        "Eliminar fecha",
        "La fecha saldra del panel y volvera a depender solo de las reglas generales.",
        "Eliminar"
      );
      if (!confirmed) return;
    }

    if (action === "toggle-promotion") {
      const confirmed = await confirmAction("Cambiar promocion", "Actualizaremos su estado en la web publica.", "Continuar");
      if (!confirmed) return;
    }

    if (action === "delete-promotion") {
      const confirmed = await confirmAction(
        "Eliminar promocion",
        "Quitaremos esta promocion del panel y de la web publica.",
        "Eliminar"
      );
      if (!confirmed) return;
    }

    const restoreButton = setButtonLoading(button, '<span class="spinner-border spinner-border-sm"></span>');

    try {
      if (action === "toggle-blocked") {
        const response = await api.patch(`/api/admin/blocked-dates/${id}/toggle`);
        syncBlockedDate(response);
      }
      if (action === "delete-blocked") {
        await api.delete(`/api/admin/blocked-dates/${id}`);
        removeBlockedDate(id);
      }
      if (action === "toggle-promotion") {
        const response = await api.patch(`/api/admin/promotions/${id}/toggle`);
        syncPromotion(response);
      }
      if (action === "delete-promotion") {
        await api.delete(`/api/admin/promotions/${id}`);
        removePromotion(id);
      }

      await refreshDashboardData();
      await showSuccess("Cambios guardados.");
    } catch (error) {
      await showError(errorMessage(error));
    } finally {
      restoreButton();
    }
  });
}

function setupLogout() {
  byId("logoutButton").addEventListener("click", async () => {
    try {
      await api.post("/api/auth/logout", {});
    } finally {
      clearAdminAuth();
    }
    window.location.href = "index.html";
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  await requireAdminSession();
  setupForms();
  setupListActions();
  setupLogout();
  await loadDashboard();
});

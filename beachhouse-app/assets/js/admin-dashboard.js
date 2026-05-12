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

function showAdminAlert(message, type = "success") {
  const alert = byId("adminAlert");
  alert.className = `admin-alert mb-4 ${type === "danger" ? "border-danger" : ""}`;
  alert.textContent = message;
  window.setTimeout(() => {
    alert.className = "admin-alert d-none";
    alert.textContent = "";
  }, 4200);
}

function dateLabel(value) {
  return formatDate.format(new Date(`${value}T00:00:00`));
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

  container.innerHTML = state.blockedDates
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

  container.innerHTML = state.promotions
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

function setupForms() {
  byId("blockedDateForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      await api.post("/api/admin/blocked-dates", {
        date: formData.get("date"),
        reason: formData.get("reason")
      });
      event.currentTarget.reset();
      await loadDashboard();
      showAdminAlert("Fecha bloqueada correctamente.");
    } catch (error) {
      showAdminAlert(error.message, "danger");
    }
  });

  byId("promotionForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      await api.post("/api/admin/promotions", {
        title: formData.get("title"),
        packageType: formData.get("packageType"),
        promotionalPrice: formData.get("promotionalPrice"),
        targetDate: formData.get("targetDate"),
        visualTheme: formData.get("visualTheme"),
        active: formData.get("active") === "on"
      });
      event.currentTarget.reset();
      await loadDashboard();
      showAdminAlert("Promocion creada correctamente.");
    } catch (error) {
      showAdminAlert(error.message, "danger");
    }
  });
}

function setupListActions() {
  document.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;

    const { action, id } = button.dataset;

    try {
      if (action === "toggle-blocked") {
        await api.patch(`/api/admin/blocked-dates/${id}/toggle`);
      }
      if (action === "delete-blocked") {
        await api.delete(`/api/admin/blocked-dates/${id}`);
      }
      if (action === "toggle-promotion") {
        await api.patch(`/api/admin/promotions/${id}/toggle`);
      }
      if (action === "delete-promotion") {
        await api.delete(`/api/admin/promotions/${id}`);
      }

      await loadDashboard();
      showAdminAlert("Cambios guardados.");
    } catch (error) {
      showAdminAlert(error.message, "danger");
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

import { api, clearAdminAuth, saveAdminAuth } from "./api.js";
import { hideBootstrapModal, hideInlineAlert, showBootstrapModal, showInlineAlert } from "./modal-manager.js";

const loginButton = document.getElementById("loginButton");
const loginForm = document.getElementById("loginForm");

async function refreshLoginState() {
  if (!loginButton) return;

  try {
    await api.get("/api/auth/me");
    loginButton.innerHTML = '<i class="bi bi-speedometer2 me-2"></i>Panel';
    loginButton.addEventListener("click", () => {
      window.location.href = "admin.html";
    }, { once: true });
  } catch {
    loginButton.addEventListener("click", () => showBootstrapModal("loginModal"));
  }
}

function setupLoginForm() {
  if (!loginForm) return;

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    hideInlineAlert("loginAlert");

    const formData = new FormData(loginForm);
    const payload = {
      username: formData.get("username"),
      password: formData.get("password")
    };

    try {
      clearAdminAuth();
      await api.post("/api/auth/login", payload, { skipAuth: true });
      saveAdminAuth(payload.username, payload.password);
      hideBootstrapModal("loginModal");
      window.location.href = "admin.html";
    } catch (error) {
      clearAdminAuth();
      const message = error.status === 401
        ? "Credenciales incorrectas. Revisa usuario y contrasena."
        : "No se pudo conectar con el backend. Verifica que la API este encendida.";
      showInlineAlert("loginAlert", message);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  refreshLoginState();
  setupLoginForm();
});

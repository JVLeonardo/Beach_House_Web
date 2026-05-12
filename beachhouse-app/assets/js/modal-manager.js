export function showBootstrapModal(modalId) {
  const element = document.getElementById(modalId);
  if (!element || !window.bootstrap) return;
  window.bootstrap.Modal.getOrCreateInstance(element).show();
}

export function hideBootstrapModal(modalId) {
  const element = document.getElementById(modalId);
  if (!element || !window.bootstrap) return;
  window.bootstrap.Modal.getOrCreateInstance(element).hide();
}

export function showInlineAlert(elementId, message, type = "danger") {
  const element = document.getElementById(elementId);
  if (!element) return;
  element.className = `login-alert alert alert-${type} rounded-0`;
  element.textContent = message;
}

export function hideInlineAlert(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return;
  element.className = "login-alert d-none";
  element.textContent = "";
}

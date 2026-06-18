import {
  generalWhatsAppMessage,
  trackingSource,
  whatsAppUrl
} from "./site-config.js";

function configureWhatsAppLink(elementId, source) {
  const element = document.getElementById(elementId);
  if (!element) return;
  element.href = whatsAppUrl(generalWhatsAppMessage(trackingSource(source)));
}

document.addEventListener("DOMContentLoaded", () => {
  configureWhatsAppLink("aboutFooterWhatsapp", "about-footer");
  configureWhatsAppLink("aboutFloatWhatsapp", "about-floating-button");
});

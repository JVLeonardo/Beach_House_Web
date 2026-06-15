import {
  generalWhatsAppMessage,
  trackingSource,
  whatsAppUrl
} from "./site-config.js";

const beachHouseCoordinates = [-11.794161, -77.173981];
const beachHouseAddress = "Calle 15, Lote 1A, Manzana 57, Balneario Santa Rosa, Lima Norte";
let compactMap;
let expandedMap;

function configureWhatsAppLink(elementId, source) {
  const element = document.getElementById(elementId);
  if (!element) return;
  element.href = whatsAppUrl(generalWhatsAppMessage(trackingSource(source)));
}

function addBeachHouseMarker(map) {
  return window.L.marker(beachHouseCoordinates)
    .addTo(map)
    .bindPopup(`<strong>Beach House Santa Rosa</strong><br>${beachHouseAddress}`);
}

function createMap(elementId, zoom) {
  const element = document.getElementById(elementId);
  if (!element || !window.L) return null;

  const map = window.L.map(element, {
    scrollWheelZoom: false,
    tap: true
  }).setView(beachHouseCoordinates, zoom);

  window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  addBeachHouseMarker(map).openPopup();
  return map;
}

function showMapFallback() {
  const mapElement = document.getElementById("locationMap");
  const fallback = document.getElementById("locationMapFallback");
  if (mapElement) mapElement.hidden = true;
  if (fallback) fallback.hidden = false;
}

function initLocationMaps() {
  if (!window.L) {
    showMapFallback();
    return;
  }

  compactMap = createMap("locationMap", 15);

  const modalElement = document.getElementById("locationMapModal");
  modalElement?.addEventListener("shown.bs.modal", () => {
    if (!expandedMap) {
      expandedMap = createMap("locationMapExpanded", 16);
    }

    window.setTimeout(() => {
      expandedMap?.invalidateSize();
      expandedMap?.setView(beachHouseCoordinates, 16);
    }, 80);
  });

  window.addEventListener("resize", () => {
    compactMap?.invalidateSize();
    expandedMap?.invalidateSize();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  configureWhatsAppLink("locationFooterWhatsapp", "location-footer");
  configureWhatsAppLink("locationFloatWhatsapp", "location-floating-button");
  initLocationMaps();
});

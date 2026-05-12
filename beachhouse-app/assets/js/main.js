import { api } from "./api.js";
import { hideInlineAlert, showBootstrapModal, showInlineAlert } from "./modal-manager.js";

const whatsappPhone = "51999999999";
const defaultMessage = "Hola Beach House, vi la web y deseo consultar disponibilidad para una reserva.";

const state = {
  selectedAvailability: null,
  activePromotions: []
};

const PROMOTION_THEMES = {
  "sand-gold": "Dorado arena",
  "coral-celebration": "Coral celebracion",
  "ocean-breeze": "Azul oceano",
  "night-luxe": "Negro luxe"
};

function whatsAppUrl(message = defaultMessage) {
  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
}

function byId(id) {
  return document.getElementById(id);
}

function themeClass(theme) {
  return `theme-${theme || "sand-gold"}`;
}

function formatPromoDate(value) {
  return new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "short"
  }).format(new Date(`${value}T00:00:00`));
}

function setStaticWhatsAppLinks() {
  const defaultUrl = whatsAppUrl();
  ["footerWhatsapp", "floatWhatsapp"].forEach((id) => {
    const element = byId(id);
    if (element) element.href = defaultUrl;
  });
}

function initShuffleGallery() {
  const slides = Array.from(document.querySelectorAll(".shuffle-slide"));
  const btnNext = byId("btnNext");
  const btnPrev = byId("btnPrev");
  const carouselContainer = byId("shuffleCarousel");

  if (!slides.length || !btnNext || !btnPrev || !carouselContainer) return;

  let currentIndex = 0;
  let autoPlayInterval;

  function updateSlides() {
    slides.forEach((slide, index) => {
      slide.classList.remove("active", "prev", "next", "hidden");

      if (index === currentIndex) {
        slide.classList.add("active");
      } else if (index === (currentIndex - 1 + slides.length) % slides.length) {
        slide.classList.add("prev");
      } else if (index === (currentIndex + 1) % slides.length) {
        slide.classList.add("next");
      } else {
        slide.classList.add("hidden");
      }
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlides();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlides();
  }

  function startAutoPlay() {
    autoPlayInterval = window.setInterval(nextSlide, 4000);
  }

  function stopAutoPlay() {
    window.clearInterval(autoPlayInterval);
  }

  btnNext.addEventListener("click", nextSlide);
  btnPrev.addEventListener("click", prevSlide);
  carouselContainer.addEventListener("mouseenter", stopAutoPlay);
  carouselContainer.addEventListener("mouseleave", startAutoPlay);

  updateSlides();
  startAutoPlay();
}

function openReservationModal(packageName = "Consulta general") {
  byId("reservationPackage").value = packageName;
  byId("reservationDate").value = "";
  byId("reservationSubmit").disabled = true;
  state.selectedAvailability = null;
  updateAvailabilityCard("Selecciona una fecha", "Te diremos al instante si esta disponible o bloqueada.", "");
  hideInlineAlert("reservationAlert");
  showBootstrapModal("reservationModal");
}

function updateAvailabilityCard(title, message, stateName) {
  const card = byId("availabilityCard");
  card.classList.remove("available", "blocked");
  if (stateName) {
    card.classList.add(stateName);
  }
  byId("availabilityTitle").textContent = title;
  byId("availabilityMessage").textContent = message;
}

async function checkAvailability(date) {
  if (!date) {
    state.selectedAvailability = null;
    byId("reservationSubmit").disabled = true;
    updateAvailabilityCard("Selecciona una fecha", "Te diremos al instante si esta disponible o bloqueada.", "");
    return;
  }

  try {
    const result = await api.get(`/api/public/availability?from=${date}&to=${date}`);
    const availability = result[0];
    state.selectedAvailability = availability;

    if (availability.available) {
      updateAvailabilityCard("Fecha disponible", "La fecha esta habilitada. Puedes continuar a WhatsApp para separar.", "available");
      byId("reservationSubmit").disabled = false;
    } else {
      updateAvailabilityCard("Fecha no disponible", availability.reason, "blocked");
      byId("reservationSubmit").disabled = true;
    }
  } catch {
    state.selectedAvailability = null;
    byId("reservationSubmit").disabled = true;
    updateAvailabilityCard("No se pudo validar", "Enciende la API para consultar disponibilidad real.", "blocked");
  }
}

function setupReservationFlow() {
  document.querySelectorAll(".reserve-trigger").forEach((button) => {
    button.addEventListener("click", () => {
      openReservationModal(button.dataset.package || "Consulta general");
    });
  });

  byId("reservationDate").addEventListener("change", (event) => {
    checkAvailability(event.target.value);
  });

  byId("reservationForm").addEventListener("submit", (event) => {
    event.preventDefault();
    hideInlineAlert("reservationAlert");

    const packageType = byId("reservationPackage").value;
    const date = byId("reservationDate").value;

    if (!state.selectedAvailability?.available) {
      showInlineAlert("reservationAlert", "Selecciona una fecha disponible antes de continuar.");
      return;
    }

    const promotion = state.activePromotions.find((item) => item.packageType === packageType);
    const promoLine = promotion
      ? ` Tambien vi la promocion "${promotion.title}" por S/ ${Number(promotion.promotionalPrice).toFixed(2)}.`
      : "";
    const message = `Hola Beach House, deseo reservar el paquete ${packageType} para la fecha ${date}.${promoLine}`;
    window.open(whatsAppUrl(message), "_blank", "noopener,noreferrer");
  });
}

function renderPromotionSpot(promotions) {
  const spot = byId("heroPromotionSpot");
  const copy = byId("heroPromotionCopy");
  if (!spot || !copy) return;

  if (!promotions.length) {
    spot.className = "promo-spot d-none mb-4";
    copy.innerHTML = "";
    return;
  }

  const promotion = promotions[0];
  const themeLabel = PROMOTION_THEMES[promotion.visualTheme] || PROMOTION_THEMES["sand-gold"];
  spot.className = `promo-spot flyer-promo mb-4 ${themeClass(promotion.visualTheme)}`;
  copy.innerHTML = `
    <div class="flyer-kicker">Oferta destacada</div>
    <strong>${promotion.title}</strong>
    <span class="flyer-line">${promotion.packageType} · ${themeLabel}</span>
    <div class="flyer-price">S/ ${Number(promotion.promotionalPrice).toFixed(2)}</div>
    <span class="flyer-date">Disponible para ${formatPromoDate(promotion.targetDate)}</span>
  `;
}

function renderPackagePromotions(promotions) {
  document.querySelectorAll("[data-package-promo]").forEach((element) => {
    const packageType = element.dataset.packagePromo;
    const promotion = promotions.find((item) => item.packageType === packageType);

    if (!promotion) {
      element.className = "package-promo d-none mb-4";
      element.innerHTML = "";
      return;
    }

    const themeLabel = PROMOTION_THEMES[promotion.visualTheme] || PROMOTION_THEMES["sand-gold"];
    element.className = `package-promo mb-4 ${themeClass(promotion.visualTheme)}`;
    element.innerHTML = `
      <span class="package-promo-tag">Promo activa</span>
      <strong>${promotion.title}</strong>
      <span>${themeLabel} · S/ ${Number(promotion.promotionalPrice).toFixed(2)} · ${formatPromoDate(promotion.targetDate)}</span>
    `;
  });
}

async function loadActivePromotions() {
  try {
    const promotions = await api.get("/api/public/promotions/active");
    state.activePromotions = promotions;
    renderPromotionSpot(promotions);
    renderPackagePromotions(promotions);
  } catch {
    state.activePromotions = [];
    renderPromotionSpot([]);
    renderPackagePromotions([]);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setStaticWhatsAppLinks();
  initShuffleGallery();
  setupReservationFlow();
  loadActivePromotions();
});

import { hideInlineAlert, showBootstrapModal, showInlineAlert } from "./modal-manager.js";

const whatsappPhone = "51943157950";
const defaultMessage = "Hola Beach House, vi la web y deseo consultar disponibilidad para una reserva.";

function whatsAppUrl(message = defaultMessage) {
  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
}

function byId(id) {
  return document.getElementById(id);
}

function enableTouchSwipe(element, onSwipeLeft, onSwipeRight) {
  let startX = 0;
  let startY = 0;
  let isTracking = false;

  element.addEventListener("touchstart", (event) => {
    const touch = event.changedTouches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    isTracking = true;
  }, { passive: true });

  element.addEventListener("touchend", (event) => {
    if (!isTracking) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;
    isTracking = false;

    if (Math.abs(deltaX) < 45 || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) return;

    if (deltaX < 0) {
      onSwipeLeft();
    } else {
      onSwipeRight();
    }
  }, { passive: true });
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
  const galleryNavButtons = Array.from(document.querySelectorAll("[data-gallery-index]"));
  const expandButton = byId("galleryExpand");
  const lightboxElement = byId("galleryLightbox");
  const lightboxPrev = byId("galleryLightboxPrev");
  const lightboxNext = byId("galleryLightboxNext");
  const lightboxImage = byId("galleryLightboxImage");

  if (!slides.length || !btnNext || !btnPrev || !carouselContainer || !galleryNavButtons.length || !expandButton || !lightboxElement || !lightboxPrev || !lightboxNext || !lightboxImage) return;

  let currentIndex = 0;
  let lightboxIndex = 0;
  let autoPlayInterval;
  let descriptionTimeout;

  function updateSlides() {
    window.clearTimeout(descriptionTimeout);

    slides.forEach((slide, index) => {
      slide.classList.remove("active", "prev", "next", "hidden", "show-info");

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

    galleryNavButtons.forEach((button, index) => {
      const isActive = index === currentIndex;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    descriptionTimeout = window.setTimeout(() => {
      slides[currentIndex].classList.add("show-info");
    }, 1000);
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
    stopAutoPlay();
    autoPlayInterval = window.setInterval(nextSlide, 4000);
  }

  function stopAutoPlay() {
    window.clearInterval(autoPlayInterval);
  }

  function updateLightbox() {
    const slide = slides[lightboxIndex];
    const image = slide.querySelector("img");

    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    byId("galleryLightboxTitle").textContent = slide.querySelector("h3").textContent;
    byId("galleryLightboxDescription").textContent = slide.querySelector("p").textContent;
  }

  function nextLightboxSlide() {
    lightboxIndex = (lightboxIndex + 1) % slides.length;
    updateLightbox();
  }

  function prevLightboxSlide() {
    lightboxIndex = (lightboxIndex - 1 + slides.length) % slides.length;
    updateLightbox();
  }

  btnNext.addEventListener("click", nextSlide);
  btnPrev.addEventListener("click", prevSlide);
  carouselContainer.addEventListener("mouseenter", stopAutoPlay);
  carouselContainer.addEventListener("mouseleave", startAutoPlay);
  enableTouchSwipe(carouselContainer, nextSlide, prevSlide);
  galleryNavButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentIndex = Number(button.dataset.galleryIndex);
      updateSlides();
      startAutoPlay();
    });
  });
  expandButton.addEventListener("click", () => {
    lightboxIndex = currentIndex;
    updateLightbox();
    bootstrap.Modal.getOrCreateInstance(lightboxElement).show();
  });
  lightboxPrev.addEventListener("click", prevLightboxSlide);
  lightboxNext.addEventListener("click", nextLightboxSlide);
  enableTouchSwipe(lightboxElement, nextLightboxSlide, prevLightboxSlide);
  lightboxElement.addEventListener("show.bs.modal", () => {
    stopAutoPlay();
    document.body.classList.add("gallery-lightbox-open");
  });
  lightboxElement.addEventListener("hidden.bs.modal", () => {
    document.body.classList.remove("gallery-lightbox-open");
    startAutoPlay();
  });

  updateSlides();
  startAutoPlay();
}

function formatReservationDate(value) {
  return new Intl.DateTimeFormat("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(`${value}T00:00:00`));
}

function todayLocalIso() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function validateReservationForm() {
  byId("reservationSubmit").disabled = !byId("reservationForm").checkValidity();
}

function openReservationModal(packageName = "") {
  byId("reservationPackage").value = packageName;
  byId("reservationDate").value = "";
  byId("reservationSubmit").disabled = true;
  hideInlineAlert("reservationAlert");
  showBootstrapModal("reservationModal");
}

function setupReservationFlow() {
  const reservationDate = byId("reservationDate");
  reservationDate.min = todayLocalIso();

  document.querySelectorAll(".reserve-trigger").forEach((button) => {
    button.addEventListener("click", () => {
      openReservationModal(button.dataset.package || "");
    });
  });

  byId("reservationPackage").addEventListener("change", validateReservationForm);
  reservationDate.addEventListener("change", validateReservationForm);

  byId("reservationForm").addEventListener("submit", (event) => {
    event.preventDefault();
    hideInlineAlert("reservationAlert");

    if (!event.currentTarget.checkValidity()) {
      showInlineAlert("reservationAlert", "Selecciona un paquete y una fecha valida antes de continuar.");
      return;
    }

    const packageType = byId("reservationPackage").value;
    const formattedDate = formatReservationDate(reservationDate.value);
    const message = `Hola Beach House, vi su pagina web y deseo consultar la disponibilidad del paquete "${packageType}" para el ${formattedDate}. Podrian ayudarme a confirmar la reserva?`;
    window.open(whatsAppUrl(message), "_blank", "noopener,noreferrer");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setStaticWhatsAppLinks();
  initShuffleGallery();
  setupReservationFlow();
});

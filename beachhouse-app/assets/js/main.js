import { hideInlineAlert, showBootstrapModal, showInlineAlert } from "./modal-manager.js";

const whatsappPhone = "51943157950";
const defaultMessage = "Hola Beach House, vi la web y deseo consultar disponibilidad para una reserva.";
const galleryCatalog = [
  {
    id: "piscina",
    label: "Piscina",
    icon: "bi-water",
    images: [
      {
        src: "psina parrilla.webp",
        mobileSrc: "psina parrilla-mobile.webp",
        alt: "Piscina privada con parrilla de Beach House",
        title: "Piscina privada con parrilla",
        description: "Un espacio refrescante para compartir, cocinar al aire libre y disfrutar el día con calma."
      }
    ]
  },
  {
    id: "terraza",
    label: "Terraza",
    icon: "bi-sun",
    images: [
      {
        src: "azotea.webp",
        mobileSrc: "azotea-mobile.webp",
        alt: "Terraza elevada de Beach House",
        title: "Vista al atardecer",
        description: "Una terraza elevada para disfrutar la brisa marina y cerrar el día con una vista abierta."
      },
      {
        src: "area social.webp",
        mobileSrc: "area social-mobile.webp",
        alt: "Área social de Beach House",
        title: "Área social para compartir",
        description: "Un ambiente amplio para conversar, celebrar y disfrutar buenos momentos en grupo."
      },
      {
        src: "sala louge.webp",
        mobileSrc: "sala louge-mobile.webp",
        alt: "Sala lounge de Beach House",
        title: "Sala lounge",
        description: "Un rincón cómodo para relajarse y extender la reunión con calma."
      }
    ]
  },
  {
    id: "habitaciones",
    label: "Habitaciones",
    icon: "bi-moon-stars",
    images: [
      {
        src: "hab xd.webp",
        mobileSrc: "hab xd-mobile.webp",
        alt: "Habitación individual con sala privada de Beach House",
        title: "Habitación individual con sala privada",
        description: "Un espacio tranquilo con cama individual y una pequeña sala para descansar con mayor comodidad."
      },
      {
        src: "hab doble.webp",
        mobileSrc: "hab doble-mobile.webp",
        alt: "Habitación doble con televisión de Beach House",
        title: "Habitación doble con TV",
        description: "Un dormitorio amplio y luminoso para descansar después de un día cerca al mar."
      },
      {
        src: "hab simple.webp",
        mobileSrc: "hab simple-mobile.webp",
        alt: "Habitación con clóset de Beach House",
        title: "Habitación con clóset",
        description: "Un ambiente acogedor con cama doble y espacio de guardado para una estadía cómoda."
      },
      {
        src: "hab litera.webp",
        alt: "Habitación con litera de Beach House",
        title: "Habitación con litera",
        description: "Una alternativa práctica para compartir la estadía y aprovechar mejor el espacio."
      }
    ]
  },
  {
    id: "cocina",
    label: "Cocina",
    icon: "bi-cup-hot",
    images: [
      {
        src: "cocina.webp",
        alt: "Cocina equipada de Beach House",
        title: "Cocina equipada",
        description: "Un espacio funcional con cocina, microondas y pequeños electrodomésticos para preparar lo necesario durante la estadía."
      }
    ]
  }
];

function whatsAppUrl(message = defaultMessage) {
  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
}

function byId(id) {
  return document.getElementById(id);
}

function imageUrl(filename) {
  return `assets/img/${encodeURIComponent(filename)}`;
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

function initHeroLightbox() {
  const expandButton = byId("heroExpand");
  const lightboxElement = byId("heroLightbox");

  if (!expandButton || !lightboxElement) return;

  expandButton.addEventListener("click", () => {
    bootstrap.Modal.getOrCreateInstance(lightboxElement).show();
  });
  lightboxElement.addEventListener("show.bs.modal", () => {
    document.body.classList.add("hero-lightbox-open");
  });
  lightboxElement.addEventListener("hidden.bs.modal", () => {
    document.body.classList.remove("hero-lightbox-open");
  });
}

function initShuffleGallery() {
  const btnNext = byId("btnNext");
  const btnPrev = byId("btnPrev");
  const carouselContainer = byId("shuffleCarousel");
  const galleryNav = byId("galleryNav");
  const slidesContainer = byId("gallerySlides");
  const shuffleControls = carouselContainer?.querySelector(".shuffle-controls");
  const expandButton = byId("galleryExpand");
  const lightboxElement = byId("galleryLightbox");
  const lightboxControls = lightboxElement?.querySelector(".gallery-lightbox-controls");
  const lightboxPrev = byId("galleryLightboxPrev");
  const lightboxNext = byId("galleryLightboxNext");
  const lightboxImage = byId("galleryLightboxImage");

  if (!btnNext || !btnPrev || !carouselContainer || !galleryNav || !slidesContainer || !shuffleControls || !expandButton || !lightboxElement || !lightboxControls || !lightboxPrev || !lightboxNext || !lightboxImage) return;

  let activeCategory = galleryCatalog[0];
  let activeImages = activeCategory.images;
  let slides = [];
  let currentIndex = 0;
  let lightboxIndex = 0;
  let autoPlayInterval;
  let descriptionTimeout;

  function renderCategoryNav() {
    galleryNav.innerHTML = galleryCatalog.map((category) => `
      <button class="gallery-nav-btn" type="button" data-gallery-category="${category.id}" aria-pressed="false">
        <i class="bi ${category.icon}"></i><span>${category.label}</span>
      </button>
    `).join("");

    galleryNav.querySelectorAll("[data-gallery-category]").forEach((button) => {
      button.addEventListener("click", () => {
        selectCategory(button.dataset.galleryCategory);
      });
    });
  }

  function renderSlides() {
    slidesContainer.innerHTML = activeImages.map((image) => `
      <div class="shuffle-slide">
        <picture>
          ${image.mobileSrc ? `<source media="(max-width: 768px)" srcset="${imageUrl(image.mobileSrc)}">` : ""}
          <img src="${imageUrl(image.src)}" alt="${image.alt}">
        </picture>
        <div class="slide-info">
          <h3 class="font-pacifico text-gold">${image.title}</h3>
          <p>${image.description}</p>
        </div>
      </div>
    `).join("");
    slides = Array.from(slidesContainer.querySelectorAll(".shuffle-slide"));
  }

  function updateCategoryNav() {
    galleryNav.querySelectorAll("[data-gallery-category]").forEach((button) => {
      const isActive = button.dataset.galleryCategory === activeCategory.id;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  function updateControlVisibility() {
    const hasMultipleImages = activeImages.length > 1;
    shuffleControls.classList.toggle("d-none", !hasMultipleImages);
    lightboxControls.classList.toggle("d-none", !hasMultipleImages);
  }

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
    if (activeImages.length < 2) return;
    autoPlayInterval = window.setInterval(nextSlide, 4000);
  }

  function stopAutoPlay() {
    window.clearInterval(autoPlayInterval);
  }

  function updateLightbox() {
    const image = activeImages[lightboxIndex];

    lightboxImage.src = imageUrl(image.mobileSrc && window.matchMedia("(max-width: 768px)").matches ? image.mobileSrc : image.src);
    lightboxImage.alt = image.alt;
    byId("galleryLightboxTitle").textContent = image.title;
    byId("galleryLightboxDescription").textContent = image.description;
  }

  function nextLightboxSlide() {
    lightboxIndex = (lightboxIndex + 1) % slides.length;
    updateLightbox();
  }

  function prevLightboxSlide() {
    lightboxIndex = (lightboxIndex - 1 + slides.length) % slides.length;
    updateLightbox();
  }

  function selectCategory(categoryId) {
    const category = galleryCatalog.find((item) => item.id === categoryId);
    if (!category) return;

    activeCategory = category;
    activeImages = category.images;
    currentIndex = 0;
    lightboxIndex = 0;
    renderSlides();
    updateCategoryNav();
    updateControlVisibility();
    updateSlides();
    startAutoPlay();
  }

  btnNext.addEventListener("click", nextSlide);
  btnPrev.addEventListener("click", prevSlide);
  carouselContainer.addEventListener("mouseenter", stopAutoPlay);
  carouselContainer.addEventListener("mouseleave", startAutoPlay);
  enableTouchSwipe(carouselContainer, nextSlide, prevSlide);
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

  renderCategoryNav();
  selectCategory(activeCategory.id);
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
  initHeroLightbox();
  initShuffleGallery();
  setupReservationFlow();
});

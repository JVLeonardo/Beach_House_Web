const whatsappPhone = "51999999999";
const defaultMessage = "Hola Beach House, vi la web y deseo consultar disponibilidad para una reserva.";

function whatsAppUrl(message = defaultMessage) {
  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
}

function setWhatsAppLinks() {
  const defaultUrl = whatsAppUrl();
  [
    "topBookingCta",
    "heroBookingCta",
    "contactBookingCta",
    "footerWhatsapp",
    "floatWhatsapp"
  ].forEach((id) => {
    const element = document.getElementById(id);
    if (element) element.href = defaultUrl;
  });

  document.querySelectorAll(".packageCta").forEach((cta) => {
    const packageName = cta.dataset.package || "este paquete";
    cta.href = whatsAppUrl(`Hola Beach House, deseo consultar disponibilidad para el paquete ${packageName}.`);
  });
}

function initShuffleGallery() {
  const slides = Array.from(document.querySelectorAll(".shuffle-slide"));
  const btnNext = document.getElementById("btnNext");
  const btnPrev = document.getElementById("btnPrev");
  const carouselContainer = document.getElementById("shuffleCarousel");

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
    autoPlayInterval = setInterval(nextSlide, 4000);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  btnNext.addEventListener("click", nextSlide);
  btnPrev.addEventListener("click", prevSlide);
  carouselContainer.addEventListener("mouseenter", stopAutoPlay);
  carouselContainer.addEventListener("mouseleave", startAutoPlay);

  updateSlides();
  startAutoPlay();
}

document.addEventListener("DOMContentLoaded", () => {
  setWhatsAppLinks();
  initShuffleGallery();
});

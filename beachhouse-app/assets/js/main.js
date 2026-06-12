import { hideInlineAlert, showBootstrapModal, showInlineAlert } from "./modal-manager.js";
import {
  generalWhatsAppMessage,
  packageWhatsAppMessage,
  trackingSource,
  whatsAppUrl
} from "./site-config.js";
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
        title: "Piscina privada",
        description: "Un espacio refrescante para compartir, cocinar al aire libre y disfrutar el día con calma."
      },
      {
        src: "piscina 2.webp",
        mobileSrc: "piscina 2-mobile.webp",
        alt: "Piscina privada de Beach House",
        title: "Piscina privada",
        description: "Un ambiente fresco para disfrutar el agua y relajarse sin prisas."
      },
      {
        src: "piscina 3.webp",
        mobileSrc: "piscina 3-mobile.webp",
        alt: "Piscina privada iluminada de Beach House",
        title: "Piscina privada",
        description: "Una zona ideal para pasar momentos tranquilos cerca de la piscina."
      },
      {
        src: "piscina 4.webp",
        mobileSrc: "piscina 4-mobile.webp",
        alt: "Vista de la piscina privada de Beach House",
        title: "Piscina privada",
        description: "Un rincon privado para refrescarse y compartir en buena compania."
      }
    ]
  },
  {
    id: "patio",
    label: "Patio",
    icon: "bi-house-heart",
    images: [
      {
        src: "patio.webp",
        mobileSrc: "patio-mobile.webp",
        alt: "Patio social de Beach House",
        title: "Patio",
        description: "Un espacio abierto para reunirse, conversar y disfrutar celebraciones al aire libre."
      },
      {
        src: "patio 2.webp",
        mobileSrc: "patio 2-mobile.webp",
        alt: "Patio decorado de Beach House",
        title: "Patio",
        description: "Un ambiente versatil para compartir momentos especiales en grupo."
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
      },
      {
        src: "cocina 2.webp",
        mobileSrc: "cocina 2-mobile.webp",
        alt: "Cocina equipada de Beach House",
        title: "Cocina equipada",
        description: "Un ambiente practico para organizar comidas y atender cada reunion con comodidad."
      }
    ]
  }
];
const experienceVideos = [
  { src: "experiencia-01.mp4", mobileSrc: "experiencia-01-mobile.mp4", poster: "experiencia-01-poster.webp", alt: "Decoracion de cumpleanos en Beach House" },
  { src: "experiencia-02.mp4", mobileSrc: "experiencia-02-mobile.mp4", poster: "experiencia-02-poster.webp", alt: "Bar preparado para una celebracion en Beach House" },
  { src: "experiencia-03.mp4", mobileSrc: "experiencia-03-mobile.mp4", poster: "experiencia-03-poster.webp", alt: "Invitados celebrando en Beach House" },
  { src: "experiencia-04.mp4", mobileSrc: "experiencia-04-mobile.mp4", poster: "experiencia-04-poster.webp", alt: "Fiesta decorada en la terraza de Beach House" },
  { src: "experiencia-05.mp4", mobileSrc: "experiencia-05-mobile.mp4", poster: "experiencia-05-poster.webp", alt: "Amigos disfrutando una celebracion en Beach House" }
];
const packageCatalog = {
  "half-day": {
    number: "PAQUETE 1",
    code: "P1",
    title: "1/2 Dia",
    reservationValue: "1/2 Dia",
    checkIn: "11:30 am",
    checkOut: "10:00 pm",
    includes: ["Uso privado de la casa", "Piscina privada", "Parrilla", "Cocina equipada"],
    spaces: ["Piscina", "Patio", "Terraza"],
    guarantee: "S/ 350 reembolsables al finalizar la estadia, previa verificacion de los espacios.",
    people: "Hasta 15 personas.",
    peopleNote: "En caso de desear mas personas, comunicarlo.",
    prices: [
      { label: "Lunes a jueves", value: "S/ 420" },
      { label: "Viernes a domingo", value: "S/ 450" }
    ]
  },
  "one-day": {
    number: "PAQUETE 2",
    code: "P2",
    title: "1 Dia - 24 horas",
    reservationValue: "24 horas",
    checkIn: "11:30 am",
    checkOut: "11:30 am del dia siguiente",
    includes: ["Casa privada por 24 horas", "Una noche de alojamiento", "Habitaciones", "Cocina equipada"],
    spaces: ["Piscina", "Patio", "Terraza", "Habitaciones"],
    guarantee: "S/ 350 reembolsables al finalizar la estadia, previa verificacion de los espacios.",
    people: "Hasta 17 personas.",
    peopleNote: "En caso de desear de 3 a 5 personas mas, esta sujeto a coordinacion.",
    prices: [
      { label: "Lunes a jueves", value: "S/ 550" },
      { label: "Viernes a domingo", value: "S/ 650" }
    ]
  },
  "two-days": {
    number: "PAQUETE 3",
    code: "P3",
    title: "2 Dias / 1 Noche",
    reservationValue: "2 dias, 1 noche",
    checkIn: "11:30 am",
    checkOut: "10:00 pm del segundo dia",
    includes: ["Una noche de alojamiento", "Habitaciones", "Piscina privada", "Parrilla"],
    spaces: ["Piscina", "Patio", "Terraza", "Cocina", "Habitaciones"],
    guarantee: "S/ 450 reembolsables al finalizar la estadia, previa verificacion de los espacios.",
    people: "Hasta 20 personas.",
    peopleNote: "En caso de desear mas personas, comunicarlo.",
    prices: [
      { label: "Lunes a jueves", value: "S/ 850" },
      { label: "Viernes a domingo", value: "S/ 980" }
    ]
  },
  "three-days": {
    number: "PAQUETE 4",
    code: "P4",
    title: "3 Dias / 2 Noches",
    reservationValue: "3 dias, 2 noches",
    checkIn: "11:30 am",
    checkOut: "10:00 pm del tercer dia",
    includes: ["Dos noches de alojamiento", "Habitaciones", "Cocina equipada", "Areas sociales"],
    spaces: ["Piscina", "Patio", "Terraza", "Cocina", "Habitaciones", "Sala lounge"],
    guarantee: "S/ 550 reembolsables al finalizar la estadia, previa verificacion de los espacios.",
    people: "Hasta 20 personas.",
    peopleNote: "En caso de desear mas personas, comunicarlo.",
    prices: [
      { label: "Lunes a jueves", value: "S/ 970" },
      { label: "Viernes a domingo", value: "S/ 1,250" }
    ]
  }
};

function byId(id) {
  return document.getElementById(id);
}

function imageUrl(filename) {
  return `assets/img/${encodeURIComponent(filename)}`;
}

function videoUrl(filename) {
  return `assets/video/${encodeURIComponent(filename)}`;
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
  ["footerWhatsapp", "floatWhatsapp"].forEach((id) => {
    const element = byId(id);
    if (!element) return;
    const source = trackingSource(element.dataset.source || id);
    element.href = whatsAppUrl(generalWhatsAppMessage(source));
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

  const gallerySequence = galleryCatalog.flatMap((category) =>
    category.images.map((image, imageIndex) => ({
      ...image,
      categoryId: category.id,
      imageIndex
    }))
  );
  let slides = [];
  let currentIndex = 0;
  let lightboxIndex = 0;
  let autoPlayInterval;
  let descriptionTimeout;

  function currentGalleryItem() {
    return gallerySequence[currentIndex];
  }

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
    slidesContainer.innerHTML = gallerySequence.map((image) => `
      <div class="shuffle-slide">
        <picture>
          ${image.mobileSrc ? `<source media="(max-width: 768px)" srcset="${imageUrl(image.mobileSrc)}">` : ""}
          <img src="${imageUrl(image.src)}" alt="${image.alt}">
        </picture>
        <div class="slide-info">
          <h3 class="font-pacifico text-gold">${image.title}</h3>
        </div>
      </div>
    `).join("");
    slides = Array.from(slidesContainer.querySelectorAll(".shuffle-slide"));
  }

  function updateCategoryNav() {
    const activeCategoryId = currentGalleryItem().categoryId;
    galleryNav.querySelectorAll("[data-gallery-category]").forEach((button) => {
      const isActive = button.dataset.galleryCategory === activeCategoryId;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  function updateControlVisibility() {
    const hasMultipleImages = gallerySequence.length > 1;
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
    updateCategoryNav();
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
    if (gallerySequence.length < 2) return;
    autoPlayInterval = window.setInterval(nextSlide, 2000);
  }

  function stopAutoPlay() {
    window.clearInterval(autoPlayInterval);
  }

  function updateLightbox() {
    const image = gallerySequence[lightboxIndex];

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
    const categoryIndex = gallerySequence.findIndex((item) => item.categoryId === categoryId);
    if (categoryIndex === -1) return;

    currentIndex = categoryIndex;
    lightboxIndex = currentIndex;
    updateSlides();
    startAutoPlay();
  }

  function goToNextSlide() {
    nextSlide();
    startAutoPlay();
  }

  function goToPrevSlide() {
    prevSlide();
    startAutoPlay();
  }

  btnNext.addEventListener("click", goToNextSlide);
  btnPrev.addEventListener("click", goToPrevSlide);
  enableTouchSwipe(carouselContainer, goToNextSlide, goToPrevSlide);
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
  renderSlides();
  updateControlVisibility();
  updateSlides();
  startAutoPlay();
}

function initExperiencesCarousel() {
  const carousel = byId("experiencesCarousel");
  const slidesContainer = byId("experiencesSlides");
  const prevButton = byId("experiencesPrev");
  const nextButton = byId("experiencesNext");
  const expandButton = byId("experiencesExpand");
  const lightboxElement = byId("experiencesLightbox");
  const lightboxVideo = byId("experiencesLightboxVideo");
  const lightboxPrev = byId("experiencesLightboxPrev");
  const lightboxNext = byId("experiencesLightboxNext");

  if (!carousel || !slidesContainer || !prevButton || !nextButton || !expandButton || !lightboxElement || !lightboxVideo || !lightboxPrev || !lightboxNext) return;

  slidesContainer.innerHTML = experienceVideos.map((video) => `
    <div class="experiences-slide">
      <video poster="${videoUrl(video.poster)}" aria-label="${video.alt}"
        preload="none" playsinline muted controls controlslist="nofullscreen nodownload noremoteplayback"
        disablepictureinpicture></video>
    </div>
  `).join("");

  const slides = Array.from(slidesContainer.querySelectorAll(".experiences-slide"));
  const videos = slides.map((slide) => slide.querySelector("video"));
  const mobileVideoQuery = window.matchMedia("(max-width: 768px)");
  videos.forEach((video, index) => assignVideoSource(video, index));
  let currentIndex = 0;
  let lightboxIndex = 0;
  let isLightboxOpen = false;
  let isSyncingAudio = false;
  let sharedMuted = true;
  let sharedVolume = 1;
  let isCarouselVisible = true;
  let shouldAutoPlay = false;
  let hasViewportAutoPlayed = false;
  let wasManuallyPaused = false;
  let isResettingVideo = false;
  let isViewportAutoPlayAttempt = false;
  let controlsRevealTimer = null;
  let lightboxControlsRevealTimer = null;
  let viewportAutoPlayTimer = null;
  let lastTouchSurfaceToggleAt = 0;

  function selectedVideoFilename(item) {
    return mobileVideoQuery.matches ? item.mobileSrc : item.src;
  }

  function selectedVideoSrc(index) {
    return videoUrl(selectedVideoFilename(experienceVideos[index]));
  }

  function assignVideoSource(video, index) {
    video.dataset.src = selectedVideoSrc(index);
  }

  function ensureVideoLoaded(video) {
    if (!video.getAttribute("src")) {
      video.src = video.dataset.src;
      video.load();
    }
  }

  function preloadVideo(index) {
    if (navigator.connection?.saveData) return;

    const video = videos[index];
    ensureVideoLoaded(video);
  }

  function preloadNextVideo() {
    preloadVideo((currentIndex + 1) % videos.length);
  }

  function refreshVideoSources() {
    videos.forEach((video, index) => {
      const nextSource = selectedVideoSrc(index);
      if (video.dataset.src === nextSource) return;

      const wasActive = index === currentIndex;
      const shouldResume = wasActive && shouldAutoPlay && !isLightboxOpen;
      resetVideo(video);
      video.dataset.src = nextSource;
      if (shouldResume) playVideo(video);
    });

    if (isLightboxOpen) {
      updateLightbox();
    }
  }

  function enableAudioFromUserGesture(video) {
    sharedMuted = false;
    video.muted = false;
    video.volume = sharedVolume;
  }

  function resetVideo(video, unload = true) {
    isResettingVideo = true;
    video.pause();
    try {
      video.currentTime = 0;
    } catch {
      // The video may not have a source yet because loading is deferred.
    }

    if (unload) {
      video.removeAttribute("src");
      video.load();
    }
    isResettingVideo = false;
  }

  function playVideo(video) {
    ensureVideoLoaded(video);
    video.muted = isCarouselVisible ? sharedMuted : true;
    video.volume = sharedVolume;
    const playAttempt = video.play();
    if (playAttempt) {
      playAttempt
        .then(() => {})
        .catch(() => {
          shouldAutoPlay = false;
          isViewportAutoPlayAttempt = false;
        });
    }
  }

  function playVideoMutedFromViewport() {
    const video = videos[currentIndex];
    sharedMuted = true;
    video.muted = true;
    shouldAutoPlay = true;
    isViewportAutoPlayAttempt = true;
    playVideo(video);
    revealControlsTemporarily();
  }

  function toggleVideoFromSurface(event, video) {
    const rect = video.getBoundingClientRect();
    const nativeControlsZone = 72;

    if (rect.bottom - event.clientY <= nativeControlsZone) return false;

    if (video.paused) {
      shouldAutoPlay = true;
      wasManuallyPaused = false;
      enableAudioFromUserGesture(video);
      playVideo(video);
      if (isLightboxOpen) revealLightboxControlsTemporarily();
      else revealControlsTemporarily();
      return true;
    }

    shouldAutoPlay = false;
    wasManuallyPaused = true;
    video.pause();
    if (isLightboxOpen) revealLightboxControlsTemporarily();
    else revealControlsTemporarily();
    return true;
  }

  function handleVideoPointerUp(event, video) {
    if (event.pointerType === "mouse") return;

    if (toggleVideoFromSurface(event, video)) {
      lastTouchSurfaceToggleAt = Date.now();
      event.preventDefault();
    }
  }

  function handleVideoClick(event, video) {
    if (Date.now() - lastTouchSurfaceToggleAt < 350) return;

    toggleVideoFromSurface(event, video);
  }

  function applyAudioState() {
    isSyncingAudio = true;
    [...videos, lightboxVideo].forEach((video) => {
      video.muted = isCarouselVisible ? sharedMuted : true;
      video.volume = sharedVolume;
    });
    isSyncingAudio = false;
  }

  function syncAudioState(sourceVideo) {
    if (isSyncingAudio) return;

    sharedMuted = sourceVideo.muted;
    sharedVolume = sourceVideo.volume;
    isSyncingAudio = true;
    [...videos, lightboxVideo].forEach((video) => {
      if (video === sourceVideo) return;
      video.muted = sharedMuted;
      video.volume = sharedVolume;
    });
    isSyncingAudio = false;
  }

  function markPlaybackStarted(video) {
    if (isResettingVideo) return;
    shouldAutoPlay = true;
    if (isViewportAutoPlayAttempt) {
      isViewportAutoPlayAttempt = false;
    } else if (isCarouselVisible) {
      enableAudioFromUserGesture(video);
    }
    if (isLightboxOpen) revealLightboxControlsTemporarily();
    else revealControlsTemporarily();
    if (!isLightboxOpen) preloadNextVideo();
  }

  function markPlaybackPaused(video) {
    if (isResettingVideo) return;
    if (video.ended) return;
    if ((isLightboxOpen && video === lightboxVideo) || (!isLightboxOpen && video === videos[currentIndex])) {
      shouldAutoPlay = false;
      wasManuallyPaused = true;
      if (isLightboxOpen) revealLightboxControlsTemporarily();
      else revealControlsTemporarily();
    }
  }

  function revealControlsTemporarily() {
    carousel.classList.add("controls-visible");
    window.clearTimeout(controlsRevealTimer);
    controlsRevealTimer = window.setTimeout(() => {
      carousel.classList.remove("controls-visible");
    }, 2800);
  }

  function revealLightboxControlsTemporarily() {
    lightboxElement.classList.add("controls-visible");
    window.clearTimeout(lightboxControlsRevealTimer);
    lightboxControlsRevealTimer = window.setTimeout(() => {
      lightboxElement.classList.remove("controls-visible");
    }, 2800);
  }

  function updateSlides() {
    slides.forEach((slide, index) => {
      const isActive = index === currentIndex;
      slide.classList.toggle("active", isActive);
      if (!isActive) resetVideo(videos[index]);
    });

    if (!isLightboxOpen && shouldAutoPlay) playVideo(videos[currentIndex]);
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlides();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlides();
  }

  function updateLightbox() {
    const item = experienceVideos[lightboxIndex];
    resetVideo(lightboxVideo);
    lightboxVideo.dataset.src = videoUrl(selectedVideoFilename(item));
    lightboxVideo.poster = videoUrl(item.poster);
    lightboxVideo.setAttribute("aria-label", item.alt);
    if (shouldAutoPlay) playVideo(lightboxVideo);
  }

  function nextLightboxSlide() {
    lightboxIndex = (lightboxIndex + 1) % experienceVideos.length;
    updateLightbox();
  }

  function prevLightboxSlide() {
    lightboxIndex = (lightboxIndex - 1 + experienceVideos.length) % experienceVideos.length;
    updateLightbox();
  }

  videos.forEach((video) => {
    video.addEventListener("ended", nextSlide);
    video.addEventListener("pointerdown", () => ensureVideoLoaded(video), { passive: true });
    video.addEventListener("pointerup", (event) => handleVideoPointerUp(event, video));
    video.addEventListener("click", (event) => handleVideoClick(event, video));
    video.addEventListener("focus", () => ensureVideoLoaded(video));
    video.addEventListener("play", () => markPlaybackStarted(video));
    video.addEventListener("pause", () => markPlaybackPaused(video));
    video.addEventListener("volumechange", () => syncAudioState(video));
  });
  prevButton.addEventListener("click", prevSlide);
  nextButton.addEventListener("click", nextSlide);
  mobileVideoQuery.addEventListener("change", refreshVideoSources);
  carousel.addEventListener("pointerdown", revealControlsTemporarily, { passive: true });
  enableTouchSwipe(carousel, nextSlide, prevSlide);
  expandButton.addEventListener("click", () => {
    lightboxIndex = currentIndex;
    bootstrap.Modal.getOrCreateInstance(lightboxElement).show();
  });
  lightboxPrev.addEventListener("click", prevLightboxSlide);
  lightboxNext.addEventListener("click", nextLightboxSlide);
  lightboxVideo.addEventListener("ended", nextLightboxSlide);
  lightboxVideo.addEventListener("pointerdown", () => ensureVideoLoaded(lightboxVideo), { passive: true });
  lightboxVideo.addEventListener("pointerup", (event) => handleVideoPointerUp(event, lightboxVideo));
  lightboxVideo.addEventListener("click", (event) => handleVideoClick(event, lightboxVideo));
  lightboxVideo.addEventListener("focus", () => ensureVideoLoaded(lightboxVideo));
  lightboxVideo.addEventListener("play", () => markPlaybackStarted(lightboxVideo));
  lightboxVideo.addEventListener("pause", () => markPlaybackPaused(lightboxVideo));
  lightboxVideo.addEventListener("volumechange", () => syncAudioState(lightboxVideo));
  enableTouchSwipe(lightboxElement, nextLightboxSlide, prevLightboxSlide);
  lightboxElement.addEventListener("pointerdown", revealLightboxControlsTemporarily, { passive: true });
  lightboxElement.addEventListener("show.bs.modal", () => {
    isLightboxOpen = true;
    videos.forEach(resetVideo);
    document.body.classList.add("experiences-lightbox-open");
    updateLightbox();
  });
  lightboxElement.addEventListener("hidden.bs.modal", () => {
    isLightboxOpen = false;
    resetVideo(lightboxVideo);
    lightboxVideo.removeAttribute("src");
    lightboxVideo.load();
    lightboxElement.classList.remove("controls-visible");
    document.body.classList.remove("experiences-lightbox-open");
    updateSlides();
  });
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    isCarouselVisible = entry.isIntersecting && entry.intersectionRatio >= 0.45;
    window.clearTimeout(viewportAutoPlayTimer);

    if (isCarouselVisible && !isLightboxOpen && !hasViewportAutoPlayed && !wasManuallyPaused && !navigator.connection?.saveData) {
      viewportAutoPlayTimer = window.setTimeout(() => {
        if (!isCarouselVisible || isLightboxOpen || hasViewportAutoPlayed || wasManuallyPaused) return;
        hasViewportAutoPlayed = true;
        playVideoMutedFromViewport();
      }, 1000);
    }

    applyAudioState();
  }, { threshold: [0, 0.45] });
  visibilityObserver.observe(carousel);

  const preloadObserver = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;

    preloadVideo(currentIndex);
    preloadObserver.disconnect();
  }, { rootMargin: "700px 0px", threshold: 0 });
  preloadObserver.observe(carousel);

  updateSlides();
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

let reservationSource = "web-general";

function openReservationModal(packageName = "", source = "web-general") {
  reservationSource = source;
  byId("reservationPackage").value = packageName;
  byId("reservationDate").value = "";
  byId("reservationSubmit").disabled = true;
  hideInlineAlert("reservationAlert");
  showBootstrapModal("reservationModal");
}

function initPricingCarouselTouchPause() {
  const carouselElement = byId("carruselPrecios");
  if (!carouselElement || !window.bootstrap) return;

  const carousel = bootstrap.Carousel.getOrCreateInstance(carouselElement, {
    interval: 5000,
    ride: "carousel",
    pause: false,
    touch: true
  });
  let resumeTimer = null;

  function isTouchPointer(event) {
    return event.pointerType === "touch" || event.pointerType === "pen";
  }

  function clearResumeTimer() {
    if (resumeTimer) {
      window.clearTimeout(resumeTimer);
      resumeTimer = null;
    }
  }

  function scheduleResume() {
    clearResumeTimer();
    resumeTimer = window.setTimeout(() => {
      carousel.cycle();
      resumeTimer = null;
    }, 650);
  }

  carouselElement.addEventListener("pointerdown", (event) => {
    if (!isTouchPointer(event)) return;
    clearResumeTimer();
    carousel.pause();
  }, { passive: true });

  ["pointerup", "pointercancel", "pointerleave"].forEach((eventName) => {
    carouselElement.addEventListener(eventName, (event) => {
      if (!isTouchPointer(event)) return;
      scheduleResume();
    }, { passive: true });
  });
}

function setupPackageDetails() {
  const modalElement = byId("packageDetailsModal");
  const reserveButton = byId("packageDetailsReserve");
  const carouselElement = byId("carruselPrecios");

  if (!modalElement || !reserveButton || !carouselElement || !window.bootstrap) return;

  const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
  const carousel = bootstrap.Carousel.getOrCreateInstance(carouselElement, {
    interval: 5000,
    ride: "carousel",
    pause: false,
    touch: true
  });
  let activePackage = null;
  let pendingReservation = "";

  function renderList(elementId, items) {
    const list = byId(elementId);
    const fragment = document.createDocumentFragment();

    items.forEach((item) => {
      const listItem = document.createElement("li");
      const icon = document.createElement("i");
      const text = document.createElement("span");
      icon.className = "bi bi-check2";
      text.textContent = item;
      listItem.append(icon, text);
      fragment.append(listItem);
    });

    list.replaceChildren(fragment);
  }

  function renderPrices(prices) {
    const container = byId("packageDetailsPrices");
    const fragment = document.createDocumentFragment();

    prices.forEach((price) => {
      const row = document.createElement("div");
      const label = document.createElement("span");
      const value = document.createElement("strong");
      label.textContent = price.label;
      value.textContent = price.value;
      row.append(label, value);
      fragment.append(row);
    });

    container.replaceChildren(fragment);
  }

  function openDetails(packageId) {
    const packageData = packageCatalog[packageId];
    if (!packageData) return;

    activePackage = packageData;
    byId("packageDetailsNumber").textContent = packageData.number;
    byId("packageDetailsTitle").textContent = packageData.title;
    byId("packageDetailsCheckIn").textContent = packageData.checkIn;
    byId("packageDetailsCheckOut").textContent = packageData.checkOut;
    byId("packageDetailsGuarantee").textContent = packageData.guarantee;
    byId("packageDetailsPeople").textContent = packageData.people;
    byId("packageDetailsPeopleNote").textContent = packageData.peopleNote;
    renderList("packageDetailsIncludes", packageData.includes);
    renderList("packageDetailsSpaces", packageData.spaces);
    renderPrices(packageData.prices);
    modal.show();
  }

  document.querySelectorAll(".package-details-trigger").forEach((button) => {
    button.addEventListener("click", () => openDetails(button.dataset.packageId));
  });

  reserveButton.addEventListener("click", () => {
    if (!activePackage) return;
    pendingReservation = activePackage.reservationValue;
    modal.hide();
  });

  modalElement.addEventListener("show.bs.modal", () => {
    carousel.pause();
  });

  modalElement.addEventListener("hidden.bs.modal", () => {
    carousel.cycle();
    if (!pendingReservation) return;

    const packageName = pendingReservation;
    pendingReservation = "";
    openReservationModal(packageName, `package-details-${activePackage.code.toLowerCase()}`);
  });
}

function setupReservationFlow() {
  const reservationDate = byId("reservationDate");
  reservationDate.min = todayLocalIso();

  document.querySelectorAll(".reserve-trigger").forEach((button) => {
    button.addEventListener("click", () => {
      const packageName = button.dataset.package || "";
      const buttonSource = button.dataset.source || "web-general";

      if (!packageName) {
        const source = trackingSource(buttonSource);
        window.open(
          whatsAppUrl(generalWhatsAppMessage(source)),
          "_blank",
          "noopener,noreferrer"
        );
        return;
      }

      openReservationModal(
        packageName,
        buttonSource
      );
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
    const source = trackingSource(reservationSource);
    const message = packageWhatsAppMessage(packageType, formattedDate, source);
    window.open(whatsAppUrl(message), "_blank", "noopener,noreferrer");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setStaticWhatsAppLinks();
  initHeroLightbox();
  initShuffleGallery();
  initExperiencesCarousel();
  initPricingCarouselTouchPause();
  setupPackageDetails();
  setupReservationFlow();
});

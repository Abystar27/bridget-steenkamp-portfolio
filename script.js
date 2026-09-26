// Mobile navigation toggle
const navToggle = document.getElementById("navToggle");
const primaryNav = document.getElementById("primaryNav");

if (navToggle && primaryNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close the menu after choosing a link (mobile)
  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      primaryNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Booking form handling
const bookingForm = document.getElementById("bookingForm");
const clearFormBtn = document.getElementById("clearForm");
const statusText = document.getElementById("statusText");

if (bookingForm && statusText) {
  bookingForm.addEventListener("submit", (event) => {
    const name = document.getElementById("bookingName").value.trim();
    const email = document.getElementById("bookingEmail").value.trim();
    const type = document.getElementById("bookingType").value;

    statusText.classList.remove("error");

    if (!name || !email || !type) {
      event.preventDefault();
      statusText.textContent = "Please fill in the required fields.";
      statusText.classList.add("error");
      return;
    }

    // Valid — let the form submit normally to Formspree (see the
    // action="" attribute on the <form> tag in index.html).
    statusText.textContent = "Sending your enquiry...";
  });
}

if (clearFormBtn && bookingForm && statusText) {
  clearFormBtn.addEventListener("click", () => {
    bookingForm.reset();
    statusText.textContent = "";
    statusText.classList.remove("error");
  });
}

// Lightbox for gallery images
const lightboxOverlay = document.getElementById("lightboxOverlay");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");
let lightboxLastTrigger = null;

function openLightbox(trigger) {
  const fullSrc = trigger.getAttribute("data-full");
  const caption = trigger.getAttribute("data-caption") || "";
  if (!fullSrc || !lightboxOverlay) return;

  lightboxLastTrigger = trigger;
  lightboxImage.src = fullSrc;
  lightboxImage.alt = caption;
  lightboxCaption.textContent = caption;
  lightboxOverlay.hidden = false;
  lightboxClose.focus();
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightboxOverlay) return;
  lightboxOverlay.hidden = true;
  lightboxImage.src = "";
  document.body.style.overflow = "";
  if (lightboxLastTrigger) lightboxLastTrigger.focus();
}

document.querySelectorAll(".lightbox-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => openLightbox(trigger));
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightboxOverlay) {
  lightboxOverlay.addEventListener("click", (event) => {
    if (event.target === lightboxOverlay) closeLightbox();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightboxOverlay && !lightboxOverlay.hidden) {
    closeLightbox();
  }
});
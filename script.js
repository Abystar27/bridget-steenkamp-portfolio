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

// Site search
// A small hand-picked index of the real content on the page. Add a line
// here whenever a new section, publication, video, or milestone goes in.
const searchIndex = [
  { title: "Profile", href: "#about", snippet: "Bridget Moira Steenkamp — neurodivergent artist, art tutor, children's chaplain, researcher and sole trader." },
  { title: "EcoHistories", href: "#ecohistories", snippet: "Storytelling rooted in museums, bringing objects, place and ecology together." },
  { title: "Slow Workshops", href: "#workshops", snippet: "A distinct, hands-on practice — a slower, participatory way of working." },
  { title: "Slow-Eco Textile Workshop", href: "#workshops", snippet: "Co-led with textile artist Yíímiiká, exploring Àdìrẹ Ẹlẹ̀kọ resist-dyeing with cassava-starch paste." },
  { title: "UR Neurobeautiful", href: "#media", snippet: "Solo exhibition at Whitelands College Chapel — exploring variety, embracing neurobeauty." },
  { title: "Tales in Reception", href: "#research", snippet: "A collection of short essays on neurodivergence, dyslexia, ADHD and sensory processing." },
  { title: "Food for Fashion: From Cassava Paste to Circular Fashion", href: "#research", snippet: "University of Roehampton Primary Schools Partnership Newsletter, co-authored article." },
  { title: "The Nettles Project Roehampton", href: "#media", snippet: "YouTube talk / workshop recording." },
  { title: "Gallery", href: "#gallery", snippet: "Portraits, workshop and conference moments." },
  { title: "Booking", href: "#contact", snippet: "Get in touch for EcoHistories sessions and Slow Workshops bookings." },
];

const siteSearchInput = document.getElementById("siteSearchInput");
const siteSearchResults = document.getElementById("siteSearchResults");

function renderSearchResults(query) {
  if (!siteSearchResults) return;

  const trimmed = query.trim().toLowerCase();
  if (!trimmed) {
    siteSearchResults.hidden = true;
    siteSearchResults.innerHTML = "";
    return;
  }

  const matches = searchIndex.filter((item) => {
    const haystack = (item.title + " " + item.snippet).toLowerCase();
    return haystack.includes(trimmed);
  });

  siteSearchResults.innerHTML = "";

  if (matches.length === 0) {
    const empty = document.createElement("li");
    empty.className = "site-search-empty";
    empty.textContent = "No matches found.";
    siteSearchResults.appendChild(empty);
    siteSearchResults.hidden = false;
    return;
  }

  matches.slice(0, 8).forEach((item) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = item.href;

    const titleEl = document.createElement("span");
    titleEl.className = "site-search-result-title";
    titleEl.textContent = item.title;

    const snippetEl = document.createElement("span");
    snippetEl.className = "site-search-result-snippet";
    snippetEl.textContent = item.snippet;

    a.appendChild(titleEl);
    a.appendChild(snippetEl);
    li.appendChild(a);
    siteSearchResults.appendChild(li);

    a.addEventListener("click", () => {
      siteSearchResults.hidden = true;
      siteSearchInput.value = "";
    });
  });

  siteSearchResults.hidden = false;
}

if (siteSearchInput && siteSearchResults) {
  siteSearchInput.addEventListener("input", (event) => {
    renderSearchResults(event.target.value);
  });

  siteSearchInput.addEventListener("focus", (event) => {
    if (event.target.value.trim()) renderSearchResults(event.target.value);
  });

  document.addEventListener("click", (event) => {
    if (
      !siteSearchInput.contains(event.target) &&
      !siteSearchResults.contains(event.target)
    ) {
      siteSearchResults.hidden = true;
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !siteSearchResults.hidden) {
      siteSearchResults.hidden = true;
      siteSearchInput.blur();
    }
  });
}
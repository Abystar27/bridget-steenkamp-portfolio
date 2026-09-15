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
    event.preventDefault();

    const name = document.getElementById("bookingName").value.trim();
    const email = document.getElementById("bookingEmail").value.trim();
    const type = document.getElementById("bookingType").value;

    statusText.classList.remove("error");

    if (!name || !email || !type) {
      statusText.textContent = "Please fill in the required fields.";
      statusText.classList.add("error");
      return;
    }

    statusText.textContent =
      "Enquiry prepared. Connect this form to an email service or backend to actually send it.";

    // Example payload once a backend/email service is connected:
    // const message = document.getElementById("bookingMessage").value.trim();
    // fetch("/send-enquiry", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ name, email, type, message }),
    // });
  });
}

if (clearFormBtn && bookingForm && statusText) {
  clearFormBtn.addEventListener("click", () => {
    bookingForm.reset();
    statusText.textContent = "";
    statusText.classList.remove("error");
  });
}
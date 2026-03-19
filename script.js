const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const quoteForm = document.querySelector("#quote-form");
const quotePreview = document.querySelector("#quote-preview");
const copyButton = document.querySelector("#copy-quote");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    siteNav.classList.toggle("is-open");
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("is-open");
    });
  });
}

if (quoteForm && quotePreview && copyButton) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(quoteForm);
    const name = formData.get("name")?.toString().trim() || "Customer";
    const contact = formData.get("contact")?.toString().trim() || "No contact provided";
    const jobType = formData.get("jobType")?.toString().trim() || "18-yard dumpster rental";
    const timeline = formData.get("timeline")?.toString().trim() || "Not specified";
    const location = formData.get("location")?.toString().trim() || "Location not provided";
    const details = formData.get("details")?.toString().trim() || "No additional details provided.";

    const message = [
      "Hi Dumpster Trash Hounds, I need a quote.",
      `Name: ${name}`,
      `Contact: ${contact}`,
      `Job Type: ${jobType}`,
      `Timeline: ${timeline}`,
      `Location: ${location}`,
      `Details: ${details}`,
      "Phone: (574) 341-9299",
      "Reply to: dumpstertrashhounds@gmail.com",
    ].join("\n");

    quotePreview.textContent = message;
    copyButton.disabled = false;
    copyButton.dataset.message = message;
  });

  copyButton.addEventListener("click", async () => {
    const message = copyButton.dataset.message;
    if (!message) {
      return;
    }

    try {
      await navigator.clipboard.writeText(message);
      copyButton.textContent = "Copied";
      window.setTimeout(() => {
        copyButton.textContent = "Copy Message";
      }, 1500);
    } catch {
      copyButton.textContent = "Copy Failed";
      window.setTimeout(() => {
        copyButton.textContent = "Copy Message";
      }, 1500);
    }
  });
}

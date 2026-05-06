const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const toast = document.querySelector(".toast");

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll(".copy-email").forEach((button) => {
  button.addEventListener("click", async () => {
    const email = button.dataset.email || "chriswangjob@163.com";
    const isEnglishPage = document.documentElement.lang.startsWith("en");

    try {
      await navigator.clipboard.writeText(email);
      showToast(isEnglishPage ? "Email copied" : "邮箱已复制");
    } catch (error) {
      const tempInput = document.createElement("input");
      tempInput.value = email;
      tempInput.setAttribute("readonly", "");
      tempInput.style.position = "absolute";
      tempInput.style.left = "-9999px";

      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      tempInput.remove();

      showToast(isEnglishPage ? "Email copied" : "邮箱已复制");
    }
  });
});

document.querySelectorAll(".toggle-panel").forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.target;
    const panel = document.getElementById(targetId);

    if (!panel) return;

    const isOpen = panel.classList.toggle("open");
    const isEnglishPage = document.documentElement.lang.startsWith("en");

    button.textContent = isEnglishPage
      ? isOpen
        ? "Hide Diagram"
        : "Show Diagram"
      : isOpen
        ? "收起流程图"
        : "展开流程图";
  });
});

const revealItems = document.querySelectorAll(
  ".highlight-card, .experience-card, .demo-panel, .project-card, .skill-card, .education-card, .map-card, .contact-card"
);

revealItems.forEach((item) => item.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const sections = document.querySelectorAll("section[id]");
const menuLinks = document.querySelectorAll(
  ".nav-links a[href^='#'], .side-index a[href^='#']"
);

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const id = entry.target.getAttribute("id");

      menuLinks.forEach((link) => {
        const href = link.getAttribute("href");
        link.classList.toggle("active", href === `#${id}`);
      });
    });
  },
  {
    threshold: 0.35,
  }
);

sections.forEach((section) => activeObserver.observe(section));

window.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  body.classList.remove("nav-open");

  if (navToggle) {
    navToggle.setAttribute("aria-expanded", "false");
  }
});

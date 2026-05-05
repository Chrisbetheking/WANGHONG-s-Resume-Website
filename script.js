document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");
  const navLinks = document.querySelectorAll(".site-nav a");
  const body = document.body;
  const toast = document.querySelector(".toast");
  const year = document.querySelector("#current-year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("open");
      navToggle.classList.toggle("active", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
      body.classList.toggle("nav-open", isOpen);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("open");
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
        body.classList.remove("nav-open");
      });
    });
  }

  const showToast = (message) => {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => {
      toast.classList.remove("show");
    }, 1800);
  };

  document.querySelectorAll(".copy-email").forEach((button) => {
    button.addEventListener("click", async () => {
      const email = button.getAttribute("data-email") || "chriswangjob@163.com";

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          const textarea = document.createElement("textarea");
          textarea.value = email;
          textarea.setAttribute("readonly", "");
          textarea.style.position = "fixed";
          textarea.style.left = "-9999px";
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
        }

        const isEnglish = document.documentElement.lang.toLowerCase().startsWith("en");
        showToast(isEnglish ? "Email copied" : "邮箱已复制");
      } catch (error) {
        const isEnglish = document.documentElement.lang.toLowerCase().startsWith("en");
        showToast(isEnglish ? "Copy failed" : "复制失败");
      }
    });
  });

  document.querySelectorAll(".diagram-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target");
      const panel = targetId ? document.getElementById(targetId) : null;

      if (!panel) return;

      const isOpen = panel.classList.toggle("open");
      const isEnglish = document.documentElement.lang.toLowerCase().startsWith("en");

      if (isEnglish) {
        button.textContent = isOpen ? "Hide Diagram" : "Show Diagram";
      } else {
        button.textContent = isOpen ? "收起流程图" : "展开流程图";
      }
    });
  });

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("visible"));
  }

  const sections = document.querySelectorAll("main section[id]");
  const menuLinks = document.querySelectorAll(".site-nav a[href^='#']");

  if ("IntersectionObserver" in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const id = entry.target.getAttribute("id");

          menuLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        });
      },
      {
        threshold: 0.35,
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }
});

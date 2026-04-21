const header = document.getElementById("header");
const pageLoader = document.getElementById("pageLoader");
const menuToggle = document.getElementById("menuToggle");
const menuClose = document.getElementById("menuClose");
const menuDrawer = document.getElementById("menuDrawer");
const menuBackdrop = document.getElementById("menuBackdrop");
const drawerLinks = document.querySelectorAll(".drawer-link");
const reveals = document.querySelectorAll(".reveal");
const customSelects = document.querySelectorAll("[data-select]");
const whatsappTargets = document.querySelectorAll("[data-whatsapp-link]");

const whatsappMessage = "Quero meu catalogo profissional de im\u00f3veis + blog";
const whatsappUrl = `https://wa.me/5511964956563?text=${encodeURIComponent(whatsappMessage)}`;

whatsappTargets.forEach((link) => {
  link.setAttribute("href", whatsappUrl);
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noopener noreferrer");
});

const setHeaderState = () => {
  if (!header) {
    return;
  }

  header.classList.toggle("scrolled", window.scrollY > 16);
};

const closeDrawer = () => {
  if (!menuDrawer || !menuToggle || !menuBackdrop) {
    return;
  }

  menuDrawer.classList.remove("open");
  menuBackdrop.classList.remove("open");
  menuToggle.classList.remove("active");
  menuToggle.setAttribute("aria-expanded", "false");
  menuDrawer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("menu-open");
};

const openDrawer = () => {
  if (!menuDrawer || !menuToggle || !menuBackdrop) {
    return;
  }

  menuDrawer.classList.add("open");
  menuBackdrop.classList.add("open");
  menuToggle.classList.add("active");
  menuToggle.setAttribute("aria-expanded", "true");
  menuDrawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("menu-open");
};

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuDrawer.classList.contains("open");

    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });
}

if (menuClose) {
  menuClose.addEventListener("click", closeDrawer);
}

if (menuBackdrop) {
  menuBackdrop.addEventListener("click", closeDrawer);
}

drawerLinks.forEach((link) => {
  link.addEventListener("click", closeDrawer);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1024) {
    closeDrawer();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDrawer();
    closeAllSelects();
  }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

reveals.forEach((item) => observer.observe(item));

function closeAllSelects() {
  customSelects.forEach((select) => {
    select.classList.remove("open");
    const trigger = select.querySelector(".select-trigger");

    if (trigger) {
      trigger.setAttribute("aria-expanded", "false");
    }
  });
}

customSelects.forEach((select) => {
  const trigger = select.querySelector(".select-trigger");
  const hiddenInput = select.querySelector('input[type="hidden"]');
  const valueNode = select.querySelector(".select-value");
  const options = select.querySelectorAll(".select-option");

  if (!trigger || !hiddenInput || !valueNode || !options.length) {
    return;
  }

  trigger.addEventListener("click", () => {
    const willOpen = !select.classList.contains("open");
    closeAllSelects();
    select.classList.toggle("open", willOpen);
    trigger.setAttribute("aria-expanded", String(willOpen));
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      const nextValue = option.dataset.value || option.textContent.trim();

      options.forEach((item) => item.classList.remove("is-selected"));
      option.classList.add("is-selected");
      hiddenInput.value = nextValue;
      valueNode.textContent = nextValue;
      select.classList.remove("open");
      trigger.setAttribute("aria-expanded", "false");
    });
  });
});

document.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof Element)) {
    return;
  }

  if (!target.closest("[data-select]")) {
    closeAllSelects();
  }
});

const hideLoader = () => {
  if (!pageLoader) {
    document.body.classList.remove("is-loading");
    return;
  }

  pageLoader.classList.add("is-hidden");
  document.body.classList.remove("is-loading");
};

setHeaderState();
window.addEventListener("scroll", setHeaderState);
window.addEventListener("load", () => {
  window.setTimeout(hideLoader, 900);
});

window.setTimeout(hideLoader, 1800);

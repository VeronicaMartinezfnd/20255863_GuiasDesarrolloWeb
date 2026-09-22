document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  // Menú hamburguesa para pantallas pequeñas.
  if (menuButton && navMenu) {
    menuButton.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", isOpen);
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Scroll reveal usando IntersectionObserver.
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("visible"));
  }

  // Validación básica del formulario de contacto.
  const form = document.querySelector("#contact-form");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const fields = {
        nombre: document.querySelector("#nombre"),
        correo: document.querySelector("#correo"),
        asunto: document.querySelector("#asunto"),
        mensaje: document.querySelector("#mensaje")
      };

      const errors = {
        nombre: document.querySelector("#nombre-error"),
        correo: document.querySelector("#correo-error"),
        asunto: document.querySelector("#asunto-error"),
        mensaje: document.querySelector("#mensaje-error")
      };

      const status = document.querySelector("#form-status");
      let isValid = true;

      Object.keys(fields).forEach((key) => {
        errors[key].textContent = "";
        fields[key].removeAttribute("aria-invalid");
      });

      Object.keys(fields).forEach((key) => {
        if (!fields[key].value.trim()) {
          errors[key].textContent = "Este campo es obligatorio.";
          fields[key].setAttribute("aria-invalid", "true");
          isValid = false;
        }
      });

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (fields.correo.value.trim() && !emailPattern.test(fields.correo.value.trim())) {
        errors.correo.textContent = "Escribe un correo electrónico válido.";
        fields.correo.setAttribute("aria-invalid", "true");
        isValid = false;
      }

      if (isValid) {
        status.textContent = "¡Mensaje válido! Gracias por escribir a El Colón.";
        form.reset();
      } else {
        status.textContent = "Revisa los campos marcados antes de enviar.";
      }
    });
  }
});

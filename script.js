document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  setupMobileMenu();
  setupScrollReveal();
  setupContactForm();
  typingEffect();
});

/* ================================
   Resaltar link activo según la URL
================================ */
function setupNavigation() {
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage) link.classList.add("active");
  });
}

/* ================================
   Menú móvil
================================ */
function setupMobileMenu() {
  const menuToggle = document.createElement("div");
  menuToggle.className = "menu-toggle";
  menuToggle.innerHTML = "<span></span><span></span><span></span>";
  document.querySelector("header .header-content").appendChild(menuToggle);
  const nav = document.querySelector("nav");

  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });
}

/* ================================
   Animación al hacer scroll
================================ */
function setupScrollReveal() {
  const revealElements = document.querySelectorAll(".section, .service-card, .software-item, .contact-form, .team-card, .benefit-card");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("revealed");
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
  });
}

/* ================================
   Formulario de contacto
================================ */
function setupContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = form.querySelector("[name='name']").value.trim();
    const email = form.querySelector("[name='email']").value.trim();
    const message = form.querySelector("[name='message']").value.trim();
    if (!name || !email || !message) { showNotification("Por favor, completa todos los campos.", "error"); return; }
    if (!isValidEmail(email)) { showNotification("Por favor, ingresa un correo válido.", "error"); return; }

    const submitBtn = form.querySelector("button");
    submitBtn.textContent = "Enviando...";
    submitBtn.disabled = true;

    setTimeout(() => {
      showNotification("¡Mensaje enviado con éxito! Te contactaremos pronto.", "success");
      form.reset();
      submitBtn.textContent = "Enviar Mensaje";
      submitBtn.disabled = false;
    }, 2000);
  });
}
function isValidEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }

/* ================================
   Notificaciones
================================ */
function showNotification(message, type = "info") {
  const oldNotif = document.querySelector(".notification");
  if (oldNotif) oldNotif.remove();

  const notif = document.createElement("div");
  notif.className = `notification ${type}`;
  notif.textContent = message;
  notif.style.cssText = `
    position: fixed; top: 20px; right: 20px; padding: 12px 20px;
    border-radius: 8px; color: white; font-weight: 500; z-index: 9999;
    background: ${type === "success" ? "#00cc66" : type === "error" ? "#ff4444" : "#0080ff"};
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    transform: translateX(120%); transition: transform 0.4s ease;
  `;
  document.body.appendChild(notif);
  setTimeout(() => notif.style.transform = "translateX(0)", 50);
  setTimeout(() => notif.remove(), 4000);
}

/* ================================
   Typing effect en Hero
================================ */
function typingEffect() {
  const el = document.getElementById("typing-text");
  if (!el) return;
  const text = el.textContent;
  el.textContent = "";
  let i = 0;
  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(type, 60);
    }
  }
  type();
}


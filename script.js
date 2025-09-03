document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  setupMobileMenu();
  setupScrollReveal();
  setupContactForm();
  startHeroTyping();      // <- typing del título
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
    else link.classList.remove("active");
  });
}

/* ================================
   Menú móvil (usa tus estilos existentes)
================================ */
function setupMobileMenu() {
  const header = document.querySelector("header .header-content");
  const nav = document.querySelector("nav");
  if (!header || !nav) return;

  let menuToggle = document.querySelector(".menu-toggle");
  if (!menuToggle) {
    menuToggle = document.createElement("div");
    menuToggle.className = "menu-toggle";
    menuToggle.innerHTML = "<span></span><span></span><span></span>";
    header.appendChild(menuToggle);
  }

  menuToggle.onclick = () => {
    nav.classList.toggle("active");
    menuToggle.classList.toggle("active");
  };
}

/* ================================
   Animación al hacer scroll
================================ */
function setupScrollReveal() {
  const revealElements = document.querySelectorAll(".section, .service-card, .software-item, .contact-form, .tech-card");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("revealed"); });
  }, { threshold: 0.15 });

  revealElements.forEach(el => { el.classList.add("hidden"); observer.observe(el); });
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

    if (!name || !email || !message) return showNotification("Por favor, completa todos los campos.", "error");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showNotification("Por favor, ingresa un correo válido.", "error");

    const btn = form.querySelector("button");
    btn.textContent = "Enviando..."; btn.disabled = true;
    setTimeout(() => {
      showNotification("¡Mensaje enviado con éxito! Te contactaremos pronto.", "success");
      form.reset(); btn.textContent = "Enviar Mensaje"; btn.disabled = false;
    }, 1800);
  });
}

/* ================================
   Notificaciones
================================ */
function showNotification(message, type = "info") {
  const old = document.querySelector(".notification"); if (old) old.remove();
  const n = document.createElement("div");
  n.className = `notification ${type}`;
  n.textContent = message;
  n.style.cssText = `
    position:fixed;top:20px;right:20px;padding:12px 20px;border-radius:8px;
    color:#fff;font-weight:600;z-index:9999;background:${type==="success"?"#00cc66":type==="error"?"#ff4444":"#0080ff"};
    box-shadow:0 4px 12px rgba(0,0,0,.3);transform:translateX(120%);transition:transform .4s ease;`;
  document.body.appendChild(n);
  requestAnimationFrame(()=> n.style.transform="translateX(0)");
  setTimeout(()=> n.remove(), 4000);
}

/* ================================
   Typing del título del hero
================================ */
function startHeroTyping() {
  const title = document.querySelector(".hero-title");
  if (!title) return;
  const text = title.textContent.trim();
  title.textContent = "";
  let i = 0;
  const speed = 80; // velocidad del typing
  (function type() {
    if (i < text.length) {
      title.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  })();
}

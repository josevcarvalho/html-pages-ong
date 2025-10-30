(function () {
  const qs = (s, r = document) => r.querySelector(s);
  const qsa = (s, r = document) => Array.from(r.querySelectorAll(s));

  // Mobile menu toggle
  const toggle = qs(".navbar__toggle");
  const menu = qs(".menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      menu.classList.toggle("show");
    });
  }

  qsa(".has-submenu > a").forEach((link) => {
    link.addEventListener("click", (e) => {
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      if (!isDesktop) {
        e.preventDefault();
        const submenu = link.nextElementSibling;
        if (submenu)
          submenu.style.display =
            submenu.style.display === "block" ? "none" : "block";
      }
    });
  });

  qsa(".alert__close").forEach((btn) => {
    btn.addEventListener("click", () => {
      const alert = btn.closest(".alert");
      if (alert) alert.remove();
    });
  });

  function getToastContainer() {
    let c = qs(".toast-container");
    if (!c) {
      c = document.createElement("div");
      c.className = "toast-container";
      c.setAttribute("aria-live", "polite");
      c.setAttribute("aria-atomic", "true");
      document.body.appendChild(c);
    }
    return c;
  }
  function showToast(message = "Ação realizada com sucesso!") {
    const container = getToastContainer();
    const t = document.createElement("div");
    t.className = "toast";
    t.textContent = message;
    container.appendChild(t);
    // force reflow
    void t.offsetWidth;
    t.classList.add("show");
    setTimeout(() => {
      t.classList.remove("show");
    }, 2500);
    setTimeout(() => {
      t.remove();
    }, 3000);
  }
  qsa("[data-toast]").forEach((btn) =>
    btn.addEventListener("click", () => showToast())
  );

  const backdrop = qs("[data-backdrop]");
  function openModal(sel) {
    const modal = qs(sel);
    if (!modal) return;
    modal.style.display = "flex";
    if (backdrop) backdrop.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
  }
  function closeModal() {
    qsa(".modal").forEach((m) => {
      m.style.display = "none";
      m.setAttribute("aria-hidden", "true");
    });
    if (backdrop) backdrop.style.display = "none";
  }
  qsa("[data-open-modal]").forEach((btn) =>
    btn.addEventListener("click", () =>
      openModal(btn.getAttribute("data-open-modal"))
    )
  );
  qsa("[data-close-modal]").forEach((btn) =>
    btn.addEventListener("click", closeModal)
  );
  if (backdrop) backdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  const form = qs("#form-cadastro");
  if (form) {
    form.addEventListener("submit", (e) => {
      const inputs = qsa("input[required], input[pattern]", form);
      let valid = true;
      inputs.forEach((el) => {
        const isOk = el.checkValidity();
        el.classList.toggle("is-invalid", !isOk);
        el.classList.toggle("is-valid", isOk);
        const err = el.nextElementSibling;
        if (err && err.classList.contains("field-error")) {
          err.style.display = isOk ? "none" : "block";
        }
        if (!isOk) valid = false;
      });
      if (!valid) {
        e.preventDefault();
        showToast("Revise os campos destacados.");
      } else {
        e.preventDefault();
        showToast("Cadastro enviado com sucesso!");
        form.reset();
        inputs.forEach((el) => {
          el.classList.remove("is-valid", "is-invalid");
        });
      }
    });
  }
})();

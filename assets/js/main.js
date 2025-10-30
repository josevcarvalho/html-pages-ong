(function () {
  const qs = (s, r = document) => r.querySelector(s);
  const qsa = (s, r = document) => Array.from(r.querySelectorAll(s));
  const root = document.documentElement;
  const srStatus = () => qs("#sr-status");

  // THEME + CONTRAST
  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
    const btn = qs("[data-theme-toggle]");
    if (btn) btn.setAttribute("aria-pressed", String(theme === "dark"));
  }
  function applyContrast(mode) {
    if (mode === "high") {
      root.setAttribute("data-contrast", "high");
    } else {
      root.removeAttribute("data-contrast");
    }
    const btn = qs("[data-contrast-toggle]");
    if (btn) btn.setAttribute("aria-pressed", String(mode === "high"));
  }
  // init theme from storage or prefers-color-scheme
  try {
    const savedTheme = localStorage.getItem("pref-theme");
    const savedContrast = localStorage.getItem("pref-contrast");
    if (savedTheme) applyTheme(savedTheme);
    else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    )
      applyTheme("dark");
    if (savedContrast) applyContrast(savedContrast);
  } catch {}
  // toggles
  const themeToggle = qs("[data-theme-toggle]");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = root.getAttribute("data-theme") === "dark";
      const next = isDark ? null : "dark";
      applyTheme(next || "");
      try {
        if (next) localStorage.setItem("pref-theme", next);
        else localStorage.removeItem("pref-theme");
      } catch {}
      const status = srStatus();
      if (status)
        status.textContent =
          next === "dark" ? "Modo escuro ativado" : "Modo claro ativado";
    });
  }
  const contrastToggle = qs("[data-contrast-toggle]");
  if (contrastToggle) {
    contrastToggle.addEventListener("click", () => {
      const isHigh = root.getAttribute("data-contrast") === "high";
      const next = isHigh ? null : "high";
      applyContrast(next || "");
      try {
        if (next) localStorage.setItem("pref-contrast", next);
        else localStorage.removeItem("pref-contrast");
      } catch {}
      const status = srStatus();
      if (status)
        status.textContent =
          next === "high"
            ? "Alto contraste ativado"
            : "Alto contraste desativado";
    });
  }

  // Toast config
  const TOAST_DEFAULTS = { duration: 3000, position: "br", type: "info" }; // positions: br, bl, tr, tl
  function getToastContainer(position = TOAST_DEFAULTS.position) {
    let c = qs(".toast-container");
    if (!c) {
      c = document.createElement("div");
      c.className = "toast-container";
      c.setAttribute("aria-live", "polite");
      c.setAttribute("aria-atomic", "true");
      document.body.appendChild(c);
    }
    // apply position class
    c.classList.remove("br", "bl", "tr", "tl");
    c.classList.add(position);
    return c;
  }
  function showToast(message = "Ação realizada com sucesso!", opts = {}) {
    const {
      duration = TOAST_DEFAULTS.duration,
      position = TOAST_DEFAULTS.position,
      type = TOAST_DEFAULTS.type,
    } = opts;
    const container = getToastContainer(position);
    const t = document.createElement("div");
    t.className = `toast toast--${type}`;
    t.textContent = message;
    container.appendChild(t);
    // force reflow
    void t.offsetWidth;
    t.classList.add("show");
    const hideAt = Math.max(1000, duration - 500);
    setTimeout(() => t.classList.remove("show"), hideAt);
    setTimeout(() => t.remove(), duration);
  }

  // Mobile menu toggle
  const toggle = qs(".navbar__toggle");
  const menu = qs(".menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      menu.classList.toggle("show");
      // focus first menu link when opening
      if (!expanded) {
        const firstLink = menu.querySelector("a, button");
        if (firstLink) firstLink.focus();
      }
    });
  }

  // Submenu: click toggles on mobile, and keyboard support on desktop
  qsa(".has-submenu > a").forEach((link) => {
    const submenu = link.nextElementSibling;
    link.addEventListener("click", (e) => {
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      if (!isDesktop) {
        e.preventDefault();
        const expanded = link.getAttribute("aria-expanded") === "true";
        link.setAttribute("aria-expanded", String(!expanded));
        if (submenu) submenu.style.display = expanded ? "none" : "block";
      }
    });
    // keyboard: open/close with space/enter, navigate with arrows
    link.addEventListener("keydown", (e) => {
      const key = e.key;
      const isOpen = link.getAttribute("aria-expanded") === "true";
      const topItems = qsa(".menu > li > a");
      const idx = topItems.indexOf(link);
      if (["Enter", " "].includes(key)) {
        e.preventDefault();
        link.setAttribute("aria-expanded", String(!isOpen));
        if (!isOpen && submenu) {
          submenu.style.display = "block";
          const first = submenu.querySelector("a");
          if (first) first.focus();
        }
      } else if (key === "ArrowDown") {
        if (submenu) {
          e.preventDefault();
          link.setAttribute("aria-expanded", "true");
          submenu.style.display = "block";
          const first = submenu.querySelector("a");
          if (first) first.focus();
        }
      } else if (key === "ArrowUp") {
        if (submenu && isOpen) {
          e.preventDefault();
          const items = qsa("a", submenu);
          const last = items[items.length - 1];
          if (last) last.focus();
        }
      } else if (key === "ArrowRight" && topItems.length) {
        e.preventDefault();
        const next = topItems[(idx + 1) % topItems.length];
        if (next) next.focus();
      } else if (key === "ArrowLeft" && topItems.length) {
        e.preventDefault();
        const prev = topItems[(idx - 1 + topItems.length) % topItems.length];
        if (prev) prev.focus();
      } else if (key === "Escape") {
        if (submenu) {
          link.setAttribute("aria-expanded", "false");
          submenu.style.display = "none";
          link.focus();
        }
      } else if (key === "Home") {
        e.preventDefault();
        const firstTop = topItems[0];
        if (firstTop) firstTop.focus();
      } else if (key === "End") {
        e.preventDefault();
        const lastTop = topItems[topItems.length - 1];
        if (lastTop) lastTop.focus();
      }
    });
    if (submenu) {
      submenu.addEventListener("keydown", (e) => {
        const items = qsa("a", submenu);
        const current = document.activeElement;
        const i = items.indexOf(current);
        if (e.key === "ArrowDown") {
          e.preventDefault();
          const next = items[(i + 1) % items.length];
          if (next) next.focus();
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          const prev = items[(i - 1 + items.length) % items.length];
          if (prev) prev.focus();
        } else if (e.key === "Escape") {
          e.preventDefault();
          link.setAttribute("aria-expanded", "false");
          submenu.style.display = "none";
          link.focus();
        }
      });
    }
  });

  qsa(".alert__close").forEach((btn) => {
    btn.addEventListener("click", () => {
      const alert = btn.closest(".alert");
      if (alert) alert.remove();
    });
  });

  // Quick demo bindings
  qsa("[data-toast]").forEach((btn) =>
    btn.addEventListener("click", () =>
      showToast("Exemplo de toast", { type: "info" })
    )
  );

  function getBackdrop() {
    let b = qs("[data-backdrop]");
    if (!b) {
      b = document.createElement("div");
      b.className = "modal-backdrop";
      b.setAttribute("data-backdrop", "");
      document.body.appendChild(b);
    }
    return b;
  }
  function ensureModal(sel) {
    let m = qs(sel);
    if (!m && sel === "#doacaoModal") {
      // Cria modal de doação padrão se não existir (útil quando SPA inicia em outra página)
      m = document.createElement("div");
      m.id = "doacaoModal";
      m.className = "modal";
      m.setAttribute("role", "dialog");
      m.setAttribute("aria-modal", "true");
      m.setAttribute("aria-hidden", "true");
      m.innerHTML = `
        <div class="modal__dialog">
          <div class="modal__header">
            <h4 class="h3" id="tituloModal">Faça sua doação</h4>
          </div>
          <div class="modal__body">
            <p>Com sua contribuição, conseguimos ampliar o alcance dos nossos projetos.</p>
          </div>
          <div class="modal__footer flex justify-between">
            <button class="btn btn--light" data-close-modal>Fechar</button>
            <a class="btn" href="cadastro.html">Continuar</a>
          </div>
        </div>`;
      document.body.appendChild(m);
    }
    return m;
  }
  let lastFocusedBeforeModal = null;
  function focusTrap(modal) {
    const selectors = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      '[tabindex]:not([tabindex="-1"])',
    ];
    const nodes = qsa(selectors.join(","), modal).filter(
      (el) => el.offsetParent !== null
    );
    if (!nodes.length) return () => {};
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    function handler(e) {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    modal.addEventListener("keydown", handler);
    first.focus();
    return () => modal.removeEventListener("keydown", handler);
  }
  let releaseTrap = null;
  function openModal(sel) {
    const modal = ensureModal(sel);
    if (!modal) return;
    lastFocusedBeforeModal = document.activeElement;
    modal.style.display = "flex";
    const backdrop = getBackdrop();
    backdrop.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    releaseTrap = focusTrap(modal);
  }
  function closeModal() {
    qsa(".modal").forEach((m) => {
      m.style.display = "none";
      m.setAttribute("aria-hidden", "true");
    });
    const backdrop = getBackdrop();
    backdrop.style.display = "none";
    if (typeof releaseTrap === "function") {
      releaseTrap();
      releaseTrap = null;
    }
    if (
      lastFocusedBeforeModal &&
      typeof lastFocusedBeforeModal.focus === "function"
    ) {
      lastFocusedBeforeModal.focus();
      lastFocusedBeforeModal = null;
    }
  }
  // Delegação para suportar conteúdo SPA
  document.addEventListener("click", (e) => {
    const openBtn = e.target.closest("[data-open-modal]");
    if (openBtn) {
      e.preventDefault();
      openModal(openBtn.getAttribute("data-open-modal"));
      return;
    }
    const closeBtn = e.target.closest("[data-close-modal]");
    if (closeBtn) {
      e.preventDefault();
      closeModal();
      return;
    }
    const alertClose = e.target.closest(".alert__close");
    if (alertClose) {
      e.preventDefault();
      const alert = alertClose.closest(".alert");
      if (alert) alert.remove();
    }
  });
  const initialBackdrop = qs("[data-backdrop]");
  if (initialBackdrop) initialBackdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // Input masks
  function maskDigits(value, maxLen) {
    return value.replace(/\D/g, "").slice(0, maxLen);
  }
  function formatCPF(v) {
    v = maskDigits(v, 11);
    const p1 = v.slice(0, 3),
      p2 = v.slice(3, 6),
      p3 = v.slice(6, 9),
      p4 = v.slice(9, 11);
    let out = p1;
    if (p2) out += "." + p2;
    if (p3) out += "." + p3;
    if (p4) out += "-" + p4;
    return out;
  }
  function formatPhone(v) {
    v = maskDigits(v, 11);
    const ddd = v.slice(0, 2),
      p1 = v.slice(2, 7),
      p2 = v.slice(7, 11);
    let out = ddd ? `(${ddd})` : "";
    if (p1) out += ` ${p1}`;
    if (p2) out += `-${p2}`;
    return out;
  }
  function formatCEP(v) {
    v = maskDigits(v, 8);
    const p1 = v.slice(0, 5),
      p2 = v.slice(5, 8);
    let out = p1;
    if (p2) out += "-" + p2;
    return out;
  }

  function bindCadastroForm(form, opts = {}) {
    const SUCCESS_ROUTE = opts.redirectRoute || "projetos";
    const SUCCESS_DELAY = opts.redirectDelayMs || 1400;
    const inputs = qsa("input[required], input[pattern]", form);

    const cpf = qs("#cpf", form);
    const tel = qs("#telefone", form);
    const cep = qs("#cep", form);
    const uf = qs("#estado", form);
    if (cpf)
      cpf.addEventListener("input", () => (cpf.value = formatCPF(cpf.value)));
    if (tel)
      tel.addEventListener("input", () => (tel.value = formatPhone(tel.value)));
    if (cep)
      cep.addEventListener("input", () => (cep.value = formatCEP(cep.value)));
    if (uf)
      uf.addEventListener(
        "input",
        () =>
          (uf.value = uf.value
            .toUpperCase()
            .replace(/[^A-Z]/g, "")
            .slice(0, 2))
      );

    form.addEventListener("submit", (e) => {
      let valid = true;
      inputs.forEach((el) => {
        const isOk = el.checkValidity();
        el.classList.toggle("is-invalid", !isOk);
        el.classList.toggle("is-valid", isOk);
        el.setAttribute("aria-invalid", String(!isOk));
        const err = el.nextElementSibling;
        if (err && err.classList.contains("field-error")) {
          err.style.display = isOk ? "none" : "block";
        }
        if (!isOk) valid = false;
      });
      if (!valid) {
        e.preventDefault();
        showToast("Revise os campos destacados.", {
          type: "warning",
          position: "br",
        });
        const live = qs("#form-mensagem", form) || srStatus();
        if (live)
          live.textContent =
            "Existem erros no formulário. Revise os campos destacados.";
      } else {
        e.preventDefault();
        showToast("Cadastro enviado com sucesso!", {
          type: "success",
          position: "br",
          duration: 2000,
        });
        const live = qs("#form-mensagem", form) || srStatus();
        if (live)
          live.textContent = "Cadastro enviado com sucesso! Redirecionando...";
        setTimeout(() => {
          if (window.TEMPLATES) {
            location.hash = "#/" + SUCCESS_ROUTE;
          } else {
            window.location.href = SUCCESS_ROUTE + ".html";
          }
        }, SUCCESS_DELAY);
        form.reset();
        inputs.forEach((el) => el.classList.remove("is-valid", "is-invalid"));
      }
    });
  }

  // Bind on static page load
  const form = qs("#form-cadastro");
  if (form) bindCadastroForm(form);

  // Mark current nav item
  (function markCurrentNav() {
    const file = (
      location.pathname.split("/").pop() || "index.html"
    ).toLowerCase();
    qsa(".menu a").forEach((a) => {
      const href = (a.getAttribute("href") || "").toLowerCase();
      if (!href) return;
      const isCurrent =
        (file.includes("index") && href.includes("index")) ||
        (file.includes("projetos") && href.includes("projetos")) ||
        (file.includes("cadastro") && href.includes("cadastro"));
      if (isCurrent) a.setAttribute("aria-current", "page");
    });
  })();

  // Expor para uso no SPA
  window.bindCadastroForm = bindCadastroForm;
})();

(function () {
  const qs = (s, r = document) => r.querySelector(s);
  if (!window.TEMPLATES) return;

  const routes = {
    home: window.TEMPLATES.home,
    projetos: window.TEMPLATES.projetos,
    cadastro: window.TEMPLATES.cadastro,
  };
  function pathToRoute() {
    const file = location.pathname.split("/").pop() || "index.html";
    if (file.includes("projetos")) return "projetos";
    if (file.includes("cadastro")) return "cadastro";
    return "home";
  }
  function getRouteFromHash() {
    return location.hash.startsWith("#/") ? location.hash.slice(2) : null;
  }
  function render(route) {
    const main = qs("main");
    const tmpl = routes[route] || routes.home;
    if (!main || !tmpl) return;
    main.innerHTML = tmpl();
    document.title =
      route === "home"
        ? "ONG Esperança Viva"
        : `${route[0].toUpperCase()}${route.slice(1)} - ONG Esperança Viva`;
    // bind submit on SPA-rendered cadastro
    const form = qs("#form-cadastro");
    if (form) {
      // Reutiliza a função global de binding para máscaras e validação
      if (typeof window.bindCadastroForm === "function") {
        window.bindCadastroForm(form);
      }
    }
  }

  document.querySelectorAll("nav .menu > li > a").forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href") || "";
      if (href.startsWith("#")) return;
      e.preventDefault();
      const route = href.includes("projetos")
        ? "projetos"
        : href.includes("cadastro")
        ? "cadastro"
        : "home";
      if (location.hash !== `#/${route}`) location.hash = `#/${route}`;
      render(route);
    });
  });

  window.addEventListener("hashchange", () => {
    const r = getRouteFromHash();
    if (r) render(r);
  });

  // Intercepta qualquer link interno para rotas SPA
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    const href = a.getAttribute("href") || "";
    if (href.startsWith("#")) return; // âncoras
    if (/^(https?:)?\/\//i.test(href)) return; // externos
    if (!/index\.html|projetos\.html|cadastro\.html/i.test(href)) return;
    e.preventDefault();
    const route = href.includes("projetos")
      ? "projetos"
      : href.includes("cadastro")
      ? "cadastro"
      : "home";
    if (location.hash !== `#/${route}`) location.hash = `#/${route}`;
    render(route);
  });

  // inicialização
  render(getRouteFromHash() || pathToRoute());
})();

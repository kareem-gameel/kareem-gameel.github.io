const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  const setMenuOpen = (open) => {
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("title", open ? "Close navigation" : "Open navigation");
    navToggle.querySelector(".sr-only").textContent = open
      ? "Close navigation"
      : "Open navigation";
    navLinks.classList.toggle("is-open", open);
  };

  navToggle.addEventListener("click", () => {
    setMenuOpen(navToggle.getAttribute("aria-expanded") !== "true");
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
      navToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      setMenuOpen(false);
    }
  });
}

(() => {
  const exclusionKey = "portfolio.analytics.excluded";
  const privacyPage = location.pathname.replace(/index\.html$/, "") === "/privacy/";
  const control = document.querySelector("#analytics-exclusion");
  const status = document.querySelector("#analytics-status");
  let storageAvailable = true;
  let excluded = true;

  const renderPreference = () => {
    if (!control || !status) return;
    control.checked = excluded;
    control.disabled = !storageAvailable;
    status.textContent = !storageAvailable
      ? "Browser storage is unavailable. Analytics is disabled for this page, but your preference cannot be saved."
      : excluded
        ? "Visits from this browser are excluded."
        : "Visits from this browser may be counted. This privacy page is never counted.";
  };

  const readPreference = () => {
    try {
      if (privacyPage && location.hash === "#exclude-analytics") {
        localStorage.setItem(exclusionKey, "true");
      }
      excluded = localStorage.getItem(exclusionKey) === "true";
    } catch {
      // Fail closed if a browser cannot read the saved opt-out.
      storageAvailable = false;
      excluded = true;
    }
    renderPreference();
  };

  readPreference();
  if (privacyPage) window.addEventListener("hashchange", readPreference);
  if (control) {
    control.addEventListener("change", () => {
      try {
        localStorage.setItem(exclusionKey, String(control.checked));
        excluded = control.checked;
      } catch {
        storageAvailable = false;
        excluded = true;
      }
      renderPreference();
    });
  }

  if (excluded || privacyPage || location.protocol !== "https:" ||
      location.hostname !== "kareem-gameel.github.io") return;

  let referrer = "";
  try {
    const source = new URL(document.referrer);
    if (source.origin !== location.origin) referrer = source.origin;
  } catch { /* Direct visits have no referrer. */ }

  window.goatcounter = {
    no_events: true,
    referrer,
    path: () => {
      try {
        if (localStorage.getItem(exclusionKey) === "true") return null;
      } catch { return null; }
      return location.pathname.replace(/index\.html$/, "");
    }
  };
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://gc.zgo.at/count.js";
  script.dataset.goatcounter = "https://kareem-gameel.goatcounter.com/count";
  document.head.appendChild(script);
})();

/* =========================================================
   Mobile navigation toggle
   ========================================================= */
(function initMobileNav() {
  var toggle = document.getElementById("navToggle");
  var panel = document.getElementById("mobileNav");
  if (!toggle || !panel) return;

  toggle.addEventListener("click", function () {
    var isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    panel.hidden = isOpen;
  });

  panel.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      toggle.setAttribute("aria-expanded", "false");
      panel.hidden = true;
    });
  });
})();

/* =========================================================
   Tabs: Studierende / Schüler:innen
   ========================================================= */
(function initTabs() {
  var tabs = document.querySelectorAll(".tab-btn");
  if (!tabs.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var target = tab.getAttribute("data-tab");

      document.querySelectorAll(".tab-btn").forEach(function (btn) {
        var active = btn === tab;
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-selected", String(active));
        btn.tabIndex = active ? 0 : -1;
      });

      document.querySelectorAll(".tab-panel").forEach(function (panel) {
        var isTarget = panel.id === "panel-" + target;
        panel.classList.toggle("is-active", isTarget);
        panel.hidden = !isTarget;
      });
    });
  });
})();

/* =========================================================
   FAQ accordion
   ========================================================= */
(function initFaq() {
  var items = document.querySelectorAll(".faq-q");
  items.forEach(function (button) {
    button.addEventListener("click", function () {
      var expanded = button.getAttribute("aria-expanded") === "true";
      var answer = button.nextElementSibling;

      button.setAttribute("aria-expanded", String(!expanded));
      if (answer) answer.hidden = expanded;
    });
  });
})();

/* =========================================================
   Scroll reveal
   ========================================================= */
(function initReveal() {
  var targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach(function (el) { observer.observe(el); });
})();

/* ============================================================================
   PharmaWMS — interakcije
   - toggleTheme(): svijetla/tamna tema (pamti se u localStorage 'mv-theme')
   - [data-tabs]: tabovi (.tab[data-tab] -> [data-panel])
   - [data-collapse]: razvij/skupi sljedeći element (+ rotacija [data-chev])
   - [role="switch"]: prekidač
   ========================================================================== */

function toggleTheme() {
  var root = document.documentElement;
  var dark = root.classList.toggle('dark');
  try { localStorage.setItem('mv-theme', dark ? 'dark' : 'light'); } catch (e) {}
}

(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    /* ── tabovi ────────────────────────────────────────────────────────── */
    document.querySelectorAll('[data-tabs]').forEach(function (group) {
      var tabs = group.querySelectorAll('.tab[data-tab]');
      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          var name = tab.getAttribute('data-tab');
          tabs.forEach(function (t) { t.classList.remove('active'); });
          tab.classList.add('active');
          group.querySelectorAll('[data-panel]').forEach(function (panel) {
            panel.classList.toggle('hidden', panel.getAttribute('data-panel') !== name);
          });
        });
      });
    });

    /* ── collapse (red-detalj ili blok) ────────────────────────────────── */
    document.querySelectorAll('[data-collapse]').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var target = trigger.nextElementSibling;
        if (target) target.classList.toggle('hidden');
        var chev = trigger.querySelector('[data-chev]');
        if (chev) {
          var open = target && !target.classList.contains('hidden');
          chev.style.transform = open ? 'rotate(90deg)' : '';
        }
      });
    });

    /* ── prekidači (role=switch) ───────────────────────────────────────── */
    document.querySelectorAll('[role="switch"]').forEach(function (sw) {
      var knob = sw.querySelector('span');
      function paint() {
        var on = sw.getAttribute('aria-checked') === 'true';
        sw.style.backgroundColor = on ? 'rgb(var(--brand))' : 'rgb(var(--line-2))';
        if (knob) knob.style.transform = on ? 'translateX(20px)' : '';
      }
      paint();
      sw.addEventListener('click', function () {
        sw.setAttribute('aria-checked', sw.getAttribute('aria-checked') === 'true' ? 'false' : 'true');
        paint();
      });
    });
  });
})();

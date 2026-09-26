/* ============================================================
   GEOLERIC CONSULTANTS — ABOUT PAGE SCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- DYNAMIC YEAR ---------- */
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* ---------- MOBILE DRAWER ---------- */
  const drawer   = document.getElementById('mobile-drawer');
  const overlay  = document.getElementById('drawer-overlay');
  const content  = document.getElementById('drawer-content');
  const openBtn  = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('close-drawer-btn');

  if (drawer && overlay && content && openBtn) {

    const openMenu = () => {
      drawer.classList.remove('pointer-events-none');
      overlay.classList.replace('opacity-0', 'opacity-100');
      content.classList.replace('translate-x-full', 'translate-x-0');
      document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
      drawer.classList.add('pointer-events-none');
      overlay.classList.replace('opacity-100', 'opacity-0');
      content.classList.replace('translate-x-0', 'translate-x-full');
      document.body.style.overflow = '';
    };

    openBtn.addEventListener('click', openMenu);
    closeBtn?.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    content.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !drawer.classList.contains('pointer-events-none')) closeMenu();
    });
  }


  /* ============================================================
     DISCIPLINE TABS
     ============================================================ */
  (function initTabs() {
    const tabEls   = document.querySelectorAll('.disc-tab');
    const panelEls = document.querySelectorAll('.disc-panel');
    if (!tabEls.length || !panelEls.length) return;

    tabEls.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;

        tabEls.forEach(t => t.classList.toggle('is-active', t === tab));
        panelEls.forEach(p => p.classList.toggle('is-active', p.dataset.panel === target));
      });
    });
  })();


  /* ============================================================
     SPATIAL LAYER TOGGLES
     ============================================================ */
  (function initLayers() {
    const toggles   = document.querySelectorAll('.layer-toggle');
    const layerSvgs = document.querySelectorAll('[data-layer-svg]');
    if (!toggles.length) return;

    toggles.forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.layer;
        const isOn = btn.classList.toggle('is-on');

        const status = btn.querySelector('.layer-status');
        if (status) status.textContent = isOn ? 'ON' : 'OFF';

        layerSvgs.forEach(svg => {
          if (svg.dataset.layerSvg === key) {
            svg.classList.toggle('is-on', isOn);
          }
        });
      });
    });
  })();


  /* ============================================================
     METHOD — click + scroll activation
     ============================================================ */
  (function initMethod() {
    const steps = document.querySelectorAll('.method-step');
    if (!steps.length) return;

    // Click interaction — jump to step
    steps.forEach(step => {
      step.addEventListener('click', () => {
        steps.forEach(s => s.classList.remove('is-active'));
        step.classList.add('is-active');
      });
    });

    // Scroll activation — mark most visible step
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.55) {
            steps.forEach(s => s.classList.remove('is-active'));
            entry.target.classList.add('is-active');
          }
        });
      }, { threshold: [0.55, 0.75] });

      steps.forEach(step => io.observe(step));
    }
  })();


  /* ============================================================
     AUDIENCE SELECTOR
     ============================================================ */
  (function initAudience() {
    const btns   = document.querySelectorAll('.aud-btn');
    const panels = document.querySelectorAll('.aud-panel');
    if (!btns.length) return;

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.aud;

        btns.forEach(b => b.classList.toggle('is-active', b === btn));
        panels.forEach(p => p.classList.toggle('is-active', p.dataset.panel === key));
      });
    });
  })();


  /* ============================================================
     REVEAL + PRINCIPLES (with stagger)
     ============================================================ */
  if ('IntersectionObserver' in window) {

    const principleEls = Array.from(document.querySelectorAll('[data-principle]'));

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const isPrinciple = entry.target.hasAttribute('data-principle');
          const delay = isPrinciple ? principleEls.indexOf(entry.target) * 120 : 0;

          setTimeout(() => entry.target.classList.add('is-visible'), delay);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('[data-reveal], [data-principle]').forEach(el => io.observe(el));

  } else {
    document.querySelectorAll('[data-reveal], [data-principle]')
      .forEach(el => el.classList.add('is-visible'));
  }

});
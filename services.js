/* ============================================================
   GEOLERIC CONSULTANTS — SERVICES PAGE SCRIPT
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


  /* ---------- FAQ: only one open at a time ---------- */
  const faqs = document.querySelectorAll('details.group');
  faqs.forEach(detail => {
    detail.addEventListener('toggle', () => {
      if (detail.open) {
        faqs.forEach(other => {
          if (other !== detail && other.open) other.open = false;
        });
      }
    });
  });


  /* ============================================================
     STICKY SUB-NAV ACTIVE STATE
     ============================================================ */
  (function initSubnav() {
    const subnavItems = document.querySelectorAll('.subnav-item');
    const observed = document.querySelectorAll('[data-observe]');

    if (!subnavItems.length || !observed.length || !('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const key = entry.target.dataset.observe;
          subnavItems.forEach(item => {
            item.classList.toggle('is-active', item.dataset.subnav === key);
          });
        }
      });
    }, {
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    });

    observed.forEach(section => io.observe(section));
  })();


  /* ============================================================
     SCROLL REVEAL
     ============================================================ */
  if ('IntersectionObserver' in window) {
    const reveals = document.querySelectorAll('[data-reveal]');

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10, rootMargin: '0px 0px -60px 0px' });

    reveals.forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-visible'));
  }

});
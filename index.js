/* ============================================================
   GEOLERIC CONSULTANTS — MAIN SCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- DYNAMIC COPYRIGHT YEAR ---------- */
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }


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

    // Close when any link inside the drawer is tapped
    content.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !drawer.classList.contains('pointer-events-none')) {
        closeMenu();
      }
    });
  }


  /* ---------- QUOTE FORM VALIDATION ---------- */
  const form   = document.getElementById('quote-form');
  const status = document.getElementById('form-status');

  if (form && status) {

    const setStatus = (message, tone) => {
      status.textContent = message;
      const base = 'mt-4 text-center text-[13px] font-light ';
      const tones = {
        error: 'text-brand-red',
        info:  'text-brand-blue',
        muted: 'text-gray-500'
      };
      status.className = base + (tones[tone] || tones.muted);
    };

    form.addEventListener('submit', (e) => {
      const name    = form.fullname.value.trim();
      const phone   = form.phone.value.trim();
      const phoneOk = /^[+()\d\s-]{9,}$/.test(phone);

      const fail = (message, field) => {
        e.preventDefault();
        setStatus(message, 'error');
        field?.focus();
      };

      if (name.length < 2) {
        return fail('Please enter your full name or corporate entity.', form.fullname);
      }

      if (!phoneOk) {
        return fail('Please enter a valid phone or WhatsApp number.', form.phone);
      }

      // Valid — let FormSubmit take over
      setStatus('Submitting your enquiry…', 'info');
    });
  }


  /* ---------- SCROLL REVEAL (progressive enhancement) ---------- */
  if ('IntersectionObserver' in window) {
    const reveals = document.querySelectorAll('[data-reveal]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all reveals immediately
    document.querySelectorAll('[data-reveal]').forEach(el => {
      el.classList.add('is-visible');
    });
  }

});
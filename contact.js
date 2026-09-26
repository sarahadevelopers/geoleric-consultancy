/* ============================================================
   GEOLERIC CONSULTANTS — CONTACT PAGE SCRIPT
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


  /* ---------- CONTACT FORM VALIDATION ---------- */
  const form   = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (form && status) {

    const setStatus = (msg, tone) => {
      status.textContent = msg;
      const base = 'mt-4 text-center text-[13px] font-light ';
      const tones = {
        error: 'text-brand-red',
        ok:    'text-brand-blue',
        muted: 'text-gray-500'
      };
      status.className = base + (tones[tone] || tones.muted);
    };

    form.addEventListener('submit', e => {
      e.preventDefault();

      const name    = form.fullname.value.trim();
      const phone   = form.phone.value.trim();
      const email   = form.email.value.trim();
      const consent = form.consent.checked;

      const phoneOk = /^[+()\d\s-]{9,}$/.test(phone);
      const emailOk = email === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (name.length < 2) {
        setStatus('Please enter your full name or corporate entity.', 'error');
        form.fullname.focus();
        return;
      }
      if (!phoneOk) {
        setStatus('Please enter a valid phone or WhatsApp number.', 'error');
        form.phone.focus();
        return;
      }
      if (!emailOk) {
        setStatus('Please enter a valid email address, or leave the field blank.', 'error');
        form.email.focus();
        return;
      }
      if (!consent) {
        setStatus('Please confirm you consent to us storing your enquiry details.', 'error');
        form.consent.focus();
        return;
      }

      setStatus('Submitting your enquiry…', 'ok');

      /* TODO: connect to your backend endpoint, e.g.
         fetch('/api/contact', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(Object.fromEntries(new FormData(form)))
         })
         .then(...) */

      // Placeholder success state (remove when backend is wired up)
      setTimeout(() => {
        setStatus('Thank you — your enquiry has been received. We will respond within 24 hours.', 'ok');
        form.reset();
      }, 700);
    });
  }


  /* ---------- SCROLL REVEAL ---------- */
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
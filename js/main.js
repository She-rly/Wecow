document.addEventListener('DOMContentLoaded', function () {
  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Contact form handling (Formspree fallback message if action not replaced)
  const form = document.getElementById('contactForm');
  const alertEl = document.getElementById('formAlert');
  if (form && alertEl) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const action = form.getAttribute('action') || '';
      const data = new FormData(form);
      if (action.includes('your-form-id')) {
        alertEl.style.display = 'block';
        alertEl.className = 'alert alert-warning';
        alertEl.textContent = 'Please replace the Formspree form action URL in index.html with your Formspree form ID, or provide a backend endpoint.';
        return;
      }
      fetch(action, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        .then((r) => (r.ok ? r.json() : Promise.reject(r)))
        .then(() => {
          alertEl.style.display = 'block';
          alertEl.className = 'alert alert-success';
          alertEl.textContent = 'Message sent — thank you!';
          form.reset();
        })
        .catch(() => {
          alertEl.style.display = 'block';
          alertEl.className = 'alert alert-danger';
          alertEl.textContent = 'Sending failed. As a fallback, please email info@wecow.org';
        });
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // collapse navbar on mobile
        const bsCollapse = document.querySelector('.navbar-collapse.show');
        if (bsCollapse) {
          new bootstrap.Collapse(bsCollapse).hide();
        }
      }
    });
  });

  // Simple active nav link on scroll
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.navbar-nav .nav-link'));
  function onScroll() {
    const scrollPos = window.scrollY + 120;
    let current = sections[0];
    for (const sec of sections) {
      if (sec.offsetTop <= scrollPos) current = sec;
    }
    navLinks.forEach((link) => {
      const href = link.getAttribute('href') || '';
      if (href === '#' + current.id) link.classList.add('active');
      else link.classList.remove('active');
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});


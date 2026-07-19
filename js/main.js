// Linslade Galaxy FC — Main JS

// Mobile nav toggle
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.site-nav')) links.classList.remove('open');
  });
})();

// Mark current page link as active
(function () {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Global sponsor strip — populated from data/sponsors.json
(function () {
  const footer = document.querySelector('.site-footer');
  if (!footer) return;

  let logos = document.getElementById('sponsors-bar-logos');
  let section = logos ? logos.closest('.sponsors-bar') : null;

  if (!logos) {
    section = document.createElement('div');
    section.className = 'sponsors-bar';
    section.innerHTML = '<div class="container">'
      + '<p class="sponsors-label"><a href="sponsors.html">Club Sponsors</a></p>'
      + '<div class="sponsors-logos" id="global-sponsors-logos"></div>'
      + '<p class="sponsors-link"><a href="sponsors.html">Meet our sponsors →</a></p>'
      + '</div>';
    footer.parentNode.insertBefore(section, footer);
    logos = section.querySelector('#global-sponsors-logos');
  }

  fetch('data/sponsors.json')
    .then(response => {
      if (!response.ok) throw new Error('Unable to load sponsors');
      return response.json();
    })
    .then(sponsors => {
      if (!sponsors.length) {
        section.style.display = 'none';
        return;
      }
      logos.innerHTML = sponsors.map(sponsor => {
        const image = '<img src="' + sponsor.logo + '" alt="' + sponsor.name + '">';
        return '<div class="sponsor-logo">'
          + (sponsor.url ? '<a href="' + sponsor.url + '" target="_blank" rel="noopener">' + image + '</a>' : image)
          + '</div>';
      }).join('');
    })
    .catch(error => {
      console.warn('Sponsors load error:', error.message);
      if (section) section.style.display = 'none';
    });
})();
// Formspree form handling — show a local completion page on the free plan
(function () {
  const forms = document.querySelectorAll('form[action^="https://formspree.io/f/"]');
  forms.forEach(form => {
    const button = form.querySelector('button[type="submit"]');
    let status = form.querySelector('.form-submit-status');
    if (!status) {
      status = document.createElement('p');
      status.className = 'form-submit-status';
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      form.appendChild(status);
    }

    form.addEventListener('submit', async event => {
      event.preventDefault();
      const originalLabel = button ? button.textContent : '';
      if (button) {
        button.disabled = true;
        button.textContent = 'Sending…';
      }
      status.textContent = '';
      status.classList.remove('error');

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });

        if (!response.ok) {
          const result = await response.json().catch(() => ({}));
          const message = result.errors && result.errors.length
            ? result.errors.map(error => error.message).join(' ')
            : 'We could not send your form. Please check your details and try again.';
          throw new Error(message);
        }

        window.location.href = 'form-complete.html';
      } catch (error) {
        status.textContent = error.message || 'We could not send your form. Please try again.';
        status.classList.add('error');
        if (button) {
          button.disabled = false;
          button.textContent = originalLabel;
        }
      }
    });
  });
})();
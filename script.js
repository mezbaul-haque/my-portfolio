const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navItems = Array.from(document.querySelectorAll('.nav-link'));
const sections = Array.from(document.querySelectorAll('section[id]'));
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const closeMenu = () => {
  navLinks.classList.remove('active');
  document.body.classList.remove('menu-open');
  menuToggle.setAttribute('aria-expanded', 'false');
};

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('active');
  document.body.classList.toggle('menu-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navItems.forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});

document.addEventListener('click', event => {
  if (!event.target.closest('.nav')) closeMenu();
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', event => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  });
});

const setActiveNav = id => {
  navItems.forEach(item => {
    const active = item.getAttribute('href') === `#${id}`;
    item.classList.toggle('active', active);
    if (active) {
      item.setAttribute('aria-current', 'page');
    } else {
      item.removeAttribute('aria-current');
    }
  });
};

if ('IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActiveNav(entry.target.id);
    });
  }, { rootMargin: '-35% 0px -55% 0px' });

  sections.forEach(section => navObserver.observe(section));
}

const revealTargets = document.querySelectorAll(
  '.hero-inner, .intro-line, .section-heading, .capability-card, .case-card, .timeline-item, .about-copy, .cv-band, .contact-links a'
);

revealTargets.forEach(target => target.classList.add('reveal'));

if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -48px 0px' });

  revealTargets.forEach(target => revealObserver.observe(target));
} else {
  revealTargets.forEach(target => target.classList.add('is-visible'));
}

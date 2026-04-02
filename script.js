const nav = document.querySelector('nav');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const sections = Array.from(document.querySelectorAll('section[id]'));
const navItems = document.querySelectorAll('.nav-link');
const anchorLinks = document.querySelectorAll('a[href^="#"]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let scrollTicking = false;
let currentNavOffset = nav.getBoundingClientRect().height + 8;
let activeSectionObserver;

const closeMenu = () => {
  navLinks.classList.remove('active');
  menuToggle.setAttribute('aria-expanded', 'false');
};

const setActiveNav = current => {
  navItems.forEach(item => {
    const isActive = item.getAttribute('href') === `#${current}`;
    item.classList.toggle('active', isActive);

    if (isActive) {
      item.setAttribute('aria-current', 'page');
    } else {
      item.removeAttribute('aria-current');
    }
  });
};

const updateNavOffset = () => {
  currentNavOffset = nav.getBoundingClientRect().height + 8;
};

const syncNavState = () => {
  nav.classList.toggle('scrolled', window.scrollY > 12);
};

const buildSectionObserver = () => {
  if (activeSectionObserver) {
    activeSectionObserver.disconnect();
  }

  let currentId = sections[0] ? sections[0].id : '';

  activeSectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          currentId = entry.target.id;
        }
      });

      if (currentId) {
        setActiveNav(currentId);
      }
    },
    {
      rootMargin: `-${currentNavOffset + 12}px 0px -55% 0px`,
      threshold: 0
    }
  );

  sections.forEach(section => activeSectionObserver.observe(section));
};

const refreshActiveSectionTracking = () => {
  updateNavOffset();
  buildSectionObserver();
};

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navItems.forEach(link => link.addEventListener('click', closeMenu));

const onScroll = () => {
  if (scrollTicking) return;

  scrollTicking = true;
  window.requestAnimationFrame(() => {
    syncNavState();
    scrollTicking = false;
  });
};

window.addEventListener('scroll', onScroll, { passive: true });

syncNavState();
refreshActiveSectionTracking();

const onAnchorClick = event => {
  const href = event.currentTarget.getAttribute('href');
  if (!href || href === '#') return;

  const target = document.querySelector(href);
  if (!target) return;

  event.preventDefault();
  updateNavOffset();
  setActiveNav(target.id);

  const targetTop = target.getBoundingClientRect().top + window.scrollY - currentNavOffset;

  window.scrollTo({
    top: Math.max(targetTop, 0),
    behavior: prefersReducedMotion ? 'auto' : 'smooth'
  });
};

anchorLinks.forEach(anchor => anchor.addEventListener('click', onAnchorClick));

document.addEventListener('click', event => {
  if (!nav.contains(event.target)) {
    closeMenu();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    closeMenu();
  }

  refreshActiveSectionTracking();
});

const setupExperienceShowcase = () => {
  const chapters = Array.from(document.querySelectorAll('.experience-chapter'));
  if (!chapters.length) return;

  const isMobileExperience = window.matchMedia('(max-width: 768px)');
  const stageKicker = document.getElementById('experience-stage-kicker');
  const stagePeriod = document.getElementById('experience-stage-period');
  const stageRole = document.getElementById('experience-stage-role');
  const stageCompany = document.getElementById('experience-stage-company');
  const stageSummary = document.getElementById('experience-stage-summary');
  const stageShift = document.getElementById('experience-stage-shift');
  const stageMetrics = document.getElementById('experience-stage-metrics');
  const stageFocus = document.getElementById('experience-stage-focus');
  const arcTitle1 = document.getElementById('experience-arc-title-1');
  const arcTitle2 = document.getElementById('experience-arc-title-2');
  const arcTitle3 = document.getElementById('experience-arc-title-3');
  const arcCopy1 = document.getElementById('experience-arc-copy-1');
  const arcCopy2 = document.getElementById('experience-arc-copy-2');
  const arcCopy3 = document.getElementById('experience-arc-copy-3');
  const mobileDetails = document.createElement('div');

  mobileDetails.className = 'experience-mobile-details';

  const fillPills = (target, values) => {
    target.innerHTML = '';
    values.filter(Boolean).forEach(value => {
      const pill = document.createElement('span');
      pill.textContent = value;
      target.appendChild(pill);
    });
  };

  const renderMobileDetails = chapter => {
    const metrics = (chapter.dataset.metrics || '')
      .split('|')
      .filter(Boolean)
      .map(value => `<span>${value}</span>`)
      .join('');

    const focus = (chapter.dataset.focus || '')
      .split('|')
      .filter(Boolean)
      .map(value => `<span>${value}</span>`)
      .join('');

    const arcTitles = (chapter.dataset.arcTitles || '').split('|');
    const arcCopies = (chapter.dataset.arcCopy || '').split('|');
    const highlights = arcTitles
      .map((title, index) => {
        if (!title && !arcCopies[index]) return '';

        return `
          <article class="experience-mobile-highlight">
            <h4>${title || ''}</h4>
            <p>${arcCopies[index] || ''}</p>
          </article>
        `;
      })
      .join('');

    mobileDetails.innerHTML = `
      <div class="experience-mobile-stage">
        <div class="experience-stage-top">
          <p class="experience-stage-kicker">${chapter.dataset.kicker || ''}</p>
          <p class="experience-stage-period">${chapter.dataset.period || ''}</p>
        </div>
        <h3>${chapter.dataset.role || ''}</h3>
        <p class="experience-stage-company">${chapter.dataset.company || ''}</p>
        <p class="experience-stage-summary">${chapter.dataset.summary || ''}</p>
        <div class="experience-metrics">${metrics}</div>
        <div class="experience-panels">
          <section class="experience-panel">
            <p class="experience-panel-label">What Changed</p>
            <p>${chapter.dataset.shift || ''}</p>
          </section>
          <section class="experience-panel">
            <p class="experience-panel-label">Focus Areas</p>
            <div class="experience-focus-list">${focus}</div>
          </section>
        </div>
        <div class="experience-mobile-highlights">${highlights}</div>
      </div>
    `;
  };

  const applyChapter = chapter => {
    chapters.forEach(item => {
      const isActive = item === chapter;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-expanded', String(isActive));
    });

    stageKicker.textContent = chapter.dataset.kicker || '';
    stagePeriod.textContent = chapter.dataset.period || '';
    stageRole.textContent = chapter.dataset.role || '';
    stageCompany.textContent = chapter.dataset.company || '';
    stageSummary.textContent = chapter.dataset.summary || '';
    stageShift.textContent = chapter.dataset.shift || '';
    fillPills(stageMetrics, (chapter.dataset.metrics || '').split('|'));
    fillPills(stageFocus, (chapter.dataset.focus || '').split('|'));

    const arcTitles = (chapter.dataset.arcTitles || '').split('|');
    const arcCopies = (chapter.dataset.arcCopy || '').split('|');

    [arcTitle1, arcTitle2, arcTitle3].forEach((target, index) => {
      target.textContent = arcTitles[index] || '';
    });

    [arcCopy1, arcCopy2, arcCopy3].forEach((target, index) => {
      target.textContent = arcCopies[index] || '';
    });

    if (isMobileExperience.matches) {
      renderMobileDetails(chapter);
      mobileDetails.id = `experience-mobile-${(chapter.dataset.role || 'details')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')}`;
      mobileDetails.setAttribute('role', 'region');
      mobileDetails.setAttribute('aria-label', `${chapter.dataset.role || 'Experience'} details`);
      chapter.insertAdjacentElement('afterend', mobileDetails);
    } else if (mobileDetails.parentElement) {
      mobileDetails.remove();
    }
  };

  chapters.forEach((chapter, index) => {
    chapter.addEventListener('click', () => applyChapter(chapter));
    chapter.addEventListener('mouseenter', () => applyChapter(chapter));
    chapter.addEventListener('focus', () => applyChapter(chapter));
    chapter.addEventListener('keydown', event => {
      if (
        event.key !== 'ArrowDown' &&
        event.key !== 'ArrowUp' &&
        event.key !== 'ArrowRight' &&
        event.key !== 'ArrowLeft'
      ) {
        return;
      }

      event.preventDefault();
      const direction = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : -1;
      const nextIndex = (index + direction + chapters.length) % chapters.length;
      chapters[nextIndex].focus();
      applyChapter(chapters[nextIndex]);
    });
  });

  const syncExperienceLayout = () => {
    document.body.classList.toggle('experience-enhanced', isMobileExperience.matches);
    applyChapter(document.querySelector('.experience-chapter.active') || chapters[0]);
  };

  if (typeof isMobileExperience.addEventListener === 'function') {
    isMobileExperience.addEventListener('change', syncExperienceLayout);
  } else if (typeof isMobileExperience.addListener === 'function') {
    isMobileExperience.addListener(syncExperienceLayout);
  }

  syncExperienceLayout();
};

setupExperienceShowcase();

const revealTargets = document.querySelectorAll(
  '.hero-content, .experience-rail, .experience-stage, .experience-arc, .skill-category, .blog-card, .education-card, .contact-item'
);

revealTargets.forEach(el => el.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach(el => revealObserver.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add('is-visible'));
}

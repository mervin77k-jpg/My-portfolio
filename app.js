const filters = document.querySelector('.filters');
const cards = document.querySelectorAll('#work .work[data-category]');
filters.hidden = false;

filters.addEventListener('click', (event) => {
  const selected = event.target.closest('button[data-filter]');
  if (!selected) return;

  filters.querySelectorAll('button').forEach((button) => {
    button.setAttribute('aria-pressed', String(button === selected));
  });

  let visible = 0;
  cards.forEach((card) => {
    card.hidden = selected.dataset.filter !== 'all' && selected.dataset.filter !== card.dataset.category;
    if (!card.hidden) visible++;
  });

  document.querySelector('#filter-status').textContent = `${visible} roles shown.`;
});

const choices = document.querySelector('.choices');
const feedback = document.querySelector('#feedback');
choices.hidden = false;

choices.addEventListener('click', (event) => {
  const selected = event.target.closest('button[data-answer]');
  if (!selected) return;

  choices.querySelectorAll('button').forEach((button) => {
    button.setAttribute('aria-pressed', String(button === selected));
  });

  feedback.textContent = selected.dataset.answer === 'b'
    ? 'Correct. B captures the action, identifies Maya, and flags the missing deadline.'
    : 'Check the source again. A identifies Maya but adds Friday, a deadline the team never set.';
});

const certificate = document.querySelector('#certificate');
for (const link of document.querySelectorAll('#certificate-link, #certificate-action')) {
  link.addEventListener('click', (event) => {
    if (!certificate.showModal || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    certificate.showModal();
  });
}

const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('span');
const themeColor = document.querySelector('meta[name="theme-color"]');

function applyTheme(theme) {
  const light = theme === 'light';
  document.documentElement.dataset.theme = light ? 'light' : 'dark';
  themeToggle.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
  themeIcon.textContent = light ? '☾' : '☀';
  themeColor.content = light ? '#f7faff' : '#151e2e';
}

try {
  applyTheme(localStorage.getItem('portfolio-theme'));
} catch {
  applyTheme('dark');
}

themeToggle.hidden = false;
themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  applyTheme(nextTheme);
  try {
    localStorage.setItem('portfolio-theme', nextTheme);
  } catch {
    // The toggle still works when persistent browser storage is unavailable.
  }
});

if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const entranceObserver = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('motion-entered');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.15 });

  document.querySelectorAll('.center-heading, .skill, .work[data-category], .lab-panel').forEach((element) => {
    entranceObserver.observe(element);
  });
}

const navToggle = document.querySelector('[data-nav-toggle]');
const mobileNav = document.querySelector('[data-mobile-nav]');

if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    mobileNav.hidden = expanded;
    document.body.classList.toggle('nav-open', !expanded);
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      mobileNav.hidden = true;
      document.body.classList.remove('nav-open');
    });
  });
}

const searchInput = document.querySelector('[data-snippet-search]');
const snippetItems = [...document.querySelectorAll('[data-snippet-item]')];

function activateSnippet(item) {
  snippetItems.forEach((candidate) => candidate.classList.toggle('is-active', candidate === item));
  const title = document.querySelector('[data-preview-title]');
  const language = document.querySelector('[data-preview-language]');
  const visibility = document.querySelector('[data-preview-visibility]');
  const code = document.querySelector('[data-preview-code]');
  if (title) title.textContent = item.dataset.title;
  if (language) language.textContent = item.dataset.language;
  if (visibility) visibility.textContent = item.dataset.visibility;
  if (code) code.innerHTML = item.querySelector('template').innerHTML;
}

snippetItems.forEach((item) => item.addEventListener('click', () => activateSnippet(item)));

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    snippetItems.forEach((item) => {
      item.hidden = !item.dataset.search.includes(query);
    });
  });
}

document.querySelectorAll('[data-variant]').forEach((button) => {
  button.addEventListener('click', () => {
    const parent = button.closest('[data-variant-group]');
    parent.querySelectorAll('[data-variant]').forEach((item) => {
      const selected = item === button;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-selected', String(selected));
    });
    const code = document.querySelector('[data-preview-code]');
    if (code && button.dataset.code) code.innerHTML = button.dataset.code;
  });
});

const contactForm = document.querySelector('[data-contact-form]');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = contactForm.querySelector('[data-form-status]');
    if (status) {
      status.hidden = false;
      status.focus();
    }
  });
}

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const source = document.querySelector(button.dataset.copy);
    if (!source) return;
    try {
      await navigator.clipboard.writeText(source.textContent);
      const previous = button.textContent;
      button.textContent = 'Copied';
      setTimeout(() => { button.textContent = previous; }, 1400);
    } catch {
      button.textContent = 'Select to copy';
    }
  });
});

let currentLang = localStorage.getItem('lang') || 'es';

async function loadTranslations(lang) {
  const res = await fetch(`/lang/${lang}.json`);
  return res.json();
}

function applyTranslations(translations) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (translations[key]) {
      el.textContent = translations[key];
    }
  });
  document.querySelectorAll('[data-i18n-href]').forEach(el => {
    const key = el.dataset.i18nHref;
    if (translations[key]) {
      el.href = translations[key];
    }
  });
  document.documentElement.lang = currentLang;
}

async function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  const translations = await loadTranslations(lang);
  applyTranslations(translations);
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

document.addEventListener('astro:page-load', async () => {
  const savedLang = localStorage.getItem('lang') || 'es';
  const translations = await loadTranslations(savedLang);
  currentLang = savedLang;
  applyTranslations(translations);
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === savedLang);
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });
});

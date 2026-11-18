import { translations } from './data/i18n.js';

const filterButtons = document.querySelectorAll('#filter-buttons button');
const langButtons = document.querySelectorAll('#lang-switcher button');
const projectItems = document.querySelectorAll('.project-item');
const cvDownloadBtn = document.getElementById('cv-download-btn');

let currentLang = localStorage.getItem('portfolio_lang') 
    || (navigator.language.startsWith('en') ? 'en' : 'es');

function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('portfolio_lang', lang);
    document.documentElement.lang = lang;

    const dict = translations[lang];
    document.title = dict.metaTitle;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.textContent = dict[key];
    });

    if (cvDownloadBtn && dict.cvUrl) {
        cvDownloadBtn.setAttribute('href', dict.cvUrl);
    }

    langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
}

// Filtros directos sobre las tarjetas del HTML
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');
        projectItems.forEach(item => {
            const matches = filter === 'all' || item.getAttribute('data-category') === filter;
            item.classList.toggle('d-none', !matches);
        });
    });
});

// Cambio de idioma
langButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedLang = button.getAttribute('data-lang');
        if (selectedLang !== currentLang) applyLanguage(selectedLang);
    });
});

document.addEventListener('DOMContentLoaded', () => applyLanguage(currentLang));
/**
 * Predictive search — fetches /search/suggest.json and renders results.
 * Attaches to [data-predictive-search], [data-predictive-search-input], [data-predictive-search-results].
 */

const DEBOUNCE_MS = 200;
const MIN_QUERY_LENGTH = 2;

function getRoot() {
  return (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/';
}

function buildResultsHTML(resources) {
  if (!resources || !resources.results) return '';
  const { products = [], pages = [], queries = [] } = resources.results;
  const parts = [];

  if (products.length > 0) {
    parts.push('<p class="px-3 py-1 text-xs font-semibold uppercase text-white/50">Products</p>');
    products.slice(0, 5).forEach((p) => {
      const url = p.url || '#';
      const img = p.image ? `<img src="${p.image}" alt="" class="w-10 h-10 object-cover rounded" loading="lazy">` : '';
      parts.push(`<a href="${url}" class="flex items-center gap-3 px-3 py-2 hover:bg-white/10 text-body no-underline" role="option">${img}<span>${escapeHtml(p.title)}</span> <span class="text-subheading text-sm ml-auto">${formatMoney(p.price)}</span></a>`);
    });
  }
  if (pages.length > 0) {
    parts.push('<p class="px-3 py-1 text-xs font-semibold uppercase text-white/50 mt-2">Pages</p>');
    pages.slice(0, 3).forEach((p) => {
      parts.push(`<a href="${p.url || '#'}" class="block px-3 py-2 hover:bg-white/10 text-body no-underline" role="option">${escapeHtml(p.title)}</a>`);
    });
  }
  if (queries.length > 0) {
    parts.push('<p class="px-3 py-1 text-xs font-semibold uppercase text-white/50 mt-2">Suggestions</p>');
    queries.slice(0, 3).forEach((q) => {
      parts.push(`<a href="${q.url || '#'}" class="block px-3 py-2 hover:bg-white/10 text-body no-underline" role="option">${q.styled_text ? q.styled_text : escapeHtml(q.text)}</a>`);
    });
  }
  return parts.length ? parts.join('') : '<p class="px-3 py-4 text-subheading text-sm">No results</p>';
}

function escapeHtml(s) {
  if (!s) return '';
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}

function formatMoney(value) {
  if (value == null) return '';
  const amount = typeof value === 'number' && value > 1000 ? value / 100 : value;
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: window.Shopify?.currency?.active || 'EUR' }).format(amount);
}

function init() {
  const wrap = document.querySelector('[data-predictive-search]');
  const input = document.querySelector('[data-predictive-search-input]');
  const resultsEl = document.querySelector('[data-predictive-search-results]');
  const resultsInner = document.querySelector('[data-predictive-search-results-inner]');
  if (!wrap || !input || !resultsEl || !resultsInner) return;

  let debounceTimer;
  let abortController = null;

  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    const q = (input.value || '').trim();
    if (q.length < MIN_QUERY_LENGTH) {
      resultsEl.classList.add('hidden');
      input.setAttribute('aria-expanded', 'false');
      return;
    }
    debounceTimer = setTimeout(() => fetchSuggestions(q), DEBOUNCE_MS);
  });

  input.addEventListener('focus', () => {
    if ((input.value || '').trim().length >= MIN_QUERY_LENGTH && resultsInner.innerHTML) {
      resultsEl.classList.remove('hidden');
      input.setAttribute('aria-expanded', 'true');
    }
  });

  input.addEventListener('blur', () => {
    setTimeout(() => {
      resultsEl.classList.add('hidden');
      input.setAttribute('aria-expanded', 'false');
    }, 150);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      resultsEl.classList.add('hidden');
      input.setAttribute('aria-expanded', 'false');
    }
  });

  function fetchSuggestions(q) {
    if (abortController) abortController.abort();
    abortController = new AbortController();
    const root = getRoot();
    const url = `${root}search/suggest.json?q=${encodeURIComponent(q)}&resources[type]=product,page,query&resources[limit]=6&resources[options][unavailable_products]=hide`;
    fetch(url, { signal: abortController.signal })
      .then((res) => res.json())
      .then((data) => {
        const html = buildResultsHTML(data.resources);
        resultsInner.innerHTML = html;
        resultsEl.classList.remove('hidden');
        input.setAttribute('aria-expanded', 'true');
      })
      .catch((err) => {
        if (err.name !== 'AbortError') resultsInner.innerHTML = '<p class="px-3 py-4 text-subheading text-sm">Search unavailable</p>';
      });
  }
}

export const PredictiveSearch = { init };

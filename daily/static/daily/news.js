const API_KEY = '89cf723db07ee97ee7cfe8d6efb173eb';
const newsContainer = document.getElementById('news');
let page = 1;
let currentQuery = '';
let currentSort = 'publishedAt';
let language = 'en';
let country = 'us';
let category = '';
let typingTimer;

function fetchNews(reset = false) {
  if (reset) {
    newsContainer.innerHTML = '';
    page = 1;
  }

  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(currentQuery || 'top')}
    &lang=${language}&country=${country}&max=10&page=${page}&sortby=${currentSort}&apikey=${API_KEY}
    ${category ? `&topic=${category}` : ''}`.replace(/\s+/g, '');

  fetch(url)
    .then(res => res.json())
    .then(data => {
      data.articles?.forEach(article => {
        const el = document.createElement('div');
        el.className = 'news-item';
        el.innerHTML = `
          <img src="${article.image || 'https://via.placeholder.com/180x120'}" class="news-image">
          <div class="news-content">
            <a href="${article.url}" target="_blank">${article.title}</a>
            <div class="source">${article.source.name} • ${new Date(article.publishedAt).toLocaleString()}</div>
          </div>
        `;
        newsContainer.appendChild(el);
      });
    }).catch(err => {
      console.error('Failed to fetch news:', err);
    });
}

document.getElementById('search').addEventListener('input', function () {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => {
    currentQuery = this.value;
    fetchNews(true);
  }, 500);
});
document.getElementById('category').addEventListener('change', e => {
  category = e.target.value;
  fetchNews(true);
});
document.getElementById('language').addEventListener('change', e => {
  language = e.target.value;
  fetchNews(true);
});
document.getElementById('country').addEventListener('change', e => {
  country = e.target.value;
  fetchNews(true);
});
document.getElementById('sort-date').addEventListener('click', () => {
  currentSort = currentSort === 'publishedAt' ? 'relevance' : 'publishedAt';
  document.getElementById('sort-date').textContent =
    currentSort === 'publishedAt' ? '🕒 Sort: Newest' : '🎯 Sort: Relevance';
  fetchNews(true);
});
document.getElementById('load-more').addEventListener('click', () => {
  page++;
  fetchNews();
});
document.getElementById('toggle-dark').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
});

if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark');
}

fetchNews(true);
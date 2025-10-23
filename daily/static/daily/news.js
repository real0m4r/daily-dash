const API_KEY = 'pub_404327f383bbe2988cf8e78a25aabeb66217f';
const newsContainer = document.getElementById('news');
const loadMoreBtn = document.querySelector('#load-more');

let nextPage = '';
let currentQuery = '';
let currentSort = 'published_desc';
let language = 'en';
let typingTimer;

if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark');
}

async function fetchNews(reset = false) {
  if (reset) {
    newsContainer.innerHTML = '';
    nextPage = ''; // reset pagination
  }

  const url = new URL('https://newsdata.io/api/1/news');
  url.searchParams.append('apikey', API_KEY);
  url.searchParams.append('language', language);
  url.searchParams.append('q', currentQuery || 'latest');
  if (nextPage) url.searchParams.append('page', nextPage);

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();

    const articles = data.results || [];
    if (!articles.length) {
      if (reset) newsContainer.innerHTML = '<p>No news found.</p>';
      loadMoreBtn.style.display = 'none';
      return;
    }

    for (const article of articles) {
      const el = document.createElement('div');
      el.className = 'news-item';
      el.innerHTML = `
        <img src="${article.image_url || 'https://via.placeholder.com/180x120'}" class="news-image" alt="">
        <div class="news-content">
          <a href="${article.link}" target="_blank" class="news-title">${article.title || 'Untitled'}</a>
          <div class="source">${article.source_id || 'Unknown'} • ${new Date(article.pubDate).toLocaleString()}</div>
          <p>${article.description || ''}</p>
        </div>
      `;
      newsContainer.appendChild(el);
    }
    nextPage = data.nextPage || '';
    loadMoreBtn.style.display = nextPage ? 'block' : 'none';
  } catch (err) {
    console.error('Failed to fetch news:', err);
    newsContainer.innerHTML = '<p class="error">Failed to load news. Please try again later.</p>';
  }
}

document.getElementById('search').addEventListener('input', function () {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => {
    currentQuery = this.value.trim();
    fetchNews(true);
  }, 500);
});

loadMoreBtn.addEventListener('click', () => {
  if (nextPage) fetchNews();
});

document.getElementById('language').addEventListener('change', e => {
  language = e.target.value;
  fetchNews(true);
});
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('toggle-dark').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('darkMode', document.body.classList.contains('dark'));
  });
});

if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark');
}

fetchNews(true);

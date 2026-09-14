// articles.html only: search, genre filter, type filter and sort across
// every article on the site (no top-9 cap, unlike the homepage's browse.js).
// Pure client-side, no backend, matching the rest of the site.
(function () {
  var grid = document.getElementById('archive-grid');
  if (!grid) return;

  var searchInput = document.getElementById('article-search');
  var genreSelect = document.getElementById('genre-filter');
  var typeSelect = document.getElementById('type-filter');
  var sortSelect = document.getElementById('sort-order');
  var emptyMessage = document.getElementById('archive-empty');
  var cards = Array.prototype.slice.call(grid.querySelectorAll('.card'));
  var validGenres = ['all', 'games', 'movies', 'books', 'telly', 'tabletop'];
  var validTypes = ['all', 'news', 'review', 'feature'];

  function cardText(card) {
    var heading = card.querySelector('h2');
    var dek = card.querySelector('p.dek');
    return ((heading ? heading.textContent : '') + ' ' + (dek ? dek.textContent : '')).toLowerCase();
  }

  // Tag links land here as articles.html?genre=games&type=news - pick that
  // up once on load and pre-set both dropdowns.
  function paramFromUrl(name, valid) {
    var params = new URLSearchParams(window.location.search);
    var value = params.get(name);
    return valid.indexOf(value) !== -1 ? value : null;
  }

  function apply() {
    var query = searchInput.value.trim().toLowerCase();
    var genre = genreSelect.value;
    var type = typeSelect.value;
    var order = sortSelect.value;

    var visibleCount = 0;
    cards.forEach(function (card) {
      var matchesQuery = !query || cardText(card).indexOf(query) !== -1;
      var matchesGenre = genre === 'all' || card.dataset.genre === genre;
      var matchesType = type === 'all' || card.dataset.type === type;
      var show = matchesQuery && matchesGenre && matchesType;
      card.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });

    var sorted = cards.slice().sort(function (a, b) {
      var da = new Date(a.dataset.date).getTime();
      var db = new Date(b.dataset.date).getTime();
      return order === 'oldest' ? da - db : db - da;
    });
    sorted.forEach(function (card) { grid.appendChild(card); });

    emptyMessage.hidden = visibleCount !== 0;
  }

  searchInput.addEventListener('input', apply);
  genreSelect.addEventListener('change', apply);
  typeSelect.addEventListener('change', apply);
  sortSelect.addEventListener('change', apply);

  var urlGenre = paramFromUrl('genre', validGenres);
  if (urlGenre) genreSelect.value = urlGenre;
  var urlType = paramFromUrl('type', validTypes);
  if (urlType) typeSelect.value = urlType;

  apply();
})();

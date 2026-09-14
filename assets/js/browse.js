// Homepage-only: search, genre filter and sort for the "Also this week"
// card grid. The big featured hero above the grid is a fixed editorial pick
// for the unfiltered "All" view only. Its article also has a normal card in
// the grid (marked data-hero-dup="true") so genre filters that only match
// the hero's own article - e.g. Telly right now, since the hero is the only
// Telly piece - still show something instead of "nothing matches". That
// duplicate card is hidden specifically on the "All" view, where the hero
// already covers it. Pure client-side, no backend, since the whole site has
// no build step or server.
(function () {
  var grid = document.getElementById('cards-grid');
  if (!grid) return;

  var searchInput = document.getElementById('article-search');
  var genreSelect = document.getElementById('genre-filter');
  var sortSelect = document.getElementById('sort-order');
  var emptyMessage = document.getElementById('browse-empty');
  var sectionLabel = document.querySelector('.section-label');
  var hero = document.querySelector('.hero');
  var cards = Array.prototype.slice.call(grid.querySelectorAll('.card'));
  var validGenres = ['all', 'games', 'movies', 'books', 'telly', 'tabletop'];

  function cardText(card) {
    var heading = card.querySelector('h2');
    var dek = card.querySelector('p.dek');
    return ((heading ? heading.textContent : '') + ' ' + (dek ? dek.textContent : '')).toLowerCase();
  }

  // Nav links land here as index.html?genre=movies#browse - pick that up
  // once on load and pre-set the dropdown so the nav item actually filters
  // the page, rather than just scrolling to an empty anchor.
  function genreFromUrl() {
    var params = new URLSearchParams(window.location.search);
    var genre = params.get('genre');
    return validGenres.indexOf(genre) !== -1 ? genre : null;
  }

  function syncHero(genre) {
    if (!hero) return;
    // The big featured treatment is only for the unfiltered "All" view -
    // every other view shows its article as a normal card instead (see the
    // data-hero-dup card below), so nothing gets the oversized treatment
    // twice and nothing gets left out.
    hero.style.display = genre === 'all' ? '' : 'none';
  }

  function apply() {
    var query = searchInput.value.trim().toLowerCase();
    var genre = genreSelect.value;
    var order = sortSelect.value;

    var visibleCount = 0;
    cards.forEach(function (card) {
      var matchesQuery = !query || cardText(card).indexOf(query) !== -1;
      var matchesGenre = genre === 'all' || card.dataset.genre === genre;
      // On "All", the hero above already covers its own article in full
      // size, so skip the duplicate small card for it there.
      var isHiddenHeroDup = genre === 'all' && card.dataset.heroDup === 'true';
      var show = matchesQuery && matchesGenre && !isHiddenHeroDup;
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
    syncHero(genre);

    if (sectionLabel) {
      var option = genreSelect.options[genreSelect.selectedIndex];
      sectionLabel.textContent = genre === 'all' ? 'Also this week' : option.textContent;
    }
  }

  searchInput.addEventListener('input', apply);
  genreSelect.addEventListener('change', apply);
  sortSelect.addEventListener('change', apply);

  var urlGenre = genreFromUrl();
  if (urlGenre) genreSelect.value = urlGenre;

  apply();
})();

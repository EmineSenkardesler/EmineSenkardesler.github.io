// Minimal JS: mobile menu, hero GIF graceful fallback, footer year.
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
    });
  }

  // Hero GIF slot: only reveal it if assets/illinois-drought.gif actually loads.
  var img = document.getElementById('hero-gif');
  var fig = document.getElementById('hero-media');
  var grid = document.getElementById('hero-grid');
  if (img && fig) {
    if (grid) grid.classList.add('no-media');
    var probe = new Image();
    probe.onload = function () {
      img.src = img.getAttribute('data-src');
      fig.hidden = false;
      if (grid) grid.classList.remove('no-media');
    };
    probe.onerror = function () { fig.hidden = true; };
    probe.src = img.getAttribute('data-src');
  }

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

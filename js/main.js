// Minimal JS: mobile menu, footer year, figure zoom view.
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

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Zoom view: links with data-zoom open their image full screen; clicking the image toggles full size.
  var zoomLinks = document.querySelectorAll('a[data-zoom]');
  if (zoomLinks.length) {
    var box = document.createElement('div');
    box.className = 'zoom';
    box.hidden = true;
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Zoomed figure');
    box.innerHTML = '<button class="zoom-close" type="button" aria-label="Close">&times;</button><img alt=""><p class="zoom-hint">Click the image for full size &middot; Esc or click outside to close</p>';
    document.body.appendChild(box);
    var big = box.querySelector('img');
    var closeBtn = box.querySelector('.zoom-close');
    var opener = null;

    var close = function () {
      box.hidden = true;
      box.classList.remove('full');
      document.body.style.overflow = '';
      if (opener) opener.focus();
    };
    zoomLinks.forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        opener = a;
        var thumb = a.querySelector('img');
        big.src = a.getAttribute('href');
        big.alt = thumb ? thumb.alt : '';
        box.hidden = false;
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
      });
    });
    big.addEventListener('click', function (e) {
      e.stopPropagation();
      box.classList.toggle('full');
    });
    box.addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !box.hidden) close();
    });
  }
})();

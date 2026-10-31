// Minimal JS: mobile menu, footer year, timeline scroll fade-in.
(function () {
  var docEl = document.documentElement;
  docEl.classList.add('js');

  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  function initTimeline() {
    var items = document.querySelectorAll('.life-timeline .tl-item');
    if (!items.length) return;

    function reveal(el, instant) {
      el.classList.remove('is-waiting');
      el.classList.add('is-in');
      if (instant) {
        el.style.transition = 'none';
        el.style.opacity = '1';
        el.style.transform = 'none';
      }
    }
    function revealAll(instant) {
      for (var i = 0; i < items.length; i++) reveal(items[i], instant);
    }

    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      docEl.classList.add('rmotion');
      revealAll(true);
      return;
    }

    if (!('IntersectionObserver' in window)) {
      revealAll(true);
      return;
    }

    function nearViewport(el) {
      var r = el.getBoundingClientRect();
      var vh = window.innerHeight || 0;
      return r.top < vh + 200 && r.bottom > -200;
    }

    var io = new IntersectionObserver(function (entries) {
      for (var j = 0; j < entries.length; j++) {
        var entry = entries[j];
        if (!entry.isIntersecting) continue;
        reveal(entry.target, false);
        io.unobserve(entry.target);
      }
    }, { root: null, rootMargin: '200px 0px 200px 0px', threshold: 0 });

    for (var k = 0; k < items.length; k++) {
      var el = items[k];
      if (nearViewport(el)) {
        reveal(el, true);
      } else {
        el.classList.add('is-waiting');
      }
      io.observe(el);
    }

    // Fallback: never leave entries stuck faded (instant, no mid-fade)
    setTimeout(function () {
      revealAll(true);
      io.disconnect();
    }, 2000);
  }

  // After load so hash/#timeline scroll has settled; fully visible until then.
  if (document.readyState === 'complete') {
    initTimeline();
  } else {
    window.addEventListener('load', initTimeline);
  }
})();

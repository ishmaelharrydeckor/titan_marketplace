(function () {
  // Modals
  var lastFocus;
  function open(id) {
    var m = document.getElementById(id);
    if (!m) return;
    lastFocus = document.activeElement;
    m.hidden = false;
    document.body.classList.add('modal-open');
    var b = m.querySelector('.c-modal-close-btn');
    if (b) b.focus();
  }
  function close(m) {
    m.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastFocus) lastFocus.focus();
  }
  document.querySelectorAll('[data-modal]').forEach(function (btn) {
    btn.addEventListener('click', function () { open(btn.dataset.modal); });
  });
  document.querySelectorAll('.c-modal').forEach(function (m) {
    m.addEventListener('click', function (e) {
      if (e.target === m || e.target.closest('.c-modal-close-btn')) close(m);
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') document.querySelectorAll('.c-modal:not([hidden])').forEach(close);
  });

  // Team slider
  var slider = document.querySelector('.c-team-slider');
  var dots = document.querySelectorAll('.c-dots i');
  if (slider) {
    var step = function () {
      var card = slider.querySelector('.c-team-card');
      return card ? card.getBoundingClientRect().width + 24 : 300;
    };
    document.querySelectorAll('.c-arrow').forEach(function (a) {
      a.addEventListener('click', function () {
        slider.scrollBy({ left: step() * Number(a.dataset.dir), behavior: 'smooth' });
      });
    });
    slider.addEventListener('scroll', function () {
      var max = slider.scrollWidth - slider.clientWidth;
      var i = max > 0 ? Math.round((slider.scrollLeft / max) * (dots.length - 1)) : 0;
      dots.forEach(function (d, n) { d.classList.toggle('on', n === i); });
    }, { passive: true });
  }
})();

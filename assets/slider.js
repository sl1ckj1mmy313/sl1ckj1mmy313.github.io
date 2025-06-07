// assets/slider.js

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.showcase').forEach(showcase => {
    // grab only the detailed-card children (ignore subcards)
    const cards = Array.from(showcase.querySelectorAll(':scope > .detailed-card'));
    // only init slider if more than 3 cards
    if (cards.length <= 3) return;

    // wrap the cards in a sliding track
    const track = document.createElement('div');
    track.className = 'slider-track';
    cards.forEach(card => track.appendChild(card));

    // create prev/next buttons
    const prev = document.createElement('button');
    prev.className = 'slider-btn slider-prev';
    prev.textContent = '‹';
    const next = document.createElement('button');
    next.className = 'slider-btn slider-next';
    next.textContent = '›';

    // clear out original children, then append btn/track/btn
    showcase.innerHTML = '';
    showcase.append(prev, track, next);

    let index = 0;
    const visibleCount = 3;

    // update button visibility + disabled state
    function updateButtons() {
      const maxIndex = cards.length - visibleCount;
      prev.style.display = cards.length > visibleCount ? 'block' : 'none';
      next.style.display = cards.length > visibleCount ? 'block' : 'none';
      prev.disabled = index === 0;
      next.disabled = index >= maxIndex;
    }

    // slide to “page” i (0-based)
    function slideTo(i) {
      // clamp
      const maxIndex = cards.length - visibleCount;
      index = Math.max(0, Math.min(i, maxIndex));

      // recalc dynamic widths & gap
      const cardW = track.children[0].getBoundingClientRect().width;
      const style = window.getComputedStyle(track);
      const gap = parseFloat(style.gap || '0');

      // compute offset
      const offset = index * (cardW + gap);
      track.style.transform = `translateX(-${offset}px)`;

      updateButtons();
    }

    // wire buttons
    prev.addEventListener('click', () => slideTo(index - 1));
    next.addEventListener('click', () => slideTo(index + 1));

    // initialize
    track.style.transition = 'transform 0.4s ease';
    slideTo(0);
  });
});

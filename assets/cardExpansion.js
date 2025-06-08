// assets/cardExpansion.js

document.addEventListener('DOMContentLoaded', () => {
  // Inject custom scrollbar styles for popup
  const popupStyles = document.createElement('style');
  popupStyles.id = 'popup-scrollbar-styles';
  popupStyles.textContent = `
.popup-clone::-webkit-scrollbar {
  width: '8px',
  height: '8px',
}
.popup-clone::-webkit-scrollbar-track {
  background: '#1b1e2e',
  border-radius: '5px',
}
.popup-clone::-webkit-scrollbar-thumb {
  background: 'linear-gradient(180deg, #41e0ff 0%, #726bff 100%)',
  border-radius: '5px',
}
.popup-clone::-webkit-scrollbar-thumb:hover {
  background: 'linear-gradient(180deg, #72dfff 0%, #9c8eff 100%)',
}
.popup-clone {
  scrollbar-width: 'thin',
  scrollbar-color: '#41e0ff #1b1e2e',
}
@supports (-ms-overflow-style: none) {
  .popup-clone {
    -ms-overflow-style: 'scrollbar',
  }
}
  `;
  document.head.appendChild(popupStyles);
  const cards = document.querySelectorAll('.detailed-card, .detailed-subcard');
  const siteWrapper = document.getElementById('site-wrapper');
  const isMobile = () => window.innerWidth <= 600;
  const tapState = new WeakMap(); // mobile tap tracking

  // Create full-screen overlay with frosted blur
  const overlay = document.createElement('div');
  overlay.id = 'card-overlay';
  Object.assign(overlay.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'rgba(0,0,0,0.6)',
    display: 'none',
    zIndex: '1000',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)'
  });
  document.body.appendChild(overlay);

  cards.forEach(card => {
    const subs    = Array.from(card.querySelectorAll('.card-subtitle, .subcard-subtitle'));
    const summs   = Array.from(card.querySelectorAll('.card-summary, .subcard-summary'));
    const details = Array.from(card.querySelectorAll('.card-detail, .subcard-detail'));

    // Determine which elements to show on hover:
    // - Cards: subtitle + summary
    // - Subcards: subtitle only
    const isSubcard = card.classList.contains('detailed-subcard');
    const hoverEls  = isSubcard ? subs : subs.concat(summs);

    // Hide everything except the title
    const hideEls = subs.concat(summs, details);
    hideEls.forEach(el => {
      el.style.display = 'none';
      el.querySelectorAll('*').forEach(child => child.style.display = 'none');
    });

    const showHover   = () => hoverEls.forEach(el => el.style.display = 'block');
    const hideHover   = () => hoverEls.forEach(el => el.style.display = 'none');
    const isHoverShown = () => hoverEls.some(el => el.style.display === 'block');

    // Desktop hover activation
    if (!isMobile()) {
      card.addEventListener('mouseenter', () => {
        if (!card.classList.contains('expanded')) showHover();
      });
      card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('expanded')) hideHover();
      });
    }

    // Click/tap logic
    card.addEventListener('click', e => {
      if (overlay.querySelector('.popup-clone')) return;
      e.stopPropagation();

      // On mobile, first tap just reveals hover, second tap opens popup
      if (isMobile() && !isHoverShown()) {
        showHover();
        tapState.set(card, true);
        setTimeout(() => tapState.set(card, false), 3000);
        return;
      }

      // Show popup overlay
      overlay.style.display = 'flex';
      overlay.style.opacity = '0';
      document.body.style.overflow = 'hidden';
      if (siteWrapper) siteWrapper.style.filter = 'blur(5px)';
      overlay.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 250, easing: 'ease-out', fill: 'forwards' }
      );

      // Clone the card into the popup
      const popup = card.cloneNode(true);
      popup.classList.add('popup-clone');
      //  ↓↓↓  NEW: restyle all images in the popup  ↓↓↓
      popup.querySelectorAll('img').forEach(img => {
        Object.assign(img.style, {
          maxWidth: '150px',
          height: '150px',
          objectFit: 'contain',
          display: 'block',
          margin: '0 auto 1em'    // center if you like
        });
      });
      Object.assign(popup.style, {
        position: 'relative',
        width: isMobile() ? '95vw' : '80vw',
        maxWidth: '800px',
        maxHeight: isMobile() ? '90vh' : '80vh',
        overflowY: 'auto',
        scrollbarWidth: 'thin',
        opacity: '0',
        transform: 'scale(0.95)',
        transition: 'opacity 300ms ease, transform 300ms ease',
        zIndex: '1001',
        background: '#0f111a',
        color: '#e0f7ff',
        borderRadius: '12px',
        padding: '1em',
        boxShadow: '0 0 30px rgba(65, 224, 255, 0.3)'
      });

      // Reveal all content inside the popup
      popup.querySelectorAll(
        '.card-subtitle, .card-summary, .card-detail, ' +
        '.subcard-subtitle, .subcard-summary, .subcard-detail'
      ).forEach(el => {
        el.style.display = 'block';
        el.querySelectorAll('*').forEach(child => child.style.display = 'block');
      });

      // Style titles, subtitles, summaries, details in popup
      popup.querySelectorAll('.card-title, .subcard-title').forEach(el =>
        Object.assign(el.style, {
          fontSize: '1.8em',
          fontWeight: '700',
          color: '#ffffff',
          marginBottom: '0.25em',
          fontFamily: 'Cinzel, serif'
        })
      );
      popup.querySelectorAll('.card-subtitle, .subcard-subtitle').forEach(el =>
        Object.assign(el.style, {
          fontSize: '1.2em',
          fontWeight: '500',
          color: '#a0e0ff',
          marginBottom: '0.5em',
          fontStyle: 'italic'
        })
      );
      popup.querySelectorAll('.card-summary, .subcard-summary').forEach(el =>
        Object.assign(el.style, {
          fontSize: '1em',
          lineHeight: '1.6',
          color: '#c0ecff',
          marginBottom: '0.75em'
        })
      );
      popup.querySelectorAll('.card-detail, .subcard-detail').forEach(el =>
        Object.assign(el.style, {
          fontSize: '0.95em',
          lineHeight: '1.7',
          color: '#d0f7ff',
          marginTop: '0.5em'
        })
      );

      // Add close button
      const btn = document.createElement('button');
      btn.className = 'card-close';
      btn.setAttribute('aria-label', 'Close');
      const icon = document.createElement('img');
      icon.src = 'assets/close.svg';
      icon.alt = 'Close';
      icon.style.width = '24px';
      icon.style.height = '24px';
      btn.appendChild(icon);
      Object.assign(btn.style, {
        position: 'absolute',
        top: '12px',
        right: '12px',
        background: 'transparent',
        border: 'none',
        padding: '6px',
        borderRadius: '4px',
        cursor: 'pointer',
        zIndex: '1002'
      });
      btn.addEventListener('click', closePopup);
      popup.appendChild(btn);

      overlay.appendChild(popup);
      requestAnimationFrame(() => {
        popup.style.opacity = '1';
        popup.style.transform = 'scale(1)';
      });
    });
  });

  // Close popup on overlay click
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closePopup();
  });

  // Close popup on outside click
  document.addEventListener('click', e => {
    if (e.target.closest('.popup-clone')) return;
    if (!e.target.closest('.detailed-card, .detailed-subcard')) closePopup();
  });

  function closePopup() {
    const popup = overlay.querySelector('.popup-clone');
    if (!popup) return;

    popup.style.opacity = '0';
    popup.style.transform = 'scale(0.95)';
    overlay.animate(
      [{ opacity: 1 }, { opacity: 0 }],
      { duration: 200, easing: 'ease-in', fill: 'forwards' }
    );

    setTimeout(() => {
      overlay.style.display = 'none';
      document.body.style.overflow = '';
      if (siteWrapper) siteWrapper.style.filter = 'none';
      popup.remove();
    }, 250);
  }
});

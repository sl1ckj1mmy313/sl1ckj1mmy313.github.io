// assets/menubtn.js

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn  = document.querySelector('.menu-toggle');
  const iconImg    = toggleBtn.querySelector('img');
  const navElement = document.querySelector('nav.navbar');
  const navPanel   = document.querySelector('nav.navbar ul');

  let lastScrollY = window.pageYOffset;
  let ticking     = false;

  // 1) Toggle menu open/close
  toggleBtn.addEventListener('click', () => {
    const isOpen = toggleBtn.classList.toggle('open');

    if (isOpen) {
      iconImg.src = 'assets/close.svg';
      iconImg.alt = 'Close Menu';

      // Prevent body from scrolling
      document.body.classList.add('no-scroll');
      // Force nav to remain visible at top while menu is open
      document.body.classList.add('scroll-up');
      document.body.classList.remove('scroll-down');
    } else {
      iconImg.src = 'assets/menu.svg';
      iconImg.alt = 'Open Menu';

      // Re‐enable body scrolling
      document.body.classList.remove('no-scroll');
    }
  });

  // 2) Close on link click (mobile)
  document.querySelectorAll('nav.navbar ul li a').forEach(link => {
    link.addEventListener('click', () => {
      if (toggleBtn.classList.contains('open')) {
        toggleBtn.classList.remove('open');
        iconImg.src = 'assets/menu.svg';
        iconImg.alt = 'Open Menu';
        document.body.classList.remove('no-scroll');
      }
    });
  });

  // 3) Scroll-based nav behavior (desktop + mobile)
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.pageYOffset;

        // If the mobile menu overlay is open, skip scroll hiding
        if (!toggleBtn.classList.contains('open')) {
          if (currentScrollY > lastScrollY && currentScrollY > 50) {
            // Scrolling down → hide
            document.body.classList.add('scroll-down');
            document.body.classList.remove('scroll-up');
          } else if (currentScrollY < lastScrollY) {
            // Scrolling up → show
            document.body.classList.add('scroll-up');
            document.body.classList.remove('scroll-down');
          }
        }

        lastScrollY = currentScrollY;
        ticking = false;
      });
      ticking = true;
    }
  });
});

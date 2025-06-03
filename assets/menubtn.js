// assets/menubtn.js

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.menu-toggle');
  const iconImg   = toggleBtn.querySelector('img');
  const header    = document.querySelector('header.navbar');
  const navPanel  = document.querySelector('header.navbar ul');

  // Track last scroll position
  let lastScrollY = window.pageYOffset;
  let ticking     = false;

  // 1) Toggle mobile menu open/close
  toggleBtn.addEventListener('click', () => {
    const isOpen = toggleBtn.classList.toggle('open');

    if (isOpen) {
      iconImg.src = 'assets/close.svg';
      iconImg.alt = 'Close Menu';

      // Prevent body from scrolling
      document.body.style.overflow = 'hidden';
      // Force header/nav to remain visible at top while menu is open
      document.body.classList.add('scroll-up');
      document.body.classList.remove('scroll-down');
    } else {
      iconImg.src = 'assets/menu.svg';
      iconImg.alt = 'Open Menu';

      // Re‐enable body scrolling
      document.body.style.overflow = '';
    }
  });

  // 2) Close the menu when any nav link is clicked (mobile)
  document.querySelectorAll('header.navbar ul li a').forEach(link => {
    link.addEventListener('click', () => {
      if (toggleBtn.classList.contains('open')) {
        toggleBtn.classList.remove('open');
        iconImg.src = 'assets/menu.svg';
        iconImg.alt = 'Open Menu';
        document.body.style.overflow = '';
      }
    });
  });

  // 3) Hide/Show header + button on scroll (desktop + mobile)
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.pageYOffset;

        // If the menu overlay is currently open, do not hide the header
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
        ticking     = false;
      });

      ticking = true;
    }
  });
});

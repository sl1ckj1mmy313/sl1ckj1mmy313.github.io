// assets/menubtn.js

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.menu-toggle');
  const iconImg   = toggleBtn.querySelector('img');
  const header    = document.querySelector('header.navbar');

  let lastScrollY = window.pageYOffset;
  let ticking     = false;

  // 1) Toggle mobile menu open/close
  toggleBtn.addEventListener('click', () => {
    const isOpen = toggleBtn.classList.toggle('open');

    if (isOpen) {
      // Show “close” icon
      iconImg.src = 'assets/close.svg';
      iconImg.alt = 'Close Menu';
      // Prevent body from scrolling
      document.body.classList.add('no-scroll');
    } else {
      // Revert to hamburger icon
      iconImg.src = 'assets/menu.svg';
      iconImg.alt = 'Open Menu';
      // Restore body scrolling
      document.body.classList.remove('no-scroll');
    }
  });

  // 2) Close menu when any nav link clicked (mobile)
  document.querySelectorAll('.navbar ul li a').forEach(link => {
    link.addEventListener('click', () => {
      if (toggleBtn.classList.contains('open')) {
        toggleBtn.classList.remove('open');
        iconImg.src = 'assets/menu.svg';
        iconImg.alt = 'Open Menu';
        document.body.classList.remove('no-scroll');
      }
    });
  });

  // 3) Hide/Show header + button on scroll
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.pageYOffset;
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
          // Scrolling down: hide header + button
          document.body.classList.add('scroll-down');
          document.body.classList.remove('scroll-up');
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up: show header + button
          document.body.classList.add('scroll-up');
          document.body.classList.remove('scroll-down');
        }
        lastScrollY = currentScrollY;
        ticking = false;
      });
      ticking = true;
    }
  });
});

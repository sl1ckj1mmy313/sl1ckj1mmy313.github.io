// assets/menubtn.js

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.menu-toggle');
  const iconImg   = toggleBtn.querySelector('img');
  const header    = document.querySelector('header.navbar');
  const nav       = document.querySelector('header.navbar ul');

  let lastScrollY = window.pageYOffset;
  let ticking     = false;

  // Utility to disable body scrolling when overlay is open
  function disableBodyScroll() {
    document.body.classList.add('no-scroll');
  }
  function enableBodyScroll() {
    document.body.classList.remove('no-scroll');
  }

  // 1) Toggle mobile menu open/close
  toggleBtn.addEventListener('click', () => {
    const isOpen = toggleBtn.classList.toggle('open');

    if (isOpen) {
      iconImg.src = 'assets/close.svg';
      iconImg.alt = 'Close Menu';

      // Mark <header> as “open”
      header.classList.add('open');
      disableBodyScroll();
    } else {
      iconImg.src = 'assets/menu.svg';
      iconImg.alt = 'Open Menu';

      header.classList.remove('open');
      enableBodyScroll();
    }
  });

  // 2) Close menu when any nav link is clicked (mobile only)
  document.querySelectorAll('.navbar ul li a').forEach(link => {
    link.addEventListener('click', () => {
      if (toggleBtn.classList.contains('open')) {
        toggleBtn.classList.remove('open');
        header.classList.remove('open');
        iconImg.src = 'assets/menu.svg';
        iconImg.alt = 'Open Menu';
        enableBodyScroll();
      }
    });
  });

  // 3) Hide/Show header + button on scroll (desktop & mobile)
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.pageYOffset;

        // If we're scrolling down and have scrolled past 50px, hide
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
          document.body.classList.add('scroll-down');
          document.body.classList.remove('scroll-up');
        }
        // If we're scrolling up, show
        else if (currentScrollY < lastScrollY) {
          document.body.classList.add('scroll-up');
          document.body.classList.remove('scroll-down');
        }

        lastScrollY = currentScrollY;
        ticking     = false;
      });
      ticking = true;
    }
  });
});

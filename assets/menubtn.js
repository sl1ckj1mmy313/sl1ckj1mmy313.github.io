// assets/menubtn.js

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.menu-toggle');
  const iconImg   = toggleBtn.querySelector('img');
  const header    = document.querySelector('header.navbar');

  //  Track last scroll position
  let lastScrollY = window.pageYOffset;
  let ticking = false;

  // 1) Toggle mobile menu open/close
  toggleBtn.addEventListener('click', () => {
    const isOpen = toggleBtn.classList.toggle('open');
    if (isOpen) {
      iconImg.src = 'assets/close.svg';
      iconImg.alt = 'Close Menu';
    } else {
      iconImg.src = 'assets/menu.svg';
      iconImg.alt = 'Open Menu';
    }
  });

  // 2) Close menu when any nav link is clicked (mobile only)
  document.querySelectorAll('.navbar ul li a').forEach(link => {
    link.addEventListener('click', () => {
      if (toggleBtn.classList.contains('open')) {
        toggleBtn.classList.remove('open');
        iconImg.src = 'assets/menu.svg';
        iconImg.alt = 'Open Menu';
      }
    });
  });

  // 3) Hide/Show header + button on scroll (desktop & mobile)
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.pageYOffset;

        if (currentScrollY > lastScrollY && currentScrollY > 50) {
          // Scrolling down → hide header + (mobile) hamburger
          document.body.classList.add('scroll-down');
          document.body.classList.remove('scroll-up');
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up → show header + button
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

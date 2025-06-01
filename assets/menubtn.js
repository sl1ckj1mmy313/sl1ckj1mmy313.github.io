// assets/menubtn.js
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.menu-toggle');
  const iconImg   = toggleBtn.querySelector('img');

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

  // Close menu when any link is clicked
  document.querySelectorAll('.navbar ul li a').forEach(link => {
    link.addEventListener('click', () => {
      if (toggleBtn.classList.contains('open')) {
        toggleBtn.classList.remove('open');
        iconImg.src = 'assets/menu.svg';
        iconImg.alt = 'Open Menu';
      }
    });
  });
});

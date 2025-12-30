// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Open mobile menu when hamburger button is clicked
  hamburgerBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
  });

  // Close mobile menu when close button is clicked
  closeMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
  });

  // Close mobile menu when any navigation link is clicked
  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    });
  });

  // Close mobile menu when clicking outside of it
  document.addEventListener('click', (event) => {
    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnMenuBtn = hamburgerBtn.contains(event.target);

    if (!isClickInsideMenu && !isClickOnMenuBtn && mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
    }
  });
});

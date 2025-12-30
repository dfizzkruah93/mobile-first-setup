// Projects Data
const projects = [
  {
    id: 1,
    name: 'Portfolio page',
    description: 'This is my portfolio page and list of projects I have worked on.',
    fullDescription: 'A comprehensive portfolio website showcasing my skills, projects, and professional experience. Built with modern web technologies and responsive design principles to provide an optimal viewing experience across all devices.',
    image: 'assets/images/card1.png',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    liveLink: '#',
    sourceLink: '#',
  },
  {
    id: 2,
    name: 'Multi Post Stories',
    description: 'Experimental content creation feature that allows users to add to an existing story over the course of a day without spamming their friends.',
    fullDescription: 'An innovative social media feature that enables users to contribute to collaborative stories throughout the day. This experimental project explores new ways of content creation while respecting user experience and avoiding notification fatigue.',
    image: 'assets/images/card2.png',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Ruby on Rails'],
    liveLink: '#',
    sourceLink: '#',
  },
  {
    id: 3,
    name: 'Travel Monkey',
    description: 'A smart travel companion that leverages connected devices to control and monitor your journey, streamlining bookings, navigation, and on-the-go automation.',
    fullDescription: 'A comprehensive travel management application that integrates with various IoT devices and services to provide seamless travel experiences. Features include real-time navigation, automated booking management, and smart device integration for enhanced convenience.',
    image: 'assets/images/card3.png',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    liveLink: '#',
    sourceLink: '#',
    reverse: true,
  },
  {
    id: 4,
    name: 'The King Maker App',
    description: 'A smart assistant to make driving more safe, efficient, and fun by unlocking your most expensive computer: your car.',
    fullDescription: 'An intelligent automotive companion that transforms your vehicle into a connected experience. The app provides real-time diagnostics, safety features, route optimization, and entertainment options to enhance every journey.',
    image: 'assets/images/card4.png',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    liveLink: '#',
    sourceLink: '#',
  },
];

// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Generate project cards dynamically
  const projectsGrid = document.querySelector('.projects-grid');

  function createProjectCard(project) {
    const article = document.createElement('article');
    article.className = 'card';
    if (project.reverse) {
      article.classList.add('card-reverse');
    }

    const techListHTML = project.technologies.map((tech) => `<li>${tech}</li>`).join('');

    article.innerHTML = `
      <div class="image-container">
        <img src="${project.image}" alt="${project.name}" />
      </div>
      <div class="card-content">
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <ul class="tech-list">
          ${techListHTML}
        </ul>
        <button class="project-btn" data-project-id="${project.id}">See Project</button>
      </div>
    `;

    return article;
  }

  // Clear existing cards and generate new ones from data
  if (projectsGrid) {
    projectsGrid.innerHTML = '';
    projects.forEach((project) => {
      const card = createProjectCard(project);
      projectsGrid.appendChild(card);
    });
  }

  // Project Popup Functionality
  const projectPopup = document.getElementById('project-popup');
  const closePopupBtn = document.getElementById('close-popup-btn');
  const popupTitle = document.getElementById('popup-title');
  const popupImg = document.getElementById('popup-img');
  const popupDescription = document.getElementById('popup-description');
  const popupTechList = document.getElementById('popup-tech-list');
  const popupLiveLink = document.getElementById('popup-live-link');
  const popupSourceLink = document.getElementById('popup-source-link');

  // Function to open popup with project data
  function openPopup(projectId) {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;

    // Populate popup with project data
    popupTitle.textContent = project.name;
    popupImg.src = project.image;
    popupImg.alt = project.name;
    popupDescription.textContent = project.fullDescription;
    popupLiveLink.href = project.liveLink;
    popupSourceLink.href = project.sourceLink;

    // Generate tech list
    popupTechList.innerHTML = project.technologies
      .map((tech) => `<li>${tech}</li>`)
      .join('');

    // Show popup and prevent body scroll
    projectPopup.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Function to close popup
  function closePopup() {
    projectPopup.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Event delegation for project buttons
  if (projectsGrid) {
    projectsGrid.addEventListener('click', (event) => {
      if (event.target.classList.contains('project-btn')) {
        const projectId = parseInt(event.target.dataset.projectId, 10);
        openPopup(projectId);
      }
    });
  }

  // Close popup on close button click
  if (closePopupBtn) {
    closePopupBtn.addEventListener('click', closePopup);
  }

  // Close popup when clicking outside popup content
  if (projectPopup) {
    projectPopup.addEventListener('click', (event) => {
      if (event.target === projectPopup) {
        closePopup();
      }
    });
  }

  // Close popup on Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && projectPopup.classList.contains('active')) {
      closePopup();
    }
  });

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

  // Email validation for contact form
  const contactForm = document.querySelector('.contact-form');
  const emailInput = document.querySelector('input[name="email"]');
  const emailError = document.getElementById('email-error');

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      const emailValue = emailInput.value;

      // Check if email contains any uppercase letters
      if (emailValue !== emailValue.toLowerCase()) {
        event.preventDefault();
        emailError.textContent = 'Email must be in lowercase letters only.';
        emailError.style.display = 'block';
      } else {
        emailError.style.display = 'none';
      }
    });
  }
});

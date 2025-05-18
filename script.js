
// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navUl = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
  navUl.classList.toggle('show');
});


//test
// Smooth scroll highlight active link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
});

// Carousel
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const dots = document.querySelectorAll('.carousel-dots .dot');

let currentSlide = 0;

function updateCarousel(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  currentSlide = index;
}

prevBtn.addEventListener('click', () => {
  let index = currentSlide - 1;
  if (index < 0) index = slides.length - 1;
  updateCarousel(index);
});

nextBtn.addEventListener('click', () => {
  let index = currentSlide + 1;
  if (index >= slides.length) index = 0;
  updateCarousel(index);
});

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    updateCarousel(i);
  });
});

// Auto-slide every 6 seconds
setInterval(() => {
  let nextIndex = (currentSlide + 1) % slides.length;
  updateCarousel(nextIndex);
}, 6000);

// Contact form validation
const form = document.getElementById('contactForm');
const nameInput = form.name;
const emailInput = form.email;
const messageInput = form.message;

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const formMessage = document.getElementById('formMessage');

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showError(input, errorEl, message) {
  errorEl.textContent = message;
  errorEl.style.display = 'block';
  input.setAttribute('aria-invalid', 'true');
}

function clearError(input, errorEl) {
  errorEl.textContent = '';
  errorEl.style.display = 'none';
  input.removeAttribute('aria-invalid');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let valid = true;

  if (nameInput.value.trim() === '') {
    showError(nameInput, nameError, 'Name is required.');
    valid = false;
  } else {
    clearError(nameInput, nameError);
  }

  if (!validateEmail(emailInput.value.trim())) {
    showError(emailInput, emailError, 'Valid email is required.');
    valid = false;
  } else {
    clearError(emailInput, emailError);
  }

  if (messageInput.value.trim().length < 10) {
    showError(messageInput, messageError, 'Message must be at least 10 characters.');
    valid = false;
  } else {
    clearError(messageInput, messageError);
  }

  if (valid) {
    // Simulate form submission success
    formMessage.textContent = 'Thank you! Your message has been sent.';
    formMessage.style.color = '#27ae60';
    formMessage.style.display = 'block';

    form.reset();

    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 5000);
  } else {
    formMessage.style.display = 'none';
  }
});
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  // Replace this URL with your actual Google Form URL:
  const googleFormURL = 'https://docs.google.com/forms/d/e/1FAIpQLSdUB6ZMoYo27-93MKJAxHf920GB9f0O_A96Kez-E6O1TzI3rw/viewform?usp=https://docs.google.com/forms/d/e/1FAIpQLSf-JtviCeNtljp3VFL-QM0gpmvgEN4Xpbbf8jmZD9Ge9u3HKg/viewform?usp=header';
  window.open(googleFormURL, '_blank');
});

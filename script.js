// The Baobab Traveler - JavaScript

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('mobile-active');
      this.textContent = navLinks.classList.contains('mobile-active') ? '✕' : '☰';
    });
  }

  // Close mobile menu when clicking on a link
  const navLinkItems = document.querySelectorAll('.nav-links a');
  navLinkItems.forEach(link => {
    link.addEventListener('click', function() {
      if (navLinks.classList.contains('mobile-active')) {
        navLinks.classList.remove('mobile-active');
        if (mobileMenuBtn) {
          mobileMenuBtn.textContent = '☰';
        }
      }
    });
  });

  // Active navigation highlight
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinkItems.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
});

// Stats Counter Animation
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 60;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target.toLocaleString() + (element.dataset.suffix || '');
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current).toLocaleString() + (element.dataset.suffix || '');
    }
  }, 33);
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
      
      // Trigger counter animation
      if (entry.target.classList.contains('stat-value')) {
        const target = parseInt(entry.target.dataset.target);
        animateCounter(entry.target, target);
        observer.unobserve(entry.target);
      }
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
  const animatedElements = document.querySelectorAll('.card, .stat-value, .testimonial, .food-section');
  animatedElements.forEach(el => observer.observe(el));
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Form Validation
function validateContactForm(event) {
  event.preventDefault();
  
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  
  let isValid = true;
  
  if (!name.value.trim()) {
    alert('Please enter your name');
    isValid = false;
  }
  
  if (!email.value.trim() || !email.value.includes('@')) {
    alert('Please enter a valid email address');
    isValid = false;
  }
  
  if (!message.value.trim()) {
    alert('Please enter a message');
    isValid = false;
  }
  
  if (isValid) {
    alert('Thank you for your message! We will get back to you soon.');
    event.target.reset();
  }
}

// Newsletter Subscription
function subscribeNewsletter(event) {
  event.preventDefault();
  const emailInput = event.target.querySelector('input[type="email"]');
  
  if (emailInput.value && emailInput.value.includes('@')) {
    alert('Thank you for subscribing to our newsletter!');
    emailInput.value = '';
  } else {
    alert('Please enter a valid email address');
  }
}

// Gallery Lightbox (simple version)
function openLightbox(imageSrc) {
  const lightbox = document.createElement('div');
  lightbox.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    cursor: pointer;
  `;
  
  const img = document.createElement('img');
  img.src = imageSrc;
  img.style.cssText = 'max-width: 90%; max-height: 90%; border-radius: 0.5rem;';
  
  lightbox.appendChild(img);
  document.body.appendChild(lightbox);
  
  lightbox.addEventListener('click', function() {
    document.body.removeChild(lightbox);
  });
}

// Add event listeners to gallery items
document.addEventListener('DOMContentLoaded', function() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const img = this.querySelector('img');
      if (img) {
        openLightbox(img.src);
      }
    });
  });
});

// WhatsApp Integration
function openWhatsApp() {
  const phoneNumber = '2671234567'; // Replace with actual number
  const message = 'Hello! I would like to inquire about The Baobab Traveler packages.';
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// Booking Form Handler
function handleBooking(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  
  console.log('Booking Data:', data);
  
  // For now, show success message and redirect to WhatsApp
  alert('Thank you for your booking request! We will contact you shortly via WhatsApp.');
  openWhatsApp();
  event.target.reset();
}

// Scroll to top button
window.addEventListener('scroll', function() {
  if (window.scrollY > 500) {
    document.body.classList.add('show-scroll-top');
  } else {
    document.body.classList.remove('show-scroll-top');
  }
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

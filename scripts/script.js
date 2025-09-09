// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Sticky Navigation
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Portfolio Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Testimonial Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const totalSlides = slides.length;

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Show current slide
    slides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Auto slide change every 5 seconds
let slideInterval = setInterval(nextSlide, 5000);

// Pause auto slide when hovering over testimonials
const testimonialContainer = document.querySelector('.testimonial-container');
testimonialContainer.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

testimonialContainer.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
});

// Manual navigation
document.querySelector('.next-btn').addEventListener('click', () => {
    nextSlide();
    resetInterval();
});

document.querySelector('.prev-btn').addEventListener('click', () => {
    prevSlide();
    resetInterval();
});

function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
}

// Form Validation
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form elements
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation
        if (name === '') {
            alert('Please enter your name');
            return;
        }
        
        if (email === '') {
            alert('Please enter your email');
            return;
        }
        
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        if (subject === '') {
            alert('Please enter a subject');
            return;
        }
        
        if (message === '') {
            alert('Please enter your message');
            return;
        }
        
        // If all validations pass
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Newsletter Form Validation
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email === '') {
            alert('Please enter your email address');
            return;
        }
        
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // If validation passes
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });
}

// Service Button Interaction
const serviceButtons = document.querySelectorAll('.service-btn');

serviceButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const serviceName = this.parentElement.querySelector('h3').textContent;
        openServiceRequestModal(serviceName);
    });
});

// Portfolio Button Interaction
const portfolioButtons = document.querySelectorAll('.portfolio-btn');

portfolioButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation(); // Prevent closing the overlay
        const serviceName = this.getAttribute('data-service');
        openServiceRequestModal(serviceName);
    });
});

// Service Appointment Button Interaction
const serviceAppointmentButtons = document.querySelectorAll('.service-appointment-btn');

serviceAppointmentButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const serviceName = this.getAttribute('data-service');
        openServiceRequestModal(serviceName);
    });
});

// Portfolio Item Interaction
const portfolioItemsOverlay = document.querySelectorAll('.portfolio-item');

portfolioItemsOverlay.forEach(item => {
    item.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        const title = this.querySelector('h3').textContent;
        alert(`You're viewing details for ${title} in the ${category} category. In a full implementation, this would show a detailed project view.`);
    });
});

// Animation on Scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .portfolio-item, .highlight-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animated elements
document.querySelectorAll('.service-card, .portfolio-item, .highlight-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Trigger animation on scroll
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.padding = '20px 0';
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// Service Request Modal
const modal = document.getElementById('serviceRequestModal');
const closeBtn = document.querySelector('.modal .close');
const serviceRequestForm = document.getElementById('serviceRequestForm');

// Open modal function
function openServiceRequestModal(serviceName = '') {
    modal.style.display = 'flex';
    if (serviceName) {
        document.getElementById('serviceSelect').value = serviceName;
    }
}

// Close modal
function closeServiceRequestModal() {
    modal.style.display = 'none';
    serviceRequestForm.reset();
}

// Close modal when clicking on close button
closeBtn.addEventListener('click', closeServiceRequestModal);

// Close modal when clicking outside of modal content
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeServiceRequestModal();
    }
});

// Handle form submission
serviceRequestForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const service = document.getElementById('serviceSelect').value;
    const name = document.getElementById('clientName').value;
    const mobile = document.getElementById('clientMobile').value;
    
    // Validate form
    if (!service || !name || !mobile) {
        alert('Please fill in all fields');
        return;
    }
    
    // Create WhatsApp message
    const message = `Hello, I'm interested in your ${service} service.%0A%0AName: ${name}%0AMobile: ${mobile}%0A%0APlease provide more information.`;
    
    // Your WhatsApp number (replace with your actual number)
    const whatsappNumber = '+919453890688'; // Replace this with your actual WhatsApp number
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    // Close modal
    closeServiceRequestModal();
    
    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
    
    // Show confirmation
    alert('Thank you! We will contact you shortly via WhatsApp.');
});

// Update service buttons to open the request form
document.querySelectorAll('.service-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const serviceName = this.parentElement.querySelector('h3').textContent;
        openServiceRequestModal(serviceName);
    });
});

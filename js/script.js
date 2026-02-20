/* ========================================
   Portfolio Website JavaScript
   Thushara Sandeepani
   ======================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functionality
    initNavigation();
    initSmoothScroll();
    initScrollAnimations();
    initBackToTop();
    initNavbarScroll();
    initActiveNavigation();
});

/* ========================================
   Navigation Functionality
   ======================================== */
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (navToggle && navMenu) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
}

/* ========================================
   Smooth Scrolling
   ======================================== */
function initSmoothScroll() {
    // Get all links that have hash references
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ========================================
   Scroll Animations (Intersection Observer)
   ======================================== */
function initScrollAnimations() {
    // Elements to animate
    const animatedElements = document.querySelectorAll(
        '.section-title, .section-subtitle, .about-text, .about-card, ' +
        '.skill-category, .project-card, .education-card, .contact-item, ' +
        '.cta-card, .interest-tags, .about-interests, .about-goals'
    );

    // Add initial animation classes
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${(index % 4) * 0.1}s`;
    });

    // Create Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Special animation for hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('fade-in');
        setTimeout(() => {
            heroContent.classList.add('visible');
        }, 100);
    }
}

/* ========================================
   Back to Top Button
   ======================================== */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');

    if (!backToTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top on click
    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ========================================
   Navbar Scroll Effect
   ======================================== */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');

    if (!navbar) return;

    let lastScrollTop = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add shadow when scrolled
        if (scrollTop > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });
}

/* ========================================
   Active Navigation Link
   ======================================== */
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        const scrollPosition = window.pageYOffset + 100; // Offset for navbar

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Update on scroll
    window.addEventListener('scroll', updateActiveLink);

    // Initial check
    updateActiveLink();
}

/* ========================================
   Typing Effect (Optional - for hero subtitle)
   ======================================== */
function initTypingEffect() {
    const element = document.querySelector('.hero-subtitle');

    if (!element) return;

    const text = element.textContent;
    element.textContent = '';

    let index = 0;

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, 50);
        }
    }

    // Start typing after a short delay
    setTimeout(type, 500);
}

/* ========================================
   Skill Progress Animation (Optional)
   ======================================== */
function animateSkillProgress() {
    const skillBars = document.querySelectorAll('.skill-progress');

    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = '0%';

        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 200);
    });
}

/* ========================================
   Project Card Hover Effects
   ======================================== */
function initProjectHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });
}

/* ========================================
   Form Validation (if contact form is added)
   ======================================== */
function initFormValidation() {
    const form = document.querySelector('.contact-form');

    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form fields
        const name = form.querySelector('input[name="name"]');
        const email = form.querySelector('input[name="email"]');
        const message = form.querySelector('textarea[name="message"]');

        let isValid = true;

        // Validate name
        if (name && name.value.trim() === '') {
            showError(name, 'Name is required');
            isValid = false;
        }

        // Validate email
        if (email && !isValidEmail(email.value)) {
            showError(email, 'Valid email is required');
            isValid = false;
        }

        // Validate message
        if (message && message.value.trim() === '') {
            showError(message, 'Message is required');
            isValid = false;
        }

        if (isValid) {
            // Submit form or show success message
            console.log('Form submitted successfully');
            form.reset();
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message') || document.createElement('span');

    errorElement.className = 'error-message';
    errorElement.textContent = message;

    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorElement);
    }

    input.classList.add('error');
}

/* ========================================
   Lazy Loading Images
   ======================================== */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

/* ========================================
   Parallax Effect (Optional)
   ======================================== */
function initParallax() {
    const shapes = document.querySelectorAll('.shape');

    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

/* ========================================
   Counter Animation (Optional)
   ======================================== */
function animateCounters() {
    const counters = document.querySelectorAll('.counter');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

/* ========================================
   Theme Toggle (Optional - for dark mode)
   ======================================== */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');

    if (!themeToggle) return;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', function () {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

/* ========================================
   Utility Functions
   ======================================== */

// Debounce function for performance
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function () {
        const context = this, args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/* ========================================
   Initialize Additional Features
   ======================================== */
document.addEventListener('DOMContentLoaded', function () {
    // Initialize optional features
    initLazyLoading();

    // Uncomment to enable additional features:
    // initTypingEffect();
    // initParallax();
    // initThemeToggle();
    // initProjectHoverEffects();
});

/* ========================================
   Window Load Event
   ======================================== */
window.addEventListener('load', function () {
    // Remove any loading screen
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.remove();
        }, 500);
    }

    // Trigger initial animations
    document.body.classList.add('loaded');
});

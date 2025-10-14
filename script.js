/*
   Main JavaScript file for JheevaShankar's portfolio website
   Author: JheevaShankar
   Date: Updated October 2023
   Description: JavaScript functionality for a modern responsive portfolio website
*/

// Handle preloader - Multiple robust approaches to ensure it always gets removed
const removePreloader = function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        // Add hide class for CSS transitions
        preloader.classList.add('hide');
        
        // Add loaded class to body for redundant control
        document.body.classList.add('loaded');
        
        // Activate animation for hero section elements
        const heroElements = document.querySelectorAll('.animate-fade-in');
        if (heroElements) {
            heroElements.forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        }
        
        // Force remove preloader after transition
        setTimeout(() => {
            if (preloader && preloader.parentNode) {
                preloader.style.display = 'none';
                preloader.style.visibility = 'hidden';
                preloader.style.opacity = '0';
            }
        }, 500);
    }
};

// Execute immediately if page is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    removePreloader();
}

// Ensure preloader is removed when page loads
window.addEventListener('load', () => {
    removePreloader();
    
    // Force all reveal elements to be visible
    document.querySelectorAll('.reveal').forEach(el => {
        el.classList.add('active');
    });
});
window.addEventListener('DOMContentLoaded', removePreloader);

// Backup - force remove preloader after 2 seconds no matter what
setTimeout(() => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.display = 'none';
        preloader.style.visibility = 'hidden';
        preloader.style.opacity = '0';
        document.body.classList.add('loaded');
    }
}, 2000);

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== VARIABLES =====
    const header = document.getElementById('header');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');
    const scrollUpBtn = document.getElementById('scroll-up');
    const sections = document.querySelectorAll('section[id]');
    const revealElements = document.querySelectorAll('.reveal');
    const contactForm = document.getElementById('contact-form');
    
    // ===== FUNCTIONS =====
    
    // Function to toggle the mobile navigation menu
    function toggleMobileNav() {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('show-menu');
        document.body.classList.toggle('no-scroll'); // Prevent scrolling when nav is open
    }
    
    // Function to close the mobile navigation menu
    function closeMobileNav() {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('show-menu');
        document.body.classList.remove('no-scroll');
    }
    
    // Function to handle scroll events
    function handleScroll() {
        const scrollY = window.scrollY;
        
        // Add class to header on scroll
        if (scrollY >= 80) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
        
        // Show or hide scroll-up button
        if (scrollY >= 350 && scrollUpBtn) {
            scrollUpBtn.classList.add('show-scroll');
        } else if (scrollUpBtn) {
            scrollUpBtn.classList.remove('show-scroll');
        }
        
        // Update active navigation link based on scroll position
        updateActiveNavLink();
        
        // Animate elements when they come into view
        animateOnScroll();
    }
    
    // Function to update active navigation link based on scroll position
    function updateActiveNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
            
            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else if (navLink) {
                navLink.classList.remove('active');
            }
        });
    }
    
    // Function to animate elements when they come into view
    function animateOnScroll() {
        revealElements.forEach((reveal) => {
            const windowHeight = window.innerHeight;
            const elementTop = reveal.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            } else {
                // Remove this conditional to ensure elements stay visible once revealed
                // reveal.classList.remove('active');
            }
        });
    }
    
    // Function to handle smooth scrolling for anchor links
    function smoothScroll(e) {
        if (this.hash !== '') {
            e.preventDefault();
            
            const hash = this.hash;
            const targetElement = document.querySelector(hash);
            
            if (targetElement) {
                // Close mobile nav if open
                closeMobileNav();
                
                // Scroll to the target element
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
                
                // Update URL hash without jumping
                window.history.pushState(null, null, hash);
            }
        }
    }
    
    // Function to handle form submission
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const formResponse = document.getElementById('form-response');
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple form validation
        if (!name || !email || !message) {
            formResponse.textContent = 'Please fill in all fields';
            formResponse.style.color = 'var(--error-color, #ff4d4d)';
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formResponse.textContent = 'Please enter a valid email address';
            formResponse.style.color = 'var(--error-color, #ff4d4d)';
            return;
        }
        
        // In a real project, you would send the form data to a server here
        
        // Show success message
        formResponse.textContent = 'Thank you! Your message has been sent.';
        formResponse.style.color = 'var(--success-color, #00b894)';
        
        // Reset form
        contactForm.reset();
        
        // Reset message after 5 seconds
        setTimeout(() => {
            formResponse.textContent = '';
        }, 5000);
    }
    
    // Function for project filtering
    function setupProjectFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        if (filterButtons.length > 0) {
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    const filter = this.dataset.filter;
                    
                    projectCards.forEach(card => {
                        if (filter === 'all') {
                            card.style.display = 'block';
                        } else if (card.classList.contains(filter)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });
        }
    }
    
    // Function to handle image fallbacks
    function setupImageFallbacks() {
        const projectImages = document.querySelectorAll('.project-img');
        
        projectImages.forEach(img => {
            img.onerror = function() {
                // Set a fallback image if the original fails to load
                this.src = 'https://via.placeholder.com/600x400?text=Project+Image';
            };
        });
    }
    
    // Function to handle smooth scrolling for anchor links
    function smoothScroll(e) {
        if (this.hash !== '') {
            e.preventDefault();
            
            const hash = this.hash;
            const targetElement = document.querySelector(hash);
            
            if (targetElement) {
                // Close mobile nav if open
                closeMobileNav();
                
                // Scroll to the target element
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
                
                // Update URL hash without jumping
                window.history.pushState(null, null, hash);
            }
        }
    }
    
    // Function to handle form submission
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const formResponse = document.getElementById('form-response');
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple form validation
        if (!name || !email || !message) {
            formResponse.textContent = 'Please fill in all fields';
            formResponse.style.color = 'var(--error-color, #ff4d4d)';
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formResponse.textContent = 'Please enter a valid email address';
            formResponse.style.color = 'var(--error-color, #ff4d4d)';
            return;
        }
        
        // In a real project, you would send the form data to a server here
        
        // Show success message
        formResponse.textContent = 'Thank you! Your message has been sent.';
        formResponse.style.color = 'var(--success-color, #00b894)';
        
        // Reset form
        contactForm.reset();
        
        // Reset message after 5 seconds
        setTimeout(() => {
            formResponse.textContent = '';
        }, 5000);
    }
    
    // Function for project filtering
    function setupProjectFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        if (filterButtons.length > 0) {
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    const filter = this.dataset.filter;
                    
                    projectCards.forEach(card => {
                        if (filter === 'all') {
                            card.style.display = 'block';
                        } else if (card.classList.contains(filter)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });
        }
    }
    
    // ===== EVENT LISTENERS =====
    
    // Toggle mobile navigation menu when hamburger icon is clicked
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileNav);
    }
    
    // Close mobile navigation menu when a nav link is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', closeMobileNav);
        item.addEventListener('click', smoothScroll);
    });
    
    // Handle scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Smooth scrolling for all links that point to an ID
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', smoothScroll);
    });
    
    // Handle form submission
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Scroll to top when scroll-up button is clicked
    if (scrollUpBtn) {
        scrollUpBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===== INITIALIZATION =====
    
    // Setup project filter
    setupProjectFilter();
    
    // Setup image fallbacks
    setupImageFallbacks();
    
    // Trigger scroll event once on page load to set initial states
    handleScroll();
    
    // Make all elements with reveal class visible immediately on small devices
    if (window.innerWidth < 768) {
        revealElements.forEach(el => {
            el.classList.add('active');
        });
    }
    
    // Add class to body when page is loaded
    document.body.classList.add('loaded');
});
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.85) {
                element.classList.add('show');
            }
        });
        
        staggerItems.forEach((item, index) => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemTop < windowHeight * 0.85) {
                setTimeout(() => {
                    item.classList.add('show');
                }, 100 * index);
            }
        });
    }
    
    // Function to handle smooth scrolling for anchor links
    function smoothScroll(e) {
        if (this.hash !== '') {
            e.preventDefault();
            
            const hash = this.hash;
            const targetElement = document.querySelector(hash);
            
            if (targetElement) {
                // Close mobile nav if open
                closeMobileNav();
                
                // Scroll to the target element
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for header height
                    behavior: 'smooth'
                });
                
                // Update URL hash without jumping
                window.history.pushState(null, null, hash);
            }
        }
    }
    
    // Function to handle form submission
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple form validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // In a real project, you would send the form data to a server here
        // For this example, we'll just show a success message
        
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success-message';
        successMessage.innerHTML = `
            <h3>Thank you for your message, ${name}!</h3>
            <p>I'll get back to you as soon as possible.</p>
        `;
        
        // Replace form with success message
        contactForm.innerHTML = '';
        contactForm.appendChild(successMessage);
    }
    
    // Make all project images and skill cards animate on scroll
    function setupAnimatedElements() {
        // Add fade-in class to specific elements
        document.querySelectorAll('.about-text p').forEach(el => {
            el.classList.add('fade-in');
        });
        
        document.querySelectorAll('.skill-card').forEach(el => {
            el.classList.add('fade-in');
        });
        
        // Add stagger-item class to project cards
        document.querySelectorAll('.project-card').forEach(el => {
            el.classList.add('stagger-item');
        });
    }
    
    // ===== EVENT LISTENERS =====
    
    // Toggle mobile navigation menu when hamburger icon is clicked
    hamburger.addEventListener('click', toggleMobileNav);
    
    // Close mobile navigation menu when a nav link is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', smoothScroll);
    });
    
    // Handle scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Smooth scrolling for all links that point to an ID
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', smoothScroll);
    });
    
    // Handle form submission
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // ===== INITIALIZATION =====
    
    // Setup animated elements
    setupAnimatedElements();
    
    // Trigger scroll event once on page load to set initial states
    handleScroll();
    
    // Force show all elements immediately for better reliability
    document.querySelectorAll('.fade-in, .stagger-item').forEach(el => {
        el.classList.add('show');
    });
    
    // Make all project cards and skill cards visible immediately
    document.querySelectorAll('.project-card, .skill-card').forEach(el => {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
    });
    
    // Add class to body when page is loaded
    document.body.classList.add('loaded');
});
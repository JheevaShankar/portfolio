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
    document.querySelectorAll('.animate-fade-in').forEach(el => {
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
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollUpBtn = document.querySelector('.scroll-up');
    const sections = document.querySelectorAll('section[id]');
    const contactForm = document.getElementById('contact-form');
    
    // ===== FUNCTIONS =====
    
    // Function to handle scroll events
    function handleScroll() {
        const scrollY = window.scrollY;
        
        // Update active navigation link based on scroll position
        updateActiveNavLink();
        
        // Show or hide scroll-up button
        if (scrollY >= 350 && scrollUpBtn) {
            scrollUpBtn.classList.add('show-scroll');
        } else if (scrollUpBtn) {
            scrollUpBtn.classList.remove('show-scroll');
        }
    }
    
    // Function to update active navigation link based on scroll position
    function updateActiveNavLink() {
        const scrollY = window.scrollY;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
            
            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
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
            formResponse.style.color = '#ff4d4d';
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formResponse.textContent = 'Please enter a valid email address';
            formResponse.style.color = '#ff4d4d';
            return;
        }
        
        // In a real project, you would send the form data to a server here
        
        // Show success message
        formResponse.textContent = 'Thank you! Your message has been sent.';
        formResponse.style.color = '#00b894';
        
        // Reset form
        contactForm.reset();
    }
    
    // ===== EVENT LISTENERS =====
    
    // Scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                window.history.pushState(null, null, targetId);
            }
        });
    });
    
    // Scroll up button event listener
    if (scrollUpBtn) {
        scrollUpBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Contact form submit event listener
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Initial call to set active nav link
    updateActiveNavLink();
});
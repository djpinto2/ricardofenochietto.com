const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const backToTopBtn = document.getElementById('backToTop');
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanes = document.querySelectorAll('.tab-pane');

document.addEventListener('DOMContentLoaded', function() {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }

        updateActiveNavLink();
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    initializeAnimations();
    initializeIntersectionObserver();
});

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const navHeight = navbar.offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

function initializeAnimations() {
    const cards = document.querySelectorAll('.book-card, .publication-item, .contact-item, .stat-card');
    cards.forEach(card => {
        card.classList.add('hover-lift');
    });

    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.classList.add('fade-in-up');
        }, 500);
    }
}

function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll(`
        .section-header,
        .about-content,
        .book-card,
        .publication-item,
        .contact-item,
        .stat-card
    `);

    animateElements.forEach(el => {
        observer.observe(el);
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedScrollHandler = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const activeTab = document.querySelector('.tab-button.active');
        if (activeTab && document.activeElement === activeTab) {
            e.preventDefault();
            const tabButtons = Array.from(document.querySelectorAll('.tab-button'));
            const currentIndex = tabButtons.indexOf(activeTab);
            let nextIndex;
            
            if (e.key === 'ArrowLeft') {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : tabButtons.length - 1;
            } else {
                nextIndex = currentIndex < tabButtons.length - 1 ? currentIndex + 1 : 0;
            }
            
            tabButtons[nextIndex].click();
            tabButtons[nextIndex].focus();
        }
    }
});

function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

document.addEventListener('DOMContentLoaded', initializeLazyLoading);

document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="http"]') || e.target.closest('a[href^="http"]')) {
        const link = e.target.matches('a') ? e.target : e.target.closest('a');
        
        if (!link.getAttribute('rel')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
    }
});

let ticking = false;

function updateScrollEffects() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
    
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            if (!name || !email || !message) {
                alert('Please complete all fields.');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email.');
                return;
            }
            
            alert('Message sent successfully. We will contact you soon.');
            contactForm.reset();
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

document.addEventListener('DOMContentLoaded', initializeContactForm);

function preloadCriticalImages() {
    const criticalImages = [
        'images/image1.jpg',
        'images/image2.png',
        'images/image3.png'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

document.addEventListener('DOMContentLoaded', preloadCriticalImages);

function trackEvent(eventName, data = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, data);
    }
    
    console.log('Event tracked:', eventName, data);
}

document.addEventListener('click', function(e) {
    const target = e.target;
    
    if (target.matches('.book-link') || target.closest('.book-link')) {
        trackEvent('book_link_click', {
            book_title: target.closest('.book-card')?.querySelector('.book-title')?.textContent || 'Unknown'
        });
    }
    
    if (target.matches('.publication-link') || target.closest('.publication-link')) {
        trackEvent('publication_link_click', {
            publication_title: target.closest('.publication-item')?.querySelector('.publication-title')?.textContent || 'Unknown'
        });
        }
    
    if (target.matches('.academic-link') || target.closest('.academic-link')) {
        trackEvent('academic_link_click', {
            platform: target.textContent.trim() || 'Unknown'
        });
    }
});

let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konamiSequence.length && 
        konamiCode.every((code, index) => code === konamiSequence[index])) {
        
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = '';
        }, 3000);
        
        console.log('🎉 Easter egg activated! Ricardo appreciates your curiosity about economics!');
        konamiCode = [];
    }
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
} 
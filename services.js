// Services Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MOBILE MENU FUNCTIONALITY ==========
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const nav = document.getElementById('mainNav');
    
    // Toggle mobile menu with hamburger animation
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Toggle aria-expanded
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle hamburger animation
            this.classList.toggle('active');
            
            // Toggle menu visibility
            navLinks.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            
            // Toggle body scroll
            if (!isExpanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
    
    // Close menu when clicking overlay
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', function() {
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            this.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992 && navLinks.classList.contains('active')) {
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (nav) {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
        
        // Back to top button visibility
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    });
    
    // ========== FAQ ACCORDION ==========
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = this.nextElementSibling;
            const icon = this.querySelector('.faq-icon i');
            
            // Close other FAQs (if you want only one open at a time)
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== faqItem) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.faq-icon i');
                    otherAnswer.style.maxHeight = null;
                    if (otherIcon) {
                        otherIcon.style.transform = 'rotate(0deg)';
                    }
                }
            });
            
            // Toggle current FAQ
            faqItem.classList.toggle('active');
            
            if (faqItem.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                if (icon) {
                    icon.style.transform = 'rotate(180deg)';
                    icon.className = 'fas fa-chevron-up';
                }
            } else {
                answer.style.maxHeight = null;
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                    icon.className = 'fas fa-check-circle';
                }
            }
        });
        
        // Keyboard navigation
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // ========== SMOOTH SCROLLING ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    // Close mobile menu if open
                    if (navLinks && navLinks.classList.contains('active')) {
                        menuToggle.setAttribute('aria-expanded', 'false');
                        menuToggle.classList.remove('active');
                        navLinks.classList.remove('active');
                        mobileOverlay.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                    
                    const headerHeight = nav ? nav.offsetHeight : 80;
                    const targetPosition = targetElement.offsetTop - headerHeight - 30;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without page reload
                    history.pushState(null, null, href);
                }
            }
        });
    });
    
    // ========== BACK TO TOP BUTTON ==========
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ========== LAZY LOADING FOR IMAGES ==========
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.6s ease';
                    setTimeout(() => {
                        img.style.opacity = '1';
                    }, 100);
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ========== ANIMATE SERVICE CARDS ==========
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (serviceCards.length > 0) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '0';
                        entry.target.style.transform = 'translateY(20px)';
                        entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, 100);
                    }, index * 100);
                    
                    cardObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        serviceCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            cardObserver.observe(card);
        });
    }
    
    // ========== ANIMATE SERVICE DETAIL SECTIONS ==========
    const serviceDetails = document.querySelectorAll('.service-detail-section');
    
    if (serviceDetails.length > 0) {
        const detailObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 200);
                    
                    detailObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        serviceDetails.forEach(detail => {
            detail.style.opacity = '0';
            detail.style.transform = 'translateY(30px)';
            detailObserver.observe(detail);
        });
    }
    
    // ========== ANIMATE PROCESS CARDS ==========
    const processCards = document.querySelectorAll('.process-card');
    
    if (processCards.length > 0) {
        const stepObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '0';
                        entry.target.style.transform = 'translateY(20px)';
                        entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, 100);
                    }, index * 150);
                    
                    stepObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        processCards.forEach(step => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(20px)';
            stepObserver.observe(step);
        });
    }
    
    // ========== CURRENT YEAR UPDATE ==========
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    // ========== SKIP LINK FUNCTIONALITY ==========
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus();
                setTimeout(() => {
                    targetElement.removeAttribute('tabindex');
                }, 1000);
            }
        });
    }
    
    // ========== LOADING ANIMATION ==========
    window.addEventListener('load', function() {
        // Add loaded class to body
        document.body.classList.add('loaded');
        
        // Remove loading class
        document.body.classList.remove('loading');
        
        // Animate FAQ items
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 300 + (index * 100));
        });
    });
    
    // ========== WHATSAPP FLOAT HOVER EFFECT ==========
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15) rotate(10deg)';
        });
        
        whatsappFloat.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
    
    // ========== ERROR HANDLING FOR IMAGES ==========
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            console.warn('Image failed to load:', e.target.src);
            // You could set a placeholder image here
            // e.target.src = 'path/to/placeholder.jpg';
        }
    }, true);
    
    // ========== KEYBOARD NAVIGATION FOR FAQ ==========
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close all FAQs on Escape
            document.querySelectorAll('.faq-item.active').forEach(item => {
                item.classList.remove('active');
                const answer = item.querySelector('.faq-answer');
                const icon = item.querySelector('.faq-icon i');
                answer.style.maxHeight = null;
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                    icon.className = 'fas fa-check-circle';
                }
            });
        }
    });
    
    // ========== FORM VALIDATION (if forms exist) ==========
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#dc3545';
                    
                    // Add error message
                    if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                        const errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.textContent = 'This field is required';
                        errorMsg.style.color = '#dc3545';
                        errorMsg.style.fontSize = '14px';
                        errorMsg.style.marginTop = '5px';
                        field.parentNode.insertBefore(errorMsg, field.nextSibling);
                    }
                } else {
                    field.style.borderColor = '';
                    
                    // Remove error message
                    const errorMsg = field.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.remove();
                    }
                }
            });
            
            if (isValid) {
                // Show success message
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    submitBtn.textContent = 'Sent Successfully!';
                    submitBtn.style.background = '#28a745';
                    
                    // Reset form
                    setTimeout(() => {
                        this.reset();
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                    }, 2000);
                }, 1500);
            }
        });
    }
});

// Add fadeInUp animation if not already defined
if (!document.querySelector('#fadeInUpAnimation')) {
    const style = document.createElement('style');
    style.id = 'fadeInUpAnimation';
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        body.loaded .service-card,
        body.loaded .service-detail-content,
        body.loaded .process-card,
        body.loaded .faq-item {
            animation: fadeInUp 0.6s ease forwards;
        }
    `;
    document.head.appendChild(style);
}
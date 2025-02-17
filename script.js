// Initialize skill bars
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const navContainer = document.querySelector('nav');
    navContainer.addEventListener('click', (e) => {
        const anchor = e.target.closest('a');
        if (anchor) {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Initialize skill bars with performance optimizations
    const skillBars = document.querySelectorAll('.skill-bar');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.getAttribute('data-level');
                requestAnimationFrame(() => {
                    entry.target.querySelector('.skill-level').style.width = `${level}%`;
                });
                observer.unobserve(entry.target); // Stop observing once animation is triggered
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));

    // Add scroll animations for sections with debouncing
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                });
                sectionObserver.unobserve(entry.target); // Stop observing once animation is complete
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        sectionObserver.observe(section);
    });

    // Add hover effect for experience items using event delegation
    const expContainer = document.querySelector('.experience-content');
    if (expContainer) {
        expContainer.addEventListener('mouseenter', (e) => {
            const item = e.target.closest('.exp-item');
            if (item) {
                requestAnimationFrame(() => {
                    item.style.transform = 'translateY(-5px)';
                    item.style.boxShadow = '0 5px 15px rgba(0,123,255,0.2)';
                });
            }
        }, true);

        expContainer.addEventListener('mouseleave', (e) => {
            const item = e.target.closest('.exp-item');
            if (item) {
                requestAnimationFrame(() => {
                    item.style.transform = 'translateY(0)';
                    item.style.boxShadow = 'none';
                });
            }
        }, true);
    }

    // Add active state for navigation links with throttling
    const navLinks = document.querySelectorAll('nav a');
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    if (pageYOffset >= sectionTop - 60) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').slice(1) === current) {
                        link.classList.add('active');
                    }
                });
                ticking = false;
            });
            ticking = true;
        }
    });

    // Navigation scroll effect with throttling
    const nav = document.querySelector('nav');
    const scrollThreshold = 50;
    let navTicking = false;

    window.addEventListener('scroll', () => {
        if (!navTicking) {
            requestAnimationFrame(() => {
                if (window.scrollY > scrollThreshold) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
                navTicking = false;
            });
            navTicking = true;
        }
    });

    // Typing effect for hero section
    function typeEffect(element, text, speed = 100) {
        let index = 0;
        element.innerHTML = '';
        
        function type() {
            if (index < text.length) {
                element.innerHTML += text.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Preload images
    function preloadImages() {
        // Handle images with data-src (lazy loading)
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.onload = () => img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));

        // Handle regular images
        const regularImages = document.querySelectorAll('img:not([data-src])');
        regularImages.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.onload = () => img.classList.add('loaded');
            }
        });
    }

    // Add scroll progress indicator
    function addScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);

        let scrollTicking = false;
        window.addEventListener('scroll', () => {
            if (!scrollTicking) {
                requestAnimationFrame(() => {
                    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    const scrolled = (winScroll / height) * 100;
                    progressBar.style.width = scrolled + '%';
                    scrollTicking = false;
                });
                scrollTicking = true;
            }
        }, { passive: true });
    }

    // Initialize typing effect
    const heroText = document.querySelector('.hero-text h1');
    if (heroText) {
        const originalText = heroText.textContent;
        typeEffect(heroText, originalText);
    }

    // Initialize image preloading
    preloadImages();

    // Initialize scroll progress
    addScrollProgress();

    // Animation trigger for elements with throttling
    let animationTicking = false;
    const animateOnScroll = () => {
        if (!animationTicking) {
            requestAnimationFrame(() => {
                const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in');
                elements.forEach(element => {
                    const elementTop = element.getBoundingClientRect().top;
                    const elementBottom = element.getBoundingClientRect().bottom;
                    const isVisible = (elementTop < window.innerHeight - 50) && (elementBottom > 0);
                    
                    if (isVisible) {
                        element.style.animationDelay = element.dataset.delay || '0s';
                        element.style.animationPlayState = 'running';
                        element.style.transform = 'translateY(0) scale(1)';
                        element.style.opacity = '1';
                    }
                });
                animationTicking = false;
            });
            animationTicking = true;
        }
    };

    // Add animation delay to stat items
    document.querySelectorAll('.stat-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });

    // Initial check for animations
    animateOnScroll();

    // Throttled scroll event listener
    window.addEventListener('scroll', animateOnScroll, { passive: true });

    // Handle Spline viewer
    const splineViewer = document.querySelector('spline-viewer');
    
    if (splineViewer) {
        splineViewer.addEventListener('load', () => {
            console.log('Spline scene loaded');
            requestAnimationFrame(() => {
                splineViewer.classList.add('loaded');
            });
        });

        splineViewer.addEventListener('error', (e) => {
            console.error('Error loading Spline scene:', e);
        });
    }

    // Handle scroll indicator visibility
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        let scrollTicking = false;
        window.addEventListener('scroll', () => {
            if (!scrollTicking) {
                requestAnimationFrame(() => {
                    if (window.scrollY > 100) {
                        scrollIndicator.style.opacity = '0';
                        setTimeout(() => {
                            scrollIndicator.style.display = 'none';
                        }, 300);
                    }
                    scrollTicking = false;
                });
                scrollTicking = true;
            }
        }, { passive: true });

        // Add click handler for smooth scrolling
        scrollIndicator.addEventListener('click', () => {
            const nextSection = document.querySelector('#brainsis');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

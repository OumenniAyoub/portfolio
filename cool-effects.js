// Cool Effects for Portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all effects
    initParallaxEffect();
    initTypingEffect();
    initParticleBackground();
    initScrollReveal();
    initCounters();
    initCustomCursor();
    initProjectLightbox();
    initDarkModeToggle();
});

// 1. Parallax Scrolling Effect
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            // Move the hero content up slightly as user scrolls down
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
                heroContent.style.opacity = 1 - (scrollPosition * 0.002);
            }
        });
    }
}

// 2. Typing Effect for Hero Section
function initTypingEffect() {
    const element = document.querySelector('.hero-content h2');
    if (!element) return;
    
    const originalText = element.textContent;
    element.textContent = '';
    
    let i = 0;
    const typingSpeed = 100; // milliseconds per character
    
    function typeWriter() {
        if (i < originalText.length) {
            element.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            // After typing is complete, add a blinking cursor
            element.innerHTML = element.textContent + '<span class="typing-cursor">|</span>';
            
            // Add CSS for the cursor
            const style = document.createElement('style');
            style.innerHTML = `
                .typing-cursor {
                    animation: blink 1s infinite;
                }
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Start the typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// 3. Particle Background Animation
function initParticleBackground() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.classList.add('particles-canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '1';
    canvas.style.pointerEvents = 'none';
    
    // Insert canvas as first child of hero section
    heroSection.insertBefore(canvas, heroSection.firstChild);
    
    // Make hero content appear above particles
    const heroContent = heroSection.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.position = 'relative';
        heroContent.style.zIndex = '2';
    }
    
    // Set canvas size
    canvas.width = heroSection.offsetWidth;
    canvas.height = heroSection.offsetHeight;
    
    // Get canvas context
    const ctx = canvas.getContext('2d');
    
    // Particle settings
    const particlesArray = [];
    const numberOfParticles = 100;
    
    // Resize event
    window.addEventListener('resize', function() {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
    });
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Bounce off edges
            if (this.x > canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.speedY = -this.speedY;
            }
        }
        
        draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }
    
    // Create particles
    function init() {
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
            
            // Connect particles with lines
            for (let j = i; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 0, 0, ${1 - distance/100})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    init();
    animate();
}

// 4. Scroll Reveal Animation
function initScrollReveal() {
    const sections = document.querySelectorAll('section');
    
    const revealSection = function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            entry.target.classList.add('section-revealed');
            observer.unobserve(entry.target);
        });
    };
    
    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
        section.classList.add('section-hidden');
    });
    
    // Add CSS for reveal animations
    const style = document.createElement('style');
    style.innerHTML = `
        .section-hidden {
            opacity: 0;
            transform: translateY(50px);
            transition: all 1s;
        }
        
        .section-revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// 5. Animated Counters
function initCounters() {
    // Add counter elements to the About section
    const aboutSection = document.querySelector('.about-content');
    if (!aboutSection) return;
    
    // Create counter container
    const counterContainer = document.createElement('div');
    counterContainer.classList.add('counter-container');
    counterContainer.innerHTML = `
        <div class="counter-item">
            <h3 class="counter" data-target="5">0</h3>
            <p>Années d'expérience</p>
        </div>
        <div class="counter-item">
            <h3 class="counter" data-target="50">0</h3>
            <p>Projets terminés</p>
        </div>
        <div class="counter-item">
            <h3 class="counter" data-target="20">0</h3>
            <p>Clients satisfaits</p>
        </div>
        <div class="counter-item">
            <h3 class="counter" data-target="100">0</h3>
            <p>Tasses de café</p>
        </div>
    `;
    
    // Add counter container after about-text
    const aboutText = aboutSection.querySelector('.about-text');
    if (aboutText) {
        aboutText.appendChild(counterContainer);
    }
    
    // Add CSS for counters
    const style = document.createElement('style');
    style.innerHTML = `
        .counter-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
            margin-top: 40px;
        }
        
        .counter-item {
            text-align: center;
            background-color: var(--light-gray);
            padding: 20px;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            transition: transform 0.3s ease;
        }
        
        .counter-item:hover {
            transform: translateY(-5px);
        }
        
        .counter-item h3 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            color: var(--primary-color);
        }
        
        .counter-item p {
            margin-bottom: 0;
            font-weight: 600;
        }
        
        @media screen and (max-width: 576px) {
            .counter-container {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Animate counters when they come into view
    const counters = document.querySelectorAll('.counter');
    
    function animateCounter(counter) {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 100;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(counter), 30);
        } else {
            counter.innerText = target;
        }
    }
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => animateCounter(counter));
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (counterContainer) {
        counterObserver.observe(counterContainer);
    }
}

// 6. Custom Cursor Effect
function initCustomCursor() {
    // Create cursor elements
    const cursorOuter = document.createElement('div');
    cursorOuter.classList.add('cursor-outer');
    
    const cursorInner = document.createElement('div');
    cursorInner.classList.add('cursor-inner');
    
    document.body.appendChild(cursorOuter);
    document.body.appendChild(cursorInner);
    
    // Add CSS for custom cursor
    const style = document.createElement('style');
    style.innerHTML = `
        body {
            cursor: none;
        }
        
        .cursor-inner {
            position: fixed;
            width: 8px;
            height: 8px;
            background-color: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 9999;
            transition: width 0.2s, height 0.2s;
        }
        
        .cursor-outer {
            position: fixed;
            width: 40px;
            height: 40px;
            border: 1px solid var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 9998;
            transition: 0.1s;
        }
        
        a:hover ~ .cursor-outer,
        button:hover ~ .cursor-outer,
        .project-item:hover ~ .cursor-outer,
        .social-icon:hover ~ .cursor-outer {
            transform: translate(-50%, -50%) scale(1.5);
            background-color: rgba(0, 0, 0, 0.05);
            border-color: transparent;
        }
        
        @media (max-width: 768px) {
            .cursor-inner, .cursor-outer {
                display: none;
            }
            
            body {
                cursor: auto;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Update cursor position
    document.addEventListener('mousemove', function(e) {
        cursorInner.style.left = e.clientX + 'px';
        cursorInner.style.top = e.clientY + 'px';
        
        cursorOuter.style.left = e.clientX + 'px';
        cursorOuter.style.top = e.clientY + 'px';
    });
    
    // Add hover effect for clickable elements
    const clickables = document.querySelectorAll('a, button, .project-item, .social-icon');
    clickables.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursorInner.style.width = '12px';
            cursorInner.style.height = '12px';
            cursorOuter.style.width = '60px';
            cursorOuter.style.height = '60px';
        });
        
        element.addEventListener('mouseleave', function() {
            cursorInner.style.width = '8px';
            cursorInner.style.height = '8px';
            cursorOuter.style.width = '40px';
            cursorOuter.style.height = '40px';
        });
    });
}

// 7. Project Lightbox
function initProjectLightbox() {
    // Add click event to project images
    const projectImages = document.querySelectorAll('.project-img img');
    
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    
    const lightboxContent = document.createElement('div');
    lightboxContent.classList.add('lightbox-content');
    
    const lightboxImage = document.createElement('img');
    const lightboxClose = document.createElement('span');
    lightboxClose.classList.add('lightbox-close');
    lightboxClose.innerHTML = '&times;';
    
    lightboxContent.appendChild(lightboxImage);
    lightboxContent.appendChild(lightboxClose);
    lightbox.appendChild(lightboxContent);
    document.body.appendChild(lightbox);
    
    // Add CSS for lightbox
    const style = document.createElement('style');
    style.innerHTML = `
        .lightbox {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            z-index: 9999;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .lightbox.active {
            display: flex;
            opacity: 1;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 80%;
            max-height: 80%;
        }
        
        .lightbox-content img {
            max-width: 100%;
            max-height: 80vh;
            border: 5px solid white;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 30px;
            cursor: pointer;
            transition: color 0.3s ease;
        }
        
        .lightbox-close:hover {
            color: var(--primary-color);
        }
    `;
    document.head.appendChild(style);
    
    // Open lightbox on image click
    projectImages.forEach(image => {
        image.style.cursor = 'pointer';
        
        image.addEventListener('click', function() {
            lightboxImage.src = this.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    lightboxClose.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close lightbox on outside click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// 8. Dark Mode Toggle
function initDarkModeToggle() {
    // Create toggle button
    const toggleContainer = document.createElement('div');
    toggleContainer.classList.add('dark-mode-toggle');
    toggleContainer.innerHTML = `
        <div class="toggle-icon">
            <i class="fas fa-moon"></i>
            <i class="fas fa-sun"></i>
        </div>
    `;
    
    // Add toggle to header
    const header = document.querySelector('header .container');
    if (header) {
        header.appendChild(toggleContainer);
    }
    
    // Add CSS for dark mode toggle
    const style = document.createElement('style');
    style.innerHTML = `
        .dark-mode-toggle {
            margin-left: 20px;
            cursor: pointer;
            position: relative;
            z-index: 1000;
        }
        
        .toggle-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: var(--light-gray);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: var(--transition);
        }
        
        .toggle-icon:hover {
            transform: rotate(30deg);
        }
        
        .toggle-icon .fa-sun {
            display: none;
        }
        
        /* Dark Mode Styles */
        body.dark-mode {
            background-color: #121212;
            color: #f5f5f5;
        }
        
        body.dark-mode header {
            background-color: #1a1a1a;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }
        
        body.dark-mode .logo,
        body.dark-mode .nav-links a {
            color: #f5f5f5;
        }
        
        body.dark-mode .bar {
            background-color: #f5f5f5;
        }
        
        body.dark-mode .hero,
        body.dark-mode .skills,
        body.dark-mode .contact {
            background-color: #121212;
        }
        
        body.dark-mode .about,
        body.dark-mode .projects {
            background-color: #1a1a1a;
        }
        
        body.dark-mode .section-header h2,
        body.dark-mode .about-text h3,
        body.dark-mode .skill-category h3,
        body.dark-mode .project-info h3,
        body.dark-mode .contact-item .details h3 {
            color: #f5f5f5;
        }
        
        body.dark-mode .underline {
            background-color: #f5f5f5;
        }
        
        body.dark-mode .skill-item,
        body.dark-mode .project-item,
        body.dark-mode .contact-form {
            background-color: #2a2a2a;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
        
        body.dark-mode .project-tags span,
        body.dark-mode .filter-btn,
        body.dark-mode .toggle-icon,
        body.dark-mode .counter-item {
            background-color: #333;
            color: #f5f5f5;
        }
        
        body.dark-mode .filter-btn.active,
        body.dark-mode .filter-btn:hover {
            background-color: #f5f5f5;
            color: #121212;
        }
        
        body.dark-mode .form-group input,
        body.dark-mode .form-group textarea {
            background-color: #333;
            border-color: #444;
            color: #f5f5f5;
        }
        
        body.dark-mode .social-icon {
            background-color: #333;
            color: #f5f5f5;
        }
        
        body.dark-mode .social-icon:hover {
            background-color: #f5f5f5;
            color: #121212;
        }
        
        body.dark-mode .toggle-icon .fa-moon {
            display: none;
        }
        
        body.dark-mode .toggle-icon .fa-sun {
            display: block;
            color: #121212;
        }
        
        body.dark-mode .toggle-icon {
            background-color: #f5f5f5;
        }
    `;
    document.head.appendChild(style);
    
    // Toggle dark mode
    toggleContainer.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Save preference to localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });
    
    // Check for saved preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
}

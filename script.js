// Carousel functionality
let currentCarouselIndex = 0;
const carouselItems = document.querySelectorAll('.carousel-item');
const totalItems = carouselItems.length;

function updateCarousel() {
    const carousel = document.querySelector('.carousel');
    carousel.style.transform = `translateX(-${currentCarouselIndex * 100}%)`;
    
    carouselItems.forEach((item, index) => {
        item.classList.toggle('active', index === currentCarouselIndex);
    });
    
    // Update dots
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentCarouselIndex);
    });
}

function moveCarousel(direction) {
    currentCarouselIndex = (currentCarouselIndex + direction + totalItems) % totalItems;
    updateCarousel();
}

// Create dots
const dotsContainer = document.getElementById('dots');
for (let i = 0; i < totalItems; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => {
        currentCarouselIndex = i;
        updateCarousel();
    };
    dotsContainer.appendChild(dot);
}

// Auto-advance carousel every 8 seconds
setInterval(() => {
    moveCarousel(1);
}, 8000);

// Smooth scroll for navigation links
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

// CTA Button - Scroll to concept
document.querySelector('.cta-btn').addEventListener('click', function() {
    const conceptSection = document.getElementById('concept');
    conceptSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// Scroll animation for cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .lore-card, .season-card, .concept-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

console.log('🌌 MOIRA: NEXUS - Concept Site Loaded');
console.log('💫 Tutto ciò che vedi qui è soggetto a significative modifiche.');

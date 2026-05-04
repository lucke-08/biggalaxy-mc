// Title Switcher Animation
let titleIndex = 0;
const titleWords = document.querySelectorAll('.title-word');
const switchInterval = 6000; // Cambia ogni 6 secondi

function switchTitle() {
    titleWords.forEach(word => word.classList.remove('active'));
    titleWords[titleIndex].classList.add('active');
    titleIndex = (titleIndex + 1) % titleWords.length;
}

// Inizia l'animazione del titolo
setInterval(switchTitle, switchInterval);

// Carousel functionality
let currentCarouselIndex = 0;
const carouselItems = document.querySelectorAll('.carousel-item');
const totalItems = carouselItems.length;

function updateCarousel() {
    const carousel = document.querySelector('.carousel');
    carousel.style.transform = `translateX(-${currentCarouselIndex * 100}%)`;
    
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

// CTA Button - Copy Server IP to Clipboard
document.querySelector('.cta-btn').addEventListener('click', function() {
    const serverIP = 'play.moira-nexus.mc:25565';
    navigator.clipboard.writeText(serverIP).then(() => {
        const originalText = this.textContent;
        this.textContent = 'IP Copiato! ✓';
        this.style.backgroundColor = '#00ff88';
        
        setTimeout(() => {
            this.textContent = originalText;
            this.style.backgroundColor = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Server IP: ' + serverIP);
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

document.querySelectorAll('.feature-card, .lore-card, .season-card, .contact-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Indice di Destino - Simulated player interaction tracker (future feature)
let destinyIndex = 50; // 0-100 scale
console.log('🔮 Indice di Destino iniziale:', destinyIndex);

// Slider Moderno para Projetos
const slider = document.querySelector('.slider');

function activate(e) {
    const items = document.querySelectorAll('.item');
    e.target.matches('.next') && slider.append(items[0]);
    e.target.matches('.prev') && slider.prepend(items[items.length-1]);
}

document.addEventListener('click', activate, false);

// Adicionar navegação por teclado
document.addEventListener('keydown', function(e) {
    const items = document.querySelectorAll('.item');
    
    if (e.key === 'ArrowRight') {
        slider.append(items[0]);
    } else if (e.key === 'ArrowLeft') {
        slider.prepend(items[items.length-1]);
    }
});

// Adicionar navegação por touch/swipe
let startX = 0;
let endX = 0;

slider.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
});

slider.addEventListener('touchend', function(e) {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const items = document.querySelectorAll('.item');
    const threshold = 50;
    
    if (endX < startX - threshold) {
        // Swipe left - next
        slider.append(items[0]);
    } else if (endX > startX + threshold) {
        // Swipe right - previous
        slider.prepend(items[items.length-1]);
    }
}

// Auto-play opcional (comentado por padrão)
/*
let autoPlayInterval;

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        const items = document.querySelectorAll('.item');
        slider.append(items[0]);
    }, 5000); // 5 segundos
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Pausar autoplay no hover
slider.addEventListener('mouseenter', stopAutoPlay);
slider.addEventListener('mouseleave', startAutoPlay);

// Iniciar autoplay
startAutoPlay();
*/

// ===== CARROSSEL MOBILE =====
class MobileCarousel {
    constructor() {
        this.track = document.querySelector('.mobile-slider-track');
        this.cards = document.querySelectorAll('.mobile-project-card');
        this.prevBtn = document.querySelector('.mobile-prev-btn');
        this.nextBtn = document.querySelector('.mobile-next-btn');
        this.dots = document.querySelectorAll('.mobile-dots .dot');
        
        this.currentSlide = 0;
        this.totalSlides = this.cards.length;
        
        this.init();
    }
    
    init() {
        if (!this.track || !this.cards.length) return;
        
        // Event listeners para botões
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Event listeners para dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Touch/swipe support
        this.addTouchSupport();
        
        // Keyboard support
        this.addKeyboardSupport();
        
        // Auto-play (opcional)
        this.startAutoPlay();
        
        // Update initial state
        this.updateSlider();
    }
    
    prevSlide() {
        this.currentSlide = this.currentSlide > 0 ? this.currentSlide - 1 : this.totalSlides - 1;
        this.updateSlider();
    }
    
    nextSlide() {
        this.currentSlide = this.currentSlide < this.totalSlides - 1 ? this.currentSlide + 1 : 0;
        this.updateSlider();
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlider();
    }
    
    updateSlider() {
        if (!this.track) return;
        
        const translateX = -this.currentSlide * 100;
        this.track.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
        
        // Update button states
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentSlide === 0;
        }
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
        }
    }
    
    addTouchSupport() {
        if (!this.track) return;
        
        let startX = 0;
        let endX = 0;
        let isDragging = false;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        
        this.track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });
        
        this.track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            const threshold = 50;
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
            
            isDragging = false;
        });
    }
    
    addKeyboardSupport() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
    }
    
    startAutoPlay() {
        // Auto-play a cada 5 segundos (opcional)
        setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
}

// Inicializar carrossel mobile quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new MobileCarousel();
});

// Reinicializar quando a tela for redimensionada
window.addEventListener('resize', () => {
    // Verificar se estamos em mobile e reinicializar se necessário
    if (window.innerWidth <= 768) {
        const existingCarousel = document.querySelector('.mobile-carousel');
        if (existingCarousel && !document.querySelector('.mobile-carousel-initialized')) {
            new MobileCarousel();
            document.querySelector('.mobile-carousel').classList.add('mobile-carousel-initialized');
        }
    }
}); 
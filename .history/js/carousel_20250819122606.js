// Carrossel Moderno para Projetos
class ModernCarousel {
    constructor() {
        this.carousel = document.querySelector('.carousel-track');
        this.cards = document.querySelectorAll('.carousel-track .project-card');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.progressFill = document.querySelector('.progress-fill');
        this.dotsContainer = document.querySelector('.indicators-dots');
        
        this.currentIndex = 0;
        this.totalCards = this.cards.length;
        this.isAutoPlaying = true;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; // 5 segundos
        this.isTransitioning = false;
        
        this.init();
    }
    
    init() {
        if (!this.carousel || this.totalCards === 0) return;
        
        this.setupCards();
        this.setupControls();
        this.setupIndicators();
        this.setupTouchEvents();
        this.setupKeyboardEvents();
        this.startAutoPlay();
        this.updateDisplay();
    }
    
    setupCards() {
        this.cards.forEach((card, index) => {
            card.style.transform = `translateX(${index * 100}%)`;
            if (index === 0) {
                card.classList.add('active');
            }
        });
    }
    
    setupControls() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }
        
        // Pause autoplay on hover
        this.carousel.addEventListener('mouseenter', () => this.pauseAutoPlay());
        this.carousel.addEventListener('mouseleave', () => this.resumeAutoPlay());
    }
    
    setupIndicators() {
        // Criar dots
        for (let i = 0; i < this.totalCards; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
        
        this.dots = this.dotsContainer.querySelectorAll('.dot');
    }
    
    setupTouchEvents() {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        this.carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            this.pauseAutoPlay();
        });
        
        this.carousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            currentX = e.touches[0].clientX;
            const diff = startX - currentX;
            
            // Adicionar efeito de arrasto visual
            this.carousel.style.transform = `translateX(-${this.currentIndex * 100 + (diff / 10)}%)`;
        });
        
        this.carousel.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            
            const diff = startX - currentX;
            const threshold = 50;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            } else {
                // Voltar à posição original
                this.updateDisplay();
            }
            
            this.resumeAutoPlay();
        });
        
        // Mouse drag para desktop
        this.carousel.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            isDragging = true;
            this.pauseAutoPlay();
            this.carousel.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            currentX = e.clientX;
            const diff = startX - currentX;
            
            this.carousel.style.transform = `translateX(-${this.currentIndex * 100 + (diff / 10)}%)`;
        });
        
        document.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            
            const diff = startX - currentX;
            const threshold = 50;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            } else {
                this.updateDisplay();
            }
            
            this.carousel.style.cursor = 'grab';
            this.resumeAutoPlay();
        });
    }
    
    setupKeyboardEvents() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prev();
            } else if (e.key === 'ArrowRight') {
                this.next();
            }
        });
    }
    
    prev() {
        if (this.isTransitioning) return;
        
        this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.totalCards - 1;
        this.updateDisplay();
    }
    
    next() {
        if (this.isTransitioning) return;
        
        this.currentIndex = this.currentIndex < this.totalCards - 1 ? this.currentIndex + 1 : 0;
        this.updateDisplay();
    }
    
    goToSlide(index) {
        if (this.isTransitioning || index === this.currentIndex) return;
        
        this.currentIndex = index;
        this.updateDisplay();
    }
    
    updateDisplay() {
        this.isTransitioning = true;
        
        // Atualizar posição do carrossel
        this.carousel.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        
        // Atualizar cards ativos
        this.cards.forEach((card, index) => {
            card.classList.toggle('active', index === this.currentIndex);
        });
        
        // Atualizar dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
        
        // Atualizar progress bar
        if (this.progressFill) {
            const progress = ((this.currentIndex + 1) / this.totalCards) * 100;
            this.progressFill.style.width = `${progress}%`;
        }
        
        // Atualizar estado dos botões
        this.updateButtonStates();
        
        // Adicionar animação de entrada
        this.cards[this.currentIndex].classList.add('slide-in');
        
        setTimeout(() => {
            this.isTransitioning = false;
            this.cards[this.currentIndex].classList.remove('slide-in');
        }, 600);
    }
    
    updateButtonStates() {
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentIndex === 0;
        }
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentIndex === this.totalCards - 1;
        }
    }
    
    startAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
        
        this.autoPlayInterval = setInterval(() => {
            if (this.isAutoPlaying && !this.isTransitioning) {
                this.next();
            }
        }, this.autoPlayDelay);
    }
    
    pauseAutoPlay() {
        this.isAutoPlaying = false;
    }
    
    resumeAutoPlay() {
        this.isAutoPlaying = true;
    }
    
    destroy() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
}

// Inicializar carrossel quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new ModernCarousel();
}); 
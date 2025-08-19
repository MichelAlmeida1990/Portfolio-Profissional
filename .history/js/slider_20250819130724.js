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
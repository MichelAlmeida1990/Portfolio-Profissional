/**
 * Scroll Horizontal para Projetos
 * 
 * Este script implementa:
 * - Scroll horizontal com roda do mouse
 * - Navegação por setas
 * - Suporte a toque (swipe) para dispositivos móveis
 * - Indicadores de posição
 * - Animações e transições suaves
 * - Otimizações de desempenho
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos principais
    const projetosContainer = document.querySelector('.projetos-container');
    const projetosWrapper = document.querySelector('.projetos-wrapper');
    const projetoCards = document.querySelectorAll('.projeto-card');
    const prevButton = document.querySelector('.nav-prev');
    const nextButton = document.querySelector('.nav-next');
    const indicatorsContainer = document.querySelector('.nav-indicators');

    // Variáveis de estado
    let currentIndex = 0;
    let startX, startY, startTime;
    let isScrolling = false;
    let cardWidth = projetoCards[0]?.offsetWidth || 0;
    let containerWidth = projetosContainer?.offsetWidth || 0;
    let totalWidth = projetoCards.length * (cardWidth + 40); // 40px é o espaçamento entre cards
    let maxIndex = Math.max(0, projetoCards.length - Math.floor(containerWidth / cardWidth));

    // Configuração inicial
    function init() {
        // Ajustar largura do wrapper baseado no número de projetos
        projetosWrapper.style.width = `${totalWidth}px`;
        
        // Marcar o primeiro projeto como ativo
        updateActiveCard();
        
        // Criar indicadores de posição
        createIndicators();
        
        // Configurar eventos
        setupEventListeners();
    }

    // Criar indicadores de posição
    function createIndicators() {
        indicatorsContainer.innerHTML = '';
        for (let i = 0; i <= maxIndex; i++) {
            const indicator = document.createElement('span');
            indicator.classList.add('nav-indicator');
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }
    }

    // Configurar todos os event listeners
    function setupEventListeners() {
        // Botões de navegação
        prevButton.addEventListener('click', goToPrevSlide);
        nextButton.addEventListener('click', goToNextSlide);
        
        // Eventos de teclado para acessibilidade
        document.addEventListener('keydown', handleKeyNavigation);
        
        // Eventos de roda do mouse
        projetosContainer.addEventListener('wheel', handleWheel, { passive: false });
        
        // Eventos de toque para dispositivos móveis
        projetosContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
        projetosContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
        projetosContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
        
        // Redimensionamento da janela
        window.addEventListener('resize', debounce(handleResize, 250));
    }

    // Atualizar o card ativo e aplicar efeitos visuais
    function updateActiveCard() {
        projetoCards.forEach((card, index) => {
            if (index === currentIndex) {
                card.classList.add('active');
                card.classList.remove('inactive');
            } else {
                card.classList.remove('active');
                card.classList.add('inactive');
            }
        });

        // Atualizar indicadores
        const indicators = document.querySelectorAll('.nav-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    // Ir para um slide específico
    function goToSlide(index) {
        if (index < 0) index = 0;
        if (index > maxIndex) index = maxIndex;
        
        currentIndex = index;
        const offset = -currentIndex * (cardWidth + 40); // 40px é o espaçamento entre cards
        
        // Aplicar transformação com animação suave
        projetosWrapper.style.transform = `translateX(${offset}px)`;
        
        // Atualizar estado visual
        updateActiveCard();
    }

    // Ir para o slide anterior
    function goToPrevSlide() {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        } else {
            // Efeito de elasticidade quando tentar ir além do primeiro slide
            projetosWrapper.style.transform = `translateX(20px)`;
            setTimeout(() => {
                projetosWrapper.style.transform = `translateX(0px)`;
            }, 300);
        }
    }

    // Ir para o próximo slide
    function goToNextSlide() {
        if (currentIndex < maxIndex) {
            goToSlide(currentIndex + 1);
        } else {
            // Efeito de elasticidade quando tentar ir além do último slide
            const offset = -currentIndex * (cardWidth + 40) - 20;
            projetosWrapper.style.transform = `translateX(${offset}px)`;
            setTimeout(() => {
                projetosWrapper.style.transform = `translateX(${-currentIndex * (cardWidth + 40)}px)`;
            }, 300);
        }
    }

    // Lidar com eventos de teclado para acessibilidade
    function handleKeyNavigation(e) {
        if (isElementInViewport(projetosContainer)) {
            if (e.key === 'ArrowLeft') {
                goToPrevSlide();
                e.preventDefault();
            } else if (e.key === 'ArrowRight') {
                goToNextSlide();
                e.preventDefault();
            }
        }
    }

    // Lidar com eventos da roda do mouse
    function handleWheel(e) {
        if (isElementInViewport(projetosContainer)) {
            // Prevenir o comportamento padrão de scroll
            e.preventDefault();
            
            // Não processar novos eventos enquanto estiver rolando
            if (isScrolling) return;
            isScrolling = true;
            
            // Determinar a direção do scroll
            if (e.deltaY > 0) {
                goToNextSlide();
            } else {
                goToPrevSlide();
            }
            
            // Debounce para evitar scrolls muito rápidos
            setTimeout(() => {
                isScrolling = false;
            }, 500);
        }
    }

    // Funções para suporte a toque em dispositivos móveis
    function handleTouchStart(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        startTime = new Date().getTime();
    }

    function handleTouchMove(e) {
        if (!startX || !startY) return;
        
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        
        // Calcular distâncias
        const diffX = startX - currentX;
        const diffY = startY - currentY;
        
        // Se o movimento for mais horizontal que vertical, prevenir o scroll da página
        if (Math.abs(diffX) > Math.abs(diffY)) {
            e.preventDefault();
            
            // Mover o wrapper com o dedo (com resistência)
            const offset = -currentIndex * (cardWidth + 40) - diffX * 0.5;
            projetosWrapper.style.transform = `translateX(${offset}px)`;
        }
    }

    function handleTouchEnd(e) {
        if (!startX || !startY) return;
        
        const currentX = e.changedTouches[0].clientX;
        const diffX = startX - currentX;
        const elapsedTime = new Date().getTime() - startTime;
        
        // Detectar swipe (movimento rápido e longo o suficiente)
        if (Math.abs(diffX) > 50 && elapsedTime < 300) {
            if (diffX > 0) {
                goToNextSlide();
            } else {
                goToPrevSlide();
            }
        } else {
            // Se não for um swipe, voltar para a posição do slide atual
            goToSlide(currentIndex);
        }
        
        // Resetar valores
        startX = null;
        startY = null;
    }

    // Lidar com redimensionamento da janela
    function handleResize() {
        // Recalcular dimensões
        cardWidth = projetoCards[0].offsetWidth;
        containerWidth = projetosContainer.offsetWidth;
        totalWidth = projetoCards.length * (cardWidth + 40);
        maxIndex = Math.max(0, projetoCards.length - Math.floor(containerWidth / cardWidth));
        
        // Atualizar largura do wrapper
        projetosWrapper.style.width = `${totalWidth}px`;
        
        // Garantir que o índice atual seja válido após o redimensionamento
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }
        
        // Atualizar posição
        goToSlide(currentIndex);
        
        // Recriar indicadores se necessário
        createIndicators();
    }

    // Utilitários
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0 &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
            rect.right >= 0
        );
    }

    // Inicializar o componente
    if (projetosContainer && projetosWrapper && projetoCards.length > 0) {
        init();
    }
});

/**
 * Animação de Raspadinha - Sobre Mim
 * Efeito de raspadinha interativo melhorado com raspagem suave
 */

function initRevealAnimation() {
    const container = document.querySelector('.sobre-reveal-container');
    if (!container) return;

    const innerContainer = container.querySelector('.inner-container');
    if (!innerContainer) return;

    const canvas = container.querySelector('.sobre-reveal-canvas');
    if (!canvas) return;
    
    const button = container.querySelector('.scratch-button');
    if (!button) return;

    const context = canvas.getContext('2d');
    let isScratching = false;
    let isActive = false;
    let lastX = 0;
    let lastY = 0;
    let points = []; // Array para armazenar pontos da raspagem

    // Obter cores baseadas no tema
    function getColors() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const computedStyle = getComputedStyle(document.documentElement);
        const bgColor = computedStyle.getPropertyValue('--card-background').trim() || 
                       (isDark ? '#1a1a1a' : '#ffffff');
        
        // Cor da camada de raspadinha (efeito metálico/prateado melhorado)
        const scratchColor = isDark ? 'rgba(200, 200, 220, 0.95)' : 'rgba(240, 240, 250, 0.98)';
        
        return {
            fill: bgColor,
            scratch: scratchColor
        };
    }

    function resizeCanvas() {
        const rect = innerContainer.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
        context.scale(dpr, dpr);
        initScratchLayer();
    }

    function initScratchLayer() {
        const colors = getColors();
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const width = innerContainer.getBoundingClientRect().width;
        const height = innerContainer.getBoundingClientRect().height;
        
        // Preencher com gradiente vibrante da raspadinha
        const mainGradient = context.createLinearGradient(0, 0, width, height);
        if (isDark) {
            mainGradient.addColorStop(0, 'rgba(200, 200, 220, 0.95)');
            mainGradient.addColorStop(0.3, 'rgba(180, 180, 200, 0.95)');
            mainGradient.addColorStop(0.6, 'rgba(160, 160, 180, 0.95)');
            mainGradient.addColorStop(1, 'rgba(200, 200, 220, 0.95)');
        } else {
            mainGradient.addColorStop(0, 'rgba(240, 240, 250, 0.98)');
            mainGradient.addColorStop(0.3, 'rgba(220, 220, 240, 0.98)');
            mainGradient.addColorStop(0.6, 'rgba(200, 200, 220, 0.98)');
            mainGradient.addColorStop(1, 'rgba(240, 240, 250, 0.98)');
        }
        context.fillStyle = mainGradient;
        context.fillRect(0, 0, width, height);
        
        // Adicionar textura metálica com gradiente radial
        context.globalCompositeOperation = 'multiply';
        for (let i = 0; i < 15; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const radius = 100 + Math.random() * 150;
            const radialGradient = context.createRadialGradient(x, y, 0, x, y, radius);
            radialGradient.addColorStop(0, isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.4)');
            radialGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            context.fillStyle = radialGradient;
            context.fillRect(0, 0, width, height);
        }
        
        // Adicionar linhas diagonais para efeito de raspadinha
        context.globalCompositeOperation = 'overlay';
        context.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)';
        context.lineWidth = 1;
        for (let i = -height; i < width + height; i += 20) {
            context.beginPath();
            context.moveTo(i, 0);
            context.lineTo(i + height, height);
            context.stroke();
        }
        
        // Adicionar padrão de pontos mais denso e variado
        context.globalCompositeOperation = 'overlay';
        context.fillStyle = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.08)';
        for (let i = 0; i < 400; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = 0.5 + Math.random() * 1.5;
            context.beginPath();
            context.arc(x, y, size, 0, Math.PI * 2);
            context.fill();
        }
        
        // Adicionar brilho metálico
        context.globalCompositeOperation = 'screen';
        const shineGradient = context.createLinearGradient(0, 0, width, 0);
        shineGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        shineGradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.1)');
        shineGradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.1)');
        shineGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        context.fillStyle = shineGradient;
        context.fillRect(0, 0, width, height);
        
        context.globalCompositeOperation = 'source-over';
    }

    function scratch(x, y) {
        if (!isActive || !isScratching) return;
        
        const radius = 35; // Tamanho da área raspada (aumentado)
        
        // Adicionar ponto atual
        points.push({ x, y, radius });
        
        // Limitar o número de pontos para performance
        if (points.length > 50) {
            points.shift();
        }
        
        // Usar destination-out para "raspar" a camada
        context.save();
        context.globalCompositeOperation = 'destination-out';
        
        // Desenhar círculo no ponto atual
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
        
        // Se houver pontos anteriores, conectar com traço suave
        if (points.length > 1) {
            const prevPoint = points[points.length - 2];
            const currentPoint = points[points.length - 1];
            
            // Calcular distância
            const dx = currentPoint.x - prevPoint.x;
            const dy = currentPoint.y - prevPoint.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Se a distância for grande, interpolar pontos intermediários
            if (distance > 5) {
                const steps = Math.ceil(distance / 3);
                for (let i = 1; i <= steps; i++) {
                    const t = i / steps;
                    const interpX = prevPoint.x + dx * t;
                    const interpY = prevPoint.y + dy * t;
                    const interpRadius = prevPoint.radius + (currentPoint.radius - prevPoint.radius) * t;
                    
                    context.beginPath();
                    context.arc(interpX, interpY, interpRadius, 0, Math.PI * 2);
                    context.fill();
                }
            } else {
                // Desenhar linha suave entre pontos
                context.beginPath();
                context.moveTo(prevPoint.x, prevPoint.y);
                context.lineTo(currentPoint.x, currentPoint.y);
                context.lineWidth = radius * 2;
                context.lineCap = 'round';
                context.lineJoin = 'round';
                context.stroke();
            }
        }
        
        context.restore();
    }

    function startScratching(x, y) {
        if (!isActive) return;
        isScratching = true;
        points = []; // Limpar pontos anteriores
        lastX = x;
        lastY = y;
        scratch(x, y);
    }

    function stopScratching() {
        isScratching = false;
        lastX = 0;
        lastY = 0;
        points = []; // Limpar pontos ao parar
    }

    function activateScratch() {
        isActive = true;
        button.style.display = 'none';
        canvas.style.cursor = 'grab';
        canvas.style.pointerEvents = 'auto';
        
        // Reinicializar a camada de raspadinha
        initScratchLayer();
    }

    // Event listeners do canvas
    canvas.addEventListener('mousedown', (e) => {
        if (!isActive) return;
        const rect = innerContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        startScratching(x, y);
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!isActive || !isScratching) return;
        const rect = innerContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        scratch(x, y);
    });

    canvas.addEventListener('mouseup', stopScratching);
    canvas.addEventListener('mouseleave', stopScratching);

    // Touch events
    canvas.addEventListener('touchstart', (e) => {
        if (!isActive) return;
        e.preventDefault();
        const rect = innerContainer.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        startScratching(x, y);
    });

    canvas.addEventListener('touchmove', (e) => {
        if (!isActive || !isScratching) return;
        e.preventDefault();
        const rect = innerContainer.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        scratch(x, y);
    });

    canvas.addEventListener('touchend', stopScratching);
    canvas.addEventListener('touchcancel', stopScratching);

    // Botão de ativação
    button.addEventListener('click', activateScratch);

    // Inicializar
    resizeCanvas();
    
    // Desabilitar interação inicial
    canvas.style.pointerEvents = 'none';
    
    // Reajustar ao redimensionar
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resizeCanvas();
        }, 100);
    });
}

// Reinicializar quando o tema mudar
document.addEventListener('themeChanged', function() {
    setTimeout(() => {
        initRevealAnimation();
    }, 100);
});

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initRevealAnimation();
    }, 500);
});

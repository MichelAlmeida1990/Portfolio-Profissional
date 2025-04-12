/**
 * Cursor personalizado interativo
 * Cria um efeito de cursor personalizado que reage a diferentes elementos
 */

document.addEventListener('DOMContentLoaded', function() {
    // Verificar se é dispositivo móvel ou tablet (sem mouse)
    const isMobileOrTablet = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
                           || ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    
    // Não inicializar em dispositivos móveis
    if (isMobileOrTablet) return;
    
    // Elementos do cursor
    const cursorOuter = document.querySelector('.cursor-outer');
    const cursorInner = document.querySelector('.cursor-inner');
    
    // Adicionar classe ao body para esconder cursor padrão
    document.body.classList.add('custom-cursor');
    
    // Variáveis para posição do cursor
    let mouseX = 0;
    let mouseY = 0;
    let outerX = 0;
    let outerY = 0;
    let innerX = 0;
    let innerY = 0;
    
    // Fator de suavização (quanto menor, mais suave)
    const smoothFactor = {
        outer: 0.2,
        inner: 0.1
    };
    
    // Elementos interativos que mudam o cursor
    const interactiveElements = 'a, button, input[type="button"], input[type="submit"], .btn, .tech-icon, .project-card, .social-links a';
    
    // Rastreamento de posição do mouse
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Efeito de clique
    document.addEventListener('mousedown', () => {
        cursorOuter.classList.add('cursor-click');
        cursorInner.classList.add('cursor-click');
    });
    
    document.addEventListener('mouseup', () => {
        cursorOuter.classList.remove('cursor-click');
        cursorInner.classList.remove('cursor-click');
    });
    
    // Detectar elementos interativos
    document.addEventListener('mouseover', (e) => {
        if (e.target.matches(interactiveElements) || e.target.closest(interactiveElements)) {
            cursorOuter.classList.add('cursor-hover');
            cursorInner.classList.add('cursor-hover');
            
            // Adicionar efeito específico baseado no tipo de elemento
            if (e.target.matches('a') || e.target.closest('a')) {
                // Efeito para links
                cursorOuter.style.borderColor = 'rgba(16, 185, 129, 0.5)';
                cursorInner.style.backgroundColor = '#10B981';
            } else if (e.target.matches('button, .btn') || e.target.closest('button, .btn')) {
                // Efeito para botões
                cursorOuter.style.borderColor = 'rgba(139, 92, 246, 0.5)';
                cursorInner.style.backgroundColor = '#8B5CF6';
            }
        }
    });
    
    document.addEventListener('mouseout', (e) => {
        if (e.target.matches(interactiveElements) || e.target.closest(interactiveElements)) {
            cursorOuter.classList.remove('cursor-hover');
            cursorInner.classList.remove('cursor-hover');
            
            // Resetar estilos
            cursorOuter.style.borderColor = '';
            cursorInner.style.backgroundColor = '';
        }
    });
    
    // Criar efeito de rastro
    const createTrailEffect = () => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = `${mouseX}px`;
        trail.style.top = `${mouseY}px`;
        trail.style.opacity = '0.6';
        
        document.querySelector('.cursor-container').appendChild(trail);
        
        // Animação de desaparecimento
        setTimeout(() => {
            trail.style.opacity = '0';
            setTimeout(() => {
                trail.remove();
            }, 300);
        }, 100);
    };
    
    // Gerar rastro a cada 100ms
    let trailInterval;
    
    const startTrailEffect = () => {
        trailInterval = setInterval(createTrailEffect, 100);
    };
    
    const stopTrailEffect = () => {
        clearInterval(trailInterval);
    };
    
    // Iniciar efeito de rastro ao mover o mouse
    document.addEventListener('mousemove', () => {
        stopTrailEffect();
        startTrailEffect();
    });
    
    // Parar efeito quando o mouse estiver parado
    document.addEventListener('mousestop', stopTrailEffect);
    
    // Animação do cursor
    const animateCursor = () => {
        // Cálculo de posição suavizada usando LERP (Linear Interpolation)
        outerX += (mouseX - outerX) * smoothFactor.outer;
        outerY += (mouseY - outerY) * smoothFactor.outer;
        
        innerX += (mouseX - innerX) * smoothFactor.inner;
        innerY += (mouseY - innerY) * smoothFactor.inner;
        
        // Aplicar posições
        cursorOuter.style.left = `${outerX}px`;
        cursorOuter.style.top = `${outerY}px`;
        
        cursorInner.style.left = `${innerX}px`;
        cursorInner.style.top = `${innerY}px`;
        
        // Continuar animação
        requestAnimationFrame(animateCursor);
    };
    
    // Iniciar animação do cursor
    animateCursor();
    
    // Adicionar botão para ativar/desativar cursor personalizado
    const toggleButton = document.createElement('button');
    toggleButton.className = 'cursor-toggle';
    toggleButton.innerHTML = '<i class="fas fa-mouse-pointer"></i>';
    toggleButton.title = 'Ativar/Desativar cursor personalizado';
    
    toggleButton.addEventListener('click', function() {
        document.body.classList.toggle('custom-cursor');
        
        if (document.body.classList.contains('custom-cursor')) {
            toggleButton.innerHTML = '<i class="fas fa-mouse-pointer"></i>';
            toggleButton.title = 'Desativar cursor personalizado';
            cursorOuter.style.display = 'block';
            cursorInner.style.display = 'block';
        } else {
            toggleButton.innerHTML = '<i class="fas fa-times"></i>';
            toggleButton.title = 'Ativar cursor personalizado';
            cursorOuter.style.display = 'none';
            cursorInner.style.display = 'none';
        }
    });
    
    // Adicionar estilos para o botão
    const style = document.createElement('style');
    style.textContent = `
        .cursor-toggle {
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(37, 99, 235, 0.2);
            border: none;
            color: white;
            font-size: 16px;
            cursor: pointer;
            z-index: 1000;
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }

        .cursor-toggle:hover {
            background: rgba(37, 99, 235, 0.3);
            transform: scale(1.1);
        }

        @media (max-width: 768px) {
            .cursor-toggle {
                display: none;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(toggleButton);
});

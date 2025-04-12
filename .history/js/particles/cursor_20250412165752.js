document.addEventListener('DOMContentLoaded', () => {
  // Verificar se é dispositivo móvel ou tablet
  const isTouchDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
    || (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
  
  if (isTouchDevice) {
    // Em dispositivos touch, garantir que os estilos padrão sejam mantidos
    document.body.classList.add('touch-device');
    return; // Não executar o resto do código em dispositivos touch
  }
  
  // Adicionar classe ao body para habilitar o cursor personalizado
  // Verificar se já havia preferência salva do usuário
  const cursorEnabled = localStorage.getItem('customCursorEnabled') !== 'false';
  if (cursorEnabled) {
    document.body.classList.add('custom-cursor-enabled');
  }
  
  // Criar o container principal do cursor (melhor para organização)
  const cursorContainer = document.createElement('div');
  cursorContainer.classList.add('cursor-container');
  document.body.appendChild(cursorContainer);
  
  // Criar o cursor principal
  const cursor = document.createElement('div');
  cursor.classList.add('cursor');
  cursorContainer.appendChild(cursor);
  
  // Criar rastro (reduzido para melhor desempenho)
  const trailDots = [];
  const trailLength = 5; // Reduzido para 5 para melhorar desempenho
  
  for (let i = 0; i < trailLength; i++) {
    const dot = document.createElement('div');
    dot.classList.add('cursor-trail');
    dot.style.opacity = 1 - (i / trailLength); // Definir opacidade diretamente para evitar cálculos repetidos
    cursorContainer.appendChild(dot);
    trailDots.push({ 
      element: dot, 
      x: 0, 
      y: 0 
    });
  }
  
  // Variáveis para suavização de movimento
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let lastFrameTime = 0;
  const targetFPS = 60; // Limitar a 60 FPS
  const frameInterval = 1000 / targetFPS;
  let isMouseInWindow = true;
  
  // Movimento do cursor com suavização
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Garantir que o cursor seja exibido novamente se estiver escondido
    if (!isMouseInWindow) {
      isMouseInWindow = true;
      toggleCursorVisibility(true);
    }
  });
  
  // Função para alternar visibilidade do cursor
  function toggleCursorVisibility(visible) {
    const display = visible ? 'block' : 'none';
    cursor.style.display = display;
    trailDots.forEach(item => {
      item.element.style.display = display;
    });
    isMouseInWindow = visible;
  }
  
  // Função de animação para movimento suave com controle de FPS
  function animateCursor(timestamp) {
    if (timestamp - lastFrameTime >= frameInterval) {
      lastFrameTime = timestamp;
      
      // Suavização do movimento do cursor principal
      const easeFactor = 0.2;
      cursorX += (mouseX - cursorX) * easeFactor;
      cursorY += (mouseY - cursorY) * easeFactor;
      
      // Usar transform para melhor desempenho
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      
      // Atualizar rastro usando transform
      trailDots.forEach((item, index) => {
        if (index === 0) {
          item.x = cursorX;
          item.y = cursorY;
        } else {
          const prevDot = trailDots[index - 1];
          item.x += (prevDot.x - item.x) * 0.3;
          item.y += (prevDot.y - item.y) * 0.3;
        }
        
        item.element.style.transform = `translate3d(${item.x}px, ${item.y}px, 0) translate(-50%, -50%)`;
      });
    }
    
    // Continuar a animação somente se o navegador estiver visível
    if (!document.hidden && document.body.classList.contains('custom-cursor-enabled')) {
      requestAnimationFrame(animateCursor);
    }
  }
  
  // Iniciar animação do cursor
  if (cursorEnabled) {
    requestAnimationFrame(animateCursor);
  }
  
  // Cursor fora da janela
  document.addEventListener('mouseout', (e) => {
    // Verificar se realmente saiu da janela
    if (e.relatedTarget === null || e.relatedTarget.nodeName === 'HTML') {
      toggleCursorVisibility(false);
    }
  });
  
  document.addEventListener('mouseover', () => {
    if (!isMouseInWindow && document.body.classList.contains('custom-cursor-enabled')) {
      toggleCursorVisibility(true);
    }
  });
  
  // Eventos de clique
  document.addEventListener('mousedown', () => {
    cursor.classList.add('active');
  });
  
  document.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
  });
  
  // Identifica elementos do menu
  const menuElements = document.querySelectorAll('.menu-hamburger, .nav-links a, .social-links a');

  // Adiciona classe específica para elementos do menu
  menuElements.forEach(element => {
    element.classList.add('menu-element');
    
    // Garante que o cursor padrão seja usado nos elementos do menu
    element.addEventListener('mouseenter', () => {
      if (document.body.classList.contains('custom-cursor-enabled')) {
        cursor.classList.remove('hover'); // Remove qualquer efeito de hover
      }
    });
  });
  
  // Melhor detecção de elementos clicáveis (mais abrangente)
  function updateCursorHoverState() {
    const hoveredElements = document.querySelectorAll(':hover');
    const isHoveringClickable = Array.from(hoveredElements).some(element => {
      // Verificar se é um elemento clicável
      const isClickable = element.tagName === 'A' || 
                          element.tagName === 'BUTTON' || 
                          element.role === 'button' || 
                          element.tagName === 'INPUT' ||
                          element.classList.contains('clickable');
      
      // Verificar se NÃO é um elemento do menu
      const isMenuElement = element.classList.contains('menu-element');
      
      return isClickable && !isMenuElement;
    });
    
    if (isHoveringClickable) {
      cursor.classList.add('hover');
    } else {
      cursor.classList.remove('hover');
    }
  }
  
  // Verificar hover sobre elementos clicáveis com melhor performance
  document.addEventListener('mousemove', updateCursorHoverState, { passive: true });
  
  // Adicionar botão para desativar o cursor personalizado
  const toggleButton = document.createElement('button');
  toggleButton.className = 'cursor-toggle';
  toggleButton.innerHTML = '<i class="fas fa-mouse-pointer"></i>';
  toggleButton.title = 'Alternar cursor personalizado';
  toggleButton.setAttribute('aria-label', 'Alternar cursor personalizado');
  
  toggleButton.addEventListener('click', () => {
    const enableCustomCursor = !document.body.classList.contains('custom-cursor-enabled');
    document.body.classList.toggle('custom-cursor-enabled');
    
    // Salvar preferência do usuário
    localStorage.setItem('customCursorEnabled', enableCustomCursor);
    
    if (enableCustomCursor) {
      toggleCursorVisibility(true);
      requestAnimationFrame(animateCursor); // Reiniciar animação
    } else {
      toggleCursorVisibility(false);
    }
  });
  
  document.body.appendChild(toggleButton);
  
  // Monitorar visibilidade da página para pausar o cursor quando a página não estiver visível
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && document.body.classList.contains('custom-cursor-enabled')) {
      requestAnimationFrame(animateCursor); // Reiniciar quando voltar a ser visível
    }
  });
  
  // Verifica desempenho do dispositivo e desabilita o cursor se for baixo
  function checkPerformance() {
    // Se não for possível detectar, retorna
    if (!window.requestIdleCallback) return;
    
    requestIdleCallback(() => {
      // Detecta hardwareConcurrency
      if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.body.classList.remove('custom-cursor-enabled');
        localStorage.setItem('customCursorEnabled', false);
        toggleCursorVisibility(false);
      }
      
      // Detecta deviceMemory (se disponível)
      if (navigator.deviceMemory && navigator.deviceMemory < 4) {
        document.body.classList.remove('custom-cursor-enabled');
        localStorage.setItem('customCursorEnabled', false);
        toggleCursorVisibility(false);
      }
    });
  }
  
  checkPerformance();
});

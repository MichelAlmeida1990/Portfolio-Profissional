document.addEventListener('DOMContentLoaded', () => {
  // Verificar se é dispositivo móvel
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) return; // Não executar em dispositivos móveis
  
  // Criar o cursor principal
  const cursor = document.createElement('div');
  cursor.classList.add('cursor');
  document.body.appendChild(cursor);
  
  // Criar rastro (reduzido para melhor desempenho)
  const trailDots = [];
  const trailLength = 10; // Reduzido para melhorar desempenho
  
  for (let i = 0; i < trailLength; i++) {
    const dot = document.createElement('div');
    dot.classList.add('cursor-trail');
    document.body.appendChild(dot);
    trailDots.push({ dot, x: 0, y: 0 });
  }
  
  // Variáveis para suavização de movimento
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  
  // Movimento do cursor com suavização
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Função de animação para movimento suave
  function animateCursor() {
    // Suavização do movimento do cursor principal
    const easeFactor = 0.2;
    cursorX += (mouseX - cursorX) * easeFactor;
    cursorY += (mouseY - cursorY) * easeFactor;
    
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    
    // Atualizar rastro
    trailDots.forEach((item, index) => {
      if (index === 0) {
        item.x = cursorX;
        item.y = cursorY;
      } else {
        const prevDot = trailDots[index - 1];
        item.x += (prevDot.x - item.x) * 0.3;
        item.y += (prevDot.y - item.y) * 0.3;
      }
      
      item.dot.style.left = `${item.x}px`;
      item.dot.style.top = `${item.y}px`;
      item.dot.style.opacity = 1 - (index / trailLength);
    });
    
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();
  
  // Cursor fora da janela
  document.addEventListener('mouseout', () => {
    cursor.style.display = 'none';
    trailDots.forEach(item => {
      item.dot.style.display = 'none';
    });
  });
  
  document.addEventListener('mouseover', () => {
    cursor.style.display = 'block';
    trailDots.forEach(item => {
      item.dot.style.display = 'block';
    });
  });
  
  // Eventos de clique
  document.addEventListener('mousedown', () => {
    cursor.classList.add('active');
  });
  
  document.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
  });
  
  // Eventos de hover em elementos clicáveis
  const clickableElements = document.querySelectorAll('a, button, [role="button"], input[type="submit"], .clickable');
  
  clickableElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  });
});

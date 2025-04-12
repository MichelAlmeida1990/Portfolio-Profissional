document.addEventListener('DOMContentLoaded', () => {
    // Verificar se é dispositivo móvel
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) return; // Não executar em dispositivos móveis
    
    // Criar o cursor principal
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);
    
    // Criar rastro de partículas cósmicas
    const trailDots = [];
    const trailLength = 20; // Aumentei para mais partículas
    
    for (let i = 0; i < trailLength; i++) {
      const dot = document.createElement('div');
      dot.classList.add('cursor-trail');
      document.body.appendChild(dot);
      trailDots.push({ 
        dot, 
        x: 0, 
        y: 0, 
        size: Math.random() * 3 + 3 // Tamanho aleatório para cada partícula
      });
    }
    
    // Movimento do cursor
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      
      // Atualizar rastro com efeito de partículas
      setTimeout(() => {
        trailDots.forEach((item, index) => {
          if (index === 0) {
            item.x = e.clientX;
            item.y = e.clientY;
          } else {
            // Adicionar pequena variação aleatória para efeito de partículas
            const randomOffsetX = (Math.random() - 0.5) * 3;
            const randomOffsetY = (Math.random() - 0.5) * 3;
            
            item.x = trailDots[index - 1].x + randomOffsetX;
            item.y = trailDots[index - 1].y + randomOffsetY;
          }
          
          item.dot.style.left = `${item.x}px`;
          item.dot.style.top = `${item.y}px`;
          item.dot.style.opacity = 1 - (index / trailLength);
          
          // Tamanho variável para as partículas
          const scale = 1 - (index * 0.04);
          item.dot.style.width = `${item.size * scale}px`;
          item.dot.style.height = `${item.size * scale}px`;
          item.dot.style.transform = `translate(-50%, -50%) scale(${scale})`;
        });
      }, 20);
    });
    
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
    
    // Eventos de clique com efeito de explosão
    document.addEventListener('mousedown', () => {
      cursor.classList.add('active');
      
      // Efeito de explosão nas partículas
      trailDots.forEach((item, index) => {
        const delay = index * 20;
        setTimeout(() => {
          item.dot.style.transform = `translate(-50%, -50%) scale(${1.5 - (index * 0.05)})`;
          item.dot.style.opacity = '1';
        }, delay);
        
        setTimeout(() => {
          item.dot.style.transform = `translate(-50%, -50%) scale(${1 - (index * 0.04)})`;
          item.dot.style.opacity = 1 - (index / trailLength);
        }, delay + 300);
      });
    });
    
    document.addEventListener('mouseup', () => {
      cursor.classList.remove('active');
    });
    
    // Eventos de hover em elementos clicáveis
    const clickableElements = document.querySelectorAll('a, button, [role="button"], input[type="submit"], .clickable');
    
    clickableElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        
        // Efeito nas partículas ao passar sobre links
        trailDots.forEach((item, index) => {
          item.dot.style.transition = 'all 0.3s ease';
          item.dot.style.opacity = (1 - (index / trailLength)) * 1.3;
        });
      });
      
      element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        
        // Retornar ao normal
        trailDots.forEach((item, index) => {
          item.dot.style.opacity = 1 - (index / trailLength);
        });
      });
    });
  });
  
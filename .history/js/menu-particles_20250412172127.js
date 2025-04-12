document.addEventListener('DOMContentLoaded', function() {
    // Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const menuOverlay = document.getElementById('menuOverlay');
    const navLinks = document.querySelectorAll('.nav-links li');
  
    // Definir índices para animação sequencial
    navLinks.forEach((link, index) => {
      link.style.setProperty('--item-index', index);
    });
  
    // Alternar menu ao clicar no hamburger
    if (menuToggle) {
      menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        
        // Redimensionar canvas quando o menu for aberto
        if (menuOverlay.classList.contains('active')) {
          setTimeout(resizeCanvas, 10);
        }
      });
    }
  
    // Fechar menu ao clicar no botão de fechar
    const closeButton = document.querySelector('.menu-close');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        menuOverlay.classList.remove('active');
      });
    }
  
    // Fechar menu ao clicar em links
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        menuOverlay.classList.remove('active');
      });
    });
  
    // Mudar background da navbar ao scroll
    window.addEventListener('scroll', function() {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  
    // Sistema de partículas com melhor responsividade
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
  
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let isMobile = window.innerWidth <= 768;
    
    // Classe Partícula com ajustes para diferentes dispositivos
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // Tamanhos diferentes para desktop/mobile
        this.size = isMobile ? 
          Math.random() * 2 + 0.5 :  // Menores para mobile
          Math.random() * 3 + 1;     // Maiores para desktop
        
        // Velocidades adaptadas
        const speedFactor = isMobile ? 0.5 : 0.8;
        this.speedX = Math.random() * speedFactor - (speedFactor/2);
        this.speedY = Math.random() * speedFactor - (speedFactor/2);
        
        // Cor ajustada para visibilidade em diferentes telas
        const opacity = isMobile ? 
          Math.random() * 0.8 + 0.2 :  // Mais opaco em mobile para compensar o tamanho menor
          Math.random() * 0.7 + 0.3;
        this.color = `rgba(120, 180, 255, ${opacity})`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Voltar ao outro lado da tela quando sair
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Ajustar tamanho do canvas ao resize com detecção de dispositivo
    function resizeCanvas() {
      canvas.width = menuOverlay.clientWidth;
      canvas.height = menuOverlay.clientHeight;
      
      // Atualizar flag de dispositivo móvel
      isMobile = window.innerWidth <= 768;
      
      createParticles();
    }
    
    window.addEventListener('resize', resizeCanvas);
    
    // Criar partículas com densidade adaptativa
    function createParticles() {
      particlesArray = [];
      
      // Densidade adaptada para diferentes dispositivos
      const densityFactor = isMobile ? 8000 : 6000;
      const minParticles = isMobile ? 30 : 50;
      
      const numberOfParticles = Math.max(
        minParticles, 
        Math.floor((canvas.width * canvas.height) / densityFactor)
      );
      
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }
    
    // Conectar partículas com linhas - adaptado para telas
    function connectParticles() {
      // Distância máxima adaptativa baseada no tamanho da tela
      const maxDistance = isMobile ? 80 : 120;
      const lineWidth = isMobile ? 0.5 : 0.8;
      
      for (let a = 0; a < particlesArray.length; a++) {
        // Otimização: Em mobile, conecta menos partículas para melhor desempenho
        const limit = isMobile ? Math.min(a + 5, particlesArray.length) : particlesArray.length;
        
        for (let b = a; b < limit; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            ctx.strokeStyle = `rgba(100, 160, 255, ${opacity * (isMobile ? 0.8 : 0.7)})`;
            ctx.lineWidth = lineWidth;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }
    
    // Animação com otimização para frames
    function animate() {
      if (!menuOverlay.classList.contains('active')) {
        requestAnimationFrame(animate);
        return;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      
      connectParticles();
      requestAnimationFrame(animate);
    }
    
    // Inicialização com detecção de contexto visual
    function initCanvas() {
      // Verificar se o menu está visível para o resize inicial
      if (menuOverlay.clientWidth > 0) {
        resizeCanvas();
        animate();
      } else {
        // Se o menu ainda não estiver visível, tentar novamente em breve
        setTimeout(initCanvas, 100);
      }
    }
    
    // Inicialização após um pequeno atraso para garantir que tudo está pronto
    setTimeout(initCanvas, 100);
    
    // Adicionar otimização para navegadores mobile: reduzir qualidade quando em movimento
    let lastTime = 0;
    let lastPositions = [];
    
    // Detectar movimento rápido para otimização em dispositivos móveis
    if (isMobile) {
      window.addEventListener('touchmove', function(e) {
        const currentTime = Date.now();
        
        // Armazenar posições recentes
        lastPositions.push({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          time: currentTime
        });
        
        // Manter apenas as 5 últimas posições
        if (lastPositions.length > 5) {
          lastPositions.shift();
        }
        
        // Se o movimento for rápido, diminuir o número de partículas temporariamente
        if (lastPositions.length >= 2) {
          const oldPos = lastPositions[0];
          const newPos = lastPositions[lastPositions.length - 1];
          
          const dx = newPos.x - oldPos.x;
          const dy = newPos.y - oldPos.y;
          const dt = newPos.time - oldPos.time;
          
          // Calcular velocidade do movimento
          const speed = Math.sqrt(dx*dx + dy*dy) / dt;
          
          // Se movimento rápido, reduzir partículas temporariamente
          if (speed > 0.5 && particlesArray.length > 20) {
            particlesArray = particlesArray.slice(0, Math.floor(particlesArray.length * 0.7));
          }
        }
      });
      
      // Restaurar o número normal de partículas quando o movimento parar
      window.addEventListener('touchend', function() {
        setTimeout(resizeCanvas, 300);
        lastPositions = [];
      });
    }
  });
  
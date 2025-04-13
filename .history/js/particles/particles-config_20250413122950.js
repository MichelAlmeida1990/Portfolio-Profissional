document.addEventListener('DOMContentLoaded', function() {
  // Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuBackdrop = document.getElementById('menuBackdrop');
  const closeButton = document.querySelector('.menu-close');
  const navLinks = document.querySelectorAll('.nav-links li');
  
  // Definir índices para animação sequencial
  navLinks.forEach((link, index) => {
    link.style.setProperty('--item-index', index);
  });
  
  // Alternar menu ao clicar no hamburger
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      console.log('Menu toggle clicked'); // Debug
      menuToggle.classList.toggle('active');
      menuOverlay.classList.toggle('active');
      
      // Ativar/desativar backdrop
      if (menuBackdrop) {
        menuBackdrop.classList.toggle('active');
      }
      
      // Impedir rolagem do body quando o menu estiver aberto
      if (menuOverlay.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
        setTimeout(resizeCanvas, 10); // Redimensionar canvas após abertura
      } else {
        document.body.style.overflow = '';
      }
    });
  }
  
  // Fechar menu ao clicar no botão de fechar
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      console.log('Close button clicked'); // Debug
      menuToggle.classList.remove('active');
      menuOverlay.classList.remove('active');
      if (menuBackdrop) {
        menuBackdrop.classList.remove('active');
      }
      document.body.style.overflow = '';
    });
  }
  
  // Fechar menu ao clicar no backdrop
  if (menuBackdrop) {
    menuBackdrop.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      menuOverlay.classList.remove('active');
      menuBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
  
  // Fechar menu ao clicar em links
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      console.log('Nav item clicked'); // Debug
      menuToggle.classList.remove('active');
      menuOverlay.classList.remove('active');
      if (menuBackdrop) {
        menuBackdrop.classList.remove('active');
      }
      document.body.style.overflow = '';
    });
  });
  
  // Sistema de partículas
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let particlesArray = [];
  let isMobile = window.innerWidth <= 768;
  
  // Classe Partícula (configuração melhorada para visibilidade)
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
        Math.random() * 0.5 + 0.2 :  // Menos opaco em mobile para não interferir no conteúdo
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
  
  // Ajustar tamanho do canvas ao resize
  function resizeCanvas() {
    if (!menuOverlay || !canvas) return;
    
    canvas.width = menuOverlay.clientWidth;
    canvas.height = menuOverlay.clientHeight;
    
    // Atualizar flag de dispositivo móvel
    isMobile = window.innerWidth <= 768;
    
    createParticles();
  }
  
  // Criar partículas com densidade adaptativa
  function createParticles() {
    particlesArray = [];
    
    // Densidade adaptada para diferentes dispositivos
    const particleCount = isMobile ? 30 : 50;
    
    for (let i = 0; i < particleCount; i++) {
      particlesArray.push(new Particle());
    }
  }
  
  // Conectar partículas com linhas
  function connectParticles() {
    const maxDistance = isMobile ? 80 : 120;
    const lineWidth = isMobile ? 0.5 : 0.8;
    
    for (let a = 0; a < particlesArray.length; a++) {
      // Em mobile, conectar menos partículas para melhor desempenho
      const limit = isMobile ? Math.min(a + 5, particlesArray.length) : particlesArray.length;
      
      for (let b = a; b < limit; b++) {
        const dx = particlesArray[a].x - particlesArray[b].x;
        const dy = particlesArray[a].y - particlesArray[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          const opacity = 1 - (distance / maxDistance);
          // Menor opacidade em mobile para maior legibilidade do conteúdo
          ctx.strokeStyle = `rgba(100, 160, 255, ${opacity * (isMobile ? 0.4 : 0.7)})`;
          ctx.lineWidth = lineWidth;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }
  
  // Animação
  function animate() {
    if (!menuOverlay || !menuOverlay.classList.contains('active')) {
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
  
  // Inicialização
  window.addEventListener('resize', function() {
    if (menuOverlay && menuOverlay.classList.contains('active')) {
      resizeCanvas();
    }
  });
  
  // Inicializar o canvas e começar a animação
  setTimeout(function() {
    resizeCanvas();
    animate();
  }, 100);
});

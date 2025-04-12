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
  
    // Sistema de partículas (código otimizado para menu lateral)
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
  
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    
    // CORREÇÃO: Definir a classe Particle ANTES de qualquer função que a utilize
    // Classe Partícula (configuração melhorada para visibilidade)
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1; // Partículas maiores para melhor visualização
        this.speedX = Math.random() * 0.8 - 0.4; // Velocidade ligeiramente maior
        this.speedY = Math.random() * 0.8 - 0.4;
        this.color = `rgba(120, 180, 255, ${Math.random() * 0.7 + 0.3})`; // Mais azulado e opaco
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
      canvas.width = menuOverlay.clientWidth;
      canvas.height = menuOverlay.clientHeight;
      createParticles(); // Recriar partículas quando o canvas for redimensionado
    }
    
    window.addEventListener('resize', resizeCanvas);
    
    // Criar partículas - agora com melhor densidade
    function createParticles() {
      particlesArray = [];
      const numberOfParticles = Math.max(50, Math.floor((canvas.width * canvas.height) / 6000));
      
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }
    
    // Conectar partículas com linhas
    function connectParticles() {
      const maxDistance = 120; // Aumentei a distância de conexão
      
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            ctx.strokeStyle = `rgba(100, 160, 255, ${opacity * 0.7})`; // Linhas mais visíveis
            ctx.lineWidth = 0.8;
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
    
    // Inicialização após um pequeno atraso para garantir que tudo está pronto
    setTimeout(() => {
      resizeCanvas();
      animate();
    }, 100);
  });
  
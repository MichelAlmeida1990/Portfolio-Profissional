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
    
    // Ajustar tamanho do canvas ao resize
    function resizeCanvas() {
      canvas.width = menuOverlay.clientWidth;
      canvas.height = menuOverlay.clientHeight;
      createParticles(); // Recriar partículas quando o canvas for redimensionado
    }
    
    window.addEventListener('resize', resizeCanvas);
    
    resizeCanvas();
    
    // Classe Partícula (menos partículas para melhor desempenho em espaço menor)
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5; // Partículas menores
        this.speedX = Math.random() * 0.6 - 0.3; // Velocidade reduzida
        this.speedY = Math.random() * 0.6 - 0.3; // Velocidade reduzida
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.5})`;
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
    
    // Criar menos partículas para o menu lateral
    function createParticles() {
      particlesArray = [];
      const numberOfParticles = Math.min(40, Math.floor((canvas.width * canvas.height) / 8000));
      
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }
    
    // Conectar partículas com linhas
    function connectParticles() {
      const maxDistance = 100; // Distância reduzida para o menu lateral
      
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            ctx.strokeStyle = `rgba(74, 143, 255, ${opacity * 0.5})`;
            ctx.lineWidth = 0.5;
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
    
    createParticles();
    animate();
  });
  
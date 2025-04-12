document.addEventListener('DOMContentLoaded', function() {
    // Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const menuOverlay = document.getElementById('menuOverlay');
    const navLinks = document.querySelectorAll('.nav-links li');
  
    // Definir índices para animação sequencial
    navLinks.forEach((link, index) => {
      link.style.setProperty('--item-index', index);
    });
  
    // NOVA FUNÇÃO: Corrigir a visibilidade do menu em dispositivos móveis
    function fixMenuVisibility() {
      const isMobile = window.innerWidth <= 768;
      
      if (menuOverlay) {
        if (isMobile) {
          // Estilos para o overlay do menu em mobile
          menuOverlay.style.width = '100%';
          menuOverlay.style.height = '100vh';
          menuOverlay.style.overflowY = 'auto';
          menuOverlay.style.position = 'fixed';
          menuOverlay.style.top = '0';
          menuOverlay.style.left = '0';
          menuOverlay.style.display = 'flex';
          menuOverlay.style.flexDirection = 'column';
          
          // Encontrar e ajustar o conteúdo do menu
          const menuContent = menuOverlay.querySelector('.nav-content, .menu-content, .nav-links');
          if (menuContent) {
            menuContent.style.display = 'block';
            menuContent.style.width = '100%';
            menuContent.style.position = 'relative';
            menuContent.style.zIndex = '10'; // Garantir que esteja acima do canvas
            menuContent.style.opacity = '1';
            menuContent.style.padding = '20px';
            menuContent.style.boxSizing = 'border-box';
          }
          
          // Garantir visibilidade dos links
          const allLinks = menuOverlay.querySelectorAll('a, .nav-item, .nav-link');
          allLinks.forEach(link => {
            link.style.display = 'block';
            link.style.opacity = '1';
            link.style.visibility = 'visible';
            link.style.padding = '10px 0';
            link.style.color = 'inherit';
          });
        } else {
          // Restaurar estilos padrão para desktop
          menuOverlay.style.width = '';
          menuOverlay.style.height = '';
          menuOverlay.style.overflowY = '';
          menuOverlay.style.position = '';
        }
      }
      
      // Ajustar canvas para ficar atrás do conteúdo
      const canvas = document.getElementById('particleCanvas');
      if (canvas) {
        canvas.style.position = 'absolute';
        canvas.style.zIndex = '1';
        canvas.style.top = '0';
        canvas.style.left = '0';
      }
    }
  
    // Alternar menu ao clicar no hamburger
    if (menuToggle) {
      menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        
        // Aplicar correção e redimensionar canvas quando o menu for aberto
        if (menuOverlay.classList.contains('active')) {
          setTimeout(fixMenuVisibility, 10);
          setTimeout(resizeCanvas, 10);
          
          // Impedir rolagem do body quando o menu estiver aberto em mobile
          if (window.innerWidth <= 768) {
            document.body.style.overflow = 'hidden';
          }
        } else {
          document.body.style.overflow = '';
        }
      });
    }
  
    // Fechar menu ao clicar no botão de fechar
    const closeButton = document.querySelector('.menu-close');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  
    // Fechar menu ao clicar em links
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  
    // Mudar background da navbar ao scroll
    window.addEventListener('scroll', function() {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    });
  
    // Aplicar fixação ao redimensionar a janela
    window.addEventListener('resize', function() {
      if (menuOverlay && menuOverlay.classList.contains('active')) {
        fixMenuVisibility();
        resizeCanvas();
      }
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
      
      // Posicionamento do canvas
      canvas.style.position = 'absolute';
      canvas.style.zIndex = '1'; // Garantir que o canvas fique abaixo do conteúdo
      canvas.style.top = '0';
      canvas.style.left = '0';
      
      createParticles();
    }
    
    // Criar partículas com densidade adaptativa
    function createParticles() {
      particlesArray = [];
      
      // Densidade adaptada para diferentes dispositivos
      const densityFactor = isMobile ? 10000 : 6000;
      const minParticles = isMobile ? 20 : 50;
      
      const numberOfParticles = Math.max(
        minParticles, 
        Math.floor((canvas.width * canvas.height) / densityFactor)
      );
      
      for (let i = 0; i < numberOfParticles; i++) {
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
    
    // Inicialização com verificação de visibilidade
    function initCanvas() {
      if (menuOverlay && menuOverlay.clientWidth > 0) {
        resizeCanvas();
        
        // Garantir que o canvas esteja posicionado corretamente
        if (canvas) {
          canvas.style.position = 'absolute';
          canvas.style.zIndex = '1';
          canvas.style.top = '0';
          canvas.style.left = '0';
        }
        
        // Verificar se o menu está ativo
        if (menuOverlay.classList.contains('active')) {
          fixMenuVisibility();
        }
        
        animate();
      } else {
        setTimeout(initCanvas, 100);
      }
    }
    
    // Inicialização após um pequeno atraso para garantir que tudo está pronto
    setTimeout(initCanvas, 100);
  });
  
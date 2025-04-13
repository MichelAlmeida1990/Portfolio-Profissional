// Função para inicializar partículas em um elemento específico
function initCardParticles(containerId) {
    const options = {
      particles: {
        number: {
          value: 20,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: "#ffffff"
        },
        opacity: {
          value: 0.2,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab"
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.5
            }
          }
        }
      },
      retina_detect: true
    };
    
    // Inicializar partículas no container específico
    particlesJS(containerId, options);
  }
  
  // Função para inicializar partículas em todos os cards
  function initAllCardParticles() {
    // Obter todos os elementos que precisam de partículas
    const cardElements = document.querySelectorAll('.card-particles-container');
    
    // Para cada elemento, criar um ID único e inicializar partículas
    cardElements.forEach((element, index) => {
      const particlesId = `card-particles-${index}`;
      element.id = particlesId;
      initCardParticles(particlesId);
    });
  }
  
  // Inicializar quando o DOM estiver carregado
  document.addEventListener('DOMContentLoaded', function() {
    // Aguardar um pouco para garantir que a biblioteca particles.js esteja carregada
    setTimeout(initAllCardParticles, 500);
  });
  
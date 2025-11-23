document.addEventListener('DOMContentLoaded', function() {
    console.log("Inicializando partículas nos cards...");
    
    // Função para determinar a configuração baseada no tamanho da tela
    function getParticlesConfig() {
        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
        
        return {
            "particles": {
                "number": {
                    // Aumentado para tema claro mais forte
                    "value": isMobile ? 60 : (isTablet ? 90 : 120),
                    "density": {
                        "enable": true,
                        "value_area": isMobile ? 600 : 800
                    }
                },
                "color": {
                    "value": "#00D96F"  // Cor padrão para o tema claro (verde escuro neon)
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.85,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": isMobile ? 0.6 : 0.8,
                        "opacity_min": 0.3,
                        "sync": false
                    }
                },
                "size": {
                    "value": isMobile ? 3 : 4,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": isMobile ? 1.5 : 2,
                        "size_min": 0.3,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": isMobile ? 140 : 180,
                    "color": "#00D96F",
                    "opacity": 0.7,
                    "width": isMobile ? 1 : 1.5
                },
                "move": {
                    "enable": true,
                    "speed": isMobile ? 1.5 : 2,  // Velocidade reduzida em dispositivos móveis
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": true,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": !isMobile, // Desativar hover em dispositivos móveis
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": isMobile ? 100 : 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": isMobile ? 2 : 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        };
    }
    
    // Cores para os diferentes temas
    const colors = {
        light: {
            particles: "#00D96F",  // Verde escuro neon
            lines: "#00D96F"
        },
        dark: {
            particles: "#FFD700",  // Dourado
            lines: "#FFD700"
        }
    };
    
    // Função para atualizar as cores das partículas com base no tema
    window.updateParticlesColors = function(isDarkTheme) {
        console.log("Atualizando cores das partículas dos cards para tema:", isDarkTheme ? "escuro" : "claro");
        
        const theme = isDarkTheme ? 'dark' : 'light';
        const newColors = colors[theme];
        
        // Atualizar todas as instâncias de particles.js para os cards
        if (window.pJSDom) {
            for (let i = 0; i < window.pJSDom.length; i++) {
                try {
                    if (window.pJSDom[i] && window.pJSDom[i].pJS) {
                        const pJS = window.pJSDom[i].pJS;
                        
                        // Verificar se é um container de card
                        const canvasElement = pJS.canvas.el;
                        if (canvasElement && canvasElement.parentElement && 
                            canvasElement.parentElement.classList.contains('card-particles-container')) {
                            
                            // Atualizar cor das partículas
                            if (pJS.particles && pJS.particles.color) {
                                pJS.particles.color.value = newColors.particles;
                            }
                            
                            // Atualizar cor das linhas
                            if (pJS.particles && pJS.particles.line_linked) {
                                pJS.particles.line_linked.color = newColors.lines;
                            }
                            
                            // Recarregar partículas
                            if (typeof pJS.fn.particlesRefresh === 'function') {
                                pJS.fn.particlesRefresh();
                            }
                        }
                    }
                } catch (error) {
                    console.error("Erro ao atualizar partículas do card:", error);
                }
            }
        }
    };
    
    // Inicializar partículas em todos os containers de cards
    function initializeParticles() {
        const cardContainers = document.querySelectorAll('.card-particles-container');
        console.log(`Encontrados ${cardContainers.length} containers para partículas`);
        
        // Obter configuração baseada no tamanho atual da tela
        const particlesConfig = getParticlesConfig();
        
        // Limpar instâncias existentes de partículas nos cards
        if (window.pJSDom) {
            const instancesToRemove = [];
            for (let i = 0; i < window.pJSDom.length; i++) {
                try {
                    if (window.pJSDom[i] && window.pJSDom[i].pJS) {
                        const canvasElement = window.pJSDom[i].pJS.canvas.el;
                        if (canvasElement && canvasElement.parentElement && 
                            canvasElement.parentElement.classList.contains('card-particles-container')) {
                            instancesToRemove.push(i);
                            // Remover o canvas
                            if (canvasElement.parentElement) {
                                canvasElement.parentElement.removeChild(canvasElement);
                            }
                        }
                    }
                } catch (error) {
                    console.error("Erro ao limpar partículas:", error);
                }
            }
            
            // Remover instâncias do array pJSDom (de trás para frente para evitar problemas de índice)
            for (let i = instancesToRemove.length - 1; i >= 0; i--) {
                window.pJSDom.splice(instancesToRemove[i], 1);
            }
        }
        
        // Inicializar novas instâncias
        cardContainers.forEach((container, index) => {
            const containerId = `card-particles-${index}`;
            container.id = containerId;
            
            // Inicializar partículas neste container
            try {
                particlesJS(containerId, particlesConfig);
                console.log(`Partículas inicializadas para ${containerId}`);
            } catch (error) {
                console.error(`Erro ao inicializar partículas para ${containerId}:`, error);
            }
        });
        
        // Aplicar cores de acordo com o tema atual
        const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
        setTimeout(() => {
            window.updateParticlesColors(isDarkTheme);
        }, 500);
    }
    
    // Inicializar partículas
    initializeParticles();
    
    // Reinicializar partículas quando a janela for redimensionada
    let resizeTimeout;
    window.addEventListener('resize', function() {
        // Usar debounce para evitar múltiplas reinicializações durante o redimensionamento
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            console.log("Janela redimensionada, reinicializando partículas");
            initializeParticles();
        }, 250);
    });
});

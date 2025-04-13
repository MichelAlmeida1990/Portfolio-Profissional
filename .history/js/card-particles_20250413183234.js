document.addEventListener('DOMContentLoaded', function() {
    console.log("Inicializando partículas nos cards...");
    
    // Configurações para as partículas dos cards
    const particlesConfig = {
        "particles": {
            "number": {
                "value": 80,  // Aumentado de ~30-40 para 80 partículas
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#4A8FFF"  // Cor padrão para o tema claro (azul)
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
                "value": 0.6,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 0.8,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#4A8FFF",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,  // Velocidade aumentada para mais movimento
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
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"  // Adiciona mais partículas ao clicar
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
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
                    "particles_nb": 4  // Adiciona 4 partículas ao clicar
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    };
    
    // Cores para os diferentes temas
    const colors = {
        light: {
            particles: "#4A8FFF",  // Azul
            lines: "#4A8FFF"
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
            // Começar do índice 1 para pular as partículas do background principal (se existir)
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
    const cardContainers = document.querySelectorAll('.card-particles-container');
    console.log(`Encontrados ${cardContainers.length} containers para partículas`);
    
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
});

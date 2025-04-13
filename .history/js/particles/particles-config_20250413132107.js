/**
 * Configuração das partículas interativas para o portfólio
 * Utiliza a biblioteca particles.js
 */

document.addEventListener('DOMContentLoaded', function() {
    // Detectar se o dispositivo tem capacidade para renderizar partículas
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowPerfDevice = isMobile || window.navigator.hardwareConcurrency <= 4;
    
    // Configurar densidade de partículas com base no dispositivo
    const particleCount = isLowPerfDevice ? 50 : 100;
    const particleSpeed = isLowPerfDevice ? 3 : 6;
    
    // Verificar se o elemento particles-js existe
    if (document.getElementById('particles-js')) {
        // Inicializar particles.js com configurações personalizadas
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": particleCount,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": ["#2563EB", "#10B981", "#8B5CF6", "#ffffff"]
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
                        "speed": 1,
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
                        "size_min": 0.3,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#2563EB",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": particleSpeed / 2,
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
                        "mode": "push"
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
                        "particles_nb": isLowPerfDevice ? 2 : 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
        
        // Adicionar evento para desativar partículas em dispositivos de baixo desempenho
        // se o usuário tiver problemas de desempenho
        if (isLowPerfDevice) {
            // Monitorar taxa de quadros
            let lastTime = performance.now();
            let frames = 0;
            let lowFPSCounter = 0;
            
            function checkPerformance() {
                frames++;
                const currentTime = performance.now();
                
                if (currentTime - lastTime > 1000) {
                    const fps = Math.round((frames * 1000) / (currentTime - lastTime));
                    
                    // Se FPS for menor que 30, incrementar contador de baixo desempenho
                    if (fps < 30) {
                        lowFPSCounter++;
                        
                        // Se o desempenho for ruim por 3 segundos consecutivos, desativar partículas
                        if (lowFPSCounter >= 3) {
                            document.body.classList.add('particles-disabled');
                            console.log('Partículas desativadas devido ao baixo desempenho');
                            
                            // Parar de monitorar
                            return;
                        }
                    } else {
                        // Resetar contador se o desempenho melhorar
                        lowFPSCounter = 0;
                    }
                    
                    lastTime = currentTime;
                    frames = 0;
                }
                
                requestAnimationFrame(checkPerformance);
            }
            
            // Iniciar monitoramento de desempenho após 2 segundos
            setTimeout(() => {
                requestAnimationFrame(checkPerformance);
            }, 2000);
        }
        
        // Adicionar botão para ativar/desativar partículas
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const toggleButton = document.createElement('button');
            toggleButton.className = 'particles-toggle';
            toggleButton.innerHTML = '<i class="fas fa-snowflake"></i>';
            toggleButton.title = 'Ativar/Desativar efeito de partículas';
            
            toggleButton.addEventListener('click', function() {
                document.body.classList.toggle('particles-disabled');
                
                // Atualizar ícone do botão
                const icon = toggleButton.querySelector('i');
                if (document.body.classList.contains('particles-disabled')) {
                    icon.className = 'fas fa-snowflake';
                    toggleButton.title = 'Ativar efeito de partículas';
                } else {
                    icon.className = 'fas fa-times';
                    toggleButton.title = 'Desativar efeito de partículas';
                }
            });
            
            heroSection.appendChild(toggleButton);
            
            // Adicionar estilos CSS para o botão
            const style = document.createElement('style');
            style.textContent = `
                .particles-toggle {
                    position: absolute;
                    bottom: 20px;
                    right: 20px;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.2);
                    border: none;
                    color: white;
                    font-size: 16px;
                    cursor: pointer;
                    z-index: 10;
                    backdrop-filter: blur(5px);
                    -webkit-backdrop-filter: blur(5px);
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                }
                
                .particles-toggle:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(1.1);
                }
                
                @media (max-width: 768px) {
                    .particles-toggle {
                        bottom: 10px;
                        right: 10px;
                        width: 35px;
                        height: 35px;
                        font-size: 14px;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
});

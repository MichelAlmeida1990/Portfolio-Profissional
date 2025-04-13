document.addEventListener('DOMContentLoaded', function() {
    // Selecionar o botão de alternância de tema
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    
    // Verificar preferência salva no localStorage
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Aplicar tema salvo
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    // Adicionar evento de clique ao botão
    themeToggle.addEventListener('click', function() {
        // Obter o tema atual
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        // Alternar para o outro tema
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Adicionar classe de transição para animação
        document.body.classList.add('theme-transition');
        
        // Aplicar o novo tema
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Salvar preferência no localStorage
        localStorage.setItem('theme', newTheme);
        
        // Atualizar o ícone
        updateThemeIcon(newTheme);
        
        // Atualizar configuração das partículas
        updateParticlesTheme(newTheme);
        
        // Remover classe de transição após a animação
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 500);
    });
    
    // Função para atualizar o ícone baseado no tema
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            themeToggle.setAttribute('title', 'Mudar para modo claro');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            themeToggle.setAttribute('title', 'Mudar para modo escuro');
        }
    }
    
    // Função para atualizar as partículas com base no tema
    function updateParticlesTheme(theme) {
        // Atualizar partículas da página principal (se existirem)
        if (window.pJSDom && window.pJSDom.length > 0) {
            // Cores para modo escuro (dourado)
            const darkThemeColors = {
                particles: {
                    color: {
                        value: '#FFD700' // Dourado
                    },
                    line_linked: {
                        color: '#FFD700' // Dourado
                    }
                }
            };
            
            // Cores para modo claro (azul)
            const lightThemeColors = {
                particles: {
                    color: {
                        value: '#4A8FFF' // Azul
                    },
                    line_linked: {
                        color: '#4A8FFF' // Azul
                    }
                }
            };
            
            // Aplicar configurações baseadas no tema
            const newColors = theme === 'dark' ? darkThemeColors : lightThemeColors;
            
            // Atualizar as partículas
            if (window.pJSDom[0].pJS) {
                const pJS = window.pJSDom[0].pJS;
                
                // Atualizar cor das partículas
                pJS.particles.color.value = newColors.particles.color.value;
                pJS.particles.color.rgb = hexToRgb(newColors.particles.color.value);
                
                // Atualizar cor das linhas
                pJS.particles.line_linked.color = newColors.particles.line_linked.color;
                pJS.particles.line_linked.color_rgb_line = hexToRgb(newColors.particles.line_linked.color);
                
                // Recarregar partículas
                pJS.fn.particlesRefresh();
            }
        }
        
        // Atualizar partículas do menu (se existirem)
        updateMenuParticles(theme);
    }
    
    // Função para atualizar as partículas do menu
    function updateMenuParticles(theme) {
        // Verificar se as partículas do menu estão inicializadas
        if (window.particlesArray && window.particlesArray.length > 0) {
            const darkColor = 'rgba(255, 215, 0, 0.7)'; // Dourado com transparência
            const lightColor = 'rgba(120, 180, 255, 0.7)'; // Azul com transparência
            
            const newColor = theme === 'dark' ? darkColor : lightColor;
            
            // Atualizar cor de cada partícula
            window.particlesArray.forEach(particle => {
                // Extrair valor de opacidade da cor atual
                const opacity = parseFloat(particle.color.match(/[\d\.]+(?=\))/)[0]);
                particle.color = theme === 'dark' 
                    ? gba(255, 215, 0, ) 
                    : gba(120, 180, 255, );
            });
        }
    }
    
    // Função auxiliar para converter hex para rgb
    function hexToRgb(hex) {
        // Remover # se presente
        hex = hex.replace('#', '');
        
        // Converter para RGB
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        
        return {r: r, g: g, b: b};
    }
});
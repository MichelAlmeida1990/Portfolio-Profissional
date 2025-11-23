document.addEventListener('DOMContentLoaded', function() {
    console.log("Script de tema carregado"); // Para verificar se o script está carregando
    
    // Selecionar o botão de alternância de tema
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) {
        console.error("Botão de tema não encontrado!");
        return;
    }
    
    console.log("Botão de tema encontrado:", themeToggle);
    
    const themeIcon = themeToggle.querySelector('i');
    
    // Verificar preferência salva no localStorage
    const savedTheme = localStorage.getItem('theme');
    console.log("Tema salvo:", savedTheme);
    
    // Aplicar tema salvo
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeIcon) {
            themeIcon.className = 'fas fa-sun';
            themeToggle.setAttribute('title', 'Mudar para modo claro');
        }
    }
    
    // Adicionar evento de clique ao botão
    themeToggle.addEventListener('click', function() {
        console.log("Botão de tema clicado");
        
        // Obter o tema atual
        const currentTheme = document.documentElement.getAttribute('data-theme');
        console.log("Tema atual:", currentTheme);
        
        // Alternar para o outro tema
        if (currentTheme === 'dark') {
            // Mudar para tema claro
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            
            if (themeIcon) {
                themeIcon.className = 'fas fa-moon';
                themeToggle.setAttribute('title', 'Mudar para modo escuro');
            }
            
            console.log("Mudou para tema claro");
        } else {
            // Mudar para tema escuro
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            
            if (themeIcon) {
                themeIcon.className = 'fas fa-sun';
                themeToggle.setAttribute('title', 'Mudar para modo claro');
            }
            
            console.log("Mudou para tema escuro");
        }
        
        // Adicionar classe de transição para animação
        document.body.classList.add('theme-transition');
        
        // Atualizar configuração das partículas
        updateParticlesTheme(currentTheme === 'dark' ? 'light' : 'dark');
        
        // Atualizar partículas dos cards
        if (window.updateParticlesColors) {
            window.updateParticlesColors(currentTheme !== 'dark');
        }
        
        // Disparar evento de mudança de tema para reinicializar animações
        const themeChangedEvent = new CustomEvent('themeChanged', {
            detail: { theme: currentTheme === 'dark' ? 'light' : 'dark' }
        });
        document.dispatchEvent(themeChangedEvent);
        
        // Remover classe de transição após a animação
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 500);
    });
    
    // Função para atualizar as partículas com base no tema
    function updateParticlesTheme(theme) {
        console.log("Atualizando partículas para tema:", theme);
        
        // Atualizar partículas da página principal (se existirem)
        if (window.pJSDom && window.pJSDom.length > 0) {
            console.log("Atualizando partículas principais");
            
            // Cores para modo escuro (dourado)
            const darkThemeColors = {
                color: '#FFD700', // Dourado
                lineColor: '#FFD700' // Dourado
            };
            
            // Cores para modo claro (verde escuro neon)
            const lightThemeColors = {
                color: '#00D96F', // Verde escuro neon
                lineColor: '#00D96F' // Verde escuro neon
            };
            
            // Aplicar configurações baseadas no tema
            const newColors = theme === 'dark' ? darkThemeColors : lightThemeColors;
            
            try {
                // Percorrer todas as instâncias de particles.js
                for (let i = 0; i < window.pJSDom.length; i++) {
                    if (window.pJSDom[i] && window.pJSDom[i].pJS) {
                        const pJS = window.pJSDom[i].pJS;
                        
                        // Atualizar cor das partículas
                        if (pJS.particles && pJS.particles.color) {
                            pJS.particles.color.value = newColors.color;
                        }
                        
                        // Atualizar cor das linhas
                        if (pJS.particles && pJS.particles.line_linked) {
                            pJS.particles.line_linked.color = newColors.lineColor;
                        }
                        
                        // Recarregar partículas
                        if (typeof pJS.fn.particlesRefresh === 'function') {
                            pJS.fn.particlesRefresh();
                        }
                    }
                }
            } catch (error) {
                console.error("Erro ao atualizar partículas:", error);
            }
        }
        
        // Atualizar partículas do menu (se existirem)
        if (window.particlesArray && window.particlesArray.length > 0) {
            console.log("Atualizando partículas do menu");
            
            const darkColor = 'rgba(255, 215, 0, 0.7)'; // Dourado com transparência
            const lightColor = 'rgba(0, 217, 111, 0.7)'; // Verde escuro neon com transparência
            
            try {
                // Atualizar cor de cada partícula
                window.particlesArray.forEach(particle => {
                    if (particle && particle.color) {
                        // Tentar extrair opacidade da cor atual
                        let opacity = 0.7; // valor padrão
                        const match = particle.color.match(/[\d\.]+(?=\))/);
                        if (match && match[0]) {
                            opacity = parseFloat(match[0]);
                        }
                        
                        // Definir nova cor
                        particle.color = theme === 'dark' 
                            ? `rgba(255, 215, 0, ${opacity})` 
                            : `rgba(120, 180, 255, ${opacity})`;
                    }
                });
            } catch (error) {
                console.error("Erro ao atualizar partículas do menu:", error);
            }
        }
    }
    
    // Aplicar tema às partículas na inicialização
    setTimeout(() => {
        if (savedTheme === 'dark') {
            updateParticlesTheme('dark');
            // Atualizar partículas dos cards
            if (window.updateParticlesColors) {
                window.updateParticlesColors(true);
            }
        }
    }, 1000); // Pequeno atraso para garantir que as partículas estejam inicializadas
});

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Verifica se há uma preferência de tema salva
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Aplica o tema salvo
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    
    // Alterna o tema quando o botão é clicado
    themeToggle.addEventListener('click', function() {
        let theme = 'light';
        
        // Verifica o tema atual e alterna
        if (document.documentElement.getAttribute('data-theme') !== 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            theme = 'dark';
        } else {
            document.documentElement.removeAttribute('data-theme');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
        
        // Adiciona uma animação ao alternar o tema
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 500);
        
        // Salva a preferência de tema
        localStorage.setItem('theme', theme);
    });
});

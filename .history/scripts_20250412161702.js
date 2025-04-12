<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Selecionar elementos
        const menuHamburger = document.querySelector('.menu-hamburger');
        const navLinks = document.querySelector('.nav-links');
        const navItems = document.querySelectorAll('.nav-item');
        
        // Função para alternar o menu
        function toggleMenu() {
            // Alterna a classe active no menu hamburger
            menuHamburger.classList.toggle('active');
            
            // Alterna a classe active no nav-links
            navLinks.classList.toggle('active');
            
            // Atualiza o atributo aria-expanded para acessibilidade
            const isExpanded = menuHamburger.classList.contains('active');
            menuHamburger.setAttribute('aria-expanded', isExpanded);
            
            // Alternar ícone do menu
            const icon = menuHamburger.querySelector('i');
            if (icon) {
                if (isExpanded) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
        
        // Adicionar evento de clique ao menu hamburger
        menuHamburger.addEventListener('click', toggleMenu);
        
        // Adicionar evento de clique a cada item do menu para fechar o menu ao clicar
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                if (navLinks.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
        
        // Fechar o menu ao clicar fora dele
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navLinks.contains(event.target);
            const isClickOnHamburger = menuHamburger.contains(event.target);
            
            if (navLinks.classList.contains('active') && !isClickInsideMenu && !isClickOnHamburger) {
                toggleMenu();
            }
        });
    });
</script>

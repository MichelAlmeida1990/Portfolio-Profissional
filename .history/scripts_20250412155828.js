// Esperar que o DOM seja carregado completamente
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas as funcionalidades
    initMobileMenu();
    initScrollNavbar();
    initScrollToSection();
    initCertificadosSlider();
    initFormValidation();
});

// Função para inicializar o menu mobile
function initMobileMenu() {
    const menuHamburger = document.querySelector('.menu-hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    // Verificar se já existe um overlay, se não, criar um
    let menuOverlay = document.querySelector('.menu-overlay');
    if (!menuOverlay) {
        menuOverlay = document.createElement('div');
        menuOverlay.className = 'menu-overlay';
        document.body.appendChild(menuOverlay);
    }
    
    // Verificar se já existe um botão de fechar, se não, criar um
    let closeButton = navLinks.querySelector('.close-menu');
    if (!closeButton) {
        closeButton = document.createElement('button');
        closeButton.className = 'close-menu';
        closeButton.innerHTML = '<i class="fas fa-times"></i>';
        navLinks.appendChild(closeButton);
    }
    
    // Verificar se já existe um cabeçalho de menu, se não, criar um
    let menuHeader = navLinks.querySelector('.mobile-menu-header');
    if (!menuHeader) {
        menuHeader = document.createElement('div');
        menuHeader.className = 'mobile-menu-header';
        menuHeader.textContent = 'Menu';
        navLinks.appendChild(menuHeader);
    }
    
    // Adicionar índices aos itens do menu para animação
    const navItems = navLinks.querySelectorAll('ul li');
    navItems.forEach((item, index) => {
        item.style.setProperty('--i', index);
    });
    
    // Função para abrir o menu
    function openMenu() {
        navLinks.classList.add('active');
        menuOverlay.classList.add('active');
        body.classList.add('menu-open');
    }
    
    // Função para fechar o menu
    function closeMenu() {
        navLinks.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
    }
    
    // Event listeners
    menuHamburger.addEventListener('click', openMenu);
    closeButton.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('click', closeMenu);
    
    // Fechar menu ao redimensionar a janela para desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Fechar menu ao clicar em um link (para navegação na mesma página)
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });
}

// Função para mudar o estilo da navbar ao rolar
function initScrollNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Função para rolagem suave até as seções
function initScrollToSection() {
    const navLinks = document.querySelectorAll('.nav-links ul li a');
    const scrollDownBtn = document.querySelector('.scroll-down');
    
    // Função para rolagem suave
    function scrollToSection(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#') && targetId.length > 1) {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop;
                
                window.scrollTo({
                    top: offsetTop - 70, // Ajuste para a altura da navbar
                    behavior: 'smooth'
                });
            }
        }
    }
    
    // Adicionar evento aos links de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', scrollToSection);
    });
    
    // Botão de scroll down na seção hero
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function() {
            const aboutSection = document.querySelector('#sobre');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Função para o slider de certificados
function initCertificadosSlider() {
    const sliderTrack = document.querySelector('.slider-track');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const certificados = document.querySelectorAll('.certificado-card');
    
    if (!sliderTrack || certificados.length === 0) return;
    
    let currentIndex = 0;
    const cardWidth = 330; // Largura do card + gap
    const visibleCards = Math.floor(sliderTrack.clientWidth / cardWidth);
    const maxIndex = certificados.length - visibleCards;
    
    // Atualizar estado das setas
    function updateArrowState() {
        prevArrow.classList.toggle('disabled', currentIndex === 0);
        nextArrow.classList.toggle('disabled', currentIndex >= maxIndex);
    }
    
    // Mover o slider
    function moveSlider() {
        const translateX = -currentIndex * cardWidth;
        sliderTrack.style.transform = `translateX(${translateX}px)`;
        updateArrowState();
    }
    
    // Event listeners para as setas
    prevArrow.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            moveSlider();
        }
    });
    
    nextArrow.addEventListener('click', function() {
        if (currentIndex < maxIndex) {
            currentIndex++;
            moveSlider();
        }
    });
    
    // Inicializar estado das setas
    updateArrowState();
    
    // Ajustar slider ao redimensionar a janela
    window.addEventListener('resize', function() {
        const newVisibleCards = Math.floor(sliderTrack.clientWidth / cardWidth);
        const newMaxIndex = certificados.length - newVisibleCards;
        
        if (currentIndex > newMaxIndex) {
            currentIndex = Math.max(0, newMaxIndex);
            moveSlider();
        }
    });
}

// Função para validação do formulário de contato
function initFormValidation() {
    const contactForm = document.querySelector('#contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validar nome
        const nameInput = contactForm.querySelector('input[name="name"]');
        if (!nameInput.value.trim()) {
            markInvalid(nameInput, 'Por favor, digite seu nome');
            isValid = false;
        } else {
            markValid(nameInput);
        }
        
        // Validar email
        const emailInput = contactForm.querySelector('input[name="email"]');
        if (!isValidEmail(emailInput.value)) {
            markInvalid(emailInput, 'Por favor, digite um email válido');
            isValid = false;
        } else {
            markValid(emailInput);
        }
        
        // Validar mensagem
        const messageInput = contactForm.querySelector('textarea[name="message"]');
        if (!messageInput.value.trim()) {
            markInvalid(messageInput, 'Por favor, digite sua mensagem');
            isValid = false;
        } else {
            markValid(messageInput);
        }
        
        // Se tudo estiver válido, enviar o formulário
        if (isValid) {
            // Aqui você adicionaria o código para enviar o formulário
            alert('Mensagem enviada com sucesso!');
            contactForm.reset();
        }
    });
    
    // Função para marcar campo como inválido
    function markInvalid(input, message) {
        input.classList.add('invalid');
        
        // Verificar se já existe uma mensagem de erro
        let errorMessage = input.nextElementSibling;
        if (!errorMessage || !errorMessage.classList.contains('error-message')) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            input.parentNode.insertBefore(errorMessage, input.nextSibling);
        }
        
        errorMessage.textContent = message;
    }
    
    // Função para marcar campo como válido
    function markValid(input) {
        input.classList.remove('invalid');
        
        // Remover mensagem de erro se existir
        const errorMessage = input.nextElementSibling;
        if (errorMessage && errorMessage.classList.contains('error-message')) {
            errorMessage.remove();
        }
    }
    
    // Função para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Limpar validação ao digitar
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            markValid(this);
        });
    });
}

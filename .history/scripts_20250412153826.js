// Inicializar AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease',
            once: true,
            offset: 100
        });
        console.log('DOM carregado, AOS inicializado');
    } else {
        console.warn('AOS não está definido. Verifique se a biblioteca foi carregada.');
    }
    
    // Inicializar todas as funcionalidades do site
    initTypeEffect();
    initNavbarScroll();
    initMobileMenu();
    initCertificadosSlider();
    initContactForm();
    initImageErrorHandling();
    initParallaxEffect();
    initProjectCardEffects();
});

// Efeito de digitação para o texto animado
function initTypeEffect() {
    const textArray = ["Desenvolvedor Front-End", "Estudante de TI", "Entusiasta de Cloud Computing", "Apaixonado por Tecnologia"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;

    function typeEffect() {
        const textElement = document.getElementById('text-animation');
        
        if (!textElement) return; // Verificação de segurança
        
        const currentText = textArray[textIndex];
        
        if (isDeleting) {
            // Deletando texto
            textElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50;
        } else {
            // Digitando texto
            textElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 100;
        }
        
        // Se terminou de digitar o texto atual
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingDelay = 1000; // Pausa antes de começar a deletar
        }
        
        // Se terminou de deletar o texto atual
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length; // Próximo texto
            typingDelay = 500; // Pausa antes de começar a digitar
        }
        
        setTimeout(typeEffect, typingDelay);
    }
    
    // Iniciar o efeito de digitação
    typeEffect();
}

// Efeito de navbar ao rolar
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    // Verificar posição inicial da página
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }
    
    // Adicionar listener de scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Menu hamburger para dispositivos móveis - APRIMORADO
function initMobileMenu() {
    // Selecionar elementos
    const menuHamburger = document.querySelector('.menu-hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (!menuHamburger || !navLinks) {
        console.warn('Elementos do menu mobile não encontrados');
        return;
    }
    
    // Criar overlay para fechar o menu ao clicar fora
    let overlay = document.querySelector('.menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.classList.add('menu-overlay');
        body.appendChild(overlay);
    }
    
    // Adicionar cabeçalho ao menu mobile
    let mobileHeader = navLinks.querySelector('.mobile-menu-header');
    if (!mobileHeader) {
        mobileHeader = document.createElement('div');
        mobileHeader.classList.add('mobile-menu-header');
        mobileHeader.textContent = 'Menu';
        navLinks.prepend(mobileHeader);
    }
    
    // Adicionar botão de fechar
    let closeButton = navLinks.querySelector('.close-menu');
    if (!closeButton) {
        closeButton = document.createElement('button');
        closeButton.classList.add('close-menu');
        closeButton.innerHTML = '<i class="fas fa-times"></i>';
        closeButton.setAttribute('aria-label', 'Fechar menu');
        navLinks.prepend(closeButton);
    }
    
    // Adicionar índices para animação sequencial dos itens do menu
    const menuItems = navLinks.querySelectorAll('ul li');
    menuItems.forEach((item, index) => {
        item.style.setProperty('--i', index);
    });
    
    // Função para alternar o menu
    function toggleMenu(event) {
        if (event) {
            event.stopPropagation(); // Impedir propagação do evento
        }
        
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        // Atualizar o atributo aria-expanded para acessibilidade
        const isExpanded = navLinks.classList.contains('active');
        menuHamburger.setAttribute('aria-expanded', isExpanded);
        
        // Alternar ícone do menu
        const icon = menuHamburger.querySelector('i');
        if (icon) {
            icon.className = isExpanded ? 'fas fa-times' : 'fas fa-bars';
        }
    }
    
    // Adicionar evento de clique ao menu hamburger
    menuHamburger.addEventListener('click', toggleMenu);
    
    // Adicionar evento ao botão de fechar
    closeButton.addEventListener('click', toggleMenu);
    
    // Fechar menu ao clicar no overlay
    overlay.addEventListener('click', function() {
        if (navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Fechar menu ao clicar em um link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Fechar menu ao pressionar ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
}

// Slider para certificados - APRIMORADO
function initCertificadosSlider() {
    const sliderTrack = document.querySelector('.slider-track');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const certificadoCards = document.querySelectorAll('.certificado-card');

    if (!sliderTrack || !certificadoCards.length) return;

    let currentIndex = 0;
    const cardWidth = 330; // 300px card width + 30px gap
    let visibleCards = 3;
    let maxIndex = Math.max(0, certificadoCards.length - visibleCards);
    let touchStartX = 0;
    let touchEndX = 0;

    // Função para atualizar o número de cards visíveis baseado no tamanho da tela
    function updateVisibleCards() {
        if (window.innerWidth < 768) {
            visibleCards = 1;
        } else if (window.innerWidth < 992) {
            visibleCards = 2;
        } else {
            visibleCards = 3;
        }
        
        maxIndex = Math.max(0, certificadoCards.length - visibleCards);
        
        // Ajustar o índice atual se necessário
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }
        
        updateSliderPosition();
    }

    function updateSliderPosition() {
        sliderTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        // Atualizar estado dos botões
        if (prevArrow && nextArrow) {
            prevArrow.classList.toggle('disabled', currentIndex === 0);
            nextArrow.classList.toggle('disabled', currentIndex >= maxIndex);
        }
    }

    // Adicionar event listeners para os botões do slider
    if (prevArrow) {
        prevArrow.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSliderPosition();
            }
        });
    }

    if (nextArrow) {
        nextArrow.addEventListener('click', () => {
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSliderPosition();
            }
        });
    }
    
    // Adicionar suporte a gestos de toque para o slider
    sliderTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    sliderTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50; // Mínimo de pixels para considerar um swipe
        const swipeDistance = touchStartX - touchEndX;
        
        if (Math.abs(swipeDistance) < swipeThreshold) return;
        
        if (swipeDistance > 0) {
            // Swipe para a esquerda - próximo slide
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSliderPosition();
            }
        } else {
            // Swipe para a direita - slide anterior
            if (currentIndex > 0) {
                currentIndex--;
                updateSliderPosition();
            }
        }
    }
    
    // Inicializar o slider
    updateVisibleCards();
    
    // Adicionar evento de redimensionamento para o slider
    window.addEventListener('resize', updateVisibleCards);
}

// Formulário de contato - APRIMORADO
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    // Adicionar validação em tempo real
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
        // Validar ao perder o foco
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        // Validar enquanto digita (com debounce)
        let timeout = null;
        input.addEventListener('input', function() {
            clearTimeout(timeout);
            timeout = setTimeout(() => validateInput(this), 500);
        });
    });
    
    function validateInput(input) {
        const parent = input.parentElement;
        const errorElement = parent.querySelector('.error-message') || document.createElement('span');
        
        if (!errorElement.classList.contains('error-message')) {
            errorElement.classList.add('error-message');
            errorElement.style.color = '#e74c3c';
            errorElement.style.fontSize = '0.8rem';
            errorElement.style.marginTop = '5px';
            parent.appendChild(errorElement);
        }
        
        // Validação básica
        if (input.hasAttribute('required') && !input.value.trim()) {
            errorElement.textContent = 'Este campo é obrigatório';
            input.classList.add('invalid');
            return false;
        }
        
        // Validação de email
        if (input.type === 'email' && input.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                errorElement.textContent = 'Por favor, insira um email válido';
                input.classList.add('invalid');
                return false;
            }
        }
        
        // Se passou na validação
        errorElement.textContent = '';
        input.classList.remove('invalid');
        return true;
    }
    
    // Manipular envio do formulário
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar todos os campos antes de enviar
        let isValid = true;
        formInputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) return;
        
        // Simulação de envio (aqui você adicionaria sua lógica de envio real)
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        
        // Simular envio com um timeout
        setTimeout(() => {
            alert('Mensagem enviada com sucesso!');
            contactForm.reset();
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }, 1500);
    });
}

// Tratamento de erros de imagem
function initImageErrorHandling() {
    // Verificar imagem de perfil
    const profileImg = document.getElementById('profile-img');
    if (profileImg) {
        profileImg.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/300x300?text=Foto+de+Perfil';
        });
    }
    
    // Verificar todas as imagens e substituir por placeholders se necessário
    document.querySelectorAll('img').forEach(img => {
        if (img.complete && img.naturalHeight === 0) {
            handleImageError(img);
        }
        
        img.addEventListener('error', function() {
            handleImageError(this);
        });
    });
    
    function handleImageError(img) {
        if (!img.src.includes('placeholder')) {
            const width = img.getAttribute('width') || img.width || 300;
            const height = img.getAttribute('height') || img.height || 300;
            img.src = `https://via.placeholder.com/${width}x${height}?text=Imagem+não+encontrada`;
        }
    }
}

// Efeito de parallax
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        if (scrollPosition < window.innerHeight) {
            hero.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
        }
    });
}

// Efeitos para cards de projeto
function initProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Usar CSS para os efeitos principais, mas adicionar efeitos extras com JS
        card.addEventListener('mouseenter', function() {
            const image = this.querySelector('.project-image img');
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const image = this.querySelector('.project-image img');
            if (image) {
                image.style.transform = '';
            }
        });
    });
}

// Inicializar AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });
    
    // Log para depuração
    console.log('DOM carregado, AOS inicializado');
});

// Efeito de digitação para o texto animado
const textArray = ["Desenvolvedor Front-End", "Estudante de TI", "Entusiasta de Cloud Computing", "Apaixonado por Tecnologia"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeEffect() {
    const currentText = textArray[textIndex];
    const textElement = document.getElementById('text-animation');
    
    if (!textElement) return; // Verificação de segurança
    
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

// Efeito de navbar ao rolar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Menu hamburger para dispositivos móveis - CORRIGIDO
document.addEventListener('DOMContentLoaded', function() {
    // Selecionar elementos
    const menuHamburger = document.querySelector('.menu-hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    console.log('Menu hamburger encontrado:', menuHamburger);
    console.log('Nav links encontrado:', navLinks);
    
    // Criar overlay para fechar o menu ao clicar fora
    let overlay = document.querySelector('.menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.classList.add('menu-overlay');
        body.appendChild(overlay);
        console.log('Overlay criado');
    }
    
    // Função para alternar o menu
    function toggleMenu(event) {
        if (event) {
            event.stopPropagation(); // Impedir propagação do evento
        }
        
        console.log('Alternando menu');
        navLinks.classList.toggle('active');
        menuHamburger.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        // Atualizar o atributo aria-expanded para acessibilidade
        const isExpanded = menuHamburger.classList.contains('active');
        menuHamburger.setAttribute('aria-expanded', isExpanded);
        
        // Alternar ícone do menu
        const icon = menuHamburger.querySelector('i');
        if (icon) {
            if (navLinks.classList.contains('active')) {
                icon.className = 'fas fa-times'; // Substituir todas as classes
            } else {
                icon.className = 'fas fa-bars'; // Substituir todas as classes
            }
        }
        
        console.log('Menu está ativo:', navLinks.classList.contains('active'));
    }
    
    // Adicionar evento de clique ao menu hamburger
    if (menuHamburger) {
        menuHamburger.addEventListener('click', toggleMenu);
    }
    
    // Fechar menu ao clicar no overlay
    overlay.addEventListener('click', function() {
        console.log('Overlay clicado');
        if (navLinks && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            console.log('Link do menu clicado');
            if (navLinks && navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Iniciar o efeito de digitação
    typeEffect();
});

// Slider para certificados
document.addEventListener('DOMContentLoaded', function() {
    const sliderTrack = document.querySelector('.slider-track');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const certificadoCards = document.querySelectorAll('.certificado-card');

    let currentIndex = 0;
    const cardWidth = 330; // 300px card width + 30px gap
    let visibleCards = 3;
    let maxIndex = certificadoCards.length ? Math.max(0, certificadoCards.length - visibleCards) : 0;

    // Função para atualizar o número de cards visíveis baseado no tamanho da tela
    function updateVisibleCards() {
        if (!sliderTrack) return;
        
        if (window.innerWidth < 768) {
            visibleCards = 1;
        } else if (window.innerWidth < 992) {
            visibleCards = 2;
        } else {
            visibleCards = 3;
        }
        
        if (certificadoCards.length) {
            maxIndex = Math.max(0, certificadoCards.length - visibleCards);
        }
        
        // Ajustar o índice atual se necessário
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }
        
        updateSliderPosition();
    }

    function updateSliderPosition() {
        if (!sliderTrack) return;
        
        sliderTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        // Atualizar estado dos botões
        if (prevArrow && nextArrow) {
            if (currentIndex === 0) {
                prevArrow.classList.add('disabled');
            } else {
                prevArrow.classList.remove('disabled');
            }
            
            if (currentIndex >= maxIndex) {
                nextArrow.classList.add('disabled');
            } else {
                nextArrow.classList.remove('disabled');
            }
        }
    }

    // Adicionar event listeners para os botões do slider
    if (prevArrow && nextArrow) {
        prevArrow.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSliderPosition();
            }
        });

        nextArrow.addEventListener('click', () => {
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSliderPosition();
            }
        });
    }
    
    // Inicializar o slider
    if (sliderTrack) {
        updateVisibleCards();
        
        // Adicionar evento de redimensionamento para o slider
        window.addEventListener('resize', updateVisibleCards);
    }
});

// Formulário de contato
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Aqui você pode adicionar a lógica para enviar o formulário via AJAX
            alert('Mensagem enviada com sucesso!');
            contactForm.reset();
        });
    }
});

// Verificar imagem de perfil
document.addEventListener('DOMContentLoaded', function() {
    const profileImg = document.getElementById('profile-img');
    if (profileImg) {
        profileImg.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/300x300';
        });
    }
    
    // Verificar todas as imagens e substituir por placeholders se necessário
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            if (!this.src.includes('placeholder')) {
                this.src = 'https://via.placeholder.com/' + 
                    (this.width || 300) + 'x' + 
                    (this.height || 300) + 
                    '?text=Imagem+não+encontrada';
            }
        });
    });
    
    // Adicionar efeito de parallax suave na seção hero
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        }
    });
    
    // Adicionar efeito de hover nos cards de projeto
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
            this.style.boxShadow = 'var(--shadow-hover)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
});

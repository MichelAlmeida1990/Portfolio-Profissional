// Efeito de digitação para o texto animado
const textArray = ["Desenvolvedor Front-End", "Estudante de Ciência de Dados", "Entusiasta de Cloud Computing", "Apaixonado por Tecnologia"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeEffect() {
    const currentText = textArray[textIndex];
    const textElement = document.getElementById('text-animation');
    
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
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Menu hamburger para dispositivos móveis
const menuHamburger = document.querySelector('.menu-hamburger');
const navLinks = document.querySelector('.nav-links');

menuHamburger.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    
    // Alternar ícone do menu
    const icon = menuHamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuHamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Slider para certificações
const sliderTrack = document.querySelector('.slider-track');
const prevArrow = document.querySelector('.prev-arrow');
const nextArrow = document.querySelector('.next-arrow');
const certificadoCards = document.querySelectorAll('.certificado-card');

let currentIndex = 0;
const cardWidth = 330; // 300px card width + 30px gap
let visibleCards = 3;
let maxIndex = Math.max(0, certificadoCards.length - visibleCards);

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

// Formulário de contato
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Aqui você pode adicionar a lógica para enviar o formulário via AJAX
        alert('Mensagem enviada com sucesso!');
        contactForm.reset();
    });
}

// Inicializar funções quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    typeEffect();
    
    // Inicializar o slider de certificações
    if (sliderTrack) {
        updateVisibleCards();
    }
    
    // Adicionar evento de redimensionamento para o slider
    window.addEventListener('resize', updateVisibleCards);
});

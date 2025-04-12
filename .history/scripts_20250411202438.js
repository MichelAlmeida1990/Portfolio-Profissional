// Efeito de digitação para o texto animado
const textArray = ["Desenvolvedor Front-End", "Especialista em CRM", "Gestor de Equipes", "Estudante de Ciência de Dados"];
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

// Animação das barras de progresso
function animateSkills() {
    const skillsSection = document.querySelector('#habilidades');
    const progressBars = document.querySelectorAll('.progress');
    
    const sectionPosition = skillsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (sectionPosition < screenPosition) {
        progressBars.forEach(progress => {
            progress.style.width = progress.getAttribute('data-value');
        });
    }
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
    
    // Verificar posição inicial para animar skills
    animateSkills();
    
    // Adicionar evento de scroll para animar skills
    window.addEventListener('scroll', animateSkills);
});

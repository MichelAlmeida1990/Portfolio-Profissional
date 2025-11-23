// Carrossel 3D Ousado - Baseado no design Supahfunk
let progress = 50;
let startX = 0;
let active = 0;
let isDown = false;

// Constantes
const speedWheel = 0.02;
const speedDrag = -0.1;

// Projetos selecionados (mais importantes: com demo e mais difíceis)
const projects = [
    {
        id: 1,
        title: "App de Academia",
        num: "01",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        demo: "https://michelalmeida1990.github.io/App-de-academia/",
        code: "https://github.com/MichelAlmeida1990/App-de-academia",
        description: "Aplicação React completa com Firebase, Material-UI e Chart.js"
    },
    {
        id: 2,
        title: "Sistema de Gestão Escolar",
        num: "02",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        demo: "https://Michel1990.pythonanywhere.com",
        code: "https://github.com/MichelAlmeida1990/gestao_escolar",
        description: "Sistema full-stack Python/Django com PostgreSQL"
    },
    {
        id: 3,
        title: "Almeida Editor",
        num: "03",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        demo: null,
        code: "https://github.com/MichelAlmeida1990/Almeida-Editor-Pr-",
        description: "Suite Word + PDF com Next.js 16, Tiptap e react-pdf"
    },
    {
        id: 4,
        title: "E-commerce Top",
        num: "04",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        demo: null,
        code: "https://github.com/MichelAlmeida1990/Ecommerce",
        description: "Plataforma Next.js 14 com TypeScript e Tailwind CSS"
    },
    {
        id: 5,
        title: "DiaristLink",
        num: "05",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        demo: null,
        code: "https://github.com/MichelAlmeida1990/DiaristLink-2",
        description: "Sistema TypeScript com geolocalização e matching"
    },
    {
        id: 6,
        title: "Barbearia do Di",
        num: "06",
        image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        demo: "https://barbearia-do-di.vercel.app",
        code: "https://github.com/MichelAlmeida1990/barbearia-do-di",
        description: "Site responsivo com sistema de agendamento"
    },
    {
        id: 7,
        title: "Santo Drink",
        num: "07",
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        demo: "https://michelalmeida1990.github.io/SITE-DE-BEBIDAS-DO-SANTO/",
        code: "https://github.com/MichelAlmeida1990/SITE-DE-BEBIDAS-DO-SANTO",
        description: "E-commerce de bebidas com carrinho de compras"
    },
    {
        id: 8,
        title: "Psicóloga Lígia",
        num: "08",
        image: "./image/Psicologa.png",
        demo: "https://michelalmeida1990.github.io/Projeto-Psicologa/",
        code: "https://github.com/MichelAlmeida1990/Projeto-Psicologa",
        description: "Site profissional com agendamento e Google Meet"
    },
    {
        id: 9,
        title: "Imobiliária",
        num: "09",
        image: "./image/imobiliaria.png",
        demo: "https://projeto-imobiliaria-five.vercel.app",
        code: "https://github.com/MichelAlmeida1990/projeto-imobiliaria",
        description: "Catálogo de imóveis com filtros avançados"
    },
    {
        id: 10,
        title: "Fotógrafa Cristiane",
        num: "10",
        image: "./image/fotografo.png",
        demo: "https://michelalmeida1990.github.io/Projeto-Fotografo/",
        code: "https://github.com/MichelAlmeida1990/Projeto-Fotografo",
        description: "Portfólio com agendamento online e galeria"
    }
];

// Função para obter z-index
const getZindex = (array, index) => {
    return array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i));
};

// Renderizar carrossel
function renderCarousel() {
    const carousel = document.getElementById('projects-carousel');
    if (!carousel) return;
    
    carousel.innerHTML = projects.map((project, index) => `
        <div class="carousel-item" data-index="${index}">
            <div class="carousel-box">
                <div class="title">${project.title}</div>
                <div class="num">${project.num}</div>
                <img src="${project.image}" 
                     alt="${project.title}"
                     loading="lazy"
                     decoding="async"
                     onerror="this.src='https://via.placeholder.com/600x400?text=${encodeURIComponent(project.title)}'">
                <div class="carousel-overlay">
                    <p class="carousel-description">${project.description}</p>
                    <div class="carousel-actions">
                        ${project.demo ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="carousel-btn demo-btn">Ver Demo</a>` : ''}
                        <a href="${project.code}" target="_blank" rel="noopener noreferrer" class="carousel-btn code-btn">Ver Código</a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    // Inicializar após renderizar
    initCarousel();
}

// Exibir itens
function displayItems(item, index, active) {
    const zIndex = getZindex([...document.querySelectorAll('.carousel-item')], active)[index];
    item.style.setProperty('--zIndex', zIndex);
    item.style.setProperty('--active', (index - active) / projects.length);
}

// Animar carrossel
function animate() {
    progress = Math.max(0, Math.min(progress, 100));
    active = Math.floor(progress / 100 * (projects.length - 1));
    
    document.querySelectorAll('.carousel-item').forEach((item, index) => {
        displayItems(item, index, active);
    });
}

// Handlers
function handleWheel(e) {
    const wheelProgress = e.deltaY * speedWheel;
    progress = progress + wheelProgress;
    animate();
}

function handleMouseMove(e) {
    const $cursors = document.querySelectorAll('.cursor');
    
    if (e.type === 'mousemove') {
        $cursors.forEach(($cursor) => {
            $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });
    }
    
    if (!isDown) return;
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const mouseProgress = (x - startX) * speedDrag;
    progress = progress + mouseProgress;
    startX = x;
    animate();
}

function handleMouseDown(e) {
    isDown = true;
    startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
}

function handleMouseUp() {
    isDown = false;
}

// Inicializar carrossel
function initCarousel() {
    const $items = document.querySelectorAll('.carousel-item');
    
    // Click nos itens
    $items.forEach((item, i) => {
        item.addEventListener('click', () => {
            progress = (i / projects.length) * 100 + 10;
            animate();
        });
    });
    
    // Animar inicialmente
    animate();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    renderCarousel();
    
    document.addEventListener('wheel', handleWheel);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchstart', handleMouseDown);
    document.addEventListener('touchmove', handleMouseMove);
    document.addEventListener('touchend', handleMouseUp);
});

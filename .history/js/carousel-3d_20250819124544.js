// Carrossel 3D com GSAP
let xPos = 0;

// Configuração das imagens dos projetos
const projectImages = {
    'academia': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    'escolar': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    'barbearia': 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    'santo-drink': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    'psicologa': './image/Psicologa.png',
    'imobiliaria': './image/imobiliaria.png',
    'fotografo': './image/fotografo.png'
};

// Inicializar carrossel quando o DOM estiver pronto
$(document).ready(function() {
    initCarousel();
});

function initCarousel() {
    // Configurar imagens de fundo
    $('.img').each(function(index) {
        const projectType = $(this).data('project');
        const imageUrl = projectImages[projectType];
        if (imageUrl) {
            $(this).css('backgroundImage', `url(${imageUrl})`);
        }
    });

    // Timeline GSAP
    gsap.timeline()
        .set('.ring', { rotationY: 180, cursor: 'grab' })
        .set('.img', {
            rotateY: (i) => i * -51.43, // 360° / 7 projetos = 51.43°
            transformOrigin: '50% 50% 500px',
            z: -500,
            backgroundPosition: (i) => getBgPos(i),
            backfaceVisibility: 'hidden'
        })
        .from('.img', {
            duration: 1.5,
            y: 200,
            opacity: 0,
            stagger: 0.1,
            ease: 'expo'
        })
        .add(() => {
            // Eventos de hover
            $('.img').on('mouseenter', function(e) {
                let current = e.currentTarget;
                gsap.to('.img', {
                    opacity: (i, t) => (t == current) ? 1 : 0.5,
                    ease: 'power3'
                });
            });

            $('.img').on('mouseleave', function(e) {
                gsap.to('.img', {
                    opacity: 1,
                    ease: 'power2.inOut'
                });
            });

            // Eventos de clique para abrir links
            $('.img').on('click', function(e) {
                const projectType = $(this).data('project');
                const demoLink = getProjectLink(projectType, 'demo');
                if (demoLink) {
                    window.open(demoLink, '_blank');
                }
            });
        }, '-=0.5');

    // Eventos de drag
    $(window).on('mousedown touchstart', dragStart);
    $(window).on('mouseup touchend', dragEnd);
}

function dragStart(e) {
    if (e.touches) e.clientX = e.touches[0].clientX;
    xPos = Math.round(e.clientX);
    gsap.set('.ring', { cursor: 'grabbing' });
    $(window).on('mousemove touchmove', drag);
}

function drag(e) {
    if (e.touches) e.clientX = e.touches[0].clientX;

    gsap.to('.ring', {
        rotationY: '-=' + ((Math.round(e.clientX) - xPos) % 360),
        onUpdate: () => {
            gsap.set('.img', { backgroundPosition: (i) => getBgPos(i) });
        }
    });

    xPos = Math.round(e.clientX);
}

function dragEnd(e) {
    $(window).off('mousemove touchmove', drag);
    gsap.set('.ring', { cursor: 'grab' });
}

function getBgPos(i) {
    return (100 - gsap.utils.wrap(0, 360, gsap.getProperty('.ring', 'rotationY') - 180 - i * 51.43) / 360 * 500) + 'px 0px';
}

function getProjectLink(projectType, linkType) {
    const links = {
        'academia': {
            demo: 'https://michelalmeida1990.github.io/App-de-academia/',
            code: 'https://github.com/MichelAlmeida1990/App-de-academia'
        },
        'escolar': {
            demo: 'https://Michel1990.pythonanywhere.com',
            code: 'https://github.com/MichelAlmeida1990/gestao_escolar'
        },
        'barbearia': {
            demo: 'https://barbearia-do-di.vercel.app',
            code: 'https://github.com/MichelAlmeida1990/barbearia-do-di'
        },
        'santo-drink': {
            demo: 'https://michelalmeida1990.github.io/SITE-DE-BEBIDAS-DO-SANTO/',
            code: 'https://github.com/MichelAlmeida1990/SITE-DE-BEBIDAS-DO-SANTO'
        },
        'psicologa': {
            demo: 'https://michelalmeida1990.github.io/Projeto-Psicologa/',
            code: 'https://github.com/MichelAlmeida1990/Projeto-Psicologa'
        },
        'imobiliaria': {
            demo: 'https://projeto-imobiliaria-five.vercel.app',
            code: 'https://github.com/MichelAlmeida1990/projeto-imobiliaria'
        },
        'fotografo': {
            demo: 'https://michelalmeida1990.github.io/Projeto-Fotografo/',
            code: 'https://github.com/MichelAlmeida1990/Projeto-Fotografo'
        }
    };

    return links[projectType] ? links[projectType][linkType] : null;
}

// Prevenir comportamento padrão de arrastar imagens
document.addEventListener('dragstart', function(e) {
    e.preventDefault();
});

// Adicionar navegação por teclado
$(document).on('keydown', function(e) {
    const currentRotation = gsap.getProperty('.ring', 'rotationY');
    
    if (e.key === 'ArrowLeft') {
        gsap.to('.ring', {
            rotationY: currentRotation - 51.43,
            duration: 0.5,
            ease: 'power2.out',
            onUpdate: () => {
                gsap.set('.img', { backgroundPosition: (i) => getBgPos(i) });
            }
        });
    } else if (e.key === 'ArrowRight') {
        gsap.to('.ring', {
            rotationY: currentRotation + 51.43,
            duration: 0.5,
            ease: 'power2.out',
            onUpdate: () => {
                gsap.set('.img', { backgroundPosition: (i) => getBgPos(i) });
            }
        });
    }
}); 
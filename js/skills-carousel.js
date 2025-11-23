// Carrossel de Projetos - Baseado no design fornecido
const skills = [
    { 
        name: "App de Academia", 
        level: "React + Firebase",
        description: "Aplicação React completa e profissional para gestão de academias. Sistema robusto com autenticação Firebase, dashboard interativo, gerenciamento de perfis, catálogo de exercícios, estatísticas avançadas com gráficos e interface moderna com Material-UI.",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        demo: "https://michelalmeida1990.github.io/App-de-academia/",
        code: "https://github.com/MichelAlmeida1990/App-de-academia"
    },
    { 
        name: "Sistema de Gestão Escolar", 
        level: "Django + PostgreSQL",
        description: "Sistema completo full-stack para gestão acadêmica e administrativa de escolas. Inclui módulos de alunos, professores, turmas, notas, frequência, biblioteca, financeiro e comunicados.",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        demo: "https://Michel1990.pythonanywhere.com",
        code: "https://github.com/MichelAlmeida1990/gestao_escolar"
    },
    { 
        name: "Almeida Editor", 
        level: "Next.js 16 + TypeScript",
        description: "Suite web 'Word + PDF' construída com Next.js 16, Tiptap e react-pdf. Ribbon ao estilo Word, salvamento offline (IndexedDB), visualizador/annotador de PDFs, integração com shadcn/ui e base preparada para colaboração em tempo real.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        demo: null,
        code: "https://github.com/MichelAlmeida1990/Almeida-Editor-Pr-"
    },
    { 
        name: "E-commerce Top", 
        level: "Next.js 14 + TypeScript",
        description: "Plataforma de vendas online moderna e responsiva, desenvolvida com Next.js 14, TypeScript e Tailwind CSS. O projeto oferece uma experiência de compra excepcional com design elegante e funcionalidades completas de e-commerce.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        demo: null,
        code: "https://github.com/MichelAlmeida1990/Ecommerce"
    },
    { 
        name: "DiaristLink", 
        level: "TypeScript + Geolocalização",
        description: "Projeto real para encontrar uma Diarista disponível e mais próximo de sua residência. Sistema completo de busca e agendamento desenvolvido em TypeScript com funcionalidades de geolocalização e matching.",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        demo: null,
        code: "https://github.com/MichelAlmeida1990/DiaristLink-2"
    },
    { 
        name: "Barbearia do Di", 
        level: "HTML + CSS + JS",
        description: "Site responsivo para barbearia com sistema de agendamento e galeria de serviços. Design moderno e funcional para estabelecimentos de beleza.",
        image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        demo: "https://barbearia-do-di.vercel.app",
        code: "https://github.com/MichelAlmeida1990/barbearia-do-di"
    },
    { 
        name: "Santo Drink", 
        level: "E-commerce",
        description: "E-commerce de bebidas com catálogo de produtos e sistema de carrinho de compras. Interface intuitiva para vendas online de bebidas.",
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        demo: "https://michelalmeida1990.github.io/SITE-DE-BEBIDAS-DO-SANTO/",
        code: "https://github.com/MichelAlmeida1990/SITE-DE-BEBIDAS-DO-SANTO"
    },
    { 
        name: "Psicóloga Lígia Silva", 
        level: "Site Profissional",
        description: "Site profissional para psicóloga clínica especializada em Terapia Cognitivo-Comportamental (TCC). Inclui informações sobre áreas de atendimento, tratamento, FAQ e formulário de contato.",
        image: "./image/Psicologa.png",
        demo: "https://michelalmeida1990.github.io/Projeto-Psicologa/",
        code: "https://github.com/MichelAlmeida1990/Projeto-Psicologa"
    },
    { 
        name: "Site Imobiliária", 
        level: "Catálogo + Filtros",
        description: "Site profissional para imobiliária com catálogo de imóveis, sistema de busca, filtros avançados e formulário de contato para clientes interessados.",
        image: "./image/imobiliaria.png",
        demo: "https://projeto-imobiliaria-five.vercel.app",
        code: "https://github.com/MichelAlmeida1990/projeto-imobiliaria"
    },
    { 
        name: "Fotógrafa Cristiane Justino", 
        level: "Portfólio + Agendamento",
        description: "Site profissional para fotógrafa com portfólio, sistema de agendamento online, galeria de trabalhos e formulário de contato. Design elegante e responsivo.",
        image: "./image/fotografo.png",
        demo: "https://michelalmeida1990.github.io/Projeto-Fotografo/",
        code: "https://github.com/MichelAlmeida1990/Projeto-Fotografo"
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const skillsCarousel = document.getElementById('skills-carousel');
    if (!skillsCarousel) return;

    const track = skillsCarousel.querySelector('.skills-carousel-track');
    const skillName = document.querySelector('.skill-name');
    const skillLevel = document.querySelector('.skill-level');
    const skillDescription = document.querySelector('.skill-description');
    const upArrows = document.querySelectorAll('.skills-nav-arrow.up');
    const downArrows = document.querySelectorAll('.skills-nav-arrow.down');
    const dots = document.querySelectorAll('.skill-dot');
    
    let currentIndex = 0;
    let isAnimating = false;

    // Criar cards dinamicamente
    function createSkillCards() {
        skills.forEach((skill, index) => {
            const card = document.createElement('div');
            card.className = 'skill-card';
            card.setAttribute('data-index', index);
            
            const img = document.createElement('img');
            img.src = skill.image;
            img.alt = skill.name;
            img.loading = 'lazy';
            
            const content = document.createElement('div');
            content.className = 'skill-card-content';
            const buttonsHtml = skill.demo 
                ? `<a href="${skill.demo}" target="_blank" rel="noopener noreferrer" class="project-link-btn" style="display: inline-block; margin: 5px; padding: 8px 15px; background: rgba(255,255,255,0.2); color: white; text-decoration: none; border-radius: 5px; font-size: 0.85rem;">Demo</a>`
                : '';
            content.innerHTML = `
                <h3 style="margin: 0 0 10px 0; font-size: 1.3rem;">${skill.name}</h3>
                <p style="margin: 0; font-size: 0.9rem; opacity: 0.9; margin-bottom: 10px;">${skill.level}</p>
                ${buttonsHtml}
                <a href="${skill.code}" target="_blank" rel="noopener noreferrer" class="project-link-btn" style="display: inline-block; margin: 5px; padding: 8px 15px; background: rgba(255,255,255,0.2); color: white; text-decoration: none; border-radius: 5px; font-size: 0.85rem;">Código</a>
            `;
            
            card.appendChild(img);
            card.appendChild(content);
            track.appendChild(card);
        });
    }

    createSkillCards();

    const cards = document.querySelectorAll('.skill-card');

    function updateCarousel(newIndex) {
        if (isAnimating) return;
        isAnimating = true;

        currentIndex = (newIndex + cards.length) % cards.length;

        cards.forEach((card, i) => {
            const offset = (i - currentIndex + cards.length) % cards.length;

            card.classList.remove(
                "center",
                "up-1",
                "up-2",
                "down-1",
                "down-2",
                "hidden"
            );

            if (offset === 0) {
                card.classList.add("center");
            } else if (offset === 1) {
                card.classList.add("down-1");
            } else if (offset === 2) {
                card.classList.add("down-2");
            } else if (offset === cards.length - 1) {
                card.classList.add("up-1");
            } else if (offset === cards.length - 2) {
                card.classList.add("up-2");
            } else {
                card.classList.add("hidden");
            }
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });

        // Atualizar informações
        if (skillName) skillName.style.opacity = "0";
        if (skillLevel) skillLevel.style.opacity = "0";
        if (skillDescription) skillDescription.style.opacity = "0";
        
        const projectActions = document.querySelector('.project-actions');
        if (projectActions) projectActions.style.opacity = "0";

        setTimeout(() => {
            const currentSkill = skills[currentIndex];
            
            if (skillName) {
                skillName.textContent = currentSkill.name;
                skillName.style.opacity = "1";
            }
            if (skillLevel) {
                skillLevel.textContent = currentSkill.level;
                skillLevel.style.opacity = "1";
            }
            if (skillDescription) {
                skillDescription.textContent = currentSkill.description;
                skillDescription.style.opacity = "1";
            }
            
            // Atualizar botões de ação
            if (projectActions) {
                const allButtons = projectActions.querySelectorAll('a');
                const demoBtn = Array.from(allButtons).find(btn => btn.textContent.includes('Demo'));
                const codeBtn = Array.from(allButtons).find(btn => btn.textContent.includes('Código'));
                
                if (currentSkill.demo) {
                    if (demoBtn) {
                        demoBtn.href = currentSkill.demo;
                        demoBtn.style.display = "inline-block";
                    } else {
                        const newDemoBtn = document.createElement('a');
                        newDemoBtn.href = currentSkill.demo;
                        newDemoBtn.target = "_blank";
                        newDemoBtn.rel = "noopener noreferrer";
                        newDemoBtn.className = "btn primary-btn";
                        newDemoBtn.style.cssText = "padding: 10px 20px;";
                        newDemoBtn.textContent = "Ver Demo";
                        if (codeBtn) {
                            projectActions.insertBefore(newDemoBtn, codeBtn);
                        } else {
                            projectActions.appendChild(newDemoBtn);
                        }
                    }
                } else {
                    if (demoBtn) demoBtn.style.display = "none";
                }
                
                if (codeBtn) {
                    codeBtn.href = currentSkill.code;
                }
                
                projectActions.style.opacity = "1";
            }
        }, 300);

        setTimeout(() => {
            isAnimating = false;
        }, 800);
    }

    upArrows.forEach(arrow => {
        arrow.addEventListener("click", () => {
            updateCarousel(currentIndex - 1);
        });
    });

    downArrows.forEach(arrow => {
        arrow.addEventListener("click", () => {
            updateCarousel(currentIndex + 1);
        });
    });

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            updateCarousel(i);
        });
    });

    cards.forEach((card, i) => {
        card.addEventListener("click", () => {
            updateCarousel(i);
        });
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowUp") {
            updateCarousel(currentIndex - 1);
        } else if (e.key === "ArrowDown") {
            updateCarousel(currentIndex + 1);
        }
    });

    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenY;
    });

    document.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenY;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                updateCarousel(currentIndex + 1);
            } else {
                updateCarousel(currentIndex - 1);
            }
        }
    }

    updateCarousel(0);
});


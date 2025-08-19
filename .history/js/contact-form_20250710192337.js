// Configuração do EmailJS
(function() {
    // Aguardar o carregamento completo da página
    document.addEventListener('DOMContentLoaded', function() {
        // Inicializar EmailJS
        emailjs.init("X7X7EHK5Gj3tLnnJ5");
        
        // Configurar o formulário de contato
        const contactForm = document.getElementById('contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validar campos
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const subject = document.getElementById('subject').value.trim();
                const message = document.getElementById('message').value.trim();
                
                if (!name || !email || !subject || !message) {
                    showNotification('Por favor, preencha todos os campos.', 'error');
                    return;
                }
                
                // Validar email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    showNotification('Por favor, insira um email válido.', 'error');
                    return;
                }
                
                // Mostrar loading
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                submitBtn.disabled = true;
                
                // Preparar dados para envio
                const templateParams = {
                    from_name: name,
                    from_email: email,
                    subject: subject,
                    message: message,
                    to_email: 'michelpaulo06@hotmail.com'
                };
                
                // Enviar email usando EmailJS
                emailjs.send('service_90p8orl', 'template_contact', templateParams)
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                        showNotification('Mensagem enviada com sucesso!', 'success');
                        contactForm.reset();
                        
                        // Resetar botão
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    })
                    .catch(function(error) {
                        console.error('FAILED...', error);
                        showNotification('Erro ao enviar mensagem. Verifique sua conexão e tente novamente.', 'error');
                        
                        // Resetar botão
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    });
            });
        }
    });
    
    // Função para mostrar notificações
    function showNotification(message, type) {
        // Criar elemento de notificação
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close"><i class="fas fa-times"></i></button>
            </div>
        `;
        
        // Adicionar ao body
        document.body.appendChild(notification);
        
        // Mostrar notificação
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Auto-remover após 5 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
        
        // Botão de fechar
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });
    }
})(); 
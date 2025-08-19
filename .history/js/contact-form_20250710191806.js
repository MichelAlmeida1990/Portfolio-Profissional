// Configuração do EmailJS
(function() {
    // Inicializar EmailJS
    emailjs.init("X7X7EHK5Gj3tLnnJ5"); // Seu User ID do EmailJS
    
    // Configurar o formulário de contato
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Mostrar loading
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            // Capturar dados do formulário
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Enviar email usando EmailJS
            emailjs.send('service_90p8orl', 'YOUR_TEMPLATE_ID', {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
                to_email: 'michelpaulo06@hotmail.com' // Seu email
            })
            .then(function(response) {
                // Sucesso
                showNotification('Mensagem enviada com sucesso!', 'success');
                contactForm.reset();
                
                // Resetar botão
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            })
            .catch(function(error) {
                // Erro
                showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
                
                // Resetar botão
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }
    
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
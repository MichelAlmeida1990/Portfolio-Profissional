# 📧 Configuração do EmailJS para o Formulário de Contato

## 🚀 Como Configurar o Envio de Emails

### 1. Criar Conta no EmailJS
1. Acesse [https://www.emailjs.com/](https://www.emailjs.com/)
2. Clique em "Sign Up" e crie uma conta gratuita
3. Faça login na sua conta

### 2. Configurar Serviço de Email
1. No dashboard do EmailJS, vá em "Email Services"
2. Clique em "Add New Service"
3. Escolha "Gmail" ou "Outlook" (recomendado para Hotmail)
4. Conecte sua conta de email (michelpaulo06@hotmail.com)
5. Anote o **Service ID** gerado

### 3. Criar Template de Email
1. Vá em "Email Templates"
2. Clique em "Create New Template"
3. Use este template:

```html
<h2>Nova Mensagem do Portfólio</h2>

<p><strong>Nome:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Assunto:</strong> {{subject}}</p>

<h3>Mensagem:</h3>
<p>{{message}}</p>

<hr>
<p><em>Enviado através do formulário de contato do seu portfólio.</em></p>
```

4. Salve o template e anote o **Template ID**

### 4. Obter User ID
1. No dashboard, vá em "Account" → "API Keys"
2. Copie seu **Public Key** (User ID)

### 5. Atualizar o Código
Abra o arquivo `js/contact-form.js` e substitua:

```javascript
// Linha 4: Substitua YOUR_USER_ID pelo seu Public Key
emailjs.init("YOUR_USER_ID");

// Linha 35: Substitua YOUR_SERVICE_ID pelo Service ID
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {

// Linha 36: Substitua YOUR_TEMPLATE_ID pelo Template ID
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
```

### 6. Testar o Formulário
1. Abra seu portfólio no navegador
2. Vá para a seção "Entre em Contato"
3. Preencha o formulário e envie
4. Verifique se o email chegou na sua caixa de entrada

## 📋 Exemplo de Configuração Final

```javascript
// Inicializar EmailJS
emailjs.init("user_abc123def456"); // Seu Public Key

// Enviar email
emailjs.send('service_xyz789', 'template_abc123', {
    from_name: formData.name,
    from_email: formData.email,
    subject: formData.subject,
    message: formData.message,
    to_email: 'michelpaulo06@hotmail.com'
});
```

## 🔧 Recursos Incluídos

✅ **Validação de formulário**  
✅ **Loading state** durante envio  
✅ **Notificações de sucesso/erro**  
✅ **Reset automático** do formulário  
✅ **Design responsivo** para mobile  
✅ **Animações suaves**  

## 📱 Funcionalidades

- **Envio em tempo real** para seu email
- **Notificações visuais** de status
- **Proteção contra spam** (rate limiting)
- **Suporte a anexos** (pode ser adicionado)
- **Logs de envio** no dashboard do EmailJS

## 💡 Dicas

1. **Plano Gratuito**: Permite 200 emails/mês
2. **Segurança**: Não exponha suas chaves no código público
3. **Backup**: Salve as configurações em local seguro
4. **Monitoramento**: Acompanhe os envios no dashboard

## 🆘 Suporte

Se tiver problemas:
1. Verifique se as chaves estão corretas
2. Confirme se o serviço de email está ativo
3. Teste com email diferente
4. Consulte a documentação do EmailJS

---

**🎯 Resultado Final**: Seus visitantes poderão enviar mensagens diretamente para seu email através do formulário! 
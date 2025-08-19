# 🔧 Correção do Erro EmailJS

## ❌ Problema Identificado
O erro `400` indica que o template não existe ou há problema na configuração.

## ✅ Soluções

### 1. Template já Configurado ✅
O template `template_pks06ka` já está configurado no EmailJS.

### 2. Conteúdo do Template
Use este HTML no template:

```html
<h2>📧 Nova Mensagem do Portfólio</h2>

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p><strong>👤 Nome:</strong> {{from_name}}</p>
    <p><strong>📧 Email:</strong> {{from_email}}</p>
    <p><strong>📝 Assunto:</strong> {{subject}}</p>
</div>

<h3>💬 Mensagem:</h3>
<div style="background: #ffffff; padding: 15px; border-left: 4px solid #2563eb; margin: 15px 0;">
    <p style="white-space: pre-wrap;">{{message}}</p>
</div>

<hr style="margin: 30px 0; border: 1px solid #e5e7eb;">
<p style="color: #6b7280; font-size: 14px;">
    <em>📱 Enviado através do formulário de contato do seu portfólio.</em>
</p>
```

### 3. Verificar Configuração
Confirme que no EmailJS você tem:
- ✅ **Service ID**: `service_90p8orl`
- ✅ **Template ID**: `template_pks06ka`
- ✅ **User ID**: `X7X7EHK5Gj3tLnnJ5`

### 4. Teste Alternativo
Se ainda não funcionar, tente este template mais simples:

```html
<h2>Nova Mensagem</h2>
<p><strong>Nome:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Assunto:</strong> {{subject}}</p>
<p><strong>Mensagem:</strong> {{message}}</p>
```

## 🔍 Debug

### Verificar no Console
Abra o DevTools (F12) e verifique:
1. Se há erros de JavaScript
2. Se o EmailJS está carregando
3. Se as chaves estão corretas

### Teste Manual
No console do navegador, teste:
```javascript
emailjs.send('service_90p8orl', 'template_pks06ka', {
    from_name: 'Teste',
    from_email: 'teste@teste.com',
    subject: 'Teste',
    message: 'Teste de envio'
});
```

## 🆘 Se ainda não funcionar:

1. **Verifique o Service**: Confirme que o serviço está ativo
2. **Teste outro template**: Crie um template com ID diferente
3. **Verifique limites**: Plano gratuito tem 200 emails/mês
4. **Contate suporte**: EmailJS tem suporte por email

## 📞 Suporte EmailJS
- Email: support@emailjs.com
- Documentação: https://www.emailjs.com/docs/

---

**🎯 Resultado**: Após criar o template, o formulário deve funcionar perfeitamente! 
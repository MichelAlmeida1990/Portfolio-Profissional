/* Estilo para o cursor principal */
.cursor {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.7);
  border: 2px solid #5e8eff;
  pointer-events: none;
  position: fixed;
  transform: translate(-50%, -50%);
  z-index: 9999;
  transition: width 0.2s, height 0.2s, background-color 0.2s;
  box-shadow: 0 0 10px rgba(94, 142, 255, 0.5);
}

/* Estilo para o rastro (simplificado) */
.cursor-trail {
  position: fixed;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #5e8eff;
  pointer-events: none;
  z-index: 9998;
  opacity: 0.6;
  transition: opacity 0.5s ease;
}

/* Efeito quando clicado */
.cursor.active {
  width: 24px;
  height: 24px;
  background-color: rgba(255, 255, 255, 0.9);
  border-color: #c45eff;
}

/* Efeito quando passar sobre elementos clicáveis */
.cursor.hover {
  width: 30px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.2);
  border-color: #5effb8;
}

/* Remover o cursor padrão */
body {
  cursor: none;
}

/* Links e botões não devem mostrar o cursor padrão */
a, button, [role="button"], input[type="submit"], .clickable {
  cursor: none;
}

/* Desativar em dispositivos móveis */
@media (max-width: 768px) {
  .cursor, .cursor-trail {
    display: none;
  }
  
  body, a, button, [role="button"], input[type="submit"], .clickable {
    cursor: auto;
  }
}

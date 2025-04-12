/* Estilo para o cursor principal */
.cursor {
  width: 40px;
  height: 40px;
  background-image: url('../images/cosmic-cursor.png');
  background-size: contain;
  background-repeat: no-repeat;
  pointer-events: none;
  position: fixed;
  transform: translate(-50%, -50%);
  z-index: 9999;
  transition: transform 0.1s ease;
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.7));
}

/* Estilo para o rastro de partículas cósmicas */
.cursor-trail {
  position: fixed;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #5e8eff;
  pointer-events: none;
  z-index: 9998;
  opacity: 0.8;
  box-shadow: 0 0 10px 2px rgba(94, 142, 255, 0.7);
  transition: all 0.3s ease;
}

/* Variação de cores para as partículas */
.cursor-trail:nth-child(3n+1) {
  background-color: #5e8eff; /* Azul */
  box-shadow: 0 0 10px 2px rgba(94, 142, 255, 0.7);
}

.cursor-trail:nth-child(3n+2) {
  background-color: #c45eff; /* Roxo */
  box-shadow: 0 0 10px 2px rgba(196, 94, 255, 0.7);
}

.cursor-trail:nth-child(3n+3) {
  background-color: #5effb8; /* Verde ciano */
  box-shadow: 0 0 10px 2px rgba(94, 255, 184, 0.7);
}

/* Efeito quando clicado */
.cursor.active {
  transform: translate(-50%, -50%) scale(1.2);
  filter: brightness(1.3) drop-shadow(0 0 8px rgba(255, 255, 255, 0.9));
}

/* Efeito quando passar sobre elementos clicáveis */
.cursor.hover {
  transform: translate(-50%, -50%) scale(1.1);
  filter: hue-rotate(30deg) drop-shadow(0 0 8px rgba(255, 255, 255, 0.9));
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

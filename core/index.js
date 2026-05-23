/* =============================================================
   pages/index.js — lógica exclusiva da Landing Page
   Depende de: data.js
============================================================= */

/**
 * Abre/fecha o menu de navegação no mobile.
 * Ativado pelo botão hamburguer (☰) na nav.
 */
function toggleLandNav() {
  const links = document.getElementById('landNavLinks');
  const estaAberto = links.style.display === 'flex';

  if (estaAberto) {
    // Fecha o menu
    links.style.display = 'none';
  } else {
    // Abre o menu em coluna, posicionado abaixo da nav
    Object.assign(links.style, {
      display:         'flex',
      flexDirection:   'column',
      position:        'absolute',
      top:             '70px',
      left:            '0',
      right:           '0',
      background:      'rgba(2,13,31,.97)',
      padding:         '20px 30px',
      gap:             '16px',
      borderBottom:    '1px solid rgba(255,255,255,.08)',
    });
  }
}

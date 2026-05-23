/* =============================================================
   DATASERVICE ERP — utils.js
   Funções utilitárias compartilhadas entre todas as páginas.
   Carregue este arquivo APÓS data.js e shell.js em cada HTML.

   Organização:
     1. Formatação
     2. Tabelas
     3. Badges
     4. Detalhes
     5. Toasts (notificações)
     6. Modais
     7. Sidebar (mobile)
     8. Troca de empresa
============================================================= */


/* ─────────────────────────────────────────────
   1. FORMATAÇÃO
   ───────────────────────────────────────────── */

/**
 * Formata um número como moeda brasileira.
 * Exemplo: fmt(1500) → "R$ 1.500"
 * @param {number} n
 * @returns {string}
 */
function fmt(n) {
  return 'R$ ' + n.toLocaleString('pt-BR');
}


/* ─────────────────────────────────────────────
   2. TABELAS
   ───────────────────────────────────────────── */

/**
 * Renderiza uma tabela HTML dentro de um elemento <table> já existente.
 *
 * @param {string}   id       - ID do elemento <table> no DOM
 * @param {string[]} headers  - Títulos das colunas
 * @param {Array[]}  rows     - Array de arrays; cada item interno é uma célula (pode ser HTML)
 *
 * Exemplo de uso:
 *   renderTable('minha-table',
 *     ['Nome', 'Cargo'],
 *     [['Ana Lima', 'Gerente'], ['Bruno', 'Dev']]
 *   );
 */
function renderTable(id, headers, rows) {
  const table = document.getElementById(id);
  if (!table) return;

  // Monta o cabeçalho
  const thead = '<thead><tr>' +
    headers.map(h => `<th>${h}</th>`).join('') +
    '</tr></thead>';

  // Monta as linhas
  const tbody = '<tbody>' +
    rows.map(row =>
      '<tr>' + row.map(cell => `<td>${cell}</td>`).join('') + '</tr>'
    ).join('') +
    '</tbody>';

  table.innerHTML = thead + tbody;
}


/* ─────────────────────────────────────────────
   3. BADGES — etiquetas de status coloridas
   ───────────────────────────────────────────── */

/**
 * Gera o HTML de um badge colorido de acordo com o texto.
 * Mapeamento de cores:
 *   Aprovado / Concluído → verde
 *   Pendente             → amarelo
 *   Cancelado            → vermelho
 *   Entrada              → azul
 *   Saída                → vermelho
 *   Transferência        → amarelo
 *
 * @param {string} text - Texto exibido no badge
 * @returns {string} HTML do badge
 */
function badge(text) {
  const colorMap = {
    'Aprovado':      'green',
    'Concluído':     'green',
    'Pendente':      'yellow',
    'Cancelado':     'red',
    'Entrada':       'blue',
    'Saída':         'red',
    'Transferência': 'yellow',
  };
  const color = colorMap[text] || 'gray';
  return `<span class="badge badge-${color}">${text}</span>`;
}


/* ─────────────────────────────────────────────
   4. DETALHES — linhas de ficha (label + valor)
   ───────────────────────────────────────────── */

/**
 * Gera o HTML de uma linha de detalhe usada em fichas (empresa, endereço etc.).
 *
 * @param {string} label - Rótulo da linha (ex: "CNPJ")
 * @param {string} value - Valor da linha (ex: "12.345.678/0001-90")
 * @returns {string} HTML da linha
 */
function detailRow(label, value) {
  return `
    <div class="detail-row">
      <span class="detail-label">${label}</span>
      <span class="detail-value">${value}</span>
    </div>`;
}


/* ─────────────────────────────────────────────
   5. TOASTS — notificações temporárias
   ───────────────────────────────────────────── */

/**
 * Exibe uma notificação (toast) no canto inferior direito.
 * O toast desaparece automaticamente após ~3 segundos.
 *
 * @param {string} msg  - Mensagem a exibir
 * @param {string} type - Classe CSS adicional: '' | 'success' | 'error'
 */
function showToast(msg, type = '') {
  const container = document.getElementById('toasts');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.textContent = msg;
  container.appendChild(toast);

  // Remove após a animação terminar (3,2s)
  setTimeout(() => toast.remove(), 3200);
}


/* ─────────────────────────────────────────────
   6. MODAIS
   ───────────────────────────────────────────── */

/**
 * Abre um modal adicionando a classe .open ao overlay.
 * @param {string} id - ID do elemento .modal-overlay
 */
function openModal(id) {
  document.getElementById(id).classList.add('open');
}

/**
 * Fecha um modal removendo a classe .open do overlay.
 * @param {string} id - ID do elemento .modal-overlay
 */
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

/**
 * Fecha o modal quando o usuário clica fora da caixa (no overlay).
 * Use no atributo onclick do .modal-overlay:
 *   onclick="closeModalOutside(event, 'meu-modal')"
 *
 * @param {MouseEvent} event - Evento de clique
 * @param {string}     id    - ID do .modal-overlay
 */
function closeModalOutside(event, id) {
  if (event.target.id === id) closeModal(id);
}

/**
 * Salva (simulado) e fecha o modal, exibindo um toast de sucesso.
 * @param {string} id - ID do .modal-overlay
 */
function saveAndClose(id) {
  closeModal(id);
  showToast('✅ Salvo com sucesso!', 'success');
}


/* ─────────────────────────────────────────────
   7. SIDEBAR (mobile)
   ───────────────────────────────────────────── */

/**
 * Abre/fecha a sidebar em telas pequenas.
 * Ativa/desativa as classes .open na sidebar e no backdrop.
 */
function toggleSidebar() {
  document.getElementById('appSidebar').classList.toggle('open');
  document.getElementById('sidebarBackdrop').classList.toggle('open');
}


/* ─────────────────────────────────────────────
   8. TROCA DE EMPRESA
   ───────────────────────────────────────────── */

/**
 * Persiste o índice da empresa ativa no sessionStorage.
 * Chamada internamente pelo shell ao trocar a empresa.
 * @param {number|string} idx - Índice da empresa no array `companies`
 */
function setCompany(idx) {
  currentCompanyIdx = parseInt(idx);
  sessionStorage.setItem('currentCompany', idx);
}

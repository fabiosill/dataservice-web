/* =============================================================
   pages/movimentacoes.js — lógica exclusiva de Movimentações
   Depende de: data.js, shell.js, utils.js
============================================================= */

renderShell('movimentacoes');

// ── KPIs: contagem por tipo ───────────────────────────────────
document.getElementById('mov-entrada').textContent = movimentacoes.filter(m => m.ds_tipo === 'Entrada').length;
document.getElementById('mov-saida').textContent   = movimentacoes.filter(m => m.ds_tipo === 'Saída').length;
document.getElementById('mov-transf').textContent  = movimentacoes.filter(m => m.ds_tipo === 'Transferência').length;

// ── Popula o select de itens no modal ────────────────────────
document.getElementById('mov-item-sel').innerHTML =
  itens.map(i => `<option value="${i.cd_item}">${i.nm_item}</option>`).join('');

/**
 * Renderiza a tabela de movimentações.
 * @param {Array} lista - Subconjunto de `movimentacoes`
 */
function renderMov(lista) {
  renderTable(
    'mov-table',
    ['#', 'Tipo', 'Item', 'Quantidade', 'Status'],
    lista.map(m => {
      const item = itens.find(i => i.cd_item === m.fk_item) || {};
      return [
        `<span style="font-family:var(--mono);color:var(--gray-400);">${String(m.cd_movimentacao).padStart(3, '0')}</span>`,
        badge(m.ds_tipo),
        `<strong>${item.nm_item || '-'}</strong>`,
        `<span style="font-family:var(--mono);">${m.qt_item} un.</span>`,
        badge(m.ds_status),
      ];
    })
  );
}

/**
 * Filtra movimentações pelo tipo selecionado na aba.
 * Chamada pelo onclick das abas no HTML.
 *
 * @param {string}      tipo - 'Todas' | 'Entrada' | 'Saída' | 'Transferência'
 * @param {HTMLElement} btn  - Botão clicado
 */
function filtrarMov(tipo, btn) {
  document.querySelectorAll('#mov-tabs .tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const lista = tipo === 'Todas'
    ? movimentacoes
    : movimentacoes.filter(m => m.ds_tipo === tipo);

  renderMov(lista);
}

// Exibe todas ao carregar
renderMov(movimentacoes);

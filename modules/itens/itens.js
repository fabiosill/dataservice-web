/* =============================================================
   pages/itens.js — lógica exclusiva de Itens de Estoque
   Depende de: data.js, shell.js, utils.js
============================================================= */

renderShell('itens');

// ── Popula os selects de estoque (filtro + modal) ─────────────
const opcoesEstoque = estoques.map(e => `<option value="${e.cd_estoque}">${e.ds_estoque}</option>`).join('');
document.getElementById('filtro-estoque').innerHTML  += opcoesEstoque;
document.getElementById('item-estoque-sel').innerHTML = opcoesEstoque;

/**
 * Determina o status do item com base na quantidade em estoque.
 * ≤ 5   → Cancelado (crítico / vermelho)
 * ≤ 15  → Pendente  (atenção / amarelo)
 * > 15  → Aprovado  (ok / verde)
 */
function statusEstoque(qtd) {
  if (qtd <= 5)  return 'Cancelado';
  if (qtd <= 15) return 'Pendente';
  return 'Aprovado';
}

/**
 * Renderiza a tabela de itens.
 * @param {Array} lista - Subconjunto de `itens` a exibir
 */
function renderItens(lista) {
  renderTable(
    'itens-table',
    ['#', 'Item', 'Descrição', 'Quantidade', 'Estoque', 'Status'],
    lista.map(i => {
      const armazem = estoques.find(e => e.cd_estoque === i.fk_estoque) || {};
      return [
        `<span style="font-family:var(--mono);color:var(--gray-400);">${String(i.cd_item).padStart(3, '0')}</span>`,
        `<strong>${i.nm_item}</strong>`,
        i.ds_item,
        `<span style="font-weight:600;font-family:var(--mono);">${i.qt_item} un.</span>`,
        armazem.ds_estoque || '-',
        badge(statusEstoque(i.qt_item)),
      ];
    })
  );
}

/**
 * Filtra itens pelo texto digitado na busca.
 * Busca no nome e na descrição do item.
 * Chamada pelo oninput do campo de busca.
 */
function filtrarItens(texto) {
  const q = texto.toLowerCase();
  renderItens(itens.filter(i =>
    i.nm_item.toLowerCase().includes(q) ||
    i.ds_item.toLowerCase().includes(q)
  ));
}

/**
 * Filtra itens pelo estoque selecionado no dropdown.
 * Se valor vazio, exibe todos.
 * Chamada pelo onchange do select de estoque.
 */
function filtrarPorEstoque(valor) {
  renderItens(valor ? itens.filter(i => i.fk_estoque === parseInt(valor)) : itens);
}

// Exibe todos ao carregar
renderItens(itens);

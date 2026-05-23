/* =============================================================
   pages/estoque.js — lógica exclusiva de Estoque (armazéns)
   Depende de: data.js, shell.js, utils.js
============================================================= */

renderShell('estoque');

// Soma todas as quantidades de itens para o KPI
const totalItens = itens.reduce((soma, item) => soma + item.qt_item, 0);
document.getElementById('est-total').textContent = totalItens.toLocaleString();

// Monta a tabela; a coluna "Qtd. Itens" soma apenas os itens daquele armazém
renderTable(
  'estoque-table',
  ['#', 'Estoque', 'Endereço', 'Qtd. Itens', 'Ações'],
  estoques.map(e => {
    // Soma os itens que pertencem a este armazém
    const qtdNoArmazem = itens
      .filter(i => i.fk_estoque === e.cd_estoque)
      .reduce((soma, i) => soma + i.qt_item, 0);

    return [
      `<span style="font-family:var(--mono);color:var(--gray-400);">${String(e.cd_estoque).padStart(3, '0')}</span>`,
      `<strong>${e.ds_estoque}</strong>`,
      e.ds_endereco,
      `<span style="font-family:var(--mono);font-weight:600;">${qtdNoArmazem} un.</span>`,
      `<a href="itens.html" class="action-btn secondary" style="padding:4px 10px;font-size:12px;">Ver Itens</a>`,
    ];
  })
);

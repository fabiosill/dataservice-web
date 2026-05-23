/* =============================================================
   pages/descontos.js — lógica exclusiva de Descontos
   Depende de: data.js, shell.js, utils.js
============================================================= */

renderShell('descontos');

renderTable(
  'descontos-table',
  ['#', 'Código', 'Nome', 'Valor'],
  descontos.map(d => [
    `<span style="font-family:var(--mono);color:var(--gray-400);">${String(d.cd_desconto).padStart(3, '0')}</span>`,
    `<span class="badge badge-gray">${d.ds_desconto}</span>`,
    d.nm_desconto,
    `<strong>${d.vl_desconto}</strong>`,
  ])
);

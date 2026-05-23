/* =============================================================
   pages/ponto.js — lógica exclusiva de Ponto Eletrônico
   Depende de: data.js, shell.js, utils.js
============================================================= */

renderShell('ponto');

// A presença usa os mesmos badges de status:
//   bl_presenca = true  → badge verde  (reaproveitamos 'Aprovado')
//   bl_presenca = false → badge vermelho (reaproveitamos 'Cancelado')
renderTable(
  'ponto-table',
  ['Funcionário', 'Entrada', 'Saída', 'Presença', 'Observação'],
  pontos.map(p => [
    `<strong>${p.nm}</strong>`,
    `<span style="font-family:var(--mono);">${p.qt_horario_entrada}</span>`,
    `<span style="font-family:var(--mono);">${p.qt_horario_saida}</span>`,
    badge(p.bl_presenca ? 'Aprovado' : 'Cancelado'),
    `<span style="color:var(--gray-500);font-size:13px;">${p.ds_observacao}</span>`,
  ])
);

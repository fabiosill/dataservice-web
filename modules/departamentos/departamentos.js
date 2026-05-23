/* =============================================================
   pages/departamentos.js — lógica exclusiva de Departamentos
   Depende de: data.js, shell.js, utils.js
============================================================= */

renderShell('departamentos');

// Renderiza a tabela de departamentos com verba, rendimento e gastos
renderTable(
  'dept-table',
  ['#', 'Departamento', 'Prédio', 'Verba', 'Rendimento', 'Gastos', 'Ações'],
  departamentos.map(d => [
    `<span style="font-family:var(--mono);color:var(--gray-400);">${String(d.cd_departamento).padStart(3, '0')}</span>`,
    `<strong>${d.ds_nome}</strong>`,
    d.ds_predio,
    `<span style="color:var(--blue-600);font-weight:600;">${fmt(d.qt_verba)}</span>`,
    `<span style="color:var(--success);font-weight:600;">${fmt(d.qt_rendimento)}</span>`,
    `<span style="color:var(--danger);font-weight:600;">${fmt(d.qt_gastos_totais)}</span>`,
    `<button class="action-btn secondary" style="padding:4px 10px;font-size:12px;">✏️</button>`,
  ])
);

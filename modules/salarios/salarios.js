/* =============================================================
   pages/salarios.js — lógica exclusiva de Salários
   Depende de: data.js, shell.js, utils.js
============================================================= */

renderShell('salarios');

// ── Totais para os KPIs ──────────────────────────────────────
const totalBruto   = salarios.reduce((soma, s) => soma + s.vl_salario_bruto,   0);
const totalLiquido = salarios.reduce((soma, s) => soma + s.vl_salario_liquido, 0);
const totalDescontos = totalBruto - totalLiquido;

document.getElementById('sal-bruto').textContent = fmt(totalBruto);
document.getElementById('sal-desc').textContent  = fmt(totalDescontos);
document.getElementById('sal-liq').textContent   = fmt(totalLiquido);

// ── Tabela da folha de pagamento ─────────────────────────────
renderTable(
  'salarios-table',
  ['#', 'Funcionário', 'Salário Bruto', 'Salário Líquido', 'Descontos'],
  salarios.map(s => [
    `<span style="font-family:var(--mono);color:var(--gray-400);">${String(s.cd_salario).padStart(3, '0')}</span>`,
    `<strong>${s.nm}</strong>`,
    `<span style="font-weight:600;color:var(--gray-900);">${fmt(s.vl_salario_bruto)}</span>`,
    `<span style="font-weight:600;color:var(--success);">${fmt(s.vl_salario_liquido)}</span>`,
    `<span style="color:var(--danger);font-size:13px;">-${fmt(s.vl_salario_bruto - s.vl_salario_liquido)}</span>`,
  ])
);

/* =============================================================
   pages/financas.js — lógica exclusiva de Finanças
   Depende de: data.js, shell.js, utils.js
============================================================= */

renderShell('financas');

// ── Totais para os KPIs ──────────────────────────────────────
const totalRendimento = financas.reduce((soma, f) => soma + f.qt_rendimento,   0);
const totalGastos     = financas.reduce((soma, f) => soma + f.qt_gastos_totais, 0);
const totalVerba      = financas.reduce((soma, f) => soma + f.qt_verba,         0);

document.getElementById('fin-rend').textContent  = fmt(totalRendimento);
document.getElementById('fin-gasto').textContent = fmt(totalGastos);
document.getElementById('fin-verba').textContent = fmt(totalVerba);
document.getElementById('fin-saldo').textContent = fmt(totalRendimento - totalGastos);

// ── Tabela detalhada por departamento ────────────────────────
renderTable(
  'financas-table',
  ['#', 'Departamento', 'Mês', 'Verba', 'Rendimento', 'Gastos', 'Saldo'],
  financas.map(f => {
    const saldo = f.qt_rendimento - f.qt_gastos_totais;
    const corSaldo = saldo >= 0 ? 'var(--success)' : 'var(--danger)';

    return [
      `<span style="font-family:var(--mono);color:var(--gray-400);">${String(f.cd_financa).padStart(3, '0')}</span>`,
      `<strong>${f.dept}</strong>`,
      f.mes,
      fmt(f.qt_verba),
      `<span style="color:var(--success);font-weight:600;">${fmt(f.qt_rendimento)}</span>`,
      `<span style="color:var(--danger);font-weight:600;">${fmt(f.qt_gastos_totais)}</span>`,
      `<span style="color:${corSaldo};font-weight:700;">${fmt(saldo)}</span>`,
    ];
  })
);

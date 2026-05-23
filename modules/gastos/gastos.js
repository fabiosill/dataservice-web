/* =============================================================
   pages/gastos.js — lógica exclusiva de Gastos
   Depende de: data.js, shell.js, utils.js
============================================================= */

renderShell('gastos');

// ── KPIs ──────────────────────────────────────────────────────
const totalGastos = gastos.reduce((soma, g) => soma + g.vl_gasto, 0);
document.getElementById('gasto-total').textContent = fmt(totalGastos);
document.getElementById('gasto-count').textContent = gastos.length;

// ── Tabela de gastos ─────────────────────────────────────────
renderTable(
  'gastos-table',
  ['#', 'Nome', 'Descrição', 'Valor', 'Departamento', 'Responsável'],
  gastos.map(g => {
    // Busca o departamento e o responsável relacionados
    const financa     = financas.find(f => f.cd_financa === g.fk_financa) || {};
    const responsavel = funcionarios.find(f => f.cd_funcionario === g.fk_responsavel) || {};

    return [
      `<span style="font-family:var(--mono);color:var(--gray-400);">${String(g.cd_gasto).padStart(3, '0')}</span>`,
      `<strong>${g.nm_gasto}</strong>`,
      g.ds_gasto,
      `<span style="color:var(--danger);font-weight:600;">${fmt(g.vl_gasto)}</span>`,
      `<span class="badge badge-blue">${financa.dept || '-'}</span>`,
      responsavel.nm_funcionario || '-',
    ];
  })
);

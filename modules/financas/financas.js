/* =============================================================
   pages/financas.js — lógica exclusiva de Finanças
   Depende de: data.js, shell.js, utils.js
============================================================= */

renderShell('financas');

// ── Função para atualizar KPIs ────────────────────────────────
function atualizarKPIs() {
  const totalRendimento = financas.reduce((soma, f) => soma + f.qt_rendimento,    0);
  const totalGastos     = financas.reduce((soma, f) => soma + f.qt_gastos_totais, 0);
  const totalVerba      = financas.reduce((soma, f) => soma + f.qt_verba,         0);

  document.getElementById('fin-rend').textContent  = fmt(totalRendimento);
  document.getElementById('fin-gasto').textContent = fmt(totalGastos);
  document.getElementById('fin-verba').textContent = fmt(totalVerba);
  document.getElementById('fin-saldo').textContent = fmt(totalRendimento - totalGastos);
}

// ── Função para renderizar tabela ────────────────────────────
function renderFinancas() {
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
}

atualizarKPIs();
renderFinancas();

// ── Salvar Novo Lançamento ───────────────────────────────────
document.getElementById('btn-salvar-lancamento').addEventListener('click', function () {
  const dept       = document.getElementById('lanc-dept').value.trim();
  const mes        = document.getElementById('lanc-mes').value.trim();
  const verba      = parseFloat(document.getElementById('lanc-verba').value)      || 0;
  const rendimento = parseFloat(document.getElementById('lanc-rendimento').value) || 0;
  const gastos     = parseFloat(document.getElementById('lanc-gastos').value)     || 0;

  if (!dept || !mes) {
    alert('Preencha ao menos o Departamento e o Mês.');
    return;
  }

  const novoId = financas.length > 0 ? Math.max(...financas.map(f => f.cd_financa)) + 1 : 1;

  financas.push({
    cd_financa:       novoId,
    dept:             dept,
    mes:              mes,
    qt_verba:         verba,
    qt_rendimento:    rendimento,
    qt_gastos_totais: gastos,
  });

  // Limpar campos
  ['lanc-dept','lanc-mes','lanc-verba','lanc-rendimento','lanc-gastos'].forEach(id => {
    document.getElementById(id).value = '';
  });

  closeModal('modal-lancamento');
  atualizarKPIs();
  renderFinancas();
});
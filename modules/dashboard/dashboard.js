document.addEventListener('DOMContentLoaded', () => {

  // ── Shell ───────────────────────────────
  renderShell('dashboard');

  // ── KPIs ────────────────────────────────
  const empresa = companies[currentCompanyIdx];

  document.getElementById('dash-company-name').textContent =
    empresa.nm_empresa + ' · Visão geral do mês';

  document.getElementById('kpi-receita').textContent = empresa.kpi.receita;
  document.getElementById('kpi-pedidos').textContent = empresa.kpi.pedidos;
  document.getElementById('kpi-func').textContent = empresa.kpi.func;
  document.getElementById('kpi-estoque').textContent =
    empresa.kpi.estoque.toLocaleString();

  // ── Gráfico ─────────────────────────────
  const meses    = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
  const receitas = [210, 240, 195, 284, null, null];
  const gastos   = [110, 130, 100, 122, null, null];
  const maxValor = 300;

  function criarBarras(mes, receita, gasto) {
    const altReceita = receita ? Math.round((receita / maxValor) * 160) : 0;
    const altGasto   = gasto ? Math.round((gasto / maxValor) * 160) : 0;

    return `
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;">
        <div style="display:flex;gap:3px;align-items:flex-end;height:160px;">
          <div class="chart-bar" style="width:18px;height:${altReceita}px;background:var(--blue-500);opacity:${receita ? 1 : .2};border-radius:4px 4px 0 0;"></div>
          <div class="chart-bar" style="width:18px;height:${altGasto}px;background:var(--gray-300);opacity:${gasto ? 1 : .2};border-radius:4px 4px 0 0;"></div>
        </div>
        <div class="chart-bar-label">${mes}</div>
      </div>`;
  }

  document.getElementById('barChart').innerHTML =
    meses.map((m, i) => criarBarras(m, receitas[i], gastos[i])).join('');

  // ── Departamentos ───────────────────────
  document.getElementById('dash-depts').innerHTML =
    departamentos.map(d => `
      <div class="mini-list-item">
        <div>
          <div class="mini-list-name">${d.ds_nome}</div>
          <div class="mini-list-sub">Verba: ${fmt(d.qt_verba)}</div>
        </div>
        <span class="mini-list-val" style="color:var(--success);font-size:13px;">
          ${fmt(d.qt_rendimento)}
        </span>
      </div>
    `).join('');

});
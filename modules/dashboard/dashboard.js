document.addEventListener('DOMContentLoaded', () => {

  // ── Shell ───────────────────────────────
  renderShell('dashboard');

  // ── Data padrão no campo de data do modal ──
  const hoje = new Date().toISOString().split('T')[0];
  const campoData = document.getElementById('reg-data');
  if (campoData) campoData.value = hoje;

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

// ── Exportar Dashboard ──────────────────
function exportarDashboard() {
  const { jsPDF } = window.jspdf;
  const empresa = companies[currentCompanyIdx];
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const azul     = [37, 99, 235];   // blue-600
  const cinzaEsc = [31, 41, 55];    // gray-800
  const cinzaMed = [107, 114, 128]; // gray-500
  const branco   = [255, 255, 255];
  const verde    = [22, 163, 74];
  const vermelho = [220, 38, 38];

  const W = 210, pad = 18;

  // ── Cabeçalho ──
  doc.setFillColor(...azul);
  doc.rect(0, 0, W, 32, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(...branco);
  doc.text('DataService ERP', pad, 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Dashboard · Visao geral do mes', pad, 20);
  doc.text(empresa.nm_empresa, pad, 26);

  const dataHoje = new Date().toLocaleDateString('pt-BR');
  doc.text(`Emitido em: ${dataHoje}`, W - pad, 26, { align: 'right' });

  // ── KPIs ──
  let y = 42;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...cinzaEsc);
  doc.text('Indicadores Principais', pad, y);

  y += 6;
  const kpis = [
    { label: 'Receita Total',    valor: empresa.kpi.receita,                    cor: azul    },
    { label: 'Pedidos no Mes',   valor: String(empresa.kpi.pedidos),             cor: verde   },
    { label: 'Funcionarios',     valor: String(empresa.kpi.func),                cor: [234,179,8] },
    { label: 'Itens em Estoque', valor: empresa.kpi.estoque.toLocaleString(),    cor: vermelho },
  ];

  const colW = (W - pad * 2) / 4;
  kpis.forEach((k, i) => {
    const x = pad + i * colW;
    doc.setFillColor(245, 247, 250);
    doc.roundedRect(x, y, colW - 3, 22, 2, 2, 'F');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...cinzaMed);
    doc.text(k.label, x + 4, y + 7);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...k.cor);
    doc.text(String(k.valor), x + 4, y + 16);
  });

  // ── Resumo Financeiro ──
  y += 32;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...cinzaEsc);
  doc.text('Resumo Financeiro', pad, y);

  y += 5;
  const financeiro = [
    { label: 'Receita Bruta',       valor: 'R$ 284.500', cor: verde    },
    { label: 'Gastos Totais',        valor: 'R$ 122.300', cor: vermelho },
    { label: 'Folha de Pagamento',   valor: 'R$  68.900', cor: vermelho },
    { label: 'Lucro Liquido',        valor: 'R$  93.300', cor: azul, negrito: true },
  ];

  financeiro.forEach((row, i) => {
    const isLast = i === financeiro.length - 1;
    const bg = isLast ? [239, 246, 255] : (i % 2 === 0 ? branco : [248, 250, 252]);
    doc.setFillColor(...bg);
    doc.rect(pad, y, W - pad * 2, 9, 'F');

    if (isLast) {
      doc.setDrawColor(...azul);
      doc.setLineWidth(0.3);
      doc.line(pad, y, W - pad, y);
    }

    doc.setFont('helvetica', row.negrito ? 'bold' : 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...cinzaEsc);
    doc.text(row.label, pad + 3, y + 6);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...row.cor);
    doc.text(row.valor, W - pad - 3, y + 6, { align: 'right' });

    y += 9;
  });

  // ── Estoque Crítico ──
  y += 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...cinzaEsc);
  doc.text('Estoque Critico', pad, y);

  y += 5;
  const estoque = [
    { nome: 'Notebook Dell XPS',  minimo: '5 un.',  atual: '3 un.',  status: 'Critico'  },
    { nome: 'Cabo HDMI 2m',       minimo: '20 un.', atual: '12 un.', status: 'Atencao'  },
    { nome: 'Mouse Logitech',     minimo: '10 un.', atual: '4 un.',  status: 'Critico'  },
    { nome: 'Teclado Mecanico',   minimo: '8 un.',  atual: '9 un.',  status: 'Atencao'  },
  ];

  // cabeçalho da tabela
  doc.setFillColor(...azul);
  doc.rect(pad, y, W - pad * 2, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...branco);
  doc.text('Produto',       pad + 3,       y + 5.5);
  doc.text('Minimo',        pad + 90,       y + 5.5);
  doc.text('Atual',         pad + 115,      y + 5.5);
  doc.text('Status',        pad + 140,      y + 5.5);
  y += 8;

  estoque.forEach((item, i) => {
    doc.setFillColor(...(i % 2 === 0 ? branco : [248, 250, 252]));
    doc.rect(pad, y, W - pad * 2, 8, 'F');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...cinzaEsc);
    doc.text(item.nome,   pad + 3,  y + 5.5);
    doc.text(item.minimo, pad + 90, y + 5.5);
    doc.text(item.atual,  pad + 115, y + 5.5);

    const corStatus = item.status === 'Critico' ? vermelho : [202, 138, 4];
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...corStatus);
    doc.text(item.status, pad + 140, y + 5.5);

    y += 8;
  });

  // ── Rodapé ──
  const altPagina = 297;
  doc.setFillColor(245, 247, 250);
  doc.rect(0, altPagina - 12, W, 12, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...cinzaMed);
  doc.text('DataService ERP · Relatorio gerado automaticamente', pad, altPagina - 5);
  doc.text(`Pagina 1 de 1`, W - pad, altPagina - 5, { align: 'right' });

  doc.save(`dashboard_${empresa.nm_empresa.replace(/\s+/g, '_')}.pdf`);
}
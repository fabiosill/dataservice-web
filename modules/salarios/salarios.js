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

// ── Exportar Folha em PDF ────────────────────────────────────
document.getElementById('btn-exportar-folha').addEventListener('click', function () {
  const mesAtual = document.getElementById('sel-mes-salario').value || 'Abril 2025';

  // Carrega jsPDF dinamicamente se ainda não estiver disponível
  function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

    const AZUL    = [30, 80, 160];
    const CINZA_E = [245, 246, 250];
    const CINZA_T = [100, 110, 130];
    const VERDE   = [22, 163, 74];
    const VERMELHO= [220, 38, 38];
    const BRANCO  = [255, 255, 255];

    const pw = doc.internal.pageSize.getWidth();

    // Cabeçalho
    doc.setFillColor(...AZUL);
    doc.rect(0, 0, pw, 22, 'F');
    doc.setTextColor(...BRANCO);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('DataService ERP — Folha de Pagamento', 14, 10);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`Período: ${mesAtual}`, 14, 17);
    doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, pw - 14, 17, { align: 'right' });

    // KPIs
    const kpis = [
      { label: 'Total Bruto',     valor: totalBruto,     cor: AZUL },
      { label: 'Total Descontos', valor: totalDescontos, cor: VERMELHO },
      { label: 'Total Líquido',   valor: totalLiquido,   cor: VERDE },
    ];
    const kpiW = (pw - 28) / 3;
    kpis.forEach((k, i) => {
      const x = 14 + i * (kpiW + 4);
      doc.setFillColor(...CINZA_E);
      doc.roundedRect(x, 26, kpiW, 16, 2, 2, 'F');
      doc.setTextColor(...CINZA_T);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.text(k.label, x + 4, 31);
      doc.setTextColor(...k.cor);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text(
        k.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        x + 4, 39
      );
    });

    // Tabela
    const colunas = ['#', 'Funcionário', 'Salário Bruto', 'Salário Líquido', 'Descontos'];
    const larguras = [15, 80, 45, 45, 45];
    const altLinha = 9;
    let y = 48;

    // Cabeçalho da tabela
    doc.setFillColor(...AZUL);
    doc.rect(14, y, pw - 28, altLinha, 'F');
    doc.setTextColor(...BRANCO);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    let xc = 14;
    colunas.forEach((col, i) => {
      doc.text(col, xc + 3, y + 6);
      xc += larguras[i];
    });
    y += altLinha;

    // Linhas de dados
    salarios.forEach((s, idx) => {
      if (idx % 2 === 0) {
        doc.setFillColor(...CINZA_E);
        doc.rect(14, y, pw - 28, altLinha, 'F');
      }
      doc.setTextColor(30, 30, 30);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);

      const desc = s.vl_salario_bruto - s.vl_salario_liquido;
      const valores = [
        String(s.cd_salario).padStart(3, '0'),
        s.nm,
        s.vl_salario_bruto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        s.vl_salario_liquido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        desc.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      ];

      xc = 14;
      valores.forEach((v, i) => {
        if (i === 3) doc.setTextColor(...VERDE);
        else if (i === 4) doc.setTextColor(...VERMELHO);
        else doc.setTextColor(30, 30, 30);
        doc.text(v, xc + 3, y + 6);
        xc += larguras[i];
      });
      y += altLinha;
    });

    // Linha de totais
    doc.setFillColor(...AZUL);
    doc.rect(14, y, pw - 28, altLinha, 'F');
    doc.setTextColor(...BRANCO);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    const totaisValores = [
      '', 'TOTAIS',
      totalBruto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      totalLiquido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      totalDescontos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
    ];
    xc = 14;
    totaisValores.forEach((v, i) => {
      doc.text(v, xc + 3, y + 6);
      xc += larguras[i];
    });

    // Rodapé
    doc.setTextColor(...CINZA_T);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.text('DataService ERP — Documento gerado automaticamente', 14, doc.internal.pageSize.getHeight() - 6);

    doc.save(`folha_pagamento_${mesAtual.replace(' ', '_')}.pdf`);
  }

  if (window.jspdf) {
    gerarPDF();
  } else {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    script.onload = gerarPDF;
    document.head.appendChild(script);
  }
});
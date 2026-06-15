/* =============================================================
   pages/ponto.js — lógica exclusiva de Ponto Eletrônico
   Depende de: data.js, shell.js, utils.js
============================================================= */

renderShell('ponto');

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

// ── Exportar Ponto em PDF ────────────────────────────────────
document.getElementById('btn-exportar-ponto').addEventListener('click', function () {
  const mesAtual = document.getElementById('sel-mes-ponto').value || 'Abril 2025';

  function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

    const AZUL     = [30, 80, 160];
    const CINZA_E  = [245, 246, 250];
    const CINZA_T  = [100, 110, 130];
    const VERDE    = [22, 163, 74];
    const VERMELHO = [220, 38, 38];
    const AMARELO  = [161, 98, 7];
    const BRANCO   = [255, 255, 255];

    const pw = doc.internal.pageSize.getWidth();

    // Cabeçalho
    doc.setFillColor(...AZUL);
    doc.rect(0, 0, pw, 22, 'F');
    doc.setTextColor(...BRANCO);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('DataService ERP — Ponto Eletrônico', 14, 10);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`Período: ${mesAtual}`, 14, 17);
    doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, pw - 14, 17, { align: 'right' });

    // KPIs
    const presentes  = pontos.filter(p => p.bl_presenca).length;
    const ausentes   = pontos.filter(p => !p.bl_presenca).length;
    const homeOffice = pontos.filter(p => p.ds_observacao && p.ds_observacao.toLowerCase().includes('home')).length;

    const kpis = [
      { label: 'Presentes', valor: presentes,  cor: VERDE },
      { label: 'Ausentes',  valor: ausentes,   cor: VERMELHO },
      { label: 'Home Office',valor: homeOffice, cor: AMARELO },
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
      doc.setFontSize(18);
      doc.text(String(k.valor), x + 4, 39);
    });

    // Tabela
    const colunas  = ['Funcionário', 'Entrada', 'Saída', 'Presença', 'Observação'];
    const larguras = [70, 35, 35, 35, 90];
    const altLinha = 9;
    let y = 48;

    // Cabeçalho
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
    pontos.forEach((p, idx) => {
      if (idx % 2 === 0) {
        doc.setFillColor(...CINZA_E);
        doc.rect(14, y, pw - 28, altLinha, 'F');
      }

      const statusCor = p.bl_presenca ? VERDE : VERMELHO;
      const statusTxt = p.bl_presenca ? 'Presente' : 'Ausente';

      const valores = [p.nm, p.qt_horario_entrada, p.qt_horario_saida, statusTxt, p.ds_observacao || '—'];
      xc = 14;
      valores.forEach((v, i) => {
        if (i === 3) doc.setTextColor(...statusCor);
        else doc.setTextColor(30, 30, 30);
        doc.setFont('helvetica', i === 3 ? 'bold' : 'normal');
        doc.setFontSize(8);
        doc.text(String(v), xc + 3, y + 6);
        xc += larguras[i];
      });
      y += altLinha;
    });

    // Rodapé
    doc.setTextColor(...CINZA_T);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.text('DataService ERP — Documento gerado automaticamente', 14, doc.internal.pageSize.getHeight() - 6);

    doc.save(`ponto_eletronico_${mesAtual.replace(' ', '_')}.pdf`);
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
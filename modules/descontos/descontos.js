/* =============================================================
   pages/descontos.js — lógica exclusiva de Descontos
   Depende de: data.js, shell.js, utils.js
============================================================= */

renderShell('descontos');

function renderDescontos() {
  renderTable(
    'descontos-table',
    ['#', 'Código', 'Nome', 'Valor', 'Ações'],
    descontos.map(d => [
      `<span style="font-family:var(--mono);color:var(--gray-400);">${String(d.cd_desconto).padStart(3, '0')}</span>`,
      `<span class="badge badge-gray">${d.ds_desconto}</span>`,
      d.nm_desconto,
      `<strong>${d.vl_desconto}</strong>`,
      `<button class="action-btn secondary" style="padding:4px 12px;font-size:12px;" onclick="abrirEdicao(${d.cd_desconto})">✏️ Editar</button>`,
    ])
  );
}

renderDescontos();

function abrirEdicao(cdDesconto) {
  const d = descontos.find(x => x.cd_desconto === cdDesconto);
  if (!d) return;

  document.getElementById('edit-codigo').value = d.ds_desconto;
  document.getElementById('edit-nome').value   = d.nm_desconto;
  document.getElementById('edit-valor').value  = d.vl_desconto;

  document.getElementById('btn-salvar-edicao').onclick = function () {
    d.ds_desconto  = document.getElementById('edit-codigo').value;
    d.nm_desconto  = document.getElementById('edit-nome').value;
    d.vl_desconto  = document.getElementById('edit-valor').value;
    closeModal('modal-editar-desconto');
    renderDescontos();
  };

  openModal('modal-editar-desconto');
}
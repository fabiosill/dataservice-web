/* =============================================================
   pages/pedidos.js — lógica exclusiva de Pedidos
   Depende de: data.js, shell.js, utils.js
============================================================= */

renderShell('pedidos');

// ── KPIs ──────────────────────────────────────────────────────
document.getElementById('ped-total').textContent = pedidos.length;
document.getElementById('ped-aprov').textContent = pedidos.filter(p => p.status === 'Aprovado').length;
document.getElementById('ped-pend').textContent  = pedidos.filter(p => p.status === 'Pendente').length;
document.getElementById('ped-canc').textContent  = pedidos.filter(p => p.status === 'Cancelado').length;

// ── Popula o select de clientes no modal ─────────────────────
document.getElementById('ped-cliente-sel').innerHTML =
  clientes.map(c => `<option value="${c.cd_cliente}">${c.nm_cliente}</option>`).join('');

/**
 * Renderiza a tabela de pedidos.
 * @param {Array} lista - Subconjunto de `pedidos`
 */
function renderPedidos(lista) {
  renderTable(
    'pedidos-table',
    ['Pedido', 'Cliente', 'Descrição', 'Valor Total', 'Desconto', 'Status', 'Ação'],
    lista.map(p => [
      `<span style="font-family:var(--mono);font-weight:600;color:var(--blue-600);">${p.cd_pedido}</span>`,
      p.cliente,
      p.ds_pedido,
      `<span style="font-weight:700;font-family:var(--mono);">${fmt(p.vl_precototal)}</span>`,
      p.qt_desconto > 0 ? `<span style="color:var(--danger);">-${fmt(p.qt_desconto)}</span>` : '-',
      badge(p.status),
      `<button class="action-btn secondary" style="padding:4px 10px;font-size:12px;">Ver</button>`,
    ])
  );
}

/**
 * Filtra pedidos pelo texto digitado (código, cliente ou descrição).
 * Chamada pelo oninput do campo de busca.
 */
function filtrarPedidos(texto) {
  const q = texto.toLowerCase();
  renderPedidos(pedidos.filter(p =>
    p.cd_pedido.toLowerCase().includes(q) ||
    p.cliente.toLowerCase().includes(q) ||
    p.ds_pedido.toLowerCase().includes(q)
  ));
}

/**
 * Filtra pedidos pelo status selecionado no dropdown.
 * Se valor vazio, exibe todos.
 * Chamada pelo onchange do select de status.
 */
function filtrarPorStatus(status) {
  renderPedidos(status ? pedidos.filter(p => p.status === status) : pedidos);
}

// Exibe todos ao carregar
renderPedidos(pedidos);

/* =============================================================
   pages/clientes.js — lógica exclusiva de Clientes
   Depende de: data.js, shell.js, utils.js
============================================================= */

renderShell('clientes');

/**
 * Renderiza a tabela de clientes.
 * @param {Array} lista - Subconjunto de `clientes`
 */
function renderClientes(lista) {
  renderTable(
    'clientes-table',
    ['#', 'Nome', 'CPF', 'Nascimento', 'Pedidos', 'Status'],
    lista.map(c => [
      `<span style="font-family:var(--mono);color:var(--gray-400);">${String(c.cd_cliente).padStart(3, '0')}</span>`,
      `<strong>${c.nm_cliente}</strong>`,
      c.ds_cpf,
      // Formata a data de nascimento para dd/mm/aaaa
      new Date(c.dt_nascimento).toLocaleDateString('pt-BR'),
      `<span class="badge badge-blue">${c.fk_pedido} pedido(s)</span>`,
      badge('Aprovado'),
    ])
  );
}

/**
 * Filtra clientes pelo texto digitado (nome ou CPF).
 * Chamada pelo oninput do campo de busca.
 */
function filtrarClientes(texto) {
  const q = texto.toLowerCase();
  renderClientes(clientes.filter(c =>
    c.nm_cliente.toLowerCase().includes(q) ||
    c.ds_cpf.includes(q)
  ));
}

// Exibe todos ao carregar
renderClientes(clientes);

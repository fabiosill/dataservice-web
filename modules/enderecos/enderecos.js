/* =============================================================
   pages/enderecos.js — lógica exclusiva de Endereços
   Depende de: data.js, shell.js, utils.js
============================================================= */

renderShell('enderecos');

renderTable(
  'enderecos-table',
  ['Filial', 'Rua', 'Número', 'Bairro', 'Cidade', 'UF', 'CEP'],
  enderecos.map(e => [
    `<span style="font-family:var(--mono);color:var(--gray-400);">${String(e.id).padStart(3, '0')}</span>`,
    e.ds_rua,
    e.ds_numero,
    e.ds_bairro,
    e.ds_cidade,
    e.ds_estado,
    `<span style="font-family:var(--mono);">${e.ds_cep}</span>`,
  ])
);

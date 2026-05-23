/* =============================================================
   pages/empresa.js — lógica exclusiva de Empresa
   Depende de: data.js, shell.js, utils.js
============================================================= */

renderShell('empresa');

// Busca a empresa e o endereço ativos
const empresa  = companies[currentCompanyIdx];
const endereco = enderecos.find(e => e.id === empresa.fk_endereco) || {};

// ── Dados principais ─────────────────────────────────────────
document.getElementById('empresa-detail').innerHTML =
  detailRow('Razão Social', empresa.nm_empresa) +
  detailRow('CNPJ',         empresa.ds_cnpj) +
  detailRow('E-mail',       empresa.ds_email) +
  detailRow('Sobre',        empresa.ds_sobre);

// ── Endereço ─────────────────────────────────────────────────
document.getElementById('empresa-address').innerHTML =
  detailRow('Rua',      endereco.ds_rua    || '-') +
  detailRow('Número',   endereco.ds_numero || '-') +
  detailRow('Bairro',   endereco.ds_bairro || '-') +
  detailRow('Cidade/UF', (endereco.ds_cidade || '-') + ' / ' + (endereco.ds_estado || '-')) +
  detailRow('CEP',      endereco.ds_cep    || '-') +
  detailRow('País',     endereco.ds_pais   || '-');

// ── Preenche os campos do modal com os dados atuais ──────────
document.getElementById('m-razao').value = empresa.nm_empresa;
document.getElementById('m-cnpj').value  = empresa.ds_cnpj;
document.getElementById('m-email').value = empresa.ds_email;
document.getElementById('m-sobre').value = empresa.ds_sobre;

// ── Tabela com as outras empresas do grupo ───────────────────
// Filtra a empresa atual e monta a tabela com botão "Acessar"
const outrasEmpresas = companies.filter((_, i) => i !== currentCompanyIdx);

renderTable(
  'other-companies-table',
  ['Empresa', 'CNPJ', 'E-mail', 'Ação'],
  outrasEmpresas.map(outra => {
    const idx = companies.indexOf(outra);
    return [
      outra.nm_empresa,
      outra.ds_cnpj,
      outra.ds_email,
      `<button class="action-btn secondary" style="padding:4px 10px;font-size:12px;"
         onclick="setCompany(${idx}); location.href='empresa.html'">Acessar</button>`,
    ];
  })
);

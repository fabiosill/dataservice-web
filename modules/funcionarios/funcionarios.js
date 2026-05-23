/* =============================================================
   pages/funcionarios.js — lógica exclusiva de Funcionários
   Depende de: data.js, shell.js, utils.js
============================================================= */

renderShell('funcionarios');

/**
 * Renderiza a tabela de funcionários e atualiza o KPI de total.
 * @param {Array} lista - Subconjunto de `funcionarios` a exibir
 */
function renderFuncionarios(lista) {
  document.getElementById('f-total').textContent = lista.length;

  renderTable(
    'func-table',
    ['#', 'Nome', 'Cargo', 'Dept.', 'Gênero', 'Salário Bruto', 'Ação'],
    lista.map(f => {
      // Busca o salário correspondente ao funcionário
      const sal = salarios.find(s => s.cd_salario === f.fk_salario) || {};

      return [
        `<span style="font-family:var(--mono);color:var(--gray-400);">${String(f.cd_funcionario).padStart(3, '0')}</span>`,
        `<strong>${f.nm_funcionario}</strong>`,
        f.ds_cargo,
        `<span class="badge badge-blue">${f.dept}</span>`,
        f.ds_genero,
        `<span style="font-family:var(--mono);font-weight:600;">${fmt(sal.vl_salario_bruto || 0)}</span>`,
        `<button class="action-btn secondary" style="padding:4px 10px;font-size:12px;">✏️</button>`,
      ];
    })
  );
}

/**
 * Filtra a lista de funcionários pelo departamento clicado na aba.
 * Chamada pelo onclick das abas no HTML.
 *
 * @param {string}      dept - Nome do departamento ou 'todos'
 * @param {HTMLElement} btn  - Botão clicado (para marcar como ativo)
 */
function filtrarFuncionarios(dept, btn) {
  // Remove .active de todas as abas e aplica na clicada
  document.querySelectorAll('#func-tabs .tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const lista = dept === 'todos'
    ? funcionarios
    : funcionarios.filter(f => f.dept === dept);

  renderFuncionarios(lista);
}

// Exibe todos ao carregar a página
renderFuncionarios(funcionarios);

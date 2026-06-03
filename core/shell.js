/* =============================================================
   DATASERVICE ERP — shell.js
   Caminhos relativos para funcionar no GitHub Pages.
   
   Como usar em cada página HTML (dentro de /modules/x/x.html):
     <script src="../../core/shell.js"></script>
     renderShell('id-da-pagina');
============================================================= */

const PAGES = [
  {
    group: 'Visão Geral',
    items: [
      { id: 'dashboard', icon: '📊', label: 'Dashboard', file: '../dashboard/dashboard.html' },
    ],
  },

  {
    group: 'Cadastros',
    items: [
      { id: 'empresa',       icon: '🏢', label: 'Empresa',       file: '../empresa/empresa.html' },
      { id: 'departamentos', icon: '🏛️', label: 'Departamentos', file: '../departamentos/departamentos.html' },
      { id: 'clientes',      icon: '👤', label: 'Clientes',      file: '../clientes/clientes.html' },
      { id: 'enderecos',     icon: '📍', label: 'Endereços',     file: '../enderecos/enderecos.html' },
    ],
  },

  {
    group: 'Recursos Humanos',
    items: [
      { id: 'funcionarios', icon: '👥', label: 'Funcionários',    file: '../funcionarios/funcionarios.html' },
      { id: 'ponto',        icon: '⏱️', label: 'Ponto Eletrônico', file: '../ponto/ponto.html' },
      { id: 'salarios',     icon: '💰', label: 'Salários',         file: '../salarios/salarios.html' },
      { id: 'descontos',    icon: '🏷️', label: 'Descontos',        file: '../descontos/descontos.html' },
    ],
  },

  {
    group: 'Financeiro',
    items: [
      { id: 'financas', icon: '📈', label: 'Finanças', file: '../financas/financas.html' },
      { id: 'gastos',   icon: '💸', label: 'Gastos',   file: '../gastos/gastos.html' },
    ],
  },

  {
    group: 'Estoque',
    items: [
      { id: 'estoque',       icon: '📦', label: 'Estoque',       file: '../estoque/estoque.html' },
      { id: 'itens',         icon: '🔖', label: 'Itens',         file: '../itens/itens.html' },
      { id: 'movimentacoes', icon: '🔀', label: 'Movimentações', file: '../movimentacoes/movimentacoes.html' },
    ],
  },

  {
    group: 'Comercial',
    items: [
      { id: 'pedidos', icon: '🛒', label: 'Pedidos', file: '../pedidos/pedidos.html', badge: '8' },
    ],
  },
];

function renderShell(currentPageId) {

  const hoje = new Date().toLocaleDateString('pt-BR');
  const opcoesEmpresas = companies
    .map((c, i) => `<option value="${i}" ${i === currentCompanyIdx ? 'selected' : ''}>${c.nm_empresa}</option>`)
    .join('');

  const companyBar = `
    <div class="company-bar">
      <div class="company-selector">
        <span>🏢 Empresa ativa:</span>
        <select onchange="handleCompanySwitch(this.value)">${opcoesEmpresas}</select>
      </div>
      <div class="company-bar-right">
        <span>📅 ${hoje}</span>
        <span>🟢 Sistema online</span>
        <span>👤 Admin</span>
      </div>
    </div>`;

  const header = `
    <div class="app-header">
      <button class="sidebar-toggle-btn" onclick="toggleSidebar()" aria-label="Menu">☰</button>

      <div class="app-logo">
        <div class="app-logo-icon">🔷</div>
        <div class="app-logo-text">Data<span>Service</span></div>
      </div>

      <div class="app-search">
        <span class="app-search-icon">🔍</span>
        <input type="text" placeholder="Pesquisar módulos, registros...">
      </div>

      <div class="app-header-right">
        <button class="header-icon-btn" title="Notificações">
          🔔
          <div class="notif-badge"></div>
        </button>

        <button class="header-icon-btn" title="Ajuda">❓</button>
        <button class="header-icon-btn" title="Configurações">⚙️</button>

        <div class="user-avatar" title="Perfil">AD</div>

        <button
          class="action-btn secondary"
          onclick="window.location.href='../../index.html'"
          style="font-size:12px;padding:5px 12px;"
        >
          ⬅ Sair
        </button>
      </div>
    </div>
  `;

  const secoes = PAGES.map(grupo => {
    const itens = grupo.items.map(p => {
      const ativo     = p.id === currentPageId ? ' active' : '';
      const badgeHtml = p.badge ? `<span class="nav-badge">${p.badge}</span>` : '';
      return `<a class="nav-item${ativo}" href="${p.file}"><span class="nav-icon">${p.icon}</span>${p.label}${badgeHtml}</a>`;
    }).join('');
    return `<div class="sidebar-section"><div class="sidebar-section-label">${grupo.group}</div>${itens}</div>`;
  }).join('');

  const sidebar = `
    <div class="sidebar" id="appSidebar">${secoes}</div>
    <div class="sidebar-backdrop" id="sidebarBackdrop" onclick="toggleSidebar()"></div>`;

  document.getElementById('app-shell').innerHTML = companyBar + header;
  document.getElementById('app-body').insertAdjacentHTML('afterbegin', sidebar);

  document.body.insertAdjacentHTML('beforeend', '<div class="toast-container" id="toasts"></div>');
}

function handleCompanySwitch(idx) {
  setCompany(idx);
  showToast('🏢 Empresa alterada: ' + companies[parseInt(idx)].nm_empresa, 'success');
  setTimeout(() => location.reload(), 600);
}
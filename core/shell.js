/* =============================================================
   DATASERVICE ERP — shell.js  (v2 — Modern SaaS Redesign)
   Como usar em cada página HTML:
     <script src="../../core/shell.js"></script>
     renderShell('id-da-pagina');
============================================================= */

/* ── SVG Icons ── */
const ICONS = {
  dashboard: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
  empresa: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  departamentos: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="17"/><line x1="9.5" y1="14.5" x2="14.5" y2="14.5"/></svg>`,
  clientes: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  enderecos: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  funcionarios: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  ponto: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  salarios: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  descontos: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  financas: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
  gastos: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
  estoque: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`,
  itens: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`,
  movimentacoes: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>`,
  pedidos: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
  // Header icons
  bell: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  help: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  settings: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  search: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  menu: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  chevron: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
  // Company bar
  building: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  calendar: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  user_icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  logout: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
  logo: `<img src="../../assets/img/dataservicelogo.png">`,
  visao: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
};

const PAGES = [
  {
    group: 'Visão Geral',
    items: [
      { id: 'dashboard', iconKey: 'dashboard', label: 'Dashboard', file: '../dashboard/dashboard.html' },
    ],
  },
  {
    group: 'Cadastros',
    items: [
      { id: 'empresa',       iconKey: 'empresa',       label: 'Empresa',       file: '../empresa/empresa.html' },
      { id: 'departamentos', iconKey: 'departamentos', label: 'Departamentos', file: '../departamentos/departamentos.html' },
      { id: 'clientes',      iconKey: 'clientes',      label: 'Clientes',      file: '../clientes/clientes.html' },
      { id: 'enderecos',     iconKey: 'enderecos',     label: 'Endereços',     file: '../enderecos/enderecos.html' },
    ],
  },
  {
    group: 'Recursos Humanos',
    items: [
      { id: 'funcionarios', iconKey: 'funcionarios', label: 'Funcionários',      file: '../funcionarios/funcionarios.html' },
      { id: 'ponto',        iconKey: 'ponto',        label: 'Ponto Eletrônico', file: '../ponto/ponto.html' },
      { id: 'salarios',     iconKey: 'salarios',     label: 'Salários',         file: '../salarios/salarios.html' },
      { id: 'descontos',    iconKey: 'descontos',    label: 'Descontos',        file: '../descontos/descontos.html' },
    ],
  },
  {
    group: 'Financeiro',
    items: [
      { id: 'financas', iconKey: 'financas', label: 'Finanças', file: '../financas/financas.html' },
      { id: 'gastos',   iconKey: 'gastos',   label: 'Gastos',   file: '../gastos/gastos.html' },
    ],
  },
  {
    group: 'Estoque',
    items: [
      { id: 'estoque',       iconKey: 'estoque',       label: 'Estoque',       file: '../estoque/estoque.html' },
      { id: 'itens',         iconKey: 'itens',         label: 'Itens',         file: '../itens/itens.html' },
      { id: 'movimentacoes', iconKey: 'movimentacoes', label: 'Movimentações', file: '../movimentacoes/movimentacoes.html' },
    ],
  },
  {
    group: 'Comercial',
    items: [
      { id: 'pedidos', iconKey: 'pedidos', label: 'Pedidos', file: '../pedidos/pedidos.html', badge: '8' },
    ],
  },
];

function renderShell(currentPageId) {

  const hoje = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const empresa = companies[currentCompanyIdx];

  /* ── Company Bar ── */
  const companyBar = `
    <div class="company-bar">
      <div class="company-active">
        <div class="company-active-icon">${ICONS.building}</div>
        <div>
          <div class="company-active-label">Empresa ativa</div>
          <div class="company-active-name">${empresa.nm_empresa}</div>
        </div>
      </div>

      <div class="company-selector">
        <select onchange="handleCompanySwitch(this.value)" title="Trocar empresa">
          ${companies.map((c, i) => `<option value="${i}" ${i === currentCompanyIdx ? 'selected' : ''}>${c.nm_empresa}</option>`).join('')}
        </select>
      </div>

      <div class="company-bar-meta">
        <div class="company-bar-meta-item">
          ${ICONS.calendar}
          ${hoje}
        </div>
        <div class="company-bar-meta-item">
          <span class="status-dot"></span>
          Sistema online
        </div>
        <div class="company-bar-meta-item">
          ${ICONS.user_icon}
          Admin
        </div>
      </div>

      <button class="company-bar-exit" onclick="window.location.href='../../index.html'" title="Sair">
        ${ICONS.logout}
        Sair
      </button>
    </div>`;

  /* ── Header ── */
  const header = `
    <div class="app-header">
      <div class="app-logo">
        <div class="app-logo-icon">${ICONS.logo}</div>
        <div class="app-logo-text"><span>DataService</span></div>
      </div>

      <button class="sidebar-toggle-btn" onclick="toggleSidebar()" aria-label="Menu">
        ${ICONS.menu}
      </button>

      <div class="app-search">
        <span class="app-search-icon">${ICONS.search}</span>
        <input type="text" placeholder="Pesquisar módulos, registros...">
      </div>

      <div class="app-header-right">
        <button class="header-icon-btn" title="Notificações">
          ${ICONS.bell}
          <div class="notif-badge"></div>
        </button>
        <button class="header-icon-btn" title="Ajuda">${ICONS.help}</button>
        <button class="header-icon-btn" title="Configurações">${ICONS.settings}</button>
        <div class="header-divider"></div>
        <div class="user-area" title="Perfil do usuário">
          <div class="user-avatar">AD</div>
          <span class="user-name">Admin</span>
          <span class="user-chevron">${ICONS.chevron}</span>
        </div>
      </div>
    </div>`;

  /* ── Sidebar ── */
  const secoes = PAGES.map(grupo => {
    const itens = grupo.items.map(p => {
      const ativo     = p.id === currentPageId ? ' active' : '';
      const iconSvg   = ICONS[p.iconKey] || ICONS.dashboard;
      const badgeHtml = p.badge ? `<span class="nav-badge">${p.badge}</span>` : '';
      return `<a class="nav-item${ativo}" href="${p.file}">
        <span class="nav-icon">${iconSvg}</span>
        <span>${p.label}</span>
        ${badgeHtml}
      </a>`;
    }).join('');
    return `<div class="sidebar-section">
      <div class="sidebar-section-label">${grupo.group}</div>
      ${itens}
    </div>`;
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
  showToast('Empresa alterada: ' + companies[parseInt(idx)].nm_empresa, 'success');
  setTimeout(() => location.reload(), 600);
}
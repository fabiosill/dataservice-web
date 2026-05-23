/* ========== SHARED DATA ========== */
const companies = [
  { cd_empresa: 1, nm_empresa: "Tech Solutions LTDA", ds_sobre: "Empresa especializada em soluções tecnológicas.", fk_endereco: 1, ds_email: "contato@techsol.com.br", ds_numero: "123", ds_cnpj: "12.345.678/0001-90", kpi: { receita: "R$ 284k", pedidos: 148, func: 34, estoque: 1240 } },
  { cd_empresa: 2, nm_empresa: "Comércio Rápido SA", ds_sobre: "Rede de comércio varejista.", fk_endereco: 2, ds_email: "sac@comerciorapido.com.br", ds_numero: "456", ds_cnpj: "98.765.432/0001-10", kpi: { receita: "R$ 512k", pedidos: 320, func: 87, estoque: 5400 } },
  { cd_empresa: 3, nm_empresa: "Serviços Premium EPP", ds_sobre: "Prestação de serviços de alto valor.", fk_endereco: 3, ds_email: "admin@premium.com.br", ds_numero: "789", ds_cnpj: "55.123.456/0001-77", kpi: { receita: "R$ 98k", pedidos: 42, func: 11, estoque: 230 } }
];

const enderecos = [
  { id: 1, ds_rua: "Av. Paulista", ds_numero: "1000", ds_bairro: "Bela Vista", ds_cidade: "São Paulo", ds_estado: "SP", ds_cep: "01310-100", ds_pais: "Brasil" },
  { id: 2, ds_rua: "Rua das Flores", ds_numero: "200", ds_bairro: "Centro", ds_cidade: "Campinas", ds_estado: "SP", ds_cep: "13001-000", ds_pais: "Brasil" },
  { id: 3, ds_rua: "Rua Oscar Freire", ds_numero: "50", ds_bairro: "Jardins", ds_cidade: "São Paulo", ds_estado: "SP", ds_cep: "01426-001", ds_pais: "Brasil" },
  { id: 4, ds_rua: "Al. Santos", ds_numero: "800", ds_bairro: "Cerqueira César", ds_cidade: "São Paulo", ds_estado: "SP", ds_cep: "01419-002", ds_pais: "Brasil" },
  { id: 5, ds_rua: "Rua Vergueiro", ds_numero: "3185", ds_bairro: "Vila Mariana", ds_cidade: "São Paulo", ds_estado: "SP", ds_cep: "04101-300", ds_pais: "Brasil" },
];

const departamentos = [
  { cd_departamento: 1, ds_nome: "Tecnologia da Informação", ds_predio: "Bloco A", fk_gerente: 1, fk_empresa: 1, qt_verba: 45000, qt_rendimento: 92000, qt_gastos_totais: 38000 },
  { cd_departamento: 2, ds_nome: "Recursos Humanos", ds_predio: "Bloco B", fk_gerente: 3, fk_empresa: 1, qt_verba: 15000, qt_rendimento: 0, qt_gastos_totais: 12500 },
  { cd_departamento: 3, ds_nome: "Vendas", ds_predio: "Bloco C", fk_gerente: 5, fk_empresa: 1, qt_verba: 80000, qt_rendimento: 180000, qt_gastos_totais: 65000 },
  { cd_departamento: 4, ds_nome: "Financeiro", ds_predio: "Bloco A", fk_gerente: 7, fk_empresa: 1, qt_verba: 20000, qt_rendimento: 10000, qt_gastos_totais: 17000 },
  { cd_departamento: 5, ds_nome: "Marketing", ds_predio: "Bloco D", fk_gerente: 9, fk_empresa: 1, qt_verba: 30000, qt_rendimento: 55000, qt_gastos_totais: 28000 },
];

const funcionarios = [
  { cd_funcionario: 1, nm_funcionario: "Ana Lima", ds_cargo: "Gerente de TI", ds_genero: "F", fk_salario: 1, fk_ponto: 1, fk_departamento: 1, fk_endereco: 4, dept: "TI" },
  { cd_funcionario: 2, nm_funcionario: "Bruno Carvalho", ds_cargo: "Dev Full Stack", ds_genero: "M", fk_salario: 2, fk_ponto: 2, fk_departamento: 1, fk_endereco: 5, dept: "TI" },
  { cd_funcionario: 3, nm_funcionario: "Carla Mendes", ds_cargo: "Analista de RH", ds_genero: "F", fk_salario: 3, fk_ponto: 3, fk_departamento: 2, fk_endereco: 1, dept: "RH" },
  { cd_funcionario: 4, nm_funcionario: "Diego Sousa", ds_cargo: "Dev Backend", ds_genero: "M", fk_salario: 4, fk_ponto: 4, fk_departamento: 1, fk_endereco: 2, dept: "TI" },
  { cd_funcionario: 5, nm_funcionario: "Elisa Ramos", ds_cargo: "Gerente de Vendas", ds_genero: "F", fk_salario: 5, fk_ponto: 5, fk_departamento: 3, fk_endereco: 3, dept: "Vendas" },
  { cd_funcionario: 6, nm_funcionario: "Felipe Torres", ds_cargo: "Analista Financeiro", ds_genero: "M", fk_salario: 6, fk_ponto: 6, fk_departamento: 4, fk_endereco: 4, dept: "Financeiro" },
  { cd_funcionario: 7, nm_funcionario: "Gabriela Nunes", ds_cargo: "Gerente Financeiro", ds_genero: "F", fk_salario: 7, fk_ponto: 7, fk_departamento: 4, fk_endereco: 5, dept: "Financeiro" },
  { cd_funcionario: 8, nm_funcionario: "Henrique Faria", ds_cargo: "Vendedor Sênior", ds_genero: "M", fk_salario: 8, fk_ponto: 8, fk_departamento: 3, fk_endereco: 1, dept: "Vendas" },
  { cd_funcionario: 9, nm_funcionario: "Isabela Costa", ds_cargo: "Gerente de Mktg", ds_genero: "F", fk_salario: 9, fk_ponto: 9, fk_departamento: 5, fk_endereco: 2, dept: "Marketing" },
  { cd_funcionario: 10, nm_funcionario: "João Paulo Ávila", ds_cargo: "Designer UX", ds_genero: "M", fk_salario: 10, fk_ponto: 10, fk_departamento: 5, fk_endereco: 3, dept: "Marketing" },
];

const salarios = [
  { cd_salario: 1, vl_salario_bruto: 12000, vl_salario_liquido: 9200, nm: "Ana Lima" },
  { cd_salario: 2, vl_salario_bruto: 9500, vl_salario_liquido: 7400, nm: "Bruno Carvalho" },
  { cd_salario: 3, vl_salario_bruto: 6800, vl_salario_liquido: 5300, nm: "Carla Mendes" },
  { cd_salario: 4, vl_salario_bruto: 8500, vl_salario_liquido: 6700, nm: "Diego Sousa" },
  { cd_salario: 5, vl_salario_bruto: 14000, vl_salario_liquido: 10500, nm: "Elisa Ramos" },
  { cd_salario: 6, vl_salario_bruto: 7200, vl_salario_liquido: 5700, nm: "Felipe Torres" },
  { cd_salario: 7, vl_salario_bruto: 13500, vl_salario_liquido: 10100, nm: "Gabriela Nunes" },
  { cd_salario: 8, vl_salario_bruto: 5800, vl_salario_liquido: 4600, nm: "Henrique Faria" },
  { cd_salario: 9, vl_salario_bruto: 11500, vl_salario_liquido: 8800, nm: "Isabela Costa" },
  { cd_salario: 10, vl_salario_bruto: 7500, vl_salario_liquido: 5900, nm: "João Paulo Ávila" },
];

const descontos = [
  { cd_desconto: 1, ds_desconto: "INSS", nm_desconto: "Previdência Social", vl_desconto: "11%" },
  { cd_desconto: 2, ds_desconto: "IRRF", nm_desconto: "Imposto de Renda", vl_desconto: "7.5%" },
  { cd_desconto: 3, ds_desconto: "VT", nm_desconto: "Vale Transporte", vl_desconto: "6%" },
  { cd_desconto: 4, ds_desconto: "Plano Saúde", nm_desconto: "Assistência Médica", vl_desconto: "R$ 280" },
  { cd_desconto: 5, ds_desconto: "Falta", nm_desconto: "Desconto por Falta", vl_desconto: "Por dia" },
];

const pontos = [
  { cd_ponto: 1, nm: "Ana Lima", ds_observacao: "-", bl_presenca: true, qt_horario_entrada: "08:05", qt_horario_saida: "17:15" },
  { cd_ponto: 2, nm: "Bruno Carvalho", ds_observacao: "-", bl_presenca: true, qt_horario_entrada: "09:00", qt_horario_saida: "18:10" },
  { cd_ponto: 3, nm: "Carla Mendes", ds_observacao: "Saída antecipada", bl_presenca: true, qt_horario_entrada: "08:00", qt_horario_saida: "16:00" },
  { cd_ponto: 4, nm: "Diego Sousa", ds_observacao: "Home office", bl_presenca: true, qt_horario_entrada: "09:30", qt_horario_saida: "18:30" },
  { cd_ponto: 5, nm: "Elisa Ramos", ds_observacao: "-", bl_presenca: true, qt_horario_entrada: "07:50", qt_horario_saida: "17:00" },
  { cd_ponto: 6, nm: "Felipe Torres", ds_observacao: "Falta justificada", bl_presenca: false, qt_horario_entrada: "-", qt_horario_saida: "-" },
  { cd_ponto: 7, nm: "Gabriela Nunes", ds_observacao: "-", bl_presenca: true, qt_horario_entrada: "08:30", qt_horario_saida: "18:00" },
  { cd_ponto: 8, nm: "Henrique Faria", ds_observacao: "Em reunião externa", bl_presenca: true, qt_horario_entrada: "10:00", qt_horario_saida: "19:00" },
];

const financas = [
  { cd_financa: 1, qt_verba: 45000, qt_rendimento: 92000, qt_gastos_totais: 38000, fk_departamento: 1, dept: "TI", mes: "Abril/2025" },
  { cd_financa: 2, qt_verba: 15000, qt_rendimento: 0, qt_gastos_totais: 12500, fk_departamento: 2, dept: "RH", mes: "Abril/2025" },
  { cd_financa: 3, qt_verba: 80000, qt_rendimento: 180000, qt_gastos_totais: 65000, fk_departamento: 3, dept: "Vendas", mes: "Abril/2025" },
  { cd_financa: 4, qt_verba: 20000, qt_rendimento: 10000, qt_gastos_totais: 17000, fk_departamento: 4, dept: "Financeiro", mes: "Abril/2025" },
  { cd_financa: 5, qt_verba: 30000, qt_rendimento: 55000, qt_gastos_totais: 28000, fk_departamento: 5, dept: "Marketing", mes: "Abril/2025" },
];

const gastos = [
  { cd_gasto: 1, nm_gasto: "Licença Software", ds_gasto: "Adobe Creative Cloud", vl_gasto: 1800, fk_financa: 1, fk_responsavel: 1 },
  { cd_gasto: 2, nm_gasto: "Evento", ds_gasto: "Feira Tech 2025", vl_gasto: 5000, fk_financa: 5, fk_responsavel: 9 },
  { cd_gasto: 3, nm_gasto: "Manutenção", ds_gasto: "Ar condicionado Bloco A", vl_gasto: 2200, fk_financa: 1, fk_responsavel: 2 },
  { cd_gasto: 4, nm_gasto: "Treinamento", ds_gasto: "Curso AWS Cloud", vl_gasto: 3500, fk_financa: 1, fk_responsavel: 1 },
  { cd_gasto: 5, nm_gasto: "Material escritório", ds_gasto: "Papelaria e suprimentos", vl_gasto: 780, fk_financa: 2, fk_responsavel: 3 },
  { cd_gasto: 6, nm_gasto: "Comissão vendas", ds_gasto: "Comissão Q1", vl_gasto: 12000, fk_financa: 3, fk_responsavel: 5 },
];

const estoques = [
  { cd_estoque: 1, ds_estoque: "Almoxarifado Principal", ds_endereco: "Galpão A, Setor 1" },
  { cd_estoque: 2, ds_estoque: "Estoque TI", ds_endereco: "Bloco A, Sala 102" },
  { cd_estoque: 3, ds_estoque: "Estoque de Vendas", ds_endereco: "Bloco C, Térreo" },
];

const itens = [
  { cd_item: 1, nm_item: "Notebook Dell XPS", ds_item: "15\", Core i7, 16GB RAM", qt_item: 3, fk_estoque: 2 },
  { cd_item: 2, nm_item: "Monitor LG 27\"", ds_item: "4K, IPS, 144Hz", qt_item: 18, fk_estoque: 2 },
  { cd_item: 3, nm_item: "Mouse Logitech MX", ds_item: "Sem fio, ergonômico", qt_item: 4, fk_estoque: 2 },
  { cd_item: 4, nm_item: "Teclado Mecânico", ds_item: "Switch Red, ABNT2", qt_item: 9, fk_estoque: 2 },
  { cd_item: 5, nm_item: "Cabo HDMI 2m", ds_item: "HDMI 2.1, 8K", qt_item: 12, fk_estoque: 1 },
  { cd_item: 6, nm_item: "Headset Sony WH", ds_item: "Noise cancelling", qt_item: 22, fk_estoque: 3 },
  { cd_item: 7, nm_item: "SSD Kingston 1TB", ds_item: "NVMe M.2 PCIe", qt_item: 30, fk_estoque: 1 },
];

const movimentacoes = [
  { cd_movimentacao: 1, ds_tipo: "Entrada", ds_status: "Concluído", fk_item: 7, qt_item: 30 },
  { cd_movimentacao: 2, ds_tipo: "Saída", ds_status: "Concluído", fk_item: 1, qt_item: 2 },
  { cd_movimentacao: 3, ds_tipo: "Saída", ds_status: "Concluído", fk_item: 3, qt_item: 5 },
  { cd_movimentacao: 4, ds_tipo: "Entrada", ds_status: "Concluído", fk_item: 6, qt_item: 25 },
  { cd_movimentacao: 5, ds_tipo: "Transferência", ds_status: "Pendente", fk_item: 5, qt_item: 10 },
  { cd_movimentacao: 6, ds_tipo: "Saída", ds_status: "Concluído", fk_item: 2, qt_item: 4 },
];

const clientes = [
  { cd_cliente: 1, nm_cliente: "Pedro Alves", ds_cpf: "123.456.789-00", dt_nascimento: "1985-04-12", fk_pedido: 3, fk_endereco: 1 },
  { cd_cliente: 2, nm_cliente: "Maria Santos", ds_cpf: "987.654.321-00", dt_nascimento: "1990-08-25", fk_pedido: 1, fk_endereco: 2 },
  { cd_cliente: 3, nm_cliente: "Carlos Lima", ds_cpf: "456.789.123-00", dt_nascimento: "1978-11-03", fk_pedido: 5, fk_endereco: 3 },
  { cd_cliente: 4, nm_cliente: "Ana Costa", ds_cpf: "321.654.987-00", dt_nascimento: "1995-02-18", fk_pedido: 2, fk_endereco: 4 },
  { cd_cliente: 5, nm_cliente: "Rodrigo Vieira", ds_cpf: "789.123.456-00", dt_nascimento: "1982-07-30", fk_pedido: 4, fk_endereco: 5 },
  { cd_cliente: 6, nm_cliente: "Fernanda Luz", ds_cpf: "654.321.789-00", dt_nascimento: "1993-09-14", fk_pedido: 6, fk_endereco: 1 },
];

const pedidos = [
  { cd_pedido: "#PED-0148", ds_pedido: "Equipamentos TI", vl_precototal: 1250, qt_desconto: 50, fk_movimentacao: 1, fk_vendedor: 8, fk_financa: 3, cliente: "Pedro Alves", status: "Aprovado" },
  { cd_pedido: "#PED-0147", ds_pedido: "Monitor LG", vl_precototal: 340, qt_desconto: 0, fk_movimentacao: 2, fk_vendedor: 5, fk_financa: 3, cliente: "Maria Santos", status: "Pendente" },
  { cd_pedido: "#PED-0146", ds_pedido: "Pacote Setup Completo", vl_precototal: 4800, qt_desconto: 200, fk_movimentacao: 3, fk_vendedor: 8, fk_financa: 3, cliente: "Carlos Lima", status: "Aprovado" },
  { cd_pedido: "#PED-0145", ds_pedido: "Headsets x2", vl_precototal: 890, qt_desconto: 10, fk_movimentacao: 4, fk_vendedor: 5, fk_financa: 3, cliente: "Ana Costa", status: "Cancelado" },
  { cd_pedido: "#PED-0144", ds_pedido: "Upgrade SSD", vl_precototal: 1140, qt_desconto: 0, fk_movimentacao: 5, fk_vendedor: 8, fk_financa: 3, cliente: "Rodrigo Vieira", status: "Aprovado" },
  { cd_pedido: "#PED-0143", ds_pedido: "Teclado + Mouse", vl_precototal: 580, qt_desconto: 30, fk_movimentacao: 6, fk_vendedor: 5, fk_financa: 3, cliente: "Fernanda Luz", status: "Aprovado" },
];

/* ========== SHARED STATE ========== */
let currentCompanyIdx = parseInt(sessionStorage.getItem('currentCompany') || '0');

function setCompany(idx) {
  currentCompanyIdx = parseInt(idx);
  sessionStorage.setItem('currentCompany', idx);
}

/* ========== HELPERS ========== */
function fmt(n) { return 'R$ ' + n.toLocaleString('pt-BR'); }

function renderTable(id, headers, rows) {
  const t = document.getElementById(id);
  if (!t) return;
  t.innerHTML = `<thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>`;
}

function badge(text) {
  const map = { 'Aprovado': 'green', 'Concluído': 'green', 'Pendente': 'yellow', 'Cancelado': 'red', 'Entrada': 'blue', 'Saída': 'red', 'Transferência': 'yellow' };
  return `<span class="badge badge-${map[text] || 'gray'}">${text}</span>`;
}

function detailRow(label, value) {
  return `<div class="detail-row"><span class="detail-label">${label}</span><span class="detail-value">${value}</span></div>`;
}

function showToast(msg, type = '') {
  const c = document.getElementById('toasts');
  if (!c) return;
  const t = document.createElement('div');
  t.className = 'toast ' + type;
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(() => t.remove(), 3200);
}

function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
function closeModalOutside(e, id) { if (e.target.id === id) closeModal(id); }
function saveAndClose(id) { closeModal(id); showToast('✅ Salvo com sucesso!', 'success'); }

/* ========== SIDEBAR TOGGLE (mobile) ========== */
function toggleSidebar() {
  document.getElementById('appSidebar').classList.toggle('open');
  document.getElementById('sidebarBackdrop').classList.toggle('open');
}

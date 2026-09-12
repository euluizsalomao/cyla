// ============================================================
// CYLA — APP.JS
// Lógica dinâmica de cada página.
// Depende de: seed.js, presets.js, storage.js
// ============================================================

// ── HELPERS ──────────────────────────────────────────────────

function getSaudacao() {
  const h = new Date().getHours();
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
}

function formatBRL(val) {
  const n = Number(val);
  if (isNaN(n)) return 'R$0,00';
  return 'R$' + n.toFixed(2).replace('.', ',');
}

function avatarLetra(nome) {
  return (nome || 'U').charAt(0).toUpperCase();
}

function diasLabel(n) {
  if (n <= 0) return '0 dias';
  return n === 1 ? '1 dia' : `${n} dias`;
}

function metaLabel(vicio) {
  if (!vicio) return '';
  const val = (vicio.valorMeta != null && vicio.valorMeta > 0) ? vicio.valorMeta : '?';
  if (vicio.tipoMeta === 'limite')  return `${val}h/dia`;
  if (vicio.tipoMeta === 'reducao') return `${val}x/sem`;
  return `${val} dias`;
}

function corVicio(index) {
  const cores = [
    'var(--green-main)',
    'var(--purple-main)',
    '#EF9F27',
    'var(--blue-main)',
    'var(--red-main)',
    'var(--pink-main)',
  ];
  return cores[index % cores.length];
}

// Mostra uma mensagem de erro inline
function showErro(seletor, msg) {
  const el = document.querySelector(seletor);
  if (!el) return;
  el.textContent = msg;
  el.style.display = 'block';
}

// Atualiza texto de um elemento (se existir)
function setText(seletor, texto) {
  const el = document.querySelector(seletor);
  if (el) el.textContent = texto;
}

// Atualiza HTML de um elemento (se existir)
function setHTML(seletor, html) {
  const el = document.querySelector(seletor);
  if (el) el.innerHTML = html;
}

// Escapa caracteres HTML para evitar XSS
function esc(str) {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ── DETECTAR PÁGINA ATUAL ────────────────────────────────────
const PAGINA = window.location.pathname.split('/').pop() || 'index.html';

// ── INICIALIZAÇÃO ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Páginas protegidas (exigem login)
  const paginasProtegidas = [
    'home.html','progresso.html','registro.html','amigos.html',
    'convidar-amigos.html','habitos.html','adicionar-vicio.html',
    'editar-vicio.html','perfil.html','editar-perfil.html'
  ];
  if (paginasProtegidas.includes(PAGINA)) {
    CYLA.exigirLogin();
  }

  // Roteador de páginas
  switch (PAGINA) {
    case 'login.html':          initLogin();         break;
    case 'criar-conta.html':    initCriarConta();    break;
    case 'esqueceu-senha.html': initEsqueceuSenha(); break;
    case 'onboarding.html':     initOnboarding();    break;
    case 'home.html':           initHome();          break;
    case 'progresso.html':      initProgresso();     break;
    case 'registro.html':       initRegistro();      break;
    case 'amigos.html':         initAmigos();        break;
    case 'convidar-amigos.html':initConvidar();      break;
    case 'habitos.html':        initHabitos();       break;
    case 'adicionar-vicio.html':initAdicionarVicio();break;
    case 'editar-vicio.html':   initEditarVicio();   break;
    case 'perfil.html':         initPerfil();        break;
    case 'editar-perfil.html':  initEditarPerfil();  break;
  }
});

// ── LOGIN ────────────────────────────────────────────────────
function initLogin() {
  if (CYLA.estaLogado()) { window.location.href = 'home.html'; return; }

  const form = document.getElementById('form-login') || document.querySelector('form');
  if (!form) return;

  let erroEl = document.getElementById('login-erro');
  if (!erroEl) {
    erroEl = document.createElement('p');
    erroEl.id = 'login-erro';
    erroEl.style.cssText = 'color:#D85A30;font-size:13px;text-align:center;margin-bottom:8px;display:none;';
    form.insertBefore(erroEl, form.querySelector('.btn'));
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    erroEl.style.display = 'none';

    const email = (document.getElementById('login-email') || form.querySelector('input[type="email"]'))?.value?.trim();
    const senha = (document.getElementById('login-senha') || form.querySelector('input[type="password"]'))?.value;

    const resultado = CYLA.login(email, senha);
    if (resultado?.ok) {
      window.location.href = 'home.html';
    } else {
      erroEl.textContent = resultado?.erro || 'E-mail ou senha incorretos.';
      erroEl.style.display = 'block';
    }
  });
}

// ── CRIAR CONTA ──────────────────────────────────────────────
function initCriarConta() {
  const form = document.getElementById('form-criar-conta') || document.querySelector('form');
  if (!form) return;

  // Cria ou reutiliza elemento de erro
  let erroEl = document.getElementById('cc-erro');
  if (!erroEl) {
    erroEl = document.createElement('p');
    erroEl.id = 'cc-erro';
    erroEl.style.cssText = 'color:#D85A30;font-size:13px;text-align:center;margin-bottom:8px;display:none;';
    form.insertBefore(erroEl, form.querySelector('.btn'));
  }

  const mostrarErro = msg => { erroEl.textContent = msg; erroEl.style.display = 'block'; };
  const limparErro  = ()  => { erroEl.style.display = 'none'; };

  form.addEventListener('submit', e => {
    e.preventDefault();
    limparErro();

    // Preferência por IDs (padrão mais robusto), fallback por índice
    const g = id => (document.getElementById(id) || {}).value?.trim() || '';
    const inputs  = form.querySelectorAll('input');
    const nome      = g('cc-nome')      || inputs[0]?.value?.trim();
    const sobrenome = g('cc-sobrenome') || inputs[1]?.value?.trim();
    const username  = g('cc-usuario')   || inputs[2]?.value?.trim();
    const email     = g('cc-email')     || inputs[3]?.value?.trim();
    const senha     = g('cc-senha')     || inputs[4]?.value;
    const confirmar = g('cc-confirmar') || inputs[5]?.value;

    if (senha.length < 6)    { mostrarErro('A senha deve ter pelo menos 6 caracteres.'); return; }
    if (senha !== confirmar) { mostrarErro('As senhas não coincidem.'); return; }

    const resultado = CYLA.cadastrarUsuario({ nome, sobrenome, username, email, senha });
    if (resultado?.erro) { mostrarErro(resultado.erro); return; }

    CYLA.login(email, senha);
    window.location.href = 'onboarding.html';
  });
}

// ── ESQUECEU SENHA ───────────────────────────────────────────
function initEsqueceuSenha() {
  const form = document.getElementById('form-esqueceu');
  if (!form) return;

  // Etapa 1: confirmar e-mail
  form.addEventListener('submit', e => {
    e.preventDefault();
    const email   = document.getElementById('es-email')?.value?.trim();
    const erroEl  = document.getElementById('es-erro');
    const usuario = CYLA.buscarPorEmail(email);

    if (!usuario) {
      if (erroEl) { erroEl.textContent = 'E-mail não encontrado.'; erroEl.style.display = 'block'; }
      return;
    }
    // guarda o email para usar na etapa 2
    form.dataset.email = email;
    document.getElementById('es-form-view').style.display  = 'none';
    document.getElementById('es-reset-view').style.display = 'block';
  });

  // Etapa 2: nova senha
  const btnSalvar = document.getElementById('es-salvar-senha');
  if (btnSalvar) {
    btnSalvar.addEventListener('click', () => {
      const nova  = document.getElementById('es-nova-senha')?.value || '';
      const conf  = document.getElementById('es-confirmar-senha')?.value || '';
      const erroEl = document.getElementById('es-reset-erro');

      if (nova.length < 6) { if (erroEl) { erroEl.textContent = 'Mínimo de 6 caracteres.'; erroEl.style.display = 'block'; } return; }
      if (nova !== conf)   { if (erroEl) { erroEl.textContent = 'As senhas não coincidem.'; erroEl.style.display = 'block'; } return; }

      const resultado = CYLA.redefinirSenha(form.dataset.email, nova);
      if (resultado?.erro) { if (erroEl) { erroEl.textContent = resultado.erro; erroEl.style.display = 'block'; } return; }

      document.getElementById('es-reset-view').style.display   = 'none';
      document.getElementById('es-success-view').style.display = 'block';
    });
  }
}

// ── ONBOARDING ───────────────────────────────────────────────
function initOnboarding() {
  const usuario = CYLA.getUsuarioAtual();
  if (!usuario) { window.location.href = 'login.html'; return; }

  // Atualizar saudação
  const h1 = document.querySelector('h1');
  if (h1) h1.textContent = `Olá, ${usuario.nome}! Seja bem-vindo!`;

  // Atualizar grid para usar data-preset corretamente
  // (já atualizado no HTML com categorias)

  // Botão principal — salva se tiver algo configurado; navega sempre
  const btnPrincipal = document.querySelector('a.btn');
  if (btnPrincipal) {
    btnPrincipal.addEventListener('click', e => {
      e.preventDefault();
      const temPreset  = document.querySelector('[data-preset].selected');
      const temCustom  = document.querySelector('.custom-vicio input, .add-btn input')?.value?.trim();
      if (temPreset || temCustom) {
        salvarVicioOnboarding(); // salva E navega internamente
      } else {
        window.location.href = 'home.html'; // pula sem configurar
      }
    });
  }

  // Campo de vício personalizado — desseleciona o preset ao digitar
  const customInput = document.querySelector('.custom-vicio input, .add-btn input');
  if (customInput) {
    customInput.addEventListener('focus', () => {
      document.querySelectorAll('.tipo-btn').forEach(b => b.classList.remove('selected'));
    });
    customInput.addEventListener('input', () => {
      if (customInput.value.trim()) {
        document.querySelectorAll('.tipo-btn').forEach(b => b.classList.remove('selected'));
      }
    });
  }

  // Botão pular
  const btnPular = document.querySelector('a.btn-outline');
  if (btnPular) {
    btnPular.addEventListener('click', e => {
      e.preventDefault();
      window.location.href = 'home.html';
    });
  }
}

// Defaults de meta por preset
const PRESET_DEFAULTS = {
  'alcool':              { tipoMeta: 'abstinencia', valorMeta: 30  },
  'tabaco':              { tipoMeta: 'abstinencia', valorMeta: 30  },
  'cocaina':             { tipoMeta: 'abstinencia', valorMeta: 90  },
  'maconha':             { tipoMeta: 'abstinencia', valorMeta: 30  },
  'redes-sociais':       { tipoMeta: 'limite',      valorMeta: 2   },
  'jogos':               { tipoMeta: 'limite',      valorMeta: 1   },
  'pornografia':         { tipoMeta: 'abstinencia', valorMeta: 30  },
  'apostas':             { tipoMeta: 'abstinencia', valorMeta: 60  },
  'compras-compulsivas': { tipoMeta: 'abstinencia', valorMeta: 30  },
  'acucar':              { tipoMeta: 'reducao',      valorMeta: 7   },
  'personalizado':       { tipoMeta: 'abstinencia', valorMeta: 30  },
};

// Chamada quando um tipo de vício é selecionado (onboarding e adicionar-vicio)
window.atualizarDefaultsPreset = function(presetId, prefixo) {
  const defs = PRESET_DEFAULTS[presetId] || PRESET_DEFAULTS['personalizado'];
  const preset = getPreset(presetId);

  // Atualizar meta tabs
  const metaTabs = document.querySelectorAll(prefixo === 'auth' ? '.meta-tab' : '.meta-tab-app');
  const tiposIdx = { abstinencia: 0, reducao: 1, limite: 2 };
  metaTabs.forEach((t, i) => t.classList.toggle('active', i === (tiposIdx[defs.tipoMeta] ?? 0)));

  // Atualizar valor
  const numInput = document.querySelector(prefixo === 'auth' ? '.meta-input-row input' : 'input[type="number"]:not(.gasto-valor)');
  if (numInput) numInput.value = defs.valorMeta;

  // Atualizar unidade
  const unidadeEl = document.getElementById(prefixo === 'auth' ? 'meta-unidade' : 'meta-unidade-app');
  if (unidadeEl) {
    if (defs.tipoMeta === 'limite') unidadeEl.textContent = 'horas por dia (limite)';
    else if (defs.tipoMeta === 'reducao') unidadeEl.textContent = 'vezes por semana (máximo)';
    else unidadeEl.textContent = 'dias consecutivos';
  }
  const hintEl = document.getElementById(prefixo === 'auth' ? 'meta-hint' : 'meta-hint-app');
  if (hintEl) {
    if (defs.tipoMeta === 'limite') hintEl.textContent = 'Objetivo: não ultrapassar ' + defs.valorMeta + ' hora(s) por dia. Cada dia dentro do limite conta.';
    else if (defs.tipoMeta === 'reducao') hintEl.textContent = 'Objetivo: consumir no máximo ' + defs.valorMeta + ' vezes por semana, reduzindo progressivamente.';
    else hintEl.textContent = 'Objetivo: ficar ' + defs.valorMeta + ' dias sem consumir. Após atingir, uma nova meta será sugerida.';
  }
  // Sincroniza a função inline de hint se existir (onboarding/adicionar-vicio)
  if (typeof atualizarHint === 'function') setTimeout(atualizarHint, 0);
  if (typeof atualizarHintApp === 'function') setTimeout(atualizarHintApp, 0);

  // Atualizar gasto default
  const temGasto = preset.temGastoPadrao;
  const gastoBtns = document.querySelectorAll('.gasto-opc-btn');
  gastoBtns.forEach(b => b.classList.toggle('selected', b.dataset.gasto === (temGasto ? 'sim' : 'nao')));
  const gastoDetalhes = document.getElementById('gasto-detalhes');
  if (gastoDetalhes) gastoDetalhes.style.display = temGasto ? 'block' : 'none';
};

function salvarVicioOnboarding() {
  const usuario = CYLA.getUsuarioAtual();
  if (!usuario) { window.location.href = 'login.html'; return; }

  // Pegar vício selecionado
  const tipoBtnSel  = document.querySelector('[data-preset].selected');
  const presetId    = tipoBtnSel?.dataset?.preset || 'personalizado';
  const nomeBotao   = tipoBtnSel?.textContent?.trim() || null;
  const customInput = document.querySelector('.custom-vicio input');
  const nomeCustom  = customInput?.value?.trim() || null;

  // Meta — busca apenas dentro do container de meta (evita pegar botões de gasto)
  const metaContainer = document.querySelector('.meta-tabs');
  const metaTabAtiva = metaContainer?.querySelector('.meta-tab.active');
  const tipoMeta = metaTabAtiva ? ['abstinencia','reducao','limite'][
    [...(metaContainer?.querySelectorAll('.meta-tab') || [])].indexOf(metaTabAtiva)
  ] : 'abstinencia';
  const valorMeta = parseInt(document.querySelector('.meta-input-row input')?.value || 30);

  // Modo
  const modoSel = document.querySelector('.modo-option.selected');
  const modos = [...document.querySelectorAll('.modo-option')];
  const modoControle = modos.indexOf(modoSel) === 0 ? 'parar' : 'gradual';

  // Privacidade
  const toggles = document.querySelectorAll('.toggle');
  const visivelAmigos = toggles[1]?.classList.contains('on') ?? false;

  const preset = getPreset(presetId);

  if (CYLA.vicioJaExiste(usuario.id, presetId)) {
    if (!confirm('Você já tem "' + (preset.nome || nomeBotao) + '" na lista. Adicionar mesmo assim?')) return;
  }

  const gasto = coletarGasto('auth');

  const resultadoVicio = CYLA.createVicio(usuario.id, presetId, {
    nome: nomeCustom || preset.nome || nomeBotao,
    tipoMeta,
    valorMeta,
    modoControle,
    gasto,
    visivelAmigos,
  });

  if (resultadoVicio?.erro) {
    alert(resultadoVicio.erro);
    return;
  }
  window.location.href = 'home.html';
}

// ── HOME ─────────────────────────────────────────────────────
function initHome() {
  const usuario = CYLA.getUsuarioAtual();

  // Sidebar - nome e avatar
  renderSidebar(usuario);

  // Saudação
  setText('.greeting-hi', getSaudacao() + ',');
  setText('.greeting-name', usuario.nome);

  // Vícios do usuário
  const vicios = CYLA.getVicios(usuario.id);

  // Streak pill - vício com maior sequência
  let melhorSeq = 0, melhorVicio = null;
  vicios.forEach(v => {
    const seq = CYLA.getSequenciaAtual(usuario.id, v.id);
    if (seq > melhorSeq) { melhorSeq = seq; melhorVicio = v; }
  });
  if (melhorVicio && melhorSeq > 0) {
    setText('.streak-pill span', `${diasLabel(melhorSeq)} - ${melhorVicio.nome}`);
  } else if (vicios.length > 0) {
    setText('.streak-pill span', 'Sem sequência ativa');
  } else {
    setText('.streak-pill span', 'Nenhum hábito cadastrado');
  }

  // Métricas (30d)
  let economiaMes = 0, conquistasMes = 0, sucessoMes = 0, recaidasMes = 0;
  vicios.forEach(v => {
    economiaMes    += CYLA.getEconomia(usuario.id, v.id, '30d');
    recaidasMes    += CYLA.getRecaidas(usuario.id, v.id, '30d');
  });
  conquistasMes = CYLA.getConquistas(usuario.id).length;
  if (vicios.length > 0) {
    const taxas = vicios.map(v => CYLA.getTaxaSucesso(usuario.id, v.id, '30d'));
    sucessoMes = Math.round(taxas.reduce((a,b) => a+b, 0) / taxas.length);
  }

  // Métricas — usa data-metric para evitar quebra por reordenação de HTML
  // Métricas — usa data-metric diretamente no .metric-val
  const setMetric = (sel, val) => { const el = document.querySelector(sel); if (el) el.innerHTML = val; };
  setMetric('.metric-val[data-metric="economia"]',    formatBRL(economiaMes));
  setMetric('.metric-val[data-metric="conquistas"]',  `${conquistasMes}`);
  setMetric('.metric-val[data-metric="sucesso"]',     `${sucessoMes}<span class="metric-unit">%</span>`);
  setMetric('.metric-val[data-metric="recaidas"]',    `${recaidasMes}`);

  // Vícios grid
  const viciosGrid = document.querySelector('.vicios-grid');
  if (viciosGrid) {
    if (vicios.length === 0) {
      viciosGrid.innerHTML = `
        <div style="grid-column:span 2;text-align:center;padding:24px;color:var(--text-tertiary);font-size:13px;">
          Nenhum vício cadastrado ainda.
          <br><a href="adicionar-vicio.html" style="color:var(--green-light);margin-top:8px;display:inline-block;">Adicionar vício</a>
        </div>`;
    } else {
      viciosGrid.innerHTML = vicios.map((v, i) => {
        const seq = CYLA.getSequenciaAtual(usuario.id, v.id);
        let pct = 0;
        if (v.tipoMeta === 'abstinencia') {
          pct = v.valorMeta > 0 ? Math.min(100, Math.round((seq / v.valorMeta) * 100)) : 0;
        } else if (v.tipoMeta === 'reducao' || v.tipoMeta === 'limite') {
          // Para limite/redução: % de dias dentro do limite nos últimos 30d
          const total = CYLA.getRegistros(usuario.id, { vicioId: v.id,
            dataInicio: (function(){ const d=new Date(); const h=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); const p=new Date(h+'T00:00:00'); p.setDate(p.getDate()-29); return p.getFullYear()+'-'+String(p.getMonth()+1).padStart(2,'0')+'-'+String(p.getDate()).padStart(2,'0'); })()
          }).length;
          const ok = CYLA.getDiasResistidos(usuario.id, v.id, '30d');
          pct = total > 0 ? Math.round((ok / total) * 100) : 0;
        }
        return `
          <div class="vicio-card">
            <div class="vicio-header">
              <div class="vicio-dot" style="background:${v.cor || corVicio(i)};"></div>
              <div class="vicio-name">${esc(v.nome)}</div>
              <div class="vicio-meta">${metaLabel(v)}</div>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width:${pct}%;background:${v.cor || corVicio(i)};"></div>
            </div>
            <div class="progress-labels">
              <span>${diasLabel(seq)}</span>
              <span class="pct" style="color:${v.cor || corVicio(i)};">${pct}%</span>
            </div>
          </div>`;
      }).join('');
    }
  }

  // Ranking
  renderRankingHome(usuario);

  // Conquistas recentes
  renderConquistasHome(usuario, vicios);
}

function renderRankingHome(usuario) {
  const ranking = CYLA.getRanking(usuario.id);
  const container = document.querySelector('.grid-2 .cyla-card');
  if (!container) return;
  const cardLabel = container.querySelector('.card-label');
  if (!cardLabel || !cardLabel.textContent.includes('Ranking')) return;

  const rows = ranking.slice(0, 3).map((item, i) => {
    const medalhas = ['var(--amber-darker)', 'var(--green-darkest)', 'var(--bg-hover)'];
    const textCores = ['var(--amber-light)', 'var(--green-light)', 'var(--text-muted)'];
    const youTag = item.ehVoce ? '<span class="you-tag">você</span>' : '';
    return `
      <div class="rank-row">
        <div class="rank-num">${item.posicao}</div>
        <div class="rank-avatar" style="background:${medalhas[i]};color:${textCores[i]};">${avatarLetra(item.usuario.nome)}</div>
        <div class="rank-name">${item.usuario.nome} ${youTag}</div>
        <div class="rank-seq">${diasLabel(item.sequencia)}</div>
      </div>`;
  }).join('');

  // Substituir apenas as rank-rows
  const rankRows = container.querySelectorAll('.rank-row');
  rankRows.forEach(r => r.remove());
  cardLabel.insertAdjacentHTML('afterend', rows);
}

function renderConquistasHome(usuario, vicios) {
  const containers = document.querySelectorAll('.grid-2 .cyla-card');
  let conquistasCard = null;
  containers.forEach(c => {
    if (c.querySelector('.card-label')?.textContent.includes('Conquistas')) {
      conquistasCard = c;
    }
  });
  if (!conquistasCard) return;

  let todasConquistas = [];
  vicios.forEach(v => {
    const lista = CYLA.getConquistasComStatus(usuario.id, v.id);
    lista.forEach(c => todasConquistas.push({ ...c, vicioNome: v.nome, cor: v.cor }));
  });

  // Ordenar: desbloqueadas primeiro, depois por dias restantes
  todasConquistas.sort((a, b) => {
    if (a.desbloqueada && !b.desbloqueada) return -1;
    if (!a.desbloqueada && b.desbloqueada) return 1;
    return a.diasRestantes - b.diasRestantes;
  });

  const mostrar = todasConquistas.slice(0, 3);
  const icones = ['ti-star','ti-bolt','ti-trophy'];

  const label = conquistasCard.querySelector('.card-label');
  const rows = conquistasCard.querySelectorAll('.conquest-row');
  rows.forEach(r => r.remove());

  if (mostrar.length === 0) {
    label.insertAdjacentHTML('afterend',
      `<p style="font-size:13px;color:var(--text-tertiary);padding:8px 0;">Nenhuma conquista ainda.</p>`);
    return;
  }

  mostrar.forEach((c, i) => {
    const icone = c.icone ? `ti-${c.icone.replace('ti-','')}` : icones[i] || 'ti-star';
    const bg   = c.desbloqueada ? 'var(--amber-darker)' : 'var(--bg-hover)';
    const cor  = c.desbloqueada ? 'var(--amber-main)'   : 'var(--text-muted)';
    const badge = c.desbloqueada
      ? `<span class="conquest-badge done">Conquistado</span>`
      : `<span class="conquest-badge pending">Em ${diasLabel(c.diasRestantes)}</span>`;
    label.insertAdjacentHTML('beforeend', `
      <div class="conquest-row">
        <div class="conquest-icon" style="background:${bg};"><i class="ti ${icone}" style="color:${cor};"></i></div>
        <div class="conquest-info">
          <div class="conquest-name">${c.titulo}</div>
          <div class="conquest-desc">${c.descricao}</div>
        </div>
        ${badge}
      </div>`);
  });
}

// ── PROGRESSO ────────────────────────────────────────────────
let _periodoAtual  = '30d';
let _vicioAtualId  = null;
let _viewAtual     = 'dados';  // 'dados' | 'historico'
let _calAno        = new Date().getFullYear();
let _calMes        = new Date().getMonth() + 1; // 1-12

function switchView(view) {
  _viewAtual = view;
  document.getElementById('tab-dados').classList.toggle('active', view === 'dados');
  document.getElementById('tab-historico').classList.toggle('active', view === 'historico');
  document.getElementById('dados-section').style.display     = view === 'dados'     ? '' : 'none';
  document.getElementById('historico-section').style.display = view === 'historico' ? '' : 'none';
  document.getElementById('period-tabs-wrap').style.display  = view === 'dados'     ? '' : 'none';

  if (view === 'historico') {
    const usuario = CYLA.getUsuarioAtual();
    renderCalendario(usuario);
  }
}

function navMes(delta) {
  _calMes += delta;
  if (_calMes > 12) { _calMes = 1;  _calAno++; }
  if (_calMes < 1)  { _calMes = 12; _calAno--; }
  const usuario = CYLA.getUsuarioAtual();
  renderCalendario(usuario);
}

function renderCalendario(usuario) {
  const mesesPt = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho',
                   'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  document.getElementById('cal-mes-label').textContent =
    `${mesesPt[_calMes - 1]} ${_calAno}`;

  // Pega o vício ativo (ignora "todos")
  const vicioId = _vicioAtualId === 'todos' ? null :
    (CYLA.getVicios(usuario.id)[0]?.id || null);
  const vicioIdReal = _vicioAtualId !== 'todos' ? _vicioAtualId : vicioId;

  if (!vicioIdReal) {
    document.getElementById('cal-grid').innerHTML =
      '<p style="grid-column:span 7;color:var(--text-tertiary);font-size:13px;padding:16px 0;text-align:center;">Selecione um vício para ver o histórico.</p>';
    return;
  }

  const dias = CYLA.getCalendarioMes(usuario.id, vicioIdReal, _calAno, _calMes);
  const _d = new Date();
  const hoje = _d.getFullYear()+'-'+String(_d.getMonth()+1).padStart(2,'0')+'-'+String(_d.getDate()).padStart(2,'0');

  // Calcular offset (dia da semana do dia 1: 0=Dom)
  const offset = new Date(`${_calAno}-${String(_calMes).padStart(2,'0')}-01T00:00:00`).getDay(); // T00:00:00 força hora local

  let html = '';
  // Placeholders antes do dia 1
  for (let i = 0; i < offset; i++) {
    html += '<div class="cal-day-placeholder"></div>';
  }

  dias.forEach(d => {
    let cls = 'cal-day';
    if (d.futuro)          cls += ' cal-day-futuro';
    else if (!d.temRegistro) cls += ' cal-day-vazio';
    else if (d.resultado === 'resisti') cls += ' cal-day-resisti';
    else                   cls += ' cal-day-recai';
    if (d.data === hoje)   cls += ' cal-day-hoje';
    if (d.editavel && d.temRegistro) cls += ' cal-day-editavel';

    const onclick = d.futuro
      ? ''
      : `onclick="abrirDiaCal('${d.data}','${vicioIdReal}')"`;

    html += `<div class="${cls}" ${onclick}>${d.dia}</div>`;
  });

  document.getElementById('cal-grid').innerHTML = html;
}

function abrirDiaCal(data, vicioId) {
  const usuario  = CYLA.getUsuarioAtual();
  const reg      = CYLA.getRegistroDoDia(usuario.id, vicioId, data);
  const editavel = CYLA.registroEditavel(data);
  const vicio    = CYLA.getVicio(vicioId);

  const modal     = document.getElementById('cal-modal');
  const dataLabel = document.getElementById('cal-modal-data');
  const body      = document.getElementById('cal-modal-body');
  const actions   = document.getElementById('cal-modal-actions');

  // Formatar data
  const [ano, mes, dia] = data.split('-');
  const mesesPt = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
  dataLabel.textContent = `${parseInt(dia)} de ${mesesPt[parseInt(mes)-1]} de ${ano}`;

  if (!reg) {
    // Sem registro — oferecer registrar
    body.innerHTML = `
      <p style="font-size:13px;color:var(--text-tertiary);margin-bottom:12px;">
        Nenhum registro para este dia.
      </p>`;
    actions.innerHTML = `
      <a href="registro.html?vicioId=${vicioId}&data=${data}" class="cal-btn-primary" style="display:block;text-align:center;padding:10px;border-radius:var(--radius-md);font-size:13px;font-weight:500;color:white;text-decoration:none;background:var(--green-main);">
        <i class="ti ti-plus" style="margin-right:4px;"></i> Registrar este dia
      </a>
      <button class="cal-btn-secondary" onclick="fecharModal()" style="background:var(--bg-card2);color:var(--text-secondary);border:1px solid var(--bg-border);border-radius:var(--radius-md);font-size:13px;font-weight:500;cursor:pointer;padding:10px;font-family:var(--font-main);">Fechar</button>`;
  } else {
    // Com registro — mostrar dados
    const intensidadePt = { baixa:'Baixa', media:'Média', alta:'Alta', muito_alta:'Muito alta' };
    const humorPt       = { mal:'Mal', neutro:'Neutro', bom:'Bom', otimo:'Ótimo' };
    const badgeCls      = reg.resultado === 'resisti' ? 'resisti' : 'recai';
    const badgeLabel    = reg.resultado === 'resisti' ? 'Resisti' : 'Recaí';
    const editadoInfo   = reg.editadoEm
      ? `<span style="font-size:10px;color:var(--text-muted);">(editado)</span>` : '';

    body.innerHTML = `
      <div class="cal-modal-row">
        <span class="cal-modal-label">Resultado</span>
        <span class="cal-modal-badge ${badgeCls}">${badgeLabel}</span> ${editadoInfo}
      </div>
      <div class="cal-modal-row">
        <span class="cal-modal-label">Intensidade</span>
        <span class="cal-modal-value">${intensidadePt[reg.intensidade] || reg.intensidade}</span>
      </div>
      ${reg.gatilhos?.length ? `
      <div class="cal-modal-row">
        <span class="cal-modal-label">Gatilhos</span>
        <span class="cal-modal-value">${reg.gatilhos.join(', ')}</span>
      </div>` : ''}
      <div class="cal-modal-row">
        <span class="cal-modal-label">Humor</span>
        <span class="cal-modal-value">${humorPt[reg.humor] || reg.humor}</span>
      </div>
      ${reg.anotacao ? `
      <div class="cal-modal-row" style="flex-direction:column;align-items:flex-start;gap:4px;">
        <span class="cal-modal-label">Anotação</span>
        <span style="font-size:12px;color:var(--text-secondary);line-height:1.5;">${reg.anotacao}</span>
      </div>` : ''}`;

    if (editavel) {
      actions.innerHTML = `
        <a href="registro.html?vicioId=${vicioId}&data=${data}&editar=1" class="cal-btn-primary" style="display:block;text-align:center;padding:10px;border-radius:var(--radius-md);font-size:13px;font-weight:500;color:white;text-decoration:none;background:var(--green-main);">
          <i class="ti ti-pencil" style="margin-right:4px;"></i> Editar
        </a>
        <button class="cal-btn-secondary" onclick="fecharModal()" style="background:var(--bg-card2);color:var(--text-secondary);border:1px solid var(--bg-border);border-radius:var(--radius-md);font-size:13px;font-weight:500;cursor:pointer;padding:10px;font-family:var(--font-main);">Fechar</button>`;
    } else {
      actions.innerHTML = `
        <button class="cal-btn-secondary" onclick="fecharModal()" style="width:100%;background:var(--bg-card2);color:var(--text-secondary);border:1px solid var(--bg-border);border-radius:var(--radius-md);font-size:13px;font-weight:500;cursor:pointer;padding:10px;font-family:var(--font-main);">Fechar</button>`;
    }
  }

  modal.style.display = 'flex';
}

window.fecharModal = function() {
  document.getElementById('cal-modal').style.display = 'none';
};

// Fechar ao clicar fora do card
document.addEventListener('click', e => {
  const modal = document.getElementById('cal-modal');
  if (modal && e.target === modal) fecharModal();
});

function initProgresso() {
  const usuario = CYLA.getUsuarioAtual();
  renderSidebar(usuario);

  const vicios = CYLA.getVicios(usuario.id);
  if (!vicios.length) return;
  _vicioAtualId = vicios[0].id;

  // Montar abas de vícios
  const filterTabs = document.querySelector('.filter-tabs');
  if (filterTabs) {
    filterTabs.innerHTML = vicios.map((v, i) => `
      <div class="filter-tab${i===0?' active-v1':''}" data-vicio-id="${v.id}"
           style="${i===0?`background:var(--green-darkest);color:var(--green-light);border-color:var(--green-dark);`:''}"
           onclick="selecionarVicioProgresso(this, '${v.id}')">
        ${v.nome}
      </div>`).join('') +
      `<div class="filter-tab" data-vicio-id="todos" onclick="selecionarVicioProgresso(this,'todos')">Todos</div>`;
  }

  // Period tabs
  document.querySelectorAll('.period-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.period-tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      const map = { '7d':'7d', '30d':'30d', '3m':'3m' };
      _periodoAtual = map[btn.textContent.trim()] || '30d';
      renderProgresso(usuario);
    });
  });

  renderProgresso(usuario);
}

function selecionarVicioProgresso(btn, vicioId) {
  document.querySelectorAll('.filter-tab').forEach(t => {
    t.className = 'filter-tab';
    t.removeAttribute('style');
  });
  btn.classList.add('active');
  _vicioAtualId = vicioId;
  const usuario = CYLA.getUsuarioAtual();
  renderProgresso(usuario);
}

function renderProgresso(usuario) {
  const vicios = _vicioAtualId === 'todos'
    ? CYLA.getVicios(usuario.id)
    : [CYLA.getVicio(_vicioAtualId)].filter(Boolean);

  if (!vicios.length) return;
  const v = vicios[0]; // principal para gráfico

  // Gráfico
  const semanas = CYLA.getDadosGrafico(usuario.id, v.id, _periodoAtual);
  // Indicar qual vício está sendo exibido no gráfico quando em modo 'todos'
  const chartTitle = document.getElementById('chart-vicio-label');
  if (chartTitle) {
    chartTitle.textContent = _vicioAtualId === 'todos' && vicios.length > 1
      ? `(exibindo gráfico de ${v.nome})` : '';
  }
  const chartWrap = document.querySelector('.chart-wrap');
  const chartLegend = document.querySelector('.chart-legend');
  if (chartWrap) {
    if (_periodoAtual === '7d') {
      chartWrap.innerHTML = semanas.map(s => {
        const cor = s.resultado === 'resisti' ? 'var(--green-main)'
                  : s.resultado === 'recai'   ? 'var(--red-main)'
                  : 'var(--bg-card2)';
        const val = s.resultado === 'resisti' ? '✓' : s.resultado === 'recai' ? '✗' : '-';
        const valColor = s.resultado === 'resisti' ? 'var(--green-light)'
                       : s.resultado === 'recai'   ? 'var(--red-light)' : 'var(--text-muted)';
        const h = s.resultado ? '80%' : '20%';
        return `<div class="chart-col">
          <div class="chart-val" style="color:${valColor};">${val}</div>
          <div class="chart-bar-wrap"><div class="chart-bar" style="height:${h};background:${cor};border-radius:6px;opacity:${s.resultado ? 1 : 0.4};"></div></div>
          <div class="chart-day" style="${s.atual ? 'color:var(--text-primary);font-weight:600;' : ''}">${s.semana}</div>
        </div>`;
      }).join('');
      if (chartLegend) chartLegend.innerHTML = `
        <div style="display:flex;align-items:center;gap:6px;"><div class="legend-dot" style="background:var(--green-main);"></div><span class="legend-label">Resisti</span></div>
        <div style="display:flex;align-items:center;gap:6px;"><div class="legend-dot" style="background:var(--red-main);"></div><span class="legend-label">Recaí</span></div>
        <div style="display:flex;align-items:center;gap:6px;"><div class="legend-dot" style="background:var(--bg-card2);border:1px solid var(--bg-border);"></div><span class="legend-label">Sem registro</span></div>`;
    } else {
      const maxDias = Math.max(...semanas.map(s => s.dias), 1);
      chartWrap.innerHTML = semanas.map(s => `
        <div class="chart-col">
          <div class="chart-val${s.atual ? '' : ' muted'}">${s.dias}</div>
          <div class="chart-bar-wrap"><div class="chart-bar" style="height:${Math.round((s.dias/maxDias)*90)+5}%;background:${s.atual ? 'var(--green-main)' : 'var(--green-darker)'};"></div></div>
          <div class="chart-day">${s.semana}</div>
        </div>`).join('');
      if (chartLegend) chartLegend.innerHTML = `
        <div style="display:flex;align-items:center;gap:6px;"><div class="legend-dot" style="background:var(--green-main);"></div><span class="legend-label">Semana atual</span></div>
        <div style="display:flex;align-items:center;gap:6px;"><div class="legend-dot" style="background:var(--green-darker);"></div><span class="legend-label">Semanas anteriores</span></div>`;
    }
  }

  // Métricas
  let totalSeq = 0, totalRecorde = 0, totalEco = 0, totalSucesso = 0, totalRecaidas = 0;
  vicios.forEach(vic => {
    // Usa max em vez de soma — somar sequências de vícios diferentes é enganoso
    totalSeq      = Math.max(totalSeq, CYLA.getSequenciaAtual(usuario.id, vic.id));
    totalRecorde  = Math.max(totalRecorde, CYLA.getRecorde(usuario.id, vic.id));
    totalEco      += CYLA.getEconomia(usuario.id, vic.id, _periodoAtual);
    totalSucesso  += CYLA.getTaxaSucesso(usuario.id, vic.id, _periodoAtual);
    totalRecaidas += CYLA.getRecaidas(usuario.id, vic.id, _periodoAtual);
  });
  const mediaSucco = Math.round(totalSucesso / vicios.length);

  const metricCards = document.querySelectorAll('.grid-4 .cyla-card');
  if (metricCards[0]) {
    metricCards[0].querySelector('.metric-val').innerHTML =
      `${totalSeq} <span style="font-size:14px;color:var(--text-muted);">dias</span>`;
    const rec = metricCards[0].querySelector('.metric-record');
    if (rec) rec.textContent = `Recorde: ${diasLabel(totalRecorde)}`;
  }
  if (metricCards[1]) {
    metricCards[1].querySelector('.metric-val').innerHTML =
      `${mediaSucco}<span class="metric-unit">%</span>`;
  }
  if (metricCards[2]) {
    metricCards[2].querySelector('.metric-val').textContent = formatBRL(totalEco);
  }
  if (metricCards[3]) {
    metricCards[3].querySelector('.metric-val').textContent = totalRecaidas;
  }

  // Conquistas
  const conquistas = CYLA.getConquistasComStatus(usuario.id, v.id);
  const conquCard = document.querySelectorAll('.grid-2 .cyla-card')[0];
  if (conquCard) {
    const label = conquCard.querySelector('.card-label');
    conquCard.querySelectorAll('.conquest-row').forEach(r => r.remove());
    conquistas.slice(0, 3).forEach(c => {
      const cor   = c.cor || '#EF9F27';
      const bg    = c.desbloqueada ? cor + '22' : 'var(--bg-track)';
      const icCor = c.desbloqueada ? cor         : 'var(--text-muted)';
      const icone = c.icone || 'ti-star';
      const badge = c.desbloqueada
        ? `<span class="conquest-badge done">Conquistado</span>`
        : `<span class="conquest-badge pending">Em ${diasLabel(c.diasRestantes)}</span>`;
      label.insertAdjacentHTML('beforeend', `
        <div class="conquest-row">
          <div class="conquest-icon" style="background:${bg};"><i class="ti ${icone}" style="color:${icCor};"></i></div>
          <div class="conquest-info">
            <div class="conquest-name">${c.titulo}</div>
            <div class="conquest-desc">${c.descricao}</div>
          </div>
          ${badge}
        </div>`);
    });
  }

  // Gatilhos — fallback para período maior se sem recaídas no atual
  let gatilhos = CYLA.getGatilhos(usuario.id, v.id, _periodoAtual);
  let periodoGatilhos = _periodoAtual;
  if (!gatilhos.length && _periodoAtual !== '3m') {
    gatilhos = CYLA.getGatilhos(usuario.id, v.id, '3m');
    periodoGatilhos = '3m';
  }
  if (!gatilhos.length) {
    gatilhos = CYLA.getGatilhos(usuario.id, v.id, 'total');
    periodoGatilhos = 'total';
  }
  const gatiCard = document.querySelectorAll('.grid-2 .cyla-card')[1];
  if (gatiCard) {
    const label = gatiCard.querySelector('.card-label');
    gatiCard.querySelectorAll('.gatilho-row, .gatilho-info').forEach(r => r.remove());
    if (gatilhos.length) {
      const nota = periodoGatilhos !== _periodoAtual
        ? `<span style="font-size:10px;color:var(--text-muted);margin-left:6px;">(histórico geral)</span>`
        : '';
      label.innerHTML = `Principais gatilhos ${nota}`;
      const maxVezes = gatilhos[0]?.vezes || 1;
      gatilhos.forEach(g => {
        const pct = Math.round((g.vezes / maxVezes) * 100);
        label.insertAdjacentHTML('beforeend', `
          <div class="gatilho-row">
            <div class="gatilho-name">${g.nome}</div>
            <div class="gatilho-track"><div class="gatilho-fill" style="width:${pct}%;"></div></div>
            <div class="gatilho-count">${g.vezes}x</div>
          </div>`);
      });
    } else {
      label.innerHTML = 'Principais gatilhos';
      label.insertAdjacentHTML('beforeend',
        `<p class="gatilho-info" style="font-size:13px;color:var(--text-tertiary);padding:8px 0;">Nenhuma recaída registrada ainda. Continue assim!</p>`);
    }
  }

  // Insights
  const insights = getInsights(v);
  const insightCards = document.querySelectorAll('.insight-card');
  const cores = [
    { bg: 'var(--green-darkest)', cor: 'var(--green-light)', icone: 'ti-shield-check' },
    { bg: 'var(--purple-darker)', cor: 'var(--purple-light)', icone: 'ti-info-circle' },
    { bg: 'var(--amber-darker)',  cor: 'var(--amber-light)',  icone: 'ti-bulb'        },
    { bg: 'var(--blue-darker)',   cor: 'var(--blue-light)',   icone: 'ti-message'     },
  ];
  insightCards.forEach((card, i) => {
    const insight = insights[i];
    if (!insight) { card.style.display = 'none'; return; }
    const c = cores[i] || cores[0];
    card.innerHTML = `
      <div class="insight-icon" style="background:${c.bg};"><i class="ti ${c.icone}" style="color:${c.cor};"></i></div>
      <div>
        <div class="insight-title">${insight.titulo}</div>
        <div class="insight-text">${insight.texto}</div>
        <div class="insight-source">${insight.fonte}</div>
      </div>`;
  });

  // Título da seção de insights
  const insightLabel = document.querySelector('.card-label[style]');
  if (insightLabel) insightLabel.textContent = `Sobre ${v.nome.toLowerCase()}`;
}

// ── REGISTRO ─────────────────────────────────────────────────
let _vicioRegistroId  = null;
let _dataRegistro     = null;
let _modoEdicao       = false;

function initRegistro() {
  const usuario = CYLA.getUsuarioAtual();
  renderSidebar(usuario);

  const params  = new URLSearchParams(window.location.search);
  // Usa hora local (não UTC) para evitar bug em BRT às 21h+
  const _agora = new Date();
  const _hojeLocal = _agora.getFullYear() + '-' +
    String(_agora.getMonth() + 1).padStart(2, '0') + '-' +
    String(_agora.getDate()).padStart(2, '0');
  _dataRegistro = params.get('data') || _hojeLocal;
  const vicioIdParam = params.get('vicioId');
  _modoEdicao = !!params.get('editar');

  const vicios = CYLA.getVicios(usuario.id);
  if (!vicios.length) {
    document.querySelector('.page')?.insertAdjacentHTML('afterbegin',
      '<div style="padding:16px;color:var(--text-tertiary);font-size:13px;">Nenhum vício cadastrado. <a href="adicionar-vicio.html" style="color:var(--green-light);">Adicionar vício</a></div>');
    return;
  }

  _vicioRegistroId = vicioIdParam || vicios[0].id;

  // Montar abas de vícios
  const filterTabs = document.querySelector('.filter-tabs');
  if (filterTabs) {
    filterTabs.innerHTML = vicios.map((v, i) => {
      const ativo = v.id === _vicioRegistroId;
      const cls = ativo ? (i === 0 ? 'filter-tab active-v1' : 'filter-tab active-v2') : 'filter-tab';
      return `<div class="${cls}" onclick="selecionarVicioRegistro(this,'${v.id}')">${v.nome}</div>`;
    }).join('');
  }

  // Se editando, preencher dados existentes
  if (_modoEdicao) {
    const reg = CYLA.getRegistroDoDia(usuario.id, _vicioRegistroId, _dataRegistro);
    if (reg) preencherFormRegistro(reg);

    // Verificar editabilidade
    if (!CYLA.registroEditavel(_dataRegistro)) {
      const btn = document.querySelector('.btn-primary');
      if (btn) {
        btn.disabled = true;
        btn.style.opacity = '0.5';
        btn.innerHTML = '<i class="ti ti-lock"></i> Prazo de edição encerrado';
      }
    }
  }

  // Botão salvar
  const btnSalvar = document.getElementById('btn-salvar-registro') || document.querySelector('.btn-primary');
  if (btnSalvar) {
    btnSalvar.onclick = null; // remove inline onclick se houver
    btnSalvar.addEventListener('click', salvarRegistro);
  }
}

function selecionarVicioRegistro(btn, vicioId) {
  document.querySelectorAll('.filter-tab').forEach(t => t.className = 'filter-tab');
  btn.classList.add('active-v1');
  _vicioRegistroId = vicioId;

  // Limpar seleções do formulário ao trocar de vício
  document.querySelectorAll('.resultado-card').forEach(c => c.classList.remove('selected'));
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('selected'));
  const textarea = document.querySelector('.form-textarea');
  if (textarea) textarea.value = '';

  // Carregar registro existente do dia, se houver
  const usuario = CYLA.getUsuarioAtual();
  const reg = CYLA.getRegistroDoDia(usuario.id, vicioId, _dataRegistro);
  if (reg) preencherFormRegistro(reg);
}

function preencherFormRegistro(reg) {
  // Resultado
  document.querySelectorAll('.resultado-card').forEach(c => c.classList.remove('selected'));
  const card = document.querySelector(`.resultado-card.${reg.resultado}`);
  if (card) card.classList.add('selected');

  // Usa os mesmos pill-groups que salvarRegistro usa — mais robusto que :nth-child
  const pillGroups = document.querySelectorAll('.cyla-card .pill-group');

  // Intensidade (pill-group[0])
  if (pillGroups[0]) {
    const vals = ['baixa','media','alta','muito_alta'];
    pillGroups[0].querySelectorAll('.pill').forEach((p, i) =>
      p.classList.toggle('selected', vals[i] === reg.intensidade));
  }

  // Gatilhos (pill-group[1]) — restaura os gatilhos salvos
  if (pillGroups[1]) {
    pillGroups[1].querySelectorAll('.pill').forEach(p =>
      p.classList.toggle('selected', (reg.gatilhos || []).includes(p.textContent.trim())));
  }

  // Humor (pill-group[2])
  if (pillGroups[2]) {
    const vals = ['mal','neutro','bom','otimo'];
    pillGroups[2].querySelectorAll('.pill').forEach((p, i) =>
      p.classList.toggle('selected', vals[i] === reg.humor));
  }

  // Anotação
  const textarea = document.querySelector('.form-textarea');
  if (textarea) textarea.value = reg.anotacao || '';
}

function salvarRegistro() {
  const usuario = CYLA.getUsuarioAtual();

  // Resultado — exige seleção explícita
  const resultadoEl = document.querySelector('.resultado-card.selected');
  if (!resultadoEl) { alert('Selecione Resisti ou Recaí antes de salvar.'); return; }
  const resultado = resultadoEl.classList.contains('resisti') ? 'resisti' : 'recai';

  // Intensidade
  const intensidades = ['baixa','media','alta','muito_alta'];
  const pillsIntens = document.querySelectorAll('.cyla-card .pill-group');
  let intensidade = 'media';
  if (pillsIntens[0]) {
    [...pillsIntens[0].querySelectorAll('.pill')].forEach((p, i) => {
      if (p.classList.contains('selected')) intensidade = intensidades[i];
    });
  }

  // Gatilhos (múltipla seleção)
  const gatilhos = [];
  if (pillsIntens[1]) {
    [...pillsIntens[1].querySelectorAll('.pill.selected')].forEach(p => {
      if (!p.textContent.includes('outro')) gatilhos.push(p.textContent.trim());
    });
  }

  // Humor
  const humores = ['mal','neutro','bom','otimo'];
  let humor = 'neutro';
  if (pillsIntens[2]) {
    [...pillsIntens[2].querySelectorAll('.pill')].forEach((p, i) => {
      if (p.classList.contains('selected')) humor = humores[i];
    });
  }

  // Anotação
  const anotacao = document.querySelector('.form-textarea')?.value || '';

  const resultado2 = CYLA.salvarRegistro(usuario.id, _vicioRegistroId, _dataRegistro, {
    resultado, intensidade, gatilhos, humor, anotacao
  });

  if (resultado2?.erro) {
    alert(resultado2.erro);
    return;
  }

  window.location.href = 'home.html';
}

// ── AMIGOS ───────────────────────────────────────────────────
let _vicioFiltroAmigos = null; // null = geral

function initAmigos() {
  const usuario = CYLA.getUsuarioAtual();
  renderSidebar(usuario);

  // Montar abas de vícios dinamicamente
  const vicios = CYLA.getVicios(usuario.id);
  const filterTabs = document.querySelector('.filter-tabs');
  if (filterTabs) {
    filterTabs.innerHTML =
      `<div class="filter-tab active" onclick="filtrarAmigos(this, null)">Geral</div>` +
      vicios.map(v => {
        // Nome exibido: usa o preset (mais confiável que o nome custom do seed)
        const nomeExibir = getPreset(v.presetId)?.nome || v.nome || v.presetId;
        return `<div class="filter-tab" onclick="filtrarAmigos(this, '${v.id}')">${esc(nomeExibir)}</div>`;
      }).join('');
  }

  renderAmigos(usuario);

  // Solicitações
  renderSolicitacoes(usuario);

  // Privacidade
  inicializarTogglesPrivacidade(usuario);
}

window.filtrarAmigos = function(btn, vicioId) {
  document.querySelectorAll('.filter-tab').forEach(t => t.className = 'filter-tab');
  btn.classList.add('active');
  _vicioFiltroAmigos = vicioId;

  // Atualizar label do ranking com o filtro ativo
  const rankLabel = document.querySelector('.ranking-label') ||
                    document.querySelector('[class*="ranking"]');
  if (rankLabel) {
    rankLabel.textContent = vicioId ? `RANKING - ${btn.textContent.toUpperCase()}` : 'RANKING';
  }

  renderAmigos(CYLA.getUsuarioAtual());
};

function renderAmigos(usuario) {
  // Sem amigos: estado vazio
  const amigos = CYLA.getAmigos(usuario.id);
  let semAmigosMsg = document.getElementById('sem-amigos-msg');
  if (!semAmigosMsg) {
    semAmigosMsg = document.createElement('div');
    semAmigosMsg.id = 'sem-amigos-msg';
    semAmigosMsg.style.cssText = 'text-align:center;padding:36px 16px;color:var(--text-tertiary);font-size:13px;display:none;';
    semAmigosMsg.innerHTML =
      '<i class="ti ti-users" style="font-size:36px;display:block;margin-bottom:12px;opacity:0.35;"></i>' +
      '<div style="font-weight:500;margin-bottom:6px;color:var(--text-secondary);font-size:14px;">Nenhum amigo adicionado</div>' +
      '<div style="margin-bottom:16px;">Convide amigos para competir no ranking!</div>' +
      '<a href="convidar-amigos.html" style="display:inline-block;padding:8px 18px;background:var(--green-darkest);color:var(--green-light);border-radius:var(--radius-md);font-size:13px;font-weight:500;text-decoration:none;">Convidar amigos</a>';
    const podium = document.querySelector('.podium');
    if (podium) podium.insertAdjacentElement('beforebegin', semAmigosMsg);
  }

  // Banner de privacidade
  const aparece = usuario.aparecerNoRanking !== false;
  let msgBanner = document.getElementById('ranking-oculto-msg');
  if (!msgBanner) {
    msgBanner = document.createElement('div');
    msgBanner.id = 'ranking-oculto-msg';
    msgBanner.style.cssText = 'background:rgba(216,90,48,0.08);border:1px solid rgba(216,90,48,0.3);border-radius:var(--radius-md);padding:10px 14px;font-size:13px;color:var(--red-light);display:flex;align-items:center;gap:8px;margin-bottom:8px;';
    msgBanner.innerHTML = '<i class="ti ti-eye-off" style="font-size:16px;flex-shrink:0;"></i><span>Você não está aparecendo no ranking dos seus amigos. Ative em Meu perfil para participar.</span>';
    const fTabs = document.querySelector('.filter-tabs');
    if (fTabs) fTabs.insertAdjacentElement('afterend', msgBanner);
  }
  msgBanner.style.display = aparece ? 'none' : 'flex';

  const podium = document.querySelector('.podium');
  const listaEl = document.getElementById('ranking-lista');
  const posCard = document.querySelector('.position-card');

  if (amigos.length === 0) {
    semAmigosMsg.style.display = 'block';
    if (podium)  podium.style.display  = 'none';
    if (listaEl) listaEl.style.display = 'none';
    if (posCard) posCard.style.display = 'none';
    return;
  }

  semAmigosMsg.style.display = 'none';
  if (podium)  podium.style.display  = '';
  if (listaEl) listaEl.style.display = '';
  if (posCard) posCard.style.display = '';

  const ranking = CYLA.getRanking(usuario.id, _vicioFiltroAmigos);
  // Se o filtro resultou em ranking com só o próprio usuário (ninguém mais tem o vício)
  const rankingComAmigos = ranking.filter(r => !r.ehVoce);
  const filtroSemParticipantes = _vicioFiltroAmigos && rankingComAmigos.length === 0;
  if (filtroSemParticipantes) {
    // Mostrar mensagem: nenhum amigo tem esse vício
    let msgFiltroVazio = document.getElementById('filtro-sem-amigos');
    if (!msgFiltroVazio) {
      msgFiltroVazio = document.createElement('div');
      msgFiltroVazio.id = 'filtro-sem-amigos';
      msgFiltroVazio.style.cssText = 'text-align:center;padding:24px 16px;color:var(--text-tertiary);font-size:13px;';
      msgFiltroVazio.innerHTML = '<i class="ti ti-filter-off" style="font-size:28px;display:block;margin-bottom:10px;opacity:0.4;"></i>' +
        '<div>Nenhum amigo monitora este vício.</div>';
      if (podium) podium.insertAdjacentElement('beforebegin', msgFiltroVazio);
    }
    msgFiltroVazio.style.display = 'block';
    if (podium)  podium.style.display  = 'none';
    if (listaEl) listaEl.style.display = 'none';
    if (posCard) posCard.style.display = 'none';
    renderSuaPosicao(ranking, usuario.id); // só mostra posição do próprio
    return;
  }
  // Esconder msg se existir
  const msgFiltroVazio2 = document.getElementById('filtro-sem-amigos');
  if (msgFiltroVazio2) msgFiltroVazio2.style.display = 'none';
  if (podium)  podium.style.display  = '';
  if (listaEl) listaEl.style.display = '';
  if (posCard) posCard.style.display = '';
  renderPodio(ranking);
  renderListaRanking(ranking);
  renderSuaPosicao(ranking, usuario.id);
  inicializarTogglesPrivacidade(usuario); // atualiza toggle de vício conforme filtro
  renderListaAmigos(usuario);
}

function renderPodio(ranking) {
  const top3 = ranking.slice(0, 3);
  const podioItems = document.querySelectorAll('.podium-item');

  // Esconder TODOS — slots sem participante ficam invisíveis (sem conteúdo antigo)
  podioItems.forEach(el => el.style.display = 'none');

  const ordemPodio = [1, 0, 2]; // 2º, 1º, 3º (visual do pódio)
  ordemPodio.forEach((rankIdx, podioIdx) => {
    const item = top3[rankIdx];
    const el   = podioItems[podioIdx];
    if (!item || !el) return; // sem participante: permanece oculto
    el.style.display = '';
    el.querySelector('.podium-name').textContent   = item.ehVoce ? 'Você' : esc(item.usuario.nome);
    el.querySelector('.podium-seq').textContent    = diasLabel(item.sequencia);
    el.querySelector('.podium-avatar').textContent = avatarLetra(item.usuario.nome);
    const nameEl = el.querySelector('.podium-name');
    nameEl.removeAttribute('title');
    if (item.vicio) nameEl.title = item.vicio.nome;
  });
}

function renderListaRanking(ranking) {
  const lista = document.getElementById('ranking-lista') || document.querySelector('[style*="margin-top:8px"]');
  if (!lista) return;
  const abaixo = ranking.slice(3);
  lista.innerHTML = abaixo.map(item => `
    <div class="rank-row">
      <div class="rank-num">${item.posicao}</div>
      <div class="rank-avatar" style="background:var(--bg-hover);color:var(--text-secondary);">${avatarLetra(item.usuario.nome)}</div>
      <div class="rank-name">${esc(item.usuario.nome)}${item.ehVoce ? ' <span class="you-tag">você</span>' : ''}</div>
      <div class="rank-seq">${diasLabel(item.sequencia)}</div>
    </div>`).join('');
}

function renderSuaPosicao(ranking, usuarioId) {
  const minha = ranking.find(r => r.ehVoce);
  if (!minha) return;
  setText('.position-val', `${minha.posicao}º lugar`);
  const proximo = ranking[minha.posicao - 2];
  if (proximo && minha.posicao > 1) {
    const diff = proximo.sequencia - minha.sequencia;
    setText('.position-right-val', diasLabel(diff));
  } else {
    setText('.position-right-label', 'Você está em 1º!');
    setText('.position-right-val', '');
  }
}

function renderSolicitacoes(usuario) {
  const pendentes = CYLA.getSolicitacoesPendentes(usuario.id);
  const card = document.getElementById('solicitacoes-card');
  if (!card) return;
  const container = card.querySelector('.solicitation-row');

  // Limpar mensagens e linhas antigas antes de renderizar
  card.querySelectorAll('.solicitation-row, .sol-vazia').forEach(el => el.remove());

  if (!pendentes.length) {
    card.querySelector('.card-label').insertAdjacentHTML('afterend',
      `<p class="sol-vazia" style="font-size:13px;color:var(--text-tertiary);padding:8px 0;">Nenhuma solicitação pendente.</p>`);
    if (container) container.style.display = 'none';
    return;
  }

  const label = card.querySelector('.card-label');
  card.querySelectorAll('.solicitation-row').forEach(r => r.remove());
  pendentes.forEach(u => {
    label.insertAdjacentHTML('beforeend', `
      <div class="solicitation-row">
        <div class="solicitation-avatar">${avatarLetra(u.nome)}</div>
        <div class="solicitation-name">${esc(u.nome)}</div>
        <div class="solicitation-btns">
          <button class="sol-accept" onclick="aceitarAmigo('${u.id}')">Aceitar</button>
          <button class="sol-reject" onclick="recusarAmigo('${u.id}')">Recusar</button>
        </div>
      </div>`);
  });
}

function aceitarAmigo(remetenteId) {
  const usuario = CYLA.getUsuarioAtual();
  CYLA.aceitarSolicitacao(usuario.id, remetenteId);
  initAmigos();
}

function recusarAmigo(remetenteId) {
  const usuario = CYLA.getUsuarioAtual();
  CYLA.recusarSolicitacao(usuario.id, remetenteId);
  initAmigos();
}

function inicializarTogglesPrivacidade(usuario) {
  // Toggle 1: Aparecer no ranking (via ID — mais robusto)
  const t1 = document.getElementById('toggle-aparecer');
  if (t1) {
    const aparece = usuario.aparecerNoRanking !== false;
    t1.classList.toggle('on', aparece);
    t1.onclick = () => {
      const ativo = t1.classList.toggle('on');
      CYLA.updateUsuario(usuario.id, { aparecerNoRanking: ativo });
      const banner = document.getElementById('ranking-oculto-msg');
      if (banner) banner.style.display = ativo ? 'none' : 'flex';
    };
  }

  // Toggle 2: Aparecer no ranking deste vício (só visível quando filtro ativo)
  const rowVicio  = document.getElementById('row-visivel-vicio');
  const t2        = document.getElementById('toggle-visivel-vicio');
  const labelT2   = document.getElementById('label-visivel-vicio');

  if (!rowVicio || !t2) return;

  if (!_vicioFiltroAmigos) {
    // Geral: esconder toggle de vício
    rowVicio.style.display = 'none';
    return;
  }

  // O _vicioFiltroAmigos JÁ É o ID do vício do usuário (tabs geradas a partir dos vicios dele)
  const meuVicio = CYLA.getVicio(_vicioFiltroAmigos);

  if (!meuVicio || meuVicio.usuarioId !== usuario.id) {
    // Segurança: não é vício do usuário logado
    rowVicio.style.display = 'none';
    return;
  }

  // Mostrar toggle com label do vício específico
  rowVicio.style.display = '';
  if (labelT2) labelT2.textContent = 'Aparecer no ranking de ' + (meuVicio.nome || meuVicio.presetId);
  const isVisivel = meuVicio.visivelAmigos !== false;
  t2.classList.toggle('on', isVisivel);

  // Mensagem quando o tipo está oculto
  let msgVicioOculto = document.getElementById('vicio-oculto-msg');
  if (!msgVicioOculto) {
    msgVicioOculto = document.createElement('p');
    msgVicioOculto.id = 'vicio-oculto-msg';
    msgVicioOculto.style.cssText = 'font-size:12px;color:var(--text-muted);margin:4px 0 0 0;padding:6px 10px;background:rgba(255,255,255,0.03);border-radius:var(--radius-sm);border-left:2px solid var(--bg-border);';
    rowVicio.insertAdjacentElement('afterend', msgVicioOculto);
  }
  msgVicioOculto.textContent = isVisivel
    ? ''
    : 'Seus amigos te veem no ranking, mas não sabem qual vício você está monitorando.';
  msgVicioOculto.style.display = isVisivel ? 'none' : 'block';

  t2.onclick = () => {
    const ativo = t2.classList.toggle('on');
    CYLA.updateVicio(meuVicio.id, { visivelAmigos: ativo });
    msgVicioOculto.textContent = ativo
      ? ''
      : 'Seus amigos te veem no ranking, mas não sabem qual vício você está monitorando.';
    msgVicioOculto.style.display = ativo ? 'none' : 'block';
    renderAmigos(usuario);
  };
}

function renderListaAmigos(usuario) {
  const card = document.getElementById('lista-amigos-card');
  if (!card) return;

  const amigos = CYLA.getAmigosLista(usuario.id);
  const label  = card.querySelector('.card-label');
  card.querySelectorAll('.amigo-row, .amigos-vazio').forEach(el => el.remove());

  if (!amigos.length) {
    label.insertAdjacentHTML('afterend',
      `<p class="amigos-vazio" style="font-size:13px;color:var(--text-tertiary);padding:8px 0;">
        Nenhum amigo ainda. <a href="convidar-amigos.html" style="color:var(--green-light);">Convidar</a>
      </p>`);
    return;
  }

  amigos.forEach(amigo => {
    const seq = Math.max(...CYLA.getVicios(amigo.id).map(v => CYLA.getSequenciaAtual(amigo.id, v.id)), 0);
    label.insertAdjacentHTML('beforeend', `
      <div class="amigo-row" style="display:flex;align-items:center;gap:10px;padding:10px 0;border-top:1px solid var(--bg-border);">
        <div style="width:36px;height:36px;border-radius:50%;background:var(--bg-hover);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600;color:var(--text-secondary);flex-shrink:0;">${avatarLetra(amigo.nome)}</div>
        <div style="flex:1;min-width:0;">
          <div style="font-size:13px;font-weight:500;color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${esc(amigo.nome)}</div>
          <div style="font-size:11px;color:var(--text-muted);">${exibirUsername(amigo.username)} · ${diasLabel(seq)} de sequência</div>
        </div>
        <div style="display:flex;gap:6px;flex-shrink:0;">
          <button onclick="confirmarRemoverAmigo('${amigo.id}', '${esc(amigo.nome)}')"
            style="padding:5px 10px;border-radius:var(--radius-sm);border:1px solid var(--bg-border);background:none;color:var(--text-secondary);font-size:11px;cursor:pointer;font-family:var(--font-main);">
            <i class="ti ti-user-minus"></i> Remover
          </button>
          <button onclick="confirmarBloquearAmigo('${amigo.id}', '${esc(amigo.nome)}')"
            style="padding:5px 10px;border-radius:var(--radius-sm);border:1px solid rgba(216,90,48,0.3);background:none;color:var(--red-light);font-size:11px;cursor:pointer;font-family:var(--font-main);">
            <i class="ti ti-ban"></i> Bloquear
          </button>
        </div>
      </div>`);
  });
}

window.confirmarRemoverAmigo = function(amigoId, nome) {
  if (!confirm(`Remover ${nome} da sua lista de amigos?`)) return;
  const usuario = CYLA.getUsuarioAtual();
  CYLA.removerAmigo(usuario.id, amigoId);
  renderAmigos(usuario);
};

window.confirmarBloquearAmigo = function(amigoId, nome) {
  if (!confirm(`Bloquear ${nome}? Vocês não poderão mais se ver no ranking.`)) return;
  const usuario = CYLA.getUsuarioAtual();
  CYLA.bloquearAmigo(usuario.id, amigoId);
  renderAmigos(usuario);
};

// ── CONVIDAR AMIGOS ──────────────────────────────────────────
function initConvidar() {
  const usuario = CYLA.getUsuarioAtual();
  renderSidebar(usuario);

  // Link de convite
  const usernameSlug = (usuario.username || '').replace(/^@/, '');
  const link = `cyla.app/convite/${usernameSlug}`;
  const inviteLink = document.querySelector('.invite-link');
  if (inviteLink) inviteLink.textContent = link;

  // Busca
  const searchInput = document.querySelector('.search-box input');
  if (searchInput) {
    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const resultado = CYLA.enviarSolicitacao(usuario.id, searchInput.value.trim());
        const msgs = {
          ok:            'Solicitação enviada!',
          ja_amigos:     'Você já é amigo desta pessoa.',
          nao_encontrado:'Usuário não encontrado.',
          auto_envio:    'Você não pode se adicionar.',
        };
        alert(msgs[resultado] || 'Erro desconhecido.');
        searchInput.value = '';
      }
    });
  }

  // Copiar link
  window.copyLink = function(btn) {
    navigator.clipboard.writeText(link).catch(() => {});
    btn.textContent = 'Copiado!';
    btn.style.background = 'var(--green-darker)';
    setTimeout(() => { btn.textContent = 'Copiar'; btn.style.background = ''; }, 2000);
  };
}

// ── HÁBITOS ──────────────────────────────────────────────────
function initHabitos() {
  const usuario = CYLA.getUsuarioAtual();
  renderSidebar(usuario);

  const vicios = CYLA.getVicios(usuario.id);
  const listaContainer = document.querySelector('.cyla-card .card-label');
  if (!listaContainer) return;

  const card = listaContainer.closest('.cyla-card');
  card.querySelectorAll('.habit-row, .add-btn').forEach(el => el.remove());

  vicios.forEach((v, i) => {
    const seq = CYLA.getSequenciaAtual(usuario.id, v.id);
    listaContainer.insertAdjacentHTML('beforeend', `
      <a href="editar-vicio.html?id=${v.id}" class="habit-row">
        <div class="habit-color" style="background:${v.cor || corVicio(i)};"></div>
        <div class="habit-info">
          <div class="habit-name">${esc(v.nome)}</div>
          <div class="habit-meta">${v.tipoMeta === 'abstinencia' ? 'Abstinência' : v.tipoMeta === 'reducao' ? 'Redução' : 'Limite diário'} · Meta: ${metaLabel(v)} · ${diasLabel(seq)} de sequência</div>
        </div>
        <i class="ti ti-chevron-right habit-arrow"></i>
      </a>`);
  });

  listaContainer.insertAdjacentHTML('beforeend', `
    <a href="adicionar-vicio.html" class="add-btn">
      <i class="ti ti-plus"></i><span>Adicionar vício</span>
    </a>`);

  // Resumo rápido
  const resumoCard = document.querySelectorAll('.cyla-card')[1];
  if (resumoCard) {
    const grid = resumoCard.querySelector('.grid-2');
    if (grid) {
      grid.innerHTML = vicios.map((v, i) => {
        const seq     = CYLA.getSequenciaAtual(usuario.id, v.id);
        const recorde = CYLA.getRecorde(usuario.id, v.id);
        return `
          <div style="background:var(--bg-card2);border-radius:var(--radius-md);padding:12px;border:1px solid var(--bg-border);">
            <div style="font-size:10px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px;">${v.nome}</div>
            <div style="font-size:20px;font-weight:600;color:${v.cor || corVicio(i)};">${diasLabel(seq)}</div>
            <div style="font-size:11px;color:var(--text-muted);">Recorde: ${diasLabel(recorde)}</div>
          </div>`;
      }).join('');
    }
  }
}

// ── ADICIONAR VÍCIO ──────────────────────────────────────────
function initAdicionarVicio() {
  const usuario = CYLA.getUsuarioAtual();
  renderSidebar(usuario);

  // Campo personalizado desmarca preset
  const customInputAdd = document.querySelector('.add-btn input');
  if (customInputAdd) {
    customInputAdd.addEventListener('focus', () => {
      document.querySelectorAll('[data-preset]').forEach(b => b.classList.remove('selected'));
    });
  }

  const btn = document.querySelector('.btn-primary');
  if (btn) {
    btn.addEventListener('click', () => {
      const tipoBtnSel  = document.querySelector('[data-preset].selected');
      const presetId    = tipoBtnSel?.dataset?.preset || 'personalizado';
      const nomeBotao   = tipoBtnSel?.textContent?.trim() || null;
      const customInput = document.querySelector('.add-btn input');
      const nomeCustom  = customInput?.value?.trim() || null;

      const metaContainerApp = document.querySelector('.meta-tabs-app');
      const metaTabAtiva = metaContainerApp?.querySelector('.meta-tab-app.active');
      const metaTabs = [...(metaContainerApp?.querySelectorAll('.meta-tab-app') || [])];
      const tipoMeta = ['abstinencia','reducao','limite'][metaTabs.indexOf(metaTabAtiva)] || 'abstinencia';
      const valorMeta = parseInt(document.querySelector('input[type="number"]:not(.gasto-valor)')?.value || 30);

      const modoSel = document.querySelector('.modo-app.selected');
      const modoControle = [...document.querySelectorAll('.modo-app')].indexOf(modoSel) === 0 ? 'parar' : 'gradual';

      const preset = getPreset(presetId);
      const gastoAdd = coletarGasto('app');
      const resAdd = CYLA.createVicio(usuario.id, presetId, {
        nome: nomeCustom || preset.nome || nomeBotao,
        tipoMeta, valorMeta, modoControle,
        gasto: gastoAdd,
      });
      if (resAdd?.erro) {
        // Mostrar erro inline
        let errEl = document.getElementById('erro-duplicata');
        if (!errEl) {
          errEl = document.createElement('p');
          errEl.id = 'erro-duplicata';
          errEl.style.cssText = 'color:var(--red-main);font-size:13px;text-align:center;margin-bottom:10px;';
          btn.parentNode.insertBefore(errEl, btn);
        }
        errEl.textContent = resAdd.erro;
        return;
      }
      window.location.href = 'habitos.html';
    });
  }
}

// ── EDITAR VÍCIO ─────────────────────────────────────────────
function initEditarVicio() {
  const usuario = CYLA.getUsuarioAtual();
  renderSidebar(usuario);

  const params  = new URLSearchParams(window.location.search);
  const vicioId = params.get('id');
  if (!vicioId) { window.location.href = 'habitos.html'; return; }

  const vicio = CYLA.getVicio(vicioId);
  if (!vicio || vicio.usuarioId !== usuario.id) { window.location.href = 'habitos.html'; return; }

  // Preencher dados
  setText('.page-title', vicio.nome);
  setText('.vicio-info-name', vicio.nome);
  const seq = CYLA.getSequenciaAtual(usuario.id, vicioId);
  setText('.vicio-info-days', diasLabel(seq));

  // Data início
  const dataEl = document.querySelector('.vicio-info-date');
  if (dataEl) dataEl.textContent = `Monitorando desde ${formatarData(vicio.dataInicio)}`;

  // Meta tabs
  const metaTabs = [...document.querySelectorAll('.meta-tab-app')];
  const tiposMap  = { abstinencia: 0, reducao: 1, limite: 2 };
  const metaIdx   = tiposMap[vicio.tipoMeta] ?? 0;
  metaTabs.forEach((t, i) => t.classList.toggle('active', i === metaIdx));

  // Atualizar unidade ao carregar
  const unidadeEdit = document.getElementById('meta-unidade-edit');
  if (unidadeEdit) {
    if (vicio.tipoMeta === 'reducao')     unidadeEdit.textContent = 'vezes por semana (máximo)';
    else if (vicio.tipoMeta === 'limite') unidadeEdit.textContent = 'horas por dia (limite)';
    else                                  unidadeEdit.textContent = 'dias consecutivos';
  }

  // Carregar gasto existente
  if (vicio.gasto) {
    const gastoBtns = document.querySelectorAll('.gasto-opc-btn');
    gastoBtns.forEach(b => b.classList.toggle('selected', b.dataset.gasto === (vicio.gasto.temGasto ? 'sim' : 'nao')));
    const det = document.getElementById('gasto-detalhes');
    if (det) det.style.display = vicio.gasto.temGasto ? 'block' : 'none';
    const valorEl = document.querySelector('.gasto-valor');
    if (valorEl && vicio.gasto.valor) valorEl.value = vicio.gasto.valor;
    document.querySelectorAll('.gasto-periodo-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.periodo === (vicio.gasto.periodicidade || 'diario')));
  }

  // Valor meta
  const numInput = document.querySelector('input[type="number"]:not(.gasto-valor)');
  if (numInput) numInput.value = vicio.valorMeta;

  // Modo
  const modos = [...document.querySelectorAll('.modo-app')];
  modos.forEach((m, i) => m.classList.toggle('selected', i === (vicio.modoControle === 'parar' ? 0 : 1)));

  // Botão salvar
  const btnSalvar = document.querySelector('.btn-primary');
  if (btnSalvar) {
    btnSalvar.addEventListener('click', () => {
      const metaTabAtiva = document.querySelector('.meta-tab-app.active');
      const tipoMeta = ['abstinencia','reducao','limite'][metaTabs.indexOf(metaTabAtiva)] || 'abstinencia';
      const valorMeta = parseInt(numInput?.value || 30);
      const modoSel = document.querySelector('.modo-app.selected');
      const modoControle = modos.indexOf(modoSel) === 0 ? 'parar' : 'gradual';
      const gastoEdit = coletarGasto('app');
      CYLA.updateVicio(vicioId, { tipoMeta, valorMeta, modoControle, gasto: gastoEdit });
      window.location.href = 'habitos.html';
    });
  }

  // Botão excluir
  const btnExcluir = document.querySelector('.header-action');
  if (btnExcluir) {
    btnExcluir.onclick = () => {
      if (confirm(`Excluir "${vicio.nome}" e todos os registros?`)) {
        CYLA.deleteVicio(vicioId);
        window.location.href = 'habitos.html';
      }
    };
  }

  // Botão arquivar
  const btnArquivar = document.querySelector('.btn-secondary-app');
  if (btnArquivar) {
    btnArquivar.onclick = () => {
      CYLA.arquivarVicio(vicioId);
      window.location.href = 'habitos.html';
    };
  }
}

// ── PERFIL ───────────────────────────────────────────────────
function initPerfil() {
  const usuario = CYLA.getUsuarioAtual();
  renderSidebar(usuario);

  setText('.profile-name', `${usuario.nome} ${usuario.sobrenome || ''}`.trim());
  setText('.profile-handle', exibirUsername(usuario.username));
  setText('.profile-since', `Membro desde ${formatarData(usuario.criadoEm)}`);

  // Avatar
  document.querySelectorAll('.user-avatar').forEach(el => {
    el.textContent = avatarLetra(usuario.nome);
  });

  // Vícios
  const vicios = CYLA.getVicios(usuario.id);
  const viciosCard = document.querySelector('.cyla-card');
  if (viciosCard) {
    viciosCard.querySelectorAll('.habit-row, .add-btn').forEach(el => el.remove());
    const label = viciosCard.querySelector('.card-label');
    vicios.forEach((v, i) => {
      label.insertAdjacentHTML('beforeend', `
        <a href="editar-vicio.html?id=${v.id}" class="habit-row">
          <div class="habit-color" style="background:${v.cor || corVicio(i)};"></div>
          <div class="habit-info">
            <div class="habit-name">${esc(v.nome)}</div>
            <div class="habit-meta">${v.tipoMeta === 'abstinencia' ? 'Abstinência' : 'Limite'} · Meta: ${metaLabel(v)}</div>
          </div>
          <i class="ti ti-chevron-right habit-arrow"></i>
        </a>`);
    });
    label.insertAdjacentHTML('beforeend', `
      <a href="adicionar-vicio.html" class="add-btn">
        <i class="ti ti-plus"></i><span>Adicionar vício</span>
      </a>`);
  }

  // Privacidade - toggles por vício
  const privCard = document.querySelectorAll('.cyla-card')[1];
  if (privCard) {
    // Toggle geral aparecer no ranking (propriedade do usuário)
    const toggleGeral = privCard.querySelector('.toggle-app');
    const aparece = usuario.aparecerNoRanking !== false;
    if (toggleGeral) {
      toggleGeral.classList.toggle('on', aparece);
      toggleGeral.onclick = () => {
        const ativo = toggleGeral.classList.toggle('on');
        CYLA.updateUsuario(usuario.id, { aparecerNoRanking: ativo });
      };
    }

    // Toggles por vício
    const vicioToggleContainer = privCard.querySelector('[style*="margin-top:10px"]');
    if (vicioToggleContainer) {
      vicioToggleContainer.innerHTML = `
        <div style="font-size:11px;color:var(--text-muted);margin-bottom:8px;">Mostrar tipo de vício para amigos</div>
        ${vicios.map((v, i) => `
          <div class="toggle-row-app">
            <div class="toggle-row-info">
              <div style="display:flex;align-items:center;gap:6px;">
                <div style="width:8px;height:8px;border-radius:50%;background:${v.cor || corVicio(i)};"></div>
                <div class="toggle-row-label">${v.nome}</div>
              </div>
            </div>
            <div class="toggle-app${v.visivelAmigos ? ' on' : ''}" data-vicio-id="${v.id}"
                 onclick="toggleVisivelAmigo(this,'${v.id}')">
              <div class="toggle-app-dot"></div>
            </div>
          </div>`).join('')}`;
    }
  }

  // Logout — usa ID para não conflitar com outros .btn-secondary-app
  const btnSair = document.getElementById('btn-sair') || document.querySelector('.btn-secondary-app');
  if (btnSair) {
    btnSair.onclick = () => { CYLA.logout(); window.location.href = 'login.html'; };
  }

  // Excluir conta
  const btnExcluir = document.getElementById('btn-excluir-conta') || document.querySelector('.btn-danger');
  if (btnExcluir) {
    btnExcluir.onclick = () => {
      if (confirm('Excluir conta permanentemente? Todos os seus dados serão apagados.')) {
        // Apagar todos os dados do usuário antes de sair
        const uid = usuario.id;
        // Apagar vícios, registros e conquistas do usuário
        CYLA.getVicios(uid).forEach(v => CYLA.deleteVicio(v.id));
        // Apagar amizades do usuário
        const todosUsers  = JSON.parse(localStorage.getItem('cyla_usuarios') || '[]');
        const todosAmigos = JSON.parse(localStorage.getItem('cyla_amizades') || '[]');
        const todosRegs   = JSON.parse(localStorage.getItem('cyla_registros') || '[]');
        const todosConqs  = JSON.parse(localStorage.getItem('cyla_conquistas') || '[]');
        localStorage.setItem('cyla_usuarios',  JSON.stringify(todosUsers.filter(u => u.id !== uid)));
        localStorage.setItem('cyla_amizades',  JSON.stringify(todosAmigos.filter(a => a.usuarioId !== uid && a.amigoId !== uid)));
        localStorage.setItem('cyla_registros', JSON.stringify(todosRegs.filter(r => r.usuarioId !== uid)));
        localStorage.setItem('cyla_conquistas',JSON.stringify(todosConqs.filter(c => c.usuarioId !== uid)));
        CYLA.logout();
        window.location.href = 'login.html';
      }
    };
  }
}

window.toggleVisivelAmigo = function(el, vicioId) {
  const ativo = el.classList.toggle('on');
  CYLA.updateVicio(vicioId, { visivelAmigos: ativo });
};

// ── EDITAR PERFIL ────────────────────────────────────────────
function initEditarPerfil() {
  const usuario = CYLA.getUsuarioAtual();
  renderSidebar(usuario);

  document.querySelectorAll('.avatar-big').forEach(el => el.textContent = avatarLetra(usuario.nome));

  // Preencher campos pelos IDs (mais robusto)
  const g = id => document.getElementById(id);
  if (g('ep-nome'))      g('ep-nome').value      = usuario.nome      || '';
  if (g('ep-sobrenome')) g('ep-sobrenome').value  = usuario.sobrenome  || '';
  if (g('ep-email'))     g('ep-email').value      = usuario.email      || '';
  if (g('ep-username'))  g('ep-username').value   = usuario.username   || '';

  const btn = document.getElementById('btn-salvar-perfil') || document.querySelector('.btn-primary');
  if (btn) {
    btn.addEventListener('click', () => {
      const novaSenha = g('ep-senha')?.value     || '';
      const confirmar = g('ep-confirmar')?.value || '';
      if (novaSenha && novaSenha !== confirmar) { alert('As senhas não coincidem.'); return; }
      if (novaSenha && novaSenha.length < 6)    { alert('A senha deve ter pelo menos 6 caracteres.'); return; }

      const emailNovo    = (g('ep-email')?.value.trim()    || usuario.email).toLowerCase();
      const usernameRaw  =  g('ep-username')?.value.trim() || usuario.username;
      // Normaliza username: garante @, minúsculas
      const usernameNovo = (function(v){
        v = v.toLowerCase();
        return v.startsWith('@') ? v : '@' + v;
      })(usernameRaw);

      // Verificar duplicatas (excluindo o próprio usuário)
      const outroComEmail    = CYLA.buscarPorEmail(emailNovo);
      const outroComUsername = CYLA.buscarPorUsername(usernameNovo);
      if (outroComEmail    && outroComEmail.id    !== usuario.id) { alert('Este e-mail já está em uso por outra conta.'); return; }
      if (outroComUsername && outroComUsername.id !== usuario.id) { alert('Este nome de usuário já está em uso.'); return; }

      const dados = {
        nome:      g('ep-nome')?.value.trim()      || usuario.nome,
        sobrenome: g('ep-sobrenome')?.value.trim() || '',
        email:     emailNovo,
        username:  usernameNovo,
      };
      if (novaSenha) dados.senha = novaSenha;
      CYLA.updateUsuario(usuario.id, dados);
      window.location.href = 'perfil.html';
    });
  }
}

// Helper: garante que o username exibido tem exatamente um @
function exibirUsername(username) {
  const u = (username || '').trim().replace(/^@+/, ''); // remove @@ múltiplos
  return '@' + u;
}

// ── SIDEBAR (atualiza nome/avatar em todas as páginas) ───────
function renderSidebar(usuario) {
  document.querySelectorAll('.user-avatar').forEach(el => {
    if (!el.querySelector('*')) el.textContent = avatarLetra(usuario.nome);
  });
  document.querySelectorAll('.user-name').forEach(el => {
    el.textContent = usuario.nome;
  });
  document.querySelectorAll('.user-handle').forEach(el => {
    el.textContent = exibirUsername(usuario.username);
  });

  // Avatar topbar → Meu perfil
  document.querySelectorAll('.topbar-avatar').forEach(el => {
    el.textContent = avatarLetra(usuario.nome);
    el.style.cursor = 'pointer';
    el.onclick = () => { window.location.href = 'perfil.html'; };
  });
  // Sidebar-user (apenas cursor + onclick, SEM tocar no textContent/HTML interno)
  document.querySelectorAll('.sidebar-user').forEach(el => {
    el.style.cursor = 'pointer';
    el.onclick = () => { window.location.href = 'perfil.html'; };
  });

  // Logo/nome CYLA → Início
  document.querySelectorAll('.sidebar-brand, .topbar-brand').forEach(el => {
    el.style.cursor = 'pointer';
    el.onclick = () => { window.location.href = 'home.html'; };
  });
}

// ── UTILS ────────────────────────────────────────────────────
function coletarGasto(contexto) {
  const gastoBtns = document.querySelectorAll('.gasto-opc-btn');
  let temGasto = false;
  gastoBtns.forEach(b => { if (b.classList.contains('selected') && b.dataset.gasto === 'sim') temGasto = true; });
  if (!temGasto) return { temGasto: false, valor: 0, periodicidade: null };
  const valorInput = document.querySelector('.gasto-valor');
  const valor = parseFloat(valorInput?.value || 0);
  const periodoBtn = document.querySelector('.gasto-tabs .gasto-periodo-btn.active');
  const periodicidade = periodoBtn?.dataset?.periodo || 'diario';
  return { temGasto: true, valor, periodicidade };
}

window.toggleGasto = function(btn) {
  document.querySelectorAll('.gasto-opc-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  const mostrar = btn.dataset.gasto === 'sim';
  const det = document.getElementById('gasto-detalhes');
  if (det) det.style.display = mostrar ? 'block' : 'none';
};

window.selectGastoPeriodo = function(btn) {
  btn.closest('.gasto-tabs')?.querySelectorAll('.gasto-periodo-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
};

function formatarData(dataISO) {
  if (!dataISO) return '';
  const meses = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
  const [ano, mes, dia] = dataISO.split('-');
  return `${parseInt(dia)} ${meses[parseInt(mes)-1]} ${ano}`;
}

// ============================================================
// CYLA — STORAGE
// Todas as funções de leitura, escrita e cálculo.
// Depende de: seed.js e presets.js (carregar antes)
// ============================================================

const CYLA = (() => {

  // ── CHAVES DO LOCALSTORAGE ─────────────────────────────────
  const K = {
    USUARIOS:    "cyla_usuarios",
    VICIOS:      "cyla_vicios",
    REGISTROS:   "cyla_registros",
    CONQUISTAS:  "cyla_conquistas",
    AMIZADES:    "cyla_amizades",
    USUARIO_ID:  "cyla_usuario_atual",
    SEED_FEITO:  "cyla_seed_feito",
  };

  // ── HELPERS INTERNOS ───────────────────────────────────────
  function _get(key)        { try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; } }
  function _getObj(key)     { try { return JSON.parse(localStorage.getItem(key)) || null; } catch { return null; } }
  function _set(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
  function _genId(tipo, data) {
    // data opcional: quando fornecida, usa ela em vez de hoje (ex: extenderRegistros)
    const base = data || _hoje();
    const n    = Math.floor(Math.random() * 9000) + 1000; // 1000-9999
    return base + '-' + (tipo || 'id') + '-' + n;
  }
  function _agora()         { return new Date().toISOString(); }
  function _hoje() {
    const d = new Date();
    return d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
  }
  // Extrai a data LOCAL de um objeto Date sem usar toISOString (evita UTC)
  function _dataLocal(d) {
    return d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
  }

  /**
   * Subtrai N dias de uma data ISO string e retorna outra data ISO string.
   */
  function _adicionarDias(dataStr, n) {
    const d = new Date(dataStr + "T00:00:00");
    d.setDate(d.getDate() + n);
    return _dataLocal(d); // hora local — evita UTC
  }

  function _subtrairDias(dataStr, n) {
    const d = new Date(dataStr + "T00:00:00");
    d.setDate(d.getDate() - n);
    return _dataLocal(d); // hora local — evita UTC
  }

  /**
   * Diferença em dias entre duas datas ISO string (dataFim - dataInicio).
   */
  function _diffDias(dataInicio, dataFim) {
    const a = new Date(dataInicio + "T00:00:00");
    const b = new Date(dataFim    + "T00:00:00");
    return Math.round((b - a) / 86400000);
  }

  // ── INICIALIZAÇÃO / SEED ───────────────────────────────────

  /**
   * Inicializa o app. Carrega o seed uma única vez.
   * Deve ser chamado no carregamento de cada página.
   */
  function init() {
    if (localStorage.getItem(K.SEED_FEITO)) return;
    _set(K.USUARIOS,   USUARIOS_SEED);
    _set(K.VICIOS,     VICIOS_SEED);
    _set(K.REGISTROS,  REGISTROS_SEED);
    _set(K.CONQUISTAS, CONQUISTAS_SEED);
    _set(K.AMIZADES,   AMIZADES_SEED);
    localStorage.setItem(K.SEED_FEITO, "1");
    console.log("[CYLA] Seed carregado com sucesso.");
  }

  // (inicialização movida para após as definições das funções)

  /**
   * Preenche dias sem registro entre o último resisti e ontem,
   * garantindo que a sequência do seed não quebre ao registrar hoje.
   * Só preenche se o último registro foi "resisti".
   */
  function extenderRegistros() {
    const hoje  = _hoje();
    const ontem = _subtrairDias(hoje, 1);
    const registros = _get(K.REGISTROS);
    const vicios    = _get(K.VICIOS);
    let novos = [];

    vicios.forEach(v => {
      const regsVicio = registros
        .filter(r => r.usuarioId === v.usuarioId && r.vicioId === v.id)
        .sort((a, b) => a.data.localeCompare(b.data));

      if (!regsVicio.length) return;

      const ultimoReg = regsVicio[regsVicio.length - 1];
      if (ultimoReg.resultado !== 'resisti') return;
      if (ultimoReg.data >= ontem) return;

      const diasDiff = _diffDias(ultimoReg.data, ontem);
      if (diasDiff > 60) return; // gap muito grande — não preencher

      for (let i = 1; i <= diasDiff; i++) {
        const data = _adicionarDias(ultimoReg.data, i);
        const jaExiste = registros.some(r =>
          r.usuarioId === v.usuarioId && r.vicioId === v.id && r.data === data
        );
        if (!jaExiste) {
          novos.push({
            id:                        _genId('ext', data),
            usuarioId:                 v.usuarioId,
            vicioId:                   v.id,
            data,
            resultado:                 'resisti',
            intensidade:               'baixa',
            gatilhos:                  [],
            humor:                     'bom',
            anotacao:                  '',
            criadoEm:                  data + 'T00:00:00',
            editadoEm:                 null,
            registradoRetroativamente: true,
          });
        }
      }
    });

    if (novos.length) {
      _set(K.REGISTROS, [...registros, ...novos]);
      console.log('[CYLA] extenderRegistros: ' + novos.length + ' dias preenchidos.');
    }
  }

  function garantirCamposUsuarios() {
    const usuarios = _get(K.USUARIOS).map(u => ({
      aparecerNoRanking: true,
      tema: 'escuro',
      ...u,
    }));
    _set(K.USUARIOS, usuarios);
  }

  function limparViciosInvalidos() {
    const vicios = _get(K.VICIOS).filter(v => v.nome && v.nome !== 'null' && v.nome !== 'undefined');
    _set(K.VICIOS, vicios);
  }

  /**
   * Apaga todos os dados e reinicia o seed.
   * Útil para testes.
   */
  function resetarDados() {
    Object.values(K).forEach(k => localStorage.removeItem(k));
    init();
  }

  // ── AUTENTICAÇÃO ───────────────────────────────────────────

  /**
   * Realiza o login. Retorna o usuário ou null se inválido.
   */
  function login(email, senha) {
    const usuarios = _get(K.USUARIOS);
    const emailNorm = (email || '').trim().toLowerCase();
    const usuario = usuarios.find(u => (u.email || '').toLowerCase() === emailNorm);
    if (!usuario) return { erro: 'E-mail não cadastrado.' };
    if (usuario.senha !== (senha || '').trim()) return { erro: 'Senha incorreta.' };
    _set(K.USUARIO_ID, usuario.id);
    return { ok: true, usuario };
  }

  /**
   * Encerra a sessão.
   */
  function logout() {
    localStorage.removeItem(K.USUARIO_ID);
  }

  /**
   * Retorna o usuário atualmente logado ou null.
   */
  function getUsuarioAtual() {
    const id = _getObj(K.USUARIO_ID);
    if (!id) return null;
    return getUsuario(id);
  }

  /**
   * Retorna true se há alguém logado.
   */
  function estaLogado() {
    return !!_getObj(K.USUARIO_ID);
  }

  /**
   * Redireciona para login se não estiver logado.
   * Chamar no topo de cada página interna.
   */
  function exigirLogin() {
    if (!estaLogado()) window.location.href = "login.html";
  }

  /**
   * Redefine a senha de um usuário (fluxo esqueceu-senha).
   */
  function redefinirSenha(email, novaSenha) {
    if (!novaSenha || novaSenha.length < 6)
      return { erro: 'A nova senha deve ter pelo menos 6 caracteres.' };
    const emailNorm = (email || '').trim().toLowerCase();
    const usuarios  = _get(K.USUARIOS);
    const idx = usuarios.findIndex(u => (u.email || '').toLowerCase() === emailNorm);
    if (idx === -1) return { erro: 'E-mail não encontrado.' };
    usuarios[idx].senha = novaSenha;
    _set(K.USUARIOS, usuarios);
    return { ok: true };
  }

  // ── USUÁRIOS ───────────────────────────────────────────────

  function getUsuario(id) {
    return _get(K.USUARIOS).find(u => u.id === id) || null;
  }

  function buscarPorEmail(email) {
    const alvo = (email || '').trim().toLowerCase();
    return _get(K.USUARIOS).find(u => (u.email || '').toLowerCase() === alvo) || null;
  }

  function buscarPorUsername(username) {
    const alvo = (username || '').toLowerCase().replace(/^@/,'');
    return _get(K.USUARIOS).find(u => (u.username || '').toLowerCase().replace(/^@/,'') === alvo) || null;
  }

  // Normaliza @username
  function _normalizarUsername(v) {
    v = (v || '').trim().toLowerCase().replace(/\s+/g, '');
    return v.startsWith('@') ? v : '@' + v;
  }

  /**
   * Cadastra um novo usuário.
   * Retorna { ok, usuario } ou { erro } com mensagem específica.
   */
  function cadastrarUsuario(dados) {
    // Validações básicas
    if (!(dados.nome || '').trim())   return { erro: 'Nome é obrigatório.' };
    if (!(dados.email || '').trim())  return { erro: 'E-mail é obrigatório.' };
    if (!(dados.senha || ''))         return { erro: 'Senha é obrigatória.' };
    if ((dados.senha || '').length < 6) return { erro: 'Senha deve ter pelo menos 6 caracteres.' };

    const usuarios = _get(K.USUARIOS);
    const email    = (dados.email    || '').trim().toLowerCase();
    const username = _normalizarUsername(dados.username);

    if (usuarios.find(u => (u.email || '').toLowerCase() === email))
      return { erro: 'Já existe uma conta com este e-mail.' };
    const usernameSlug = username.replace(/^@/, '');
    if (usuarios.find(u => (u.username || '').toLowerCase().replace(/^@/, '') === usernameSlug))
      return { erro: 'Este nome de usuário já está em uso.' };

    const novo = {
      id:                _genId('usuario'),
      nome:              (dados.nome      || '').trim(),
      sobrenome:         (dados.sobrenome || '').trim(),
      username:          username,
      email:             email,
      senha:             dados.senha,
      fotoPerfil:        null,
      criadoEm:          _hoje(),
      tema:              'escuro',
      aparecerNoRanking: false, // usuário ativa manualmente para competir no ranking
    };
    usuarios.push(novo);
    _set(K.USUARIOS, usuarios);
    return { ok: true, usuario: novo };
  }

  /**
   * Atualiza dados do usuário.
   */
  function updateUsuario(id, dados) {
    const usuarios = _get(K.USUARIOS);
    const idx = usuarios.findIndex(u => u.id === id);
    if (idx === -1) return null;
    // Whitelist: apenas campos seguros podem ser atualizados
    const editaveis = ['nome','sobrenome','username','email','senha','fotoPerfil','tema','aparecerNoRanking'];
    editaveis.forEach(campo => {
      if (dados[campo] !== undefined) usuarios[idx][campo] = dados[campo];
    });
    _set(K.USUARIOS, usuarios);
    return usuarios[idx];
  }

  // ── VÍCIOS ─────────────────────────────────────────────────

  /**
   * Retorna todos os vícios ativos de um usuário.
   */
  function getVicios(usuarioId) {
    return _get(K.VICIOS).filter(v => v.usuarioId === usuarioId && !v.arquivado);
  }

  /**
   * Retorna um vício pelo id.
   */
  function getVicio(id) {
    return _get(K.VICIOS).find(v => v.id === id) || null;
  }

  /**
   * Verifica se o usuário já tem um vício ativo com esse presetId.
   * Permite duplicatas apenas para "personalizado".
   */
  function vicioJaExiste(usuarioId, presetId) {
    if (presetId === 'personalizado') return false;
    return _get(K.VICIOS).some(v =>
      v.usuarioId === usuarioId && v.presetId === presetId && !v.arquivado
    );
  }

  /**
   * Cria um novo vício para o usuário.
   */
  function createVicio(usuarioId, presetId, customizacoes) {
    const vicios = _get(K.VICIOS);

    // Bloquear duplicata — mesmo preset, mesmo usuário, não arquivado
    if (presetId && presetId !== 'personalizado') {
      const jaExiste = vicios.find(
        v => v.usuarioId === usuarioId && v.presetId === presetId && !v.arquivado
      );
      if (jaExiste) return { erro: `Você já está monitorando "${jaExiste.nome}".` };
    }

    const novo = criarVicioDePreset(usuarioId, presetId, customizacoes);
    vicios.push(novo);
    _set(K.VICIOS, vicios);
    return novo;
  }

  /**
   * Atualiza campos editáveis de um vício.
   * Campos editáveis: nome, tipo, cor, tipoMeta, valorMeta, modoControle, gasto, visivelAmigos.
   */
  function updateVicio(id, dados) {
    const vicios = _get(K.VICIOS);
    const idx    = vicios.findIndex(v => v.id === id);
    if (idx === -1) return null;
    // Verificar dono
    const usuarioAtual = getUsuarioAtual();
    if (usuarioAtual && vicios[idx].usuarioId !== usuarioAtual.id) return null;
    const editaveis = ["nome","tipo","cor","tipoMeta","valorMeta","modoControle","gasto","visivelAmigos","arquivado"];
    editaveis.forEach(campo => {
      if (dados[campo] !== undefined) vicios[idx][campo] = dados[campo];
    });
    _set(K.VICIOS, vicios);
    return vicios[idx];
  }

  /**
   * Arquiva um vício (soft delete).
   */
  function arquivarVicio(id) {
    return updateVicio(id, { arquivado: true });
  }

  /**
   * Remove um vício definitivamente.
   */
  function deleteVicio(id) {
    const vicio = getVicio(id);
    if (!vicio) return false; // vício não existe
    // Verificar dono: apenas o próprio usuário pode deletar
    const usuarioAtual = getUsuarioAtual();
    if (usuarioAtual && vicio.usuarioId !== usuarioAtual.id) return false;
    _set(K.VICIOS,     _get(K.VICIOS).filter(v => v.id !== id));
    _set(K.REGISTROS,  _get(K.REGISTROS).filter(r => r.vicioId !== id));
    _set(K.CONQUISTAS, _get(K.CONQUISTAS).filter(c => c.vicioId !== id));
    return true;
  }

  // ── REGISTROS ──────────────────────────────────────────────

  /**
   * Retorna registros de um usuário, opcionalmente filtrados.
   * filtros: { vicioId?, dataInicio?, dataFim? }
   */
  function getRegistros(usuarioId, filtros = {}) {
    let lista = _get(K.REGISTROS).filter(r => r.usuarioId === usuarioId);
    if (filtros.vicioId)    lista = lista.filter(r => r.vicioId === filtros.vicioId);
    if (filtros.dataInicio) lista = lista.filter(r => r.data >= filtros.dataInicio);
    if (filtros.dataFim)    lista = lista.filter(r => r.data <= filtros.dataFim);
    return lista.sort((a, b) => a.data.localeCompare(b.data));
  }

  /**
   * Retorna o registro de um vício em uma data específica (ou null).
   */
  function getRegistroDoDia(usuarioId, vicioId, data) {
    return _get(K.REGISTROS).find(
      r => r.usuarioId === usuarioId && r.vicioId === vicioId && r.data === data
    ) || null;
  }

  /**
   * Cria ou atualiza o registro de um dia.
   * Se já existir registro naquela data, atualiza. Senão, cria.
   */
  function salvarRegistro(usuarioId, vicioId, data, dados) {
    // Validar resultado antes de qualquer coisa
    if (!dados.resultado || !['resisti','recai'].includes(dados.resultado)) {
      return { erro: 'Resultado inválido. Use "resisti" ou "recai".' };
    }
    // Validar que o vício existe e pertence ao usuário
    const vicioVal = getVicio(vicioId);
    if (!vicioVal) return { erro: 'Vício não encontrado.' };
    if (vicioVal.usuarioId !== usuarioId) return { erro: 'Acesso negado a este vício.' };
    const registros  = _get(K.REGISTROS);
    const idx        = registros.findIndex(
      r => r.usuarioId === usuarioId && r.vicioId === vicioId && r.data === data
    );
    const hoje      = _hoje();
    const ehRetro   = data < hoje;
    const editavel  = data <= hoje && _diffDias(data, hoje) <= 10;

    if (idx !== -1) {
      // Atualizar existente (só se editável)
      if (!editavel) return { erro: "Registro fora do prazo de edição (10 dias)." };
      registros[idx] = {
        ...registros[idx],
        ...dados,
        editadoEm: _agora(),
      };
      _set(K.REGISTROS, registros);
      checkConquistas(usuarioId, vicioId);
      return registros[idx];
    } else {
      // Criar novo — mesma regra: não permite criar para datas > 10 dias ou futuras
      if (!editavel) {
        const msg = data > hoje
          ? 'Não é possível registrar datas futuras.'
          : 'Prazo de registro retroativo encerrado (máximo 10 dias).';
        return { erro: msg };
      }
      const novo = {
        id:                       _genId('reg'),
        usuarioId,
        vicioId,
        data,
        resultado:                dados.resultado,
        intensidade:              dados.intensidade || "media",
        gatilhos:                 dados.gatilhos    || [],
        humor:                    dados.humor       || "neutro",
        anotacao:                 dados.anotacao    || "",
        criadoEm:                 _agora(),
        editadoEm:                null,
        registradoRetroativamente: ehRetro,
      };
      registros.push(novo);
      _set(K.REGISTROS, registros);
      checkConquistas(usuarioId, vicioId);
      return novo;
    }
  }

  /**
   * Verifica se um registro é editável (últimos 10 dias).
   */
  function registroEditavel(data) {
    const hoje = _hoje();
    return data <= hoje && _diffDias(data, hoje) <= 10;
  }

  // ── CÁLCULOS ───────────────────────────────────────────────

  /**
   * Calcula a sequência atual de dias resistidos (retroativos incluídos).
   * Conta do dia mais recente para trás, parando no primeiro dia sem registro
   * ou com resultado "recai".
   */
  function getSequenciaAtual(usuarioId, vicioId) {
    const hoje = _hoje();

    // Recaída hoje zera a sequência imediatamente
    const regHoje = getRegistroDoDia(usuarioId, vicioId, hoje);
    if (regHoje && regHoje.resultado === 'recai') return 0;

    const registros = getRegistros(usuarioId, { vicioId })
      .filter(r => r.resultado === "resisti")
      .map(r => r.data)
      .sort((a, b) => b.localeCompare(a)); // mais recente primeiro

    if (!registros.length) return 0;

    let seq  = 0;
    let data = hoje;
    // O dia de hoje pode não ter sido registrado ainda — começa pelo mais recente
    if (registros[0] !== data) data = registros[0];

    for (const d of registros) {
      if (d === data) {
        seq++;
        data = _subtrairDias(data, 1);
      } else {
        break; // gap encontrado
      }
    }
    return seq;
  }

  /**
   * Calcula o recorde de sequência de um vício.
   */
  function getRecorde(usuarioId, vicioId) {
    const dias = getRegistros(usuarioId, { vicioId })
      .filter(r => r.resultado === "resisti")
      .map(r => r.data)
      .sort();

    if (!dias.length) return 0;

    let maxSeq = 0;
    let seq    = 1;

    for (let i = 1; i < dias.length; i++) {
      const diff = _diffDias(dias[i - 1], dias[i]);
      if (diff === 1) {
        seq++;
        if (seq > maxSeq) maxSeq = seq;
      } else {
        seq = 1;
      }
    }
    if (dias.length) maxSeq = Math.max(maxSeq, seq, 1);
    return maxSeq;
  }

  /**
   * Calcula o valor diário de um gasto (normalizado).
   */
  function getValorDiario(gasto) {
    if (!gasto || !gasto.temGasto || !gasto.valor || gasto.valor <= 0) return 0;
    if (gasto.periodicidade === "diario")   return gasto.valor;
    if (gasto.periodicidade === "semanal")  return gasto.valor / 7;
    if (gasto.periodicidade === "mensal")   return gasto.valor / 30;
    return 0;
  }

  /**
   * Calcula a economia total em um período.
   * periodo: "7d" | "30d" | "3m" | "total"
   */
  function getEconomia(usuarioId, vicioId, periodo = "30d") {
    const vicio      = getVicio(vicioId);
    const valorDia   = getValorDiario(vicio?.gasto);
    if (!valorDia) return 0;

    const { dataInicio } = _periodoParaDatas(periodo);
    const diasResistidos = getRegistros(usuarioId, { vicioId, dataInicio })
      .filter(r => r.resultado === "resisti").length;

    return +(diasResistidos * valorDia).toFixed(2);
  }

  /**
   * Calcula a taxa de sucesso (%) em um período.
   */
  function getTaxaSucesso(usuarioId, vicioId, periodo = "30d") {
    const { dataInicio } = _periodoParaDatas(periodo);
    const registros      = getRegistros(usuarioId, { vicioId, dataInicio });
    if (!registros.length) return 0;
    const resisti = registros.filter(r => r.resultado === "resisti").length;
    return Math.round((resisti / registros.length) * 100);
  }

  /**
   * Conta as recaídas em um período.
   */
  function getRecaidas(usuarioId, vicioId, periodo = "30d") {
    const { dataInicio } = _periodoParaDatas(periodo);
    return getRegistros(usuarioId, { vicioId, dataInicio })
      .filter(r => r.resultado === "recai").length;
  }

  /**
   * Conta os dias resistidos em um período.
   */
  function getDiasResistidos(usuarioId, vicioId, periodo = "30d") {
    const { dataInicio } = _periodoParaDatas(periodo);
    return getRegistros(usuarioId, { vicioId, dataInicio })
      .filter(r => r.resultado === "resisti").length;
  }

  /**
   * Retorna dados semanais agrupados para o gráfico de barras.
   * Retorna array de { semana: "S1", dias: N, atual: bool }
   */
  function getDadosGrafico(usuarioId, vicioId, periodo = "30d") {
    const hoje = _hoje();

    // 7d: mostra cada dia individualmente
    if (periodo === "7d") {
      const DIAS_PT = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];
      const resultado = [];
      for (let i = 6; i >= 0; i--) {
        const data = _subtrairDias(hoje, i);
        const reg  = getRegistroDoDia(usuarioId, vicioId, data);
        const dow  = new Date(data + "T00:00:00").getDay();
        resultado.push({
          semana:    DIAS_PT[dow],
          dias:      reg?.resultado === "resisti" ? 1 : 0,
          resultado: reg?.resultado || null,
          atual:     i === 0,
          data,
        });
      }
      return resultado;
    }

    // 30d / 3m: agrupa por semana
    const { dataInicio, dataFim } = _periodoParaDatas(periodo);
    const registros = getRegistros(usuarioId, { vicioId, dataInicio, dataFim });
    const semanas   = [];
    let cursor  = new Date(dataInicio + "T00:00:00");
    const fim   = new Date(dataFim    + "T00:00:00");
    let semNum  = 1;

    while (cursor <= fim) {
      const inicioSem = _dataLocal(cursor); // hora local — evita UTC
      const fimSem    = new Date(cursor);
      fimSem.setDate(fimSem.getDate() + 6);
      const fimSemStr = _dataLocal(fimSem); // hora local — evita UTC

      const dias = registros.filter(r =>
        r.data >= inicioSem && r.data <= fimSemStr && r.resultado === "resisti"
      ).length;

      semanas.push({
        semana: "S" + semNum,
        dias,
        atual: hoje >= inicioSem && hoje <= fimSemStr,
      });

      cursor.setDate(cursor.getDate() + 7);
      semNum++;
    }
    return semanas;
  }

  /**
   * Retorna os gatilhos mais frequentes de um vício no período.
   */
  function getGatilhos(usuarioId, vicioId, periodo = "30d") {
    const { dataInicio } = _periodoParaDatas(periodo);
    const registros      = getRegistros(usuarioId, { vicioId, dataInicio })
      .filter(r => r.resultado === "recai");

    const contador = {};
    registros.forEach(r => {
      r.gatilhos.forEach(g => {
        if (!g || !g.trim()) return; // ignorar gatilhos vazios
        const gNorm = g.trim();
        contador[gNorm] = (contador[gNorm] || 0) + 1;
      });
    });

    return Object.entries(contador)
      .map(([nome, vezes]) => ({ nome, vezes }))
      .sort((a, b) => b.vezes - a.vezes)
      .slice(0, 5);
  }

  /**
   * Converte string de período para datas.
   */
  function _periodoParaDatas(periodo) {
    const dataFim    = _hoje();
    let   dataInicio;
    if (periodo === "7d")    dataInicio = _subtrairDias(dataFim, 6); // 7 dias: hoje + 6 anteriores
    else if (periodo === "30d")  dataInicio = _subtrairDias(dataFim, 29); // 30 dias exatos
    else if (periodo === "3m")   dataInicio = _subtrairDias(dataFim, 89); // 90 dias exatos
    else                         dataInicio = "2020-01-01"; // total
    return { dataInicio, dataFim };
  }

  // ── CONQUISTAS ─────────────────────────────────────────────

  /**
   * Retorna conquistas desbloqueadas de um usuário (opcionalmente filtrado por vício).
   */
  function getConquistas(usuarioId, vicioId = null) {
    let lista = _get(K.CONQUISTAS).filter(c => c.usuarioId === usuarioId);
    if (vicioId) lista = lista.filter(c => c.vicioId === vicioId);
    return lista;
  }

  /**
   * Verifica e desbloqueia conquistas com base na sequência atual.
   * Chamado automaticamente ao salvar um registro.
   */
  function checkConquistas(usuarioId, vicioId) {
    const vicio       = getVicio(vicioId);
    if (!vicio) return;
    const preset      = getPreset(vicio.presetId);
    const seq         = getSequenciaAtual(usuarioId, vicioId);
    const jaDesbloq   = getConquistas(usuarioId, vicioId).map(c => c.conquistaPresetId);
    const conquistas  = _get(K.CONQUISTAS);

    preset.conquistas.forEach(c => {
      if (!jaDesbloq.includes(c.id) && seq >= c.meta) {
        conquistas.push({
          id:               _genId('conq'),
          usuarioId,
          vicioId,
          conquistaPresetId: c.id,
          desbloquedaEm:    _hoje(),
        });
        console.log(`[CYLA] Conquista desbloqueada: ${c.titulo}`);
      }
    });
    _set(K.CONQUISTAS, conquistas);
  }

  /**
   * Retorna as conquistas do preset com status (desbloqueada + em X dias).
   * Útil para renderizar a seção de conquistas na tela de progresso.
   */
  function getConquistasComStatus(usuarioId, vicioId) {
    const vicio    = getVicio(vicioId);
    if (!vicio) return [];
    const preset   = getPreset(vicio.presetId);
    const seq      = getSequenciaAtual(usuarioId, vicioId);
    const desbloq  = getConquistas(usuarioId, vicioId);

    return preset.conquistas.map(c => {
      const found        = desbloq.find(d => d.conquistaPresetId === c.id);
      const atingiuMeta  = seq >= c.meta;
      const desbloqueada = !!found || atingiuMeta; // considera desbloqueada se seq >= meta
      return {
        ...c,
        desbloqueada,
        desbloquedaEm:  found?.desbloquedaEm || (atingiuMeta ? _hoje() : null),
        diasRestantes:  desbloqueada ? 0 : Math.max(0, c.meta - seq),
      };
    });
  }

  // ── AMIZADES ───────────────────────────────────────────────

  /**
   * Retorna amigos aceitos de um usuário.
   */
  function getAmigos(usuarioId) {
    const amizades = _get(K.AMIZADES).filter(
      a => (a.usuarioId === usuarioId || a.amigoId === usuarioId) && a.status === "aceito"
    );
    return amizades.map(a => {
      const amigoId = a.usuarioId === usuarioId ? a.amigoId : a.usuarioId;
      return getUsuario(amigoId);
    }).filter(Boolean);
  }

  /**
   * Retorna solicitações pendentes recebidas por um usuário.
   */
  function getSolicitacoesPendentes(usuarioId) {
    return _get(K.AMIZADES)
      .filter(a => a.amigoId === usuarioId && a.status === "pendente_recebido")
      .map(a => getUsuario(a.usuarioId))
      .filter(Boolean);
  }

  /**
   * Envia uma solicitação de amizade por username.
   * Retorna: "ok" | "ja_amigos" | "nao_encontrado" | "auto_envio"
   */
  function enviarSolicitacao(usuarioId, username) {
    const usuarios = _get(K.USUARIOS);
    const userNorm = (username || '').trim().toLowerCase().replace(/^@/,'');
    const alvo = usuarios.find(u =>
      (u.username || '').toLowerCase().replace(/^@/,'') === userNorm ||
      (u.email    || '').toLowerCase() === userNorm
    );
    if (!alvo)                return "nao_encontrado";
    if (alvo.id === usuarioId) return "auto_envio";

    // Verificar bloqueio APÓS encontrar o alvo (agora alvo.id está disponível)
    const amizades = _get(K.AMIZADES);
    const bloqueado = amizades.find(a =>
      ((a.usuarioId === usuarioId && a.amigoId === alvo.id) ||
       (a.usuarioId === alvo.id   && a.amigoId === usuarioId)) &&
      a.status === 'bloqueado'
    );
    if (bloqueado) return "nao_encontrado"; // não revela que está bloqueado
    const jaExiste  = amizades.find(
      a => (a.usuarioId === usuarioId && a.amigoId === alvo.id) ||
           (a.usuarioId === alvo.id   && a.amigoId === usuarioId)
    );
    if (jaExiste) return "ja_amigos";

    amizades.push({
      id:        _genId('amz'),
      usuarioId,
      amigoId:   alvo.id,
      status:    "pendente_recebido",
      criadoEm:  _hoje(),
    });
    _set(K.AMIZADES, amizades);
    return "ok";
  }

  /**
   * Aceita uma solicitação de amizade.
   */
  function aceitarSolicitacao(usuarioId, remetenteId) {
    const amizades = _get(K.AMIZADES);
    const idx      = amizades.findIndex(
      a => a.usuarioId === remetenteId && a.amigoId === usuarioId && a.status === "pendente_recebido"
    );
    if (idx === -1) return false;
    amizades[idx].status = "aceito";
    _set(K.AMIZADES, amizades);
    return true;
  }

  /**
   * Recusa ou desfaz uma amizade.
   */
  function recusarSolicitacao(usuarioId, remetenteId) {
    const amizades = _get(K.AMIZADES).filter(
      a => !((a.usuarioId === remetenteId && a.amigoId === usuarioId) ||
             (a.usuarioId === usuarioId   && a.amigoId === remetenteId))
    );
    _set(K.AMIZADES, amizades);
    return true;
  }

  // ── RANKING ────────────────────────────────────────────────

  /**
   * Retorna o ranking de amigos (incluindo o próprio usuário).
   * Filtra por vicioId se fornecido.
   * Respeita configuração de privacidade (visivelAmigos).
   */
  function getRanking(usuarioId, vicioId = null) {
    // Garantir que o vicioId pertence ao usuário logado
    if (vicioId && getVicio(vicioId)?.usuarioId !== usuarioId) vicioId = null;
    // Traduz vicioId do usuário para presetId para comparar com outros usuários
    const presetFiltro = vicioId ? (getVicio(vicioId)?.presetId || null) : null;

    const amigos    = getAmigos(usuarioId);
    const todos     = [getUsuario(usuarioId), ...amigos].filter(Boolean);
    const resultado = [];

    todos.forEach(u => {
      // Ocultar usuários que optaram por não aparecer no ranking (exceto o próprio)
      if (u.id !== usuarioId && u.aparecerNoRanking === false) return;

      // Se há filtro, busca vícios do usuário com o mesmo presetId
      const vicosFiltrados = getVicios(u.id).filter(v =>
        presetFiltro ? v.presetId === presetFiltro : true
      );

      // Sem filtro: pega o melhor. Com filtro: só considera quem tem o vício
      let melhorVicio = null;
      let melhorSeq   = 0;

      vicosFiltrados.forEach(v => {
        const seq = getSequenciaAtual(u.id, v.id);
        if (seq > melhorSeq) {
          melhorSeq = seq;
          melhorVicio = (u.id === usuarioId || v.visivelAmigos) ? v : null;
        }
      });

      // Com filtro ativo: excluir amigos sem o vício OU com 0 dias
      // (o próprio usuário sempre aparece mesmo com 0 dias)
      if (u.id !== usuarioId && presetFiltro) {
        if (vicosFiltrados.length === 0) return; // não tem o vício
        if (melhorSeq === 0) return;             // tem o vício mas nunca registrou
      }

      resultado.push({
        usuario:    u,
        vicio:      melhorVicio,
        sequencia:  melhorSeq,
        ehVoce:     u.id === usuarioId,
      });
    });

    return resultado
      .sort((a, b) => b.sequencia - a.sequencia)
      .map((item, idx) => ({ ...item, posicao: idx + 1 }));
  }

  // ── HISTÓRICO / CALENDÁRIO ─────────────────────────────────

  /**
   * Retorna dados de um mês para o calendário visual.
   * Retorna array de { data, resultado, editavel } para cada dia do mês.
   */
  function getCalendarioMes(usuarioId, vicioId, ano, mes) {
    const primeiroDia = `${ano}-${String(mes).padStart(2,"0")}-01`;
    // Construir ultimoDia sem toISOString para evitar bug de UTC em BRT
    const _diasNoMesTemp = new Date(ano, mes, 0).getDate();
    const ultimoDia  = `${ano}-${String(mes).padStart(2,"0")}-${String(_diasNoMesTemp).padStart(2,"0")}`;
    const registros   = getRegistros(usuarioId, { vicioId, dataInicio: primeiroDia, dataFim: ultimoDia });
    const hoje        = _hoje();
    const diasNoMes   = new Date(ano, mes, 0).getDate();
    const dias        = [];

    for (let d = 1; d <= diasNoMes; d++) {
      const data     = `${ano}-${String(mes).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
      const reg      = registros.find(r => r.data === data);
      const futuro   = data > hoje;
      const editavel = !futuro && _diffDias(data, hoje) <= 10;

      dias.push({
        data,
        dia:       d,
        resultado: reg?.resultado || null,
        futuro,
        editavel,
        temRegistro: !!reg,
      });
    }
    return dias;
  }


  /** Remove amizade entre dois usuários. */
  function removerAmigo(usuarioId, amigoId) {
    if (usuarioId === amigoId) return false;
    const lista = _get(K.AMIZADES).filter(a =>
      !((a.usuarioId === usuarioId && a.amigoId === amigoId) ||
        (a.usuarioId === amigoId   && a.amigoId === usuarioId))
    );
    _set(K.AMIZADES, lista);
    return true;
  }

  /** Bloqueia usuário: remove a amizade e impede nova solicitação. */
  function bloquearAmigo(usuarioId, amigoId) {
    if (usuarioId === amigoId) return false; // não pode se auto-bloquear
    const lista = _get(K.AMIZADES);
    const idx   = lista.findIndex(a =>
      (a.usuarioId === usuarioId && a.amigoId === amigoId) ||
      (a.usuarioId === amigoId   && a.amigoId === usuarioId)
    );
    if (idx !== -1) {
      lista[idx] = { ...lista[idx], status: 'bloqueado', bloqueadoPor: usuarioId };
      _set(K.AMIZADES, lista);
    } else {
      // Bloquear sem amizade prévia
      lista.push({ id: _genId('blq'), usuarioId, amigoId, status: 'bloqueado',
                   bloqueadoPor: usuarioId, criadoEm: _hoje() });
      _set(K.AMIZADES, lista);
    }
    return true;
  }

  /** Retorna lista de amigos com objeto completo do usuário. */
  function getAmigosLista(usuarioId) {
    return _get(K.AMIZADES)
      .filter(a =>
        (a.usuarioId === usuarioId || a.amigoId === usuarioId) &&
        a.status === 'aceito'
      )
      .map(a => {
        const amigoId = a.usuarioId === usuarioId ? a.amigoId : a.usuarioId;
        const amigo   = getUsuario(amigoId);
        return amigo ? { ...amigo, amizadeId: a.id } : null;
      })
      .filter(Boolean);
  }


  /**
   * Migração: atualiza nomes de vícios para os nomes dos presets.
   * Corrige dados antigos como "Cigarro" → "Tabaco".
   * Não afeta vícios personalizados.
   */
  function normalizarNomesVicios() {
    if (typeof getPreset !== 'function') return;
    const vicios = _get(K.VICIOS);
    let alterado = false;
    const atualizados = vicios.map(v => {
      if (v.presetId === 'personalizado' || !v.presetId) return v;
      const nomePreset = getPreset(v.presetId)?.nome;
      if (nomePreset && v.nome !== nomePreset) {
        alterado = true;
        return { ...v, nome: nomePreset };
      }
      return v;
    });
    if (alterado) _set(K.VICIOS, atualizados);
  }

  // ── INICIALIZAÇÃO AUTOMÁTICA ─────────────────────────────
  // Roda em toda página — garante consistência dos dados
  garantirCamposUsuarios();
  normalizarNomesVicios(); // migração: Cigarro→Tabaco etc.
  extenderRegistros();
  limparViciosInvalidos();

  // ── API PÚBLICA ────────────────────────────────────────────
  return {
    // Init
    init,
    resetarDados,
    limparViciosInvalidos,
    garantirCamposUsuarios,
    extenderRegistros,
    vicioJaExiste,

    // Auth
    login,
    logout,
    getUsuarioAtual,
    estaLogado,
    exigirLogin,
    redefinirSenha,
    buscarPorEmail,
    buscarPorUsername,

    // Usuários
    getUsuario,
    cadastrarUsuario,
    updateUsuario,

    // Vícios
    getVicios,
    getVicio,
    createVicio,
    updateVicio,
    arquivarVicio,
    deleteVicio,

    // Registros
    getRegistros,
    getRegistroDoDia,
    salvarRegistro,
    registroEditavel,

    // Cálculos
    getSequenciaAtual,
    getRecorde,
    getEconomia,
    getTaxaSucesso,
    getRecaidas,
    getDiasResistidos,
    getDadosGrafico,
    getGatilhos,
    getValorDiario,

    // Conquistas
    getConquistas,
    getConquistasComStatus,
    checkConquistas,

    // Amizades
    getAmigos,
    getAmigosLista,
    removerAmigo,
    bloquearAmigo,
    getSolicitacoesPendentes,
    enviarSolicitacao,
    aceitarSolicitacao,
    recusarSolicitacao,

    // Ranking
    getRanking,

    // Histórico
    getCalendarioMes,
  };

})();

// ── AUTO-INIT ─────────────────────────────────────────────────
// Inicializa assim que o script é carregado.
CYLA.init();

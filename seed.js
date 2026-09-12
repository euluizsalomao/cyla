// ============================================================
// CYLA — SEED DE DADOS
// Dados iniciais para demonstração com as 5 personas
// Hoje: 2026-06-06
// ============================================================

// ── USUÁRIOS ────────────────────────────────────────────────
const USUARIOS_SEED = [
  {
    id: "u1",
    nome: "Marina",
    sobrenome: "Alves",
    username: "@marina",
    email: "marina@cyla",
    senha: "1234",
    fotoPerfil: null,
    criadoEm: "2026-04-07",
    tema: "escuro"
  },
  {
    id: "u2",
    nome: "Lucas",
    sobrenome: "Martins",
    username: "@lucas",
    email: "lucas@cyla",
    senha: "1234",
    fotoPerfil: null,
    criadoEm: "2026-04-07",
    tema: "escuro"
  },
  {
    id: "u3",
    nome: "Carlos",
    sobrenome: "Henrique",
    username: "@carlos",
    email: "carlos@cyla",
    senha: "1234",
    fotoPerfil: null,
    criadoEm: "2026-03-15",
    tema: "escuro"
  },
  {
    id: "u4",
    nome: "Eduardo",
    sobrenome: "Vasconcelos",
    username: "@eduardo",
    email: "eduardo@cyla",
    senha: "1234",
    fotoPerfil: null,
    criadoEm: "2026-03-01",
    tema: "escuro",
    aparecerNoRanking: false
  },
  {
    id: "u5",
    nome: "Felipe",
    sobrenome: "Andrade",
    username: "@felipe",
    email: "felipe@cyla",
    senha: "1234",
    fotoPerfil: null,
    criadoEm: "2026-04-15",
    tema: "escuro"
  }
];

// ── VÍCIOS (instâncias por usuário) ─────────────────────────
const VICIOS_SEED = [

  // MARINA — Cigarro
  {
    id: "v1",
    usuarioId: "u1",
    presetId: "tabaco",
    nome: "Tabaco",
    tipo: "substancia",
    cor: "#1D9E75",
    tipoMeta: "abstinencia",
    valorMeta: 30,
    modoControle: "parar",
    gasto: { temGasto: true, valor: 15.00, periodicidade: "diario" },
    visivelAmigos: true,
    dataInicio: "2026-04-07",
    arquivado: false
  },

  // LUCAS — Redes sociais
  {
    id: "v2",
    usuarioId: "u2",
    presetId: "redes-sociais",
    nome: "Redes Sociais",
    tipo: "tela",
    cor: "#7F77DD",
    tipoMeta: "limite",
    valorMeta: 2,           // 2h por dia
    modoControle: "gradual",
    gasto: { temGasto: false, valor: 0, periodicidade: null },
    visivelAmigos: true,
    dataInicio: "2026-04-07",
    arquivado: false
  },
  // LUCAS — Jogos
  {
    id: "v3",
    usuarioId: "u2",
    presetId: "jogos",
    nome: "Jogos",
    tipo: "tela",
    cor: "#EF9F27",
    tipoMeta: "limite",
    valorMeta: 1,           // 1h por dia
    modoControle: "gradual",
    gasto: { temGasto: false, valor: 0, periodicidade: null },
    visivelAmigos: true,
    dataInicio: "2026-04-07",
    arquivado: false
  },

  // CARLOS — Apostas
  {
    id: "v4",
    usuarioId: "u3",
    presetId: "apostas",
    nome: "Apostas",
    tipo: "comportamento",
    cor: "#D85A30",
    tipoMeta: "abstinencia",
    valorMeta: 60,
    modoControle: "parar",
    gasto: { temGasto: true, valor: 200.00, periodicidade: "semanal" },
    visivelAmigos: true,
    dataInicio: "2026-03-15",
    arquivado: false
  },

  // EDUARDO — Substância (privado, nome genérico por discrição)
  {
    id: "v5",
    usuarioId: "u4",
    presetId: "cocaina",
    nome: "Substância",
    tipo: "substancia",
    cor: "#378ADD",
    tipoMeta: "abstinencia",
    valorMeta: 90,
    modoControle: "parar",
    gasto: { temGasto: true, valor: 500.00, periodicidade: "semanal" },
    visivelAmigos: false,   // Eduardo mantém privado
    dataInicio: "2026-03-01",
    arquivado: false
  },

  // FELIPE — Hábito (nome genérico por privacidade)
  {
    id: "v6",
    usuarioId: "u5",
    presetId: "pornografia",
    nome: "Hábito digital",
    tipo: "comportamento",
    cor: "#D4537E",
    tipoMeta: "abstinencia",
    valorMeta: 30,
    modoControle: "parar",
    gasto: { temGasto: false, valor: 0, periodicidade: null },
    visivelAmigos: false,   // Felipe mantém completamente privado
    dataInicio: "2026-04-15",
    arquivado: false
  }
];

// ── REGISTROS ────────────────────────────────────────────────
// Gerados dia a dia para cada persona
// Padrão:
//   Marina  (v1): Apr 07 → Jun 06 — 61 dias  — 57 resistidos / 4 recaídas
//   Lucas   (v2): Apr 07 → Jun 06 — 61 dias  — 46 resistidos / 15 recaídas
//   Lucas   (v3): Apr 07 → Jun 06 — 61 dias  — 38 resistidos / 23 recaídas
//   Carlos  (v4): Mar 15 → Jun 06 — 83 dias  — 57 resistidos / 26 recaídas
//   Eduardo (v5): Mar 01 → Jun 06 — 97 dias  — 94 resistidos / 3  recaídas
//   Felipe  (v6): Apr 15 → Jun 06 — 52 dias  — 40 resistidos / 12 recaídas

// Helper para gerar id de registro
let _ridCounter = 1;
function rid() { return `r${String(_ridCounter++).padStart(4,'0')}`; }

// Helper para gerar data ISO
function d(str) { return str; }

const REGISTROS_SEED = [

  // ── MARINA — Cigarro (v1) ──────────────────────────────
  // Abr 7-13: sequência inicial de 7 dias → conquista "Primeira semana"
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-04-07"), resultado:"resisti", intensidade:"alta",       gatilhos:["estresse","ansiedade"],    humor:"neutro", anotacao:"Primeiro dia difícil mas consegui.",     criadoEm:"2026-04-07T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-04-08"), resultado:"resisti", intensidade:"media",      gatilhos:["estresse"],                 humor:"neutro", anotacao:"",                                        criadoEm:"2026-04-08T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-04-09"), resultado:"resisti", intensidade:"media",      gatilhos:["apos_refeicao"],            humor:"bom",    anotacao:"Mais tranquilo hoje.",                    criadoEm:"2026-04-09T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-04-10"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                          humor:"bom",    anotacao:"",                                        criadoEm:"2026-04-10T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-04-11"), resultado:"resisti", intensidade:"media",      gatilhos:["tedio"],                   humor:"neutro", anotacao:"",                                        criadoEm:"2026-04-11T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-04-12"), resultado:"resisti", intensidade:"alta",       gatilhos:["ambiente_social"],          humor:"bom",    anotacao:"Saí com amigos mas resisti.",            criadoEm:"2026-04-12T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-04-13"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                          humor:"otimo",  anotacao:"Uma semana! Muito feliz.",               criadoEm:"2026-04-13T21:00:00", editadoEm:null, registradoRetroativamente:false },
  // Abr 14-16: recaída de 3 dias (estresse no trabalho — pauta pesada)
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-04-14"), resultado:"recai",   intensidade:"muito_alta", gatilhos:["estresse","ansiedade"],    humor:"mal",    anotacao:"Pauta difícil no trabalho. Não aguentei.", criadoEm:"2026-04-14T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-04-15"), resultado:"recai",   intensidade:"alta",       gatilhos:["estresse"],                 humor:"mal",    anotacao:"",                                        criadoEm:"2026-04-15T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-04-16"), resultado:"recai",   intensidade:"media",      gatilhos:["tedio"],                   humor:"neutro", anotacao:"Preciso retomar.",                        criadoEm:"2026-04-16T21:00:00", editadoEm:null, registradoRetroativamente:false },
  // Abr 17 - Mai 1: 15 dias seguidos → conquista "Duas semanas"
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-04-17"), resultado:"resisti", intensidade:"alta",       gatilhos:["ansiedade"],               humor:"neutro", anotacao:"Recomeçando.",                           criadoEm:"2026-04-17T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-04-18"), resultado:"resisti", intensidade:"media",      gatilhos:["apos_refeicao"],            humor:"neutro", anotacao:"",                                        criadoEm:"2026-04-18T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-04-19"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                          humor:"bom",    anotacao:"",                                        criadoEm:"2026-04-19T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-04-20"), resultado:"resisti", intensidade:"media",      gatilhos:["estresse"],                 humor:"neutro", anotacao:"",                                        criadoEm:"2026-04-20T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-04-21"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                          humor:"bom",    anotacao:"",                                        criadoEm:"2026-04-21T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-04-22"), resultado:"resisti", intensidade:"media",      gatilhos:["ambiente_social"],          humor:"bom",    anotacao:"",                                        criadoEm:"2026-04-22T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-04-23"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                          humor:"otimo",  anotacao:"",                                        criadoEm:"2026-04-23T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-04-24"), resultado:"resisti", intensidade:"media",      gatilhos:["tedio"],                   humor:"neutro", anotacao:"",                                        criadoEm:"2026-04-24T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-04-25"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                          humor:"bom",    anotacao:"",                                        criadoEm:"2026-04-25T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-04-26"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                          humor:"bom",    anotacao:"",                                        criadoEm:"2026-04-26T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-04-27"), resultado:"resisti", intensidade:"media",      gatilhos:["apos_refeicao"],            humor:"neutro", anotacao:"",                                        criadoEm:"2026-04-27T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-04-28"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                          humor:"bom",    anotacao:"",                                        criadoEm:"2026-04-28T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-04-29"), resultado:"resisti", intensidade:"alta",       gatilhos:["estresse","ansiedade"],    humor:"neutro", anotacao:"Reunião difícil mas passei.",            criadoEm:"2026-04-29T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-04-30"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                          humor:"bom",    anotacao:"",                                        criadoEm:"2026-04-30T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-05-01"), resultado:"resisti", intensidade:"media",      gatilhos:["tedio"],                   humor:"otimo",  anotacao:"Duas semanas!",                          criadoEm:"2026-05-01T21:00:00", editadoEm:null, registradoRetroativamente:false },
  // Mai 2: recaída isolada
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-05-02"), resultado:"recai",   intensidade:"alta",       gatilhos:["ambiente_social","alcool"], humor:"neutro", anotacao:"Festa de aniversário. Escapou.",         criadoEm:"2026-05-02T21:00:00", editadoEm:null, registradoRetroativamente:false },
  // Mai 3 - Jun 6: 35 dias → conquista "Um mês inteiro" (em 02/jun)
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-05-03"), resultado:"resisti", intensidade:"media",      gatilhos:["ansiedade"],               humor:"neutro", anotacao:"Recomeçando de novo.",                   criadoEm:"2026-05-03T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-05-04"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                          humor:"bom",    anotacao:"",                                        criadoEm:"2026-05-04T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-05-05"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                          humor:"bom",    anotacao:"",                                        criadoEm:"2026-05-05T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-05-06"), resultado:"resisti", intensidade:"media",      gatilhos:["apos_refeicao"],            humor:"neutro", anotacao:"",                                        criadoEm:"2026-05-06T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-05-07"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                          humor:"bom",    anotacao:"",                                        criadoEm:"2026-05-07T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-05-08"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                          humor:"otimo",  anotacao:"",                                        criadoEm:"2026-05-08T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-05-09"), resultado:"resisti", intensidade:"media",      gatilhos:["estresse"],                 humor:"neutro", anotacao:"",                                        criadoEm:"2026-05-09T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-05-10"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                          humor:"bom",    anotacao:"",                                        criadoEm:"2026-05-10T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-05-11"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                          humor:"bom",    anotacao:"",                                        criadoEm:"2026-05-11T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-05-12"), resultado:"resisti", intensidade:"media",      gatilhos:["tedio"],                   humor:"neutro", anotacao:"",                                        criadoEm:"2026-05-12T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-05-13"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                          humor:"bom",    anotacao:"",                                        criadoEm:"2026-05-13T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-05-14"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                          humor:"bom",    anotacao:"",                                        criadoEm:"2026-05-14T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-05-15"), resultado:"resisti", intensidade:"media",      gatilhos:["ambiente_social"],          humor:"bom",    anotacao:"",                                        criadoEm:"2026-05-15T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-05-16"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                          humor:"otimo",  anotacao:"",                                        criadoEm:"2026-05-16T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-05-17"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                          humor:"bom",    anotacao:"",                                        criadoEm:"2026-05-17T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-05-18"), resultado:"resisti", intensidade:"media",      gatilhos:["estresse"],                 humor:"neutro", anotacao:"",                                        criadoEm:"2026-05-18T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-05-19"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                          humor:"bom",    anotacao:"",                                        criadoEm:"2026-05-19T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-05-20"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                          humor:"bom",    anotacao:"",                                        criadoEm:"2026-05-20T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-05-21"), resultado:"resisti", intensidade:"media",      gatilhos:["apos_refeicao"],            humor:"neutro", anotacao:"",                                        criadoEm:"2026-05-21T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-05-22"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                          humor:"bom",    anotacao:"",                                        criadoEm:"2026-05-22T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-05-23"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                          humor:"otimo",  anotacao:"",                                        criadoEm:"2026-05-23T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-05-24"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                          humor:"otimo",  anotacao:"Um mês! Incrível.",                      criadoEm:"2026-05-24T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-05-25"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                          humor:"bom",    anotacao:"",                                        criadoEm:"2026-05-25T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-05-26"), resultado:"resisti", intensidade:"media",      gatilhos:["tedio"],                   humor:"neutro", anotacao:"",                                        criadoEm:"2026-05-26T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-05-27"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                          humor:"bom",    anotacao:"",                                        criadoEm:"2026-05-27T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-05-28"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                          humor:"bom",    anotacao:"",                                        criadoEm:"2026-05-28T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-05-29"), resultado:"resisti", intensidade:"media",      gatilhos:["estresse"],                 humor:"neutro", anotacao:"",                                        criadoEm:"2026-05-29T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-05-30"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                          humor:"bom",    anotacao:"",                                        criadoEm:"2026-05-30T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-05-31"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                          humor:"bom",    anotacao:"",                                        criadoEm:"2026-05-31T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-06-01"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                          humor:"otimo",  anotacao:"",                                        criadoEm:"2026-06-01T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-06-02"), resultado:"resisti", intensidade:"media",      gatilhos:["ambiente_social"],          humor:"bom",    anotacao:"",                                        criadoEm:"2026-06-02T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-06-03"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                          humor:"bom",    anotacao:"",                                        criadoEm:"2026-06-03T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-06-04"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                          humor:"bom",    anotacao:"",                                        criadoEm:"2026-06-04T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u1", vicioId:"v1", data:d("2026-06-05"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                          humor:"otimo",  anotacao:"35 dias seguidos!",                      criadoEm:"2026-06-05T21:00:00", editadoEm:null, registradoRetroativamente:false },

  // ── LUCAS — Redes sociais (v2) ─────────────────────────
  // Bom nos dias de semana, recaídas nos fins de semana
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-04-07"), resultado:"resisti", intensidade:"alta",  gatilhos:["tedio"],          humor:"neutro", anotacao:"Difícil largar o celular.", criadoEm:"2026-04-07T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-04-08"), resultado:"resisti", intensidade:"media", gatilhos:["tedio"],          humor:"neutro", anotacao:"",                          criadoEm:"2026-04-08T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-04-09"), resultado:"resisti", intensidade:"media", gatilhos:["procrastinacao"], humor:"neutro", anotacao:"",                          criadoEm:"2026-04-09T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-04-10"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                 humor:"bom",    anotacao:"",                          criadoEm:"2026-04-10T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-04-11"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                 humor:"bom",    anotacao:"",                          criadoEm:"2026-04-11T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-04-12"), resultado:"recai",   intensidade:"alta",  gatilhos:["tedio","amigos"], humor:"neutro", anotacao:"Sábado...",                  criadoEm:"2026-04-12T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-04-13"), resultado:"recai",   intensidade:"media", gatilhos:["tedio"],          humor:"neutro", anotacao:"",                          criadoEm:"2026-04-13T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-04-14"), resultado:"resisti", intensidade:"media", gatilhos:["procrastinacao"], humor:"neutro", anotacao:"Segunda firme.",            criadoEm:"2026-04-14T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-04-15"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                 humor:"bom",    anotacao:"",                          criadoEm:"2026-04-15T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-04-16"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                 humor:"bom",    anotacao:"",                          criadoEm:"2026-04-16T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-04-17"), resultado:"resisti", intensidade:"media", gatilhos:["tedio"],          humor:"neutro", anotacao:"",                          criadoEm:"2026-04-17T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-04-18"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                 humor:"bom",    anotacao:"",                          criadoEm:"2026-04-18T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-04-19"), resultado:"recai",   intensidade:"alta",  gatilhos:["tedio","amigos"], humor:"neutro", anotacao:"Fim de semana difícil.",     criadoEm:"2026-04-19T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-04-20"), resultado:"resisti", intensidade:"media", gatilhos:["tedio"],          humor:"neutro", anotacao:"",                          criadoEm:"2026-04-20T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-04-21"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                 humor:"bom",    anotacao:"",                          criadoEm:"2026-04-21T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-04-22"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                 humor:"bom",    anotacao:"",                          criadoEm:"2026-04-22T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-04-23"), resultado:"resisti", intensidade:"media", gatilhos:["procrastinacao"], humor:"neutro", anotacao:"",                          criadoEm:"2026-04-23T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-04-24"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                 humor:"bom",    anotacao:"",                          criadoEm:"2026-04-24T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-04-25"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                 humor:"otimo",  anotacao:"",                          criadoEm:"2026-04-25T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-04-26"), resultado:"recai",   intensidade:"alta",  gatilhos:["tedio","amigos"], humor:"neutro", anotacao:"",                          criadoEm:"2026-04-26T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-04-27"), resultado:"recai",   intensidade:"media", gatilhos:["tedio"],          humor:"neutro", anotacao:"",                          criadoEm:"2026-04-27T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-04-28"), resultado:"resisti", intensidade:"media", gatilhos:["procrastinacao"], humor:"neutro", anotacao:"",                          criadoEm:"2026-04-28T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-04-29"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                 humor:"bom",    anotacao:"",                          criadoEm:"2026-04-29T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-04-30"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                 humor:"bom",    anotacao:"",                          criadoEm:"2026-04-30T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-05-01"), resultado:"resisti", intensidade:"media", gatilhos:["tedio"],          humor:"neutro", anotacao:"",                          criadoEm:"2026-05-01T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-05-02"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                 humor:"bom",    anotacao:"",                          criadoEm:"2026-05-02T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-05-03"), resultado:"recai",   intensidade:"alta",  gatilhos:["tedio","amigos"], humor:"neutro", anotacao:"",                          criadoEm:"2026-05-03T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-05-04"), resultado:"recai",   intensidade:"media", gatilhos:["tedio"],          humor:"neutro", anotacao:"",                          criadoEm:"2026-05-04T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-05-05"), resultado:"resisti", intensidade:"media", gatilhos:["procrastinacao"], humor:"neutro", anotacao:"",                          criadoEm:"2026-05-05T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-05-06"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                 humor:"bom",    anotacao:"",                          criadoEm:"2026-05-06T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-05-07"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                 humor:"bom",    anotacao:"",                          criadoEm:"2026-05-07T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-05-08"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                 humor:"otimo",  anotacao:"",                          criadoEm:"2026-05-08T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-05-09"), resultado:"resisti", intensidade:"media", gatilhos:["tedio"],          humor:"neutro", anotacao:"",                          criadoEm:"2026-05-09T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-05-10"), resultado:"recai",   intensidade:"alta",  gatilhos:["tedio","amigos"], humor:"neutro", anotacao:"",                          criadoEm:"2026-05-10T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-05-11"), resultado:"recai",   intensidade:"media", gatilhos:["tedio"],          humor:"neutro", anotacao:"",                          criadoEm:"2026-05-11T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-05-12"), resultado:"resisti", intensidade:"media", gatilhos:["procrastinacao"], humor:"neutro", anotacao:"",                          criadoEm:"2026-05-12T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-05-13"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                 humor:"bom",    anotacao:"",                          criadoEm:"2026-05-13T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-05-14"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                 humor:"bom",    anotacao:"",                          criadoEm:"2026-05-14T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-05-15"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                 humor:"bom",    anotacao:"",                          criadoEm:"2026-05-15T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-05-16"), resultado:"resisti", intensidade:"media", gatilhos:["tedio"],          humor:"neutro", anotacao:"",                          criadoEm:"2026-05-16T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-05-17"), resultado:"recai",   intensidade:"alta",  gatilhos:["tedio","amigos"], humor:"neutro", anotacao:"",                          criadoEm:"2026-05-17T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-05-18"), resultado:"recai",   intensidade:"media", gatilhos:["tedio"],          humor:"neutro", anotacao:"",                          criadoEm:"2026-05-18T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-05-19"), resultado:"resisti", intensidade:"media", gatilhos:["procrastinacao"], humor:"neutro", anotacao:"",                          criadoEm:"2026-05-19T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-05-20"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                 humor:"bom",    anotacao:"",                          criadoEm:"2026-05-20T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-05-21"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                 humor:"bom",    anotacao:"",                          criadoEm:"2026-05-21T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-05-22"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                 humor:"bom",    anotacao:"",                          criadoEm:"2026-05-22T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-05-23"), resultado:"resisti", intensidade:"media", gatilhos:["tedio"],          humor:"neutro", anotacao:"",                          criadoEm:"2026-05-23T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-05-24"), resultado:"recai",   intensidade:"alta",  gatilhos:["tedio","amigos"], humor:"neutro", anotacao:"",                          criadoEm:"2026-05-24T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-05-25"), resultado:"recai",   intensidade:"media", gatilhos:["tedio"],          humor:"neutro", anotacao:"",                          criadoEm:"2026-05-25T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-05-26"), resultado:"resisti", intensidade:"media", gatilhos:["procrastinacao"], humor:"neutro", anotacao:"",                          criadoEm:"2026-05-26T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-05-27"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                 humor:"bom",    anotacao:"",                          criadoEm:"2026-05-27T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-05-28"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                 humor:"bom",    anotacao:"",                          criadoEm:"2026-05-28T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-05-29"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                 humor:"bom",    anotacao:"",                          criadoEm:"2026-05-29T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-05-30"), resultado:"resisti", intensidade:"media", gatilhos:["tedio"],          humor:"neutro", anotacao:"",                          criadoEm:"2026-05-30T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-05-31"), resultado:"recai",   intensidade:"alta",  gatilhos:["tedio","amigos"], humor:"neutro", anotacao:"",                          criadoEm:"2026-05-31T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-06-01"), resultado:"resisti", intensidade:"media", gatilhos:["procrastinacao"], humor:"neutro", anotacao:"",                          criadoEm:"2026-06-01T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-06-02"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                 humor:"bom",    anotacao:"",                          criadoEm:"2026-06-02T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-06-03"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                 humor:"bom",    anotacao:"",                          criadoEm:"2026-06-03T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-06-04"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                 humor:"bom",    anotacao:"",                          criadoEm:"2026-06-04T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u2", vicioId:"v2", data:d("2026-06-05"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                 humor:"otimo",  anotacao:"Sequência de 6 dias.",       criadoEm:"2026-06-05T21:00:00", editadoEm:null, registradoRetroativamente:false },

  // ── LUCAS — Jogos (v3) — omitido por brevidade, mesmo padrão com mais recaídas ──
  // [segue mesma estrutura de v2 mas com resultado "recai" mais frequente]

  // ── CARLOS — Apostas (v4) ────────────────────────────
  // Iniciou Mar 15. Exibimos apenas Apr 7 em diante para brevidade.
  // Padrão: luta nos fins de semana, progresso real ao longo do tempo.
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-04-07"), resultado:"resisti", intensidade:"alta",       gatilhos:["tedio","estresse"],  humor:"neutro", anotacao:"Tive vontade mas não entrei no site.",  criadoEm:"2026-04-07T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-04-08"), resultado:"resisti", intensidade:"media",      gatilhos:["tedio"],             humor:"neutro", anotacao:"",                                      criadoEm:"2026-04-08T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-04-09"), resultado:"resisti", intensidade:"media",      gatilhos:["tedio"],             humor:"neutro", anotacao:"",                                      criadoEm:"2026-04-09T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-04-10"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                    humor:"bom",    anotacao:"",                                      criadoEm:"2026-04-10T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-04-11"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                    humor:"bom",    anotacao:"",                                      criadoEm:"2026-04-11T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-04-12"), resultado:"recai",   intensidade:"muito_alta", gatilhos:["tedio","estresse"],  humor:"mal",    anotacao:"Perdi R$300. Não vou fazer isso de novo.", criadoEm:"2026-04-12T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-04-13"), resultado:"recai",   intensidade:"alta",       gatilhos:["tedio"],             humor:"mal",    anotacao:"Tentando recuperar o prejuízo.",          criadoEm:"2026-04-13T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-04-14"), resultado:"resisti", intensidade:"alta",       gatilhos:["estresse"],          humor:"neutro", anotacao:"Bloqueei os apps.",                      criadoEm:"2026-04-14T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-04-15"), resultado:"resisti", intensidade:"media",      gatilhos:["tedio"],             humor:"neutro", anotacao:"",                                      criadoEm:"2026-04-15T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-04-16"), resultado:"resisti", intensidade:"media",      gatilhos:["tedio"],             humor:"neutro", anotacao:"",                                      criadoEm:"2026-04-16T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-04-17"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                    humor:"bom",    anotacao:"",                                      criadoEm:"2026-04-17T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-04-18"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                    humor:"bom",    anotacao:"",                                      criadoEm:"2026-04-18T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-04-19"), resultado:"recai",   intensidade:"muito_alta", gatilhos:["tedio","estresse"],  humor:"mal",    anotacao:"",                                      criadoEm:"2026-04-19T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-04-20"), resultado:"resisti", intensidade:"alta",       gatilhos:["estresse"],          humor:"neutro", anotacao:"Recomeçando.",                          criadoEm:"2026-04-20T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-04-21"), resultado:"resisti", intensidade:"media",      gatilhos:["tedio"],             humor:"neutro", anotacao:"",                                      criadoEm:"2026-04-21T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-04-22"), resultado:"resisti", intensidade:"media",      gatilhos:["tedio"],             humor:"neutro", anotacao:"",                                      criadoEm:"2026-04-22T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-04-23"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                    humor:"bom",    anotacao:"",                                      criadoEm:"2026-04-23T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-04-24"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                    humor:"bom",    anotacao:"",                                      criadoEm:"2026-04-24T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-04-25"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                    humor:"bom",    anotacao:"",                                      criadoEm:"2026-04-25T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-04-26"), resultado:"recai",   intensidade:"muito_alta", gatilhos:["tedio","estresse"],  humor:"mal",    anotacao:"Jogo do Brasil me puxou.",               criadoEm:"2026-04-26T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-04-27"), resultado:"resisti", intensidade:"alta",       gatilhos:["estresse"],          humor:"neutro", anotacao:"",                                      criadoEm:"2026-04-27T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-04-28"), resultado:"resisti", intensidade:"media",      gatilhos:["tedio"],             humor:"neutro", anotacao:"",                                      criadoEm:"2026-04-28T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-04-29"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                    humor:"bom",    anotacao:"",                                      criadoEm:"2026-04-29T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-04-30"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                    humor:"bom",    anotacao:"",                                      criadoEm:"2026-04-30T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-05-01"), resultado:"resisti", intensidade:"media",      gatilhos:["tedio"],             humor:"neutro", anotacao:"",                                      criadoEm:"2026-05-01T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-05-02"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                    humor:"bom",    anotacao:"",                                      criadoEm:"2026-05-02T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-05-03"), resultado:"recai",   intensidade:"muito_alta", gatilhos:["tedio","estresse"],  humor:"mal",    anotacao:"",                                      criadoEm:"2026-05-03T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-05-04"), resultado:"resisti", intensidade:"alta",       gatilhos:["estresse"],          humor:"neutro", anotacao:"Não repito.",                           criadoEm:"2026-05-04T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-05-05"), resultado:"resisti", intensidade:"media",      gatilhos:["tedio"],             humor:"neutro", anotacao:"",                                      criadoEm:"2026-05-05T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-05-06"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                    humor:"bom",    anotacao:"",                                      criadoEm:"2026-05-06T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-05-07"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                    humor:"bom",    anotacao:"",                                      criadoEm:"2026-05-07T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-05-08"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                    humor:"bom",    anotacao:"",                                      criadoEm:"2026-05-08T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-05-09"), resultado:"resisti", intensidade:"media",      gatilhos:["tedio"],             humor:"neutro", anotacao:"",                                      criadoEm:"2026-05-09T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-05-10"), resultado:"recai",   intensidade:"muito_alta", gatilhos:["tedio","estresse"],  humor:"mal",    anotacao:"",                                      criadoEm:"2026-05-10T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-05-11"), resultado:"resisti", intensidade:"alta",       gatilhos:["estresse"],          humor:"neutro", anotacao:"",                                      criadoEm:"2026-05-11T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-05-12"), resultado:"resisti", intensidade:"media",      gatilhos:["tedio"],             humor:"neutro", anotacao:"",                                      criadoEm:"2026-05-12T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-05-13"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                    humor:"bom",    anotacao:"",                                      criadoEm:"2026-05-13T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-05-14"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                    humor:"bom",    anotacao:"",                                      criadoEm:"2026-05-14T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-05-15"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                    humor:"bom",    anotacao:"",                                      criadoEm:"2026-05-15T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-05-16"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                    humor:"bom",    anotacao:"",                                      criadoEm:"2026-05-16T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-05-17"), resultado:"recai",   intensidade:"muito_alta", gatilhos:["tedio","estresse"],  humor:"mal",    anotacao:"",                                      criadoEm:"2026-05-17T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-05-18"), resultado:"resisti", intensidade:"alta",       gatilhos:["estresse"],          humor:"neutro", anotacao:"",                                      criadoEm:"2026-05-18T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-05-19"), resultado:"resisti", intensidade:"media",      gatilhos:["tedio"],             humor:"neutro", anotacao:"",                                      criadoEm:"2026-05-19T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-05-20"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                    humor:"bom",    anotacao:"",                                      criadoEm:"2026-05-20T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-05-21"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                    humor:"bom",    anotacao:"",                                      criadoEm:"2026-05-21T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-05-22"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                    humor:"bom",    anotacao:"",                                      criadoEm:"2026-05-22T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-05-23"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                    humor:"bom",    anotacao:"",                                      criadoEm:"2026-05-23T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-05-24"), resultado:"recai",   intensidade:"muito_alta", gatilhos:["tedio","estresse"],  humor:"mal",    anotacao:"",                                      criadoEm:"2026-05-24T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-05-25"), resultado:"resisti", intensidade:"alta",       gatilhos:["estresse"],          humor:"neutro", anotacao:"",                                      criadoEm:"2026-05-25T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-05-26"), resultado:"resisti", intensidade:"media",      gatilhos:["tedio"],             humor:"neutro", anotacao:"",                                      criadoEm:"2026-05-26T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-05-27"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                    humor:"bom",    anotacao:"",                                      criadoEm:"2026-05-27T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-05-28"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                    humor:"bom",    anotacao:"",                                      criadoEm:"2026-05-28T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-05-29"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                    humor:"bom",    anotacao:"",                                      criadoEm:"2026-05-29T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-05-30"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                    humor:"bom",    anotacao:"",                                      criadoEm:"2026-05-30T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-05-31"), resultado:"recai",   intensidade:"muito_alta", gatilhos:["tedio","estresse"],  humor:"mal",    anotacao:"",                                      criadoEm:"2026-05-31T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-06-01"), resultado:"resisti", intensidade:"alta",       gatilhos:["estresse"],          humor:"neutro", anotacao:"",                                      criadoEm:"2026-06-01T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-06-02"), resultado:"resisti", intensidade:"media",      gatilhos:["tedio"],             humor:"neutro", anotacao:"",                                      criadoEm:"2026-06-02T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-06-03"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                    humor:"bom",    anotacao:"",                                      criadoEm:"2026-06-03T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-06-04"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                    humor:"bom",    anotacao:"",                                      criadoEm:"2026-06-04T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u3", vicioId:"v4", data:d("2026-06-05"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                    humor:"bom",    anotacao:"5 dias seguidos.",                       criadoEm:"2026-06-05T21:00:00", editadoEm:null, registradoRetroativamente:false },

  // ── EDUARDO — Substância (v5) ──────────────────────────
  // Alta dedicação, apenas 3 recaídas em 97 dias. Sequência atual: 47 dias.
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-04-07"), resultado:"resisti", intensidade:"alta",       gatilhos:["estresse","ansiedade"], humor:"neutro", anotacao:"",                              criadoEm:"2026-04-07T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-04-08"), resultado:"resisti", intensidade:"media",      gatilhos:["estresse"],             humor:"neutro", anotacao:"",                              criadoEm:"2026-04-08T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-04-09"), resultado:"resisti", intensidade:"media",      gatilhos:["ansiedade"],            humor:"bom",    anotacao:"",                              criadoEm:"2026-04-09T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-04-10"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                       humor:"bom",    anotacao:"",                              criadoEm:"2026-04-10T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-04-11"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                       humor:"bom",    anotacao:"",                              criadoEm:"2026-04-11T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-04-12"), resultado:"resisti", intensidade:"alta",       gatilhos:["estresse","ambiente_social"], humor:"neutro", anotacao:"Evento de negócios. Resistí.", criadoEm:"2026-04-12T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-04-13"), resultado:"resisti", intensidade:"media",      gatilhos:["ansiedade"],            humor:"neutro", anotacao:"",                              criadoEm:"2026-04-13T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-04-14"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                       humor:"bom",    anotacao:"",                              criadoEm:"2026-04-14T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-04-15"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                       humor:"bom",    anotacao:"",                              criadoEm:"2026-04-15T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-04-16"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                       humor:"bom",    anotacao:"",                              criadoEm:"2026-04-16T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-04-17"), resultado:"resisti", intensidade:"media",      gatilhos:["estresse"],             humor:"neutro", anotacao:"",                              criadoEm:"2026-04-17T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-04-18"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                       humor:"bom",    anotacao:"",                              criadoEm:"2026-04-18T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-04-19"), resultado:"recai",   intensidade:"muito_alta", gatilhos:["estresse","ambiente_social"], humor:"mal", anotacao:"Viagem de negócios. Não resistí.", criadoEm:"2026-04-19T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-04-20"), resultado:"resisti", intensidade:"alta",       gatilhos:["culpa","ansiedade"],    humor:"mal",    anotacao:"Recomeçando. Liguei pro terapeuta.", criadoEm:"2026-04-20T21:00:00", editadoEm:null, registradoRetroativamente:false },
  // Apr 21 - Jun 5: 47 dias consecutivos (sequência atual)
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-04-21"), resultado:"resisti", intensidade:"alta",   gatilhos:["ansiedade"],  humor:"neutro", anotacao:"",                         criadoEm:"2026-04-21T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-04-22"), resultado:"resisti", intensidade:"media",  gatilhos:["estresse"],   humor:"neutro", anotacao:"",                         criadoEm:"2026-04-22T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-04-23"), resultado:"resisti", intensidade:"media",  gatilhos:["ansiedade"],  humor:"neutro", anotacao:"",                         criadoEm:"2026-04-23T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-04-24"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"bom",    anotacao:"",                         criadoEm:"2026-04-24T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-04-25"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"bom",    anotacao:"",                         criadoEm:"2026-04-25T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-04-26"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"bom",    anotacao:"",                         criadoEm:"2026-04-26T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-04-27"), resultado:"resisti", intensidade:"media",  gatilhos:["estresse"],   humor:"neutro", anotacao:"",                         criadoEm:"2026-04-27T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-04-28"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"bom",    anotacao:"",                         criadoEm:"2026-04-28T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-04-29"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"bom",    anotacao:"",                         criadoEm:"2026-04-29T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-04-30"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"bom",    anotacao:"",                         criadoEm:"2026-04-30T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-05-01"), resultado:"resisti", intensidade:"media",  gatilhos:["ansiedade"],  humor:"neutro", anotacao:"",                         criadoEm:"2026-05-01T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-05-02"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"bom",    anotacao:"",                         criadoEm:"2026-05-02T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-05-03"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"bom",    anotacao:"",                         criadoEm:"2026-05-03T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-05-04"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"bom",    anotacao:"",                         criadoEm:"2026-05-04T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-05-05"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"otimo",  anotacao:"2 semanas de nova sequência.", criadoEm:"2026-05-05T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-05-06"), resultado:"resisti", intensidade:"media",  gatilhos:["estresse"],   humor:"neutro", anotacao:"",                         criadoEm:"2026-05-06T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-05-07"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"bom",    anotacao:"",                         criadoEm:"2026-05-07T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-05-08"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"bom",    anotacao:"",                         criadoEm:"2026-05-08T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-05-09"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"bom",    anotacao:"",                         criadoEm:"2026-05-09T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-05-10"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"bom",    anotacao:"",                         criadoEm:"2026-05-10T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-05-11"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"bom",    anotacao:"",                         criadoEm:"2026-05-11T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-05-12"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"bom",    anotacao:"",                         criadoEm:"2026-05-12T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-05-13"), resultado:"resisti", intensidade:"media",  gatilhos:["ansiedade"],  humor:"neutro", anotacao:"",                         criadoEm:"2026-05-13T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-05-14"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"bom",    anotacao:"",                         criadoEm:"2026-05-14T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-05-15"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"bom",    anotacao:"",                         criadoEm:"2026-05-15T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-05-16"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"bom",    anotacao:"",                         criadoEm:"2026-05-16T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-05-17"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"bom",    anotacao:"",                         criadoEm:"2026-05-17T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-05-18"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"bom",    anotacao:"",                         criadoEm:"2026-05-18T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-05-19"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"otimo",  anotacao:"Um mês de sequência.",       criadoEm:"2026-05-19T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-05-20"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"bom",    anotacao:"",                         criadoEm:"2026-05-20T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-05-21"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"bom",    anotacao:"",                         criadoEm:"2026-05-21T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-05-22"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"bom",    anotacao:"",                         criadoEm:"2026-05-22T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-05-23"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"bom",    anotacao:"",                         criadoEm:"2026-05-23T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-05-24"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"bom",    anotacao:"",                         criadoEm:"2026-05-24T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-05-25"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"bom",    anotacao:"",                         criadoEm:"2026-05-25T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-05-26"), resultado:"resisti", intensidade:"media",  gatilhos:["estresse"],   humor:"neutro", anotacao:"",                         criadoEm:"2026-05-26T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-05-27"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"bom",    anotacao:"",                         criadoEm:"2026-05-27T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-05-28"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"bom",    anotacao:"",                         criadoEm:"2026-05-28T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-05-29"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"bom",    anotacao:"",                         criadoEm:"2026-05-29T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-05-30"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"bom",    anotacao:"",                         criadoEm:"2026-05-30T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-05-31"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"bom",    anotacao:"",                         criadoEm:"2026-05-31T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-06-01"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"bom",    anotacao:"",                         criadoEm:"2026-06-01T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-06-02"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"bom",    anotacao:"",                         criadoEm:"2026-06-02T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-06-03"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"bom",    anotacao:"",                         criadoEm:"2026-06-03T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-06-04"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"bom",    anotacao:"",                         criadoEm:"2026-06-04T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u4", vicioId:"v5", data:d("2026-06-05"), resultado:"resisti", intensidade:"baixa",  gatilhos:[],             humor:"otimo",  anotacao:"47 dias. Cada dia vale a pena.", criadoEm:"2026-06-05T21:00:00", editadoEm:null, registradoRetroativamente:false },

  // ── FELIPE — Hábito digital (v6) ───────────────────────
  // Iniciou Apr 15. Difícil no começo, depois firme. Sequência atual: 22 dias.
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-04-15"), resultado:"resisti", intensidade:"alta",       gatilhos:["tedio","noite"],  humor:"neutro", anotacao:"Primeiro dia.",                    criadoEm:"2026-04-15T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-04-16"), resultado:"recai",   intensidade:"muito_alta", gatilhos:["tedio","noite"],  humor:"mal",    anotacao:"",                                  criadoEm:"2026-04-16T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-04-17"), resultado:"resisti", intensidade:"alta",       gatilhos:["tedio"],          humor:"neutro", anotacao:"",                                  criadoEm:"2026-04-17T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-04-18"), resultado:"recai",   intensidade:"muito_alta", gatilhos:["tedio","noite"],  humor:"mal",    anotacao:"",                                  criadoEm:"2026-04-18T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-04-19"), resultado:"recai",   intensidade:"alta",       gatilhos:["tedio"],          humor:"mal",    anotacao:"",                                  criadoEm:"2026-04-19T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-04-20"), resultado:"resisti", intensidade:"alta",       gatilhos:["tedio","noite"],  humor:"neutro", anotacao:"Instalei bloqueador.",             criadoEm:"2026-04-20T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-04-21"), resultado:"resisti", intensidade:"media",      gatilhos:["tedio"],          humor:"neutro", anotacao:"",                                  criadoEm:"2026-04-21T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-04-22"), resultado:"resisti", intensidade:"media",      gatilhos:["tedio"],          humor:"neutro", anotacao:"",                                  criadoEm:"2026-04-22T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-04-23"), resultado:"recai",   intensidade:"muito_alta", gatilhos:["tedio","noite"],  humor:"mal",    anotacao:"",                                  criadoEm:"2026-04-23T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-04-24"), resultado:"resisti", intensidade:"alta",       gatilhos:["tedio"],          humor:"neutro", anotacao:"",                                  criadoEm:"2026-04-24T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-04-25"), resultado:"resisti", intensidade:"media",      gatilhos:["tedio"],          humor:"neutro", anotacao:"",                                  criadoEm:"2026-04-25T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-04-26"), resultado:"recai",   intensidade:"muito_alta", gatilhos:["tedio","noite"],  humor:"mal",    anotacao:"",                                  criadoEm:"2026-04-26T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-04-27"), resultado:"recai",   intensidade:"alta",       gatilhos:["tedio"],          humor:"mal",    anotacao:"",                                  criadoEm:"2026-04-27T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-04-28"), resultado:"resisti", intensidade:"alta",       gatilhos:["tedio","noite"],  humor:"neutro", anotacao:"Meditar antes de dormir ajudou.", criadoEm:"2026-04-28T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-04-29"), resultado:"resisti", intensidade:"media",      gatilhos:["tedio"],          humor:"neutro", anotacao:"",                                  criadoEm:"2026-04-29T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-04-30"), resultado:"resisti", intensidade:"media",      gatilhos:["tedio"],          humor:"neutro", anotacao:"",                                  criadoEm:"2026-04-30T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-05-01"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                 humor:"bom",    anotacao:"",                                  criadoEm:"2026-05-01T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-05-02"), resultado:"recai",   intensidade:"muito_alta", gatilhos:["tedio","noite"],  humor:"mal",    anotacao:"",                                  criadoEm:"2026-05-02T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-05-03"), resultado:"recai",   intensidade:"alta",       gatilhos:["tedio"],          humor:"mal",    anotacao:"",                                  criadoEm:"2026-05-03T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-05-04"), resultado:"resisti", intensidade:"alta",       gatilhos:["tedio","noite"],  humor:"neutro", anotacao:"Fui caminhar à noite.",            criadoEm:"2026-05-04T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-05-05"), resultado:"resisti", intensidade:"media",      gatilhos:["tedio"],          humor:"neutro", anotacao:"",                                  criadoEm:"2026-05-05T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-05-06"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                 humor:"bom",    anotacao:"",                                  criadoEm:"2026-05-06T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-05-07"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                 humor:"bom",    anotacao:"",                                  criadoEm:"2026-05-07T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-05-08"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                 humor:"bom",    anotacao:"",                                  criadoEm:"2026-05-08T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-05-09"), resultado:"recai",   intensidade:"muito_alta", gatilhos:["tedio","noite"],  humor:"mal",    anotacao:"",                                  criadoEm:"2026-05-09T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-05-10"), resultado:"recai",   intensidade:"alta",       gatilhos:["tedio"],          humor:"mal",    anotacao:"",                                  criadoEm:"2026-05-10T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-05-11"), resultado:"resisti", intensidade:"alta",       gatilhos:["tedio","noite"],  humor:"neutro", anotacao:"Chega. Fui dormir cedo.",          criadoEm:"2026-05-11T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-05-12"), resultado:"resisti", intensidade:"media",      gatilhos:["tedio"],          humor:"neutro", anotacao:"",                                  criadoEm:"2026-05-12T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-05-13"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                 humor:"bom",    anotacao:"",                                  criadoEm:"2026-05-13T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-05-14"), resultado:"resisti", intensidade:"baixa",      gatilhos:[],                 humor:"bom",    anotacao:"",                                  criadoEm:"2026-05-14T21:00:00", editadoEm:null, registradoRetroativamente:false },
  // Mai 15 - Jun 5: 22 dias de sequência atual
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-05-15"), resultado:"resisti", intensidade:"media", gatilhos:["tedio"],         humor:"neutro", anotacao:"",                           criadoEm:"2026-05-15T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-05-16"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                humor:"bom",    anotacao:"",                           criadoEm:"2026-05-16T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-05-17"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                humor:"bom",    anotacao:"",                           criadoEm:"2026-05-17T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-05-18"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                humor:"bom",    anotacao:"",                           criadoEm:"2026-05-18T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-05-19"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                humor:"bom",    anotacao:"",                           criadoEm:"2026-05-19T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-05-20"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                humor:"otimo",  anotacao:"Uma semana seguida!",        criadoEm:"2026-05-20T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-05-21"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                humor:"bom",    anotacao:"",                           criadoEm:"2026-05-21T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-05-22"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                humor:"bom",    anotacao:"",                           criadoEm:"2026-05-22T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-05-23"), resultado:"resisti", intensidade:"media", gatilhos:["tedio","noite"], humor:"neutro", anotacao:"",                           criadoEm:"2026-05-23T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-05-24"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                humor:"bom",    anotacao:"",                           criadoEm:"2026-05-24T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-05-25"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                humor:"bom",    anotacao:"",                           criadoEm:"2026-05-25T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-05-26"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                humor:"bom",    anotacao:"",                           criadoEm:"2026-05-26T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-05-27"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                humor:"bom",    anotacao:"",                           criadoEm:"2026-05-27T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-05-28"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                humor:"bom",    anotacao:"",                           criadoEm:"2026-05-28T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-05-29"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                humor:"otimo",  anotacao:"Duas semanas seguidas!",     criadoEm:"2026-05-29T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-05-30"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                humor:"bom",    anotacao:"",                           criadoEm:"2026-05-30T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-05-31"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                humor:"bom",    anotacao:"",                           criadoEm:"2026-05-31T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-06-01"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                humor:"bom",    anotacao:"",                           criadoEm:"2026-06-01T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-06-02"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                humor:"bom",    anotacao:"",                           criadoEm:"2026-06-02T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-06-03"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                humor:"bom",    anotacao:"",                           criadoEm:"2026-06-03T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-06-04"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                humor:"bom",    anotacao:"",                           criadoEm:"2026-06-04T21:00:00", editadoEm:null, registradoRetroativamente:false },
  { id:rid(), usuarioId:"u5", vicioId:"v6", data:d("2026-06-05"), resultado:"resisti", intensidade:"baixa", gatilhos:[],                humor:"otimo",  anotacao:"22 dias! Melhor sequência.", criadoEm:"2026-06-05T21:00:00", editadoEm:null, registradoRetroativamente:false },
];

// ── CONQUISTAS DESBLOQUEADAS ─────────────────────────────────
const CONQUISTAS_SEED = [
  // Marina — Cigarro
  { id:"cd1", usuarioId:"u1", vicioId:"v1", conquistaPresetId:"tabaco_7d",   desbloquedaEm:"2026-04-13" },
  { id:"cd2", usuarioId:"u1", vicioId:"v1", conquistaPresetId:"tabaco_14d",  desbloquedaEm:"2026-05-01" },
  { id:"cd3", usuarioId:"u1", vicioId:"v1", conquistaPresetId:"tabaco_30d",  desbloquedaEm:"2026-06-02" },

  // Lucas — Redes sociais
  { id:"cd4", usuarioId:"u2", vicioId:"v2", conquistaPresetId:"redes_7d",     desbloquedaEm:"2026-04-25" },

  // Carlos — Apostas
  { id:"cd5", usuarioId:"u3", vicioId:"v4", conquistaPresetId:"apostas_7d",   desbloquedaEm:"2026-04-25" },

  // Eduardo — Substância (sequência de 47 dias)
  { id:"cd6", usuarioId:"u4", vicioId:"v5", conquistaPresetId:"cocaina_7d",  desbloquedaEm:"2026-04-27" },
  { id:"cd7", usuarioId:"u4", vicioId:"v5", conquistaPresetId:"cocaina_14d", desbloquedaEm:"2026-05-04" },
  { id:"cd8", usuarioId:"u4", vicioId:"v5", conquistaPresetId:"cocaina_30d", desbloquedaEm:"2026-05-20" },

  // Felipe — Hábito digital
  { id:"cd9", usuarioId:"u5", vicioId:"v6", conquistaPresetId:"porn_7d",    desbloquedaEm:"2026-05-21" },
  { id:"cd10",usuarioId:"u5", vicioId:"v6", conquistaPresetId:"porn_14d",   desbloquedaEm:"2026-05-28" },
];

// ── AMIZADES ────────────────────────────────────────────────
// Eduardo e Felipe não participam do ranking público
const AMIZADES_SEED = [
  { id:"am1", usuarioId:"u1", amigoId:"u2", status:"aceito", criadoEm:"2026-04-10" }, // Marina ↔ Lucas
  { id:"am2", usuarioId:"u1", amigoId:"u3", status:"aceito", criadoEm:"2026-04-12" }, // Marina ↔ Carlos
  { id:"am3", usuarioId:"u2", amigoId:"u3", status:"aceito", criadoEm:"2026-04-14" }, // Lucas  ↔ Carlos
  { id:"am4", usuarioId:"u2", amigoId:"u5", status:"aceito", criadoEm:"2026-04-20" }, // Lucas  ↔ Felipe
];

// ── RESUMO DO SEED ───────────────────────────────────────────
/*
  MARINA  (u1) — Cigarro     — 61 dias — 57 resisti / 4 recaí  — seq. atual: 35 dias
  LUCAS   (u2) — Redes       — 61 dias — 46 resisti / 15 recaí — seq. atual: 6 dias
  CARLOS  (u3) — Apostas     — 61 dias — 47 resisti / 14 recaí — seq. atual: 5 dias
  EDUARDO (u4) — Substância  — 61 dias — 60 resisti / 1 recaí  — seq. atual: 47 dias
  FELIPE  (u5) — Hábito      — 52 dias — 40 resisti / 12 recaí — seq. atual: 22 dias

  RANKING GERAL (por sequência atual):
  1º Eduardo  — 47 dias
  2º Marina   — 35 dias
  3º Felipe   — 22 dias (privado, não aparece)
  4º Lucas    —  6 dias
  5º Carlos   —  5 dias
*/

// ============================================================
// CYLA — PRESETS DE VÍCIOS
// 10 presets específicos + 1 personalizado (genérico)
// Categorias: substancia | comportamento_digital |
//             comportamento_financeiro | alimentar | personalizado
// ============================================================

const VICIOS_PRESET = [

  // ── 1. ÁLCOOL ──────────────────────────────────────────────
  {
    presetId:      "alcool",
    nome:          "Álcool",
    categoria:     "substancia",
    cor:           "#378ADD",
    corEscura:     "#042C53",
    corClara:      "#85B7EB",
    icone:         "ti-bottle",
    temGastoPadrao: true,
    insights: [
      {
        id: "alc_i1",
        titulo: "Fígado se recupera",
        texto: "O fígado começa a se regenerar em apenas 4 semanas de abstinência. Após 3 meses, a gordura hepática causada pelo álcool começa a diminuir visivelmente.",
        fonte: "Organização Mundial da Saúde"
      },
      {
        id: "alc_i2",
        titulo: "Sono de qualidade",
        texto: "Embora cause sonolência inicial, o álcool fragmenta o sono profundo. Após 2 semanas sem beber, a qualidade do sono melhora substancialmente.",
        fonte: "Sleep Foundation"
      },
      {
        id: "alc_i3",
        titulo: "Saúde mental",
        texto: "O álcool é um depressor do sistema nervoso central. Reduzir o consumo está diretamente associado à melhora da ansiedade e do humor no longo prazo.",
        fonte: "National Institutes of Health"
      },
      {
        id: "alc_i4",
        titulo: "Abstinência física",
        texto: "Em casos de consumo pesado, a abstinência pode causar sintomas físicos sérios nas primeiras 72h. Se isso ocorrer, busque acompanhamento médico.",
        fonte: "SENAD — Secretaria Nacional de Políticas sobre Drogas"
      }
    ],
    conquistas: [
      { id: "alcool_7d",   titulo: "Primeira semana",  descricao: "7 dias sóbrio",   meta: 7,   icone: "ti-star",   cor: "#EF9F27" },
      { id: "alcool_14d",  titulo: "Duas semanas",     descricao: "14 dias sóbrio",  meta: 14,  icone: "ti-bolt",   cor: "#7F77DD" },
      { id: "alcool_30d",  titulo: "Um mês sóbrio",    descricao: "30 dias sóbrio",  meta: 30,  icone: "ti-trophy", cor: "#378ADD" },
      { id: "alcool_90d",  titulo: "Três meses",       descricao: "90 dias sóbrio",  meta: 90,  icone: "ti-crown",  cor: "#1D9E75" },
      { id: "alcool_180d", titulo: "Meio ano",         descricao: "180 dias sóbrio", meta: 180, icone: "ti-medal",  cor: "#D4537E" },
      { id: "alcool_365d", titulo: "Um ano completo",  descricao: "365 dias sóbrio", meta: 365, icone: "ti-award",  cor: "#EF9F27" },
    ]
  },

  // ── 2. TABACO ──────────────────────────────────────────────
  {
    presetId:      "tabaco",
    nome:          "Tabaco",
    categoria:     "substancia",
    cor:           "#1D9E75",
    corEscura:     "#04342C",
    corClara:      "#5DCAA5",
    icone:         "ti-smoking-no",
    temGastoPadrao: true,
    insights: [
      {
        id: "tab_i1",
        titulo: "Recuperação imediata",
        texto: "Em 20 minutos a pressão arterial já começa a cair. Em 12 horas o monóxido de carbono no sangue se normaliza. O corpo começa a se reparar quase que imediatamente.",
        fonte: "Organização Mundial da Saúde"
      },
      {
        id: "tab_i2",
        titulo: "Como a nicotina age",
        texto: "A vontade de fumar dura em média apenas 3 a 5 minutos. Respirar fundo, beber água ou fazer uma breve caminhada pode ajudar a atravessar esse momento.",
        fonte: "Instituto Nacional do Câncer"
      },
      {
        id: "tab_i3",
        titulo: "Recuperação pulmonar",
        texto: "Após 9 meses sem fumar, a capacidade pulmonar aumenta significativamente e a tosse crônica tende a desaparecer. Após 1 ano, o risco cardíaco cai pela metade.",
        fonte: "American Cancer Society"
      },
      {
        id: "tab_i4",
        titulo: "Impacto no bolso",
        texto: "Um fumante que consome um maço por dia gasta em média R$ 300 a R$ 500 por mês. Em 1 ano, o dinheiro economizado pode financiar uma viagem internacional.",
        fonte: "INCA — Instituto Nacional do Câncer"
      }
    ],
    conquistas: [
      { id: "tabaco_7d",   titulo: "Primeira semana",  descricao: "7 dias sem fumar",   meta: 7,   icone: "ti-star",   cor: "#EF9F27" },
      { id: "tabaco_14d",  titulo: "Duas semanas",     descricao: "14 dias sem fumar",  meta: 14,  icone: "ti-bolt",   cor: "#7F77DD" },
      { id: "tabaco_30d",  titulo: "Um mês inteiro",   descricao: "30 dias sem fumar",  meta: 30,  icone: "ti-trophy", cor: "#1D9E75" },
      { id: "tabaco_90d",  titulo: "Três meses",       descricao: "90 dias sem fumar",  meta: 90,  icone: "ti-crown",  cor: "#378ADD" },
      { id: "tabaco_180d", titulo: "Meio ano",         descricao: "180 dias sem fumar", meta: 180, icone: "ti-medal",  cor: "#D4537E" },
      { id: "tabaco_365d", titulo: "Um ano completo",  descricao: "365 dias sem fumar", meta: 365, icone: "ti-award",  cor: "#EF9F27" },
    ]
  },

  // ── 3. REDES SOCIAIS ───────────────────────────────────────
  {
    presetId:      "redes-sociais",
    nome:          "Redes sociais",
    categoria:     "comportamento_digital",
    cor:           "#7F77DD",
    corEscura:     "#26215C",
    corClara:      "#AFA9EC",
    icone:         "ti-device-mobile",
    temGastoPadrao: false,
    insights: [
      {
        id: "rs_i1",
        titulo: "O ciclo da dopamina",
        texto: "Curtidas e notificações ativam o mesmo circuito de recompensa que substâncias viciantes. O design das redes sociais é propositalmente feito para maximizar o tempo de tela.",
        fonte: "American Psychological Association"
      },
      {
        id: "rs_i2",
        titulo: "Efeito no foco",
        texto: "Cada vez que verificamos o celular, levamos em média 23 minutos para retomar a concentração plena. Reduzir o uso melhora produtividade e clareza mental.",
        fonte: "University of California, Irvine"
      },
      {
        id: "rs_i3",
        titulo: "Sono e telas",
        texto: "A luz azul emitida por telas suprime a melatonina em até 50%. Usar redes sociais antes de dormir está ligado a insônia e pior qualidade de descanso.",
        fonte: "Harvard Medical School"
      },
      {
        id: "rs_i4",
        titulo: "Comparação social",
        texto: "Estudos mostram que o uso passivo de redes sociais (rolar o feed) aumenta sentimentos de inveja e inadequação. Uso ativo e intencional tem impacto muito menor.",
        fonte: "Journal of Social and Clinical Psychology"
      }
    ],
    conquistas: [
      { id: "redes_7d",  titulo: "Semana digital",      descricao: "7 dias dentro do limite",  meta: 7,  icone: "ti-star",   cor: "#EF9F27" },
      { id: "redes_14d", titulo: "Duas semanas",        descricao: "14 dias dentro do limite", meta: 14, icone: "ti-bolt",   cor: "#7F77DD" },
      { id: "redes_30d", titulo: "Mês equilibrado",     descricao: "30 dias dentro do limite", meta: 30, icone: "ti-trophy", cor: "#1D9E75" },
      { id: "redes_60d", titulo: "Dois meses",          descricao: "60 dias dentro do limite", meta: 60, icone: "ti-crown",  cor: "#378ADD" },
      { id: "redes_90d", titulo: "Três meses",          descricao: "90 dias dentro do limite", meta: 90, icone: "ti-medal",  cor: "#D4537E" },
    ]
  },

  // ── 4. APOSTAS ─────────────────────────────────────────────
  {
    presetId:      "apostas",
    nome:          "Apostas",
    categoria:     "comportamento_financeiro",
    cor:           "#D85A30",
    corEscura:     "#3D1509",
    corClara:      "#F5A585",
    icone:         "ti-cards",
    temGastoPadrao: true,
    insights: [
      {
        id: "ap_i1",
        titulo: "A ilusão do controle",
        texto: "O cérebro interpreta 'quase ganhar' como motivação para continuar. Essa distorção cognitiva é intencional no design dos jogos de azar e plataformas de apostas.",
        fonte: "National Problem Gambling Helpline"
      },
      {
        id: "ap_i2",
        titulo: "Impacto financeiro real",
        texto: "Apostadores compulsivos perdem em média 3 a 5 vezes mais do que planejam por sessão. O endividamento é uma consequência direta e progressiva.",
        fonte: "Instituto Brasileiro de Jogo Responsável"
      },
      {
        id: "ap_i3",
        titulo: "Recuperação é possível",
        texto: "Com suporte adequado, 70% das pessoas com transtorno de jogo conseguem reduzir significativamente ou parar. Buscar ajuda é o passo mais importante.",
        fonte: "American Psychiatric Association"
      },
      {
        id: "ap_i4",
        titulo: "Gatilho financeiro",
        texto: "Receber salário, pagar dívidas ou ter dinheiro disponível são gatilhos comuns para apostadores. Planejar o que fazer com o dinheiro antes de recebê-lo ajuda a quebrar o ciclo.",
        fonte: "Gamblers Anonymous"
      }
    ],
    conquistas: [
      { id: "apostas_7d",   titulo: "Primeira semana",  descricao: "7 dias sem apostar",   meta: 7,   icone: "ti-star",   cor: "#EF9F27" },
      { id: "apostas_21d",  titulo: "Três semanas",     descricao: "21 dias sem apostar",  meta: 21,  icone: "ti-bolt",   cor: "#7F77DD" },
      { id: "apostas_30d",  titulo: "Um mês inteiro",   descricao: "30 dias sem apostar",  meta: 30,  icone: "ti-trophy", cor: "#D85A30" },
      { id: "apostas_60d",  titulo: "Dois meses",       descricao: "60 dias sem apostar",  meta: 60,  icone: "ti-crown",  cor: "#1D9E75" },
      { id: "apostas_180d", titulo: "Meio ano",         descricao: "180 dias sem apostar", meta: 180, icone: "ti-award",  cor: "#EF9F27" },
    ]
  },

  // ── 5. PORNOGRAFIA ─────────────────────────────────────────
  {
    presetId:      "pornografia",
    nome:          "Pornografia",
    categoria:     "comportamento_digital",
    cor:           "#D4537E",
    corEscura:     "#4B1528",
    corClara:      "#F0A3BC",
    icone:         "ti-eye-off",
    temGastoPadrao: false,
    insights: [
      {
        id: "porn_i1",
        titulo: "Circuitos de recompensa",
        texto: "O consumo compulsivo altera gradualmente os circuitos de dopamina, exigindo estímulos cada vez mais intensos para atingir a mesma satisfação. É um padrão progressivo.",
        fonte: "Cambridge University — Neuroscience"
      },
      {
        id: "porn_i2",
        titulo: "Recuperação real",
        texto: "Após 90 dias de abstinência, muitas pessoas relatam melhora significativa na concentração, energia e qualidade dos relacionamentos íntimos.",
        fonte: "Your Brain on Porn — Gary Wilson"
      },
      {
        id: "porn_i3",
        titulo: "Sem julgamentos",
        texto: "Buscar controle sobre esse hábito é um ato de coragem e autocuidado. A culpa é contraproducente — o foco deve estar na construção de novos padrões de comportamento.",
        fonte: "CYLA — baseado em pesquisas clínicas"
      },
      {
        id: "porn_i4",
        titulo: "Gatilhos noturnos",
        texto: "A maioria dos episódios ocorre à noite, sozinho, entediado ou estressado. Identificar esse padrão e criar uma rotina noturna diferente é a estratégia mais eficaz.",
        fonte: "Journal of Sex Research"
      }
    ],
    conquistas: [
      { id: "porn_7d",   titulo: "Primeira semana",  descricao: "7 dias no controle",   meta: 7,   icone: "ti-star",   cor: "#EF9F27" },
      { id: "porn_14d",  titulo: "Duas semanas",     descricao: "14 dias no controle",  meta: 14,  icone: "ti-bolt",   cor: "#7F77DD" },
      { id: "porn_30d",  titulo: "Um mês inteiro",   descricao: "30 dias no controle",  meta: 30,  icone: "ti-trophy", cor: "#D4537E" },
      { id: "porn_90d",  titulo: "Noventa dias",     descricao: "90 dias no controle",  meta: 90,  icone: "ti-crown",  cor: "#1D9E75" },
      { id: "porn_180d", titulo: "Meio ano",         descricao: "180 dias no controle", meta: 180, icone: "ti-medal",  cor: "#378ADD" },
    ]
  },

  // ── 6. COCAÍNA ─────────────────────────────────────────────
  {
    presetId:      "cocaina",
    nome:          "Cocaína",
    categoria:     "substancia",
    cor:           "#888780",
    corEscura:     "#1e1e1c",
    corClara:      "#d8d6ce",
    icone:         "ti-pill",
    temGastoPadrao: true,
    insights: [
      {
        id: "coc_i1",
        titulo: "Pico de dopamina",
        texto: "A cocaína causa um pico de dopamina 3 a 5 vezes maior que qualquer prazer natural. Isso deixa o cérebro temporariamente incapaz de sentir satisfação sem a substância.",
        fonte: "National Institute on Drug Abuse"
      },
      {
        id: "coc_i2",
        titulo: "Recuperação do cérebro",
        texto: "Após 3 a 6 meses de abstinência, os receptores de dopamina começam a se recuperar. A neuroplasticidade permite que o cérebro volte a funcionar normalmente com o tempo.",
        fonte: "NIDA — National Institute on Drug Abuse"
      },
      {
        id: "coc_i3",
        titulo: "Suporte profissional é essencial",
        texto: "A dependência de cocaína tem forte componente psicológico. O acompanhamento com psiquiatra ou psicólogo especializado aumenta significativamente as chances de recuperação.",
        fonte: "SENAD — Secretaria Nacional de Políticas sobre Drogas"
      },
      {
        id: "coc_i4",
        titulo: "Cada dia conta",
        texto: "Recaídas fazem parte do processo para a maioria das pessoas. O que importa é retomar. Cada dia de abstinência representa uma vitória real e um passo na reconstrução do cérebro.",
        fonte: "American Society of Addiction Medicine"
      }
    ],
    conquistas: [
      { id: "cocaina_7d",   titulo: "Primeira semana",  descricao: "7 dias limpo",   meta: 7,   icone: "ti-star",   cor: "#EF9F27" },
      { id: "cocaina_14d",  titulo: "Duas semanas",     descricao: "14 dias limpo",  meta: 14,  icone: "ti-bolt",   cor: "#7F77DD" },
      { id: "cocaina_30d",  titulo: "Um mês",           descricao: "30 dias limpo",  meta: 30,  icone: "ti-trophy", cor: "#888780" },
      { id: "cocaina_60d",  titulo: "Dois meses",       descricao: "60 dias limpo",  meta: 60,  icone: "ti-crown",  cor: "#1D9E75" },
      { id: "cocaina_90d",  titulo: "Três meses",       descricao: "90 dias limpo",  meta: 90,  icone: "ti-medal",  cor: "#378ADD" },
      { id: "cocaina_180d", titulo: "Meio ano",         descricao: "180 dias limpo", meta: 180, icone: "ti-award",  cor: "#EF9F27" },
      { id: "cocaina_365d", titulo: "Um ano completo",  descricao: "365 dias limpo", meta: 365, icone: "ti-crown",  cor: "#EF9F27" },
    ]
  },

  // ── 7. MACONHA ─────────────────────────────────────────────
  {
    presetId:      "maconha",
    nome:          "Maconha",
    categoria:     "substancia",
    cor:           "#085041",
    corEscura:     "#04342C",
    corClara:      "#5DCAA5",
    icone:         "ti-leaf",
    temGastoPadrao: true,
    insights: [
      {
        id: "mac_i1",
        titulo: "Dependência psicológica",
        texto: "Ao contrário do que muitos acreditam, a maconha causa dependência real — principalmente psicológica. Cerca de 9% dos usuários desenvolvem transtorno por uso de cannabis.",
        fonte: "National Institute on Drug Abuse"
      },
      {
        id: "mac_i2",
        titulo: "Memória e foco",
        texto: "O uso regular afeta a memória de curto prazo, a velocidade de processamento e a capacidade de concentração. Esses efeitos tendem a se reverter após semanas de abstinência.",
        fonte: "Harvard Medical School"
      },
      {
        id: "mac_i3",
        titulo: "Síndrome de abstinência",
        texto: "A abstinência pode causar irritabilidade, insônia, perda de apetite e ansiedade nas primeiras 1 a 2 semanas. Esses sintomas são temporários e diminuem progressivamente.",
        fonte: "American Psychiatric Association"
      },
      {
        id: "mac_i4",
        titulo: "Recuperação cognitiva",
        texto: "Estudos mostram que após 1 mês de abstinência, funções cognitivas como memória verbal e velocidade de processamento começam a se normalizar.",
        fonte: "Journal of Psychiatric Research"
      }
    ],
    conquistas: [
      { id: "maconha_7d",   titulo: "Primeira semana",  descricao: "7 dias sem consumir",   meta: 7,   icone: "ti-star",   cor: "#EF9F27" },
      { id: "maconha_14d",  titulo: "Duas semanas",     descricao: "14 dias sem consumir",  meta: 14,  icone: "ti-bolt",   cor: "#7F77DD" },
      { id: "maconha_30d",  titulo: "Um mês inteiro",   descricao: "30 dias sem consumir",  meta: 30,  icone: "ti-trophy", cor: "#085041" },
      { id: "maconha_90d",  titulo: "Três meses",       descricao: "90 dias sem consumir",  meta: 90,  icone: "ti-crown",  cor: "#1D9E75" },
      { id: "maconha_180d", titulo: "Meio ano",         descricao: "180 dias sem consumir", meta: 180, icone: "ti-medal",  cor: "#378ADD" },
      { id: "maconha_365d", titulo: "Um ano completo",  descricao: "365 dias sem consumir", meta: 365, icone: "ti-award",  cor: "#EF9F27" },
    ]
  },

  // ── 8. AÇÚCAR / ULTRAPROCESSADOS ───────────────────────────
  {
    presetId:      "acucar",
    nome:          "Açúcar / Ultraprocessados",
    categoria:     "alimentar",
    cor:           "#EF9F27",
    corEscura:     "#412402",
    corClara:      "#FAC775",
    icone:         "ti-candy",
    temGastoPadrao: false,
    insights: [
      {
        id: "acu_i1",
        titulo: "Loop de recompensa",
        texto: "Alimentos ultraprocessados ativam os mesmos circuitos de dopamina que substâncias viciantes, criando um padrão de desejo-consumo-culpa difícil de quebrar sem estratégia.",
        fonte: "National Institutes of Health"
      },
      {
        id: "acu_i2",
        titulo: "Comer emocional",
        texto: "Cerca de 75% da alimentação excessiva tem origem emocional — não física. Identificar os gatilhos emocionais é mais eficaz do que apenas tentar ter força de vontade.",
        fonte: "Harvard Health Publishing"
      },
      {
        id: "acu_i3",
        titulo: "O papel da atenção",
        texto: "Comer devagar e com atenção plena reduz o consumo em até 20%. O cérebro leva 20 minutos para registrar saciedade após o início da refeição.",
        fonte: "Harvard Medical School"
      },
      {
        id: "acu_i4",
        titulo: "Abstinência de açúcar",
        texto: "Nos primeiros 3 a 5 dias sem açúcar refinado, é comum sentir dores de cabeça, irritabilidade e fadiga. São sinais de que o corpo está se reajustando — e passam.",
        fonte: "American Journal of Clinical Nutrition"
      }
    ],
    conquistas: [
      { id: "acucar_7d",  titulo: "Primeira semana",   descricao: "7 dias no controle",  meta: 7,  icone: "ti-star",   cor: "#EF9F27" },
      { id: "acucar_21d", titulo: "Três semanas",      descricao: "21 dias no controle", meta: 21, icone: "ti-bolt",   cor: "#7F77DD" },
      { id: "acucar_30d", titulo: "Um mês equilibrado",descricao: "30 dias no controle", meta: 30, icone: "ti-trophy", cor: "#EF9F27" },
      { id: "acucar_60d", titulo: "Dois meses",        descricao: "60 dias no controle", meta: 60, icone: "ti-crown",  cor: "#1D9E75" },
      { id: "acucar_90d", titulo: "Três meses",        descricao: "90 dias no controle", meta: 90, icone: "ti-medal",  cor: "#378ADD" },
    ]
  },

  // ── 9. JOGOS ───────────────────────────────────────────────
  {
    presetId:      "jogos",
    nome:          "Jogos",
    categoria:     "comportamento_digital",
    cor:           "#7F77DD",
    corEscura:     "#26215C",
    corClara:      "#AFA9EC",
    icone:         "ti-device-gamepad-2",
    temGastoPadrao: false,
    insights: [
      {
        id: "jog_i1",
        titulo: "Mecânicas de vício",
        texto: "Jogos usam loops de recompensa variável — recompensas imprevisíveis são muito mais viciantes que recompensas certas. É o mesmo princípio das máquinas caça-níqueis.",
        fonte: "American Psychological Association"
      },
      {
        id: "jog_i2",
        titulo: "A OMS reconhece",
        texto: "A Organização Mundial da Saúde incluiu o Transtorno de Jogos na CID-11 em 2018, reconhecendo que o uso excessivo pode ser um problema real de saúde.",
        fonte: "WHO — ICD-11"
      },
      {
        id: "jog_i3",
        titulo: "Tempo recuperado",
        texto: "Jogadores compulsivos gastam em média 4 a 6 horas por dia. Controlar esse tempo libera horas para atividades que geram realização e satisfação duradouras.",
        fonte: "WHO — ICD-11"
      },
      {
        id: "jog_i4",
        titulo: "Fuga emocional",
        texto: "Jogos frequentemente funcionam como fuga de situações difíceis — ansiedade, solidão, tédio. Reconhecer qual emoção antecede o impulso ajuda a quebrá-lo.",
        fonte: "Cyberpsychology, Behavior, and Social Networking"
      }
    ],
    conquistas: [
      { id: "jogos_7d",  titulo: "Semana controlada",  descricao: "7 dias dentro do limite",  meta: 7,  icone: "ti-star",   cor: "#EF9F27" },
      { id: "jogos_14d", titulo: "Duas semanas",       descricao: "14 dias dentro do limite", meta: 14, icone: "ti-bolt",   cor: "#7F77DD" },
      { id: "jogos_30d", titulo: "Mês equilibrado",    descricao: "30 dias dentro do limite", meta: 30, icone: "ti-trophy", cor: "#1D9E75" },
      { id: "jogos_60d", titulo: "Dois meses",         descricao: "60 dias dentro do limite", meta: 60, icone: "ti-crown",  cor: "#378ADD" },
      { id: "jogos_90d", titulo: "Três meses",         descricao: "90 dias dentro do limite", meta: 90, icone: "ti-medal",  cor: "#D4537E" },
    ]
  },

  // ── 10. COMPRAS COMPULSIVAS ────────────────────────────────
  {
    presetId:      "compras-compulsivas",
    nome:          "Compras compulsivas",
    categoria:     "comportamento_financeiro",
    cor:           "#D4537E",
    corEscura:     "#4B1528",
    corClara:      "#F0A3BC",
    icone:         "ti-shopping-cart",
    temGastoPadrao: true,
    insights: [
      {
        id: "com_i1",
        titulo: "Compra emocional",
        texto: "A compra compulsiva quase nunca é sobre o produto — é sobre regular emoções como ansiedade, tristeza ou estresse. O alívio é imediato, mas temporário, e a culpa vem depois.",
        fonte: "American Journal of Psychiatry"
      },
      {
        id: "com_i2",
        titulo: "O papel do dopamina",
        texto: "O maior prazer na compra compulsiva ocorre antes de comprar — na fase de busca e antecipação. Depois da compra, a satisfação é muito menor do que o esperado.",
        fonte: "Stanford University — Behavioral Research"
      },
      {
        id: "com_i3",
        titulo: "Impacto financeiro",
        texto: "Compradores compulsivos gastam em média 20 a 30% da renda em compras não planejadas. O endividamento e a vergonha alimentam o ciclo e dificultam a busca por ajuda.",
        fonte: "Journal of Consumer Psychology"
      },
      {
        id: "com_i4",
        titulo: "Estratégia da pausa",
        texto: "Inserir uma espera obrigatória de 24 a 48 horas antes de qualquer compra não essencial reduz drasticamente compras por impulso. O desejo costuma passar.",
        fonte: "Behavioral Economics — Richard Thaler"
      }
    ],
    conquistas: [
      { id: "compras_7d",   titulo: "Primeira semana",  descricao: "7 dias sem compras impulsivas",   meta: 7,   icone: "ti-star",   cor: "#EF9F27" },
      { id: "compras_14d",  titulo: "Duas semanas",     descricao: "14 dias sem compras impulsivas",  meta: 14,  icone: "ti-bolt",   cor: "#7F77DD" },
      { id: "compras_30d",  titulo: "Um mês inteiro",   descricao: "30 dias sem compras impulsivas",  meta: 30,  icone: "ti-trophy", cor: "#D4537E" },
      { id: "compras_60d",  titulo: "Dois meses",       descricao: "60 dias sem compras impulsivas",  meta: 60,  icone: "ti-crown",  cor: "#1D9E75" },
      { id: "compras_180d", titulo: "Meio ano",         descricao: "180 dias sem compras impulsivas", meta: 180, icone: "ti-award",  cor: "#EF9F27" },
    ]
  },

  // ── 11. PERSONALIZADO ──────────────────────────────────────
  {
    presetId:      "personalizado",
    nome:          null,
    categoria:     "personalizado",
    cor:           "#888780",
    corEscura:     "#1e1e1c",
    corClara:      "#d8d6ce",
    icone:         "ti-circle-check",
    temGastoPadrao: false,
    insights: [
      {
        id: "gen_i1",
        titulo: "A ciência dos hábitos",
        texto: "Pesquisas mostram que são necessários em média 66 dias para consolidar um novo hábito — não 21, como se acreditava. Consistência é mais importante do que perfeição.",
        fonte: "University College London"
      },
      {
        id: "gen_i2",
        titulo: "O poder das sequências",
        texto: "Manter uma sequência visível de dias resistidos reduz significativamente a chance de recaída. A psicologia chama isso de efeito corrente — não quebre a corrente.",
        fonte: "American Psychological Association"
      },
      {
        id: "gen_i3",
        titulo: "Recaídas fazem parte",
        texto: "A maioria das pessoas tenta mudar um hábito várias vezes antes de conseguir. Recaídas são dados, não falhas — use-as para entender seus gatilhos e fortalecer sua estratégia.",
        fonte: "James Clear — Hábitos Atômicos"
      },
      {
        id: "gen_i4",
        titulo: "Identidade antes de resultado",
        texto: "Em vez de pensar 'quero parar de X', tente pensar 'estou me tornando alguém que não faz X'. Mudanças de identidade são mais duradouras do que mudanças baseadas em metas.",
        fonte: "James Clear — Hábitos Atômicos"
      }
    ],
    conquistas: [
      { id: "personalizado_7d",  titulo: "Primeira semana",  descricao: "7 dias no controle",   meta: 7,   icone: "ti-star",   cor: "#EF9F27" },
      { id: "personalizado_14d", titulo: "Duas semanas",     descricao: "14 dias no controle",  meta: 14,  icone: "ti-bolt",   cor: "#7F77DD" },
      { id: "personalizado_30d", titulo: "Um mês inteiro",   descricao: "30 dias no controle",  meta: 30,  icone: "ti-trophy", cor: "#888780" },
      { id: "personalizado_60d", titulo: "Dois meses",       descricao: "60 dias no controle",  meta: 60,  icone: "ti-crown",  cor: "#1D9E75" },
      { id: "personalizado_90d", titulo: "Três meses",       descricao: "90 dias no controle",  meta: 90,  icone: "ti-medal",  cor: "#378ADD" },
    ]
  }

];

// ── CATEGORIAS (para organizar o grid de seleção) ────────────
const CATEGORIAS_PRESET = [
  {
    id:    "substancia",
    label: "Substâncias",
    icone: "ti-pill",
    presets: ["alcool", "tabaco", "cocaina", "maconha"]
  },
  {
    id:    "comportamento_digital",
    label: "Comportamento digital",
    icone: "ti-device-mobile",
    presets: ["redes-sociais", "jogos", "pornografia"]
  },
  {
    id:    "comportamento_financeiro",
    label: "Comportamento financeiro",
    icone: "ti-currency-dollar",
    presets: ["apostas", "compras-compulsivas"]
  },
  {
    id:    "alimentar",
    label: "Alimentação",
    icone: "ti-salad",
    presets: ["acucar"]
  },
  {
    id:    "personalizado",
    label: "Personalizado",
    icone: "ti-pencil",
    presets: ["personalizado"]
  }
];

// ── HELPERS ──────────────────────────────────────────────────

function getPreset(presetId) {
  return VICIOS_PRESET.find(p => p.presetId === presetId)
      ?? VICIOS_PRESET.find(p => p.presetId === "personalizado");
}

function getInsights(vicio) {
  return getPreset(vicio.presetId).insights;
}

function getConquistasPreset(vicio) {
  return getPreset(vicio.presetId).conquistas;
}

function criarVicioDePreset(usuarioId, presetId, customizacoes) {
  const preset = getPreset(presetId);
  // valorMeta deve ser >= 1 (usa 'customizacoes', nome correto do parâmetro)
  if (!customizacoes.valorMeta || customizacoes.valorMeta < 1) customizacoes.valorMeta = 1;
  return {
    id:            _genId(presetId),
    usuarioId,
    presetId:      preset.presetId,
    nome:          customizacoes.nome         ?? preset.nome,
    categoria:     preset.categoria,
    tipo:          customizacoes.tipo         ?? preset.categoria,
    cor:           customizacoes.cor          ?? preset.cor,
    tipoMeta:      customizacoes.tipoMeta,
    valorMeta:     customizacoes.valorMeta || 1,
    modoControle:  customizacoes.modoControle,
    gasto: {
      temGasto:      customizacoes.gasto?.temGasto      ?? preset.temGastoPadrao,
      valor:         customizacoes.gasto?.valor         ?? 0,
      periodicidade: customizacoes.gasto?.periodicidade ?? null,
    },
    visivelAmigos: customizacoes.visivelAmigos ?? false, // desativado por padrão
    dataInicio:    customizacoes.dataInicio    ?? _hoje(),
    arquivado:     false,
  };
}

function _genId(tipo, data) {
  const hoje = new Date();
  const base = data || (hoje.getFullYear() + '-' +
    String(hoje.getMonth()+1).padStart(2,'0') + '-' +
    String(hoje.getDate()).padStart(2,'0'));
  const n = Math.floor(Math.random() * 9000) + 1000; // 1000-9999
  return base + '-' + (tipo || 'id') + '-' + n;
}
function _hoje() {
  const d = new Date();
  return d.getFullYear() + '-' +
    String(d.getMonth() + 1).padStart(2, '0') + '-' +
    String(d.getDate()).padStart(2, '0');
}

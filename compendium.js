/* ABISSAL — Biblioteca do Cave Compendium (experiência de fã). */
(() => {
  'use strict';

  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const PORTAL = $('#codexPortal');
  const LIBRARY = $('#codexLibrary');
  if (!PORTAL || !LIBRARY) return;

  const chapterIds = ['overview','creatures','weapons','effects','resources','landmarks'];
  const chapterLabels = {
    overview:'INTRODUÇÃO',
    creatures:'CRIATURAS',
    weapons:'ARSENAL',
    effects:'EFEITOS ÚNICOS',
    resources:'RECURSOS',
    landmarks:'ESTRUTURAS'
  };

  const entries = lines => lines.map(line => {
    const [name, description, classification='REGISTRO'] = line.split('|');
    return { name, description, classification };
  });

  const books = {
    magnetic: {
      index:1, accent:'#bba7ff', shade:'#47336e',
      atmosphere:'radial-gradient(ellipse at 80% 5%,#49316d 0,#17132e 34%,transparent 65%),linear-gradient(180deg,#100d21,#050914)',
      motes:'repeating-linear-gradient(145deg,transparent 0 90px,#bba7ff16 93px 95px,transparent 97px 220px)',
      motesOpacity:'.56', shelfBg:'radial-gradient(ellipse at 70% 25%,#39295c99,transparent 45%),linear-gradient(155deg,#18172e,#07101e 82%)',
      title:'Magnetic Caves', alias:'A Caverna Magnética', sigil:'⌁',
      subtitle:'As pedras chamam o metal. As máquinas nunca descansam.',
      kicker:'CAPÍTULO DE ELETROMAGNETISMO', lead:'Tudo aqui responde a forças invisíveis.',
      shelfSmall:'NEODÍMIO / MAGNETISMO', shelfLine:'Forças invisíveis',
      introduction:'Grandes cristais de neodímio atravessam a galena. Campos de atração e repulsão alteram o movimento de equipamentos metálicos, enquanto autômatos protegem estruturas de mineração esquecidas.',
      mood:'FRIO INDUSTRIAL / CAMPO MAGNÉTICO', habitat:'Paredes de Galena, cristais Azure e Scarlet, máquinas e raios elétricos', temperature:'0,6 (valor do bioma)', biome:'alexscaves:magnetic_caves',
      lore:'Uma caverna que continua trabalhando mesmo depois da partida de seus mineiros. Sua beleza é rígida, elétrica e impessoal.',
      creatures:{
        'ENTIDADE UTILITÁRIA / PASSIVA':entries(['Notor|Pequeno drone que investiga visitantes por meio de escaneamento e alerta outras criaturas.']),
        'CRIATURAS HOSTIS':entries(['Teletor|Construto flutuante que manipula uma ferramenta de ferro como arma.','Boundroid|Autômato que se move pelo teto e golpeia intrusos com a cabeça pendente.','Ferrouslime|Massa de ferrofluido capaz de se unir a outras para aumentar de tamanho.','Magnetron|Máquina que constrói um corpo com blocos próximos para esmagar ameaças.'])
      },
      weapons:entries(['Galena Gauntlet|Manopla que permite manejar ferramentas e armas metálicas à distância.','Resistor Shield|Escudo especializado para enfrentar eletricidade e a hostilidade das máquinas.','Seeking Arrow|Flecha especial que acompanha a identidade tecnológica do arsenal magnético.']),
      effects:entries(['Magnetizing|Torna alvos suscetíveis ao magnetismo mesmo sem armadura metálica.|EFEITO DE STATUS','Scarlet Neodymium|Atrai metais e equipamentos.|MECÂNICA DO BIOMA','Azure Neodymium|Repele metais e cria rotas aéreas improvisadas.|MECÂNICA DO BIOMA','Tesla Bulb|Lâmpadas eletrificadas liberam arcos perigosos.|RISCO AMBIENTAL']),
      resources:entries(['Galena / Charged Galena|Rocha abundante, com variações energizadas e uso estrutural.','Scarlet Neodymium Ingot|Recurso de atração magnética.','Azure Neodymium Ingot|Recurso de repulsão magnética.','Telecore|Componente tecnológico de ferramentas magnéticas.','Notor Gizmo|Peça recuperável de Notors.','Holocoder|Dispositivo associado a projeções e registros.']),
      landmarks:entries(['Magnetic Factory|Construção industrial abandonada com máquinas e saques.','Galena Spires|Formações pontiagudas que sustentam Tesla Bulbs.','Neodymium Crystal Fields|Conjuntos cristalinos que mudam a forma de atravessar a caverna.','Ferrocave|Grandes câmaras esféricas moldadas pelo magnetismo.']),
      wiki:'https://alexscaves.wiki.gg/wiki/Magnetic_Caves'
    },
    primordial: {
      index:2, accent:'#ffc778', shade:'#76512d',
      atmosphere:'radial-gradient(ellipse at 55% -15%,#8e5b27 0,#322918 40%,transparent 69%),linear-gradient(180deg,#211a10,#091512)',
      motes:'radial-gradient(circle,#f3d39cba 0 2px,transparent 3px)', motesOpacity:'.55', shelfBg:'radial-gradient(ellipse at 68% 31%,#754a1c99,transparent 45%),linear-gradient(155deg,#272013,#100e0c 82%)',
      title:'Primordial Caves', alias:'A Caverna Primordial', sigil:'❋',
      subtitle:'Um sol de âmbar ilumina um passado que não terminou.',
      kicker:'CRONOBIOLOGIA E PALEOECOLOGIA', lead:'O tempo aqui não obedeceu à superfície.',
      shelfSmall:'ÂMBAR / PRÉ-HISTÓRIA', shelfLine:'O tempo esquecido',
      introduction:'Sob o teto de calcário, o Ambersol ilumina florestas antigas e grandes dinossauros. É um ecossistema completo, preservado entre pinturas rupestres, vulcões e animais de eras remotas.',
      mood:'ÂMBAR / SELVA PRÉ-HISTÓRICA', habitat:'Calcário, Pewen Trees, plantas antigas, câmaras claras e vulcões', temperature:'0,95 (valor do bioma)', biome:'alexscaves:primordial_caves',
      lore:'O livro parece um diário de campo esquecido por um naturalista que nunca voltou. Seu cheiro imaginário é de musgo, terra quente e resina.',
      creatures:{
        'PASSIVOS':entries(['Golden Frog|Pequeno anfíbio dourado adaptado às cavernas ancestrais.']),
        'NEUTROS / HERBÍVOROS':entries(['Subterranodon|Pterossauro das rochas elevadas, capaz de servir de montaria aérea.','Grottoceratops|Dinossauro herbívoro que mastiga a vegetação da caverna.','Trilocaris|Artrópode aquático pré-histórico dos lagos subterrâneos.','Relicheirus|Grande dinossauro semelhante a uma ave, com garras fortes.','Atlatitan|Enorme saurópode, montável, de natureza relativamente pacífica.']),
        'PREDADORES':entries(['Vallumraptor|Raptor inteligente, conhecido por agir em grupo e furtar alimentos.','Tremorsaurus|Predador colossal cujo rugido e passos abalam a caverna.']),
        'CHEFE':entries(['Luxtructosaurus|Criatura esquelética colossal associada a eventos eruptivos e ao poder da extinção.'])
      },
      weapons:entries(['Limestone Spear|Lança primitiva feita de calcário.','Primitive Club|Clava pesada que combina rusticidade com força bruta.','Extinction Spear|Lança poderosa ligada aos restos ancestrais dos dinossauros.']),
      effects:entries(['Rage|O dano causado cresce conforme a vida do portador diminui.|EFEITO DE STATUS','Stunned|Impede temporariamente a movimentação e o ataque.|EFEITO DE STATUS','Ambersol|Mineral luminoso que mantém as cavernas claras.|ILUMINAÇÃO','Primal Magma|Material vulcânico perigoso em regiões eruptivas.|RISCO AMBIENTAL']),
      resources:entries(['Ambersol|Âmbar luminoso do teto.','Amber Curiosity|Curiosidade extraída de âmbar, usada em mecânicas especiais.','Tectonic Shard|Fragmento raro associado ao Luxtructosaurus.','Limestone|Rocha característica do bioma.','Heavy Bone|Material ósseo utilizado em receitas ligadas à pré-história.']),
      landmarks:entries(['Volcano|Formação eruptiva e palco de grandes confrontos.','Caveman House|Abrigo pré-histórico com materiais de exploração.','Tribal Campsite|Acampamento marcado pela presença de uma antiga cultura.','Amber Monolith|Estrutura de âmbar ligada à repopulação de animais.','Cave Paintings|Pinturas rupestres preservadas no calcário.']),
      wiki:'https://alexscaves.wiki.gg/wiki/Primordial_Caves'
    },
    toxic: {
      index:3, accent:'#b5f178', shade:'#46652e',
      atmosphere:'radial-gradient(ellipse at 50% -10%,#355c2c 0,#172419 42%,transparent 70%),linear-gradient(180deg,#0d1a15,#090e0c)',
      motes:'radial-gradient(circle,#b5f1789c 0 2px,transparent 3px)', motesOpacity:'.45', shelfBg:'radial-gradient(ellipse at 70% 34%,#375819bb,transparent 45%),linear-gradient(155deg,#152918,#090e0b 82%)',
      title:'Toxic Caves', alias:'A Caverna Tóxica', sigil:'☢',
      subtitle:'Onde uma experiência terminou, a contaminação começou.',
      kicker:'RADIOLOGIA / MUTAÇÃO / RESÍDUOS', lead:'O progresso deixou algo para trás.',
      shelfSmall:'RADIAÇÃO / MUTAGÊNESE', shelfLine:'Ciência sem limites',
      introduction:'Paredes de Radrock e poças de ácido dividem espaço com laboratórios e depósitos industriais abandonados. Uma biodiversidade mutante sobrevive entre radiação, sucata e resíduos corrosivos.',
      mood:'AMARELO QUÍMICO / VERDE NUCLEAR', habitat:'Radrock, Uranium Ore, lagos ácidos, bunkers e resíduos nucleares', temperature:'0,5 (valor do bioma)', biome:'alexscaves:toxic_caves',
      lore:'Esta caverna não parece um ambiente natural. Cada sala é um aviso científico que foi ignorado por tempo demais.',
      creatures:{'PASSIVOS':entries(['Radgill|Peixe mutante que habita as águas corrosivas.','Raycat|Felino modificado que ajuda a absorver radiação.']),'NEUTRO':entries(['Gammaroach|Barata mutante que caça oportunisticamente criaturas irradiadas.']),'HOSTIS':entries(['Nucleeper|Creeper alterado capaz de realizar explosões nucleares.','Brainiac|Abominação morta-viva de grande força e agressividade.']),'AMEAÇA EXTRAORDINÁRIA':entries(['Tremorzilla|Titã radioativo ligado a uma progressão especial de criação.'])},
      weapons:entries(['Raygun|Arma tecnológica de energia, símbolo dos experimentos da caverna.','Remote Detonator|Detonador usado para ativar explosivos à distância.']),
      effects:entries(['Irradiated|Impede a regeneração natural e causa dano em níveis mais elevados.|EFEITO DE STATUS','Acid|Líquido corrosivo, capaz de destruir armaduras e ferir criaturas.|DANO AMBIENTAL','Geothermal Vents|Vapores perigosos nas proximidades do ácido.|RISCO AMBIENTAL','Hazmat Suit|Equipamento que protege contra contaminação.|PROTEÇÃO']),
      resources:entries(['Uranium|Material radioativo encontrado no Radrock.','Radrock|Rocha principal do bioma.','Sulfur / Sulfur Crystals|Minerais associados à paisagem química.','Waste Drums|Resíduos perigosos da civilização industrial.','Radon Lamps|Lâmpadas peculiares dos bunkers e ruínas.','Scrap Metal|Sucata e blocos metálicos espalhados pelo terreno.']),
      landmarks:entries(['Nuclear Bunker|Instalação industrial esquecida entre paredes contaminadas.','Acid Pit|Grande poço de ácido em áreas abertas.','Geothermal Vent|Formação que libera gases perigosos.','Research Ruins|Estruturas de metal e concreto de um passado industrial.']),
      wiki:'https://alexscaves.wiki.gg/wiki/Toxic_Caves'
    },
    abyssal: {
      index:4, accent:'#68e8e4', shade:'#1e6982',
      atmosphere:'radial-gradient(ellipse at 50% -5%,#0d667a 0,#092c3d 34%,transparent 70%),linear-gradient(180deg,#072031,#030b13)',
      motes:'radial-gradient(circle,#d7ffffc9 0 1px,transparent 2px),radial-gradient(circle,#68e8e4 0 1.3px,transparent 3px)', motesOpacity:'.7', shelfBg:'radial-gradient(ellipse at 69% 32%,#095e6eaa,transparent 48%),linear-gradient(155deg,#072a35,#040e18 82%)',
      title:'Abyssal Chasm', alias:'A Fenda Abissal', sigil:'◉',
      subtitle:'Oceano subterrâneo, ruínas cerimoniais e vida no limite da luz.',
      kicker:'OCEANOGRAFIA / BIOLOGIA ABISSAL', lead:'O mar sem sol ainda está vivo.',
      shelfSmall:'OCEANOGRAFIA / ABISMO', shelfLine:'O mar sem sol',
      introduction:'Uma fenda submersa se abre sob a rocha. Deep Ones patrulham ruínas de Abyssmarine, cardumes luminosos deslizam pela água escura e algo grande o bastante para encobrir o visor vagueia além do alcance da luz.',
      mood:'AZUL PROFUNDO / RITUAL SUBMERSO', habitat:'Abyssmarine, água profunda, hydrothermal vents, Muck e ruínas dos Deep Ones', temperature:'0,5 (valor do bioma)', biome:'alexscaves:abyssal_chasm',
      lore:'O silêncio é interrompido apenas por pulsos de sonar, correntes e o chamado de criaturas que não precisam da luz do sol.',
      creatures:{'PASSIVOS':entries(['Lanternfish|Peixe bioluminescente que se desloca em cardumes.','Sea Pig|Invertebrado bentônico que vasculha o Muck.','Gossamer Worm|Verme brilhante que flutua na coluna d’água.','Tripodfish|Peixe que se apoia sobre longas nadadeiras no fundo.']),'NEUTROS':entries(['Deep One|Habitante aquático que observa intrusos e pode negociar.','Deep One Knight|Guerreiro que defende sua comunidade.','Deep One Mage|Criatura com habilidades mágicas ligadas à água.','Hullbreaker|Leviatã atraído por objetos luminosos, capaz de danificar submarinos.']),'HOSTIL':entries(['Mine Guardian|Guardião mecânico ancorado que explode perto de invasores.'])},
      weapons:entries(['Ortholance|Arma longa dos defensores abissais.','Sea Staff|Cajado que evoca técnicas associadas ao mar.','Magic Conch|Concha mágica ligada à civilização dos Deep Ones.','Depth Charge|Carga explosiva submarina.','Ink Bomb / Glow Ink Bomb|Projéteis que manipulam tinta e luminosidade.']),
      effects:entries(['Bubbled|Efeito provocado pelo Deep One Mage.|EFEITO DE STATUS','Deepsight|Remove a neblina de água e permite ver melhor debaixo d’água.|EFEITO DE STATUS','Muck|Solo espesso que dificulta a movimentação.|TERRENO','Bioluminescência|A luz dos organismos atravessa a escuridão.|AMBIENTE']),
      resources:entries(['Bioluminesscence|Material luminoso associado aos Gossamer Worms.','Floater|Equipamento que permite subir rapidamente da profundidade.','Marine Snow|Material sedimentar associado à dinâmica submarina.','Pearl / Gazing Pearl|Pérola usada em artefatos e altares.','Sea Glass Shards|Fragmentos usados em objetos de observação submarina.','Abyssmarine|Pedra predominante nas paredes e ruínas.']),
      landmarks:entries(['Deep One Ruins|Estruturas de uma sociedade marinha ativa.','Abyssal Ruins|Construções misteriosas esquecidas pela superfície.','Whalefall|Esqueleto colossal que sustenta uma comunidade de organismos.','Hydrothermal Vents|Fontes que emitem fumaça escura e alimentam colônias de Tube Worms.','Abyssal Altar|Altar feito de materiais da fenda.']),
      wiki:'https://alexscaves.wiki.gg/wiki/Abyssal_Chasm'
    },
    forlorn: {
      index:5, accent:'#7b7f85', shade:'#23262b',
      atmosphere:'radial-gradient(ellipse at 70% -5%,#1d2025 0,#0d0f12 42%,transparent 70%),linear-gradient(180deg,#090a0c,#010102)',
      motes:'radial-gradient(circle,#8f959d8a 0 1.2px,transparent 3px)', motesOpacity:'.18', shelfBg:'radial-gradient(ellipse at 75% 38%,#1a1c20cc,transparent 45%),linear-gradient(155deg,#111214,#050608 84%)',
      title:'Forlorn Hollows', alias:'Os Vazios Desolados', sigil:'◈',
      subtitle:'A luz atrai atenção. A escuridão observa.',
      kicker:'OCULTISMO / CÂNIONS SOMBRIOS', lead:'Nem toda sombra é ausência.',
      shelfSmall:'ESCURO / OCULTISMO', shelfLine:'Algo vive na sombra',
      introduction:'Cânions tomados por uma escuridão sobrenatural se erguem entre raízes de Thornwood e rochas formadas por guano petrificado. Cultistas e predadores vagam em corredores onde acender uma luz pode ser um erro.',
      mood:'PRETO / CINZA SOMBRIO / RITUAL E SOMBRA', habitat:'Guanostone, Coprolith, Thornwood e pontes sobre cânions', temperature:'0,7 (valor do bioma)', biome:'alexscaves:forlorn_hollows',
      lore:'Os relatos aqui não soam como expedições. Soam como confissões de pessoas que perceberam tarde demais que estavam sendo vistas.',
      creatures:{'PASSIVOS':entries(['Gloomoth|Mariposa gigante que se reúne em torno de fontes luminosas.']),'HOSTIS':entries(['Underzealot|Membro de um culto subterrâneo dedicado a rituais sombrios.','Corrodent|Roedor assustador que embosca alvos a partir do solo.','Vesper|Morcego monstruoso que mergulha sobre suas presas.']),'ENTIDADES ESPECIAIS':entries(['Watcher|Espectro gerado por forças de escuridão.','Forsaken|Abominação de escuridão ligada ao Vesper e a rituais ocultos.'])},
      weapons:entries(['Desolate Dagger|Adaga ameaçadora associada aos materiais do bioma.','Dreadbow|Arco característico da progressão sombria.','Totem of Possession|Objeto ritual que canaliza a ideia de possessão.','Burrowing Arrow|Flecha capaz de explorar interações peculiares com o solo.']),
      effects:entries(['Darkness Incarnate|Efeito que pode ser ativado com Hood & Cloak of Darkness, permitindo voo temporário.|EFEITO DE STATUS','Luz atrativa|Iluminar demais pode atrair criaturas perigosas.|RISCO AMBIENTAL','Pure Darkness|Recurso ligado à escuridão materializada e a itens especiais.|RECURSO / MECÂNICA']),
      resources:entries(['Pure Darkness|Fragmento de escuridão usado em equipamentos raros.','Dark Tatters|Tecido sombrio obtido nesse ecossistema.','Occult Gem|Gema usada em artefatos de temática ritualística.','Shadow Silk|Tecido ligado a itens e equipamentos escuros.','Hood & Cloak of Darkness|Traje capaz de aproveitar o efeito Darkness Incarnate.','Guano / Coprolith|Material fossilizado que forma parte da caverna.']),
      landmarks:entries(['Forlorn Bridge|Travessia sobre desfiladeiros tomados pela escuridão.','Underzealot Borough|Conjunto de instalações do culto subterrâneo.','Forlorn Idol|Estrutura ritual.','Forlorn Ruins / Post|Vestígios da ocupação da região.','Peering Coprolith|Bloco que sugere olhos observando na parede.']),
      wiki:'https://alexscaves.wiki.gg/wiki/Forlorn_Hollows'
    },
    candy: {
      index:6, accent:'#ffb0d9', shade:'#8c467a',
      atmosphere:'radial-gradient(ellipse at 50% -10%,#d37aa1 0,#61324c 39%,transparent 69%),linear-gradient(180deg,#45213a,#151019)',
      motes:'radial-gradient(circle,#ffcbe5a0 0 4px,transparent 5px)', motesOpacity:'.45', shelfBg:'radial-gradient(ellipse at 68% 28%,#aa568bbb,transparent 45%),linear-gradient(155deg,#482540,#1d101f 82%)',
      title:'Candy Cavity', alias:'A Cavidade Doce', sigil:'✦',
      subtitle:'Parece um sonho colorido. Não confie nele.',
      kicker:'ALQUIMIA / DOÇARIA ANÔMALA', lead:'O açúcar também sabe morder.',
      shelfSmall:'ALQUIMIA / CONFEITARIA', shelfLine:'A doçura mente',
      introduction:'Planaltos de bolo e chocolate, rios de Purple Soda e árvores de alcaçuz formam uma caverna que desafia a geologia. Licowitches usam a paisagem como laboratório de feitiçaria açucarada.',
      mood:'ROSA / CARAMELO / EXCESSO', habitat:'Chocolate, Cake Layers, Purple Soda, Licoroot e Rock Candy', temperature:'0,7 (valor do bioma)', biome:'alexscaves:candy_cavity',
      lore:'Suas páginas parecem ter sido impressas com glacê. A beleza infantil esconde criaturas agressivas e feitiços nada inocentes.',
      creatures:{'PASSIVO':entries(['Sweetish Fish|Peixe gelatinoso adaptado à Purple Soda.']),'NEUTROS':entries(['Candicorn|Equino doce que pode ser domesticado para montaria.','Gum Worm|Grande serpente que atravessa colinas de chocolate.','Gummy Bear|Urso gelatinoso que caça nas proximidades da soda.','Gingerbread Man|Humanoide de gengibre que rouba doces e outros itens.']),'HOSTIS':entries(['Caniac|Esqueleto de hortelã que avança rapidamente contra alvos.','Gumbeeper|Creeper doce que dispara gomas saltitantes.','Caramel Cube|Slime de caramelo que deixa terreno pegajoso.','Licowitch|Feiticeira que usa cajado, rituais e projéteis açucarados.'])},
      weapons:entries(['Sugar Staff|Cajado das Licowitches.','Shot Gum|Arma que lança projéteis de goma.','Sharpened Candy Cane|Bengala afiada usada em combate.','Frostmint Spear|Lança gelada feita com ingredientes doces.']),
      effects:entries(['Sugar Rush|Efeito que pode surgir ao consumir doces.|EFEITO DE STATUS','Caramelo pegajoso|Caramel Cubes deixam superfícies que dificultam a movimentação.|RISCO DO BIOMA','Licowitch Hex|Padrões mágicos e projéteis de hortelã.|MAGIA','Purple Soda|Líquido adocicado que substitui rios comuns.|AMBIENTE']),
      resources:entries(['Candy Cane|Doce comestível e ingrediente de receitas.','Purple Soda|Líquido encontrado em rios e usado em itens temáticos.','Rock Candy|Recurso sólido das cavernas açucaradas.','Radiant Essence|Ingrediente associado às Licowitches.','Peppermint Powder|Ingrediente obtido de Candy Cane.','Ice Cream Scoops|Sabores de sorvete utilizados em receitas.']),
      landmarks:entries(['Licowitch Tower|Torre onde feiticeiras realizam rituais e experimentos.','Gingerbread Town|Assentamento de casas de gengibre.','Donut Arches|Arcos gigantes ligando as planícies.','Gobstoppers|Formações grandes feitas de doce endurecido.','Licoroot Trees / Giant Lollipops|Vegetação impossível que define o visual.']),
      wiki:'https://alexscaves.wiki.gg/wiki/Candy_Cavity'
    },

    galactic: {
      index:7, accent:'#6db5ff', shade:'#1b2e63',
      atmosphere:'radial-gradient(ellipse at 55% 10%,#2756a5 0,#151940 28%,transparent 62%),radial-gradient(circle at 80% 24%,#2cd3ff22 0 10%,transparent 28%),linear-gradient(180deg,#090e24,#03050d)',
      motes:'radial-gradient(circle,#ffffffc8 0 1px,transparent 2px),radial-gradient(circle,#63e1ff 0 1.4px,transparent 3px),radial-gradient(circle,#8b7cff 0 1.5px,transparent 3px)', motesOpacity:'.85', shelfBg:'radial-gradient(ellipse at 18% 22%,#274f97aa,transparent 40%),radial-gradient(ellipse at 64% 64%,#28104aaa,transparent 38%),linear-gradient(160deg,#11183d,#070913 84%)',
      title:'Galactic Caverns', alias:'As Cavernas Galácticas', sigil:'✶',
      subtitle:'Um bioma de gravidade instável e céu subterrâneo cheio de mundos menores.',
      kicker:'ASTROBIOLOGIA / GRAVIDADE ZERO', lead:'A pedra aqui aprendeu a flutuar.',
      shelfSmall:'COSMOS / GRAVIDADE ZERO', shelfLine:'O vazio sob a rocha',
      introduction:'As Galactic Caverns transformam o subsolo em uma paisagem de espaço profundo. Planetoides flutuam entre trilhas minerais, bolsões de gravidade local surgem e desaparecem, e espécies alienígenas patrulham um ambiente que parece saído de uma órbita esquecida.',
      mood:'COSMOGONIA / AZUL ESTELAR / SILÊNCIO', habitat:'Planetoides, minério astral, cavernas com gravidade fraturada e jardins de poeira cósmica', temperature:'0,2 (estimativa de campo)', biome:'registro_não_cartografado:galactic_caverns',
      lore:'Se a Magnetic Caves é industrial, a Galactic Caverns é contemplativa. Ela faz o subsolo parecer maior que o céu.',
      creatures:{'NEUTROS':entries(['U.F.O.|Drone bioluminescente que observa intrusos e coleta fragmentos minerais no ar rarefeito.','Starhopper|Criatura saltadora de quatro patas que usa campos de baixa gravidade para percorrer planetoides.']),'HOSTIS':entries(['Tripod|Predador mecânico de três pernas que finca-se nas rochas e dispara feixes gravitacionais.','Comet Eel|Serpente cósmica que desliza entre partículas de poeira estelar e investe do escuro.','Eventide Barnacle|Parasita que se prende a planetoides e explode em esporos de vácuo.'])},
      weapons:entries(['Zero Anchor|Arpão que fixa o explorador em qualquer superfície e neutraliza áreas sem peso.','Orbit Lancer|Lança que retorna em órbita curta após o arremesso.','Gravimetric Bracer|Braçadeira capaz de criar um campo de atração pessoal por alguns segundos.','Meteor Sling|Arma que acelera fragmentos minerais com impulso orbital.']),
      effects:entries(['Zero-G|Reduz drasticamente a queda e altera o pulo.|MECÂNICA DO BIOMA','Starstatic|Acúmulo de eletricidade fria causa descargas entre superfícies metálicas.|EFEITO DE STATUS','Void Sickness|Desorientação provocada por sucessivas mudanças de gravidade.|RISCO AMBIENTAL','Local Orbit|Alguns objetos passam a circular o portador antes de serem lançados.|PROPRIEDADE']),
      resources:entries(['Astralite|Minério azul usado em tecnologias orbitais.','Planetoid Core|Núcleo de ilhota flutuante estabilizado.','Nebula Dust|Pó cintilante usado em poções e munições.','Graviton Thread|Filamento leve empregado em equipamentos de mobilidade.','Void Glass|Vidro escurecido gerado em bolsões de vácuo.']),
      landmarks:entries(['Satellite Graveyard|Campo de estruturas quebradas que lembra um cemitério orbital.','Zero-Gravity Well|Poço onde nada cai da maneira esperada.','Starlattice Reef|Rede mineral brilhante conectando planetoides.','Tripod Nest|Fortificação hostil armada em paredes inclinadas.']),
      wiki:'https://alexscaves.wiki.gg/wiki/Cave_Compendium'
    },
    micro: {
      index:8, accent:'#65e8ff', shade:'#197a8a',
      atmosphere:'radial-gradient(ellipse at 30% 12%,#39b8d2 0,#0f3f56 32%,transparent 70%),linear-gradient(180deg,#0a2030,#051118)', motes:'radial-gradient(circle,#65e8ffbf 0 2px,transparent 3px),radial-gradient(circle,#ff77d4a8 0 2px,transparent 4px)', motesOpacity:'.58', shelfBg:'radial-gradient(ellipse at 20% 25%,#2aa6ccaa,transparent 38%),radial-gradient(ellipse at 70% 64%,#c86ef699,transparent 35%),linear-gradient(155deg,#0e3148,#081319 84%)',
      title:'Micro Chasm', alias:'O Micro Chasm', sigil:'◍', subtitle:'Um abismo saturado de vida minúscula em escala monstruosa.', kicker:'MICROBIOLOGIA / COLÔNIAS VIVAS', lead:'Uma gota se torna um ecossistema.', shelfSmall:'MICROVIDA / NUTRIENTES', shelfLine:'O pequeno tornou-se colossal',
      introduction:'Águas brilhantes, densas em nutrientes, sustentam comunidades inteiras de microrganismos gigantes. Biofilmes coloridos revestem as pedras, e surtos bacterianos podem transformar uma travessia tranquila em uma cascata de sintomas.',
      mood:'AQUA / CIANO / ROSA BACTERIANO', habitat:'Bolsões de água nutritiva, colônias bacterianas, membranas vivas e paredes mucosas', temperature:'0,7 (estimativa de campo)', biome:'registro_não_cartografado:micro_chasm', lore:'Ler este volume é como olhar uma lâmina de microscópio e perceber que ela está olhando de volta.',
      creatures:{'PASSIVOS':entries(['Giant Tardigrade|Detritívoro robusto que resiste a quase tudo e pasta sobre biofilmes.','Lumen Polyp|Colônia bulbosa que filtra nutrientes e ilumina a água.']),'NEUTROS':entries(['Dust Mite|Ácaro blindado que se alimenta de material orgânico suspenso.','Ribbon Ameba|Predador mole que se divide temporariamente quando pressionado.']),'HOSTIS':entries(['Spore Bloom|Agregado de bactérias agressivas que se espalha pela água em nuvens.','Culture Leech|Parasita que injeta colônias vivas e amplifica infecções.'])},
      weapons:entries(['Petri Prism|Dispositivo que concentra culturas luminosas em feixes curtos.','Culture Flask|Frasco arremessável que aplica colônias úteis ou nocivas.','Mycel Needle|Agulha que inocula efeitos bioquímicos no alvo.']),
      effects:entries(['Bloom Fever|Infecção progressiva que reduz a visão e a regeneração.|EFEITO DE STATUS','Sterile Pulse|Limpa colônias da água ao redor por pouco tempo.|CONTRAMEDIDA','Nutrient Surge|Aumenta velocidade e fome quando o corpo absorve meio nutritivo.|EFEITO DE STATUS','Contagion Spread|Certas bactérias saltam entre alvos próximos.|MECÂNICA DO BIOMA']),
      resources:entries(['Nutrient Gel|Substância energética extraída da água viva.','Bacterial Mat|Tapete microbiano usado em cultivos especiais.','Chromafilm|Membrana colorida de colônias estáveis.','Dust Shell|Carapaça deixada por ácaros gigantes.','Sterile Thread|Fibra limpa utilizada em ferramentas laboratoriais.']),
      landmarks:entries(['Petri Basin|Bacia enorme de água leitosa e ativa.','Biofilm Steps|Camadas escorregadias de colônias sobre pedra.','Culture Garden|Área de crescimento ordenado de microorganismos.','Sterile Vault|Sala seca e rara onde a vida microscópica não prospera.']),
      wiki:'https://alexscaves.wiki.gg/wiki/Cave_Compendium'
    },
    oak: {
      index:9, accent:'#92d468', shade:'#44692f', atmosphere:'radial-gradient(ellipse at 50% -10%,#557f39 0,#23341a 38%,transparent 70%),linear-gradient(180deg,#162511,#0a120a)', motes:'radial-gradient(circle,#d3f3b0cc 0 2px,transparent 3px),radial-gradient(circle,#84cf6c 0 2px,transparent 4px)', motesOpacity:'.5', shelfBg:'radial-gradient(ellipse at 58% 15%,#6b8a3faa,transparent 38%),linear-gradient(155deg,#24381b,#10140e 84%)',
      title:'Oak Undergrowth', alias:'A Mata do Carvalho Subterrâneo', sigil:'❦', subtitle:'Um único carvalho transformou a caverna inteira em floresta.', kicker:'BOTÂNICA / ARTRÓPODES GIGANTES', lead:'Raízes antigas sustentam um país verde no subsolo.', shelfSmall:'FLORESTA / ARTRÓPODES', shelfLine:'Debaixo da copa eterna', introduction:'O Oak Undergrowth nasce ao redor de um carvalho colossal que perfurou a rocha. Musgos, fungos, trepadeiras e hortas naturais se espalham entre raízes ciclópicas, enquanto artrópodes gigantes fazem desse bioma um jardim e uma armadilha ao mesmo tempo.', mood:'VERDE TERROSO / FLORESTA DE RAIZ', habitat:'Tronco central, raízes, galhos ocos, cogumelos de dossel e ninhos de insetos', temperature:'0,8 (estimativa de campo)', biome:'registro_não_cartografado:oak_undergrowth', lore:'Ao contrário do abismo, esta caverna não engole a vida: ela a multiplica, em folhas, seiva e patas.',
      creatures:{'PASSIVOS':entries(['Root Beetle|Besouro de casca dura que recicla folhas e serragem.','Moss Hare|Mamífero pequeno que se camufla entre musgos e raízes.']),'NEUTROS / DOMESTICÁVEIS':entries(['Jumping Spider|Aranha saltadora que pode ser criada como montaria leve e exploradora.','Praying Mantis|Predador esguio que também pode ser domado para combate de precisão.','Bark Ram|Herbívoro de chifre curto que atravessa cipós densos.']),'HOSTIS':entries(['Hollow Wasp|Vespa de ninho subterrâneo que defende colmeias resinosas.','Snare Vine|Planta predatória que reage a movimento e aperta presas.'])},
      weapons:entries(['Thorn Repeater|Arma de disparo rápido alimentada por espinhos endurecidos.','Sapknife|Lâmina curta que aplica lentidão resinosa.','Canopy Harness|Arreio para cavalgar artrópodes domesticados entre as raízes.']),
      effects:entries(['Sapbound|Reduz movimento quando o alvo entra em contato com seiva pegajosa.|EFEITO DE STATUS','Camouflage Pollen|Dificulta que criaturas detectem o explorador por alguns segundos.|MECÂNICA','Rootstep|Atravessar raízes melhora a velocidade de escalada.|PASSIVA DO BIOMA','Spore Burst|Alguns fungos explodem ao toque e embaralham a visão.|RISCO AMBIENTAL']),
      resources:entries(['Heartoak Bark|Casca nobre do carvalho central.','Verdant Resin|Seiva espessa usada em armas e armadilhas.','Websilk|Fibra refinada de aranhas domesticáveis.','Canopy Fungus|Ingrediente alimentar e alquímico.','Seed Lantern|Semente luminosa usada em iluminação natural.']),
      landmarks:entries(['The Great Oak|Tronco central visível de quase todo o bioma.','Hanging Apiary|Colmeias gigantes presas ao teto rochoso.','Root Catwalks|Passagens naturais criadas por raízes entre paredes.','Mantis Garden|Clearing dominada por insetos domesticáveis e flores carnívoras.']),
      wiki:'https://alexscaves.wiki.gg/wiki/Cave_Compendium'
    },
    champions: {
      index:10, accent:'#f29f58', shade:'#7b4219', atmosphere:'radial-gradient(ellipse at 52% -10%,#a15a22 0,#43210e 36%,transparent 72%),linear-gradient(180deg,#24120d,#0d0908)', motes:'radial-gradient(circle,#ffd39f96 0 2px,transparent 3px)', motesOpacity:'.4', shelfBg:'radial-gradient(ellipse at 22% 26%,#a54e1799,transparent 36%),radial-gradient(ellipse at 73% 40%,#d6863390,transparent 34%),linear-gradient(155deg,#4d2313,#160d0a 84%)',
      title:'Chamber of Champions', alias:'A Câmara dos Campeões', sigil:'⚔', subtitle:'Labirintos, relíquias e monstros míticos testam cada intruso.', kicker:'MITOLOGIA / MASMORRAS HERÓICAS', lead:'Todo corredor aqui existe para provar alguma coisa.', shelfSmall:'MASMORRA / ARTEFATOS', shelfLine:'Glória enterrada', introduction:'A Chamber of Champions é menos uma caverna e mais um imenso complexo de provações. Salões interligados guardam artefatos lendários enquanto criaturas inspiradas em mitos patrulham arenas, corredores e santuários.', mood:'BRONZE / PEDRA / HERÓI CAÍDO', habitat:'Salas de teste, corredores armadilhados, altares de recompensa e arenas enterradas', temperature:'0,7 (estimativa de campo)', biome:'registro_não_cartografado:chamber_of_champions', lore:'O volume parece um livro de provações: toda página soa como um desafio lançado ao leitor.',
      creatures:{'HOSTIS':entries(['Minotaur|Guardião de corredores e arenas, investe com violência contra exploradores.','Cerberus|Cão tricéfalo que bloqueia câmaras internas e vigia relíquias.','Aegis Warden|Estátua animada que desperta ao redor de artefatos.','Javelin Shade|Fantasma armado que repete eternamente um duelo perdido.']),'NEUTROS':entries(['Arena Scribe|Entidade etérea que registra vitórias e derrotas sem interferir diretamente.'])},
      weapons:entries(['Champion Spear|Lança equilibrada recebida em rituais de conquista.','Lionguard Shield|Escudo cerimonial excelente contra investidas.','Trial Hammer|Martelo pesado que ganha força após cumprir condições de combate.','Laurel Band|Acessório que fortalece o portador ao vencer duelos.']),
      effects:entries(['Valor Mark|Bônus temporário concedido após derrotar um guardião importante.|EFEITO DE STATUS','Curse of Hubris|Debuff aplicado a quem tenta saquear sem concluir a prova.|EFEITO DE STATUS','Arena Lock|Algumas salas fecham até que o desafio seja resolvido.|MECÂNICA','Artifact Resonance|Relíquias reagem a padrões específicos de vitória.|PROPRIEDADE']),
      resources:entries(['Heroic Bronze|Liga metálica comum no bioma.','Trial Keys|Chaves para avançar entre segmentos da masmorra.','Victory Sigils|Selos usados em altares e cofres.','Relic Shards|Fragmentos de itens míticos quebrados.','Colosseum Stone|Pedra decorada com entalhes heroicos.']),
      landmarks:entries(['Champion Arena|Arena principal de combates.','Labyrinth Galleries|Corredores que embaralham navegação e encontros.','Vault of Laurels|Sala de artefatos com proteção máxima.','Hall of Statues|Ala onde guardiões de pedra aguardam reativação.']),
      wiki:'https://alexscaves.wiki.gg/wiki/Cave_Compendium'
    },
    paranormal: {
      index:11, accent:'#69a8ff', shade:'#2c356d', atmosphere:'radial-gradient(ellipse at 50% -5%,#4566b6 0,#1b2147 34%,transparent 72%),linear-gradient(180deg,#11152b,#07090f)', motes:'radial-gradient(circle,#b6d8ffb0 0 2px,transparent 3px),radial-gradient(circle,#a2f1ff8c 0 1.5px,transparent 3px)', motesOpacity:'.42', shelfBg:'radial-gradient(ellipse at 63% 22%,#3566d3a2,transparent 36%),linear-gradient(155deg,#1a2350,#0a0d15 84%)',
      title:'Paranormal Pit', alias:'O Fosso Paranormal', sigil:'☾', subtitle:'Uma cidade fantasma do oeste surge quando o equipamento certo atravessa o véu.', kicker:'ESPIRITUALISMO / FAROESTE FANTASMA', lead:'Nem toda caverna fica no mesmo mundo o tempo inteiro.', shelfSmall:'ASSOMBRAÇÃO / VELHO OESTE', shelfLine:'A cidade que aparece depois', introduction:'À primeira vista, a Paranormal Pit parece apenas uma caverna comum. Mas com filtros, lentes e instrumentos corretos, ela se revela como uma cidade-fantasma inteira: saloons, trilhos, pôsteres de recompensa e espectros condenados a repetir seus papéis.', mood:'AZUL NOTURNO / ECTOPLASMA / POEIRA', habitat:'Cidade espectral, saloons, trilhos assombrados, cassinos e cemitérios de varanda', temperature:'0,4 (estimativa de campo)', biome:'registro_não_cartografado:paranormal_pit', lore:'É uma caverna sobre percepção. O lugar estava ali o tempo todo — só não queria ser visto.',
      creatures:{'HOSTIS':entries(['Outlaw Spirit|Bandido espectral que atira antes de falar.','Rail Revenant|Fantasma ligado aos trilhos, capaz de atravessar vagões e paredes.','Croupier Wraith|Entidade de cassino que manipula azar e cartas amaldiçoadas.']),'NEUTROS':entries(['Cabaret Dancer|Aparição elegante que pode distrair monstros ou atrair confusão.','Station Clerk|Funcionário espectral que vende itens estranhos quando a maré paranormal está alta.'])},
      weapons:entries(['Phantom Six-Shooter|Revólver ectoplásmico de curto alcance.','Bounty Bell|Sino que marca um alvo e faz espíritos o perseguirem.','Rail Spike Baton|Arma improvisada dos trilhos assombrados.','Ghost Lantern|Lanterna que revela detalhes do bioma invisível.']),
      effects:entries(['Veil Sight|Permite ver estruturas e pistas do plano espectral.|EFEITO DE STATUS','Bad Luck|Aumenta chance de eventos negativos e projéteis fantasma.|DEBUFF','Ghost Ride|Autoriza embarcar em trens espectrais por um trecho.|MECÂNICA','House Favor|Bônus raro ganho ao vencer jogos paranormais no saloon.|BENESSE']),
      resources:entries(['Ectoplasm|Recurso básico de espíritos e mecanismos paranormais.','Phantom Ticket|Bilhete usado para embarcar no trem assombrado.','Wanted Poster|Objeto de missão e progressão.','Soul Dice|Dado usado em minijogos e rituais de azar.','Spectral Velvet|Tecido fino recuperado da cidade-fantasma.']),
      landmarks:entries(['The Saloon|Centro de jogos, apostas e encontros espectrais.','Ghost Rail Depot|Estação onde passa o trem do outro lado.','Boot Hill|Cemitério inclinado carregado de recompensas.','Parlor Stage|Palco onde os dançarinos reaparecem em noites específicas.']),
      wiki:'https://alexscaves.wiki.gg/wiki/Cave_Compendium'
    },
    heavenly: {
      index:12, accent:'#f3d899', shade:'#9d7f44', atmosphere:'radial-gradient(ellipse at 48% -10%,#fff0c0 0,#cba765 22%,transparent 55%),linear-gradient(180deg,#efe5c6,#b4955a 15%,#302014 62%,#0a0807)', motes:'radial-gradient(circle,#fff8e2 0 2px,transparent 3px),radial-gradient(circle,#f1cf7d 0 1.5px,transparent 3px)', motesOpacity:'.62', shelfBg:'radial-gradient(ellipse at 36% 15%,#f4db9fbb,transparent 38%),linear-gradient(155deg,#d9b96f,#6c4d28 66%,#1c120d 88%)',
      title:'Heavenly Hollows', alias:'Os Vazios Celestiais', sigil:'✺', subtitle:'Uma caverna luminosa tomada por hostes angelicais e tesouros sagrados.', kicker:'ANGEOLOGIA / NICHO CELESTIAL', lead:'A beleza aqui é tão perigosa quanto a escuridão.', shelfSmall:'ANJOS / LUZ SAGRADA', shelfLine:'O céu sob o teto', introduction:'As Heavenly Hollows brilham como um santuário invertido. Nichos dourados, mármore azul e luminárias de halo guardam artefatos cobiçados, mas a presença de anjos hostis transforma qualquer exploração em uma peregrinação armada.', mood:'OURO CLARO / MARFIM / LUZ', habitat:'Terraços elevados, pináculos de luz, corredores de mármore e jardins de halo', temperature:'0,5 (estimativa de campo)', biome:'registro_não_cartografado:heavenly_hollows', lore:'É um lugar belo demais para ser inocente. Cada clarão parece julgamento.',
      creatures:{'HOSTIS':entries(['Archangel|Guardião alado de enorme agressividade contra intrusos.','Halo Spearbearer|Anjo de combate que avança em formações retas.','Choir Eye|Orbe flutuante que marca invasores com feixes de luz.']),'ESPECIAIS':entries(['Golden Goose|Criatura raríssima que surge em nichos recompensadores.','Seraph Chick|Pequena ave luminosa que segue o portador de artefatos sagrados.'])},
      weapons:entries(['Halo Pike|Lança leve banhada em energia sagrada.','Psalm Bow|Arco cujo disparo ganha força ao permanecer em zonas de luz.','Cherub Bell|Sino que convoca proteção breve de entidades menores.']),
      effects:entries(['Sanctified|Aumenta resistência em áreas iluminadas.|EFEITO DE STATUS','Judged|Marca alvos para perseguição angelical.|DEBUFF','Radiant Fall|Reduz dano de queda durante saltos em plataformas celestiais.|MECÂNICA','Grace Echo|Pequena recuperação ao derrotar guardiões sagrados.|BENESSE']),
      resources:entries(['Halo Shard|Fragmento de círculo luminoso usado em crafting.','Blessed Marble|Bloco principal das estruturas internas.','Aureate Feather|Pena valiosa de criaturas angelicais.','Choir Crystal|Cristal que vibra como canto ritual.','Nectar Light|Essência colhida em nichos radiantes.']),
      landmarks:entries(['Choir Stair|Escadaria cerimonial cercada por canto.','Halo Niche|Pequeno santuário que esconde artefatos e aparições raras.','Judgment Terrace|Área de combate aberta tomada por anjos.','Goose Vault|Nicho secreto associado ao Golden Goose.']),
      wiki:'https://alexscaves.wiki.gg/wiki/Cave_Compendium'
    },
    flesh: {
      index:13, accent:'#e56a6a', shade:'#77292e', atmosphere:'radial-gradient(ellipse at 50% -5%,#8f2020 0,#471314 35%,transparent 72%),linear-gradient(180deg,#2a0d0f,#090305)', motes:'radial-gradient(circle,#ff949499 0 2px,transparent 3px),radial-gradient(circle,#ff6a6a66 0 3px,transparent 5px)', motesOpacity:'.4', shelfBg:'radial-gradient(ellipse at 35% 12%,#a52b2bbb,transparent 38%),linear-gradient(155deg,#5a181b,#13070a 84%)',
      title:'Flesh Pit', alias:'O Poço de Carne', sigil:'🜏', subtitle:'A caverna é um corpo. O corpo ainda pensa.', kicker:'BIOHORROR / ORGANISMO TITÂNICO', lead:'Entrar aqui é ser digerido aos poucos.', shelfSmall:'CARNE / PARASITISMO', shelfLine:'Dentro de algo vivo', introduction:'A Flesh Pit não é somente uma caverna feita por uma criatura colossal: ela é essa criatura. Túneis orgânicos pulsam, bolsas de fluido se contraem e um sistema imunológico inteiro reage à presença do explorador.', mood:'VERMELHO ÚMIDO / ORGÂNICO / CLAUSTROFOBIA', habitat:'Túneis musculares, câmaras de bile, tendões suspensos e tecidos cicatrizados', temperature:'37° aproximados / ambiente vivo', biome:'registro_não_cartografado:flesh_pit', lore:'As paredes respiram. O chão recua. E tudo o que parece inerte talvez esteja apenas esperando uma ordem do corpo.',
      creatures:{'HOSTIS':entries(['Nervat|Predador nervoso que reage a movimento e eletricidade corporal.','Shapeflesh|Massa imitadora capaz de assumir silhuetas incompletas.','Antibody Stalker|Agente do sistema imune que ataca qualquer forma estranha.','Bile Tick|Parasita saltador que injeta fluidos debilitantes.']),'PASSIVOS':entries(['Gland Grazer|Pequeno herbívoro grotesco que se alimenta de secreções sem agredir o explorador.'])},
      weapons:entries(['Tendon Whip|Chicote orgânico de longo alcance.','Scalpel Spine|Lâmina fina feita de osso flexível.','Pulse Injector|Ferramenta que coleta e devolve biofluidos com efeitos diversos.']),
      effects:entries(['Infection|Causa dano progressivo e piora outros estados.|EFEITO DE STATUS','Digestive Acid|Ácido vivo que corrói equipamentos.|RISCO AMBIENTAL','Immune Alarm|Ativa ondas de defesa ao causar grande dano no ambiente.|MECÂNICA','Adrenal Flood|Breve aumento de velocidade após contato com glândulas específicas.|BENESSE']),
      resources:entries(['Tendon Fiber|Fibra orgânica usada em armas flexíveis.','Coagulated Resin|Resíduo endurecido de feridas antigas.','Living Bile|Ingrediente agressivo para poções e bombas.','Memory Fat|Tecido raro associado às zonas mais antigas do corpo.','Calcified Spine|Osso petrificado, útil em armaduras e lâminas.']),
      landmarks:entries(['Heart Vestibule|Sala próxima ao pulso central da criatura.','Scar Chamber|Câmara cicatrizada de tecido duro e denso.','Immune Nursery|Região onde o sistema defensivo se forma e desperta.','Throat Tunnel|Passagem comprimida por contrações periódicas.']),
      wiki:'https://alexscaves.wiki.gg/wiki/Cave_Compendium'
    },
    lilliputian: {
      index:14, accent:'#7b7fff', shade:'#4347a0', atmosphere:'radial-gradient(ellipse at 50% -8%,#4e5cce 0,#232552 36%,transparent 72%),linear-gradient(180deg,#17162c,#080810)', motes:'radial-gradient(circle,#95a2ffb0 0 2px,transparent 3px),radial-gradient(circle,#5ce3ff80 0 2px,transparent 4px)', motesOpacity:'.48', shelfBg:'radial-gradient(ellipse at 24% 20%,#5b6be1aa,transparent 38%),radial-gradient(ellipse at 74% 56%,#8d43c3aa,transparent 32%),linear-gradient(155deg,#202553,#0d0f17 84%)',
      title:'Lilliputian Grotto', alias:'A Gruta Liliputiana', sigil:'⌂', subtitle:'Uma civilização inteira em miniatura vive em cidades delicadas sob as pedras.', kicker:'MINIATURIZAÇÃO / SOCIEDADE SUBTERRÂNEA', lead:'Em outro tamanho, tudo muda de escala.', shelfSmall:'MICROCIVILIZAÇÃO / ENCOLHIMENTO', shelfLine:'A cidade minúscula', introduction:'A Lilliputian Grotto abriga povos diminutos, seus rebanhos, pontes, colheitas e muralhas. Para interagir de verdade com o bioma, é necessário reduzir o próprio tamanho — e descobrir que insetos e pequenos animais se tornam monstros quando se está entre os liliputianos.', mood:'ÍNDIGO / VILA SUBTERRÂNEA / MARAVILHA', habitat:'Cidades em pedra, cristais urbanos, hortas em musgo e oficinas de miniaturização', temperature:'0,7 (estimativa de campo)', biome:'registro_não_cartografado:lilliputian_grotto', lore:'Este volume parece um atlas de uma nação escondida dentro do que, para o resto do mundo, é apenas entulho.',
      creatures:{'CIVILIZAÇÃO / NEUTROS':entries(['Lilliputian|Habitante diminuto com aldeias, comércio e defesa própria.','Pebble Ram|Animal de criação robusto usado como montaria local.']),'HOSTIS':entries(['Wumbo|Monstro colossal para os viajantes reduzidos, ameaça central às cidades.','Needle Ant|Inseto gigante quando visto em escala reduzida.','Spill Slug|Molusco devastador para plantações e bairros inteiros.'])},
      weapons:entries(['Shrink Sigil|Dispositivo que encolhe o explorador para acesso pleno à caverna.','Needle Pike|Arma fina utilizada pelos habitantes locais.','Pebble Mortar|Pequeno lançador defensivo das muralhas.']),
      effects:entries(['Reduced Scale|Altera colisão, salto e a percepção das ameaças.|MECÂNICA DO BIOMA','Macro Fear|Debuff aplicado ao encontrar criaturas normais em tamanho total.|EFEITO DE STATUS','Lilliputian Welcome|Pequeno bônus comercial ao ajudar a cidade.|BENESSE','Workshop Precision|Receitas delicadas ficam mais eficientes em miniatura.|PASSIVA']),
      resources:entries(['Miniature Gear|Peças de maquinário pequeno e sofisticado.','Crystal Thimble|Recipiente comum das oficinas locais.','Mosscloth|Tecido costurado pelos liliputianos.','Wumbo Hide|Material resistente obtido de uma grande ameaça.','Scale Dust|Pó usado em rituais de miniaturização.']),
      landmarks:entries(['Littlekeep|Centro urbano principal da civilização.','Shrinking Font|Fonte ritual usada na redução de tamanho.','Wumbo Breach|Abertura por onde monstros maiores invadem.','Terrace Mills|Conjunto de moinhos e oficinas em miniatura.']),
      wiki:'https://alexscaves.wiki.gg/wiki/Cave_Compendium'
    },
    cenote: {
      index:15, accent:'#66dec8', shade:'#2b7c70', atmosphere:'radial-gradient(ellipse at 56% -8%,#2ca88a 0,#15443d 35%,transparent 75%),linear-gradient(180deg,#0d201d,#060b0c)', motes:'radial-gradient(circle,#66dec8aa 0 2px,transparent 3px),radial-gradient(circle,#ffbe50aa 0 2px,transparent 4px)', motesOpacity:'.52', shelfBg:'radial-gradient(ellipse at 30% 18%,#179d86aa,transparent 36%),radial-gradient(ellipse at 70% 52%,#e0a33b99,transparent 33%),linear-gradient(155deg,#123734,#0d1212 84%)',
      title:'Cenote of Souls', alias:'O Cenote das Almas', sigil:'✹', subtitle:'Um submundo vibrante em que os mortos ainda cultivam e caminham.', kicker:'SUBMUNDO / ESPÍRITOS / RETORNO', lead:'A morte aqui não é silêncio; é vizinhança.', shelfSmall:'ALMAS / SUBMUNDO', shelfLine:'Águas entre mundos', introduction:'Poços sagrados, jardins funerários e vilas espirituais definem o Cenote of Souls. Diversas entidades dos mortos convivem com fauna ritualística e plantas que só crescem onde vida e morte se tocam.', mood:'TURQUESA / OURO / RITO', habitat:'Cenotes iluminados, hortas funerárias, palafitas espirituais e passagens inundadas', temperature:'0,75 (estimativa de campo)', biome:'registro_não_cartografado:cenote_of_souls', lore:'É um dos poucos volumes que parece acolhedor. Até o leitor lembrar que todos à sua volta já morreram.',
      creatures:{'NEUTROS':entries(['Aebije Chihuahua|Pequeno cão espiritual que guia viajantes e encontra passagens perdidas.','Soul Farmer|Espírito calmo que cultiva plantas funerárias.']),'HOSTIS':entries(['Ahuizotl|Predador mítico das águas rituais que arrasta alvos para o fundo.','Mask Wailer|Aparição que ataca com lamentos e ilusões.','Torchshade|Alma inquieta que toma conta de altares esquecidos.'])},
      weapons:entries(['Soul Reed Spear|Lança cerimonial feita para combate em água rasa.','Ancestor Drum|Item ritual que chama ajuda temporária dos mortos tranquilos.','Return Charm|Talismã que reduz o custo de voltar do mundo dos mortos.']),
      effects:entries(['Second Breath|Concede uma breve chance de sobreviver a um golpe fatal.|EFEITO DE STATUS','Soulbound|Liga temporariamente o portador a um altar de retorno.|MECÂNICA','Mourning Water|Água sagrada que acalma espíritos ou enfurece predadores, dependendo do uso.|AMBIENTE','Harvest of Ash|Melhora colheitas especiais plantadas no submundo.|BENESSE']),
      resources:entries(['Ancestor Bloom|Flor cultivada apenas em hortas espirituais.','Cenote Clay|Argila úmida usada em máscaras e vasos rituais.','Soul Ember|Partícula luminosa recolhida de espíritos amigáveis.','Death Maize|Cereal do submundo com receitas únicas.','Mask Fragments|Fragmentos decorativos e funcionais de entidades funerárias.']),
      landmarks:entries(['Spirit Terraces|Terraços agrícolas dos mortos.','Well of Return|Poço ritual usado em mecânicas de retorno.','Masked Shrine|Santuário protegido por espíritos e símbolos.','Ahuizotl Pool|Água profunda dominada por um grande predador.']),
      wiki:'https://alexscaves.wiki.gg/wiki/Cave_Compendium'
    },
    dynastic: {
      index:16, accent:'#52d08d', shade:'#296a57', atmosphere:'radial-gradient(ellipse at 54% -8%,#1a8d6e 0,#123d34 33%,transparent 74%),linear-gradient(180deg,#0d1d19,#060a09)', motes:'radial-gradient(circle,#ffb86f9a 0 2px,transparent 3px),radial-gradient(circle,#52d08d99 0 2px,transparent 4px)', motesOpacity:'.44', shelfBg:'radial-gradient(ellipse at 18% 25%,#ff8b2c99,transparent 32%),radial-gradient(ellipse at 76% 30%,#1c9b74aa,transparent 36%),linear-gradient(155deg,#4d2410,#12100f 84%)',
      title:'Dynastic Necropolis', alias:'A Necrópole Dinástica', sigil:'𓆣', subtitle:'Um grande túmulo antigo, rios de metal pesado e guardiões de barro vivo.', kicker:'ARQUEOLOGIA / IMPÉRIO FUNERÁRIO', lead:'Aqui a riqueza nunca ficou desacompanhada.', shelfSmall:'TÚMULO / METAIS / DRAGÃO', shelfLine:'O império enterrado', introduction:'A Dynastic Necropolis combina corredores sepulcrais, pátios monumentais e rios de mercúrio pesado. Tesouros magníficos jazem sob a guarda de soldados de terracota, leões de jade e um poder dracônico capaz de ser convocado por quem entende o ritual correto.', mood:'JADE / COBRE / AREIA ESCURA', habitat:'Salas funerárias, canais de heavy metal, escadarias monumentais e câmaras seladas', temperature:'0,6 (estimativa de campo)', biome:'registro_não_cartografado:dynastic_necropolis', lore:'Mais do que uma tumba, este bioma se apresenta como um Estado ainda em serviço, só que voltado para a eternidade.',
      creatures:{'HOSTIS':entries(['Terracotta Soldier|Estátua animada que desperta ao detectar movimento.','Jade Lion|Guardião felino veloz e cerimonial.','The Jung|Monarca funerário ou alto sacerdote reanimado, ligado a desafios internos.','Mercury Asp|Serpente metálica dos canais líquidos.']),'ESPECIAL':entries(['Dynastic Dragon|Poderosa entidade invocada por item ritual específico.'])},
      weapons:entries(['Jade Halberd|Arma de corte e alcance inspirada na guarda imperial.','Dynastic Seal|Selo ritual necessário para invocar poderes da necrópole.','Mercury Fan|Artefato que projeta metal pesado em arco curto.']),
      effects:entries(['Heavy Metal|Debuff aplicado por rios metálicos, reduzindo movimento e drenando vigor.|RISCO AMBIENTAL','Imperial Oath|Pequeno bônus ao usar relíquias alinhadas à tumba.|BENESSE','Terracotta Wake|Salas despertam guardas em ondas quando profanadas.|MECÂNICA','Dragon Petition|Marca o portador como candidato ao ritual de invocação.|PROGRESSÃO']),
      resources:entries(['Jade Inlay|Material ornamental e funcional.','Imperial Bronze|Liga nobre encontrada em portões e armas.','Mercury Vessel|Recipiente para heavy metal ritual.','Burial Silk|Tecido preservado em câmaras secas.','Tomb Seal Fragment|Parte de lacres e portas antigas.']),
      landmarks:entries(['Hall of Lions|Galeria protegida por feras de jade.','Mercury River|Canal brilhante e perigosíssimo de metal pesado.','Dragon Court|Pátio do ritual de invocação.','Emperor Vault|Câmara final dos tesouros mais valiosos.']),
      wiki:'https://alexscaves.wiki.gg/wiki/Cave_Compendium'
    },
    aquifer: {
      index:17, accent:'#69c9ff', shade:'#2c6b86', atmosphere:'radial-gradient(ellipse at 56% -10%,#2f83af 0,#174155 34%,transparent 74%),linear-gradient(180deg,#102430,#081015)', motes:'radial-gradient(circle,#a9e2ffb4 0 2px,transparent 3px),radial-gradient(circle,#6fd9ff7d 0 2px,transparent 4px)', motesOpacity:'.52', shelfBg:'radial-gradient(ellipse at 26% 14%,#208ec2aa,transparent 38%),radial-gradient(ellipse at 78% 42%,#88c9ffa1,transparent 34%),linear-gradient(155deg,#163a4a,#0c1318 84%)',
      title:'Ancient Aquifer', alias:'O Aquífero Antigo', sigil:'≋', subtitle:'Um mar subterrâneo pré-histórico pulsa sob a rocha.', kicker:'PALEOCEANOLOGIA / MUNDO AQUÁTICO', lead:'Água antiga nunca é só água.', shelfSmall:'AQUÁTICO / PRÉ-HISTÓRICO', shelfLine:'O mar enterrado', introduction:'O Ancient Aquifer é um bioma vasto e anfíbio, composto por lagos de maré interna, falésias úmidas e corredores parcialmente submersos. Criaturas marinhas ancestrais dominam a paisagem, acompanhadas por espécies humanoides pouco compreendidas e quase sempre observando de longe.', mood:'AZUL FÓSSIL / SAL / ECO', habitat:'Lagunas profundas, recifes petrificados, falésias molhadas e corredores inundados', temperature:'0,55 (estimativa de campo)', biome:'registro_não_cartografado:ancient_aquifer', lore:'Este volume faz o leitor sentir cheiro de sal, pedra molhada e algo muito mais antigo que navios.',
      creatures:{'PASSIVOS':entries(['Shellback Grazer|Grande herbívoro marinho que se alimenta de algas minerais.','Glow Skate|Raia luminescente que patrulha águas calmas.']),'NEUTROS':entries(['Inlocan|Humanoide aquático ancestral pouco hostil, mas desconfiado.','Reef Shepherd|Criatura inteligente que guia cardumes e reage à presença humana.']),'HOSTIS':entries(['Rift Plesiosaur|Predador marinho de pescoço longo que embosca em canais estreitos.','Barnacle Maw|Monstro aderido à rocha que se abre de repente como armadilha viva.'])},
      weapons:entries(['Tidehook|Gancho usado para locomoção anfíbia.','Brine Trident|Tridente próprio para combate aquático.','Current Brace|Braçadeira que impulsiona nados curtos e rápidos.']),
      effects:entries(['Brine Lung|Permite prender a respiração por mais tempo.|EFEITO DE STATUS','Undertow|Correntes puxam alvos para regiões específicas.|MECÂNICA','Salt Blind|Sprays minerais prejudicam a visão por alguns segundos.|DEBUFF','Ancient Wake|Criaturas grandes reagem à vibração de nado e casco.|AMBIENTE']),
      resources:entries(['Fossil Coral|Coral petrificado usado em decorações e ferramentas.','Brine Pearl|Pérola densa formada em água salobra antiga.','Aquifer Reed|Planta flexível de áreas rasas.','Saltstone|Rocha salina típica do ambiente.','Inlocan Relic|Pequeno objeto cultural encontrado em ruínas.']),
      landmarks:entries(['Sunken Gallery|Galeria antiga parcialmente tomada pela água.','Reef Vault|Câmara coralina escondida no paredão.','Tide Stair|Escadaria inundável que revela salas em marés internas.','Whale Gate|Arco colossal esculpido para criaturas de grande porte.']),
      wiki:'https://alexscaves.wiki.gg/wiki/Cave_Compendium'
    },
    permafrost: {
      index:18, accent:'#a7dbff', shade:'#5d82a4', atmosphere:'radial-gradient(ellipse at 50% -10%,#b5e3ff 0,#4f789f 26%,transparent 63%),linear-gradient(180deg,#18253a,#091019)', motes:'radial-gradient(circle,#f4fbff 0 2px,transparent 3px),radial-gradient(circle,#a7dbff8c 0 2px,transparent 4px)', motesOpacity:'.5', shelfBg:'radial-gradient(ellipse at 34% 18%,#cbeeffaa,transparent 34%),linear-gradient(155deg,#608ab3,#18222d 70%,#0a1118 90%)',
      title:'Permafrost Grotto', alias:'A Gruta do Permafrost', sigil:'❄', subtitle:'Gelo antigo, megafauna ancestral e ecos de mitos nórdicos.', kicker:'CRIOECOLOGIA / MITO PRÉ-HISTÓRICO', lead:'O frio preservou mais do que ossos.', shelfSmall:'GELO / MEGAFAUNA', shelfLine:'O inverno enterrado', introduction:'A Permafrost Grotto é um bioma congelado, construído por geleiras subterrâneas, pontes de gelo e paleocavernas cristalinas. Criaturas enormes, lanosas e quase míticas cruzam o branco azulado enquanto ventos gelados assobiam entre colunas heladas.', mood:'BRANCO AZULADO / GELO / ANTIGUIDADE', habitat:'Geleiras, lagos congelados, cavernas de cristal, vales de neve subterrânea', temperature:'abaixo de zero / leitura não confirmada', biome:'registro_não_cartografado:permafrost_grotto', lore:'Parece uma saga antiga presa dentro do gelo. Cada capítulo ecoa como uma lenda contada ao redor de fogo que mal aquece.',
      creatures:{'PASSIVOS':entries(['Snow Elk|Cervídeo amplo e peludo que vive em pequenos bandos.','Frost Hare|Coelho de pelagem densa e patas largas.']),'NEUTROS':entries(['Rune Ox|Bovino maciço com chifres cobertos de marcas naturais.','Glacier Whale|Megafauna aquática que circula por lagos sob o gelo.']),'HOSTIS':entries(['Fell Wolf|Predador lanoso das arestas de gelo.','Ice Jotun Cub|Criatura gigantesca, jovem, que lembra entidades míticas nórdicas.','Shatterhorn|Besta de impacto que rompe paredes frágeis de gelo.'])},
      weapons:entries(['Frostbone Axe|Machado feito com osso ancestral endurecido.','Glacier Javelin|Projétil que ganha força quando lançado em regiões frias.','Runic Crampons|Equipamento que melhora travessia em encostas congeladas.']),
      effects:entries(['Whiteout|Rajadas de gelo reduzem visão e orientação.|RISCO AMBIENTAL','Deep Chill|Lentidão progressiva por exposição prolongada.|EFEITO DE STATUS','Aurora Charge|Bônus raro obtido em regiões de luz polar subterrânea.|BENESSE','Icefracture|Blocos frágeis cedem sob peso e ruído elevados.|MECÂNICA']),
      resources:entries(['Ancient Ice|Gelo muito antigo e resistente.','Frost Pelt|Pele espessa de megafauna.','Rune Antler|Galho/haste de valor ritual e armamentista.','Blue Hoarfrost|Cristais delicados usados em poções.','Glacial Bone|Osso antigo de grande resistência.']),
      landmarks:entries(['Aurora Cavern|Caverna onde luzes frias dançam no teto.','Mammoth Grave|Vale gelado cheio de restos monumentais.','Jotun Shelf|Plataforma elevada associada às maiores criaturas.','Ice Cathedral|Formação natural de colunas e arcos congelados.']),
      wiki:'https://alexscaves.wiki.gg/wiki/Cave_Compendium'
    }
  };

  const order = Object.keys(books);
  const volumeTotal = order.length;
  let selected = 'abyssal';
  let chapter = 0;
  let opener = null;

  const safe = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const roman = num => {
    const map = [['M',1000],['CM',900],['D',500],['CD',400],['C',100],['XC',90],['L',50],['XL',40],['X',10],['IX',9],['V',5],['IV',4],['I',1]];
    let out = '';
    for (const [s,v] of map) while (num >= v) { out += s; num -= v; }
    return out;
  };
  const statLine = (label, val) => `<div class="codex-fact"><span>${safe(label)}</span><strong>${safe(val)}</strong></div>`;
  const card = item => `<article class="codex-entry"><div><span class="codex-entry-tag">${safe(item.classification)}</span><h4>${safe(item.name)}</h4></div><p>${safe(item.description)}</p></article>`;
  const cards = items => `<div class="codex-entry-grid">${items.map(card).join('')}</div>`;
  const section = (title, items) => `<section class="codex-content-section"><h3>${safe(title)} <span>${String(items.length).padStart(2,'0')}</span></h3>${cards(items)}</section>`;

  function contentFor(book, type){
    if(type === 'overview') return `
      <div class="codex-overview-intro"><span>01 / INTRODUÇÃO AO BIOMA</span><h3>${safe(book.alias)}</h3><p>${safe(book.introduction)}</p></div>
      <div class="codex-overview-grid">${statLine('BIOME ID',book.biome)}${statLine('ATMOSFERA',book.mood)}${statLine('TEMPERATURA',book.temperature)}${statLine('HABITAT',book.habitat)}</div>
      <div class="codex-handwritten">“${safe(book.lore)}”</div>`;
    if(type === 'creatures') return Object.entries(book.creatures).map(([title,items]) => section(title, items)).join('');
    if(type === 'weapons') return section('ARMAS E EQUIPAMENTOS', book.weapons);
    if(type === 'effects') return section('EFEITOS DE STATUS E MECÂNICAS', book.effects);
    if(type === 'resources') return section('ITENS, MATERIAIS E BLOCOS', book.resources);
    if(type === 'landmarks') return section('ESTRUTURAS, FORMAÇÕES E RUÍNAS', book.landmarks);
    return '';
  }

  function makeVolumeButton(key){
    const book = books[key];
    return `
      <button class="codex-volume" data-cave="${key}" type="button" style="--cover:${book.accent};--volume-bg:${book.shelfBg}">
        <span class="volume-top"><b>VOLUME / ${roman(book.index)}</b><i>${String(book.index).padStart(2,'0')}</i></span>
        <span class="volume-decoration">${safe(book.sigil)}</span>
        <span class="volume-info"><small>${safe(book.shelfSmall)}</small><strong>${safe(book.title).replace(/ /,'<br/>')}</strong><em>${safe(book.shelfLine)}</em></span>
        <span class="volume-action">ABRIR VOLUME <b>↗</b></span>
      </button>`;
  }

  function renderLibrary(){
    LIBRARY.innerHTML = order.map(makeVolumeButton).join('');
    $$('[data-cave]').forEach(button => button.addEventListener('click', () => open(button.dataset.cave, button)));
  }

  function applyBookTheme(book){
    PORTAL.style.setProperty('--codex-accent', book.accent);
    PORTAL.style.setProperty('--codex-shade', book.shade);
    PORTAL.style.setProperty('--codex-atmosphere-bg', book.atmosphere);
    PORTAL.style.setProperty('--codex-motes-bg', book.motes);
    PORTAL.style.setProperty('--codex-motes-opacity', book.motesOpacity || '.6');
  }

  function render(){
    const book = books[selected];
    const type = chapterIds[chapter];
    applyBookTheme(book);
    $('#codexVolumeNumber').textContent = `VOLUME ${String(book.index).padStart(2,'0')} / ${String(volumeTotal).padStart(2,'0')}`;
    $('#codexRoomKicker').textContent = book.kicker;
    $('#codexPortalTitle').textContent = book.title;
    $('#codexRoomSummary').textContent = book.subtitle;
    $('#codexRoomIcon').textContent = book.sigil;
    $('#codexPageSigil').textContent = book.sigil;
    $('.codex-atmosphere-sigil').textContent = book.sigil;
    $('#codexBookVolume').textContent = `TOMO ${roman(book.index)}`;
    $('#codexManuscriptLabel').textContent = book.mood;
    $('#codexLeftTitle').textContent = book.lead;
    $('#codexLeftText').textContent = book.lore;
    $('#codexFacts').innerHTML = statLine('BIOMA',book.title) + statLine('Nº DE ESPÉCIES',String(Object.values(book.creatures).flat().length)) + statLine('CAPÍTULO',chapterLabels[type]);
    $('#codexChapterTag').textContent = `CAPÍTULO ${roman(chapter+1)} / ${chapterLabels[type]}`;
    const page = $('#codexPageContent');
    page.innerHTML = contentFor(book, type);
    page.scrollTop = 0;
    $('#codexLeftPageNo').textContent = String(chapter * 2 + 1).padStart(2,'0');
    $('#codexRightPageNo').textContent = String(chapter * 2 + 2).padStart(2,'0');
    $('#codexProgress').textContent = `CAPÍTULO ${String(chapter+1).padStart(2,'0')} / ${String(chapterIds.length).padStart(2,'0')}`;
    $$('.codex-tab').forEach((btn, i) => {
      const active = i === chapter;
      btn.classList.toggle('current', active);
      btn.setAttribute('aria-selected', String(active));
    });
    $('#codexPrev').disabled = chapter === 0;
    $('#codexNext').disabled = chapter === chapterIds.length - 1;

  }

  function open(key, openerButton){
    if (!books[key]) return;
    selected = key;
    chapter = 0;
    opener = openerButton || document.activeElement;
    PORTAL.hidden = false;
    document.body.classList.add('codex-open');
    render();
    $('#codexClose').focus();
  }

  function close(){
    PORTAL.hidden = true;
    document.body.classList.remove('codex-open');
    if (opener && typeof opener.focus === 'function') opener.focus();
  }

  function switchChapter(next){
    const index = Math.max(0, Math.min(chapterIds.length - 1, next));
    if (index === chapter) return;
    chapter = index;
    render();
  }

  renderLibrary();

  $('#codexClose').addEventListener('click', close);
  $('#codexPrev').addEventListener('click', () => switchChapter(chapter - 1));
  $('#codexNext').addEventListener('click', () => switchChapter(chapter + 1));
  $$('.codex-tab').forEach(button => button.addEventListener('click', () => switchChapter(chapterIds.indexOf(button.dataset.chapter))));
  PORTAL.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); close(); }
    if (event.key === 'ArrowRight') { event.preventDefault(); switchChapter(chapter + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); switchChapter(chapter - 1); }
    if (event.key === 'Tab') {
      const focusable = [...PORTAL.querySelectorAll('button:not([disabled]),a[href]')].filter(el => el.getClientRects().length);
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  window.ABISSAL_CODEX = { open };
})();

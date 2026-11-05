/* ABISSAL — Experiência interativa independente, sem frameworks e sem dependências obrigatórias.
   A cena usa WebGL nativo. Os registros da expedição são ficcionais; os animais e entidades catalogados pertencem ao mod. */
(() => {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (n,a,b) => Math.min(b,Math.max(a,n));
  const lerp = (a,b,t) => a+(b-a)*t;
  const rand = (a,b) => a+Math.random()*(b-a);
  const sectors = {
    ruinas:{kicker:'SETOR 01 / FORMAÇÃO SUBMERSA',title:'Ruínas dos Deep Ones',short:'Estruturas ancestrais de Abyssmarine repousam entre a lama e a escuridão. Os habitantes observam antes de decidir se você é uma ameaça.',type:'CARTOGRAFIA / SETOR 01',eyebrow:'SÍTIOS SUBMERSOS',symbol:'⌘',description:'As ruínas no Abyssal Chasm revelam a presença de construções ligadas aos Deep Ones. Essa sociedade aquática é inicialmente cautelosa com visitantes e permite trocas por meio de um Abyssal Altar.',note:'Não encontramos uma cidade abandonada. Encontramos uma cidade que havia apagado suas luzes para nos observar.',source:'RELATÓRIO AC–01 / DEPARTAMENTO DE ARQUEOLOGIA'},
    queda:{kicker:'SETOR 02 / VESTÍGIOS ORGÂNICOS',title:'Queda da Baleia',short:'Ossos de uma criatura colossal repousam entre organismos do fundo do mar. O que morre na superfície se transforma em vida nas profundezas.',type:'CARTOGRAFIA / SETOR 02',eyebrow:'WHALEFALL / ESTRUTURA',symbol:'⌁',description:'Whalefalls são estruturas encontradas no Abyssal Chasm. A paisagem de restos de grandes criaturas marinhas compõe o ecossistema estranho e silencioso do bioma.',note:'O esqueleto era maior que nosso submarino. Os sensores registraram movimento dentro das costelas, apesar de não haver nada vivo ali.',source:'RELATÓRIO AC–02 / DEPARTAMENTO DE ECOLOGIA'},
    fontes:{kicker:'SETOR 03 / ATIVIDADE TÉRMICA',title:'Fontes Geotérmicas',short:'Colunas minerais e fontes aquecidas interrompem o frio da fenda. Nas proximidades, a vida encontra um jeito de continuar.',type:'CARTOGRAFIA / SETOR 03',eyebrow:'GEOTERMIA / EMISSÃO',symbol:'♨',description:'O bioma possui Geothermal Vents, além de anêmonas, mexilhões, vermes tubulares e esponjas conhecidos do ecossistema abissal de Alex’s Caves.',note:'O calor não vinha de vulcão algum. Por um instante, os gráficos oscilaram no mesmo ritmo de uma respiração.',source:'RELATÓRIO AC–03 / DEPARTAMENTO DE GEOLOGIA'},
    fenda:{kicker:'SETOR 04 / ECO NÃO IDENTIFICADO',title:'Fenda do Silêncio',short:'O ponto mais escuro da cartografia. Três equipes tentaram registrar suas coordenadas; nenhuma obteve uma leitura que se repetisse.',type:'CARTOGRAFIA / SETOR 04',eyebrow:'ÁREA RESTRITA / CONTATO ANÔMALO',symbol:'◈',description:'No extremo sul da fenda, os ecos do sonar se repetem com intervalos perfeitos. Não há registros suficientes para identificar a origem da anomalia.',note:'As coordenadas não estão erradas. Elas mudam toda vez que olhamos para elas.',source:'RELATÓRIO AC–04 / PROTOCOLO DE CONTENÇÃO'}
  };
  const creatures = {
    deepone:{type:'BIOLOGIA MARINHA / SPC–001',eyebrow:'SOCIABILIDADE CONDICIONAL • NEUTRO',title:'Deep One',symbol:'SPC–001',classification:'HUMANOIDE ABISSAL',behaviour:'NEUTRO',habitat:'ÁGUAS E RUÍNAS ABISSAIS',description:'Habitante aquático inteligente da fenda. Os Deep Ones observam visitantes com cautela, partilham uma sociedade com os Deep One Knights e Deep One Mages e podem interagir por meio de trocas no Abyssal Altar.',note:'Não fugiram da primeira luz. Fugiram quando apagamos a última. Talvez prefiram que saibamos que estão aqui.',source:'ESTAÇÃO NERÍTICA / DEPARTAMENTO DE BIOLOGIA / REGISTRO VALIDADO'},
    deeponeknight:{type:'BIOLOGIA MARINHA / SPC–002',eyebrow:'DEFESA TERRITORIAL • NEUTRO',title:'Deep One Knight',symbol:'SPC–002',classification:'GUARDIÃO ABISSAL',behaviour:'NEUTRO',habitat:'ÁGUAS E RUÍNAS ABISSAIS',description:'Integrante mais robusto da sociedade dos Deep Ones. Empunha tridentes ou a Ortholance para proteger seus semelhantes e participa das trocas realizadas pelo Abyssal Altar.',note:'O primeiro ergueu sua arma. Os demais não precisaram se aproximar: compreenderam o gesto imediatamente.',source:'ESTAÇÃO NERÍTICA / DEPARTAMENTO DE BIOLOGIA / REGISTRO VALIDADO'},
    deeponemage:{type:'BIOLOGIA MARINHA / SPC–003',eyebrow:'MANIPULAÇÃO AQUÁTICA • NEUTRO',title:'Deep One Mage',symbol:'SPC–003',classification:'ORGANISMO MÍSTICO',behaviour:'NEUTRO',habitat:'ÁGUAS E RUÍNAS ABISSAIS',description:'Ser de aparência gelatinosa que integra a sociedade dos Deep Ones. Os Deep One Mages utilizam magia ligada à água, defendendo seus aliados e alterando o ambiente aquático durante confrontos.',note:'As correntes mudaram de direção sem que nossos instrumentos detectassem uma mudança de pressão.',source:'ESTAÇÃO NERÍTICA / DEPARTAMENTO DE BIOLOGIA / REGISTRO VALIDADO'},
    hullbreaker:{type:'BIOLOGIA MARINHA / SPC–004',eyebrow:'PREDADOR DE GRANDES DIMENSÕES • NEUTRO',title:'Hullbreaker',symbol:'SPC–004',classification:'PREDADOR ABISSAL',behaviour:'NEUTRO',habitat:'ÁGUAS PROFUNDAS DA FENDA',description:'Um enorme predador que reage a fontes luminosas intensas e pode investir contra submarinos com os holofotes acesos. Sua reação à luz foi classificada como defensiva, mas aproximar-se com o holofote ligado permanece extremamente perigoso.',note:'Ele circulou o casco uma vez. Quando desligamos o holofote, o contato desapareceu.',source:'ESTAÇÃO NERÍTICA / DEPARTAMENTO DE BIOLOGIA / REGISTRO VALIDADO'},
    lanternfish:{type:'BIOLOGIA MARINHA / SPC–005',eyebrow:'EMISSÃO DE LUZ • PASSIVO',title:'Lanternfish',symbol:'SPC–005',classification:'PEIXE BIOLUMINESCENTE',behaviour:'PASSIVO',habitat:'COLUNA D’ÁGUA ABISSAL',description:'Pequeno peixe passivo que forma cardumes e produz pontos luminosos na imensa escuridão da fenda. É uma das assinaturas bioluminescentes mais recorrentes da fenda.',note:'Não víamos o fundo, apenas pequenos sinais se movendo em conjunto, como um céu noturno submerso.',source:'ESTAÇÃO NERÍTICA / DEPARTAMENTO DE BIOLOGIA / REGISTRO VALIDADO'},
    seapig:{type:'BIOLOGIA MARINHA / SPC–006',eyebrow:'VIDA NO SEDIMENTO • PASSIVO',title:'Sea Pig',symbol:'SPC–006',classification:'INVERTEBRADO BENTÔNICO',behaviour:'PASSIVO',habitat:'MANTO DE MUCK / FUNDO',description:'Invertebrado passivo que explora a lama abissal em busca de alimento. Sua movimentação está ligada ao sedimento espesso que recobre o fundo da fenda.',note:'A primeira criatura que encontramos no lodo não parecia ter pressa nenhuma. Era a única.',source:'ESTAÇÃO NERÍTICA / DEPARTAMENTO DE BIOLOGIA / REGISTRO VALIDADO'},
    gossamerworm:{type:'BIOLOGIA MARINHA / SPC–007',eyebrow:'EMISSÃO BIOLUMINESCENTE • PASSIVO',title:'Gossamer Worm',symbol:'SPC–007',classification:'VERME BIOLUMINESCENTE',behaviour:'PASSIVO',habitat:'COLUNA D’ÁGUA ABISSAL',description:'Grande verme luminoso que deriva pelas águas profundas. Sua bioluminescência pode originar Bioluminessence; também é uma presa apreciada pelo Hullbreaker.',note:'Um cordão azul atravessou a escuridão diante da escotilha. Logo depois, uma sombra maior atravessou o mesmo trajeto.',source:'ESTAÇÃO NERÍTICA / DEPARTAMENTO DE BIOLOGIA / REGISTRO VALIDADO'},
    tripodfish:{type:'BIOLOGIA MARINHA / SPC–008',eyebrow:'ADAPTAÇÃO BENTÔNICA • PASSIVO',title:'Tripodfish',symbol:'SPC–008',classification:'PEIXE DE FUNDO',behaviour:'PASSIVO',habitat:'MANTO DE MUCK / FUNDO',description:'Peixe passivo de aparência singular que permanece apoiado no fundo marinho por meio de nadadeiras longas, semelhantes a pernas de um tripé.',note:'Parecia uma estrutura mineral imóvel. Somente após vários minutos percebemos que respirava.',source:'ESTAÇÃO NERÍTICA / DEPARTAMENTO DE BIOLOGIA / REGISTRO VALIDADO'},
    mineguardian:{type:'ENGENHARIA SUBMARINA / SPC–009',eyebrow:'MECANISMO DEFENSIVO • HOSTIL',title:'Mine Guardian',symbol:'SPC–009',classification:'AUTÔMATO SUBMARINO',behaviour:'HOSTIL',habitat:'ARREDORES DAS ABYSSAL RUINS',description:'Sentinela mecânica submersa, presa por corrente a uma âncora nas proximidades de ruínas abissais. Examina movimentos ao redor e, após detectar um alvo próximo, avança e pode explodir. Não se trata de um organismo biológico; foi incluído no catálogo por sua atividade persistente na região.',note:'Não era um organismo. Tinha uma corrente, um olho e um protocolo que jamais deixou de funcionar.',source:'ESTAÇÃO NERÍTICA / DEPARTAMENTO DE ENGENHARIA / REGISTRO VALIDADO'},
    kraken:{type:'ANOMALIA / K–00',eyebrow:'ENTIDADE NÃO CATALOGADA • SIGILO MÁXIMO',title:'Kraken — Anomalia K–00',symbol:'K–00',classification:'DIMENSÕES INDETERMINADAS',behaviour:'DESCONHECIDO',habitat:'FENDA DO SILÊNCIO / LOCAL INCERTO',description:'Entidade colossal identificada nos registros da Estação Nerítica. Sua assinatura acústica não coincide com nenhuma das nove espécies conhecidas da fenda. Seus tentáculos e um olho luminoso são observados por uma cápsula de pesquisa; sua extensão verdadeira permanece desconhecida.',note:'Não era um animal escondido no mar. Era o mar tentando esconder um animal.',source:'REGISTRO K–00 / ORIGEM INDETERMINADA / ACESSO RESTRITO'}
  };

  let lastFocused=null, selectedSector='ruinas', echo=0, toastTimer;
  function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),3600)}
  function openDrawer(data){lastFocused=document.activeElement;$('#drawerType').textContent=data.type;$('#drawerEyebrow').textContent=data.eyebrow;$('#drawerTitle').textContent=data.title;$('#drawerSymbol').textContent=data.symbol;$('#drawerDescription').textContent=data.description;$('#drawerNote').textContent='“'+data.note+'”';$('#drawerSource').textContent=data.source;const scientific=Boolean(data.classification);$('#drawerScience').hidden=!scientific;$('.detail-drawer').classList.toggle('is-species',scientific);if(scientific){$('#drawerSpeciesId').textContent=data.symbol;$('#drawerBehavior').textContent=data.behaviour;$('#drawerTaxonomy').textContent=data.classification;$('#drawerHabitat').textContent=data.habitat;}$('#detailOverlay').hidden=false;document.body.style.overflow='hidden';$('#closeDrawer').focus()}
  function closeDrawer(){if($('#detailOverlay').hidden)return;$('#detailOverlay').hidden=true;document.body.style.overflow='';lastFocused?.focus?.()}
  $('#closeDrawer').addEventListener('click',closeDrawer);$('#detailBackdrop').addEventListener('click',closeDrawer);$('#drawerCloseBottom').addEventListener('click',closeDrawer);
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDrawer()});
  $$('.map-point').forEach(button=>button.addEventListener('click',()=>{selectedSector=button.dataset.sector;$$('.map-point').forEach(b=>b.classList.toggle('active',b===button));const d=sectors[selectedSector];$('#sectorKicker').textContent=d.kicker;$('#sectorTitle').textContent=d.title;$('#sectorDescription').textContent=d.short;$('#sectorCounter').textContent=String(Object.keys(sectors).indexOf(selectedSector)+1).padStart(2,'0')+' — 04';playPing(0.25)}));
  $('#openSector').addEventListener('click',()=>openDrawer(sectors[selectedSector]));
  $$('.creature-card').forEach(c=>c.addEventListener('click',()=>{openDrawer(creatures[c.dataset.creature]);playPing(.4)}));
  $$('.catalog-filter').forEach(filter=>filter.addEventListener('click',()=>{const status=filter.dataset.filter;let visible=0;$$('.catalog-filter').forEach(button=>{const active=button===filter;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active))});$$('.creature-card').forEach(card=>{const show=(status==='all'||card.dataset.status===status)&&(card.dataset.status!=='anomaly'||window.ABISSAL_K_UNLOCKED===true);card.hidden=!show;if(show)visible++});$('#catalogShown').textContent=String(visible).padStart(2,'0');playPing(.28)}));
  $('#menuToggle').addEventListener('click',()=>{const menu=$('#mobileNav');const open=menu.hidden;menu.hidden=!open;$('#menuToggle').setAttribute('aria-expanded',String(open))});
  $$('#mobileNav a').forEach(a=>a.addEventListener('click',()=>{$('#mobileNav').hidden=true;$('#menuToggle').setAttribute('aria-expanded','false')}));
  const navObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){$$('.desktop-nav a').forEach(a=>a.classList.toggle('current',a.dataset.nav===entry.target.id))}})},{rootMargin:'-32% 0px -48% 0px'});
  ['inicio','mergulho','laboratorio','bestiario','compendio','arquivos'].forEach(id=>navObserver.observe(document.getElementById(id)));
  $('#diveBtn').addEventListener('click',()=>{document.getElementById('mergulho').scrollIntoView({behavior:reducedMotion?'instant':'smooth'});playPing(.95)});
  $('#sonarButton').addEventListener('click',()=>{echo=(echo%3)+1;$('#echoCount').innerHTML=String(echo).padStart(2,'0')+'<span> / 03</span>';$('#sonarFeedback').textContent=['','ECO 01 / ESTRUTURA DETECTADA','ECO 02 / MOVIMENTO A ESTIBORDO','ECO 03 / ORIGEM NÃO IDENTIFICADA'][echo];const button=$('#sonarButton');button.classList.remove('scanned');void button.offsetWidth;button.classList.add('scanned');playPing(.85);if(echo===3){toast('Três ecos registrados. Há um sinal desconhecido no arquivo.');document.dispatchEvent(new CustomEvent('abissal:sonar'));}});
  let targetDepth=0,currentDepth=0,mouseX=0,mouseY=0;
  window.addEventListener('scroll',()=>{const maxScroll=Math.max(1,document.documentElement.scrollHeight-innerHeight);targetDepth=clamp(window.scrollY/maxScroll,0,1)},{passive:true});
  window.addEventListener('pointermove',e=>{mouseX=(e.clientX/innerWidth-.5)*2;mouseY=(e.clientY/innerHeight-.5)*2},{passive:true});

  /* Áudio ambiente sintetizado localmente, desligado por padrão. */
  let audio=null,ambientGain=null,oscillators=[];
  function initSound(){if(audio)return;const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;audio=new AC();ambientGain=audio.createGain();ambientGain.gain.value=0;ambientGain.connect(audio.destination);[43,55,81].forEach((f,i)=>{const o=audio.createOscillator(),g=audio.createGain();o.type=i===2?'sine':'triangle';o.frequency.value=f;g.gain.value=[.27,.18,.075][i];o.connect(g).connect(ambientGain);o.start();oscillators.push(o)})}
  $('#soundToggle').addEventListener('click',()=>{initSound();if(!audio)return;if(audio.state==='suspended')audio.resume();const enabled=!$('#soundToggle').classList.contains('sound-on');$('#soundToggle').classList.toggle('sound-on',enabled);$('#soundToggle').setAttribute('aria-label',enabled?'Desativar som ambiente':'Ativar som ambiente');ambientGain.gain.setTargetAtTime(enabled?.033:0,audio.currentTime,.35);toast(enabled?'Áudio ambiente ativado.':'Áudio ambiente desativado.')});
  function playPing(volume=1){if(!audio || !$('#soundToggle').classList.contains('sound-on'))return;const o=audio.createOscillator(),g=audio.createGain(),now=audio.currentTime;o.type='sine';o.frequency.setValueAtTime(870,now);o.frequency.exponentialRampToValueAtTime(300,now+.42);g.gain.setValueAtTime(.001,now);g.gain.exponentialRampToValueAtTime(.08*volume,now+.015);g.gain.exponentialRampToValueAtTime(.001,now+.65);o.connect(g).connect(audio.destination);o.start(now);o.stop(now+.68)}

  /* Enigma sonoro: a frequência secreta é descoberta visualmente no próprio receptor. */
  const frequency=$('#frequency'),wcanvas=$('#waveform'),wctx=wcanvas.getContext('2d');let freq=38.4,decoded=false;
  function updateFrequency(){freq=+frequency.value/10;$('#frequencyValue').textContent=freq.toFixed(1);const strength=clamp(1-Math.abs(freq-52.7)/5,0,1);$('#signalStatus').textContent=strength>.77?'PORTADORA ESTÁVEL — DECODIFICAÇÃO DISPONÍVEL':strength>.27?'PADRÃO DETECTADO — CONTINUE AJUSTANDO':'SINAL FRAGMENTADO — AJUSTE A FREQUÊNCIA';$('#decodeBtn').disabled=strength<=.77||decoded;}
  frequency.addEventListener('input',()=>{updateFrequency();playPing(.11)});updateFrequency();
  $('#decodeBtn').addEventListener('click',()=>{if($('#decodeBtn').disabled)return;decoded=true;$('#decodedMessage').hidden=false;$('#decodeBtn').textContent='DECODIFICADO ✓';$('#decodeBtn').disabled=true;$('#signalStatus').textContent='TRANSMISSÃO RECUPERADA';playPing(1);toast('Registro 017 recuperado com sucesso.');document.dispatchEvent(new CustomEvent('abissal:decoded'))});
  function drawWave(t){if(!wctx)return;const dpr=Math.min(devicePixelRatio||1,2),w=wcanvas.clientWidth*dpr,h=wcanvas.clientHeight*dpr;if(wcanvas.width!==Math.round(w)||wcanvas.height!==Math.round(h)){wcanvas.width=Math.round(w);wcanvas.height=Math.round(h)}const ctx=wctx;ctx.clearRect(0,0,w,h);let yy=h/2;ctx.fillStyle='rgba(125,204,189,.05)';for(let i=1;i<5;i++)ctx.fillRect(0,i*h/5,w,1);const strength=clamp(1-Math.abs(freq-52.7)/5,0,1);const grad=ctx.createLinearGradient(0,0,w,0);grad.addColorStop(0,'rgba(76,188,180,.16)');grad.addColorStop(.5,'rgba(165,255,225,.96)');grad.addColorStop(1,'rgba(76,188,180,.15)');ctx.beginPath();for(let x=0;x<w;x+=2){let k=x/w;let signal=Math.sin(k*(38+strength*88)+t*2.8)*Math.sin(k*22-t*.8)*(.26+strength*.55);let noise=(Math.sin(x*.19+t*6.3)*Math.sin(x*.47-t*7.2))*(1-strength)*.31;let y=yy+(signal+noise)*h*.42;(x===0?ctx.moveTo(x,y):ctx.lineTo(x,y))}ctx.strokeStyle=grad;ctx.lineWidth=1.4*dpr;ctx.shadowColor='rgba(107,247,214,.54)';ctx.shadowBlur=10*dpr;ctx.stroke();ctx.shadowBlur=0;ctx.beginPath();ctx.moveTo(0,yy);ctx.lineTo(w,yy);ctx.lineWidth=.6*dpr;ctx.strokeStyle='rgba(143,236,216,.2)';ctx.stroke();ctx.fillStyle='rgba(173,246,222,.4)';ctx.font=`${8*dpr}px monospace`;ctx.fillText('CH 07 / ANALOG',10*dpr,16*dpr);ctx.fillText('–72 dB',w-54*dpr,16*dpr)}

  /* Plano de fundo: fenda oceânica tridimensional criada com WebGL puro. */
  const worldCanvas=$('#abyss3d');const gl=worldCanvas.getContext('webgl',{alpha:true,antialias:true,powerPreference:'default'});
  const terrain={data:[],points:[]};
  let webglReady=false,program,pointProgram,meshBuffer,pointBuffer,meshCount=0,pointCount=0;
  const P=(x,y,z)=>[x,y,z],Vadd=(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]],Vsub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]],Vmul=(a,s)=>a.map(v=>v*s),Vdot=(a,b)=>a.reduce((n,v,i)=>n+v*b[i],0),Vlen=a=>Math.hypot(...a)||1,Vnorm=a=>Vmul(a,1/Vlen(a)),Vcross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  function pushTriangle(a,b,c,color=[.08,.22,.29],em=0,normal=null){const n=normal||Vnorm(Vcross(Vsub(b,a),Vsub(c,a)));for(const v of [a,b,c])terrain.data.push(...v,...n,...color,em)}
  function quad(a,b,c,d,color,em=0){pushTriangle(a,b,c,color,em);pushTriangle(a,c,d,color,em)}
  function box(x,y,z,sx,sy,sz,c,e=0,ang=0){const points=[];for(const [dx,dy,dz] of [[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]]){const xx=dx*sx/2,zz=dz*sz/2;points.push(P(x+xx*Math.cos(ang)-zz*Math.sin(ang),y+dy*sy/2,z+xx*Math.sin(ang)+zz*Math.cos(ang)))}for(const [a,b,c1,d] of [[0,1,2,3],[5,4,7,6],[4,0,3,7],[1,5,6,2],[3,2,6,7],[4,5,1,0]])quad(points[a],points[b],points[c1],points[d],c,e)}
  function sphere(x,y,z,sx,sy,sz,c,e=0,cols=10,rows=7){for(let iy=0;iy<rows;iy++){const v0=iy/rows*Math.PI,v1=(iy+1)/rows*Math.PI;for(let ix=0;ix<cols;ix++){let a0=ix/cols*Math.PI*2,a1=(ix+1)/cols*Math.PI*2;const fn=(v,a)=>P(x+Math.sin(v)*Math.cos(a)*sx,y+Math.cos(v)*sy,z+Math.sin(v)*Math.sin(a)*sz);quad(fn(v0,a0),fn(v0,a1),fn(v1,a1),fn(v1,a0),c,e)}}}
  function cylinder(a,b,r1,r2,c,e=0,segments=7){const dir=Vnorm(Vsub(b,a)),side=Vnorm(Vcross(dir,Math.abs(dir[1])>.9?[1,0,0]:[0,1,0])),other=Vnorm(Vcross(side,dir));for(let j=0;j<segments;j++){const t=j/segments*2*Math.PI,u=(j+1)/segments*2*Math.PI,offset=(ang,r)=>Vadd(Vmul(side,Math.cos(ang)*r),Vmul(other,Math.sin(ang)*r));const p0=Vadd(a,offset(t,r1)),p1=Vadd(a,offset(u,r1)),p2=Vadd(b,offset(u,r2)),p3=Vadd(b,offset(t,r2));quad(p0,p1,p2,p3,c,e)}}
  function pathTube(points,r,c,e=0){for(let i=0;i<points.length-1;i++)cylinder(points[i],points[i+1],r*(1-i/points.length*.52),r*(1-(i+1)/points.length*.52),c,e,5)}
  function noise(x,z){return Math.sin(x*.14)*Math.cos(z*.13)*2+Math.sin(x*.31+z*.17)*.7+Math.sin(x*.08-z*.095)*2.7}
  function floorY(x,z){return -21+noise(x,z)}
  function seeded(seed){let v=seed|0;return ()=>{v=(Math.imul(v,1664525)+1013904223)|0;return (v>>>0)/4294967296}}
  function buildWorld(){const r=seeded(46102),rr=(a,b)=>a+r()*(b-a);
    // fundo rochoso: superfície com relevo e variações de cor
    const step=5;for(let x=-110;x<110;x+=step){for(let z=-185;z<30;z+=step){const a=P(x,floorY(x,z),z),b=P(x+step,floorY(x+step,z),z),c=P(x+step,floorY(x+step,z+step),z+step),d=P(x,floorY(x,z+step),z+step);const v=r();const color=[.028+v*.018,.094+v*.025,.124+v*.038];quad(a,b,c,d,color)}}
    // formações da fenda: agulhas de abyssmarine e rochedos escuros
    for(let i=0;i<115;i++){const x=rr(-95,95),z=rr(-162,13),radius=rr(1.3,5),yy=floorY(x,z);if(Math.abs(x)<8 && z>-28)continue;const color=[rr(.035,.075),rr(.12,.19),rr(.16,.25)];sphere(x,yy+rr(0,4),z,radius,rr(1.8,7.8),radius*.78,color,0,7,5)}
    for(let i=0;i<70;i++){const side=r()>.5?1:-1,x=side*rr(37,98),z=rr(-140,0),h=rr(16,50),yy=floorY(x,z),base=rr(4,10);cylinder(P(x,yy,z),P(x+rr(-8,8),yy+h,z+rr(-3,3)),base,rr(1,4),[.026,.105,.145],0,6)}
    // conjunto de ruínas, metade engolido pelo lodo
    const templeX=24,templeZ=-69,ty=floorY(templeX,templeZ);
    for(const dx of [-11,11]){const x=templeX+dx,yy=floorY(x,templeZ);box(x,yy+9.5,templeZ,3.6,19,4,[.085,.22,.245],0,dx*.01);box(x,yy+18,templeZ,5,1.7,5,[.11,.285,.31]);box(x,yy+1.2,templeZ,6,2.5,5,[.083,.22,.255])}
    box(templeX,ty+19.8,templeZ,28,3.1,5,[.082,.23,.24]);box(templeX,ty+22.4,templeZ,31,1.4,7,[.052,.16,.19]);
    for(let i=0;i<8;i++)box(templeX-15+i*4.1,ty+24.1,templeZ,2.2,1.9,6,[.04,.125,.16],0,rr(-.13,.13));
    for(let i=0;i<6;i++){const x=templeX+rr(-15,15),z=templeZ+rr(-8,8),yy=floorY(x,z);box(x,yy+rr(.4,2),z,rr(2,5),rr(.7,4),rr(2,4),[.07,.19,.22],0,rr(-2,2))}
    // arco antigo no primeiro plano, delimita a fenda
    const ax=-9,az=-49;for(const dx of [-8,8]){let x=ax+dx,y=floorY(x,az);cylinder(P(x,y,az),P(x+dx*.07,y+14,az),2.8,1.7,[.071,.2,.22]);box(x,y+14,az,4.8,2,4.6,[.13,.28,.3])}box(ax,floorY(ax,az)+15.8,az,20,3.2,5,[.073,.21,.235],0,.08);
    // esqueleto de baleia no fundo - costelas e coluna segmentada
    const wx=-23,wz=-102,wy=floorY(wx,wz)+3;
    for(let i=0;i<15;i++){const z=wz+i*2.75,y=wy+.7*Math.sin(i*.2);sphere(wx,y,z,.9,.8,1.1,[.35,.43,.41]);}
    for(let i=2;i<12;i++){const z=wz+i*2.75,y=wy+.5*Math.sin(i*.2),height=9*Math.sin((i/14)*Math.PI)+1.8,width=6.9*Math.sin((i/14)*Math.PI)+1;for(const side of [-1,1]){pathTube([P(wx,y,z),P(wx+side*width*.65,y+height*.65,z),P(wx+side*width,y+height,z),P(wx+side*(width+.6),y+height*.48,z)],.34,[.37,.51,.5])}}
    sphere(wx,wy+1.6,wz-5,5,2.8,6,[.31,.46,.46]);
    // ruínas distantes
    for(let i=0;i<35;i++){let x=rr(-90,90),z=rr(-165,-48),y=floorY(x,z);box(x,y+rr(2,8),z,rr(2,5),rr(5,15),rr(2,4),[.045,.145,.16],0,rr(-.2,.2))}
    // anêmonas e tube worms bioluminescentes
    for(let i=0;i<180;i++){let x=rr(-68,80),z=rr(-144,6),y=floorY(x,z);if(x>12&&x<40&&z<-60&&z>-80)continue;const glow=r()>.6,c=glow?[.16,.8,.71]:r()>.6?[.55,.24,.36]:[.13,.43,.46],h=rr(.7,4.3),a=rr(0,6.28);pathTube([P(x,y,z),P(x+.3*Math.sin(a),y+h*.55,z+.4*Math.cos(a)),P(x+.65*Math.sin(a),y+h,z+.7*Math.cos(a))],rr(.1,.33),c,glow?.7:.07);if(glow)sphere(x+.65*Math.sin(a),y+h,z+.7*Math.cos(a),.32,.32,.32,[.25,.88,.82],1.5,6,4)}
    // luminárias naturais em forma de coral: ramificações
    for(let i=0;i<24;i++){const x=rr(-58,75),z=rr(-115,-6),y=floorY(x,z),h=rr(2,6.5),c=r()>.65?[.85,.33,.46]:[.26,.74,.77];cylinder(P(x,y,z),P(x,y+h*.6,z),.28,.13,c,.3);for(let k=0;k<5;k++){let a=k/5*6.28;cylinder(P(x,y+h*.49,z),P(x+Math.cos(a)*rr(1,2.5),y+h*(.85+r()*.3),z+Math.sin(a)*rr(1,2.5)),.16,.06,c,.8)}sphere(x,y+h*.6,z,.32,.35,.3,[.36,.9,.85],1.8,6,4)}
    // casco de criatura gigantesca passando ao longe
    sphere(58,-3,-135,17,9,32,[.015,.082,.12],0,13,8);sphere(67,-1,-117,8,7,13,[.016,.08,.115],0,10,7);sphere(65,0,-109,1.2,1.2,.6,[.4,.9,.78],2.8,7,5);cylinder(P(48,3,-137),P(34,13,-152),6,0,[.017,.08,.12],0,5);
    // pequenos peixes nas rotas de exploração
    for(let i=0;i<80;i++){const x=rr(-68,80),y=rr(-11,6),z=rr(-126,-12),s=rr(.12,.55),lit=r()>.5;sphere(x,y,z,s*1.4,s*.6,s*.65,lit?[.12,.51,.56]:[.045,.2,.25],lit?.1:0,6,4);pushTriangle(P(x-s,y,z),P(x-s*2.4,y+s,z),P(x-s*2.4,y-s,z),[.11,.4,.46])}
    // partículas de água e neve marinha; renderizadas como point sprites
    for(let i=0;i<1350;i++){let x=rr(-105,105),y=rr(-27,28),z=rr(-168,28);terrain.points.push(x,y,z,rr(1.1,3.2),r()>.87?1:.25,rr(0,6.28))}
  }
  function createShader(g,type,src){const s=g.createShader(type);g.shaderSource(s,src);g.compileShader(s);if(!g.getShaderParameter(s,g.COMPILE_STATUS))throw new Error(g.getShaderInfoLog(s));return s}
  function linkProgram(g,v,f){const p=g.createProgram();g.attachShader(p,createShader(g,g.VERTEX_SHADER,v));g.attachShader(p,createShader(g,g.FRAGMENT_SHADER,f));g.linkProgram(p);if(!g.getProgramParameter(p,g.LINK_STATUS))throw new Error(g.getProgramInfoLog(p));return p}
  function perspective(fov,aspect,near,far){const f=1/Math.tan(fov/2),m=new Float32Array(16);m[0]=f/aspect;m[5]=f;m[10]=(far+near)/(near-far);m[11]=-1;m[14]=2*far*near/(near-far);return m}
  function lookAt(eye,center,up=[0,1,0]){let z=Vnorm(Vsub(eye,center)),x=Vnorm(Vcross(up,z)),y=Vcross(z,x);return new Float32Array([x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-Vdot(x,eye),-Vdot(y,eye),-Vdot(z,eye),1])}
  if(gl){try{
    const vert=`attribute vec3 aPos;attribute vec3 aNormal;attribute vec3 aColor;attribute float aEmission;uniform mat4 uProjection;uniform mat4 uView;varying vec3 vNormal;varying vec3 vColor;varying float vDepth;varying float vEmission;void main(){vec4 pos=uView*vec4(aPos,1.0);gl_Position=uProjection*pos;vDepth=length(pos.xyz);vNormal=aNormal;vColor=aColor;vEmission=aEmission;}`;
    const frag=`precision mediump float;varying vec3 vNormal;varying vec3 vColor;varying float vDepth;varying float vEmission;uniform float uTime;uniform float uDeep;void main(){vec3 n=normalize(vNormal);float diffuse=max(dot(n,normalize(vec3(-0.6,0.82,0.25))),0.0);float light=.22+diffuse*.76;vec3 col=vColor*light;col+=vColor*vEmission*(1.25+.18*sin(uTime*1.2));float fog=1.0-exp(-pow(vDepth*.023,1.38));vec3 fogColor=mix(vec3(.018,.092,.135),vec3(.007,.04,.072),uDeep*.45);col=mix(col,fogColor,clamp(fog,0.0,.96));gl_FragColor=vec4(col,1.0);}`;
    const pointVert=`attribute vec3 aPos;attribute float aSize;attribute float aBright;attribute float aPhase;uniform mat4 uProjection;uniform mat4 uView;uniform float uTime;uniform float uPixel;varying float vAlpha;void main(){vec3 position=aPos;position.y+=sin(uTime*.33+aPhase)*.85;position.x+=sin(uTime*.14+aPhase)*.4;vec4 pos=uView*vec4(position,1.0);gl_Position=uProjection*pos;gl_PointSize=clamp(aSize*110.0/max(10.0,-pos.z)*uPixel,1.0,9.0);vAlpha=aBright*(1.0-clamp((-pos.z-16.0)/180.0,0.0,.8));}`;
    const pointFrag=`precision mediump float;varying float vAlpha;void main(){float d=length(gl_PointCoord-.5);float a=pow(max(0.0,1.0-d*2.0),2.3)*vAlpha;gl_FragColor=vec4(.47,.93,.83,a);}`;
    program=linkProgram(gl,vert,frag);pointProgram=linkProgram(gl,pointVert,pointFrag);buildWorld();meshBuffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,meshBuffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(terrain.data),gl.STATIC_DRAW);meshCount=terrain.data.length/10;pointBuffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,pointBuffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(terrain.points),gl.STATIC_DRAW);pointCount=terrain.points.length/6;gl.enable(gl.DEPTH_TEST);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.clearColor(.008,.047,.073,1);webglReady=true;
  }catch(e){console.warn('WebGL indisponível; ativando visual alternativo:',e)}}

  // Cena 2D ilustrada de reserva: mantém a atmosfera e os elementos do bioma
  // mesmo quando um navegador bloqueia/desliga a aceleração WebGL.
  const fallbackCtx = !gl ? worldCanvas.getContext('2d') : null;
  const seededF=seeded(214404);
  const fallbackSpecs=Array.from({length:42},(_,i)=>({x:seededF()*1440,y:seededF()*900,r:1+seededF()*3,phase:seededF()*6}));
  function drawFallback(t){
    if(!fallbackCtx)return;
    const dpr=Math.min(devicePixelRatio||1,1.6),w=innerWidth,h=innerHeight;
    if(worldCanvas.width!==Math.round(w*dpr)||worldCanvas.height!==Math.round(h*dpr)){worldCanvas.width=Math.round(w*dpr);worldCanvas.height=Math.round(h*dpr)}
    const c=fallbackCtx;c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,worldCanvas.width,worldCanvas.height);
    const scale=Math.max(w/1440,h/900),offsetX=(w-1440*scale)*.54,offsetY=(h-900*scale)*.45;
    c.setTransform(scale*dpr,0,0,scale*dpr,offsetX*dpr,offsetY*dpr);
    const bg=c.createLinearGradient(0,0,500,900);bg.addColorStop(0,'#052b3a');bg.addColorStop(.28,'#073443');bg.addColorStop(.68,'#06212f');bg.addColorStop(1,'#020e1b');c.fillStyle=bg;c.fillRect(-1400,-100,4200,1200);
    const outer=c.createRadialGradient(990,5,5,990,55,750);outer.addColorStop(0,'rgba(44,174,169,.22)');outer.addColorStop(.44,'rgba(19,102,119,.13)');outer.addColorStop(1,'rgba(0,27,45,0)');c.fillStyle=outer;c.fillRect(0,0,1500,900);
    c.save();c.globalCompositeOperation='screen';
    for(let i=0;i<11;i++){const xx=650+i*74+Math.sin(t*.09+i)*11;c.beginPath();c.moveTo(xx,-90);c.lineTo(xx+25,-90);c.lineTo(xx+45+Math.sin(t*.04+i)*25,840);c.lineTo(xx-125+Math.sin(t*.05+i)*20,840);c.closePath();const ray=c.createLinearGradient(xx,-50,xx,840);ray.addColorStop(0,'rgba(87,223,209,.055)');ray.addColorStop(.55,'rgba(53,175,179,.014)');ray.addColorStop(1,'rgba(30,105,122,0)');c.fillStyle=ray;c.fill()}
    c.restore();
    // Estratos longínquos desenhados em camadas de profundidade.
    function ridge(y,seed,col,amplitude){c.beginPath();c.moveTo(-200,900);for(let x=-200;x<=1650;x+=34){let n=Math.sin(x*.010+seed)*amplitude+Math.sin(x*.027+seed*1.9)*amplitude*.34;c.lineTo(x,y+n)}c.lineTo(1650,940);c.closePath();c.fillStyle=col;c.fill()}
    ridge(595,1.6,'rgba(5,45,56,.43)',100);ridge(680,3.7,'rgba(5,35,49,.64)',105);ridge(780,1.9,'rgba(3,25,38,.82)',88);
    // Uma cadeia de montes rochosos ergue-se da fenda.
    function rock(x,y,rx,ry,color,highlight){c.beginPath();c.moveTo(x-rx,y+ry);c.lineTo(x-rx*.8,y-ry*.12);c.lineTo(x-rx*.32,y-ry*.74);c.lineTo(x-rx*.08,y-ry);c.lineTo(x+rx*.53,y-ry*.67);c.lineTo(x+rx,y+ry*.23);c.lineTo(x+rx*.81,y+ry);c.closePath();c.fillStyle=color;c.fill();c.beginPath();c.moveTo(x-rx*.08,y-ry);c.lineTo(x+rx*.23,y-ry*.79);c.lineTo(x+rx*.11,y+ry*.8);c.lineTo(x-rx*.3,y+ry*.62);c.closePath();c.fillStyle=highlight;c.fill()}
    for(let i=0;i<12;i++){const x=120+i*137,y=680+(i%3)*33,rad=36+(i%4)*15;rock(x,y,rad,110+(i%5)*34,'rgba(3,26,39,.48)','rgba(14,66,73,.13)')}
    // Objeto monumental: arco construído com blocos de abyssmarine.
    c.save();c.translate(945+Math.sin(t*.13)*3,0);
    const stone='#0a3440',edge='rgba(66,139,143,.5)';
    c.fillStyle='rgba(0,0,0,.25)';c.beginPath();c.ellipse(0,755,250,35,0,0,Math.PI*2);c.fill();
    function stoneRect(x,y,w,h){c.fillStyle=stone;c.fillRect(x,y,w,h);c.strokeStyle=edge;c.lineWidth=1.2;c.strokeRect(x+.7,y+.7,w-1.4,h-1.4);c.fillStyle='rgba(116,204,195,.07)';c.fillRect(x+3,y+3,w-6,5)}
    stoneRect(-165,425,42,305);stoneRect(98,425,43,305);stoneRect(-187,410,69,24);stoneRect(94,410,67,24);
    stoneRect(-173,372,312,44);stoneRect(-185,356,337,19);
    for(let i=0;i<8;i++)stoneRect(-182+i*42,344-(i%3)*6,39,16+(i%3)*6);
    c.beginPath();c.moveTo(-125,720);c.lineTo(-115,465);c.lineTo(-85,464);c.lineTo(-65,720);c.closePath();c.fillStyle='rgba(16,82,85,.18)';c.fill();
    c.restore();
    // Organismo luminoso suspenso no escuro (ilustração atmosférica autoral).
    function spectralMedusa(cx,cy,size,phase){
      const driftX=Math.sin(t*.24+phase)*16,driftY=Math.cos(t*.3+phase)*13;
      c.save();c.translate(cx+driftX,cy+driftY);c.globalCompositeOperation='screen';
      const aura=c.createRadialGradient(0,2,4,0,8,size*2.15);aura.addColorStop(0,'rgba(114,248,225,.24)');aura.addColorStop(.42,'rgba(54,187,190,.07)');aura.addColorStop(1,'rgba(5,90,100,0)');c.fillStyle=aura;c.beginPath();c.arc(0,7,size*2.2,0,6.283);c.fill();
      c.shadowBlur=27;c.shadowColor='rgba(129,255,230,.8)';
      const bell=c.createLinearGradient(0,-size*.78,0,size*.3);bell.addColorStop(0,'rgba(151,255,233,.55)');bell.addColorStop(.5,'rgba(67,201,209,.17)');bell.addColorStop(1,'rgba(65,180,192,.03)');
      c.fillStyle=bell;c.strokeStyle='rgba(177,255,228,.58)';c.lineWidth=1.3;
      c.beginPath();c.moveTo(-size*.9,0);c.bezierCurveTo(-size*.87,-size*1.13,size*.85,-size*1.13,size*.9,0);c.bezierCurveTo(size*.5,size*.22,-size*.48,size*.22,-size*.9,0);c.fill();c.stroke();c.shadowBlur=0;
      for(let k=0;k<9;k++){const xx=(k-4)*size*.2,end=1.25+Math.abs(k-4)*.11;c.beginPath();c.moveTo(xx,0);c.bezierCurveTo(xx+Math.sin(t*.65+k)*size*.12,size*.52,xx+Math.sin(t*.36+k)*size*.24,size*1.05,xx+Math.sin(t*.33+k*.76)*size*.39,size*end);c.strokeStyle=k%3===0?'rgba(160,253,229,.48)':'rgba(77,202,211,.30)';c.lineWidth=k%4===0?1.4:.8;c.stroke()}
      for(let k=0;k<11;k++){let xx=(k-5)*size*.15;c.beginPath();c.arc(xx,-size*.14+Math.sin(k*.8)*size*.12,1.2,0,6.283);c.fillStyle='rgba(165,255,222,.53)';c.fill()}
      c.restore()
    }
    spectralMedusa(921,205,48,1.2);
    spectralMedusa(1380,490,25,4.1);
    // Sombra monstruosa muito distante, com olho bioluminescente.
    c.save();c.translate(1290+Math.sin(t*.15)*30,323+Math.sin(t*.22)*8);c.globalAlpha=.73;
    c.fillStyle='#041622';c.beginPath();c.moveTo(-190,2);c.bezierCurveTo(-130,-64,80,-70,155,-13);c.lineTo(265,-100);c.lineTo(238,10);c.lineTo(260,105);c.lineTo(148,45);c.bezierCurveTo(65,100,-130,77,-190,2);c.fill();
    c.beginPath();c.moveTo(-15,-42);c.lineTo(49,-128);c.lineTo(85,-39);c.closePath();c.fill();c.globalAlpha=1;
    c.shadowBlur=18;c.shadowColor='#69efdc';c.fillStyle='rgba(120,252,227,.8)';c.beginPath();c.arc(-121,4,3.7,0,Math.PI*2);c.fill();c.restore();
    // Resto de um enorme esqueleto: arqueado sobre o lodo.
    c.save();c.translate(613,758);c.rotate(-.11);c.strokeStyle='rgba(141,184,185,.35)';c.lineCap='round';c.lineWidth=7;
    c.beginPath();c.moveTo(-125,4);c.bezierCurveTo(-26,-22,100,5,270,21);c.stroke();
    for(let i=0;i<13;i++){let x=-103+i*27,height=33+62*Math.sin(i/12*Math.PI);c.lineWidth=4.7-i*.18;c.beginPath();c.moveTo(x,2);c.bezierCurveTo(x+20,-height*.73,x+43,-height*.95,x+66,-height*.5);c.stroke()}
    c.restore();
    // Kelp e organismos junto às pedras, com pontas brilhantes.
    const offsets=[555,718,805,1060,1184,1332,1452,490,880,990,1260];
    offsets.forEach((x,i)=>{const h=75+(i%5)*28,base=885+(i%3)*10,twist=Math.sin(t*.36+i)*9;c.strokeStyle=i%3===0?'rgba(65,152,146,.47)':'rgba(38,101,116,.45)';c.lineWidth=i%4===0?5:3;c.lineCap='round';c.beginPath();c.moveTo(x,base);c.bezierCurveTo(x+twist-14,base-h*.4,x+twist+24,base-h*.75,x+twist,base-h);c.stroke();for(let k=1;k<4;k++){let yy=base-h*k/4;c.beginPath();c.moveTo(x+twist*k/5,yy);c.quadraticCurveTo(x+24,yy-25,x+31,yy-15);c.stroke()}if(i%2===0){const xx=x+twist,yy=base-h;c.shadowBlur=20;c.shadowColor='#83f4df';c.fillStyle=i%4===0?'#e291a2':'#74ebd9';c.beginPath();c.arc(xx,yy,3.2,0,Math.PI*2);c.fill();c.shadowBlur=0}});
    // Bolhas e pequenos peixes vivos entre as sombras.
    for(let i=0;i<20;i++){let x=730+(i*77)%690,y=170+(i*47)%540;const sw=Math.sin(t*.11+i*.83)*9;c.fillStyle='rgba(32,108,118,.52)';c.beginPath();c.ellipse(x+sw,y+Math.sin(t*.35+i)*7,6+i%5*3,2.5+i%3,Math.sin(i),0,Math.PI*2);c.fill();c.beginPath();c.moveTo(x-7+sw,y);c.lineTo(x-17+sw,y-7);c.lineTo(x-17+sw,y+7);c.fill()}
    for(const s of fallbackSpecs){let x=s.x,y=(s.y-t*(1+s.r)*1.9+5000)%900;c.beginPath();c.arc(x,y,s.r*.8,0,Math.PI*2);c.fillStyle=`rgba(114,222,209,${.08+.12*Math.sin(t*.3+s.phase)**2})`;c.fill()}
    // Névoa de profundidade, sem ofuscar as bioluminescências.
    const mist=c.createLinearGradient(0,80,0,900);mist.addColorStop(0,'rgba(0,17,27,.02)');mist.addColorStop(.6,'rgba(0,16,27,.045)');mist.addColorStop(1,'rgba(0,8,18,.52)');c.fillStyle=mist;c.fillRect(0,0,1440,900);
  }
  function renderWorld(t){if(!webglReady)return;const width=innerWidth,height=innerHeight,ratio=Math.min(devicePixelRatio||1,1.5),pw=Math.round(width*ratio),ph=Math.round(height*ratio);if(worldCanvas.width!==pw||worldCanvas.height!==ph){worldCanvas.width=pw;worldCanvas.height=ph}gl.viewport(0,0,pw,ph);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);const d=currentDepth;const camera=[2+mouseX*2.6+Math.sin(t*.08)*2.1,5-mouseY*1.8-d*4+Math.sin(t*.37)*.32,22+d*-3];const center=[15+mouseX*1.5,-6-d*5,-67];const proj=perspective(64*Math.PI/180,width/height,.5,285),view=lookAt(camera,center);
    gl.useProgram(program);gl.uniformMatrix4fv(gl.getUniformLocation(program,'uProjection'),false,proj);gl.uniformMatrix4fv(gl.getUniformLocation(program,'uView'),false,view);gl.uniform1f(gl.getUniformLocation(program,'uTime'),t);gl.uniform1f(gl.getUniformLocation(program,'uDeep'),d);gl.bindBuffer(gl.ARRAY_BUFFER,meshBuffer);const stride=40;for(const [name,size,offset] of [['aPos',3,0],['aNormal',3,12],['aColor',3,24],['aEmission',1,36]]){const loc=gl.getAttribLocation(program,name);gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,size,gl.FLOAT,false,stride,offset)}gl.drawArrays(gl.TRIANGLES,0,meshCount);
    gl.useProgram(pointProgram);gl.uniformMatrix4fv(gl.getUniformLocation(pointProgram,'uProjection'),false,proj);gl.uniformMatrix4fv(gl.getUniformLocation(pointProgram,'uView'),false,view);gl.uniform1f(gl.getUniformLocation(pointProgram,'uTime'),t);gl.uniform1f(gl.getUniformLocation(pointProgram,'uPixel'),ratio);gl.bindBuffer(gl.ARRAY_BUFFER,pointBuffer);for(const [name,offset] of [['aPos',0],['aSize',12],['aBright',16],['aPhase',20]]){const loc=gl.getAttribLocation(pointProgram,name);gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,name==='aPos'?3:1,gl.FLOAT,false,24,offset)}gl.depthMask(false);gl.drawArrays(gl.POINTS,0,pointCount);gl.depthMask(true)
  }

  /* A camada frontal simula neve marinha, correntes e bolhas próximas à lente. */
  const particles=$('#particles'),ctx=particles.getContext('2d');const marine=Array.from({length:130},()=>({x:Math.random(),y:Math.random(),s:rand(.3,2.4),speed:rand(.01,.085),phase:rand(0,7),op:rand(.04,.43)}));let lastTime=0,frame=0;
  function drawParticles(t){if(!ctx)return;const dpr=Math.min(devicePixelRatio||1,1.6),w=Math.round(innerWidth*dpr),h=Math.round(innerHeight*dpr);if(particles.width!==w||particles.height!==h){particles.width=w;particles.height=h}ctx.clearRect(0,0,w,h);for(const p of marine){let x=((p.x+Math.sin(t*.31+p.phase)*.015)%1)*w,y=((p.y+(t*p.speed*.015)%1)%1)*h;ctx.beginPath();ctx.arc(x,y,p.s*dpr,0,Math.PI*2);ctx.fillStyle=`rgba(167,235,228,${p.op*(1-currentDepth*.24)})`;ctx.fill();if(p.s>1.7){ctx.beginPath();ctx.arc(x,y,p.s*dpr*2.8,0,Math.PI*2);ctx.strokeStyle=`rgba(105,222,221,${p.op*.14})`;ctx.stroke()}}}
  function animate(ms){const t=ms*.001;currentDepth=lerp(currentDepth,targetDepth,reducedMotion?1:.024);const shown=Math.round(currentDepth*3270);$('#depthReadout').textContent=String(shown).padStart(4,'0');if(!reducedMotion || frame++<2){renderWorld(t);drawFallback(t);drawParticles(t)}if(!reducedMotion||Math.abs(currentDepth-targetDepth)>.002)drawWave(t);lastTime=t;requestAnimationFrame(animate)}
  window.addEventListener('webglcontextlost',()=>{webglReady=false});
  requestAnimationFrame(animate);
})();

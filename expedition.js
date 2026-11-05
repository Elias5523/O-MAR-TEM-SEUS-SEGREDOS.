/* ABISSAL V3 • Sistemas exploráveis e história original K–00.
   Desenhado em Canvas/Web Audio nativos, sem bibliotecas externas ou serviços de rede. */
(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const clamp = (x,a,b) => Math.max(a,Math.min(b,x));
  const lerp = (a,b,t) => a+(b-a)*t;
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveKey='abissal_neritica_k00_v3';
  let stored=false;
  try { stored=localStorage.getItem(saveKey)==='unlocked'; } catch(e){}
  const mission={sonar:false,depth:false,signal:false,unlocked:stored};
  window.ABISSAL_K_UNLOCKED=stored;
  let depth=0, visualDepth=0, lamp=true, encounterStep=0, encounterFocus=null, krakenSeen=stored;
  const depthZones=[
    {max:800,tag:'ZONA 01 / SUPERFÍCIE',name:'Última luz',zone:'CAMADA SUPERIOR',text:'A superfície desaparece lentamente atrás da cápsula. Os sensores calibram pressão, temperatura e visibilidade.',sonar:'NENHUM',caption:'INICIANDO IMERSÃO'},
    {max:1700,tag:'ZONA 02 / PENUMBRA',name:'O crepúsculo do mar',zone:'CAMADA CREPUSCULAR',text:'Os raios do sol já não sustentam a paisagem. Pontos bioluminescentes atravessam lentamente a coluna d’água.',sonar:'ECOS FRACOS',caption:'LUZ NATURAL REDUZIDA'},
    {max:2900,tag:'ZONA 03 / COLUNA ABISSAL',name:'Onde a luz acaba',zone:'ZONA AFÓTICA',text:'A luminosidade natural desapareceu. A cápsula depende do próprio holofote; qualquer clarão também pode atrair algo.',sonar:'CONTATO MÓVEL',caption:'VIDA PELÁGICA OBSERVADA'},
    {max:4100,tag:'ZONA 04 / SUBSTRATO',name:'O chão vivo',zone:'PLANÍCIE DE MUCK',text:'Abaixo da cápsula, o solo lodoso abriga criaturas, estruturas antigas e fontes hidrotermais. Há formas de vida junto aos ossos.',sonar:'ESTRUTURAS',caption:'SOLO ABISSAL IDENTIFICADO'},
    {max:Infinity,tag:'ZONA 05 / NÃO CARTOGRAFADA',name:'Fenda do silêncio',zone:'ANOMALIA BATIMÉTRICA',text:'O sonar desenha um eco maior que a largura do desfiladeiro. A origem dos ruídos está fora da área de identificação.',sonar:'K–00 ?',caption:'ANOMALIA DE GRANDE ESCALA'}
  ];
  const $slider=$('#diveSlider');
  function refreshDepth(){
    const z=depthZones.find(i=>depth<=i.max);
    $('#diveDepthValue').textContent=Math.round(depth).toString().padStart(4,'0');
    // Ordem de grandeza ilustrativa de pressão hidrostática em água do mar.
    $('#pressureValue').textContent=(1+depth/10).toFixed(0)+' bar';
    const light=Math.round(100*Math.exp(-depth/320));
    $('#lightValue').textContent=light+'%';
    const temp=lerp(18.4,2.1,depth/4800);
    $('#tempValue').textContent=temp.toFixed(1).replace('.',',')+' °C';
    $('#viewTemp').textContent=temp.toFixed(1).replace('.',',')+' °C';
    $('#diveSonarValue').textContent=z.sonar;
    $('#depthZoneCaption').textContent=z.zone;
    $('#viewCaption').textContent=z.caption;
    $('#zoneReportTag').textContent=z.tag;
    $('#zoneReportTitle').textContent=z.name;
    $('#zoneReportText').textContent=z.text;
    $('#cameraCoordinates').textContent=depth>=4200?'SETOR 04 / SINAL INCERTO':'SETOR 0'+Math.max(1,Math.min(4,Math.ceil(depth/1100)));
    $slider.style.setProperty('--fill',(depth/4800*100)+'%');
    $$('.depth-mark').forEach(b=>b.classList.toggle('active',+b.dataset.gotoDepth<=depth&&(+b.dataset.gotoDepth===0?depth<800:+b.dataset.gotoDepth+900>depth)));
    if(depth>=4200&&!mission.depth){mission.depth=true;renderAccess();notify('Profundidade extrema registrada. A estação marcou o setor como não cartografado.');}
  }
  function setDepth(n){depth=clamp(Math.round(n/100)*100,0,4800);$slider.value=depth;refreshDepth();if(reduceMotion){visualDepth=depth;drawWindow(2)}}
  $slider.addEventListener('input',()=>setDepth(+$slider.value));
  $('#descendMore').addEventListener('click',()=>setDepth(depth+800));
  $('#ascendMore').addEventListener('click',()=>setDepth(depth-800));
  $$('.depth-mark').forEach(b=>b.addEventListener('click',()=>setDepth(+b.dataset.gotoDepth)));
  $('#lampToggle').addEventListener('click',()=>{lamp=!lamp;$('#lampToggle').setAttribute('aria-pressed',String(lamp));$('#lampToggle').innerHTML='<span class="button-led"></span> HOLOFOTE: '+(lamp?'LIGADO':'DESLIGADO');$('#viewportFrame').classList.toggle('lamp-off',!lamp);if(reduceMotion)drawWindow(2)});
  refreshDepth();
  // Pesquisa de amostras (materiais reais do bioma, análises e visualização ficcionais)
  const samples={
    plankton:{code:'BIO–01 / BIOLUMINESCÊNCIA',title:'Luz produzida pela vida',text:'Organismos luminosos, como o Gossamer Worm e o Lanternfish, transformam a escuridão em um campo de sinais. Algumas dessas luzes atraem predadores.'},
    muck:{code:'SED–02 / SEDIMENTO BENTÔNICO',title:'Um fundo que não é vazio',text:'O Muck cobre o fundo da fenda e abriga habitantes bentônicos como o Sea Pig. Sua consistência densa reduz a mobilidade de quem tenta atravessá-lo.'},
    vent:{code:'GEO–03 / EMISSÃO HIDROTERMAL',title:'Vida próxima do calor',text:'As fontes geotérmicas e os Tube Worms compõem uma das regiões mais singulares do Abyssal Chasm. A visualização representa a atividade microscópica de maneira artística.'}
  };
  let sample='plankton';
  function changeSample(k){sample=k;$$('.sample-button').forEach(b=>{const ok=b.dataset.sample===k;b.classList.toggle('active',ok);b.setAttribute('aria-pressed',String(ok))});$('#sampleCode').textContent=samples[k].code;$('#sampleTitle').textContent=samples[k].title;$('#sampleText').textContent=samples[k].text;if(reduceMotion)drawSlide(2);}
  $$('.sample-button').forEach(b=>b.addEventListener('click',()=>changeSample(b.dataset.sample)));
  const glyphs=[
    {label:'INSCRIÇÃO 01 / ÁGUA',quote:'“O mar conserva os nomes.”',note:'Marca encontrada em pedra de Abyssmarine. A equipe a relacionou à memória e à preservação.'},
    {label:'INSCRIÇÃO 02 / VIGÍLIA',quote:'“Até o silêncio observa.”',note:'Padrão recorrente nas proximidades das ruínas. A hipótese da expedição é que identifique um aviso.'},
    {label:'INSCRIÇÃO 03 / PORTA',quote:'“O que dorme não esqueceu.”',note:'Inscrição fragmentada em um altar submerso. Sua tradução foi marcada como não conclusiva.'}
  ];
  $$('.glyph-button').forEach(b=>b.addEventListener('click',()=>{const k=+b.dataset.glyph;$$('.glyph-button').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});$('#glyphIndex').textContent=glyphs[k].label;$('#glyphPhrase').textContent=glyphs[k].quote;$('#glyphInterpretation').textContent=glyphs[k].note;}));
  // Hidrofone: assinatura selecionável, espectrograma e amostras sonoras procedurais.
  let hydro='current';
  const hydroLabels={current:'CANAL 01 / CORRENTE',fauna:'CANAL 02 / VOCALIZAÇÃO',unknown:'CANAL 03 / ANOMALIA K–00'};
  $$('.hydro-signal').forEach(b=>b.addEventListener('click',()=>{hydro=b.dataset.hydro;$$('.hydro-signal').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});$('#hydroStatus').textContent=hydroLabels[hydro]+' / SELECIONADO';if(reduceMotion)drawSpectrum(2);}));
  let soundCtx=null,hydroPlaying=false;
  $('#playHydro').addEventListener('click',async()=>{
    if(hydroPlaying)return;
    const AC=window.AudioContext||window.webkitAudioContext;
    if(!AC){$('#hydroStatus').textContent='ÁUDIO NÃO SUPORTADO';return;}
    if(!soundCtx)soundCtx=new AC();
    try {if(soundCtx.state==='suspended')await soundCtx.resume()}catch(e){}
    const ac=soundCtx,now=ac.currentTime,duration=1.9;
    const out=ac.createGain();out.gain.value=.001;out.gain.setValueAtTime(.001,now);out.gain.linearRampToValueAtTime(.14,now+.17);out.gain.setValueAtTime(.14,now+duration-.3);out.gain.linearRampToValueAtTime(.001,now+duration);out.connect(ac.destination);
    if(hydro==='current'){
      const n=ac.sampleRate*2,buf=ac.createBuffer(1,n,ac.sampleRate),d=buf.getChannelData(0);let smooth=0;
      for(let i=0;i<n;i++){smooth=smooth*.987+(Math.random()*2-1)*.013;d[i]=smooth*.34}
      const source=ac.createBufferSource(),filter=ac.createBiquadFilter();source.buffer=buf;filter.type='lowpass';filter.frequency.value=650;source.connect(filter).connect(out);source.start(now);source.stop(now+duration);
      const o=ac.createOscillator(),g=ac.createGain();o.type='sine';o.frequency.setValueAtTime(53,now);o.frequency.linearRampToValueAtTime(41,now+duration);g.gain.value=.15;o.connect(g).connect(out);o.start(now);o.stop(now+duration);
    } else {
      const freqs=hydro==='fauna'?[130,238,360]:[38,57,91];
      freqs.forEach((f,j)=>{const o=ac.createOscillator(),g=ac.createGain();o.type=hydro==='fauna'?'sine':j===0?'triangle':'sine';o.frequency.setValueAtTime(f,now);o.frequency.exponentialRampToValueAtTime(hydro==='fauna'?f*(j%2?1.8:.68):f*.72,now+duration);g.gain.value=(hydro==='unknown'?.19:.11)/(j+1);o.connect(g).connect(out);o.start(now);o.stop(now+duration)});
    }
    hydroPlaying=true;const button=$('#playHydro');button.disabled=true;button.textContent='REPRODUZINDO...';$('#hydroStatus').textContent=hydroLabels[hydro]+' / EMISSÃO';
    window.setTimeout(()=>{hydroPlaying=false;button.disabled=false;button.textContent='▶ REPRODUZIR SINAL';$('#hydroStatus').textContent=hydroLabels[hydro]+' / PRONTO'},2000);
  });
  // Diários de bordo (ficcionais) guardados localmente no próprio site.
  const logs=[
    {date:'NR–001 / PRIMEIRO REGISTRO',integrity:'INTEGRIDADE 98%',title:'Primeiro contato',paragraphs:['O sonar encontrou a abertura da fenda às 04:12. A água escureceu antes de atingirmos a margem da plataforma. O casco está estável.','Existem estruturas construídas no fundo. Não são formações naturais.'],author:'DRA. M. VALEN',access:'ACESSO 01 / LIVRE'},
    {date:'NR–004 / AMOSTRA ORGÂNICA',integrity:'INTEGRIDADE 74%',title:'O esqueleto',paragraphs:['Os restos estão cobertos por pequenos organismos. Observamos vida crescendo sobre o que antes foi a estrutura de um corpo colossal.','A bióloga identificou marcas profundas nas costelas. Medimos a distância entre elas, mas não há animal catalogado que corresponda ao intervalo.'],author:'DR. E. RAHIM',access:'ACESSO 02 / PARCIAL'},
    {date:'NR–011 / DADOS ACÚSTICOS',integrity:'INTEGRIDADE 52%',title:'Eco impossível',paragraphs:['A emissão de sonar retornou duas vezes. O segundo eco se comportou como se a própria fonte tivesse respondido, mesmo com a transmissão desligada.','O gráfico do hidrofone produziu uma sequência de pulsações abaixo dos sinais habituais da fauna local. A tripulação pediu para apagar as luzes.'],author:'TÉC. D. ALVES',access:'ACESSO 03 / PARCIAL'},
    {date:'NR–017 / ÚLTIMA TRANSMISSÃO',integrity:'INTEGRIDADE 21%',title:'Última transmissão',paragraphs:['A comunicação foi contaminada por um ruído grave, constante, intercalado com intervalos de silêncio absoluto. Parte do código do receptor está ausente.','Se alguém recuperar este arquivo: não persiga o que aparece nas margens da câmera. A luz da cápsula faz com que ele olhe para nós.'],author:'COMANDANTE N. VOSS',access:'ACESSO 04 / DANIFICADO'},
    {date:'NR–000 / PÓS-INCIDENTE',integrity:'INTEGRIDADE 07%',title:'O que nos viu',paragraphs:['Não era uma ilha. Não era uma ruína. O sonar havia registrado apenas uma parte de sua forma.','Quando o olho se abriu, compreendemos por que a fenda parecia vazia. Não estávamos explorando uma paisagem: estávamos atravessando o lugar onde algo esperava.'],author:'AUTOR DESCONHECIDO',access:'ACESSO K–00 / DESCLASSIFICADO'}
  ];
  function showLog(i){if(i===4&&!mission.unlocked)return;const d=logs[i];$$('.archive-entry').forEach(b=>{const ok=+b.dataset.log===i;b.classList.toggle('active',ok);b.setAttribute('aria-pressed',String(ok))});$('#archiveDate').textContent=d.date;$('#archiveCondition').textContent=d.integrity;$('#archiveTitle').textContent=d.title;$('#archiveText').replaceChildren(...d.paragraphs.map(t=>{const p=document.createElement('p');p.textContent=t;return p}));$('#archiveAuthor').textContent=d.author;$('#archiveStamp').textContent=d.access;$('.archive-document').classList.toggle('secret-open',i===4)}
  $$('.archive-entry').forEach(b=>b.addEventListener('click',()=>showLog(+b.dataset.log)));
  function notify(message){const t=$('#toast');if(!t)return;t.textContent=message;t.classList.add('show');clearTimeout(notify._timer);notify._timer=setTimeout(()=>t.classList.remove('show'),4000)}
  // The three recorded investigations unlock K–00. A completed encounter reveals the tenth card.
  function markTask(id,done){const el=$(id);el.classList.toggle('complete',done);el.querySelector('.access-icon').textContent=done?'✓':'○';el.querySelector('.access-state').textContent=done?'VALIDADO':'PENDENTE'}
  function refreshCatalog(){
    const activeFilter=$('.catalog-filter.active')?.dataset.filter||'all';
    $('#krakenCatalogEntry').hidden=!mission.unlocked||activeFilter!=='all';
    $('#secretLogButton').hidden=!mission.unlocked;
    window.ABISSAL_K_UNLOCKED=mission.unlocked;
    const count=$$('.creature-card:not([hidden])').length;
    $('#catalogShown').textContent=String(count).padStart(2,'0');
    const total=$('#catalogTotal');if(total)total.textContent=String(mission.unlocked?10:9).padStart(2,'0');
    const text=$('.bestiary-note');if(text&&mission.unlocked)text.textContent='✳ 09 ENTIDADES PRÓPRIAS DO BIOMA + 01 ANOMALIA FICCIONAL DESBLOQUEADA (K–00)';
    $('#globalKStatus').textContent=mission.unlocked?'DESCLASSIFICADO':'BLOQUEADO';
  }
  function renderAccess(){
    markTask('#taskSonar',mission.sonar||mission.unlocked);markTask('#taskDepth',mission.depth||mission.unlocked);markTask('#taskSignal',mission.signal||mission.unlocked);
    const n=[mission.sonar,mission.depth,mission.signal].filter(Boolean).length;
    const ready=n===3||mission.unlocked;
    const trigger=$('#krakenTrigger');trigger.disabled=!ready;
    trigger.innerHTML=ready?'<span>◈</span> '+(mission.unlocked?'REVER CONTATO K–00':'REPRODUZIR GRAVAÇÃO K–00')+' <span>↗</span>':'<span>◈</span> AGUARDANDO AUTORIZAÇÃO <span>↗</span>';
    $('#accessState').textContent=mission.unlocked?'ARQUIVO DESCLASSIFICADO':ready?'ACESSO AUTORIZADO':'ACESSO RESTRITO';
    $('#anomalyFeedback').textContent=mission.unlocked?'ANOMALIA REGISTRADA • FICHA K–00 NO CATÁLOGO E DIÁRIO NR–000 NOS ARQUIVOS':n+' / 3 CONDIÇÕES ATENDIDAS • CÂMERA K–00 '+(ready?'DISPONÍVEL':'INDISPONÍVEL');
  }
  document.addEventListener('abissal:sonar',()=>{mission.sonar=true;renderAccess()});
  document.addEventListener('abissal:decoded',()=>{mission.signal=true;renderAccess()});
  let lastEncounterBtn=null;
  // Rows of suction cups are sampled along each SVG tentacle path for depth and scale.
  try {
    const tentacleSvg=$('.encounter-tentacles');
    const paths=[...tentacleSvg.querySelectorAll('path')];
    const NS='http://www.w3.org/2000/svg';
    paths.forEach((path,index)=>{
      const length=path.getTotalLength();
      for(let j=2;j<26;j++){
        const pos=path.getPointAtLength(length*j/28);
        const before=path.getPointAtLength(length*(j-.17)/28);
        const after=path.getPointAtLength(length*(j+.17)/28);
        const tx=after.x-before.x,ty=after.y-before.y,angle=Math.atan2(ty,tx);
        for(let row=0;row<2;row++){
          const sign=row===0?1:-1,spread=(index===1?36:25)*sign;
          const dot=document.createElementNS(NS,'circle');
          dot.classList.add('sucker');
          dot.setAttribute('cx',String(pos.x-Math.sin(angle)*spread));
          dot.setAttribute('cy',String(pos.y+Math.cos(angle)*spread));
          dot.setAttribute('r',String(2.7+5.8*Math.sin(j/28*Math.PI)+(row?1:0)));
          tentacleSvg.appendChild(dot);
        }
      }
    });
  } catch(e) { /* SVG geometry may be unavailable; dark tentacles still render. */ }
  const encounterFrames=[
    {code:'K–00 / 01 — ECO NÃO IDENTIFICADO',title:'A água <em>se moveu.</em>',text:'Uma forma gigantesca atravessa o alcance do sonar. Seu tamanho excede a margem de leitura.',next:'CONTINUAR OBSERVAÇÃO →'},
    {code:'K–00 / 02 — COLISÃO IMINENTE',title:'Não é uma <em>montanha.</em>',text:'Uma estrutura flexível, longa demais para ser medida, passa diante da escotilha. A cápsula começa a vibrar.',next:'MANTER A CÂMERA ATIVA →'},
    {code:'K–00 / 03 — CONTATO VISUAL',title:'Ele está <em>olhando.</em>',text:'A superfície escura se abre e revela um único olho. A fonte de luz do submarino está refletida em sua pupila.',next:'RECUPERAR TRANSMISSÃO →'},
    {code:'K–00 / 04 — SINAL INTERROMPIDO',title:'A luz <em>terminou.</em>',text:'O monitor apagou. Os últimos segundos da gravação foram preservados e transferidos para o arquivo de pesquisa.',next:'DESCLASSIFICAR ARQUIVO K–00 ↗'}
  ];
  function renderEncounter(){const f=encounterFrames[encounterStep];const wrap=$('#krakenEncounter');wrap.className='kraken-encounter kr-phase-'+(encounterStep+1);$('#encounterCode').textContent=f.code;$('#encounterTitle').innerHTML=f.title;$('#encounterNarration').textContent=f.text;$('#nextEncounter').textContent=f.next;$$('.encounter-segment').forEach((b,i)=>b.classList.toggle('active',i<=encounterStep))}
  function openEncounter(){lastEncounterBtn=document.activeElement;encounterStep=0;renderEncounter();$('#krakenEncounter').hidden=false;document.body.style.overflow='hidden';$('#closeEncounter').focus();}
  function closeEncounter(){if($('#krakenEncounter').hidden)return;$('#krakenEncounter').hidden=true;document.body.style.overflow='';lastEncounterBtn?.focus?.()}
  function unlock(){mission.unlocked=true;krakenSeen=true;try{localStorage.setItem(saveKey,'unlocked')}catch(e){}refreshCatalog();renderAccess();closeEncounter();notify('ARQUIVO K–00 DESCLASSIFICADO. Nova ficha no catálogo e novo diário disponíveis.');$('#anomalia').scrollIntoView({behavior:reduceMotion?'instant':'smooth'});}
  $('#krakenTrigger').addEventListener('click',openEncounter);
  $('#closeEncounter').addEventListener('click',closeEncounter);
  $('#nextEncounter').addEventListener('click',()=>{if(encounterStep===3){unlock();return;}encounterStep++;renderEncounter()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#krakenEncounter').hidden){closeEncounter();e.stopPropagation()}});
  refreshCatalog();renderAccess();
  // The old V2 controls are also discoverable by their native data attributes.
  $('#stationClock').textContent='SISTEMAS ONLINE / NERÍTICA 04';

  // Canvas rendering: hand-drawn atmospheric undersea window, microscopic slide and spectrogram.
  const camera=$('#expeditionView'),cameraCtx=camera.getContext('2d');
  const slide=$('#microCanvas'),microCtx=slide.getContext('2d');
  const spectrum=$('#hydroCanvas'),hydroCtx=spectrum.getContext('2d');
  function beginCanvas(canvas,ctx,w,h){
    if(!ctx)return false;
    const rect=canvas.getBoundingClientRect();if(rect.width===0||rect.height===0)return false;
    const ratio=Math.min(devicePixelRatio||1,1.5),pw=Math.round(rect.width*ratio),ph=Math.round(rect.height*ratio);
    if(canvas.width!==pw||canvas.height!==ph){canvas.width=pw;canvas.height=ph}
    ctx.setTransform(pw/w,0,0,ph/h,0,0);return true;
  }
  function gradient(ctx,x,y,r,colors){const g=ctx.createRadialGradient(x,y,0,x,y,r);colors.forEach(([t,c])=>g.addColorStop(t,c));return g}
  function glowPoint(ctx,x,y,r,col){ctx.fillStyle=gradient(ctx,x,y,r,[[0,col],[.22,col+'66'],[1,'#00000000']]);ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill()}
  function seaRidge(ctx,points,fill){ctx.beginPath();ctx.moveTo(points[0][0],points[0][1]);for(let i=1;i<points.length;i++)ctx.lineTo(points[i][0],points[i][1]);ctx.lineTo(1050,650);ctx.lineTo(-50,650);ctx.closePath();ctx.fillStyle=fill;ctx.fill()}
  function drawWindow(t){
    if(!beginCanvas(camera,cameraCtx,1000,600))return;
    const c=cameraCtx,d=visualDepth,deep=d/4800,illum=lamp?1:.19;
    c.clearRect(0,0,1000,600);
    const backdrop=c.createLinearGradient(0,0,0,600);
    backdrop.addColorStop(0,deep>.72?'#020d1c':deep>.35?'#061c2c':'#115369');
    backdrop.addColorStop(.5,deep>.72?'#061925':'#092a38');
    backdrop.addColorStop(1,'#020b14');c.fillStyle=backdrop;c.fillRect(0,0,1000,600);
    c.save();c.globalAlpha=(1-deep)*.68*illum;
    for(let i=0;i<7;i++){const px=85+i*135+Math.sin(t*.08+i)*21;const beam=c.createLinearGradient(px,0,px+80,560);beam.addColorStop(0,'#9cfbf53d');beam.addColorStop(1,'#8ae7db00');c.fillStyle=beam;c.beginPath();c.moveTo(px-25,-25);c.lineTo(px+42,-25);c.lineTo(px+155,610);c.lineTo(px+66,610);c.fill()}
    c.restore();
    if(lamp){const cone=gradient(c,500,270,570,[[0,deep>.7?'#1b707a40':'#399bae24'],[.62,'#0d506026'],[1,'#07304200']]);c.fillStyle=cone;c.fillRect(0,0,1000,600)}
    // Layered rock formations with a central distant rift.
    seaRidge(c,[[-30,265],[35,320],[93,277],[148,369],[245,322],[310,408],[375,368],[428,440],[520,430],[615,350],[687,389],[735,325],[824,367],[915,290],[1030,350]],'#0a2a38a8');
    seaRidge(c,[[-30,391],[90,341],[156,405],[220,363],[300,449],[355,427],[414,480],[492,464],[573,445],[664,476],[725,387],[795,434],[884,366],[1020,407]],'#071d2bbe');
    seaRidge(c,[[-20,480],[67,433],[123,472],[180,438],[242,497],[325,452],[388,530],[483,494],[563,515],[670,451],[753,513],[834,442],[913,490],[1040,438]],'#041521');
    // Abyssmarine ruins, silhouettes stronger at depth.
    if(d>1200){c.save();c.globalAlpha=clamp((d-1100)/1600,0,.8)*illum;const x=575,y=410;c.strokeStyle='#5e9ca0';c.lineWidth=2;
      for(const [xx,yy,ww,hh] of [[-102,-95,36,165],[73,-95,32,165],[-122,-108,243,22],[-131,-128,258,14]]){c.fillStyle='#0d303b';c.fillRect(x+xx,y+yy,ww,hh);c.strokeRect(x+xx,y+yy,ww,hh)}
      for(let i=0;i<5;i++){c.fillStyle='#164452';c.fillRect(x-114+i*44,y-139-i%2*8,37,12)}c.restore();}
    // Hydrothermal towers with delicate rising bubbles.
    if(d>2300){c.save();c.globalAlpha=clamp((d-2200)/800,0,.85)*illum;
      for(const [x,y,w,h] of [[145,485,28,120],[208,480,16,75],[785,464,33,140],[846,489,20,83]]){
        c.fillStyle='#153a47';c.beginPath();c.moveTo(x-w/2,y+40);c.lineTo(x-w*.52,y-h*.2);c.lineTo(x-w*.36,y-h);c.lineTo(x+w*.28,y-h-6);c.lineTo(x+w*.53,y+40);c.fill();
        for(let j=0;j<11;j++){const yy=y-h-9-((j*31+t*19)%(h+115));const xx=x+Math.sin(j*7+t*.35)*7;c.fillStyle=`rgba(93,181,180,${.08+.15*j/11})`;c.beginPath();c.arc(xx,yy,2+j%4,0,Math.PI*2);c.fill()}
      }c.restore();}
    // Whale-fall and bones visible nearer bottom.
    if(d>2600){c.save();c.globalAlpha=clamp((d-2600)/1200,0,.56)*illum;c.translate(360,545);c.rotate(-.08);c.strokeStyle='#a7c8bf';c.lineWidth=5;c.lineCap='round';c.beginPath();c.moveTo(-153,0);c.bezierCurveTo(-70,-18,40,-8,190,8);c.stroke();for(let i=0;i<12;i++){const x=-135+i*27,h=30+47*Math.sin(i/12*Math.PI);c.lineWidth=3;c.beginPath();c.moveTo(x,0);c.bezierCurveTo(x+12,-h,x+25,-h*.8,x+37,-h*.34);c.stroke()}c.restore();}
    // Plants and luminous suspended fauna.
    for(let i=0;i<15;i++){const x=22+i*71,y=552+(i%3)*28,h=29+(i*13%83),sway=Math.sin(t*.4+i*2)*11;c.lineWidth=1+i%4;c.strokeStyle=i%3?'#287c80b5':'#579d8da8';c.beginPath();c.moveTo(x,y+30);c.bezierCurveTo(x-13,y-h*.5,x+sway+15,y-h*.65,x+sway,y-h);c.stroke();if(i%3===0){glowPoint(c,x+sway,y-h,12,'#6bf7d8');c.fillStyle='#6bead3';c.beginPath();c.arc(x+sway,y-h,2.7,0,Math.PI*2);c.fill()}}
    // drifting specs / particles
    for(let i=0;i<86;i++){const seed=i*29.35;const x=((seed*27.7+Math.sin(t*.18+i)*26)%1070+1070)%1070-35;const y=((i*91.1-t*(6+i%8))%650+650)%650;c.fillStyle=`rgba(148,236,222,${(.06+(i%6)*.032)*illum})`;c.beginPath();c.arc(x,y,.5+(i%4)*.48,0,Math.PI*2);c.fill()}
    if(d>500){for(let j=0;j<9;j++){const x=70+(j*89+Math.sin(t*.22+j)*30)%870,y=115+((j*83+t*5)%320),s=5+j%4*3;c.fillStyle= j%3===0?'#a4f7db':'#2f7e83';c.globalAlpha=(.2+deep*.4)*illum;c.beginPath();c.ellipse(x,y,s*1.7,s*.44,Math.sin(j)*.35,0,Math.PI*2);c.fill();c.beginPath();c.moveTo(x-s*1.3,y);c.lineTo(x-s*2.3,y-s*.68);c.lineTo(x-s*2.3,y+s*.68);c.fill();c.globalAlpha=1}}
    if(d>800){for(let i=0;i<3;i++){const x=186+i*304+Math.sin(t*.3+i*4)*15,y=165+i*62+Math.sin(t*.37+i*2)*14,r=20-i*4;
      c.save();c.globalAlpha=clamp((d-600)/1900,.05,.75)*illum;glowPoint(c,x,y,r*2.2,'#7bf7dd');c.strokeStyle='#b7f5e6';c.lineWidth=.8;c.fillStyle='#478f9b60';c.beginPath();c.moveTo(x-r,y);c.bezierCurveTo(x-r*.8,y-r*1.3,x+r*.8,y-r*1.3,x+r,y);c.quadraticCurveTo(x,y+r*.2,x-r,y);c.fill();c.stroke();for(let j=-3;j<=3;j++){c.beginPath();c.moveTo(x+j*r*.23,y);c.bezierCurveTo(x+j*r*.24+Math.sin(t*.5+j)*r*.3,y+r*.65,x+j*r*.24,y+r*1.35,x+j*r*.3+Math.sin(t*.6+j)*r*.45,y+r*2.0);c.stroke()}c.restore()}}
    if(krakenSeen&&d>=4200){c.save();c.globalAlpha=.29;const x=880+Math.sin(t*.1)*27,y=270;glowPoint(c,x,y,120,'#8ec3cc');c.beginPath();c.ellipse(x,y,105,105,0,0,Math.PI*2);c.fillStyle='#010714';c.fill();c.beginPath();c.ellipse(x,y,21,27,0,0,Math.PI*2);c.fillStyle='#74ddd0';c.shadowColor='#9ae3f5';c.shadowBlur=45;c.fill();c.restore()}
    if(!lamp){c.fillStyle='#000f1c9e';c.fillRect(0,0,1000,600)}
    c.strokeStyle='#66c9d044';c.lineWidth=1;c.beginPath();c.arc(500,300,90,0,Math.PI*2);c.stroke();
  }
  function drawSlide(t){if(!beginCanvas(slide,microCtx,620,300))return;const c=microCtx;c.clearRect(0,0,620,300);c.fillStyle='#041a24';c.fillRect(0,0,620,300);c.save();
    if(sample==='plankton'){
      for(let i=0;i<35;i++){const x=40+(i*89.43)%565+Math.sin(t*.45+i)*12,y=24+(i*57.19)%260+Math.cos(t*.4+i)*8,r=2+(i%7)*1.6;glowPoint(c,x,y,r*4,i%3?'#58dfca':'#9ebef0');c.fillStyle=i%3?'#7fffe0':'#a7dbee';c.beginPath();c.ellipse(x,y,r*.45,r*.76,i*.6,0,6.283);c.fill();}
      for(let i=0;i<4;i++){const x=96+i*140,y=100+Math.sin(t*.6+i)*48;c.strokeStyle='#7afcdd7a';c.lineWidth=1.5;c.beginPath();for(let j=0;j<30;j++){const xx=x+j*3,yy=y+Math.sin(j*.6+t+i)*9; j?c.lineTo(xx,yy):c.moveTo(xx,yy)}c.stroke()}
    } else if(sample==='muck'){
      c.fillStyle=gradient(c,310,140,230,[[0,'#18424c'],[1,'#02111a']]);c.fillRect(0,0,620,300);
      for(let i=0;i<180;i++){const x=(i*47.73)%620,y=(i*89.19)%300,r=2+i%6*1.2;c.beginPath();c.ellipse(x+Math.sin(t*.18+i)*2,y+Math.cos(t*.2+i)*2,r*1.3,r*.7,i,0,Math.PI*2);c.fillStyle=i%7===0?'#72c7be44':i%3?'#254f56aa':'#53737599';c.fill()}
      for(let i=0;i<9;i++){const x=50+i*64,y=75+i%3*59;glowPoint(c,x,y,20,'#91ccb2')}
    } else {
      c.fillStyle=gradient(c,310,200,230,[[0,'#23565b'],[.5,'#102b38'],[1,'#03111b']]);c.fillRect(0,0,620,300);
      for(let i=0;i<23;i++){const x=80+i*22,y=290-((i*21+t*13)%280);c.beginPath();c.arc(x+Math.sin(i+t*.3)*16,y,3+i%4*2,0,6.283);c.fillStyle=i%4?'#8ce2d43d':'#b2f5d5a8';c.fill();}
      for(let i=0;i<5;i++){const x=80+i*110;c.beginPath();c.moveTo(x,290);c.bezierCurveTo(x+10,220,x-25,200,x+18,170+Math.sin(t*.5+i)*8);c.strokeStyle='#a2d9b87a';c.lineWidth=3;c.stroke()}
    }
    c.restore();c.strokeStyle='#7dbfba24';c.strokeRect(15,15,590,270);
  }
  function drawSpectrum(t){if(!beginCanvas(spectrum,hydroCtx,620,300))return;const c=hydroCtx;c.clearRect(0,0,620,300);c.fillStyle='#061723';c.fillRect(0,0,620,300);c.strokeStyle='#3e879442';c.lineWidth=1;for(let i=0;i<13;i++){c.beginPath();c.moveTo(i*52,0);c.lineTo(i*52,300);c.stroke()}for(let i=0;i<7;i++){c.beginPath();c.moveTo(0,i*50);c.lineTo(620,i*50);c.stroke()}
    for(let i=0;i<150;i++){const xx=(i*19.37)%620,yy=280-((i*113.13)%255);const alpha=(hydro==='unknown'?.14:.07)*(i%3+1);c.fillStyle=`rgba(${hydro==='unknown'?'251,132,156':'105,212,209'},${alpha})`;c.fillRect(xx,yy,3+i%3*2,3+i%5*5)}
    const lines=hydro==='unknown'?4:hydro==='fauna'?3:2;
    for(let l=0;l<lines;l++){c.beginPath();for(let x=0;x<=620;x+=2){const k=x/620,base=hydro==='current'?150:hydro==='fauna'?150+Math.sin(t*.2+l)*23:150;const amp=hydro==='unknown'?34:hydro==='fauna'?47:21;let harmonic=hydro==='unknown'?Math.sin(k*130+t*2+l)*Math.sin(k*32+t):hydro==='fauna'?Math.sin(k*60+l*1.5+t*3)*Math.sin(k*13-t*.5):Math.sin(k*33+t*.6+l);const y=base+Math.sin(l*2.1)*32+harmonic*amp; x===0?c.moveTo(x,y):c.lineTo(x,y)}c.strokeStyle=hydro==='unknown'?['#dc8594','#a05472','#4c9b9d','#e5a6a9'][l]:['#8af6dd','#4bb5ba','#a6e6e6'][l];c.globalAlpha=.56;c.lineWidth=l===0?2:1;c.stroke();c.globalAlpha=1}
    c.font='11px monospace';c.fillStyle='#6ec4c6';c.fillText('FREQUENCY ANALYSIS / HYDROPHONE',15,21);c.fillText('0.01 kHz',12,287);c.fillText('8.00 kHz',543,287);
  }
  // Frame loop runs only when sections are near the viewport, avoiding unnecessary GPU/CPU load.
  let last=0;
  function loop(ms){const t=reduceMotion?2:ms*.001;if(ms-last>32||reduceMotion&&last===0){last=ms;visualDepth=lerp(visualDepth,depth,reduceMotion?1:.09);
      const visible=el=>{const r=el.getBoundingClientRect();return r.bottom>-120&&r.top<innerHeight+120};
      if(visible(camera))drawWindow(t);
      if(visible(slide))drawSlide(t);
      if(visible(spectrum))drawSpectrum(t);
    }
    if(!reduceMotion)requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();

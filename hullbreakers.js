/* ABISSAL — Arquivos de lore dos dois Hullbreakers humanoides.
   Personagens originais. Sem imagens, aparências ou histórias pré-definidas. */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const PORTAL = $('#hullPortal');
  if (!PORTAL) return;
  const STORAGE_KEY = 'abissal-hullbreaker-humanoides-lore-v1';
  const authorMode = new URLSearchParams(window.location.search).get('editar') === '1';
  const defaults = [
    { name: 'Identidade não revelada', subtitle: 'Nenhum testemunho foi autenticado.', intro: '', chapters: [] },
    { name: 'Identidade não revelada', subtitle: 'Nenhum testemunho foi autenticado.', intro: '', chapters: [] }
  ];
  const clone = data => JSON.parse(JSON.stringify(data));
  const normalize = (value, idx) => {
    if (!value || typeof value !== 'object') return clone(defaults[idx]);
    return {
      name: typeof value.name === 'string' ? value.name.slice(0, 180) : defaults[idx].name,
      subtitle: typeof value.subtitle === 'string' && !/^O (primeiro|segundo) registro aguarda sua história\.$/.test(value.subtitle) ? value.subtitle.slice(0, 350) : defaults[idx].subtitle,
      intro: typeof value.intro === 'string' ? value.intro.slice(0, 60000) : '',
      chapters: Array.isArray(value.chapters) ? value.chapters.slice(0, 80).map((chapter, i) => ({
        title: typeof chapter?.title === 'string' ? chapter.title.slice(0, 220) : `Capítulo ${i+1}`,
        text: typeof chapter?.text === 'string' ? chapter.text.slice(0, 100000) : ''
      })) : []
    };
  };
  let data = clone(defaults);
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length >= 2) data = [normalize(parsed[0], 0), normalize(parsed[1], 1)];
    }
  } catch (_error) { /* File browser may disable localStorage. */ }
  let subject = 0;
  let pageIndex = -1;
  let opener = null;
  const portalTitle = $('#hullPortalTitle');
  const title = $('#hullStoryTitle');
  const content = $('#hullStoryContent');
  const editor = $('#hullEditor');
  const editorChapters = $('#hullEditorChapters');
  const status = $('#hullEditorStatus');
  $('#hullEditButton').hidden = !authorMode;
  $('.hull-side-note')?.setAttribute('hidden', '');

  function saveStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (_error) {
      return false;
    }
  }
  function pad(value) { return String(value).padStart(2, '0'); }
  function text(el, value) { el.textContent = value; }
  function setStatus(message) { text(status, message); }

  function updateCards() {
    data.forEach((record, i) => {
      const node = $(`[data-hull-card="${i}"]`);
      if (!node) return;
      text(node.querySelector('.hull-card-name'), record.name.trim() || 'Identidade não revelada');
      text(node.querySelector('.hull-card-subtitle'), record.chapters.length ? `${record.chapters.length} capítulo(s) registrado(s) · acessar arquivo` : 'Nenhum depoimento recuperado');
      text(node.querySelector('.hull-card-state'), record.chapters.length ? 'DOCUMENTAÇÃO PARCIAL' : 'ARQUIVO SOB SIGILO');
    });
  }

  function renderNav() {
    const list = $('#hullChapterNav');
    list.innerHTML = '';
    const makeButton = (label, num, active, onClick) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.classList.toggle('active', active);
      const ordinal = document.createElement('span');
      ordinal.textContent = num;
      button.append(ordinal, document.createTextNode(label));
      button.addEventListener('click', onClick);
      list.append(button);
    };
    makeButton('Apresentação', '00', pageIndex === -1, () => { pageIndex = -1; render(); });
    data[subject].chapters.forEach((chapter, i) => {
      makeButton(chapter.title.trim() || `Capítulo ${i + 1}`, pad(i + 1), pageIndex === i, () => { pageIndex = i; render(); });
    });
  }

  function render() {
    const record = data[subject];
    const code = `H–0${subject + 1}`;
    portalTitle.textContent = record.name.trim() || 'Identidade não revelada';
    text($('#hullSubjectNumber'), `REGISTRO ${code} / HULLBREAKER HUMANOIDE`);
    text($('#hullRoomMarker'), subject === 0 ? 'I' : 'II');
    text($('#hullRecordTag'), `CÓDICE ${code}`);
    $('#hullSwitchA').classList.toggle('active', subject === 0);
    $('#hullSwitchB').classList.toggle('active', subject === 1);
    $('#hullSwitchA').setAttribute('aria-pressed', String(subject === 0));
    $('#hullSwitchB').setAttribute('aria-pressed', String(subject === 1));
    if (pageIndex >= record.chapters.length) pageIndex = -1;
    const intro = pageIndex === -1;
    title.textContent = intro ? 'Apresentação' : record.chapters[pageIndex].title.trim() || `Capítulo ${pageIndex + 1}`;
    text($('#hullStorySubtitle'), intro ? record.subtitle : `CAPÍTULO ${pad(pageIndex + 1)} / ${pad(record.chapters.length)}`);
    const currentText = intro ? record.intro : record.chapters[pageIndex].text;
    content.innerHTML = '';
    if (currentText.trim()) {
      text(content, currentText);
      content.classList.remove('hull-empty');
    } else {
      text(content, intro ? 'Nenhuma transcrição foi autorizada para este registro.' : 'O conteúdo desta folha foi suprimido dos arquivos de circulação.');
      content.classList.add('hull-empty');
    }
    text($('#hullPageNumber'), intro ? '00' : pad(pageIndex + 1));
    text($('#hullChapterTotal'), `${pad(record.chapters.length)} CAPÍTULOS`);
    renderNav();
    updateCards();
  }

  function open(index, sourceButton) {
    if (index !== 0 && index !== 1) return;
    subject = index;
    pageIndex = -1;
    opener = sourceButton || document.activeElement;
    PORTAL.hidden = false;
    document.body.classList.add('hull-portal-open');
    editor.hidden = true;
    render();
    $('#hullClose').focus();
  }

  function close() {
    editor.hidden = true;
    PORTAL.hidden = true;
    document.body.classList.remove('hull-portal-open');
    if (opener && typeof opener.focus === 'function') opener.focus();
  }

  function switchSubject(index) {
    if (!editor.hidden) commitEditor(false);
    subject = index;
    pageIndex = -1;
    editor.hidden = true;
    render();
  }

  function buildEditorChapter(chapter = { title: '', text: '' }) {
    const index = editorChapters.children.length;
    const row = document.createElement('div');
    row.className = 'hull-chapter-edit';
    const heading = document.createElement('div');
    heading.className = 'hull-chapter-edit-head';
    const h4 = document.createElement('h4');
    h4.textContent = `CAPÍTULO ${pad(index + 1)}`;
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.textContent = 'REMOVER';
    remove.addEventListener('click', () => { row.remove(); renumberChapters(); });
    heading.append(h4, remove);
    const titleField = document.createElement('div');
    titleField.className = 'hull-field';
    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Título do capítulo';
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.className = 'hull-chapter-title-input';
    titleInput.maxLength = 220;
    titleInput.placeholder = `Capítulo ${index + 1}`;
    titleInput.value = chapter.title;
    titleField.append(titleLabel, titleInput);
    const textField = document.createElement('div');
    textField.className = 'hull-field';
    const textLabel = document.createElement('label');
    textLabel.textContent = 'Transcrição do capítulo';
    const textArea = document.createElement('textarea');
    textArea.className = 'hull-chapter-text-input';
    textArea.rows = 8;
    textArea.placeholder = 'Inserir transcrição...';
    textArea.value = chapter.text;
    textField.append(textLabel, textArea);
    row.append(heading, titleField, textField);
    editorChapters.append(row);
  }
  function renumberChapters() {
    [...editorChapters.children].forEach((row, i) => {
      text(row.querySelector('h4'), `CAPÍTULO ${pad(i + 1)}`);
    });
  }

  function showEditor() {
    const record = data[subject];
    $('#hullEditName').value = record.name === 'Identidade não revelada' ? '' : record.name;
    $('#hullEditSubtitle').value = record.subtitle;
    $('#hullEditIntro').value = record.intro;
    editorChapters.innerHTML = '';
    record.chapters.forEach(buildEditorChapter);
    editor.hidden = false;
    setStatus('O arquivo local foi aberto para transcrição.');
    editor.scrollIntoView({ behavior: 'auto', block: 'start' });
  }

  function commitEditor(closeAfter) {
    if (editor.hidden) return;
    data[subject] = normalize({
      name: $('#hullEditName').value.trim() || 'Identidade não revelada',
      subtitle: $('#hullEditSubtitle').value.trim() || defaults[subject].subtitle,
      intro: $('#hullEditIntro').value,
      chapters: [...editorChapters.children].map((row, i) => ({
        title: row.querySelector('.hull-chapter-title-input').value.trim() || `Capítulo ${i + 1}`,
        text: row.querySelector('.hull-chapter-text-input').value
      }))
    }, subject);
    const saved = saveStorage();
    render();
    setStatus(saved ? 'Transcrição armazenada. Uma cópia pode ser extraída pelo terminal.' : 'Transcrição aplicada à sessão, mas o arquivo local não aceitou gravação. Extraia uma cópia.');
    if (closeAfter) { editor.hidden = true; $('#hullEditButton').focus(); }
  }

  function exportBackup() {
    if (!editor.hidden) commitEditor(false);
    const payload = JSON.stringify({ format:'abissal-hullbreaker-lore',version:1,records:data },null,2);
    const blob = new Blob([payload], { type:'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ABISSAL_lore_hullbreakers_backup.json';
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus('Cópia dos dois arquivos gerada.');
  }

  async function importBackup(file) {
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      if (parsed?.format !== 'abissal-hullbreaker-lore' || !Array.isArray(parsed.records) || parsed.records.length < 2) throw new Error('Formato desconhecido');
      data = [normalize(parsed.records[0],0), normalize(parsed.records[1],1)];
      saveStorage();
      editor.hidden = true;
      pageIndex = -1;
      render();
      showEditor();
      setStatus('Os dois arquivos foram restaurados.');
    } catch (_error) {
      setStatus('Falha na restauração. O arquivo selecionado não foi reconhecido pelo terminal.');
    } finally {
      $('#hullImportFile').value = '';
    }
  }

  document.querySelectorAll('[data-hull-card]').forEach(button => button.addEventListener('click', () => open(Number(button.dataset.hullCard), button)));
  $('#hullClose').addEventListener('click', close);
  $('#hullSwitchA').addEventListener('click', () => switchSubject(0));
  $('#hullSwitchB').addEventListener('click', () => switchSubject(1));
  $('#hullEditButton').addEventListener('click', () => editor.hidden ? showEditor() : (editor.hidden = true));
  $('#hullAddChapter').addEventListener('click', () => buildEditorChapter());
  $('#hullSaveEditor').addEventListener('click', () => commitEditor(true));
  $('#hullExport').addEventListener('click', exportBackup);
  $('#hullImport').addEventListener('click', () => $('#hullImportFile').click());
  $('#hullImportFile').addEventListener('change', event => importBackup(event.target.files[0]));
  PORTAL.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); close(); }
    if (event.key === 'Tab') {
      const focusable = [...PORTAL.querySelectorAll('button:not([disabled]),a[href],input:not([type="file"]),textarea')].filter(el => el.getClientRects().length);
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  updateCards();
  window.ABISSAL_HULLBREAKERS = { open: index => open(index) };
})();

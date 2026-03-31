
(() => {
  if (window.__unote_full_253_loaded) return;
  window.__unote_full_253_loaded = true;
  const IS_TOP = (window.top === window);
  const K = {
    settings:'unote.settings',
    panelVisible:'unote.panelVisible',
    pendingRange:'unote.pendingRange',
    pluginEnabled:'unote.pluginEnabled',
    scopeMode:'unote.scopeMode',
    showMarkerLabels:'unote.showMarkerLabels',
    pendingExternalId:'unote.pendingExternalId',
    lastAppliedExternalId:'unote.lastAppliedExternalId',
    lastAppliedExternalIdAt:'unote.lastAppliedExternalIdAt'
  };
  const NOTE_PREFIX='unote.note:';
  const MARKER_COLOR_PREFIX='unote.markerColors:';
  const SPEECH_HOST='ge-smweb.deltavn.vn';
  const SPEECH_PATH='/speechminer/';
  const DEFAULT_SETTINGS={ singleHotkey:{ key:'`',code:'Backquote',ctrl:false,alt:false,shift:false,meta:false,enabled:true }, rangeHotkey:{ key:'`',code:'Backquote',ctrl:true,alt:false,shift:false,meta:false,enabled:true } };
  const COLOR_ORDER=['yellow','green','red'];
  const MARKER_COLORS={ yellow:{ fill:'#f59e0b', soft:'rgba(245,158,11,.20)', text:'#78350f' }, green:{ fill:'#16a34a', soft:'rgba(22,163,74,.18)', text:'#166534' }, red:{ fill:'#dc2626', soft:'rgba(220,38,38,.18)', text:'#7f1d1d' } };
  const LABEL_BASE_TOP=-26;
  const get=(k)=>new Promise(r=>chrome.storage.local.get(k,r));
  const set=(o)=>new Promise(r=>chrome.storage.local.set(o,r));
  const runtimeSend=(message)=>new Promise((resolve)=>{ chrome.runtime.sendMessage(message,response=>{ if(chrome.runtime.lastError) return resolve({ success:false, error: chrome.runtime.lastError.message || 'Lỗi kết nối extension.' }); resolve(response || { success:false, error:'Không nhận được phản hồi.' }); }); });
  let modal=null,badgeEl=null,textEl=null,hintEl=null;
  let quickState={ payload:null, context:null, mode:'free' };
  let renderTimer=null,lastRenderSignature='';
  let syncObservers=[];
  const EXTERNAL_ID_INPUT_SELECTORS=[
    'input[name*="external" i]',
    'input[placeholder*="external" i]',
    'input[aria-label*="external" i]',
    'input[name*="interaction" i]',
    'input[placeholder*="interaction" i]',
    'input[aria-label*="interaction" i]',
    '#externalId',
    '#interactionId',
    '.search-input input[type="text"]',
    '.ant-input-affix-wrapper input',
    '.ant-input-search input',
    '.toolbar input[type="search"]',
    '.toolbar input[type="text"]'
  ];

  function isSpeechMinerPage(){ try{return location.hostname===SPEECH_HOST&&location.pathname.includes(SPEECH_PATH)}catch{return false} }
  function normalizeTime(text){ if(!text) return null; const v=String(text).replace(/\u00A0/g,' ').trim(); return /^\d{1,2}:\d{2}(:\d{2})?$/.test(v)?v:null; }
  function validExternalId(text){
    const t=(text||'').trim();
    return /_\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}$/.test(t) ||
      /^[A-Z0-9]{25,}$/.test(t) ||
      /^I-\d{6,}$/.test(t);
  }
  function normalizeExternalIdValue(raw){ return String(raw||'').trim(); }
  function getExternalId(){ if(!isSpeechMinerPage()) return ''; const candidates=document.querySelectorAll('.player-label.wrap-overflow, .player-label, [tooltip]'); for(const el of candidates){ const txt=(el.textContent||'').trim(); const tip=(el.getAttribute&&el.getAttribute('tooltip'))||''; if(validExternalId(txt)) return txt; if(validExternalId(tip)) return tip.trim(); } return ''; }
  function findExternalIdInput(){ for(const sel of EXTERNAL_ID_INPUT_SELECTORS){ const el=document.querySelector(sel); if(el) return el; } return null; }
  function showExternalToast(externalId, autoFilled, source){
    if(!IS_TOP) return;
    let toast=document.getElementById('unote-external-toast');
    if(!toast){
      const style=document.createElement('style'); style.id='unote-external-toast-style';
      style.textContent=`#unote-external-toast{position:fixed;right:16px;bottom:16px;z-index:2147483647;background:#0f172a;color:#e2e8f0;padding:12px 14px;border-radius:12px;box-shadow:0 14px 40px rgba(15,23,42,.35);display:flex;gap:10px;align-items:center;max-width:420px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.5;}#unote-external-toast .id{font-weight:700;color:#a5f3fc;word-break:break-all;}#unote-external-toast button{border:none;background:#22c55e;color:#0b1220;font-weight:700;padding:6px 10px;border-radius:8px;cursor:pointer;}#unote-external-toast .secondary{background:#e2e8f0;color:#0f172a;}@media(max-width:560px){#unote-external-toast{left:12px;right:12px;flex-direction:column;align-items:flex-start;}}`;
      document.documentElement.appendChild(style);
      toast=document.createElement('div'); toast.id='unote-external-toast';
      toast.innerHTML=`<div class="msg"></div><div class="actions"><button type="button" class="copy-btn">Copy</button><button type="button" class="close-btn secondary">Đóng</button></div>`;
      document.documentElement.appendChild(toast);
      toast.querySelector('.close-btn').addEventListener('click',()=>toast.remove());
      toast.querySelector('.copy-btn').addEventListener('click',async()=>{ try{ await navigator.clipboard.writeText(toast.dataset.value||''); toast.querySelector('.msg').innerHTML='<b>Đã copy externalId</b>'; }catch(e){ toast.querySelector('.msg').textContent='Không copy được, hãy chọn thủ công.'; } });
    }
    toast.dataset.value=externalId;
    const fromLabel=source ? `(${source})` : '';
    toast.querySelector('.msg').innerHTML = `${autoFilled?'✅ Đã tự điền':'⚠️ Không tìm thấy ô nhập'} ${fromLabel}<br><span class="id">${externalId}</span>`;
    toast.style.display='flex';
    setTimeout(()=>{ if(document.getElementById('unote-external-toast')) document.getElementById('unote-external-toast').style.display='flex'; },10);
    setTimeout(()=>{ try{toast.remove();}catch{} },8000);
  }
  async function applyExternalIdOnSpeechMiner(payload){
    if(!isSpeechMinerPage()) return { success:false, error:'Không phải trang SpeechMiner.' };
    const externalId=normalizeExternalIdValue(payload?.externalId||payload?.interactionId||payload);
    if(!externalId) return { success:false, error:'Thiếu externalId để áp dụng.' };
    const input=findExternalIdInput();
    let filled=false;
    if(input){
      input.focus();
      input.value=externalId;
      input.dispatchEvent(new Event('input',{bubbles:true}));
      input.dispatchEvent(new Event('change',{bubbles:true}));
      filled=true;
    }
    const searchBtn=document.querySelector('button[type="submit"].search-button, button[aria-label*="search" i], .search-button button[type="button"], .ant-input-search-button, .ant-btn-primary[type="button"]');
    if(searchBtn && filled) searchBtn.click();
    showExternalToast(externalId, filled, payload?.from||'page');
    await set({ [K.lastAppliedExternalId]: externalId, [K.lastAppliedExternalIdAt]: Date.now() });
    return { success:true, applied:filled };
  }
  async function maybeApplyPendingExternalId(force=false){
    if(!isSpeechMinerPage()) return;
    const d=await get([K.pendingExternalId,K.lastAppliedExternalId,K.lastAppliedExternalIdAt]);
    const pending=d[K.pendingExternalId];
    if(!pending||!pending.externalId) return;
    const lastId=d[K.lastAppliedExternalId]||'';
    const lastAt=d[K.lastAppliedExternalIdAt]||0;
    if(!force && pending.externalId===lastId && pending.at && pending.at<=lastAt+500) return;
    await applyExternalIdOnSpeechMiner(pending);
  }
  function forwardExternalIdToBackground(data){
    const payload={
      externalId: normalizeExternalIdValue(data.externalId||data.interactionId||''),
      interactionId: normalizeExternalIdValue(data.interactionId||''),
      from: data.from||'page',
      rowPreview: data.rowPreview||null,
      at: Date.now()
    };
    if(!payload.externalId && !payload.interactionId) return;
    runtimeSend({ type:'UNOTE_PUSH_EXTERNAL_ID', ...payload }).catch(console.error);
  }
  async function getScopeMode(){ const d=await get([K.scopeMode]); return d[K.scopeMode]||'global'; }
  function buildContext(scopeMode){ const speechMiner=isSpeechMinerPage(); const externalId=getExternalId(); const pageKey=`${location.origin}${location.pathname}`; if(scopeMode==='global') return { key:`${NOTE_PREFIX}global`, sourceType:'global', scopeMode, speechMiner, externalId:'' }; if(scopeMode==='externalId'){ if(speechMiner&&externalId) return { key:`${NOTE_PREFIX}externalId:${externalId}`, sourceType:'externalId', scopeMode, speechMiner, externalId }; return { key:`${NOTE_PREFIX}page:${pageKey}`, sourceType:'page-fallback', scopeMode, speechMiner, externalId:'' }; } return { key:`${NOTE_PREFIX}page:${pageKey}`, sourceType:'page', scopeMode:'page', speechMiner, externalId }; }
  async function getContextInfo(){ return buildContext(await getScopeMode()); }
  async function getSettings(){ const d=await get([K.settings]); const s=d[K.settings]||{}; return { singleHotkey:{...DEFAULT_SETTINGS.singleHotkey,...(s.singleHotkey||{})}, rangeHotkey:{...DEFAULT_SETTINGS.rangeHotkey,...(s.rangeHotkey||{})} }; }
  async function getShowLabels(){ const d=await get([K.showMarkerLabels]); return d[K.showMarkerLabels] !== false; }
  function matchHotkey(e,hk){ if(!hk||hk.enabled===false) return false; const codeMatch=hk.code?e.code===hk.code:true; const keyMatch=hk.key?String(e.key).toLowerCase()===String(hk.key).toLowerCase():true; return codeMatch&&keyMatch&&!!e.ctrlKey===!!hk.ctrl&&!!e.altKey===!!hk.alt&&!!e.shiftKey===!!hk.shift&&!!e.metaKey===!!hk.meta; }
  function isEditable(el){ return !!(el && (el.tagName==='INPUT'||el.tagName==='TEXTAREA'||el.isContentEditable)); }
  function prefixOf(payload){ if(!payload) return 'FREE'; if(payload.mode==='single'&&payload.time) return `(${payload.time})`; if(payload.mode==='rangePending'&&payload.start) return `(${payload.start} - ...)`; if(payload.mode==='rangeReady'&&payload.start&&payload.end) return `(${payload.start} - ${payload.end})`; return 'FREE'; }
  function markerKey(item){ return item.type==='point' ? `point|${item.time}|${item.text}` : `range|${item.start}|${item.end}|${item.text}`; }
  function timeToSeconds(str){ if(!str) return 0; const parts=String(str).trim().split(':').map(Number); if(parts.some(n=>Number.isNaN(n))) return 0; if(parts.length===2){ const [m,s]=parts; return m*60+s; } if(parts.length===3){ const [h,m,s]=parts; return h*3600+m*60+s; } return 0; }
  function parseNotes(text){ const lines=String(text||'').split(/\r?\n/).map(v=>v.trim()).filter(Boolean); const items=[]; for(const line of lines){ let m=line.match(/^\((\d{1,2}:\d{2}(?::\d{2})?)\)\s*(.*)$/); if(m){ items.push({ type:'point', time:m[1], text:m[2]||'' }); continue; } m=line.match(/^\((\d{1,2}:\d{2}(?::\d{2})?)\s*-\s*(\d{1,2}:\d{2}(?::\d{2})?)\)\s*(.*)$/); if(m){ items.push({ type:'range', start:m[1], end:m[2], text:m[3]||'' }); } } return items; }
  function labelText(item){ return item.type==='point' ? ((item.text||'').trim() ? `(${item.time}) ${item.text}` : `(${item.time})`) : ((item.text||'').trim() ? `(${item.start} - ${item.end}) ${item.text}` : `(${item.start} - ${item.end})`); }

  function ensureQuickNoteModal(){
    if (!IS_TOP) return;
    if (modal && document.contains(modal.box) && document.contains(modal.backdrop)) return;
    document.getElementById('unote-inline-quicknote')?.remove(); document.getElementById('unote-inline-quicknote-backdrop')?.remove();
    if(!document.getElementById('unote-inline-quicknote-style')){
      const style=document.createElement('style'); style.id='unote-inline-quicknote-style';
      style.textContent=`#unote-inline-quicknote-backdrop{position:fixed;inset:0;background:rgba(15,23,42,.28);z-index:2147483646;display:none;}#unote-inline-quicknote{position:fixed;top:18px;right:18px;z-index:2147483647;width:min(460px,calc(100vw - 36px));background:#fff;border:1px solid #cbd5e1;border-radius:14px;box-shadow:0 24px 60px rgba(15,23,42,.28);display:none;color:#111827;}#unote-inline-quicknote *{box-sizing:border-box;font-family:Arial,Helvetica,sans-serif;}#unote-inline-quicknote .head{display:flex;justify-content:space-between;align-items:flex-start;gap:10px;padding:14px 14px 0 14px;}#unote-inline-quicknote .title{font-size:18px;font-weight:700;}#unote-inline-quicknote .subtitle{font-size:12px;color:#6b7280;margin-top:3px;}#unote-inline-quicknote .badge{padding:6px 10px;border-radius:999px;background:#111827;color:#fff;font-weight:700;font-size:12px;}#unote-inline-quicknote textarea{width:calc(100% - 28px);margin:12px 14px 0 14px;min-height:170px;resize:vertical;border:1px solid #cbd5e1;border-radius:10px;padding:12px;font-size:14px;line-height:1.6;outline:none;background:#fff;}#unote-inline-quicknote .actions{display:flex;gap:8px;padding:12px 14px 0 14px;}#unote-inline-quicknote button{border:none;border-radius:10px;padding:10px 14px;cursor:pointer;font-weight:700;}#unote-inline-quicknote .primary{background:#2563eb;color:#fff;}#unote-inline-quicknote .secondary{background:#e5e7eb;color:#111827;}#unote-inline-quicknote .hint{padding:10px 14px 14px 14px;font-size:12px;color:#6b7280;line-height:1.5;}@media (max-width:560px){#unote-inline-quicknote{left:12px;right:12px;top:12px;width:auto;}}`;
      document.documentElement.appendChild(style);
    }
    const backdrop=document.createElement('div'); backdrop.id='unote-inline-quicknote-backdrop';
    const box=document.createElement('div'); box.id='unote-inline-quicknote';
    box.innerHTML=`<div class="head"><div><div class="title">Quick Note</div><div class="subtitle">Popup trực tiếp trên trang hiện tại</div></div><div class="badge">FREE</div></div><textarea placeholder="Nhập note nhanh ở đây..."></textarea><div class="actions"><button class="primary" type="button">Lưu vào note</button><button class="secondary" type="button">Đóng</button></div><div class="hint"></div>`;
    document.documentElement.appendChild(backdrop); document.documentElement.appendChild(box);
    modal={ backdrop, box }; badgeEl=box.querySelector('.badge'); textEl=box.querySelector('textarea'); hintEl=box.querySelector('.hint');
    box.querySelector('.primary').addEventListener('click',()=>commitQuickNote().catch(console.error));
    box.querySelector('.secondary').addEventListener('click',hideQuickNote);
    backdrop.addEventListener('click',hideQuickNote);
  }
  function showQuickNote(payload, context){ if(!IS_TOP) return; ensureQuickNoteModal(); quickState={ payload: payload||{mode:'free'}, context: context||null, mode: payload?.mode||'free' }; badgeEl.textContent=prefixOf(quickState.payload); hintEl.textContent = quickState.payload?.mode==='rangePending' ? 'Range đang ở mốc đầu. Bấm lại hotkey range để lấy mốc cuối, rồi Enter / Ctrl+Enter / hotkey range lần nữa để lưu.' : 'Nhấn lại đúng hotkey hoặc Enter / Ctrl+Enter để lưu nhanh vào note chính.'; modal.backdrop.style.display='block'; modal.box.style.display='block'; setTimeout(()=>textEl.focus(), 10); }
  function hideQuickNote(){ if(!modal) return; modal.backdrop.style.display='none'; modal.box.style.display='none'; textEl.value=''; quickState={ payload:null, context:null, mode:'free' }; }
  function quickNoteOpen(){ return IS_TOP && !!modal && modal.box.style.display==='block'; }
  async function commitQuickNote(){ if(!IS_TOP || !quickState.payload) return; if(quickState.payload.mode==='rangePending'){ hintEl.textContent='Bạn cần bấm lại hotkey range để lấy mốc cuối.'; return; } const ctx=quickState.context||await getContextInfo(); const r=await runtimeSend({ type:'UNOTE_APPEND_NOTE', context: ctx, payload: quickState.payload, text: textEl.value||'' }); if(!r?.success){ hintEl.textContent=r?.error||'Không lưu được note.'; return; } hideQuickNote(); }
  async function handleModalHotkeys(e){ if(!quickNoteOpen()) return false; const settings=await getSettings(); if(matchHotkey(e,settings.singleHotkey) && quickState.payload?.mode==='single'){ e.preventDefault(); e.stopPropagation(); await commitQuickNote(); return true; } if(matchHotkey(e,settings.rangeHotkey) && (quickState.payload?.mode==='rangePending' || quickState.payload?.mode==='rangeReady')){ e.preventDefault(); e.stopPropagation(); if(quickState.payload.mode==='rangePending'){ const r=await runtimeSend({ type:'UNOTE_INLINE_QUICKNOTE_NEXT_RANGE' }); if(!r?.success){ hintEl.textContent=r?.error||'Không lấy được mốc cuối.'; return true; } quickState.payload=r.payload; badgeEl.textContent=prefixOf(quickState.payload); hintEl.textContent='Đã có đủ đầu-cuối. Bấm lại hotkey range hoặc Enter để lưu.'; return true; } if(quickState.payload.mode==='rangeReady'){ await commitQuickNote(); return true; } } if((e.key==='Enter' && !e.shiftKey) || (e.key==='Enter' && (e.ctrlKey||e.metaKey))){ e.preventDefault(); await commitQuickNote(); return true; } if(e.key==='Escape'){ e.preventDefault(); hideQuickNote(); return true; } return false; }
  window.addEventListener('message',event=>{ if(event.source!==window) return; const data=event.data||{}; if(data.type==='UNOTE_PUSH_EXTERNAL_ID') forwardExternalIdToBackground(data); },false);
  window.addEventListener('message',event=>{ if(event.source!==window) return; const data=event.data||{}; if(data.type==='UNOTE_FETCH_NOTE_FOR_EXTERNAL_ID'){ const externalId=normalizeExternalIdValue(data.externalId||''); if(!externalId) return; runtimeSend({ type:'UNOTE_GET_NOTE_BY_EXTERNAL_ID', externalId }).then(resp=>{ window.postMessage({ type:'UNOTE_NOTE_FOR_EXTERNAL_ID', externalId, note: resp?.note||'' }, '*'); }).catch(console.error); }},false);

  function ensureWaveStyle(){
    if(document.getElementById('unote-wave-style')) return;
    const s=document.createElement('style'); s.id='unote-wave-style';
    s.textContent=`.unote-wave-overlay{position:absolute;top:0;left:0;background:transparent!important;pointer-events:none;z-index:9990;overflow:visible;}.unote-marker{position:absolute;pointer-events:auto;z-index:9991;cursor:pointer;}.unote-marker:hover,.unote-marker.active{z-index:9999!important;}.unote-marker .marker-label{position:absolute;left:50%;transform:translateX(-50%);font-size:11px;line-height:1;padding:4px 7px;border-radius:999px;background:#fff;border:1px solid rgba(15,23,42,.18);box-shadow:0 4px 12px rgba(15,23,42,.14);white-space:nowrap;max-width:320px;overflow:hidden;text-overflow:ellipsis;pointer-events:none;}.unote-point-dot{position:absolute;left:50%;top:24px;width:12px;height:12px;border-radius:50%;transform:translate(-50%,-50%);border:2px solid #fff;box-shadow:0 1px 6px rgba(0,0,0,.25);}.unote-range-bar{position:absolute;top:16px;height:16px;border-left:2px solid transparent;border-right:2px solid transparent;border-radius:4px;}`;
    document.documentElement.appendChild(s);
  }
  async function getMarkerColorMap(contextKey){ const k=`${MARKER_COLOR_PREFIX}${contextKey}`; const d=await get([k]); return d[k]||{}; }
  async function saveMarkerColor(contextKey,key,color){ const k=`${MARKER_COLOR_PREFIX}${contextKey}`; const d=await get([k]); const map=d[k]||{}; map[key]=color; await set({ [k]: map }); }
  function getNextColor(current){ const idx=Math.max(0, COLOR_ORDER.indexOf(current||'yellow')); return COLOR_ORDER[(idx+1)%COLOR_ORDER.length]; }
  function findStableWaveRoot(){ if(!IS_TOP) return null; return document.querySelector('#waveSurfer-waveform') || null; }
  function findProgressContainer(){ return document.querySelector('#waveSurfer-waveform > .progress-container') || document.querySelector('#waveSurfer-waveform .progress-container') || null; }
  function findWaveCanvasHost(){ if(!IS_TOP) return null; return document.querySelector('#waveSurfer-waveform > .progress-container wave') || document.querySelector('#waveSurfer-waveform .progress-container wave') || null; }
  function findScrollHandle(){ const root=findStableWaveRoot(); if(!root) return null; return root.querySelector('.scrollbar-handle-top') || root.querySelector('.scrollbar-handle-bottom') || null; }
  function getViewportInfo(){
    const handle=findScrollHandle();
    const track=handle?.parentElement;
    if(!handle || !track){ return { start:0, span:1, handleLeft:0, handleWidth:0, trackWidth:0 }; }
    const tr=track.getBoundingClientRect();
    const hr=handle.getBoundingClientRect();
    const trackWidth=Math.max(tr.width,1);
    const handleWidth=Math.min(Math.max(hr.width,1), trackWidth);
    const span=Math.max(Math.min(handleWidth/trackWidth,1),0.0001);
    const maxTravel=Math.max(trackWidth-handleWidth,1);
    const rawStart=(hr.left-tr.left)/maxTravel;
    const start=Math.max(0, Math.min(rawStart, 1-span));
    return { start, span, handleLeft: hr.left-tr.left, handleWidth, trackWidth };
  }
  function ensureOverlay(container){ let overlay=container.querySelector(':scope > .unote-wave-overlay'); if(!overlay){ overlay=document.createElement('div'); overlay.className='unote-wave-overlay'; container.appendChild(overlay); } return overlay; }
  function clearOverlay(overlay){ overlay.innerHTML=''; }
  function setActive(wrapper, active){ document.querySelectorAll('.unote-marker.active').forEach(el=>{ if(el!==wrapper) el.classList.remove('active'); }); if(active) wrapper.classList.add('active'); else wrapper.classList.remove('active'); }
  function applyStacking(items){ const threshold=120; items.sort((a,b)=>a.centerPx-b.centerPx); let prev=-9999, tier=0; for(const it of items){ const near=Math.abs(it.centerPx-prev)<threshold; it.tier=near ? (tier+1)%3 : 0; prev=it.centerPx; tier=it.tier; } }
  function cleanupSyncObservers(){ syncObservers.forEach(entry=>{ try{ entry.target.removeEventListener(entry.event, entry.handler, entry.options); }catch{} try{ entry.observer?.disconnect(); }catch{} }); syncObservers=[]; }
  function addEventObserver(target,event,handler,options){ if(!target) return; target.addEventListener(event,handler,options); syncObservers.push({target,event,handler,options}); }
  function addMutationObserver(target,options,handler){ if(!target) return; const mo=new MutationObserver(handler); mo.observe(target,options); syncObservers.push({observer:mo,target}); }
  function bindScrollSync(){
    cleanupSyncObservers();
    const root=findStableWaveRoot();
    const container=findProgressContainer();
    const wave=findWaveCanvasHost();
    const handle=findScrollHandle();
    const track=handle?.parentElement;
    if(!root || !container) return;
    const sync=()=>queueRender(true);
    addEventObserver(window,'resize',sync,{passive:true});
    addEventObserver(container,'scroll',sync,{passive:true});
    addMutationObserver(root,{childList:true,subtree:false},sync);
    if(track) addMutationObserver(track,{attributes:true,attributeFilter:['style','class']},sync);
    if(handle){
      addMutationObserver(handle,{attributes:true,attributeFilter:['style','class']},sync);
    }
    if(handle){
      const startDrag=()=>{ if(document.__unoteDragRAF) return; document.__unoteDragRAF=true; const loop=()=>{ sync(); if(document.__unoteDragRAF) requestAnimationFrame(loop); }; loop(); };
      addEventObserver(handle,'mousedown',startDrag,{passive:true});
    }
    addEventObserver(document,'mousemove',()=>{ if(document.__unoteDragRAF) sync(); },{passive:true});
    addEventObserver(document,'mouseup',()=>{ document.__unoteDragRAF=false; sync(); },{passive:true});
    if(wave) addMutationObserver(wave,{attributes:true,attributeFilter:['style','class']},sync);
    if(container) addMutationObserver(container,{attributes:true,attributeFilter:['style','class']},sync);
    if('ResizeObserver' in window){ const ro=new ResizeObserver(sync); ro.observe(container); if(wave && wave!==container) ro.observe(wave); if(handle) ro.observe(handle); syncObservers.push({observer:ro,target:container}); }
  }
  async function renderWaveMarkers(force=false){
    if(!IS_TOP || !isSpeechMinerPage()) return;
    const ctx=await getContextInfo();
    const noteData=await get([ctx.key]);
    const noteText=noteData[ctx.key]||'';
    const items=parseNotes(noteText);
    const container=findProgressContainer();
    const wave=findWaveCanvasHost() || container;
    const totalEl=document.querySelector('.track-time-label.right-label[tooltip="Total Time"]') || document.querySelector('.track-time-label.right-label');
    const total=timeToSeconds(totalEl?.textContent||'');
    const showLabels=await getShowLabels();
    const colorMap=await getMarkerColorMap(ctx.key);
    const containerRect=container?.getBoundingClientRect();
    const waveRect=wave?.getBoundingClientRect();
    const width=Math.round(waveRect?.width||0);
    const offsetLeft=Math.round((waveRect?.left||0) - (containerRect?.left||0));
    const viewport=getViewportInfo();
    const signature=JSON.stringify({ key:ctx.key, noteText, total, width, offsetLeft, showLabels, colors:colorMap, viewport });
    if(!force && signature===lastRenderSignature && container===document.__unoteWaveContainer && wave===document.__unoteWaveHost) return;
    lastRenderSignature=signature; document.__unoteWaveContainer=container; document.__unoteWaveHost=wave;
    const oldOverlay=document.querySelector('#waveSurfer-waveform .progress-container > .unote-wave-overlay') || document.querySelector('#waveSurfer-waveform .unote-wave-overlay');
    if((!container || !total || !items.length) && oldOverlay){ oldOverlay.innerHTML=''; return; }
    if(!container || !total || !items.length || !width) return;
    ensureWaveStyle(); if(getComputedStyle(container).position==='static') container.style.position='relative';
    const overlay=ensureOverlay(container);
    overlay.style.left=`${offsetLeft}px`;
    overlay.style.width=`${width}px`;
    overlay.style.height=`${Math.max(containerRect?.height||0, waveRect?.height||0, 48)}px`;
    clearOverlay(overlay);

    const metas=[];
    const viewportStart = viewport.start;
    const viewportSpan = viewport.span;
    for(const item of items){
      let centerPercent=0;
      if(item.type==='point') centerPercent = timeToSeconds(item.time)/total;
      else { const s=timeToSeconds(item.start)/total, e=timeToSeconds(item.end)/total; centerPercent = s + Math.max(0,e-s)/2; }
      const visibleCenter = ((centerPercent - viewportStart) / viewportSpan) * width;
      metas.push({ item, centerPx: visibleCenter });
    }
    applyStacking(metas);
    metas.forEach(meta=>{
      const item=meta.item, key=markerKey(item), colorName=colorMap[key]||'yellow', color=MARKER_COLORS[colorName]||MARKER_COLORS.yellow;
      const wrapper=document.createElement('div'); wrapper.className='unote-marker'; wrapper.dataset.key=key;
      wrapper.addEventListener('mouseenter',()=>setActive(wrapper,true)); wrapper.addEventListener('mouseleave',()=>setActive(wrapper,false));
      wrapper.addEventListener('click',async e=>{ e.preventDefault(); e.stopPropagation(); const nextColor=getNextColor(colorName); await saveMarkerColor(ctx.key,key,nextColor); queueRender(true); });
      const label=document.createElement('div'); label.className='marker-label'; label.textContent=labelText(item); label.style.top=`${LABEL_BASE_TOP - meta.tier*22}px`; label.style.display=showLabels?'block':'none'; label.style.color=color.text; label.style.borderColor=color.soft.replace('0.20','0.35').replace('0.18','0.35'); wrapper.appendChild(label);
      if(item.type==='point'){
        const p=timeToSeconds(item.time)/total;
        const x=((p - viewportStart) / viewportSpan) * width;
        wrapper.style.left=`${x}px`;
        if(x < -24 || x > width + 24){ wrapper.style.display='none'; }
        const dot=document.createElement('div'); dot.className='unote-point-dot'; dot.style.background=color.fill; dot.title=`Click đổi màu • ${labelText(item)}`; wrapper.appendChild(dot);
      } else {
        const s=timeToSeconds(item.start)/total, e=timeToSeconds(item.end)/total;
        const x1=((s - viewportStart) / viewportSpan) * width;
        const x2=((e - viewportStart) / viewportSpan) * width;
        const left=Math.max(0, Math.min(width, x1));
        const right=Math.max(0, Math.min(width, x2));
        if(right <= 0 || left >= width || right-left <= 1){ wrapper.style.display='none'; }
        wrapper.style.left=`${left}px`;
        wrapper.style.width=`${Math.max(0, right-left)}px`;
        const bar=document.createElement('div'); bar.className='unote-range-bar'; bar.style.left='0'; bar.style.width='100%'; bar.style.background=color.soft; bar.style.borderLeftColor=color.fill; bar.style.borderRightColor=color.fill; bar.title=`Click đổi màu • ${labelText(item)}`; wrapper.appendChild(bar);
      }
      overlay.appendChild(wrapper);
    });
  }
  function queueRender(force=false){ if(!IS_TOP) return; clearTimeout(renderTimer); renderTimer=setTimeout(()=>renderWaveMarkers(force).catch(console.error), force?30:120); }
  function initWaveWatchers(){ if(!IS_TOP) return; const root=findStableWaveRoot(); if(!root) return; bindScrollSync(); queueRender(true); }
  async function registerSourceIfNeeded(){ if(!isSpeechMinerPage()) return; await runtimeSend({ type:'UNOTE_REGISTER_SOURCE_TAB' }); }
  chrome.runtime.onMessage.addListener((message,_sender,sendResponse)=>{ if(message?.type==='UNOTE_SHOW_INLINE_QUICKNOTE'){ if(IS_TOP) showQuickNote(message.payload||{mode:'free'}, message.context||null); sendResponse({ success:true }); return; } (async()=>{ switch(message?.type){ case 'UNOTE_GET_CONTEXT': sendResponse({ success:true, context: await getContextInfo() }); break; case 'UNOTE_GET_TIME_ONLY': { if(!isSpeechMinerPage()) { sendResponse({ success:false, error:'Không phải trang SpeechMiner.' }); break; } const selectors=['.track-time-label.left-label[tooltip="Current Time"]','.time-container .left-label[tooltip="Current Time"]','.track-time-label.left-label','.time-container .left-label']; let time=null; for(const s of selectors){ time=normalizeTime(document.querySelector(s)?.textContent); if(time) break; } if(!time) sendResponse({ success:false, error:'Không tìm thấy Current Time trên trang SpeechMiner.' }); else sendResponse({ success:true, time }); break; } case 'UNOTE_RANGE_ONLY': { if(!isSpeechMinerPage()) { sendResponse({ success:false, error:'Không phải trang SpeechMiner.' }); break; } const selectors=['.track-time-label.left-label[tooltip="Current Time"]','.time-container .left-label[tooltip="Current Time"]','.track-time-label.left-label','.time-container .left-label']; let time=null; for(const s of selectors){ time=normalizeTime(document.querySelector(s)?.textContent); if(time) break; } if(!time){ sendResponse({ success:false, error:'Không tìm thấy Current Time trên trang SpeechMiner.' }); break; } const d=await get([K.pendingRange]); const pending=d[K.pendingRange]||null; if(!pending){ await set({ [K.pendingRange]: { start: time } }); sendResponse({ success:true, mode:'start', time }); } else { await set({ [K.pendingRange]: null }); sendResponse({ success:true, mode:'end', start: pending.start, end: time }); } break; } case 'UNOTE_APPLY_EXTERNAL_ID': { if(!isSpeechMinerPage()) { sendResponse({ success:false, error:'Không phải trang SpeechMiner.' }); break; } const resp=await applyExternalIdOnSpeechMiner(message.payload||message); sendResponse(resp); break; } default: sendResponse({ success:false, error:'Unknown message type.' }); } })().catch(err=>{ console.error(err); sendResponse({ success:false, error: err?.message||'Unexpected error.' }); }); return true; });
  async function handlePageHotkey(event){ if(IS_TOP && await handleModalHotkeys(event)) return; const d=await get([K.panelVisible,K.pluginEnabled]); if(!d[K.panelVisible]||d[K.pluginEnabled]===false) return; if(isEditable(document.activeElement)) return; const settings=await getSettings(); if(matchHotkey(event,settings.singleHotkey)){ event.preventDefault(); event.stopImmediatePropagation?.(); event.stopPropagation(); await runtimeSend({ type:'UNOTE_OPEN_INLINE_QUICKNOTE', mode:'single' }); return; } if(matchHotkey(event,settings.rangeHotkey)){ event.preventDefault(); event.stopImmediatePropagation?.(); event.stopPropagation(); await runtimeSend({ type:'UNOTE_OPEN_INLINE_QUICKNOTE', mode:'range' }); } }
  document.addEventListener('keydown',e=>{ handlePageHotkey(e).catch(console.error); },true); window.addEventListener('keydown',e=>{ handlePageHotkey(e).catch(console.error); },true);
  chrome.storage.onChanged.addListener((changes,area)=>{ if(area!=='local'||!IS_TOP||!isSpeechMinerPage()) return; const keys=Object.keys(changes); if(keys.some(k=>k.startsWith(NOTE_PREFIX)||k.startsWith(MARKER_COLOR_PREFIX)||k===K.showMarkerLabels||k===K.scopeMode)) queueRender(false); if(changes[K.pendingExternalId]) maybeApplyPendingExternalId(true).catch(console.error); });
  registerSourceIfNeeded(); if(IS_TOP){ const boot=()=>{ initWaveWatchers(); maybeApplyPendingExternalId(false).catch(console.error); }; if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', boot, { once:true }); else boot(); } window.addEventListener('focus',()=>{ registerSourceIfNeeded(); if(IS_TOP){ bindScrollSync(); queueRender(true); maybeApplyPendingExternalId(false).catch(console.error); } }); document.addEventListener('visibilitychange',()=>{ if(!document.hidden){ registerSourceIfNeeded(); if(IS_TOP){ bindScrollSync(); queueRender(true); maybeApplyPendingExternalId(false).catch(console.error); } } });
})();

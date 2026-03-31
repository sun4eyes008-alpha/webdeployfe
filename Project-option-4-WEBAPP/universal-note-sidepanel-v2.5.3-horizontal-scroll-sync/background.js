
const K = {
  sourceTab: 'unote.sourceSpeechMinerTabId',
  sourceLocked: 'unote.sourceSpeechMinerLocked',
  pluginEnabled: 'unote.pluginEnabled',
  pendingExternalId: 'unote.pendingExternalId'
};
const SPEECH_HOST = 'ge-smweb.deltavn.vn';
const SPEECH_PATH = '/speechminer/';
const getStore = (keys) => new Promise(r => chrome.storage.local.get(keys, r));
const setStore = (obj) => new Promise(r => chrome.storage.local.set(obj, r));
const sendToTab = (tabId, message, options={}) => new Promise((resolve) => {
  chrome.tabs.sendMessage(tabId, message, options, response => {
    if (chrome.runtime.lastError) return resolve({ success:false, error: chrome.runtime.lastError.message || 'Tab không phản hồi.' });
    resolve(response || { success:false, error:'Tab không phản hồi.' });
  });
});
function isSpeechMinerUrl(url) {
  try { const u = new URL(url || ''); return u.hostname === SPEECH_HOST && u.pathname.includes(SPEECH_PATH); }
  catch { return false; }
}
async function initPanelBehavior(){ try{ await chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick:true }); }catch(e){ console.error(e); } }
chrome.runtime.onInstalled.addListener(async()=>{
  await initPanelBehavior();
  const d=await getStore([K.pluginEnabled,K.sourceLocked]);
  const defaults={};
  if(typeof d[K.pluginEnabled] !== 'boolean') defaults[K.pluginEnabled]=true;
  if(typeof d[K.sourceLocked] !== 'boolean') defaults[K.sourceLocked]=false;
  if(Object.keys(defaults).length) await setStore(defaults);
});
chrome.runtime.onStartup.addListener(initPanelBehavior);
async function getSourceState(){ const d=await getStore([K.sourceTab,K.sourceLocked,K.pluginEnabled]); return { tabId:d[K.sourceTab]||null, locked:!!d[K.sourceLocked], pluginEnabled:d[K.pluginEnabled]!==false }; }
async function setSourceTabId(tabId){ await setStore({ [K.sourceTab]: tabId || null }); }
async function listSpeechMinerTabs(){ const tabs=await chrome.tabs.query({}); return tabs.filter(t=>isSpeechMinerUrl(t.url)).map(t=>({ id:t.id, title:t.title||'(không tên)', url:t.url||'', active:!!t.active })); }
async function getSourceDetails(){ const st=await getSourceState(); let source=null; if(st.tabId){ try{ const tab=await chrome.tabs.get(st.tabId); if(isSpeechMinerUrl(tab.url)) source={ id:tab.id, title:tab.title||'(không tên)', url:tab.url||'', active:!!tab.active }; else await setSourceTabId(null); }catch{ await setSourceTabId(null); } } return { ...st, source, tabs: await listSpeechMinerTabs() }; }
async function registerSourceFromSender(sender){ const st=await getSourceState(); const tabId=sender.tab?.id; const url=sender.tab?.url||''; if(!tabId||!isSpeechMinerUrl(url)) return { success:false, error:'Sender không phải tab SpeechMiner.' }; if(st.locked && st.tabId && st.tabId!==tabId) return { success:true, ignored:true, tabId:st.tabId }; await setSourceTabId(tabId); return { success:true, tabId }; }
async function setSourceManual(tabId){ try{ const tab=await chrome.tabs.get(tabId); if(!isSpeechMinerUrl(tab.url)) return { success:false, error:'Tab được chọn không phải SpeechMiner.' }; await setSourceTabId(tabId); return { success:true, tabId }; }catch{ return { success:false, error:'Không tìm thấy tab nguồn.' }; } }
async function pushExternalId(payload){
  const externalId=String(payload?.externalId||payload?.interactionId||'').trim();
  const interactionId=String(payload?.interactionId||'').trim();
  if(!externalId && !interactionId) return { success:false, error:'Thiếu externalId/interactionId.' };
  const entry={ externalId: externalId||interactionId, interactionId, from: payload?.from||'page', rowPreview: payload?.rowPreview||null, at: Date.now() };
  await setStore({ [K.pendingExternalId]: entry });
  const st=await getSourceState();
  if(st.tabId){
    const resp=await sendToTab(st.tabId, { type:'UNOTE_APPLY_EXTERNAL_ID', payload: entry }, { frameId:0 });
    return { success:true, forwarded:true, response:resp||null };
  }
  return { success:true, forwarded:false };
}
async function getNoteByExternalId(externalId){
  const key=`unote.note:externalId:${externalId}`;
  const data=await getStore([key]);
  return { success:true, contextKey:key, note:data[key]||'' };
}
async function captureFromSource(mode){
  const st=await getSourceState();
  if(!st.pluginEnabled) return { success:false, error:'Plugin đang tắt.' };
  if(mode==='free') return { success:true, payload:{ mode:'free' } };
  if(!st.tabId) return { success:false, error:'Chưa có tab SpeechMiner nguồn để lấy time.' };
  try{ const tab=await chrome.tabs.get(st.tabId); if(!isSpeechMinerUrl(tab.url)){ await setSourceTabId(null); return { success:false, error:'Tab SpeechMiner nguồn không hợp lệ.' }; } }
  catch{ await setSourceTabId(null); return { success:false, error:'Tab SpeechMiner nguồn không còn tồn tại.' }; }
  const r=await sendToTab(st.tabId, { type: mode==='range' ? 'UNOTE_RANGE_ONLY' : 'UNOTE_GET_TIME_ONLY' }, { frameId: 0 });
  if(!r?.success) return { success:false, error:r?.error||'Không lấy được time từ tab SpeechMiner.' };
  const payload = mode==='range' ? (r.mode==='start' ? { mode:'rangePending', start:r.time } : { mode:'rangeReady', start:r.start, end:r.end }) : { mode:'single', time:r.time };
  return { success:true, payload };
}
async function getActiveTab(){ const tabs=await chrome.tabs.query({ active:true, currentWindow:true }); return tabs[0]||null; }
async function appendNoteToStorage(context,payload,text){
  if(!context?.key) return { success:false, error:'Không xác định được context để lưu note.' };
  const d=await getStore([context.key]);
  const current=String(d[context.key]||'').trimEnd();
  let prefix='';
  if(payload?.mode==='single'&&payload.time) prefix=`(${payload.time})`;
  else if(payload?.mode==='rangeReady'&&payload.start&&payload.end) prefix=`(${payload.start} - ${payload.end})`;
  const body=String(text||'').trim();
  const finalText=prefix ? (body ? `${prefix} ${body}` : prefix) : body;
  if(!finalText) return { success:false, error:'Bạn chưa nhập gì để lưu.' };
  const next=current ? `${current}\n${finalText}` : finalText;
  await setStore({ [context.key]: next });
  try { await chrome.runtime.sendMessage({ type:'UNOTE_NOTE_APPENDED', contextKey: context.key, finalText, nextValue: next }); } catch {}
  return { success:true, finalText, nextValue: next };
}
chrome.tabs.onRemoved.addListener(async tabId => { const st=await getSourceState(); if(st.tabId===tabId) await setSourceTabId(null); });
chrome.runtime.onMessage.addListener((message,sender,sendResponse)=>{
  (async()=>{
    switch(message?.type){
      case 'UNOTE_REGISTER_SOURCE_TAB': sendResponse(await registerSourceFromSender(sender)); break;
      case 'UNOTE_GET_SOURCE_STATE': sendResponse({ success:true, ...(await getSourceDetails()) }); break;
      case 'UNOTE_SET_SOURCE_MANUAL': sendResponse(await setSourceManual(Number(message.tabId))); break;
      case 'UNOTE_SET_SOURCE_ACTIVE_TAB': {
        const active=await getActiveTab();
        if(!active?.id||!isSpeechMinerUrl(active.url)) sendResponse({ success:false, error:'Tab hiện tại không phải SpeechMiner.' });
        else sendResponse(await setSourceManual(active.id));
        break;
      }
      case 'UNOTE_SET_SOURCE_LOCKED': await setStore({ [K.sourceLocked]: !!message.locked }); sendResponse({ success:true, locked:!!message.locked }); break;
      case 'UNOTE_TOGGLE_PLUGIN': {
        const st=await getSourceState(); const next=!st.pluginEnabled; await setStore({ [K.pluginEnabled]: next }); sendResponse({ success:true, pluginEnabled: next }); break;
      }
      case 'UNOTE_OPEN_INLINE_QUICKNOTE': {
        const mode=message.mode||'free';
        const capture=await captureFromSource(mode);
        if(!capture.success){ sendResponse(capture); break; }
        const tab = sender.tab?.id ? sender.tab : await getActiveTab();
        if(!tab?.id){ sendResponse({ success:false, error:'Không tìm thấy tab để mở Quick Note.' }); break; }
        const ctx=await sendToTab(tab.id, { type:'UNOTE_GET_CONTEXT' }, { frameId: 0 });
        const open=await sendToTab(tab.id, { type:'UNOTE_SHOW_INLINE_QUICKNOTE', payload:capture.payload, context:ctx?.context||null }, { frameId: 0 });
        sendResponse(open?.success===false ? open : { success:true, payload:capture.payload });
        break;
      }
      case 'UNOTE_INLINE_QUICKNOTE_NEXT_RANGE': sendResponse(await captureFromSource('range')); break;
      case 'UNOTE_APPEND_NOTE': sendResponse(await appendNoteToStorage(message.context||null, message.payload||null, message.text||'')); break;
      case 'UNOTE_PUSH_EXTERNAL_ID': sendResponse(await pushExternalId(message)); break;
      case 'UNOTE_GET_NOTE_BY_EXTERNAL_ID': sendResponse(await getNoteByExternalId(String(message.externalId||'').trim())); break;
      default: sendResponse({ success:false, error:'Unknown message type.' });
    }
  })().catch(err=>{ console.error(err); sendResponse({ success:false, error: err?.message||'Unexpected error.' }); });
  return true;
});

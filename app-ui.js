// Split from 배포용 index.html on 2026-03-09
// Original inline scripts concatenated in source order.


// --- Early viewport/layout fix (iOS Safari first-paint jump) ---
(function(){
  try{
    if('scrollRestoration' in history) history.scrollRestoration = 'manual';
    document.documentElement.style.setProperty('--appH', Math.ceil(window.innerHeight) + 'px');
  }catch(e){}
})();



// --- Layout vars sync (header/tabs/viewport). Fixes initial "pushed up" until a UI event happens. ---
(function(){
  const root = document.documentElement;
  let rafId = null;
  let timerId = null;

  function px(n){ return Math.max(0, Math.round(n)) + 'px'; }

  function setAppH(){
    const vv = window.visualViewport;
    const h = vv ? vv.height : window.innerHeight;
    root.style.setProperty('--appH', px(h));
  }

  function setHeaderTabs(){
    const header = document.querySelector('header');
    const tabs = document.querySelector('.mobile-tabs');
    const isMobile = window.matchMedia('(max-width: 900px), (hover: none) and (pointer: coarse)').matches;

    if(header){
      root.style.setProperty('--headerH', px(header.getBoundingClientRect().height));
    }
    if(isMobile){
      if(tabs){
        const th = tabs.getBoundingClientRect().height;
        root.style.setProperty('--tabsH', px(th));
        // bottom space that content must avoid (tabs + gap + safe area)
        root.style.setProperty('--tabsInset', `calc(${px(th)} + 20px + env(safe-area-inset-bottom))`);
        root.style.setProperty('--tabsPad',   `calc(${px(th)} + 28px + env(safe-area-inset-bottom))`);
      }else{
        root.style.setProperty('--tabsH', '92px');
        root.style.setProperty('--tabsInset', 'calc(92px + 20px + env(safe-area-inset-bottom))');
        root.style.setProperty('--tabsPad',   'calc(92px + 28px + env(safe-area-inset-bottom))');
      }
    }
  }

  function kick(){
    setAppH();
    setHeaderTabs();
    // remove tiny scroll offsets that look like the whole UI is shifted upward
    try{ if(window.scrollY !== 0) window.scrollTo(0,0); }catch(e){}
  }

  function scheduleKick(delay = 0){
    if(delay > 0){
      clearTimeout(timerId);
      timerId = setTimeout(() => scheduleKick(0), delay);
      return;
    }
    if(rafId) return;
    rafId = requestAnimationFrame(() => {
      rafId = null;
      kick();
    });
  }

  // run ASAP
  kick();
  document.addEventListener('DOMContentLoaded', () => scheduleKick());
  window.addEventListener('load', () => scheduleKick());

  const vv = window.visualViewport;
  if(vv){
    vv.addEventListener('resize', () => scheduleKick(), { passive:true });
    vv.addEventListener('scroll', () => scheduleKick(60), { passive:true });
  }
  window.addEventListener('resize', () => scheduleKick(), { passive:true });
  window.addEventListener('orientationchange', () => scheduleKick(250), { passive:true });
  window.addEventListener('pageshow', () => scheduleKick(40), { passive:true });

  // ResizeObserver catches font-load/header wrap changes that happen AFTER first paint
  try{
    const ro = new ResizeObserver(() => scheduleKick());
    const header = document.querySelector('header');
    if(header) ro.observe(header);
    const tabs = document.querySelector('.mobile-tabs');
    if(tabs) ro.observe(tabs);
  }catch(e){}

  // Last resort: re-kick a couple times shortly after first render
  scheduleKick(80);
})();



      


// === MOBILE PATCH: disable resizers on touch devices ===
(function(){
  if(window.__HCSIG_SIMPLE_MOBILE__){
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if(isTouch){
      document.querySelectorAll('.resizer,.resize-bar').forEach(el=>el.remove());
    }
    return;
  }
  const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  if(isTouch){
    document.querySelectorAll('.resizer,.resize-bar').forEach(el=>el.remove());
    window.addEventListener('load', ()=>{
      const lp = document.getElementById('leftPanel');
      const rp = document.getElementById('rightPanel');
      if(lp) lp.style.flex = 'none';
      if(rp) rp.style.flex = 'none';
    });
  }
})();



// === LEGACY MOBILE 3-TAB MODE REMOVED IN a7-opt1 ===


// === LEGACY MOBILE 5-VIEW SPLIT REMOVED IN a7-opt1 ===


// === SAFE-AREA / TABS HEIGHT CALIBRATION ===
(function(){
  if(window.__HCSIG_SIMPLE_MOBILE__) return;
  const isMobile = window.matchMedia('(max-width: 900px), (hover: none) and (pointer: coarse)').matches;
  if(!isMobile) return;

  let rafId = null;
  let timerId = null;
  function setTabsHeightVar(){
    const tabs = document.querySelector('.mobile-tabs');
    if(!tabs) return;
    const h = Math.ceil(tabs.getBoundingClientRect().height);
    document.documentElement.style.setProperty('--mobileTabsH', h + 'px');
  }
  function scheduleTabsHeight(delay = 0){
    if(delay > 0){
      clearTimeout(timerId);
      timerId = setTimeout(() => scheduleTabsHeight(0), delay);
      return;
    }
    if(rafId) return;
    rafId = requestAnimationFrame(() => {
      rafId = null;
      setTabsHeightVar();
    });
  }

  // Run now and after layout settles
  window.addEventListener('load', ()=>{ scheduleTabsHeight(); scheduleTabsHeight(250); }, { once:true });
  window.addEventListener('resize', ()=>{ scheduleTabsHeight(); }, { passive:true });
  window.addEventListener('orientationchange', ()=>{ scheduleTabsHeight(300); }, { passive:true });

  // Scroll-driven recalculation removed in a7-opt1; load/resize/orientation are the stable cases.
})();



// === LEGACY MOBILE AUTO-HIDE REMOVED IN a7-opt1 ===


// === ANDROID: VisualViewport keyboard handling + UA class ===
(function(){
  if(window.__HCSIG_SIMPLE_MOBILE__) return;
  const isMobile = window.matchMedia('(max-width: 900px), (hover: none) and (pointer: coarse)').matches;
  if(!isMobile) return;

  const ua = navigator.userAgent || '';
  if(/Android/i.test(ua)) document.body.classList.add('is-android');
  if(/iPhone|iPad|iPod/i.test(ua)) document.body.classList.add('is-ios');

  const vv = window.visualViewport;
  if(!vv) return;

  let rafId = null;
  let timerId = null;
  function update(){
    // keyboard offset roughly equals viewport "missing" height
    const kb = Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop));
    document.documentElement.style.setProperty('--vvKeyboardOffset', kb + 'px');
    if(kb > 40) document.body.classList.add('keyboard-open');
    else document.body.classList.remove('keyboard-open');
  }
  function scheduleUpdate(delay = 0){
    if(delay > 0){
      clearTimeout(timerId);
      timerId = setTimeout(() => scheduleUpdate(0), delay);
      return;
    }
    if(rafId) return;
    rafId = requestAnimationFrame(() => {
      rafId = null;
      update();
    });
  }

  vv.addEventListener('resize', () => scheduleUpdate());
  vv.addEventListener('scroll', () => scheduleUpdate());
  window.addEventListener('resize', () => scheduleUpdate());
  window.addEventListener('orientationchange', ()=>scheduleUpdate(250));
  scheduleUpdate(250);
})();



// === MOBILE SIMPLE NAV (k1 hotfix) ===
(function(){
  const isMobile = window.matchMedia('(max-width: 900px), (hover: none) and (pointer: coarse)').matches;
  if(!isMobile) return;

  const main = document.getElementById('main');
  const left = document.getElementById('leftPanel');
  const center = document.getElementById('centerPanel');
  const toast = (msg, kind='info') => {
    try { if (typeof showToast === 'function') showToast(msg, kind); } catch(e){}
  };
  if(!main || !left || !center) return;

  document.body.classList.add('mobile-simple-ui');
  document.body.classList.remove(
    'mobile-view-status','mobile-view-action','mobile-view-codes','mobile-view-shop','mobile-view-log',
    'mobile-tab-left','mobile-tab-center','mobile-tab-right'
  );

  const oldTabs = document.querySelector('.mobile-tabs');
  if(oldTabs) oldTabs.remove();

  function ensureView(id){
    let el = document.getElementById(id);
    if(!el){
      el = document.createElement('section');
      el.id = id;
      el.className = 'mobile-simple-view';
      main.insertBefore(el, main.firstChild);
    }
    return el;
  }

  const homeView = ensureView('mobileSimpleHome');
  const codesView = ensureView('mobileSimpleCodes');
  const shopView = ensureView('mobileSimpleShop');

  const leftChildren = Array.from(left.children);
  const centerInner = center.querySelector('.center-inner') || center;
  const centerChildren = Array.from(centerInner.children);

  const statusTitle = leftChildren[0] || null;
  const statusBox = leftChildren[1] || null;
  const shopTitle = left.querySelector('.section-title:nth-of-type(2)') || leftChildren.find(el => el.classList && el.classList.contains('section-title') && /shop/i.test(el.textContent||''));
  const shopSortRow = left.querySelector('.shop-sort-row');
  const shopList = document.getElementById('shopList');
  const actionBox = centerChildren.find(el => el.classList && el.classList.contains('stat-box')) || null;
  const codeRow = center.querySelector('.flex-row.flex-grow');

  if(statusTitle && statusTitle.parentElement !== homeView) homeView.appendChild(statusTitle);
  if(statusBox && statusBox.parentElement !== homeView) homeView.appendChild(statusBox);
  if(actionBox && actionBox.parentElement !== homeView) homeView.appendChild(actionBox);

  if(shopTitle && shopTitle.parentElement !== shopView) shopView.appendChild(shopTitle);
  if(shopSortRow && shopSortRow.parentElement !== shopView) shopView.appendChild(shopSortRow);
  if(shopList && shopList.parentElement !== shopView) shopView.appendChild(shopList);

  if(codeRow){
    let merged = document.getElementById('mobileCodesMerged');
    if(!merged){
      merged = document.createElement('div');
      merged.id = 'mobileCodesMerged';
      merged.className = 'stat-box codes-merged';
      const title = document.createElement('div');
      title.className = 'section-title';
      title.textContent = 'Codes';
      merged.appendChild(title);
      codesView.appendChild(merged);
    }
    const codeBoxes = Array.from(codeRow.children).filter(el => el.classList && el.classList.contains('stat-box'));
    codeBoxes.forEach(box => {
      if(box.parentElement !== merged) merged.appendChild(box);
    });
    if(codeRow.parentElement) codeRow.parentElement.removeChild(codeRow);
  }

  let navRaf = null;
  function scheduleNavHeight(){
    if(navRaf) return;
    navRaf = requestAnimationFrame(() => {
      navRaf = null;
      try {
        const tabsH = Math.ceil(nav.getBoundingClientRect().height);
        document.documentElement.style.setProperty('--mobileTabsH', tabsH + 'px');
      } catch(e) {}
    });
  }

  const nav = document.createElement('nav');
  nav.className = 'mobile-tabs mobile-simple-tabs';
  nav.innerHTML = `
    <button type="button" data-view="home">${t('mobileHome')}</button>
    <button type="button" data-view="codes">${t('mobileCodes')}</button>
    <button type="button" data-view="shop">${t('mobileShop')}</button>
    <button type="button" data-view="soon">${t('mobileComing')}</button>
  `;
  document.body.appendChild(nav);

  let currentView = 'home';
  function setView(view){
    if(view === 'soon'){
      toast(t('comingSoonToast'), 'system');
      nav.querySelectorAll('button').forEach(btn => btn.classList.toggle('active', btn.dataset.view === currentView));
      return;
    }
    currentView = view;
    document.body.classList.remove('mobile-simple-view-home','mobile-simple-view-codes','mobile-simple-view-shop');
    document.body.classList.add('mobile-simple-view-' + view);
    nav.querySelectorAll('button').forEach(btn => btn.classList.toggle('active', btn.dataset.view === view));
    const target = view === 'home' ? homeView : view === 'codes' ? codesView : shopView;
    if(target) target.scrollTop = 0;
    scheduleNavHeight();
  }

  nav.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => setView(btn.dataset.view));
  });

  const codeList = document.getElementById('codeList');
  const codeDetail = document.getElementById('codeDetail');
  if(codeList && codeDetail){
    codeList.addEventListener('click', (e) => {
      const li = e.target.closest('li');
      if(!li) return;
      setView('codes');
      setTimeout(() => {
        try { codeDetail.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); } catch(e) {}
      }, 40);
    });
  }

  setView('home');
  window.addEventListener('resize', scheduleNavHeight, { passive:true });
  window.addEventListener('orientationchange', () => setTimeout(scheduleNavHeight, 200), { passive:true });
})();


/* === CHRISTMAS SNOW EFFECT (v1.6.6: toggle + stop) === */
(function(){
  const canvas = document.getElementById('snow-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');

  let w = 0, h = 0;
  let rafId = null;
  let enabled = false;

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, {passive:true});

  const flakes = Array.from({length: 80}, () => ({
    x: Math.random()*w,
    y: Math.random()*h,
    r: Math.random()*2+1,
    s: Math.random()*0.5+0.5,
    o: Math.random()*0.5+0.3
  }));

  function tick(){
    if(!enabled){ rafId = null; return; }
    ctx.clearRect(0,0,w,h);
    for(const f of flakes){
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(255,255,255,${f.o})`;
      ctx.fill();
      f.y += f.s;
      if(f.y > h){ f.y = -5; f.x = Math.random()*w; }
    }
    rafId = requestAnimationFrame(tick);
  }

  function start(){
    if(enabled && !rafId) rafId = requestAnimationFrame(tick);
  }

  function stop(){
    enabled = false;
    if(rafId){ cancelAnimationFrame(rafId); rafId = null; }
    try { ctx.clearRect(0,0,w,h); } catch(e) {}
  }

  window.__snowFX = {
    setEnabled(on){
      enabled = !!on;
      if(enabled){
        start();
      } else {
        stop();
      }
    }
  };

  // 초기 상태는 applySettings()에서 결정
  try { if (typeof applySettings === 'function') applySettings(); } catch(e) {}
})();


// === SIMPLE MOBILE NAV (HOME / CODES / SHOP / COMING SOON) ===
(function(){
  if(!window.__HCSIG_SIMPLE_MOBILE__) return;
  const isMobile = window.matchMedia('(max-width: 900px), (hover: none) and (pointer: coarse)').matches;
  if(!isMobile) return;

  const body = document.body;
  const left = document.getElementById('leftPanel');
  const center = document.getElementById('centerPanel');
  const header = document.querySelector('header');
  if(!left || !center) return;

  const sectionTitles = Array.from(left.querySelectorAll('.section-title'));
  const statusTitle = sectionTitles.find(el => (el.textContent || '').trim().toLowerCase() === 'status');
  const shopTitle = sectionTitles.find(el => (el.textContent || '').trim().toLowerCase() === 'shop');
  const statusBox = left.querySelector('.stat-box');
  const shopSortRow = left.querySelector('.shop-sort-row');
  const shopListEl = document.getElementById('shopList');
  const centerInner = center.querySelector('.center-inner') || center;
  const actionsBox = centerInner.querySelector('.stat-box');
  const codesWrap = centerInner.querySelector('.flex-row.flex-grow');
  const scanOverlay = document.getElementById('scanOverlay');

  if(statusTitle) statusTitle.classList.add('mobile-home-only');
  if(statusBox) statusBox.classList.add('mobile-home-only');
  if(actionsBox) actionsBox.classList.add('mobile-home-only');
  if(shopTitle) shopTitle.classList.add('mobile-shop-only');
  if(shopSortRow) shopSortRow.classList.add('mobile-shop-only');
  if(shopListEl) shopListEl.classList.add('mobile-shop-only');
  if(codesWrap) codesWrap.classList.add('mobile-codes-only');

  const existing = document.querySelector('.mobile-simple-tabs');
  if(existing) existing.remove();

  const wrap = document.createElement('div');
  wrap.className = 'mobile-simple-tabs';
  wrap.innerHTML = `
    <button type="button" data-mobile-tab="home">${t('mobileHome')}</button>
    <button type="button" data-mobile-tab="codes">${t('mobileCodes')}</button>
    <button type="button" data-mobile-tab="shop">${t('mobileShop')}</button>
    <button type="button" data-mobile-tab="coming">${t('mobileComing')}</button>
  `;
  body.appendChild(wrap);

  function updateHeaderVar(){
    const h = header ? Math.ceil(header.getBoundingClientRect().height) : 52;
    document.documentElement.style.setProperty('--header-h', h + 'px');
  }

  function setSimpleTab(tab){
    body.classList.remove('simple-tab-home','simple-tab-codes','simple-tab-shop');
    body.classList.add('simple-tab-' + tab);
    wrap.querySelectorAll('button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mobileTab === tab);
    });
    if(tab === 'codes' && center) center.scrollTop = 0;
    if(tab === 'shop' && left) left.scrollTop = 0;
    if(tab === 'home') {
      if(left) left.scrollTop = 0;
      if(center) center.scrollTop = 0;
    }
  }

  wrap.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-mobile-tab]');
    if(!btn) return;
    const tab = btn.dataset.mobileTab;
    if(tab === 'coming') {
      showToast(t('comingSoonToast'), 'system');
      return;
    }
    setSimpleTab(tab);
  });

  updateHeaderVar();
  if (!window.__hcsigSimpleHeaderKickBound) {
    window.__hcsigSimpleHeaderKickBound = true;
    window.addEventListener('resize', updateHeaderVar, { passive:true });
    window.addEventListener('orientationchange', () => setTimeout(updateHeaderVar, 250), { passive:true });
  }
  if(scanOverlay) scanOverlay.classList.add('mobile-scan-overlay');
  setSimpleTab('home');
})();


// === keep mobile tab labels in sync after language/state restore ===
(function(){
  function syncMobileTabLabels(){
    try {
      if (typeof t !== 'function') return;
      document.querySelectorAll('.mobile-simple-tabs [data-mobile-tab="home"], .mobile-tabs [data-view="home"]').forEach(el => { el.textContent = t('mobileHome'); });
      document.querySelectorAll('.mobile-simple-tabs [data-mobile-tab="codes"], .mobile-tabs [data-view="codes"]').forEach(el => { el.textContent = t('mobileCodes'); });
      document.querySelectorAll('.mobile-simple-tabs [data-mobile-tab="shop"], .mobile-tabs [data-view="shop"]').forEach(el => { el.textContent = t('mobileShop'); });
      document.querySelectorAll('.mobile-simple-tabs [data-mobile-tab="coming"], .mobile-tabs [data-view="soon"]').forEach(el => { el.textContent = t('mobileComing'); });
    } catch (e) {}
  }
  window.addEventListener('hcsig:language-applied', syncMobileTabLabels);
  window.addEventListener('load', () => requestAnimationFrame(syncMobileTabLabels), { once:true });
})();

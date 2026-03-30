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



// === MOBILE UI MODE: Tabbed panels ===
(function(){
  if(window.__HCSIG_SIMPLE_MOBILE__) return;
  const isMobile = window.matchMedia('(max-width: 900px), (hover: none) and (pointer: coarse)').matches;
  if(!isMobile) return;

  // IMPORTANT: This build uses the newer 5-tab "MOBILE VIEWS" system.
  // The legacy 3-tab (left/center/right) switcher can create an invisible overlay that blocks taps on iOS
  // until a relayout event (like opening "More") happens. Disable it entirely.
  return;

  // (legacy code below intentionally unreachable)

  if(!document.body.classList.contains('mobile-tab-left') &&
     !document.body.classList.contains('mobile-tab-center') &&
     !document.body.classList.contains('mobile-tab-right')){
    document.body.classList.add('mobile-tab-center');
  }

  function setTab(tab){
    document.body.classList.remove('mobile-tab-left','mobile-tab-center','mobile-tab-right');
    document.body.classList.add('mobile-tab-'+tab);
    document.querySelectorAll('.mobile-tabs button').forEach(b=>{
      b.classList.toggle('active', b.dataset.tab === tab);
    });
    const panelId = tab==='left'?'leftPanel':tab==='center'?'centerPanel':'rightPanel';
    const p = document.getElementById(panelId);
    if(p) p.scrollTop = 0;
  }

  const wrap = document.createElement('div');
  wrap.className = 'mobile-tabs';
  wrap.innerHTML = `
    <button type="button" data-tab="left" aria-label="Status">STATUS</button>
    <button type="button" data-tab="center" aria-label="Action">ACTION</button>
    <button type="button" data-tab="right" aria-label="Log">LOG</button>
  `;
  document.body.appendChild(wrap);

  wrap.querySelectorAll('button').forEach(btn=>{
    btn.addEventListener('click', ()=>setTab(btn.dataset.tab));
  });

  const btnMore = document.getElementById('btnMore');
  if(btnMore){
    btnMore.addEventListener('click', ()=>setTab('right'));
  }

  const initial = document.body.classList.contains('mobile-tab-left')?'left':
                  document.body.classList.contains('mobile-tab-right')?'right':'center';
  setTab(initial);

  window.addEventListener('resize', ()=>{
    const stillMobile = window.matchMedia('(max-width: 900px), (hover: none) and (pointer: coarse)').matches;
    if(!stillMobile){
      const mt = document.querySelector('.mobile-tabs');
      if(mt) mt.remove();
      document.body.classList.remove('mobile-tab-left','mobile-tab-center','mobile-tab-right');
    }
  });
})();



// === MOBILE VIEWS: split PC layout into mobile tabs ===
(function(){
  if(window.__HCSIG_SIMPLE_MOBILE__) return;
  const isMobile = window.matchMedia('(max-width: 900px), (hover: none) and (pointer: coarse)').matches;
  if(!isMobile) return;
  // legacy split-view disabled by k1 hotfix
  return;

  // helper
  const byText = (root, sel, txt) => {
    const els = Array.from(root.querySelectorAll(sel));
    return els.find(e => (e.textContent||'').trim().toLowerCase() === txt.toLowerCase());
  };

  // Create mobile view containers
  const views = [
    ['Status','mobileViewStatus'],
    ['Action','mobileViewAction'],
    ['Codes','mobileViewCodes'],
    ['Shop','mobileViewShop'],
    ['Log','mobileViewLog'],
  ];
  const main = document.getElementById('main') || document.querySelector('#main') || document.body;

  views.forEach(([_,id])=>{
    if(document.getElementById(id)) return;
    const v = document.createElement('div');
    v.id = id;
    v.className = 'mobile-view';
    main.insertBefore(v, main.firstChild);
  });

  // Move leftPanel -> Status + Shop
  const left = document.getElementById('leftPanel');
  if(left){
    const shopTitle = Array.from(left.querySelectorAll('.section-title')).find(t => (t.textContent||'').trim()==='Shop');
    const statusView = document.getElementById('mobileViewStatus');
    const shopView = document.getElementById('mobileViewShop');

    if(shopTitle){
      // nodes before Shop go to Status
      let node = left.firstChild;
      const toMoveStatus = [];
      while(node && node !== shopTitle){
        const next = node.nextSibling;
        toMoveStatus.push(node);
        node = next;
      }
      toMoveStatus.forEach(n=>statusView.appendChild(n));

      // Shop title and everything after -> Shop
      let node2 = shopTitle;
      const toMoveShop = [];
      while(node2){
        const next = node2.nextSibling;
        toMoveShop.push(node2);
        node2 = next;
      }
      toMoveShop.forEach(n=>shopView.appendChild(n));
    }else{
      // fallback: whole left panel in Status
      statusView.appendChild(left);
    }
  }

  // Move centerPanel -> Action + Codes
  const center = document.getElementById('centerPanel');
  if(center){
    const actionView = document.getElementById('mobileViewAction');
    const codesView  = document.getElementById('mobileViewCodes');

    const codeInvTitle = Array.from(center.querySelectorAll('.section-title')).find(t => (t.textContent||'').trim()==='코드 인벤토리');
    let codeBlock = null;
    if(codeInvTitle){
      // typically inside a flex-row container
      codeBlock = codeInvTitle.closest('.flex-row') || codeInvTitle.closest('.stat-box') || codeInvTitle.parentElement;
    }

    if(codeBlock){
      // move nodes before codeBlock into Action
      let node = center.firstChild;
      const toMoveAction = [];
      while(node && node !== codeBlock){
        const next = node.nextSibling;
        toMoveAction.push(node);
        node = next;
      }
      toMoveAction.forEach(n=>actionView.appendChild(n));

      // move codeBlock and after into Codes
      let node2 = codeBlock;
      const toMoveCodes = [];
      while(node2){
        const next = node2.nextSibling;
        toMoveCodes.push(node2);
        node2 = next;
      }
      toMoveCodes.forEach(n=>codesView.appendChild(n));
    }else{
      // fallback: whole center in Action
      actionView.appendChild(center);
    }
  }

  // LOG view: try to use existing logBox if present, else open "더보기" logs
  const logView = document.getElementById('mobileViewLog');
  const logBox = document.getElementById('logBox');
  if(logBox){
    logView.appendChild(logBox.closest('.stat-box') ? logBox.closest('.stat-box') : logBox);
  } else {
    const tip = document.createElement('div');
    tip.className = 'stat-box';
    tip.innerHTML = '<div class="section-title">Log</div><div class="small">LOG는 상단의 “더보기”에서 확인할 수 있습니다.</div>';
    logView.appendChild(tip);
  }

  // Replace tab bar with 5 tabs
  const oldTabs = document.querySelector('.mobile-tabs');
  if(oldTabs) oldTabs.remove();

  const wrap = document.createElement('div');
  wrap.className = 'mobile-tabs';
  wrap.innerHTML = `
    <button type="button" data-view="status">STATUS</button>
    <button type="button" data-view="action">ACTION</button>
    <button type="button" data-view="codes">CODES</button>
    <button type="button" data-view="shop">SHOP</button>
    <button type="button" data-view="log">LOG</button>
  `;
  document.body.appendChild(wrap);

  function setView(v){
    document.body.classList.remove('mobile-view-status','mobile-view-action','mobile-view-codes','mobile-view-shop','mobile-view-log');
    document.body.classList.add('mobile-view-'+v);
    wrap.querySelectorAll('button').forEach(b=>b.classList.toggle('active', b.dataset.view===v));
    const id = 'mobileView' + v.charAt(0).toUpperCase() + v.slice(1);
    const panel = document.getElementById(id);
    if(panel) panel.scrollTop = 0;

    // If LOG chosen and logs are in more modal, try open it
    if(v==='log'){
      const btnMore = document.getElementById('btnMore');
      if(btnMore && !document.getElementById('logBox')) btnMore.click();
    }
  }

  wrap.querySelectorAll('button').forEach(btn=>{
    btn.addEventListener('click', ()=>setView(btn.dataset.view));
  });

  // When a code is tapped, auto-scroll to detail inside codes view
  const codeList = document.getElementById('codeList');
  const codeDetail = document.getElementById('codeDetail');
  if(codeList && codeDetail){
    codeList.addEventListener('click', (e)=>{
      const li = e.target.closest('li');
      if(!li) return;
      // ensure we're on Codes view
      setView('codes');
      setTimeout(()=>codeDetail.scrollIntoView({behavior:'smooth', block:'start'}), 50);
    });
  }

  // default view
  setView('status');
})();



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
  window.addEventListener('load', ()=>{ scheduleTabsHeight(); scheduleTabsHeight(250); });
  window.addEventListener('resize', ()=>{ scheduleTabsHeight(); });
  window.addEventListener('orientationchange', ()=>{ scheduleTabsHeight(300); });

  // iOS Safari sometimes changes viewport when address bar hides/shows while scrolling
  // scroll-driven recalculation removed in optimize pass
})();



// === MOBILE TABS AUTO-HIDE on scroll ===
(function(){
  if(window.__HCSIG_SIMPLE_MOBILE__) return;
  const isMobile = window.matchMedia('(max-width: 900px), (hover: none) and (pointer: coarse)').matches;
  if(!isMobile) return;
  // disabled by k1 hotfix; old view IDs are no longer used
  return;

  function activeViewEl(){
    const ids = ['mobileViewStatus','mobileViewAction','mobileViewCodes','mobileViewShop','mobileViewLog'];
    for(const id of ids){
      const el = document.getElementById(id);
      if(!el) continue;
      const st = window.getComputedStyle(el);
      if(st.display !== 'none') return el;
    }
    return null;
  }

  let lastTop = 0;
  let hidden = false;
  let ticking = false;

  function showTabs(){
    if(!hidden) return;
    hidden = false;
    document.body.classList.remove('mobile-tabs-hidden');
  }
  function hideTabs(){
    if(hidden) return;
    hidden = true;
    document.body.classList.add('mobile-tabs-hidden');
  }

  function onScroll(){
    if(ticking) return;
    ticking = true;
    requestAnimationFrame(()=>{
      const el = activeViewEl();
      if(!el){ ticking=false; return; }
      const top = el.scrollTop || 0;
      const delta = top - lastTop;

      if(top <= 4){ showTabs(); lastTop = top; ticking=false; return; }
      if(Math.abs(delta) < 6){ ticking=false; return; }

      if(delta > 0) hideTabs();
      else showTabs();

      lastTop = top;
      ticking = false;
    });
  }

  function attach(){
    const ids = ['mobileViewStatus','mobileViewAction','mobileViewCodes','mobileViewShop','mobileViewLog'];
    ids.forEach(id=>{
      const el = document.getElementById(id);
      if(!el) return;
      if(el.__hcsigHideAttached) return;
      el.__hcsigHideAttached = true;
      el.addEventListener('scroll', onScroll, {passive:true});
      el.addEventListener('touchstart', showTabs, {passive:true});
    });
  }

  document.addEventListener('click', (e)=>{
    const btn = e.target.closest('.mobile-tabs button');
    if(btn) showTabs();
  });

  window.addEventListener('load', attach);
  window.addEventListener('resize', attach);
  setTimeout(attach, 600);
})();



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
    try {
      const tabsH = Math.ceil(nav.getBoundingClientRect().height);
      document.documentElement.style.setProperty('--mobileTabsH', tabsH + 'px');
    } catch(e) {}
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

  let headerRaf = null;
  let headerTimer = null;
  function updateHeaderVarNow(){
    headerRaf = null;
    const h = header ? Math.ceil(header.getBoundingClientRect().height) : 52;
    document.documentElement.style.setProperty('--header-h', h + 'px');
  }
  function updateHeaderVar(delay = 0){
    if (delay > 0) {
      clearTimeout(headerTimer);
      headerTimer = setTimeout(() => updateHeaderVar(0), delay);
      return;
    }
    if (headerRaf) return;
    headerRaf = requestAnimationFrame(updateHeaderVarNow);
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
  window.addEventListener('resize', () => updateHeaderVar(), { passive:true });
  window.addEventListener('orientationchange', () => updateHeaderVar(250), { passive:true });
  if(scanOverlay) scanOverlay.classList.add('mobile-scan-overlay');
  setSimpleTab('home');
})();


// === keep mobile tab labels in sync after language/state restore ===
(function(){
  let syncMobileTabsRaf = null;
  function runSyncMobileTabLabels(){
    syncMobileTabsRaf = null;
    try {
      if (typeof t !== 'function') return;
      document.querySelectorAll('.mobile-simple-tabs [data-mobile-tab="home"], .mobile-tabs [data-view="home"]').forEach(el => { el.textContent = t('mobileHome'); });
      document.querySelectorAll('.mobile-simple-tabs [data-mobile-tab="codes"], .mobile-tabs [data-view="codes"]').forEach(el => { el.textContent = t('mobileCodes'); });
      document.querySelectorAll('.mobile-simple-tabs [data-mobile-tab="shop"], .mobile-tabs [data-view="shop"]').forEach(el => { el.textContent = t('mobileShop'); });
      document.querySelectorAll('.mobile-simple-tabs [data-mobile-tab="coming"], .mobile-tabs [data-view="soon"]').forEach(el => { el.textContent = t('mobileComing'); });
    } catch (e) {}
  }
  function syncMobileTabLabels(){
    if (syncMobileTabsRaf) return;
    syncMobileTabsRaf = requestAnimationFrame(runSyncMobileTabLabels);
  }
  window.addEventListener('hcsig:language-applied', syncMobileTabLabels);
  window.addEventListener('load', syncMobileTabLabels, { once:true });
})();

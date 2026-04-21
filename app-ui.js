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
    vv.addEventListener('resize', () => scheduleKick());
    vv.addEventListener('scroll', () => scheduleKick());
  }
  window.addEventListener('resize', () => scheduleKick());
  window.addEventListener('orientationchange', () => scheduleKick(250));
  window.addEventListener('pageshow', () => scheduleKick(40));

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
  document.addEventListener('scroll', ()=>{
    scheduleTabsHeight(180);
  }, {passive:true});
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



// === APP SHELL NAV (HOME / CODES / SHOP / MORE / LAB) ===
(function(){
  const main = document.getElementById('main');
  const left = document.getElementById('leftPanel');
  const center = document.getElementById('centerPanel');
  if(!main || !left || !center) return;

  document.body.classList.add('app-shell-ui');
  document.body.classList.remove(
    'mobile-view-status','mobile-view-action','mobile-view-codes','mobile-view-shop','mobile-view-log',
    'mobile-tab-left','mobile-tab-center','mobile-tab-right'
  );

  document.querySelectorAll('.mobile-tabs').forEach(el => {
    if(el.id !== 'appMainNav') el.remove();
  });

  function label(key, fallback){
    try {
      if(typeof t === 'function') return t(key);
    } catch(e) {}
    return fallback;
  }

  function ensureView(id, viewName){
    let el = document.getElementById(id);
    if(!el){
      el = document.createElement('section');
      el.id = id;
      main.insertBefore(el, main.firstChild);
    }
    el.className = `app-main-view app-view-${viewName}`;
    el.dataset.appView = viewName;
    return el;
  }

  const views = {
    home: ensureView('appViewHome', 'home'),
    codes: ensureView('appViewCodes', 'codes'),
    shop: ensureView('appViewShop', 'shop'),
    more: ensureView('appViewMore', 'more'),
    lab: ensureView('appViewLab', 'lab')
  };

  const centerInner = center.querySelector('.center-inner') || center;
  const statusTitle = document.getElementById('titleStatus');
  const statusBox = statusTitle ? statusTitle.nextElementSibling : left.querySelector('.stat-box');
  const shopTitle = document.getElementById('titleShop');
  const shopSortRow = left.querySelector('.shop-sort-row');
  const shopList = document.getElementById('shopList');
  const actionBox = document.getElementById('titleActions') ? document.getElementById('titleActions').closest('.stat-box') : centerInner.querySelector('.stat-box');
  const codeRow = center.querySelector('.flex-row.flex-grow');
  const scanOverlay = document.getElementById('scanOverlay');
  const moreModal = document.getElementById('moreModal');

  [statusTitle, statusBox, actionBox, scanOverlay].forEach(el => {
    if(el && el.parentElement !== views.home) views.home.appendChild(el);
  });
  [shopTitle, shopSortRow, shopList].forEach(el => {
    if(el && el.parentElement !== views.shop) views.shop.appendChild(el);
  });
  if(codeRow){
    codeRow.classList.add('app-codes-layout');
    if(codeRow.parentElement !== views.codes) views.codes.appendChild(codeRow);
  }
  if(moreModal && moreModal.parentElement !== views.more){
    moreModal.classList.add('app-more-panel');
    views.more.appendChild(moreModal);
  }

  function buildLab(){
    if(document.getElementById('labContent')) return;
    views.lab.innerHTML = `
      <div class="lab-hero" id="labContent">
        <div>
          <div class="section-title">LAB</div>
          <h2>실험실 진입 준비</h2>
          <p>정식 도전 콘텐츠와 향후 실험 콘텐츠가 이곳에서 확장됩니다.</p>
        </div>
        <div class="lab-mode-chip">NORMAL / RISK / EXTREME 준비</div>
      </div>
      <div class="lab-subtabs" role="tablist" aria-label="LAB">
        <button type="button" class="active" data-lab-tab="stage">STAGE</button>
        <button type="button" data-lab-tab="coming">COMING SOON</button>
      </div>
      <section class="lab-panel active" data-lab-panel="stage">
        <div class="stage-head">
          <div>
            <span class="badge">STAGE</span>
            <h3>Stage 1-100</h3>
            <p>활성 코드와 CPU 티어로 챕터형 도전 구간을 돌파합니다. 첫 클리어 보상과 반복 보상은 분리됩니다.</p>
          </div>
          <div class="stage-summary" id="stageSummary">
            <div><span>HIGHEST</span><strong>0 / 100</strong></div>
            <div><span>CLEARED</span><strong>0 / 100</strong></div>
            <div><span>ATTEMPTS</span><strong>0</strong></div>
          </div>
        </div>
        <div class="stage-toolbar" aria-label="Stage chapter filter">
          <button type="button" class="active" data-stage-chapter="all">ALL</button>
          <button type="button" data-stage-chapter="1">CH.1</button>
          <button type="button" data-stage-chapter="2">CH.2</button>
          <button type="button" data-stage-chapter="3">CH.3</button>
          <button type="button" data-stage-chapter="4">CH.4</button>
          <button type="button" data-stage-chapter="5">CH.5</button>
        </div>
        <div class="stage-layout">
          <div class="stage-list" id="stageList" aria-label="Stage list"></div>
          <div class="stage-detail" id="stageDetail">
            <span class="badge">READY</span>
            <h4>스테이지 데이터를 준비 중입니다</h4>
            <p>LAB이 초기화되면 추천 레벨, 추천 파워, 성공률, 보상이 표시됩니다.</p>
          </div>
        </div>
      </section>
      <section class="lab-panel" data-lab-panel="coming">
        <span class="badge">COMING SOON</span>
        <h3>확장 실험 대기열</h3>
        <p>EXTREME 고급 옵션, CPU/GPU 공존, 코드 프리셋, 변칙 서버 룰이 이 영역에서 차례로 실험됩니다.</p>
      </section>
    `;
  }
  buildLab();
  try { document.dispatchEvent(new CustomEvent('hcsig:lab-ready')); } catch(e) {}

  const nav = document.createElement('nav');
  nav.id = 'appMainNav';
  nav.className = 'mobile-tabs app-main-tabs';
  nav.innerHTML = `
    <button type="button" data-main-view="home">${label('mobileHome', 'HOME')}</button>
    <button type="button" data-main-view="codes">${label('mobileCodes', 'CODES')}</button>
    <button type="button" data-main-view="shop">${label('mobileShop', 'SHOP')}</button>
    <button type="button" data-main-view="more">${label('mobileMore', 'MORE')}</button>
    <button type="button" data-main-view="lab">${label('mobileLab', 'LAB')}</button>
  `;
  const header = document.querySelector('header');
  if(header && header.nextSibling) header.parentNode.insertBefore(nav, header.nextSibling);
  else document.body.insertBefore(nav, main);

  function syncTabsHeight(){
    try {
      const h = Math.ceil(nav.getBoundingClientRect().height);
      document.documentElement.style.setProperty('--mobileTabsH', h + 'px');
      document.documentElement.style.setProperty('--tabsH', h + 'px');
    } catch(e) {}
  }

  let currentView = 'home';
  function setView(view){
    if(!views[view]) view = 'home';
    currentView = view;
    Object.entries(views).forEach(([name, el]) => {
      el.classList.toggle('active', name === view);
    });
    document.body.classList.remove('app-view-home','app-view-codes','app-view-shop','app-view-more','app-view-lab');
    document.body.classList.add('app-view-' + view);
    nav.querySelectorAll('[data-main-view]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mainView === view);
    });
    if(views[view]) views[view].scrollTop = 0;
    syncTabsHeight();
  }

  nav.querySelectorAll('[data-main-view]').forEach(btn => {
    btn.addEventListener('click', () => setView(btn.dataset.mainView));
  });

  views.lab.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-lab-tab]');
    if(!btn) return;
    const tab = btn.dataset.labTab;
    views.lab.querySelectorAll('[data-lab-tab]').forEach(el => el.classList.toggle('active', el.dataset.labTab === tab));
    views.lab.querySelectorAll('[data-lab-panel]').forEach(el => el.classList.toggle('active', el.dataset.labPanel === tab));
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

  document.addEventListener('hcsig:navigate-main', (event) => {
    const view = event.detail && event.detail.view;
    setView(view);
  });

  function syncLabels(){
    nav.querySelector('[data-main-view="home"]').textContent = label('mobileHome', 'HOME');
    nav.querySelector('[data-main-view="codes"]').textContent = label('mobileCodes', 'CODES');
    nav.querySelector('[data-main-view="shop"]').textContent = label('mobileShop', 'SHOP');
    nav.querySelector('[data-main-view="more"]').textContent = label('mobileMore', 'MORE');
    nav.querySelector('[data-main-view="lab"]').textContent = label('mobileLab', 'LAB');
    views.lab.querySelector('[data-lab-tab="stage"]').textContent = label('mobileStage', 'STAGE');
    views.lab.querySelector('[data-lab-tab="coming"]').textContent = label('mobileComing', 'COMING SOON');
  }
  window.addEventListener('hcsig:language-applied', syncLabels);
  window.addEventListener('resize', syncTabsHeight, {passive:true});
  window.addEventListener('orientationchange', () => setTimeout(syncTabsHeight, 250));

  syncLabels();
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

  window.__snowFX.setEnabled(canvas.style.display !== 'none');
})();


// === keep mobile tab labels in sync after language/state restore ===
(function(){
  function syncMobileTabLabels(){
    try {
      if (typeof t !== 'function') return;
      document.querySelectorAll('[data-main-view="home"]').forEach(el => { el.textContent = t('mobileHome'); });
      document.querySelectorAll('[data-main-view="codes"]').forEach(el => { el.textContent = t('mobileCodes'); });
      document.querySelectorAll('[data-main-view="shop"]').forEach(el => { el.textContent = t('mobileShop'); });
      document.querySelectorAll('[data-main-view="more"]').forEach(el => { el.textContent = t('mobileMore'); });
      document.querySelectorAll('[data-main-view="lab"]').forEach(el => { el.textContent = t('mobileLab'); });
      document.querySelectorAll('[data-lab-tab="stage"]').forEach(el => { el.textContent = t('mobileStage'); });
      document.querySelectorAll('[data-lab-tab="coming"]').forEach(el => { el.textContent = t('mobileComing'); });
    } catch (e) {}
  }
  window.addEventListener('hcsig:language-applied', syncMobileTabLabels);
  window.addEventListener('load', () => setTimeout(syncMobileTabLabels, 0));
})();

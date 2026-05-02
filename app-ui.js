// Split from 배포용 index.html on 2026-03-09
// Original inline scripts concatenated in source order.


// --- Early viewport/layout fix (iOS Safari first-paint jump) ---
(function(){
  try{
    if('scrollRestoration' in history) history.scrollRestoration = 'manual';
    const firstH = Math.ceil(window.innerHeight) + 'px';
    document.documentElement.style.setProperty('--appH', firstH);
    document.documentElement.style.setProperty('--app-height', firstH);
  }catch(e){}
})();


// --- Touch/zoom guard (mobile double-tap/pinch accidental zoom) ---
// body에 touch-action:manipulation이 있어 더블탭 줌은 이미 방지됨.
// touchend preventDefault는 "완전히 같은 요소"를 320ms 내 연속 탭할
// 때만 적용 — 다른 요소를 연속 탭할 때 click이 차단되는 버그 방지.
(function(){
  let lastTouchEnd    = 0;
  let lastTouchTarget = null;
  function isEditable(target){
    return !!(target && target.closest && target.closest('input, textarea, select, [contenteditable="true"], label'));
  }
  document.addEventListener('gesturestart', ev => {
    ev.preventDefault();
  }, { passive:false });
  document.addEventListener('touchend', ev => {
    const now        = Date.now();
    const sameTarget = ev.target === lastTouchTarget;
    if (!isEditable(ev.target) && sameTarget && now - lastTouchEnd <= 320) {
      ev.preventDefault();
    }
    lastTouchEnd    = now;
    lastTouchTarget = ev.target;
  }, { passive:false });
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
    const value = px(h);
    root.style.setProperty('--appH', value);
    root.style.setProperty('--app-height', value);
  }

  function setHeaderTabs(){
    const header = document.querySelector('header');
    const tabs = document.querySelector('.mobile-tabs');
    const isMobile = window.matchMedia('(max-width: 900px), (hover: none) and (pointer: coarse)').matches;

    if(header){
      const headerValue = px(header.getBoundingClientRect().height);
      root.style.setProperty('--headerH', headerValue);
      root.style.setProperty('--header-h', headerValue);
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
    try{
      if(window.scrollY !== 0) window.scrollTo(0,0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }catch(e){}
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
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') scheduleKick(20);
  });

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



// === APP SHELL NAV (SHOP / CODES / HOME / LAB / COMING SOON) ===
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
    lab: ensureView('appViewLab', 'lab'),
    coming: ensureView('appViewComing', 'coming')
  };

  const centerInner = center.querySelector('.center-inner') || center;
  const statusTitle = document.getElementById('titleStatus');
  const statusBox = statusTitle ? statusTitle.nextElementSibling : left.querySelector('.stat-box');
  const shopTitle = document.getElementById('titleShop');
  const shopTypeTabs = document.getElementById('shopTypeTabs');
  const shopSortRow = left.querySelector('.shop-sort-row');
  const shopList = document.getElementById('shopList');
  const actionBox = document.getElementById('titleActions') ? document.getElementById('titleActions').closest('.stat-box') : centerInner.querySelector('.stat-box');
  const codeRow = center.querySelector('.flex-row.flex-grow');
  const scanOverlay = document.getElementById('scanOverlay');
  const moreModalBackdrop = document.getElementById('moreModalBackdrop');
  const moreModal = document.getElementById('moreModal');
  const staleMoreView = document.getElementById('appViewMore');
  if(staleMoreView) staleMoreView.remove();

  let homeCockpit = document.getElementById('homeCockpit');
  if(!homeCockpit){
    homeCockpit = document.createElement('section');
    homeCockpit.id = 'homeCockpit';
    homeCockpit.className = 'home-cockpit';
    views.home.insertBefore(homeCockpit, views.home.firstChild);
  }
  [statusTitle, statusBox, actionBox].forEach(el => {
    if(el && el.parentElement !== homeCockpit) homeCockpit.appendChild(el);
  });
  if(scanOverlay && scanOverlay.parentElement !== views.home) views.home.appendChild(scanOverlay);
  if(statusBox) statusBox.classList.add('home-status-grid');

  // v3.0.1: "오늘 할 일" 요약 카드
  if(!document.getElementById('todaySummaryBox')){
    const todayBox = document.createElement('div');
    todayBox.id = 'todaySummaryBox';
    todayBox.className = 'today-summary-box stat-box';
    todayBox.innerHTML = `
      <div class="today-summary-header">
        <span class="badge">TODAY</span>
        <span class="today-summary-title" id="todaySummaryTitle">${label('todayTitle','오늘 할 일')}</span>
      </div>
      <div id="todaySummaryContent" class="today-summary-content"></div>
    `;
    homeCockpit.appendChild(todayBox);
  }
  if(actionBox) {
    actionBox.classList.add('home-actions-box');
    const loadoutLabel = document.getElementById('labelLoadout');
    const loadoutBlock = loadoutLabel && loadoutLabel.parentElement;
    if(loadoutBlock) loadoutBlock.classList.add('home-loadout-block');
    const loadoutRow = loadoutBlock && loadoutBlock.querySelector('.button-row');
    if(loadoutRow) loadoutRow.classList.add('loadout-control-row');
    if(!document.getElementById('homeLiveHint')){
      actionBox.insertAdjacentHTML('afterend', `
        <button type="button" id="homeLiveHint" class="home-live-hint">
          <span>LIVE NET</span>
          <strong>관제 신호 보기</strong>
        </button>
      `);
    }
  }
  [shopTitle, shopTypeTabs, shopSortRow, shopList].forEach(el => {
    if(el && el.parentElement !== views.shop) views.shop.appendChild(el);
  });
  if(codeRow){
    codeRow.classList.add('app-codes-layout');
    if(codeRow.parentElement !== views.codes) views.codes.appendChild(codeRow);
  }

  // v3.0.1: INVENTORY 서브탭 (CODES / ITEMS) 삽입
  if(!document.getElementById('inventorySubtabs')){
    const subtabs = document.createElement('div');
    subtabs.id = 'inventorySubtabs';
    subtabs.className = 'inventory-subtabs';
    subtabs.innerHTML = `
      <button type="button" class="inventory-subtab active" data-inv-tab="codes">${label('inventoryCodesTab','CODES')}</button>
      <button type="button" class="inventory-subtab" data-inv-tab="items">${label('inventoryItemsTab','ITEMS')}</button>
    `;
    views.codes.insertBefore(subtabs, views.codes.firstChild);
  }

  if(!document.getElementById('inventoryItemsPanel')){
    const itemsPanel = document.createElement('div');
    itemsPanel.id = 'inventoryItemsPanel';
    itemsPanel.className = 'inventory-panel inventory-items-panel';
    itemsPanel.setAttribute('aria-hidden', 'true');
    itemsPanel.style.display = 'none';
    itemsPanel.innerHTML = `<div id="itemsContent" class="items-content"></div>`;
    views.codes.appendChild(itemsPanel);
  }

  // 서브탭 클릭 핸들러
  (function(){
    function setInvTab(tab){
      const subtabsEl = document.getElementById('inventorySubtabs');
      const itemsEl = document.getElementById('inventoryItemsPanel');
      const codesEl = codeRow;
      if(!subtabsEl) return;
      subtabsEl.querySelectorAll('[data-inv-tab]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.invTab === tab);
      });
      if(codesEl){
        codesEl.style.display = tab === 'codes' ? '' : 'none';
        codesEl.setAttribute('aria-hidden', tab !== 'codes' ? 'true' : 'false');
      }
      if(itemsEl){
        itemsEl.style.display = tab === 'items' ? '' : 'none';
        itemsEl.setAttribute('aria-hidden', tab !== 'items' ? 'true' : 'false');
      }
      // ITEMS 패널 렌더
      if(tab === 'items'){
        try{ document.dispatchEvent(new CustomEvent('hcsig:render-items')); }catch(e){}
      }
    }
    document.addEventListener('click', function(e){
      const btn = e.target.closest('[data-inv-tab]');
      if(!btn) return;
      setInvTab(btn.dataset.invTab);
    });
    // 초기 상태: CODES 탭
    setInvTab('codes');
  })();
  if(moreModal && moreModalBackdrop && moreModal.parentElement !== moreModalBackdrop){
    moreModalBackdrop.appendChild(moreModal);
  }
  if(moreModal) moreModal.classList.remove('app-more-panel');

  function buildLab(){
    if(document.getElementById('labContent')) return;
    views.lab.innerHTML = `
	      <div class="lab-hero" id="labContent">
	        <div>
	          <div class="section-title">LAB</div>
	          <h2>LAB</h2>
	          <p>데이터 타워 등반과 챕터 보상을 이곳에서 관리합니다.</p>
	        </div>
	        <div class="lab-mode-chip">LAB ONLINE</div>
	      </div>
      <section class="lab-panel active" data-lab-panel="stage">
        <div class="stage-head">
          <div>
            <span class="badge">DATA TOWER</span>
            <h3>데이터 타워 1-100</h3>
            <p>챕터를 열어 바로 도전하세요. 보상은 첫 클리어, 반복, 챕터로 나뉩니다.</p>
          </div>
          <div class="stage-summary" id="stageSummary">
            <div><span>HIGHEST</span><strong>0 / 100</strong></div>
            <div><span>CLEARED</span><strong>0 / 100</strong></div>
            <div><span>ATTEMPTS</span><strong>0</strong></div>
          </div>
	        </div>
	        <div class="stage-detail" id="stageDetail">
	          <span class="badge">READY</span>
	          <h4>데이터 타워 선택 대기</h4>
	          <p>챕터를 선택하면 추천값과 보상이 표시됩니다.</p>
	        </div>
		        <div class="stage-chapter-list" id="stageChapterList" aria-label="Data Tower chapters"></div>
		      </section>
    `;
  }
  buildLab();
  try { document.dispatchEvent(new CustomEvent('hcsig:lab-ready')); } catch(e) {}

  function buildComing(){
    if(document.getElementById('comingContent')) return;
    views.coming.innerHTML = `
      <div class="lab-hero coming-hero" id="comingContent">
        <div>
          <div class="section-title">EXTEND</div>
          <h2>EXTEND</h2>
          <p>CAMPAIGN, ZERO-DAY DISCOVERY, 특수전을 한 곳에서 관리하는 확장 패널입니다.</p>
        </div>
        <div class="lab-mode-chip">EXPAND</div>
      </div>
      <div class="lab-subtabs" id="extendSubtabs">
        <button type="button" class="active" data-extend-tab="campaign">CAMPAIGN</button>
        <button type="button" data-extend-tab="zero">ZERO-DAY</button>
        <button type="button" data-extend-tab="special">${label('extendSpecial', '특수전')}</button>
      </div>
      <section class="lab-panel active" data-extend-panel="campaign">
        <div class="stage-head campaign-head">
          <div>
            <span class="badge">CAMPAIGN</span>
            <h3>Foundation Line</h3>
            <p>캠페인은 순서대로 열리는 선형 침투 챌린지입니다. 다음 미클리어 노드만 새로 도전할 수 있습니다.</p>
          </div>
          <div class="stage-summary campaign-summary" id="campaignSummary">
            <div><span>CHAPTER</span><strong>1 / 1</strong></div>
            <div><span>CLEARED</span><strong>0 / 5</strong></div>
            <div><span>STATUS</span><strong>READY</strong></div>
          </div>
        </div>
        <div class="campaign-map" id="campaignNodeList" aria-label="Campaign chapter nodes"></div>
        <div class="stage-detail campaign-detail" id="campaignDetail">
          <span class="badge">CAMPAIGN</span>
          <h4>노드 선택 대기</h4>
          <p>첫 챕터는 선형 챌린지입니다. 가장 앞의 미클리어 노드부터 차례대로 진입할 수 있습니다.</p>
        </div>
      </section>
      <section class="lab-panel" data-extend-panel="zero">
        <div id="zeroDayPanel"></div>
      </section>
      <section class="lab-panel" data-extend-panel="special">
        <section class="coming-panel">
          <span class="badge">SPECIAL OPS</span>
          <h3>${label('extendSpecial', '특수전')}</h3>
          <p>제한 규칙이 걸린 짧은 작전과 계절 이벤트를 이곳에 모읍니다.</p>
          <div class="lab-preview-grid coming-preview-grid">
            <div><strong>${label('extendSpecialSoonA', '전파 차단')}</strong><span>에너지 회복 제한</span></div>
            <div><strong>${label('extendSpecialSoonB', '야간 침투')}</strong><span>TRACE 상승 가속</span></div>
            <div><strong>${label('extendSpecialSoonC', '무인 감시')}</strong><span>자동 경보 노드</span></div>
          </div>
        </section>
      </section>
    `;
    const extendTabs = views.coming.querySelectorAll('[data-extend-tab]');
    const extendPanels = views.coming.querySelectorAll('[data-extend-panel]');
    extendTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.extendTab || 'campaign';
        extendTabs.forEach(item => item.classList.toggle('active', item === btn));
        extendPanels.forEach(panel => panel.classList.toggle('active', panel.dataset.extendPanel === tab));
        if (tab === 'campaign') {
          try { document.dispatchEvent(new CustomEvent('hcsig:campaign-tab-open')); } catch(e) {}
        }
        if (tab === 'zero') {
          try { document.dispatchEvent(new CustomEvent('hcsig:zd-tab-open')); } catch(e) {}
        }
      });
    });
  }
  buildComing();
  try { document.dispatchEvent(new CustomEvent('hcsig:extend-ready')); } catch(e) {}

  const nav = document.createElement('nav');
  nav.id = 'appMainNav';
  nav.className = 'mobile-tabs app-main-tabs';
  nav.innerHTML = `
    <button type="button" data-main-view="shop">${label('mobileShop', 'SHOP')}</button>
    <button type="button" data-main-view="codes">${label('mobileInventory', 'INVENTORY')}</button>
    <button type="button" data-main-view="home">${label('mobileHome', 'HOME')}</button>
    <button type="button" data-main-view="lab">${label('mobileLab', 'LAB')}</button>
    <button type="button" data-main-view="coming">${label('mobileComing', 'EXTEND')}</button>
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
    document.body.classList.remove('app-view-home','app-view-codes','app-view-shop','app-view-lab','app-view-coming');
    document.body.classList.add('app-view-' + view);
    nav.querySelectorAll('[data-main-view]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mainView === view);
    });
    if(views[view]) views[view].scrollTop = 0;
    syncTabsHeight();
    try { document.dispatchEvent(new CustomEvent('hcsig:main-view', { detail: { view } })); } catch(e) {}
  }

  function showComingToast(){
    let toast = document.getElementById('comingToast');
    if(!toast){
      toast = document.createElement('div');
      toast.id = 'comingToast';
      toast.className = 'coming-toast';
      toast.textContent = label('comingSoonToast', '다음 업데이트에서 공개됩니다');
      document.body.appendChild(toast);
    }
    toast.classList.remove('coming-toast-visible');
    void toast.offsetWidth;
    toast.classList.add('coming-toast-visible');
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => toast.classList.remove('coming-toast-visible'), 2400);
  }

  nav.querySelectorAll('[data-main-view]').forEach(btn => {
    btn.addEventListener('click', () => {
      setView(btn.dataset.mainView);
    });
  });

  document.addEventListener('hcsig:navigate-main', (event) => {
    const view = event.detail && event.detail.view;
    setView(view);
  });

  function syncLabels(){
    nav.querySelector('[data-main-view="shop"]').textContent = label('mobileShop', 'SHOP');
    nav.querySelector('[data-main-view="codes"]').textContent = label('mobileInventory', 'INVENTORY');
    nav.querySelector('[data-main-view="home"]').textContent = label('mobileHome', 'HOME');
    nav.querySelector('[data-main-view="lab"]').textContent = label('mobileLab', 'LAB');
    nav.querySelector('[data-main-view="coming"]').textContent = label('mobileComing', 'EXTEND');
    // 서브탭 라벨 동기화
    try {
      const subtabsEl = document.getElementById('inventorySubtabs');
      if(subtabsEl){
        const cBtn = subtabsEl.querySelector('[data-inv-tab="codes"]');
        const iBtn = subtabsEl.querySelector('[data-inv-tab="items"]');
        if(cBtn) cBtn.textContent = label('inventoryCodesTab','CODES');
        if(iBtn) iBtn.textContent = label('inventoryItemsTab','ITEMS');
      }
      const tTitle = document.getElementById('todaySummaryTitle');
      if(tTitle) tTitle.textContent = label('todayTitle','오늘 할 일');
    } catch(e) {}
  }
  window.addEventListener('hcsig:language-applied', syncLabels);
  window.addEventListener('resize', syncTabsHeight, {passive:true});
  window.addEventListener('orientationchange', () => setTimeout(syncTabsHeight, 250));

  syncLabels();
  setView('home');
})();


// Snow effect removed in v3.0.0


// === keep mobile tab labels in sync after language/state restore ===
(function(){
  function syncMobileTabLabels(){
    try {
      if (typeof t !== 'function') return;
      document.querySelectorAll('[data-main-view="shop"]').forEach(el => { el.textContent = t('mobileShop'); });
      document.querySelectorAll('[data-main-view="codes"]').forEach(el => { el.textContent = t('mobileInventory'); });
      document.querySelectorAll('[data-main-view="home"]').forEach(el => { el.textContent = t('mobileHome'); });
      document.querySelectorAll('[data-main-view="lab"]').forEach(el => { el.textContent = t('mobileLab'); });
      document.querySelectorAll('[data-main-view="coming"]').forEach(el => { el.textContent = t('mobileComing'); });
    } catch (e) {}
  }
  window.addEventListener('hcsig:language-applied', syncMobileTabLabels);
  window.addEventListener('load', () => setTimeout(syncMobileTabLabels, 0));
})();

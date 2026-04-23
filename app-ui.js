// Split from 배포용 index.html on 2026-03-09
// Original inline scripts concatenated in source order.


// --- Early viewport/layout fix (iOS Safari first-paint jump) ---
(function(){
  try{
    if('scrollRestoration' in history) history.scrollRestoration = 'manual';
    document.documentElement.style.setProperty('--appH', Math.ceil(window.innerHeight) + 'px');
  }catch(e){}
})();


// --- Touch/zoom guard (mobile double-tap/pinch accidental zoom) ---
(function(){
  let lastTouchEnd = 0;
  function isEditable(target){
    return !!(target && target.closest && target.closest('input, textarea, select, [contenteditable="true"]'));
  }
  document.addEventListener('gesturestart', ev => {
    ev.preventDefault();
  }, { passive:false });
  document.addEventListener('touchend', ev => {
    const now = Date.now();
    if (!isEditable(ev.target) && now - lastTouchEnd <= 320) {
      ev.preventDefault();
    }
    lastTouchEnd = now;
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



// === APP SHELL NAV (HOME / CODES / SHOP / LAB / COMING SOON) ===
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
  [shopTitle, shopSortRow, shopList].forEach(el => {
    if(el && el.parentElement !== views.shop) views.shop.appendChild(el);
  });
  if(codeRow){
    codeRow.classList.add('app-codes-layout');
    if(codeRow.parentElement !== views.codes) views.codes.appendChild(codeRow);
  }
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
	          <p>데이터 타워, ZERO-DAY 침투, 다음 실험을 여기서 관리합니다.</p>
	        </div>
	        <div class="lab-mode-chip">LAB ONLINE</div>
	      </div>
	      <div class="lab-subtabs" id="labSubtabs">
	        <button type="button" class="active" data-lab-tab="stage">데이터 타워</button>
	        <button type="button" data-lab-tab="zero">ZERO-DAY</button>
	        <button type="button" data-lab-tab="coming">COMING SOON</button>
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
	      <section class="lab-panel" data-lab-panel="zero">
	        <span class="badge">LIVE MODE</span>
	        <h3>ZERO-DAY</h3>
	        <p>정식 침투 엔진이 열렸습니다. 탐지 게이지가 100%에 닿기 전에 핵심 노드를 돌파하고 신호를 회수하세요.</p>
	        <div class="zero-day-flow">
	          <article><strong>준비</strong><span>코드 빌드와 CPU/GPU 성향을 맞춥니다.</span></article>
	          <article><strong>침투</strong><span>탐지 게이지가 오르기 전 핵심 노드를 돌파합니다.</span></article>
	          <article><strong>탈출</strong><span>획득한 신호를 정리하고 보상을 회수합니다.</span></article>
	        </div>
	        <div class="zero-day-summary" id="zeroDaySummary">
	          <div><span>BEST DEPTH</span><strong>0 / 12</strong></div>
	          <div><span>BEST SCORE</span><strong>0</strong></div>
	          <div><span>RUNS</span><strong>0</strong></div>
	          <div><span>SIGNAL</span><strong>0</strong></div>
	        </div>
	        <div class="zero-day-mode-grid" id="zeroDayModeGrid" aria-label="Zero-day modes">
	          <article class="zero-day-mode-card" data-zero-day-mode-card="single">
	            <div class="zero-day-mode-head">
	              <span class="badge">SINGLE</span>
	              <strong>싱글모드</strong>
	            </div>
	            <p>안정적인 단독 침투입니다. 기본 흐름을 익히고 개인 기록과 보상 회수에 집중합니다.</p>
	            <div class="zero-day-mode-meta">
	              <span>개인 기록 중심</span>
	              <span>최고 깊이</span>
	              <span>최대 보상</span>
	            </div>
	            <button type="button" data-zero-day-start="single">싱글 침투 시작</button>
	          </article>
	          <article class="zero-day-mode-card" data-zero-day-mode-card="compete">
	            <div class="zero-day-mode-head">
	              <span class="badge">COMPETE</span>
	              <strong>경쟁모드</strong>
	            </div>
	            <p>점수형 침투입니다. 탐지 압박이 높지만 깊이, 속도, 회수 신호가 더 큰 점수로 환산됩니다.</p>
	            <div class="zero-day-mode-meta">
	              <span>점수 경쟁</span>
	              <span>탐지 압박 증가</span>
	              <span>고효율 회수</span>
	            </div>
	            <button type="button" data-zero-day-start="compete">경쟁 침투 시작</button>
	          </article>
	        </div>
	        <div class="zero-day-run-panel" id="zeroDayRunPanel"></div>
	      </section>
	      <section class="lab-panel" data-lab-panel="coming">
	        <span class="badge">ROADMAP</span>
        <h3>확장 로드맵</h3>
        <p>LAB은 장기 도전과 다음 실험 콘텐츠를 준비하는 확장 허브입니다.</p>
        <div class="lab-preview-grid">
          <div><strong>BOSS RUSH</strong><span>연속 보스전</span></div>
	          <div><strong>CODE PRESET</strong><span>빌드 저장 슬롯</span></div>
          <div><strong>SEASON CODE</strong><span>시즌 한정 코드</span></div>
          <div><strong>ZERO-DAY SEASON</strong><span>시즌 규칙 확장</span></div>
        </div>
      </section>
    `;
    const labTabs = views.lab.querySelectorAll('[data-lab-tab]');
    const labPanels = views.lab.querySelectorAll('[data-lab-panel]');
    labTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.labTab || 'stage';
        labTabs.forEach(item => item.classList.toggle('active', item === btn));
        labPanels.forEach(panel => panel.classList.toggle('active', panel.dataset.labPanel === tab));
      });
    });
  }
  buildLab();
  try { document.dispatchEvent(new CustomEvent('hcsig:lab-ready')); } catch(e) {}

  function buildComing(){
    if(document.getElementById('comingContent')) return;
    views.coming.innerHTML = `
      <div class="lab-hero coming-hero" id="comingContent">
        <div>
          <div class="section-title">COMING SOON</div>
          <h2>준비 중</h2>
          <p>다음 업데이트에서 열릴 콘텐츠를 모아둡니다.</p>
        </div>
        <div class="lab-mode-chip">NEXT</div>
      </div>
      <section class="coming-panel">
        <span class="badge">QUEUE</span>
        <h3>예정 콘텐츠</h3>
	        <p>보스 러시, 코드 프리셋, 특수 서버 이벤트를 준비합니다.</p>
        <div class="lab-preview-grid coming-preview-grid">
          <div><strong>BOSS RUSH</strong><span>연속 도전</span></div>
	          <div><strong>CODE PRESET</strong><span>빌드 저장</span></div>
          <div><strong>PRESETS</strong><span>코드 조합 저장</span></div>
          <div><strong>SEASON CODE</strong><span>한정 코드</span></div>
        </div>
      </section>
    `;
  }
  buildComing();

  const nav = document.createElement('nav');
  nav.id = 'appMainNav';
  nav.className = 'mobile-tabs app-main-tabs';
  nav.innerHTML = `
    <button type="button" data-main-view="home">${label('mobileHome', 'HOME')}</button>
    <button type="button" data-main-view="codes">${label('mobileCodes', 'CODES')}</button>
    <button type="button" data-main-view="shop">${label('mobileShop', 'SHOP')}</button>
    <button type="button" data-main-view="lab">${label('mobileLab', 'LAB')}</button>
    <button type="button" data-main-view="coming">${label('mobileComing', 'COMING SOON')}</button>
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

  nav.querySelectorAll('[data-main-view]').forEach(btn => {
    btn.addEventListener('click', () => setView(btn.dataset.mainView));
  });

  document.addEventListener('hcsig:navigate-main', (event) => {
    const view = event.detail && event.detail.view;
    setView(view);
  });

  function syncLabels(){
    nav.querySelector('[data-main-view="home"]').textContent = label('mobileHome', 'HOME');
    nav.querySelector('[data-main-view="codes"]').textContent = label('mobileCodes', 'CODES');
    nav.querySelector('[data-main-view="shop"]').textContent = label('mobileShop', 'SHOP');
    nav.querySelector('[data-main-view="lab"]').textContent = label('mobileLab', 'LAB');
    nav.querySelector('[data-main-view="coming"]').textContent = label('mobileComing', 'COMING SOON');
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
      document.querySelectorAll('[data-main-view="lab"]').forEach(el => { el.textContent = t('mobileLab'); });
      document.querySelectorAll('[data-main-view="coming"]').forEach(el => { el.textContent = t('mobileComing'); });
    } catch (e) {}
  }
  window.addEventListener('hcsig:language-applied', syncMobileTabLabels);
  window.addEventListener('load', () => setTimeout(syncMobileTabLabels, 0));
})();

(function(){
  const VERSION = '3.0.0';
  const HEARTBEAT_MS = 60000;
  const ACTIVE_WINDOW_MS = 120000;
  const RANK_WRITE_MS = 60000;
  const PRESENCE_SAMPLE_MS = 30000;
  const HEADER_RENDER_MS = 3000;
  const LIVE_RENDER_MS = 120;
  const RANK_RENDER_MS = 100;
  const SYNC_SAMPLE_MS = 3000;
  const MAX_SYNC_MS = 999;
  const ALLOWED_STATUS = ['ONLINE', 'DEGRADED', 'MAINTENANCE', 'LOCAL MIRROR'];
  const ALLOWED_ACTIVITY = ['hack_success', 'extreme_success', 'stage_clear', 'epic_code_found', 'gpu_tier_up', 'cpu_tier_up', 'weekly_goal_claimed', 'weekly_all_clear'];
  const BOARDS = [
    { id: 'hack', label: 'HACK', metric: 'hackSuccessCount' },
    { id: 'stage', label: 'TOWER', metric: 'stageClearCount' },
    { id: 'extreme', label: 'EXTREME', metric: 'extremeHackSuccessCount' },
	    { id: 'credits', label: 'CREDITS', metric: 'creditsEarnedTotal' },
	    { id: 'power', label: 'POWER', metric: 'collectionPower' },
	    { id: 'weekly', label: 'WEEKLY', metric: 'weeklyScore' }
  ];

  const state = {
    ready: false,
    authUser: null,
    activeView: document.body.classList.contains('app-view-coming') ? 'coming' : 'home',
    moreTab: 'closed',
    config: defaultConfig(),
    announcements: [],
    nodes: fallbackNodes(),
    feed: fallbackFeed(),
    rankEntries: [],
    agents: '--',
    syncMs: '--',
    selectedBoard: 'hack',
    selectedLiveTab: 'broadcast',
    coreUnsubs: [],
    homeUnsubs: [],
    detailUnsubs: [],
    presenceUnsub: null,
    heartbeatTimer: null,
    presenceTimer: null,
    lastRankWriteAt: 0,
    rankTimer: null,
    lastActivityAt: {},
    lastErrorCode: '',
    lastHeaderRenderAt: 0,
    lastPresenceSampleAt: 0,
    lastHeartbeatAt: 0,
    lastSyncSampleAt: 0,
    renderTimers: Object.create(null)
  };

  const el = {};

  function bridge(){ return window.HCSIG_BRIDGE || null; }
  function auth(){ return window.HCSIG_AUTH || null; }
  function fb(){ return window.HCSIG_FB || null; }
  function db(){ return fb() && fb().db ? fb().db : null; }
  function canUseFirebase(){ return !!(window.HCSIG_FIREBASE_READY && db()); }
  function canUseWrites(){ return !!(canUseFirebase() && state.authUser && isLiveEnabled()); }
  function now(){ return Date.now(); }

  function getSaveData(){
    try {
      return bridge() && bridge().getCurrentSaveData ? bridge().getCurrentSaveData() : null;
    } catch(e) {
      return null;
    }
  }

  function getGameState(){
    const save = getSaveData();
    return save && save.state ? save.state : {};
  }

  function getUi(){
    const gameState = getGameState();
    return gameState.ui || {};
  }

  function isLiveEnabled(){
    const ui = getUi();
    return ui.liveNetworkEnabled !== false;
  }

  function getLang(){
    try {
      if (bridge() && bridge().getLanguage) return bridge().getLanguage();
    } catch(e) {}
    return document.documentElement.lang === 'en' ? 'en' : 'ko';
  }

  function text(ko, en){
    return getLang() === 'en' ? en : ko;
  }

  function escapeHtml(value){
    return String(value === null || value === undefined ? '' : value).replace(/[&<>"']/g, ch => ({
      '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
    }[ch]));
  }

  function toDate(value){
    if (!value) return null;
    try {
      if (value.toDate) return value.toDate();
      if (typeof value === 'number') return new Date(value);
      return new Date(value);
    } catch(e) {
      return null;
    }
  }

  function shortTime(value){
    const d = toDate(value);
    if (!d || Number.isNaN(d.getTime())) return '--:--';
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function defaultConfig(){
    return {
      status: 'ONLINE',
      motd: 'NODE ROUTE OPEN. Watch the trace feed.',
      eventTitle: 'LIVE NETWORK',
      maintenanceText: '',
      liveEnabled: true,
      rankSeasonLabel: 'SEASON 2.2'
    };
  }

  function clearRenderTimer(name){
    if (!state.renderTimers[name]) return;
    clearTimeout(state.renderTimers[name]);
    state.renderTimers[name] = null;
  }

  function queueRender(name, fn, delay){
    clearRenderTimer(name);
    state.renderTimers[name] = setTimeout(() => {
      state.renderTimers[name] = null;
      try { fn(); } catch(e) {}
    }, Math.max(0, delay || 0));
  }

  function scheduleHeaderRender(force){
    const run = () => {
      state.lastHeaderRenderAt = Date.now();
      renderHeader();
    };
    if (force || !state.lastHeaderRenderAt) {
      clearRenderTimer('header');
      run();
      return;
    }
    const elapsed = Date.now() - state.lastHeaderRenderAt;
    const wait = Math.max(0, HEADER_RENDER_MS - elapsed);
    queueRender('header', run, wait);
  }

  function schedulePulseRender(force){
    if (force) {
      clearRenderTimer('pulse');
      renderPulse();
      return;
    }
    queueRender('pulse', renderPulse, LIVE_RENDER_MS);
  }

  function scheduleBroadcastRender(force){
    if (force) {
      clearRenderTimer('broadcast');
      renderBroadcast();
      return;
    }
    queueRender('broadcast', renderBroadcast, LIVE_RENDER_MS);
  }

  function scheduleRankRender(force){
    const run = () => {
      renderRankTabs();
      renderRank();
    };
    if (force) {
      clearRenderTimer('rank');
      run();
      return;
    }
    queueRender('rank', run, RANK_RENDER_MS);
  }

  function markSyncSignal(sampleMs){
    const stamp = Date.now();
    if (!sampleMs || (stamp - state.lastSyncSampleAt < SYNC_SAMPLE_MS && state.syncMs !== '--')) return;
    const raw = Math.max(24, Math.min(MAX_SYNC_MS, Math.round(Number(sampleMs) || 0)));
    const prev = Number.parseInt(String(state.syncMs || '').replace(/[^\d]/g, ''), 10);
    const next = Number.isFinite(prev) ? Math.round((prev * 0.68) + (raw * 0.32)) : raw;
    state.syncMs = `${next}ms`;
    state.lastSyncSampleAt = stamp;
    scheduleHeaderRender(false);
  }

  function fallbackNodes(){
    return [
      { id:'gate-01', name:'GATE-01', status:'ONLINE', load:42, tag:'ENTRY NODE' },
      { id:'trace-02', name:'TRACE-02', status:'HIGH_LOAD', load:76, tag:'TRACE ROUTE' },
      { id:'vault-07', name:'VAULT-07', status:'UNSTABLE', load:64, tag:'DEEP CACHE' }
    ];
  }

  // v3.0.1 Foundation Prep 고정 공지 (Firebase 여부 무관하게 항상 상단 표시)
  const SEASON_1_START_TS = new Date('2026-05-01T00:00:00+09:00').getTime();
  const SEASON_1_END_TS = new Date('2026-05-31T23:59:59+09:00').getTime();
  const PINNED_ANNOUNCEMENTS = [
    {
      id: 'pwr-recalibration-300',
      title: text('3.0.0 PWR 재조정 안내', '3.0.0 PWR recalibration'),
      body: text(
        '3.0.0부터 CODE PWR 표기 기준이 새 보안 체계에 맞게 재조정됩니다. 기존 OPERATION급 CODE의 PWR이 낮아져 보일 수 있으나, 서버 보안값도 함께 재산정되므로 실제 체감 성능은 유지됩니다. 예: 기존 PWR 1000 → 신규 320 / 서버 보안 800~1200 → 250~380.',
        'Starting in 3.0.0, CODE PWR values are recalibrated for the new security scale. OPERATION-grade CODEs may display lower numbers, but server security values are recalculated as well, so practical performance should remain similar. Example: previous PWR 1000 → new 320 / server security 800–1200 → 250–380.'
      ),
      createdAt: 1745967600000, // 2026-04-30
      level: 'NOTICE'
    },
    {
      id: 'support-desk-302',
      title: text('🎁 SUPPORT DESK 오픈', '🎁 SUPPORT DESK Open'),
      body: text(
        'HCSiG 후원 시스템이 오픈되었습니다! SHOP 하단 또는 MORE→SUPPORT에서 Support Pack Start(₩1,500) / Plus(₩3,300)를 신청할 수 있습니다. 계좌 이체 후 입금자명을 입력하고 신청을 제출하면, 검토 후 REDEEM CODE가 발급됩니다. 코드를 MORE→SUPPORT→REDEEM에 입력하면 COIN, 에너지팩, 데일리 보너스 박스를 즉시 지급받습니다.',
        'HCSiG Support Desk is now open! Apply for Support Pack Start (₩1,500) / Plus (₩3,300) at the bottom of SHOP or via MORE→SUPPORT. Submit your claim with payer name after bank transfer — we\'ll review and issue a REDEEM CODE. Enter the code in MORE→SUPPORT→REDEEM to instantly receive COIN, Energy Packs, and Daily Bonus Boxes.'
      ),
      createdAt: 1745884800000, // 2026-04-29
      level: 'UPDATE'
    },
    {
      id: 'convenience-update-302',
      title: text('HCSiG v3.0.2 — Convenience Update', 'HCSiG v3.0.2 — Convenience Update'),
      body: text(
        '신규 아이템 타임 스와프(2h/5h/10h) · TRACE 앰플 · NULL 시드가 추가되었습니다. 초보자 한정 룰렛은 EVENT→WEEKLY CHALLENGE 안에서 확인할 수 있습니다. 일일 미션 3종에 COIN 보상이 추가되었습니다. Support Pack 수동 결제 시스템이 MORE→SUPPORT에 추가되었습니다.',
        'New items: Time Swap (2h/5h/10h), TRACE Ample, and NULL Seed were added. Beginner Roulette is available inside EVENT→WEEKLY CHALLENGE. COIN rewards were added to 3 daily missions. A manual Support Pack payment flow was also added in MORE→SUPPORT.'
      ),
      createdAt: 1745798400000, // 2026-04-28
      level: 'UPDATE'
    },
    {
      id: 'foundation-prep-301',
      title: text('HCSiG v3.0.1 — Foundation Prep Update', 'HCSiG v3.0.1 — Foundation Prep Update'),
      body: text(
        'HOME에 "오늘 할 일" 요약이 추가되었습니다. CODES 탭이 INVENTORY로 개편되어 CODES / ITEMS 두 패널로 분리되었습니다. ITEMS 패널에 AUTO-RUN 시스템이 추가되었습니다: 자동 스캔(10 COIN, 10초마다, 1시간)과 자동 해킹(15 COIN, 20초마다, 30분), 일일 3회, 에너지 팩 자동 소모 지원. DAILY 미션 완료 상태 저장이 강화되었습니다. 이번 업데이트는 3.0.0의 심화 시스템을 안정적으로 받기 위한 기반 패치입니다.',
        '"Today" summary added to HOME. CODES tab renamed to INVENTORY with CODES / ITEMS panels. AUTO-RUN system added to ITEMS panel: Auto Scan (10 COIN, every 10s, 1 hour) and Auto Hack (15 COIN, every 20s, 30 min), 3 uses/day, auto-consumes Energy Packs. Daily mission save stability improved. This update is a foundation patch preparing for future 3.0.x deep systems.'
      ),
      createdAt: 1745712000000, // 2026-04-27
      level: 'UPDATE'
    }
  ];

  function getSeasonAnnouncement(){
    const stamp = now();
    if (stamp < SEASON_1_START_TS) {
      return {
        id: 'season-1-staging',
        title: text('Season 1 staging', 'Season 1 staging'),
        body: text(
          '내일 자정, 시즌 1이 시작됩니다. Foundation Season은 한 달에 걸쳐 새로운 시스템이 단계적으로 가동됩니다. 첫날에는 시즌 PICKS와 기본 보상이 먼저 열립니다.',
          'Season 1 begins at midnight. Foundation Season unfolds over the month, with new systems activated in stages. On day one, Season PICKS and base rewards open first.'
        ),
        createdAt: SEASON_1_START_TS,
        level: 'SEASON'
      };
    }
    if (stamp <= SEASON_1_END_TS) {
      return {
        id: 'season-1-live',
        title: text('Season 1 active', 'Season 1 active'),
        body: text(
          '시즌 1이 시작되었습니다. 이번 시즌은 Foundation Season입니다. 오늘은 시즌 PICKS, 기본 보상, INVENTORY 구조가 먼저 열립니다. TRACE, ROM 복구, CODE 변형, CODEX 색상 수집은 시즌 진행 중 단계적으로 가동됩니다.',
          'Season 1 has begun. This is Foundation Season. Today opens the season PICKS, base rewards, and the INVENTORY structure first. TRACE, ROM recovery, CODE mutation, and CODEX color collection will unlock in stages during the season.'
        ),
        createdAt: SEASON_1_START_TS,
        level: 'SEASON'
      };
    }
    return {
      id: 'season-1-ended',
      title: text('Season 1 ended', 'Season 1 ended'),
      body: text(
        'Foundation Season이 종료되었습니다. Legacy 정산과 다음 시즌 신호를 기다리는 중입니다.',
        'Foundation Season has ended. Waiting for legacy settlement and the next season signal.'
      ),
      createdAt: SEASON_1_END_TS,
      level: 'SEASON'
    };
  }

  function fallbackAnnouncements(status){
    const liveStatus = normalizeStatus(status || 'LOCAL MIRROR');
    const seasonAnnouncement = getSeasonAnnouncement();
    if (liveStatus === 'ONLINE') {
      return [
        ...PINNED_ANNOUNCEMENTS,
        seasonAnnouncement,
        {
          id:'online-brief',
	          title:'WEEKLY OPS ACTIVE',
	          body:text('NEW CHALLENGE DEPLOYED · BONUS NODE 신호를 확인하세요.', 'NEW CHALLENGE DEPLOYED · Check the BONUS NODE signal.'),
          createdAt: now(),
          level:'ONLINE'
        }
      ];
    }
    if (liveStatus === 'DEGRADED') {
      return [
        ...PINNED_ANNOUNCEMENTS,
        seasonAnnouncement,
        {
          id:'degraded-brief',
          title:'Route Degraded',
          body:text('일부 네트워크 신호가 지연 중입니다. 게임 진행은 계속됩니다.', 'Some network signals are delayed. Game progress continues.'),
          createdAt: now(),
          level:'DEGRADED'
        }
      ];
    }
    if (liveStatus === 'MAINTENANCE') {
      return [
        ...PINNED_ANNOUNCEMENTS,
        seasonAnnouncement,
        {
          id:'maintenance-brief',
          title:'Maintenance Window',
          body:text('LIVE NET 점검 안내를 기다리는 중입니다.', 'Waiting for LIVE NET maintenance notice.'),
          createdAt: now(),
          level:'MAINT'
        }
      ];
    }
    return [
      ...PINNED_ANNOUNCEMENTS,
      seasonAnnouncement,
      {
        id:'local-brief',
        title:'LOCAL MIRROR',
        body:text('클라우드 로그인 또는 Firebase 신호를 기다리는 중입니다.', 'Waiting for cloud login or Firebase signal.'),
        createdAt: now(),
        level:'INFO'
      }
    ];
  }

  function fallbackFeed(){
    return [
      { id:'local-feed', type:'hack_success', displayName:'LOCAL NODE', displayMode:'callsign', value:0, refId:'mirror', createdAt: now() }
    ];
  }

  function hashString(input){
    let h = 0;
    const str = String(input || 'agent');
    for (let i = 0; i < str.length; i += 1) {
      h = ((h << 5) - h) + str.charCodeAt(i);
      h |= 0;
    }
    return Math.abs(h);
  }

  function makeCallsign(uid){
    const n = hashString(uid);
    const prefix = ['Agent', 'Trace', 'Node'][n % 3];
    if (prefix === 'Node') return `Node-${String((n % 255) + 1).padStart(2, '0')}${'ABCDEF'[n % 6]}`;
    return `${prefix}-${String(n % 10000).padStart(4, '0')}`;
  }

  function getDisplayContext(){
    const user = state.authUser || (auth() && auth().getUser ? auth().getUser() : null);
    const profile = auth() && auth().getProfile ? auth().getProfile() : null;
    const ui = getUi();
    const uid = user && user.uid ? user.uid : 'local';
    const mode = ui.liveNicknameMode === 'callsign' ? 'callsign' : 'nickname';
    const callsign = makeCallsign(uid);
    let displayName = callsign;
    if (mode === 'nickname') {
      displayName = (profile && profile.nickname) || (user && user.displayName) || callsign;
      if (!displayName || /@/.test(displayName)) displayName = callsign;
    }
    return {
      uid,
      displayName: String(displayName).slice(0, 24),
      displayMode: mode,
      callsign,
      avatarId: (profile && profile.avatarId) || 'terminal'
    };
  }

  function normalizeStatus(status){
    const raw = String(status || '').toUpperCase().replace(/_/g, ' ');
    return ALLOWED_STATUS.includes(raw) ? raw : 'ONLINE';
  }

  function nodeStatusLabel(status){
    return String(status || 'ONLINE').toUpperCase().replace(/_/g, ' ');
  }

  function ensureUi(){
    buildBroadcastHub();

    [
      'liveBroadcastStatus','liveBroadcastMotd','liveBroadcastAnnouncements','liveBroadcastNodes',
      'liveBroadcastFeed','liveRankTabs','liveRankList','liveRankSeason','homeLiveHint'
    ].forEach(id => { el[id] = document.getElementById(id); });
  }

  function buildBroadcastHub(){
    const liveMount = document.getElementById('liveNetPanelMount');
    const rankMount = document.getElementById('liveRankPanelMount');
    if (liveMount && !document.getElementById('liveBroadcastHub')) {
      liveMount.innerHTML = `
        <div class="live-broadcast-hero" id="liveBroadcastHub">
          <div>
            <span class="badge">NETWORK CONTROL</span>
            <h3>LIVE NET</h3>
            <p>공지, 노드 상태, 전역 피드를 짧게 확인합니다.</p>
          </div>
          <span class="live-status-pill" id="liveBroadcastStatus">LOCAL MIRROR</span>
        </div>
        <div class="live-broadcast-tabs" id="liveBroadcastTabs">
          <button type="button" class="active" data-live-tab="broadcast">Broadcast</button>
          <button type="button" data-live-tab="nodes">Nodes</button>
          <button type="button" data-live-tab="feed">Feed</button>
        </div>
        <section class="live-broadcast-panel active" data-live-panel="broadcast">
          <span class="badge">MOTD</span>
          <h3 id="liveBroadcastTitle">LIVE NETWORK</h3>
          <p class="live-motd" id="liveBroadcastMotd">LOCAL MIRROR active.</p>
          <div class="live-announcement-list" id="liveBroadcastAnnouncements"></div>
        </section>
        <section class="live-broadcast-panel" data-live-panel="nodes">
          <span class="badge">NODES</span>
          <h3>Node Status</h3>
          <div class="live-node-grid" id="liveBroadcastNodes"></div>
        </section>
        <section class="live-broadcast-panel" data-live-panel="feed">
          <span class="badge">TRACE FEED</span>
          <h3>Agent Activity</h3>
          <div class="live-feed-list" id="liveBroadcastFeed"></div>
        </section>
      `;
    }
    if (rankMount && !document.getElementById('liveRankHub')) {
      rankMount.innerHTML = `
        <section class="live-broadcast-panel active" id="liveRankHub">
          <span class="badge">SOFT RANK</span>
          <h3>Network Rank <small id="liveRankSeason">SEASON 2.2</small></h3>
          <p class="live-motd">검증 경쟁이 아닌 진행 공유용 소프트 랭킹입니다.</p>
          <div class="live-rank-tabs" id="liveRankTabs"></div>
          <div class="live-rank-list" id="liveRankList"></div>
        </section>
      `;
    }

    const tabs = document.querySelectorAll('#liveBroadcastTabs [data-live-tab]');
    const panels = document.querySelectorAll('#liveNetPanelMount [data-live-panel]');
    tabs.forEach(btn => {
      if (btn.__hcsigLiveBound) return;
      btn.__hcsigLiveBound = true;
      btn.addEventListener('click', () => {
        const tab = btn.dataset.liveTab || 'broadcast';
        if (state.selectedLiveTab === tab) return;
        state.selectedLiveTab = tab;
        tabs.forEach(item => item.classList.toggle('active', item === btn));
        panels.forEach(panel => panel.classList.toggle('active', panel.dataset.livePanel === tab));
        routeSubscriptions();
        scheduleBroadcastRender(true);
      });
    });
  }

  function renderAll(){
    ensureUi();
    scheduleHeaderRender(true);
    schedulePulseRender(true);
    scheduleBroadcastRender(true);
    scheduleRankRender(true);
  }

  function getLiveStatus(){
    if (!isLiveEnabled() || !canUseFirebase() || !state.authUser) return 'LOCAL MIRROR';
    if (state.config && state.config.liveEnabled === false) return 'MAINTENANCE';
    return normalizeStatus(state.config && state.config.status);
  }

  function renderHeader(){
    const status = getLiveStatus();
    if (el.homeLiveHint) {
      const agentText = status === 'LOCAL MIRROR' ? 'LOCAL MIRROR' : `AGENTS ${state.agents}`;
      const syncText = status === 'LOCAL MIRROR' ? '관제 신호 대기' : `SYNC ${state.syncMs}`;
      el.homeLiveHint.innerHTML = `<span>LIVE NET · ${escapeHtml(status)}</span><strong>${escapeHtml(agentText)} · ${escapeHtml(syncText)}</strong>`;
    }
  }

  function renderPulse(){
    renderHeader();
  }

  function renderBroadcast(){
    const status = getLiveStatus();
    const activeTab = state.selectedLiveTab || 'broadcast';
    const title = (state.config && state.config.eventTitle) || 'LIVE NETWORK';
    if (el.liveBroadcastStatus) el.liveBroadcastStatus.textContent = status;
    const titleEl = document.getElementById('liveBroadcastTitle');
    if (titleEl) titleEl.textContent = title;
    if (el.liveBroadcastMotd) el.liveBroadcastMotd.textContent = getMotd();
    if (el.liveRankSeason) el.liveRankSeason.textContent = (state.config && state.config.rankSeasonLabel) || 'SEASON 2.2';

    if (activeTab === 'broadcast' && el.liveBroadcastAnnouncements) {
      const announcements = getAnnouncementItems(status);
      el.liveBroadcastAnnouncements.innerHTML = announcements.slice(0, 8).map(item => `
        <article class="live-announcement">
          <span>${escapeHtml(item.level || 'INFO')} · ${escapeHtml(shortTime(item.createdAt))}</span>
          <strong>${escapeHtml(item.title || 'Broadcast')}</strong>
          <p>${escapeHtml(item.body || item.message || '')}</p>
        </article>
      `).join('');
    }

    if (activeTab === 'nodes' && el.liveBroadcastNodes) {
      el.liveBroadcastNodes.innerHTML = state.nodes.slice(0, 12).map(node => `
        <article class="live-node-card ${escapeHtml(String(node.status || '').toLowerCase())}">
          <div><strong>${escapeHtml(node.name || node.id || 'NODE')}</strong><span>${escapeHtml(node.tag || 'UPLINK')}</span></div>
          <em>${escapeHtml(nodeStatusLabel(node.status))}</em>
          <div class="live-node-load"><span style="width:${Math.max(0, Math.min(100, Number(node.load || 0)))}%"></span></div>
        </article>
      `).join('');
    }

    if (activeTab === 'feed' && el.liveBroadcastFeed) {
      el.liveBroadcastFeed.innerHTML = state.feed.slice(0, 20).map(item => {
        const line = formatFeedItem(item);
        return `
          <article class="live-feed-item">
            <span>${escapeHtml(shortTime(item.createdAt))}</span>
            <strong>${escapeHtml(line.title)}</strong>
            <p>${escapeHtml(line.meta)}</p>
          </article>
        `;
      }).join('');
    }
  }

  function getAnnouncementItems(status){
    const firebase = (state.announcements || []).filter(item => item && item.active !== false);
    const seasonAnnouncement = getSeasonAnnouncement();
    const pinned = PINNED_ANNOUNCEMENTS.filter(p => !firebase.some(f => f.id === p.id));
    const seasonal = firebase.some(f => f.id === seasonAnnouncement.id) ? [] : [seasonAnnouncement];
    return firebase.length ? [...pinned, ...seasonal, ...firebase] : fallbackAnnouncements(status || getLiveStatus());
  }

  function renderRankTabs(){
    if (!el.liveRankTabs || state.moreTab !== 'rank') return;
    el.liveRankTabs.innerHTML = BOARDS.map(board => `
      <button type="button" class="${board.id === state.selectedBoard ? 'active' : ''}" data-rank-board="${board.id}">${board.label}</button>
    `).join('');
    el.liveRankTabs.querySelectorAll('[data-rank-board]').forEach(btn => {
      btn.addEventListener('click', () => {
        const board = btn.dataset.rankBoard || 'hack';
        if (state.selectedBoard === board) return;
        state.selectedBoard = board;
        renderRankTabs();
        subscribeRankBoard();
      });
    });
  }

  function renderRank(){
    if (!el.liveRankList || state.moreTab !== 'rank') return;
    const entries = state.rankEntries || [];
    if (!entries.length) {
      el.liveRankList.innerHTML = `<div class="live-empty">${escapeHtml(text('랭킹 신호 대기 중', 'Waiting for rank signal'))}</div>`;
      return;
    }
    el.liveRankList.innerHTML = entries.slice(0, 10).map((entry, idx) => `
      <article class="live-rank-entry">
        <span class="rank-no">${idx + 1}</span>
        <div>
          <strong>${escapeHtml(entry.displayName || 'Agent')}</strong>
          <p>${escapeHtml(entry.subtitle || '')}</p>
        </div>
        <em>${Number(entry.score || 0).toLocaleString()}</em>
      </article>
    `).join('');
  }

  function getMotd(){
    if (!isLiveEnabled()) return text('LIVE NET 비활성. LOCAL MIRROR로 표시됩니다.', 'LIVE NET disabled. Running LOCAL MIRROR.');
    if (!canUseFirebase()) return text('Firebase 신호 대기 중. LOCAL MIRROR로 계속 진행합니다.', 'Waiting for Firebase signal. LOCAL MIRROR continues.');
    if (!state.authUser) return text('클라우드 로그인 후 LIVE NET에 접속합니다.', 'Log in to cloud account to open LIVE NET.');
    if (state.config && normalizeStatus(state.config.status) === 'MAINTENANCE' && state.config.maintenanceText) return state.config.maintenanceText;
    return (state.config && state.config.motd) || defaultConfig().motd;
  }

  function formatFeedItem(item){
    const name = item.displayName || 'Agent';
    const value = Number(item.value || 0);
    const ref = item.refId || '';
    switch (item.type) {
      case 'extreme_success':
        return { title: `${name} broke EXTREME`, meta: value ? `reward ${value.toLocaleString()} credits` : 'high-risk route cleared' };
	      case 'stage_clear':
	        return { title: `${name} cleared DATA TOWER ${String(value || '').padStart(3, '0')}`, meta: ref || 'data tower route updated' };
      case 'epic_code_found':
        return { title: `${name} found rare code`, meta: ref || 'EPIC+ signature acquired' };
      case 'gpu_tier_up':
        return { title: `${name} boosted GPU T${value}`, meta: 'render pipeline upgraded' };
	      case 'cpu_tier_up':
	        return { title: `${name} tuned CPU T${value}`, meta: 'control pipeline upgraded' };
	      case 'weekly_goal_claimed':
	        return { title: `${name} claimed WEEKLY OPS`, meta: value ? `weekly score +${value}` : 'weekly objective claimed' };
	      case 'weekly_all_clear':
	        return { title: `${name} completed WEEKLY OPS`, meta: 'weekly badge transmitted' };
      case 'hack_success':
      default:
        return { title: `${name} hacked a node`, meta: value ? `reward ${value.toLocaleString()} credits` : 'server access confirmed' };
    }
  }

  function mapDocs(snapshot){
    const list = [];
    snapshot.forEach(doc => {
      const data = doc.data() || {};
      list.push(Object.assign({ id: doc.id }, data));
    });
    return list;
  }

  function stop(listName){
    const list = state[listName] || [];
    while (list.length) {
      const unsub = list.pop();
      try { unsub(); } catch(e) {}
    }
  }

  function stopAllLive(){
    stop('coreUnsubs');
    stop('homeUnsubs');
    stop('detailUnsubs');
    stopPresenceWatcher();
  }

  function stopDetailType(type){
    const keep = [];
    (state.detailUnsubs || []).forEach(unsub => {
      if (unsub && unsub.__type === type) {
        try { unsub(); } catch(e) {}
      } else if (unsub) {
        keep.push(unsub);
      }
    });
    state.detailUnsubs = keep;
  }

  function hasDetailType(type){
    return !!(state.detailUnsubs || []).find(unsub => unsub && unsub.__type === type);
  }

  function pushDetailSub(type, unsub){
    if (!unsub) return;
    unsub.__type = type;
    state.detailUnsubs.push(unsub);
  }

  function subscribeCore(){
    if (!canUseFirebase() || state.coreUnsubs.length) return;
    let started = performance.now ? performance.now() : Date.now();
    const configUnsub = db().collection('liveConfig').doc('main').onSnapshot(snap => {
      const nowSample = performance.now ? performance.now() : Date.now();
      markSyncSignal(nowSample - started);
      started = nowSample;
      if (snap.exists) state.config = Object.assign(defaultConfig(), snap.data() || {});
      else state.config = defaultConfig();
      scheduleHeaderRender(true);
      schedulePulseRender(false);
      scheduleBroadcastRender(false);
      scheduleRankRender(false);
    }, err => handleLiveError(err));
    state.coreUnsubs.push(configUnsub);
    startPresenceWatcher();
  }

  function subscribeHome(){
    stop('homeUnsubs');
  }

  function subscribeDetail(){
    if (!canUseFirebase() || (state.moreTab !== 'live' && state.moreTab !== 'rank')) return;
    if (state.moreTab === 'rank') {
      subscribeRankBoard();
      return;
    }
    const tab = state.selectedLiveTab || 'broadcast';
    if (tab === 'broadcast') {
      stopDetailType('nodes');
      stopDetailType('feed');
      stopDetailType('rank');
      if (!hasDetailType('broadcast')) {
        let annStarted = performance.now ? performance.now() : Date.now();
        pushDetailSub('broadcast', db().collection('liveAnnouncements').orderBy('createdAt', 'desc').limit(8).onSnapshot(snap => {
          const sampleNow = performance.now ? performance.now() : Date.now();
          markSyncSignal(sampleNow - annStarted);
          annStarted = sampleNow;
          state.announcements = mapDocs(snap).filter(item => item.active !== false);
          scheduleBroadcastRender(false);
        }, err => handleLiveError(err)));
      }
      return;
    }
    stopDetailType('broadcast');
    if (tab === 'nodes') {
      stopDetailType('feed');
      stopDetailType('rank');
      if (!hasDetailType('nodes')) {
        let nodeStarted = performance.now ? performance.now() : Date.now();
        pushDetailSub('nodes', db().collection('liveServerNodes').orderBy('priority', 'asc').limit(12).onSnapshot(snap => {
          const sampleNow = performance.now ? performance.now() : Date.now();
          markSyncSignal(sampleNow - nodeStarted);
          nodeStarted = sampleNow;
          state.nodes = mapDocs(snap);
          if (!state.nodes.length) state.nodes = fallbackNodes();
          scheduleBroadcastRender(false);
        }, err => handleLiveError(err)));
      }
      return;
    }
    stopDetailType('nodes');
    if (tab === 'feed') {
      stopDetailType('rank');
      if (!hasDetailType('feed')) {
        let feedStarted = performance.now ? performance.now() : Date.now();
        pushDetailSub('feed', db().collection('liveFeed').orderBy('createdAt', 'desc').limit(20).onSnapshot(snap => {
          const sampleNow = performance.now ? performance.now() : Date.now();
          markSyncSignal(sampleNow - feedStarted);
          feedStarted = sampleNow;
          state.feed = mapDocs(snap);
          if (!state.feed.length) state.feed = fallbackFeed();
          scheduleBroadcastRender(false);
        }, err => handleLiveError(err)));
      }
      return;
    }
    stopDetailType('feed');
    subscribeRankBoard();
  }

  function subscribeRankBoard(){
    if (!canUseFirebase() || state.moreTab !== 'rank') {
      stopDetailType('rank');
      return;
    }
    stopDetailType('broadcast');
    stopDetailType('nodes');
    stopDetailType('feed');
    stopDetailType('rank');
    const board = BOARDS.find(item => item.id === state.selectedBoard) || BOARDS[0];
    let rankStarted = performance.now ? performance.now() : Date.now();
    const unsub = db().collection('leaderboards').doc(board.id).collection('entries')
      .orderBy('score', 'desc')
      .limit(10)
      .onSnapshot(snap => {
        const sampleNow = performance.now ? performance.now() : Date.now();
        markSyncSignal(sampleNow - rankStarted);
        rankStarted = sampleNow;
        state.rankEntries = mapDocs(snap);
        scheduleRankRender(false);
      }, err => handleLiveError(err));
    pushDetailSub('rank', unsub);
  }

  function routeSubscriptions(){
    if (!isLiveEnabled() || !canUseFirebase()) {
      stopAllLive();
      scheduleHeaderRender(true);
      schedulePulseRender(true);
      scheduleBroadcastRender(true);
      scheduleRankRender(true);
      return;
    }
    subscribeCore();
    stop('homeUnsubs');
    if (state.moreTab === 'live' || state.moreTab === 'rank') {
      subscribeDetail();
    } else {
      stop('detailUnsubs');
    }
  }

  function startPresenceWatcher(){
    if (state.presenceTimer) return;
    subscribePresenceCount(true);
    state.presenceTimer = setInterval(() => subscribePresenceCount(false), PRESENCE_SAMPLE_MS);
  }

  function stopPresenceWatcher(){
    if (state.presenceUnsub) {
      try { state.presenceUnsub(); } catch(e) {}
      state.presenceUnsub = null;
    }
    if (state.presenceTimer) {
      clearInterval(state.presenceTimer);
      state.presenceTimer = null;
    }
  }

  function subscribePresenceCount(force){
    if (!canUseFirebase() || !isLiveEnabled()) return;
    const stamp = Date.now();
    if (!force && state.lastPresenceSampleAt && (stamp - state.lastPresenceSampleAt < PRESENCE_SAMPLE_MS)) return;
    state.lastPresenceSampleAt = stamp;
    if (state.presenceUnsub) {
      try { state.presenceUnsub(); } catch(e) {}
      state.presenceUnsub = null;
    }
    const threshold = Date.now() - ACTIVE_WINDOW_MS;
    state.presenceUnsub = db().collection('livePresence')
      .where('lastSeenMs', '>=', threshold)
      .orderBy('lastSeenMs', 'desc')
      .limit(200)
      .onSnapshot(snap => {
        state.agents = String(snap.size || 0);
        scheduleHeaderRender(false);
      }, err => handleLiveError(err));
  }

  function startHeartbeat(){
    stopHeartbeat();
    if (!canUseWrites()) {
      scheduleHeaderRender(true);
      schedulePulseRender(false);
      scheduleBroadcastRender(false);
      return;
    }
    updateHeartbeat(true);
    state.heartbeatTimer = setInterval(() => updateHeartbeat(false), HEARTBEAT_MS);
  }

  function stopHeartbeat(){
    if (state.heartbeatTimer) {
      clearInterval(state.heartbeatTimer);
      state.heartbeatTimer = null;
    }
  }

  async function updateHeartbeat(force){
    if (!canUseWrites()) return;
    const stamp = Date.now();
    if (!force && state.lastHeartbeatAt && (stamp - state.lastHeartbeatAt < HEARTBEAT_MS - 1500)) return;
    state.lastHeartbeatAt = stamp;
    const display = getDisplayContext();
    try {
      await db().collection('livePresence').doc(display.uid).set({
        uid: display.uid,
        displayName: display.displayName,
        displayMode: display.displayMode,
        avatarId: display.avatarId,
        status: 'active',
        version: VERSION,
        lastSeenAt: firebase.firestore.FieldValue.serverTimestamp(),
        lastSeenMs: Date.now()
      }, { merge: true });
    } catch(err) {
      handleLiveError(err);
    }
  }

  function safeEventDetail(detail){
    const raw = detail || {};
    const type = String(raw.type || '');
    if (!ALLOWED_ACTIVITY.includes(type)) return null;
    const value = Math.max(0, Math.min(999999999, Math.round(Number(raw.value || 0))));
    return {
      type,
      value,
      refId: String(raw.refId || raw.serverId || raw.stageId || raw.codeId || '').slice(0, 64)
    };
  }

  async function writeActivity(detail){
    const event = safeEventDetail(detail);
    if (!event || !canUseWrites()) return;
    const key = event.type + ':' + event.refId;
    const last = state.lastActivityAt[key] || 0;
    if (Date.now() - last < 8000) return;
    state.lastActivityAt[key] = Date.now();
    const display = getDisplayContext();
    try {
      await db().collection('liveFeed').add({
        type: event.type,
        uid: display.uid,
        displayName: display.displayName,
        displayMode: display.displayMode,
        value: event.value,
        refId: event.refId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      scheduleRankPush();
    } catch(err) {
      handleLiveError(err);
    }
  }

  function computeScores(){
    const save = getSaveData() || {};
    const gameState = save.state || {};
    const stats = gameState.stats || {};
    const ownedCodes = Array.isArray(save.ownedCodes) ? save.ownedCodes : [];
    const collectionPower = ownedCodes.reduce((sum, code) => sum + Math.max(0, Math.round(Number(code.power || 0))), 0);
    return {
      hack: Number(stats.hackSuccessCount || 0),
      stage: Number(stats.stageClearCount || 0),
      extreme: Number(stats.extremeHackSuccessCount || 0),
      credits: Number(stats.creditsEarnedTotal || 0),
	      power: collectionPower,
	      weekly: Number((gameState.weeklyChallenge && gameState.weeklyChallenge.score) || 0),
	      level: Number(gameState.level || 1),
      codeCount: ownedCodes.length
    };
  }

  function scheduleRankPush(){
    if (state.rankTimer) return;
    state.rankTimer = setTimeout(() => {
      state.rankTimer = null;
      pushLeaderboard();
    }, 1200);
  }

  async function pushLeaderboard(){
    if (!canUseWrites()) return;
    if (Date.now() - state.lastRankWriteAt < RANK_WRITE_MS) return;
    state.lastRankWriteAt = Date.now();
    const display = getDisplayContext();
    const scores = computeScores();
    const batch = db().batch();
    BOARDS.forEach(board => {
      const score = Math.max(0, Math.min(999999999, Math.round(Number(scores[board.id] || 0))));
      const ref = db().collection('leaderboards').doc(board.id).collection('entries').doc(display.uid);
      const subtitle = board.id === 'power'
        ? `Lv.${scores.level} · CODE ${scores.codeCount}`
        : `Lv.${scores.level} · ${board.label}`;
      batch.set(ref, {
        displayName: display.displayName,
        displayMode: display.displayMode,
        score,
        subtitle,
        avatarId: display.avatarId,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    });
    try {
      await batch.commit();
    } catch(err) {
      handleLiveError(err);
    }
  }

  function handleLiveError(err){
    const code = err && (err.code || err.message) ? (err.code || err.message) : String(err || '');
    state.syncMs = '--';
	    if (/permission|PERMISSION|Missing or insufficient permissions/.test(code)) {
	      state.config = Object.assign(defaultConfig(), {
	        status: 'LOCAL MIRROR',
	        motd: text('Firestore rules 적용 대기 중입니다. LOCAL MIRROR로 계속 진행합니다.', 'Waiting for Firestore rules. LOCAL MIRROR continues.')
	      });
	      state.announcements = [{
	        id: 'rules-locked',
	        title: 'RULES LOCKED',
	        body: text('Firestore rules 배포 후 LIVE NET 신호가 열립니다.', 'LIVE NET opens after Firestore rules are deployed.'),
	        createdAt: now(),
	        level: 'LOCKED'
	      }];
	      state.nodes = fallbackNodes();
	      state.feed = [{
	        id: 'rules-feed',
	        type: 'hack_success',
	        displayName: 'LOCAL MIRROR',
	        displayMode: 'callsign',
	        value: 0,
	        refId: 'rules pending',
	        createdAt: now()
	      }];
	      state.rankEntries = [];
	      state.agents = '--';
	    }
    scheduleHeaderRender(true);
    schedulePulseRender(true);
    scheduleBroadcastRender(true);
    scheduleRankRender(true);
    if (state.lastErrorCode !== code && !/permission|PERMISSION|Missing or insufficient permissions/.test(code)) {
      state.lastErrorCode = code;
      try { console.warn('[HCSIG LiveOps]', code); } catch(e) {}
    }
  }

  function handleAuthChanged(user){
    state.authUser = user || (auth() && auth().getUser ? auth().getUser() : null);
    startHeartbeat();
    routeSubscriptions();
    scheduleHeaderRender(true);
    schedulePulseRender(false);
    scheduleBroadcastRender(false);
    scheduleRankRender(false);
  }

  function handleReady(){
    state.ready = true;
    ensureUi();
    state.authUser = auth() && auth().getUser ? auth().getUser() : state.authUser;
    routeSubscriptions();
    startHeartbeat();
    renderAll();
  }

  function handleSave(){
    if (!isLiveEnabled()) {
      stopAllLive();
      stopHeartbeat();
    } else {
      routeSubscriptions();
      startHeartbeat();
      scheduleRankPush();
    }
    scheduleHeaderRender(true);
    schedulePulseRender(false);
    scheduleBroadcastRender(false);
    scheduleRankRender(false);
  }

  function setActiveView(view){
    state.activeView = view === 'coming' ? 'coming' : view;
    ensureUi();
    routeSubscriptions();
    scheduleHeaderRender(true);
    schedulePulseRender(true);
    scheduleBroadcastRender(true);
    scheduleRankRender(true);
  }

  function setMoreTab(detail){
    state.moreTab = detail && detail.open ? (detail.tab || 'closed') : 'closed';
    ensureUi();
    routeSubscriptions();
    scheduleHeaderRender(true);
    scheduleBroadcastRender(true);
    scheduleRankRender(true);
  }

  function inferViewFromBody(){
    if (document.body.classList.contains('app-view-coming')) return 'coming';
    if (document.body.classList.contains('app-view-lab')) return 'lab';
    if (document.body.classList.contains('app-view-shop')) return 'shop';
    if (document.body.classList.contains('app-view-codes')) return 'codes';
    return 'home';
  }

  function bindEvents(){
    window.addEventListener('hcsig:ready', handleReady);
    window.addEventListener('hcsig:auth-changed', event => handleAuthChanged(event.detail && event.detail.user));
    window.addEventListener('hcsig:save', handleSave);
    window.addEventListener('hcsig:activity', event => writeActivity(event.detail));
    window.addEventListener('hcsig:language-applied', renderAll);
    document.addEventListener('hcsig:main-view', event => setActiveView(event.detail && event.detail.view));
    document.addEventListener('hcsig:more-tab', event => setMoreTab(event.detail || {}));
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        updateHeartbeat(true);
        subscribePresenceCount(true);
      }
    });
    window.addEventListener('pageshow', () => {
      updateHeartbeat(true);
      routeSubscriptions();
    });
    window.addEventListener('beforeunload', () => {
      updateHeartbeat(true);
    });

    try {
      const observer = new MutationObserver(() => {
        const view = inferViewFromBody();
        if (view !== state.activeView) setActiveView(view);
      });
      observer.observe(document.body, { attributes:true, attributeFilter:['class'] });
    } catch(e) {}
  }

  function init(){
    bindEvents();
    ensureUi();
    renderAll();
    setTimeout(() => {
      ensureUi();
      state.activeView = inferViewFromBody();
      state.authUser = auth() && auth().getUser ? auth().getUser() : state.authUser;
      if (bridge()) handleReady();
      else renderAll();
    }, 0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once:true });
  } else {
    init();
  }
})();

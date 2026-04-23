(function(){
  const VERSION = '2.2.2';
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
    return String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({
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

  function fallbackAnnouncements(status){
    const liveStatus = normalizeStatus(status || 'LOCAL MIRROR');
    if (liveStatus === 'ONLINE') {
      return [
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
    const header = document.querySelector('header');
    if (header && !document.getElementById('liveNetStrip')) {
      const strip = document.createElement('div');
      strip.id = 'liveNetStrip';
      strip.className = 'live-net-strip is-local';
      strip.innerHTML = `
        <span class="live-dot" aria-hidden="true"></span>
        <strong id="liveNetStatus">LOCAL MIRROR</strong>
        <span id="liveNetAgents">AGENTS --</span>
        <span id="liveNetSync">SYNC --</span>
      `;
      header.appendChild(strip);
    }

    const home = document.getElementById('appViewHome');
    if (home && !document.getElementById('livePulseCard')) {
      const card = document.createElement('section');
      card.id = 'livePulseCard';
      card.className = 'live-pulse-card';
      card.innerHTML = `
        <div class="live-section-head">
          <div>
            <span class="section-title">NETWORK PULSE</span>
            <h3 id="livePulseTitle">LIVE NET</h3>
          </div>
          <span class="live-status-pill" id="livePulseStatus">LOCAL MIRROR</span>
        </div>
        <p class="live-motd" id="livePulseMotd">LOCAL MIRROR active.</p>
        <div class="live-node-row" id="livePulseNodes"></div>
        <div class="live-mini-feed" id="livePulseFeed"></div>
	      `;
	      const actionBox = document.getElementById('titleActions') ? document.getElementById('titleActions').closest('.stat-box') : null;
	      if (actionBox && actionBox.parentElement === home) actionBox.insertAdjacentElement('afterend', card);
	      else home.appendChild(card);
	    }

    buildBroadcastHub();

    [
      'liveNetStrip','liveNetStatus','liveNetAgents','liveNetSync',
      'livePulseCard','livePulseStatus','livePulseMotd','livePulseNodes','livePulseFeed',
      'liveBroadcastStatus','liveBroadcastMotd','liveBroadcastAnnouncements','liveBroadcastNodes',
      'liveBroadcastFeed','liveRankTabs','liveRankList','liveRankSeason'
    ].forEach(id => { el[id] = document.getElementById(id); });
  }

  function buildBroadcastHub(){
    const coming = document.getElementById('appViewComing');
    if (!coming || document.getElementById('liveBroadcastHub')) return;
    coming.innerHTML = `
      <div class="lab-hero coming-hero live-broadcast-hero" id="liveBroadcastHub">
        <div>
          <div class="section-title">COMING SOON</div>
          <h2>Network Broadcast</h2>
          <p>공식 노드 신호, 전역 피드, 소프트 랭킹을 이곳에서 확인합니다.</p>
        </div>
        <div class="lab-mode-chip" id="liveBroadcastStatus">LOCAL MIRROR</div>
      </div>
      <div class="live-broadcast-tabs" id="liveBroadcastTabs">
        <button type="button" class="active" data-live-tab="broadcast">Broadcast</button>
        <button type="button" data-live-tab="nodes">Nodes</button>
        <button type="button" data-live-tab="feed">Feed</button>
        <button type="button" data-live-tab="rank">Rank</button>
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
      <section class="live-broadcast-panel" data-live-panel="rank">
        <span class="badge">SOFT RANK</span>
        <h3>Network Rank <small id="liveRankSeason">SEASON 2.2</small></h3>
        <div class="live-rank-tabs" id="liveRankTabs"></div>
        <div class="live-rank-list" id="liveRankList"></div>
      </section>
    `;

    const tabs = coming.querySelectorAll('[data-live-tab]');
    const panels = coming.querySelectorAll('[data-live-panel]');
    tabs.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.liveTab || 'broadcast';
        if (state.selectedLiveTab === tab) return;
        state.selectedLiveTab = tab;
        tabs.forEach(item => item.classList.toggle('active', item === btn));
        panels.forEach(panel => panel.classList.toggle('active', panel.dataset.livePanel === tab));
        routeSubscriptions();
        if (tab === 'rank') scheduleRankRender(true);
        else scheduleBroadcastRender(true);
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
    if (el.liveNetStrip) {
      el.liveNetStrip.classList.remove('is-online','is-degraded','is-maintenance','is-local');
      const cls = status === 'ONLINE' ? 'is-online' : (status === 'DEGRADED' ? 'is-degraded' : (status === 'MAINTENANCE' ? 'is-maintenance' : 'is-local'));
      el.liveNetStrip.classList.add(cls);
    }
    if (el.liveNetStatus) el.liveNetStatus.textContent = status;
    if (el.liveNetAgents) el.liveNetAgents.textContent = `AGENTS ${status === 'LOCAL MIRROR' ? '--' : state.agents}`;
    if (el.liveNetSync) el.liveNetSync.textContent = `SYNC ${status === 'LOCAL MIRROR' ? '--' : state.syncMs}`;
  }

  function renderPulse(){
    if (el.livePulseStatus) el.livePulseStatus.textContent = getLiveStatus();
    if (el.livePulseMotd) el.livePulseMotd.textContent = getMotd();
    if (el.livePulseNodes) {
      el.livePulseNodes.innerHTML = state.nodes.slice(0, 3).map(node => `
        <div class="live-node-mini">
          <strong>${escapeHtml(node.name || node.id || 'NODE')}</strong>
          <span>${escapeHtml(nodeStatusLabel(node.status))}</span>
        </div>
      `).join('');
    }
    if (el.livePulseFeed) {
      el.livePulseFeed.innerHTML = state.feed.slice(0, 3).map(item => {
        const line = formatFeedItem(item);
        return `<div><strong>${escapeHtml(line.title)}</strong><span>${escapeHtml(line.meta)}</span></div>`;
      }).join('');
    }
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
    const items = (state.announcements || []).filter(item => item && item.active !== false);
    return items.length ? items : fallbackAnnouncements(status || getLiveStatus());
  }

  function renderRankTabs(){
    if (!el.liveRankTabs || state.selectedLiveTab !== 'rank') return;
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
    if (!el.liveRankList || state.selectedLiveTab !== 'rank') return;
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
    if (!canUseFirebase() || state.homeUnsubs.length || state.activeView === 'coming') return;
    let annStarted = performance.now ? performance.now() : Date.now();
    state.homeUnsubs.push(db().collection('liveAnnouncements').orderBy('createdAt', 'desc').limit(2).onSnapshot(snap => {
      const sampleNow = performance.now ? performance.now() : Date.now();
      markSyncSignal(sampleNow - annStarted);
      annStarted = sampleNow;
      state.announcements = mapDocs(snap).filter(item => item.active !== false);
      schedulePulseRender(false);
    }, err => handleLiveError(err)));
    let nodeStarted = performance.now ? performance.now() : Date.now();
    state.homeUnsubs.push(db().collection('liveServerNodes').orderBy('priority', 'asc').limit(3).onSnapshot(snap => {
      const sampleNow = performance.now ? performance.now() : Date.now();
      markSyncSignal(sampleNow - nodeStarted);
      nodeStarted = sampleNow;
      state.nodes = mapDocs(snap);
      if (!state.nodes.length) state.nodes = fallbackNodes();
      schedulePulseRender(false);
    }, err => handleLiveError(err)));
    let feedStarted = performance.now ? performance.now() : Date.now();
    state.homeUnsubs.push(db().collection('liveFeed').orderBy('createdAt', 'desc').limit(3).onSnapshot(snap => {
      const sampleNow = performance.now ? performance.now() : Date.now();
      markSyncSignal(sampleNow - feedStarted);
      feedStarted = sampleNow;
      state.feed = mapDocs(snap);
      if (!state.feed.length) state.feed = fallbackFeed();
      schedulePulseRender(false);
    }, err => handleLiveError(err)));
  }

  function subscribeDetail(){
    if (!canUseFirebase() || state.activeView !== 'coming') return;
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
    if (!canUseFirebase() || state.activeView !== 'coming' || state.selectedLiveTab !== 'rank') {
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
    if (state.activeView === 'coming') {
      stop('homeUnsubs');
      subscribeDetail();
    } else {
      stop('detailUnsubs');
      subscribeHome();
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

/**
 * HCSiG BGM Manager — bgm.js
 * v3.0.2c
 *
 * ── 컨텍스트 ─────────────────────────────────────────────────────────────────
 *  'main'       메인/서브 풀  (Glitch Terminal · Terminal Lullaby ·
 *                              GLITCH_SAFFRON · TERMINAL VEINS) — 셔플 순환
 *  'tower'      데이터 타워   (CIRCUIT BLOOM 1 ↔ 2 교차)
 *  'shop_loam'  상점 크레딧·코인·OneDay  → Loam Console (loop)
 *  'shop_vanta' 상점 다이아·패키지       → CHECKOUT VANTA (loop)
 *
 * ── 페이드 규칙 ──────────────────────────────────────────────────────────────
 *  첫 번째 곡  : fadeIn 없음  / fadeOut 2 s
 *  이후 전환   : fadeIn 2 s   / fadeOut 2 s  (크로스페이드)
 *
 * ── 이벤트 (청취) ────────────────────────────────────────────────────────────
 *  hcsig:main-view  { view }      앱 뷰 전환 (app-ui.js)
 *  hcsig:lab-tab    { tab }       랩 서브탭  (app-ui.js)
 *  hcsig:shop-type  { shopType }  상점 탭    (app-core.js)
 *  hcsig:bgm-toggle { enabled }   외부 ON/OFF
 */
(function () {
  'use strict';

  /* ── 경로 ───────────────────────────────────────────────────────────────── */
  const BASE = 'ost/';
  const TRACKS = {
    'Glitch Terminal' : BASE + 'Glitch Terminal.mp3',
    'Terminal Lullaby': BASE + 'Terminal Lullaby.mp3',
    'GLITCH_SAFFRON'  : BASE + 'GLITCH_SAFFRON.mp3',
    'TERMINAL VEINS'  : BASE + 'TERMINAL VEINS.mp3',
    'CIRCUIT BLOOM 1' : BASE + 'CIRCUIT BLOOM.mp3',
    'CIRCUIT BLOOM 2' : BASE + 'CIRCUIT BLOOM 2.mp3',
    'Loam Console'    : BASE + 'SHOP PANEL/Loam Console.mp3',
    'CHECKOUT VANTA'  : BASE + 'SHOP PANEL/CHECKOUT VANTA.mp3'
  };

  const MAIN_POOL  = ['Glitch Terminal', 'Terminal Lullaby', 'GLITCH_SAFFRON', 'TERMINAL VEINS'];
  const TOWER_POOL = ['CIRCUIT BLOOM 1', 'CIRCUIT BLOOM 2'];

  const SHOP_TRACK = {
    credits : 'Loam Console',
    coin    : 'Loam Console',
    oneday  : 'Loam Console',
    diamond : 'CHECKOUT VANTA',
    packages: 'CHECKOUT VANTA'
  };

  const FADE_MS    = 2000;   // 페이드 길이 (ms)
  const TICK_MS    = 50;     // 볼륨 갱신 주기
  const TARGET_VOL = 0.65;   // 재생 최대 볼륨
  const LS_KEY     = 'HCSiG_BGM_enabled';

  /* ── 상태 ───────────────────────────────────────────────────────────────── */
  const st = {
    enabled      : loadEnabled(),
    started      : false,
    isFirstTrack : true,
    context      : null,
    mainPoolIdx  : 0,
    towerIdx     : 0,
    currentTrack : null,
    view         : 'home',
    labTab       : 'stage',
    shopType     : 'credits'
  };

  /* ── A/B 오디오 ─────────────────────────────────────────────────────────── */
  // live  = 현재 재생 중인 요소
  // spare = 다음 곡 로드 예정 요소
  let live  = makeAudio();
  let spare = makeAudio();

  let fadeOutTimer = null;
  let fadeInTimer  = null;
  let retryPending = null;

  let mainPool = shuffle([...MAIN_POOL]);

  /* ── 유틸 ───────────────────────────────────────────────────────────────── */
  function makeAudio() {
    const a = new Audio();
    a.volume  = 0;
    a.loop    = false;
    a.preload = 'auto';
    return a;
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function loadEnabled() {
    try {
      const v = localStorage.getItem(LS_KEY);
      return v === null ? true : v !== 'false';
    } catch(e) { return true; }
  }

  function saveEnabled(val) {
    try { localStorage.setItem(LS_KEY, String(val)); } catch(e) {}
  }

  /* ── 볼륨 페이드 ─────────────────────────────────────────────────────────── */
  function clearFadeTimers() {
    if (fadeOutTimer) { clearInterval(fadeOutTimer); fadeOutTimer = null; }
    if (fadeInTimer)  { clearInterval(fadeInTimer);  fadeInTimer  = null; }
  }

  /**
   * @param {HTMLAudioElement} audio
   * @param {number} from  시작 볼륨
   * @param {number} to    목표 볼륨
   * @param {number} ms    소요 시간 (ms)
   * @param {Function|null} onDone 완료 콜백
   * @returns {number} interval ID
   */
  function fadeTo(audio, from, to, ms, onDone) {
    if (ms <= 0) {
      audio.volume = Math.max(0, Math.min(1, to));
      if (onDone) onDone();
      return null;
    }
    const steps = Math.ceil(ms / TICK_MS);
    const delta = (to - from) / steps;
    let count = 0;
    const id = setInterval(() => {
      count++;
      const next = from + delta * count;
      audio.volume = Math.max(0, Math.min(1, next));
      if (count >= steps) {
        clearInterval(id);
        audio.volume = Math.max(0, Math.min(1, to));
        if (onDone) onDone();
      }
    }, TICK_MS);
    return id;
  }

  /* ── 다음 트랙 결정 ──────────────────────────────────────────────────────── */
  function advanceMainPool() {
    const prev = mainPool[st.mainPoolIdx];
    st.mainPoolIdx = (st.mainPoolIdx + 1) % mainPool.length;
    if (st.mainPoolIdx === 0) {
      // 풀 끝 → 재셔플, 직전 곡이 맨 앞에 오지 않도록 조정
      mainPool = shuffle([...MAIN_POOL]);
      if (mainPool[0] === prev && mainPool.length > 1) {
        [mainPool[0], mainPool[1]] = [mainPool[1], mainPool[0]];
      }
    }
    return mainPool[st.mainPoolIdx];
  }

  function advanceTowerPool() {
    st.towerIdx = 1 - st.towerIdx;   // 0 ↔ 1
    return TOWER_POOL[st.towerIdx];
  }

  function trackForContext(ctx) {
    switch (ctx) {
      case 'tower':      return TOWER_POOL[st.towerIdx];
      case 'shop_loam':  return 'Loam Console';
      case 'shop_vanta': return 'CHECKOUT VANTA';
      case 'main':
      default:           return mainPool[st.mainPoolIdx];
    }
  }

  /* ── 곡 종료 리스너 등록 ──────────────────────────────────────────────────── */
  // 반드시 live 가 올바른 요소로 스왑된 뒤 호출할 것
  function wireEndedListener() {
    live.onended = null;
    spare.onended = null;

    if (live.loop) return;   // 상점 loop → onended 불필요

    live.onended = () => {
      if (!st.enabled) return;
      const ctx = st.context;
      if (ctx === 'tower') {
        playTrack(advanceTowerPool(), true);
      } else if (ctx === 'main') {
        playTrack(advanceMainPool(), true);
      } else {
        // shop: loop=true 이므로 여기 도달 안 함 — 안전망
        live.currentTime = 0;
        live.play().catch(() => {});
      }
    };
  }

  /* ── 핵심: 트랙 재생 ─────────────────────────────────────────────────────── */
  function playTrack(trackName, withFadeIn) {
    if (!st.enabled) return;
    const src = TRACKS[trackName];
    if (!src) return;

    clearFadeTimers();

    // spare 에 새 곡 로드
    spare.oncanplaythrough = null;
    spare.pause();
    spare.src           = src;
    spare.currentTime   = 0;
    spare.volume        = 0;
    spare.loop          = false;

    function doPlay() {
      if (!st.enabled) return;

      spare.play().catch(() => {
        retryPending = { trackName, withFadeIn };
      });

      st.currentTrack = trackName;

      if (withFadeIn) {
        // ─ 크로스페이드 ─────────────────────────────────────────────────
        const oldLive = live;
        const oldVol  = oldLive.volume;

        fadeOutTimer = fadeTo(oldLive, oldVol, 0, FADE_MS, () => {
          oldLive.pause();
          oldLive.src = '';
        });
        // fadeIn은 별도 interval — 완료 후 next track 준비
        fadeInTimer = fadeTo(spare, 0, TARGET_VOL, FADE_MS, null);

        // 스왑 후, 페이드 완료 시점에 onended 등록
        // (아래 스왑이 동기로 일어나고, setInterval 콜백은 이후에 실행됨)
        setTimeout(() => {
          // 이 시점 live = 방금 페이드인 된 새 곡
          wireEndedListener();
        }, FADE_MS + TICK_MS * 2);

      } else {
        // ─ 첫 곡: 즉시 최대 볼륨, fadeIn 없음 ───────────────────────────
        spare.volume = TARGET_VOL;
        live.pause();
        live.src = '';
        // 스왑은 아래서 일어남 → setTimeout 으로 이후 등록
        setTimeout(() => wireEndedListener(), 0);
      }

      // ── A/B 스왑 (동기) ───────────────────────────────────────────────
      [live, spare] = [spare, live];
      st.isFirstTrack = false;

      // 상점 컨텍스트는 loop
      if (st.context === 'shop_loam' || st.context === 'shop_vanta') {
        live.loop = true;
      }
    }

    // 로드 후 재생
    spare.oncanplaythrough = () => {
      spare.oncanplaythrough = null;
      doPlay();
    };
    if (spare.readyState >= 3) {
      spare.oncanplaythrough = null;
      doPlay();
    }
    spare.load();
  }

  /* ── 컨텍스트 관리 ───────────────────────────────────────────────────────── */
  function resolveContext() {
    const { view, labTab, shopType } = st;

    if (view === 'shop') {
      const track = SHOP_TRACK[shopType] || 'Loam Console';
      return track === 'Loam Console' ? 'shop_loam' : 'shop_vanta';
    }
    if (view === 'lab' && labTab === 'stage') return 'tower';
    return 'main';
  }

  function applyContext(newCtx) {
    if (newCtx === st.context) return;

    const prevCtx    = st.context;
    st.context       = newCtx;

    if (!st.started) return;

    // 타워 진입 시 인덱스를 0으로 리셋
    if (newCtx === 'tower' && prevCtx !== 'tower') {
      st.towerIdx = 0;
    }

    // 목적 트랙
    const target = trackForContext(newCtx);

    // 같은 곡이 재생 중이고 멈추지 않았으면 loop 상태만 조정하고 유지
    if (st.currentTrack === target && !live.paused && live.volume > 0) {
      live.loop = (newCtx === 'shop_loam' || newCtx === 'shop_vanta');
      if (live.loop) { live.onended = null; } else { wireEndedListener(); }
      return;
    }

    playTrack(target, !st.isFirstTrack);
  }

  /* ── 공개 API ────────────────────────────────────────────────────────────── */
  const api = {
    /** 첫 인터랙션 후 BGM 시작 */
    start() {
      if (st.started) return;
      st.started = true;
      if (!st.enabled) return;
      st.context      = resolveContext();
      st.isFirstTrack = true;
      playTrack(trackForContext(st.context), false);
    },

    /** ON / OFF */
    setEnabled(val) {
      st.enabled = !!val;
      saveEnabled(st.enabled);
      if (!st.enabled) {
        clearFadeTimers();
        fadeTo(live, live.volume, 0, 600, () => {
          live.pause();
          live.src  = '';
          spare.src = '';
        });
      } else if (st.started) {
        st.isFirstTrack = true;
        st.currentTrack = null;
        st.context = null;   // 강제 재평가 — 같은 컨텍스트여도 재생 시작
        applyContext(resolveContext());
      }
      return st.enabled;
    },

    isEnabled() { return st.enabled; },

    /** 볼륨 (0~1) */
    setVolume(v) {
      const vol = Math.max(0, Math.min(1, v));
      if (!live.paused) live.volume = vol;
    },

    /** 외부에서 컨텍스트 직접 지정 */
    setContext(ctx) {
      if (['main','tower','shop_loam','shop_vanta'].includes(ctx)) {
        st.context = null;   // 강제 재평가
        applyContext(ctx);
      }
    }
  };

  window.HCSIG_BGM = api;

  /* ── 이벤트 청취 ─────────────────────────────────────────────────────────── */
  document.addEventListener('hcsig:main-view', (e) => {
    const v = e.detail && e.detail.view;
    if (!v) return;
    st.view = v;
    applyContext(resolveContext());
  });

  document.addEventListener('hcsig:lab-tab', (e) => {
    const tab = e.detail && e.detail.tab;
    if (!tab) return;
    st.labTab = tab;
    if (st.view === 'lab') applyContext(resolveContext());
  });

  document.addEventListener('hcsig:shop-type', (e) => {
    const shopType = e.detail && e.detail.shopType;
    if (!shopType) return;
    st.shopType = shopType;
    if (st.view === 'shop') applyContext(resolveContext());
  });

  document.addEventListener('hcsig:bgm-toggle', (e) => {
    api.setEnabled(!!(e.detail && e.detail.enabled !== false));
  });

  /* ── 첫 사용자 인터랙션 감지 → BGM 시작 ─────────────────────────────────── */
  function onFirstInteraction() {
    document.removeEventListener('click',      onFirstInteraction, true);
    document.removeEventListener('touchstart', onFirstInteraction, true);
    document.removeEventListener('keydown',    onFirstInteraction, true);
    if (retryPending) {
      const { trackName, withFadeIn } = retryPending;
      retryPending = null;
      playTrack(trackName, withFadeIn);
    } else {
      api.start();
    }
  }

  document.addEventListener('click',      onFirstInteraction, { capture: true, once: true });
  document.addEventListener('touchstart', onFirstInteraction, { capture: true, once: true });
  document.addEventListener('keydown',    onFirstInteraction, { capture: true, once: true });

})();

// ═══════════════════════════════════════════════════════════════
// HCSiG API Client  v1.0.0
// Cloudflare Workers D1 연동 — 세이브 동기화 / 마이그레이션 / 코드 교환
//
// 이 파일은 cloudSave.js와 나란히 동작합니다:
//   · cloudSave.js → Firestore (기존 백엔드, 계속 동작)
//   · hcsig-api.js → Cloudflare Workers + D1 (신규 백엔드)
//
// 로드 순서: cloudSave.js → hcsig-api.js (index.html에서 순서 보장)
// ═══════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const API_BASE = 'https://hcsig-api.hcsig.workers.dev';
  // 자동 저장 throttle: 30초 (Cloudflare Workers 요청 수 관리)
  const SYNC_THROTTLE_MS = 30_000;

  let _fbUser   = null;   // 원본 Firebase user 객체 (getIdToken() 있음)
  let _migrated = false;  // 이 세션에서 migrate 완료 여부
  let _lastSyncAt = 0;
  let _pendingSyncTimer = null;

  // ── Firebase ID Token ─────────────────────────────────────────────────────
  // auth.js 의 HCSIG_AUTH.getUser() 는 원본 Firebase User 를 반환함
  async function getIdToken() {
    const auth = window.HCSIG_AUTH;
    if (!auth) return null;
    const user = auth.getUser ? auth.getUser() : null;
    if (!user || typeof user.getIdToken !== 'function') return null;
    try {
      return await user.getIdToken(false);
    } catch (e) {
      console.warn('[HCSiG API] getIdToken error:', e);
      return null;
    }
  }

  // ── Fetch helpers ─────────────────────────────────────────────────────────
  async function apiPost(path, body) {
    const token = await getIdToken();
    if (!token) return { ok: false, err: '인증 토큰 없음 — 로그인이 필요합니다.' };
    try {
      const res = await fetch(API_BASE + path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (e) {
      return { ok: false, err: e.message || String(e) };
    }
  }

  async function apiGet(path) {
    const token = await getIdToken();
    if (!token) return { ok: false, err: '인증 토큰 없음 — 로그인이 필요합니다.' };
    try {
      const res = await fetch(API_BASE + path, {
        headers: { 'Authorization': 'Bearer ' + token },
      });
      return await res.json();
    } catch (e) {
      return { ok: false, err: e.message || String(e) };
    }
  }

  // ── 닉네임 동봉 — Firestore 프로필 닉네임을 sync 페이로드에 포함 ─────────
  function enrichWithNickname(saveData) {
    try {
      const auth = window.HCSIG_AUTH;
      const profile = auth && auth.getProfile ? auth.getProfile() : null;
      if (profile && typeof profile.nickname === 'string' && profile.nickname.trim()) {
        saveData.nickname = profile.nickname.trim();
      }
    } catch (e) { /* noop */ }
    return saveData;
  }

  // ── 서버 캐시 잔액 채택 — cashBalance 는 서버(D1)가 권위 ─────────────────
  async function adoptServerCash() {
    const res = await apiGet('/api/player/me');
    if (res.ok && res.data && typeof res.data.cashBalance === 'number') {
      const bridge = window.HCSIG_BRIDGE;
      if (bridge && typeof bridge.setCashBalance === 'function') {
        bridge.setCashBalance(res.data.cashBalance);
      }
    }
  }

  // ── Migration (최초 1회) ──────────────────────────────────────────────────
  async function tryMigrate() {
    if (_migrated) return;
    const bridge = window.HCSIG_BRIDGE;
    if (!bridge || typeof bridge.getCurrentSaveData !== 'function') return;

    const saveEnvelope = bridge.getCurrentSaveData();
    // saveEnvelope = { version, savedAt, state, ownedCodes, modifiers }
    const saveData = enrichWithNickname(saveEnvelope.state || saveEnvelope);

    const result = await apiPost('/api/migrate', { saveData });
    if (result.ok) {
      _migrated = true;
      if (result.data && result.data.migrated) {
        console.log('[HCSiG API] D1 마이그레이션 완료 →', result.data);
      } else {
        console.log('[HCSiG API] 이미 D1에 등록된 계정 — 마이그레이션 스킵');
      }
    } else {
      console.warn('[HCSiG API] 마이그레이션 실패:', result.err);
    }
  }

  // ── Save Sync (D1) ────────────────────────────────────────────────────────
  async function doSync(saveData) {
    const result = await apiPost('/api/player/sync', { saveData: enrichWithNickname(saveData) });
    if (!result.ok) {
      console.warn('[HCSiG API] sync 실패:', result.err);
    }
  }

  async function throttledSync(saveData, isCritical) {
    if (!_fbUser) return;

    if (isCritical) {
      // 중요 저장: 예약 취소 후 즉시 실행
      if (_pendingSyncTimer) {
        clearTimeout(_pendingSyncTimer);
        _pendingSyncTimer = null;
      }
      await doSync(saveData);
      _lastSyncAt = Date.now();
      return;
    }

    // 일반 autosave: throttle
    const elapsed = Date.now() - _lastSyncAt;
    if (elapsed >= SYNC_THROTTLE_MS) {
      await doSync(saveData);
      _lastSyncAt = Date.now();
    } else {
      if (_pendingSyncTimer) return;
      const waitMs = SYNC_THROTTLE_MS - elapsed;
      _pendingSyncTimer = setTimeout(async () => {
        _pendingSyncTimer = null;
        if (!_fbUser) return;
        await doSync(saveData);
        _lastSyncAt = Date.now();
      }, waitMs);
    }
  }

  // ── Redeem Code (Workers D1) ──────────────────────────────────────────────
  // 반환: { ok, data: { type, result } } | { ok: false, err, code }
  // code === 'NOT_FOUND' 이면 Firestore fallback 사용 가능
  async function redeemCode(rawCode) {
    return await apiPost('/api/cash/redeem', { code: rawCode });
  }

  // ── Event listeners ───────────────────────────────────────────────────────
  window.addEventListener('hcsig:auth-changed', async (event) => {
    const user = event.detail && event.detail.user;
    if (!user) {
      _fbUser   = null;
      _migrated = false;
      return;
    }

    // auth.js의 HCSIG_AUTH.getUser()가 원본 Firebase user를 반환
    // 이벤트 발생 직후에는 HCSIG_AUTH 설정이 완료돼 있음
    _fbUser = user; // uid/email 포함 (getIdToken은 HCSIG_AUTH.getUser()로)

    // HCSIG_BRIDGE 준비 대기 (init()에서 설정하므로 약간 지연 가능)
    setTimeout(async () => {
      if (!_migrated) await tryMigrate();
      // 마이그레이션 직후가 아니라면 서버 캐시 잔액을 채택 (서버 권위)
      await adoptServerCash();
    }, 800);
  });

  window.addEventListener('hcsig:save', async (event) => {
    if (!_fbUser) return;
    const detail     = event.detail || {};
    const isSilent   = !!detail.silent;
    const isCritical = !!detail.critical;
    const saveEnvelope = detail.saveData;
    if (!saveEnvelope) return;

    // saveEnvelope = { version, savedAt, state, ownedCodes, modifiers }
    const saveData = saveEnvelope.state || saveEnvelope;

    // 수동 저장(non-silent) 또는 critical 플래그는 즉시 sync
    await throttledSync(saveData, isCritical || !isSilent);
  });

  // ── 공개 API ─────────────────────────────────────────────────────────────
  window.HCSIG_API = {
    // 코드 교환 (Workers D1 우선, NOT_FOUND면 호출자가 Firestore fallback 처리)
    redeem: redeemCode,

    // 캐시 차감 (서버 권위) — { ok, data: { cashBalance, spent } } | { ok:false, code }
    spendCash: (amount, itemId) =>
      apiPost('/api/cash/spend', { amount, itemId }),

    // 지금 즉시 D1 동기화 (UI 버튼 등에서 수동 호출 가능)
    syncNow: async () => {
      const bridge = window.HCSIG_BRIDGE;
      if (!bridge) return { ok: false, err: 'bridge 없음' };
      const env = bridge.getCurrentSaveData();
      const saveData = env.state || env;
      return await apiPost('/api/player/sync', { saveData });
    },

    // 플레이어 정보 조회 (D1 기준)
    getMe: () => apiGet('/api/player/me'),

    // 글로벌 랭킹 조회
    getRanking: (season) =>
      apiGet('/api/rank/global' + (season != null ? '?season=' + season : '')),

    // 내 랭킹 조회
    getMyRank: (season) =>
      apiGet('/api/rank/me' + (season != null ? '?season=' + season : '')),

    // 저수준 접근 (필요 시)
    post: apiPost,
    get:  apiGet,
  };

  console.log('[HCSiG API] D1 클라이언트 초기화 완료 —', API_BASE);
})();

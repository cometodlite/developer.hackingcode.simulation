(function(){
  const CLOUD_COLLECTION = 'saves';
  const USERS_COLLECTION = 'users';
  // v3.0.0: 클라우드 쓰기 throttle (Firebase 비용/할당량 보호)
  const CLOUD_SAVE_THROTTLE_MS = 30000; // 30초
  let authUser = null;
  let bridgeReady = false;
  let pendingInitialSync = false;
  let lastCloudSaveAt = 0;
  let pendingCloudSaveTimer = null;

  function bridge(){ return window.HCSIG_BRIDGE; }
  function auth(){ return window.HCSIG_AUTH; }
  function canUseCloud(){ return !!(window.HCSIG_FIREBASE_READY && window.HCSIG_FB && authUser && bridge()); }
  function saveRef(){ return window.HCSIG_FB.db.collection(CLOUD_COLLECTION).doc(authUser.uid); }
  function userRef(){ return window.HCSIG_FB.db.collection(USERS_COLLECTION).doc(authUser.uid); }

  function formatTs(v){
    if (!v) return '-';
    try {
      const d = typeof v === 'number' ? new Date(v) : (v.toDate ? v.toDate() : new Date(v));
      return d.toLocaleString();
    } catch (e) { return '-'; }
  }

  function buildProfilePatch(payload){
    const save = payload || {};
    const gameState = save.state || {};
    const stats = gameState.stats || {};
    const zd = gameState.zeroDay || {};
    const zdSt = zd.stats || {};
    const stage = gameState.stage || {};
    const currentProfile = auth() && auth().getProfile ? auth().getProfile() : null;
    const patch = {
      uid: authUser.uid,
      email: authUser.email || '',
      version: '3.0.0',
      totalHackCount: Number(stats.hackSuccessCount || 0),
      totalCreditsEarned: Number(stats.creditsEarnedTotal || 0),
      // v3.0.0 new fields
      stageClearCount: Number(stats.stageClearCount || 0),
      stageHighestFloor: Number(stage.highest || 0),
      extremeHackCount: Number(stats.extremeHackSuccessCount || 0),
      zeroDayPveRuns: Number(zdSt.pveRuns || 0),
      zeroDayBestDepth: Number(zdSt.pveBestDepth || 0),
      collectionPower: Number(stats.collectionPower || 0),
      weeklyScore: Number(stats.weeklyScore || 0),
      lastSaveAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    if (currentProfile && Object.prototype.hasOwnProperty.call(currentProfile, 'favoriteCodeId')) {
      patch.favoriteCodeId = currentProfile.favoriteCodeId || '';
    }
    if (currentProfile && Object.prototype.hasOwnProperty.call(currentProfile, 'avatarId')) {
      patch.avatarId = currentProfile.avatarId || 'terminal';
    }
    return patch;
  }

  async function saveCloud(reason){
    if (!canUseCloud()) return false;
    const payload = bridge().getCurrentSaveData();
    await saveRef().set({
      uid: authUser.uid,
      email: authUser.email || '',
      version: bridge().version,
      reason: reason || 'manual',
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      saveData: payload
    }, { merge: true });
    await userRef().set(buildProfilePatch(payload), { merge:true });
    if (auth().refreshProfile) await auth().refreshProfile();
    auth().setCloudMeta('클라우드 저장됨: ' + new Date().toLocaleString());
    return true;
  }

  async function loadCloud(){
    if (!canUseCloud()) return null;
    const snap = await saveRef().get();
    if (!snap.exists) return null;
    const data = snap.data() || {};
    if (data.updatedAt) auth().setCloudMeta('클라우드 저장본: ' + formatTs(data.updatedAt));
    return data.saveData || null;
  }

  async function migrateLocalIfNeeded(){
    if (!canUseCloud()) return;
    const localRaw = localStorage.getItem(bridge().saveKey);
    if (!localRaw) return;
    const snap = await saveRef().get();
    if (snap.exists) return;
    try {
      const parsed = JSON.parse(localRaw);
      await saveRef().set({
        uid: authUser.uid,
        email: authUser.email || '',
        version: bridge().version,
        migratedAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        saveData: parsed
      }, { merge: true });
      await userRef().set(buildProfilePatch(parsed), { merge:true });
      auth().setStatus('기존 로컬 세이브를 클라우드로 이전했습니다.');
      auth().setCloudMeta('초기 이전 완료: ' + new Date().toLocaleString());
      if (auth().refreshProfile) await auth().refreshProfile();
    } catch (err) {
      auth().setStatus('로컬 세이브 이전 실패: ' + (err.message || err));
    }
  }

  async function manualPull(){
    if (!canUseCloud()) return auth().setStatus('먼저 로그인하고 Firebase 설정을 완료하세요.');
    try {
      const saveData = await loadCloud();
      if (!saveData) return auth().setStatus('클라우드 저장본이 없습니다.');

      // v3.0.0+: pull 전 로컬 점수 비교 경고
      const localSave = bridge().getCurrentSaveData();
      const localScore = _scoreOf(localSave);
      const cloudScore = _scoreOf(saveData);
      const isEn = (window.HCSIG_BRIDGE && window.HCSIG_BRIDGE.getLanguage && window.HCSIG_BRIDGE.getLanguage()==='en');

      if (localScore > cloudScore + 10) {
        const msg = isEn
          ? `Warning: Your current save has higher score (${localScore}) than the cloud save (${cloudScore}).\nApplying cloud save will OVERWRITE your current progress.\n\nProceed anyway?`
          : `경고: 현재 저장본이 클라우드보다 진행도가 높습니다 (로컬 ${localScore} > 클라우드 ${cloudScore}).\n클라우드 적용 시 현재 진행도가 덮어써집니다.\n\n그래도 진행할까요?`;
        if (!window.confirm(msg)) {
          auth().setStatus(isEn ? 'Pull cancelled.' : '클라우드 적용 취소됨.');
          return;
        }
      }

      bridge().loadFromObject(saveData);
      await userRef().set(buildProfilePatch(saveData), { merge:true });
      if (auth().refreshProfile) await auth().refreshProfile();
      auth().setStatus('클라우드 저장본을 불러왔습니다.');
      auth().toast('클라우드 저장본 불러오기 완료', 'save');
    } catch (err) {
      auth().setStatus('클라우드 불러오기 실패: ' + (err.message || err));
    }
  }

  // v3.0.0+: 수동 push 전 점수 비교 경고 (낮은 점수가 높은 점수 덮는 것 방지)
  async function manualPush(){
    if (!canUseCloud()) return auth().setStatus('먼저 로그인하고 Firebase 설정을 완료하세요.');
    try {
      // 클라우드 현황 확인
      const cloud = await loadCloud();
      const localSave = bridge().getCurrentSaveData();
      const localScore = _scoreOf(localSave);
      const cloudScore = _scoreOf(cloud);

      if (cloud && cloudScore > localScore + 10) {
        // 클라우드가 더 진행도 높음 → 사용자 확인
        const isEn = (window.HCSIG_BRIDGE && window.HCSIG_BRIDGE.getLanguage && window.HCSIG_BRIDGE.getLanguage()==='en');
        const msg = isEn
          ? `Warning: Cloud save has higher score (${cloudScore}) than your current save (${localScore}).\nUploading will OVERWRITE the cloud save.\n\nProceed anyway?`
          : `경고: 클라우드 저장본이 현재보다 진행도가 높습니다 (클라우드 ${cloudScore} > 로컬 ${localScore}).\n업로드 시 클라우드가 덮어써집니다.\n\n그래도 진행할까요?`;
        if (!window.confirm(msg)) {
          auth().setStatus(isEn ? 'Upload cancelled.' : '업로드 취소됨.');
          return;
        }
      }

      await saveCloud('manual');
      auth().setStatus('현재 세이브를 클라우드에 저장했습니다.');
      auth().toast('클라우드 저장 완료', 'save');
    } catch (err) {
      auth().setStatus('클라우드 저장 실패: ' + (err.message || err));
    }
  }

  function bindUi(){
    const btnSync = document.getElementById('btnCloudSync');
    const btnPull = document.getElementById('btnCloudPull');
    if (btnSync) btnSync.addEventListener('click', manualPush);
    if (btnPull) btnPull.addEventListener('click', manualPull);
  }

  window.addEventListener('hcsig:ready', async ()=>{
    bridgeReady = true;
    if (pendingInitialSync) {
      pendingInitialSync = false;
      await migrateLocalIfNeeded();
    }
  });

  // v3.0.0+ 저장 안정성: 점수 비교 + 덮어쓰기 보호
  // bridge에 노출된 score 함수 사용. 없으면 단순 시간 비교 fallback.
  function _scoreOf(saveData) {
    try {
      if (typeof window.HCSIG_GET_SAVE_SCORE === 'function') {
        return window.HCSIG_GET_SAVE_SCORE(saveData);
      }
    } catch (e) {}
    return 0;
  }
  function _summaryOf(saveData) {
    try {
      if (typeof window.HCSIG_GET_SAVE_SUMMARY === 'function') {
        return window.HCSIG_GET_SAVE_SUMMARY(saveData);
      }
    } catch (e) {}
    return null;
  }

  window.addEventListener('hcsig:auth-changed', async (event)=>{
    authUser = event.detail && event.detail.user ? event.detail.user : null;
    if (!authUser) return;
    if (!bridgeReady) {
      pendingInitialSync = true;
      return;
    }
    await migrateLocalIfNeeded();
    try {
      const cloud = await loadCloud();
      const localRaw = localStorage.getItem(bridge().saveKey);

      // 둘 다 없음
      if (!cloud && !localRaw) {
        auth().setStatus('새 게임 시작');
        if (auth().refreshProfile) await auth().refreshProfile();
        return;
      }

      // 클라우드만 있음
      if (cloud && !localRaw) {
        bridge().loadFromObject(cloud);
        auth().setStatus('클라우드 저장본을 자동으로 적용했습니다.');
        if (auth().refreshProfile) await auth().refreshProfile();
        return;
      }

      // 로컬만 있음 — 클라우드는 비어있음. 클라우드 자동 덮어쓰기 안 함 (수동 저장 시 처리)
      if (!cloud && localRaw) {
        auth().setStatus('로컬 저장본 사용 — 수동 저장으로 클라우드에 업로드하세요.');
        if (auth().refreshProfile) await auth().refreshProfile();
        return;
      }

      // ─── 둘 다 있음 — 점수/시간 비교로 안전 결정 ───
      let localParsed = null;
      try { localParsed = JSON.parse(localRaw); } catch (e) {}

      const localScore = _scoreOf(localParsed);
      const cloudScore = _scoreOf(cloud);
      const localTime = Number((localParsed && localParsed.savedAt) || 0);
      const cloudTime = Number((cloud && cloud.savedAt) || 0);

      // v3.0.0+ 안전 정책:
      // - 클라우드 점수가 로컬보다 의미있게(+10 이상) 높으면 → 클라우드 적용
      // - 로컬 점수가 클라우드보다 의미있게 높으면 → 로컬 유지 (자동 적용 안 함)
      // - 점수가 거의 같으면(±10) 시간 더 최근인 쪽 적용
      // - 점수 차이가 크고 시간이 반대 방향이면 → 사용자 선택 다이얼로그
      const SCORE_DELTA = 10;
      const localSummary = _summaryOf(localParsed);
      const cloudSummary = _summaryOf(cloud);

      let action = 'keep-local';
      let reason = '';

      if (cloudScore > localScore + SCORE_DELTA) {
        action = 'apply-cloud';
        reason = `cloud score ${cloudScore} > local ${localScore}`;
      } else if (localScore > cloudScore + SCORE_DELTA) {
        action = 'keep-local';
        reason = `local score ${localScore} > cloud ${cloudScore} — keeping local`;
      } else {
        // 점수 비슷함 — 시간 기준
        if (cloudTime > localTime) {
          action = 'apply-cloud';
          reason = `scores similar, cloud is newer`;
        } else {
          action = 'keep-local';
          reason = `scores similar, local is newer/equal`;
        }
      }

      console.log('[CloudSync]', action, reason, { localScore, cloudScore, localTime, cloudTime });

      if (action === 'apply-cloud') {
        bridge().loadFromObject(cloud);
        const msg = (window.HCSIG_BRIDGE.getLanguage && window.HCSIG_BRIDGE.getLanguage()==='en')
          ? `Cloud save applied (score ${cloudScore} vs local ${localScore})`
          : `클라우드 저장 적용 (점수 ${cloudScore} vs 로컬 ${localScore})`;
        auth().setStatus(msg);
      } else {
        // 로컬 유지
        const msg = (window.HCSIG_BRIDGE.getLanguage && window.HCSIG_BRIDGE.getLanguage()==='en')
          ? `Local save kept (score ${localScore} vs cloud ${cloudScore}). Use Cloud Pull to override.`
          : `로컬 저장본 유지 (점수 ${localScore} vs 클라우드 ${cloudScore}). 클라우드 적용은 PULL 버튼으로 가능합니다.`;
        auth().setStatus(msg);
      }
      if (auth().refreshProfile) await auth().refreshProfile();
    } catch (err) {
      auth().setStatus('클라우드 초기 동기화 실패: ' + (err.message || err));
      console.warn('[CloudSync] auth-changed error:', err);
    }
  });

  // v3.0.0: 클라우드 저장 throttle 헬퍼
  // - silent autosave는 30초 throttle (할당량 보호)
  // - 수동/중요 저장은 즉시 실행
  async function throttledCloudSave(reason, isCritical){
    if (!canUseCloud()) return;
    const now = Date.now();

    // 중요 저장: 즉시 실행
    if (isCritical) {
      if (pendingCloudSaveTimer) {
        clearTimeout(pendingCloudSaveTimer);
        pendingCloudSaveTimer = null;
      }
      try {
        await saveCloud(reason);
        lastCloudSaveAt = Date.now();
      } catch (err) {
        auth().setStatus('클라우드 저장 실패: ' + (err.message || err));
      }
      return;
    }

    // 일반 autosave: throttle
    const elapsed = now - lastCloudSaveAt;
    if (elapsed >= CLOUD_SAVE_THROTTLE_MS) {
      // throttle 통과 — 즉시 저장
      try {
        await saveCloud(reason);
        lastCloudSaveAt = Date.now();
      } catch (err) {
        auth().setStatus('자동 클라우드 저장 실패: ' + (err.message || err));
      }
    } else {
      // throttle 안 됨 — 다음 쓰기 가능 시점에 한 번만 예약
      if (pendingCloudSaveTimer) return; // 이미 예약된 게 있으면 무시
      const waitMs = CLOUD_SAVE_THROTTLE_MS - elapsed;
      pendingCloudSaveTimer = setTimeout(async () => {
        pendingCloudSaveTimer = null;
        if (!canUseCloud()) return;
        try {
          await saveCloud('autosave-throttled');
          lastCloudSaveAt = Date.now();
        } catch (err) {
          auth().setStatus('지연 클라우드 저장 실패: ' + (err.message || err));
        }
      }, waitMs);
    }
  }

  window.addEventListener('hcsig:save', async (event)=>{
    if (!canUseCloud()) return;
    const isSilent = !!(event.detail && event.detail.silent);
    const isCritical = !!(event.detail && event.detail.critical);
    const reason = isSilent ? 'autosave' : 'local-save';
    // 수동(non-silent) 저장이거나 critical 플래그가 있으면 즉시
    await throttledCloudSave(reason, isCritical || !isSilent);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindUi, { once:true });
  } else {
    bindUi();
  }
})();

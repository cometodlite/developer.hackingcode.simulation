(function(){
  const CLOUD_COLLECTION = 'saves';
  let authUser = null;
  let bridgeReady = false;
  let pendingInitialSync = false;

  function bridge(){ return window.HCSIG_BRIDGE; }
  function auth(){ return window.HCSIG_AUTH; }
  function canUseCloud(){ return !!(window.HCSIG_FIREBASE_READY && window.HCSIG_FB && authUser && bridge()); }
  function saveRef(){ return window.HCSIG_FB.db.collection(CLOUD_COLLECTION).doc(authUser.uid); }

  function formatTs(v){
    if (!v) return '-';
    try {
      const d = typeof v === 'number' ? new Date(v) : (v.toDate ? v.toDate() : new Date(v));
      return d.toLocaleString();
    } catch (e) { return '-'; }
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
      auth().setStatus('기존 로컬 세이브를 클라우드로 이전했습니다.');
      auth().setCloudMeta('초기 이전 완료: ' + new Date().toLocaleString());
    } catch (err) {
      auth().setStatus('로컬 세이브 이전 실패: ' + (err.message || err));
    }
  }

  async function manualPull(){
    if (!canUseCloud()) return auth().setStatus('먼저 로그인하고 Firebase 설정을 완료하세요.');
    try {
      const saveData = await loadCloud();
      if (!saveData) return auth().setStatus('클라우드 저장본이 없습니다.');
      bridge().loadFromObject(saveData);
      auth().setStatus('클라우드 저장본을 불러왔습니다.');
      auth().toast('클라우드 저장본 불러오기 완료', 'save');
    } catch (err) {
      auth().setStatus('클라우드 불러오기 실패: ' + (err.message || err));
    }
  }

  async function manualPush(){
    if (!canUseCloud()) return auth().setStatus('먼저 로그인하고 Firebase 설정을 완료하세요.');
    try {
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
      if (cloud && (!localStorage.getItem(bridge().saveKey) || (cloud.savedAt || 0) > JSON.parse(localStorage.getItem(bridge().saveKey)).savedAt)) {
        bridge().loadFromObject(cloud);
        auth().setStatus('클라우드 저장본을 자동으로 적용했습니다.');
      }
    } catch (err) {
      auth().setStatus('클라우드 초기 동기화 실패: ' + (err.message || err));
    }
  });

  window.addEventListener('hcsig:save', async (event)=>{
    if (!canUseCloud()) return;
    try {
      await saveCloud(event.detail && event.detail.silent ? 'autosave' : 'local-save');
    } catch (err) {
      auth().setStatus('자동 클라우드 저장 실패: ' + (err.message || err));
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindUi, { once:true });
  } else {
    bindUi();
  }
})();

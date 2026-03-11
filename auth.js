(function(){
  const state = {
    user: null,
    initialized: false,
    bridgeReady: false,
    profile: null
  };

  const USERS_COLLECTION = 'users';
  const el = {};
  function pick(id){ return document.getElementById(id); }
  function text(id, value){ if (el[id]) el[id].textContent = value; }
  function val(id, value){ if (el[id]) el[id].value = value; }

  function initElements(){
    [
      'cloudStatusBadge','cloudAccountStatus','cloudUserCard','cloudUserName','cloudUserEmail','cloudUserMeta','cloudEmail','cloudPassword',
      'btnCloudRegister','btnCloudLogin','btnCloudGoogle','btnCloudSync','btnCloudPull','btnCloudLogout','cloudAccountHelp',
      'cloudNicknameInput','btnCloudNicknameSave','cloudProfileJoinDate','cloudProfileLastLoginAt','cloudProfileLastSaveAt',
      'cloudProfileHackCount','cloudProfileCreditsEarned','cloudProfileFavoriteCode','cloudProfileUid'
    ].forEach(id=>el[id]=pick(id));
  }

  function setBadge(label, mode){
    if (!el.cloudStatusBadge) return;
    el.cloudStatusBadge.textContent = label;
    el.cloudStatusBadge.classList.remove('is-ready','is-error');
    if (mode) el.cloudStatusBadge.classList.add(mode);
  }

  function setStatus(message){
    if (el.cloudAccountStatus) el.cloudAccountStatus.textContent = message;
  }

  function formatDate(value){
    if (!value) return '-';
    try {
      const d = typeof value === 'number' ? new Date(value) : (value.toDate ? value.toDate() : new Date(value));
      if (Number.isNaN(d.getTime())) return '-';
      return d.toLocaleString();
    } catch (e) {
      return '-';
    }
  }

  function updateProfileUi(profile){
    state.profile = profile || null;
    const p = profile || {};
    text('cloudProfileJoinDate', formatDate(p.createdAt));
    text('cloudProfileLastLoginAt', formatDate(p.lastLoginAt));
    text('cloudProfileLastSaveAt', formatDate(p.lastSaveAt));
    text('cloudProfileHackCount', String(p.totalHackCount || 0));
    text('cloudProfileCreditsEarned', String(p.totalCreditsEarned || 0));
    text('cloudProfileFavoriteCode', p.favoriteCodeId || '-');
    text('cloudProfileUid', p.uid || (state.user && state.user.uid) || '-');
    if (el.cloudNicknameInput && document.activeElement !== el.cloudNicknameInput) {
      val('cloudNicknameInput', p.nickname || (state.user && (state.user.displayName || '플레이어')) || '플레이어');
    }
    if (state.user) {
      text('cloudUserName', p.nickname || state.user.displayName || 'HCSIG Player');
      text('cloudUserEmail', state.user.email || state.user.uid);
    }
  }

  function setLoggedInView(user){
    const loggedIn = !!user;
    if (el.cloudUserCard) el.cloudUserCard.hidden = !loggedIn;
    if (el.btnCloudLogout) el.btnCloudLogout.disabled = !loggedIn;
    if (el.btnCloudSync) el.btnCloudSync.disabled = !loggedIn || !window.HCSIG_FIREBASE_READY;
    if (el.btnCloudPull) el.btnCloudPull.disabled = !loggedIn || !window.HCSIG_FIREBASE_READY;
    if (el.btnCloudGoogle) el.btnCloudGoogle.disabled = !window.HCSIG_FIREBASE_READY;
    if (el.btnCloudLogin) el.btnCloudLogin.disabled = !window.HCSIG_FIREBASE_READY;
    if (el.btnCloudRegister) el.btnCloudRegister.disabled = !window.HCSIG_FIREBASE_READY;
    if (el.btnCloudNicknameSave) el.btnCloudNicknameSave.disabled = !loggedIn || !window.HCSIG_FIREBASE_READY;
    if (!loggedIn) {
      updateProfileUi(null);
      return;
    }
    text('cloudUserName', user.displayName || 'HCSIG Player');
    text('cloudUserEmail', user.email || user.uid);
    text('cloudProfileUid', user.uid || '-');
  }

  function toast(msg, type){
    try {
      if (window.HCSIG_BRIDGE && window.HCSIG_BRIDGE.toast) return window.HCSIG_BRIDGE.toast(msg, type || 'save');
    } catch (e) {}
    console.log('[HCSIGAuth]', msg);
  }

  function emit(name, detail){
    window.dispatchEvent(new CustomEvent(name, { detail }));
  }

  function getUserRef(uid){
    return window.HCSIG_FB.db.collection(USERS_COLLECTION).doc(uid);
  }

  async function ensureProfile(user){
    if (!window.HCSIG_FIREBASE_READY || !window.HCSIG_FB || !user) return null;
    const ref = getUserRef(user.uid);
    const snap = await ref.get();
    if (!snap.exists) {
      const base = {
        uid: user.uid,
        email: user.email || '',
        nickname: user.displayName || '플레이어',
        photoURL: user.photoURL || '',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        lastLoginAt: firebase.firestore.FieldValue.serverTimestamp(),
        lastSaveAt: null,
        totalHackCount: 0,
        totalCreditsEarned: 0,
        favoriteCodeId: ''
      };
      await ref.set(base, { merge:true });
      const fresh = await ref.get();
      return fresh.data();
    }
    await ref.set({
      uid: user.uid,
      email: user.email || '',
      photoURL: user.photoURL || '',
      lastLoginAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge:true });
    const fresh = await ref.get();
    return fresh.data();
  }

  async function loadProfile(user){
    if (!user || !window.HCSIG_FIREBASE_READY || !window.HCSIG_FB) return null;
    try {
      const profile = await ensureProfile(user);
      updateProfileUi(profile);
      return profile;
    } catch (err) {
      setStatus('프로필 불러오기 실패: ' + (err.message || err.code || err));
      return null;
    }
  }

  async function saveNickname(){
    if (!state.user || !window.HCSIG_FIREBASE_READY || !window.HCSIG_FB) return;
    const nickname = String((el.cloudNicknameInput && el.cloudNicknameInput.value) || '').trim();
    if (nickname.length < 2 || nickname.length > 12) {
      return setStatus('닉네임은 2~12자로 입력하세요.');
    }
    try {
      await getUserRef(state.user.uid).set({ nickname }, { merge:true });
      const next = Object.assign({}, state.profile || {}, { nickname });
      updateProfileUi(next);
      setStatus('닉네임을 저장했습니다.');
      toast('프로필 저장 완료', 'save');
    } catch (err) {
      setStatus('닉네임 저장 실패: ' + (err.message || err.code || err));
    }
  }

  async function registerWithEmail(){
    const email = (el.cloudEmail && el.cloudEmail.value || '').trim();
    const password = (el.cloudPassword && el.cloudPassword.value || '').trim();
    if (!email || !password) return setStatus('이메일과 비밀번호를 입력하세요.');
    try {
      await window.HCSIG_FB.auth.createUserWithEmailAndPassword(email, password);
      setStatus('회원가입 완료. 로그인 상태로 전환됩니다.');
    } catch (err) {
      setStatus('회원가입 실패: ' + (err.message || err.code || err));
      setBadge('AUTH ERROR', 'is-error');
    }
  }

  async function loginWithEmail(){
    const email = (el.cloudEmail && el.cloudEmail.value || '').trim();
    const password = (el.cloudPassword && el.cloudPassword.value || '').trim();
    if (!email || !password) return setStatus('이메일과 비밀번호를 입력하세요.');
    try {
      await window.HCSIG_FB.auth.signInWithEmailAndPassword(email, password);
      setStatus('이메일 로그인 완료.');
    } catch (err) {
      setStatus('로그인 실패: ' + (err.message || err.code || err));
      setBadge('AUTH ERROR', 'is-error');
    }
  }

  async function loginWithGoogle(){
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await window.HCSIG_FB.auth.signInWithPopup(provider);
      setStatus('Google 로그인 완료.');
    } catch (err) {
      setStatus('Google 로그인 실패: ' + (err.message || err.code || err));
      setBadge('AUTH ERROR', 'is-error');
    }
  }

  async function logout(){
    try {
      await window.HCSIG_FB.auth.signOut();
      setStatus('로그아웃되었습니다.');
    } catch (err) {
      setStatus('로그아웃 실패: ' + (err.message || err.code || err));
    }
  }

  function wireButtons(){
    if (el.btnCloudRegister) el.btnCloudRegister.addEventListener('click', registerWithEmail);
    if (el.btnCloudLogin) el.btnCloudLogin.addEventListener('click', loginWithEmail);
    if (el.btnCloudGoogle) el.btnCloudGoogle.addEventListener('click', loginWithGoogle);
    if (el.btnCloudLogout) el.btnCloudLogout.addEventListener('click', logout);
    if (el.btnCloudNicknameSave) el.btnCloudNicknameSave.addEventListener('click', saveNickname);
  }

  function startAuthObserver(){
    if (!window.HCSIG_FIREBASE_READY || !window.HCSIG_FB) {
      setBadge('LOCAL ONLY');
      setStatus('Firebase 미설정: 현재는 LocalStorage 저장만 동작합니다.');
      setLoggedInView(null);
      return;
    }

    setBadge('CLOUD READY', 'is-ready');
    setStatus('로그인 대기 중');
    window.HCSIG_FB.auth.onAuthStateChanged(async (user)=>{
      state.user = user || null;
      state.initialized = true;
      setLoggedInView(user || null);
      if (user) {
        await loadProfile(user);
        setStatus('로그인됨: 클라우드 저장 사용 가능');
      } else {
        setStatus('로그아웃 상태: 필요 시 로그인하세요.');
      }
      emit('hcsig:auth-changed', { user: user ? { uid:user.uid, email:user.email || '', displayName:user.displayName || '' } : null });
    });
  }

  function init(){
    initElements();
    wireButtons();
    if (el.cloudAccountHelp && window.HCSIG_FIREBASE_ERROR) {
      el.cloudAccountHelp.textContent = '현재 상태: ' + window.HCSIG_FIREBASE_ERROR;
    }
    startAuthObserver();
  }

  window.HCSIG_AUTH = {
    getUser: ()=>state.user,
    isReady: ()=>!!(state.initialized && window.HCSIG_FIREBASE_READY),
    getProfile: ()=>state.profile,
    refreshProfile: async ()=> state.user ? await loadProfile(state.user) : null,
    setProfileData: (profile)=>updateProfileUi(profile),
    setCloudMeta: (message)=>{ if (el.cloudUserMeta) el.cloudUserMeta.textContent = message; },
    setStatus,
    toast
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once:true });
  } else {
    init();
  }
})();

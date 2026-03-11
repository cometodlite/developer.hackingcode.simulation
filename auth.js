(function(){
  const state = {
    user: null,
    initialized: false,
    bridgeReady: false
  };

  const el = {};
  function pick(id){ return document.getElementById(id); }
  function text(id, value){ if (el[id]) el[id].textContent = value; }

  function initElements(){
    ['cloudStatusBadge','cloudAccountStatus','cloudUserCard','cloudUserName','cloudUserEmail','cloudUserMeta','cloudEmail','cloudPassword','btnCloudRegister','btnCloudLogin','btnCloudGoogle','btnCloudSync','btnCloudPull','btnCloudLogout','cloudAccountHelp'].forEach(id=>el[id]=pick(id));
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

  function setLoggedInView(user){
    const loggedIn = !!user;
    if (el.cloudUserCard) el.cloudUserCard.hidden = !loggedIn;
    if (el.btnCloudLogout) el.btnCloudLogout.disabled = !loggedIn;
    if (el.btnCloudSync) el.btnCloudSync.disabled = !loggedIn || !window.HCSIG_FIREBASE_READY;
    if (el.btnCloudPull) el.btnCloudPull.disabled = !loggedIn || !window.HCSIG_FIREBASE_READY;
    if (el.btnCloudGoogle) el.btnCloudGoogle.disabled = !window.HCSIG_FIREBASE_READY;
    if (el.btnCloudLogin) el.btnCloudLogin.disabled = !window.HCSIG_FIREBASE_READY;
    if (el.btnCloudRegister) el.btnCloudRegister.disabled = !window.HCSIG_FIREBASE_READY;
    if (!loggedIn) return;
    text('cloudUserName', user.displayName || 'HCSIG Player');
    text('cloudUserEmail', user.email || user.uid);
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
    window.HCSIG_FB.auth.onAuthStateChanged((user)=>{
      state.user = user || null;
      state.initialized = true;
      if (user) {
        setStatus('로그인됨: 클라우드 저장 사용 가능');
      } else {
        setStatus('로그아웃 상태: 필요 시 로그인하세요.');
      }
      setLoggedInView(user || null);
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

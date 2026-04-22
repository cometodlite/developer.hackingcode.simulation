(function(){
  const state = {
    user: null,
    initialized: false,
    bridgeReady: false,
    profile: null,
    avatarDraftId: 'terminal'
  };

  const USERS_COLLECTION = 'users';
  const AVATAR_PRESETS = [
    { id:'terminal', emoji:'💻', label:'터미널' },
    { id:'shield', emoji:'🛡️', label:'방화벽' },
    { id:'robot', emoji:'🤖', label:'봇' },
    { id:'ghost', emoji:'👻', label:'고스트' },
    { id:'satellite', emoji:'🛰️', label:'위성' },
    { id:'diamond', emoji:'💎', label:'다이아' },
    { id:'crown', emoji:'👑', label:'크라운' },
    { id:'skull', emoji:'💀', label:'스컬' }
  ];
  const el = {};
  function pick(id){ return document.getElementById(id); }
  function text(id, value){ if (el[id]) el[id].textContent = value; }
  function val(id, value){ if (el[id]) el[id].value = value; }

  function initElements(){
    [
      'cloudStatusBadge','cloudAccountStatus','cloudUserCard','cloudUserName','cloudUserEmail','cloudUserMeta','cloudEmail','cloudPassword',
      'btnCloudRegister','btnCloudLogin','btnCloudGoogle','btnCloudSync','btnCloudPull','btnCloudLogout','cloudAccountHelp',
      'cloudNicknameInput','btnCloudNicknameSave','cloudProfileJoinDate','cloudProfileLastLoginAt','cloudProfileLastSaveAt',
      'cloudProfileHackCount','cloudProfileCreditsEarned','cloudProfileFavoriteCode','cloudProfileUid',
      'cloudFavoriteCodeSelect','btnCloudFavoriteCodeSave','cloudAvatarPreview','btnCloudAvatarSave','cloudProfileAvatarLabel','cloudAvatarPresetGrid','btnOpenAvatarPicker','cloudAvatarModal','btnAvatarPickerClose','btnOpenProfilePanel','cloudProfileModal','btnProfilePanelClose'
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

  function getAvatarPreset(avatarId){
    return AVATAR_PRESETS.find(item => item.id === avatarId) || AVATAR_PRESETS[0];
  }

  function setAvatarDraft(avatarId){
    state.avatarDraftId = avatarId || (state.profile && state.profile.avatarId) || AVATAR_PRESETS[0].id;
    applyAvatarUi(state.avatarDraftId);
  }

  function renderAvatarPresetGrid(selectedId){
    if (!el.cloudAvatarPresetGrid) return;
    const current = selectedId || (state.profile && state.profile.avatarId) || AVATAR_PRESETS[0].id;
    el.cloudAvatarPresetGrid.innerHTML = '';
    AVATAR_PRESETS.forEach(item => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cloud-avatar-preset-btn' + (item.id === current ? ' is-selected' : '');
      btn.dataset.avatarId = item.id;
      btn.disabled = !state.user || !window.HCSIG_FIREBASE_READY;
      btn.innerHTML = '<span class="emoji">' + item.emoji + '</span><span class="label">' + item.label + '</span>';
      btn.addEventListener('click', () => {
        setAvatarDraft(item.id);
      });
      el.cloudAvatarPresetGrid.appendChild(btn);
    });
  }

  function applyAvatarUi(avatarId){
    const avatar = getAvatarPreset(avatarId);
    text('cloudAvatarPreview', avatar.emoji);
    text('cloudProfileAvatarLabel', avatar.label);
    renderAvatarPresetGrid(avatar.id);
  }

  function getOwnedCodeOptions(){
    try {
      const saveData = window.HCSIG_BRIDGE && window.HCSIG_BRIDGE.getCurrentSaveData ? window.HCSIG_BRIDGE.getCurrentSaveData() : null;
      const list = saveData && Array.isArray(saveData.ownedCodes) ? saveData.ownedCodes : [];
      return list.map(code => ({
        id: code.id,
        label: (code.name || code.id || 'Unknown') + (code.rarity ? ' [' + code.rarity + ']' : '')
      }));
    } catch (e) {
      return [];
    }
  }

  function refreshFavoriteCodeOptions(selectedId){
    if (!el.cloudFavoriteCodeSelect) return;
    const options = getOwnedCodeOptions();
    const current = selectedId || (state.profile && state.profile.favoriteCodeId) || '';
    el.cloudFavoriteCodeSelect.innerHTML = '';

    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = options.length ? '대표 코드를 선택하세요' : '보유 코드 없음';
    el.cloudFavoriteCodeSelect.appendChild(placeholder);

    options.forEach(item => {
      const opt = document.createElement('option');
      opt.value = item.id;
      opt.textContent = item.label;
      if (item.id === current) opt.selected = true;
      el.cloudFavoriteCodeSelect.appendChild(opt);
    });

    el.cloudFavoriteCodeSelect.disabled = options.length === 0 || !state.user || !window.HCSIG_FIREBASE_READY;
    if (current && !options.find(item => item.id === current)) {
      el.cloudFavoriteCodeSelect.value = '';
    }
  }

  function getFavoriteCodeLabel(codeId){
    if (!codeId) return '-';
    const found = getOwnedCodeOptions().find(item => item.id === codeId);
    return found ? found.label : codeId;
  }

  function updateProfileUi(profile){
    state.profile = profile || null;
    const p = profile || {};
    text('cloudProfileJoinDate', formatDate(p.createdAt));
    text('cloudProfileLastLoginAt', formatDate(p.lastLoginAt));
    text('cloudProfileLastSaveAt', formatDate(p.lastSaveAt));
    text('cloudProfileHackCount', String(p.totalHackCount || 0));
    text('cloudProfileCreditsEarned', String(p.totalCreditsEarned || 0));
    text('cloudProfileFavoriteCode', getFavoriteCodeLabel(p.favoriteCodeId));
    text('cloudProfileUid', p.uid || (state.user && state.user.uid) || '-');
    if (el.cloudNicknameInput && document.activeElement !== el.cloudNicknameInput) {
      val('cloudNicknameInput', p.nickname || (state.user && (state.user.displayName || '플레이어')) || '플레이어');
    }
    refreshFavoriteCodeOptions(p.favoriteCodeId);
    state.avatarDraftId = p.avatarId || 'terminal';
    applyAvatarUi(state.avatarDraftId);
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
    if (el.btnCloudAvatarSave) el.btnCloudAvatarSave.disabled = !loggedIn || !window.HCSIG_FIREBASE_READY;
    if (el.btnCloudFavoriteCodeSave) el.btnCloudFavoriteCodeSave.disabled = !loggedIn || !window.HCSIG_FIREBASE_READY;
    if (el.btnOpenAvatarPicker) el.btnOpenAvatarPicker.disabled = !loggedIn || !window.HCSIG_FIREBASE_READY;
    renderAvatarPresetGrid(state.avatarDraftId || (state.profile && state.profile.avatarId) || AVATAR_PRESETS[0].id);
    if (el.cloudFavoriteCodeSelect) el.cloudFavoriteCodeSelect.disabled = !loggedIn || !window.HCSIG_FIREBASE_READY || getOwnedCodeOptions().length === 0;
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
        avatarId: 'terminal',
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

  async function saveAvatar(){
    if (!state.user || !window.HCSIG_FIREBASE_READY || !window.HCSIG_FB) return;
    const avatarId = String(state.avatarDraftId || '').trim() || 'terminal';
    try {
      await getUserRef(state.user.uid).set({ avatarId }, { merge:true });
      const next = Object.assign({}, state.profile || {}, { avatarId });
      updateProfileUi(next);
      closeAvatarPicker();
      setStatus('프로필 아이콘을 저장했습니다.');
      toast('프로필 아이콘 저장 완료', 'save');
    } catch (err) {
      setStatus('프로필 아이콘 저장 실패: ' + (err.message || err.code || err));
    }
  }

  async function saveFavoriteCode(){
    if (!state.user || !window.HCSIG_FIREBASE_READY || !window.HCSIG_FB) return;
    const favoriteCodeId = String((el.cloudFavoriteCodeSelect && el.cloudFavoriteCodeSelect.value) || '').trim();
    try {
      await getUserRef(state.user.uid).set({ favoriteCodeId }, { merge:true });
      const next = Object.assign({}, state.profile || {}, { favoriteCodeId });
      updateProfileUi(next);
      setStatus(favoriteCodeId ? '대표 코드를 저장했습니다.' : '대표 코드를 해제했습니다.');
      toast(favoriteCodeId ? '대표 코드 저장 완료' : '대표 코드 해제 완료', 'save');
    } catch (err) {
      setStatus('대표 코드 저장 실패: ' + (err.message || err.code || err));
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

  function openProfilePanel(){
    if (el.cloudProfileModal) el.cloudProfileModal.hidden = false;
  }

  function closeProfilePanel(){
    if (el.cloudProfileModal) el.cloudProfileModal.hidden = true;
    closeAvatarPicker();
  }

  function openAvatarPicker(){
    if (el.cloudProfileModal) el.cloudProfileModal.hidden = false;
    if (el.cloudAvatarModal) el.cloudAvatarModal.hidden = false;
    renderAvatarPresetGrid(state.avatarDraftId || (state.profile && state.profile.avatarId) || AVATAR_PRESETS[0].id);
  }

  function closeAvatarPicker(){
    if (el.cloudAvatarModal) el.cloudAvatarModal.hidden = true;
  }

  function wireButtons(){
    if (el.btnOpenProfilePanel) el.btnOpenProfilePanel.addEventListener('click', openProfilePanel);
    if (el.btnProfilePanelClose) el.btnProfilePanelClose.addEventListener('click', closeProfilePanel);
    if (el.cloudProfileModal) el.cloudProfileModal.addEventListener('click', (ev)=>{ if (ev.target === el.cloudProfileModal) closeProfilePanel(); });
    if (el.btnOpenAvatarPicker) el.btnOpenAvatarPicker.addEventListener('click', openAvatarPicker);
    if (el.btnAvatarPickerClose) el.btnAvatarPickerClose.addEventListener('click', closeAvatarPicker);
    if (el.cloudAvatarModal) el.cloudAvatarModal.addEventListener('click', (ev)=>{ if (ev.target === el.cloudAvatarModal) closeAvatarPicker(); });
    if (el.btnCloudRegister) el.btnCloudRegister.addEventListener('click', registerWithEmail);
    if (el.btnCloudLogin) el.btnCloudLogin.addEventListener('click', loginWithEmail);
    if (el.btnCloudGoogle) el.btnCloudGoogle.addEventListener('click', loginWithGoogle);
    if (el.btnCloudLogout) el.btnCloudLogout.addEventListener('click', logout);
    if (el.btnCloudNicknameSave) el.btnCloudNicknameSave.addEventListener('click', saveNickname);
    if (el.btnCloudAvatarSave) el.btnCloudAvatarSave.addEventListener('click', saveAvatar);
    if (el.btnCloudFavoriteCodeSave) el.btnCloudFavoriteCodeSave.addEventListener('click', saveFavoriteCode);
  }

  function startAuthObserver(){
    if (!window.HCSIG_FIREBASE_READY || !window.HCSIG_FB) {
      setBadge('CLOUD SETUP');
      setStatus('Firebase 설정 필요: 클라우드 계정 저장을 사용할 수 없습니다.');
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

  window.addEventListener('hcsig:ready', ()=> refreshFavoriteCodeOptions());
  window.addEventListener('hcsig:save', ()=> refreshFavoriteCodeOptions());

  document.addEventListener('keydown', (ev)=>{
    if (ev.key !== 'Escape') return;
    if (el.cloudAvatarModal && !el.cloudAvatarModal.hidden) { closeAvatarPicker(); return; }
    if (el.cloudProfileModal && !el.cloudProfileModal.hidden) { closeProfilePanel(); }
  });

  window.HCSIG_AUTH = {
    getUser: ()=>state.user,
    isReady: ()=>!!(state.initialized && window.HCSIG_FIREBASE_READY),
    getProfile: ()=>state.profile,
    refreshProfile: async ()=> state.user ? await loadProfile(state.user) : null,
    setProfileData: (profile)=>updateProfileUi(profile),
    refreshFavoriteCodeOptions,
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

(function(){
  const cfg = {
    enabled: false,
    firebase: {
      apiKey: '',
      authDomain: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: ''
    }
  };

  function hasRequiredFirebaseKeys(firebaseCfg){
    return !!(firebaseCfg && firebaseCfg.apiKey && firebaseCfg.authDomain && firebaseCfg.projectId && firebaseCfg.appId);
  }

  window.HCSIG_FIREBASE = cfg;
  window.HCSIG_FIREBASE_READY = false;
  window.HCSIG_FIREBASE_ERROR = '';

  try {
    if (!cfg.enabled || !hasRequiredFirebaseKeys(cfg.firebase)) {
      throw new Error('Firebase config disabled or incomplete. Fill firebase-config.js to enable cloud accounts.');
    }
    if (!window.firebase) {
      throw new Error('Firebase SDK failed to load. Check network access.');
    }
    firebase.initializeApp(cfg.firebase);
    window.HCSIG_FB = {
      app: firebase.app(),
      auth: firebase.auth(),
      db: firebase.firestore()
    };
    window.HCSIG_FIREBASE_READY = true;
  } catch (err) {
    window.HCSIG_FB = null;
    window.HCSIG_FIREBASE_ERROR = err && err.message ? err.message : String(err);
    console.warn('[HCSIG Firebase]', window.HCSIG_FIREBASE_ERROR);
  }
})();

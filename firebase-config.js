(function(){
  // HCSIG Firebase quick setup
  // 1) Firebase Console > Project settings > Your apps > Web app
  // 2) Copy the config values below
  // 3) Authentication > Sign-in method: enable Email/Password and Google
  // 4) Firestore Database: create database in production or test mode, then add the provided rules
  const cfg = {
    enabled: true,
    firebase: {
      apiKey: 'AIzaSyDoZEixsQ7wA-CrZ1FJH0LTqzW2WVGECoU',
      authDomain: 'hcsig-21122.firebaseapp.com',
      projectId: 'hcsig-21122',
      storageBucket: 'hcsig-21122.firebasestorage.app',
      messagingSenderId: '387120003846',
      appId: '1:387120003846:web:c73d77f88bd6a0bd1b3c87'
    }
  };

  function hasRequiredFirebaseKeys(firebaseCfg){
    return !!(
      firebaseCfg &&
      firebaseCfg.apiKey && !firebaseCfg.apiKey.startsWith('PASTE_') &&
      firebaseCfg.authDomain && !firebaseCfg.authDomain.startsWith('PASTE_') &&
      firebaseCfg.projectId && !firebaseCfg.projectId.startsWith('PASTE_') &&
      firebaseCfg.appId && !firebaseCfg.appId.startsWith('PASTE_')
    );
  }

  window.HCSIG_FIREBASE = cfg;
  window.HCSIG_FIREBASE_READY = false;
  window.HCSIG_FIREBASE_ERROR = '';

  try {
    if (!cfg.enabled || !hasRequiredFirebaseKeys(cfg.firebase)) {
      throw new Error('Firebase config disabled or incomplete. Paste your Firebase web app config into firebase-config.js and set enabled: true.');
    }
    if (!window.firebase) {
      throw new Error('Firebase SDK failed to load. Check network access or script loading order.');
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


/**
 * HCSiG v3.1.0 — SHOP 재편 / PASS 독립 패널 / 미션 버그픽스 / EVENT 글로우 분리
 * SHOP 3분류, PASS 버튼, 신규 미션, 타워/로그인 미션 추적, LINK 분류 태그
 */

// 전역 초기화 상태 변수
window.gameInitialized = false;

// 1. 템플릿 치환 기능이 강화된 번역 함수 (요청서 1, 2, 5번 해결)
window.t = function(key, data = {}) {
    const lang = (typeof state !== 'undefined' && state.language) ? state.language : 'ko';
    let str = (typeof I18N !== 'undefined' && I18N[lang] && I18N[lang][key]) ? I18N[lang][key] : key;
    
    // {v}, {name}, {sec} 등의 플레이스홀더 치환
    Object.keys(data).forEach(k => {
        str = str.replace(new RegExp(`{${k}}`, 'g'), data[k]);
    });
    return str;
};

// 2. HTML 이스케이프 함수
window.escapeHtml = function(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
};

// 3. UI 가림 현상 방지 CSS 주입 (요청서 3, 4번 해결)
(function() {
    const style = document.createElement('style');
    style.textContent = `
        /* 모달 레이아웃 구조화 */
        .modal-panel { display: flex !important; flex-direction: column !important; max-height: 90vh !important; overflow: hidden !important; }
        .modal-header { flex: 0 0 auto !important; z-index: 10 !important; background: inherit; }
        .modal-content { flex: 1 1 auto !important; display: flex !important; flex-direction: column !important; overflow: hidden !important; min-height: 0; }
        .modal-toolbar { flex: 0 0 auto !important; background: rgba(0,0,0,0.8); z-index: 5 !important; padding: 10px 0; }
        .modal-scroll, .list-content-area, .mission-list-container { 
            flex: 1 1 auto !important; 
            overflow-y: auto !important; 
            padding-bottom: 100px !important; 
            -webkit-overflow-scrolling: touch; 
        }
        /* 서버 드롭다운 등 UI 요소 정렬 */
        select option { padding: 5px; }
    `;
    document.head.appendChild(style);
})();

// 4. 세이브 안정성 가드 (요청서 6, 7번)
function getSaveScore(saveObj) {
    if(!saveObj || !saveObj.state) return -1;
    const s = saveObj.state;
    // 코드 수, 레벨, 크레딧 등을 종합하여 점수 계산
    return (s.inventory?.length || 0) * 100 + (s.level || 0) * 50 + (s.credits || 0) / 1000;
}

// 기존 loadGame을 래핑하거나 로직 보강 필요 (여기서는 핵심 로직 가이드만 포함)
console.log('[Stability Patch] Loaded');
const CURRENT_VERSION = '3.1.0';
const TUTORIAL_VERSION = 6;
    const ENERGY_INTERVAL_MS = 60000; // 에너지 1칸당 60초
    const SAVE_KEY = 'HCSiG_SAVE_v17';
const I18N = {
  ko: {
    appTitle: 'HCSiG - Hacking Code Simulator Game', subtitle: 'Hacking Code Simulator Game', list:'LIST', listTitle:'LIST', event:'EVENT', eventTitle:'EVENT', more: '더보기 ▾', moreTitle: '더보기', status:'Status', shop:'Shop', actions:'Actions', codeInventory:'코드 인벤토리', codeDetail:'코드 상세',
    level:'레벨', exp:'경험치', credits:'크레딧', cpuTier:'CPU 티어', gpuTier:'GPU 티어', energy:'에너지', nextRecovery:'다음 회복까지', energyPack:'에너지 팩', lastSave:'마지막 저장', use:'사용', sort:'정렬', category:'분류', all:'전체', system:'시스템', economy:'경제', utility:'유틸',
    codeScan:'코드 스캔', serverHack:'서버 해킹', cpuUpgrade:'CPU 업그레이드', gpuUpgrade:'GPU 업그레이드', targetServer:'타겟 서버', loadout:'로드아웃', saveSlot:'슬롯 저장', loadSlot:'슬롯 불러오기', hackMode:'해킹 모드',
    actionsDesc1:'· 에너지 1칸 = 60초, 0.1초 단위로 카운트다운 표시', actionsDesc2:'· 코드 스캔: 에너지 1, 스캔 EXP 소량 (희귀도별 스캔 시간 차등)', actionsDesc3:'· 서버 해킹: NORMAL/RISK/EXTREME 난이도 선택 가능', actionsDesc4:'· CPU는 성공률 안정, GPU는 반복/도전 보상 증폭을 담당합니다.',
    codeUpgrade:'코드 강화', codeSync:'코드 동기화', codeEvolve:'코드 진화', shardEnhance:'조각 강화', codeDesc1:'· 강화: 코드 레벨에 비례한 크레딧 소모, 파워 증가 (파괴 없음).', codeDesc2:'· 동기화: 중복 조각을 모아 성공률 보정과 파워를 함께 강화합니다.', codeDesc3:'· 진화: 일정 레벨 이상 시 희귀도 승급 (COMMON → UNCOMMON → … → LEGENDARY).',
    mission:'미션', achievement:'업적', codex:'코드 도감', logs:'로그', liveNet:'LIVE NET', rank:'RANK', settings:'설정', data:'클라우드 계정', quest:'퀘스트', records:'기록', liveNetRecords:'네트워크 관제', softRank:'소프트 랭킹', envSettings:'환경 설정', dataManage:'클라우드 계정', close:'닫기',
    logSearchHelp:'로그 검색 (로그 항목 클릭 → 핀/해제)', searchPlaceholder:'검색어 입력...', clearLogs:'로그 초기화', hideLogs:'로그 숨기기', showLogs:'로그 보이기', logFilter:'로그 필터',
    language:'언어', fontScale:'폰트 크기', snow:'눈 이펙트', uiScale:'UI 스케일', animation:'애니메이션', sfx:'효과음', sfxVolume:'효과음 볼륨', toastTime:'토스트 시간', autosaveToast:'자동저장 알림', liveNetwork:'LIVE NET', liveNicknameMode:'네트워크 표시명', nickname:'닉네임', callsign:'Callsign', enabled:'사용', settingsHelp:'· 설정은 저장 데이터에 포함되며, 새로고침 후에도 유지됩니다.',
    saveNow:'저장하기', loadNow:'불러오기', clearSave:'저장 데이터 삭제', exportSave:'내보내기', importFile:'파일 불러오기', importText:'텍스트로 불러오기', importTextPlaceholder:'여기에 JSON을 붙여넣고 불러오기를 누르세요.', importTextBtn:'텍스트 불러오기', saveHelp:'· 저장 위치: 클라우드 계정<br/>· 브라우저 내부 저장은 자동 캐시와 기존 세이브 이전에만 사용됩니다.',
    shopSortUpdate:'업데이트순', shopSortNew:'신규 우선', shopSortRarity:'희귀도순', shopSortPrice:'가격순', shopSortName:'이름순', codeSortRecent:'최신', codeSortRarity:'희귀도', codeSortPower:'파워', codeSortLevel:'레벨', codeSortName:'이름',
    codexSummary:'발견 {a} / {b}', discovered:'DISCOVERED', locked:'LOCKED', basePower:'기본 파워', ownedLvPwr:'보유 Lv.{lv} / PWR {pwr}', undiscoveredCode:'미발견 코드', undiscoveredDesc:'아직 발견하지 못한 코드입니다. 코드 스캔으로 해제하세요.', noCodes:'보유 코드 없음. [코드 스캔]으로 코드를 얻으세요.', selectCode:'보유 중인 코드를 선택하면 상세 정보가 표시됩니다.',
    levelLabel:'레벨: Lv.{v}', powerLabel:'파워: {v}', usageLabel:'사용 횟수: {v}', shardsLabel:'중복 조각: {v}', syncLabel:'동기화 단계: {v}', nextUpgrade:'다음 강화 비용: {v} 크레딧', nextSync:'다음 동기화 비용: 조각 {a} / 예상 성공률 보정 +{b}%', evolveReady:'진화 조건: 충족', evolveNeed:'진화 조건: Lv.5 이상 필요', ability:'능력', noDesc:'설명 없음.',
    missionHeaderDaily:'DAILY QUEST', missionHeaderWeekly:'WEEKLY QUEST', missionHeaderMonth:'MONTH QUEST', missionHeaderGeneral:'GENERAL QUEST', reward:'보상', none:'없음', complete:'완료', incomplete:'미완', achieved:'달성', notYet:'미달', hiddenAchievement:'히든 업적입니다. 달성 시 공개됩니다.', difficultyEasy:'일반', difficultyNormal:'보통', achievementDifficultyHard:'어려움', hidden:'HIDDEN', achievementAll:'전체', achievementIncomplete:'미완료', achievementComplete:'완료', achievementShowHidden:'숨김 포함',
    full:'FULL', seconds:'초', minutes:'분', visible:'표시', on:'ON', off:'OFF',
    saveStateSaved:'게임 상태가 클라우드 캐시에 저장되었습니다.', saveComplete:'클라우드 캐시 저장 완료', autosaveComplete:'✅ 자동 캐시 저장 완료', noSavedData:'저장된 데이터가 없습니다.', saveLoaded:'저장된 데이터를 불러왔습니다.', saveLoadError:'저장 데이터를 불러오는 중 오류가 발생했습니다.', saveDeleted:'저장 데이터가 삭제되었습니다.', exportFail:'내보내기 실패 (콘솔 확인)', hackModeLog:'해킹 모드: {mode}', riskPenaltyLog:'RISK 실패 페널티: 에너지가 추가로 1 소모되었습니다.', extremePenaltyLog:'EXTREME 실패 페널티: 에너지가 추가로 2 소모되었습니다.', gpuUpgradeLog:'GPU 업그레이드 완료! 현재 티어: {tier} (소모 크레딧 {cost})', gpuUpgradeFail:'GPU 업그레이드 실패: 크레딧이 부족합니다. (필요: {cost})', loadoutSaved:'로드아웃 슬롯 {slot}에 현재 설정을 저장했습니다.', loadoutEmpty:'로드아웃 슬롯 {slot}에 저장된 설정이 없습니다.', loadoutLoaded:'로드아웃 슬롯 {slot}을 불러왔습니다.',
    toastAchievement:'업적 달성: {name}', achievementLog:'[업적 달성] {name}', activeCode:'활성 코드 변경: {name}', levelUpLog:'레벨 업! Lv.{lv} 달성. 크레딧 +50 지급.', noEnergyPack:'에너지 팩이 없습니다.', energyFull:'이미 에너지가 가득 찼습니다.', usedEnergyPack:'에너지 팩 1개를 사용해 에너지를 최대치까지 회복했습니다.',
    noCodeSync:'동기화할 코드가 없습니다.', syncFailShards:'코드 동기화 실패: 중복 조각이 부족합니다. (필요: {need}, 보유: {have})', syncDone:'코드 동기화 완료: {name} 동기화 {lv}단계 달성. 파워 +{pwr}, 성공률 보정 +{rate}%.', syncToast:'{name} 동기화 {lv}단계', noCodeUpgrade:'강화할 코드가 없습니다. 먼저 코드를 스캔하세요.', upgradeFailCredits:'코드 강화 실패: 크레딧이 부족합니다. (필요: {cost})', upgradeDone:'코드 강화: {name} Lv.{lv} (파워 +5 → {pwr}), 크레딧 -{cost}.', noCodeEvolve:'진화할 코드가 없습니다.', maxRarity:'이미 최상위 희귀도(LEGENDARY)입니다. 더 이상 진화할 수 없습니다.', evolveNeedLv:'코드 진화 실패: 진화에는 최소 Lv.5 이상이 필요합니다.', evolveCannot:'진화를 처리할 수 없습니다.', evolveDone:'코드 진화 성공: {name}가 {rarity} 등급으로 승급, 파워 +10 → {pwr}.', shardEnhanceFail:'조각 강화 실패: 조각이 부족합니다. (필요: {need}, 보유: {have})', shardEnhanceDone:'조각 강화: {name} PWR +2 → {pwr}. 조각 -{cost}.', shardEnhanceCost:'조각 강화 비용: 조각 {cost} / PWR +2',
    noEnergyScan:'에너지가 부족하여 코드 스캔을 수행할 수 없습니다.', noEnergyHack:'에너지가 부족하여 서버 해킹을 수행할 수 없습니다.', energyPackToast:'에너지 팩 +1 (보유: {v})', offlineRecoverLog:'오프라인 동안 에너지 {v} 회복 ({label} 경과)', offlineRecoverToast:'오프라인 회복: 에너지 +{v}', exportDone:'저장 데이터 내보내기 완료', importDone:'저장 데이터 불러오기 완료', importFail:'불러오기 실패: JSON 형식을 확인하세요.', emptyText:'텍스트가 비어 있습니다.', logsHide:'로그 숨기기', logsShow:'로그 보이기', initLog:'HCSiG 초기화 완료. (언어 설정, 중복 조각/코드 동기화, 모바일 UI, 상점 분류 적용)', mobileHome:'HOME', mobileCodes:'CODES', mobileShop:'SHOP', mobileMore:'MORE', mobileLab:'LAB', mobileStage:'데이터 타워', mobileComing:'EXTEND', tutorialReplay:'튜토리얼 다시 보기', comingSoonToast:'Coming Soon - 준비 중인 기능입니다.', buy:'구매', buyDone:'구매 완료', buyUnavailable:'구매 불가', buySpendTitle:'구매하면 크레딧이 소모됩니다.', buyDailyLimit:'오늘 구매 제한에 도달했습니다.', buyOnceLimit:'이미 구매한 영구 아이템입니다.', notEnoughCredits:'크레딧이 부족합니다.', shopLog:'[상점] {msg}', shopBought:'{name} 구매 (💰 -{cost})', missionDoneToast:'미션 완료: {name} ({reward})', missionDoneCredits:'크레딧 +{v}', missionDoneEnergyPack:'에너지 팩 +{v}', missionDoneBoth:'크레딧 +{c} / 에너지 팩 +{e}', serverOption:'{name} (보안 {sec}, Lv{lv}+)', serverLevelNeed:'해당 서버를 해킹하려면 최소 Lv.{lv} 이상이어야 합니다.', noOwnedCodes:'보유 코드가 없습니다. 먼저 코드 스캔으로 코드를 확보하세요.', scanFound:'새 코드 발견! {name} [{rarity}]', scanDuplicate:'중복 코드 감지: {name} [{rarity}] → 중복 조각 +{gain} (보유 {have}).', scanDone:'코드 스캔 완료: 경험치 +{exp}.', hackSuccessLog:'서버 해킹 성공! [{server}] 성공 확률 {chance}%. 크레딧 +{credits}, EXP +{exp}.', hackFailLog:'서버 해킹 실패. [{server}] 성공 확률 {chance}%였음.', logDailyShopReset:'[시스템] 일일 상점 제한이 초기화되었습니다. (05:00 리셋)', loadoutSlot:'슬롯 {n}', logPinHint:'로그 항목 클릭 → 핀/해제', saveToLocal:'현재 상태를 브라우저 LocalStorage에 저장합니다.', loadFromLocal:'LocalStorage에서 저장된 데이터를 불러옵니다.', deleteSave:'저장 데이터를 삭제합니다.', exportJson:'현재 저장 데이터를 JSON 파일로 내보냅니다.', importJsonFile:'JSON 저장 파일을 불러옵니다.', importJsonText:'텍스트(JSON)로 저장 데이터를 불러옵니다.', languageTitle:'게임 언어를 선택합니다.', uiScaleTitle:'전체 UI 배율을 조정합니다.', toastTitle:'화면 알림(토스트) 표시 시간을 설정합니다.', shopSortTitle:'상점 아이템 정렬 기준을 선택합니다.', codeSortTitle:'코드 인벤토리 정렬 기준을 선택합니다.', dailyResetLabel:'05:00 리셋 ({n}회)', onceLabel:'1회', dailyShort:'일일', onceShort:'1회', rarityCommon:'COMMON', rarityUncommon:'UNCOMMON', rarityRare:'RARE', rarityEpic:'EPIC', rarityLegendary:'LEGENDARY', rarityOperation:'OPERATION', routeExternal:'외부 루트', routeInternal:'내부 루트', routeCore:'코어 루트', targetRoute:'루트', upgradeTarget:'업그레이드 대상', systemStatus:'시스템 상태', creditsTab:'CREDITS', manualTab:'설명서', extendSpecial:'특수전', extendSpecialSoonA:'전파 차단', extendSpecialSoonB:'야간 침투', extendSpecialSoonC:'무인 감시', difficultyIntro:'입문', difficultyGeneral:'일반', difficultyStandard:'보통', difficultyHard:'어려움', difficultyChaos:'혼돈', difficultyImpossible:'불가능', passTab:'PASS', weeklyTab:'WEEKLY', seasonPass:'시즌 패스', passPoints:'패스 포인트', passTier:'패스 티어', seasonShop:'시즌 상점', opsShop:'OPS 상점', zeroDayOnboarding:'온보딩', zeroDayPve:'PVE', zeroDayPvp:'PVP', zeroDaySingle:'싱글', zeroDayCompete:'경쟁', vulnerability:'취약점', vulnerabilityShard:'취약점 조각', oneDay:'OneDay', coin:'COIN', token:'TOKEN', accountStatus:'계정 및 클라우드 상태', accountCustom:'계정 커스텀', comingSoonToastShort:'준비 중입니다.', zeroDayCmdLocale:'ZERO-DAY 명령어 표시', zdCmdAuto:'auto', zdCmdEn:'english', zdCmdKo:'korean', energyRecoveryDesc:'에너지 1칸 = 60초', todayTitle:'오늘 할 일', todayEnergy:'에너지', todayDailyMissions:'일일 미션', todayWeeklyGoals:'WEEKLY 목표', todayEnergyPack:'에너지 팩', todayComplete:'완료', todayRemaining:'남음', mobileInventory:'INVENTORY', inventoryCodesTab:'CODES', inventoryItemsTab:'ITEMS', itemsConsumables:'소모품', itemsCurrency:'재화', itemsComingSoon:'· Daily Bonus Box와 ROM은 다음 업데이트에서 추가됩니다.', autoRunLabel:'AUTO-RUN', autoScanLabel:'자동 스캔', autoHackLabel:'자동 해킹', autoRunStop:'중지', autoRunActive:'진행 중', autoRunUsesLeft:'남은 횟수', autoRunStartScan:'자동 스캔을 시작합니다. (10초마다 / 1시간)', autoRunStartHack:'자동 해킹을 시작합니다. (20초마다 / 30분)', autoRunStopped:'자동 실행이 중단되었습니다.', autoRunEnded:'자동 실행이 완료되었습니다.', autoRunNoEnergy:'에너지와 에너지 팩이 모두 소진되어 자동 실행을 중단합니다.', autoRunNoCoin:'COIN이 부족합니다.', autoRunDailyLimit:'오늘 자동 실행 횟수를 모두 사용했습니다. (일일 3회)', autoRunAlreadyActive:'이미 자동 실행이 진행 중입니다. 먼저 중지해주세요.', autoRunPause:'일시 중지', autoRunResume:'재개', autoRunEnd:'종료', autoRunPaused:'일시 중지됨', timeSwapLabel:'타임 스와프', timeSwap2h:'타임 스와프 2h', timeSwap5h:'타임 스와프 5h', timeSwap10h:'타임 스와프 10h', timeSwapUseAutoRun:'AUTO-RUN 연장', timeSwapUseEnergy:'에너지 회복 단축', timeSwapExtended:'AUTO-RUN 시간이 연장되었습니다.', timeSwapEnergySkipped:'에너지 회복 대기시간이 단축되었습니다.', timeSwapNone:'타임 스와프가 없습니다.', timeSwapFull:'에너지가 이미 최대이고 AUTO-RUN이 비활성 상태입니다.', traceAmpleLabel:'TRACE 앰플', nullSeedLabel:'NULL 시드', itemsGrowth:'성장 재료', rouletteTab:'룰렛', rouletteTitle:'초보자 한정 룰렛', rouletteDesc:'신규 계정 기준 10일간 매일 1회 수령할 수 있는 한정 룰렛입니다.', rouletteClaim:'오늘의 룰렛 뽑기', rouletteAlreadyClaimed:'오늘은 이미 수령했습니다. 내일 다시 오세요.', rouletteExpired:'초보자 한정 룰렛 기간이 종료되었습니다.', rouletteDayCount:'{cur} / 10일 완료', rouletteGuaranteed:'확정 보상', rouletteBonus:'랜덤 추가 보상', supportTab:'SUPPORT', supportTitle:'HCSiG 후원하기', supportDesc:'HCSiG를 응원해주시면 개발 지속에 큰 힘이 됩니다. 수동 처리 방식으로 운영자가 직접 확인 후 보상을 지급합니다.', supportHow:'구매 방법', supportHowDesc:'상품을 선택하고, 계정 정보를 복사하여 아래 문의 채널로 전달해주세요. 운영자 확인 후 보상이 지급됩니다.', supportContact:'문의하기', supportPending:'처리 대기 중', supportYourId:'내 계정 정보'
  },
  en: {
    appTitle: 'HCSiG - Hacking Code Simulator Game', subtitle: 'Hacking Code Simulator Game', list:'LIST', listTitle:'LIST', event:'EVENT', eventTitle:'EVENT', more: 'More ▾', moreTitle: 'More', status:'Status', shop:'Shop', actions:'Actions', codeInventory:'Code Inventory', codeDetail:'Code Detail',
    level:'Level', exp:'EXP', credits:'Credits', cpuTier:'CPU Tier', gpuTier:'GPU Tier', energy:'Energy', nextRecovery:'Next Recovery', energyPack:'Energy Pack', lastSave:'Last Save', use:'Use', sort:'Sort', category:'Category', all:'All', system:'System', economy:'Economy', utility:'Utility',
    codeScan:'Scan Code', serverHack:'Hack Server', cpuUpgrade:'Upgrade CPU', gpuUpgrade:'Upgrade GPU', targetServer:'Target Server', loadout:'Loadout', saveSlot:'Save Slot', loadSlot:'Load Slot', hackMode:'Hack Mode',
    actionsDesc1:'· 1 energy = 60 seconds, shown with 0.1-second countdown', actionsDesc2:'· Scan Code: costs 1 energy and grants scan EXP', actionsDesc3:'· Hack Server: choose NORMAL / RISK / EXTREME difficulty', actionsDesc4:'· CPU stabilizes success, GPU amplifies repeat/challenge rewards.',
    codeUpgrade:'Upgrade Code', codeSync:'Sync Code', codeEvolve:'Evolve Code', shardEnhance:'Shard Boost', codeDesc1:'· Upgrade: costs credits based on code level and raises power (no destruction).', codeDesc2:'· Sync: spend duplicate shards to raise success bonus and power together.', codeDesc3:'· Evolve: rank up at a required level (COMMON → UNCOMMON → … → LEGENDARY).',
    mission:'Mission', achievement:'Achievements', codex:'Code Codex', logs:'Logs', liveNet:'LIVE NET', rank:'RANK', settings:'Settings', data:'Cloud Account', quest:'Quests', records:'Records', liveNetRecords:'Network Control', softRank:'Soft Ranking', envSettings:'Settings', dataManage:'Cloud Account', close:'Close',
    logSearchHelp:'Search logs (click a log entry to pin/unpin)', searchPlaceholder:'Type to search...', clearLogs:'Clear Logs', hideLogs:'Hide Logs', showLogs:'Show Logs', logFilter:'Log Filter',
    language:'Language', fontScale:'Font Size', snow:'Snow Effect', uiScale:'UI Scale', animation:'Animation', sfx:'Sound Effects', sfxVolume:'SFX Volume', toastTime:'Toast Duration', autosaveToast:'Autosave Toast', liveNetwork:'LIVE NET', liveNicknameMode:'Network Name', nickname:'Nickname', callsign:'Callsign', enabled:'Enabled', settingsHelp:'· Settings are stored with save data and remain after refresh.',
    saveNow:'Save', loadNow:'Load', clearSave:'Delete Save Data', exportSave:'Export', importFile:'Import File', importText:'Import from Text', importTextPlaceholder:'Paste JSON here and press import.', importTextBtn:'Import Text', saveHelp:'· Save location: cloud account<br/>· Browser storage is used only for automatic cache and migration.',
    shopSortUpdate:'By Update', shopSortNew:'Newest First', shopSortRarity:'By Rarity', shopSortPrice:'By Price', shopSortName:'By Name', codeSortRecent:'Recent', codeSortRarity:'Rarity', codeSortPower:'Power', codeSortLevel:'Level', codeSortName:'Name',
    codexSummary:'Discovered {a} / {b}', discovered:'DISCOVERED', locked:'LOCKED', basePower:'Base Power', ownedLvPwr:'Owned Lv.{lv} / PWR {pwr}', undiscoveredCode:'Undiscovered Code', undiscoveredDesc:'You have not discovered this code yet. Unlock it by scanning codes.', noCodes:'No codes owned. Use [Scan Code] to get one.', selectCode:'Select an owned code to view details.',
    levelLabel:'Level: Lv.{v}', powerLabel:'Power: {v}', usageLabel:'Uses: {v}', shardsLabel:'Duplicate Shards: {v}', syncLabel:'Sync Level: {v}', nextUpgrade:'Next upgrade cost: {v} credits', nextSync:'Next sync cost: {a} shards / expected success bonus +{b}%', evolveReady:'Evolution requirement: Met', evolveNeed:'Evolution requirement: Need Lv.5+', ability:'Ability', noDesc:'No description.',
    missionHeaderDaily:'DAILY QUEST', missionHeaderWeekly:'WEEKLY QUEST', missionHeaderMonth:'MONTH QUEST', missionHeaderGeneral:'GENERAL QUEST', reward:'Reward', none:'None', complete:'Complete', incomplete:'Incomplete', achieved:'Achieved', notYet:'Not Yet', hiddenAchievement:'This is a hidden achievement. It will be revealed when completed.', difficultyEasy:'Easy', difficultyNormal:'Normal', achievementDifficultyHard:'Hard', hidden:'HIDDEN', achievementAll:'All', achievementIncomplete:'Incomplete', achievementComplete:'Complete', achievementShowHidden:'Include Hidden',
    full:'FULL', seconds:'sec', minutes:'min', visible:'Visible', on:'ON', off:'OFF',
    saveStateSaved:'Game state saved to cloud cache.', saveComplete:'Cloud cache saved', autosaveComplete:'✅ Autosave cache complete', noSavedData:'No saved data found.', saveLoaded:'Saved data loaded.', saveLoadError:'An error occurred while loading save data.', saveDeleted:'Save data deleted.', exportFail:'Export failed (check console)', hackModeLog:'Hack Mode: {mode}', riskPenaltyLog:'RISK failure penalty consumed 1 additional energy.', extremePenaltyLog:'EXTREME failure penalty consumed 2 additional energy.', gpuUpgradeLog:'GPU upgrade complete! Current tier: {tier} (Credits -{cost})', gpuUpgradeFail:'GPU upgrade failed: not enough credits. (Need: {cost})', loadoutSaved:'Saved current setup to loadout slot {slot}.', loadoutEmpty:'There is no saved setup in loadout slot {slot}.', loadoutLoaded:'Loaded loadout slot {slot}.',
    toastAchievement:'Achievement unlocked: {name}', achievementLog:'[Achievement] {name}', activeCode:'Active code changed: {name}', levelUpLog:'Level up! Reached Lv.{lv}. Credits +50.', noEnergyPack:'No energy packs available.', energyFull:'Energy is already full.', usedEnergyPack:'Used 1 energy pack and fully restored energy.',
    noCodeSync:'There is no code to sync.', syncFailShards:'Code sync failed: not enough duplicate shards. (Need: {need}, Have: {have})', syncDone:'Code sync complete: {name} reached sync stage {lv}. Power +{pwr}, success bonus +{rate}%.', syncToast:'{name} sync stage {lv}', noCodeUpgrade:'There is no code to upgrade. Scan a code first.', upgradeFailCredits:'Code upgrade failed: not enough credits. (Need: {cost})', upgradeDone:'Code upgraded: {name} Lv.{lv} (Power +5 → {pwr}), Credits -{cost}.', noCodeEvolve:'There is no code to evolve.', maxRarity:'Already at the highest rarity (LEGENDARY). It cannot evolve further.', evolveNeedLv:'Code evolution failed: evolution requires at least Lv.5.', evolveCannot:'Cannot process evolution.', evolveDone:'Code evolution success: {name} advanced to {rarity}, Power +10 → {pwr}.', shardEnhanceFail:'Shard boost failed: not enough shards. (Need: {need}, Have: {have})', shardEnhanceDone:'Shard boost: {name} PWR +2 → {pwr}. Shards -{cost}.', shardEnhanceCost:'Shard boost cost: {cost} shards / PWR +2',
    noEnergyScan:'Not enough energy to scan a code.', noEnergyHack:'Not enough energy to hack the server.', energyPackToast:'Energy Pack +1 (Owned: {v})', offlineRecoverLog:'Recovered {v} energy while offline ({label} elapsed)', offlineRecoverToast:'Offline recovery: Energy +{v}', exportDone:'Save data exported.', importDone:'Save data imported.', importFail:'Import failed: please check the JSON format.', emptyText:'The text box is empty.', logsHide:'Hide Logs', logsShow:'Show Logs', initLog:'HCSiG initialized. (language setting, duplicate shards/code sync, mobile UI, shop categories enabled)', mobileHome:'HOME', mobileCodes:'CODES', mobileShop:'SHOP', mobileComing:'EXTEND', comingSoonToast:'Coming Soon - This feature is in preparation.', buy:'Buy', buyDone:'Purchase complete', buyUnavailable:'Unavailable', buySpendTitle:'Buying this item will consume credits.', buyDailyLimit:'You have reached today\'s purchase limit.', buyOnceLimit:'This permanent item has already been purchased.', notEnoughCredits:'Not enough credits.', shopLog:'[Shop] {msg}', shopBought:'Purchased {name} (💰 -{cost})', missionDoneToast:'Mission complete: {name} ({reward})', missionDoneCredits:'Credits +{v}', missionDoneEnergyPack:'Energy Pack +{v}', missionDoneBoth:'Credits +{c} / Energy Pack +{e}', serverOption:'{name} (Security {sec}, Lv{lv}+)', serverLevelNeed:'You must be at least Lv.{lv} to hack this server.', noOwnedCodes:'You do not own any codes yet. Scan codes first.', scanFound:'New code discovered! {name} [{rarity}]', scanDuplicate:'Duplicate code detected: {name} [{rarity}] → Duplicate Shards +{gain} (Owned {have}).', scanDone:'Code scan complete: EXP +{exp}.', hackSuccessLog:'Server hack success! [{server}] Success chance {chance}%. Credits +{credits}, EXP +{exp}.', hackFailLog:'Server hack failed. [{server}] Success chance was {chance}%.', logDailyShopReset:'[System] Daily shop limits have been reset. (05:00 reset)', loadoutSlot:'Slot {n}', logPinHint:'Click a log entry to pin/unpin it', saveToLocal:'Save the current state to browser LocalStorage.', loadFromLocal:'Load saved data from LocalStorage.', deleteSave:'Delete the saved data.', exportJson:'Export the current save data as a JSON file.', importJsonFile:'Load a JSON save file.', importJsonText:'Load save data from text (JSON).', languageTitle:'Select the game language.', uiScaleTitle:'Adjust the overall UI scale.', toastTitle:'Set how long toast notifications remain on screen.', shopSortTitle:'Choose how shop items are sorted.', codeSortTitle:'Choose how the code inventory is sorted.', dailyResetLabel:'05:00 reset ({n})', onceLabel:'one-time', dailyShort:'daily', onceShort:'once', rarityCommon:'COMMON', rarityUncommon:'UNCOMMON', rarityRare:'RARE', rarityEpic:'EPIC', rarityLegendary:'LEGENDARY', rarityOperation:'OPERATION', routeExternal:'External Route', routeInternal:'Internal Route', routeCore:'Core Route', targetRoute:'Route', upgradeTarget:'Upgrade Target', systemStatus:'System Status', creditsTab:'CREDITS', manualTab:'Manual', extendSpecial:'Special Ops', extendSpecialSoonA:'Signal Blackout', extendSpecialSoonB:'Night Breach', extendSpecialSoonC:'Sentinel Grid', difficultyIntro:'Intro', difficultyGeneral:'General', difficultyStandard:'Standard', difficultyHard:'Hard', difficultyChaos:'Chaos', difficultyImpossible:'Impossible', passTab:'PASS', weeklyTab:'WEEKLY', seasonPass:'Season Pass', passPoints:'Pass Points', passTier:'Pass Tier', seasonShop:'Season Shop', opsShop:'OPS Shop', zeroDayOnboarding:'Onboarding', zeroDayPve:'PVE', zeroDayPvp:'PVP', zeroDaySingle:'Single', zeroDayCompete:'Compete', vulnerability:'Vulnerability', vulnerabilityShard:'Vuln. Shard', oneDay:'OneDay', coin:'COIN', token:'TOKEN', accountStatus:'Account & Cloud Status', accountCustom:'Account Custom', comingSoonToastShort:'In preparation.', zeroDayCmdLocale:'ZERO-DAY Command Display', zdCmdAuto:'auto', zdCmdEn:'english', zdCmdKo:'korean', energyRecoveryDesc:'1 energy = 60 seconds', todayTitle:'Today', todayEnergy:'Energy', todayDailyMissions:'Daily Missions', todayWeeklyGoals:'WEEKLY Goals', todayEnergyPack:'Energy Pack', todayComplete:'complete', todayRemaining:'remaining', mobileInventory:'INVENTORY', inventoryCodesTab:'CODES', inventoryItemsTab:'ITEMS', itemsConsumables:'Consumables', itemsCurrency:'Currency', itemsComingSoon:'· Daily Bonus Box and ROM will be added in upcoming updates.', autoRunLabel:'AUTO-RUN', autoScanLabel:'Auto Scan', autoHackLabel:'Auto Hack', autoRunStop:'Stop', autoRunActive:'Active', autoRunUsesLeft:'Uses left', autoRunStartScan:'Auto Scan started. (every 10s / 1 hour)', autoRunStartHack:'Auto Hack started. (every 20s / 30 min)', autoRunStopped:'Auto-run stopped.', autoRunEnded:'Auto-run completed.', autoRunNoEnergy:'Auto-run stopped: no energy or energy packs remaining.', autoRunNoCoin:'Not enough COIN.', autoRunDailyLimit:'Daily auto-run uses exhausted. (3/day)', autoRunAlreadyActive:'Auto-run is already active. Stop it first.', autoRunPause:'Pause', autoRunResume:'Resume', autoRunEnd:'End', autoRunPaused:'Paused', timeSwapLabel:'Time Swap', timeSwap2h:'Time Swap 2h', timeSwap5h:'Time Swap 5h', timeSwap10h:'Time Swap 10h', timeSwapUseAutoRun:'Extend AUTO-RUN', timeSwapUseEnergy:'Skip Energy Recovery', timeSwapExtended:'AUTO-RUN time extended.', timeSwapEnergySkipped:'Energy recovery time skipped.', timeSwapNone:'No Time Swap available.', timeSwapFull:'Energy is full and AUTO-RUN is inactive.', traceAmpleLabel:'TRACE Ample', nullSeedLabel:'NULL Seed', itemsGrowth:'Growth Materials', rouletteTab:'Roulette', rouletteTitle:'Beginner Roulette', rouletteDesc:'A limited roulette available once a day for 10 days from your first login.', rouletteClaim:"Today's Roll", rouletteAlreadyClaimed:'Already claimed today. Come back tomorrow.', rouletteExpired:'Beginner roulette period has ended.', rouletteDayCount:'{cur} / 10 days', rouletteGuaranteed:'Guaranteed', rouletteBonus:'Random Bonus', supportTab:'SUPPORT', supportTitle:'Support HCSiG', supportDesc:'Your support helps keep HCSiG running. Rewards are processed manually by the operator after confirmation.', supportHow:'How to Purchase', supportHowDesc:'Select a product and send your account info to the contact channel below. Rewards will be delivered after operator review.', supportContact:'Contact Us', supportPending:'Pending', supportYourId:'Your Account Info'
    ,mobileMore:'MORE', mobileLab:'LAB', mobileStage:'DATA TOWER', tutorialReplay:'Replay Tutorial'
  },
  ja: {
    appTitle: 'HCSiG - Hacking Code Simulator Game', subtitle: 'Hacking Code Simulator Game', list:'リスト', listTitle:'リスト', event:'イベント', eventTitle:'イベント', more: 'メニュー ▾', moreTitle: 'メニュー', status:'ステータス', shop:'ショップ', actions:'アクション', codeInventory:'コードインベントリ', codeDetail:'コード詳細',
    level:'レベル', exp:'EXP', credits:'クレジット', cpuTier:'CPUティア', gpuTier:'GPUティア', energy:'エネルギー', nextRecovery:'次の回復まで', energyPack:'エネルギーパック', lastSave:'最終保存', use:'使用', sort:'並び替え', category:'カテゴリ', all:'全て', system:'システム', economy:'経済', utility:'ユーティリティ',
    codeScan:'コードスキャン', serverHack:'サーバーハッキング', cpuUpgrade:'CPUアップグレード', gpuUpgrade:'GPUアップグレード', targetServer:'ターゲットサーバー', loadout:'ロードアウト', saveSlot:'スロット保存', loadSlot:'スロット読込', hackMode:'ハッキングモード',
    actionsDesc1:'· エネルギー1 = 60秒、0.1秒単位でカウントダウン表示', actionsDesc2:'· コードスキャン: エネルギー1、スキャンEXP少量', actionsDesc3:'· サーバーハッキング: NORMAL/RISK/EXTREME 難易度を選択可能', actionsDesc4:'· CPUは成功率の安定、GPUは反復/挑戦報酬の増幅を担当します。',
    codeUpgrade:'コード強化', codeSync:'コード同期', codeEvolve:'コード進化', shardEnhance:'シャード強化', codeDesc1:'· 強化: コードレベルに応じてクレジットを消費し、パワーが上昇します（破壊なし）。', codeDesc2:'· 同期: 重複シャードを集めて成功率補正とパワーを同時に強化します。', codeDesc3:'· 進化: 一定レベル以上でレアリティ昇格 (COMMON → UNCOMMON → … → LEGENDARY)。',
    mission:'ミッション', achievement:'実績', codex:'コード図鑑', logs:'ログ', liveNet:'LIVE NET', rank:'RANK', settings:'設定', data:'クラウドアカウント', quest:'クエスト', records:'記録', liveNetRecords:'ネットワーク管制', softRank:'ソフトランキング', envSettings:'環境設定', dataManage:'クラウドアカウント', close:'閉じる',
    logSearchHelp:'ログ検索 (ログ項目クリック → ピン留め/解除)', searchPlaceholder:'検索ワード入力...', clearLogs:'ログ初期化', hideLogs:'ログを隠す', showLogs:'ログを表示', logFilter:'ログフィルタ',
    language:'言語', fontScale:'フォントサイズ', snow:'雪エフェクト', uiScale:'UIスケール', animation:'アニメーション', sfx:'効果音', sfxVolume:'効果音ボリューム', toastTime:'トースト表示時間', autosaveToast:'自動保存通知', liveNetwork:'LIVE NET', liveNicknameMode:'ネットワーク表示名', nickname:'ニックネーム', callsign:'コールサイン', enabled:'使用', settingsHelp:'· 設定はセーブデータに含まれ、リロード後も保持されます。',
    saveNow:'保存', loadNow:'読込', clearSave:'セーブデータ削除', exportSave:'エクスポート', importFile:'ファイル読込', importText:'テキストで読込', importTextPlaceholder:'ここにJSONを貼り付けて読込を押してください。', importTextBtn:'テキスト読込', saveHelp:'· 保存場所: クラウドアカウント<br/>· ブラウザ内部保存は自動キャッシュと既存セーブの移行のみに使用されます。',
    shopSortUpdate:'更新順', shopSortNew:'新着優先', shopSortRarity:'レアリティ順', shopSortPrice:'価格順', shopSortName:'名前順', codeSortRecent:'最新', codeSortRarity:'レアリティ', codeSortPower:'パワー', codeSortLevel:'レベル', codeSortName:'名前',
    codexSummary:'発見 {a} / {b}', discovered:'DISCOVERED', locked:'LOCKED', basePower:'基本パワー', ownedLvPwr:'所持 Lv.{lv} / PWR {pwr}', undiscoveredCode:'未発見コード', undiscoveredDesc:'まだ発見していないコードです。コードスキャンで解放してください。', noCodes:'所持コード無し。[コードスキャン] でコードを取得してください。', selectCode:'所持コードを選択すると詳細が表示されます。',
    levelLabel:'レベル: Lv.{v}', powerLabel:'パワー: {v}', usageLabel:'使用回数: {v}', shardsLabel:'重複シャード: {v}', syncLabel:'同期段階: {v}', nextUpgrade:'次の強化コスト: {v} クレジット', nextSync:'次の同期コスト: シャード {a} / 予想成功率補正 +{b}%', evolveReady:'進化条件: 達成', evolveNeed:'進化条件: Lv.5以上が必要', ability:'能力', noDesc:'説明なし。',
    missionHeaderDaily:'DAILY QUEST', missionHeaderWeekly:'WEEKLY QUEST', missionHeaderMonth:'MONTH QUEST', missionHeaderGeneral:'GENERAL QUEST', reward:'報酬', none:'なし', complete:'完了', incomplete:'未完了', achieved:'達成', notYet:'未達', hiddenAchievement:'隠し実績です。達成時に公開されます。', difficultyEasy:'一般', difficultyNormal:'普通', achievementDifficultyHard:'難しい', hidden:'HIDDEN', achievementAll:'全て', achievementIncomplete:'未完了', achievementComplete:'完了', achievementShowHidden:'隠し含む',
    full:'FULL', seconds:'秒', minutes:'分', visible:'表示', on:'ON', off:'OFF',
    saveStateSaved:'ゲーム状態がクラウドキャッシュに保存されました。', saveComplete:'クラウドキャッシュ保存完了', autosaveComplete:'✅ 自動キャッシュ保存完了', noSavedData:'保存データがありません。', saveLoaded:'保存データを読み込みました。', saveLoadError:'保存データの読み込み中にエラーが発生しました。', saveDeleted:'保存データを削除しました。', exportFail:'エクスポート失敗 (コンソール確認)', hackModeLog:'ハッキングモード: {mode}', riskPenaltyLog:'RISK失敗ペナルティ: エネルギーが追加で1消費されました。', extremePenaltyLog:'EXTREME失敗ペナルティ: エネルギーが追加で2消費されました。', gpuUpgradeLog:'GPUアップグレード完了！ 現在のティア: {tier} (消費クレジット {cost})', gpuUpgradeFail:'GPUアップグレード失敗: クレジットが不足しています。 (必要: {cost})', loadoutSaved:'ロードアウトスロット {slot} に現在の設定を保存しました。', loadoutEmpty:'ロードアウトスロット {slot} に保存された設定がありません。', loadoutLoaded:'ロードアウトスロット {slot} を読み込みました。',
    toastAchievement:'実績達成: {name}', achievementLog:'[実績達成] {name}', activeCode:'アクティブコード変更: {name}', levelUpLog:'レベルアップ！ Lv.{lv} 達成。 クレジット +50 付与。', noEnergyPack:'エネルギーパックがありません。', energyFull:'すでにエネルギーが満タンです。', usedEnergyPack:'エネルギーパックを1個使用してエネルギーを最大まで回復しました。',
    noCodeSync:'同期するコードがありません。', syncFailShards:'コード同期失敗: 重複シャードが不足しています。 (必要: {need}, 所持: {have})', syncDone:'コード同期完了: {name} 同期 {lv}段階達成。 パワー +{pwr}, 成功率補正 +{rate}%。', syncToast:'{name} 同期 {lv}段階', noCodeUpgrade:'強化するコードがありません。先にコードをスキャンしてください。', upgradeFailCredits:'コード強化失敗: クレジットが不足しています。 (必要: {cost})', upgradeDone:'コード強化: {name} Lv.{lv} (パワー +5 → {pwr}), クレジット -{cost}。', noCodeEvolve:'進化するコードがありません。', maxRarity:'すでに最上位レアリティ(LEGENDARY)です。これ以上進化できません。', evolveNeedLv:'コード進化失敗: 進化には最低Lv.5以上が必要です。', evolveCannot:'進化を処理できません。', evolveDone:'コード進化成功: {name} が {rarity} に昇格、 パワー +10 → {pwr}。', shardEnhanceFail:'シャード強化失敗: シャードが不足しています。 (必要: {need}, 所持: {have})', shardEnhanceDone:'シャード強化: {name} PWR +2 → {pwr}。 シャード -{cost}。', shardEnhanceCost:'シャード強化コスト: シャード {cost} / PWR +2',
    noEnergyScan:'エネルギーが不足しているためコードスキャンを実行できません。', noEnergyHack:'エネルギーが不足しているためサーバーハッキングを実行できません。', energyPackToast:'エネルギーパック +1 (所持: {v})', offlineRecoverLog:'オフライン中にエネルギー {v} 回復 ({label} 経過)', offlineRecoverToast:'オフライン回復: エネルギー +{v}', exportDone:'保存データのエクスポート完了', importDone:'保存データの読込完了', importFail:'読込失敗: JSON形式を確認してください。', emptyText:'テキストが空です。', logsHide:'ログを隠す', logsShow:'ログを表示', initLog:'HCSiG 初期化完了。 (言語設定、重複シャード/コード同期、モバイルUI、ショップ分類適用)', mobileHome:'HOME', mobileCodes:'CODES', mobileShop:'SHOP', mobileMore:'MORE', mobileLab:'LAB', mobileStage:'データタワー', mobileComing:'EXTEND', tutorialReplay:'チュートリアル再表示', comingSoonToast:'Coming Soon - 準備中の機能です。', buy:'購入', buyDone:'購入完了', buyUnavailable:'購入不可', buySpendTitle:'購入するとクレジットが消費されます。', buyDailyLimit:'本日の購入制限に達しました。', buyOnceLimit:'すでに購入済みの永久アイテムです。', notEnoughCredits:'クレジットが不足しています。', shopLog:'[ショップ] {msg}', shopBought:'{name} 購入 (💰 -{cost})', missionDoneToast:'ミッション完了: {name} ({reward})', missionDoneCredits:'クレジット +{v}', missionDoneEnergyPack:'エネルギーパック +{v}', missionDoneBoth:'クレジット +{c} / エネルギーパック +{e}', serverOption:'{name} (セキュリティ {sec}, Lv{lv}+)', serverLevelNeed:'このサーバーをハックするには最低 Lv.{lv} 以上が必要です。', noOwnedCodes:'所持コードがありません。先にコードスキャンでコードを取得してください。', scanFound:'新コード発見！ {name} [{rarity}]', scanDuplicate:'重複コード検出: {name} [{rarity}] → 重複シャード +{gain} (所持 {have})。', scanDone:'コードスキャン完了: 経験値 +{exp}。', hackSuccessLog:'サーバーハッキング成功！ [{server}] 成功確率 {chance}%。 クレジット +{credits}, EXP +{exp}。', hackFailLog:'サーバーハッキング失敗。 [{server}] 成功確率 {chance}% でした。', logDailyShopReset:'[システム] デイリーショップ制限がリセットされました。 (05:00 リセット)', loadoutSlot:'スロット {n}', logPinHint:'ログ項目クリック → ピン留め/解除', saveToLocal:'現在の状態をブラウザの LocalStorage に保存します。', loadFromLocal:'LocalStorage から保存データを読み込みます。', deleteSave:'保存データを削除します。', exportJson:'現在の保存データを JSON ファイルにエクスポートします。', importJsonFile:'JSON 保存ファイルを読み込みます。', importJsonText:'テキスト(JSON)で保存データを読み込みます。', languageTitle:'ゲーム言語を選択します。', uiScaleTitle:'全体UIサイズを調整します。', toastTitle:'画面通知(トースト)の表示時間を設定します。', shopSortTitle:'ショップアイテムの並び順を選択します。', codeSortTitle:'コードインベントリの並び順を選択します。', dailyResetLabel:'05:00 リセット ({n}回)', onceLabel:'1回', dailyShort:'デイリー', onceShort:'1回', rarityCommon:'COMMON', rarityUncommon:'UNCOMMON', rarityRare:'RARE', rarityEpic:'EPIC', rarityLegendary:'LEGENDARY', rarityOperation:'OPERATION', routeExternal:'外部ルート', routeInternal:'内部ルート', routeCore:'コアルート', targetRoute:'ルート', upgradeTarget:'アップグレード対象', systemStatus:'システム状態', creditsTab:'CREDITS', manualTab:'マニュアル', extendSpecial:'特務作戦', extendSpecialSoonA:'電波遮断', extendSpecialSoonB:'夜間侵入', extendSpecialSoonC:'無人監視', difficultyIntro:'入門', difficultyGeneral:'一般', difficultyStandard:'普通', difficultyHard:'難しい', difficultyChaos:'混沌', difficultyImpossible:'不可能', passTab:'PASS', weeklyTab:'WEEKLY', seasonPass:'シーズンパス', passPoints:'パスポイント', passTier:'パスティア', seasonShop:'シーズンショップ', opsShop:'OPSショップ', zeroDayOnboarding:'オンボーディング', zeroDayPve:'PVE', zeroDayPvp:'PVP', zeroDaySingle:'シングル', zeroDayCompete:'競争', vulnerability:'脆弱性', vulnerabilityShard:'脆弱性シャード', oneDay:'OneDay', coin:'COIN', token:'TOKEN', accountStatus:'アカウントとクラウドステータス', accountCustom:'アカウントカスタム', comingSoonToastShort:'準備中です。', zeroDayCmdLocale:'ZERO-DAY コマンド表示', zdCmdAuto:'auto', zdCmdEn:'english', zdCmdKo:'korean', energyRecoveryDesc:'エネルギー1 = 60秒', todayTitle:'本日のタスク', todayEnergy:'エネルギー', todayDailyMissions:'デイリーミッション', todayWeeklyGoals:'WEEKLYゴール', todayEnergyPack:'エネルギーパック', todayComplete:'完了', todayRemaining:'残り', mobileInventory:'INVENTORY', inventoryCodesTab:'CODES', inventoryItemsTab:'ITEMS', itemsConsumables:'消耗品', itemsCurrency:'通貨', itemsComingSoon:'· Daily Bonus BoxとROMは次のアップデートで追加されます。', autoRunLabel:'AUTO-RUN', autoScanLabel:'自動スキャン', autoHackLabel:'自動ハック', autoRunStop:'停止', autoRunActive:'進行中', autoRunUsesLeft:'残り回数', autoRunStartScan:'自動スキャンを開始します。(10秒ごと / 1時間)', autoRunStartHack:'自動ハックを開始します。(20秒ごと / 30分)', autoRunStopped:'自動実行が中断されました。', autoRunEnded:'自動実行が完了しました。', autoRunNoEnergy:'エネルギーとエネルギーパックが不足したため自動実行を停止します。', autoRunNoCoin:'COINが不足しています。', autoRunDailyLimit:'本日の自動実行回数を使い切りました。(1日3回)', autoRunAlreadyActive:'すでに自動実行が進行中です。先に停止してください。', autoRunPause:'一時停止', autoRunResume:'再開', autoRunEnd:'終了', autoRunPaused:'一時停止中', timeSwapLabel:'タイムスワップ', timeSwap2h:'タイムスワップ 2h', timeSwap5h:'タイムスワップ 5h', timeSwap10h:'タイムスワップ 10h', timeSwapUseAutoRun:'AUTO-RUN延長', timeSwapUseEnergy:'エネルギー回復短縮', timeSwapExtended:'AUTO-RUN時間が延長されました。', timeSwapEnergySkipped:'エネルギー回復待機時間が短縮されました。', timeSwapNone:'タイムスワップがありません。', timeSwapFull:'エネルギーが最大でAUTO-RUNも非活性です。', traceAmpleLabel:'TRACEアンプル', nullSeedLabel:'NULLシード', itemsGrowth:'成長素材', rouletteTab:'ルーレット', rouletteTitle:'初心者限定ルーレット', rouletteDesc:'新規アカウントから10日間、毎日1回受け取れる限定ルーレットです。', rouletteClaim:'本日のルーレット', rouletteAlreadyClaimed:'本日はすでに受け取り済みです。明日またお越しください。', rouletteExpired:'初心者限定ルーレット期間が終了しました。', rouletteDayCount:'{cur} / 10日完了', rouletteGuaranteed:'確定報酬', rouletteBonus:'ランダム追加報酬', supportTab:'SUPPORT', supportTitle:'HCSiGをサポート', supportDesc:'HCSiGへのご支援が開発継続の力になります。運営者が確認後、手動で報酬を支給します。', supportHow:'購入方法', supportHowDesc:'商品を選択し、アカウント情報を下記の問い合わせ先にお送りください。運営者確認後に報酬が支給されます。', supportContact:'お問い合わせ', supportPending:'処理待ち', supportYourId:'アカウント情報'
  }
};
function getLang(){ return (state && state.ui && state.ui.lang) ? state.ui.lang : 'ko'; }
function t(key, vars){ const lang=getLang(); let str=(I18N[lang]&&I18N[lang][key]) || I18N.ko[key] || key; if(vars){ for(const [k,v] of Object.entries(vars)){ str=str.replaceAll('{'+k+'}', String(v)); } } return str; }
function langText(ko, en, ja = ko){ const lang = getLang(); return lang === 'en' ? en : (lang === 'ja' ? ja : ko); }
function setText(id, value){ const el=document.getElementById(id); if(el) el.textContent=value; }
function setHtml(id, value){ const el=document.getElementById(id); if(el) el.innerHTML=value; }

const TEXT_DATA = {
  en: {
    servers: {
      school_lab: 'School Practice Server',
      bank_backup: 'Bank Backup Node',
      gov_archive: 'Government Archive Node',
      central_core: 'Central Core Grid',
      deep_space: 'Deep Space Relay'
    },
    shop: {
      energy_pack: { name:'Energy Pack', desc:'A consumable stored in your inventory. Restores your energy to full when used.' },
      energy_boost_1: { name:'Energy Booster I', desc:'Instantly restores +5 energy.' },
      credit_boost_run: { name:'Credit Multiplier (Session)', desc:'Credits gained from successful hacks are multiplied by 1.5 for the current session.' },
      max_energy_up: { name:'Max Energy Upgrade', desc:'Permanently increases max energy by +5.' },
      scanner_module: { name:'Advanced Scanner Module', desc:'Gain +2 extra EXP when scanning codes.' },
      energy_boost_2: { name:'Energy Booster II', desc:'Instantly restores +10 energy.' },
      quick_charge_cell: { name:'Quick Charge Cell', desc:'Instantly restores +6 energy.' },
      recovery_daemon: { name:'Recovery Daemon', desc:'Speeds up the next 5 energy recovery ticks by 25%.' },
      full_battery_pack: { name:'Full Battery Pack', desc:'Instantly restores energy to full.' },
      exp_boost: { name:'EXP Amplifier', desc:'Permanently increases EXP gain by 20%.' },
      cpu_discount: { name:'CPU Upgrade Coupon', desc:'Reduces CPU upgrade cost by 10% (stacks).' },
      gpu_discount_coupon: { name:'GPU Upgrade Coupon', desc:'Reduces GPU upgrade cost by 10%, down to a 60% floor.' },
      overclock_script: { name:'Overclock Script', desc:'The next 5 code scans gain +3 EXP.' },
      scan_exp_script: { name:'Scan EXP Script', desc:'The next 10 code scans gain +1 EXP.' },
      perm_credit_boost: { name:'Permanent Credit Multiplier', desc:'Permanently increases hack credit rewards by 15% (one-time purchase).' },
      risk_support: { name:'Risk Hack Supporter', desc:'Permanently adds +5%p success chance in Risk Hack Mode (one-time purchase).' },
      big_credit_pack: { name:'Data Credit Pack', desc:'Instantly grants +700 credits.' },
      credit_cache: { name:'Credit Cache', desc:'Instantly grants +500 credits.' },
      credit_relay_script: { name:'Credit Relay Script', desc:'The next 5 successful hacks gain +20% credits.' },
      scanner_plus: { name:'Precision Scanner', desc:'Gain +1 extra EXP when scanning codes (permanent, one-time purchase).' },
      hack_stability_patch: { name:'Hack Stability Patch', desc:'Adds +2%p hack success chance, up to +8%p.' },
      failure_buffer_module: { name:'Failure Buffer Module', desc:'Adds 2 buffer charges that prevent RISK/EXTREME extra energy penalties.' },
      level_ticket: { name:'Simulation Level Ticket', desc:'Instantly raises your level by 1.' }
    }
  },
  // v3.0.0: 일본어 — 주요 서버명과 핵심 상점 아이템
  ja: {
    servers: {
      school_lab: '学校実習サーバー',
      bank_backup: '銀行バックアップノード',
      gov_archive: '政府記録ノード',
      central_core: '中央コアグリッド',
      deep_space: 'ディープスペースリレー',
      corp_dmz: '企業DMZノード',
      black_market: 'ブラックマーケットルーター',
      satellite_hub: '衛星ハブノード',
      quantum_vault: 'クォンタム金庫サーバー',
      neural_grid: 'ニューラルグリッドコア',
      ghost_relay: 'ゴーストリレーノード',
      zero_node: 'ゼロノードクラスター'
    },
    shop: {
      energy_pack: { name:'エネルギーパック', desc:'インベントリに保存される消耗品。使用時にエネルギーを最大まで回復します。' },
      energy_boost_1: { name:'エネルギーブースター I', desc:'即時エネルギー +5。' },
      credit_boost_run: { name:'クレジットマルチプライヤー (セッション)', desc:'現在のセッション中、ハック成功時にクレジット 1.5 倍。' },
      max_energy_up: { name:'最大エネルギーアップグレード', desc:'最大エネルギー +5 (永久)。' },
      scanner_module: { name:'高性能スキャナーモジュール', desc:'コードスキャン時に経験値 +2 追加。' }
    }
  }
};

// v3.0.0: 다국어 fallback 지원 (lang 키가 없으면 ko/원본명 사용)
function localizeServerName(server){
  const lang = getLang();
  const data = TEXT_DATA[lang];
  return (data && data.servers && data.servers[server.id]) ? data.servers[server.id] : server.name;
}
function localizeShopName(item){
  const lang = getLang();
  const data = TEXT_DATA[lang];
  return (data && data.shop && data.shop[item.id] && data.shop[item.id].name) ? data.shop[item.id].name : item.name;
}
function localizeShopDesc(item){
  const lang = getLang();
  const data = TEXT_DATA[lang];
  return (data && data.shop && data.shop[item.id] && data.shop[item.id].desc) ? data.shop[item.id].desc : item.desc;
}
function localizeCodeDescription(def){
  if (!def) return '';
  if (getLang() !== 'en') return def.description || '';
  const map = {
    basic: 'Basic test code. No additional effect.',
    port_scanner: 'Applies -10% target server security when hacking.',
    pulse_ping: 'Increases hack success chance by +3%p.',
    cache_sniffer: 'Grants +8 additional credits on successful hacks.',
    shield_bypass: 'Applies -15% target server security when hacking.',
    stack_tracer: 'Increases hack success chance by +5%p.',
    credit_siphon: 'Applies +15% credit bonus on successful hacks.',
    fallback_node: 'On hack failure, has a 12% chance to instantly recover 1 energy.',
    data_phantom: 'Increases hack success chance by +10%p.',
    auto_patch: 'On hack failure, has a 20% chance to grant +1 EXP.',
    trace_scrambler: 'Reduces the Risk Hack Mode success penalty by 5%p.',
    null_rewriter: 'Applies +25% credit bonus on successful hacks.',
    rapid_exploit: 'Grants +3 additional EXP on successful hacks.',
    overflow_inject: 'On success, grants +30% credits; on failure, consumes 1 extra energy.',
    fortress_breaker: 'Applies -25% target server security when hacking.',
    quantum_splice: 'Applies +12%p success chance and +20% credits on success.',
    ghost_script: 'On successful hacks, has a 25% chance to grant +10 EXP.',
    singularity_root: 'Applies +10%p success chance and +40% credits on success.'
  };
  return map[def.id] || def.description || '';
}
function localizeRarityLabel(rarity){
  const map={COMMON:'rarityCommon',UNCOMMON:'rarityUncommon',RARE:'rarityRare',EPIC:'rarityEpic',LEGENDARY:'rarityLegendary',OPERATION:'rarityOperation'};
  return t(map[rarity] || rarity);
}
function localizeShopLimitLabel(info){
  if (!info) return '';
  // v3.0.0: 짧고 명확한 라벨로 축약 (가로 잘림 방지)
  if (info.type === 'daily') return getLang() === 'en' ? '05:00 reset' : '05:00 리셋';
  if (info.type === 'once') return t('onceLabel');
  return info.label || '';
}
function translateLogMessage(message){
  if (!message || getLang() !== 'en') return message;
  const patterns = [
    [/^\[상점\] (.+) 구매 \(💰 -(\d+)\)$/, '[Shop] Purchased $1 (💰 -$2)'],
    [/^\[시스템\] 일일 상점 제한이 초기화되었습니다\. \(05:00 리셋\)$/, '[System] Daily shop limits have been reset. (05:00 reset)'],
    [/^업적 달성: (.+)$/, 'Achievement unlocked: $1'],
    [/^\[업적 달성\] (.+)$/, '[Achievement] $1 unlocked'],
    [/^활성 코드 변경: (.+)$/, 'Active code changed: $1'],
    [/^레벨 업! Lv\.(\d+) 달성\. 크레딧 \+100 지급\.$/, 'Level up! Reached Lv.$1. Credits +100 granted.'],
    [/^에너지 팩이 없습니다\.$/, 'You do not have any Energy Packs.'],
    [/^이미 에너지가 가득 찼습니다\.$/, 'Your energy is already full.'],
    [/^에너지 팩 1개를 사용해 에너지를 최대치까지 회복했습니다\.$/, 'Used 1 Energy Pack and fully restored your energy.'],
    [/^동기화할 코드가 없습니다\.$/, 'There is no code to sync.'],
    [/^코드 동기화 실패: 중복 조각이 부족합니다\. \(필요: (\d+), 보유: (\d+)\)$/, 'Code sync failed: not enough duplicate shards. (Need: $1, Have: $2)'],
    [/^코드 동기화 완료: (.+) 동기화 (\d+)단계 달성\. 파워 \+(\d+), 성공률 보정 \+(\d+)%\.$/, 'Code sync complete: $1 reached sync stage $2. Power +$3, success bonus +$4%.'],
    [/^(.+) 동기화 (\d+)단계$/, '$1 sync stage $2'],
    [/^강화할 코드가 없습니다\. 먼저 코드를 스캔하세요\.$/, 'There is no code to upgrade. Scan a code first.'],
    [/^코드 강화 실패: 크레딧이 부족합니다\. \(필요: (\d+)\)$/, 'Code upgrade failed: not enough credits. (Need: $1)'],
    [/^코드 강화: (.+) Lv\.(\d+) \(파워 \+5 → (\d+)\), 크레딧 -(\d+)\.$/, 'Code upgraded: $1 Lv.$2 (Power +5 → $3), Credits -$4.'],
    [/^진화할 코드가 없습니다\.$/, 'There is no code to evolve.'],
    [/^이미 최상위 희귀도\(LEGENDARY\)입니다\. 더 이상 진화할 수 없습니다\.$/, 'Already at the highest rarity (LEGENDARY). It cannot evolve further.'],
    [/^코드 진화 실패: 진화에는 최소 Lv\.5 이상이 필요합니다\.$/, 'Code evolution failed: evolution requires at least Lv.5.'],
    [/^진화를 처리할 수 없습니다\.$/, 'Cannot process evolution.'],
    [/^코드 진화 성공: (.+)가 (.+) 등급으로 승급, 파워 \+10 → (\d+)\.$/, 'Code evolution success: $1 advanced to $2, Power +10 → $3.'],
    [/^에너지가 부족하여 코드 스캔을 수행할 수 없습니다\.$/, 'Not enough energy to scan a code.'],
    [/^에너지가 부족하여 서버 해킹을 수행할 수 없습니다\.$/, 'Not enough energy to hack the server.'],
    [/^에너지 팩 \+1 \(보유: (\d+)\)$/, 'Energy Pack +1 (Owned: $1)'],
    [/^오프라인 동안 에너지 (\d+) 회복 \((.+) 경과\)$/, 'Recovered $1 energy while offline ($2 elapsed)'],
    [/^오프라인 회복: 에너지 \+(\d+)$/, 'Offline recovery: Energy +$1'],
    [/^저장 데이터 내보내기 완료$/, 'Save data exported.'],
    [/^저장 데이터 불러오기 완료$/, 'Save data imported.'],
    [/^불러오기 실패: JSON 형식을 확인하세요\.$/, 'Import failed: please check the JSON format.'],
    [/^텍스트가 비어 있습니다\.$/, 'The text box is empty.'],
    [/^HCSiG 초기화 완료\. \(언어 설정, 중복 조각\/코드 동기화, 모바일 UI, 상점 분류 적용\)$/, 'HCSiG initialized. (language setting, duplicate shards/code sync, mobile UI, shop categories enabled)'],
    [/^Coming Soon - 준비 중인 기능입니다\.$/, 'Coming Soon - This feature is in preparation.'],
    [/^미션 완료: (.+) \((.+)\)$/, 'Mission complete: $1 ($2)'],
    [/^크레딧 \+(\d+)$/, 'Credits +$1'],
    [/^에너지 팩 \+(\d+)$/, 'Energy Pack +$1'],
    [/^크레딧 \+(\d+) \/ 에너지 팩 \+(\d+)$/, 'Credits +$1 / Energy Pack +$2'],
    [/^해당 서버를 해킹하려면 최소 Lv\.(\d+) 이상이어야 합니다\.$/, 'You must be at least Lv.$1 to hack this server.'],
    [/^보유 코드가 없습니다\. 먼저 코드 스캔으로 코드를 확보하세요\.$/, 'You do not own any codes yet. Scan codes first.'],
    [/^새 코드 발견! (.+) \[(.+)\]$/, 'New code discovered! $1 [$2]'],
    [/^중복 코드 감지: (.+) \[(.+)\] → 중복 조각 \+(\d+) \(보유 (\d+)\)\.$/, 'Duplicate code detected: $1 [$2] → Duplicate Shards +$3 (Owned $4).'],
    [/^코드 스캔 완료: 경험치 \+(\d+)\.$/, 'Code scan complete: EXP +$1.'],
    [/^서버 해킹 성공! \[(.+)\] 성공 확률 ([\d.]+)%\. 크레딧 \+(\d+), EXP \+(\d+)\.$/, 'Server hack success! [$1] Success chance $2%. Credits +$3, EXP +$4.'],
    [/^서버 해킹 실패\. \[(.+)\] 성공 확률 ([\d.]+)%였음\.$/, 'Server hack failed. [$1] Success chance was $2%.'],
    [/^게임 상태가 저장되었습니다\.$/, 'Game state saved.'],
    [/^저장 완료$/, 'Save complete'],
    [/^✅ 자동 저장 완료$/, '✅ Autosave complete'],
    [/^저장된 데이터가 없습니다\.$/, 'No saved data found.'],
    [/^저장된 데이터를 불러왔습니다\.$/, 'Saved data loaded.'],
    [/^저장 데이터를 불러오는 중 오류가 발생했습니다\.$/, 'An error occurred while loading save data.'],
    [/^저장 데이터가 삭제되었습니다\.$/, 'Save data deleted.'],
    [/^위험 해킹 모드: (ON|OFF)$/, 'Risk Hack Mode: $1'],
    [/^위험 해킹 모드 페널티: 실패로 인해 에너지가 추가로 1 소모되었습니다\.$/, 'Risk Hack Mode penalty: failure consumed 1 additional energy.'],
    [/^로드아웃 슬롯 (\d+)에 현재 설정을 저장했습니다\.$/, 'Saved current setup to loadout slot $1.'],
    [/^로드아웃 슬롯 (\d+)에 저장된 설정이 없습니다\.$/, 'There is no saved setup in loadout slot $1.'],
    [/^로드아웃 슬롯 (\d+)을 불러왔습니다\.$/, 'Loaded loadout slot $1.']
    [/^\[Shop\] Not enough credits\. \(Need: (\d+)\)$/, '[Shop] Not enough credits. (Need: $1)'],
    [/^타겟 서버 선택에 실패했습니다\.$/, 'Failed to select a target server.'],
    [/^Ghost_Script 효과: 해킹 성공으로 EXP \+10이 발동했습니다\.$/, 'Ghost_Script effect: EXP +10 triggered on success.'],
    [/^Overflow_Inject 페널티: 에너지가 추가로 1 소모되었습니다\.$/, 'Overflow_Inject penalty: consumed 1 additional energy.'],
    [/^AutoPatch\(\) 효과: 해킹 실패 보정으로 경험치 \+1\.$/, 'AutoPatch() effect: EXP +1 from failure compensation.'],
    [/^Fallback_Node 효과: 에너지 1을 즉시 회복했습니다\.$/, 'Fallback_Node effect: instantly recovered 1 energy.'],
    [/^CPU 업그레이드 실패: 크레딧이 부족합니다\. \(필요: (\d+)\)$/, 'CPU upgrade failed: not enough credits. (Need: $1)'],
  ];
  for (const [pat, rep] of patterns){
    if (pat.test(message)) return message.replace(pat, rep);
  }
  return message;
}
function rerenderLogEntries(){
  if (!logList) return;
  logList.querySelectorAll('.log-entry').forEach(entry => {
    const textSpan = entry.querySelector('span:last-child');
    if (!textSpan) return;
    const raw = entry.dataset.rawMessage || (textSpan.textContent || '').trim();
    entry.dataset.rawMessage = raw;
    textSpan.textContent = ' ' + translateLogMessage(raw);
  });
}
function translatePhraseEn(str){
  if (!str || getLang() !== 'en') return str;
  const map = [
    ['위험 그 자체', 'Risk Itself'], ['월간 수익 관리자', 'Monthly Revenue Manager'], ['고급 코드 확보', 'High-Tier Code Secured'],
    ['에너지 소비자', 'Energy Consumer'], ['에너지 브레이커', 'Energy Breaker'], ['에너지 파쇄기', 'Energy Crusher'],
    ['에너지 소모왕', 'Energy Spender'], ['에너지 저장고', 'Energy Reservoir'], ['에너지 버퍼', 'Energy Buffer'],
    ['에너지 분해', 'Energy Burn'], ['에너지 브루탈', 'Energy Brutality'],
    ['위험한 승부사', 'Risk Taker'], ['위험한 한 주', 'Dangerous Week'], ['위험한 분석', 'Risky Analysis'], ['위험 중독', 'Risk Addiction'],
    ['지속 가능한 에너지', 'Sustainable Energy'], ['한계 돌파', 'Break the Limit'], ['장기 루틴', 'Long-Term Routine'],
    ['보급 루틴', 'Supply Routine'], ['주간 루틴', 'Weekly Routine'], ['월간 마스터', 'Monthly Master'],
    ['일일 침입자', 'Daily Intruder'], ['주간 침입자', 'Weekly Intruder'], ['월간 침입자', 'Monthly Intruder'],
    ['일일 스캐너', 'Daily Scanner'], ['주간 스캐너', 'Weekly Scanner'], ['월간 스캐너', 'Monthly Scanner'],
    ['광적인 분석가', 'Obsessive Analyst'], ['데이터 광신도', 'Data Fanatic'], ['데이터 중독', 'Data Addict'], ['데이터 광', 'Data Maniac'],
    ['분석 입문', 'Analysis Initiate'], ['분석가', 'Analyst'], ['침입 전문가', 'Intrusion Specialist'], ['침입 마스터', 'Intrusion Master'],
    ['성장 관찰', 'Growth Observer'], ['성장 가속', 'Growth Acceleration'], ['성장 폭주', 'Growth Surge'],
    ['월간 성장', 'Monthly Growth'], ['주간 성장', 'Weekly Growth'], ['월간 도약', 'Monthly Leap'],
    ['고급 운영자', 'Advanced Operator'], ['CPU 튜너', 'CPU Tuner'],
    ['쇼핑 애호가', 'Shopping Enthusiast'], ['쇼핑 매니아', 'Shopping Maniac'], ['쇼핑 제왕', 'Shopping King'],
    ['데이터 자본가', 'Data Capitalist'], ['기록 수집가', 'Record Collector'],
    ['퀘스트 러너', 'Quest Runner'], ['퀘스트 헌터', 'Quest Hunter'], ['퀘스트 매니악', 'Quest Maniac'], ['퀘스트 아카이브', 'Quest Archive'],
    ['위험 친화', 'Risk Affinity'], ['위험 중독', 'Risk Addiction'],
    ['데일리 스타터', 'Daily Starter'], ['스캐너 입문', 'Scanner Initiate'], ['스캐너 숙련', 'Skilled Scanner'],
    ['첫 침입', 'First Breach'], ['첫 쇼핑', 'First Purchase'], ['기진맥진', 'Exhausted'],
    ['초보 해커', 'Novice Hacker'], ['중급 해커', 'Intermediate Hacker'], ['오버클러커', 'Overclocker'],
    ['스캔 누적', 'Scan Milestone'], ['해킹 누적', 'Hack Milestone'],
    ['레벨 브론즈', 'Bronze Level'], ['레벨 실버', 'Silver Level'], ['레벨 골드', 'Gold Level'], ['레벨 플래티넘', 'Platinum Level'],
    ['자본 시동', 'Capital Start'], ['자본 축적', 'Capital Growth'], ['자본 확대', 'Capital Expansion'],
    ['쇼핑 루키', 'Shopping Rookie'], ['쇼핑 중수', 'Shopping Adept'], ['쇼핑 고수', 'Shopping Expert'],
    ['연료 점화', 'Fuel Ignition'], ['연료 과열', 'Fuel Overheat'], ['연료 폭주', 'Fuel Overdrive'],
    ['리스크 테스트', 'Risk Test'], ['리스크 러너', 'Risk Runner'],
    ['도감 입문', 'Codex Initiate'], ['도감 수집', 'Codex Collection'], ['도감 완성', 'Codex Complete'],
    ['파워 셋업', 'Power Setup'], ['파워 튜닝', 'Power Tuning'], ['파워 드라이브', 'Power Drive'],
    ['코드 육성', 'Code Training'], ['첫 강화', 'First Upgrade'], ['강화 루틴', 'Upgrade Routine'], ['강화 전문가', 'Upgrade Specialist'],
    ['첫 동기화', 'First Sync'], ['동기화 루틴', 'Sync Routine'], ['동기화 전문가', 'Sync Specialist'], ['동기화 단계', 'Sync Stage'],
    ['첫 진화', 'First Evolution'], ['진화 루틴', 'Evolution Routine'], ['조각 수집', 'Shard Collection'], ['비상 보급', 'Emergency Supply'],
    ['일일 리스크', 'Daily Risk'], ['일일 조달', 'Daily Procurement'], ['집요한 스캐너', 'Persistent Scanner'],
    ['주간 루프', 'Weekly Loop'], ['주간 소비', 'Weekly Spending'], ['주간 수익', 'Weekly Revenue'], ['방전 습관', 'Drain Habit'],
    ['월간 소비자', 'Monthly Consumer'],
    ['기록 박물관', 'Record Museum'], ['에너지 분해', 'Energy Breakdown'], ['에너지 브루탈', 'Energy Brutality'],
    ['코어 관리자', 'Core Administrator'], ['시스템 지배자', 'System Dominator'], ['CPU 초월자', 'CPU Transcendent'],
    ['에너지 아카이브', 'Energy Archive'], ['도감 수집', 'Codex Collector'], ['코드 콜렉터', 'Code Collector'],
    ['성공적인 침입자', 'Successful Intruder'], ['고급 코드 확보', 'High-Tier Code Secured'], ['첫 쇼핑', 'First Purchase'],
    ['기진맥진', 'Exhausted'], ['데이터 크레딧 팩', 'Data Credit Pack'], ['영구 크레딧 멀티플라이어', 'Permanent Credit Multiplier'],
    ['위험 해킹 서포터', 'Risk Hack Supporter'], ['시뮬레이션 레벨 티켓', 'Simulation Level Ticket'], ['에너지 팩', 'Energy Pack'],
    ['에너지 부스터', 'Energy Booster'], ['고급 스캐너 모듈', 'Advanced Scanner Module'], ['경험치 증폭기', 'EXP Amplifier'],
    ['CPU 업그레이드 쿠폰', 'CPU Upgrade Coupon'], ['정밀 스캐너', 'Precision Scanner'], ['에너지 최대치 업그레이드', 'Max Energy Upgrade'],
    ['크레딧 멀티플라이어', 'Credit Multiplier']
  ];
  let out = str;
  for (const [ko, en] of map) out = out.replaceAll(ko, en);
  return out;
}
function localizeMissionName(def){
  if (getLang() !== 'en') return def.name;
  const direct = {
    gen_mission_160: 'Quest Archive',
    gen_achieve_45: 'Record Museum',
    gen_energy_spent_200: 'Energy Breakdown I',
    gen_energy_spent_500: 'Energy Breakdown II',
    gen_energy_spent_1500: 'Energy Brutality II',
    gen_energy_spent_2500: 'Energy Brutality III',
    gen_energy_spent_4000: 'Energy Brutality IV',
    gen_level_30: 'Core Administrator',
    gen_level_40: 'System Dominator',
    gen_cpu_15: 'CPU Transcendent',
    gen_energyMax_50: 'Energy Archive'
  };
  return direct[def.id] || translatePhraseEn(def.name);
}
function localizeMissionDesc(def){
  if (getLang() !== 'en') return def.desc;
  const d = def.desc;
  const patterns = [
    [/^코드 스캔 (\d+)회 수행$/, 'Perform $1 code scans'],
    [/^서버 해킹 성공 (\d+)회$/, 'Achieve $1 successful server hacks'],
    [/^에너지 (\d+) 소모하기$/, 'Spend $1 energy'],
    [/^코드 스캔\/서버 해킹 총 (\d+)회 수행$/, 'Perform $1 total Scan Code / Hack Server actions'],
    [/^위험 해킹 모드로 서버 해킹 성공 (\d+)회$/, 'Achieve $1 successful server hacks in Risk Hack Mode'],
    [/^상점에서 (\d+)회 구매하기$/, 'Purchase from the shop $1 times'],
    [/^플레이어 레벨 (\d+) 달성$/, 'Reach player level $1'],
    [/^누적 획득 크레딧 (\d+) 달성$/, 'Reach $1 total earned credits'],
    [/^이번 주 최소 1회 에너지를 0까지 소모$/, 'Reduce energy to 0 at least once this week'],
    [/^한 달 동안 최소 1회 에너지를 0까지 소모$/, 'Reduce energy to 0 at least once this month'],
    [/^누적 코드 스캔 (\d+)회$/, 'Perform $1 total code scans'],
    [/^누적 해킹 성공 (\d+)회$/, 'Achieve $1 total successful hacks'],
    [/^누적 에너지 (\d+) 소모$/, 'Spend $1 energy in total'],
    [/^CPU 티어 (\d+) 달성$/, 'Reach CPU tier $1'],
    [/^에너지 최대치 (\d+) 달성$/, 'Reach max energy $1'],
    [/^상점에서 누적 (\d+)회 구매$/, 'Purchase from the shop $1 times in total'],
    [/^업적 (\d+)개 달성$/, 'Unlock $1 achievements'],
    [/^누적 퀘스트 (\d+)개 완료$/, 'Complete $1 quests in total'],
    [/^위험 해킹 모드로 해킹 성공 (\d+)회$/, 'Achieve $1 successful hacks in Risk Hack Mode']
  ];
  for (const [pat, rep] of patterns){
    if (pat.test(d)) return d.replace(pat, rep);
  }
  return translatePhraseEn(d)
    .replaceAll('코드 도감', 'code codex')
    .replaceAll('플레이어 레벨', 'player level')
    .replaceAll('누적 획득 크레딧', 'total earned credits')
    .replaceAll('상점', 'shop');
}
function localizeAchievementName(def){
  if (getLang() !== 'en') return def.name;
  const direct = {
    collector_beginner: 'Code Collector I',
    hack_30_success: 'Successful Intruder',
    codex_total_3: 'Codex Collector I',
    codex_total_5: 'Codex Collector II'
  };
  return direct[def.id] || translatePhraseEn(def.name);
}
function localizeAchievementDesc(def){
  if (getLang() !== 'en') return def.desc;
  let d = def.desc;
  const patterns = [
    [/^처음으로 서버 해킹에 성공했습니다\.$/, 'Succeeded in a server hack for the first time.'],
    [/^플레이어 레벨 (\d+)에 도달했습니다\.$/, 'Reached player level $1.'],
    [/^코드 스캔을 (\d+)회 수행했습니다\.$/, 'Performed $1 code scans.'],
    [/^상점에서 처음으로 아이템을 구매했습니다\.$/, 'Purchased an item from the shop for the first time.'],
    [/^에너지를 0까지 모두 소모했습니다\.$/, 'Drained all energy down to 0.'],
    [/^서로 다른 코드를 (\d+)개 이상 보유했습니다\.$/, 'Owned at least $1 different codes.'],
    [/^데일리 퀘스트를 (\d+)개 이상 완료했습니다\.$/, 'Completed at least $1 daily quests.'],
    [/^위클리 퀘스트를 (\d+)개 이상 완료했습니다\.$/, 'Completed at least $1 weekly quests.'],
    [/^EPIC 이상 등급의 코드를 처음 획득했습니다\.$/, 'Obtained your first EPIC-or-higher code.'],
    [/^서버 해킹에 (\d+)회 이상 성공했습니다\.$/, 'Succeeded in server hacks at least $1 times.'],
    [/^에너지 최대치를 (\d+) 이상으로 확장했습니다\.$/, 'Expanded max energy to at least $1.'],
    [/^누적 획득 크레딧 (\d+)을 달성했습니다\.$/, 'Reached $1 total earned credits.'],
    [/^누적 퀘스트 (\d+)개를 완료했습니다\.$/, 'Completed $1 quests in total.'],
    [/^CPU 티어를 (\d+) 이상으로 업그레이드했습니다\.$/, 'Upgraded CPU tier to at least $1.'],
    [/^한 달 동안 모든 MONTH QUEST를 완료했습니다\.$/, 'Completed every MONTH QUEST within a single month.'],
    [/^위험 해킹 모드로 해킹 성공 (\d+)회를 달성했습니다\.$/, 'Achieved $1 successful hacks in Risk Hack Mode.'],
    [/^해킹 성공 (\d+)회를 달성했습니다\.$/, 'Achieved $1 successful hacks.'],
    [/^퀘스트 (\d+)개를 완료했습니다\.$/, 'Completed $1 quests.'],
    [/^상점에서 (\d+)회 구매했습니다\.$/, 'Purchased from the shop $1 times.'],
    [/^에너지를 누적 (\d+) 소모했습니다\.$/, 'Spent $1 energy in total.'],
    [/^위험 해킹 모드로 (\d+)회 성공했습니다\.$/, 'Succeeded $1 times in Risk Hack Mode.'],
    [/^코드 도감에서 (\d+)종을 발견했습니다\.$/, 'Discovered $1 entries in the code codex.'],
    [/^현재 코드 도감의 모든 코드\((\d+)종\)를 발견했습니다\.$/, 'Discovered all $1 codes currently listed in the code codex.'],
    [/^코드 파워 (\d+) 이상을 달성했습니다\.$/, 'Reached code power $1 or higher.'],
    [/^코드 레벨 (\d+) 이상을 달성했습니다\.$/, 'Reached code level $1 or higher.'],
    [/^코드를 (\d+)회 강화했습니다\.$/, 'Upgraded a code $1 times.'],
    [/^코드를 (\d+)회 동기화했습니다\.$/, 'Synced a code $1 times.'],
    [/^코드 동기화 (\d+)단계를 달성했습니다\.$/, 'Reached sync stage $1 on a code.'],
    [/^코드를 (\d+)회 진화시켰습니다\.$/, 'Evolved a code $1 times.'],
    [/^중복 조각을 누적 (\d+)개 획득했습니다\.$/, 'Obtained $1 duplicate shards in total.'],
    [/^에너지 팩을 (\d+)회 사용했습니다\.$/, 'Used an energy pack $1 times.'],
    [/^업적 (\d+)개를 달성했습니다\.$/, 'Unlocked $1 achievements.'],
    [/^COMMON 코드를 (\d+)개 이상 확보했습니다\.$/, 'Secured at least $1 COMMON codes.'],
    [/^RARE 코드를 (\d+)개 이상 확보했습니다\.$/, 'Secured at least $1 RARE codes.'],
    [/^EPIC 이상 코드를 (\d+)개 이상 확보했습니다\.$/, 'Secured at least $1 EPIC-or-higher codes.'],
    [/^LEGENDARY 코드를 (\d+)개 이상 확보했습니다\.$/, 'Secured at least $1 LEGENDARY codes.'],
    [/^RARE 이상 코드를 (\d+)개 이상 확보했습니다\.$/, 'Secured at least $1 RARE-or-higher codes.'],
    [/^CPU 티어를 (\d+) 이상 달성했습니다\.$/, 'Reached CPU tier $1 or higher.'],
    [/^에너지 최대치를 (\d+) 이상 달성했습니다\.$/, 'Reached max energy $1 or higher.']
  ];
  for (const [pat, rep] of patterns){
    if (pat.test(d)) return d.replace(pat, rep);
  }
  return translatePhraseEn(d)
    .replaceAll('코드 도감', 'code codex')
    .replaceAll('플레이어 레벨', 'player level')
    .replaceAll('에너지 최대치', 'max energy')
    .replaceAll('누적 획득 크레딧', 'total earned credits')
    .replaceAll('중복 조각', 'duplicate shards')
    .replaceAll('상점', 'shop')
    .replaceAll('코드', 'code')
    .replaceAll('달성했습니다.', 'completed.')
    .replaceAll('확보했습니다.', 'secured.')
    .replaceAll('사용했습니다.', 'used.')
    .replaceAll('처음 획득했습니다.', 'obtained for the first time.')
    .replaceAll('처음으로 아이템을 구매했습니다.', 'purchased an item for the first time.')
    .replaceAll('처음으로 서버 해킹에 성공했습니다.', 'succeeded in a server hack for the first time.');
}
function refreshMobileTabTexts(){
  const selectors = [
    ['[data-view="home"], [data-main-view="home"], [data-mobile-tab="home"]', t('mobileHome')],
    ['[data-view="codes"], [data-main-view="codes"], [data-mobile-tab="codes"]', t('mobileCodes')],
    ['[data-view="shop"], [data-main-view="shop"], [data-mobile-tab="shop"]', t('mobileShop')],
    ['[data-main-view="lab"]', t('mobileLab')],
    ['[data-main-view="coming"]', t('mobileComing')]
  ];
  selectors.forEach(([sel, label]) => {
    document.querySelectorAll(sel).forEach(el => { el.textContent = label; });
  });
}
function applyLanguageToUI(){
  try{ document.documentElement.lang = getLang(); document.title = t('appTitle'); }catch(e){}
  setText('subtitleText', t('subtitle')); setText('btnList', t('list')); setText('listTitle', t('listTitle')); setText('btnEvent', t('event')); setText('eventTitle', t('eventTitle')); setText('btnMore', t('more')); setText('moreTitle', t('moreTitle')); setText('btnOpenTutorial', t('tutorialReplay'));
  setText('titleStatus', t('status')); setText('titleShop', t('shop')); setText('titleActions', t('actions')); setText('titleCodeInventory', t('codeInventory')); setText('titleCodeDetail', t('codeDetail'));
  setText('labelLevel', t('level')); setText('labelExp', t('exp')); setText('labelCredits', t('credits')); setText('labelCpuTier', t('cpuTier')); setText('labelGpuTier', t('gpuTier')); setText('labelEnergy', t('energy')); setText('labelEnergyTimer', t('nextRecovery')); setText('labelEnergyPack', t('energyPack')); setText('labelLastSave', t('lastSave')); setText('btnUseEnergyPack', t('use'));
  setText('shopSortLabel', t('sort')); setText('shopCategoryLabel', t('category')); setText('shopCatAll', t('all')); setText('shopCatEnergy', t('energy')); setText('shopCatSystem', t('system')); setText('shopCatEconomy', t('economy')); setText('shopCatUtility', t('utility'));
  setText('btnScan', t('codeScan')); setText('btnHack', t('serverHack')); setText('btnUpgradeCpu', t('cpuUpgrade')); setText('btnUpgradeGpu', t('gpuUpgrade')); setText('labelTargetServer', t('targetServer')); setText('labelTargetRoute', t('targetRoute')); setText('labelUpgradeTarget', t('upgradeTarget')); setText('labelLoadout', t('loadout')); setText('btnSaveLoadout', t('saveSlot')); setText('btnLoadLoadout', t('loadSlot')); setText('labelHackMode', t('hackMode'));
  setText('btnUpgrade', getLang()==='en' ? 'Upgrade' : getLang()==='ja' ? 'アップグレード' : '업그레이드');
  setText('labelSystemUpgrade', getLang()==='en' ? 'System Upgrade' : getLang()==='ja' ? 'システムアップグレード' : '시스템 업그레이드');
  setText('actionsDesc1', t('actionsDesc1')); setText('actionsDesc2', t('actionsDesc2')); setText('actionsDesc3', t('actionsDesc3')); setText('actionsDesc4', t('actionsDesc4'));
  setText('btnUpgradeCode', t('codeUpgrade')); setText('btnSyncCode', t('codeSync')); setText('btnEvolveCode', t('codeEvolve')); setText('btnModalUpgradeCode', t('codeUpgrade')); setText('btnModalSyncCode', t('codeSync')); setText('btnModalEvolveCode', t('codeEvolve')); setText('btnModalShardCode', t('shardEnhance')); setText('codeDesc1', t('codeDesc1')); setText('codeDesc2', t('codeDesc2')); setText('codeDesc3', t('codeDesc3'));
  setText('tabBtnMission', t('mission')); setText('tabBtnAchievement', t('achievement')); setText('tabBtnCodex', t('codex')); setText('tabBtnLiveNet', t('liveNet')); setText('tabBtnRank', t('rank')); setText('tabBtnSettings', t('settings')); setText('tabBtnSave', t('data')); setText('tabBtnCredits', t('creditsTab')); setText('tabBtnManual', t('manualTab')); setText('tabBtnSupport', t('supportTab'));
  setText('eventTabBtnWeekly', t('weeklyTab')); setText('eventTabBtnRoulette', t('rouletteTab')); setText('btnPass', t('passTab')); setText('passTitle', t('seasonPass'));
  setText('listTabBtnMission', t('mission')); setText('listTabBtnAchievement', t('achievement')); setText('missionTabTitle', t('quest')); setText('achievementTabTitle', t('achievement')); setText('codexTabTitle', t('codex')); setText('liveNetTabTitle', t('liveNetRecords')); setText('rankTabTitle', t('softRank')); setText('settingsTabTitle', t('envSettings')); setText('saveTabTitle', t('dataManage')); setText('btnListClose2', t('close')); setText('btnEventClose2', t('close')); setText('btnMoreClose2', t('close'));
  setText('logSearchHelp', t('logSearchHelp')); const lsi=document.getElementById('logSearchInput'); if(lsi) lsi.placeholder=t('searchPlaceholder'); setText('btnClearLogs', t('clearLogs')); const btnToggle=document.getElementById('btnToggleLogs'); if(btnToggle){ btnToggle.textContent = (window.logsHidden ? t('showLogs') : t('hideLogs')); } setText('logFilterTitle', t('logFilter'));
  document.querySelectorAll('[data-achievement-filter="all"]').forEach(el => { el.textContent = t('achievementAll'); });
  document.querySelectorAll('[data-achievement-filter="incomplete"]').forEach(el => { el.textContent = t('achievementIncomplete'); });
  document.querySelectorAll('[data-achievement-filter="complete"]').forEach(el => { el.textContent = t('achievementComplete'); });
  const showHiddenEl=document.getElementById('chkShowHiddenAchievements'); if(showHiddenEl && showHiddenEl.parentElement){ showHiddenEl.parentElement.lastChild.textContent = ' ' + t('achievementShowHidden'); }
  setText('labelLanguage', t('language')); setText('labelFontScale', t('fontScale')); setText('labelSnow', t('snow')); setText('labelUiScale', t('uiScale')); setText('labelAnim', t('animation')); setText('labelSfx', t('sfx')); setText('labelSfxVolume', t('sfxVolume')); setText('labelToastMs', t('toastTime')); setText('labelAutoSaveToast', t('autosaveToast')); setText('labelLiveNetwork', t('liveNetwork')); setText('labelLiveNicknameMode', t('liveNicknameMode')); setHtml('settingsHelp', t('settingsHelp'));
  setText('btnSaveGame', t('saveNow')); setText('btnLoadGame', t('loadNow')); setText('btnClearSave', t('clearSave')); setText('btnExportSave', t('exportSave')); setText('btnImportSaveFile', t('importFile')); setText('importTextTitle', t('importText')); const ist=document.getElementById('importSaveText'); if(ist) ist.placeholder=t('importTextPlaceholder'); setText('btnImportSaveText', t('importTextBtn')); setHtml('saveHelp', t('saveHelp'));
  const shopSort=document.getElementById('shopSortSelect'); if(shopSort){ const map=['shopSortUpdate','shopSortNew','shopSortRarity','shopSortPrice','shopSortName']; [...shopSort.options].forEach((opt,i)=>opt.text=t(map[i])); shopSort.title=t('shopSortTitle'); }
  const codeSort=document.getElementById('codeSortSelect'); if(codeSort){ const map=['codeSortRecent','codeSortRarity','codeSortPower','codeSortLevel','codeSortName']; [...codeSort.options].forEach((opt,i)=>opt.text=t(map[i])); codeSort.title=t('codeSortTitle'); }
  const setLangEl=document.getElementById('setLanguage'); if(setLangEl){ setLangEl.title=t('languageTitle'); [...setLangEl.options].forEach(opt=>{ if(opt.value==='ko') opt.textContent = getLang()==='en' ? 'Korean' : '한국어'; if(opt.value==='en') opt.textContent = 'English'; }); }
  const setUiZoomEl=document.getElementById('setUiZoom'); if(setUiZoomEl) setUiZoomEl.title=t('uiScaleTitle');
  const setToastMsEl=document.getElementById('setToastMs'); if(setToastMsEl){ setToastMsEl.title=t('toastTitle'); [...setToastMsEl.options].forEach(opt=>{ const secs=Math.round(Number(opt.value||0)/1000); opt.textContent = `${secs}${getLang()==='en' ? ' sec' : '초'}`; }); }
  ['setSnow','setAnim','setSfx','setLiveNetwork','setBgm'].forEach(id=>{ const input=document.getElementById(id); if(input && input.parentElement){ input.parentElement.lastChild.textContent = ' ' + t('enabled'); } });
  const labelBgmEl = document.getElementById('labelBgm'); if(labelBgmEl) labelBgmEl.textContent = (getLang()==='en' ? 'BGM' : getLang()==='ja' ? 'BGM' : 'BGM');
  const ast=document.getElementById('setAutoSaveToast'); if(ast && ast.parentElement){ ast.parentElement.lastChild.textContent = ' ' + t('visible'); }
  const liveNameModeEl=document.getElementById('setLiveNicknameMode'); if(liveNameModeEl){ [...liveNameModeEl.options].forEach(opt=>{ if(opt.value==='nickname') opt.textContent=t('nickname'); if(opt.value==='callsign') opt.textContent=t('callsign'); }); }
  setText('creditsLabelDevelop', getLang()==='en' ? 'Developed by' : getLang()==='ja' ? '開発' : '개발');
  setText('creditsLabelPublish', getLang()==='en' ? 'Published by' : getLang()==='ja' ? '配信' : '유통');
  setText('creditsLabelCopyright', getLang()==='en' ? '© 2025–2026' : getLang()==='ja' ? '© 2025–2026' : '© 2025–2026');
  const creditsSeasonEl=document.getElementById('creditsSeasonLabel'); if(creditsSeasonEl) creditsSeasonEl.textContent = getSeasonPhaseInfo().badge;
  const btnSaveGameEl=document.getElementById('btnSaveGame'); if(btnSaveGameEl) btnSaveGameEl.title=t('saveToLocal');
  const btnLoadGameEl=document.getElementById('btnLoadGame'); if(btnLoadGameEl) btnLoadGameEl.title=t('loadFromLocal');
  const btnClearSaveEl=document.getElementById('btnClearSave'); if(btnClearSaveEl) btnClearSaveEl.title=t('deleteSave');
  const btnExportSaveEl=document.getElementById('btnExportSave'); if(btnExportSaveEl) btnExportSaveEl.title=t('exportJson');
  const btnImportSaveFileEl=document.getElementById('btnImportSaveFile'); if(btnImportSaveFileEl) btnImportSaveFileEl.title=t('importJsonFile');
  const btnImportSaveTextEl=document.getElementById('btnImportSaveText'); if(btnImportSaveTextEl) btnImportSaveTextEl.title=t('importJsonText');
  const loadoutSelectEl=document.getElementById('loadoutSelect'); if(loadoutSelectEl){ [...loadoutSelectEl.options].forEach(opt=>{ opt.textContent=t('loadoutSlot',{n:opt.value}); }); }
  try { renderHackModeUI(); } catch(e){}
  refreshMobileTabTexts();
  try { rerenderLogEntries(); } catch(e){}
  try { renderServers(); } catch(e){}
}
    const OLD_SAVE_KEY = 'HCSiG_SAVE_v16';
    const LAST_SEEN_VERSION_KEY = 'HCSiG_LAST_SEEN_VERSION';
    // v3.0.0+: 저장 안정성 패치 — 백업/메타 키
    // SAVE_KEY는 절대 변경 금지 (사용자 데이터 키 호환성)
    const SAVE_BACKUP_KEY = 'HCSiG_SAVE_BACKUP';      // 마이그레이션 전 마지막 raw 백업
    const SAVE_BACKUP_PREV_KEY = 'HCSiG_SAVE_BACKUP_PREV'; // 백업의 백업 (1단계 더)
    const SAVE_META_KEY = 'HCSiG_SAVE_META';          // 마이그레이션 메타데이터

    // ── v3.0.0+: 저장 데이터 진행도 점수 계산 ──
    // 더 진행한 save가 덜 진행한 save를 자동으로 덮지 못하도록 비교 기준 제공
    function getSaveScore(saveData) {
      try {
        if (!saveData || typeof saveData !== 'object') return 0;
        const s = saveData.state || {};
        const codes = Array.isArray(saveData.ownedCodes) ? saveData.ownedCodes : [];
        const stats = s.stats || {};
        let score = 0;
        // 보유 코드 수 (각 5점)
        score += codes.length * 5;
        // OPERATION/LEGENDARY 보유 (각 100점)
        codes.forEach(c => {
          if (!c) return;
          if (c.rarity === 'OPERATION') score += 100;
          else if (c.rarity === 'LEGENDARY') score += 50;
          else if (c.rarity === 'EPIC') score += 25;
          else if (c.rarity === 'RARE') score += 10;
          // 코드 레벨/sync도 가중치
          score += Math.max(0, Number(c.level || 0)) * 2;
          score += Math.max(0, Number(c.syncLevel || 0)) * 3;
          score += Math.max(0, Number(c.shards || 0)) * 0.2;
        });
        // 도감 발견 수 (각 3점)
        const codex = s.codexFound || stats.codexFound || {};
        const codexCount = (codex && typeof codex === 'object') ? Object.keys(codex).length : 0;
        score += codexCount * 3;
        // 진행도 지표
        score += Math.max(0, Number(s.level || 0)) * 5;
        score += Math.max(0, Number(s.exp || 0)) * 0.05;
        score += Math.max(0, Number(s.credits || 0)) * 0.01;
        score += Math.max(0, Number(stats.creditsEarnedTotal || 0)) * 0.005;
        score += Math.max(0, Number(stats.hackSuccessCount || 0)) * 0.5;
        score += Math.max(0, Number(stats.scanCount || 0)) * 0.2;
        score += Math.max(0, Number(stats.stageClearCount || 0)) * 2;
        score += Math.max(0, Number((s.stage && s.stage.highestCleared) || 0)) * 5;
        // 업적 수
        const achievements = s.achievements || {};
        const achievementCount = (achievements && typeof achievements === 'object') ? Object.keys(achievements).length : 0;
        score += achievementCount * 4;
        // 재화
        const items = s.items || {};
        score += Math.max(0, Number(items.energyPack || 0)) * 0.5;
        score += Math.max(0, Number(items.coin || 0)) * 0.3;
        score += Math.max(0, Number(items.oneDay || 0)) * 0.05;
        score += Math.max(0, Number(items.zeroDayVulnerability || 0)) * 8;
        score += Math.max(0, Number(items.zeroDayVulnerabilityShard || 0)) * 0.4;
        score += Math.max(0, Number(items.weeklyToken || 0)) * 0.6;
        // ZERO-DAY 진행도
        const zd = s.zeroDay || {};
        if (zd.onboardingCompleted) score += 10;
        score += Math.max(0, Number((zd.pve && zd.pve.runs) || 0)) * 1;
        score += Math.max(0, Number((zd.pve && zd.pve.bestDepth) || 0)) * 2;
        score += Math.max(0, Number((zd.pve && zd.pve.extracts) || 0)) * 3;
        score += Math.max(0, Number((zd.pvp && zd.pvp.seasonWins) || 0)) * 4;
        score += Math.max(0, Number((zd.skins && zd.skins.length) || 0)) * 30;
        score += Math.max(0, Object.keys(zd.unlocks || {}).length) * 50; // 프로토콜
        // PASS 진행도
        const season = s.season || {};
        score += Math.max(0, Number(season.passTier || 0)) * 8;
        score += Math.max(0, Number(season.passPoints || 0)) * 0.05;
        return Math.round(score);
      } catch (e) {
        console.warn('[SaveScore] failed:', e);
        return 0;
      }
    }

    // 사람이 읽을 수 있는 요약
    function getSaveSummary(saveData) {
      try {
        const s = (saveData && saveData.state) || {};
        const codes = (saveData && Array.isArray(saveData.ownedCodes)) ? saveData.ownedCodes : [];
        const opCount = codes.filter(c => c && c.rarity === 'OPERATION').length;
        const legCount = codes.filter(c => c && c.rarity === 'LEGENDARY').length;
        return {
          score: getSaveScore(saveData),
          savedAt: saveData && saveData.savedAt ? new Date(saveData.savedAt).toLocaleString() : '-',
          version: saveData && saveData.version ? saveData.version : '?',
          level: s.level || 0,
          credits: s.credits || 0,
          codeCount: codes.length,
          operationCount: opCount,
          legendaryCount: legCount,
          stageHighest: (s.stage && s.stage.highestCleared) || 0,
          oneDay: (s.items && s.items.oneDay) || 0,
          coin: (s.items && s.items.coin) || 0,
          vuln: (s.items && s.items.zeroDayVulnerability) || 0
        };
      } catch (e) { return { score: 0, version: '?' }; }
    }

    // ── v3.0.0+: 마이그레이션 함수 ──
    // 1.x / 2.x / 이전 3.0.0 데이터를 현재 구조로 변환. 누락된 필드만 default merge.
    // 기존 획득/진행 데이터는 절대 삭제하지 않음.
    function migrateSave(rawSave) {
      if (!rawSave || typeof rawSave !== 'string') return null;
      let parsed;
      try {
        parsed = JSON.parse(rawSave);
      } catch (e) {
        console.warn('[Migrate] parse failed:', e);
        return null;
      }
      if (!parsed || typeof parsed !== 'object') return null;

      // 마이그레이션 표시
      const fromVersion = parsed.version || parsed.saveVersion || 'unknown';

      // 구조 보정 — state 객체가 없으면 기존 데이터를 state로 감쌈 (legacy)
      if (!parsed.state && parsed.level !== undefined) {
        // 매우 오래된 flat 구조 — wrap
        parsed = {
          version: fromVersion,
          savedAt: parsed.savedAt || Date.now(),
          state: parsed,
          ownedCodes: parsed.ownedCodes || [],
          modifiers: parsed.modifiers || {}
        };
      }

      // ownedCodes 무결성 — legacy ID mapping
      // OPERATION 코드 ID가 안 바뀌었지만 안전망으로 매핑 테이블 둠
      const LEGACY_CODE_ID_MAP = {
        // 'old_id': 'new_id'
        'op_meridian': 'operation_meridian',
        'op_blackout': 'operation_blackout',
        'OPERATION_MERIDIAN': 'operation_meridian',
        'OPERATION_BLACKOUT': 'operation_blackout'
      };
      if (Array.isArray(parsed.ownedCodes)) {
        parsed.ownedCodes = parsed.ownedCodes.map(c => {
          if (!c) return c;
          if (LEGACY_CODE_ID_MAP[c.id]) {
            return Object.assign({}, c, { id: LEGACY_CODE_ID_MAP[c.id] });
          }
          return c;
        }).filter(c => c && c.id); // null/invalid 제거
      }

      // saveVersion 갱신 (내용은 유지)
      parsed.saveVersion = CURRENT_VERSION;

      return parsed;
    }

    // ── v3.0.0+: 백업 저장 ──
    // 마이그레이션 전 raw save를 백업. 이전 백업은 한 단계 더 보관.
    function pushSaveBackup(rawSave) {
      if (!rawSave) return;
      try {
        const prev = localStorage.getItem(SAVE_BACKUP_KEY);
        if (prev) {
          localStorage.setItem(SAVE_BACKUP_PREV_KEY, prev);
        }
        localStorage.setItem(SAVE_BACKUP_KEY, rawSave);
        localStorage.setItem(SAVE_META_KEY, JSON.stringify({
          backupAt: Date.now(),
          version: CURRENT_VERSION
        }));
      } catch (e) {
        console.warn('[SaveBackup] failed:', e);
      }
    }

    function getSaveBackup() {
      return localStorage.getItem(SAVE_BACKUP_KEY) || null;
    }
    function getSaveBackupPrev() {
      return localStorage.getItem(SAVE_BACKUP_PREV_KEY) || null;
    }

    // 업데이트 로그
    const updateLogs = [

      {
        version: 'v3.1.0',
        lines: [
          'SHOP 3분류 재편: 일반/교환 상점, 재화 상점(COIN/OneDay 서브탭), 유료 상점으로 구분했습니다.',
          'PASS 독립 패널: 헤더 PASS 버튼 추가. 시즌/캠페인 패스 탭 구분. 수령 완료 티어는 자동 숨김.',
          'EVENT 탭: PASS 제거 → 특별 출석 탭 추가.',
          '신규 DAILY/WEEKLY 미션 5개씩 추가: 일일 접속, 코드 레벨업, 상점 이용, 타워 도전 등.',
          '미션 버그 수정: 일일 접속(05:00 이후 자동 클리어), 타워 5층 도전 카운트, 코드 기어(미구현 → stub 처리).',
          'EVENT 글로우 버그 수정: PASS 티어 미수령 시 PASS 버튼이 빛나도록 분리.',
          '데이터 타워: 클리어 스테이지 자동 가림 — 마지막 클리어 + 미클리어만 표시.',
          'FLOW 분류 태그: 기존 EXTEND 아이템 태그를 FLOW로 명칭 변경 — 5번 EXTEND 패널과 혼동 방지.',
          'SUPPORT: 입금자명 자동 저장(localStorage), Firebase 권한 오류 시 대체 문의 경로 안내.',
          '설명서 업데이트: ZERO-DAY DISCOVERY 플레이 방법 상세 기재, FLOW 분류 / EXTEND 패널 설명.'
        ]
      },

      {
        version: 'v3.0.0',
        lines: [
          'ZERO-DAY 모드를 완전히 새로 만들었습니다. 기존 터미널 커맨드 방식(15버튼)을 폐기하고 ZERO-DAY DISCOVERY 타임어택으로 교체했습니다.',
          '패치 타이머가 실시간으로 올라가는 동안 DATA INJECT를 탭/홀드해 데이터를 주입합니다. TRACE 위험도가 90%를 넘으면 기하급수적으로 증가합니다.',
          '런 결과는 CLEAR(최소 주입량 달성) / CUT(패치 완료) / TRACED(추적됨) / ABORT(중단) 4종으로 구분됩니다.',
          '난이도 5종(INTRO/EASY/NORMAL/HARD/DANGER), PHANTOM·BREAKER 프로토콜이 TRACE 감소·주입량 증가로 재편됩니다.',
          'SUPPORT 패널 버그 수정: 입력 중 초기화, 보상 저장 지연, 태그 배지 미갱신 문제를 해결했습니다.',
          'ZERO-DAY 즉시 클리어 버그 수정: depth 0에서 탈출해도 CLEAR가 카운트되던 문제를 수정했습니다.'
        ]
      },

      {
        version: 'v1.6.14(k5b3)',
        lines: [
          'Ghost_Script 능력을 확정 추가 레벨 업에서 해킹 성공 시 25% 확률 EXP +10으로 조정했습니다.',
          '전설 코드의 성장 정체성은 유지하면서도 과도한 스노우볼을 줄이도록 밸런스를 재조정했습니다.'
        ]
      },

      {
        version: 'v1.6.13(k1)',
        lines: [
          '상점 분류 UI를 드롭다운에서 탭형 버튼으로 교체했습니다. 모바일에서도 한 번에 누르기 쉽게 정리했습니다.',
          '업적 50개를 신규 추가했습니다. 스캔, 해킹, 성장, 코드 관리, 수집 진행도까지 더 넓게 추적합니다.',
          '코드 도감을 추가했습니다. 전체 코드 목록, 발견 여부, 희귀도, 기본 파워, 설명을 한 번에 확인할 수 있습니다.',
          '더보기 탭 구성에 코드 도감을 추가하고 업데이트 로그를 v1.6.13 기준으로 갱신했습니다.'
        ]
      },

      {
        version: 'v1.6.12(k2)',
        lines: [
          '업데이트 로그를 최신화했습니다. 중복 조각/코드 동기화, 모바일 UI 개선, 상점 카테고리 분류를 반영했습니다.',
          '모바일 코드 상세 영역을 재정리했습니다. 강화/동기화/진화 버튼을 크게 만들고 한 줄에 몰리지 않도록 배치했습니다.',
          '상점에 카테고리 필터를 추가했습니다. 전체 / 에너지 / 시스템 / 경제 / 유틸리티로 나눠서 볼 수 있습니다.',
          '퀘스트 수가 줄어든 문제를 되돌렸습니다. DAILY 8 / WEEKLY 10 / MONTH 15 구성으로 복원했습니다.',
          '튜토리얼 자동 시작과 다시 보기 버튼을 제거해 더 이상 부활하지 않도록 막았습니다.'
        ]
      },

      {
        version: 'HackSim Java Edition → HCSiG Web',
        lines: [
          'Player, Code, TargetServer, CPU 티어, 성공 확률 공식을 구축했습니다.',
          '한글 UI, 현실 시간 기반 스캔 에너지, 간단한 인벤토리를 개발했습니다.',
          '좌/중/우 패널 사이즈 조정 기능, 코드 스캔, 해킹, CPU 업그레이드를 업데이트했습니다.'
        ]
      },
      {
        version: 'v1.3.x',
        lines: [
          '에너지 시스템을 개편했습니다.',
          '레벨업 시 크레딧을 획득할 수 있도록 조정했습니다.',
          '필요 EXP 곡선 조정으로 성장 속도를 완화했습니다.',
          '코드 인벤토리 & 상세 패널, 코드 강화/진화 버튼을 구현했습니다.',
          '상점 신규 아이템, 버튼 툴팁, 로그/코드 상세 상하 리사이즈 기능, 더보기 모달을 도입했습니다.'
        ]
      },
      {
        version: 'v1.4.x',
        lines: [
          '위험 해킹 모드가 추가되었습니다.',
          '로그 필터, 로드아웃(프리셋) 3슬롯을 기본설정했습니다.',
          '데일리/위클리 미션, 업적 시스템이 추가되었습니다.'
        ]
      },
      {
        version: 'v1.5.x',
        lines: [
          '코드 등급별 색상을 적용하고, 스캔 연출 크기와 희귀도별 스캔 시간을 조정했습니다.',
          '업데이트 로그 뷰어에 좌우 이동 및 탭 UI를 추가하고, 시작 시 자동 팝업에서만 ‘이후 더보기에서 확인’을 노출하도록 변경했습니다.',
          'DAILY / WEEKLY / MONTH QUEST를 분리 탭으로 구성하고, 장기 진행형 GENERAL QUEST를 추가했습니다.',
          '상점에 희귀도·카테고리 기반 아이템 8종을 추가하고, 업적 개수를 확장했습니다.'
        ]
      },
      {
        version: 'v1.6.0',
        lines: [
          '에너지 팩(인벤토리)을 추가했습니다. Status에서 보유 수량 확인 및 즉시 사용으로 에너지를 최대치까지 회복할 수 있습니다.',
          '상점에 에너지 팩을 추가하고, 구매 시 인벤토리가 증가하도록 했습니다.',
          'DAILY 퀘스트에 “코드 스캔/서버 해킹 총 10회 → 크레딧 + 에너지 팩 1개” 보상을 추가했습니다.',
          '왼쪽 패널에서 STATUS는 고정되고, SHOP 목록만 내부 스크롤되도록 UI를 개선했습니다.',
          '저장 키를 v16으로 분리하고(v15 → v16) 자동 마이그레이션을 지원합니다.'
        ]
      },
      {
        version: 'v1.6.1',
        lines: [
          '상점 정렬 옵션(업데이트순/희귀도순)을 추가했습니다.',
          '미션/업적 달성 시 화면 알림(토스트)을 추가했습니다. (로그와 별개)',
          '로그 패널을 메인 화면에서 제거하고, 더보기 탭으로 이동했습니다.'
        ]
      },
      {
        version: 'v1.6.2',
        lines: [
          '더보기 버튼 클릭 버그를 수정하고, 모달 오픈 가드 및 레이어 우선순위를 보강했습니다.'
        ]
      },
      {
        version: 'v1.6.5',
        lines: [
          '상점 정렬 옵션을 확장했습니다. (업데이트순/신규우선/희귀도순/가격순/이름순)',
          '설정 탭을 추가했습니다. (폰트 크기, UI 스케일, 애니메이션, 토스트 시간, 자동저장 알림)',
          '데이터 탭에서 저장 데이터 내보내기/불러오기(파일/텍스트)를 지원합니다.',
          '로그 검색/핀 기능과 최대 100개 표시(핀 제외) 제한을 추가했습니다.',
          '마지막 저장 시각 표시 및 자동저장 UX를 개선했습니다.'
        ]
      },
      {
        version: 'v1.6.6',
        lines: [
          '크리스마스 시즌 눈 이펙트를 추가하고, 설정에서 수동 on/off 또는 시즌 자동 모드를 지원합니다.',
          '설정 적용 로직을 보강해 폰트 크기·UI 스케일·애니메이션 옵션이 즉시 반영되도록 정리했습니다.',
          '눈 이펙트 캔버스의 표시/중지 처리와 리사이즈 대응을 보강했습니다.'
        ]
      },
      {
        version: 'v1.6.7',
        lines: [
          '모바일 전용 보기 구조를 손보고, PC 3패널 레이아웃을 모바일 탭 뷰로 분리하는 작업을 진행했습니다.',
          '하단 탭 기반으로 STATUS / ACTION / SHOP / LOG / CODE DETAIL 화면을 전환할 수 있도록 구성했습니다.',
          '모바일에서 코드 상세 화면 진입 및 복귀 흐름을 정리했습니다.'
        ]
      },
      {
        version: 'v1.6.8',
        lines: [
          '터치 기기에서 리사이저가 오작동하지 않도록 모바일 환경에서는 리사이즈 바를 비활성화했습니다.',
          '안전 영역(safe-area)과 모바일 탭 높이를 다시 계산해 iOS 계열 화면 잘림을 줄였습니다.',
          '회전 및 리사이즈 시 모바일 레이아웃 보정이 더 자주 적용되도록 조정했습니다.'
        ]
      },
      {
        version: 'v1.6.9',
        lines: [
          '모바일 탭 전환 구조를 추가 보강하고, 화면 전환 시 스크롤 위치와 활성 버튼 상태를 함께 정리했습니다.',
          '상단/하단 UI 높이 변수 재계산을 반복 적용해 주소창 변화에 따른 레이아웃 흔들림을 완화했습니다.',
          '모바일에서 More 및 상세 패널 진입 후 복귀 시 발생하던 표시 꼬임을 줄였습니다.'
        ]
      },
      {
        version: 'v1.6.10',
        lines: [
          '모바일 뷰 시스템을 최신 5탭 기준으로 정리하고, 구형 3탭 스위처와의 충돌을 막았습니다.',
          'iOS에서 보이지 않는 오버레이가 탭을 가로막던 문제를 피하기 위해 레거시 전환 코드를 비활성화했습니다.',
          '초기 레이아웃 안정화를 위해 모바일 보정 로직과 뷰 전환 초기값을 재정리했습니다.'
        ]
      },
      {
        version: 'v1.6.11(i)',
        lines: [
          '탭 종료 후 재접속 시에도 오프라인 에너지 회복이 적용되도록 수정했습니다.',
          '게임 시작 직후 마지막 접속 시각을 기준으로 경과 시간을 계산해 에너지를 보정합니다.',
          'visibilitychange/pagehide 뿐 아니라 새로 열기·새로고침 상황에서도 복귀 보정이 동작합니다.',
          '오프라인 에너지 회복 상한은 최대 60분으로 유지됩니다.'
        ]
      },
      {
        version: 'v1.6.11(j)',
        lines: [
          '신규 유저용 튜토리얼 시스템 1차를 추가했습니다.',
          'HOME/코드 스캔/CODES/해킹/성장 흐름을 단계별로 안내합니다.',
          '특정 행동을 수행하면 다음 단계로 자동 진행되며, 건너뛰기 및 다시 보기를 지원합니다.',
          '튜토리얼 완료 여부와 진행 단계는 저장 데이터에 함께 보관됩니다.'
        ]
      },
      {
        version: 'v1.7.0-priority1-lab',
        lines: [
          '메인 구조를 HOME / CODES / SHOP / MORE / LAB 5패널로 재구성했습니다.',
          'COMING SOON을 LAB 내부 하위 패널로 이동하고 데이터 타워 프리뷰 셸을 추가했습니다.',
          'MORE를 메인 패널로 승격하고, 튜토리얼 다시 보기를 MORE에서 실행할 수 있게 했습니다.',
          '새 온보딩 튜토리얼 v2와 부드러운 패널 전환 스타일을 적용했습니다.'
        ]
      },
      {
        version: 'v1.8.0-stage-100',
        lines: [
          'LAB > 데이터 타워에 1~100 도전 구간을 정식 추가했습니다.',
          '5개 챕터, 추천 레벨/파워/코드, 첫 클리어 보상과 반복 보상을 분리했습니다.',
          '스테이지 클리어 기록과 최고 도달 구간을 기존 저장 데이터와 호환되도록 추가했습니다.',
          '활성 코드, CPU 티어, 코드 동기화 보정이 데이터 타워 성공률에 반영됩니다.'
        ]
      },
      {
        version: 'v1.8.1-lab-coming',
        lines: [
          '중복되던 MORE 메인 패널을 제거하고 헤더 더보기 모달 전용으로 되돌렸습니다.',
          '메인 탭 순서를 HOME / CODES / SHOP / LAB / COMING SOON으로 정리했습니다.',
          'COMING SOON을 LAB 내부 하위 메뉴에서 독립 메인 패널로 이동했습니다.',
          'LAB은 데이터 타워 1~100 도전 콘텐츠 중심으로 더 명확하게 정리했습니다.'
        ]
      },
      {
        version: '2.0.0',
        lines: [
          '숫자 버전 체계로 전환하고 HOME / CODES / SHOP / LAB / COMING SOON 구조를 2.0.0 기준으로 정리했습니다.',
          'NORMAL / RISK / EXTREME 해킹 모드와 GPU 티어 업그레이드를 정식 추가했습니다.',
          '데이터 타워 1~100을 10챕터 아코디언 구조로 재배치하고 첫 클리어, 반복, 챕터 보상을 분리했습니다.',
          '신규 코드 30종과 신규 업적 100종, 업적 필터, Cloud-only 데이터 UI를 추가했습니다.'
        ]
      },
      {
        version: '2.0.1',
        lines: [
          'Dev 표기 없이 2.0.0 라인의 공식 패치로 효과음 시스템을 추가했습니다.',
          '버튼, 스캔, 해킹 성공/실패, 업그레이드, 데이터 타워, 업적, 레벨업에 짧은 Web Audio 효과음을 연결했습니다.',
          '설정 탭에서 효과음 ON/OFF와 볼륨을 저장할 수 있게 했습니다.',
          '외부 음원 파일 없이 브라우저 내 합성음으로 처리해 GitHub Pages 로딩 부담을 줄였습니다.'
        ]
      },
      {
        version: '2.0.2',
        lines: [
          '모바일 화면 자동 확대를 줄이고 입력/선택 UI의 터치 안정성을 보강했습니다.',
          '하단 메인 탭과 주요 버튼의 터치 판정을 정리해 클릭 씹힘을 줄였습니다.',
          'LAB, COMING SOON, 튜토리얼 문구를 더 짧고 게임 안쪽 말투로 다듬었습니다.',
          '모바일 버튼 누름 연출을 완화해 조작 중 레이아웃 흔들림을 줄였습니다.'
        ]
      },
      {
        version: '2.1.0',
        lines: [
          'LIVE NET 헤더, Network Pulse, Network Broadcast 허브를 추가했습니다.',
          'Firebase 실시간 운영 문서로 공지, 노드 상태, 전역 피드, 소프트 랭킹을 표시합니다.',
          '로그인 사용자의 presence heartbeat와 닉네임/Callsign 표시 모드를 추가했습니다.',
          'Firebase 또는 로그인 상태가 준비되지 않으면 LOCAL MIRROR 모드로 안전하게 표시합니다.'
        ]
      },
      {
        version: '2.1.1',
        lines: [
          'HOME에서 ACTIONS와 Network Pulse가 겹치지 않도록 배치를 정리했습니다.',
          'LIVE NET 기본 상태와 Firestore 권한 대기 안내를 더 명확하게 표시합니다.',
          '모바일 터치/줌 방지 처리를 한 단계 더 보강했습니다.',
          '데이터 타워 표시명을 정리했습니다.'
        ]
      },
      {
        version: '2.1.2',
        lines: [
          'Network Broadcast의 빈 공지 fallback이 ONLINE 상태와 충돌하지 않도록 정리했습니다.',
          'LIVE NET이 온라인일 때는 LOCAL MIRROR 안내 대신 Broadcast Standby 상태를 표시합니다.'
        ]
      },
      {
        version: '2.2.0',
        lines: [
          'LAB에 WEEKLY CHALLENGE 탭을 추가하고 월요일 05:00 KST 기준 고정 로테이션을 적용했습니다.',
          '주간 목표 5개와 보너스 목표 1개를 수동 CLAIM 보상 구조로 분리했습니다.',
          'Weekly Token, 주간 점수, 주간 배지 저장 필드를 추가했습니다.',
          '미션과 업적은 헤더 LIST 모달로 분리하고 더보기는 도감/로그/설정/클라우드 중심으로 정리했습니다.'
        ]
      },
      {
        version: '2.2.1',
        lines: [
          'LIVE NET 숫자 갱신 주기를 느리게 조정해 SYNC ms 튐과 헤더 재렌더를 줄였습니다.',
          'COMING SOON 내부 Broadcast / Nodes / Feed / Rank 탭은 열려 있을 때만 해당 상세 구독을 유지합니다.',
          '헤더, Network Pulse, Broadcast, Rank 렌더를 분리해 클릭 반응 저하를 줄였습니다.',
          'LIVE 패널 전환과 카드 반응 애니메이션을 한 단계 완화했습니다.'
        ]
      },
      {
        version: '2.2.2',
        lines: [
          '처음 플레이하는 사용자가 스캔, 코드 선택, NORMAL 해킹까지 따라갈 수 있도록 튜토리얼을 재구성했습니다.',
          '튜토리얼 단계에 목표와 체크리스트를 추가해 각 화면에서 해야 할 일을 더 명확하게 표시합니다.',
          '행동 안내 단계는 직접 수행하면 자동 진행되지만, 다시 보기 중에는 다음 버튼으로도 넘길 수 있게 했습니다.',
          'LIST, 더보기, 클라우드 계정, LAB 주간 콘텐츠까지 초반 동선 설명을 보강했습니다.'
        ]
      },
      {
        version: '2.2.3',
        lines: [
          '튜토리얼 행동 단계가 실제 버튼 조작을 가리지 않도록 하단 코치 패널 방식으로 수정했습니다.',
          '스캔, 코드 선택, 해킹 안내 중에는 안내창 본문 클릭이 게임 화면으로 통과되게 했습니다.',
          '모바일에서는 하단 메인 탭 위로 튜토리얼을 띄워 탭 이동과 버튼 입력이 막히지 않도록 정리했습니다.',
          '행동 단계의 건너뛰기 문구를 닫고 플레이로 바꿔 새 플레이어가 바로 게임에 들어가기 쉽게 했습니다.'
        ]
      },
      {
        version: '2.2.4',
        lines: [
          '헤더를 LIST / EVENT / 더보기 중심으로 정리하고 HOME을 상태와 핵심 행동 조종석으로 재배치했습니다.',
          'WEEKLY CHALLENGE는 EVENT로 이동하고 LAB은 데이터 타워 / ZERO-DAY / COMING SOON 구조로 정리했습니다.',
          'LIVE NET과 RANK는 더보기 안의 네트워크 관제실로 이동했습니다.',
          'CODES 상세 모달, 조각 강화, 신규 상점 보급 아이템 10종을 추가했습니다.'
        ]
      },
      {
        version: '2.2.5',
        lines: [
          'HOME의 STATUS와 ACTIONS를 하나의 조종석 패널로 묶어 첫 화면 인지 흐름을 정리했습니다.',
          '로드아웃 저장/불러오기 줄과 코드 카드 터치 영역을 넓혀 모바일 조작 씹힘을 줄였습니다.',
          '경제 상점의 역보상 크레딧 상품을 정상 보급 상품으로 수정했습니다.',
          '데이터 타워 목록을 더 압축하고 내부 중첩 스크롤을 줄였습니다.'
        ]
      },
      {
        version: '2.2.6',
        lines: [
          '모바일 온보딩 모달 폭과 버튼 줄바꿈을 보정해 신규 세션에서도 조작 버튼이 잘리지 않게 했습니다.',
          '2.2.5 레이아웃 수정이 확실히 반영되도록 캐시 버스터를 갱신했습니다.'
        ]
      },
      {
        version: '2.2.7',
        lines: [
          '모바일 헤더, HOME STATUS, ACTIONS 높이를 줄여 첫 화면에서 핵심 조작이 함께 보이도록 조정했습니다.',
          '데이터 타워 요약과 선택 상세를 압축해 도전 버튼까지 더 빠르게 닿도록 정리했습니다.'
        ]
      },
      {
        version: '2.2.8',
        lines: [
          '모바일 코드 상세 모달의 액션 버튼을 2열 그리드로 압축하고 sticky 충돌을 제거했습니다.',
          '코드 상세 정보 영역을 카드형 그리드로 정리해 본문과 버튼이 한 화면에 더 자연스럽게 들어오도록 조정했습니다.'
        ]
      },
      {
        version: '2.2.9',
        lines: [
          'ZERO-DAY 프리뷰에 싱글모드와 경쟁모드 선택 구조를 추가했습니다.',
          '정식 침투 엔진 전 준비, 침투, 탈출 흐름과 다음 대형 업데이트 예고를 더 명확히 정리했습니다.'
        ]
      },
      {
        version: '2.3.0',
        lines: [
          'ZERO-DAY 실제 침투 엔진을 출시했습니다. 싱글모드와 경쟁모드를 선택해 런을 시작할 수 있습니다.',
          '노드 돌파, 은폐, 신호 수집, 탈출 액션을 추가하고 탐지율 100% 도달 전 보상을 회수하는 구조를 적용했습니다.',
          'ZERO-DAY 개인 기록, 최고 깊이, 최고 점수, 총 회수 신호를 저장합니다.'
        ]
      }
      ,{
        version: '3.0.2',
        lines: [
          '신규 아이템 타임 스와프(2h/5h/10h)가 추가되었습니다. AUTO-RUN 시간 연장 또는 에너지 회복 대기시간 단축에 사용할 수 있습니다.',
          '신규 성장 재료 TRACE 앰플(코드 잠재 능력)과 NULL 시드(한계 돌파)가 아이템 패널에 추가되었습니다.',
          '일일 미션 3종(일일 스캐너 I, 일일 침입자 I, 에너지 소비자)에 COIN +1 보상이 추가되었습니다.',
          '초보자 한정 룰렛이 EVENT 탭에 추가되었습니다. 신규 계정 기준 10일간 매일 1회 수령 가능합니다.',
          '수동 결제 처리 기반의 Support 시스템이 MORE → SUPPORT 탭에 추가되었습니다.'
        ]
      }
      ,{
        version: '3.0.1',
        lines: [
          'HOME 화면에 "오늘 할 일" 요약이 추가되었습니다. 에너지, 일일 미션 진행도, 주간 목표를 한 화면에서 확인할 수 있습니다.',
          'CODES 탭이 INVENTORY로 이름이 바뀌었습니다. 내부에 CODES / ITEMS 두 패널로 분리되었습니다.',
          'ITEMS 패널에 AUTO-RUN 시스템이 추가되었습니다. 자동 스캔(10 COIN, 10초마다, 1시간)과 자동 해킹(15 COIN, 20초마다, 30분)을 각각 일일 3회 사용할 수 있습니다. 에너지 소진 시 에너지 팩을 자동 사용합니다.',
          'ITEMS 패널에서 에너지 팩, COIN, TOKEN, Daily Bonus Box, ROM 보유 현황을 확인할 수 있습니다.',
          'DAILY / WEEKLY 미션 완료 상태가 새로고침 후에도 유지되도록 저장 로직을 강화했습니다.',
          'LIVE NET에 Foundation Prep Update 공지가 추가되었습니다.'
        ]
      }
      ,{
        version: '3.0.0',
        lines: [
          '메인 패널 순서를 SHOP / CODES / HOME / LAB / COMING SOON으로 재배치했습니다.',
          'EVENT를 PASS / WEEKLY CHALLENGE 2패널로 분리하고 월간 시즌제(2026-05부터 시즌 1)를 도입했습니다.',
          '데이터 타워를 BREACH / SHIELD / FOCUS / EXIT 4액션 턴제 전투로 전환하고 에너지 비용을 1로 낮췄습니다.',
          'ZERO-DAY를 온보딩과 DISCOVERY 중심 구조로 재정비했습니다. 터미널 UI와 취약점 재화를 추가했습니다.',
          '서버를 12종으로 확장하고 외부 / 내부 / 코어 루트 3종을 추가했습니다.',
          'OPERATION 희귀도 코드 2종(Operation_Meridian, Operation_Blackout)을 추가했습니다.',
          '업적 난이도를 6단(입문/일반/보통/어려움/혼돈/불가능)으로 재편하고 GENERAL 퀘스트 +30종을 추가했습니다.',
          '언어 지원을 한국어 / 영어 / 일본어 3종으로 확장했습니다.',
          '더보기에 CREDITS 탭과 설명서 탭을 추가했습니다.',
          '에너지 회복 주기를 120초에서 60초로 단축했습니다. 눈 이펙트를 제거했습니다.'
        ]
      }

    ];

    let activeUpdateIndex = updateLogs.length - 1;

    const state = {
      level: 1,
      exp: 0,
      requiredExp: 20,
      credits: 0,
      cpuTier: 1,
      gpuTier: 1,
      energy: 20,
      energyMax: 20,
      energyTimerMs: 0,
      items: { energyPack: 0, weeklyToken: 0, coin: 0, zeroDayVulnerability: 0, zeroDayVulnerabilityShard: 0, oneDay: 0, timeSwap2h: 0, timeSwap5h: 0, timeSwap10h: 0, traceAmple: 0, nullSeed: 0, dailyBonusBox: 0, rom: 0, codeProtection: 0, pickResidualData: 0 },
      lastSavedAt: null,
      lastSeenAt: null,
      tutorial: { completed: false, step: 0, seen: false, version: TUTORIAL_VERSION },
      stage: { selectedId: 'stage_001', chapterFilter: '1', highestCleared: 0, cleared: {}, chapterRewardsClaimed: {}, activeBattle: null },
      campaign: { chapterId: 'campaign_ch1', selectedId: 'campaign_ch1_node1', highestCleared: 0, cleared: {}, activeEncounter: null },
      extend: { highlightsSeen: {}, lastUsedCategory: null },
      targeting: { serverId: 'school_lab', route: 'internal' },
      zeroDay: {
        onboardingCompleted: false, recommendationState: null,
        pve: { active: null, bestDepth: 0, bestScore: 0, runs: 0, extracts: 0, difficulty: 'easy' },
        pvp: { active: null, rating: 1000, seasonWins: 0, seasonLosses: 0, attacksTotal: 0, defensesTotal: 0 },
        defense: { slots: 3, cards: [], usesThisMatch: 0 },
        unlocks: {}, tier: 1, skins: [], activeSkin: 'zero_shell',
        legacyRunStats: null
      },
      season: { currentKey: 'preseason', currentNumber: 0, passPoints: 0, passTier: 0, passClaimed: {}, shopPurchases: {}, pvpSeasonRecord: {} },
      weeklyChallenge: { weekKey: null, progress: {}, claimed: {}, bonusClaimed: false, score: 0, badges: {}, progressTierCurrent: 'foundation', progressTierNext: null, shopPurchases: {} },
      activeCodeId: null,
      hackMode: 'normal',
      riskMode: false,
      missionProgress: {
        daily: {
          scans: 0,
          actions: 0,
          hackSuccess: 0,
          riskHackSuccess: 0,
          shopPurchases: 0,
          energySpent: 0,
          energyZeroReached: false,
          lastResetDay: null,
          completed: {}
        },
        weekly: {
          scans: 0,
          hackSuccess: 0,
          riskHackSuccess: 0,
          shopPurchases: 0,
          energySpent: 0,
          levelReached: 1,
          energyZeroReached: false,
          lastResetWeek: null,
          completed: {}
        },
        month: {
          scans: 0,
          hackSuccess: 0,
          riskHackSuccess: 0,
          shopPurchases: 0,
          energySpent: 0,
          levelReached: 1,
          energyZeroReached: false,
          lastResetMonth: null,
          completed: {}
        },
        general: {
          completed: {}
        }
      },
      achievements: {},
      loadouts: {
        1: { codeId: null, serverId: null, hackMode: 'normal' },
        2: { codeId: null, serverId: null, hackMode: 'normal' },
        3: { codeId: null, serverId: null, hackMode: 'normal' }
      },
      logFilter: {
        system: true,
        scan: true,
        hack: true,
        shop: true,
        level: true
      },
      ui: { lang: 'ko', shopSortMode: 'update', shopCategory: 'all', codeSortMode: 'recent', toastDurationMs: 3000, uiZoom: 1, fontScale: 100, anim: true, sfxEnabled: true, sfxVolume: 100, autoSaveToast: false, logSearch: '', snowEnabled: null, achievementFilter: 'incomplete', showHiddenAchievements: false, liveNetworkEnabled: true, liveNicknameMode: 'nickname', weeklyFilter: 'incomplete', homeStatusCollapsed: false, zeroDayCommandLocale: 'auto' },
      stats: {
        scanCount: 0,
        hackSuccessCount: 0,
        shopPurchaseCount: 0,
        energySpentTotal: 0,
        creditsEarnedTotal: 0,
        missionsCompletedTotal: 0,
        riskHackSuccessCount: 0,
        extremeHackSuccessCount: 0,
        codeShardsTotal: 0,
        codeUpgradeCount: 0,
        codeSyncCount: 0,
        codeEvolutionCount: 0,
        energyPacksUsed: 0,
        stageAttemptCount: 0,
        stageClearCount: 0,
        stageTurnWinCount: 0,
        zeroDayRunCount: 0,
        zeroDayExtractCount: 0,
        zeroDayTraceCount: 0,
        zeroDayBestDepth: 0,
        zeroDayBestScore: 0,
        zeroDaySignalTotal: 0,
        zeroDayPveClearCount: 0,
        zeroDayPveEscapeCount: 0,
        zeroDayPvpAttackWinCount: 0,
        zeroDayPvpDefenseSuccessCount: 0,
        zeroDayOneDayEarnedTotal: 0,
        zeroDayOneDaySpentTotal: 0,
        coinEarnedTotal: 0,
        coinSpentTotal: 0,
        oneDaySpentTotal: 0,
        oneDayBoostsUsed: 0,
        passTierReached: 0,
        gpuUpgradeCount: 0,
        weeklyAllClearCount: 0,
        weeklyGoalClaimCount: 0,
        weeklyTokensSpentTotal: 0,
        eventShopPurchaseCount: 0,
        codeShardsSpentTotal: 0,
        routeExternalHackSuccessCount: 0,
        routeInternalHackSuccessCount: 0,
        routeCoreHackSuccessCount: 0
      },
      autoRun: {
        type: null,
        endsAt: 0,
        paused: false,
        pausedTimeLeft: 0,
        dailyScanUses: 0,
        dailyHackUses: 0,
        lastResetDay: null
      },
      beginnerRoulette: {
        firstSeenAt: null,
        claimedDays: []
      },
      supporterTags: [],
      claimFlags: { firstLogin_3_0_0: false, pre3ScaleCompensation: false, pre3ScaleEligible: false }
    };

    const codeDefs = {
      basic: {
        id: 'basic',
        name: 'Basic_Probe',
        rarity: 'COMMON',
        basePower: 15,
        description: '기본 테스트 코드. 추가 효과 없음.'
      },
      port_scanner: {
        id: 'port_scanner',
        name: 'Port_Scanner',
        rarity: 'COMMON',
        basePower: 18,
        description: '해킹 시 대상 서버 보안 -10%를 적용합니다.'
      },
      pulse_ping: {
        id: 'pulse_ping',
        name: 'Pulse_Ping',
        rarity: 'COMMON',
        basePower: 16,
        description: '해킹 성공 확률을 +3%p 증가시킵니다.'
      },
      cache_sniffer: {
        id: 'cache_sniffer',
        name: 'Cache_Sniffer',
        rarity: 'COMMON',
        basePower: 17,
        description: '해킹 성공 시 추가 크레딧 +8을 획득합니다.'
      },
      shield_bypass: {
        id: 'shield_bypass',
        name: 'Shield_Bypass',
        rarity: 'UNCOMMON',
        basePower: 19,
        description: '해킹 시 대상 서버 보안 -15%를 적용합니다.'
      },
      stack_tracer: {
        id: 'stack_tracer',
        name: 'Stack_Tracer',
        rarity: 'UNCOMMON',
        basePower: 20,
        description: '해킹 성공 확률을 +5%p 증가시킵니다.'
      },
      credit_siphon: {
        id: 'credit_siphon',
        name: 'Credit_Siphon',
        rarity: 'UNCOMMON',
        basePower: 20,
        description: '해킹 성공 시 크레딧 +15% 보정을 적용합니다.'
      },
      fallback_node: {
        id: 'fallback_node',
        name: 'Fallback_Node',
        rarity: 'UNCOMMON',
        basePower: 19,
        description: '해킹 실패 시 12% 확률로 에너지 1을 즉시 회복합니다.'
      },
      data_phantom: {
        id: 'data_phantom',
        name: 'Data_Phantom',
        rarity: 'RARE',
        basePower: 22,
        description: '해킹 성공 확률을 +10%p 증가시킵니다.'
      },
      auto_patch: {
        id: 'auto_patch',
        name: 'AutoPatch()',
        rarity: 'RARE',
        basePower: 20,
        description: '해킹 실패 시 20% 확률로 경험치 +1 보정을 제공합니다.'
      },
      trace_scrambler: {
        id: 'trace_scrambler',
        name: 'Trace_Scrambler',
        rarity: 'RARE',
        basePower: 23,
        description: '위험 해킹 모드의 성공률 페널티를 5%p 줄입니다.'
      },
      null_rewriter: {
        id: 'null_rewriter',
        name: 'Null_Rewriter',
        rarity: 'RARE',
        basePower: 24,
        description: '해킹 성공 시 크레딧 +25% 보정을 적용합니다.'
      },
      rapid_exploit: {
        id: 'rapid_exploit',
        name: 'Rapid_Exploit',
        rarity: 'RARE',
        basePower: 22,
        description: '해킹 성공 시 경험치 +3을 추가로 획득합니다.'
      },
      overflow_inject: {
        id: 'overflow_inject',
        name: 'Overflow_Inject',
        rarity: 'EPIC',
        basePower: 26,
        description: '성공 시 크레딧 +30%, 실패 시 에너지를 1 추가로 소모합니다.'
      },
      fortress_breaker: {
        id: 'fortress_breaker',
        name: 'Fortress_Breaker',
        rarity: 'EPIC',
        basePower: 28,
        description: '해킹 시 대상 서버 보안 -25%를 적용합니다.'
      },
      quantum_splice: {
        id: 'quantum_splice',
        name: 'Quantum_Splice',
        rarity: 'EPIC',
        basePower: 29,
        description: '해킹 성공 확률 +12%p, 성공 시 크레딧 +20%를 적용합니다.'
      },
      zero_trace: {
        id: 'zero_trace',
        name: 'ZERO_TRACE',
        rarity: 'EPIC',
        basePower: 168,
        seasonId: 'season_1',
        codeClass: 'PICK',
        description: 'Foundation Season 기념 코드. 해킹 성공률 +8%p, 크레딧 +18%, 데이터 타워 성공률 +4%p.',
        descriptionEn: 'Foundation Season commemorative code. Hack chance +8%p, credits +18%, Data Tower chance +4%p.',
        effect: { hackChance: 0.08, creditBonus: 0.18, stageChance: 0.04 }
      },
      ghost_script: {
        id: 'ghost_script',
        name: 'Ghost_Script',
        rarity: 'LEGENDARY',
        basePower: 30,
        description: '해킹 성공 시 25% 확률로 EXP +10을 획득합니다.'
      },
      singularity_root: {
        id: 'singularity_root',
        name: 'Singularity_Root',
        rarity: 'LEGENDARY',
        basePower: 34,
        description: '해킹 성공 확률 +10%p, 성공 시 크레딧 +40%를 적용합니다.'
      },
      scan_cache: {
        id: 'scan_cache',
        name: 'Scan_Cache',
        rarity: 'COMMON',
        basePower: 18,
        description: '코드 스캔 시간이 8% 감소합니다.',
        effect: { scanSpeed: 0.08 }
      },
      rarity_lens: {
        id: 'rarity_lens',
        name: 'Rarity_Lens',
        rarity: 'UNCOMMON',
        basePower: 20,
        description: '코드 스캔 시 RARE 이상 보정이 소폭 증가합니다.',
        effect: { scanRareBoost: 0.12 }
      },
      shard_magnet: {
        id: 'shard_magnet',
        name: 'Shard_Magnet',
        rarity: 'UNCOMMON',
        basePower: 19,
        description: '중복 코드 조각 획득량 +1.',
        effect: { scanShardBonus: 1 }
      },
      deep_indexer: {
        id: 'deep_indexer',
        name: 'Deep_Indexer',
        rarity: 'RARE',
        basePower: 23,
        description: '코드 스캔 EXP +2, 스캔 시간이 10% 감소합니다.',
        effect: { scanExpBonus: 2, scanSpeed: 0.1 }
      },
      prism_crawler: {
        id: 'prism_crawler',
        name: 'Prism_Crawler',
        rarity: 'EPIC',
        basePower: 27,
        description: '코드 스캔 시 EPIC 이상 보정과 중복 조각 보너스를 제공합니다.',
        effect: { scanRareBoost: 0.22, scanShardBonus: 2 }
      },
      oracle_spider: {
        id: 'oracle_spider',
        name: 'Oracle_Spider',
        rarity: 'LEGENDARY',
        basePower: 32,
        description: '코드 스캔 시간이 18% 감소하고 LEGENDARY 탐색 보정이 증가합니다.',
        effect: { scanSpeed: 0.18, scanRareBoost: 0.35, scanExpBonus: 3 }
      },
      signal_anchor: {
        id: 'signal_anchor',
        name: 'Signal_Anchor',
        rarity: 'COMMON',
        basePower: 18,
        description: '해킹 성공 확률 +2%p.',
        effect: { hackChance: 0.02 }
      },
      kernel_probe: {
        id: 'kernel_probe',
        name: 'Kernel_Probe',
        rarity: 'UNCOMMON',
        basePower: 21,
        description: '대상 서버 보안 -7%.',
        effect: { serverSecurityMult: 0.93 }
      },
      handshake_forge: {
        id: 'handshake_forge',
        name: 'Handshake_Forge',
        rarity: 'UNCOMMON',
        basePower: 20,
        description: '해킹 성공 확률 +4%p.',
        effect: { hackChance: 0.04 }
      },
      exploit_router: {
        id: 'exploit_router',
        name: 'Exploit_Router',
        rarity: 'RARE',
        basePower: 24,
        description: '해킹 성공 확률 +7%p, 대상 서버 보안 -5%.',
        effect: { hackChance: 0.07, serverSecurityMult: 0.95 }
      },
      zero_day_seed: {
        id: 'zero_day_seed',
        name: 'ZeroDay_Seed',
        rarity: 'EPIC',
        basePower: 29,
        description: '해킹 성공 확률 +11%p.',
        effect: { hackChance: 0.11 }
      },
      root_oracle: {
        id: 'root_oracle',
        name: 'Root_Oracle',
        rarity: 'LEGENDARY',
        basePower: 35,
        description: '해킹 성공 확률 +14%p, CPU 보정 효율이 소폭 증가합니다.',
        effect: { hackChance: 0.14, cpuPowerBonus: 0.02 }
      },
      coin_tap: {
        id: 'coin_tap',
        name: 'Coin_Tap',
        rarity: 'COMMON',
        basePower: 17,
        description: '해킹 성공 시 크레딧 +10%.',
        effect: { creditBonus: 0.1 }
      },
      bounty_hook: {
        id: 'bounty_hook',
        name: 'Bounty_Hook',
        rarity: 'UNCOMMON',
        basePower: 20,
        description: '해킹 성공 시 크레딧 +18%.',
        effect: { creditBonus: 0.18 }
      },
      exp_stream: {
        id: 'exp_stream',
        name: 'EXP_Stream',
        rarity: 'UNCOMMON',
        basePower: 19,
        description: '해킹 성공 시 EXP +15%.',
        effect: { expBonus: 0.15 }
      },
      vault_siphon: {
        id: 'vault_siphon',
        name: 'Vault_Siphon',
        rarity: 'RARE',
        basePower: 24,
        description: '해킹 성공 시 크레딧 +25%, EXP +10%.',
        effect: { creditBonus: 0.25, expBonus: 0.1 }
      },
      reward_kernel: {
        id: 'reward_kernel',
        name: 'Reward_Kernel',
        rarity: 'EPIC',
        basePower: 28,
        description: '해킹 성공 시 크레딧 +35%, EXP +18%.',
        effect: { creditBonus: 0.35, expBonus: 0.18 }
      },
      jackpot_daemon: {
        id: 'jackpot_daemon',
        name: 'Jackpot_Daemon',
        rarity: 'LEGENDARY',
        basePower: 33,
        description: '해킹 성공 시 크레딧 +50%, EXP +25%.',
        effect: { creditBonus: 0.5, expBonus: 0.25 }
      },
      risk_buffer: {
        id: 'risk_buffer',
        name: 'Risk_Buffer',
        rarity: 'COMMON',
        basePower: 18,
        description: 'RISK/EXTREME 실패 페널티를 아주 조금 완화합니다.',
        effect: { riskPenaltyReduction: 0.02, extremePenaltyReduction: 0.01 }
      },
      trace_anchor: {
        id: 'trace_anchor',
        name: 'Trace_Anchor',
        rarity: 'UNCOMMON',
        basePower: 21,
        description: 'RISK 성공률 페널티 -4%p.',
        effect: { riskPenaltyReduction: 0.04 }
      },
      extreme_buffer: {
        id: 'extreme_buffer',
        name: 'Extreme_Buffer',
        rarity: 'UNCOMMON',
        basePower: 20,
        description: 'EXTREME 성공률 페널티 -3%p.',
        effect: { extremePenaltyReduction: 0.03 }
      },
      overclock_guard: {
        id: 'overclock_guard',
        name: 'Overclock_Guard',
        rarity: 'RARE',
        basePower: 24,
        description: 'RISK/EXTREME 성공률 페널티를 완화합니다.',
        effect: { riskPenaltyReduction: 0.05, extremePenaltyReduction: 0.04 }
      },
      abyss_contract: {
        id: 'abyss_contract',
        name: 'Abyss_Contract',
        rarity: 'EPIC',
        basePower: 29,
        description: 'EXTREME 성공 시 크레딧 +25%, EXP +15%.',
        effect: { extremeCreditBonus: 0.25, extremeExpBonus: 0.15 }
      },
      singular_gambit: {
        id: 'singular_gambit',
        name: 'Singular_Gambit',
        rarity: 'LEGENDARY',
        basePower: 36,
        description: 'EXTREME 페널티를 크게 줄이고 성공 보상을 증폭합니다.',
        effect: { extremePenaltyReduction: 0.08, extremeCreditBonus: 0.35, extremeExpBonus: 0.2 }
      },
      stage_marker: {
        id: 'stage_marker',
        name: 'Tower_Marker',
        rarity: 'COMMON',
        basePower: 18,
        description: '데이터 타워 성공률 +2%p.',
        effect: { stageChance: 0.02 }
      },
      chapter_key: {
        id: 'chapter_key',
        name: 'Chapter_Key',
        rarity: 'UNCOMMON',
        basePower: 21,
        description: '데이터 타워 반복 보상 크레딧 +10%.',
        effect: { stageRepeatCreditBonus: 0.1 }
      },
      trial_compass: {
        id: 'trial_compass',
        name: 'Trial_Compass',
        rarity: 'UNCOMMON',
        basePower: 20,
        description: '데이터 타워 성공률 +4%p.',
        effect: { stageChance: 0.04 }
      },
      boss_keygen: {
        id: 'boss_keygen',
        name: 'Boss_Keygen',
        rarity: 'RARE',
        basePower: 25,
        description: '보스 데이터 타워 성공률 +8%p.',
        effect: { bossStageChance: 0.08 }
      },
      repeat_engine: {
        id: 'repeat_engine',
        name: 'Repeat_Engine',
        rarity: 'EPIC',
        basePower: 30,
        description: '데이터 타워 반복 보상 크레딧 +20%, EXP +12%.',
        effect: { stageRepeatCreditBonus: 0.2, stageRepeatExpBonus: 0.12 }
      },
      stage_sovereign: {
        id: 'stage_sovereign',
        name: 'Tower_Sovereign',
        rarity: 'LEGENDARY',
        basePower: 37,
        description: '데이터 타워 성공률과 반복 보상을 크게 강화합니다.',
        effect: { stageChance: 0.08, bossStageChance: 0.08, stageRepeatCreditBonus: 0.3, stageRepeatExpBonus: 0.18 }
      },
      operation_meridian: {
        id: 'operation_meridian',
        name: 'Operation_Meridian',
        rarity: 'OPERATION',
        basePower: 120,
        description: '운영 코드. 해킹 성공 시 외부 루트 크레딧 보상 +50%. 정밀 침투 최적화.',
        descriptionEn: 'Operation code. External route credit reward +50% on hack success. Precision infiltration optimized.',
        effect: { externalRewardBonus: 0.5 }
      },
      operation_blackout: {
        id: 'operation_blackout',
        name: 'Operation_Blackout',
        rarity: 'OPERATION',
        basePower: 130,
        description: '운영 코드. 코어 루트 보안 -15% 적용. 광역 재밍 프로토콜 내장.',
        descriptionEn: 'Operation code. Core route security -15%. Broadband jamming protocol embedded.',
        effect: { coreSecurityReduction: 0.15 }
      },
    };

    const rarityOrder = ['COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'LEGENDARY', 'OPERATION'];

    const rarityWeights = {
      COMMON: 70,
      UNCOMMON: 20,
      RARE: 7,
      EPIC: 2.5,
      LEGENDARY: 0.5,
      OPERATION: 0
    };

    const rarityPowerUp = {
      COMMON: 3,
      UNCOMMON: 5,
      RARE: 8,
      EPIC: 12,
      LEGENDARY: 20
    };

    const ownedCodes = [];

    const servers = [
      { id: 'school_lab', name: '학교 실습 서버', nameEn: 'School Lab Server', security: 20, minReward: 10, maxReward: 25, minLevel: 1 },
      { id: 'bank_backup', name: '은행 백업 노드', nameEn: 'Bank Backup Node', security: 35, minReward: 25, maxReward: 50, minLevel: 2 },
      { id: 'gov_archive', name: '정부 기록 보관 노드', nameEn: 'Gov Archive Node', security: 50, minReward: 40, maxReward: 80, minLevel: 3 },
      { id: 'central_core', name: '중앙 코어 그리드', nameEn: 'Central Core Grid', security: 70, minReward: 70, maxReward: 140, minLevel: 4 },
      { id: 'deep_space', name: '딥 스페이스 릴레이', nameEn: 'Deep Space Relay', security: 90, minReward: 100, maxReward: 200, minLevel: 5 },
      { id: 'corp_dmz', name: '기업 DMZ 노드', nameEn: 'Corp DMZ Node', security: 40, minReward: 30, maxReward: 60, minLevel: 2 },
      { id: 'black_market', name: '블랙마켓 라우터', nameEn: 'Black Market Router', security: 55, minReward: 50, maxReward: 100, minLevel: 3 },
      { id: 'satellite_hub', name: '위성 허브 노드', nameEn: 'Satellite Hub Node', security: 65, minReward: 65, maxReward: 130, minLevel: 4 },
      { id: 'quantum_vault', name: '퀀텀 금고 서버', nameEn: 'Quantum Vault Server', security: 80, minReward: 90, maxReward: 180, minLevel: 5 },
      { id: 'neural_grid', name: '뉴럴 그리드 코어', nameEn: 'Neural Grid Core', security: 95, minReward: 120, maxReward: 240, minLevel: 6 },
      { id: 'ghost_relay', name: '고스트 릴레이 노드', nameEn: 'Ghost Relay Node', security: 110, minReward: 150, maxReward: 300, minLevel: 7 },
      { id: 'zero_node', name: '제로 노드 클러스터', nameEn: 'Zero Node Cluster', security: 130, minReward: 200, maxReward: 400, minLevel: 8 }
    ];

    const serverRoutes = {
      external: { id: 'external', nameKo: '외부 루트', nameEn: 'External Route', levelOffset: -1, securityMult: 0.85, rewardMult: 0.8 },
      internal: { id: 'internal', nameKo: '내부 루트', nameEn: 'Internal Route', levelOffset: 0, securityMult: 1.0, rewardMult: 1.0 },
      core: { id: 'core', nameKo: '코어 루트', nameEn: 'Core Route', levelOffset: 2, securityMult: 1.2, rewardMult: 1.35 }
    };

    function getActiveRoute() {
      const routeId = (state.targeting && state.targeting.route) || 'internal';
      return serverRoutes[routeId] || serverRoutes.internal;
    }

    function getActiveServer() {
      const serverId = (state.targeting && state.targeting.serverId) || 'school_lab';
      return servers.find(s => s.id === serverId) || servers[0];
    }

    // 상점 아이템 + 카테고리 + 희귀도
    const shopItems = [
      {
        id: 'energy_pack',
        name: '에너지 팩',
        desc: '인벤토리에 저장되는 소모품. 사용 시 에너지를 최대치까지 회복합니다.',
        cost: 280,
        rarity: 'UNCOMMON',
        category: 'ENERGY',
        buy: () => {
          state.items.energyPack = (state.items.energyPack || 0) + 1;
        }
      },
      {
        id: 'energy_boost_1',
        name: '에너지 부스터 I',
        desc: '즉시 에너지 +5.',
        cost: 150,
        rarity: 'COMMON',
        category: 'ENERGY',
        buy: () => {
          state.energy = Math.min(state.energyMax, state.energy + 5);
          if (state.energy >= state.energyMax) state.energyTimerMs = 0;
        }
      },
      {
        id: 'credit_boost_run',
        name: '크레딧 멀티플라이어 (세션)',
        desc: '현재 세션 동안 해킹 성공 시 크레딧 1.5배.',
        cost: 700,
        rarity: 'RARE',
        category: 'ECONOMY',
        buy: () => {
          modifiers.creditMultiplierSession = 1.5;
        }
      },
      {
        id: 'max_energy_up',
        name: '에너지 최대치 업그레이드',
        desc: '최대 에너지 +5 (영구).',
        cost: 1200,
        rarity: 'RARE',
        category: 'ENERGY',
        buy: () => {
          state.energyMax += 5;
          if (state.energy >= state.energyMax) state.energyTimerMs = 0;
        }
      },
      {
        id: 'scanner_module',
        name: '고급 스캐너 모듈',
        desc: '코드 스캔 시 경험치 +2 추가.',
        cost: 350,
        rarity: 'UNCOMMON',
        category: 'SYSTEM',
        buy: () => {
          modifiers.scanExtraExp += 2;
        }
      },
      {
        id: 'energy_boost_2',
        name: '에너지 부스터 II',
        desc: '즉시 에너지 +10.',
        cost: 320,
        rarity: 'UNCOMMON',
        category: 'ENERGY',
        buy: () => {
          state.energy = Math.min(state.energyMax, state.energy + 10);
          if (state.energy >= state.energyMax) state.energyTimerMs = 0;
        }
      },
      {
        id: 'quick_charge_cell',
        name: '퀵 차지 셀',
        desc: '즉시 에너지 +6. 짧은 플레이 흐름을 다시 이어갑니다.',
        cost: 220,
        rarity: 'COMMON',
        category: 'ENERGY',
        buy: () => {
          state.energy = Math.min(state.energyMax, state.energy + 6);
          if (state.energy >= state.energyMax) state.energyTimerMs = 0;
        }
      },
      {
        id: 'recovery_daemon',
        name: '리커버리 데몬',
        desc: '다음 에너지 회복 5틱의 회복 속도가 25% 빨라집니다.',
        cost: 420,
        rarity: 'UNCOMMON',
        category: 'ENERGY',
        buy: () => {
          modifiers.fastRecoveryTicks = (modifiers.fastRecoveryTicks || 0) + 5;
          if (state.energy < state.energyMax && state.energyTimerMs <= 0) state.energyTimerMs = getEnergyIntervalMs();
        }
      },
      {
        id: 'full_battery_pack',
        name: '풀 배터리 팩',
        desc: '에너지를 최대치까지 즉시 회복합니다.',
        cost: 520,
        rarity: 'UNCOMMON',
        category: 'ENERGY',
        canBuy: () => {
          if (state.energy >= state.energyMax) {
            return { ok: false, reason: getLang() === 'en' ? 'Energy is already full.' : '에너지가 이미 가득 찼습니다.' };
          }
          return { ok: true };
        },
        buy: () => {
          state.energy = state.energyMax;
          state.energyTimerMs = 0;
        }
      },
      {
        id: 'exp_boost',
        name: '경험치 증폭기',
        desc: '경험치 획득량 20% 증가 (영구).',
        cost: 800,
        rarity: 'RARE',
        category: 'SYSTEM',
        buy: () => {
          modifiers.expMultiplier += 0.2;
        }
      },
      {
        id: 'cpu_discount',
        name: 'CPU 업그레이드 쿠폰',
        desc: 'CPU 업그레이드 비용 10% 할인 (중첩).',
        cost: 900,
        rarity: 'RARE',
        category: 'SYSTEM',
        buy: () => {
          modifiers.cpuUpgradeDiscount *= 0.9;
          if (modifiers.cpuUpgradeDiscount < 0.5) {
            modifiers.cpuUpgradeDiscount = 0.5;
          }
        }
      },
      {
        id: 'gpu_discount_coupon',
        name: 'GPU 업그레이드 쿠폰',
        desc: 'GPU 업그레이드 비용 10% 할인. 하한은 60%입니다.',
        cost: 900,
        rarity: 'RARE',
        category: 'SYSTEM',
        buy: () => {
          modifiers.gpuUpgradeDiscount *= 0.9;
          if (modifiers.gpuUpgradeDiscount < 0.6) modifiers.gpuUpgradeDiscount = 0.6;
        }
      },
      {
        id: 'overclock_script',
        name: '오버클럭 스크립트',
        desc: '다음 5회 코드 스캔 EXP +3.',
        cost: 480,
        rarity: 'UNCOMMON',
        category: 'SYSTEM',
        buy: () => {
          modifiers.overclockScanCharges = (modifiers.overclockScanCharges || 0) + 5;
        }
      },
      {
        id: 'scan_exp_script',
        name: '스캔 EXP 스크립트',
        desc: '다음 10회 코드 스캔 EXP +1.',
        cost: 300,
        rarity: 'COMMON',
        category: 'SYSTEM',
        buy: () => {
          modifiers.scanExpScriptCharges = (modifiers.scanExpScriptCharges || 0) + 10;
        }
      },
      {
        id: 'perm_credit_boost',
        name: '영구 크레딧 멀티플라이어',
        desc: '해킹 크레딧 보상 15% 증가 (영구, 1회 구매 한정).',
        cost: 1500,
        rarity: 'EPIC',
        category: 'ECONOMY',
        buy: () => {
          modifiers.creditMultiplierPermanent *= 1.15;
        }
      },
      {
        id: 'risk_support',
        name: '위험 해킹 서포터',
        desc: '위험 해킹 모드 성공 확률 +5%p (영구, 1회 구매 한정).',
        cost: 950,
        rarity: 'RARE',
        category: 'UTILITY',
        buy: () => {
          modifiers.riskSuccessBonus += 0.05;
        }
      },
      {
        id: 'big_credit_pack',
        name: '데이터 크레딧 팩',
        desc: '즉시 크레딧 +700. 경제 루프가 막혔을 때 쓰는 일일 보급품입니다.',
        cost: 400,
        rarity: 'COMMON',
        category: 'ECONOMY',
        buy: () => {
          state.credits += 700;
          state.stats.creditsEarnedTotal += 700;
        }
      },
      {
        id: 'credit_cache',
        name: '크레딧 캐시',
        desc: '즉시 크레딧 +500. 막힌 업그레이드 흐름을 풀어줍니다.',
        cost: 260,
        rarity: 'COMMON',
        category: 'ECONOMY',
        buy: () => {
          state.credits += 500;
          state.stats.creditsEarnedTotal += 500;
        }
      },
      {
        id: 'credit_relay_script',
        name: '크레딧 릴레이 스크립트',
        desc: '다음 5회 해킹 성공 크레딧 +20%.',
        cost: 620,
        rarity: 'RARE',
        category: 'ECONOMY',
        buy: () => {
          modifiers.creditRelayCharges = (modifiers.creditRelayCharges || 0) + 5;
        }
      },
      {
        id: 'scanner_plus',
        name: '정밀 스캐너',
        desc: '코드 스캔 시 추가 경험치 +1 (영구, 1회 구매 한정).',
        cost: 450,
        rarity: 'UNCOMMON',
        category: 'SYSTEM',
        buy: () => {
          modifiers.scanExtraExp += 1;
        }
      },
      {
        id: 'hack_stability_patch',
        name: '해킹 안정화 패치',
        desc: '해킹 성공률 +2%p. 누적 상한은 +8%p입니다.',
        cost: 850,
        rarity: 'RARE',
        category: 'UTILITY',
        buy: () => {
          modifiers.hackStabilityBonus = Math.min(0.08, (modifiers.hackStabilityBonus || 0) + 0.02);
        }
      },
      {
        id: 'failure_buffer_module',
        name: '실패 완충 모듈',
        desc: '실패 완충 2회 충전. RISK/EXTREME 추가 에너지 페널티를 1회씩 방지합니다.',
        cost: 560,
        rarity: 'UNCOMMON',
        category: 'UTILITY',
        buy: () => {
          modifiers.failureBufferCharges = (modifiers.failureBufferCharges || 0) + 2;
        }
      },
      {
        id: 'level_ticket',
        name: '시뮬레이션 레벨 티켓',
        desc: '즉시 레벨 1회 상승.',
        cost: 1000,
        rarity: 'EPIC',
        category: 'UTILITY',
        buy: () => {
          levelUp();
        }
      }
    ];

    // COIN SHOP 아이템 (시즌 보상, 희귀 아이템)
    const coinShopItems = [
      {
        id: 'coin_seasonal_bundle_1',
        name: '시즌 번들 I',
        desc: '경험치 +200, 토큰 +5. 시즌 종료 시 교환 가능한 시즌 전용 패키지.',
        cost: 150,
        rarity: 'RARE',
        category: 'ECONOMY',
        buy: () => {
          state.exp = (state.exp || 0) + 200;
          state.items.weeklyToken = (state.items.weeklyToken || 0) + 5;
          state.stats.expTotal = (state.stats.expTotal || 0) + 200;
        }
      },
      {
        id: 'coin_seasonal_bundle_2',
        name: '시즌 번들 II',
        desc: '경험치 +500, 토큰 +12, 크레딧 +1000. 상위 시즌 패키지.',
        cost: 350,
        rarity: 'EPIC',
        category: 'ECONOMY',
        buy: () => {
          state.exp = (state.exp || 0) + 500;
          state.items.weeklyToken = (state.items.weeklyToken || 0) + 12;
          state.credits = (state.credits || 0) + 1000;
          state.stats.expTotal = (state.stats.expTotal || 0) + 500;
        }
      },
      {
        id: 'coin_code_shard_boost',
        name: '코드 조각 부스터',
        desc: '코드 조각 +50. 코드 강화에 필요한 조각을 빠르게 모을 수 있습니다.',
        cost: 200,
        rarity: 'EPIC',
        category: 'SYSTEM',
        buy: () => {
          state.codeShardsStored = (state.codeShardsStored || 0) + 50;
          state.stats.codeShardsTotal = (state.stats.codeShardsTotal || 0) + 50;
        }
      },
      {
        id: 'coin_prestige_reset',
        name: '프레스티지 리셋',
        desc: 'ZERO-DAY 취약점 +3, 모든 진행도 초기화(크레딧/경험치 보상).',
        cost: 100,
        rarity: 'LEGENDARY',
        category: 'SYSTEM',
        once: true,
        buy: () => {
          state.items.zeroDayVulnerability = (state.items.zeroDayVulnerability || 0) + 3;
          // 프레스티지 리셋 로직은 별도 구현 필요
          showToast(getLang() === 'en' ? 'Prestige reset unlocked (feature coming)' : '프레스티지 기능 준비 중입니다.', 'shop');
        }
      },
      // ── SEASON SHOP ITEMS (시즌 상점 — PASS에서 이동) ──
      {
        id: 'ss_coin_frame',
        name: '코인 프레임',
        desc: '프로필 프레임 (코스메틱). 프로필을 꾸며 당신의 개성을 표현하세요.',
        cost: 80,
        rarity: 'UNCOMMON',
        category: 'ECONOMY',
        once: true,
        buy: () => {
          state.season = state.season || {};
          state.season.shopPurchases = state.season.shopPurchases || {};
          state.season.shopPurchases['ss_coin_frame'] = Date.now();
        }
      },
      {
        id: 'ss_title_ghost',
        name: '칭호: GHOST',
        desc: '칭호 코스메틱. ZERO-DAY 마스터의 증거를 프로필에 표시합니다.',
        cost: 120,
        rarity: 'EPIC',
        category: 'ECONOMY',
        once: true,
        buy: () => {
          state.season = state.season || {};
          state.season.shopPurchases = state.season.shopPurchases || {};
          state.season.shopPurchases['ss_title_ghost'] = Date.now();
        }
      },
      {
        id: 'ss_energy_assist',
        name: '소형 에너지 패키지',
        desc: '에너지 팩 +2, 크레딧 +150. 빠른 진행을 위한 부스트 패키지.',
        cost: 30,
        rarity: 'COMMON',
        category: 'ENERGY',
        buy: () => {
          state.items.energyPack = (state.items.energyPack || 0) + 2;
          state.credits = (state.credits || 0) + 150;
          state.stats.creditsEarnedTotal = (state.stats.creditsEarnedTotal || 0) + 150;
        }
      },
      {
        id: 'ss_oneday_pack',
        name: 'OneDay 소형 팩',
        desc: 'OneDay +200. ZERO-DAY에서 향상된 성능으로 더 깊이 탐사할 수 있습니다.',
        cost: 50,
        rarity: 'RARE',
        category: 'SYSTEM',
        buy: () => {
          state.items.oneDay = (state.items.oneDay || 0) + 200;
          state.stats.zeroDayOneDayEarnedTotal = (state.stats.zeroDayOneDayEarnedTotal || 0) + 200;
        }
      },
      // v3.0.0: ZERO-DAY 스킨 — Glass Console (COIN 200)
      {
        id: 'zd_skin_glass_console',
        name: 'ZD 스킨: Glass Console',
        desc: 'ZERO-DAY 터미널 스킨. 반투명 콘솔 효과로 시각적 차별화.',
        cost: 200,
        rarity: 'EPIC',
        category: 'SYSTEM',
        once: true,
        buy: () => {
          state.zeroDay = state.zeroDay || {};
          state.zeroDay.skins = state.zeroDay.skins || [];
          if (!state.zeroDay.skins.includes('glass_console')) {
            state.zeroDay.skins.push('glass_console');
          }
        }
      }
    ];

    // ONEDAY SHOP 아이템 (ZERO-DAY 성장 관련)
    const oneDayShopItems = [
      {
        id: 'oneday_vuln_shard_x5',
        name: '취약점 조각 x5',
        desc: '취약점 조각 +5. 취약점 제작에 필요한 조각입니다.',
        cost: 40,
        rarity: 'COMMON',
        category: 'SYSTEM',
        buy: () => {
          state.items.zeroDayVulnerabilityShard = (state.items.zeroDayVulnerabilityShard || 0) + 5;
        }
      },
      {
        id: 'oneday_vuln_shard_x10',
        name: '취약점 조각 x10',
        desc: '취약점 조각 +10. 대량 구매 옵션.',
        cost: 75,
        rarity: 'UNCOMMON',
        category: 'SYSTEM',
        buy: () => {
          state.items.zeroDayVulnerabilityShard = (state.items.zeroDayVulnerabilityShard || 0) + 10;
        }
      },
      {
        id: 'oneday_node_scan_boost',
        name: '노드 스캔 부스터',
        desc: 'ZERO-DAY 노드 스캔 정확도 +20%. 다음 PVE 런에서만 적용됩니다.',
        cost: 25,
        rarity: 'COMMON',
        category: 'SYSTEM',
        buy: () => {
          modifiers.zdNodeScanAccuracy = (modifiers.zdNodeScanAccuracy || 1.0) + 0.2;
          state.stats.oneDayBoostsUsed = (state.stats.oneDayBoostsUsed || 0) + 1;
        }
      },
      {
        id: 'oneday_extraction_shield',
        name: '추출 보호막',
        desc: '추출 시 탐지 +30% 감소. 스팀 상태에서 데이터를 더 안전하게 추출합니다.',
        cost: 35,
        rarity: 'UNCOMMON',
        category: 'SYSTEM',
        buy: () => {
          modifiers.zdExtractionDetectionReduction = (modifiers.zdExtractionDetectionReduction || 0) + 0.3;
          state.stats.oneDayBoostsUsed = (state.stats.oneDayBoostsUsed || 0) + 1;
        }
      }
    ];

    // ── SUPPORT DESK 상품 정의 ──────────────────────────────────────────────
    const SUPPORT_PRODUCTS = [
      {
        id: 'support_start',
        name: 'Support Pack Start',
        price: '₩1,500',
        tag: 'START',
        rewards: { coin: 10, energyPack: 2, dailyBonusBox: 1 },
        rewardLabel:    'COIN ×10 + 에너지팩 ×2 + 데일리 보너스 박스 ×1',
        rewardLabelEn:  'COIN ×10 + Energy Pack ×2 + Daily Bonus Box ×1',
        desc:   'HCSiG 체험에 감사를 전하는 작은 후원입니다.',
        descEn: 'A small thanks for trying HCSiG.'
      },
      {
        id: 'support_plus',
        name: 'Support Pack Plus',
        price: '₩3,300',
        tag: 'PLUS',
        rewards: { coin: 25, energyPack: 5, dailyBonusBox: 3 },
        rewardLabel:    'COIN ×25 + 에너지팩 ×5 + 데일리 보너스 박스 ×3',
        rewardLabelEn:  'COIN ×25 + Energy Pack ×5 + Daily Bonus Box ×3',
        desc:   'HCSiG 개발을 더 크게 응원하는 후원입니다.',
        descEn: 'Bigger support for HCSiG development.'
      },
      {
        id: 'support_pro',
        name: 'Support Pack Pro',
        price: '₩5,500',
        tag: 'PRO',
        rewards: { coin: 50, energyPack: 10, dailyBonusBox: 5 },
        rewardLabel:    'COIN ×50 + 에너지팩 ×10 + 데일리 보너스 박스 ×5',
        rewardLabelEn:  'COIN ×50 + Energy Pack ×10 + Daily Bonus Box ×5',
        desc:   'HCSiG를 진심으로 응원해주시는 분을 위한 후원입니다.',
        descEn: 'For those who truly support HCSiG development.'
      },
      {
        id: 'support_max',
        name: 'Support Pack Max',
        price: '₩16,500',
        tag: 'MAX',
        rewards: { coin: 150, energyPack: 30, dailyBonusBox: 15 },
        rewardLabel:    'COIN ×150 + 에너지팩 ×30 + 데일리 보너스 박스 ×15',
        rewardLabelEn:  'COIN ×150 + Energy Pack ×30 + Daily Bonus Box ×15',
        desc:   'HCSiG의 최대 후원자를 위한 최상위 패키지입니다.',
        descEn: 'The ultimate package for HCSiG\'s top supporters.'
      }
    ];

    // ── COIN 구매 상품 정의 (₩ 결제) ───────────────────────────────────────
    const COIN_PURCHASE_ITEMS = [
      {
        id: 'coin_500',
        label: 'COIN ×500',
        coin: 500,
        price: '₩5,500',
        desc:   '소량의 COIN을 구매합니다.',
        descEn: 'Purchase a small amount of COIN.'
      },
      {
        id: 'coin_1200',
        label: 'COIN ×1,200',
        coin: 1200,
        price: '₩11,000',
        desc:   '표준 COIN 패키지입니다.',
        descEn: 'Standard COIN package.'
      },
      {
        id: 'coin_2000',
        label: 'COIN ×2,000',
        coin: 2000,
        price: '₩16,500',
        desc:   '넉넉한 COIN을 구매합니다.',
        descEn: 'Purchase a generous amount of COIN.'
      },
      {
        id: 'coin_5000',
        label: 'COIN ×5,000',
        coin: 5000,
        price: '₩33,000',
        desc:   '대량 COIN 패키지입니다.',
        descEn: 'Large COIN bulk package.'
      }
    ];

    // ── 크레딧 패키지 정의 (₩ 결제) ────────────────────────────────────────
    const CREDIT_PACKAGE_ITEMS = [
      {
        id: 'credit_pkg_small',
        label: '소형 크레딧 패키지',
        labelEn: 'Small Credit Package',
        credits: 50000,
        price: '₩1,100',
        desc:   '크레딧 50,000을 즉시 지급합니다.',
        descEn: 'Instantly grants 50,000 credits.'
      },
      {
        id: 'credit_pkg_mid',
        label: '중형 크레딧 패키지',
        labelEn: 'Medium Credit Package',
        credits: 150000,
        price: '₩2,200',
        desc:   '크레딧 150,000을 즉시 지급합니다.',
        descEn: 'Instantly grants 150,000 credits.'
      },
      {
        id: 'credit_pkg_large',
        label: '대형 크레딧 패키지',
        labelEn: 'Large Credit Package',
        credits: 500000,
        price: '₩5,500',
        desc:   '크레딧 500,000을 즉시 지급합니다.',
        descEn: 'Instantly grants 500,000 credits.'
      }
    ];

    // 상점/경험치 계수
    const modifiers = {
      creditMultiplierSession: 1.0,
      scanExtraExp: 0,
      creditMultiplierPermanent: 1.0,
      expMultiplier: 1.0,
      cpuUpgradeDiscount: 1.0,
      riskSuccessBonus: 0.0,
      gpuUpgradeDiscount: 1.0,
      hackStabilityBonus: 0.0,
      failureBufferCharges: 0,
      overclockScanCharges: 0,
      scanExpScriptCharges: 0,
      creditRelayCharges: 0,
      fastRecoveryTicks: 0
    };

    function ensureModifierDefaults() {
      modifiers.creditMultiplierSession = Number.isFinite(Number(modifiers.creditMultiplierSession)) ? Number(modifiers.creditMultiplierSession) : 1.0;
      modifiers.scanExtraExp = Number.isFinite(Number(modifiers.scanExtraExp)) ? Number(modifiers.scanExtraExp) : 0;
      modifiers.creditMultiplierPermanent = Number.isFinite(Number(modifiers.creditMultiplierPermanent)) ? Number(modifiers.creditMultiplierPermanent) : 1.0;
      modifiers.expMultiplier = Number.isFinite(Number(modifiers.expMultiplier)) ? Number(modifiers.expMultiplier) : 1.0;
      modifiers.cpuUpgradeDiscount = Number.isFinite(Number(modifiers.cpuUpgradeDiscount)) ? Number(modifiers.cpuUpgradeDiscount) : 1.0;
      modifiers.riskSuccessBonus = Number.isFinite(Number(modifiers.riskSuccessBonus)) ? Number(modifiers.riskSuccessBonus) : 0.0;
      modifiers.gpuUpgradeDiscount = Number.isFinite(Number(modifiers.gpuUpgradeDiscount)) ? Math.max(0.6, Math.min(1, Number(modifiers.gpuUpgradeDiscount))) : 1.0;
      modifiers.hackStabilityBonus = Number.isFinite(Number(modifiers.hackStabilityBonus)) ? Math.max(0, Math.min(0.08, Number(modifiers.hackStabilityBonus))) : 0.0;
      modifiers.failureBufferCharges = Math.max(0, Math.round(Number(modifiers.failureBufferCharges || 0)));
      modifiers.overclockScanCharges = Math.max(0, Math.round(Number(modifiers.overclockScanCharges || 0)));
      modifiers.scanExpScriptCharges = Math.max(0, Math.round(Number(modifiers.scanExpScriptCharges || 0)));
      modifiers.creditRelayCharges = Math.max(0, Math.round(Number(modifiers.creditRelayCharges || 0)));
      modifiers.fastRecoveryTicks = Math.max(0, Math.round(Number(modifiers.fastRecoveryTicks || 0)));
    }

    // 미션 정의
    const missionDefs = {
      daily: [
        { id: 'daily_scan5',   name: '일일 스캐너 I',     type: 'scans',         target: 5,   rewardCredits: 50,  rewardCoin: 1, desc: '코드 스캔 5회 수행' },
        { id: 'daily_scan10',  name: '일일 스캐너 II',    type: 'scans',         target: 10,  rewardCredits: 80,  desc: '코드 스캔 10회 수행' },
        { id: 'daily_hack3',   name: '일일 침입자 I',     type: 'hackSuccess',   target: 3,   rewardCredits: 80,  rewardCoin: 1, desc: '서버 해킹 성공 3회' },
        { id: 'daily_hack5',   name: '일일 침입자 II',    type: 'hackSuccess',   target: 5,   rewardCredits: 100, desc: '서버 해킹 성공 5회' },
        { id: 'daily_energy30',name: '에너지 소비자',      type: 'energySpent',   target: 30,  rewardCredits: 70,  rewardCoin: 1, desc: '에너지 30 소모하기' },
        { id: 'daily_action10_pack', name: '보급 루틴',    type: 'actions',       target: 10,  rewardCredits: 60,  rewardEnergyPack: 1, desc: '코드 스캔/서버 해킹 총 10회 수행' }
      ,
        { id: 'daily_risk1',     name: '일일 리스크',      type: 'riskHackSuccess', target: 1,   rewardCredits: 90,  desc: '위험 해킹 모드로 서버 해킹 성공 1회' },
        { id: 'daily_buy1',      name: '일일 조달',        type: 'shopPurchases',   target: 1,   rewardCredits: 50,  desc: '상점에서 1회 구매하기' }
      // Phase 1 신규 DAILY 미션 (2026-05-01 추가)
      ,
        { id: 'daily_login',         name: '일일 접속',       type: 'loginDaily',      target: 1,   rewardCredits: 50,  rewardCoin: 1,  desc: '오늘 게임에 접속하기' },
        { id: 'daily_normal_shop1',  name: '일반 상점 이용',  type: 'shopPurchases',   target: 1,   rewardCredits: 60,  desc: '상점에서 1회 구매하기 (일반/교환 상점 포함)' },
        { id: 'daily_code_levelup1', name: '코드 레벨 업',    type: 'codeLevelUp',     target: 1,   rewardCredits: 80,  desc: '코드 강화로 레벨을 1회 올리기' },
        { id: 'daily_gear_enhance3', name: '코드 기어 강화',  type: 'gearEnhance',     target: 3,   rewardCredits: 70,  desc: '코드 기어를 3회 강화하기', stub: true },
        { id: 'daily_tower5',        name: '타워 5층 도전',   type: 'towerAttempts',   target: 5,   rewardCredits: 90,  desc: '데이터 타워 5회 도전하기' }
      ],
      weekly: [
        { id: 'weekly_scan30',   name: '주간 스캐너',        type: 'scans',       target: 30,  rewardCredits: 120, desc: '코드 스캔 30회 수행' },
        { id: 'weekly_scan50',   name: '집요한 스캐너',      type: 'scans',       target: 50,  rewardCredits: 180, desc: '코드 스캔 50회 수행' },
        { id: 'weekly_hack20',   name: '주간 침입자',        type: 'hackSuccess', target: 20,  rewardCredits: 200, desc: '서버 해킹 성공 20회' },
        { id: 'weekly_energy100',name: '에너지 소모왕',       type: 'energySpent', target: 100, rewardCredits: 200, desc: '에너지 100 소모하기' },
        { id: 'weekly_level10',  name: '주간 성장',          type: 'level',       target: 10,  rewardCredits: 250, desc: '플레이어 레벨 10 달성' }
      ,
        { id: 'weekly_actions40',  name: '주간 루프',          type: 'actions',       target: 40,  rewardCredits: 180, desc: '코드 스캔/서버 해킹 총 40회 수행' },
        { id: 'weekly_hack_risk5', name: '위험한 한 주',        type: 'riskHackSuccess', target: 5, rewardCredits: 240, desc: '위험 해킹 모드로 서버 해킹 성공 5회' },
        { id: 'weekly_buy5',       name: '주간 소비',          type: 'shopPurchases', target: 5,   rewardCredits: 160, desc: '상점에서 5회 구매하기' },
        { id: 'weekly_credit800',  name: '주간 수익',          type: 'creditsEarnedTotal', target: 800, rewardCredits: 180, desc: '누적 획득 크레딧 800 달성' },
        { id: 'weekly_energy0',    name: '방전 습관',          type: 'energy0Flag', target: 1,   rewardCredits: 150, desc: '이번 주 최소 1회 에너지를 0까지 소모' },
        { id: 'weekly_zd_run1',    name: 'ZERO-DAY 입문',      type: 'zeroDayRunCount', target: 1,   rewardCredits: 0, rewardCoin: 5, desc: '이번 주 ZERO-DAY PVE 1회 진행' },
        { id: 'weekly_scan70',     name: '주간 집중 스캔',      type: 'scans',       target: 70,  rewardCredits: 0, rewardCoin: 10, desc: '코드 스캔 70회 수행' }
      // Phase 1 신규 WEEKLY 미션 (2026-05-01 추가)
      ,
        { id: 'weekly_login5',          name: '연속 접속',          type: 'loginStreak',          target: 5,   rewardCredits: 200, desc: '이번 주 5일 이상 접속하기' },
        { id: 'weekly_normal_shop10',   name: '주간 상점 이용',      type: 'shopPurchases',        target: 10,  rewardCredits: 180, desc: '상점에서 10회 구매하기' },
        { id: 'weekly_gear_enhance15',  name: '주간 기어 강화',      type: 'gearEnhance',          target: 15,  rewardCredits: 220, desc: '코드 기어를 15회 강화하기', stub: true },
        { id: 'weekly_tower35',         name: '주간 타워 도전',      type: 'towerAttempts',        target: 35,  rewardCredits: 250, desc: '데이터 타워 35회 도전하기' },
        { id: 'weekly_daily_mission40', name: '일일 미션 달성',      type: 'dailyMissionsCompleted', target: 40, rewardCredits: 300, rewardCoin: 5, desc: '이번 주 일일 미션 40개 완료하기' }
      ],
      month: [
        { id: 'month_scan100',     name: '월간 스캐너',        type: 'scans',           target: 100, rewardCredits: 300, desc: '코드 스캔 100회 수행' },
        { id: 'month_scan200',     name: '광적인 분석가',      type: 'scans',           target: 200, rewardCredits: 500, desc: '코드 스캔 200회 수행' },
        { id: 'month_hack50',      name: '월간 침입자',        type: 'hackSuccess',     target: 50,  rewardCredits: 400, desc: '서버 해킹 성공 50회' },
        { id: 'month_energy300',   name: '에너지 브레이커',     type: 'energySpent',     target: 300, rewardCredits: 450, desc: '에너지 300 소모하기' },
        { id: 'month_level15',     name: '월간 성장',          type: 'level',           target: 15,  rewardCredits: 500, desc: '플레이어 레벨 15 달성' },
        { id: 'month_scan_risk',   name: '위험한 분석',        type: 'riskHackSuccess', target: 30,  rewardCredits: 500, desc: '위험 해킹 모드로 서버 해킹 성공 30회' },
        { id: 'month_energy0',     name: '한계 돌파',          type: 'energy0Flag',     target: 1,   rewardCredits: 350, desc: '한 달 동안 최소 1회 에너지를 0까지 소모' }
      ,
        { id: 'month_scan350',      name: '월간 스캐너 II',     type: 'scans',           target: 350, rewardCredits: 650, desc: '코드 스캔 350회 수행' },
        { id: 'month_hack100',      name: '월간 침입자 II',     type: 'hackSuccess',     target: 100, rewardCredits: 700, desc: '서버 해킹 성공 100회' },
        { id: 'month_actions200',   name: '장기 루틴',          type: 'actions',         target: 200, rewardCredits: 600, desc: '코드 스캔/서버 해킹 총 200회 수행' },
        { id: 'month_energy500',    name: '에너지 파쇄기',      type: 'energySpent',     target: 500, rewardCredits: 650, desc: '에너지 500 소모하기' },
        { id: 'month_level20',      name: '월간 도약',          type: 'level',           target: 20,  rewardCredits: 700, desc: '플레이어 레벨 20 달성' },
        { id: 'month_buy20',        name: '월간 소비자',        type: 'shopPurchases',   target: 20,  rewardCredits: 500, desc: '상점에서 20회 구매하기' },
        { id: 'month_credits5000',  name: '월간 수익 관리자',    type: 'creditsEarnedTotal', target: 5000, rewardCredits: 650, desc: '누적 획득 크레딧 5000 달성' },
        { id: 'month_risk60',       name: '위험 중독',          type: 'riskHackSuccess', target: 60,  rewardCredits: 800, desc: '위험 해킹 모드로 서버 해킹 성공 60회' }
      ],
      // GENERAL: 장기 과제 ~30개
      general: [
        { id: 'gen_scan_20',       name: '분석 입문',           type: 'scans',             target: 20,   rewardCredits: 60,   desc: '누적 코드 스캔 20회' },
        { id: 'gen_scan_50',       name: '분석가 I',           type: 'scans',             target: 50,   rewardCredits: 120,  desc: '누적 코드 스캔 50회' },
        { id: 'gen_scan_100',      name: '분석가 II',          type: 'scans',             target: 100,  rewardCredits: 200,  desc: '누적 코드 스캔 100회' },
        { id: 'gen_scan_200',      name: '데이터 중독',         type: 'scans',             target: 200,  rewardCredits: 350,  desc: '누적 코드 스캔 200회' },
        { id: 'gen_scan_300',      name: '데이터 광신도',       type: 'scans',             target: 300,  rewardCredits: 500,  desc: '누적 코드 스캔 300회' },

        { id: 'gen_hack_20',       name: '침입 전문가 I',        type: 'hackSuccess',       target: 20,   rewardCredits: 150,  desc: '누적 해킹 성공 20회' },
        { id: 'gen_hack_50',       name: '침입 전문가 II',       type: 'hackSuccess',       target: 50,   rewardCredits: 250,  desc: '누적 해킹 성공 50회' },
        { id: 'gen_hack_100',      name: '침입 마스터',         type: 'hackSuccess',       target: 100,  rewardCredits: 500,  desc: '누적 해킹 성공 100회' },

        { id: 'gen_energy_spent_200', name: '에너지 분해 I',    type: 'energySpentTotal',  target: 200,  rewardCredits: 200,  desc: '누적 에너지 200 소모' },
        { id: 'gen_energy_spent_500', name: '에너지 분해 II',   type: 'energySpentTotal',  target: 500,  rewardCredits: 400,  desc: '누적 에너지 500 소모' },
        { id: 'gen_energy_spent_1000',name: '에너지 브루탈',    type: 'energySpentTotal',  target: 1000, rewardCredits: 700,  desc: '누적 에너지 1000 소모' },

        { id: 'gen_level_5',       name: '성장 관찰',           type: 'level',             target: 5,    rewardCredits: 120,  desc: '플레이어 레벨 5 달성' },
        { id: 'gen_level_10',      name: '성장 가속',           type: 'level',             target: 10,   rewardCredits: 200,  desc: '플레이어 레벨 10 달성' },
        { id: 'gen_level_15',      name: '성장 폭주',           type: 'level',             target: 15,   rewardCredits: 350,  desc: '플레이어 레벨 15 달성' },
        { id: 'gen_level_20',      name: '고급 운영자',         type: 'level',             target: 20,   rewardCredits: 600,  desc: '플레이어 레벨 20 달성' },

        { id: 'gen_cpu_3',         name: 'CPU 튜너 I',          type: 'cpuTier',           target: 3,    rewardCredits: 200,  desc: 'CPU 티어 3 달성' },
        { id: 'gen_cpu_5',         name: 'CPU 튜너 II',         type: 'cpuTier',           target: 5,    rewardCredits: 400,  desc: 'CPU 티어 5 달성' },

        { id: 'gen_energyMax_20',  name: '에너지 버퍼 I',       type: 'energyMax',         target: 20,   rewardCredits: 250,  desc: '에너지 최대치 20 달성' },
        { id: 'gen_energyMax_25',  name: '에너지 버퍼 II',      type: 'energyMax',         target: 25,   rewardCredits: 400,  desc: '에너지 최대치 25 달성' },
        { id: 'gen_energyMax_30',  name: '에너지 저장고',       type: 'energyMax',         target: 30,   rewardCredits: 600,  desc: '에너지 최대치 30 달성' },

        { id: 'gen_shop_5',        name: '쇼핑 애호가 I',        type: 'shopPurchases',     target: 5,    rewardCredits: 150,  desc: '상점에서 누적 5회 구매' },
        { id: 'gen_shop_15',       name: '쇼핑 애호가 II',       type: 'shopPurchases',     target: 15,   rewardCredits: 300,  desc: '상점에서 누적 15회 구매' },
        { id: 'gen_shop_30',       name: '쇼핑 매니아',          type: 'shopPurchases',     target: 30,   rewardCredits: 500,  desc: '상점에서 누적 30회 구매' },

        { id: 'gen_credits_5000',  name: '데이터 자본가 I',      type: 'creditsEarnedTotal',target: 5000, rewardCredits: 300,  desc: '누적 획득 크레딧 5000 달성' },
        { id: 'gen_credits_20000', name: '데이터 자본가 II',     type: 'creditsEarnedTotal',target: 20000,rewardCredits: 600,  desc: '누적 획득 크레딧 20000 달성' },

        { id: 'gen_achieve_5',     name: '기록 수집가 I',        type: 'achievements',      target: 5,    rewardCredits: 200,  desc: '업적 5개 달성' },
        { id: 'gen_achieve_10',    name: '기록 수집가 II',       type: 'achievements',      target: 10,   rewardCredits: 350,  desc: '업적 10개 달성' },
        { id: 'gen_achieve_15',    name: '기록 수집가 III',      type: 'achievements',      target: 15,   rewardCredits: 500,  desc: '업적 15개 달성' },

        { id: 'gen_mission_10',    name: '퀘스트 러너',          type: 'missionsCompleted', target: 10,   rewardCredits: 300,  desc: '누적 퀘스트 10개 완료' },
        { id: 'gen_mission_25',    name: '퀘스트 헌터',          type: 'missionsCompleted', target: 25,   rewardCredits: 500,  desc: '누적 퀘스트 25개 완료' },
        { id: 'gen_mission_40',    name: '퀘스트 매니악',        type: 'missionsCompleted', target: 40,   rewardCredits: 800,  desc: '누적 퀘스트 40개 완료' },

        { id: 'gen_risk_10',       name: '위험 친화 I',          type: 'riskHackSuccess',   target: 10,   rewardCredits: 400,  desc: '위험 해킹 모드로 해킹 성공 10회' },
        { id: 'gen_risk_25',       name: '위험 친화 II',         type: 'riskHackSuccess',   target: 25,   rewardCredits: 700,  desc: '위험 해킹 모드로 해킹 성공 25회' }
      ,

        { id: 'gen_scan_500',       name: '분석가 III',          type: 'scans',             target: 500,  rewardCredits: 700,  desc: '누적 코드 스캔 500회' },
        { id: 'gen_scan_800',       name: '분석가 IV',           type: 'scans',             target: 800,  rewardCredits: 1000, desc: '누적 코드 스캔 800회' },
        { id: 'gen_scan_1200',      name: '분석가 V',            type: 'scans',             target: 1200, rewardCredits: 1400, desc: '누적 코드 스캔 1200회' },

        { id: 'gen_hack_200',       name: '침입 마스터 II',      type: 'hackSuccess',       target: 200,  rewardCredits: 850,  desc: '누적 해킹 성공 200회' },
        { id: 'gen_hack_400',       name: '침입 마스터 III',     type: 'hackSuccess',       target: 400,  rewardCredits: 1300, desc: '누적 해킹 성공 400회' },
        { id: 'gen_hack_700',       name: '침입 마스터 IV',      type: 'hackSuccess',       target: 700,  rewardCredits: 1800, desc: '누적 해킹 성공 700회' },

        { id: 'gen_energy_spent_1500', name: '에너지 브루탈 II', type: 'energySpentTotal',  target: 1500, rewardCredits: 900,  desc: '누적 에너지 1500 소모' },
        { id: 'gen_energy_spent_2500', name: '에너지 브루탈 III',type: 'energySpentTotal',  target: 2500, rewardCredits: 1300, desc: '누적 에너지 2500 소모' },
        { id: 'gen_energy_spent_4000', name: '에너지 브루탈 IV', type: 'energySpentTotal',  target: 4000, rewardCredits: 1800, desc: '누적 에너지 4000 소모' },

        { id: 'gen_level_25',       name: '고급 운영자 II',      type: 'level',             target: 25,   rewardCredits: 800,  desc: '플레이어 레벨 25 달성' },
        { id: 'gen_level_30',       name: '코어 관리자',         type: 'level',             target: 30,   rewardCredits: 1100, desc: '플레이어 레벨 30 달성' },
        { id: 'gen_level_40',       name: '시스템 지배자',       type: 'level',             target: 40,   rewardCredits: 1800, desc: '플레이어 레벨 40 달성' },

        { id: 'gen_cpu_7',          name: 'CPU 튜너 III',        type: 'cpuTier',           target: 7,    rewardCredits: 650,  desc: 'CPU 티어 7 달성' },
        { id: 'gen_cpu_10',         name: 'CPU 튜너 IV',         type: 'cpuTier',           target: 10,   rewardCredits: 1000, desc: 'CPU 티어 10 달성' },
        { id: 'gen_cpu_15',         name: 'CPU 초월자',          type: 'cpuTier',           target: 15,   rewardCredits: 1600, desc: 'CPU 티어 15 달성' },

        { id: 'gen_energyMax_35',   name: '에너지 저장고 II',    type: 'energyMax',         target: 35,   rewardCredits: 800,  desc: '에너지 최대치 35 달성' },
        { id: 'gen_energyMax_40',   name: '에너지 저장고 III',   type: 'energyMax',         target: 40,   rewardCredits: 1200, desc: '에너지 최대치 40 달성' },
        { id: 'gen_energyMax_50',   name: '에너지 아카이브',     type: 'energyMax',         target: 50,   rewardCredits: 1800, desc: '에너지 최대치 50 달성' },

        { id: 'gen_shop_50',        name: '쇼핑 매니아 II',      type: 'shopPurchases',     target: 50,   rewardCredits: 700,  desc: '상점에서 누적 50회 구매' },
        { id: 'gen_shop_80',        name: '쇼핑 매니아 III',     type: 'shopPurchases',     target: 80,   rewardCredits: 1100, desc: '상점에서 누적 80회 구매' },
        { id: 'gen_shop_120',       name: '쇼핑 제왕',           type: 'shopPurchases',     target: 120,  rewardCredits: 1700, desc: '상점에서 누적 120회 구매' },

        { id: 'gen_credits_50000',  name: '데이터 자본가 III',   type: 'creditsEarnedTotal',target: 50000,rewardCredits: 1000, desc: '누적 획득 크레딧 50000 달성' },
        { id: 'gen_credits_100000', name: '데이터 자본가 IV',    type: 'creditsEarnedTotal',target: 100000,rewardCredits: 1700, desc: '누적 획득 크레딧 100000 달성' },
        { id: 'gen_credits_250000', name: '데이터 제국',         type: 'creditsEarnedTotal',target: 250000,rewardCredits: 2600, desc: '누적 획득 크레딧 250000 달성' },

        { id: 'gen_achieve_20',     name: '기록 수집가 IV',      type: 'achievements',      target: 20,   rewardCredits: 700,  desc: '업적 20개 달성' },
        { id: 'gen_achieve_30',     name: '기록 수집가 V',       type: 'achievements',      target: 30,   rewardCredits: 1100, desc: '업적 30개 달성' },
        { id: 'gen_achieve_45',     name: '기록 박물관',         type: 'achievements',      target: 45,   rewardCredits: 1700, desc: '업적 45개 달성' },

        { id: 'gen_mission_60',     name: '퀘스트 매니악 II',    type: 'missionsCompleted', target: 60,   rewardCredits: 1000, desc: '누적 퀘스트 60개 완료' },
        { id: 'gen_mission_100',    name: '퀘스트 매니악 III',   type: 'missionsCompleted', target: 100,  rewardCredits: 1600, desc: '누적 퀘스트 100개 완료' },
        { id: 'gen_mission_160',    name: '퀘스트 아카이브',     type: 'missionsCompleted', target: 160,  rewardCredits: 2400, desc: '누적 퀘스트 160개 완료' },

        { id: 'gen_risk_50',        name: '위험 친화 III',       type: 'riskHackSuccess',   target: 50,   rewardCredits: 1000, desc: '위험 해킹 모드로 해킹 성공 50회' },
        { id: 'gen_risk_100',       name: '위험 친화 IV',        type: 'riskHackSuccess',   target: 100,  rewardCredits: 1600, desc: '위험 해킹 모드로 해킹 성공 100회' },
        { id: 'gen_risk_180',       name: '위험 그 자체',        type: 'riskHackSuccess',   target: 180,  rewardCredits: 2400, desc: '위험 해킹 모드로 해킹 성공 180회' },
]
    };

    missionDefs.general.push(
      { id: 'gen_gpu_3', name: 'GPU 점화', type: 'gpuTier', target: 3, rewardCredits: 220, desc: 'GPU 티어 3 달성' },
      { id: 'gen_gpu_5', name: '렌더 가속', type: 'gpuTier', target: 5, rewardCredits: 420, desc: 'GPU 티어 5 달성' },
      { id: 'gen_gpu_10', name: '그래픽스 오버드라이브', type: 'gpuTier', target: 10, rewardCredits: 900, desc: 'GPU 티어 10 달성' },
      { id: 'gen_hybrid_5', name: '듀얼 파이프라인', type: 'hybridTier', target: 5, rewardCredits: 700, desc: 'CPU와 GPU를 모두 티어 5 이상 달성' },
      { id: 'gen_hybrid_10', name: '하이브리드 머신', type: 'hybridTier', target: 10, rewardCredits: 1400, desc: 'CPU와 GPU를 모두 티어 10 이상 달성' },
      { id: 'gen_extreme_10', name: '익스트림 입문', type: 'extremeHackSuccess', target: 10, rewardCredits: 500, desc: 'EXTREME 해킹 성공 10회' },
      { id: 'gen_extreme_25', name: '익스트림 러너', type: 'extremeHackSuccess', target: 25, rewardCredits: 850, desc: 'EXTREME 해킹 성공 25회' },
      { id: 'gen_stage_25', name: '타워 러너', type: 'stageHighest', target: 25, rewardCredits: 650, desc: '데이터 타워 25까지 클리어' },
      { id: 'gen_stage_50', name: '챕터 브레이커', type: 'stageHighest', target: 50, rewardCredits: 1100, desc: '데이터 타워 50까지 클리어' },
      { id: 'gen_stage_100', name: '데이터 타워 정복자', type: 'stageHighest', target: 100, rewardCredits: 2200, desc: '데이터 타워 100까지 클리어' }
    );

    // 경제/성장 너프 2차: 미션/업적 연계 보상 축소
    const missionRewardNerfByScope = { daily: 0.75, weekly: 0.7, month: 0.65, general: 0.6 };
    Object.entries(missionDefs).forEach(([scope, defs]) => {
      const scopeRate = missionRewardNerfByScope[scope] || 1;
      defs.forEach(def => {
        if (typeof def.rewardCredits === 'number' && def.rewardCredits > 0) {
          let rate = scopeRate;
          if (def.type === 'achievements') rate *= 0.85;
          def.rewardCredits = Math.max(10, Math.round(def.rewardCredits * rate));
        }
      });
    });

    // 업적 정의 (확장)
    let achievementDefs = [
      // EASY
      { id: 'first_hack_success',   name: '첫 침입',           desc: '처음으로 서버 해킹에 성공했습니다.',         difficulty: 'easy',   hidden: false },
      { id: 'reach_level3',         name: '초보 해커',         desc: '플레이어 레벨 3에 도달했습니다.',             difficulty: 'easy',   hidden: false },
      { id: 'scan_10',              name: '스캐너 입문',       desc: '코드 스캔을 10회 수행했습니다.',              difficulty: 'easy',   hidden: false },
      { id: 'shop_first_buy',       name: '첫 쇼핑',           desc: '상점에서 처음으로 아이템을 구매했습니다.',     difficulty: 'easy',   hidden: true  },
      { id: 'energy_zero',          name: '기진맥진',          desc: '에너지를 0까지 모두 소모했습니다.',           difficulty: 'easy',   hidden: true  },
      { id: 'collector_beginner',   name: '코드 콜렉터 I',     desc: '서로 다른 코드를 3개 이상 보유했습니다.',      difficulty: 'easy',   hidden: false },
      { id: 'daily_mission_clear1', name: '데일리 스타터',     desc: '데일리 퀘스트를 1개 이상 완료했습니다.',       difficulty: 'easy',   hidden: false },
      { id: 'scan_30',              name: '스캐너 숙련',       desc: '코드 스캔을 30회 수행했습니다.',              difficulty: 'easy',   hidden: false },
      { id: 'get_epic_code',        name: '고급 코드 확보',     desc: 'EPIC 이상 등급의 코드를 처음 획득했습니다.',   difficulty: 'easy',   hidden: false },

      // NORMAL
      { id: 'reach_level10',        name: '중급 해커',         desc: '플레이어 레벨 10에 도달했습니다.',             difficulty: 'normal', hidden: false },
      { id: 'scan_50',              name: '데이터 광',         desc: '코드 스캔을 50회 수행했습니다.',              difficulty: 'normal', hidden: true  },
      { id: 'hack_30_success',      name: '성공적인 침입자',    desc: '서버 해킹에 30회 이상 성공했습니다.',         difficulty: 'normal', hidden: false },
      { id: 'weekly_mission_clear1',name: '주간 루틴',         desc: '위클리 퀘스트를 1개 이상 완료했습니다.',       difficulty: 'normal', hidden: false },
      { id: 'energy_max_25',        name: '지속 가능한 에너지', desc: '에너지 최대치를 25 이상으로 확장했습니다.',   difficulty: 'normal', hidden: true  },
      { id: 'credits_5000',         name: '데이터 자본가 I',   desc: '누적 획득 크레딧 5000을 달성했습니다.',        difficulty: 'normal', hidden: false },
      { id: 'mission_10',           name: '퀘스트 러너',       desc: '누적 퀘스트 10개를 완료했습니다.',             difficulty: 'normal', hidden: false },

      // HARD
      { id: 'cpu_tier_5',           name: '오버클러커',        desc: 'CPU 티어를 5 이상으로 업그레이드했습니다.',   difficulty: 'hard',   hidden: true  },
      { id: 'month_mission_all',    name: '월간 마스터',       desc: '한 달 동안 모든 MONTH QUEST를 완료했습니다.', difficulty: 'hard',   hidden: true  },
      { id: 'credits_20000',        name: '데이터 자본가 II',  desc: '누적 획득 크레딧 20000을 달성했습니다.',       difficulty: 'hard',   hidden: true  },
      { id: 'risk_10_success',      name: '위험한 승부사',     desc: '위험 해킹 모드로 해킹 성공 10회를 달성했습니다.',difficulty: 'hard',  hidden: true  }
    ];


    const extraAchievementDefs = [
      { id: 'scan_total_75', name: '스캔 누적 I', desc: '코드 스캔을 75회 수행했습니다.', difficulty: 'easy', hidden: false },
      { id: 'scan_total_120', name: '스캔 누적 II', desc: '코드 스캔을 120회 수행했습니다.', difficulty: 'normal', hidden: false },
      { id: 'scan_total_200', name: '스캔 누적 III', desc: '코드 스캔을 200회 수행했습니다.', difficulty: 'normal', hidden: true },
      { id: 'scan_total_350', name: '스캔 누적 IV', desc: '코드 스캔을 350회 수행했습니다.', difficulty: 'hard', hidden: true },
      { id: 'scan_total_500', name: '스캔 누적 V', desc: '코드 스캔을 500회 수행했습니다.', difficulty: 'hard', hidden: true },
      { id: 'hack_total_10', name: '해킹 누적 I', desc: '해킹 성공 10회를 달성했습니다.', difficulty: 'easy', hidden: false },
      { id: 'hack_total_60', name: '해킹 누적 II', desc: '해킹 성공 60회를 달성했습니다.', difficulty: 'normal', hidden: false },
      { id: 'hack_total_120', name: '해킹 누적 III', desc: '해킹 성공 120회를 달성했습니다.', difficulty: 'normal', hidden: true },
      { id: 'hack_total_250', name: '해킹 누적 IV', desc: '해킹 성공 250회를 달성했습니다.', difficulty: 'hard', hidden: true },
      { id: 'level_total_5', name: '레벨 브론즈', desc: '플레이어 레벨 5에 도달했습니다.', difficulty: 'easy', hidden: false },
      { id: 'level_total_15', name: '레벨 실버', desc: '플레이어 레벨 15에 도달했습니다.', difficulty: 'normal', hidden: false },
      { id: 'level_total_20', name: '레벨 골드', desc: '플레이어 레벨 20에 도달했습니다.', difficulty: 'normal', hidden: true },
      { id: 'level_total_25', name: '레벨 플래티넘', desc: '플레이어 레벨 25에 도달했습니다.', difficulty: 'hard', hidden: true },
      { id: 'credits_total_1000', name: '자본 시동', desc: '누적 획득 크레딧 1000을 달성했습니다.', difficulty: 'easy', hidden: false },
      { id: 'credits_total_10000', name: '자본 축적', desc: '누적 획득 크레딧 10000을 달성했습니다.', difficulty: 'normal', hidden: false },
      { id: 'credits_total_50000', name: '자본 확대', desc: '누적 획득 크레딧 50000을 달성했습니다.', difficulty: 'hard', hidden: true },
      { id: 'missions_total_25', name: '퀘스트 러너 II', desc: '퀘스트 25개를 완료했습니다.', difficulty: 'normal', hidden: false },
      { id: 'missions_total_50', name: '퀘스트 러너 III', desc: '퀘스트 50개를 완료했습니다.', difficulty: 'normal', hidden: true },
      { id: 'missions_total_100', name: '퀘스트 러너 IV', desc: '퀘스트 100개를 완료했습니다.', difficulty: 'hard', hidden: true },
      { id: 'shop_total_10', name: '쇼핑 루키', desc: '상점에서 10회 구매했습니다.', difficulty: 'easy', hidden: false },
      { id: 'shop_total_25', name: '쇼핑 중수', desc: '상점에서 25회 구매했습니다.', difficulty: 'normal', hidden: false },
      { id: 'shop_total_50', name: '쇼핑 고수', desc: '상점에서 50회 구매했습니다.', difficulty: 'normal', hidden: true },
      { id: 'energy_spent_100', name: '연료 점화', desc: '에너지를 누적 100 소모했습니다.', difficulty: 'easy', hidden: false },
      { id: 'energy_spent_500', name: '연료 과열', desc: '에너지를 누적 500 소모했습니다.', difficulty: 'normal', hidden: false },
      { id: 'energy_spent_1000', name: '연료 폭주', desc: '에너지를 누적 1000 소모했습니다.', difficulty: 'normal', hidden: true },
      { id: 'risk_total_5', name: '리스크 테스트', desc: '위험 해킹 모드로 5회 성공했습니다.', difficulty: 'easy', hidden: true },
      { id: 'risk_total_25', name: '리스크 러너', desc: '위험 해킹 모드로 25회 성공했습니다.', difficulty: 'normal', hidden: true },
      { id: 'codex_total_1', name: '도감 입문', desc: '코드 도감에서 4종을 발견했습니다.', difficulty: 'easy', hidden: false },
      { id: 'codex_total_3', name: '도감 수집 I', desc: '코드 도감에서 8종을 발견했습니다.', difficulty: 'easy', hidden: false },
      { id: 'codex_total_5', name: '도감 수집 II', desc: '코드 도감에서 12종을 발견했습니다.', difficulty: 'normal', hidden: false },
      { id: 'codex_total_6', name: '도감 완성', desc: '현재 코드 도감의 모든 코드(18종)를 발견했습니다.', difficulty: 'hard', hidden: true },
      { id: 'code_power_30', name: '파워 셋업', desc: '코드 파워 30 이상을 달성했습니다.', difficulty: 'easy', hidden: false },
      { id: 'code_power_50', name: '파워 튜닝', desc: '코드 파워 50 이상을 달성했습니다.', difficulty: 'normal', hidden: false },
      { id: 'code_power_80', name: '파워 드라이브', desc: '코드 파워 80 이상을 달성했습니다.', difficulty: 'hard', hidden: true },
      { id: 'code_level_3', name: '코드 육성 I', desc: '코드 레벨 3 이상을 달성했습니다.', difficulty: 'easy', hidden: false },
      { id: 'code_level_5', name: '코드 육성 II', desc: '코드 레벨 5 이상을 달성했습니다.', difficulty: 'normal', hidden: false },
      { id: 'code_level_10', name: '코드 육성 III', desc: '코드 레벨 10 이상을 달성했습니다.', difficulty: 'hard', hidden: true },
      { id: 'code_upgrade_1', name: '첫 강화', desc: '코드를 1회 강화했습니다.', difficulty: 'easy', hidden: false },
      { id: 'code_upgrade_5', name: '강화 루틴', desc: '코드를 5회 강화했습니다.', difficulty: 'easy', hidden: false },
      { id: 'code_upgrade_15', name: '강화 전문가', desc: '코드를 15회 강화했습니다.', difficulty: 'normal', hidden: true },
      { id: 'code_sync_1', name: '첫 동기화', desc: '코드를 1회 동기화했습니다.', difficulty: 'easy', hidden: false },
      { id: 'code_sync_3', name: '동기화 루틴', desc: '코드를 3회 동기화했습니다.', difficulty: 'normal', hidden: false },
      { id: 'code_sync_8', name: '동기화 전문가', desc: '코드를 8회 동기화했습니다.', difficulty: 'hard', hidden: true },
      { id: 'sync_level_1', name: '동기화 단계 I', desc: '코드 동기화 1단계를 달성했습니다.', difficulty: 'easy', hidden: false },
      { id: 'sync_level_3', name: '동기화 단계 II', desc: '코드 동기화 3단계를 달성했습니다.', difficulty: 'normal', hidden: false },
      { id: 'code_evolve_1', name: '첫 진화', desc: '코드를 1회 진화시켰습니다.', difficulty: 'normal', hidden: false },
      { id: 'code_evolve_3', name: '진화 루틴', desc: '코드를 3회 진화시켰습니다.', difficulty: 'hard', hidden: true },
      { id: 'shards_total_10', name: '조각 수집 I', desc: '중복 조각을 누적 10개 획득했습니다.', difficulty: 'easy', hidden: false },
      { id: 'shards_total_30', name: '조각 수집 II', desc: '중복 조각을 누적 30개 획득했습니다.', difficulty: 'normal', hidden: false },
      { id: 'energy_pack_1', name: '비상 보급', desc: '에너지 팩을 1회 사용했습니다.', difficulty: 'easy', hidden: true },
    ];
    achievementDefs.push(...extraAchievementDefs);

    // v3.0.0: 6단계 난이도 자동 분포 (intro / easy / normal / hard / chaos / impossible)
    function pickAchievementDifficulty(index, totalCount) {
      const ratio = index / Math.max(1, totalCount - 1);
      if (ratio >= 0.92) return 'impossible';   // 최상위 8%
      if (ratio >= 0.78) return 'chaos';        // 22%
      if (ratio >= 0.58) return 'hard';         // 20%
      if (ratio >= 0.36) return 'normal';       // 22%
      if (ratio >= 0.14) return 'easy';         // 22%
      return 'intro';                           // 14%
    }

    function createAchievementSeries(prefix, metric, targets, names, descTemplate, hiddenStart = targets.length, hardStart = null) {
      return targets.map((target, index) => ({
        id: `${prefix}_${index + 1}`,
        name: names[index],
        desc: descTemplate.replace('{v}', target),
        difficulty: pickAchievementDifficulty(index, targets.length),
        hidden: index >= hiddenStart,
        metric,
        target
      }));
    }

    const v200AchievementDefs = [
      // 진행 8
      ...createAchievementSeries('v200_progress', 'level', [5, 10, 15, 20, 25, 30, 40, 50],
        ['새 셸 적응', '운영자 루틴', '성장 파형', '코어 숙련', '상위 접근자', '시스템 파일럿', '하이 레벨러', '메이저 러너'],
        '플레이어 레벨 {v}에 도달했습니다.', 6),

      // 스캔 8
      ...createAchievementSeries('v200_scan', 'scans', [50, 100, 200, 350, 500, 800, 1200, 2000],
        ['스캔 재개', '패턴 리더', '딥 크롤러', '희귀도 탐색자', '신호 수집가', '프리즘 분석가', '오라클 스캐너', '스캔 오버런'],
        '코드 스캔을 {v}회 수행했습니다.', 6),

      // 일반 해킹 8
      ...createAchievementSeries('v200_hack', 'hackSuccess', [20, 50, 100, 200, 400, 700, 1000, 1500],
        ['침투 재시동', '세션 브레이커', '루트 루틴', '서버 리퍼', '침입 아키텍트', '코어 침투자', '블랙박스 오퍼레이터', '시스템 체이서'],
        '서버 해킹 성공 {v}회를 달성했습니다.', 6),

      // RISK 8
      ...createAchievementSeries('v200_risk', 'riskHackSuccess', [5, 15, 30, 60, 100, 150, 220, 300],
        ['리스크 점화', '위험 감각', '레드 라인', '트레이스 워커', '위험 설계자', '고압 루틴', '불안정한 승부사', '리스크 코어'],
        'RISK 해킹 성공 {v}회를 달성했습니다.', 5),

      // EXTREME 10
      ...createAchievementSeries('v200_extreme', 'extremeHackSuccess', [1, 5, 10, 25, 50, 80, 120, 180, 250, 350],
        ['익스트림 진입', '극한 감각', '레드존 성공', '어비스 러너', '고위험 처리자', '한계 해킹', '익스트림 설계자', '딥 리스크', '오버드라이브 해커', '익스트림 코어'],
        'EXTREME 해킹 성공 {v}회를 달성했습니다.', 6),

      // 상점/경제 8
      ...createAchievementSeries('v200_shop', 'shopPurchases', [5, 15, 30, 60],
        ['조달 시작', '상점 루틴', '보급 설계', '경제 운영자'],
        '상점에서 {v}회 구매했습니다.', 3),
      ...createAchievementSeries('v200_economy', 'creditsEarnedTotal', [5000, 25000, 100000, 500000],
        ['크레딧 점화', '보상 회로', '데이터 자본', '크레딧 아카이브'],
        '누적 획득 크레딧 {v}을 달성했습니다.', 3),

      // 코드 수집/성장 14
      ...createAchievementSeries('v200_codex', 'codexCount', [10, 20, 30, 40, Object.keys(codeDefs).length],
        ['도감 확장 I', '도감 확장 II', '도감 확장 III', '도감 확장 IV', '2.0.0 도감 완성'],
        '코드 도감에서 {v}종을 발견했습니다.', 4),
      ...createAchievementSeries('v200_power', 'highestPower', [60, 100, 160],
        ['파워 라인', '고출력 코드', '코어 파워'],
        '코드 파워 {v} 이상을 달성했습니다.', 2),
      ...createAchievementSeries('v200_code_upgrade', 'codeUpgradeCount', [10, 30, 75],
        ['강화 재개', '강화 회로', '강화 매니폴드'],
        '코드를 누적 {v}회 강화했습니다.', 2),
      ...createAchievementSeries('v200_code_sync', 'codeSyncCount', [10, 30, 60],
        ['동기화 재개', '동기화 회로', '싱크 매니폴드'],
        '코드를 누적 {v}회 동기화했습니다.', 2),

      // CPU/GPU/하이브리드 12
      ...createAchievementSeries('v200_cpu', 'cpuTier', [3, 5, 10, 15],
        ['CPU 안정화', 'CPU 제어선', 'CPU 코어 확장', 'CPU 컨트롤러'],
        'CPU 티어 {v}을 달성했습니다.', 3),
      ...createAchievementSeries('v200_gpu', 'gpuTier', [3, 5, 10, 15],
        ['GPU 점화', '렌더 가속', '그래픽스 오버드라이브', 'GPU 코어 확장'],
        'GPU 티어 {v}을 달성했습니다.', 3),
      ...createAchievementSeries('v200_hybrid', 'hybridTier', [3, 5, 10, 15],
        ['듀얼 파이프라인 I', '듀얼 파이프라인 II', '하이브리드 머신', '하이브리드 코어'],
        'CPU와 GPU를 모두 티어 {v} 이상으로 올렸습니다.', 3),

      // Data Tower 16
      ...createAchievementSeries('v200_stage', 'stageHighest', [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        ['챕터 1 클리어', '챕터 2 클리어', '챕터 3 클리어', '챕터 4 클리어', '챕터 5 클리어', '챕터 6 클리어', '챕터 7 클리어', '챕터 8 클리어', '챕터 9 클리어', '데이터 타워 100 클리어'],
        '데이터 타워 {v}까지 클리어했습니다.', 8),
      ...createAchievementSeries('v200_stage_repeat', 'stageClearCount', [25, 50, 100, 200],
        ['타워 반복 I', '타워 반복 II', '타워 반복 III', '타워 반복 IV'],
        '데이터 타워를 누적 {v}회 클리어했습니다.', 3),
      ...createAchievementSeries('v200_chapter_reward', 'chapterRewardCount', [5, 10],
        ['챕터 보상 수집가', '챕터 보상 완성'],
        '챕터 클리어 보상을 {v}개 수령했습니다.', 1),

      // 히든/특수 8
      ...createAchievementSeries('v200_hidden_energy', 'energySpentTotal', [2000],
        ['숨은 과열'], '에너지를 누적 {v} 소모했습니다.', 0),
      ...createAchievementSeries('v200_hidden_pack', 'energyPacksUsed', [10],
        ['비상 보급 전문가'], '에너지 팩을 {v}회 사용했습니다.', 0),
      ...createAchievementSeries('v200_hidden_legend', 'legendaryCount', [3],
        ['전설의 회로'], 'LEGENDARY 코드를 {v}종 확보했습니다.', 0),
      ...createAchievementSeries('v200_hidden_epic', 'epicPlusCount', [10],
        ['고등급 컬렉터'], 'EPIC 이상 코드를 {v}종 확보했습니다.', 0),
      ...createAchievementSeries('v200_hidden_codex', 'codexCount', [Object.keys(codeDefs).length],
        ['완전한 도감'], '현재 코드 도감 전체를 발견했습니다.', 0),
      ...createAchievementSeries('v200_hidden_stage_repeat', 'stageClearCount', [500],
        ['반복의 미학'], '데이터 타워를 누적 {v}회 클리어했습니다.', 0),
      ...createAchievementSeries('v200_hidden_extreme', 'extremeHackSuccess', [500],
        ['극한의 끝'], 'EXTREME 해킹 성공 {v}회를 달성했습니다.', 0),
      ...createAchievementSeries('v200_hidden_mission', 'missionsCompleted', [200],
        ['퀘스트 아카이브'], '퀘스트를 누적 {v}개 완료했습니다.', 0)
    ].map(def => def.id.startsWith('v200_hidden_') ? { ...def, hidden: true, difficulty: 'chaos' } : def);

    achievementDefs.push(...v200AchievementDefs);

    function applyAchievementRetune() {
      const overrides = {
        first_hack_success: ['처음으로 서버 해킹에 성공했습니다.', 'easy'],
        reach_level3: ['플레이어 레벨 9에 도달했습니다.', 'normal'],
        scan_10: ['코드 스캔을 30회 수행했습니다.', 'normal'],
        shop_first_buy: ['상점에서 처음으로 아이템을 구매했습니다.', 'easy'],
        energy_zero: ['에너지를 0까지 모두 소모했습니다.', 'easy'],
        collector_beginner: ['서로 다른 코드를 9개 이상 보유했습니다.', 'hard'],
        daily_mission_clear1: ['데일리 퀘스트를 3개 이상 완료했습니다.', 'normal'],
        scan_30: ['코드 스캔을 90회 수행했습니다.', 'hard'],
        get_epic_code: ['EPIC 이상 등급의 코드를 처음 획득했습니다.', 'normal'],
        reach_level10: ['플레이어 레벨 30에 도달했습니다.', 'hard'],
        scan_50: ['코드 스캔을 150회 수행했습니다.', 'hard'],
        hack_30_success: ['서버 해킹에 90회 이상 성공했습니다.', 'hard'],
        weekly_mission_clear1: ['위클리 퀘스트를 3개 이상 완료했습니다.', 'hard'],
        energy_max_25: ['에너지 최대치를 75 이상으로 확장했습니다.', 'hard'],
        credits_5000: ['누적 획득 크레딧 15000을 달성했습니다.', 'hard'],
        mission_10: ['누적 퀘스트 30개를 완료했습니다.', 'hard'],
        cpu_tier_5: ['CPU 티어를 15 이상으로 업그레이드했습니다.', 'hard'],
        credits_20000: ['누적 획득 크레딧 60000을 달성했습니다.', 'hard'],
        risk_10_success: ['위험 해킹 모드로 해킹 성공 30회를 달성했습니다.', 'hard'],
        rarity_common_2: ['COMMON 코드를 6개 이상 확보했습니다.', 'normal'],
        rarity_rare_2: ['RARE 코드를 6개 이상 확보했습니다.', 'hard'],
        rarity_epic_plus_2: ['EPIC 이상 코드를 6개 이상 확보했습니다.', 'hard'],
        legendary_1: ['LEGENDARY 코드를 1개 이상 확보했습니다.', 'hard'],
        legendary_2: ['LEGENDARY 코드를 2개 이상 확보했습니다.', 'hard'],
        rare_plus_4: ['RARE 이상 코드를 12개 이상 확보했습니다.', 'hard'],
        cpu_tier_5_plus: ['CPU 티어를 15 이상 달성했습니다.', 'hard'],
        cpu_tier_10_plus: ['CPU 티어를 30 이상 달성했습니다.', 'hard'],
        energy_max_30_plus: ['에너지 최대치를 90 이상 달성했습니다.', 'hard'],
        energy_max_40_plus: ['에너지 최대치를 120 이상 달성했습니다.', 'hard']
      };

      const thresholdGroups = {
        scan_total_: [225, 360, 600, 1050, 1500, 2400, 3600, 6000],
        hack_total_: [30, 180, 360, 750, 1200, 2100],
        level_total_: [15, 45, 60, 75, 90, 120, 150],
        credits_total_: [3000, 30000, 150000, 300000, 750000],
        missions_total_: [75, 150, 300, 480],
        shop_total_: [30, 75, 150, 240, 360],
        energy_spent_: [300, 1500, 3000, 7500, 12000],
        risk_total_: [15, 75, 150, 300, 540],
        codex_total_: [4, 8, 12, 18],
        code_power_: [90, 150, 240, 360],
        code_level_: [9, 15, 30, 45],
        code_upgrade_: [3, 15, 45, 90],
        code_sync_: [3, 9, 24, 45],
        sync_level_: [3, 9, 15],
        code_evolve_: [3, 9, 18],
        shards_total_: [30, 90, 180, 360],
        energy_pack_: [3, 15],
        achievement_total_: [15, 30, 45, 60, 75]
      };

      const labelMap = {
        scan_total_: '코드 스캔을 {v}회 수행했습니다.',
        hack_total_: '해킹 성공 {v}회를 달성했습니다.',
        level_total_: '플레이어 레벨 {v}에 도달했습니다.',
        credits_total_: '누적 획득 크레딧 {v}을 달성했습니다.',
        missions_total_: '퀘스트 {v}개를 완료했습니다.',
        shop_total_: '상점에서 {v}회 구매했습니다.',
        energy_spent_: '에너지를 누적 {v} 소모했습니다.',
        risk_total_: '위험 해킹 모드로 {v}회 성공했습니다.',
        codex_total_: '코드 도감에서 {v}종을 발견했습니다.',
        code_power_: '코드 파워 {v} 이상을 달성했습니다.',
        code_level_: '코드 레벨 {v} 이상을 달성했습니다.',
        code_upgrade_: '코드를 {v}회 강화했습니다.',
        code_sync_: '코드를 {v}회 동기화했습니다.',
        sync_level_: '코드 동기화 {v}단계를 달성했습니다.',
        code_evolve_: '코드를 {v}회 진화시켰습니다.',
        shards_total_: '중복 조각을 누적 {v}개 획득했습니다.',
        energy_pack_: '에너지 팩을 {v}회 사용했습니다.',
        achievement_total_: '업적 {v}개를 달성했습니다.'
      };

      function getThresholdRetune(defId) {
        for (const [prefix, values] of Object.entries(thresholdGroups)) {
          if (!defId.startsWith(prefix)) continue;
          const matchingDefs = extraAchievementDefs.filter(x => x.id.startsWith(prefix));
          const pos = matchingDefs.findIndex(x => x.id === defId);
          if (pos < 0) return null;
          return { prefix, value: values[pos] };
        }
        return null;
      }

      achievementDefs.forEach(def => {
        if (overrides[def.id]) {
          def.desc = overrides[def.id][0];
          def.difficulty = overrides[def.id][1];
          return;
        }
        const retune = getThresholdRetune(def.id);
        if (retune && retune.value != null && labelMap[retune.prefix]) {
          def.desc = labelMap[retune.prefix].replace('{v}', retune.value);
        }
      });
      const codexAll = achievementDefs.find(def => def.id === 'codex_total_6');
      if (codexAll) codexAll.desc = `현재 코드 도감의 모든 코드(${Object.keys(codeDefs).length}종)를 발견했습니다.`;
    }

    applyAchievementRetune();

    // DOM
    const statLevel = document.getElementById('statLevel');
    const statExp = document.getElementById('statExp');
    const statCredits = document.getElementById('statCredits');
    const statCpuTier = document.getElementById('statCpuTier');
    const statGpuTier = document.getElementById('statGpuTier');
    const statEnergyValue = document.getElementById('statEnergyValue');
    const statEnergyTimer = document.getElementById('statEnergyTimer');
    const statEnergyPack = document.getElementById('statEnergyPack');
    const statLastSave = document.getElementById('statLastSave');
    const btnUseEnergyPack = document.getElementById('btnUseEnergyPack');
    const energyBarInner = document.getElementById('energyBarInner');

    const logList = document.getElementById('logList');

    const btnScan = document.getElementById('btnScan');
    const btnHack = document.getElementById('btnHack');
    const btnUpgradeCpu = document.getElementById('btnUpgradeCpu');
    const btnUpgradeGpu = document.getElementById('btnUpgradeGpu');
    const btnUpgradeCode = document.getElementById('btnUpgradeCode');
    const btnSyncCode = document.getElementById('btnSyncCode');
    const btnEvolveCode = document.getElementById('btnEvolveCode');

    const shopList = document.getElementById('shopList');
    const shopSortSelect = document.getElementById('shopSortSelect');
    const shopCategoryTabs = document.getElementById('shopCategoryTabs');
    const shopCategoryTabButtons = document.querySelectorAll('.shop-category-tab');
    const serverSelect = document.getElementById('serverSelect');

    const codeListEl = document.getElementById('codeList');
    const codeDetailEl = document.getElementById('codeDetail');
    const codeSortSelect = document.getElementById('codeSortSelect');

    const scanOverlay = document.getElementById('scanOverlay');
    const scanProgressInner = document.getElementById('scanProgressInner');
    const scanText = document.getElementById('scanText');

    const leftPanel = document.getElementById('leftPanel');
    const centerPanel = document.getElementById('centerPanel');
    const rightPanel = document.getElementById('rightPanel');
    const main = document.getElementById('main');
    const toastContainer = document.getElementById('toastContainer');

    const resizerLeft = document.getElementById('resizerLeft');
    const resizerRight = document.getElementById('resizerRight');

    const btnList = document.getElementById('btnList');
    const listModalBackdrop = document.getElementById('listModalBackdrop');
    const btnListClose = document.getElementById('btnListClose');
    const btnListClose2 = document.getElementById('btnListClose2');
    const btnEvent = document.getElementById('btnEvent');
    const eventModalBackdrop = document.getElementById('eventModalBackdrop');
    const btnEventClose = document.getElementById('btnEventClose');
    const btnEventClose2 = document.getElementById('btnEventClose2');
    const btnPass = document.getElementById('btnPass');
    const passModalBackdrop = document.getElementById('passModalBackdrop');
    const btnPassClose = document.getElementById('btnPassClose');
    const btnPassClose2 = document.getElementById('btnPassClose2');
    const btnMore = document.getElementById('btnMore');
    const moreModalBackdrop = document.getElementById('moreModalBackdrop');
    const btnMoreClose = document.getElementById('btnMoreClose');
    const btnMoreClose2 = document.getElementById('btnMoreClose2');

    const btnSaveGame = document.getElementById('btnSaveGame');
    const btnLoadGame = document.getElementById('btnLoadGame');
    const btnClearSave = document.getElementById('btnClearSave');

    const missionListEl = document.getElementById('missionList');
    const achievementListEl = document.getElementById('achievementList');
    const achievementFilterButtons = document.querySelectorAll('[data-achievement-filter]');
    const chkShowHiddenAchievements = document.getElementById('chkShowHiddenAchievements');
    const codexListEl = document.getElementById('codexList');
    const codexSummaryEl = document.getElementById('codexSummary');

    const chkRiskMode = document.getElementById('chkRiskMode');
    const hackModeButtons = document.querySelectorAll('[data-hack-mode]');
    const hackModeHint = document.getElementById('hackModeHint');
    const loadoutSelect = document.getElementById('loadoutSelect');
    const btnSaveLoadout = document.getElementById('btnSaveLoadout');
    const btnLoadLoadout = document.getElementById('btnLoadLoadout');

    const filterSystem = document.getElementById('filterSystem');
    const filterScan = document.getElementById('filterScan');
    const filterHack = document.getElementById('filterHack');
    const filterShop = document.getElementById('filterShop');
    const filterLevel = document.getElementById('filterLevel');

    const listTabButtons = document.querySelectorAll('.list-tab-button');
    const moreTabButtons = document.querySelectorAll('.more-tab-button');
    const tabUpdate = document.getElementById('tabUpdate');
    const tabMission = document.getElementById('tabMission');
    const tabAchievement = document.getElementById('tabAchievement');
    const tabCodex = document.getElementById('tabCodex');
    const tabLiveNet = document.getElementById('tabLiveNet');
    const tabRank = document.getElementById('tabRank');
    const tabLogs = document.getElementById('tabLogs');
    const tabSettings = document.getElementById('tabSettings');
    const tabSave = document.getElementById('tabSave');
    const tabCredits = document.getElementById('tabCredits');
    const tabManual = document.getElementById('tabManual');

    const updateVersionTitle = document.getElementById('updateVersionTitle');
    const updateLinesList = document.getElementById('updateLinesList');
    const updateIndexLabel = document.getElementById('updateIndexLabel');
    const btnUpdatePrev = document.getElementById('btnUpdatePrev');
    const btnUpdateNext = document.getElementById('btnUpdateNext');
    const btnUpdateDontShow = document.getElementById('btnUpdateDontShow');

    const missionScopeButtons = document.querySelectorAll('.mission-scope-btn');
    const btnClearLogs = document.getElementById('btnClearLogs');
    const btnToggleLogs = document.getElementById('btnToggleLogs');
    const logPanelBody = document.getElementById('logPanelBody');
    const logSearchInput = document.getElementById('logSearchInput');

    const setLanguage = document.getElementById('setLanguage');
    const setFontScale = document.getElementById('setFontScale');
    const setFontScaleLabel = document.getElementById('setFontScaleLabel');
    const setSnow = document.getElementById('setSnow');
    const setUiZoom = document.getElementById('setUiZoom');
    const setAnim = document.getElementById('setAnim');
    const setSfx = document.getElementById('setSfx');
    const setSfxVolume = document.getElementById('setSfxVolume');
    const setSfxVolumeLabel = document.getElementById('setSfxVolumeLabel');
    const setToastMs = document.getElementById('setToastMs');
    const setAutoSaveToast = document.getElementById('setAutoSaveToast');
    const setLiveNetwork = document.getElementById('setLiveNetwork');
    const setLiveNicknameMode = document.getElementById('setLiveNicknameMode');

    const tutorialBackdrop = document.getElementById('tutorialBackdrop');
    const tutorialStepLabel = document.getElementById('tutorialStepLabel');
    const tutorialStepTitle = document.getElementById('tutorialStepTitle');
    const tutorialStepGoal = document.getElementById('tutorialStepGoal');
    const tutorialStepText = document.getElementById('tutorialStepText');
    const tutorialStepChecklist = document.getElementById('tutorialStepChecklist');
    const tutorialStepHint = document.getElementById('tutorialStepHint');
    const btnTutorialPrev = document.getElementById('btnTutorialPrev');
    const btnTutorialNext = document.getElementById('btnTutorialNext');
    const btnTutorialFinish = document.getElementById('btnTutorialFinish');
    const btnTutorialSkip = document.getElementById('btnTutorialSkip');
    const btnOpenTutorial = document.getElementById('btnOpenTutorial');

    const codeDetailModalBackdrop = document.getElementById('codeDetailModalBackdrop');
    const codeDetailModalTitle = document.getElementById('codeDetailModalTitle');
    const codeDetailModalBody = document.getElementById('codeDetailModalBody');
    const btnCodeDetailClose = document.getElementById('btnCodeDetailClose');
    const btnModalUpgradeCode = document.getElementById('btnModalUpgradeCode');
    const btnModalSyncCode = document.getElementById('btnModalSyncCode');
    const btnModalEvolveCode = document.getElementById('btnModalEvolveCode');
    const btnModalShardCode = document.getElementById('btnModalShardCode');

    const btnExportSave = document.getElementById('btnExportSave');
    const btnImportSaveFile = document.getElementById('btnImportSaveFile');
    const fileImportSave = document.getElementById('fileImportSave');
    const importSaveText = document.getElementById('importSaveText');
    const btnImportSaveText = document.getElementById('btnImportSaveText');

    function bind(el, type, handler, options) {
      if (el && typeof el.addEventListener === 'function') {
        el.addEventListener(type, handler, options);
      }
    }

    function setNodeText(el, value) {
      if (el) el.textContent = value;
    }

    function setNodeDisabled(el, disabled) {
      if (el) el.disabled = !!disabled;
    }

    function setNodeDisplay(el, value) {
      if (el) el.style.display = value;
    }

    // 상태
    let missionScopeActive = 'daily';
    let logsHidden = false;
    let scanRunning = false;
    let tutorialOpenedOnce = false;
    let autoRunIntervalId = null;

    function getTutorialSteps() {
      if (getLang() === 'en') {
        return [
          {
            title: 'Welcome',
            goal: 'First route: get one code -> equip it -> clear one NORMAL hack',
            text: 'HCSiG is about breaking servers, earning credits, and growing your tools. Codes are the hacking tools you equip before scans, hacks, Data Tower, and ZERO-DAY.',
            checklist: ['Codes are your main tools.', 'Credits pay for upgrades and items.', 'Energy recovers over time: 1 energy every 60 seconds, up to 20.'],
            hint: 'Tap Next and we will walk through the safest first route.'
          },
          {
            title: '1. Scan a Code',
            goal: 'Get your first code',
            text: 'On HOME, press Scan Code. A scan costs 1 energy and gives a small amount of EXP.',
            checklist: ['A new code is stored in INVENTORY > CODES.', 'A duplicate becomes shards instead of a new copy.', 'If energy hits 0, wait 60 seconds for 1 point to recover.'],
            hint: 'The guide moves aside while you act. Press Scan Code now, or tap Next to keep reading.',
            waitAction: 'scan'
          },
          {
            title: '2. Activate a Code',
            goal: 'Choose the code you want to use',
            text: 'Open INVENTORY > CODES and select one owned code. The active code is the code used for hacks and Data Tower attempts.',
            checklist: ['Higher PWR helps right away.', 'Your active code is your current loadout.', 'You do not need Sync or Evolve yet.'],
            hint: 'The guide will not block the screen. Tap a code card, or press Next to continue.',
            waitAction: 'selectCode'
          },
          {
            title: '3. Hack a Server',
            goal: 'Clear one NORMAL hack',
            text: 'Return HOME, keep NORMAL selected, choose a server you can enter now, then press Server Hack.',
            checklist: ['NORMAL is the safest starting mode.', 'A server is available when you meet its level requirement.', 'Success gives credits and EXP.'],
            hint: 'Keep NORMAL selected and try Server Hack, or press Next to keep reading.',
            waitAction: 'hack'
          },
          {
            title: '4. EVENT and Beginner Roulette',
            goal: 'Check your free daily event rewards',
            text: 'EVENT is where season progress and weekly goals live. New accounts also get Beginner Roulette: one free claim per day for 10 days.',
            checklist: ['PASS is your monthly season track.', 'WEEKLY CHALLENGE resets every Monday at 05:00 KST.', 'Beginner Roulette is a free daily reward for your first 10 days.'],
            hint: 'If you want a quick bonus, open EVENT after your first hack.'
          },
          {
            title: '5. Hack Modes',
            goal: 'Use NORMAL first, then branch out later',
            text: 'NORMAL is the default mode. RISK trades success rate for more credits, and EXTREME unlocks later when your account is stronger.',
            checklist: ['Stay on NORMAL while learning.', 'Use RISK only when your success rate feels comfortable.', 'You can ignore EXTREME at the beginning.'],
            hint: 'Your first goal is one stable NORMAL clear, not a risky run.'
          },
          {
            title: '6. CPU and GPU',
            goal: 'Know what each upgrade actually does',
            text: 'CPU helps your hacks feel steadier. GPU boosts the rewards from repeated or harder content.',
            checklist: ['CPU improves control and stability.', 'GPU is stronger for reward growth later.', 'Early on, one or two CPU upgrades usually feel best.'],
            hint: 'If you are unsure what to buy first, CPU is the safer early choice.'
          },
          {
            title: '7. Growing Codes',
            goal: 'Strengthen one reliable code first',
            text: 'When you have spare credits or duplicate shards, go back to INVENTORY > CODES and strengthen one code you trust.',
            checklist: ['Upgrade spends credits for steady PWR.', 'Sync uses duplicate shards later for extra success support.', 'Evolve is a later milestone, not a first-hour task.'],
            hint: 'One well-built active code is easier to use than many untouched codes.'
          },
          {
            title: '8. SHOP',
            goal: 'Use the shop when progress slows down',
            text: 'SHOP is your supply station. If energy is low or a run feels stuck, use filters and buy only what solves the current problem.',
            checklist: ['Energy items keep sessions moving.', 'System and utility items smooth out rough runs.', 'Always check daily limits before spending.'],
            hint: 'You do not need every item. Buy for the problem in front of you.'
          },
          {
            title: '9. LAB and Data Tower',
            goal: 'See where the long-term challenge lives',
            text: 'LAB opens your longer goals. Data Tower is a 100-floor climb that is meant to be cleared over time, not in one sitting.',
            checklist: ['Data Tower is long-term content.', 'You can come back after upgrading.', 'It is normal to leave LAB for later on day one.'],
            hint: 'Build up through basic hacks first, then start climbing.'
          },
          {
            title: '10. ZERO-DAY DISCOVERY',
            goal: 'Know what ZERO-DAY is before you tap it',
            text: 'ZERO-DAY DISCOVERY is a short time-attack mode in LAB. You inject data before the patch bar fills, then recover before the cutoff to keep your rewards.',
            checklist: ['Short, high-focus runs.', 'Recover before the cutoff to secure rewards.', 'It is fine to ignore ZERO-DAY until basic hacks feel comfortable.'],
            hint: 'Think of ZERO-DAY as a side mode you unlock into, not your first homework.'
          },
          {
            title: '11. LIST, More, and Cloud',
            goal: 'Know where records and account tools live',
            text: 'LIST contains missions and achievements. More contains Live Net, settings, cloud account, credits, the manual, and tutorial replay.',
            checklist: ['Cloud save is the safest way to keep progress across refreshes and devices.', 'Live Net and logs explain what just happened.', 'You can replay this guide anytime from More.'],
            hint: 'If you plan to keep playing, cloud login is the safest save route.'
          },
          {
            title: '12. Ready',
            goal: 'Recommended first route',
            text: 'Scan until you own a code, activate it, clear NORMAL hacks, claim Beginner Roulette when it is available, then spend credits on one code and early CPU upgrades.',
            checklist: ['First: Scan Code.', 'Second: equip the code in INVENTORY > CODES.', 'Third: clear NORMAL hacks and keep momentum.'],
            hint: 'Tap Start. You are ready.'
          }
        ];
      }
      if (getLang() === 'ja') {
        return [
          {
            title: 'ようこそ',
            goal: '最初の流れ: コード確保 → 装備 → NORMALハック',
            text: 'HCSiGではサーバーを突破してクレジットを稼ぎ、装備を育てていきます。コードはスキャン、ハック、データタワー、ZERO-DAYで使うハッキング用の装備です。',
            checklist: ['コードはあなたの主力装備です。', 'クレジットで成長や補給を進めます。', 'エネルギーは60秒ごとに1回復し、最大20まで溜まります。'],
            hint: '次へ進むと、最初の安全な進行ルートを案内します。'
          },
          {
            title: '1. コードスキャン',
            goal: '最初のコードを確保しましょう',
            text: 'HOMEでコードスキャンを押してください。スキャンはエネルギーを1消費し、少量のEXPを獲得します。',
            checklist: ['新しいコードは INVENTORY > CODES に保存されます。', '重複コードは新規ではなくシャードになります。', 'エネルギーが0なら60秒待つと1回復します。'],
            hint: 'ガイドは下に退きます。今すぐコードスキャンを押すか、そのまま次へ進んでも大丈夫です。',
            waitAction: 'scan'
          },
          {
            title: '2. 使用コードを選ぶ',
            goal: '使うコードを1つ装備しましょう',
            text: 'INVENTORY > CODES を開いて、所持コードを1つ選択してください。アクティブコードがハックとデータタワーに使われます。',
            checklist: ['PWRが高いほどすぐに役立ちます。', '現在のアクティブコードがあなたの装備です。', '今は同期や進化を気にしなくて大丈夫です。'],
            hint: '画面は塞がれません。コードカードを押すか、次へ進んでください。',
            waitAction: 'selectCode'
          },
          {
            title: '3. サーバーハック',
            goal: 'NORMALで1回成功してみましょう',
            text: 'HOMEに戻り、NORMALを維持したまま、今入れるサーバーを選んでサーバーハックを押してください。',
            checklist: ['NORMALは最初に最も安定しています。', '必要レベルを満たすサーバーなら今すぐ挑戦できます。', '成功するとクレジットとEXPを獲得します。'],
            hint: 'まずはNORMALで1回成功すれば十分です。',
            waitAction: 'hack'
          },
          {
            title: '4. EVENTと初心者ルーレット',
            goal: '毎日の無料報酬を確認しましょう',
            text: 'EVENTではシーズン進行と週間目標を管理します。新規アカウントには、10日間毎日1回受け取れる初心者ルーレットもあります。',
            checklist: ['PASSは月間シーズン進行です。', 'WEEKLY CHALLENGEは毎週月曜05:00 KSTに更新されます。', '初心者ルーレットは最初の10日間の無料報酬です。'],
            hint: '最初のハックが終わったら、EVENTも一度見てみましょう。'
          },
          {
            title: '5. ハックモード',
            goal: '最初はNORMALで十分です',
            text: 'NORMALが基本モードです。RISKは成功率を下げて報酬を上げ、EXTREMEは後半向けの高難度モードです。',
            checklist: ['慣れるまではNORMALを使いましょう。', '成功率に余裕が出たらRISKへ。', '最初はEXTREMEを無視して大丈夫です。'],
            hint: '最初の目標は、危険な挑戦ではなく安定した1勝です。'
          },
          {
            title: '6. CPUとGPU',
            goal: '役割をはっきり分けて覚えましょう',
            text: 'CPUはハックを安定させ、GPUは周回や高難度での報酬効率を伸ばします。',
            checklist: ['CPUは安定感を上げます。', 'GPUは後半の報酬効率で強くなります。', '序盤はCPU強化のほうが体感しやすいです。'],
            hint: 'どちらを上げるか迷ったら、最初はCPUが無難です。'
          },
          {
            title: '7. コード成長',
            goal: 'まずは1つの主力コードを育てましょう',
            text: 'クレジットや重複シャードが溜まったら、INVENTORY > CODES に戻って主力コードを育ててください。',
            checklist: ['強化はクレジットでPWRを安定して伸ばします。', '同期は後から重複シャードで補助性能を上げます。', '進化は後半の目標で、最初から急ぐ必要はありません。'],
            hint: '浅く広くより、1枚をしっかり育てるほうが序盤は楽です。'
          },
          {
            title: '8. SHOP',
            goal: '詰まった時だけ必要な補給をしましょう',
            text: 'SHOPは補給所です。エネルギー不足や進行停滞を感じた時に、今必要なものだけ買えば十分です。',
            checklist: ['エネルギー系はテンポ維持に便利です。', 'システム/ユーティリティ系は周回を楽にします。', 'デイリー制限を確認して使いましょう。'],
            hint: '全部を買う必要はありません。今の問題を解決する物だけで十分です。'
          },
          {
            title: '9. LABとデータタワー',
            goal: '長期目標の場所を知っておきましょう',
            text: 'LABでは長期コンテンツに触れます。データタワーは100階構成で、1日で終わらせる前提ではありません。',
            checklist: ['データタワーは長期挑戦です。', '強化してから戻ってきても大丈夫です。', '初日に無理して進めなくて構いません。'],
            hint: 'まずは基本ハックで育ってから登り始めましょう。'
          },
          {
            title: '10. ZERO-DAY DISCOVERY',
            goal: '押す前にどんなモードかだけ知っておきましょう',
            text: 'ZERO-DAY DISCOVERY は LAB の短時間タイムアタックです。パッチバーが埋まる前にデータを注入し、回収して報酬を持ち帰ります。',
            checklist: ['短時間で集中するサイドモードです。', '締め切り前に回収すると報酬を確保できます。', '基本ハックに慣れるまでは後回しでも大丈夫です。'],
            hint: '最初の必修ではなく、慣れてから触る挑戦モードだと思ってください。'
          },
          {
            title: '11. LIST・その他・クラウド',
            goal: '記録とアカウントの場所を覚えましょう',
            text: 'LISTにはミッションと実績があります。More には Live Net、設定、クラウドアカウント、クレジット、説明書、チュートリアル再表示があります。',
            checklist: ['クラウド保存が最も安全な進行保存方法です。', 'Live Net とログで直近の出来事を確認できます。', 'このガイドは More からいつでも再表示できます。'],
            hint: '長く遊ぶなら、クラウドログインを先に済ませるのが安全です。'
          },
          {
            title: '12. 準備完了',
            goal: '最初のおすすめ進行順',
            text: 'コードをスキャンして装備し、NORMALハックでクレジットを集め、初心者ルーレットを受け取ってからコードとCPUを強化しましょう。',
            checklist: ['1つ目: コードスキャン。', '2つ目: INVENTORY > CODES で装備。', '3つ目: NORMALハックで流れを作る。'],
            hint: '開始を押せばそのまま進められます。'
          }
        ];
      }
      return [
        {
          title: '환영합니다',
          goal: '첫 루프: 코드 확보 → 장착 → NORMAL 해킹',
          text: 'HCSiG는 서버를 뚫어 크레딧을 벌고, 장비를 키워 다음 도전에 올라가는 게임입니다. 코드는 스캔, 해킹, 데이터 타워, ZERO-DAY에서 쓰는 해킹 장비라고 생각하면 됩니다.',
          checklist: ['코드는 당신의 핵심 장비입니다.', '크레딧으로 성장과 보급을 진행합니다.', '에너지는 60초마다 1칸 회복되고, 최대 20칸까지 찹니다.'],
          hint: '다음을 누르면 가장 안전한 첫 진행 루트부터 안내합니다.'
        },
        {
          title: '1. 코드 스캔',
          goal: '첫 코드를 확보하세요',
          text: 'HOME에서 코드 스캔 버튼을 누르세요. 스캔은 에너지 1을 사용하고 소량의 EXP를 줍니다.',
          checklist: ['새 코드는 INVENTORY > CODES에 저장됩니다.', '이미 가진 코드는 새 복사본 대신 조각이 됩니다.', '에너지가 0이면 60초를 기다리면 1칸이 돌아옵니다.'],
          hint: '안내창은 아래로 물러납니다. 지금 코드 스캔을 누르거나, 다음으로 넘겨도 됩니다.',
          waitAction: 'scan'
        },
        {
          title: '2. 활성 코드 선택',
          goal: '사용할 코드를 하나 고르세요',
          text: 'INVENTORY > CODES로 이동해 보유 코드 하나를 선택하세요. 활성 코드는 해킹과 데이터 타워에서 실제로 사용되는 현재 장비입니다.',
          checklist: ['파워가 높을수록 바로 체감이 납니다.', '지금은 활성 코드 하나만 정하면 충분합니다.', '동기화와 진화는 나중에 배워도 됩니다.'],
          hint: '안내창이 화면 조작을 막지 않습니다. 코드 카드를 누르거나, 다음으로 넘겨도 됩니다.',
          waitAction: 'selectCode'
        },
        {
          title: '3. 서버 해킹',
          goal: 'NORMAL 해킹 1회를 시도하세요',
          text: 'HOME으로 돌아와 NORMAL을 유지하고, 지금 입장 가능한 서버를 고른 뒤 서버 해킹 버튼을 누르세요.',
          checklist: ['NORMAL은 초반에 가장 안정적입니다.', '서버 이름 옆 요구 레벨을 만족하면 지금 들어갈 수 있습니다.', '성공하면 크레딧과 EXP를 얻습니다.'],
          hint: 'NORMAL을 유지하고 서버 해킹을 눌러보세요. 읽기만 하려면 다음으로 넘겨도 됩니다.',
          waitAction: 'hack'
        },
        {
          title: '4. EVENT와 초보자 룰렛',
          goal: '매일 받을 수 있는 무료 보상을 기억하세요',
          text: 'EVENT에는 시즌 PASS와 WEEKLY CHALLENGE가 있습니다. 신규 계정은 여기에 더해 10일 동안 매일 1회 무료로 받는 초보자 룰렛도 사용할 수 있습니다.',
          checklist: ['PASS는 월간 시즌 진행입니다.', 'WEEKLY CHALLENGE는 매주 월요일 05:00 KST에 갱신됩니다.', '초보자 룰렛은 첫 10일 동안의 일일 무료 보상입니다.'],
          hint: '첫 해킹이 끝나면 EVENT도 한 번 확인해보세요.'
        },
        {
          title: '5. 해킹 난이도',
          goal: '처음에는 NORMAL만 생각해도 충분합니다',
          text: 'NORMAL이 기본 모드입니다. RISK는 성공률을 낮추는 대신 보상을 키우고, EXTREME은 계정이 더 성장한 뒤 열리는 고난도 선택입니다.',
          checklist: ['처음에는 NORMAL을 추천합니다.', '성공률에 여유가 생기면 RISK를 써도 됩니다.', '초반에는 EXTREME을 신경 쓰지 않아도 됩니다.'],
          hint: '지금 목표는 위험한 고점이 아니라, 안정적인 첫 승리입니다.'
        },
        {
          title: '6. CPU와 GPU',
          goal: '두 성장 축의 역할만 정확히 구분하세요',
          text: 'CPU는 해킹을 더 안정적으로 만들고, GPU는 반복 플레이와 고난도 보상의 효율을 키웁니다.',
          checklist: ['CPU는 안정감과 제어에 좋습니다.', 'GPU는 후반 보상 효율에서 빛납니다.', '초반에는 CPU 1~2단계가 체감이 큰 편입니다.'],
          hint: '무엇부터 올릴지 모르겠다면 초반에는 CPU가 가장 무난합니다.'
        },
        {
          title: '7. 코드 성장',
          goal: '주력 코드 하나를 먼저 키우세요',
          text: '코드 성장에는 순서가 있습니다. ① 강화(크레딧 → PWR +5) → ② 동기화(중복 조각 → 해킹 보정) → ③ 진화(Lv.5+ → 등급 상승) → ④ 지원 아이템(ROM 안정화, 보호권, PICK 조율) 순서입니다. INVENTORY > CODES의 코드 상세에서 각 단계와 현재 진행도를 한눈에 확인할 수 있습니다.',
          checklist: ['① 강화: 크레딧으로 PWR을 올리는 기본 성장입니다.', '② 동기화: 중복 조각으로 해킹 성공률 보정을 높입니다. 초반에는 먼저 안 해도 됩니다.', '③ 진화: Lv.5 이상에서 등급이 오르고 PWR이 크게 상승합니다. 후반 목표입니다.', '④ 지원 아이템: ROM은 PWR +3, 보호권은 실패 보호, PICK 조율은 시즌 PICK 전용입니다.'],
          hint: '여러 코드를 조금씩보다 한 코드를 ①②③ 순서대로 키우는 것이 초반에는 가장 효율적입니다.'
        },
        {
          title: '8. SHOP',
          goal: '막혔을 때만 필요한 보급을 챙기세요',
          text: 'SHOP은 보급소입니다. 에너지가 부족하거나 흐름이 끊길 때, 지금 필요한 문제만 해결하는 식으로 쓰면 충분합니다.',
          checklist: ['에너지 아이템은 세션을 이어가기 좋습니다.', '시스템/유틸 아이템은 도전을 부드럽게 만듭니다.', '구매 전에 일일 제한을 확인하세요.'],
          hint: '모든 아이템을 살 필요는 없습니다. 지금 막힌 이유를 푸는 물건만 사면 됩니다.'
        },
        {
          title: '9. LAB과 데이터 타워',
          goal: '장기 도전이 어디에 있는지만 먼저 알아두세요',
          text: 'LAB은 긴 호흡의 콘텐츠를 여는 곳입니다. 데이터 타워는 100층 구성이라 첫날에 끝내는 콘텐츠가 아닙니다.',
          checklist: ['데이터 타워는 장기 목표입니다.', '성장한 뒤 다시 와도 전혀 늦지 않습니다.', '처음에는 해킹 루프부터 익혀도 충분합니다.'],
          hint: '처음 며칠은 기본 해킹에 익숙해지고, 그 다음 천천히 올라가세요.'
        },
        {
          title: '10. ZERO-DAY DISCOVERY',
          goal: '누르기 전에 어떤 모드인지 정도만 알고 가세요',
          text: 'ZERO-DAY DISCOVERY는 LAB의 짧은 타임어택 모드입니다. 패치 바가 차기 전에 데이터를 주입하고, 끊기기 전에 회수해 보상을 챙깁니다.',
          checklist: ['짧고 집중력이 필요한 사이드 모드입니다.', '끊기기 전에 회수하면 보상을 지킬 수 있습니다.', '기본 해킹이 익숙해질 때까지 미뤄도 괜찮습니다.'],
          hint: '첫 숙제가 아니라, 나중에 열어보는 도전 모드라고 생각하면 됩니다.'
        },
        {
          title: '11. LIST, 더보기, 클라우드',
          goal: '기록과 계정 기능 위치를 기억하세요',
          text: 'LIST에는 미션과 업적이 있습니다. 더보기에는 LIVE NET, 설정, 클라우드 계정, 크레딧, 설명서, 튜토리얼 다시 보기가 있습니다.',
          checklist: ['클라우드 저장이 가장 안전한 저장 경로입니다.', 'LIVE NET과 로그는 방금 무슨 일이 있었는지 설명합니다.', '이 가이드는 더보기에서 언제든 다시 열 수 있습니다.'],
          hint: '계속 플레이할 생각이라면 클라우드 로그인을 먼저 해두는 편이 안전합니다.'
        },
        {
          title: '12. 준비 완료',
          goal: '추천 첫 진행 순서',
          text: '코드를 스캔하고 장착한 뒤, NORMAL 해킹으로 크레딧을 모으고, EVENT에서 초보자 룰렛을 챙긴 뒤 코드와 CPU를 강화하세요.',
          checklist: ['첫째: 코드 스캔.', '둘째: INVENTORY > CODES에서 장착.', '셋째: NORMAL 서버 해킹으로 흐름 만들기.'],
          hint: '시작하기를 누르면 바로 플레이할 수 있습니다.'
        }
      ];
    }

    const DAY_MS = 24 * 60 * 60 * 1000;
    const KST_WEEK_RESET_OFFSET_MS = 4 * 60 * 60 * 1000; // UTC + 9h, then 05:00 KST reset.
    function getResetLogicalDate(ms = Date.now()) {
      return new Date(ms + KST_WEEK_RESET_OFFSET_MS);
    }
    function getDayKey(ms = Date.now()) {
      const d = getResetLogicalDate(ms);
      return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
    }
    function getKstWeeklyStartMs(ms = Date.now()) {
      const logical = new Date(ms + KST_WEEK_RESET_OFFSET_MS);
      const day = logical.getUTCDay();
      const mondayOffset = (day + 6) % 7;
      return Date.UTC(logical.getUTCFullYear(), logical.getUTCMonth(), logical.getUTCDate()) - mondayOffset * DAY_MS;
    }
    function getWeekKey() {
      const start = new Date(getKstWeeklyStartMs());
      return `${start.getUTCFullYear()}-${String(start.getUTCMonth() + 1).padStart(2, '0')}-${String(start.getUTCDate()).padStart(2, '0')}`;
    }
    function getNextWeeklyResetMs(ms = Date.now()) {
      return getKstWeeklyStartMs(ms) + (7 * DAY_MS) - KST_WEEK_RESET_OFFSET_MS;
    }
    function getMonthKey(ms = Date.now()) {
      const d = getResetLogicalDate(ms);
      return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
    }

    const weeklyChallengeDefs = [
      { id:'weekly_hack_any_10', pool:'normal', type:'hackSuccess', target:10, score:100, credits:220, tokens:1, titleKo:'서버 해킹 10회 성공', titleEn:'Hack 10 servers', descKo:'모드와 서버 제한 없이 해킹 성공을 누적합니다.', descEn:'Accumulate successful hacks in any mode.' },
      { id:'weekly_scan_15', pool:'normal', type:'scans', target:15, score:100, credits:180, tokens:1, titleKo:'코드 스캔 15회', titleEn:'Scan 15 codes', descKo:'코드 신호를 꾸준히 수집합니다.', descEn:'Gather code signals steadily.' },
      { id:'weekly_tower_clear_5', pool:'normal', type:'stageClears', target:5, score:100, credits:240, tokens:1, titleKo:'데이터 타워 5회 클리어', titleEn:'Clear Data Tower 5 times', descKo:'첫 클리어와 반복 클리어가 모두 반영됩니다.', descEn:'First clears and repeat clears both count.' },
      { id:'weekly_energy_40', pool:'normal', type:'energySpent', target:40, score:100, credits:200, tokens:1, titleKo:'에너지 40 소모', titleEn:'Spend 40 energy', descKo:'스캔, 해킹, 데이터 타워 작전에 사용한 에너지를 집계합니다.', descEn:'Counts energy spent on scans, hacks, and Data Tower.' },
      { id:'weekly_code_upgrade_3', pool:'normal', type:'codeUpgrades', target:3, score:100, credits:220, tokens:1, titleKo:'코드 강화 3회', titleEn:'Upgrade codes 3 times', descKo:'활성 코드 강화가 주간 성장으로 기록됩니다.', descEn:'Active code upgrades count toward weekly growth.' },
      { id:'weekly_bonus_server_3', pool:'normal', type:'bonusServerHack', target:3, score:100, credits:260, tokens:1, titleKo:'이벤트 노드 해킹 3회', titleEn:'Hack the bonus node 3 times', descKo:'이번 주 지정 서버에서 성공을 기록합니다.', descEn:'Score successful hacks against this week’s server.' },
      { id:'weekly_risk_3', pool:'medium', type:'riskHackSuccess', target:3, score:200, credits:420, tokens:2, titleKo:'RISK 성공 3회', titleEn:'Win RISK 3 times', descKo:'RISK 전용 성공만 집계합니다.', descEn:'Only RISK successes count.' },
      { id:'weekly_scan_30', pool:'medium', type:'scans', target:30, score:200, credits:360, tokens:2, titleKo:'코드 스캔 30회', titleEn:'Scan 30 codes', descKo:'긴 신호 탐색 루프를 완주합니다.', descEn:'Complete a longer signal sweep.' },
      { id:'weekly_epic_plus_1', pool:'medium', type:'epicPlus', target:1, score:200, credits:500, tokens:2, titleKo:'EPIC 이상 코드 신호 1회', titleEn:'Find 1 EPIC+ signal', descKo:'EPIC 또는 LEGENDARY 발견을 기록합니다.', descEn:'Find an EPIC or LEGENDARY code.' },
      { id:'weekly_gpu_upgrade_1', pool:'medium', type:'gpuUpgrades', target:1, score:200, credits:420, tokens:2, titleKo:'GPU 업그레이드 1회', titleEn:'Upgrade GPU once', descKo:'반복 보상 라인을 한 단계 끌어올립니다.', descEn:'Boost your repeat-reward pipeline.' },
      { id:'weekly_cpu_upgrade_1', pool:'medium', type:'cpuUpgrades', target:1, score:200, credits:380, tokens:2, titleKo:'CPU 업그레이드 1회', titleEn:'Upgrade CPU once', descKo:'안정성 라인을 한 단계 끌어올립니다.', descEn:'Improve your stability pipeline.' },
      { id:'weekly_code_sync_2', pool:'medium', type:'codeSyncs', target:2, score:200, credits:400, tokens:2, titleKo:'코드 동기화 2회', titleEn:'Sync codes twice', descKo:'중복 조각을 작전 보정으로 전환합니다.', descEn:'Convert duplicate shards into control.' },
      { id:'weekly_tower_chapter_3', pool:'medium', type:'eventChapterClears', target:3, score:200, credits:450, tokens:2, titleKo:'이벤트 챕터 클리어 3회', titleEn:'Clear event chapter 3 times', descKo:'이번 주 지정 데이터 타워 챕터에서 클리어합니다.', descEn:'Clear this week’s Data Tower chapter.' },
      { id:'weekly_shards_8', pool:'medium', type:'shards', target:8, score:200, credits:360, tokens:2, titleKo:'코드 조각 8개 획득', titleEn:'Gain 8 code shards', descKo:'중복 코드에서 얻은 조각을 누적합니다.', descEn:'Collect shards from duplicate codes.' },
      { id:'weekly_extreme_2', pool:'hard', type:'extremeHackSuccess', target:2, score:400, credits:750, tokens:3, titleKo:'EXTREME 성공 2회', titleEn:'Win EXTREME twice', descKo:'EXTREME 전용 성공만 집계합니다.', descEn:'Only EXTREME successes count.' },
      { id:'weekly_all_modes_1', pool:'hard', type:'allModes', target:3, score:400, credits:900, tokens:3, titleKo:'세 난이도 모두 성공', titleEn:'Win all hack modes', descKo:'NORMAL, RISK, EXTREME을 각각 1회 이상 성공합니다.', descEn:'Win NORMAL, RISK, and EXTREME at least once.' },
      { id:'weekly_code_evolve_1', pool:'hard', type:'codeEvolves', target:1, score:400, credits:850, tokens:3, titleKo:'코드 진화 1회', titleEn:'Evolve a code once', descKo:'주간 빌드의 핵심 코드를 승급합니다.', descEn:'Rank up a core weekly build code.' },
      { id:'weekly_tower_first_2', pool:'hard', type:'stageFirstClears', target:2, score:400, credits:780, tokens:3, titleKo:'데이터 타워 첫 클리어 2회', titleEn:'First-clear 2 Data Tower stages', descKo:'아직 클리어하지 않은 구간을 새로 돌파합니다.', descEn:'Break through two uncleared tower stages.' },
      { id:'weekly_extreme_or_risk_8', pool:'hard', type:'riskExtremeSuccess', target:8, score:400, credits:700, tokens:3, titleKo:'고난도 해킹 성공 8회', titleEn:'Win 8 high-risk hacks', descKo:'RISK와 EXTREME 성공을 함께 집계합니다.', descEn:'RISK and EXTREME wins both count.' },
      { id:'weekly_high_power_loop', pool:'hard', type:'actions', target:60, score:400, credits:650, tokens:3, titleKo:'작전 행동 60회', titleEn:'Run 60 operations', descKo:'스캔과 해킹을 중심으로 작전 행동을 누적합니다.', descEn:'Accumulate scan and hack operation actions.' }
    ];

    function hashString(input) {
      let h = 0;
      const str = String(input || '');
      for (let i = 0; i < str.length; i += 1) {
        h = ((h << 5) - h) + str.charCodeAt(i);
        h |= 0;
      }
      return Math.abs(h);
    }

    function localizeWeekly(def, field) {
      const en = getLang() === 'en';
      if (field === 'title') return en ? def.titleEn : def.titleKo;
      if (field === 'desc') return en ? def.descEn : def.descKo;
      return '';
    }

    function getWeeklyEvent() {
      const weekKey = getWeekKey();
      const seed = hashString(`event:${weekKey}`);
      const server = servers[seed % servers.length] || servers[0];
      const chapter = (seed % 10) + 1;
      const nodeLabels = ['ALPHA NODE', 'BETA TRACE', 'DELTA CACHE', 'OMEGA LINK', 'VAULT ROUTE'];
      return {
        weekKey,
        serverId: server && server.id,
        serverName: server ? localizeServerName(server) : 'LOCAL NODE',
        chapter,
        label: nodeLabels[seed % nodeLabels.length]
      };
    }

    // PROGRESS 난이도 4종 정의
    // v3.0.0: PROGRESS 난이도 — 스펙 기준 picks 3/4/5/6, 보상 배율 0.75/1.0/1.25/1.5
    const PROGRESS_TIERS = {
      foundation: {
        id: 'foundation', ko: '기초', en: 'Foundation',
        desc: '입문용 구성. 쉬운 목표 위주로 주간 루틴을 익힙니다.',
        descEn: 'Beginner config. Focus on easy goals to learn the weekly routine.',
        picks: { normal: 3, medium: 0, hard: 0 }, // 총 3개
        rewardMult: 0.75
      },
      apprentice: {
        id: 'apprentice', ko: '견습', en: 'Apprentice',
        desc: '기본+중급 혼합. 균형 잡힌 주간 도전입니다.',
        descEn: 'Normal+Medium mix. A balanced weekly challenge.',
        picks: { normal: 2, medium: 2, hard: 0 }, // 총 4개
        rewardMult: 1.0
      },
      advanced: {
        id: 'advanced', ko: '심화', en: 'Advanced',
        desc: '중급+고급 위주. 고점수를 노릴 수 있습니다.',
        descEn: 'Medium+Hard focus. Aim for higher scores.',
        picks: { normal: 1, medium: 2, hard: 2 }, // 총 5개
        rewardMult: 1.25
      },
      expert: {
        id: 'expert', ko: '전문가', en: 'Expert',
        desc: '전문가 구성. 고급 목표 중심의 고난도 주간 도전.',
        descEn: 'Expert config. Hard-goal-heavy weekly challenge.',
        picks: { normal: 0, medium: 3, hard: 3 }, // 총 6개
        rewardMult: 1.5
      }
    };

    function getProgressTier() {
      const key = (state.weeklyChallenge && state.weeklyChallenge.progressTierCurrent) || 'foundation';
      return PROGRESS_TIERS[key] || PROGRESS_TIERS.foundation;
    }

    function getQueuedProgressTier() {
      const key = state.weeklyChallenge && state.weeklyChallenge.progressTierNext;
      return PROGRESS_TIERS[key] || null;
    }

    function setProgressTier(tierId) {
      if (!PROGRESS_TIERS[tierId]) return;
      ensureWeeklyChallengeDefaults();
      const wc = state.weeklyChallenge;
      if ((wc.progressTierCurrent || 'foundation') === tierId) {
        wc.progressTierNext = null;
        showToast(getLang() === 'en' ? 'Current weekly difficulty will stay the same.' : '현재 주간 난이도를 유지합니다.', 'system');
      } else {
        wc.progressTierNext = tierId;
        const tier = PROGRESS_TIERS[tierId];
        showToast(getLang() === 'en' ? `Next reset: ${tier.en}` : `다음 리셋 적용: ${tier.ko}`, 'achievement');
      }
      scheduleSilentSave();
      renderWeeklyPanel();
    }

    function getWeeklyGoalsForWeek(weekKey = getWeekKey()) {
      function pick(pool, count) {
        return weeklyChallengeDefs
          .filter(def => def.pool === pool)
          .sort((a, b) => hashString(`${weekKey}:${pool}:${a.id}`) - hashString(`${weekKey}:${pool}:${b.id}`))
          .slice(0, count);
      }
      const tier = getProgressTier();
      const p = tier.picks;
      return [...pick('normal', p.normal), ...pick('medium', p.medium), ...pick('hard', p.hard)];
    }

    function ensureWeeklyChallengeDefaults() {
      state.items = state.items || {};
      state.items.energyPack = state.items.energyPack || 0;
      state.items.weeklyToken = state.items.weeklyToken || 0;
      state.items.coin = state.items.coin || 0;
      state.items.oneDay = state.items.oneDay || 0;
      state.weeklyChallenge = state.weeklyChallenge || {};
      const wc = state.weeklyChallenge;
      wc.progress = wc.progress && typeof wc.progress === 'object' ? wc.progress : {};
      wc.claimed = wc.claimed && typeof wc.claimed === 'object' ? wc.claimed : {};
      wc.badges = wc.badges && typeof wc.badges === 'object' ? wc.badges : {};
      wc.score = Math.max(0, Math.round(Number(wc.score || 0)));
      wc.bonusClaimed = !!wc.bonusClaimed;
      wc.progressTierCurrent = PROGRESS_TIERS[wc.progressTierCurrent] ? wc.progressTierCurrent : 'foundation';
      wc.progressTierNext = PROGRESS_TIERS[wc.progressTierNext] ? wc.progressTierNext : null;
      const weekKey = getWeekKey();
      if (wc.weekKey !== weekKey) {
        if (wc.progressTierNext && PROGRESS_TIERS[wc.progressTierNext]) {
          wc.progressTierCurrent = wc.progressTierNext;
          wc.progressTierNext = null;
        }
        wc.weekKey = weekKey;
        wc.progress = {};
        wc.claimed = {};
        wc.bonusClaimed = false;
        wc.score = 0;
      }
      state.ui = state.ui || {};
      state.ui.weeklyFilter = ['all', 'incomplete', 'complete'].includes(state.ui.weeklyFilter) ? state.ui.weeklyFilter : 'incomplete';
    }

    function getWeeklyProgress() {
      ensureWeeklyChallengeDefaults();
      return state.weeklyChallenge.progress;
    }

    function incrementWeeklyValue(key, amount = 1) {
      const progress = getWeeklyProgress();
      progress[key] = Math.max(0, Math.round(Number(progress[key] || 0) + Number(amount || 0)));
    }

    function markWeeklyMode(mode) {
      const progress = getWeeklyProgress();
      progress.modes = progress.modes && typeof progress.modes === 'object' ? progress.modes : {};
      progress.modes[normalizeHackMode(mode)] = true;
    }

    function getWeeklyGoalValue(def) {
      const progress = getWeeklyProgress();
      if (def.type === 'allModes') {
        const modes = progress.modes || {};
        return ['normal', 'risk', 'extreme'].filter(mode => modes[mode]).length;
      }
      return Math.max(0, Math.round(Number(progress[def.type] || 0)));
    }

    function isWeeklyGoalComplete(def) {
      return getWeeklyGoalValue(def) >= def.target;
    }

    function getSelectedWeeklyGoal(goalId) {
      return getWeeklyGoalsForWeek().find(def => def.id === goalId) || null;
    }

    function trackWeeklyChallenge(type, payload = {}) {
      ensureWeeklyChallengeDefaults();
      const event = getWeeklyEvent();
      let changed = false;
      const add = (key, amount = 1) => {
        incrementWeeklyValue(key, amount);
        changed = true;
      };
      if (type === 'energy_spent') add('energySpent', payload.amount || 0);
      if (type === 'scan') {
        add('scans');
        add('actions');
        if (payload.rarity === 'EPIC' || payload.rarity === 'LEGENDARY') add('epicPlus');
        if (payload.shards) add('shards', payload.shards);
      }
      if (type === 'hack_success') {
        const mode = normalizeHackMode(payload.mode || 'normal');
        add('hackSuccess');
        add('actions');
        markWeeklyMode(mode);
        if (mode === 'risk') add('riskHackSuccess');
        if (mode === 'extreme') add('extremeHackSuccess');
        if (mode === 'risk' || mode === 'extreme') add('riskExtremeSuccess');
        if (payload.serverId && payload.serverId === event.serverId) add('bonusServerHack');
      }
      if (type === 'stage_clear') {
        add('stageClears');
        if (payload.firstClear) add('stageFirstClears');
        if (Number(payload.chapter) === event.chapter) add('eventChapterClears');
      }
      if (type === 'cpu_upgrade') add('cpuUpgrades');
      if (type === 'gpu_upgrade') add('gpuUpgrades');
      if (type === 'code_upgrade') add('codeUpgrades');
      if (type === 'code_sync') add('codeSyncs');
      if (type === 'code_evolve') add('codeEvolves');
      if (changed) {
        renderWeeklyPanel();
        scheduleSilentSave();
      }
    }

    function formatWeeklyCountdown() {
      const remain = Math.max(0, getNextWeeklyResetMs() - Date.now());
      const days = Math.floor(remain / DAY_MS);
      const hours = Math.floor((remain % DAY_MS) / (60 * 60 * 1000));
      const mins = Math.floor((remain % (60 * 60 * 1000)) / (60 * 1000));
      if (getLang() === 'en') return `${days}d ${hours}h ${mins}m`;
      return `${days}일 ${hours}시간 ${mins}분`;
    }

    // v3.0.0: pool 기준 패스 포인트 (스펙: 일반 80, 중간 140, 어려움 240)
    const WEEKLY_PASS_POINTS_BY_POOL = { normal: 80, medium: 140, hard: 240 };

    function claimWeeklyGoal(goalId) {
      ensureWeeklyChallengeDefaults();
      const def = getSelectedWeeklyGoal(goalId);
      if (!def || state.weeklyChallenge.claimed[def.id] || !isWeeklyGoalComplete(def)) return;
      state.weeklyChallenge.claimed[def.id] = true;

      // v3.0.0: PROGRESS 난이도 보상 배율 적용
      const tier = getProgressTier();
      const mult = tier.rewardMult || 1.0;

      const credits = Math.max(1, Math.round((def.credits || 0) * mult));
      const tokens  = Math.max(0, Math.round((def.tokens || 0) * mult));
      const score   = Math.max(0, Math.round((def.score || 0) * mult));
      // pool 기준 패스 포인트 × 난이도 배율
      const basePP  = def.passPoints || WEEKLY_PASS_POINTS_BY_POOL[def.pool] || 80;
      const pp      = Math.max(1, Math.round(basePP * mult));

      state.weeklyChallenge.score = (state.weeklyChallenge.score || 0) + score;
      state.credits += credits;
      state.stats.creditsEarnedTotal = (state.stats.creditsEarnedTotal || 0) + credits;
      state.items.weeklyToken = (state.items.weeklyToken || 0) + tokens;
      addPassPoints(pp);
      state.stats.weeklyGoalClaimCount = (state.stats.weeklyGoalClaimCount || 0) + 1;
      playSfx('achievement');
      const title = localizeWeekly(def, 'title');
      log(`[WEEKLY CLAIM] ${title} (+${score} score, +${tokens} token, +${credits} credits, +${pp}pp · ${tier.ko || tier.id} ×${mult})`, 'system');
      showToast(`WEEKLY CLAIM: ${title}`, 'achievement');
      emitActivity('weekly_goal_claimed', { value: score, refId: def.id });
      renderWeeklyPanel();
      updateStatsUI();
      saveGame(true);
    }

    function claimWeeklyBonus() {
      ensureWeeklyChallengeDefaults();
      const goals = getWeeklyGoalsForWeek();
      const allClaimed = goals.every(def => state.weeklyChallenge.claimed[def.id]);
      if (!allClaimed || state.weeklyChallenge.bonusClaimed) return;
      const weekKey = state.weeklyChallenge.weekKey;
      state.weeklyChallenge.bonusClaimed = true;

      // v3.0.0: 올클리어 보너스 — 400pp + PROGRESS 난이도 배율
      const tier = getProgressTier();
      const mult = tier.rewardMult || 1.0;
      const score = Math.max(0, Math.round(700 * mult));
      const tokens = Math.max(1, Math.round(5 * mult));
      const pp = Math.max(1, Math.round(400 * mult));

      state.weeklyChallenge.score = (state.weeklyChallenge.score || 0) + score;
      state.weeklyChallenge.badges[weekKey] = {
        id: `weekly-${weekKey}`,
        title: `WEEKLY OPS ${weekKey}`,
        claimedAt: Date.now()
      };
      state.stats.weeklyAllClearCount = (state.stats.weeklyAllClearCount || 0) + 1;
      state.items.weeklyToken = (state.items.weeklyToken || 0) + tokens;
      addPassPoints(pp);
      state.stats.weeklyGoalClaimCount = (state.stats.weeklyGoalClaimCount || 0) + 1;
      playSfx('achievement');
      log(`[WEEKLY ALL CLEAR] ${weekKey} (+${score} score, Weekly Token +${tokens}, +${pp}pp · ${tier.ko || tier.id} ×${mult})`, 'system');
      showToast(getLang() === 'en' ? 'Weekly all clear badge acquired' : '주간 올클리어 배지 획득', 'achievement');
      emitActivity('weekly_all_clear', { value: 700, refId: weekKey });
      renderWeeklyPanel();
      updateStatsUI();
      saveGame(true);
    }

    function renderProgressTierSelector() {
      const el = document.getElementById('progressTierSelector');
      if (!el) return;
      const currentTier = getProgressTier();
      const queuedTier = getQueuedProgressTier();
      const isEn = getLang() === 'en';
      el.innerHTML = `
        <div class="progress-tier-header">
          <span class="badge">PROGRESS</span>
          <strong>${isEn ? 'Weekly Difficulty' : '주간 난이도'}</strong>
          <span class="progress-tier-note">${queuedTier
            ? (isEn ? `Next reset → ${queuedTier.en}` : `다음 리셋 → ${queuedTier.ko}`)
            : (isEn ? `Current → ${currentTier.en}` : `현재 → ${currentTier.ko}`)}</span>
        </div>
        <div class="progress-tier-grid">
          ${Object.values(PROGRESS_TIERS).map(tier => {
            const totalPicks = (tier.picks.normal||0) + (tier.picks.medium||0) + (tier.picks.hard||0);
            const isCurrent = tier.id === currentTier.id;
            const isQueued = queuedTier && tier.id === queuedTier.id;
            return `
            <button type="button" class="progress-tier-btn ${isCurrent ? 'active' : ''} ${isQueued ? 'queued' : ''}"
              data-progress-tier="${tier.id}">
              <strong>${isEn ? tier.en : tier.ko}${isCurrent ? (isEn ? ' · CURRENT' : ' · 현재') : ''}${isQueued ? (isEn ? ' · NEXT' : ' · 다음') : ''}</strong>
              <span>${isEn ? tier.descEn : tier.desc}</span>
              <span class="progress-tier-picks">${isEn ? 'Goals' : '목표'} ${totalPicks} · ${isEn ? 'Reward' : '보상'} ×${tier.rewardMult || 1.0}</span>
            </button>
          `;}).join('')}
        </div>
      `;
    }

    function renderWeeklyPanel() {
      const goalList = document.getElementById('weeklyGoalList');
      const bonusCard = document.getElementById('weeklyBonusCard');
      if (!goalList || !bonusCard) return;
      ensureWeeklyChallengeDefaults();
      renderProgressTierSelector();
      const goals = getWeeklyGoalsForWeek();
      const claimedCount = goals.filter(def => state.weeklyChallenge.claimed[def.id]).length;
      const completeCount = goals.filter(isWeeklyGoalComplete).length;
      const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
      };
      setText('weeklyCountdown', formatWeeklyCountdown());
      setText('weeklyProgressText', `${claimedCount} / ${goals.length}`);
      setText('weeklyScore', String(state.weeklyChallenge.score || 0));
      setText('weeklyTokenCount', String((state.items && state.items.weeklyToken) || 0));
      const event = getWeeklyEvent();
      const eventNode = document.getElementById('weeklyEventNode');
      if (eventNode) {
        eventNode.textContent = `WEEKLY OPS ACTIVE · NEW CHALLENGE DEPLOYED · BONUS NODE ${event.label}: ${event.serverName} · DATA TOWER CH.${event.chapter}`;
      }
      const filter = state.ui.weeklyFilter || 'incomplete';
      document.querySelectorAll('[data-weekly-filter]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.weeklyFilter === filter);
      });

      goalList.innerHTML = '';
      goals.forEach(def => {
        const value = getWeeklyGoalValue(def);
        const complete = value >= def.target;
	        const claimed = !!state.weeklyChallenge.claimed[def.id];
	        if (filter === 'incomplete' && claimed) return;
	        if (filter === 'complete' && !complete && !claimed) return;
        const card = document.createElement('article');
        card.className = `weekly-goal-card ${complete ? 'is-complete' : ''} ${claimed ? 'is-claimed' : ''}`;
        const pct = Math.max(0, Math.min(100, Math.round((Math.min(value, def.target) / def.target) * 100)));
        card.innerHTML = `
          <div class="weekly-goal-main">
            <div class="weekly-goal-top">
              <span class="badge">${def.pool.toUpperCase()}</span>
              <strong>${localizeWeekly(def, 'title')}</strong>
            </div>
            <p>${localizeWeekly(def, 'desc')}</p>
            <div class="weekly-progress-line"><span style="width:${pct}%"></span></div>
            <div class="weekly-goal-meta">${Math.min(value, def.target)} / ${def.target} · +${def.score} SCORE · +${def.credits} CR · TOKEN +${def.tokens}</div>
          </div>
        `;
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = claimed ? 'CLAIMED' : 'CLAIM';
        button.disabled = claimed || !complete;
        button.addEventListener('click', () => claimWeeklyGoal(def.id));
        card.appendChild(button);
        goalList.appendChild(card);
      });
      if (!goalList.children.length) {
        const empty = document.createElement('div');
        empty.className = 'weekly-empty';
        empty.textContent = filter === 'incomplete'
          ? (getLang() === 'en' ? 'No unclaimed weekly goals.' : '수령 대기 중인 주간 목표가 없습니다.')
          : (getLang() === 'en' ? 'No weekly goals in this filter.' : '이 필터에 표시할 주간 목표가 없습니다.');
        goalList.appendChild(empty);
      }

      const allClaimed = goals.every(def => state.weeklyChallenge.claimed[def.id]);
      const bonusClaimed = !!state.weeklyChallenge.bonusClaimed;
      bonusCard.innerHTML = `
        <div>
          <span class="badge">BONUS</span>
          <h4>${getLang() === 'en' ? 'Weekly All Clear' : '주간 올클리어'}</h4>
          <p>${getLang() === 'en' ? 'Claim all five goals to unlock the weekly badge.' : '기본 목표 5개를 모두 CLAIM하면 주간 배지가 열립니다.'}</p>
          <strong>${completeCount} COMPLETE · ${claimedCount} CLAIMED · +700 SCORE · TOKEN +5</strong>
        </div>
      `;
      const bonusButton = document.createElement('button');
      bonusButton.type = 'button';
      bonusButton.textContent = bonusClaimed ? 'BADGE CLAIMED' : 'CLAIM BONUS';
      bonusButton.disabled = bonusClaimed || !allClaimed;
      bonusButton.addEventListener('click', claimWeeklyBonus);
      bonusCard.appendChild(bonusButton);
    }

    function renderEventPanel() {
      const eventEl = document.getElementById('eventModal');
      if (!eventEl) return;
      // Tab switching for PASS vs WEEKLY is handled by existing tab logic
      // Just ensure pass panel is rendered when switching
      try { renderPassPanel(); } catch(e) {}
    }

    function ensureTutorialDefaults() {
      state.tutorial = state.tutorial || {};
      if (state.tutorial.version !== TUTORIAL_VERSION) {
        state.tutorial.version = TUTORIAL_VERSION;
        state.tutorial.completed = false;
        state.tutorial.seen = false;
        state.tutorial.step = 0;
      }
      if (typeof state.tutorial.completed !== 'boolean') state.tutorial.completed = false;
      if (!Number.isInteger(state.tutorial.step)) state.tutorial.step = 0;
      if (state.tutorial.step < 0) state.tutorial.step = 0;
      const tutorialSteps = getTutorialSteps();
      if (state.tutorial.step >= tutorialSteps.length) state.tutorial.step = tutorialSteps.length - 1;
      if (typeof state.tutorial.seen !== 'boolean') state.tutorial.seen = false;
    }

    function isTutorialOpen() {
      return !!(tutorialBackdrop && tutorialBackdrop.classList.contains('show'));
    }

    function renderTutorial() {
      if (!tutorialBackdrop) return;
      ensureTutorialDefaults();
      const tutorialSteps = getTutorialSteps();
      const idx = Math.min(Math.max(0, state.tutorial.step || 0), tutorialSteps.length - 1);
      const step = tutorialSteps[idx];
      setNodeText(tutorialStepLabel, `STEP ${idx + 1} / ${tutorialSteps.length}`);
      setNodeText(tutorialStepTitle, step.title);
      setNodeText(tutorialStepGoal, step.goal || '');
      setNodeText(tutorialStepText, step.text);
      setNodeText(tutorialStepHint, step.hint || '');
      if (tutorialStepChecklist) {
        tutorialStepChecklist.textContent = '';
        const items = Array.isArray(step.checklist) ? step.checklist : [];
        if (items.length) {
          const list = document.createElement('ul');
          list.className = 'tutorial-checklist-list';
          items.forEach(item => {
            const li = document.createElement('li');
            const marker = document.createElement('span');
            marker.className = 'tutorial-check-marker';
            marker.textContent = '✓';
            const text = document.createElement('span');
            text.textContent = item;
            li.appendChild(marker);
            li.appendChild(text);
            list.appendChild(li);
          });
          tutorialStepChecklist.appendChild(list);
        }
        setNodeDisplay(tutorialStepChecklist, items.length ? '' : 'none');
      }
      setNodeText(btnTutorialPrev, getLang() === 'en' ? 'Back' : '이전');
      setNodeText(btnTutorialNext, getLang() === 'en' ? 'Next' : '다음');
      setNodeText(btnTutorialFinish, getLang() === 'en' ? 'Start' : '시작하기');
      const interactive = !!step.waitAction;
      setNodeText(btnTutorialSkip, interactive ? (getLang() === 'en' ? 'Close guide' : '닫고 플레이') : (getLang() === 'en' ? 'Skip' : '건너뛰기'));
      setNodeDisplay(tutorialStepGoal, step.goal ? '' : 'none');
      setNodeDisplay(tutorialStepHint, step.hint ? '' : 'none');
      tutorialBackdrop.classList.toggle('interactive', interactive);
      document.body.classList.toggle('tutorial-interactive', interactive && isTutorialOpen());
      setNodeDisabled(btnTutorialPrev, idx <= 0);
      const waiting = interactive && step.requireAction === true;
      setNodeDisplay(btnTutorialNext, idx === tutorialSteps.length - 1 ? 'none' : '');
      setNodeDisabled(btnTutorialNext, waiting);
      setNodeDisplay(btnTutorialFinish, idx === tutorialSteps.length - 1 ? '' : 'none');
    }

    // 튜토리얼 버튼 하이라이트
    const TUTORIAL_HIGHLIGHT_MAP = {
      scan:       ['btnScan'],
      selectCode: ['appViewCodes', 'appMainNav [data-main-view="codes"]'],
      hack:       ['btnHack']
    };

    function applyTutorialHighlight(step) {
      document.querySelectorAll('.tutorial-highlight').forEach(el => el.classList.remove('tutorial-highlight'));
      if (!step || !step.waitAction) return;
      const targets = TUTORIAL_HIGHLIGHT_MAP[step.waitAction] || [];
      targets.forEach(sel => {
        try {
          const el = document.getElementById(sel) || document.querySelector(sel);
          if (el) el.classList.add('tutorial-highlight');
        } catch(e) {}
      });
    }

    function openTutorial(forceRestart = false) {
      state.tutorial = state.tutorial || {};
      ensureTutorialDefaults();
      const isReplay = forceRestart && state.tutorial.seen;
      if (forceRestart) {
        state.tutorial.step = 0;
        state.tutorial.completed = false;
      }
      state.tutorial.seen = true;
      if (tutorialBackdrop) {
        tutorialBackdrop.classList.add('show');
        tutorialBackdrop.classList.remove('interactive');
        tutorialBackdrop.setAttribute('aria-hidden', 'false');
        // 재보기 글리치 효과
        if (isReplay) {
          tutorialBackdrop.classList.add('tutorial-glitch');
          setTimeout(() => tutorialBackdrop && tutorialBackdrop.classList.remove('tutorial-glitch'), 700);
        }
      }
      document.body.classList.add('tutorial-open');
      document.body.classList.remove('tutorial-interactive');
      tutorialOpenedOnce = true;
      renderTutorial();
      const steps = getTutorialSteps();
      const idx = Math.min(Math.max(0, state.tutorial.step || 0), steps.length - 1);
      applyTutorialHighlight(steps[idx]);
      saveGame(true);
    }

    function closeTutorial(markCompleted = false) {
      if (!tutorialBackdrop) return;
      if (markCompleted) {
        state.tutorial.completed = true;
        state.tutorial.seen = true;
        state.tutorial.version = TUTORIAL_VERSION;
        state.tutorial.step = getTutorialSteps().length - 1;
      }
      tutorialBackdrop.classList.remove('show');
      tutorialBackdrop.classList.remove('interactive');
      tutorialBackdrop.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('tutorial-open');
      document.body.classList.remove('tutorial-interactive');
      saveGame(true);
    }

    function nextTutorialStep() {
      ensureTutorialDefaults();
      const tutorialSteps = getTutorialSteps();
      if (state.tutorial.step < tutorialSteps.length - 1) {
        state.tutorial.step += 1;
        renderTutorial();
        applyTutorialHighlight(tutorialSteps[state.tutorial.step]);
        saveGame(true);
      }
    }

    function prevTutorialStep() {
      ensureTutorialDefaults();
      if (state.tutorial.step > 0) {
        state.tutorial.step -= 1;
        const tutorialSteps = getTutorialSteps();
        renderTutorial();
        applyTutorialHighlight(tutorialSteps[state.tutorial.step]);
      }
    }

    function onTutorialAction(action) {
      if (!isTutorialOpen()) return;
      ensureTutorialDefaults();
      const step = getTutorialSteps()[state.tutorial.step || 0];
      if (step && step.waitAction === action) nextTutorialStep();
    }

    function maybeStartTutorial() {
      ensureTutorialDefaults();
      if (!tutorialOpenedOnce && !state.tutorial.completed && !state.tutorial.seen) {
        openTutorial(false);
      }
    }

    function normalizeHackMode(mode) {
      if (mode === 'risk' || mode === 'extreme' || mode === 'normal') return mode;
      return state.riskMode ? 'risk' : 'normal';
    }

    function getHackModeInfo(mode = state.hackMode) {
      const current = normalizeHackMode(mode);
      if (current === 'extreme') {
        return {
          id: 'extreme',
          label: 'EXTREME',
          minLevel: 5,
          chancePenalty: 0.35,
          creditMultiplier: 3,
          expMultiplier: 1.5,
          failEnergyPenalty: 2,
          hintKo: 'EXTREME: Lv.5+, 성공률 -35%p, 크레딧 ×3, EXP ×1.5, 실패 시 에너지 추가 -2',
          hintEn: 'EXTREME: Lv.5+, success -35%p, credits ×3, EXP ×1.5, failure costs +2 energy'
        };
      }
      if (current === 'risk') {
        return {
          id: 'risk',
          label: 'RISK',
          minLevel: 1,
          chancePenalty: 0.15,
          creditMultiplier: 2,
          expMultiplier: 1,
          failEnergyPenalty: 1,
          hintKo: 'RISK: 성공률 -15%p, 크레딧 ×2, 실패 시 에너지 추가 -1',
          hintEn: 'RISK: success -15%p, credits ×2, failure costs +1 energy'
        };
      }
      return {
        id: 'normal',
        label: 'NORMAL',
        minLevel: 1,
        chancePenalty: 0,
        creditMultiplier: 1,
        expMultiplier: 1,
        failEnergyPenalty: 0,
        hintKo: 'NORMAL: 안정적인 기본 해킹 모드',
        hintEn: 'NORMAL: stable default hacking mode'
      };
    }

    function renderHackModeUI() {
      state.hackMode = normalizeHackMode(state.hackMode);
      if (state.hackMode === 'extreme' && state.level < 5) state.hackMode = 'risk';
      hackModeButtons.forEach(btn => {
        const mode = btn.dataset.hackMode || 'normal';
        const locked = mode === 'extreme' && state.level < 5;
        btn.classList.toggle('active', mode === state.hackMode);
        btn.disabled = locked;
        btn.title = locked
          ? (getLang() === 'en' ? 'Unlocks at Lv.5' : 'Lv.5 이상에서 해금됩니다.')
          : getHackModeInfo(mode)[getLang() === 'en' ? 'hintEn' : 'hintKo'];
      });
      const info = getHackModeInfo();
      if (hackModeHint) hackModeHint.textContent = getLang() === 'en' ? info.hintEn : info.hintKo;
      if (chkRiskMode) chkRiskMode.checked = state.hackMode === 'risk';
    }

    // ── v3.0.1: 보상/행동 가능 상태 헬퍼 ────────────────────────────────────
    function isWeeklyBonusClaimable() {
      try {
        ensureWeeklyChallengeDefaults();
        const goals = getWeeklyGoalsForWeek();
        if (!goals.length) return false;
        const allClaimed = goals.every(def => state.weeklyChallenge.claimed && state.weeklyChallenge.claimed[def.id]);
        return allClaimed && !state.weeklyChallenge.bonusClaimed;
      } catch(e) { return false; }
    }

    function hasUnclaimedPassTiers() {
      try {
        ensureSeasonState();
        const currentTier = state.season.passTier || 0;
        if (currentTier < 1) return false;
        const claimed = state.season.passClaimed || {};
        for (let i = 1; i <= currentTier; i++) {
          if (!claimed[String(i)]) return true;
        }
        return false;
      } catch(e) { return false; }
    }

    function updateHeaderGlow() {
      try {
        ensureMissionResets();
        const prog = state.missionProgress.daily || {};
        // stub 미션 제외하여 실제 클리어 가능한 미션 수만 카운트 (#19 fix)
        const incompleteDailyCount = missionDefs.daily
          ? missionDefs.daily.filter(def => !def.stub && (!prog.completed || !prog.completed[def.id])).length
          : 0;

        // PASS 티어 보상은 PASS 버튼으로 분리 (#19 fix)
        const eventRewardReady = isWeeklyBonusClaimable();
        const passRewardReady  = hasUnclaimedPassTiers();

        const btnListEl  = document.getElementById('btnList');
        const btnEventEl = document.getElementById('btnEvent');
        const btnPassEl  = document.getElementById('btnPass');

        // LIST 버튼 — 일일 미션 남음 (action 필요)
        if (btnListEl) btnListEl.classList.toggle('header-glow-action', incompleteDailyCount > 0);

        // EVENT 버튼 — 위클리 보너스 수령 가능할 때만 (#19 fix: PASS 티어는 제외)
        if (btnEventEl) btnEventEl.classList.toggle('header-glow-reward', eventRewardReady);

        // PASS 버튼 — 미수령 패스 티어 있음 (#19 fix)
        if (btnPassEl) btnPassEl.classList.toggle('header-glow-reward', passRewardReady);

        // TODAY 박스 글로우
        const todayBox = document.getElementById('todaySummaryBox');
        if (todayBox) {
          todayBox.classList.toggle('today-has-actions', incompleteDailyCount > 0);
          todayBox.classList.toggle('today-all-done', incompleteDailyCount === 0);
        }
      } catch(e) { console.warn('[HeaderGlow]', e); }
    }

    // ── v3.0.1: HOME "오늘 할 일" 요약 ──────────────────────────────────────
    function renderTodaySummary() {
      const el = document.getElementById('todaySummaryContent');
      if (!el) return;
      try {
        ensureMissionResets();
        const prog = state.missionProgress.daily || {};
        // stub 미션 제외 (#19 관련: 실제 클리어 가능한 미션 수만 카운트)
        const completedCount = missionDefs.daily
          ? missionDefs.daily.filter(def => !def.stub && prog.completed && prog.completed[def.id]).length
          : 0;
        const totalCount = missionDefs.daily ? missionDefs.daily.filter(def => !def.stub).length : 0;

        const weeklyProg = state.weeklyChallenge || {};
        const weeklyGoals = Array.isArray(weeklyProg.goals) ? weeklyProg.goals : [];
        const weeklyLeft = weeklyGoals.filter(g => !g.done).length;
        const seasonInfo = getSeasonPhaseInfo();

        const energyCurrent = state.energy || 0;
        const energyMax = state.energyMax || 20;
        const energyFull = energyCurrent >= energyMax;
        const packCount = (state.items && state.items.energyPack) || 0;

        const items = [];

        // 에너지
        const energyLabel = `${t('todayEnergy')} ${energyCurrent}/${energyMax}${packCount > 0 ? ` · ${t('todayEnergyPack')} ×${packCount}` : ''}`;
        items.push({ cls: energyFull ? 'today-item today-item-ok' : 'today-item', text: energyLabel });

        // 일일 미션
        const missionsLabel = `${t('todayDailyMissions')} ${completedCount}/${totalCount} ${t('todayComplete')}`;
        const missionsOk = completedCount >= totalCount;
        items.push({ cls: missionsOk ? 'today-item today-item-ok' : 'today-item today-item-action', text: missionsLabel });

        // 주간 목표 (남은 게 있을 때만)
        if (weeklyLeft > 0) {
          items.push({ cls: 'today-item today-item-action', text: `${t('todayWeeklyGoals')} ${weeklyLeft} ${t('todayRemaining')}` });
        }

        items.push({
          cls: seasonInfo.state === 'active' ? 'today-item today-item-ok' : 'today-item today-item-action',
          text: seasonInfo.todaySummary
        });

        el.innerHTML = items.map(item =>
          `<div class="${item.cls}"><span class="today-item-text">${item.text}</span></div>`
        ).join('');
      } catch(e) { console.warn('[TodaySummary]', e); }
    }

    // ── v3.0.1: INVENTORY → ITEMS 패널 ──────────────────────────────────────
    function renderItemsPanel() {
      const el = document.getElementById('itemsContent');
      if (!el) return;
      try {
        ensureReleaseRewardDefaults();
        ensureZeroDayDefaults();
        const energyPack = (state.items && state.items.energyPack) || 0;
        const coin = (state.items && state.items.coin) || 0;
        const weeklyToken = (state.items && state.items.weeklyToken) || 0;
        const dailyBonusBox = (state.items && state.items.dailyBonusBox) || 0;
        const rom = (state.items && state.items.rom) || 0;
        const codeProtection = (state.items && state.items.codeProtection) || 0;
        const pickResidualData = (state.items && state.items.pickResidualData) || 0;
        const oneDay = (state.items && state.items.oneDay) || 0;
        const vuln = (state.items && state.items.zeroDayVulnerability) || 0;
        const vulnShard = (state.items && state.items.zeroDayVulnerabilityShard) || 0;
        const traceAmple = (state.items && state.items.traceAmple) || 0;
        const nullSeed = (state.items && state.items.nullSeed) || 0;
        const activeCode = ensureCodeSupportState(getActiveCodeInstance());
        const activeRun = state.zeroDay && state.zeroDay.pve && state.zeroDay.pve.active;
        const canUsePack = energyPack > 0 && state.energy < state.energyMax;
        const useLabel = getLang() === 'en' ? 'Use' : (getLang() === 'ja' ? '使用' : '사용');
        const openLabel = langText('열기', 'Open', '開封');
        const stabilizeLabel = langText('안정화', 'Stabilize', '安定化');
        const protectLabel = langText('적용', 'Apply', '適用');
        const infuseLabel = langText('주입', 'Infuse', '注入');
        const dampLabel = langText('완화', 'Dampen', '緩和');
        const delayLabel = langText('지연', 'Delay', '遅延');
        function itemExtendHtml(key) {
          const meta = getExtendMeta(getExtendItemKind(key));
          if (!meta) return '';
          const label = getLang() === 'en' ? meta.en : getLang() === 'ja' ? meta.ja : meta.ko;
          return `<div class="item-card-extend">FLOW · ${label}</div>${getItemSourceHtml(key)}`;
        }
        const canStabilize = !!activeCode && rom >= 5 && (activeCode.romLevel || 0) < 5;
        const canProtect = !!activeCode && codeProtection > 0 && (activeCode.protectionCharges || 0) < 3;
        const canTunePick = !!activeCode && isSeasonPickCode(activeCode) && pickResidualData > 0 && (activeCode.pickTuneLevel || 0) < 10;
        const canUseTrace = !!activeRun && traceAmple >= 25 && (activeRun.trace || 0) > 0.01;
        const diffDef = activeRun ? (ZD_DISC_DIFFICULTIES[activeRun.diff] || ZD_DISC_DIFFICULTIES.easy) : null;
        const canUseNull = !!activeRun && nullSeed >= 10 && diffDef && getZdPatch(activeRun, diffDef) > 0.03;
        const stateText = {
          ready: langText('사용 가능', 'Ready', '使用可能'),
          stored: langText('보관 중', 'Stored', '保管中'),
          needs: langText('준비 필요', 'Needs context', '準備必要'),
          currency: langText('보유 재화', 'Held currency', '保有通貨'),
          empty: langText('없음', 'Empty', 'なし')
        };
        function itemStateMeta(opts) {
          const count = Number(opts && opts.count) || 0;
          if (opts && opts.currency) return { label: stateText.currency, className: 'item-state-currency' };
          if (opts && opts.ready) return { label: stateText.ready, className: 'item-state-ready' };
          if (count > 0) {
            return {
              label: opts && opts.blockedLabel ? opts.blockedLabel : stateText.stored,
              className: opts && opts.blockedLabel ? 'item-state-needs' : 'item-state-stored'
            };
          }
          return { label: stateText.empty, className: 'item-state-empty' };
        }
        const energyPackState = itemStateMeta({ count: energyPack, ready: canUsePack });
        const dailyBoxState = itemStateMeta({ count: dailyBonusBox, ready: dailyBonusBox > 0 });
        const codeProtectionState = itemStateMeta({ count: codeProtection, ready: canProtect, blockedLabel: stateText.needs });
        const coinState = itemStateMeta({ currency: true });
        const tokenState = itemStateMeta({ currency: true });
        const oneDayState = itemStateMeta({ currency: true });
        const romState = itemStateMeta({ count: rom, ready: canStabilize, blockedLabel: stateText.needs });
        const vulnState = itemStateMeta({ currency: true });
        const vulnShardState = itemStateMeta({ currency: true });
        const traceState = itemStateMeta({ count: traceAmple, ready: canUseTrace, blockedLabel: stateText.needs });
        const nullSeedState = itemStateMeta({ count: nullSeed, ready: canUseNull, blockedLabel: stateText.needs });
        const pickResidualState = itemStateMeta({ count: pickResidualData, ready: canTunePick, blockedLabel: stateText.needs });

        // AUTO-RUN 상태 계산
        ensureAutoRunDefaults();
        resetAutoRunDaily();
        const ar = state.autoRun;
        const activeType = ar.type;   // null | 'scan' | 'hack'
        const scanUsesLeft = Math.max(0, 3 - (ar.dailyScanUses || 0));
        const hackUsesLeft = Math.max(0, 3 - (ar.dailyHackUses || 0));
        const timeLeft = activeType ? getAutoRunTimeLeftStr() : '';

        const scanActive = activeType === 'scan';
        const hackActive = activeType === 'hack';
        const anyActive  = !!activeType;

        // 각 카드 상태별 HTML 생성 함수
        function makeAutoRunCardInner(isThisActive, isPaused, usesLeft, timeLeft) {
          if (isThisActive && !isPaused) {
            // 실행 중
            return `
              <div class="auto-run-timer">${timeLeft}</div>
              <div class="auto-run-tag">${t('autoRunActive')}</div>
              <button type="button" class="auto-run-card-btn auto-run-pause-btn" data-action="pause">
                ${t('autoRunPause')}
              </button>`;
          } else if (isThisActive && isPaused) {
            // 일시 중지 중
            return `
              <div class="auto-run-timer auto-run-timer-paused">${timeLeft}</div>
              <div class="auto-run-tag auto-run-tag-paused">${t('autoRunPaused')}</div>
              <div class="auto-run-pause-row">
                <button type="button" class="auto-run-card-btn auto-run-resume-btn" data-action="resume">
                  ${t('autoRunResume')}
                </button>
                <button type="button" class="auto-run-card-btn auto-run-end-btn" data-action="end">
                  ${t('autoRunEnd')}
                </button>
              </div>`;
          } else {
            // 대기 중 (idle)
            const blocked = anyActive || usesLeft <= 0;
            const startLabel = usesLeft <= 0 ? '—' : (getLang()==='en' ? 'Start' : (getLang()==='ja' ? '開始' : '시작'));
            return `
              <div class="auto-run-uses">${t('autoRunUsesLeft')}: ${usesLeft}</div>
              <button type="button" class="auto-run-card-btn" data-action="start" ${blocked ? 'disabled' : ''}>
                ${startLabel}
              </button>`;
          }
        }

        const scanInner = makeAutoRunCardInner(scanActive, ar.paused, scanUsesLeft, timeLeft);
        const hackInner = makeAutoRunCardInner(hackActive, ar.paused, hackUsesLeft, timeLeft);

        el.innerHTML = `
          <div class="items-section-title">${t('itemsConsumables')}</div>
          <div class="items-grid">
            <div class="item-card">
              <div class="item-card-name">${t('todayEnergyPack')}</div>
              ${itemExtendHtml('energyPack')}
              <div class="item-card-state ${energyPackState.className}">${energyPackState.label}</div>
              <div class="item-card-count">×${energyPack}</div>
              <button type="button" class="item-card-btn" id="itemsBtnUseEnergyPack" ${canUsePack ? '' : 'disabled'}>${useLabel}</button>
            </div>
            <div class="item-card">
              <div class="item-card-name">Daily Bonus Box</div>
              ${itemExtendHtml('dailyBonusBox')}
              <div class="item-card-state ${dailyBoxState.className}">${dailyBoxState.label}</div>
              <div class="item-card-count">×${dailyBonusBox}</div>
              <button type="button" class="item-card-btn" id="itemsBtnOpenDailyBox" ${dailyBonusBox > 0 ? '' : 'disabled'}>${openLabel}</button>
            </div>
            <div class="item-card">
              <div class="item-card-name">${langText('코드 보호권', 'Code Protection', 'コード保護券')}</div>
              ${itemExtendHtml('codeProtection')}
              <div class="item-card-state ${codeProtectionState.className}">${codeProtectionState.label}</div>
              <div class="item-card-count">×${codeProtection}</div>
              <button type="button" class="item-card-btn" id="itemsBtnUseCodeProtection" ${canProtect ? '' : 'disabled'}>${protectLabel}</button>
            </div>
          </div>
          <div class="items-section-title">${t('itemsCurrency')}</div>
          <div class="items-grid">
            <div class="item-card">
              <div class="item-card-name">COIN</div>
              ${itemExtendHtml('coin')}
              <div class="item-card-state ${coinState.className}">${coinState.label}</div>
              <div class="item-card-count">×${coin}</div>
            </div>
            <div class="item-card">
              <div class="item-card-name">TOKEN</div>
              <div class="item-card-state ${tokenState.className}">${tokenState.label}</div>
              <div class="item-card-count">×${weeklyToken}</div>
            </div>
            <div class="item-card">
              <div class="item-card-name">OneDay</div>
              ${itemExtendHtml('oneDay')}
              <div class="item-card-state ${oneDayState.className}">${oneDayState.label}</div>
              <div class="item-card-count">×${oneDay}</div>
            </div>
            <div class="item-card">
              <div class="item-card-name">ROM</div>
              ${itemExtendHtml('rom')}
              <div class="item-card-state ${romState.className}">${romState.label}</div>
              <div class="item-card-count">×${rom}</div>
              <button type="button" class="item-card-btn" id="itemsBtnUseRom" ${canStabilize ? '' : 'disabled'}>${stabilizeLabel}</button>
            </div>
            <div class="item-card">
              <div class="item-card-name">${t('vulnerability')}</div>
              ${itemExtendHtml('zeroDayVulnerability')}
              <div class="item-card-state ${vulnState.className}">${vulnState.label}</div>
              <div class="item-card-count">×${vuln}</div>
            </div>
            <div class="item-card">
              <div class="item-card-name">${t('vulnerabilityShard')}</div>
              ${itemExtendHtml('zeroDayVulnerabilityShard')}
              <div class="item-card-state ${vulnShardState.className}">${vulnShardState.label}</div>
              <div class="item-card-count">×${vulnShard}</div>
            </div>
          </div>
          <div class="items-section-title">${t('timeSwapLabel')}</div>
          <div class="items-grid">
            ${['2h','5h','10h'].map(v => {
              const cnt = (state.items && state.items['timeSwap'+v]) || 0;
              const canUse = cnt > 0;
              const useLabel = getLang() === 'en' ? 'Use' : (getLang() === 'ja' ? '使用' : '사용');
              const swapState = itemStateMeta({ count: cnt });
              return `<div class="item-card">
                <div class="item-card-name">${t('timeSwap'+v)}</div>
                ${itemExtendHtml('timeSwap'+v)}
                <div class="item-card-state ${swapState.className}">${swapState.label}</div>
                <div class="item-card-count">×${cnt}</div>
                <button type="button" class="item-card-btn" data-ts-variant="${v}" ${canUse ? '' : 'disabled'}>${useLabel}</button>
              </div>`;
            }).join('')}
          </div>
          <div class="items-section-title">${t('itemsGrowth')}</div>
          <div class="items-grid">
            <div class="item-card">
              <div class="item-card-name">${t('traceAmpleLabel')}</div>
              ${itemExtendHtml('traceAmple')}
              <div class="item-card-state ${traceState.className}">${traceState.label}</div>
              <div class="item-card-count">×${traceAmple}</div>
              <button type="button" class="item-card-btn" id="itemsBtnUseTraceAmple" ${canUseTrace ? '' : 'disabled'}>${dampLabel}</button>
            </div>
            <div class="item-card">
              <div class="item-card-name">${t('nullSeedLabel')}</div>
              ${itemExtendHtml('nullSeed')}
              <div class="item-card-state ${nullSeedState.className}">${nullSeedState.label}</div>
              <div class="item-card-count">×${nullSeed}</div>
              <button type="button" class="item-card-btn" id="itemsBtnUseNullSeed" ${canUseNull ? '' : 'disabled'}>${delayLabel}</button>
            </div>
            <div class="item-card">
              <div class="item-card-name">${langText('PICK 잔류 데이터', 'PICK Residual Data', 'PICK残留データ')}</div>
              ${itemExtendHtml('pickResidualData')}
              <div class="item-card-state ${pickResidualState.className}">${pickResidualState.label}</div>
              <div class="item-card-count">×${pickResidualData}</div>
              <button type="button" class="item-card-btn" id="itemsBtnUsePickResidual" ${canTunePick ? '' : 'disabled'}>${infuseLabel}</button>
            </div>
          </div>
          <div class="items-section-title">${t('autoRunLabel')}</div>
          <div class="auto-run-grid">
            <div class="auto-run-card${scanActive ? (ar.paused ? ' auto-run-paused-state' : ' auto-run-active') : ''}" data-ar-type="scan">
              <div class="auto-run-card-name">${t('autoScanLabel')}</div>
              <div class="auto-run-card-cost">10 COIN</div>
              <div class="auto-run-card-info">10s · 1h · 3/day</div>
              ${scanInner}
            </div>
            <div class="auto-run-card${hackActive ? (ar.paused ? ' auto-run-paused-state' : ' auto-run-active') : ''}" data-ar-type="hack">
              <div class="auto-run-card-name">${t('autoHackLabel')}</div>
              <div class="auto-run-card-cost">15 COIN</div>
              <div class="auto-run-card-info">20s · 30m · 3/day</div>
              ${hackInner}
            </div>
          </div>
          <div class="items-coming-note small">${langText(
            '· ITEMS는 보유 자산 허브입니다. 각 아이템은 사용 가능 / 보관 중 / 준비 필요 상태로 표시됩니다.<br/>· Daily Bonus Box는 즉시 개봉 보상, ROM은 활성 CODE 안정화, 코드 보호권은 실패 보호 충전, PICK 잔류 데이터는 시즌 PICK 조율에 사용됩니다.<br/>· TRACE 앰플과 NULL 시드는 ZERO-DAY DISCOVERY 런 안에서만 사용할 수 있습니다.',
            '· ITEMS is your asset hub. Every item shows whether it is ready, stored, or still needs context.<br/>· Daily Bonus Box opens instantly, ROM stabilizes the active CODE, Code Protection adds a failure safeguard charge, and PICK Residual Data tunes season PICKs.<br/>· TRACE Ample and NULL Seed can only be used during ZERO-DAY DISCOVERY runs.',
            '· ITEMSは保有資産ハブです。各アイテムは使用可能 / 保管中 / 準備必要の状態で表示されます。<br/>· Daily Bonus Boxは即時開封、ROMはアクティブCODE安定化、コード保護券は失敗保護チャージ、PICK残留データはシーズンPICK調律に使用されます。<br/>· TRACEアンプルとNULL SeedはZERO-DAY DISCOVERYラン中のみ使用できます。'
          )}</div>
        `;

        const useBtn = el.querySelector('#itemsBtnUseEnergyPack');
        if (useBtn) {
          useBtn.addEventListener('click', () => {
            const mainBtn = document.getElementById('btnUseEnergyPack');
            if (mainBtn) mainBtn.click();
            setTimeout(() => renderItemsPanel(), 50);
          });
        }
        el.querySelector('#itemsBtnOpenDailyBox')?.addEventListener('click', openDailyBonusBox);
        el.querySelector('#itemsBtnUseRom')?.addEventListener('click', useRomOnActiveCode);
        el.querySelector('#itemsBtnUseCodeProtection')?.addEventListener('click', useCodeProtection);
        el.querySelector('#itemsBtnUsePickResidual')?.addEventListener('click', usePickResidualData);
        el.querySelector('#itemsBtnUseTraceAmple')?.addEventListener('click', useTraceAmple);
        el.querySelector('#itemsBtnUseNullSeed')?.addEventListener('click', useNullSeed);

        // 타임 스와프 버튼 이벤트
        el.querySelectorAll('[data-ts-variant]').forEach(btn => {
          btn.addEventListener('click', () => {
            const variant = btn.getAttribute('data-ts-variant');
            useTimeSwap(variant);
          });
        });

        // AUTO-RUN 버튼 이벤트 (data-action / data-ar-type 방식)
        el.querySelectorAll('.auto-run-card [data-action]').forEach(btn => {
          btn.addEventListener('click', () => {
            const action = btn.getAttribute('data-action');
            const card = btn.closest('[data-ar-type]');
            const type = card ? card.getAttribute('data-ar-type') : null;
            if (action === 'start')  startAutoRun(type);
            if (action === 'pause')  pauseAutoRun();
            if (action === 'resume') resumeAutoRun();
            if (action === 'end')    stopAutoRun();
          });
        });
      } catch(e) { console.warn('[ItemsPanel]', e); }
    }

    // ────────────────────────────────────────────────
    // AUTO-RUN 시스템
    // ────────────────────────────────────────────────

    function ensureAutoRunDefaults() {
      if (!state.autoRun) {
        state.autoRun = { type: null, endsAt: 0, paused: false, pausedTimeLeft: 0, dailyScanUses: 0, dailyHackUses: 0, lastResetDay: null };
      }
      if (state.autoRun.dailyScanUses === undefined) state.autoRun.dailyScanUses = 0;
      if (state.autoRun.dailyHackUses === undefined) state.autoRun.dailyHackUses = 0;
      if (state.autoRun.lastResetDay === undefined) state.autoRun.lastResetDay = null;
      if (state.autoRun.endsAt === undefined) state.autoRun.endsAt = 0;
      if (state.autoRun.type === undefined) state.autoRun.type = null;
      if (state.autoRun.paused === undefined) state.autoRun.paused = false;
      if (state.autoRun.pausedTimeLeft === undefined) state.autoRun.pausedTimeLeft = 0;
    }

    function resetAutoRunDaily() {
      ensureAutoRunDefaults();
      const dayKey = getDayKey();
      if (state.autoRun.lastResetDay !== dayKey) {
        state.autoRun.dailyScanUses = 0;
        state.autoRun.dailyHackUses = 0;
        state.autoRun.lastResetDay = dayKey;
      }
    }

    function getAutoRunTimeLeftStr() {
      ensureAutoRunDefaults();
      if (!state.autoRun.type) return '';
      const msLeft = state.autoRun.paused
        ? Math.max(0, state.autoRun.pausedTimeLeft)
        : Math.max(0, state.autoRun.endsAt - Date.now());
      const totalSec = Math.ceil(msLeft / 1000);
      const m = Math.floor(totalSec / 60);
      const s = totalSec % 60;
      return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    }

    function startAutoRun(type) {
      ensureAutoRunDefaults();
      resetAutoRunDaily();

      if (autoRunIntervalId !== null) {
        log(t('autoRunAlreadyActive'), 'system');
        showToast(t('autoRunAlreadyActive'), 'warn');
        return;
      }

      const MAX_DAILY = 3;
      const COST_SCAN = 10;
      const COST_HACK = 15;
      const DURATION_SCAN_MS = 60 * 60 * 1000;  // 1시간
      const DURATION_HACK_MS = 30 * 60 * 1000;  // 30분
      const INTERVAL_SCAN_MS = 10 * 1000;        // 10초
      const INTERVAL_HACK_MS = 20 * 1000;        // 20초

      if (type === 'scan') {
        if (state.autoRun.dailyScanUses >= MAX_DAILY) {
          log(t('autoRunDailyLimit'), 'system');
          showToast(t('autoRunDailyLimit'), 'warn');
          return;
        }
        const coin = (state.items && state.items.coin) || 0;
        if (coin < COST_SCAN) {
          log(t('autoRunNoCoin') + ` (필요: ${COST_SCAN} COIN, 보유: ${coin})`, 'system');
          showToast(t('autoRunNoCoin'), 'warn');
          return;
        }
        state.items.coin -= COST_SCAN;
        state.stats.coinSpentTotal = (state.stats.coinSpentTotal || 0) + COST_SCAN;
        state.autoRun.dailyScanUses++;
        state.autoRun.type = 'scan';
        state.autoRun.endsAt = Date.now() + DURATION_SCAN_MS;
        autoRunIntervalId = setInterval(() => autoRunTick(), INTERVAL_SCAN_MS);
        log(t('autoRunStartScan'), 'system');
        showToast(t('autoRunStartScan'), 'system');

      } else if (type === 'hack') {
        if (state.autoRun.dailyHackUses >= MAX_DAILY) {
          log(t('autoRunDailyLimit'), 'system');
          showToast(t('autoRunDailyLimit'), 'warn');
          return;
        }
        const coin = (state.items && state.items.coin) || 0;
        if (coin < COST_HACK) {
          log(t('autoRunNoCoin') + ` (필요: ${COST_HACK} COIN, 보유: ${coin})`, 'system');
          showToast(t('autoRunNoCoin'), 'warn');
          return;
        }
        state.items.coin -= COST_HACK;
        state.stats.coinSpentTotal = (state.stats.coinSpentTotal || 0) + COST_HACK;
        state.autoRun.dailyHackUses++;
        state.autoRun.type = 'hack';
        state.autoRun.endsAt = Date.now() + DURATION_HACK_MS;
        autoRunIntervalId = setInterval(() => autoRunTick(), INTERVAL_HACK_MS);
        log(t('autoRunStartHack'), 'system');
        showToast(t('autoRunStartHack'), 'system');
      }

      updateStatsUI();
      saveGame();
    }

    function pauseAutoRun() {
      ensureAutoRunDefaults();
      if (!state.autoRun.type || state.autoRun.paused) return;
      if (autoRunIntervalId !== null) {
        clearInterval(autoRunIntervalId);
        autoRunIntervalId = null;
      }
      state.autoRun.pausedTimeLeft = Math.max(0, state.autoRun.endsAt - Date.now());
      state.autoRun.paused = true;
      updateStatsUI();
      saveGame();
    }

    function resumeAutoRun() {
      ensureAutoRunDefaults();
      if (!state.autoRun.type || !state.autoRun.paused) return;
      const INTERVAL_SCAN_MS = 10 * 1000;
      const INTERVAL_HACK_MS = 20 * 1000;
      state.autoRun.endsAt = Date.now() + (state.autoRun.pausedTimeLeft || 0);
      state.autoRun.paused = false;
      state.autoRun.pausedTimeLeft = 0;
      const interval = state.autoRun.type === 'scan' ? INTERVAL_SCAN_MS : INTERVAL_HACK_MS;
      autoRunIntervalId = setInterval(() => autoRunTick(), interval);
      updateStatsUI();
      saveGame();
    }

    function stopAutoRun(reason) {
      if (autoRunIntervalId !== null) {
        clearInterval(autoRunIntervalId);
        autoRunIntervalId = null;
      }
      ensureAutoRunDefaults();
      const prevType = state.autoRun.type;
      state.autoRun.type = null;
      state.autoRun.endsAt = 0;
      state.autoRun.paused = false;
      state.autoRun.pausedTimeLeft = 0;
      if (prevType) {
        const msg = reason !== undefined ? reason : t('autoRunStopped');
        if (msg) {
          log(msg, 'system');
          showToast(msg, 'system');
        }
      }
      updateStatsUI();
      saveGame();
    }

    function autoRunTick() {
      ensureAutoRunDefaults();
      if (!state.autoRun.type) { stopAutoRun(null); return; }
      if (Date.now() >= state.autoRun.endsAt) { stopAutoRun(t('autoRunEnded')); return; }

      const type = state.autoRun.type;
      const energyCost = type === 'scan' ? 1 : 2;

      // 에너지 부족 시 에너지 팩 자동 사용
      if (state.energy < energyCost) {
        const packCount = (state.items && state.items.energyPack) || 0;
        if (packCount > 0) {
          state.items.energyPack = packCount - 1;
          state.energy = state.energyMax;
          state.energyTimerMs = 0;
          state.stats.energyPacksUsed = (state.stats.energyPacksUsed || 0) + 1;
          log(getLang() === 'en'
            ? `[AUTO-RUN] Energy depleted — using Energy Pack automatically. (${packCount - 1} remaining)`
            : `[AUTO-RUN] 에너지 소진 — 에너지 팩 자동 사용 (남은 팩: ${packCount - 1}개)`, 'system');
          updateStatsUI();
        } else {
          stopAutoRun(t('autoRunNoEnergy'));
          return;
        }
      }

      if (type === 'scan') {
        if (!scanRunning) scanForCode();
      } else if (type === 'hack') {
        doHack();
      }
    }

    function initAutoRunOnLoad() {
      ensureAutoRunDefaults();
      resetAutoRunDaily();
      // 페이지 새로고침 시 인터벌이 소실됨 → 상태에 따라 처리
      if (state.autoRun.type) {
        if (state.autoRun.paused) {
          // 일시 중지 상태였으면 그대로 유지 (사용자가 재개 가능)
          autoRunIntervalId = null;
        } else {
          // 실행 중이었으면 → 남은 시간이 있으면 일시 중지로 전환, 없으면 종료
          const remaining = state.autoRun.endsAt - Date.now();
          if (remaining > 0) {
            state.autoRun.paused = true;
            state.autoRun.pausedTimeLeft = remaining;
          } else {
            state.autoRun.type = null;
            state.autoRun.endsAt = 0;
            state.autoRun.paused = false;
            state.autoRun.pausedTimeLeft = 0;
          }
          autoRunIntervalId = null;
        }
      }
    }

    // ────────────────────────────────────────────────
    // 타임 스와프
    // ────────────────────────────────────────────────

    function useTimeSwap(variant) {
      // variant: '2h' | '5h' | '10h'
      const hoursMap = { '2h': 2, '5h': 5, '10h': 10 };
      const hours = hoursMap[variant];
      if (!hours) return;
      const itemKey = 'timeSwap' + variant;
      const count = (state.items && state.items[itemKey]) || 0;
      if (count <= 0) { showToast(t('timeSwapNone'), 'warn'); return; }

      ensureAutoRunDefaults();
      const arActive = !!state.autoRun.type;
      const energyFull = state.energy >= state.energyMax;
      const ms = hours * 60 * 60 * 1000;

      if (!arActive && energyFull) {
        showToast(t('timeSwapFull'), 'warn');
        return;
      }

      let useForAutoRun = false;
      if (arActive && !energyFull) {
        // 둘 다 가능 → 선택
        const lang = getLang();
        const msg = lang === 'en'
          ? `Time Swap ${variant} — Choose:\n\n[OK] Extend AUTO-RUN by ${hours}h\n[Cancel] Skip energy recovery (${hours}h)`
          : (lang === 'ja'
            ? `タイムスワップ ${variant} — 選択:\n\n[OK] AUTO-RUNを${hours}時間延長\n[キャンセル] エネルギー回復を${hours}時間短縮`
            : `타임 스와프 ${variant} — 사용 방식 선택:\n\n[확인] AUTO-RUN 시간 +${hours}시간 연장\n[취소] 에너지 회복 대기시간 ${hours}시간 단축`);
        useForAutoRun = window.confirm(msg);
      } else {
        useForAutoRun = arActive;
      }

      state.items[itemKey] = count - 1;

      if (useForAutoRun) {
        if (state.autoRun.paused) {
          state.autoRun.pausedTimeLeft = (state.autoRun.pausedTimeLeft || 0) + ms;
        } else {
          state.autoRun.endsAt += ms;
        }
        const hoursLabel = hours + (getLang() === 'en' ? 'h' : '시간');
        log(`[타임 스와프] AUTO-RUN +${hoursLabel}`, 'system');
        showToast(t('timeSwapExtended'), 'system');
      } else {
        // 에너지 회복 대기시간 단축
        const intervalMs = getEnergyIntervalMs();
        const ticksToGain = Math.floor(ms / intervalMs);
        const energyToGain = Math.min(ticksToGain, state.energyMax - state.energy);
        state.energy = Math.min(state.energyMax, state.energy + energyToGain);
        if (state.energy >= state.energyMax) state.energyTimerMs = 0;
        const gained = energyToGain > 0 ? ` (+${energyToGain})` : '';
        log(`[타임 스와프] 에너지 회복 단축${gained}`, 'system');
        showToast(t('timeSwapEnergySkipped'), 'system');
      }

      updateStatsUI();
      saveGame();
    }

    // ────────────────────────────────────────────────
    // 초보자 한정 룰렛
    // ────────────────────────────────────────────────

    function ensureBeginnerRouletteDefaults() {
      if (!state.beginnerRoulette) {
        state.beginnerRoulette = { firstSeenAt: null, claimedDays: [] };
      }
      if (!Array.isArray(state.beginnerRoulette.claimedDays)) {
        state.beginnerRoulette.claimedDays = [];
      }
    }

    function ensureSupportDefaults() {
      if (!Array.isArray(state.supporterTags)) state.supporterTags = [];
      if (typeof state.items.dailyBonusBox !== 'number') state.items.dailyBonusBox = 0;
    }

    function isBeginnerRouletteActive() {
      ensureBeginnerRouletteDefaults();
      const br = state.beginnerRoulette;
      if (!br.firstSeenAt) return true; // 첫 오픈 시 활성화
      const daysSince = (Date.now() - br.firstSeenAt) / (1000 * 60 * 60 * 24);
      return daysSince < 10 && br.claimedDays.length < 10;
    }

    function canClaimBeginnerRouletteToday() {
      ensureBeginnerRouletteDefaults();
      if (!isBeginnerRouletteActive()) return false;
      const today = getDayKey();
      return !state.beginnerRoulette.claimedDays.includes(today);
    }

    function claimBeginnerRoulette() {
      ensureBeginnerRouletteDefaults();
      if (!canClaimBeginnerRouletteToday()) return null;

      // 최초 수령 시 firstSeenAt 기록
      if (!state.beginnerRoulette.firstSeenAt) {
        state.beginnerRoulette.firstSeenAt = Date.now();
      }

      // 확정 보상: 타임 스와프 2h × 1
      state.items.timeSwap2h = (state.items.timeSwap2h || 0) + 1;

      // 랜덤 추가 보상
      const roll = Math.random();
      let bonusKey = null, bonusAmt = 0, bonusLabel = '';
      if (roll < 0.33) {
        // 33% COIN 1000
        state.items.coin = (state.items.coin || 0) + 1000;
        state.stats.coinEarnedTotal = (state.stats.coinEarnedTotal || 0) + 1000;
        bonusKey = 'coin'; bonusAmt = 1000;
        bonusLabel = 'COIN +1000';
      } else if (roll < 0.33 + 0.12) {
        // 12% TRACE 앰플 125
        state.items.traceAmple = (state.items.traceAmple || 0) + 125;
        bonusKey = 'traceAmple'; bonusAmt = 125;
        bonusLabel = 'TRACE 앰플 +125';
      } else if (roll < 0.33 + 0.12 + 0.20) {
        // 20% 타임 스와프 5h
        state.items.timeSwap5h = (state.items.timeSwap5h || 0) + 1;
        bonusKey = 'timeSwap5h'; bonusAmt = 1;
        bonusLabel = t('timeSwap5h') + ' +1';
      } else if (roll < 0.33 + 0.12 + 0.20 + 0.20) {
        // 20% 타임 스와프 10h
        state.items.timeSwap10h = (state.items.timeSwap10h || 0) + 1;
        bonusKey = 'timeSwap10h'; bonusAmt = 1;
        bonusLabel = t('timeSwap10h') + ' +1';
      } else {
        // 15% NULL 시드 40
        state.items.nullSeed = (state.items.nullSeed || 0) + 40;
        bonusKey = 'nullSeed'; bonusAmt = 40;
        bonusLabel = 'NULL 시드 +40';
      }

      // 오늘 수령 기록
      state.beginnerRoulette.claimedDays.push(getDayKey());

      const result = { guaranteed: t('timeSwap2h') + ' +1', bonus: bonusLabel };
      log(`[룰렛] ${result.guaranteed} + ${result.bonus}`, 'system');
      showToast(`🎰 ${result.guaranteed} / ${result.bonus}`, 'achievement');

      updateStatsUI();
      saveGame();
      return result;
    }

    function renderBeginnerRoulette() {
      const el = document.getElementById('beginnerRouletteMount');
      if (!el) return;
      try {
        ensureBeginnerRouletteDefaults();
        const br = state.beginnerRoulette;
        const active = isBeginnerRouletteActive();
        const canClaim = canClaimBeginnerRouletteToday();
        const claimedCount = br.claimedDays.length;
        const lang = getLang();

        if (!active) {
          el.innerHTML = `<div class="roulette-expired">${t('rouletteExpired')}</div>`;
          return;
        }

        const dayStr = t('rouletteDayCount').replace('{cur}', claimedCount);
        const probTable = lang === 'en'
          ? `<table class="roulette-prob-table"><tr><th>Reward</th><th>Chance</th></tr>
             <tr><td>COIN +1000</td><td>33%</td></tr>
             <tr><td>TRACE Ample +125</td><td>12%</td></tr>
             <tr><td>Time Swap 5h +1</td><td>20%</td></tr>
             <tr><td>Time Swap 10h +1</td><td>20%</td></tr>
             <tr><td>NULL Seed +40</td><td>15%</td></tr></table>`
          : `<table class="roulette-prob-table"><tr><th>보상</th><th>확률</th></tr>
             <tr><td>COIN +1,000</td><td>33%</td></tr>
             <tr><td>TRACE 앰플 +125</td><td>12%</td></tr>
             <tr><td>타임 스와프 5h +1</td><td>20%</td></tr>
             <tr><td>타임 스와프 10h +1</td><td>20%</td></tr>
             <tr><td>NULL 시드 +40</td><td>15%</td></tr></table>`;

        el.innerHTML = `
          <div class="roulette-header">
            <div class="roulette-title">${t('rouletteTitle')}</div>
            <div class="roulette-progress">${dayStr}</div>
          </div>
          <p class="roulette-desc">${t('rouletteDesc')}</p>
          <div class="roulette-guaranteed">
            <span class="roulette-label">${t('rouletteGuaranteed')}</span>
            <span class="roulette-reward">${t('timeSwap2h')} ×1</span>
          </div>
          <div class="roulette-bonus-section">
            <div class="roulette-label">${t('rouletteBonus')}</div>
            ${probTable}
          </div>
          <button type="button" class="roulette-claim-btn${canClaim ? '' : ' disabled'}" id="btnBeginnerRouletteClaim" ${canClaim ? '' : 'disabled'}>
            ${canClaim ? t('rouletteClaim') : t('rouletteAlreadyClaimed')}
          </button>
        `;

        const claimBtn = el.querySelector('#btnBeginnerRouletteClaim');
        if (claimBtn && canClaim) {
          claimBtn.addEventListener('click', () => {
            const result = claimBeginnerRoulette();
            if (result) renderBeginnerRoulette();
          });
        }
      } catch(e) { console.warn('[BeginnerRoulette]', e); }
    }

    // ── SUPPORT DESK: Firebase 함수들 ────────────────────────────────────────

    async function submitSupportClaim(productId, payerName) {
      if (!window.HCSIG_FB || !window.HCSIG_FIREBASE_READY) return { ok: false, err: 'Firebase에 연결되어 있지 않습니다.' };
      const cu = window.HCSIG_CURRENT_USER;
      if (!cu) return { ok: false, err: '로그인이 필요합니다.' };

      const product = SUPPORT_PRODUCTS.find(p => p.id === productId);
      if (!product) return { ok: false, err: '잘못된 상품입니다.' };

      // 동일 상품 처리 중인 신청 확인 (복합 인덱스 회피 → 클라이언트 필터)
      try {
        const existing = await window.HCSIG_FB.db.collection('supportClaims')
          .where('uid', '==', cu.uid)
          .get();
        const active = existing.docs.find(d => {
          const data = d.data();
          return data.productId === productId && ['pending', 'approved', 'code_issued'].includes(data.status);
        });
        if (active) return { ok: false, err: '이미 처리 중인 신청이 있습니다. 내역 탭을 확인해주세요.' };
      } catch(e) { /* 쿼리 실패 시 계속 진행 */ }

      const doc = {
        uid: cu.uid,
        email: cu.email || '',
        productId,
        productName: product.name,
        price: product.price,
        payerName: (payerName || '').trim(),
        status: 'pending',
        submittedAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      };

      try {
        const ref = await window.HCSIG_FB.db.collection('supportClaims').add(doc);
        return { ok: true, claimId: ref.id };
      } catch(e) {
        return { ok: false, err: '신청 저장에 실패했습니다: ' + (e.message || e.code || e) };
      }
    }

    async function loadMyClaims() {
      if (!window.HCSIG_FB || !window.HCSIG_FIREBASE_READY) return [];
      const cu = window.HCSIG_CURRENT_USER;
      if (!cu) return [];
      try {
        // orderBy 생략 → 복합 인덱스 불필요, 클라이언트 정렬
        const snap = await window.HCSIG_FB.db.collection('supportClaims')
          .where('uid', '==', cu.uid)
          .get();
        const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        // submittedAt 내림차순 (Timestamp or null)
        docs.sort((a, b) => {
          const ta = a.submittedAt && a.submittedAt.toMillis ? a.submittedAt.toMillis() : 0;
          const tb = b.submittedAt && b.submittedAt.toMillis ? b.submittedAt.toMillis() : 0;
          return tb - ta;
        });
        return docs;
      } catch(e) {
        console.warn('[loadMyClaims]', e);
        return [];
      }
    }

    async function redeemSupportCode(rawCode) {
      if (!window.HCSIG_FB || !window.HCSIG_FIREBASE_READY) return { ok: false, err: 'Firebase에 연결되어 있지 않습니다.' };
      const cu = window.HCSIG_CURRENT_USER;
      if (!cu) return { ok: false, err: '로그인이 필요합니다.' };

      const code = rawCode.trim().toUpperCase();
      if (!code.startsWith('HCSIG-')) return { ok: false, err: '코드 형식이 올바르지 않습니다. (HCSIG-XXXX-XXXXXX)' };

      try {
        const snap = await window.HCSIG_FB.db.collection('redeemCodes')
          .where('code', '==', code)
          .limit(1)
          .get();
        if (snap.empty) return { ok: false, err: '존재하지 않는 코드입니다.' };

        const docRef = snap.docs[0].ref;
        const data = snap.docs[0].data();

        if (data.status === 'redeemed') return { ok: false, err: '이미 사용된 코드입니다.' };
        if (data.status !== 'active') return { ok: false, err: '현재 사용할 수 없는 코드입니다.' };
        if (data.uid && data.uid !== cu.uid) return { ok: false, err: '이 코드는 다른 계정 전용입니다.' };

        const product = SUPPORT_PRODUCTS.find(p => p.id === data.productId);
        if (!product) return { ok: false, err: '보상 정보를 찾을 수 없습니다. 관리자에게 문의하세요.' };

        // 보상 지급
        state.items.coin         = (state.items.coin         || 0) + (product.rewards.coin         || 0);
        state.items.energyPack   = (state.items.energyPack   || 0) + (product.rewards.energyPack   || 0);
        state.items.dailyBonusBox = (state.items.dailyBonusBox || 0) + (product.rewards.dailyBonusBox || 0);
        state.supporterTags = state.supporterTags || [];
        if (product.tag && !state.supporterTags.includes(product.tag)) {
          state.supporterTags.push(product.tag);
        }

        // Firestore: 코드 사용 완료 표시
        await docRef.update({
          status: 'redeemed',
          redeemedAt: firebase.firestore.FieldValue.serverTimestamp(),
          redeemedByUid: cu.uid,
          redeemedByEmail: cu.email || ''
        });

        // Firestore: 신청 상태 업데이트
        if (data.claimId) {
          try {
            await window.HCSIG_FB.db.collection('supportClaims').doc(data.claimId).update({
              status: 'redeemed',
              updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
          } catch(e2) { /* 선택적 업데이트 — 실패해도 보상은 지급됨 */ }
        }

        // v3.0.2d fix: 실제 결제 보상이므로 즉시 저장 (scheduleSilentSave 대신)
        saveGame(true);
        updateStatsUI();
        return { ok: true, product };
      } catch(e) {
        return { ok: false, err: '코드 처리 중 오류가 발생했습니다: ' + (e.message || e.code || e) };
      }
    }

    // ── SUPPORT DESK 패널 렌더 ────────────────────────────────────────────────

    function tagClassName(tag) {
      return String(tag || 'tag').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'tag';
    }

    function renderSupportPanel(initialSubTab) {
      const el = document.getElementById('supportPanelMount');
      if (!el) return;
      try {
        const lang = getLang();
        const cu = window.HCSIG_CURRENT_USER || null;
        const isLoggedIn = !!cu;

        // 현재 서포터 태그 확인
        const myTags = state.supporterTags || [];

        el.innerHTML = `
          <div class="sd-header">
            <div class="sd-badge">SUPPORT DESK</div>
            <div class="sd-account-row">
              <span class="sd-account-label">${lang === 'en' ? 'Account' : '계정'}:</span>
              <span class="sd-account-value" id="sdAccountValue">${isLoggedIn ? (cu.email || cu.uid) : (lang === 'en' ? '(not logged in)' : '(로그인 전)')}</span>
              ${isLoggedIn ? `<button class="sd-copy-btn" id="btnSdCopyId" title="${lang === 'en' ? 'Copy' : '복사'}">⎘</button>` : ''}
            </div>
            ${myTags.length > 0 ? `<div class="sd-tags-row">${myTags.map(tag => `<span class="sd-tag sd-tag-${tagClassName(tag)}">${tag}</span>`).join('')}</div>` : ''}
          </div>

          <div class="sd-subtab-bar">
            <button class="sd-subtab-btn active" id="btnSupportSubApply"  data-sd-tab="apply" >${lang === 'en' ? 'Apply'   : '신청하기'}</button>
            <button class="sd-subtab-btn"        id="btnSupportSubHistory" data-sd-tab="history">${lang === 'en' ? 'History' : '내역'}</button>
            <button class="sd-subtab-btn"        id="btnSupportSubRedeem"  data-sd-tab="redeem">${lang === 'en' ? 'REDEEM'  : 'REDEEM'}</button>
          </div>

          <!-- 신청하기 탭 -->
          <div class="sd-tab-panel" id="sdTabApply">
            <div class="sd-form-label" style="margin-bottom:6px;">${lang === 'en' ? 'Select Pack' : '상품을 선택하세요'}</div>
            <div class="sd-products" id="sdProductCards">
              ${SUPPORT_PRODUCTS.map((p, i) => `
                <div class="sd-product-card ${i === 0 ? 'sd-product-selected' : ''}" data-pid="${p.id}" role="radio" aria-checked="${i === 0 ? 'true' : 'false'}" tabindex="0">
                  <div class="sd-product-top">
                    <span class="sd-product-name">${p.name}</span>
                    <span class="sd-product-price">${p.price}</span>
                  </div>
                  <div class="sd-product-reward">${lang === 'en' ? p.rewardLabelEn : p.rewardLabel}</div>
                  <div class="sd-product-desc small">${lang === 'en' ? p.descEn : p.desc}</div>
                  <div class="sd-product-check">✓</div>
                </div>
              `).join('')}
            </div>

            <div class="sd-form">
              <div class="sd-form-row">
                <label class="sd-form-label" for="supportPayerName">${lang === 'en' ? 'Payer Name' : '입금자명'}</label>
                <input class="sd-form-input" id="supportPayerName" type="text" maxlength="20"
                  value="${(() => { try { return localStorage.getItem('hcsig_payerName') || ''; } catch(e) { return ''; } })()}"
                  placeholder="${lang === 'en' ? 'Name used for payment' : '결제 시 사용한 이름'}"/>
              </div>
              <div class="sd-form-how small">
                ${lang === 'en'
                  ? '① Select pack above → ② Transfer to the account below → ③ Enter your name → ④ Submit'
                  : '① 위에서 상품 선택 → ② 아래 계좌로 이체 → ③ 입금자명 입력 → ④ 신청 제출'}
              </div>
              <div class="sd-bank-box">
                <span class="sd-bank-label">${lang === 'en' ? 'Payment Account' : '결제 계좌'}</span>
                <span class="sd-bank-value">토스뱅크 1002-3349-0522 조용완</span>
                <button class="sd-bank-copy" id="btnSdBankCopy">복사</button>
              </div>
              ${isLoggedIn
                ? `<button class="sd-submit-btn" id="btnSdSubmit">${lang === 'en' ? 'Submit Claim' : '신청 제출'}</button>`
                : `<div class="sd-login-notice">${lang === 'en' ? '⚠ Please log in first (MORE → Cloud Account)' : '⚠ 먼저 로그인해주세요 (더보기 → 클라우드 계정)'}</div>`}
              <div class="sd-submit-msg" id="sdSubmitMsg"></div>
            </div>
          </div>

          <!-- 내역 탭 -->
          <div class="sd-tab-panel hidden" id="sdTabHistory">
            <div class="sd-history-loading" id="sdHistoryLoading">${lang === 'en' ? 'Loading...' : '불러오는 중...'}</div>
            <div class="sd-history-list" id="sdHistoryList"></div>
          </div>

          <!-- REDEEM 탭 -->
          <div class="sd-tab-panel hidden" id="sdTabRedeem">
            <div class="sd-redeem-desc small">
              ${lang === 'en'
                ? 'When a code is issued (status: code_issued), enter it below to receive your rewards.'
                : '관리자가 코드를 발급하면(상태: code_issued), 아래에 코드를 입력해 보상을 받으세요.'}
            </div>
            <div class="sd-redeem-row">
              <input class="sd-redeem-input" id="sdRedeemInput" type="text"
                placeholder="HCSIG-XXXX-XXXXXX" maxlength="30" autocomplete="off"/>
              <button class="sd-redeem-btn" id="btnSdRedeem">${lang === 'en' ? 'Redeem' : '코드 적용'}</button>
            </div>
            <div class="sd-redeem-msg" id="sdRedeemMsg"></div>
          </div>
        `;

        // ── 계정 복사 버튼 ──────────────────────────────────────────────────
        const copyBtn = el.querySelector('#btnSdCopyId');
        if (copyBtn && isLoggedIn) {
          copyBtn.addEventListener('click', () => {
            const text = cu.email ? `${cu.email} (${cu.uid})` : cu.uid;
            navigator.clipboard.writeText(text).catch(() => {});
            showToast(lang === 'en' ? 'Copied!' : '복사되었습니다.', 'system');
          });
        }

        // ── 상품 카드 클릭 선택 ──────────────────────────────────────────────
        const productCards = el.querySelectorAll('.sd-product-card[data-pid]');
        productCards.forEach(card => {
          const selectCard = () => {
            productCards.forEach(c => {
              c.classList.remove('sd-product-selected');
              c.setAttribute('aria-checked', 'false');
            });
            card.classList.add('sd-product-selected');
            card.setAttribute('aria-checked', 'true');
          };
          card.addEventListener('click', selectCard);
          card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectCard(); } });
        });

        // ── 입금자명 localStorage 자동 저장 (#9) ────────────────────────────
        const payerInput = el.querySelector('#supportPayerName');
        if (payerInput) {
          payerInput.addEventListener('input', () => {
            try { localStorage.setItem('hcsig_payerName', payerInput.value); } catch(e) {}
          });
        }

        // ── 계좌 복사 버튼 ──────────────────────────────────────────────────
        const bankCopyBtn = el.querySelector('#btnSdBankCopy');
        if (bankCopyBtn) {
          bankCopyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText('1002-3349-0522').catch(() => {});
            showToast(lang === 'en' ? 'Account number copied!' : '계좌번호가 복사되었습니다.', 'system');
          });
        }

        // ── Sub-tab 전환 ─────────────────────────────────────────────────────
        const sdTabs = { apply: 'sdTabApply', history: 'sdTabHistory', redeem: 'sdTabRedeem' };
        function switchSdTab(tabId) {
          el.querySelectorAll('.sd-subtab-btn').forEach(b => b.classList.toggle('active', b.dataset.sdTab === tabId));
          el.querySelectorAll('.sd-tab-panel').forEach(p => p.classList.add('hidden'));
          const panel = el.querySelector('#' + (sdTabs[tabId] || 'sdTabApply'));
          if (panel) panel.classList.remove('hidden');
          if (tabId === 'history') loadAndRenderHistory();
        }

        el.querySelectorAll('.sd-subtab-btn').forEach(btn => {
          btn.addEventListener('click', () => switchSdTab(btn.dataset.sdTab));
        });

        // 초기 sub-tab 선택
        if (initialSubTab && sdTabs[initialSubTab]) switchSdTab(initialSubTab);

        // ── 신청 제출 버튼 ───────────────────────────────────────────────────
        const submitBtn = el.querySelector('#btnSdSubmit');
        const submitMsg = el.querySelector('#sdSubmitMsg');
        if (submitBtn) {
          submitBtn.addEventListener('click', async () => {
            const selectedCard = el.querySelector('.sd-product-card.sd-product-selected');
            const productId  = (selectedCard?.dataset?.pid || SUPPORT_PRODUCTS[0]?.id || '').trim();
            const payerName  = (el.querySelector('#supportPayerName')?.value || '').trim();
            if (!payerName) {
              submitMsg.textContent = lang === 'en' ? '⚠ Please enter the payer name.' : '⚠ 입금자명을 입력해주세요.';
              submitMsg.className = 'sd-submit-msg sd-msg-error';
              return;
            }
            submitBtn.disabled = true;
            submitMsg.textContent = lang === 'en' ? 'Submitting...' : '신청 중...';
            submitMsg.className = 'sd-submit-msg';
            const result = await submitSupportClaim(productId, payerName);
            submitBtn.disabled = false;
            if (result.ok) {
              submitMsg.textContent = lang === 'en'
                ? `✅ Submitted! (ID: ${result.claimId.slice(0,8)}…) We'll review within 24h.`
                : `✅ 신청이 접수되었습니다! (ID: ${result.claimId.slice(0,8)}…) 24시간 내 검토 후 코드를 발급해드립니다.`;
              submitMsg.className = 'sd-submit-msg sd-msg-ok';
              // 제출 성공 시 입금자명 초기화 + localStorage 정리 (#9)
              const pInput = el.querySelector('#supportPayerName');
              if (pInput) pInput.value = '';
              try { localStorage.removeItem('hcsig_payerName'); } catch(e) {}
            } else {
              // #10: Firebase 권한 오류 시 대체 연락 방법 안내
              const errMsg = result.err || '';
              const isPermErr = /permission|Permission|PERMISSION|insufficient/i.test(errMsg);
              if (isPermErr) {
                submitMsg.innerHTML = lang === 'en'
                  ? `⚠ Submission failed (server error). Please contact us directly:<br>토스뱅크 1002-3349-0522 조용완 after transfer → KakaoTalk or email with your account ID`
                  : `⚠ 서버 오류로 자동 신청에 실패했습니다.<br>이체 후 <strong>입금자명 + 계정 ID</strong>를 카카오톡 또는 이메일로 직접 문의해주세요.<br>계정 ID는 위 "내 계정 정보 복사" 버튼으로 확인하세요.`;
              } else {
                submitMsg.textContent = '⚠ ' + errMsg;
              }
              submitMsg.className = 'sd-submit-msg sd-msg-error';
            }
          });
        }

        // ── 내역 로드 ────────────────────────────────────────────────────────
        async function loadAndRenderHistory() {
          const listEl  = el.querySelector('#sdHistoryList');
          const loadEl  = el.querySelector('#sdHistoryLoading');
          if (!listEl) return;
          // v3.0.2d fix: 클로저 캡처값 대신 live 값 사용 (Firebase 초기화 타이밍 이슈 방지)
          const liveLoggedIn = !!(window.HCSIG_CURRENT_USER);
          if (!liveLoggedIn) {
            if (loadEl) loadEl.style.display = 'none';
            listEl.innerHTML = `<div class="sd-history-empty">${lang === 'en' ? 'Please log in first.' : '로그인 후 확인하세요.'}</div>`;
            return;
          }
          if (loadEl) loadEl.style.display = '';
          listEl.innerHTML = '';
          const claims = await loadMyClaims();
          if (loadEl) loadEl.style.display = 'none';
          if (!claims.length) {
            listEl.innerHTML = `<div class="sd-history-empty">${lang === 'en' ? 'No claims yet.' : '신청 내역이 없습니다.'}</div>`;
            return;
          }
          const statusLabel = {
            pending:    lang === 'en' ? '⏳ Pending'    : '⏳ 검토 중',
            approved:   lang === 'en' ? '✅ Approved'   : '✅ 승인됨',
            code_issued:lang === 'en' ? '🎁 Code Issued': '🎁 코드 발급',
            redeemed:   lang === 'en' ? '🏅 Redeemed'  : '🏅 사용 완료',
            rejected:   lang === 'en' ? '❌ Rejected'   : '❌ 거절됨'
          };
          const statusClass = { pending:'sd-status-pending', approved:'sd-status-approved', code_issued:'sd-status-code', redeemed:'sd-status-redeemed', rejected:'sd-status-rejected' };
          listEl.innerHTML = claims.map(c => {
            const ts = c.submittedAt && c.submittedAt.toDate ? c.submittedAt.toDate().toLocaleDateString('ko-KR') : '—';
            const st = c.status || 'pending';
            return `
              <div class="sd-claim-row">
                <div class="sd-claim-info">
                  <span class="sd-claim-name">${c.productName || c.productId}</span>
                  <span class="sd-claim-price">${c.price || ''}</span>
                  <span class="sd-claim-date">${ts}</span>
                </div>
                <div class="sd-claim-status ${statusClass[st] || ''}">
                  ${statusLabel[st] || st}
                  ${st === 'code_issued' ? `<button class="sd-goto-redeem" data-sd-tab="redeem">${lang === 'en' ? '→ Redeem' : '→ 코드 입력'}</button>` : ''}
                </div>
              </div>`;
          }).join('');
          // "→ 코드 입력" 버튼 클릭 시 REDEEM 탭으로 이동
          listEl.querySelectorAll('.sd-goto-redeem').forEach(b => {
            b.addEventListener('click', () => switchSdTab('redeem'));
          });
        }

        // ── REDEEM CODE 적용 ─────────────────────────────────────────────────
        const redeemInput = el.querySelector('#sdRedeemInput');
        const redeemBtn   = el.querySelector('#btnSdRedeem');
        const redeemMsg   = el.querySelector('#sdRedeemMsg');
        if (redeemBtn) {
          redeemBtn.addEventListener('click', async () => {
            const code = (redeemInput?.value || '').trim();
            if (!code) {
              redeemMsg.textContent = lang === 'en' ? '⚠ Please enter a code.' : '⚠ 코드를 입력해주세요.';
              redeemMsg.className = 'sd-redeem-msg sd-msg-error';
              return;
            }
            redeemBtn.disabled = true;
            redeemMsg.textContent = lang === 'en' ? 'Verifying...' : '코드 확인 중...';
            redeemMsg.className = 'sd-redeem-msg';
            const result = await redeemSupportCode(code);
            redeemBtn.disabled = false;
            if (result.ok) {
              if (redeemInput) redeemInput.value = '';
              const r = result.product.rewards;
              const rLabel = lang === 'en'
                ? `COIN +${r.coin}, Energy Pack +${r.energyPack}, Daily Bonus Box +${r.dailyBonusBox}`
                : `COIN +${r.coin}, 에너지팩 +${r.energyPack}, 데일리 보너스 박스 +${r.dailyBonusBox}`;
              redeemMsg.innerHTML = `<strong>${lang === 'en' ? '🎉 Code redeemed!' : '🎉 코드 적용 완료!'}</strong><br>${rLabel}`;
              redeemMsg.className = 'sd-redeem-msg sd-msg-ok';
              showToast(lang === 'en' ? '🎁 Support reward received!' : '🎁 후원 보상이 지급되었습니다!', 'system');
              // v3.0.2d fix: 서포터 태그 뱃지 갱신 — 2.5초 후 재렌더 (성공 메시지 읽을 시간 확보)
              setTimeout(() => {
                const supportTabEl = document.getElementById('tabSupport');
                if (supportTabEl && supportTabEl.classList.contains('active')) {
                  _supportPanelLoginState = undefined; // 강제 재렌더
                  renderSupportPanel('redeem');
                }
              }, 2500);
            } else {
              redeemMsg.textContent = '⚠ ' + result.err;
              redeemMsg.className = 'sd-redeem-msg sd-msg-error';
            }
          });
        }

        // Enter 키로 REDEEM 제출
        if (redeemInput) {
          redeemInput.addEventListener('keydown', e => {
            if (e.key === 'Enter' && redeemBtn && !redeemBtn.disabled) redeemBtn.click();
          });
        }

        // v3.0.2d: 렌더 완료 후 로그인 상태 기록 (updateStatsUI 재렌더 방지 기준점)
        _supportPanelLoginState = !!(window.HCSIG_CURRENT_USER);

      } catch(e) { console.warn('[SupportPanel]', e); }
    }

    function updateStatsUI() {
      setNodeText(statLevel, state.level);
      setNodeText(statExp, state.exp + ' / ' + state.requiredExp);
      setNodeText(statCredits, state.credits);
      setNodeText(statCpuTier, state.cpuTier);
      setNodeText(statGpuTier, state.gpuTier || 1);
      setNodeText(statEnergyValue, `${state.energy} / ${state.energyMax}`);
      if (statEnergyValue) statEnergyValue.classList.toggle('energy-empty', state.energy <= 0);

      if (state.energy >= state.energyMax) {
        setNodeText(statEnergyTimer, t('full'));
      } else {
        const sec = state.energyTimerMs / 1000;
        setNodeText(statEnergyTimer, sec.toFixed(1) + ' ' + t('seconds'));
      }

      const ratio = state.energy / state.energyMax;
      if (energyBarInner) energyBarInner.style.width = (ratio * 100) + '%';

      renderHackModeUI();

      // 에너지 팩 UI
      const packCount = state.items && typeof state.items.energyPack === 'number' ? state.items.energyPack : 0;
      setNodeText(statEnergyPack, packCount);
      const canUsePack = packCount > 0 && state.energy < state.energyMax;
      setNodeDisabled(btnUseEnergyPack, !canUsePack);

      // 마지막 저장 시각 UI
      if (statLastSave) {
        if (state.lastSavedAt) {
          const d = new Date(state.lastSavedAt);
          const hh = String(d.getHours()).padStart(2,'0');
          const mm = String(d.getMinutes()).padStart(2,'0');
          const ss = String(d.getSeconds()).padStart(2,'0');
          statLastSave.textContent = `${hh}:${mm}:${ss}`;
        } else {
          statLastSave.textContent = '-';
        }
      }

      renderCodeList();
      renderCodeDetail();
      renderMissions();
      renderAchievements();
      renderCodex();
      renderZeroDayPanel();
      renderTodaySummary();
      renderItemsPanel();
      updateHeaderGlow();
      renderBeginnerRoulette();
      // v3.0.2d: SUPPORT 패널은 로그인 상태 변경 시에만 재렌더 (폼 입력 보호)
      // 매 틱마다 재렌더하면 입금자명 등 폼 입력이 초기화되는 버그 방지
      const tabSupportEl = document.getElementById('tabSupport');
      if (tabSupportEl && tabSupportEl.classList.contains('active')) {
        const _curLoginState = !!(window.HCSIG_CURRENT_USER);
        if (_supportPanelLoginState !== _curLoginState) {
          _supportPanelLoginState = _curLoginState;
          renderSupportPanel();
        }
      }
    }


    // v3.0.2d: SUPPORT 패널 로그인 상태 추적 (불필요한 재렌더 방지 → 폼 입력 보호)
    let _supportPanelLoginState = undefined; // undefined = 아직 렌더 전

    // v3.0.0 fix: 같은 WARN/메시지 중복 토스트 방지 (1.2초 윈도우)
    const _recentToasts = new Map(); // key: kind+msg, value: timestamp
    const TOAST_DEDUP_MS = 1200;

    function showToast(message, kind = 'info') {
      if (!toastContainer) return;
      // 동일 메시지가 최근 1.2초 안에 표시됐으면 무시
      const dedupKey = String(kind) + '|' + String(message);
      const lastShown = _recentToasts.get(dedupKey);
      const now = Date.now();
      if (lastShown && now - lastShown < TOAST_DEDUP_MS) {
        return; // 중복 — 스킵
      }
      _recentToasts.set(dedupKey, now);
      // 메모리 누적 방지: 5초 이상 된 항목 제거
      if (_recentToasts.size > 50) {
        for (const [k, t] of _recentToasts) {
          if (now - t > 5000) _recentToasts.delete(k);
        }
      }

      const toast = document.createElement('div');
      toast.className = 'toast';

      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = String(kind || 'info').toUpperCase();

      const msg = document.createElement('div');
      msg.className = 'msg';
      msg.textContent = message;

      toast.appendChild(tag);
      toast.appendChild(msg);
      toastContainer.appendChild(toast);

      requestAnimationFrame(() => toast.classList.add('show'));

      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 220);
      }, (state.ui && state.ui.toastDurationMs) ? state.ui.toastDurationMs : 2200);
    }

    function log(message, type = 'system') {
      if (!logList) return;
      const entry = document.createElement('div');
      entry.className = 'log-entry';
      entry.dataset.type = type;

      const timeSpan = document.createElement('span');
      timeSpan.className = 'log-time';
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      timeSpan.textContent = `[${hh}:${mm}:${ss}]`;

      const tagSpan = document.createElement('span');
      tagSpan.className = 'log-tag tag-' + type;
      tagSpan.textContent = type.toUpperCase();

      const textSpan = document.createElement('span');
      entry.dataset.rawMessage = message;
      textSpan.textContent = ' ' + translateLogMessage(message);

      entry.appendChild(timeSpan);
      entry.appendChild(tagSpan);
      entry.appendChild(textSpan);

      logList.prepend(entry);
      trimLogs();
      applyLogFilter();
    }

    function emitActivity(type, detail = {}) {
      try {
        window.dispatchEvent(new CustomEvent('hcsig:activity', {
          detail: Object.assign({ type, createdAt: Date.now() }, detail || {})
        }));
      } catch (e) {}
    }

    function applyLogFilter() {
      if (!logList) return;
      const show = state.logFilter;
      const children = logList.children;
      for (let i = 0; i < children.length; i++) {
        const el = children[i];
        const t = el.dataset.type;
        let visible = true;
        if (t === 'system') visible = show.system;
        else if (t === 'scan') visible = show.scan;
        else if (t === 'hack') visible = show.hack;
        else if (t === 'shop') visible = show.shop;
        else if (t === 'level') visible = show.level;
        // 검색 필터
        const q = (state.ui && state.ui.logSearch) ? String(state.ui.logSearch).trim().toLowerCase() : '';
        if (visible && q) {
          const hay = (el.textContent || '').toLowerCase();
          visible = hay.includes(q);
        }
        el.style.display = visible ? '' : 'none';
      }
    }

    function trimLogs() {
      if (!logList) return;
      // 핀(고정) 로그는 제외하고 최신 100개까지만 유지
      const max = 100;
      const children = Array.from(logList.children);
      const unpinned = children.filter(el => el.dataset && el.dataset.pinned !== '1');
      if (unpinned.length <= max) return;
      let removeCount = unpinned.length - max;
      for (let i = unpinned.length - 1; i >= 0 && removeCount > 0; i--) {
        unpinned[i].remove();
        removeCount--;
      }
    }

    const sfxState = {
      ctx: null,
      unlocked: false,
      lastTapAt: 0
    };

    function getSfxVolume() {
      const raw = state.ui && Number.isFinite(Number(state.ui.sfxVolume)) ? Number(state.ui.sfxVolume) : 35;
      return Math.max(0, Math.min(1, raw / 100));
    }

    function isSfxEnabled() {
      return !!(state.ui && state.ui.sfxEnabled !== false && getSfxVolume() > 0);
    }

    function getAudioContext() {
      if (sfxState.ctx) return sfxState.ctx;
      const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextCtor) return null;
      try {
        sfxState.ctx = new AudioContextCtor();
      } catch (e) {
        sfxState.ctx = null;
      }
      return sfxState.ctx;
    }

    function unlockSfx() {
      if (!isSfxEnabled()) return;
      const ctx = getAudioContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      sfxState.unlocked = true;
    }

    function playTone(ctx, start, freq, duration, type, gainValue, endFreq = null) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type || 'sine';
      osc.frequency.setValueAtTime(freq, start);
      if (endFreq) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), start + duration);
      }
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, gainValue), start + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      osc.connect(gain).connect(ctx.destination);
      osc.start(start);
      osc.stop(start + duration + 0.02);
    }

    function playNoise(ctx, start, duration, gainValue, filterFreq = 1200) {
      const sampleRate = ctx.sampleRate || 44100;
      const buffer = ctx.createBuffer(1, Math.max(1, Math.floor(sampleRate * duration)), sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
      const source = ctx.createBufferSource();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(filterFreq, start);
      filter.Q.setValueAtTime(1.4, start);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, gainValue), start + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      source.buffer = buffer;
      source.connect(filter).connect(gain).connect(ctx.destination);
      source.start(start);
      source.stop(start + duration + 0.02);
    }

    function playSfx(name) {
      if (!isSfxEnabled()) return;
      const ctx = getAudioContext();
      if (!ctx) return;

      // ctx.resume()은 비동기 — resume 완료 후 currentTime을 읽어야
      // suspended 상태에서 스케줄된 시각이 과거가 되는 문제를 방지
      function doPlay() {
        if (!isSfxEnabled()) return;
        const now = ctx.currentTime + 0.005;
        const v = getSfxVolume();

      // gain 기준: v=1.0(100%)일 때 0.15~0.30 범위가 적절
      switch (name) {
        case 'tap':
          if (Date.now() - sfxState.lastTapAt < 55) return;
          sfxState.lastTapAt = Date.now();
          playTone(ctx, now, 520, 0.045, 'triangle', 0.20 * v, 760);
          break;
        case 'scanStart':
          playNoise(ctx, now, 0.11, 0.17 * v, 1800);
          playTone(ctx, now + 0.04, 440, 0.08, 'sawtooth', 0.12 * v, 880);
          break;
        case 'scanComplete':
          playTone(ctx, now, 660, 0.07, 'sine', 0.22 * v, 990);
          playTone(ctx, now + 0.065, 990, 0.08, 'sine', 0.18 * v, 1320);
          break;
        case 'success':
          playTone(ctx, now, 523.25, 0.08, 'triangle', 0.26 * v, 659.25);
          playTone(ctx, now + 0.07, 783.99, 0.11, 'triangle', 0.22 * v, 1046.5);
          break;
        case 'fail':
          playTone(ctx, now, 260, 0.12, 'sawtooth', 0.24 * v, 140);
          playNoise(ctx, now + 0.03, 0.10, 0.10 * v, 360);
          break;
        case 'upgrade':
          playTone(ctx, now, 392, 0.07, 'square', 0.16 * v, 587);
          playTone(ctx, now + 0.065, 784, 0.10, 'triangle', 0.24 * v, 1175);
          break;
        case 'achievement':
          playTone(ctx, now, 660, 0.08, 'sine', 0.22 * v, 880);
          playTone(ctx, now + 0.07, 990, 0.09, 'sine', 0.20 * v, 1320);
          playTone(ctx, now + 0.15, 1320, 0.12, 'triangle', 0.18 * v, 1760);
          break;
        case 'level':
          playTone(ctx, now, 392, 0.10, 'triangle', 0.20 * v, 523);
          playTone(ctx, now + 0.09, 659, 0.11, 'triangle', 0.24 * v, 880);
          playTone(ctx, now + 0.19, 1046, 0.13, 'sine', 0.20 * v, 1318);
          break;
        case 'mode':
          playTone(ctx, now, 330, 0.06, 'triangle', 0.17 * v, 660);
          playTone(ctx, now + 0.05, 440, 0.07, 'square', 0.12 * v, 880);
          break;
        case 'stage':
          playNoise(ctx, now, 0.08, 0.12 * v, 900);
          playTone(ctx, now + 0.035, 220, 0.09, 'sawtooth', 0.16 * v, 440);
          break;
        default:
          playTone(ctx, now, 600, 0.06, 'sine', 0.15 * v, 720);
      }
      } // end doPlay

      if (ctx.state === 'suspended') {
        ctx.resume().then(doPlay).catch(() => {});
      } else {
        doPlay();
      }
    }


    function requiredExp(level) {
      const base = 20 + (level - 1) * 10;
      let multiplier = 1.2;
      if (level >= 11 && level <= 25) multiplier = 1.6;
      else if (level >= 26 && level <= 40) multiplier = 2.0;
      else if (level >= 41) multiplier = 2.5;
      return Math.max(20, Math.round(base * multiplier));
    }

    function addExp(amount) {
      const finalAmount = Math.max(1, Math.round(amount * modifiers.expMultiplier));
      state.exp += finalAmount;
      let leveledUp = false;
      while (state.exp >= state.requiredExp) {
        state.exp -= state.requiredExp;
        levelUp();
        leveledUp = true;
      }
      if (!leveledUp) updateStatsUI();
    }

    function levelUp() {
      ensureMissionResets();
      const prevLevel = state.level;
      state.level++;
      state.requiredExp = requiredExp(state.level);
      state.credits += 50;
      state.stats.creditsEarnedTotal += 50;
      playSfx('level');
      log(t('levelUpLog', { lv: state.level }), 'level');
      if (prevLevel < 5 && state.level >= 5) {
        const msg = langText('EXTREME 해킹 모드가 해금되었습니다.', 'EXTREME hack mode unlocked.', 'EXTREMEハックモードが解放されました。');
        log(`[시스템] ${msg}`, 'system');
        showToast(msg, 'achievement');
      }

      state.missionProgress.weekly.levelReached = Math.max(
        state.missionProgress.weekly.levelReached,
        state.level
      );
      state.missionProgress.month.levelReached = Math.max(
        state.missionProgress.month.levelReached,
        state.level
      );
      checkMissions('weekly');
      checkMissions('month');
      checkMissions('general');
      checkAchievements('levelUp');
      updateStatsUI();
    }

    function checkLevelUp() {
      let leveledUp = false;
      while (state.exp >= state.requiredExp) {
        state.exp -= state.requiredExp;
        levelUp();
        leveledUp = true;
      }
      if (!leveledUp) updateStatsUI();
    }

    function renderAll() {
      renderServers();
      renderShop();
      updateStatsUI();
      renderStagePanel();
      renderWeeklyPanel();
      renderZeroDayPanel();
    }

    function refreshProgressUiAndSave() {
      updateStatsUI();
      renderShop();
      renderCodex();
      renderCodeList();
      renderCodeDetail();
      renderStagePanel();
      renderWeeklyPanel();
      renderZeroDayPanel();
      scheduleSilentSave();
    }

    function getEnergyIntervalMs() {
      ensureModifierDefaults();
      return Math.round(ENERGY_INTERVAL_MS * (modifiers.fastRecoveryTicks > 0 ? 0.75 : 1));
    }

    function consumeFastRecoveryTick() {
      if (modifiers.fastRecoveryTicks > 0) {
        modifiers.fastRecoveryTicks -= 1;
        if (modifiers.fastRecoveryTicks < 0) modifiers.fastRecoveryTicks = 0;
      }
    }

    function consumeEnergy(amount) {
      ensureMissionResets();
      if (state.energy < amount) return false;
      state.energy -= amount;
      state.stats.energySpentTotal += amount;

      state.missionProgress.daily.energySpent += amount;
      state.missionProgress.weekly.energySpent += amount;
      state.missionProgress.month.energySpent += amount;
      trackWeeklyChallenge('energy_spent', { amount });

      checkMissions('daily');
      checkMissions('weekly');
      checkMissions('month');
      checkMissions('general');

      if (state.energy <= 0) {
        state.energy = 0;
        unlockAchievement('energy_zero');
        // 방전 습관 / 한계 돌파 미션용 플래그 기록
        state.missionProgress.daily.energy0Reached  = true;
        state.missionProgress.weekly.energy0Reached = true;
        state.missionProgress.month.energy0Reached  = true;
        checkMissions('daily');
        checkMissions('weekly');
        checkMissions('month');
      }

      if (state.energy < state.energyMax && state.energyTimerMs <= 0) {
        state.energyTimerMs = getEnergyIntervalMs();
      }
      updateStatsUI();
      return true;
    }

    function useEnergyPack() {
      ensureMissionResets();
      state.items = state.items || { energyPack: 0 };

      const packCount = state.items.energyPack || 0;
      if (packCount <= 0) {
        log(t('noEnergyPack'), 'system');
        return;
      }
      if (state.energy >= state.energyMax) {
        log(t('energyFull'), 'system');
        return;
      }

      state.items.energyPack = packCount - 1;
      state.energy = state.energyMax;
      state.energyTimerMs = 0;

      state.stats.energyPacksUsed = (state.stats.energyPacksUsed || 0) + 1;

      log(t('usedEnergyPack'), 'system');
      updateStatsUI();
      renderStagePanel();
      saveGame();
    }

    setInterval(() => {
      if (state.energy >= state.energyMax) {
        state.energy = state.energyMax;
        state.energyTimerMs = 0;
        updateStatsUI();
        return;
      }
      if (state.energyTimerMs > 0) {
        state.energyTimerMs = Math.max(0, state.energyTimerMs - 100);
        if (state.energyTimerMs <= 0) {
          state.energy++;
          consumeFastRecoveryTick();
          renderStagePanel();
          if (state.energy < state.energyMax) {
            state.energyTimerMs = getEnergyIntervalMs();
          } else {
            state.energyTimerMs = 0;
          }
        }
        updateStatsUI();
      }
    }, 100);

    function getOwnedCode(id) {
      return ownedCodes.find(c => c.id === id) || null;
    }

    function addCodeInstanceFromTemplate(templateId) {
      const def = codeDefs[templateId];
      if (!def) return;
      const exists = getOwnedCode(templateId);
      if (exists) return;
      ownedCodes.push({
        id: def.id,
        name: def.name,
        rarity: def.rarity,
        power: def.basePower,
        level: 1,
        usage: 0,
        shards: 0,
        syncLevel: 0,
        romLevel: 0,
        protectionCharges: 0,
        pickTuneLevel: 0,
        obtainedAt: Date.now()
      });
    }

    function grantCodeFromTemplate(templateId, opts = {}) {
      const def = codeDefs[templateId];
      if (!def) return null;
      const existing = getOwnedCode(templateId);
      if (existing) {
        const shardGain = Math.max(5, Number(opts.duplicateShards || 0) || getShardGainByRarity(def.rarity));
        existing.shards = (existing.shards || 0) + shardGain;
        state.stats.codeShardsTotal = (state.stats.codeShardsTotal || 0) + shardGain;
        return { type: 'duplicate', code: existing, shards: shardGain };
      }
      const instance = {
        id: def.id,
        name: def.name,
        rarity: def.rarity,
        power: def.basePower,
        level: 1,
        usage: 0,
        shards: 0,
        syncLevel: 0,
        romLevel: 0,
        protectionCharges: 0,
        pickTuneLevel: 0,
        obtainedAt: Date.now()
      };
      ownedCodes.push(instance);
      if (!state.activeCodeId) state.activeCodeId = def.id;
      return { type: 'new', code: instance, shards: 0 };
    }


    function getCodexDiscoveredCount() {
      return Object.keys(codeDefs).filter(id => !!getOwnedCode(id)).length;
    }

    function getHighestCodePower() {
      return ownedCodes.reduce((max, code) => Math.max(max, code.power || 0), 0);
    }

    function getHighestCodeLevel() {
      return ownedCodes.reduce((max, code) => Math.max(max, code.level || 0), 0);
    }

    function getHighestSyncLevel() {
      return ownedCodes.reduce((max, code) => Math.max(max, code.syncLevel || 0), 0);
    }

    function countCodesByRarity(rarity) {
      return ownedCodes.filter(code => code.rarity === rarity).length;
    }

    function renderCodex() {
      if (!codexListEl) return;
      const defs = Object.values(codeDefs).sort((a, b) => {
        const rarityGap = rarityOrder.indexOf(b.rarity) - rarityOrder.indexOf(a.rarity);
        if (rarityGap !== 0) return rarityGap;
        return a.name.localeCompare(b.name);
      });
      const discovered = getCodexDiscoveredCount();
      if (codexSummaryEl) {
        codexSummaryEl.textContent = t('codexSummary', { a: discovered, b: defs.length });
      }
      codexListEl.innerHTML = '';
      defs.forEach(def => {
        const owned = getOwnedCode(def.id);
        const item = document.createElement('div');
        item.className = 'codex-item' + (owned ? ' discovered' : ' hidden');

        const head = document.createElement('div');
        head.className = 'codex-head';

        const nameWrap = document.createElement('div');
        const title = document.createElement('strong');
        title.className = 'rarity-' + def.rarity.toLowerCase();
        title.textContent = owned ? def.name : '???';
        const meta = document.createElement('div');
        meta.className = 'small';
        if (owned) {
          const ownedText = getLang() === 'en'
            ? `Owned Lv.${owned.level} / PWR ${owned.power}`
            : getLang() === 'ja'
              ? `所持 Lv.${owned.level} / PWR ${owned.power}`
              : `보유 Lv.${owned.level} / PWR ${owned.power}`;
          meta.textContent = `[${localizeRarityLabel(def.rarity)}] ${t('basePower')} ${def.basePower} · ${ownedText}`;
        } else {
          meta.textContent = `[${localizeRarityLabel(def.rarity)}] ${t('undiscoveredCode')}`;
        }
        nameWrap.appendChild(title);
        nameWrap.appendChild(meta);

        const badge = document.createElement('span');
        badge.className = 'badge';
        badge.textContent = owned ? t('discovered') : t('locked');

        head.appendChild(nameWrap);
        head.appendChild(badge);

        const body = document.createElement('div');
        body.className = 'small codex-desc';
        body.textContent = owned ? localizeCodeDescription(def) : t('undiscoveredDesc');

        item.appendChild(head);
        item.appendChild(body);
        codexListEl.appendChild(item);
      });
    }

    function getCodeSortValue(code) {
      const mode = (state.ui && state.ui.codeSortMode) ? state.ui.codeSortMode : 'recent';
      const rarityRank = { LEGENDARY: 5, EPIC: 4, RARE: 3, UNCOMMON: 2, COMMON: 1 };
      switch (mode) {
        case 'rarity':
          return rarityRank[code.rarity] || 0;
        case 'power':
          return Number(code.power || 0);
        case 'level':
          return Number(code.level || 0);
        case 'name':
          return String(code.name || '');
        case 'recent':
        default:
          return Number(code.obtainedAt || 0);
      }
    }

    function getSortedOwnedCodes() {
      const mode = (state.ui && state.ui.codeSortMode) ? state.ui.codeSortMode : 'recent';
      const rarityRank = { LEGENDARY: 5, EPIC: 4, RARE: 3, UNCOMMON: 2, COMMON: 1 };
      return [...ownedCodes].sort((a, b) => {
        if (mode === 'name') {
          const byName = String(a.name || '').localeCompare(String(b.name || ''), 'ko');
          if (byName !== 0) return byName;
          return (b.power || 0) - (a.power || 0);
        }
        if (mode === 'rarity') {
          const rarityDiff = (rarityRank[b.rarity] || 0) - (rarityRank[a.rarity] || 0);
          if (rarityDiff !== 0) return rarityDiff;
          const powerDiff = (b.power || 0) - (a.power || 0);
          if (powerDiff !== 0) return powerDiff;
          return String(a.name || '').localeCompare(String(b.name || ''), 'ko');
        }
        const valueDiff = Number(getCodeSortValue(b)) - Number(getCodeSortValue(a));
        if (valueDiff !== 0) return valueDiff;
        if (mode !== 'power') {
          const powerDiff = (b.power || 0) - (a.power || 0);
          if (powerDiff !== 0) return powerDiff;
        }
        return String(a.name || '').localeCompare(String(b.name || ''), 'ko');
      });
    }

    function renderCodeList() {
      if (!codeListEl) return;
      codeListEl.innerHTML = '';
      if (ownedCodes.length === 0) {
        const li = document.createElement('li');
        li.textContent = t('noCodes');
        li.style.opacity = '0.7';
        codeListEl.appendChild(li);
        return;
      }

      getSortedOwnedCodes().forEach(code => {
        const li = document.createElement('li');
        li.className = 'code-card';
        li.tabIndex = 0;
        li.setAttribute('role', 'button');
        li.setAttribute('aria-label', `${code.name} ${localizeRarityLabel(code.rarity)} Lv.${code.level} PWR ${code.power}`);
        if (state.activeCodeId === code.id) li.classList.add('active');

        const left = document.createElement('div');
        left.className = 'code-card-main';
        const def = codeDefs[code.id];
        const nameEl = document.createElement('strong');
        nameEl.textContent = code.name;
        const rarityClass = 'rarity-' + code.rarity.toLowerCase();
        nameEl.classList.add(rarityClass);
        const shardEl = document.createElement('span');
        const tagParts = [localizeRarityLabel(code.rarity)];
        if (def && def.codeClass) tagParts.push(def.codeClass);
        if (def && def.seasonId) tagParts.push('S1');
        shardEl.textContent = `${tagParts.join(' · ')} · ${getLang() === 'en' ? 'Shards' : getLang() === 'ja' ? 'シャード' : '조각'} ${code.shards || 0}`;
        left.appendChild(nameEl);
        left.appendChild(shardEl);

        const right = document.createElement('div');
        right.className = 'code-card-right';

        const metaEl = document.createElement('span');
        metaEl.className = 'meta';
        metaEl.textContent = `Lv.${code.level} · PWR ${code.power}`;

        const detailBtn = document.createElement('button');
        detailBtn.type = 'button';
        detailBtn.className = 'code-detail-btn';
        detailBtn.textContent = getLang() === 'en' ? 'Detail' : '상세';
        detailBtn.setAttribute('aria-label', `${code.name} 상세 보기`);

        right.appendChild(metaEl);
        right.appendChild(detailBtn);

        li.appendChild(left);
        li.appendChild(right);

        const selectCode = () => {
          state.activeCodeId = code.id;
          updateStatsUI();
          log(t('activeCode', { name: code.name }), 'system');
          onTutorialAction('selectCode');
          renderCodeList();
          renderCodeDetail();
        };
        detailBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          selectCode();
          openCodeDetailModal(code.id);
        });
        li.addEventListener('click', () => {
          selectCode();
          openCodeDetailModal(code.id);
        });
        li.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            selectCode();
            openCodeDetailModal(code.id);
          }
        });

        codeListEl.appendChild(li);
      });
    }

    function getShardEnhanceCost(code) {
      const map = { COMMON: 2, UNCOMMON: 3, RARE: 4, EPIC: 5, LEGENDARY: 6 };
      return map[code && code.rarity] || 2;
    }

    function getCodeDetailHtml(code) {
      if (!code) return `<div class="small">${t('selectCode')}</div>`;
      const def = codeDefs[code.id];
      const ability = def ? localizeCodeDescription(def) : t('noDesc');
      const usage = code.usage || 0;
      const shardCount = code.shards || 0;
      const syncLevel = code.syncLevel || 0;
      const rarityClass = 'rarity-' + code.rarity.toLowerCase();

      const upgradeCost = 100 * code.level;
      const syncCost = getSyncShardCost(syncLevel);
      const evolveReady = code.level >= 5;
      const syncBonusText = Math.round((getSyncSuccessBonus(syncLevel + 1) - getSyncSuccessBonus(syncLevel)) * 100);
      const shardBoostCost = getShardEnhanceCost(code);
      const lang = getLang();
      const seasonMeta = def && def.seasonId
        ? (lang === 'en'
          ? `Season code: ${def.seasonId === 'season_1' ? 'Foundation Season PICK' : def.seasonId}`
          : lang === 'ja'
            ? `シーズンコード: ${def.seasonId === 'season_1' ? 'Foundation Season PICK' : def.seasonId}`
            : `시즌 코드: ${def.seasonId === 'season_1' ? 'Foundation Season PICK' : def.seasonId}`)
        : '';
      const labels = lang === 'en'
        ? {
          level: `Level: Lv.${code.level}`,
          power: `Power: ${code.power}`,
          usage: `Uses: ${usage}`,
          shards: `Duplicate Shards: ${shardCount}`,
          sync: `Sync Level: ${syncLevel}`,
          upgrade: `Next upgrade cost: ${upgradeCost} credits`,
          syncCost: `Next sync cost: ${syncCost} shards / expected success bonus +${syncBonusText}%`,
          shard: `Shard boost cost: ${shardBoostCost} shards / PWR +2`,
          evolve: evolveReady ? 'Evolution requirement: Met' : 'Evolution requirement: Need Lv.5+',
          ability: 'Ability',
          rom: `ROM Stabilize: ${code.romLevel || 0}/5`,
          protect: `Protection: ${code.protectionCharges || 0}`,
          pickTune: `PICK Tune: ${code.pickTuneLevel || 0}/10`
        }
        : lang === 'ja'
          ? {
            level: `レベル: Lv.${code.level}`,
            power: `パワー: ${code.power}`,
            usage: `使用回数: ${usage}`,
            shards: `重複シャード: ${shardCount}`,
            sync: `同期段階: ${syncLevel}`,
            upgrade: `次の強化コスト: ${upgradeCost} クレジット`,
            syncCost: `次の同期コスト: シャード ${syncCost} / 予想成功率補正 +${syncBonusText}%`,
            shard: `シャード強化コスト: シャード ${shardBoostCost} / PWR +2`,
            evolve: evolveReady ? '進化条件: 達成' : '進化条件: Lv.5以上必要',
            ability: '能力',
            rom: `ROM安定化: ${code.romLevel || 0}/5`,
            protect: `保護チャージ: ${code.protectionCharges || 0}`,
            pickTune: `PICK調律: ${code.pickTuneLevel || 0}/10`
          }
          : {
            level: `레벨: Lv.${code.level}`,
            power: `파워: ${code.power}`,
            usage: `사용 횟수: ${usage}`,
            shards: `중복 조각: ${shardCount}`,
            sync: `동기화 단계: ${syncLevel}`,
            upgrade: `다음 강화 비용: ${upgradeCost} 크레딧`,
            syncCost: `다음 동기화 비용: 조각 ${syncCost} / 예상 성공률 보정 +${syncBonusText}%`,
            shard: `조각 강화 비용: 조각 ${shardBoostCost} / PWR +2`,
            evolve: evolveReady ? '진화 조건: 충족' : '진화 조건: Lv.5 이상 필요',
            ability: '능력',
            rom: `ROM 안정화: ${code.romLevel || 0}/5`,
            protect: `보호 충전: ${code.protectionCharges || 0}`,
            pickTune: `PICK 조율: ${code.pickTuneLevel || 0}/10`
          };
      // PWR 영향도 텍스트
      const pwrImpact = lang === 'en'
        ? `PWR ${code.power} — affects hack success rate, campaign nodes, and Data Tower.`
        : lang === 'ja'
          ? `PWR ${code.power} — ハック成功率・キャンペーン・データタワーに影響。`
          : `PWR ${code.power} — 해킹 성공률 · 캠페인 · 데이터 타워에 직접 영향.`;

      // 성장 단계 (Growth Path) ①②③④
      const step1Done = code.level >= 5;
      const step2Done = syncLevel >= 3;
      const step3Done = code.rarity !== 'COMMON' && code.rarity !== 'UNCOMMON';
      const romLv   = code.romLevel || 0;
      const protLv  = code.protectionCharges || 0;
      const pickLv  = code.pickTuneLevel || 0;
      const isPickCode = isSeasonPickCode(code);

      const gpLabel = (done, txt) => `<div class="cgp-step ${done ? 'cgp-done' : 'cgp-pending'}">${done ? '✓' : '○'} ${txt}</div>`;

      const step1txt = lang === 'en'
        ? `① Upgrade — Lv.${code.level} · next ${upgradeCost} cr (+5 PWR)`
        : lang === 'ja'
          ? `① 強化 — Lv.${code.level} · 次 ${upgradeCost} cr (+5 PWR)`
          : `① 강화 — Lv.${code.level} · 다음 ${upgradeCost} cr (+5 PWR)`;
      const step2txt = lang === 'en'
        ? `② Sync — Stage ${syncLevel} · next ${syncCost} shards (+${syncBonusText}% success)`
        : lang === 'ja'
          ? `② 同期 — ${syncLevel}段階 · 次 ${syncCost}シャード (+${syncBonusText}%)`
          : `② 동기화 — ${syncLevel}단계 · 다음 조각 ${syncCost}개 (+${syncBonusText}% 보정)`;
      const step3txt = lang === 'en'
        ? `③ Evolve — ${evolveReady ? 'Lv.5+ met · +10 PWR' : 'Need Lv.5+ first'}`
        : lang === 'ja'
          ? `③ 進化 — ${evolveReady ? 'Lv.5+ 達成 · +10 PWR' : 'Lv.5以上必要'}`
          : `③ 진화 — ${evolveReady ? 'Lv.5+ 충족 · +10 PWR' : 'Lv.5 이상 필요'}`;
      const step4parts = [
        lang === 'en' ? `ROM ${romLv}/5 (+3 PWR ea)` : lang === 'ja' ? `ROM ${romLv}/5 (+3 PWR)` : `ROM ${romLv}/5 (+3 PWR)`,
        lang === 'en' ? `Protect ${protLv}/3` : lang === 'ja' ? `保護 ${protLv}/3` : `보호 ${protLv}/3`,
        isPickCode ? (lang === 'en' ? `PICK Tune ${pickLv}/10 (+4 PWR ea)` : lang === 'ja' ? `PICK調律 ${pickLv}/10` : `PICK 조율 ${pickLv}/10 (+4 PWR)`) : null
      ].filter(Boolean).join(' · ');
      const step4txt = (lang === 'en' ? '④ Support items — ' : lang === 'ja' ? '④ サポート — ' : '④ 지원 아이템 — ') + step4parts;

      return `
        <div class="code-modal-identity">
          <strong class="${rarityClass}">${code.name}</strong>
          <span class="rarity-tag ${rarityClass}">[${localizeRarityLabel(code.rarity)}]</span>
        </div>
        <div class="code-modal-pwr-impact small">${pwrImpact}</div>
        <div class="code-modal-stat-grid">
          <div class="small">${labels.level}</div>
          <div class="small">${labels.power}</div>
          <div class="small">${labels.usage}</div>
          <div class="small">${labels.shards}</div>
          <div class="small">${labels.sync}</div>
          ${seasonMeta ? `<div class="small">${seasonMeta}</div>` : ''}
        </div>
        <div class="code-modal-growth-path">
          ${gpLabel(step1Done, step1txt)}
          ${gpLabel(step2Done, step2txt)}
          ${gpLabel(step3Done, step3txt)}
          ${gpLabel(romLv >= 5 && protLv >= 3, step4txt)}
        </div>
        <div class="code-modal-cost-grid">
          <div class="small code-next-meta">${labels.shard}</div>
        </div>
        <div class="code-modal-ability">
          <div class="small">${labels.ability}</div>
          <p class="small">${ability}</p>
        </div>
      `;
    }

    function renderCodeDetail() {
      const code = getActiveCodeInstance();
      const html = getCodeDetailHtml(code);
      if (codeDetailEl) codeDetailEl.innerHTML = html;
      if (codeDetailModalBody) codeDetailModalBody.innerHTML = html;
      if (codeDetailModalTitle) codeDetailModalTitle.textContent = code ? code.name : t('codeDetail');
      const hasCode = !!code;
      [btnModalUpgradeCode, btnModalSyncCode, btnModalEvolveCode, btnModalShardCode].forEach(btn => {
        if (btn) btn.disabled = !hasCode;
      });
    }

    function openCodeDetailModal(codeId) {
      if (codeId) state.activeCodeId = codeId;
      renderCodeDetail();
      if (!codeDetailModalBackdrop) return;
      codeDetailModalBackdrop.classList.add('active');
      codeDetailModalBackdrop.setAttribute('aria-hidden', 'false');
    }

    function closeCodeDetailModal() {
      if (!codeDetailModalBackdrop) return;
      codeDetailModalBackdrop.classList.remove('active');
      codeDetailModalBackdrop.setAttribute('aria-hidden', 'true');
    }

    function getActiveCodeInstance() {
      if (!state.activeCodeId && ownedCodes.length > 0) {
        state.activeCodeId = ownedCodes[0].id;
      }
      return state.activeCodeId ? getOwnedCode(state.activeCodeId) : null;
    }

    function getShardGainByRarity(rarity) {
      switch (rarity) {
        case 'COMMON': return 1;
        case 'UNCOMMON': return 2;
        case 'RARE': return 3;
        case 'EPIC': return 5;
        case 'LEGENDARY': return 8;
        default: return 1;
      }
    }

    function getSyncShardCost(syncLevel) {
      return 3 + (syncLevel * 2);
    }

    function getSyncPowerBonus(rarity) {
      switch (rarity) {
        case 'COMMON': return 2;
        case 'UNCOMMON': return 3;
        case 'RARE': return 4;
        case 'EPIC': return 6;
        case 'LEGENDARY': return 8;
        default: return 2;
      }
    }

    function getSyncSuccessBonus(syncLevel) {
      return Math.min(0.12, syncLevel * 0.02);
    }

    function getCodeEffect(codeOrDef) {
      if (!codeOrDef) return {};
      const def = codeOrDef.effect ? codeOrDef : codeDefs[codeOrDef.id];
      return (def && def.effect) ? def.effect : {};
    }

    function ensureCodeSupportState(code) {
      if (!code) return null;
      code.romLevel = Math.max(0, Math.round(Number(code.romLevel || 0)));
      code.protectionCharges = Math.max(0, Math.round(Number(code.protectionCharges || 0)));
      code.pickTuneLevel = Math.max(0, Math.round(Number(code.pickTuneLevel || 0)));
      return code;
    }

    function isSeasonPickCode(code) {
      if (!code) return false;
      const def = codeDefs[code.id];
      return !!(def && (def.codeClass === 'PICK' || def.seasonId));
    }

    function grantInventoryRewards(reward = {}) {
      state.items = state.items || {};
      state.stats = state.stats || {};
      const lang = getLang();
      const parts = [];
      const pushPart = (ko, en, ja) => parts.push(lang === 'en' ? en : lang === 'ja' ? ja : ko);
      if (reward.credits) {
        const amount = Math.max(0, Math.round(Number(reward.credits || 0)));
        if (amount > 0) {
          state.credits += amount;
          state.stats.creditsEarnedTotal = (state.stats.creditsEarnedTotal || 0) + amount;
          pushPart(`크레딧 +${amount}`, `Credits +${amount}`, `クレジット +${amount}`);
        }
      }
      if (reward.energyPack) {
        const amount = Math.max(0, Math.round(Number(reward.energyPack || 0)));
        if (amount > 0) {
          state.items.energyPack = (state.items.energyPack || 0) + amount;
          pushPart(`에너지 팩 +${amount}`, `Energy Pack +${amount}`, `エネルギーパック +${amount}`);
        }
      }
      if (reward.weeklyToken) {
        const amount = Math.max(0, Math.round(Number(reward.weeklyToken || 0)));
        if (amount > 0) {
          state.items.weeklyToken = (state.items.weeklyToken || 0) + amount;
          pushPart(`TOKEN +${amount}`, `TOKEN +${amount}`, `TOKEN +${amount}`);
        }
      }
      if (reward.oneDay) {
        const amount = Math.max(0, Math.round(Number(reward.oneDay || 0)));
        if (amount > 0) {
          state.items.oneDay = (state.items.oneDay || 0) + amount;
          state.stats.zeroDayOneDayEarnedTotal = (state.stats.zeroDayOneDayEarnedTotal || 0) + amount;
          pushPart(`OneDay +${amount}`, `OneDay +${amount}`, `OneDay +${amount}`);
        }
      }
      if (reward.coin) {
        const amount = Math.max(0, Math.round(Number(reward.coin || 0)));
        if (amount > 0) {
          state.items.coin = (state.items.coin || 0) + amount;
          state.stats.coinEarnedTotal = (state.stats.coinEarnedTotal || 0) + amount;
          pushPart(`COIN +${amount}`, `COIN +${amount}`, `COIN +${amount}`);
        }
      }
      if (reward.zeroDayVulnerabilityShard) {
        const amount = Math.max(0, Math.round(Number(reward.zeroDayVulnerabilityShard || 0)));
        if (amount > 0) {
          state.items.zeroDayVulnerabilityShard = (state.items.zeroDayVulnerabilityShard || 0) + amount;
          pushPart(`취약점 조각 +${amount}`, `Vulnerability Shards +${amount}`, `脆弱性シャード +${amount}`);
        }
      }
      if (reward.traceAmple) {
        const amount = Math.max(0, Math.round(Number(reward.traceAmple || 0)));
        if (amount > 0) {
          state.items.traceAmple = (state.items.traceAmple || 0) + amount;
          pushPart(`TRACE 앰플 +${amount}`, `TRACE Ample +${amount}`, `TRACEアンプル +${amount}`);
        }
      }
      if (reward.nullSeed) {
        const amount = Math.max(0, Math.round(Number(reward.nullSeed || 0)));
        if (amount > 0) {
          state.items.nullSeed = (state.items.nullSeed || 0) + amount;
          pushPart(`NULL 시드 +${amount}`, `NULL Seed +${amount}`, `NULL Seed +${amount}`);
        }
      }
      if (reward.rom) {
        const amount = Math.max(0, Math.round(Number(reward.rom || 0)));
        if (amount > 0) {
          state.items.rom = (state.items.rom || 0) + amount;
          pushPart(`ROM +${amount}`, `ROM +${amount}`, `ROM +${amount}`);
        }
      }
      if (reward.codeProtection) {
        const amount = Math.max(0, Math.round(Number(reward.codeProtection || 0)));
        if (amount > 0) {
          state.items.codeProtection = (state.items.codeProtection || 0) + amount;
          pushPart(`코드 보호권 +${amount}`, `Code Protection +${amount}`, `コード保護券 +${amount}`);
        }
      }
      return parts;
    }

    function openDailyBonusBox() {
      ensureReleaseRewardDefaults();
      if ((state.items.dailyBonusBox || 0) < 1) {
        showToast(langText('Daily Bonus Box가 없습니다.', 'No Daily Bonus Box available.', 'Daily Bonus Boxがありません。'), 'warn');
        return;
      }
      state.items.dailyBonusBox -= 1;
      const baseCredits = 180 + Math.floor(Math.random() * 181);
      const pool = [
        { weight: 22, reward: { energyPack: 1 } },
        { weight: 16, reward: { weeklyToken: 5 } },
        { weight: 16, reward: { oneDay: 40 } },
        { weight: 14, reward: { zeroDayVulnerabilityShard: 10 } },
        { weight: 12, reward: { traceAmple: 50 } },
        { weight: 10, reward: { nullSeed: 15 } },
        { weight: 5,  reward: { rom: 5 } },
        { weight: 3,  reward: { codeProtection: 1 } },
        { weight: 2,  reward: { coin: 2 } }
      ];
      const total = pool.reduce((sum, item) => sum + item.weight, 0);
      let roll = Math.random() * total;
      let chosen = pool[0];
      for (const item of pool) {
        roll -= item.weight;
        if (roll <= 0) { chosen = item; break; }
      }
      const reward = Object.assign({ credits: baseCredits }, chosen.reward || {});
      const parts = grantInventoryRewards(reward);
      const msg = parts.join(' / ');
      log(langText(`[ITEM] Daily Bonus Box 개봉: ${msg}`, `[ITEM] Daily Bonus Box opened: ${msg}`, `[ITEM] Daily Bonus Box開封: ${msg}`), 'shop');
      showToast(langText('Daily Bonus Box 개봉 완료', 'Daily Bonus Box opened', 'Daily Bonus Boxを開封しました'), 'achievement');
      updateStatsUI();
      renderItemsPanel();
      renderZeroDayPanel();
      saveGame(true);
    }

    function useRomOnActiveCode() {
      ensureReleaseRewardDefaults();
      const code = ensureCodeSupportState(getActiveCodeInstance());
      if (!code) {
        showToast(langText('활성 CODE가 없습니다.', 'No active code selected.', 'アクティブCODEがありません。'), 'warn');
        return;
      }
      const cost = 5;
      if ((state.items.rom || 0) < cost) {
        showToast(langText(`ROM이 부족합니다. (필요 ${cost})`, `Need ${cost} ROM.`, `ROMが不足しています。(${cost}必要)`), 'warn');
        return;
      }
      if ((code.romLevel || 0) >= 5) {
        showToast(langText('이 CODE는 이미 최대 안정화 상태입니다.', 'This code is already fully stabilized.', 'このCODEはすでに最大まで安定化されています。'), 'warn');
        return;
      }
      state.items.rom -= cost;
      code.romLevel = (code.romLevel || 0) + 1;
      code.power += 3;
      log(langText(`[ITEM] ROM 안정화: ${code.name} 안정화 ${code.romLevel}단계 · PWR +3`, `[ITEM] ROM stabilization: ${code.name} Mk.${code.romLevel} · PWR +3`, `[ITEM] ROM安定化: ${code.name} 安定化 ${code.romLevel}段階 · PWR +3`), 'system');
      showToast(langText(`${code.name} 안정화 +1`, `${code.name} stabilized +1`, `${code.name} 安定化 +1`), 'achievement');
      renderCodeList();
      renderCodeDetail();
      updateStatsUI();
      renderItemsPanel();
      saveGame(true);
    }

    function useCodeProtection() {
      ensureReleaseRewardDefaults();
      const code = ensureCodeSupportState(getActiveCodeInstance());
      if (!code) {
        showToast(langText('보호할 활성 CODE가 없습니다.', 'No active code to protect.', '保護するアクティブCODEがありません。'), 'warn');
        return;
      }
      if ((state.items.codeProtection || 0) < 1) {
        showToast(langText('코드 보호권이 없습니다.', 'No Code Protection available.', 'コード保護券がありません。'), 'warn');
        return;
      }
      if ((code.protectionCharges || 0) >= 3) {
        showToast(langText('이 CODE는 이미 보호 충전이 가득합니다.', 'This code already has maximum protection.', 'このCODEはすでに保護チャージが満タンです。'), 'warn');
        return;
      }
      state.items.codeProtection -= 1;
      code.protectionCharges = (code.protectionCharges || 0) + 1;
      log(langText(`[ITEM] 코드 보호 적용: ${code.name} 보호 충전 +1`, `[ITEM] Code protection applied: ${code.name} +1 charge`, `[ITEM] コード保護適用: ${code.name} 保護チャージ +1`), 'system');
      showToast(langText(`${code.name} 보호 충전 +1`, `${code.name} protection +1`, `${code.name} 保護チャージ +1`), 'achievement');
      renderCodeDetail();
      renderItemsPanel();
      saveGame(true);
    }

    function usePickResidualData() {
      ensureReleaseRewardDefaults();
      const code = ensureCodeSupportState(getActiveCodeInstance());
      if (!code || !isSeasonPickCode(code)) {
        showToast(langText('시즌 PICK CODE를 활성화해야 합니다.', 'Activate a season PICK code first.', 'シーズンPICK CODEを先に有効化してください。'), 'warn');
        return;
      }
      if ((state.items.pickResidualData || 0) < 1) {
        showToast(langText('PICK 잔류 데이터가 없습니다.', 'No PICK Residual Data available.', 'PICK残留データがありません。'), 'warn');
        return;
      }
      if ((code.pickTuneLevel || 0) >= 10) {
        showToast(langText('이 PICK은 이미 충분히 조율되었습니다.', 'This PICK is already fully tuned.', 'このPICKはすでに十分に調律されています。'), 'warn');
        return;
      }
      state.items.pickResidualData -= 1;
      code.pickTuneLevel = (code.pickTuneLevel || 0) + 1;
      code.power += 4;
      code.shards = (code.shards || 0) + 1;
      state.stats.codeShardsTotal = (state.stats.codeShardsTotal || 0) + 1;
      log(langText(`[ITEM] PICK 잔류 데이터 주입: ${code.name} 조율 ${code.pickTuneLevel}단계 · PWR +4 · 조각 +1`, `[ITEM] PICK residual infusion: ${code.name} tune ${code.pickTuneLevel} · PWR +4 · shards +1`, `[ITEM] PICK残留データ注入: ${code.name} 調律 ${code.pickTuneLevel}段階 · PWR +4 · シャード +1`), 'system');
      showToast(langText(`${code.name} 조율 +1`, `${code.name} tuned +1`, `${code.name} 調律 +1`), 'achievement');
      renderCodeList();
      renderCodeDetail();
      renderItemsPanel();
      saveGame(true);
    }

    function useTraceAmple() {
      ensureZeroDayDefaults();
      const run = state.zeroDay && state.zeroDay.pve && state.zeroDay.pve.active;
      if (!run) {
        showToast(langText('TRACE 앰플은 ZERO-DAY 런 중에만 사용할 수 있습니다.', 'TRACE Ample can only be used during a ZERO-DAY run.', 'TRACEアンプルはZERO-DAYラン中にのみ使用できます。'), 'warn');
        return;
      }
      const cost = 25;
      if ((state.items.traceAmple || 0) < cost) {
        showToast(langText(`TRACE 앰플이 부족합니다. (필요 ${cost})`, `Need ${cost} TRACE Ample.`, `TRACEアンプルが不足しています。(${cost}必要)`), 'warn');
        return;
      }
      const before = Number(run.trace || 0);
      if (before <= 0.01) {
        showToast(langText('현재 TRACE가 안정적입니다.', 'TRACE is already stable.', '現在TRACEは安定しています。'), 'warn');
        return;
      }
      state.items.traceAmple -= cost;
      run.trace = Math.max(0, before - 0.18);
      run.log = run.log || [];
      run.log.push(`AID TRACE -${Math.round((before - run.trace) * 100)}%`);
      if (run.log.length > 12) run.log.shift();
      showToast(langText('TRACE 완화 적용', 'TRACE dampening applied', 'TRACE緩和を適用しました'), 'achievement');
      renderItemsPanel();
      updateZdDiscLive();
      saveGame(true);
    }

    function useNullSeed() {
      ensureZeroDayDefaults();
      const run = state.zeroDay && state.zeroDay.pve && state.zeroDay.pve.active;
      if (!run) {
        showToast(langText('NULL 시드는 ZERO-DAY 런 중에만 사용할 수 있습니다.', 'NULL Seed can only be used during a ZERO-DAY run.', 'NULL SeedはZERO-DAYラン中にのみ使用できます。'), 'warn');
        return;
      }
      const cost = 10;
      if ((state.items.nullSeed || 0) < cost) {
        showToast(langText(`NULL 시드가 부족합니다. (필요 ${cost})`, `Need ${cost} NULL Seed.`, `NULL Seedが不足しています。(${cost}必要)`), 'warn');
        return;
      }
      const def = ZD_DISC_DIFFICULTIES[run.diff] || ZD_DISC_DIFFICULTIES.easy;
      const patch = getZdPatch(run, def);
      const patchReduction = Math.min(0.12, Math.max(0, patch - 0.02));
      if (patchReduction <= 0.005) {
        showToast(langText('지금은 패치 지연 효과가 거의 없습니다.', 'Patch delay would have almost no effect right now.', '今はパッチ遅延の効果がほとんどありません。'), 'warn');
        return;
      }
      state.items.nullSeed -= cost;
      run.startedAt = Math.min(Date.now() - 400, run.startedAt + Math.round(def.durationMs * patchReduction));
      run.trace = Math.max(0, (run.trace || 0) - 0.04);
      run.log = run.log || [];
      run.log.push(`AID PATCH -${Math.round(patchReduction * 100)}% · TRACE -4%`);
      if (run.log.length > 12) run.log.shift();
      showToast(langText('패치 지연 적용', 'Patch delay applied', 'パッチ遅延を適用しました'), 'achievement');
      renderItemsPanel();
      updateZdDiscLive();
      saveGame(true);
    }

    function getGpuCreditMultiplier() {
      return 1 + 0.08 * Math.max(0, Number(state.gpuTier || 1) - 1);
    }

    function getGpuExpMultiplier() {
      return 1 + 0.04 * Math.max(0, Number(state.gpuTier || 1) - 1);
    }

    function applyGpuReward(reward) {
      return {
        credits: Math.max(1, Math.round((reward.credits || 0) * getGpuCreditMultiplier())),
        exp: Math.max(1, Math.round((reward.exp || 0) * getGpuExpMultiplier())),
        energyPack: reward.energyPack || 0
      };
    }

    // ══════════════════════════════════════════════════════
    //  SEASON / PASS SYSTEM
    // ══════════════════════════════════════════════════════
    const PASS_MAX_TIER = 30;
    const PASS_POINTS_PER_TIER = 100;
    const SEASON_1 = {
      id: 'season_1',
      name: 'Foundation Season',
      startsAt: new Date('2026-05-01T00:00:00+09:00'),
      endsAt: new Date('2026-05-31T23:59:59+09:00')
    };
    const SEASON_START_DATE = SEASON_1.startsAt;
    const SEASON_END_DATE = SEASON_1.endsAt;
    const RELEASE_300_TS = SEASON_1.startsAt.getTime();

    function formatCountdownShort(msLeft, lang = getLang()) {
      if (msLeft <= 0) return lang === 'en' ? 'now' : lang === 'ja' ? 'まもなく' : '곧 시작';
      if (msLeft >= DAY_MS) {
        const days = Math.ceil(msLeft / DAY_MS);
        return `D-${days}`;
      }
      const totalMinutes = Math.max(1, Math.ceil(msLeft / 60000));
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }

    function getSeasonPhaseInfo(nowMs = Date.now()) {
      const lang = getLang();
      if (nowMs < SEASON_START_DATE.getTime()) {
        const countdown = formatCountdownShort(SEASON_START_DATE.getTime() - nowMs, lang);
        return {
          state: 'locked',
          badge: 'PRESEASON',
          seasonLabel: lang === 'en' ? 'Season 1 · Foundation' : lang === 'ja' ? 'シーズン1 · Foundation' : '시즌 1 · Foundation',
          seasonName: lang === 'en' ? 'Season 1 — Foundation Season' : lang === 'ja' ? 'シーズン1 — Foundation Season' : '시즌 1 — Foundation Season',
          countdownLabel: lang === 'en' ? `Starts in ${countdown}` : lang === 'ja' ? `開始まで ${countdown}` : `시작까지 ${countdown}`,
          dateLabel: '2026-05-01 00:00 KST',
          note: lang === 'en' ? 'PASS rewards unlock when Season 1 begins.' : lang === 'ja' ? 'シーズン1開始後にPASS報酬が解放されます。' : '시즌 1이 시작되면 PASS 보상이 활성화됩니다.',
          todaySummary: lang === 'en' ? `Season 1 starts in ${countdown}` : lang === 'ja' ? `シーズン1開始まで ${countdown}` : `시즌 1 시작까지 ${countdown}`
        };
      }
      if (nowMs <= SEASON_END_DATE.getTime()) {
        const countdown = formatCountdownShort(SEASON_END_DATE.getTime() - nowMs, lang);
        return {
          state: 'active',
          badge: lang === 'en' ? 'ACTIVE' : lang === 'ja' ? '稼働中' : '진행 중',
          seasonLabel: lang === 'en' ? 'Season 1 · Foundation' : lang === 'ja' ? 'シーズン1 · Foundation' : '시즌 1 · Foundation',
          seasonName: lang === 'en' ? 'Season 1 — Foundation Season' : lang === 'ja' ? 'シーズン1 — Foundation Season' : '시즌 1 — Foundation Season',
          countdownLabel: lang === 'en' ? `Ends in ${countdown}` : lang === 'ja' ? `終了まで ${countdown}` : `종료까지 ${countdown}`,
          dateLabel: '2026-05-31 23:59 KST',
          note: lang === 'en' ? 'Season PICKS and base rewards are now live.' : lang === 'ja' ? 'シーズンPICKSと基本報酬が有効になりました。' : '시즌 PICKS와 기본 보상이 열렸습니다.',
          todaySummary: lang === 'en' ? 'Foundation Season active · PICK reward live' : lang === 'ja' ? 'Foundation Season 진행 중 · PICK報酬確認' : 'Foundation Season 진행 중 · PICK 보상 확인'
        };
      }
      return {
        state: 'ended',
        badge: lang === 'en' ? 'ENDED' : lang === 'ja' ? '終了' : '종료',
        seasonLabel: lang === 'en' ? 'Season 1 · Legacy' : lang === 'ja' ? 'シーズン1 · Legacy' : '시즌 1 · Legacy',
        seasonName: lang === 'en' ? 'Season 1 — Foundation Season' : lang === 'ja' ? 'シーズン1 — Foundation Season' : '시즌 1 — Foundation Season',
        countdownLabel: lang === 'en' ? 'Legacy settlement pending' : lang === 'ja' ? 'Legacy 精算待機中' : 'Legacy 정산 대기',
        dateLabel: '2026-05-31 23:59 KST',
        note: lang === 'en' ? 'Season 1 has ended.' : lang === 'ja' ? 'シーズン1は終了しました。' : '시즌 1이 종료되었습니다.',
        todaySummary: lang === 'en' ? 'Season 1 ended' : lang === 'ja' ? 'シーズン1終了' : '시즌 1 종료'
      };
    }

    function getCurrentSeasonKey(now) {
      const d = now ? new Date(now) : new Date();
      if (d < SEASON_START_DATE) return 'preseason';
      const y = d.getUTCFullYear();
      const m = String(d.getUTCMonth() + 1).padStart(2, '0');
      // adjust for KST offset (UTC+9)
      const kstHours = d.getUTCHours() + 9;
      const kstDay   = kstHours >= 24 ? d.getUTCDate() + 1 : d.getUTCDate();
      // season key = YYYY-MM (of the KST month, based on the 1st 05:00 KST boundary)
      const kstDate = new Date(d.getTime() + 9 * 3600 * 1000);
      const ky = kstDate.getUTCFullYear();
      const km = String(kstDate.getUTCMonth() + 1).padStart(2, '0');
      const seasonKey = `${ky}-${km}`;
      return seasonKey;
    }

    function getSeasonNumber(key) {
      if (!key || key === 'preseason') return 0;
      const [y, m] = key.split('-').map(Number);
      // Season 1 = 2026-05
      const base = (2026 - 1970) * 12 + 4; // months since epoch to 2026-04
      const months = (y - 1970) * 12 + (m - 1);
      return Math.max(0, months - base);
    }

    function ensureSeasonState() {
      const key = getCurrentSeasonKey();
      if (!state.season) {
        state.season = { currentKey: key, currentNumber: getSeasonNumber(key), passPoints: 0, passTier: 0, passClaimed: {}, shopPurchases: {}, pvpSeasonRecord: {} };
      }
      if (state.season.currentKey !== key) {
        // v3.0.0: 시즌 전환 — 스펙대로 유지/리셋 분리
        const prevKey = state.season.currentKey;

        // ── 유지 (재화) ──
        // state.items.coin       — COIN
        // state.items.oneDay     — OneDay
        // state.items.zeroDayVulnerability — 취약점
        // state.items.zeroDayVulnerabilityShard — 취약점 조각
        // (별도 처리 없음 — 그대로 유지됨)

        // ── 리셋 ──
        state.season.currentKey = key;
        state.season.currentNumber = getSeasonNumber(key);
        // 패스 진행도/수령 상태
        state.season.passPoints = 0;
        state.season.passTier = 0;
        state.season.passClaimed = {};
        state.season.shopPurchases = {};
        // PVP 시즌 레이팅/시즌 보드
        state.season.pvpSeasonRecord = {};
        if (state.zeroDay && state.zeroDay.pvp) {
          state.zeroDay.pvp.rating = 1000;
          state.zeroDay.pvp.seasonWins = 0;
          state.zeroDay.pvp.seasonLosses = 0;
        }
        // 주간 도전 상태 (강제 리셋 — 시즌과 별도로 매주 리셋되지만 시즌 시작 시점도 새로 시작)
        if (state.weeklyChallenge) {
          state.weeklyChallenge.weekKey = '';  // 다음 ensureWeeklyChallengeDefaults에서 새 weekKey로 재초기화
          state.weeklyChallenge.progress = {};
          state.weeklyChallenge.claimed = {};
          state.weeklyChallenge.bonusClaimed = false;
          state.weeklyChallenge.score = 0;
        }

        // 로그 + 토스트
        const isStart = prevKey === 'preseason';
        const msg = isStart
          ? (getLang() === 'en' ? `Season ${state.season.currentNumber} has begun!` : `시즌 ${state.season.currentNumber} 시작!`)
          : (getLang() === 'en' ? `New season: ${key} (PASS reset)` : `새 시즌: ${key} (PASS 리셋)`);
        log(`[SEASON] ${msg}`, 'system');
        try { showToast(msg, 'achievement'); } catch(e) {}
      }
    }

    function ensureReleaseRewardDefaults(meta = {}) {
      ensureSupportDefaults();
      state.items = state.items || {};
      state.items.dailyBonusBox = Number(state.items.dailyBonusBox || 0) || 0;
      state.items.rom = Number(state.items.rom || 0) || 0;
      state.items.codeProtection = Number(state.items.codeProtection || 0) || 0;
      state.items.pickResidualData = Number(state.items.pickResidualData || 0) || 0;
      state.claimFlags = (state.claimFlags && typeof state.claimFlags === 'object') ? state.claimFlags : {};
      if (typeof state.claimFlags.firstLogin_3_0_0 !== 'boolean') state.claimFlags.firstLogin_3_0_0 = false;
      if (typeof state.claimFlags.pre3ScaleCompensation !== 'boolean') state.claimFlags.pre3ScaleCompensation = false;

      const shouldDetectLegacy = meta.forceDetectLegacy || meta.hasRawClaimFlags === false || typeof state.claimFlags.pre3ScaleEligible !== 'boolean';
      if (shouldDetectLegacy) {
        const savedAt = Number(meta.savedAt || state.lastSavedAt || state.lastSeenAt || 0) || 0;
        const version = String(meta.version || '');
        const major = Number.parseInt(version.split('.')[0], 10);
        const eligibleByVersion = Number.isFinite(major) && major > 0 && major < 3;
        const eligibleByDate = savedAt > 0 && savedAt < RELEASE_300_TS;
        const eligibleBySource = meta.source === 'old-key' || meta.source === 'backup-prev';
        state.claimFlags.pre3ScaleEligible = !!(eligibleByVersion || eligibleByDate || eligibleBySource);
      }
    }

    function getHighestOwnedRarity() {
      let best = 'COMMON';
      let bestIdx = rarityOrder.indexOf(best);
      ownedCodes.forEach(code => {
        const idx = rarityOrder.indexOf(code && code.rarity);
        if (idx > bestIdx) {
          best = code.rarity;
          bestIdx = idx;
        }
      });
      return best;
    }

    function applyReleaseRewardBundle(bundle) {
      if (!bundle) return;
      state.items.dailyBonusBox = (state.items.dailyBonusBox || 0) + (bundle.dailyBonusBox || 0);
      state.items.rom = (state.items.rom || 0) + (bundle.rom || 0);
      state.items.codeProtection = (state.items.codeProtection || 0) + (bundle.codeProtection || 0);
      state.items.pickResidualData = (state.items.pickResidualData || 0) + (bundle.pickResidualData || 0);
      if (bundle.coin) {
        state.items.coin = (state.items.coin || 0) + bundle.coin;
        state.stats.coinEarnedTotal = (state.stats.coinEarnedTotal || 0) + bundle.coin;
      }
      if (bundle.oneDay) {
        state.items.oneDay = (state.items.oneDay || 0) + bundle.oneDay;
        state.stats.zeroDayOneDayEarnedTotal = (state.stats.zeroDayOneDayEarnedTotal || 0) + bundle.oneDay;
      }
      if (bundle.tag) {
        state.supporterTags = state.supporterTags || [];
        if (!state.supporterTags.includes(bundle.tag)) state.supporterTags.push(bundle.tag);
      }
    }

    function maybeApplyReleaseBundles(meta = {}) {
      ensureReleaseRewardDefaults(meta);
      const notices = [];
      let changed = false;
      if (Date.now() < RELEASE_300_TS) return { changed, notices };

      if (!state.claimFlags.firstLogin_3_0_0) {
        applyReleaseRewardBundle({ rom: 20, codeProtection: 1, dailyBonusBox: 2 });
        state.claimFlags.firstLogin_3_0_0 = true;
        changed = true;
        notices.push({
          toast: langText('3.0.0 첫 접속 보상 지급', '3.0.0 first-login rewards granted', '3.0.0 初回ログイン報酬 지급'),
          log: langText(
            '[시즌] 3.0.0 첫 접속 보상 지급: ROM +20 · 코드 보호권 +1 · Daily Bonus Box +2',
            '[Season] 3.0.0 first-login grant: ROM +20 · Code Protection +1 · Daily Bonus Box +2',
            '[シーズン] 3.0.0 初回ログイン配布: ROM +20 · コード保護券 +1 · Daily Bonus Box +2'
          ),
          extraLog: langText(
            '[시즌] ROM은 시즌 진행 중 열리는 CODE 안정화·복구 시스템에 사용됩니다.',
            '[Season] ROM will be used by the CODE stabilization and recovery systems that unlock during the season.',
            '[シーズン] ROMはシーズン中に開放されるCODE安定化・復旧システムで使用されます。'
          )
        });
      }

      if (!state.claimFlags.pre3ScaleCompensation) {
        let bundle = null;
        if (state.claimFlags.pre3ScaleEligible) {
          const highest = getHighestOwnedRarity();
          if (highest === 'OPERATION') {
            bundle = {
              rom: 50,
              codeProtection: 1,
              pickResidualData: 3,
              tag: 'Pre-3.0 OPERATION Holder'
            };
          } else if (highest === 'LEGENDARY') {
            bundle = {
              rom: 30,
              codeProtection: 1,
              tag: 'Pre-3.0 Veteran'
            };
          } else if (['EPIC'].includes(highest)) {
            bundle = {
              rom: 15,
              dailyBonusBox: 2
            };
          }
        }
        if (bundle) {
          applyReleaseRewardBundle(bundle);
          changed = true;
          notices.push({
            toast: langText('기존 유저 보상 지급', 'Legacy player grant delivered', '既存プレイヤー補償 지급'),
            log: langText(
              `[시즌] 기존 유저 보상 지급: ROM +${bundle.rom || 0}${bundle.codeProtection ? ' · 코드 보호권 +1' : ''}${bundle.pickResidualData ? ` · PICK 잔류 데이터 +${bundle.pickResidualData}` : ''}${bundle.dailyBonusBox ? ` · Daily Bonus Box +${bundle.dailyBonusBox}` : ''}${bundle.tag ? ` · ${bundle.tag}` : ''}`,
              `[Season] Legacy compensation granted: ROM +${bundle.rom || 0}${bundle.codeProtection ? ' · Code Protection +1' : ''}${bundle.pickResidualData ? ` · PICK Residual Data +${bundle.pickResidualData}` : ''}${bundle.dailyBonusBox ? ` · Daily Bonus Box +${bundle.dailyBonusBox}` : ''}${bundle.tag ? ` · ${bundle.tag}` : ''}`,
              `[シーズン] 既存プレイヤー補償 지급: ROM +${bundle.rom || 0}${bundle.codeProtection ? ' · コード保護券 +1' : ''}${bundle.pickResidualData ? ` · PICK残留データ +${bundle.pickResidualData}` : ''}${bundle.dailyBonusBox ? ` · Daily Bonus Box +${bundle.dailyBonusBox}` : ''}${bundle.tag ? ` · ${bundle.tag}` : ''}`
            )
          });
        }
        state.claimFlags.pre3ScaleCompensation = true;
      }

      return { changed, notices };
    }

    function flushReleaseNotices(notices) {
      if (!Array.isArray(notices) || !notices.length) return;
      notices.forEach((entry, index) => {
        setTimeout(() => {
          if (entry.log) log(entry.log, 'system');
          if (entry.extraLog) log(entry.extraLog, 'system');
          if (entry.toast) showToast(entry.toast, 'achievement');
        }, 120 + index * 220);
      });
    }

    function addPassPoints(pts) {
      if (!pts || pts <= 0) return;
      ensureSeasonState();
      if (state.season.currentKey === 'preseason') return;
      state.season.passPoints = (state.season.passPoints || 0) + pts;
      // check tier ups
      let newTier = Math.min(PASS_MAX_TIER, Math.floor(state.season.passPoints / PASS_POINTS_PER_TIER));
      if (newTier > (state.season.passTier || 0)) {
        state.season.passTier = newTier;
        state.stats.passTierReached = Math.max(state.stats.passTierReached || 0, newTier);
        showToast(getLang() === 'en' ? `Pass Tier ${newTier} reached!` : `패스 티어 ${newTier} 달성!`, 'achievement');
      }
    }

    // PASS tier reward definitions (30 tiers)
    const passTierRewards = Array.from({ length: 30 }, (_, i) => {
      const tier = i + 1;
      const isBig = tier % 5 === 0;
      return {
        tier,
        credits: isBig ? 300 + tier * 20 : 80 + tier * 8,
        energyPack: isBig ? 1 : 0,
        weeklyToken: tier % 10 === 0 ? 2 : 0,
        coin: tier === 15 ? 50 : (tier === 30 ? 150 : 0),
        pickCode: tier === 5 ? 'zero_trace' : null,
        label: `Tier ${tier}`
      };
    });

    function claimPassTierReward(tier) {
      ensureSeasonState();
      const tNum = Number(tier);
      if (isNaN(tNum) || tNum < 1 || tNum > PASS_MAX_TIER) return;
      if ((state.season.passTier || 0) < tNum) {
        showToast(getLang() === 'en' ? 'Tier not reached yet.' : '아직 해당 티어에 도달하지 않았습니다.', 'warn');
        return;
      }
      const claimedKey = String(tNum);
      if (state.season.passClaimed[claimedKey]) {
        showToast(getLang() === 'en' ? 'Already claimed.' : '이미 수령했습니다.', 'warn');
        return;
      }
      const reward = passTierRewards[tNum - 1];
      if (!reward) return;
      state.season.passClaimed[claimedKey] = Date.now();
      if (reward.credits)     { state.credits += reward.credits; state.stats.creditsEarnedTotal += reward.credits; }
      if (reward.energyPack)  { state.items.energyPack = (state.items.energyPack || 0) + reward.energyPack; }
      if (reward.weeklyToken) { state.items.weeklyToken = (state.items.weeklyToken || 0) + reward.weeklyToken; }
      if (reward.coin)        { state.items.coin = (state.items.coin || 0) + reward.coin; state.stats.coinEarnedTotal += reward.coin; }
      let pickGrant = null;
      if (reward.pickCode) {
        pickGrant = grantCodeFromTemplate(reward.pickCode, { duplicateShards: 5 });
      }
      // v3.0.0: 티어 25 도달 시 Quartz Terminal 스킨 자동 해금 (시즌 보상)
      if (tNum >= 25 && state.season.currentNumber >= 1) {
        try { unlockZdSkin('quartz_terminal'); } catch(e) {}
      }
      const msgParts = [];
      if (reward.credits) msgParts.push(getLang() === 'en' ? `Credits +${reward.credits}` : `크레딧 +${reward.credits}`);
      if (reward.energyPack) msgParts.push(getLang() === 'en' ? `EnergyPack +${reward.energyPack}` : `에너지팩 +${reward.energyPack}`);
      if (reward.coin) msgParts.push(`COIN +${reward.coin}`);
      if (pickGrant && reward.pickCode) {
        const pickName = (codeDefs[reward.pickCode] && codeDefs[reward.pickCode].name) || reward.pickCode;
        msgParts.push(pickGrant.type === 'new'
          ? `PICK ${pickName}`
          : (getLang() === 'en' ? `${pickName} shards +${pickGrant.shards}` : `${pickName} 조각 +${pickGrant.shards}`));
      }
      const msg = getLang() === 'en'
        ? `Pass Tier ${tNum} claimed: ${msgParts.join(' · ')}`
        : `패스 티어 ${tNum} 수령: ${msgParts.join(' · ')}`;
      log(msg, 'system');
      showToast(msg, 'achievement');
      updateStatsUI();
      renderCodeList();
      renderCodeDetail();
      renderPassPanel();
      saveGame(true);
    }

    function renderPassPanel() {
      ensureSeasonState();
      const el = document.getElementById('passPanel');
      if (!el) return;
      const key = state.season.currentKey || 'preseason';
      const num = state.season.currentNumber || 0;
      const pts = state.season.passPoints || 0;
      const tier = state.season.passTier || 0;
      const ptsInTier = pts % PASS_POINTS_PER_TIER;
      const isPreseason = key === 'preseason';
      const seasonInfo = getSeasonPhaseInfo();
      const creditsSeasonEl = document.getElementById('creditsSeasonLabel');
      if (creditsSeasonEl) creditsSeasonEl.textContent = seasonInfo.badge;

      el.innerHTML = `
        <div class="pass-header">
          <span class="badge">${seasonInfo.seasonLabel}</span>
          ${!isPreseason ? '' : ''}
        </div>
        <div class="items-coming-note small">${langText(
          'PASS는 시즌 장기 보상 패널입니다. WEEKLY와 시즌 성과로 얻은 패스 포인트를 여기서 누적하고 티어 보상을 수령합니다.',
          'PASS is the season-long reward panel. Build pass points through WEEKLY goals and season progress, then claim tier rewards here.',
          'PASSはシーズン長期報酬パネルです。WEEKLY目標とシーズン進行で得たパスポイントをここで蓄積し、ティア報酬を受け取ります。'
        )}</div>
        ${isPreseason ? `
        <!-- v3.0.0: 프리시즌 안내 카드 (여백 축소, 정보 밀도 향상) -->
        <div class="pass-preseason-card">
          <div class="pass-preseason-title">${seasonInfo.seasonName}</div>
          <div class="pass-preseason-countdown">${seasonInfo.countdownLabel}</div>
          <div class="pass-preseason-date">${seasonInfo.dateLabel}</div>
          <div class="pass-preseason-note small">${seasonInfo.note}</div>
        </div>
        ` : `
        <div class="pass-preseason-card">
          <div class="pass-preseason-title">${seasonInfo.seasonName}</div>
          <div class="pass-preseason-countdown">${seasonInfo.countdownLabel}</div>
          <div class="pass-preseason-date">${seasonInfo.dateLabel}</div>
          <div class="pass-preseason-note small">${seasonInfo.note}</div>
        </div>
        <div class="pass-progress-row">
          <span>${getLang()==='en' ? 'Tier' : '티어'} ${tier} / ${PASS_MAX_TIER}</span>
          <div class="pass-bar"><div class="pass-bar-fill" style="width:${Math.round(ptsInTier)}%"></div></div>
          <span>${ptsInTier} / ${PASS_POINTS_PER_TIER} pts</span>
        </div>
        <div class="pass-tier-list">
          ${(() => {
            // #6: 수령 완료 티어 숨김, 마지막 수령 티어만 접혀서 표시
            const lastClaimed = [...passTierRewards].reverse().find(r => !!state.season.passClaimed[String(r.tier)]);
            return passTierRewards.map(r => {
              const reached  = tier >= r.tier;
              const claimed  = !!state.season.passClaimed[String(r.tier)];
              // 수령 완료된 티어 중 마지막 수령 티어가 아니면 숨김 (#6)
              if (claimed && (!lastClaimed || r.tier !== lastClaimed.tier)) return '';
              const canClaim = reached && !claimed;
              const parts = [];
              if (r.credits)     parts.push(`+${r.credits}cr`);
              if (r.energyPack)  parts.push(`+${r.energyPack}EP`);
              if (r.weeklyToken) parts.push(`+${r.weeklyToken}TK`);
              if (r.coin)        parts.push(`+${r.coin}COIN`);
              if (r.pickCode)    parts.push(`PICK ZERO_TRACE`);
              return `<div class="pass-tier-row ${claimed ? 'claimed' : ''} ${canClaim ? 'can-claim' : ''} ${reached && !claimed ? 'reached' : ''}">
                <span class="pass-tier-num">T${r.tier}</span>
                <span class="pass-tier-reward">${parts.join(' ')}${claimed ? ` · ${getLang()==='en' ? 'Claimed' : '수령 완료'}` : ''}</span>
                ${!claimed ? `<button type="button" data-claim-tier="${r.tier}" ${canClaim ? '' : 'disabled'}>${getLang()==='en' ? 'Claim' : '수령'}</button>` : ''}
              </div>`;
            }).join('');
          })()}
        </div>
        `}
      `;
      el.querySelectorAll('[data-claim-tier]').forEach(btn => {
        btn.addEventListener('click', () => claimPassTierReward(btn.dataset.claimTier));
      });
    }

    // OPS SHOP (inside WEEKLY CHALLENGE panel)
    const opsShopDefs = [
      { id: 'ops_quick_charge', nameKo: '퀵 차지 셀', nameEn: 'Quick Charge Cell', tokenCost: 1, scoreGate: 0, desc: '즉시 에너지 +8', descEn: 'Instantly restore +8 energy' },
      { id: 'ops_credit_cache', nameKo: '크레딧 캐시', nameEn: 'Credit Cache', tokenCost: 2, scoreGate: 200, desc: '크레딧 +500', descEn: 'Credits +500' },
      { id: 'ops_overclock', nameKo: '오버클럭 스크립트', nameEn: 'Overclock Script', tokenCost: 2, scoreGate: 300, desc: '다음 해킹 성공 확률 +15%p (1회)', descEn: 'Next hack success chance +15%p (once)' },
      { id: 'ops_buffer', nameKo: '실패 완충 모듈', nameEn: 'Failure Buffer Module', tokenCost: 3, scoreGate: 400, desc: 'RISK/EXTREME 실패 페널티 에너지 면제 2회', descEn: 'Skip RISK/EXTREME failure energy penalty ×2' },
      { id: 'ops_op_rotation', nameKo: 'OPERATION 코드 로테이션', nameEn: 'OPERATION Code Rotation', tokenCost: 5, scoreGate: 600, desc: 'OPERATION 코드 스캔 1회 보장 (희소)', descEn: 'Guaranteed OPERATION code scan ×1 (rare)' }
    ];

    function buyOpsShopItem(id) {
      const def = opsShopDefs.find(d => d.id === id);
      if (!def) return;
      const token = state.items.weeklyToken || 0;
      const score = (state.weeklyChallenge && state.weeklyChallenge.score) || 0;
      if (score < def.scoreGate) { showToast(getLang()==='en' ? `Need SCORE ${def.scoreGate}+` : `SCORE ${def.scoreGate}+ 필요`, 'warn'); return; }
      if (token < def.tokenCost) { showToast(getLang()==='en' ? 'Not enough TOKEN.' : 'TOKEN이 부족합니다.', 'warn'); return; }
      state.items.weeklyToken = token - def.tokenCost;
      state.stats.weeklyTokensSpentTotal = (state.stats.weeklyTokensSpentTotal || 0) + def.tokenCost;
      state.stats.eventShopPurchaseCount = (state.stats.eventShopPurchaseCount || 0) + 1;
      state.weeklyChallenge.shopPurchases = state.weeklyChallenge.shopPurchases || {};
      state.weeklyChallenge.shopPurchases[id] = (state.weeklyChallenge.shopPurchases[id] || 0) + 1;
      // apply item effect
      if (id === 'ops_quick_charge')  { state.energy = Math.min(state.energyMax, state.energy + 8); }
      if (id === 'ops_credit_cache')  { state.credits += 500; state.stats.creditsEarnedTotal += 500; }
      if (id === 'ops_overclock')     { if (!state._opsOverclockCharges) state._opsOverclockCharges = 0; state._opsOverclockCharges += 1; }
      if (id === 'ops_buffer')        { if (!state._opsBufferCharges) state._opsBufferCharges = 0; state._opsBufferCharges += 2; }
      if (id === 'ops_op_rotation')   { state._opsForcedOpScan = true; }
      const name = getLang()==='en' ? def.nameEn : def.nameKo;
      showToast(getLang()==='en' ? `OPS: ${name} purchased` : `OPS 구매: ${name}`, 'achievement');
      updateStatsUI();
      saveGame(true);
    }

    // ══════════════════════════════════════════════════════
    //  ZERO-DAY 3.0 SYSTEM
    // ══════════════════════════════════════════════════════
    // ─────────────────────────────────────────────────────────────────────────
    // ZERO-DAY DISCOVERY v3.0.0 — 패치 타임어택 코어 루프
    // 구 터미널 커맨드 방식(ZD_CMDS) 완전 폐기 → 주입/회수/중단 3액션으로 단순화
    // ─────────────────────────────────────────────────────────────────────────

    // 난이도 설정: timerMs=패치 완료까지, injectPerTap=1탭당 주입량,
    // traceBase=기본 TRACE 증가, traceHighAdd=90%+ 위험구간 추가 TRACE,
    // maxInject=최대 주입량, baseScore=보상 기준, clearMin=CLEAR 인정 최소 주입량
    const ZD_DISC_DIFFICULTIES = {
      intro:  { label:'INTRO',  ko:'입문',   timerMs:60000, injectPerTap:6,  traceBase:0.022, traceHighAdd:0.08, maxInject:80,  baseScore:40,  clearMin:30, free:true  },
      easy:   { label:'EASY',   ko:'쉬움',   timerMs:50000, injectPerTap:7,  traceBase:0.028, traceHighAdd:0.10, maxInject:100, baseScore:75,  clearMin:40, free:false },
      normal: { label:'NORMAL', ko:'보통',   timerMs:40000, injectPerTap:8,  traceBase:0.035, traceHighAdd:0.14, maxInject:130, baseScore:130, clearMin:55, free:false },
      hard:   { label:'HARD',   ko:'어려움', timerMs:30000, injectPerTap:9,  traceBase:0.045, traceHighAdd:0.20, maxInject:160, baseScore:210, clearMin:75, free:false },
      danger: { label:'DANGER', ko:'위험',   timerMs:20000, injectPerTap:10, traceBase:0.060, traceHighAdd:0.32, maxInject:200, baseScore:340, clearMin:100,free:false },
    };

    // 타이머/홀드 인터벌 — 런 수명 관리
    let _zdTimerId   = null;
    let _zdHoldTimer = null;

    function startZdDiscTimer() {
      stopZdDiscTimer();
      _zdTimerId = setInterval(() => {
        const run = state.zeroDay && state.zeroDay.pve && state.zeroDay.pve.active;
        if (!run) { stopZdDiscTimer(); return; }
        const def = ZD_DISC_DIFFICULTIES[run.diff] || ZD_DISC_DIFFICULTIES.easy;
        const patch = Math.min(1.0, (Date.now() - run.startedAt) / def.timerMs);
        if (patch >= 1.0) {
          stopZdDiscTimer();
          stopZdHold();
          finishZdDiscRun('cut', run, def);
          return;
        }
        // 패널 live 갱신 (in-place 업데이트 — 홀드 중 버튼 유지)
        if (document.getElementById('zeroDayPanel')) updateZdDiscLive();
      }, 150);
    }

    function stopZdDiscTimer() {
      if (_zdTimerId !== null) { clearInterval(_zdTimerId); _zdTimerId = null; }
    }

    function stopZdHold() {
      if (_zdHoldTimer !== null) { clearInterval(_zdHoldTimer); _zdHoldTimer = null; }
    }

    function getZdPatch(run, def) {
      if (!run || !run.startedAt || !def) return 0;
      return Math.min(1.0, (Date.now() - run.startedAt) / def.timerMs);
    }

    function ensureZeroDayDefaults() {
      state.zeroDay = state.zeroDay || {};
      state.zeroDay.onboardingCompleted = !!state.zeroDay.onboardingCompleted;
      state.zeroDay.pve = state.zeroDay.pve || { active: null, bestDepth: 0, bestScore: 0, runs: 0, extracts: 0, difficulty: 'easy' };
      state.zeroDay.pvp = state.zeroDay.pvp || { active: null, rating: 1000, seasonWins: 0, seasonLosses: 0, attacksTotal: 0, defensesTotal: 0 };
      state.zeroDay.defense = state.zeroDay.defense || { slots: 3, cards: [], usesThisMatch: 0 };
      state.zeroDay.unlocks = state.zeroDay.unlocks || {};
      state.zeroDay.tier = state.zeroDay.tier || 1;
      state.zeroDay.skins = state.zeroDay.skins || [];
      state.zeroDay.activeSkin = state.zeroDay.activeSkin || 'zero_shell';
      // v3.0.0 fix: 취약점 재화 키를 ensureZeroDayDefaults에서도 보장 (단일 진실)
      state.items = state.items || {};
      state.items.zeroDayVulnerability = Number(state.items.zeroDayVulnerability || 0);
      state.items.zeroDayVulnerabilityShard = Number(state.items.zeroDayVulnerabilityShard || 0);
      state.items.oneDay = Number(state.items.oneDay || 0);
      state.stats = state.stats || {};
      state.stats.zeroDayPveClearCount = state.stats.zeroDayPveClearCount || 0;
      state.stats.zeroDayPveEscapeCount = state.stats.zeroDayPveEscapeCount || 0;
      state.stats.zeroDayPvpAttackWinCount = state.stats.zeroDayPvpAttackWinCount || 0;
    }

    // v3.0.0 fix: 취약점 단일 게터 — 표시/검사/차감 모두 이 함수를 통해 일관된 값 보장
    function getZdVulnCount() {
      return Number((state.items && state.items.zeroDayVulnerability) || 0);
    }
    function setZdVulnCount(n) {
      state.items = state.items || {};
      state.items.zeroDayVulnerability = Math.max(0, Number(n) || 0);
    }
    function consumeZdVuln(n = 1) {
      const cur = getZdVulnCount();
      if (cur < n) return false;
      setZdVulnCount(cur - n);
      return true;
    }

    // v3.0.0: ZD_NODE_TYPES / ZD_NODE_POOLS / generateZdNodeSequence / getZdDetectionStage / ZD_PVE_DIFFICULTIES
    // 구 터미널 커맨드 기반 노드 시스템 → ZERO-DAY DISCOVERY 타임어택으로 완전 교체됨 (폐기)

    // ══════════════════════════════════════════════════════
    //  v3.0.0: ZERO-DAY 방어자 카드 시스템
    // ══════════════════════════════════════════════════════
    const ZD_DEFENSE_CARDS = {
      mask:     { id:'mask',     ko:'위장',     en:'Mask',       desc:'공격자의 정찰 명령을 1회 차단', descEn:'Block 1 attacker recon command', effect:{ blockRecon: 1 } },
      delay:    { id:'delay',    ko:'지연',     en:'Delay',      desc:'공격자의 다음 행동에 +20% 탐지', descEn:'+20% detection on attacker next action', effect:{ detectionPenalty: 0.2 } },
      trace:    { id:'trace',    ko:'역추적',   en:'Trace',      desc:'공격자가 사용한 마지막 명령을 카드 사용 슬롯에 차단(중복 불가)', descEn:'Block attacker last command type', effect:{ blockLastType: true } },
      surveil:  { id:'surveil',  ko:'감시',     en:'Surveil',    desc:'공격자의 다음 명령을 노출 (UI 힌트)', descEn:'Reveal attacker next command (UI hint)', effect:{ revealNext: true } },
      lockdown: { id:'lockdown', ko:'봉쇄',     en:'Lockdown',   desc:'공격자의 침투 명령을 1회 무효화', descEn:'Negate 1 attacker infiltrate command', effect:{ blockInfiltrate: 1 } }
    };

    // 슬롯 확장 비용 (스펙: 3 기본 / 4슬롯 500 OneDay / 5슬롯 1500 OneDay)
    const ZD_SLOT_EXPAND_COST = {
      4: 500,
      5: 1500
    };

    // ══════════════════════════════════════════════════════
    //  v3.0.0: ZERO-DAY 스킨 3종
    // ══════════════════════════════════════════════════════
    const ZD_SKINS = {
      zero_shell: {
        id:'zero_shell', ko:'Zero Shell', en:'Zero Shell',
        desc:'기본 ZERO-DAY 터미널. 표준 모노 그린 컬러 스킴.',
        descEn:'Default ZERO-DAY terminal. Standard mono-green color scheme.',
        unlocked:true,
        cssClass:'zd-skin-zero-shell'
      },
      glass_console: {
        id:'glass_console', ko:'Glass Console', en:'Glass Console',
        desc:'반투명 콘솔 효과. COIN 상점에서 200 COIN으로 구매.',
        descEn:'Translucent console effect. Buy with 200 COIN in shop.',
        unlocked:false,
        cost:{ currency:'coin', amount:200 },
        cssClass:'zd-skin-glass-console'
      },
      quartz_terminal: {
        id:'quartz_terminal', ko:'Quartz Terminal', en:'Quartz Terminal',
        desc:'결정 표시 효과 + 청량한 컬러. 시즌 1 PASS 티어 25 보상.',
        descEn:'Crystal display effect + cool tones. Season 1 PASS Tier 25 reward.',
        unlocked:false,
        unlockVia:{ type:'pass_tier', season:1, tier:25 },
        cssClass:'zd-skin-quartz-terminal'
      }
    };

    function isZdSkinUnlocked(skinId) {
      const skin = ZD_SKINS[skinId];
      if (!skin) return false;
      if (skin.unlocked) return true;
      return !!(state.zeroDay.skins && state.zeroDay.skins.includes(skinId));
    }

    function unlockZdSkin(skinId, silent) {
      if (!ZD_SKINS[skinId]) return false;
      state.zeroDay.skins = state.zeroDay.skins || [];
      if (state.zeroDay.skins.includes(skinId)) return false;
      state.zeroDay.skins.push(skinId);
      if (!silent) {
        const skin = ZD_SKINS[skinId];
        const name = getLang()==='en' ? skin.en : skin.ko;
        showToast((getLang()==='en'?'ZD Skin Unlocked: ':'ZD 스킨 해금: ') + name, 'achievement');
        log(`[ZERO-DAY] ${getLang()==='en'?'Skin unlocked':'스킨 해금'}: ${name}`, 'system');
      }
      return true;
    }

    function applyActiveZdSkin() {
      const skinId = (state.zeroDay && state.zeroDay.activeSkin) || 'zero_shell';
      const el = document.getElementById('zeroDayPanel');
      if (!el) return;
      // 모든 zd-skin-* 클래스 제거 후 활성 스킨 적용
      Array.from(el.classList).forEach(c => {
        if (c.startsWith('zd-skin-')) el.classList.remove(c);
      });
      const skin = ZD_SKINS[skinId];
      if (skin && skin.cssClass) el.classList.add(skin.cssClass);
    }

    // ══════════════════════════════════════════════════════
    //  v3.0.0: ZERO-DAY 코드/프로토콜 4종
    // ══════════════════════════════════════════════════════
    const ZD_PROTOCOLS = {
      protocol_phantom: {
        id:'protocol_phantom',
        ko:'PHANTOM', en:'PHANTOM',
        descKo:'INJECT 시 TRACE 증가량 -25% (저위험 운영 특화)',
        descEn:'TRACE gain per inject -25% (stealth specialist)',
        condition:{ type:'pveRuns', target:30 },
        cost:{ currency:'oneDay', amount:300 },
        effect:{ reconDetectionMult:0.75 }   // reconDetectionMult < 1.0 → TRACE gain multiplier
      },
      protocol_breaker: {
        id:'protocol_breaker',
        ko:'BREAKER', en:'BREAKER',
        descKo:'DATA INJECT 1탭당 주입량 +15%',
        descEn:'DATA INJECT amount per tap +15%',
        condition:{ type:'pveRuns', target:10 },
        cost:{ currency:'oneDay', amount:500 },
        effect:{ infiltrateSuccessBonus:0.15 } // infiltrateSuccessBonus → inject amount multiplier
      },
      protocol_shroud: {
        id:'protocol_shroud',
        ko:'SHROUD', en:'SHROUD',
        descKo:'추출 시 탐지율 -30% (1회 추가 보호막)',
        descEn:'-30% detection on extraction (1 extra shield)',
        condition:{ type:'lowDetectExtracts', target:10 },
        cost:{ currency:'oneDay', amount:800 },
        effect:{ extractionShield:1, extractionDetectionReduction:0.30 }
      },
      protocol_overlord: {
        id:'protocol_overlord',
        ko:'OVERLORD', en:'OVERLORD',
        descKo:'모든 ZD 명령 효과 +10%, 탈출 시 OneDay +20%',
        descEn:'All ZD command effects +10%, exit grants +20% OneDay',
        condition:{ type:'passTier', target:25 },
        cost:{ currency:'oneDay', amount:1500 },
        effect:{ allCommandBonus:0.10, exitOneDayBonus:0.20 }
      }
    };

    function getZdProtocolProgress(protocolId) {
      const def = ZD_PROTOCOLS[protocolId];
      if (!def) return { ok:false, current:0, target:0 };
      const cond = def.condition;
      let current = 0;
      switch (cond.type) {
        case 'pveRuns':
          current = state.stats.zeroDayPveClearCount || 0; break;
        case 'pvpWins':
          current = state.stats.zeroDayPvpAttackWinCount || 0; break;
        case 'lowDetectExtracts':
          current = state.stats.zeroDayLowDetectionExtracts || 0; break;
        case 'passTier':
          current = (state.season && state.season.passTier) || 0; break;
      }
      return {
        ok: current >= cond.target,
        current,
        target: cond.target
      };
    }

    function isZdProtocolUnlocked(protocolId) {
      return !!(state.zeroDay.unlocks && state.zeroDay.unlocks[protocolId]);
    }

    function tryUnlockZdProtocol(protocolId) {
      const def = ZD_PROTOCOLS[protocolId];
      if (!def) return { ok:false, reason:'unknown' };
      if (isZdProtocolUnlocked(protocolId)) return { ok:false, reason:'already' };
      const prog = getZdProtocolProgress(protocolId);
      if (!prog.ok) return { ok:false, reason:'condition' };
      const need = def.cost.amount;
      const balance = (state.items[def.cost.currency] || 0);
      if (balance < need) return { ok:false, reason:'currency' };
      state.items[def.cost.currency] = balance - need;
      if (def.cost.currency === 'oneDay') {
        state.stats.zeroDayOneDaySpentTotal = (state.stats.zeroDayOneDaySpentTotal || 0) + need;
      }
      state.zeroDay.unlocks = state.zeroDay.unlocks || {};
      state.zeroDay.unlocks[protocolId] = Date.now();
      const name = getLang()==='en' ? def.en : def.ko;
      showToast((getLang()==='en'?'Protocol unlocked: ':'프로토콜 해금: ') + name, 'achievement');
      log(`[ZERO-DAY] ${getLang()==='en'?'Protocol unlocked':'프로토콜 해금'}: ${name}`, 'system');
      return { ok:true };
    }

    function getZdProtocolEffectSum() {
      const sum = {
        reconDetectionMult: 1.0,
        infiltrateSuccessBonus: 0,
        extractionShield: 0,
        extractionDetectionReduction: 0,
        allCommandBonus: 0,
        exitOneDayBonus: 0
      };
      Object.keys(ZD_PROTOCOLS).forEach(pid => {
        if (!isZdProtocolUnlocked(pid)) return;
        const eff = ZD_PROTOCOLS[pid].effect || {};
        Object.keys(eff).forEach(k => {
          if (k === 'reconDetectionMult') sum[k] *= eff[k];
          else sum[k] = (sum[k] || 0) + eff[k];
        });
      });
      return sum;
    }

    // ── ZERO-DAY DISCOVERY v3.0.0: 코어 런 함수 ────────────────────────────

    function canStartZdDisc() {
      const diff = (state.zeroDay.pve && state.zeroDay.pve.difficulty) || 'easy';
      const def  = ZD_DISC_DIFFICULTIES[diff] || ZD_DISC_DIFFICULTIES.easy;
      if (def.free) {
        const todayKey = getDayKey();
        if ((state.zeroDay.pve.introDailyKey || '') === todayKey) {
          return { ok: false, reason: getLang()==='en' ? 'Intro free run used today. Come back tomorrow.' : '오늘 입문 무료 런을 이미 사용했습니다. 내일 다시 시도하세요.' };
        }
        return { ok: true };
      }
      if (getZdVulnCount() < 1) {
        return { ok: false, reason: getLang()==='en' ? 'Need 1 Vulnerability to start.' : '취약점 1개가 필요합니다.' };
      }
      return { ok: true };
    }

    function startZdDiscRun() {
      ensureZeroDayDefaults();
      if (!state.zeroDay.onboardingCompleted) {
        showToast(getLang()==='en' ? 'Complete onboarding first.' : '먼저 온보딩을 완료하세요.', 'warn');
        renderZeroDayPanel();
        return;
      }
      if (state.zeroDay.pve.active) {
        showToast(getLang()==='en' ? 'Run already in progress.' : '이미 런이 진행 중입니다.', 'warn');
        return;
      }
      const check = canStartZdDisc();
      if (!check.ok) { showToast(check.reason, 'warn'); return; }
      const diff = (state.zeroDay.pve && state.zeroDay.pve.difficulty) || 'easy';
      const def  = ZD_DISC_DIFFICULTIES[diff] || ZD_DISC_DIFFICULTIES.easy;

      const runActive = {
        diff,
        injected:  0,
        trace:     0,
        score:     0,
        startedAt: Date.now(),
        log:       []
      };

      if (def.free) {
        const todayKey = getDayKey();
        state.zeroDay.pve.introDailyKey = todayKey;
      } else {
        if (!consumeZdVuln(1)) {
          showToast(getLang()==='en' ? 'Vulnerability sync error. Try again.' : '취약점 수가 일치하지 않습니다. 다시 시도하세요.', 'warn');
          renderZeroDayPanel();
          return;
        }
      }

      state.zeroDay.pve.active = runActive;
      state.zeroDay.pve.runs   = (state.zeroDay.pve.runs || 0) + 1;
      state.stats.zeroDayRunCount = (state.stats.zeroDayRunCount || 0) + 1;
      state.missionProgress = state.missionProgress || { weekly: {}, month: {} };
      state.missionProgress.weekly.zeroDayRuns = (state.missionProgress.weekly.zeroDayRuns || 0) + 1;
      state.missionProgress.month.zeroDayRuns  = (state.missionProgress.month.zeroDayRuns  || 0) + 1;
      checkMissions('weekly');
      checkMissions('month');
      playSfx('hack');
      startZdDiscTimer();
      renderZeroDayPanel();
      saveGame(true);
    }

    // INJECT 탭/홀드: 데이터 주입 → TRACE 증가 (PHANTOM 프로토콜로 완화)
    function doZdInject() {
      ensureZeroDayDefaults();
      const run = state.zeroDay.pve.active;
      if (!run) return;
      const def   = ZD_DISC_DIFFICULTIES[run.diff] || ZD_DISC_DIFFICULTIES.easy;
      const patch = getZdPatch(run, def);

      if (run.injected >= def.maxInject) {
        showToast(getLang()==='en' ? 'MAX INJECT reached' : '최대 주입량 도달', 'warn');
        return;
      }

      const protoEff = getZdProtocolEffectSum();
      // BREAKER: infiltrateSuccessBonus → inject amount multiplier (+15% per tap)
      const breakerMult  = 1 + (protoEff.infiltrateSuccessBonus || 0);
      const injectAmount = Math.round(def.injectPerTap * breakerMult);
      const actualInject = Math.min(injectAmount, def.maxInject - run.injected);

      // TRACE gain: base + exponential spike above 90% patch
      // PHANTOM: reconDetectionMult → trace gain multiplier (0.75 = -25% TRACE)
      const phantomMult = protoEff.reconDetectionMult || 1.0;
      const highRisk    = Math.max(0, (patch - 0.9) / 0.1);
      const traceGain   = (def.traceBase + def.traceHighAdd * highRisk * highRisk) * phantomMult;

      run.injected = Math.min(def.maxInject, (run.injected || 0) + actualInject);
      run.trace    = Math.min(1.0, (run.trace || 0) + traceGain);
      run.score    = (run.score || 0) + Math.round(actualInject * 2);

      const patchPct = Math.round(patch * 100);
      const tracePct = Math.round(run.trace * 100);
      run.log = run.log || [];
      run.log.push(`INJ +${actualInject} [${run.injected}/${def.maxInject}] · TRACE ${tracePct}% · PATCH ${patchPct}%`);
      if (run.log.length > 12) run.log.shift();

      // TRACED: TRACE가 100%에 도달하면 즉시 종료
      if (run.trace >= 1.0) {
        stopZdDiscTimer();
        stopZdHold();
        finishZdDiscRun('traced', run, def);
        return;
      }

      updateZdDiscLive();
    }

    // RECOVER: 데이터 회수 (런 종료) — 패치 완료 전이면 CLEAR, 이후면 CUT
    function doZdRecover() {
      ensureZeroDayDefaults();
      const run = state.zeroDay.pve.active;
      if (!run) return;
      const def   = ZD_DISC_DIFFICULTIES[run.diff] || ZD_DISC_DIFFICULTIES.easy;
      const patch = getZdPatch(run, def);
      stopZdDiscTimer();
      stopZdHold();
      // patch >= 1.0: 타이머가 아직 CUT을 못 쐈을 때의 레이스 컨디션 처리
      finishZdDiscRun(patch >= 1.0 ? 'cut' : 'clear', run, def);
    }

    // ABORT: 런 중단 (보상 없음, 확인 다이얼로그)
    function doZdAbort() {
      ensureZeroDayDefaults();
      const run = state.zeroDay.pve.active;
      if (!run) return;
      const def = ZD_DISC_DIFFICULTIES[run.diff] || ZD_DISC_DIFFICULTIES.easy;
      if (!window.confirm(getLang()==='en'
        ? 'Abort the run? No rewards will be given.'
        : '런을 중단하시겠습니까? 보상이 지급되지 않습니다.')) return;
      stopZdDiscTimer();
      stopZdHold();
      finishZdDiscRun('abort', run, def);
    }

    // endState: 'clear' | 'cut' | 'traced' | 'abort'
    function finishZdDiscRun(endState, run, def) {
      stopZdDiscTimer();
      stopZdHold();
      const injected = run.injected || 0;
      const score    = run.score    || 0;
      const trace    = run.trace    || 0;

      // CLEAR 인정: endState==='clear' + 최소 주입량(clearMin) 달성
      const isClear = endState === 'clear' && injected >= def.clearMin;
      // 실제 결과 라벨 (RECOVER를 눌렀지만 clearMin 미달이면 CUT으로 처리)
      const actualState = isClear
        ? 'clear'
        : (endState === 'clear' && injected < def.clearMin) ? 'cut'
        : endState;

      // 보상 배율: CLEAR 100% / CUT 20% / TRACED·ABORT 0%
      const rewardMult = actualState === 'clear' ? 1.0 : actualState === 'cut' ? 0.2 : 0.0;

      const protoEff = getZdProtocolEffectSum();
      let rewardOneDay = Math.round((def.baseScore + score * 0.1) * rewardMult);
      // OVERLORD: CLEAR 시 OneDay +20%
      if (actualState === 'clear' && protoEff.exitOneDayBonus > 0) {
        rewardOneDay = Math.round(rewardOneDay * (1 + protoEff.exitOneDayBonus));
      }
      const rewardCredits = Math.round((def.baseScore * 0.5 + score * 0.2) * rewardMult);

      // 런 초기화
      state.zeroDay.pve.active = null;

      // 통계 업데이트
      if (actualState === 'clear') {
        state.zeroDay.pve.extracts        = (state.zeroDay.pve.extracts || 0) + 1;
        state.zeroDay.pve.bestScore       = Math.max(state.zeroDay.pve.bestScore || 0, score);
        state.stats.zeroDayPveClearCount  = (state.stats.zeroDayPveClearCount  || 0) + 1;
        state.stats.zeroDayPveEscapeCount = (state.stats.zeroDayPveEscapeCount || 0) + 1;
        const diffOrder = ['intro','easy','normal','hard','danger'];
        const diffIdx     = diffOrder.indexOf(run.diff);
        const bestDiffIdx = diffOrder.indexOf(state.stats.zeroDayBestExtractDiff || 'intro');
        if (diffIdx > bestDiffIdx) state.stats.zeroDayBestExtractDiff = run.diff;
        // TRACE < 50% → PHANTOM 프로토콜 해금 조건(저탐지 클리어) 카운트
        if (trace < 0.5) state.stats.zeroDayLowDetectionExtracts = (state.stats.zeroDayLowDetectionExtracts || 0) + 1;
      } else if (actualState === 'cut') {
        state.stats.zeroDayPveEscapeCount = (state.stats.zeroDayPveEscapeCount || 0) + 1;
      }

      // 보상 지급
      if (rewardCredits > 0) { state.credits += rewardCredits; state.stats.creditsEarnedTotal += rewardCredits; }
      if (rewardOneDay  > 0) {
        state.items.oneDay = (state.items.oneDay || 0) + rewardOneDay;
        state.stats.zeroDayOneDayEarnedTotal = (state.stats.zeroDayOneDayEarnedTotal || 0) + rewardOneDay;
      }

      // 패스 포인트
      addPassPoints(actualState === 'clear' ? 60 : actualState === 'cut' ? 20 : 5);

      // 로그
      const diffLabel = def.label || run.diff.toUpperCase();
      log(`[ZERO-DAY] ${actualState.toUpperCase()} · ${diffLabel} · injected ${injected}/${def.maxInject} · trace ${Math.round(trace*100)}% · OneDay +${rewardOneDay} · credits +${rewardCredits}`, 'hack');

      // 토스트
      let toastMsg, toastType;
      if (actualState === 'clear') {
        toastMsg  = getLang()==='en' ? `ZERO-DAY CLEAR!  OneDay +${rewardOneDay}` : `ZERO-DAY 클리어! OneDay +${rewardOneDay}`;
        toastType = 'achievement';
      } else if (actualState === 'cut') {
        toastMsg  = getLang()==='en' ? `ZERO-DAY CUT — patch closed. OneDay +${rewardOneDay}` : `ZERO-DAY CUT — 패치 완료. OneDay +${rewardOneDay}`;
        toastType = 'system';
      } else if (actualState === 'traced') {
        toastMsg  = getLang()==='en' ? 'ZERO-DAY TRACED — no reward' : 'ZERO-DAY: 추적됨 — 보상 없음';
        toastType = 'warn';
      } else {
        toastMsg  = getLang()==='en' ? 'ZERO-DAY: Aborted' : 'ZERO-DAY: 중단됨';
        toastType = 'warn';
      }
      showToast(toastMsg, toastType);
      checkAchievements('zeroDayPve');
      updateStatsUI();
      renderZeroDayPanel();
      saveGame(true);
    }

    function completeZdOnboarding() {
      ensureZeroDayDefaults();
      if (state.zeroDay.onboardingCompleted) return;
      state.zeroDay.onboardingCompleted = true;
      state.items.zeroDayVulnerability = (state.items.zeroDayVulnerability || 0) + 1;
      log(getLang()==='en' ? '[ZERO-DAY] Onboarding complete. Vulnerability x1 granted. DISCOVERY unlocked.' : '[ZERO-DAY] 온보딩 완료. 취약점 1개 지급. DISCOVERY 해금.', 'system');
      showToast(getLang()==='en' ? 'Onboarding done! +1 Vulnerability' : '온보딩 완료! 취약점 +1', 'achievement');
      updateStatsUI();
      renderZeroDayPanel();
      saveGame(true);
    }

    // ── ZERO-DAY DISCOVERY v3.0.0: in-place 바/로그 업데이트 (홀드 중 버튼 보존) ──
    function updateZdDiscLive() {
      const run = state.zeroDay && state.zeroDay.pve && state.zeroDay.pve.active;
      if (!run) { renderZeroDayPanel(); return; }
      const def      = ZD_DISC_DIFFICULTIES[run.diff] || ZD_DISC_DIFFICULTIES.easy;
      const patch    = getZdPatch(run, def);
      const patchPct = Math.min(100, Math.round(patch * 100));
      const tracePct = Math.min(100, Math.round((run.trace || 0) * 100));
      const patchFill  = document.getElementById('zdPatchFill');
      const traceFill  = document.getElementById('zdTraceFill');
      const patchPctEl = document.getElementById('zdPatchPct');
      const tracePctEl = document.getElementById('zdTracePct');
      const logEl      = document.getElementById('zdDiscLog');
      const injectEl   = document.getElementById('zdDiscInjectCount');
      // 엘리먼트가 없으면 런 UI가 아직 렌더되지 않은 것 → 풀 렌더
      if (!patchFill || !traceFill) { renderZeroDayPanel(); return; }

      patchFill.style.width = patchPct + '%';
      traceFill.style.width = tracePct + '%';
      patchFill.classList.toggle('zd-patch-danger', patchPct >= 90);
      traceFill.classList.toggle('zd-trace-danger', tracePct >= 70);
      // 라벨 색상 토글
      const patchLabelEl = patchPctEl && patchPctEl.closest('.zd-disc-bar-label');
      if (patchLabelEl) patchLabelEl.classList.toggle('zd-bar-danger', patchPct >= 90);
      const traceLabelEl = tracePctEl && tracePctEl.closest('.zd-disc-bar-label');
      if (traceLabelEl) traceLabelEl.classList.toggle('zd-bar-danger', tracePct >= 70);
      if (patchPctEl) patchPctEl.textContent = patchPct + '%';
      if (tracePctEl) tracePctEl.textContent = tracePct + '%';
      if (injectEl)   injectEl.textContent = `${run.injected || 0} / ${def.maxInject}`;
      if (logEl && run.log && run.log.length) {
        logEl.innerHTML = run.log.slice(-8).map(l => `<div class="zd-disc-log-line">${escapeHtml(l)}</div>`).join('');
        logEl.scrollTop = logEl.scrollHeight;
      }
    }

    // ── ZERO-DAY DISCOVERY v3.0.0: 패널 렌더 ────────────────────────────────
    function renderZeroDayPanel() {
      ensureZeroDayDefaults();
      const el = document.getElementById('zeroDayPanel');
      if (!el) return;
      const zd     = state.zeroDay;
      const vuln   = getZdVulnCount();
      const shards = state.items.zeroDayVulnerabilityShard || 0;
      const oneDay = state.items.oneDay || 0;

      // ── 온보딩 미완료 ──────────────────────────────────────────────────────
      if (!zd.onboardingCompleted) {
        el.innerHTML = `
          <div class="zd-disc-panel">
            <div class="zd-disc-header">
              <div class="zd-disc-title">ZERO-DAY<span class="zd-disc-badge">DISCOVERY</span></div>
              <div class="zd-disc-tagline">${getLang()==='en' ? 'Inject before the patch closes.' : '패치되기 전에 주입하라.'}</div>
            </div>
            <div class="zd-onboard-box">
              <div class="zd-disc-log-line">$ ${getLang()==='en' ? 'ZERO-DAY system initializing...' : 'ZERO-DAY 시스템 초기화 중...'}</div>
              <div class="zd-disc-log-line">${getLang()==='en' ? 'Onboarding mode active. Complete to unlock DISCOVERY.' : '온보딩 모드 활성화. 완료하면 DISCOVERY 해금.'}</div>
              <div class="zd-disc-log-line">${getLang()==='en' ? 'Reward: 1 Vulnerability (entry ticket).' : '보상: 취약점 1개 (첫 입장권).'}</div>
              <button type="button" id="btnZdOnboarding" class="zd-disc-start-btn">${getLang()==='en' ? '▶ Start Onboarding' : '▶ 온보딩 시작'}</button>
            </div>
          </div>`;
        const btn = el.querySelector('#btnZdOnboarding');
        if (btn) btn.addEventListener('click', (e) => { e.preventDefault(); completeZdOnboarding(); });
        return;
      }

      const activeRun = zd.pve.active;
      const diff      = zd.pve.difficulty || 'easy';
      const diffDef   = ZD_DISC_DIFFICULTIES[diff] || ZD_DISC_DIFFICULTIES.easy;

      // ── 런 진행 중 UI ──────────────────────────────────────────────────────
      if (activeRun) {
        const def      = ZD_DISC_DIFFICULTIES[activeRun.diff] || ZD_DISC_DIFFICULTIES.easy;
        const patch    = getZdPatch(activeRun, def);
        const patchPct = Math.min(100, Math.round(patch * 100));
        const tracePct = Math.min(100, Math.round((activeRun.trace || 0) * 100));
        const isPatchDanger = patchPct >= 90;
        const isTraceDanger = tracePct >= 70;
        const logLines = (activeRun.log || []).slice(-8)
          .map(l => `<div class="zd-disc-log-line">${escapeHtml(l)}</div>`).join('');

        el.innerHTML = `
          <div class="zd-disc-panel">
            <div class="zd-disc-header">
              <div class="zd-disc-title">ZERO-DAY <span class="zd-disc-badge">${def.label}</span></div>
              <div class="zd-disc-tagline">${getLang()==='en' ? 'Inject before the patch closes.' : '패치되기 전에 주입하라.'}</div>
            </div>

            <div class="zd-disc-bars">
              <div class="zd-disc-bar-section">
                <div class="zd-disc-bar-label ${isPatchDanger ? 'zd-bar-danger' : ''}">
                  <span>${getLang()==='en' ? 'PATCH PROGRESS' : '패치 진행도'}</span>
                  <span id="zdPatchPct">${patchPct}%</span>
                </div>
                <div class="zd-disc-bar-track">
                  <div class="zd-disc-bar-fill zd-patch-fill ${isPatchDanger ? 'zd-patch-danger' : ''}"
                       id="zdPatchFill" style="width:${patchPct}%"></div>
                </div>
              </div>
              <div class="zd-disc-bar-section">
                <div class="zd-disc-bar-label ${isTraceDanger ? 'zd-bar-danger' : ''}">
                  <span>${getLang()==='en' ? 'TRACE RISK' : '추적 위험도'}</span>
                  <span id="zdTracePct">${tracePct}%</span>
                </div>
                <div class="zd-disc-bar-track">
                  <div class="zd-disc-bar-fill zd-trace-fill ${isTraceDanger ? 'zd-trace-danger' : ''}"
                       id="zdTraceFill" style="width:${tracePct}%"></div>
                </div>
              </div>
            </div>

            <div class="zd-disc-inject-display">
              <span>${getLang()==='en' ? 'INJECTED' : '주입량'}</span>
              <strong id="zdDiscInjectCount">${activeRun.injected || 0} / ${def.maxInject}</strong>
              <span>SCORE ${activeRun.score || 0}</span>
            </div>

            <button type="button" id="zdInjectBtn" class="zd-disc-inject-btn">
              <span class="zd-disc-inject-icon">⬇</span>
              <span class="zd-disc-inject-label">DATA INJECT</span>
              <span class="zd-disc-inject-sub">${getLang()==='en' ? 'Tap or Hold' : '탭 또는 홀드'}</span>
            </button>

            <div class="zd-disc-action-row">
              <button type="button" id="zdRecoverBtn" class="zd-disc-recover-btn">
                ${getLang()==='en' ? '▶ RECOVER' : '▶ 회수'}
              </button>
              <button type="button" id="zdAbortBtn" class="zd-disc-abort-btn">
                ${getLang()==='en' ? '✕ ABORT' : '✕ 중단'}
              </button>
            </div>

            <div class="zd-disc-log" id="zdDiscLog">${logLines}</div>
          </div>`;

        applyActiveZdSkin();

        // INJECT 버튼 — 탭/홀드 (mousedown+touchstart 기반)
        const injectBtn = el.querySelector('#zdInjectBtn');
        if (injectBtn) {
          const startHold = (e) => {
            e.preventDefault();
            doZdInject();
            stopZdHold();
            _zdHoldTimer = setInterval(doZdInject, 250);
          };
          const endHold = () => stopZdHold();
          injectBtn.addEventListener('mousedown',   startHold);
          injectBtn.addEventListener('mouseup',     endHold);
          injectBtn.addEventListener('mouseleave',  endHold);
          injectBtn.addEventListener('touchstart',  startHold, { passive: false });
          injectBtn.addEventListener('touchend',    endHold,   { passive: true  });
          injectBtn.addEventListener('touchcancel', endHold,   { passive: true  });
        }
        el.querySelector('#zdRecoverBtn')      ?.addEventListener('click', doZdRecover);
        el.querySelector('#zdAbortBtn')        ?.addEventListener('click', doZdAbort);
        el.querySelector('#zdUseTraceAmpleBtn')?.addEventListener('click', doZdUseTraceAmple);
        el.querySelector('#zdUseNullSeedBtn')  ?.addEventListener('click', doZdUseNullSeed);
        return;
      }

      // ── 로비 (대기) UI ────────────────────────────────────────────────────
      const check = canStartZdDisc();

      const diffBtns = Object.entries(ZD_DISC_DIFFICULTIES).map(([id, d]) => {
        const costTx = d.free
          ? (getLang()==='en' ? 'Free (1/day)' : '무료 1일1회')
          : (getLang()==='en' ? '1 Vuln'       : '취약점 1개');
        return `<button type="button" class="zd-disc-diff-btn ${id===diff?'active':''}" data-zd-diff="${id}">
          <strong>${d.label}</strong><span>${d.ko}</span><span class="zd-diff-cost">${costTx}</span>
        </button>`;
      }).join('');

      // 프로토콜 섹션
      const protosHtml = Object.values(ZD_PROTOCOLS).map(p => {
        const unlocked = isZdProtocolUnlocked(p.id);
        const prog     = getZdProtocolProgress(p.id);
        const condText = (() => {
          switch (p.condition.type) {
            case 'pveRuns':           return getLang()==='en' ? `Clears ${prog.current}/${prog.target}`         : `클리어 ${prog.current}/${prog.target}`;
            case 'pvpWins':           return getLang()==='en' ? `PVP wins ${prog.current}/${prog.target}`       : `PVP 승리 ${prog.current}/${prog.target}`;
            case 'lowDetectExtracts': return getLang()==='en' ? `Low-trace clears ${prog.current}/${prog.target}` : `저추적 클리어 ${prog.current}/${prog.target}`;
            case 'passTier':          return getLang()==='en' ? `PASS tier ${prog.current}/${prog.target}`      : `PASS 티어 ${prog.current}/${prog.target}`;
            default: return '';
          }
        })();
        const canUnlock = !unlocked && prog.ok && (state.items[p.cost.currency] || 0) >= p.cost.amount;
        return `<div class="zd-disc-protocol ${unlocked ? 'unlocked' : ''}" data-zd-protocol="${p.id}">
          <div class="zd-disc-proto-head">
            <strong>${getLang()==='en' ? p.en : p.ko}</strong>
            ${unlocked ? '<span class="zd-proto-badge">ON</span>' : ''}
          </div>
          <div class="small">${getLang()==='en' ? p.descEn : p.descKo}</div>
          <div class="zd-proto-meta small"><span>${condText}</span><span>${p.cost.amount} ${p.cost.currency.toUpperCase()}</span></div>
          ${!unlocked ? `<button type="button" class="zd-disc-proto-unlock" data-zd-protocol-unlock="${p.id}" ${canUnlock ? '' : 'disabled'}>${getLang()==='en' ? 'Unlock' : '해금'}</button>` : ''}
        </div>`;
      }).join('');

      // 방어 카드 슬롯
      zd.defense   = zd.defense   || { slots:3, cards:[], usesThisMatch:0 };
      zd.skins     = zd.skins     || [];
      zd.unlocks   = zd.unlocks   || {};
      const slotCards = zd.defense.cards || [];
      const slotCount = zd.defense.slots || 3;

      const slotsHtml = Array.from({length:5}).map((_,i) => {
        const idx    = i + 1;
        const enabled= idx <= slotCount;
        const cardId = slotCards[i] || null;
        const card   = cardId ? ZD_DEFENSE_CARDS[cardId] : null;
        return `<div class="zd-defense-slot ${enabled?'enabled':'locked'}">
          <div class="zd-slot-num">SLOT ${idx}</div>
          ${enabled
            ? (card
                ? `<strong>${getLang()==='en'?card.en:card.ko}</strong><span class="small">${getLang()==='en'?card.descEn:card.desc}</span>`
                : `<span class="small zd-slot-empty">${getLang()==='en'?'(empty)':'(비어있음)'}</span>`)
            : `<span class="zd-slot-lock">🔒 ${ZD_SLOT_EXPAND_COST[idx]||'?'} OneDay</span>`}
          ${enabled
            ? `<button type="button" data-zd-slot-edit="${idx}">${card?(getLang()==='en'?'Change':'변경'):(getLang()==='en'?'Equip':'장착')}</button>`
            : `<button type="button" data-zd-slot-expand="${idx}">${getLang()==='en'?'Expand':'확장'}</button>`}
        </div>`;
      }).join('');

      const skinsHtml = Object.values(ZD_SKINS).map(skin => {
        const owned  = isZdSkinUnlocked(skin.id);
        const active = zd.activeSkin === skin.id;
        return `<div class="zd-skin-card ${active?'active':''} ${owned?'owned':'locked'}" data-zd-skin="${skin.id}">
          <strong>${getLang()==='en'?skin.en:skin.ko}</strong>
          <span class="small">${getLang()==='en'?skin.descEn:skin.desc}</span>
          ${active ? `<span class="zd-skin-badge">${getLang()==='en'?'ACTIVE':'사용 중'}</span>`
            : owned ? `<button type="button" data-zd-skin-equip="${skin.id}">${getLang()==='en'?'Equip':'장착'}</button>`
            : `<span class="zd-skin-badge locked">${getLang()==='en'?'LOCKED':'미해금'}</span>`}
        </div>`;
      }).join('');

      el.innerHTML = `
        <div class="zd-disc-panel">
          <div class="zd-disc-header">
            <div class="zd-disc-title">ZERO-DAY <span class="zd-disc-badge">DISCOVERY</span></div>
            <div class="zd-disc-tagline">${getLang()==='en' ? 'Season 1 · Inject before the patch closes.' : 'Season 1 · 패치되기 전에 주입하라.'}</div>
          </div>

          <div class="zd-disc-resource-row">
            <span>${getLang()==='en'?'VULN':'취약점'}: <strong>${vuln}</strong></span>
            <span>${getLang()==='en'?'SHARDS':'조각'}: <strong>${shards}</strong>/50</span>
            <span>OneDay: <strong>${oneDay}</strong></span>
            ${shards >= 50 ? `<button type="button" id="btnCraftVuln" class="zd-disc-craft-btn">${getLang()==='en'?'Craft Vuln':'취약점 제작'}</button>` : ''}
          </div>
          <p class="small">${getLang()==='en' ? 'Discovery is the active ZERO-DAY mode in this build. PVP remains paused for now.' : '현재 빌드의 ZERO-DAY는 DISCOVERY 중심으로 운영됩니다. PVP는 잠시 보류 중입니다.'}</p>

          <div class="zd-disc-section-label">${getLang()==='en'?'DIFFICULTY':'난이도'}</div>
          <div class="zd-disc-diff-row">${diffBtns}</div>

          <div class="zd-disc-start-row">
            <button type="button" id="btnStartZdDisc" class="zd-disc-start-btn" ${check.ok ? '' : 'disabled'}>
              ${getLang()==='en' ? '▶ EXPLOIT START' : '▶ 익스플로잇 시작'}
            </button>
            <span class="small zd-start-hint">${check.ok
              ? (getLang()==='en' ? `Cost: ${diffDef.free?'Free (1/day)':'1 Vulnerability'}` : `비용: ${diffDef.free?'무료 (1일 1회)':'취약점 1개'}`)
              : `⚠ ${check.reason}`
            }</span>
          </div>

          <div class="zd-disc-stats-row">
            <div><span>${getLang()==='en'?'RUNS':'런'}</span><strong>${zd.pve.runs||0}</strong></div>
            <div><span>${getLang()==='en'?'CLEARS':'클리어'}</span><strong>${zd.pve.extracts||0}</strong></div>
            <div><span>${getLang()==='en'?'BEST SCORE':'최고 점수'}</span><strong>${zd.pve.bestScore||0}</strong></div>
            <div><span>${getLang()==='en'?'LOW TRACE':'저추적'}</span><strong>${state.stats.zeroDayLowDetectionExtracts||0}</strong></div>
          </div>

          <div class="zd-disc-section-label">${getLang()==='en'?'PROTOCOLS':'프로토콜'}</div>
          <div class="zd-disc-protocols">${protosHtml}</div>

          <div class="zd-disc-section-label">${getLang()==='en'?'DEFENSE CARDS':'방어 카드'} (${slotCount}/5)</div>
          <div class="zd-defense-slots">${slotsHtml}</div>

          <div class="zd-disc-section-label">${getLang()==='en'?'TERMINAL SKIN':'터미널 스킨'}</div>
          <div class="zd-skin-grid">${skinsHtml}</div>
        </div>`;

      applyActiveZdSkin();

      // 로비 이벤트 바인딩
      el.querySelector('#btnStartZdDisc')?.addEventListener('click', startZdDiscRun);
      el.querySelector('#btnCraftVuln')?.addEventListener('click', () => {
        if ((state.items.zeroDayVulnerabilityShard||0) >= 50) {
          state.items.zeroDayVulnerabilityShard -= 50;
          setZdVulnCount(getZdVulnCount() + 1);
          showToast(getLang()==='en'?'Vulnerability crafted! +1':'취약점 제작 완료! +1', 'achievement');
          updateStatsUI(); renderZeroDayPanel(); saveGame(true);
        }
      });
      el.querySelectorAll('[data-zd-diff]').forEach(btn => {
        btn.addEventListener('click', () => {
          zd.pve.difficulty = btn.dataset.zdDiff;
          renderZeroDayPanel(); saveGame(true);
        });
      });
      el.querySelectorAll('[data-zd-protocol-unlock]').forEach(btn => {
        btn.addEventListener('click', () => {
          const pid    = btn.dataset.zdProtocolUnlock;
          const result = tryUnlockZdProtocol(pid);
          if (!result.ok) {
            const msg = result.reason === 'currency'  ? (getLang()==='en'?'Not enough OneDay':'OneDay 부족')
                      : result.reason === 'condition' ? (getLang()==='en'?'Condition not met':'조건 미충족')
                      : (getLang()==='en'?'Cannot unlock':'해금 불가');
            showToast(msg, 'warn');
            return;
          }
          updateStatsUI(); renderZeroDayPanel(); saveGame(true);
        });
      });
      el.querySelectorAll('[data-zd-slot-expand]').forEach(btn => {
        btn.addEventListener('click', () => {
          const slot = Number(btn.dataset.zdSlotExpand);
          const cost = ZD_SLOT_EXPAND_COST[slot];
          if (!cost) return;
          if ((state.items.oneDay||0) < cost) {
            showToast(getLang()==='en'?`Need ${cost} OneDay`:`OneDay ${cost} 필요`, 'warn'); return;
          }
          state.items.oneDay -= cost;
          state.stats.oneDaySpentTotal        = (state.stats.oneDaySpentTotal        || 0) + cost;
          state.stats.zeroDayOneDaySpentTotal = (state.stats.zeroDayOneDaySpentTotal || 0) + cost;
          state.zeroDay.defense.slots = slot;
          showToast(getLang()==='en'?`Slot ${slot} unlocked!`:`슬롯 ${slot} 해금!`, 'achievement');
          renderZeroDayPanel(); saveGame(true);
        });
      });
      el.querySelectorAll('[data-zd-slot-edit]').forEach(btn => {
        btn.addEventListener('click', () => {
          const slot    = Number(btn.dataset.zdSlotEdit);
          const idx     = slot - 1;
          state.zeroDay.defense.cards = state.zeroDay.defense.cards || [];
          const cardIds = Object.keys(ZD_DEFENSE_CARDS);
          const current = state.zeroDay.defense.cards[idx];
          const used    = new Set(state.zeroDay.defense.cards.filter((c,i) => i !== idx && c));
          let nextIdx   = current ? (cardIds.indexOf(current) + 1) % (cardIds.length + 1) : 0;
          let attempt   = 0, next = null;
          while (attempt < cardIds.length + 1) {
            if (nextIdx >= cardIds.length) { next = null; break; }
            const cand = cardIds[nextIdx];
            if (!used.has(cand)) { next = cand; break; }
            nextIdx = (nextIdx + 1) % (cardIds.length + 1);
            attempt++;
          }
          state.zeroDay.defense.cards[idx] = next;
          renderZeroDayPanel(); saveGame(true);
        });
      });
      el.querySelectorAll('[data-zd-skin-equip]').forEach(btn => {
        btn.addEventListener('click', () => {
          const skinId = btn.dataset.zdSkinEquip;
          if (!isZdSkinUnlocked(skinId)) return;
          state.zeroDay.activeSkin = skinId;
          renderZeroDayPanel(); saveGame(true);
        });
      });
    }

    // v3.0.0: ZERO-DAY PVP 봇 매치 (스냅샷 기반 시뮬레이션)
    function getPvpSnapshot() {
      const code = getActiveCodeInstance();
      const codePower = code ? (code.power || code.basePower || 18) : 18;
      const cpuTier = state.cpuTier || 1;
      const gpuTier = state.gpuTier || 1;
      const protocols = Object.keys(ZD_PROTOCOLS).filter(p => isZdProtocolUnlocked(p));
      const defenseCards = (state.zeroDay.defense && state.zeroDay.defense.cards || []).filter(Boolean);
      const rating = (state.zeroDay.pvp && state.zeroDay.pvp.rating) || 1000;
      // v3.0.0: 프로토콜 효과 적용
      const protoEff = getZdProtocolEffectSum();
      // BREAKER: 침투 +15% (공격에 적용)
      // OVERLORD: 모든 효과 +10% (전체 적용)
      const attackBonusMult = (1 + (protoEff.infiltrateSuccessBonus || 0)) * (1 + (protoEff.allCommandBonus || 0));
      // SHROUD: extractionShield 1 (방어에 +실드)
      // PHANTOM: 정찰 -25% 탐지 (방어 보너스로 변환)
      const defenseBonusMult = (1 + (protoEff.allCommandBonus || 0));
      const shieldBonus = (protoEff.extractionShield || 0) * 8;
      // 공격력: 코드파워 + cpu/gpu 티어 + 프로토콜 보너스 + 약간의 랜덤
      const attackPower = (codePower * 1.2 + cpuTier * 5 + gpuTier * 4 + protocols.length * 8) * attackBonusMult;
      // 방어력: 슬롯 수 × 12 + 장착 카드 수 × 8 + 프로토콜 보너스 + 실드
      const defensePower = ((state.zeroDay.defense.slots || 3) * 12 + defenseCards.length * 8 + protocols.length * 6 + shieldBonus) * defenseBonusMult;
      return { rating, attackPower, defensePower, protocols, defenseCards };
    }

    function generateBotSnapshot(playerRating) {
      const variance = 200;
      const botRating = Math.max(800, Math.min(1800, playerRating + (Math.random() * variance * 2 - variance)));
      const tierFactor = botRating / 1000;
      return {
        rating: Math.round(botRating),
        attackPower: 30 + tierFactor * 25 + Math.random() * 10,
        defensePower: 30 + tierFactor * 22 + Math.random() * 10,
        protocols: tierFactor > 1.2 ? ['protocol_phantom'] : [],
        defenseCards: ['mask','delay'].slice(0, Math.floor(tierFactor * 2))
      };
    }

    function simulatePvpDuel(player, bot) {
      // 매치당 3턴 — 양쪽 모두 카드 사용 가능 (3회/매치, 중복 불가)
      let pScore = 0, bScore = 0;
      const playerUsed = new Set();
      const botUsed = new Set();
      for (let turn = 1; turn <= 3; turn++) {
        // 플레이어 공격: 봇 방어와 비교
        const pAtk = player.attackPower * (0.85 + Math.random() * 0.3);
        const bDef = bot.defensePower * (0.9 + Math.random() * 0.2);
        // 봇이 사용 가능한 방어 카드가 있으면 1개 사용 (랜덤)
        let bCardBonus = 0;
        const bAvail = bot.defenseCards.filter(c => !botUsed.has(c));
        if (bAvail.length && Math.random() < 0.6) {
          const useCard = bAvail[Math.floor(Math.random() * bAvail.length)];
          botUsed.add(useCard);
          bCardBonus = 12;
        }
        if (pAtk > bDef + bCardBonus) pScore++;
        // 봇 공격
        const botAtk = bot.attackPower * (0.85 + Math.random() * 0.3);
        const pDef = player.defensePower * (0.9 + Math.random() * 0.2);
        let pCardBonus = 0;
        const pAvail = player.defenseCards.filter(c => !playerUsed.has(c));
        if (pAvail.length && Math.random() < 0.7) {
          const useCard = pAvail[Math.floor(Math.random() * pAvail.length)];
          playerUsed.add(useCard);
          pCardBonus = 14;
        }
        if (botAtk < pDef + pCardBonus) pScore++; // 방어 성공도 1점
        else bScore++;
      }
      return { pScore, bScore, win: pScore > bScore };
    }

    function startZdPvpMatch() {
      ensureZeroDayDefaults();
      // v3.0.0 fix: 단일 게터로 일관성 보장
      if (getZdVulnCount() < 1) {
        showToast(getLang()==='en'?'Need 1 Vulnerability':'취약점 1개 필요', 'warn');
        return;
      }
      // 비용 차감 (실패 시 차감 안 됨)
      if (!consumeZdVuln(1)) {
        showToast(getLang()==='en'?'Vulnerability count out of sync.':'취약점 수가 일치하지 않습니다.', 'warn');
        renderZeroDayPanel();
        return;
      }
      state.zeroDay.pvp.attacksTotal = (state.zeroDay.pvp.attacksTotal || 0) + 1;

      const player = getPvpSnapshot();
      const bot = generateBotSnapshot(player.rating);
      const result = simulatePvpDuel(player, bot);

      // ELO-like rating change
      const expected = 1 / (1 + Math.pow(10, (bot.rating - player.rating) / 400));
      const actual = result.win ? 1 : 0;
      const ratingDelta = Math.round(32 * (actual - expected));
      state.zeroDay.pvp.rating = Math.max(800, (state.zeroDay.pvp.rating || 1000) + ratingDelta);

      if (result.win) {
        state.zeroDay.pvp.seasonWins = (state.zeroDay.pvp.seasonWins || 0) + 1;
        state.stats.zeroDayPvpAttackWinCount = (state.stats.zeroDayPvpAttackWinCount || 0) + 1;
        // 보상 — OneDay
        const oneDayReward = 60 + Math.round(Math.random() * 40);
        state.items.oneDay = (state.items.oneDay || 0) + oneDayReward;
        state.stats.zeroDayOneDayEarnedTotal = (state.stats.zeroDayOneDayEarnedTotal || 0) + oneDayReward;
        showToast(`${getLang()==='en'?'PVP WIN':'PVP 승리'} (${result.pScore}-${result.bScore}) · OneDay +${oneDayReward} · ${ratingDelta>=0?'+':''}${ratingDelta} rating`, 'achievement');
        log(`[ZD PVP] WIN ${result.pScore}-${result.bScore} vs bot R${bot.rating}, +${oneDayReward} OneDay, ${ratingDelta>=0?'+':''}${ratingDelta} rating → ${state.zeroDay.pvp.rating}`, 'system');
      } else {
        state.zeroDay.pvp.seasonLosses = (state.zeroDay.pvp.seasonLosses || 0) + 1;
        showToast(`${getLang()==='en'?'PVP LOSS':'PVP 패배'} (${result.pScore}-${result.bScore}) · ${ratingDelta>=0?'+':''}${ratingDelta} rating`, 'shop');
        log(`[ZD PVP] LOSS ${result.pScore}-${result.bScore} vs bot R${bot.rating}, ${ratingDelta>=0?'+':''}${ratingDelta} rating → ${state.zeroDay.pvp.rating}`, 'system');
      }

      updateStatsUI();
      renderZeroDayPanel();
      saveGame(true);
    }

    const EXTEND_CHANNEL_META = {
      recovery: {
        ko: 'RECOVERY', en: 'RECOVERY', ja: 'RECOVERY',
        descKo: '에너지와 회복 흐름을 다루는 확장 보조.',
        descEn: 'Extensions that support energy and sustain loops.',
        descJa: 'エネルギーと回復の流れを支える拡張補助。'
      },
      automation: {
        ko: 'AUTOMATION', en: 'AUTOMATION', ja: 'AUTOMATION',
        descKo: 'AUTO-RUN과 반복 플레이 효율을 높이는 확장 보조.',
        descEn: 'Extensions that improve AUTO-RUN and repeat-play efficiency.',
        descJa: 'AUTO-RUNと反復プレイ効率を高める拡張補助。'
      },
      growth: {
        ko: 'GROWTH', en: 'GROWTH', ja: 'GROWTH',
        descKo: '코드 성장과 시즌 자산 조율을 다루는 확장 재료.',
        descEn: 'Growth materials for code progression and seasonal tuning.',
        descJa: 'コード成長とシーズン資産調律を扱う拡張素材。'
      },
      discovery: {
        ko: 'DISCOVERY', en: 'DISCOVERY', ja: 'DISCOVERY',
        descKo: 'ZERO-DAY DISCOVERY 런을 보조하는 확장 자산.',
        descEn: 'Run support assets for ZERO-DAY DISCOVERY.',
        descJa: 'ZERO-DAY DISCOVERYランを補助する拡張資産。'
      },
      economy: {
        ko: 'ECONOMY', en: 'ECONOMY', ja: 'ECONOMY',
        descKo: '크레딧, TOKEN, COIN, OneDay 흐름을 넓히는 경제 확장.',
        descEn: 'Economy extensions that widen Credits, TOKEN, COIN, and OneDay loops.',
        descJa: 'クレジット、TOKEN、COIN、OneDayの流れを広げる経済拡張。'
      },
      premium: {
        ko: 'PREMIUM', en: 'PREMIUM', ja: 'PREMIUM',
        descKo: '지원 센터와 수동 결제형 패키지 허브.',
        descEn: 'The support-center hub for manual premium packages.',
        descJa: 'サポートセンターと手動課金型パッケージのハブ。'
      }
    };

    function getExtendMeta(kind) {
      return EXTEND_CHANNEL_META[kind] || EXTEND_CHANNEL_META.growth;
    }

    function getExtendItemKind(key) {
      const map = {
        energyPack: 'recovery',
        dailyBonusBox: 'economy',
        codeProtection: 'growth',
        coin: 'economy',
        weeklyToken: 'economy',
        oneDay: 'economy',
        rom: 'growth',
        zeroDayVulnerability: 'discovery',
        zeroDayVulnerabilityShard: 'discovery',
        timeSwap2h: 'automation',
        timeSwap5h: 'automation',
        timeSwap10h: 'automation',
        traceAmple: 'discovery',
        nullSeed: 'discovery',
        pickResidualData: 'growth',
        autoScan: 'automation',
        autoHack: 'automation'
      };
      return map[key] || 'growth';
    }

    // 아이템 수급처 메타 (Phase 3: 수급/사용처 명확화)
    const ITEM_SOURCE_META = {
      energyPack:               { ko: '상점 · 이벤트 보상 · 보상 박스',       en: 'Shop · Event reward · Bonus Box',        ja: 'ショップ · イベント報酬 · ボーナスボックス' },
      dailyBonusBox:            { ko: '시즌 패스 · OPS 상점 · 이벤트',         en: 'Season Pass · OPS Shop · Event',          ja: 'シーズンパス · OPSショップ · イベント' },
      codeProtection:           { ko: '지원 센터 · 상점 · 시즌 보상',           en: 'Support Center · Shop · Season reward',   ja: 'サポートセンター · ショップ · シーズン報酬' },
      coin:                     { ko: '지원 센터 · 퀘스트 보상 · ZD 런',        en: 'Support Center · Quest reward · ZD run',  ja: 'サポートセンター · クエスト報酬 · ZDラン' },
      weeklyToken:              { ko: 'WEEKLY 목표 보상',                        en: 'WEEKLY goal reward',                      ja: 'WEEKLYゴール報酬' },
      oneDay:                   { ko: '상점 · ZD DISCOVERY · 시즌 패스',        en: 'Shop · ZD DISCOVERY · Season Pass',       ja: 'ショップ · ZD DISCOVERY · シーズンパス' },
      rom:                      { ko: '상점 · 시즌 보상 · Daily Bonus Box',      en: 'Shop · Season reward · Daily Bonus Box',  ja: 'ショップ · シーズン報酬 · Daily Bonus Box' },
      zeroDayVulnerability:     { ko: 'ZD DISCOVERY 런 보상',                   en: 'ZD DISCOVERY run reward',                 ja: 'ZD DISCOVERYラン報酬' },
      zeroDayVulnerabilityShard:{ ko: 'ZD DISCOVERY 런 보상',                   en: 'ZD DISCOVERY run reward',                 ja: 'ZD DISCOVERYラン報酬' },
      timeSwap2h:               { ko: '상점 · 이벤트',                           en: 'Shop · Event',                            ja: 'ショップ · イベント' },
      timeSwap5h:               { ko: '상점 · 이벤트',                           en: 'Shop · Event',                            ja: 'ショップ · イベント' },
      timeSwap10h:              { ko: '상점 · 이벤트',                           en: 'Shop · Event',                            ja: 'ショップ · イベント' },
      traceAmple:               { ko: 'Daily Bonus Box · 시즌 보상',             en: 'Daily Bonus Box · Season reward',         ja: 'Daily Bonus Box · シーズン報酬' },
      nullSeed:                 { ko: 'Daily Bonus Box · 시즌 보상',             en: 'Daily Bonus Box · Season reward',         ja: 'Daily Bonus Box · シーズン報酬' },
      pickResidualData:         { ko: '시즌 패스 · OPS 상점 · PICK 진행',        en: 'Season Pass · OPS Shop · PICK progress',  ja: 'シーズンパス · OPSショップ · PICK進行' }
    };

    function getItemSourceHtml(key) {
      const meta = ITEM_SOURCE_META[key];
      if (!meta) return '';
      const label = getLang() === 'en' ? meta.en : getLang() === 'ja' ? meta.ja : meta.ko;
      return `<div class="item-card-source">📦 ${label}</div>`;
    }

    function getShopExtendKind(item, shopType) {
      if (shopType === 'support') return 'premium';
      const explicit = {
        gpu_coupon: 'growth',
        cpu_coupon: 'growth',
        overclock_script: 'automation',
        scan_exp_script: 'automation',
        precision_scanner: 'automation',
        data_pack: 'economy',
        credit_cache: 'economy',
        credit_relay_script: 'economy',
        permanent_credit_mult: 'economy',
        risk_support: 'discovery',
        hack_stability_patch: 'discovery',
        failure_buffer_module: 'discovery'
      };
      return explicit[item.id] || {
        ENERGY: 'recovery',
        SYSTEM: 'automation',
        ECONOMY: 'economy',
        UTILITY: 'discovery'
      }[item.category] || 'growth';
    }

    const STAGE_CHANNEL_META = {
      SCAN: {
        ko: '정찰 채널', en: 'Recon Channel',
        descKo: '기본 스캔과 초반 침투 감각을 익히는 채널입니다.',
        descEn: 'A channel for learning basic scans and early breach rhythm.'
      },
      'SCAN+': {
        ko: '심화 스캔 채널', en: 'Deep Scan Channel',
        descKo: '희귀도, 메타데이터, 시야 확장에 집중한 구간입니다.',
        descEn: 'Focuses on rarity, metadata, and wider visibility.'
      },
      ADAPT: {
        ko: '적응 채널', en: 'Adaptation Channel',
        descKo: '보안 수치 상승에 맞춰 코드 빌드를 조정하는 구간입니다.',
        descEn: 'A channel for adjusting builds against heavier security.'
      },
      SIGNAL: {
        ko: '신호 채널', en: 'Signal Channel',
        descKo: '성공률과 안정성을 함께 다루는 교전 구간입니다.',
        descEn: 'A combat lane focused on chance and stability together.'
      },
      EVADE: {
        ko: '회피 채널', en: 'Evasion Channel',
        descKo: '추적 회피와 저위험 운영 감각을 묻는 구간입니다.',
        descEn: 'Tests evasive routing and low-risk operation sense.'
      },
      REWARD: {
        ko: '보상 채널', en: 'Reward Channel',
        descKo: '반복 보상과 증폭 효과를 다루는 파밍 구간입니다.',
        descEn: 'A farming lane built around repeat rewards and amplifiers.'
      },
      RISK: {
        ko: '고위험 채널', en: 'High-Risk Channel',
        descKo: '높은 보안과 큰 보상을 동시에 노리는 구간입니다.',
        descEn: 'Targets high security and high rewards at once.'
      },
      EXTREME: {
        ko: '익스트림 채널', en: 'Extreme Channel',
        descKo: 'EXTREME 운용 감각과 파워 완성도를 점검하는 구간입니다.',
        descEn: 'Checks EXTREME control and mature power curves.'
      },
      TOWER: {
        ko: '코어 채널', en: 'Tower Core Channel',
        descKo: '장기 반복 운용과 보스 대응을 시험하는 핵심 구간입니다.',
        descEn: 'Core lane testing long repeat routes and boss responses.'
      },
      CORE: {
        ko: '최종 채널', en: 'Final Core Channel',
        descKo: '100층 완주를 위한 최종 보정과 집중력이 필요한 구간입니다.',
        descEn: 'Final lane demanding polish and focus for the 100F finish.'
      }
    };

    const stageChapters = [
      { index: 1, from: 1, to: 10, title: '기초 침투 훈련', titleEn: 'Entry Intrusion', theme: 'SCAN', hint: 'Basic_Probe / Port_Scanner' },
      { index: 2, from: 11, to: 20, title: '스캔 심화 구간', titleEn: 'Scan Deepening', theme: 'SCAN+', hint: 'Scan_Cache / Rarity_Lens' },
      { index: 3, from: 21, to: 30, title: '보안망 적응', titleEn: 'Security Mesh', theme: 'ADAPT', hint: 'Shield_Bypass / Kernel_Probe' },
      { index: 4, from: 31, to: 40, title: '성공률 교전', titleEn: 'Signal Combat', theme: 'SIGNAL', hint: 'Stack_Tracer / Exploit_Router' },
      { index: 5, from: 41, to: 50, title: '추적 회피전', titleEn: 'Trace Evasion', theme: 'EVADE', hint: 'Trace_Scrambler / Data_Phantom' },
      { index: 6, from: 51, to: 60, title: '보상 증폭 테스트', titleEn: 'Reward Amplifier', theme: 'REWARD', hint: 'Vault_Siphon / Reward_Kernel' },
      { index: 7, from: 61, to: 70, title: '고위험 서버전', titleEn: 'Risk Serverline', theme: 'RISK', hint: 'Overclock_Guard / Quantum_Splice' },
      { index: 8, from: 71, to: 80, title: '익스트림 프리즘', titleEn: 'Extreme Prism', theme: 'EXTREME', hint: 'Abyss_Contract / Singular_Gambit' },
      { index: 9, from: 81, to: 90, title: '데이터 타워 코어', titleEn: 'Data Tower Core', theme: 'TOWER', hint: 'Repeat_Engine / Boss_Keygen' },
      { index: 10, from: 91, to: 100, title: '최종 코어 챌린지', titleEn: 'Final Core Challenge', theme: 'CORE', hint: 'Tower_Sovereign / Singularity_Root' }
    ];

    const campaignChapterDefs = [
      {
        id: 'campaign_ch1',
        index: 1,
        title: 'Foundation Breach',
        titleEn: 'Foundation Breach',
        subtitle: '첫 선형 침투 시퀀스',
        subtitleEn: 'The first linear infiltration sequence',
        nodes: [
          { id: 'campaign_ch1_node1', order: 1, name: 'Outer Relay', nameEn: 'Outer Relay', lane: 'ENTRY', recommendedLevel: 2, recommendedPower: 26, security: 32, energyCost: 1, reward: { credits: 80, exp: 4 } },
          { id: 'campaign_ch1_node2', order: 2, name: 'Packet Stair', nameEn: 'Packet Stair', lane: 'LINK', recommendedLevel: 3, recommendedPower: 32, security: 40, energyCost: 1, reward: { credits: 100, exp: 5 } },
          { id: 'campaign_ch1_node3', order: 3, name: 'Access Spine', nameEn: 'Access Spine', lane: 'MID', recommendedLevel: 4, recommendedPower: 38, security: 48, energyCost: 1, reward: { credits: 130, exp: 6 } },
          { id: 'campaign_ch1_node4', order: 4, name: 'Mirror Cache', nameEn: 'Mirror Cache', lane: 'TRACE', recommendedLevel: 5, recommendedPower: 44, security: 56, energyCost: 1, reward: { credits: 160, exp: 7, shards: 1 } },
          { id: 'campaign_ch1_node5', order: 5, name: 'Archive Gate', nameEn: 'Archive Gate', lane: 'CORE', recommendedLevel: 6, recommendedPower: 52, security: 66, energyCost: 1, reward: { credits: 220, exp: 10, shards: 2, dailyBonusBox: 1 } }
        ]
      }
    ];

    function stageCopy(ko, en) {
      return getLang() === 'en' ? en : ko;
    }

    function getStageChapter(stageNumber) {
      return stageChapters.find(ch => stageNumber >= ch.from && stageNumber <= ch.to) || stageChapters[0];
    }

    function buildStageDefs() {
      return Array.from({ length: 100 }, (_, idx) => {
        const number = idx + 1;
        const chapter = getStageChapter(number);
        const boss = number % 10 === 0;
        const security = 18 + number * 3 + (chapter.index - 1) * 10 + (boss ? 22 : 0);
        const firstCredits = 45 + number * 8 + chapter.index * 20 + (boss ? 75 : 0);
        const firstExp = 3 + Math.ceil(number / 12) + (boss ? 3 : 0);
        return {
          id: `stage_${String(number).padStart(3, '0')}`,
          number,
          chapter,
          boss,
          name: `데이터 타워 ${String(number).padStart(3, '0')}`,
          security,
          recommendedLevel: Math.max(1, Math.ceil(number / 4)),
          recommendedPower: Math.max(18, Math.round(security * 0.78)),
          energyCost: 1,
          firstReward: {
            credits: firstCredits,
            exp: firstExp,
            energyPack: boss ? 1 : 0
          },
          repeatReward: {
            credits: Math.max(3, Math.round(firstCredits * 0.20)),
            exp: Math.max(1, Math.round(firstExp * 0.20)),
            energyPack: 0
          }
        };
      });
    }

    const stageDefs = buildStageDefs();

    function ensureStageDefaults() {
      state.stage = state.stage || {};
      state.stage.selectedId = state.stage.selectedId || 'stage_001';
      state.stage.chapterFilter = String(state.stage.chapterFilter || '1');
      state.stage.highestCleared = Number(state.stage.highestCleared || 0) || 0;
      state.stage.cleared = (state.stage.cleared && typeof state.stage.cleared === 'object') ? state.stage.cleared : {};
      state.stage.chapterRewardsClaimed = (state.stage.chapterRewardsClaimed && typeof state.stage.chapterRewardsClaimed === 'object') ? state.stage.chapterRewardsClaimed : {};
      if (!stageDefs.some(stage => stage.id === state.stage.selectedId)) state.stage.selectedId = 'stage_001';
      const selected = getStageById(state.stage.selectedId);
      if (state.stage.chapterFilter === 'all' || !stageChapters.some(ch => String(ch.index) === String(state.stage.chapterFilter))) {
        state.stage.chapterFilter = String(selected.chapter.index);
      }
      state.stats = state.stats || {};
      state.stats.stageAttemptCount = state.stats.stageAttemptCount || 0;
      state.stats.stageClearCount = state.stats.stageClearCount || 0;
    }

    function getCampaignChapterById(id) {
      return campaignChapterDefs.find(ch => ch.id === id) || campaignChapterDefs[0];
    }

    function getCampaignNodeById(id) {
      for (const chapter of campaignChapterDefs) {
        const node = chapter.nodes.find(entry => entry.id === id);
        if (node) return Object.assign({ chapter }, node);
      }
      return null;
    }

    function ensureCampaignDefaults() {
      state.campaign = state.campaign || {};
      state.campaign.chapterId = state.campaign.chapterId || campaignChapterDefs[0].id;
      state.campaign.selectedId = state.campaign.selectedId || campaignChapterDefs[0].nodes[0].id;
      state.campaign.highestCleared = Number(state.campaign.highestCleared || 0) || 0;
      state.campaign.cleared = (state.campaign.cleared && typeof state.campaign.cleared === 'object') ? state.campaign.cleared : {};
      state.campaign.activeEncounter = state.campaign.activeEncounter || null;
      if (!getCampaignNodeById(state.campaign.selectedId)) state.campaign.selectedId = campaignChapterDefs[0].nodes[0].id;
      state.stats = state.stats || {};
      state.stats.campaignClearCount = state.stats.campaignClearCount || 0;
    }

    function getCampaignClearInfo(node) {
      if (!node) return null;
      ensureCampaignDefaults();
      return state.campaign.cleared[node.id] || null;
    }

    function isCampaignNodeUnlocked(node) {
      if (!node) return false;
      if (node.order === 1) return true;
      const chapter = getCampaignChapterById(node.chapter.id);
      const prevNode = chapter.nodes.find(entry => entry.order === node.order - 1);
      return !!(prevNode && getCampaignClearInfo(prevNode));
    }

    function getCampaignSuccessInfo(node, code) {
      const effect = getCodeEffect(code);
      const effectivePower = Math.max(1, code.power || 18) * (1 + (0.08 + Number(effect.cpuPowerBonus || 0)) * ((state.cpuTier || 1) - 1));
      let chance = effectivePower / (effectivePower + node.security);
      chance += getSyncSuccessBonus(code.syncLevel || 0);
      chance += Number(effect.hackChance || 0) * 0.35;
      chance = Math.max(0.12, Math.min(0.94, chance));
      return { effectivePower, chance, security: node.security };
    }

    function getCampaignRewardText(reward = {}) {
      const parts = [];
      if (reward.credits) parts.push(`${t('credits')} +${reward.credits}`);
      if (reward.exp) parts.push(`EXP +${reward.exp}`);
      if (reward.shards) parts.push(`${stageCopy('활성 코드 조각', 'Active Code Shards')} +${reward.shards}`);
      if (reward.dailyBonusBox) parts.push(`Daily Bonus Box +${reward.dailyBonusBox}`);
      return parts.join(' / ');
    }

    function getCampaignReplayReward(node) {
      const reward = node && node.reward ? node.reward : {};
      return {
        credits: Math.max(1, Math.round(Number(reward.credits || 0) * 0.4)),
        exp: Math.max(1, Math.round(Number(reward.exp || 0) * 0.5)),
        shards: 0,
        dailyBonusBox: 0
      };
    }

    function renderCampaignPanel() {
      ensureCampaignDefaults();
      const summaryEl = document.getElementById('campaignSummary');
      const nodeListEl = document.getElementById('campaignNodeList');
      const detailEl = document.getElementById('campaignDetail');
      if (!summaryEl || !nodeListEl || !detailEl) return;

      const chapter = getCampaignChapterById(state.campaign.chapterId);
      const selectedNode = getCampaignNodeById(state.campaign.selectedId) || Object.assign({ chapter }, chapter.nodes[0]);
      const clearedCount = chapter.nodes.filter(node => !!getCampaignClearInfo(Object.assign({ chapter }, node))).length;
      const nextNode = chapter.nodes.find(node => isCampaignNodeUnlocked(Object.assign({ chapter }, node)) && !getCampaignClearInfo(Object.assign({ chapter }, node))) || chapter.nodes[chapter.nodes.length - 1];
      const nextLabel = nextNode ? `${nextNode.order}. ${getLang() === 'en' ? nextNode.nameEn : nextNode.name}` : stageCopy('정산 완료', 'Cleared');

      summaryEl.innerHTML = `
        <div><span>CHAPTER</span><strong>${chapter.index} / ${campaignChapterDefs.length}</strong></div>
        <div><span>CLEARED</span><strong>${clearedCount} / ${chapter.nodes.length}</strong></div>
        <div><span>NEXT</span><strong>${nextLabel}</strong></div>
      `;

      nodeListEl.innerHTML = chapter.nodes.map(node => {
        const nodeWithChapter = Object.assign({ chapter }, node);
        const cleared = !!getCampaignClearInfo(nodeWithChapter);
        const unlocked = isCampaignNodeUnlocked(nodeWithChapter);
        const active = selectedNode.id === node.id;
        const status = cleared
          ? stageCopy('CLEAR', 'CLEAR')
          : unlocked
            ? stageCopy('READY', 'READY')
            : stageCopy('LOCKED', 'LOCKED');
        return `
          <button type="button" class="campaign-node ${active ? 'active' : ''} ${cleared ? 'is-cleared' : ''} ${!unlocked ? 'is-locked' : ''}" data-campaign-node="${node.id}" ${unlocked || cleared ? '' : 'disabled'}>
            <span class="campaign-node-order">${node.order}</span>
            <span class="campaign-node-main">
              <strong>${getLang() === 'en' ? node.nameEn : node.name}</strong>
              <em>${node.lane} · Lv.${node.recommendedLevel} · PWR ${node.recommendedPower}</em>
            </span>
            <span class="campaign-node-status">${status}</span>
          </button>
        `;
      }).join('');

      const clearInfo = getCampaignClearInfo(selectedNode);
      const unlocked = isCampaignNodeUnlocked(selectedNode);
      const activeCode = getActiveCodeInstance();
      const enoughEnergy = state.energy >= selectedNode.energyCost;
      const canAttempt = !!activeCode && unlocked && enoughEnergy;
      const successInfo = activeCode ? getCampaignSuccessInfo(selectedNode, activeCode) : { chance: 0, effectivePower: 0, security: selectedNode.security };
      const chancePct = Math.round(successInfo.chance * 100);
      const firstRewardText = getCampaignRewardText(selectedNode.reward);
      const replayRewardText = getCampaignRewardText(getCampaignReplayReward(selectedNode));
      const disabledHint = !activeCode
        ? t('noOwnedCodes')
        : (!unlocked
            ? stageCopy('이전 노드를 먼저 클리어해야 합니다.', 'Clear the previous node first.')
            : (!enoughEnergy
                ? stageCopy(`에너지 ${selectedNode.energyCost} 필요`, `Need ${selectedNode.energyCost} energy`)
                : stageCopy('선형 챌린지 준비 완료', 'Linear challenge ready')));
      detailEl.innerHTML = `
        <div class="stage-detail-head">
          <div>
            <span class="badge">CAMPAIGN</span>
            <h4>${getLang() === 'en' ? selectedNode.nameEn : selectedNode.name}</h4>
            <p>${chapter.subtitle} · ${selectedNode.lane}</p>
          </div>
          <div class="stage-status-pill">${clearInfo ? stageCopy(`클리어 ${clearInfo.clears || 1}회`, `Cleared ${clearInfo.clears || 1} time(s)`) : (unlocked ? stageCopy('첫 클리어 대기', 'First clear pending') : stageCopy('잠금 상태', 'Locked'))}</div>
        </div>
        <div class="stage-meta-grid">
          <div><span>${stageCopy('추천 레벨', 'Recommended Level')}</span><strong>Lv.${selectedNode.recommendedLevel}</strong></div>
          <div><span>${stageCopy('추천 파워', 'Recommended Power')}</span><strong>${selectedNode.recommendedPower}</strong></div>
          <div><span>${stageCopy('보안값', 'Security')}</span><strong>${successInfo.security}</strong></div>
          <div><span>${stageCopy('성공률', 'Success Rate')}</span><strong>${chancePct}%</strong></div>
          <div><span>${stageCopy('에너지', 'Energy')}</span><strong>${selectedNode.energyCost}</strong></div>
          <div><span>${stageCopy('현재 코드', 'Active Code')}</span><strong>${activeCode ? `${activeCode.name} · PWR ${Math.round(successInfo.effectivePower)}` : stageCopy('미선택', 'None')}</strong></div>
        </div>
        <div class="stage-reward-grid">
          <div>
            <span>${stageCopy('첫 클리어 보상', 'First Clear Reward')}</span>
            <strong>${firstRewardText}</strong>
          </div>
          <div>
            <span>${stageCopy('반복 보상', 'Replay Reward')}</span>
            <strong>${replayRewardText}</strong>
          </div>
        </div>
        <div class="campaign-role-note">${stageCopy('캠페인은 선형 챌린지입니다. 다음 미클리어 노드만 새로 열리며, 데이터 타워처럼 장기 반복 보상 루프가 아닙니다.', 'Campaign is a linear challenge. Only the next uncleared node opens, and it is not a long repeat-reward ladder like Data Tower.')}</div>
        <div class="stage-action-row">
          <button type="button" id="btnAttemptCampaignNode" ${canAttempt ? '' : 'disabled'}>${clearInfo ? stageCopy('재도전', 'Replay Node') : stageCopy('선형 도전', 'Start Node')}</button>
          <span class="small">${disabledHint}</span>
        </div>
      `;

      nodeListEl.querySelectorAll('[data-campaign-node]').forEach(btn => {
        btn.addEventListener('click', () => {
          state.campaign.selectedId = btn.dataset.campaignNode;
          renderCampaignPanel();
          scheduleSilentSave();
        });
      });
      detailEl.querySelector('#btnAttemptCampaignNode')?.addEventListener('click', startCampaignNode);
    }

    function startCampaignNode() {
      ensureCampaignDefaults();
      const node = getCampaignNodeById(state.campaign.selectedId);
      const code = getActiveCodeInstance();
      if (!node) return;
      if (!code) {
        showToast(t('noOwnedCodes'), 'warn');
        renderCampaignPanel();
        return;
      }
      if (!isCampaignNodeUnlocked(node)) {
        showToast(stageCopy('이전 노드를 먼저 클리어해야 합니다.', 'Clear the previous node first.'), 'warn');
        renderCampaignPanel();
        return;
      }
      if (!consumeEnergy(node.energyCost)) {
        showToast(stageCopy('에너지가 부족합니다.', 'Not enough energy.'), 'warn');
        renderCampaignPanel();
        return;
      }

      const previous = getCampaignClearInfo(node);
      const firstClear = !previous;
      const reward = firstClear ? node.reward : getCampaignReplayReward(node);
      const info = getCampaignSuccessInfo(node, code);
      const success = Math.random() < info.chance;
      code.usage = (code.usage || 0) + 1;

      if (success) {
        state.credits += reward.credits;
        state.stats.creditsEarnedTotal = (state.stats.creditsEarnedTotal || 0) + reward.credits;
        addExp(reward.exp);
        if (reward.shards) {
          code.shards = (code.shards || 0) + reward.shards;
          state.stats.codeShardsTotal = (state.stats.codeShardsTotal || 0) + reward.shards;
        }
        if (reward.dailyBonusBox) {
          state.items.dailyBonusBox = (state.items.dailyBonusBox || 0) + reward.dailyBonusBox;
        }
        const now = Date.now();
        state.campaign.cleared[node.id] = {
          firstAt: previous && previous.firstAt ? previous.firstAt : now,
          lastAt: now,
          clears: (previous && previous.clears ? previous.clears : 0) + 1,
          bestCodeId: code.id
        };
        state.campaign.highestCleared = Math.max(state.campaign.highestCleared || 0, node.order);
        state.stats.campaignClearCount = (state.stats.campaignClearCount || 0) + 1;
        const nextNode = node.chapter.nodes.find(entry => entry.order === node.order + 1 && !getCampaignClearInfo(Object.assign({ chapter: node.chapter }, entry)));
        if (nextNode) {
          state.campaign.selectedId = nextNode.id;
        }
        const msg = stageCopy(
          `[CAMPAIGN] ${node.name} 클리어! ${getCampaignRewardText(reward)}`,
          `[CAMPAIGN] ${node.nameEn} cleared! ${getCampaignRewardText(reward)}`
        );
        log(msg, 'hack');
        showToast(firstClear ? stageCopy(`${node.name} 첫 클리어`, `${node.nameEn} first clear`) : stageCopy(`${node.name} 반복 클리어`, `${node.nameEn} replay clear`), 'achievement');
        checkMissions('general');
      } else {
        const msg = stageCopy(
          `[CAMPAIGN] ${node.name} 실패 · 보안 ${node.security}`,
          `[CAMPAIGN] ${node.nameEn} failed · security ${node.security}`
        );
        log(msg, 'hack');
        showToast(stageCopy('CAMPAIGN 실패', 'Campaign failed'), 'warn');
      }

      updateStatsUI();
      renderCodeList();
      renderCodeDetail();
      renderCampaignPanel();
      saveGame(true);
    }

    function getStageById(id) {
      return stageDefs.find(stage => stage.id === id) || stageDefs[0];
    }

    function getStageClearInfo(stage) {
      ensureStageDefaults();
      return state.stage.cleared[stage.id] || null;
    }

    function getStageAdjustedSecurity(stage, def) {
      let security = stage.security;
      if (def) {
        const effect = getCodeEffect(def);
        if (def.id === 'port_scanner') security = Math.floor(security * 0.92);
        if (def.id === 'shield_bypass') security = Math.floor(security * 0.88);
        if (def.id === 'fortress_breaker') security = Math.floor(security * 0.80);
        if (effect.serverSecurityMult) security = Math.floor(security * Number(effect.serverSecurityMult));
      }
      return Math.max(8, security);
    }

    function getStageSuccessInfo(stage, code) {
      if (!stage || !code) return { chance: 0, effectivePower: 0, security: stage ? stage.security : 0, bonus: 0 };
      const def = codeDefs[code.id];
      const effect = getCodeEffect(def);
      const adjustedSecurity = getStageAdjustedSecurity(stage, def);
      let successChanceBonus = getSyncSuccessBonus(code.syncLevel || 0);
      if (def) {
        if (def.id === 'pulse_ping') successChanceBonus += 0.03;
        if (def.id === 'stack_tracer') successChanceBonus += 0.05;
        if (def.id === 'data_phantom') successChanceBonus += 0.1;
        if (def.id === 'quantum_splice') successChanceBonus += 0.12;
        if (def.id === 'singularity_root') successChanceBonus += 0.1;
        if (def.id === 'trace_scrambler' && stage.chapter.index >= 3) successChanceBonus += 0.04;
      }
      successChanceBonus += Number(effect.stageChance || 0);
      if (stage.boss) successChanceBonus += Number(effect.bossStageChance || 0);
      const effectivePower = code.power * (1 + (0.08 + Number(effect.cpuPowerBonus || 0)) * (state.cpuTier - 1));
      let chance = effectivePower / (effectivePower + adjustedSecurity);
      chance += successChanceBonus;
      chance = Math.max(0.08, Math.min(0.95, chance));
      return { chance, effectivePower, security: adjustedSecurity, bonus: successChanceBonus };
    }

    function getStageRewardText(reward) {
      const parts = [`${t('credits')} +${reward.credits}`, `EXP +${reward.exp}`];
      if (reward.energyPack) parts.push(`${t('energyPack')} +${reward.energyPack}`);
      return parts.join(' / ');
    }

    function getStageChapterReward(chapterIndex) {
      return {
        credits: 300 + chapterIndex * 100,
        exp: 5 + chapterIndex,
        shards: Math.ceil(chapterIndex / 2),
        energyPack: (chapterIndex === 5 || chapterIndex === 10) ? 1 : 0
      };
    }

    function getStageChapterRewardText(chapterIndex) {
      const reward = getStageChapterReward(chapterIndex);
      const parts = [`${t('credits')} +${reward.credits}`, `EXP +${reward.exp}`, `${stageCopy('활성 코드 조각', 'Active Code Shards')} +${reward.shards}`];
      if (reward.energyPack) parts.push(`${t('energyPack')} +${reward.energyPack}`);
      return parts.join(' / ');
    }

    function isStageChapterComplete(chapter) {
      return stageDefs
        .filter(stage => stage.chapter.index === chapter.index)
        .every(stage => !!getStageClearInfo(stage));
    }

    function applyStageChapterReward(chapter) {
      ensureStageDefaults();
      if (!chapter || !isStageChapterComplete(chapter)) return;
      const key = String(chapter.index);
      if (state.stage.chapterRewardsClaimed[key]) return;
      const reward = getStageChapterReward(chapter.index);
      state.stage.chapterRewardsClaimed[key] = Date.now();
      state.credits += reward.credits;
      state.stats.creditsEarnedTotal += reward.credits;
      addExp(reward.exp);
      const activeCode = getActiveCodeInstance();
      if (activeCode && reward.shards) {
        activeCode.shards = (activeCode.shards || 0) + reward.shards;
        state.stats.codeShardsTotal = (state.stats.codeShardsTotal || 0) + reward.shards;
      }
      if (reward.energyPack) {
        state.items = state.items || { energyPack: 0 };
        state.items.energyPack = (state.items.energyPack || 0) + reward.energyPack;
      }
      playSfx('achievement');
      log(stageCopy(`CH.${chapter.index} 클리어 보상 지급: ${getStageChapterRewardText(chapter.index)}`, `CH.${chapter.index} reward claimed: ${getStageChapterRewardText(chapter.index)}`), 'system');
      showToast(stageCopy(`CH.${chapter.index} 보상 지급`, `CH.${chapter.index} reward claimed`), 'achievement');
    }

    function renderStagePanel() {
      ensureStageDefaults();
      const summaryEl = document.getElementById('stageSummary');
      const chapterListEl = document.getElementById('stageChapterList');
      const detailEl = document.getElementById('stageDetail');
      if (!summaryEl || !chapterListEl || !detailEl) return;

      const selectedStage = getStageById(state.stage.selectedId);
      const filter = state.stage.chapterFilter || 'all';
      const completedCount = Object.keys(state.stage.cleared || {}).length;
      const channelMeta = STAGE_CHANNEL_META[selectedStage.chapter.theme] || null;

      // 현재 챕터 = 미클리어 스테이지가 있는 가장 낮은 챕터
      const currentProgressChapter = (() => {
        for (const ch of stageChapters) {
          const stages = stageDefs.filter(s => s.chapter.index === ch.index);
          if (stages.some(s => !getStageClearInfo(s))) return String(ch.index);
        }
        return String(stageChapters[stageChapters.length - 1]?.index || '1');
      })();

      summaryEl.innerHTML = `
        <div><span>HIGHEST</span><strong>${state.stage.highestCleared || 0} / 100</strong></div>
        <div><span>CLEARED</span><strong>${completedCount} / 100</strong></div>
        <div><span>ATTEMPTS</span><strong>${state.stats.stageAttemptCount || 0}</strong></div>
        <button type="button" id="btnGoCurrentChapter" class="btn-go-chapter small">
          ${stageCopy(`▶ CH.${currentProgressChapter} 이동`, `▶ Go to CH.${currentProgressChapter}`)}
        </button>
      `;
      document.getElementById('btnGoCurrentChapter')?.addEventListener('click', () => {
        state.stage.chapterFilter = currentProgressChapter;
        const stages = stageDefs.filter(s => String(s.chapter.index) === currentProgressChapter);
        const firstReady = stages.find(s => !getStageClearInfo(s)) || stages[0];
        if (firstReady) state.stage.selectedId = firstReady.id;
        renderStagePanel();
        scheduleSilentSave();
        // 챕터 목록 스크롤
        const chEl = chapterListEl.querySelector(`[data-stage-chapter="${currentProgressChapter}"]`);
        if (chEl) chEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });

      const clearInfo = getStageClearInfo(selectedStage);
      const activeCode = getActiveCodeInstance();
      const successInfo = getStageSuccessInfo(selectedStage, activeCode);
      const chancePct = Math.round(successInfo.chance * 100);
      const enoughEnergy = state.energy >= selectedStage.energyCost;
      const canAttempt = !!activeCode && enoughEnergy;
      const activeEffect = getCodeEffect(activeCode);
      const repeatPreview = applyGpuReward({
        credits: Math.max(1, Math.round(selectedStage.repeatReward.credits * (1 + Number(activeEffect.stageRepeatCreditBonus || 0)))),
        exp: Math.max(1, Math.round(selectedStage.repeatReward.exp * (1 + Number(activeEffect.stageRepeatExpBonus || 0)))),
        energyPack: selectedStage.repeatReward.energyPack
      });
      const statusText = clearInfo
        ? stageCopy(`클리어 ${clearInfo.clears || 1}회`, `Cleared ${clearInfo.clears || 1} time(s)`)
        : stageCopy('첫 클리어 대기', 'First clear pending');
      const buttonText = clearInfo ? stageCopy('반복 도전', 'Repeat Data Tower') : stageCopy('첫 클리어 도전', 'Attempt First Clear');
      const disabledHint = !activeCode
        ? t('noOwnedCodes')
        : (!enoughEnergy ? stageCopy(`에너지 ${selectedStage.energyCost} 필요`, `Need ${selectedStage.energyCost} energy`) : stageCopy('도전 준비 완료', 'Ready to attempt'));

      // ── ACTIVE BATTLE UI ──
      const battle = state.stage.activeBattle;
      if (battle && !battle.over) {
        const bStage = getStageById(battle.stageId);
        const pPct = Math.round((battle.playerHp / battle.playerMaxHp) * 100);
        const ePct = Math.round((battle.enemyHp  / battle.enemyMaxHp)  * 100);
        const bStats = getStageBattleStats(bStage, ownedCodes.find(c=>c.id===battle.codeId)||activeCode);
        detailEl.innerHTML = `
          <div class="battle-header">
            <span class="badge">${bStage.boss ? 'BOSS' : 'DATA TOWER'}</span>
            <strong>${bStage.name}</strong>
            <em>${stageCopy('턴','Turn')} ${battle.turn}</em>
          </div>
          <div class="battle-bars">
            <div class="battle-bar-row">
              <span>${stageCopy('무결성','Integrity')}</span>
              <div class="battle-bar"><div class="battle-bar-fill player" style="width:${pPct}%"></div></div>
              <strong>${battle.playerHp} / ${battle.playerMaxHp}</strong>
            </div>
            <div class="battle-bar-row">
              <span>${stageCopy('적 방어','Enemy')}</span>
              <div class="battle-bar"><div class="battle-bar-fill enemy" style="width:${ePct}%"></div></div>
              <strong>${battle.enemyHp} / ${battle.enemyMaxHp}</strong>
            </div>
          </div>
          <div class="battle-status-flags">
            ${battle.focusActive  ? `<span class="battle-flag focus">${stageCopy('FOCUS 충전','FOCUS charged')}</span>` : ''}
            ${battle.shieldActive ? `<span class="battle-flag shield">${stageCopy('SHIELD 대기','SHIELD ready')}</span>` : ''}
          </div>
          <div class="battle-log">${(battle.log.slice(-4)).map(l=>`<div class="battle-log-line">${l}</div>`).join('')}</div>
          <div class="battle-actions">
            <button type="button" data-battle-action="breach">BREACH</button>
            <button type="button" data-battle-action="shield">SHIELD</button>
            <button type="button" data-battle-action="focus">FOCUS</button>
            <button type="button" data-battle-action="exit" class="btn-danger">EXIT</button>
          </div>
          <p class="stage-note">${stageCopy('BREACH: 공격 | SHIELD: 방어(피해 55% 감쇄) | FOCUS: 다음 BREACH ×1.75 | EXIT: 포기','BREACH: Attack | SHIELD: Defend (55% dmg reduction) | FOCUS: next BREACH ×1.75 | EXIT: Quit')}</p>
        `;
        detailEl.querySelectorAll('[data-battle-action]').forEach(btn => {
          btn.addEventListener('click', () => doStageTurnAction(btn.dataset.battleAction));
        });
      } else {
        detailEl.innerHTML = `
          <div class="stage-detail-head">
            <div>
              <span class="badge">${selectedStage.boss ? 'BOSS' : 'DATA TOWER'}</span>
              <h4>${selectedStage.name}</h4>
              <p>${getLang() === 'en' ? selectedStage.chapter.titleEn : selectedStage.chapter.title} · ${selectedStage.chapter.from}-${selectedStage.chapter.to}${channelMeta ? ` · ${getLang() === 'en' ? channelMeta.en : channelMeta.ko}` : ''}</p>
            </div>
            <div class="stage-status-pill">${statusText}</div>
          </div>
          <div class="stage-meta-grid">
            <div><span>${stageCopy('추천 레벨', 'Recommended Level')}</span><strong>Lv.${selectedStage.recommendedLevel}</strong></div>
            <div><span>${stageCopy('추천 파워', 'Recommended Power')}</span><strong>${selectedStage.recommendedPower}</strong></div>
            <div><span>${stageCopy('보안값', 'Security')}</span><strong>${successInfo.security}</strong></div>
            <div><span>${stageCopy('에너지', 'Energy')}</span><strong>${selectedStage.energyCost}</strong></div>
            <div><span>${stageCopy('추천 코드', 'Suggested Code')}</span><strong>${selectedStage.chapter.hint}</strong></div>
            <div><span>${stageCopy('채널', 'Channel')}</span><strong>${channelMeta ? (getLang() === 'en' ? channelMeta.en : channelMeta.ko) : selectedStage.chapter.theme}</strong></div>
          </div>
          <div class="stage-reward-grid">
            <div>
              <span>${stageCopy('첫 클리어 보상', 'First Clear Reward')}</span>
              <strong>${getStageRewardText(selectedStage.firstReward)}</strong>
            </div>
            <div>
              <span>${stageCopy('반복 보상', 'Repeat Reward')}</span>
              <strong>${getStageRewardText(repeatPreview)}</strong>
            </div>
            <div>
              <span>${stageCopy('챕터 보상', 'Chapter Reward')}</span>
              <strong>${state.stage.chapterRewardsClaimed[String(selectedStage.chapter.index)] ? stageCopy('이미 수령함', 'Already claimed') : getStageChapterRewardText(selectedStage.chapter.index)}</strong>
            </div>
          </div>
          ${channelMeta ? `<div class="stage-channel-note">${getLang() === 'en' ? channelMeta.descEn : channelMeta.descKo}</div>` : ''}
          <div class="stage-action-row">
            <button type="button" id="btnAttemptStage" ${canAttempt ? '' : 'disabled'}>${buttonText}</button>
            <span class="small">${disabledHint}${activeCode ? ` · ${activeCode.name} PWR ${Math.round(successInfo.effectivePower)}` : ''}</span>
          </div>
          <p class="stage-note">${stageCopy('에너지 1 소모 → BREACH/SHIELD/FOCUS/EXIT 턴제 전투.', '1 energy → turn-based combat: BREACH/SHIELD/FOCUS/EXIT.')}</p>
        `;
        const btnAttemptStage = document.getElementById('btnAttemptStage');
        bind(btnAttemptStage, 'click', startStageBattle);
      }

      chapterListEl.innerHTML = stageChapters.map(chapter => {
        const open = String(chapter.index) === String(filter);
        const stages = stageDefs.filter(stage => stage.chapter.index === chapter.index);
        const clearedInChapter = stages.filter(stage => !!getStageClearInfo(stage)).length;
        const complete = clearedInChapter === stages.length;
        const claimed = !!state.stage.chapterRewardsClaimed[String(chapter.index)];
        return `
          <section class="stage-chapter ${open ? 'open' : ''} ${complete ? 'is-complete' : ''}" data-stage-chapter="${chapter.index}">
            <button type="button" class="stage-chapter-head" data-stage-chapter-toggle="${chapter.index}">
              <span><strong>CH.${chapter.index}</strong> ${getLang() === 'en' ? chapter.titleEn : chapter.title}</span>
              <em>${chapter.from}-${chapter.to} · ${(STAGE_CHANNEL_META[chapter.theme] ? (getLang() === 'en' ? STAGE_CHANNEL_META[chapter.theme].en : STAGE_CHANNEL_META[chapter.theme].ko) : chapter.theme)} · ${clearedInChapter}/10 · ${claimed ? stageCopy('보상 수령', 'Reward claimed') : getStageChapterRewardText(chapter.index)}</em>
            </button>
            <div class="stage-list" ${open ? '' : 'hidden'}>
              ${(() => {
                // #12: 클리어 스테이지 자동 가림 — 마지막 클리어 스테이지 + 미클리어 스테이지만 표시
                const clearedStages = stages.filter(s => !!getStageClearInfo(s));
                const lastClearedNum = clearedStages.length > 0
                  ? Math.max(...clearedStages.map(s => s.number))
                  : -1;
                return stages.map(stage => {
                  const cleared = !!getStageClearInfo(stage);
                  // 클리어된 스테이지 중 마지막 클리어가 아니면 숨김 (#12)
                  if (cleared && stage.number !== lastClearedNum) return '';
                  const active = stage.id === selectedStage.id;
                  const status = cleared ? stageCopy('CLEAR', 'CLEAR') : stageCopy('READY', 'READY');
                  return `
                    <button type="button" class="stage-card ${active ? 'active' : ''} ${cleared ? 'is-cleared' : ''} ${stage.boss ? 'is-boss' : ''}" data-stage-id="${stage.id}">
                      <span class="stage-card-top"><strong>${String(stage.number).padStart(3, '0')}</strong><em>${stage.boss ? 'BOSS' : chapter.theme}</em></span>
                      <span class="stage-card-meta">Lv.${stage.recommendedLevel} · PWR ${stage.recommendedPower}</span>
                      <span class="stage-card-status">${status}</span>
                    </button>
                  `;
                }).join('');
              })()}
            </div>
          </section>
        `;
      }).join('');

      chapterListEl.querySelectorAll('[data-stage-chapter-toggle]').forEach(btn => {
        btn.addEventListener('click', () => {
          const chapterIndex = btn.dataset.stageChapterToggle || '1';
          state.stage.chapterFilter = chapterIndex;
          const stages = stageDefs.filter(stage => String(stage.chapter.index) === String(chapterIndex));
          const firstReady = stages.find(stage => !getStageClearInfo(stage)) || stages[0];
          if (firstReady) state.stage.selectedId = firstReady.id;
          renderStagePanel();
          scheduleSilentSave();
        });
      });

      chapterListEl.querySelectorAll('[data-stage-id]').forEach(btn => {
        btn.addEventListener('click', () => {
          state.stage.selectedId = btn.dataset.stageId;
          const stage = getStageById(state.stage.selectedId);
          state.stage.chapterFilter = String(stage.chapter.index);
          renderStagePanel();
          scheduleSilentSave();
        });
      });
    }

    // ── DATA TOWER TURN-BASED COMBAT ─────────────────────────────────────────
    function getStageBattleStats(stage, code) {
      const cpuT = Math.max(1, state.cpuTier || 1);
      const pw   = code ? Math.max(1, code.power || code.basePower || 18) : 18;
      const playerMax = 90 + pw * 2 + cpuT * 10;
      const enemyMax  = 70 + stage.number * 10;
      const enemyDmg  = 8 + (stage.chapter.index - 1) * 3;
      return { playerMax, enemyMax, enemyDmg };
    }

    function startStageBattle() {
      // v3.0.0 fix: 조건 검사 → activeBattle 생성 → 에너지 차감 → state 적용 → UI 갱신 → 저장
      // run 생성 실패 시 에너지 차감 금지 (에너지 보호)
      ensureStageDefaults();
      const stage = getStageById(state.stage.selectedId);
      const code  = getActiveCodeInstance();

      // v3.0.0+ fix: 잠긴 battle이 있어도 자동 클리어 후 새로 시작 (이전 가드는 stale battle 복구 시 새 도전을 막아버림)
      if (state.stage.activeBattle && !state.stage.activeBattle.over) {
        console.warn('[StageBattle] Stale battle cleared on new attempt');
        state.stage.activeBattle = null;
      }

      // 1. 조건 검사 (에너지 차감 전)
      if (!code) {
        showToast(t('noOwnedCodes'), 'warn');
        renderStagePanel();
        return;
      }
      if (!stage) {
        const msg = stageCopy('스테이지 정보를 찾을 수 없습니다.', 'Stage data not found.');
        showToast(msg, 'warn');
        return;
      }
      if (state.energy < stage.energyCost) {
        const msg = stageCopy('에너지가 부족해 데이터 타워를 시작할 수 없습니다.', 'Not enough energy to start Data Tower.');
        log(msg, 'hack');
        showToast(msg, 'warn');
        renderStagePanel();
        return;
      }

      // 2. activeBattle 객체 미리 빌드 (에너지 차감 전 — 실패 시 에너지 보존)
      let activeBattle;
      try {
        const stats = getStageBattleStats(stage, code);
        if (!stats || !stats.playerMax || !stats.enemyMax) throw new Error('invalid stats');
        activeBattle = {
          stageId: stage.id,
          codeId: code.id,
          playerHp: stats.playerMax,
          playerMaxHp: stats.playerMax,
          enemyHp: stats.enemyMax,
          enemyMaxHp: stats.enemyMax,
          turn: 1,
          focusActive: false,
          shieldActive: false,
          log: [],
          over: false,
          win: false
        };
      } catch (err) {
        console.error('[StageBattle] Failed to build activeBattle:', err);
        const msg = stageCopy('데이터 타워 시작 실패 — 다시 시도하세요.', 'Failed to start Data Tower. Try again.');
        showToast(msg, 'warn');
        return; // ← 에너지 차감 안 함
      }

      // 3. 에너지 차감 (run이 정상 빌드된 경우에만)
      if (!consumeEnergy(stage.energyCost)) {
        const msg = stageCopy('에너지가 부족해 데이터 타워를 시작할 수 없습니다.', 'Not enough energy to start Data Tower.');
        log(msg, 'hack');
        showToast(msg, 'warn');
        renderStagePanel();
        return;
      }

      // 4. state 적용
      state.stage.activeBattle = activeBattle;
      state.stats.stageAttemptCount = (state.stats.stageAttemptCount || 0) + 1;
      code.usage = (code.usage || 0) + 1;
      // Phase 1: 타워 도전 미션 추적 (#17 fix)
      ensureMissionResets();
      state.missionProgress.daily.towerAttempts = (state.missionProgress.daily.towerAttempts || 0) + 1;
      state.missionProgress.weekly.towerAttempts = (state.missionProgress.weekly.towerAttempts || 0) + 1;
      checkMissions('daily');
      checkMissions('weekly');

      // 5. UI 갱신 + 저장
      renderStagePanel();
      saveGame(true);
    }

    function doStageTurnAction(action) {
      const battle = state.stage.activeBattle;
      if (!battle || battle.over) return;
      const stage = getStageById(battle.stageId);
      const code  = ownedCodes.find(c => c.id === battle.codeId) || getActiveCodeInstance();
      const stats = getStageBattleStats(stage, code);
      const atkBase = Math.max(5, Math.round(stats.playerMax * 0.18));
      let playerDmg = 0, enemyDmg = stats.enemyDmg, logLine = '';

      if (action === 'breach') {
        playerDmg = battle.focusActive ? Math.round(atkBase * 1.75) : atkBase;
        battle.focusActive = false;
        battle.enemyHp -= playerDmg;
        // enemy counter
        const actualEnemyDmg = battle.shieldActive ? Math.max(1, Math.round(enemyDmg * 0.45)) : enemyDmg;
        battle.shieldActive = false;
        battle.playerHp -= actualEnemyDmg;
        logLine = stageCopy(
          `BREACH -${playerDmg} / 적 반격 -${actualEnemyDmg}`,
          `BREACH -${playerDmg} / enemy counter -${actualEnemyDmg}`
        );
      } else if (action === 'shield') {
        battle.shieldActive = true;
        const actualEnemyDmg = Math.max(1, Math.round(enemyDmg * 0.45));
        battle.playerHp -= actualEnemyDmg;
        logLine = stageCopy(
          `SHIELD 발동 — 적 공격 -${actualEnemyDmg} (방어 감쇄)`,
          `SHIELD active — enemy -${actualEnemyDmg} (reduced)`
        );
      } else if (action === 'focus') {
        battle.focusActive = true;
        const actualEnemyDmg = battle.shieldActive ? Math.max(1, Math.round(enemyDmg * 0.45)) : enemyDmg;
        battle.shieldActive = false;
        battle.playerHp -= actualEnemyDmg;
        logLine = stageCopy(
          `FOCUS 집중 — 다음 BREACH 데미지 ×1.75, 적 공격 -${actualEnemyDmg}`,
          `FOCUS charged — next BREACH ×1.75, enemy -${actualEnemyDmg}`
        );
      } else if (action === 'exit') {
        battle.over = true;
        battle.win  = false;
        state.stage.activeBattle = null;
        const msg = stageCopy('[데이터 타워] 전투 이탈. 에너지 소모됨.', '[Data Tower] Exited battle. Energy spent.');
        log(msg, 'hack');
        showToast(stageCopy('전투 이탈', 'Battle exited'), 'warn');
        renderStagePanel();
        saveGame(true);
        return;
      }

      battle.turn++;
      battle.playerHp = Math.max(0, battle.playerHp);
      battle.enemyHp  = Math.max(0, battle.enemyHp);
      battle.log.push(logLine);
      if (battle.log.length > 8) battle.log.shift();

      if (battle.enemyHp <= 0) {
        battle.over = true;
        battle.win  = true;
        finishStageBattle(stage, code, true);
        return;
      }
      if (battle.playerHp <= 0) {
        battle.over = true;
        battle.win  = false;
        finishStageBattle(stage, code, false);
        return;
      }

      renderStagePanel();
      saveGame(true);
    }

    function finishStageBattle(stage, code, success) {
      state.stage.activeBattle = null;
      if (success) {
        const previous = getStageClearInfo(stage);
        const firstClear = !previous;
        const effect = getCodeEffect(code);
        const baseRepeatReward = {
          credits: Math.max(1, Math.round(stage.repeatReward.credits * (1 + Number(effect.stageRepeatCreditBonus || 0)))),
          exp: Math.max(1, Math.round(stage.repeatReward.exp * (1 + Number(effect.stageRepeatExpBonus || 0)))),
          energyPack: stage.repeatReward.energyPack
        };
        const reward = firstClear ? stage.firstReward : applyGpuReward(baseRepeatReward);
        const now = Date.now();
        state.credits += reward.credits;
        state.stats.creditsEarnedTotal += reward.credits;
        if (reward.energyPack) {
          state.items.energyPack = (state.items.energyPack || 0) + reward.energyPack;
        }
        addExp(reward.exp);
        state.stage.cleared[stage.id] = {
          firstAt: previous && previous.firstAt ? previous.firstAt : now,
          lastAt: now,
          clears: (previous && previous.clears ? previous.clears : 0) + 1,
          bestCodeId: code.id
        };
        state.stage.highestCleared = Math.max(state.stage.highestCleared || 0, stage.number);
        state.stats.stageClearCount = (state.stats.stageClearCount || 0) + 1;
        state.stats.stageTurnWinCount = (state.stats.stageTurnWinCount || 0) + 1;
        applyStageChapterReward(stage.chapter);
        // auto-select next uncleard stage
        const nextUncleard = stageDefs.find(s => s.number > stage.number && !state.stage.cleared[s.id]);
        if (nextUncleard) {
          state.stage.selectedId = nextUncleard.id;
          state.stage.chapterFilter = String(nextUncleard.chapter.index);
        }
        emitActivity('stage_clear', { stageId: stage.id, refId: stage.id, value: stage.number, codeId: code.id });
        trackWeeklyChallenge('stage_clear', { stageId: stage.id, chapter: stage.chapter.index, firstClear, codeId: code.id });
        const rewardText = getStageRewardText(reward);
        playSfx('stage');
        const msg = stageCopy(
          `${stage.name} 클리어! ${rewardText}`,
          `${stage.name} cleared! ${rewardText}`
        );
        log(msg, 'hack');
        showToast(firstClear ? stageCopy(`${stage.name} 첫 클리어`, `${stage.name} first clear`) : stageCopy(`${stage.name} 반복 클리어`, `${stage.name} repeat clear`), 'achievement');
        checkMissions('general');
        checkAchievements('stage');
      } else {
        playSfx('fail');
        const msg = stageCopy(`${stage.name} 전투 실패. 인테그리티 0 도달.`, `${stage.name} battle failed. Integrity reached 0.`);
        log(msg, 'hack');
        showToast(stageCopy('데이터 타워 실패', 'Data Tower failed'), 'warn');
      }
      updateStatsUI();
      renderStagePanel();
      saveGame(true);
    }

    // Kept as alias for legacy call sites inside renderStagePanel
    function attemptStage() { startStageBattle(); }

    function syncSelectedCode() {
      const code = getActiveCodeInstance();
      if (!code) {
        log(t('noCodeSync'), 'system');
        showToast(t('noCodeSync'), 'warn');
        return;
      }

      code.shards = code.shards || 0;
      code.syncLevel = code.syncLevel || 0;

      const shardCost = getSyncShardCost(code.syncLevel);
      if (code.shards < shardCost) {
        log(t('syncFailShards', { need: shardCost, have: code.shards }), 'system');
        showToast(t('syncFailShards', { need: shardCost, have: code.shards }), 'warn');
        return;
      }

      code.shards -= shardCost;
      code.syncLevel += 1;
      const powerBonus = getSyncPowerBonus(code.rarity);
      code.power += powerBonus;
	      state.stats.codeSyncCount = (state.stats.codeSyncCount || 0) + 1;
	      trackWeeklyChallenge('code_sync', { codeId: code.id });

      playSfx('upgrade');
      log(t('syncDone', { name: code.name, lv: code.syncLevel, pwr: powerBonus, rate: Math.round(getSyncSuccessBonus(code.syncLevel) * 100) }), 'system');
      // v3.0.0+: 동기화 결과 피드 (의미 있는 정보 포함)
      const rateBonus = Math.round(getSyncSuccessBonus(code.syncLevel) * 100);
      showToast(`${getLang()==='en'?'⟳ Sync':'⟳ 동기화'}: ${code.name} Lv.${code.syncLevel} (+${powerBonus} PWR / +${rateBonus}% rate)`, 'achievement');
      updateStatsUI();
      renderCodeList();
      renderCodeDetail();
      renderStagePanel();
      scheduleSilentSave();
    }

    function upgradeSelectedCode() {
      const code = getActiveCodeInstance();
      if (!code) {
        log(t('noCodeUpgrade'), 'system');
        showToast(t('noCodeUpgrade'), 'warn');
        return;
      }
      const cost = 100 * code.level;
      if (state.credits < cost) {
        log(t('upgradeFailCredits', { cost }), 'system');
        showToast(t('upgradeFailCredits', { cost }), 'warn');
        return;
      }
      state.credits -= cost;
      code.level++;
      code.power += 5;
	      state.stats.codeUpgradeCount = (state.stats.codeUpgradeCount || 0) + 1;
	      trackWeeklyChallenge('code_upgrade', { codeId: code.id });
      // Phase 1: codeLevelUp 미션 추적
      state.missionProgress.daily.codeLevelUp = (state.missionProgress.daily.codeLevelUp || 0) + 1;
      state.missionProgress.weekly.codeLevelUp = (state.missionProgress.weekly.codeLevelUp || 0) + 1;
      playSfx('upgrade');
      log(t('upgradeDone', { name: code.name, lv: code.level, pwr: code.power, cost }), 'system');
      // v3.0.0+: 강화 결과 피드 (토스트)
      showToast(`${getLang()==='en'?'⬆ Upgrade':'⬆ 강화'}: ${code.name} Lv.${code.level} (+5 PWR → ${code.power})`, 'achievement');
      updateStatsUI();
      renderCodeList();
      renderCodeDetail();
      renderStagePanel();
      checkMissions('general');
      scheduleSilentSave();
    }

    function evolveSelectedCode() {
      const code = getActiveCodeInstance();
      if (!code) {
        log(t('noCodeEvolve'), 'system');
        showToast(t('noCodeEvolve'), 'warn');
        return;
      }
      if (code.rarity === 'LEGENDARY') {
        log(t('maxRarity'), 'system');
        showToast(t('maxRarity'), 'warn');
        return;
      }
      if (code.level < 5) {
        log(t('evolveNeedLv'), 'system');
        showToast(t('evolveNeedLv'), 'warn');
        return;
      }
      const idx = rarityOrder.indexOf(code.rarity);
      if (idx === -1 || idx === rarityOrder.length - 1) {
        log(t('evolveCannot'), 'system');
        showToast(t('evolveCannot'), 'warn');
        return;
      }
      const nextRarity = rarityOrder[idx + 1];
      code.rarity = nextRarity;
      code.power += 10;
	      state.stats.codeEvolutionCount = (state.stats.codeEvolutionCount || 0) + 1;
	      trackWeeklyChallenge('code_evolve', { codeId: code.id, rarity: nextRarity });
      playSfx('upgrade');
      log(t('evolveDone', { name: code.name, rarity: nextRarity, pwr: code.power }), 'system');
      // v3.0.0+: 진화 결과 피드 (희귀도 변동은 강조)
      showToast(`${getLang()==='en'?'★ Evolution':'★ 진화'}: ${code.name} → ${localizeRarityLabel(nextRarity)} (+10 PWR → ${code.power})`, 'achievement');

      if (nextRarity === 'EPIC' || nextRarity === 'LEGENDARY') {
        unlockAchievement('get_epic_code');
      }
      updateStatsUI();
      renderCodeList();
      renderCodeDetail();
      renderStagePanel();
      checkMissions('general');
      scheduleSilentSave();
    }

    function shardEnhanceSelectedCode() {
      const code = getActiveCodeInstance();
      if (!code) {
        log(t('noCodeUpgrade'), 'system');
        return;
      }
      code.shards = code.shards || 0;
      const cost = getShardEnhanceCost(code);
      if (code.shards < cost) {
        log(t('shardEnhanceFail', { need: cost, have: code.shards }), 'system');
        showToast(t('shardEnhanceFail', { need: cost, have: code.shards }), 'warn');
        return;
      }
      code.shards -= cost;
      code.power += 2;
      state.stats.codeShardsSpentTotal = (state.stats.codeShardsSpentTotal || 0) + cost;
      playSfx('upgrade');
      log(t('shardEnhanceDone', { name: code.name, pwr: code.power, cost }), 'system');
      // v3.0.0+: 조각 강화 결과 피드 (조각 잔량 포함)
      showToast(`${getLang()==='en'?'◇ Shard':'◇ 조각'}: ${code.name} +2 PWR → ${code.power} (-${cost}, ${code.shards}${getLang()==='en'?' left':' 남음'})`, 'achievement');
      renderCodeList();
      renderCodeDetail();
      updateStatsUI();
      renderStagePanel();
      scheduleSilentSave();
    }

    function renderServers() {
      if (!serverSelect) return;
      serverSelect.innerHTML = '';
      servers.forEach(s => {
        const option = document.createElement('option');
        option.value = s.id;
        const serverName = localizeServerName(s);
        const serverSec = Number(s.security || s.sec || 0);
        const serverLv = Number(s.minLevel || s.lv || 1);
        option.textContent = getLang() === 'en'
          ? `${serverName} (Security ${serverSec}, Lv${serverLv}+)`
          : getLang() === 'ja'
            ? `${serverName} (セキュリティ ${serverSec}, Lv${serverLv}+)`
            : `${serverName} (보안 ${serverSec}, Lv${serverLv}+)`;
        serverSelect.appendChild(option);
      });
      // 저장된 서버 선택 복원
      const savedId = state.targeting && state.targeting.serverId;
      if (savedId && servers.find(s => s.id === savedId)) {
        serverSelect.value = savedId;
      }
    }

    
    // =========================
    // SHOP LIMITS (Daily / One-time)
    // =========================
    const SHOP_LIMITS = {
      // Daily cap
      energy_pack: { type: 'daily', limit: 3, label: '05:00 리셋 (3회)' },
      energy_boost_1: { type: 'daily', limit: 3, label: '05:00 리셋 (3회)' },
      energy_boost_2: { type: 'daily', limit: 2, label: '05:00 리셋 (2회)' },
      quick_charge_cell: { type: 'daily', limit: 3, label: '05:00 리셋 (3회)' },
      recovery_daemon: { type: 'daily', limit: 2, label: '05:00 리셋 (2회)' },
      full_battery_pack: { type: 'daily', limit: 1, label: '05:00 리셋 (1회)' },
      credit_boost_run: { type: 'daily', limit: 1, label: '05:00 리셋 (1회)' },
      scanner_module: { type: 'daily', limit: 1, label: '05:00 리셋 (1회)' },
      cpu_discount: { type: 'daily', limit: 1, label: '05:00 리셋 (1회)' },
      gpu_discount_coupon: { type: 'daily', limit: 1, label: '05:00 리셋 (1회)' },
      overclock_script: { type: 'daily', limit: 2, label: '05:00 리셋 (2회)' },
      scan_exp_script: { type: 'daily', limit: 2, label: '05:00 리셋 (2회)' },
      max_energy_up: { type: 'daily', limit: 1, label: '05:00 리셋 (1회)' },
      big_credit_pack: { type: 'daily', limit: 1, label: '05:00 리셋 (1회)' },
      credit_cache: { type: 'daily', limit: 1, label: '05:00 리셋 (1회)' },
      credit_relay_script: { type: 'daily', limit: 1, label: '05:00 리셋 (1회)' },
      hack_stability_patch: { type: 'daily', limit: 1, label: '05:00 리셋 (1회)' },
      failure_buffer_module: { type: 'daily', limit: 2, label: '05:00 리셋 (2회)' },
      level_ticket: { type: 'daily', limit: 1, label: '05:00 리셋 (1회)' },
      // One-time (no stacking)
      exp_boost: { type: 'once', limit: 1, label: '1회' },
      perm_credit_boost: { type: 'once', limit: 1, label: '1회' },
      risk_support: { type: 'once', limit: 1, label: '1회' },
      scanner_plus: { type: 'once', limit: 1, label: '1회' }
    };

    const SHOP_META_KEY = 'HCSIG_SHOP_META_V1';

    function getLocalDateKey() {
      // SERVER RESET KEY (fixed 05:00 KST)
      // 05:00 이전에는 '전날'로 간주, 05:00 이후는 '당일'로 간주
      const RESET_HOUR = 5;
      const d = new Date();
      if (d.getHours() < RESET_HOUR) d.setDate(d.getDate() - 1);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}`;
    }

    function loadShopMeta() {
      try {
        const raw = localStorage.getItem(SHOP_META_KEY);
        if (!raw) throw new Error('empty');
        const meta = JSON.parse(raw);
        if (!meta || typeof meta !== 'object') throw new Error('bad');
        if (!meta.daily) meta.daily = {};
        if (!meta.once) meta.once = {};
        return meta;
      } catch (e) {
        return { date: getLocalDateKey(), daily: {}, once: {} };
      }
    }

    function saveShopMeta(meta) {
      localStorage.setItem(SHOP_META_KEY, JSON.stringify(meta));
    }

    function ensureDailyShopReset() {
      const meta = loadShopMeta();
      const today = getLocalDateKey();
      if (meta.date !== today) {
        meta.date = today;
        meta.daily = {}; // reset daily counts
        saveShopMeta(meta);
        log(t('logDailyShopReset'), 'system');
      }
      return meta;
    }

    function getShopLimitInfo(itemId) {
      return SHOP_LIMITS[itemId] || null;
    }

    function getShopRemaining(itemId) {
      const info = getShopLimitInfo(itemId);
      if (!info) return null;
      const meta = ensureDailyShopReset();
      if (info.type === 'daily') {
        const used = meta.daily[itemId] || 0;
        return { used, limit: info.limit, remaining: Math.max(0, info.limit - used), type: info.type, label: info.label };
      }
      if (info.type === 'once') {
        const bought = !!meta.once[itemId];
        return { used: bought ? 1 : 0, limit: 1, remaining: bought ? 0 : 1, type: info.type, label: info.label };
      }
      return null;
    }

    function canBuyShopItem(itemId) {
      const info = getShopRemaining(itemId);
      if (!info) return { ok: true };
      if (info.remaining <= 0) {
        return { ok: false, reason: info.type === 'daily' ? t('buyDailyLimit') : t('buyOnceLimit') };
      }
      return { ok: true };
    }

    function markShopPurchase(itemId) {
      const info = getShopLimitInfo(itemId);
      if (!info) return;
      const meta = ensureDailyShopReset();
      if (info.type === 'daily') {
        meta.daily[itemId] = (meta.daily[itemId] || 0) + 1;
      } else if (info.type === 'once') {
        meta.once[itemId] = true;
      }
      saveShopMeta(meta);
    }

    // Reset daily limits automatically at server reset time (fixed 05:00 KST)
    setInterval(() => { try { ensureDailyShopReset(); } catch(e){} }, 60 * 1000);

    // AUTO-RUN 타이머 표시 갱신 (1초마다, 활성 중일 때만 렌더)
    setInterval(() => {
      try {
        if (state.autoRun && state.autoRun.type) {
          renderItemsPanel();
        }
      } catch(e) {}
    }, 1000);


    // ── 지원 센터 탭 렌더 ───────────────────────────────────────────────────
    function renderSupportCenter() {
      if (!shopList) return;
      shopList.innerHTML = '';
      const lang = getLang();
      const ko = lang !== 'en';
      const summary = document.createElement('div');
      summary.className = 'shop-summary-card shop-summary-card-support';
      summary.innerHTML = `
        <div class="shop-summary-badge">${langText('유료 상점', 'Paid Shop', '有料ショップ')}</div>
        <h3>${langText('지원 센터 / 수동 결제', 'Support Desk / Manual Checkout', 'サポートセンター / 手動決済')}</h3>
        <p>${langText(
          '이 구역은 크레딧·COIN·OneDay 상점과 다르게 수동 처리되는 유료 신청 허브입니다. 후원 상품, COIN 구매, 크레딧 패키지를 여기서 신청하고 MORE → SUPPORT에서 진행 상태를 확인합니다.',
          'This area is the manual paid hub, separate from the Credits, COIN, and OneDay shops. Apply for support products, COIN purchases, and credit packages here, then track them in MORE → SUPPORT.',
          'この領域はクレジット・COIN・OneDayショップとは別の手動処理型有料ハブです。サポート商品、COIN購入、クレジットパッケージをここで申請し、MORE → SUPPORTで進行状況を確認します。'
        )}</p>
        <div class="shop-summary-meta">
          <span>${langText('수동 검수', 'Manual review', '手動確認')}</span>
          <span>${langText('후원 / 패키지', 'Support / packs', '支援 / パック')}</span>
          <span>${langText('MORE 연동', 'MORE linked', 'MORE連動')}</span>
        </div>
      `;
      shopList.appendChild(summary);

      // 안내 섹션
      const notice = document.createElement('div');
      notice.className = 'supc-notice';
      notice.innerHTML = `
        <div class="supc-notice-title">📋 ${ko ? '지원 센터 안내' : 'Support Center Info'}</div>
        <ul class="supc-notice-list">
          <li>${ko ? '이 탭의 모든 결제는 <strong>수동 처리</strong>됩니다.' : 'All purchases in this tab are <strong>manually processed</strong>.'}</li>
          <li>${ko ? '결제 후 더보기 → SUPPORT에서 신청·내역 확인·코드 입력을 진행해 주세요.' : 'After payment, go to MORE → SUPPORT to submit, track, and redeem codes.'}</li>
          <li>${ko ? '처리 시간은 최대 24시간 이내입니다.' : 'Processing takes up to 24 hours.'}</li>
        </ul>
      `;
      shopList.appendChild(notice);

      // COIN 구매 섹션
      const coinSection = document.createElement('div');
      coinSection.className = 'supc-section';
      coinSection.innerHTML = `
        <div class="supc-section-header">
          <span class="supc-section-badge">COIN 구매</span>
          <span class="supc-section-sub">${ko ? '₩ 결제 · 수동 처리' : '₩ Payment · Manual'}</span>
        </div>
        <div class="supc-cards">
          ${COIN_PURCHASE_ITEMS.map(p => `
            <div class="supc-card">
              <div class="supc-card-label">${p.label}</div>
              <div class="supc-card-price">${p.price}</div>
              <div class="supc-card-desc small">${ko ? p.desc : p.descEn}</div>
              <button class="supc-apply-btn" data-supc-apply="${p.id}" data-supc-type="coin">${ko ? '신청하기' : 'Apply'}</button>
            </div>
          `).join('')}
        </div>
      `;
      shopList.appendChild(coinSection);

      // SUPPORT DESK 섹션
      const supportSection = document.createElement('div');
      supportSection.className = 'supc-section';
      supportSection.innerHTML = `
        <div class="supc-section-header">
          <span class="supc-section-badge">SUPPORT DESK</span>
          <span class="supc-section-sub">${ko ? 'HCSiG 개발 후원 · ₩ 결제' : 'Support HCSiG · ₩ Payment'}</span>
        </div>
        <div class="supc-cards">
          ${SUPPORT_PRODUCTS.map(p => `
            <div class="supc-card">
              <div class="supc-card-tag supc-tag-${p.tag.toLowerCase()}">${p.tag}</div>
              <div class="supc-card-label">${p.name}</div>
              <div class="supc-card-price">${p.price}</div>
              <div class="supc-card-reward small">${ko ? p.rewardLabel : p.rewardLabelEn}</div>
              <div class="supc-card-desc small">${ko ? p.desc : p.descEn}</div>
              <button class="supc-apply-btn" data-supc-apply="${p.id}" data-supc-type="support">${ko ? '신청하기' : 'Apply'}</button>
            </div>
          `).join('')}
        </div>
      `;
      shopList.appendChild(supportSection);

      // 크레딧 패키지 섹션
      const creditSection = document.createElement('div');
      creditSection.className = 'supc-section';
      creditSection.innerHTML = `
        <div class="supc-section-header">
          <span class="supc-section-badge">크레딧 패키지</span>
          <span class="supc-section-sub">${ko ? '₩ 결제 · 즉시 지급' : '₩ Payment · Instant Grant'}</span>
        </div>
        <div class="supc-cards">
          ${CREDIT_PACKAGE_ITEMS.map(p => `
            <div class="supc-card">
              <div class="supc-card-label">${ko ? p.label : p.labelEn}</div>
              <div class="supc-card-price">${p.price}</div>
              <div class="supc-card-desc small">${ko ? p.desc : p.descEn}</div>
              <button class="supc-apply-btn" data-supc-apply="${p.id}" data-supc-type="credit">${ko ? '신청하기' : 'Apply'}</button>
            </div>
          `).join('')}
        </div>
      `;
      shopList.appendChild(creditSection);

      // 모든 신청하기 버튼 → MORE > SUPPORT 이동
      shopList.querySelectorAll('[data-supc-apply]').forEach(btn => {
        btn.addEventListener('click', () => {
          const pid = btn.dataset.supcApply;
          const moreModal = document.getElementById('moreModal');
          if (moreModal) moreModal.classList.remove('hidden');
          if (typeof setActiveMoreTab === 'function') setActiveMoreTab('support');
          setTimeout(() => {
            const applyTab = document.getElementById('btnSupportSubApply');
            if (applyTab) applyTab.click();
            const allCards = document.querySelectorAll('#sdProductCards .sd-product-card[data-pid]');
            allCards.forEach(c => {
              const isTarget = c.dataset.pid === pid;
              c.classList.toggle('sd-product-selected', isTarget);
              c.setAttribute('aria-checked', isTarget ? 'true' : 'false');
            });
          }, 80);
        });
      });
    }

    function renderShop() {
      if (!shopList) return;
      shopList.innerHTML = '';

      const categoryLabel = {
        ENERGY: t('energy'),
        UTILITY: t('utility'),
        ECONOMY: t('economy'),
        SYSTEM: t('system')
      };

      const rarityRank = {
        COMMON: 1,
        UNCOMMON: 2,
        RARE: 3,
        EPIC: 4,
        LEGENDARY: 5
      };

      // SHOP TYPE 선택 (credits/currency/support + legacy: coin/oneday)
      state.ui = state.ui || {};
      // 구버전 저장 데이터 마이그레이션: coin/oneday → currency
      if (state.ui.shopType === 'coin' || state.ui.shopType === 'oneday') {
        state.ui.currencySubType = state.ui.shopType; // coin or oneday 보존
        state.ui.shopType = 'currency';
      }
      const shopType = state.ui.shopType || 'credits';
      // 재화 상점 서브탭 (COIN | OneDay)
      const currencySubType = (state.ui && state.ui.currencySubType) || 'coin';

      // 탭 버튼 active 상태 동기화
      document.querySelectorAll('.shop-type-tab').forEach(btn =>
        btn.classList.toggle('active', btn.dataset.shopType === shopType)
      );

      // sort/category 행 표시 여부
      const shopSortRow = document.querySelector('.shop-sort-row');
      if (shopSortRow) shopSortRow.style.display = shopType === 'support' ? 'none' : '';

      // 유료 상점(지원 센터) 탭: 별도 렌더러로 위임
      if (shopType === 'support') {
        renderSupportCenter();
        return;
      }

      const shopTypeMeta = {
        credits: {
          badge: langText('일반 / 교환 상점', 'General / Exchange Shop', '一般 / 交換ショップ'),
          title: langText('크레딧 보급품', 'Credit Supplies', 'クレジット補給品'),
          body: langText(
            '크레딧으로 에너지, 시스템, 경제, 유틸 보조품을 구매합니다. 대부분 즉시 적용되거나 INVENTORY > ITEMS에서 사용됩니다. 일일/주간/월간 로테이션 상점은 추후 추가됩니다.',
            'Spend credits on energy, system, economy, and utility support goods. Daily/weekly/monthly rotation shops coming soon.',
            'クレジットでエネルギー、システム、経済、ユーティリティ補助品を購入します。ローテーションショップは追加予定です。'
          ),
          meta: [
            langText('기본 재화', 'Core currency', '基本通貨'),
            langText('반복 보급', 'Repeat supplies', '反復補給'),
            langText('ITEMS 연동', 'ITEMS linked', 'ITEMS連動')
          ]
        },
        currency: {
          badge: langText('재화 상점', 'Currency Shop', '通貨ショップ'),
          title: currencySubType === 'coin'
            ? langText('시즌·희소 보상 교환 (COIN)', 'Season and rare reward exchange (COIN)', 'シーズン・希少報酬交換 (COIN)')
            : langText('ZERO-DAY 성장 보조품 (OneDay)', 'ZERO-DAY growth support (OneDay)', 'ZERO-DAY成長補助 (OneDay)'),
          body: currencySubType === 'coin'
            ? langText(
                'COIN은 시즌 보상과 특별 보상으로 얻는 희귀 재화입니다. 프레임, 스킨, 보조 패키지처럼 선택적인 희소 보상을 여기서 교환합니다.',
                'COIN is a rare currency earned through seasons and special rewards. Exchange it here for optional rare rewards like frames, skins, and support packs.',
                'COINはシーズン報酬や特別報酬で得る希少通貨です。フレーム、スキン、補助パックなど任意の希少報酬をここで交換します。'
              )
            : langText(
                'OneDay는 ZERO-DAY DISCOVERY 전용 성장 재화입니다. 취약점 조각과 런 보조품처럼 Discovery 준비와 반복 플레이에 연결된 품목을 다룹니다.',
                'OneDay is the dedicated growth currency for ZERO-DAY DISCOVERY. Use it for Discovery prep and repeat-run support items such as vulnerability shards and run boosters.',
                'OneDayはZERO-DAY DISCOVERY専用の成長通貨です。脆弱性シャードやラン補助品など、Discovery準備と反復プレイ向けの品を扱います。'
              ),
          meta: currencySubType === 'coin'
            ? ['COIN', langText('시즌 보상', 'Season rewards', 'シーズン報酬'), langText('희소 교환', 'Rare exchange', '希少交換')]
            : ['OneDay', 'ZERO-DAY', langText('런 보조품', 'Run support', 'ラン補助')]
        },
        // 레거시 키 유지 (구버전 저장 데이터 대응)
        coin: {
          badge: langText('재화 상점', 'Currency Shop', '通貨ショップ'),
          title: langText('시즌·희소 보상 교환', 'Season and rare reward exchange', 'シーズン・希少報酬交換'),
          body: langText('COIN은 시즌 보상과 특별 보상으로 얻는 희귀 재화입니다.', 'COIN is a rare currency earned through seasons and special rewards.', 'COINはシーズン報酬や特別報酬で得る希少通貨です。'),
          meta: ['COIN', langText('시즌 보상', 'Season rewards', 'シーズン報酬')]
        },
        oneday: {
          badge: langText('재화 상점', 'Currency Shop', '通貨ショップ'),
          title: langText('ZERO-DAY 성장 보조품', 'ZERO-DAY growth support', 'ZERO-DAY成長補助'),
          body: langText('OneDay는 ZERO-DAY DISCOVERY 전용 성장 재화입니다.', 'OneDay is the dedicated growth currency for ZERO-DAY DISCOVERY.', 'OneDayはZERO-DAY DISCOVERY専用の成長通貨です。'),
          meta: ['OneDay', 'ZERO-DAY']
        }
      };
      const meta = shopTypeMeta[shopType] || shopTypeMeta.credits;
      const summary = document.createElement('div');
      summary.className = 'shop-summary-card';
      summary.innerHTML = `
        <div class="shop-summary-badge">${meta.badge}</div>
        <h3>${meta.title}</h3>
        <p>${meta.body}</p>
        <div class="shop-summary-meta">${meta.meta.map(part => `<span>${part}</span>`).join('')}</div>
      `;
      shopList.appendChild(summary);

      // 재화 상점 서브탭 (COIN | OneDay) 렌더링
      if (shopType === 'currency') {
        const subTabRow = document.createElement('div');
        subTabRow.className = 'shop-currency-subtab';
        subTabRow.innerHTML = `
          <button class="shop-currency-sub-btn ${currencySubType === 'coin' ? 'active' : ''}" data-currency-sub="coin">🪙 COIN</button>
          <button class="shop-currency-sub-btn ${currencySubType === 'oneday' ? 'active' : ''}" data-currency-sub="oneday">⏰ OneDay</button>
        `;
        subTabRow.querySelectorAll('.shop-currency-sub-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            state.ui = state.ui || {};
            state.ui.currencySubType = btn.dataset.currencySub;
            renderShop();
          });
        });
        shopList.appendChild(subTabRow);
      }

      let currentShopItems = shopItems;
      let currencySymbol = '💰';
      let currencyName = 'Credits';
      if (shopType === 'currency') {
        if (currencySubType === 'oneday') {
          currentShopItems = oneDayShopItems;
          currencySymbol = '⏰';
          currencyName = 'OneDay';
        } else {
          currentShopItems = coinShopItems;
          currencySymbol = '🪙';
          currencyName = 'COIN';
        }
      } else if (shopType === 'coin') {
        // 레거시 호환
        currentShopItems = coinShopItems;
        currencySymbol = '🪙';
        currencyName = 'COIN';
      } else if (shopType === 'oneday') {
        // 레거시 호환
        currentShopItems = oneDayShopItems;
        currencySymbol = '⏰';
        currencyName = 'OneDay';
      }

      const baseOrder = new Map();
      currentShopItems.forEach((it, idx) => baseOrder.set(it.id, idx));

      const mode = (state.ui && state.ui.shopSortMode) ? state.ui.shopSortMode : 'update';
      const categoryMode = (state.ui && state.ui.shopCategory) ? state.ui.shopCategory : 'all';
      if (codeSortSelect) {
        codeSortSelect.value = (state.ui && state.ui.codeSortMode) ? state.ui.codeSortMode : 'recent';
        if (!codeSortSelect.__hcsigSortBound) {
          codeSortSelect.__hcsigSortBound = true;
          codeSortSelect.addEventListener('change', () => {
            state.ui = state.ui || { shopSortMode: 'update', shopCategory: 'all', codeSortMode: 'recent' };
            state.ui.codeSortMode = codeSortSelect.value;
            renderCodeList();
          });
        }
      }

      // 카테고리 탭 업데이트
      if (shopCategoryTabButtons && shopCategoryTabButtons.length) {
        shopCategoryTabButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.category === categoryMode));
      }
      const items = currentShopItems.filter(item => categoryMode === 'all' ? true : item.category === categoryMode);

      if (mode === 'rarity') {
        items.sort((a, b) => {
          const ra = rarityRank[a.rarity] || 0;
          const rb = rarityRank[b.rarity] || 0;
          if (rb !== ra) return rb - ra;
          return (baseOrder.get(a.id) || 0) - (baseOrder.get(b.id) || 0);
        });
      }
      else if (mode === 'new') {
        items.sort((a, b) => (baseOrder.get(b.id) || 0) - (baseOrder.get(a.id) || 0));
      }
      else if (mode === 'price') {
        items.sort((a, b) => {
          const pa = Number(a.cost || 0);
          const pb = Number(b.cost || 0);
          if (pa !== pb) return pa - pb;
          return (baseOrder.get(a.id) || 0) - (baseOrder.get(b.id) || 0);
        });
      }
      else if (mode === 'name') {
        items.sort((a, b) => {
          const na = String(localizeShopName(a) || '');
          const nb = String(localizeShopName(b) || '');
          const c = na.localeCompare(nb, getLang()==='en' ? 'en' : 'ko');
          if (c !== 0) return c;
          return (baseOrder.get(a.id) || 0) - (baseOrder.get(b.id) || 0);
        });
      }

      items.forEach(item => {
        const wrapper = document.createElement('div');
        wrapper.className = 'shop-item';

        const head = document.createElement('div');
        head.className = 'shop-head';

        const nameSpan = document.createElement('span');
        nameSpan.className = 'shop-name';

        const rarityClass = 'shop-rarity-' + item.rarity.toLowerCase();
        const raritySpan = document.createElement('span');
        raritySpan.className = 'shop-rarity-pill ' + rarityClass;
        raritySpan.textContent = localizeRarityLabel(item.rarity);

        const catSpan = document.createElement('span');
        catSpan.className = 'shop-cat-pill';
        catSpan.textContent = categoryLabel[item.category] || item.category || '';

        const extendKind = getShopExtendKind(item, shopType === 'currency' ? (state.ui.currencySubType || 'coin') : shopType);
        const extendMeta = getExtendMeta(extendKind);
        const extendSpan = document.createElement('span');
        extendSpan.className = 'shop-extend-pill';
        extendSpan.textContent = `FLOW · ${getLang() === 'en' ? extendMeta.en : getLang() === 'ja' ? extendMeta.ja : extendMeta.ko}`;

        const leftWrap = document.createElement('span');
        leftWrap.appendChild(raritySpan);
        leftWrap.appendChild(catSpan);
        leftWrap.appendChild(extendSpan);
        const itemName = localizeShopName(item);
        const itemDesc = localizeShopDesc(item);
        leftWrap.appendChild(document.createTextNode(itemName));

        const costSpan = document.createElement('span');
        costSpan.className = 'shop-cost';
        costSpan.textContent = `${currencySymbol} ${item.cost}`;
        // limit badge (daily/once)
        const lim = getShopRemaining(item.id);
        if (lim) {
          const badge = document.createElement('span');
          badge.className = 'shop-limit-badge';
          // v3.0.0: 한 줄 축약 — "0/3 · 05:00 리셋" 또는 "0/1 · 1회"
          badge.textContent = `${lim.used}/${lim.limit} · ${localizeShopLimitLabel(lim)}`;
          badge.style.marginLeft = '8px';
          badge.style.opacity = '0.85';
          costSpan.appendChild(badge);
        }

        nameSpan.appendChild(leftWrap);

        head.appendChild(nameSpan);
        head.appendChild(costSpan);

        const desc = document.createElement('div');
        desc.className = 'shop-desc';
        desc.textContent = itemDesc;

        const btn = document.createElement('button');
        btn.className = 'shop-buy';
        btn.textContent = t('buy');
        btn.title = t('buySpendTitle');
        const lim2 = getShopRemaining(item.id);
        if (lim2 && lim2.remaining <= 0) {
          btn.disabled = true;
          btn.textContent = t('buyUnavailable');
          btn.title = lim2.type === 'daily' ? t('buyDailyLimit') : t('buyOnceLimit');
        } else if (typeof item.canBuy === 'function') {
          const preCheck = item.canBuy();
          if (!preCheck.ok) {
            btn.disabled = true;
            btn.textContent = t('buyUnavailable');
            btn.title = preCheck.reason;
          }
        }
        btn.addEventListener('click', () => {
          // purchase cap check (daily/once)
          const cap = canBuyShopItem(item.id);
          if (!cap.ok) {
            log(t('shopLog', { msg: cap.reason }), 'shop');
            showToast(cap.reason, 'shop');
            return;
          }

          // 아이템 자체 구매 가능 여부 검사 (e.g. 에너지 풀)
          if (typeof item.canBuy === 'function') {
            const itemCheck = item.canBuy();
            if (!itemCheck.ok) {
              log(t('shopLog', { msg: itemCheck.reason }), 'shop');
              showToast(itemCheck.reason, 'shop');
              return;
            }
          }

          // 통화별 확인
          // currency 탭: 서브탭(currencySubType)으로 실제 통화 결정
          const effectiveCurrencyType = (shopType === 'currency') ? (state.ui.currencySubType || 'coin') : shopType;
          let hasEnoughCurrency = false;
          if (effectiveCurrencyType === 'credits') {
            hasEnoughCurrency = state.credits >= item.cost;
            if (!hasEnoughCurrency) {
              log(t('shopLog', { msg: `${t('notEnoughCredits')} (${getLang()==='en' ? 'Need' : '필요'}: ${item.cost})` }), 'shop');
              showToast(t('notEnoughCredits'), 'shop');
              return;
            }
          } else if (effectiveCurrencyType === 'coin') {
            const coinBalance = state.items.coin || 0;
            hasEnoughCurrency = coinBalance >= item.cost;
            if (!hasEnoughCurrency) {
              const notEnoughMsg = getLang() === 'en' ? `Not enough COIN (Need: ${item.cost})` : `COIN이 부족합니다 (필요: ${item.cost})`;
              log(t('shopLog', { msg: notEnoughMsg }), 'shop');
              showToast(notEnoughMsg, 'shop');
              return;
            }
          } else if (effectiveCurrencyType === 'oneday') {
            const oneDayBalance = state.items.oneDay || 0;
            hasEnoughCurrency = oneDayBalance >= item.cost;
            if (!hasEnoughCurrency) {
              const notEnoughMsg = getLang() === 'en' ? `Not enough OneDay (Need: ${item.cost})` : `OneDay가 부족합니다 (필요: ${item.cost})`;
              log(t('shopLog', { msg: notEnoughMsg }), 'shop');
              showToast(notEnoughMsg, 'shop');
              return;
            }
          }

          // 고가/고희귀 구매 확인
          const rr = rarityRank[item.rarity] || 0;
          if (rr >= 4) {
            const ok = window.confirm(`${itemName} (${item.rarity})\n${currencySymbol} ${item.cost}`);
            if (!ok) return;
          }

          // 통화 차감 (effectiveCurrencyType 기준)
          if (effectiveCurrencyType === 'credits') {
            state.credits -= item.cost;
          } else if (effectiveCurrencyType === 'coin') {
            state.items.coin = (state.items.coin || 0) - item.cost;
            state.stats.coinSpentTotal = (state.stats.coinSpentTotal || 0) + item.cost;
          } else if (effectiveCurrencyType === 'oneday') {
            state.items.oneDay = (state.items.oneDay || 0) - item.cost;
            state.stats.oneDaySpentTotal = (state.stats.oneDaySpentTotal || 0) + item.cost;
          }

          item.buy?.();
          ensureModifierDefaults();
          // mark cap usage
          markShopPurchase(item.id);

          state.stats.shopPurchaseCount++;
          state.missionProgress.daily.shopPurchases = (state.missionProgress.daily.shopPurchases || 0) + 1;
          state.missionProgress.weekly.shopPurchases = (state.missionProgress.weekly.shopPurchases || 0) + 1;
          state.missionProgress.month.shopPurchases = (state.missionProgress.month.shopPurchases || 0) + 1;
          checkMissions('daily');
          checkMissions('weekly');
          checkMissions('month');
          checkMissions('general');
          log(t('shopLog', { msg: t('shopBought', { name: itemName, cost: item.cost }) }), 'shop');
          if (item.id === 'energy_pack') {
            showToast(t('energyPackToast', { v: state.items.energyPack }), 'shop');
          } else {
            showToast(`${itemName} ${t('buyDone')}`, 'shop');
          }
          if (state.stats.shopPurchaseCount >= 1) unlockAchievement('shop_first_buy');
          updateStatsUI();
          renderShop();
          scheduleSilentSave();
        });

        const foot = document.createElement('div');
        foot.className = 'shop-foot';
        foot.appendChild(btn);

        wrapper.appendChild(head);
        wrapper.appendChild(desc);
        wrapper.appendChild(foot);

        shopList.appendChild(wrapper);
      });
    }
    function rollRarity(effect = {}) {
      const rareBoost = Math.max(0, Number(effect.scanRareBoost || 0));
      const weights = {
        COMMON: rarityWeights.COMMON,
        UNCOMMON: rarityWeights.UNCOMMON,
        RARE: rarityWeights.RARE * (1 + rareBoost),
        EPIC: rarityWeights.EPIC * (1 + rareBoost * 1.4),
        LEGENDARY: rarityWeights.LEGENDARY * (1 + rareBoost * 1.8)
      };
      const total =
        weights.COMMON +
        weights.UNCOMMON +
        weights.RARE +
        weights.EPIC +
        weights.LEGENDARY;
      let r = Math.random() * total;
      for (const rar of rarityOrder) {
        const w = weights[rar];
        if (r < w) return rar;
        r -= w;
      }
      return 'COMMON';
    }

    function getScanDurationForRarity(rarity, effect = {}) {
      let base;
      switch (rarity) {
        case 'COMMON': base = 500; break;
        case 'UNCOMMON': base = 650; break;
        case 'RARE': base = 800; break;
        case 'EPIC': base = 1000; break;
        case 'LEGENDARY': base = 1200; break;
        default: base = 600;
      }
      const speedBonus = Math.max(0, Math.min(0.45, Number(effect.scanSpeed || 0)));
      return Math.max(260, Math.round(base * (1 - speedBonus)));
    }

    function randomScanLine(length) {
      const chars = '01{}[]<>#/\\\\=+-_ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let s = '';
      for (let i = 0; i < length; i++) {
        s += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return s;
    }

    function runScanAnimation(totalDuration, onDone) {
      if (scanRunning) return;
      if (!scanOverlay || !scanProgressInner || !scanText) {
        onDone && onDone();
        return;
      }
      scanRunning = true;
      scanOverlay.classList.add('active');
      scanText.textContent = '';

      let progress = 0;
      const step = 60;
      const steps = Math.max(3, Math.round(totalDuration / step));
      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        progress = (currentStep / steps) * 100;
        scanProgressInner.style.width = progress + '%';

        const lineCount = 12;
        let text = '';
        for (let i = 0; i < lineCount; i++) {
          text += randomScanLine(40) + '\n';
        }
        scanText.textContent = text;

        if (currentStep >= steps) {
          clearInterval(interval);
          setTimeout(() => {
            scanOverlay.classList.remove('active');
            scanProgressInner.style.width = '0%';
            scanText.textContent = '';
            scanRunning = false;
            onDone && onDone();
          }, 150);
        }
      }, step);
    }

    function scanForCode() {
      ensureMissionResets();

      if (scanRunning) return;

      const energyCost = 1;
      if (!consumeEnergy(energyCost)) {
        log(t('noEnergyScan'), 'scan');
        return;
      }
      state.stats.scanCount++;
      state.missionProgress.daily.scans++;
      state.missionProgress.daily.actions++;
      state.missionProgress.weekly.scans++;
      state.missionProgress.weekly.actions = (state.missionProgress.weekly.actions || 0) + 1;
      state.missionProgress.month.scans++;
      state.missionProgress.month.actions = (state.missionProgress.month.actions || 0) + 1;
      checkMissions('daily');
      checkMissions('weekly');
      checkMissions('month');
      checkMissions('general');

      const activeCode = getActiveCodeInstance();
      const activeEffect = getCodeEffect(activeCode);
      const rarity = rollRarity(activeEffect);
      const duration = getScanDurationForRarity(rarity, activeEffect);

      playSfx('scanStart');
      setNodeDisabled(btnScan, true);
      setNodeDisabled(btnHack, true);
      setNodeDisabled(btnUpgradeCpu, true);
      setNodeDisabled(btnUpgradeGpu, true);

	      runScanAnimation(duration, () => {
	        playSfx('scanComplete');
	        const templates = Object.values(codeDefs).filter(d => d.rarity === rarity);
	        let chosen = null;
	        let weeklyShardGain = 0;

        if (templates.length > 0) {
          const candidatesNew = templates.filter(t => !getOwnedCode(t.id));
          if (candidatesNew.length > 0) {
            chosen = candidatesNew[Math.floor(Math.random() * candidatesNew.length)];
          } else {
            chosen = templates[Math.floor(Math.random() * templates.length)];
          }
        }
        if (!chosen) chosen = codeDefs.basic;

        const existing = getOwnedCode(chosen.id);
        if (!existing) {
          addCodeInstanceFromTemplate(chosen.id);
          log(t('scanFound', { name: chosen.name, rarity: chosen.rarity }), 'scan');
          const def = codeDefs[chosen.id];
          if (def && (def.rarity === 'EPIC' || def.rarity === 'LEGENDARY')) {
            emitActivity('epic_code_found', {
              codeId: chosen.id,
              refId: chosen.id,
              rarity: def.rarity,
              value: def.rarity === 'LEGENDARY' ? 2 : 1
            });
            unlockAchievement('get_epic_code');
          }
	        } else {
	          const shardGain = getShardGainByRarity(rarity) + Math.max(0, Number(activeEffect.scanShardBonus || 0));
	          weeklyShardGain = shardGain;
	          existing.shards = (existing.shards || 0) + shardGain;
          state.stats.codeShardsTotal = (state.stats.codeShardsTotal || 0) + shardGain;
          log(t('scanDuplicate', { name: chosen.name, rarity, gain: shardGain, have: existing.shards }), 'scan');
          showToast(`${chosen.name} 조각 +${shardGain}`, 'scan');
          const def = codeDefs[existing.id];
          if (def && (def.rarity === 'EPIC' || def.rarity === 'LEGENDARY')) {
            unlockAchievement('get_epic_code');
          }
        }

	        let scriptExpBonus = 0;
	        if (modifiers.overclockScanCharges > 0) {
	          scriptExpBonus += 3;
	          modifiers.overclockScanCharges -= 1;
	        }
	        if (modifiers.scanExpScriptCharges > 0) {
	          scriptExpBonus += 1;
	          modifiers.scanExpScriptCharges -= 1;
	        }
	        const expGain = 2 + modifiers.scanExtraExp + Math.max(0, Number(activeEffect.scanExpBonus || 0)) + scriptExpBonus;
	        addExp(expGain);
	        trackWeeklyChallenge('scan', { rarity, codeId: chosen.id, shards: weeklyShardGain });
	        log(t('scanDone', { exp: expGain }), 'scan');
        onTutorialAction('scan');

        checkAchievements('scan');
        checkMissions('general');

        setNodeDisabled(btnScan, false);
        setNodeDisabled(btnHack, false);
        setNodeDisabled(btnUpgradeCpu, false);
        setNodeDisabled(btnUpgradeGpu, false);

        // Vulnerability drops from scan
        {
          const scanRoll = Math.random();
          // Pity counter: increments every scan, resets when vuln granted
          state._vulnScanCount = (state._vulnScanCount || 0) + 1;
          const pitied = state._vulnScanCount >= 100;

          if ((state._opsForcedOpScan || scanRoll < 0.001) && ownedCodes.length > 0) {
            // 0.1% chance OPERATION code from scan (or forced by OPS shop item)
            if (state._opsForcedOpScan) delete state._opsForcedOpScan;
            state._vulnScanCount = 0; // operation scan resets pity
            const opCodes = ['operation_meridian', 'operation_blackout'];
            const opId = opCodes[Math.floor(Math.random() * opCodes.length)];
            const opDef = codeDefs[opId];
            if (opDef && !ownedCodes.find(c => c.id === opId)) {
              const newCode = { id: opDef.id, name: opDef.name, rarity: opDef.rarity, basePower: opDef.basePower, power: opDef.basePower, level: 1, usage: 0, shards: 0, syncLevel: 0 };
              ownedCodes.push(newCode);
              if (!state.activeCodeId) state.activeCodeId = opDef.id;
              log(getLang()==='en' ? `[OPERATION] ${opDef.name} acquired via scan!` : `[OPERATION] ${opDef.name} 스캔 획득!`, 'hack');
              showToast(`OPERATION: ${opDef.name}`, 'achievement');
            }
          } else if (scanRoll < 0.011 || pitied) {
            // 1% chance OR pity guarantee at 100 scans: completed vulnerability
            state._vulnScanCount = 0;
            state.items.zeroDayVulnerability = (state.items.zeroDayVulnerability || 0) + 1;
            if (pitied && scanRoll >= 0.011) {
              log(getLang()==='en' ? '[ZERO-DAY] Vulnerability acquired (pity guarantee, 100 scans).' : '[ZERO-DAY] 취약점 획득 (100회 보장).', 'scan');
              showToast(getLang()==='en' ? 'Vulnerability +1 (Pity)' : '취약점 +1 (100회 보장)', 'achievement');
            } else {
              log(getLang()==='en' ? '[ZERO-DAY] Vulnerability acquired from scan.' : '[ZERO-DAY] 스캔에서 취약점 획득.', 'scan');
              showToast(getLang()==='en' ? 'Vulnerability +1' : '취약점 +1', 'achievement');
            }
          } else if (scanRoll < 0.211) {
            // 20% chance: vulnerability shard
            state.items.zeroDayVulnerabilityShard = (state.items.zeroDayVulnerabilityShard || 0) + 1;
            if (state.items.zeroDayVulnerabilityShard % 10 === 0) {
              showToast(getLang()==='en' ? `Vuln. Shards: ${state.items.zeroDayVulnerabilityShard}/50` : `취약점 조각: ${state.items.zeroDayVulnerabilityShard}/50`, 'system');
            }
          }
        }

        refreshProgressUiAndSave();
      });
    }

    function getSelectedServer() {
      const id = serverSelect.value;
      return servers.find(s => s.id === id) || servers[0];
    }

    function doHack() {
      ensureMissionResets();

      const code = getActiveCodeInstance();
      if (!code) {
        log(t('noOwnedCodes'), 'hack');
        return;
      }
      const def = codeDefs[code.id];
      const server = getSelectedServer();
      if (!server) {
        log(getLang()==='en' ? 'Failed to select a target server.' : '타겟 서버 선택에 실패했습니다.', 'hack');
        return;
      }
      if (state.level < server.minLevel) {
        log(t('serverLevelNeed', { lv: server.minLevel }), 'hack');
        return;
      }
      state.hackMode = normalizeHackMode(state.hackMode);
      if (state.hackMode === 'extreme' && state.level < 5) {
        state.hackMode = 'risk';
        renderHackModeUI();
        log(getLang()==='en' ? 'EXTREME unlocks at Lv.5.' : 'EXTREME은 Lv.5 이상에서 해금됩니다.', 'hack');
        return;
      }
      const modeInfo = getHackModeInfo();

      const energyCost = 2;
      if (!consumeEnergy(energyCost)) {
        log(t('noEnergyHack'), 'hack');
        return;
      }

      state.missionProgress.daily.actions++;
      state.missionProgress.weekly.actions = (state.missionProgress.weekly.actions || 0) + 1;
      state.missionProgress.month.actions = (state.missionProgress.month.actions || 0) + 1;
      onTutorialAction('hack');

      let serverSec = server.security;
      let creditMultiplier = modifiers.creditMultiplierSession * modifiers.creditMultiplierPermanent;
      let successChanceBonus = getSyncSuccessBonus(code.syncLevel || 0);
      let expMultiplier = modeInfo.expMultiplier;
      const effect = getCodeEffect(def);
      successChanceBonus += Number(modifiers.hackStabilityBonus || 0);

      if (def) {
        if (def.id === 'port_scanner') serverSec = Math.floor(serverSec * 0.9);
        if (def.id === 'shield_bypass') serverSec = Math.floor(serverSec * 0.85);
        if (def.id === 'fortress_breaker') serverSec = Math.floor(serverSec * 0.75);
        if (effect.serverSecurityMult) serverSec = Math.floor(serverSec * Number(effect.serverSecurityMult));

        if (def.id === 'pulse_ping') successChanceBonus += 0.03;
        if (def.id === 'stack_tracer') successChanceBonus += 0.05;
        if (def.id === 'data_phantom') successChanceBonus += 0.1;
        if (def.id === 'quantum_splice') successChanceBonus += 0.12;
        if (def.id === 'singularity_root') successChanceBonus += 0.1;
        successChanceBonus += Number(effect.hackChance || 0);

        if (def.id === 'credit_siphon') creditMultiplier *= 1.15;
        if (def.id === 'null_rewriter') creditMultiplier *= 1.25;
        if (def.id === 'overflow_inject') creditMultiplier *= 1.3;
        if (def.id === 'quantum_splice') creditMultiplier *= 1.2;
        if (def.id === 'singularity_root') creditMultiplier *= 1.4;
        if (effect.creditBonus) creditMultiplier *= (1 + Number(effect.creditBonus));
        if (effect.expBonus) expMultiplier *= (1 + Number(effect.expBonus));
      }

      if (modeInfo.id !== 'normal') {
        let modePenalty = modeInfo.chancePenalty;
        if (def && def.id === 'trace_scrambler') modePenalty -= modeInfo.id === 'extreme' ? 0.025 : 0.05;
        if (modeInfo.id === 'risk') {
          modePenalty -= Number(effect.riskPenaltyReduction || 0);
          successChanceBonus += modifiers.riskSuccessBonus;
        } else {
          modePenalty -= Number(effect.extremePenaltyReduction || 0);
          successChanceBonus += modifiers.riskSuccessBonus * 0.5;
          if (effect.extremeCreditBonus) creditMultiplier *= (1 + Number(effect.extremeCreditBonus));
          if (effect.extremeExpBonus) expMultiplier *= (1 + Number(effect.extremeExpBonus));
        }
        successChanceBonus -= Math.max(0, modePenalty);
        creditMultiplier *= modeInfo.creditMultiplier;
      }

      const effectivePower = code.power * (1 + (0.1 + Number(effect.cpuPowerBonus || 0)) * (state.cpuTier - 1));
      let successChance = effectivePower / (effectivePower + serverSec);
      successChance += successChanceBonus;
      successChance = Math.max(0.05, Math.min(0.95, successChance));

      ensureCodeSupportState(code);
      const success = Math.random() < successChance;
      code.usage = (code.usage || 0) + 1;

      if (success) {
        playSfx('success');
        const rawReward =
          server.minReward + Math.random() * (server.maxReward - server.minReward);
        const economyNerf = modeInfo.id === 'normal' ? 0.65 : 0.8;
        let rewardCredits = Math.max(1, Math.round(rawReward * creditMultiplier * economyNerf * getGpuCreditMultiplier()));
        let gainedExp = 6;
        if (def && def.id === 'cache_sniffer') rewardCredits += 5;
        if (def && def.id === 'rapid_exploit') gainedExp += 3;
        if (modifiers.creditRelayCharges > 0) {
          rewardCredits = Math.max(1, Math.round(rewardCredits * 1.2));
          modifiers.creditRelayCharges -= 1;
        }
        gainedExp = Math.max(1, Math.round(gainedExp * expMultiplier * getGpuExpMultiplier()));

        state.credits += rewardCredits;
        state.stats.creditsEarnedTotal += rewardCredits;
        addExp(gainedExp);

        log(
          t('hackSuccessLog', { server: localizeServerName(server), chance: Math.round(successChance * 100), credits: rewardCredits, exp: gainedExp }),
          'hack'
        );

        state.stats.hackSuccessCount++;
        state.missionProgress.daily.hackSuccess++;
        state.missionProgress.weekly.hackSuccess++;
        state.missionProgress.month.hackSuccess++;
        if (modeInfo.id === 'risk') {
          state.stats.riskHackSuccessCount++;
          state.missionProgress.daily.riskHackSuccess = (state.missionProgress.daily.riskHackSuccess || 0) + 1;
          state.missionProgress.weekly.riskHackSuccess = (state.missionProgress.weekly.riskHackSuccess || 0) + 1;
          state.missionProgress.month.riskHackSuccess = (state.missionProgress.month.riskHackSuccess || 0) + 1;
        } else if (modeInfo.id === 'extreme') {
          state.stats.extremeHackSuccessCount = (state.stats.extremeHackSuccessCount || 0) + 1;
          state.missionProgress.daily.extremeHackSuccess = (state.missionProgress.daily.extremeHackSuccess || 0) + 1;
          state.missionProgress.weekly.extremeHackSuccess = (state.missionProgress.weekly.extremeHackSuccess || 0) + 1;
          state.missionProgress.month.extremeHackSuccess = (state.missionProgress.month.extremeHackSuccess || 0) + 1;
        }
	        emitActivity(modeInfo.id === 'extreme' ? 'extreme_success' : 'hack_success', {
	          mode: modeInfo.id,
	          serverId: server.id,
	          refId: server.id,
	          codeId: code.id,
	          value: rewardCredits
	        });
	        trackWeeklyChallenge('hack_success', {
	          mode: modeInfo.id,
	          serverId: server.id,
	          codeId: code.id,
	          credits: rewardCredits
	        });

	        checkMissions('daily');
        checkMissions('weekly');
        checkMissions('month');
        checkMissions('general');

        if (state.stats.hackSuccessCount === 1) {
          unlockAchievement('first_hack_success');
        }
        if (state.stats.hackSuccessCount >= 30) {
          unlockAchievement('hack_30_success');
        }
        if (state.stats.riskHackSuccessCount >= 10) {
          unlockAchievement('risk_10_success');
        }

        if (def && def.id === 'ghost_script') {
          if (Math.random() < 0.25) {
            state.exp += 10;
            log(getLang()==='en' ? 'Ghost_Script effect: EXP +10 triggered on success.' : 'Ghost_Script 효과: 해킹 성공으로 EXP +10이 발동했습니다.', 'hack');
            checkLevelUp();
            renderAll();
          }
        }
      } else {
        playSfx('fail');
        log(
          t('hackFailLog', { server: localizeServerName(server), chance: Math.round(successChance * 100) }),
          'hack'
        );
        let protectionConsumed = false;
        if ((code.protectionCharges || 0) > 0) {
          code.protectionCharges -= 1;
          protectionConsumed = true;
          state.energy = Math.min(state.energyMax, state.energy + 1);
          if (state.energy >= state.energyMax) state.energyTimerMs = 0;
          log(langText(`[ITEM] 코드 보호 발동: ${code.name} · 에너지 1 회복`, `[ITEM] Code protection triggered: ${code.name} · Energy +1`, `[ITEM] コード保護発動: ${code.name} · エネルギー +1`), 'hack');
        }

        if (def && def.id === 'overflow_inject') {
          state.energy = Math.max(0, state.energy - 1);
          state.stats.energySpentTotal += 1;
          trackWeeklyChallenge('energy_spent', { amount: 1 });
          if (state.energy < state.energyMax && state.energyTimerMs <= 0) {
            state.energyTimerMs = getEnergyIntervalMs();
          }
          log(getLang()==='en' ? 'Overflow_Inject penalty: consumed 1 additional energy.' : 'Overflow_Inject 페널티: 에너지가 추가로 1 소모되었습니다.', 'hack');
        }

        if (modeInfo.failEnergyPenalty > 0) {
          if (modifiers.failureBufferCharges > 0) {
            modifiers.failureBufferCharges -= 1;
            log(getLang() === 'en' ? 'Failure Buffer Module prevented the extra energy penalty.' : '실패 완충 모듈이 추가 에너지 페널티를 방지했습니다.', 'hack');
          } else if (protectionConsumed) {
            log(langText('코드 보호권이 추가 에너지 페널티를 막아냈습니다.', 'Code Protection blocked the extra energy penalty.', 'コード保護券が追加エネルギーペナルティを防ぎました。'), 'hack');
          } else {
            state.energy = Math.max(0, state.energy - modeInfo.failEnergyPenalty);
            state.stats.energySpentTotal += modeInfo.failEnergyPenalty;
            trackWeeklyChallenge('energy_spent', { amount: modeInfo.failEnergyPenalty });
            if (state.energy < state.energyMax && state.energyTimerMs <= 0) {
              state.energyTimerMs = getEnergyIntervalMs();
            }
            log(t(modeInfo.id === 'extreme' ? 'extremePenaltyLog' : 'riskPenaltyLog'), 'hack');
            if (state.energy === 0) unlockAchievement('energy_zero');
          }
        }

        if (def && def.id === 'auto_patch' && Math.random() < 0.2) {
          state.exp += 1;
          log(getLang()==='en' ? 'AutoPatch() effect: EXP +1 from failure compensation.' : 'AutoPatch() 효과: 해킹 실패 보정으로 경험치 +1.', 'hack');
        }

        if (def && def.id === 'fallback_node' && Math.random() < 0.12) {
          state.energy = Math.min(state.energyMax, state.energy + 1);
          if (state.energy >= state.energyMax) state.energyTimerMs = 0;
          log(getLang()==='en' ? 'Fallback_Node effect: instantly recovered 1 energy.' : 'Fallback_Node 효과: 에너지 1을 즉시 회복했습니다.', 'hack');
        }

        updateStatsUI();
      }

      checkAchievements('hack');
      checkMissions('general');
      refreshProgressUiAndSave();
    }

    function upgradeCpu() {
      const rawCost = 500 * state.cpuTier;
      const cost = Math.round(rawCost * modifiers.cpuUpgradeDiscount);
      if (state.credits < cost) {
        log(getLang()==='en' ? `CPU upgrade failed: not enough credits. (Need: ${cost})` : `CPU 업그레이드 실패: 크레딧이 부족합니다. (필요: ${cost})`, 'system');
        return;
      }
      state.credits -= cost;
      state.cpuTier += 1;
      playSfx('upgrade');
	      log(`CPU 업그레이드 완료! 현재 티어: ${state.cpuTier} (소모 크레딧 ${cost})`, 'system');
	      emitActivity('cpu_tier_up', { value: state.cpuTier, refId: 'cpu' });
	      trackWeeklyChallenge('cpu_upgrade', { tier: state.cpuTier });
      if (state.cpuTier >= 15) {
        unlockAchievement('cpu_tier_5');
      }
      updateStatsUI();
      renderStagePanel();
      checkMissions('general');
    }

    function upgradeGpu() {
      const tier = Math.max(1, Number(state.gpuTier || 1));
      ensureModifierDefaults();
      const cost = Math.round(650 * tier * modifiers.gpuUpgradeDiscount);
      if (state.credits < cost) {
        log(t('gpuUpgradeFail', { cost }), 'system');
        showToast(t('gpuUpgradeFail', { cost }), 'warn');
        return;
      }
      state.credits -= cost;
      state.gpuTier = tier + 1;
      state.stats.gpuUpgradeCount = (state.stats.gpuUpgradeCount || 0) + 1;
      playSfx('upgrade');
	      log(t('gpuUpgradeLog', { tier: state.gpuTier, cost }), 'system');
	      showToast(t('gpuUpgradeLog', { tier: state.gpuTier, cost }), 'system');
	      emitActivity('gpu_tier_up', { value: state.gpuTier, refId: 'gpu' });
	      trackWeeklyChallenge('gpu_upgrade', { tier: state.gpuTier });
      updateStatsUI();
      renderStagePanel();
      checkMissions('general');
      checkAchievements('gpu');
      saveGame(true);
    }

    function ensureMissionResets() {
      const dayKey = getDayKey();
      const weekKey = getWeekKey();
      const monthKey = getMonthKey();

      if (state.missionProgress.daily.lastResetDay !== dayKey) {
        state.missionProgress.daily.lastResetDay = dayKey;
        state.missionProgress.daily.scans = 0;
        state.missionProgress.daily.actions = 0;
        state.missionProgress.daily.hackSuccess = 0;
        state.missionProgress.daily.riskHackSuccess = 0;
        state.missionProgress.daily.extremeHackSuccess = 0;
        state.missionProgress.daily.shopPurchases = 0;
        state.missionProgress.daily.energySpent = 0;
        state.missionProgress.daily.energy0Reached = false;
        // Phase 1 신규 추적 필드
        state.missionProgress.daily.loginDaily = true; // 오늘 접속했으므로 즉시 true
        state.missionProgress.daily.codeLevelUp = 0;
        state.missionProgress.daily.gearEnhance = 0;
        state.missionProgress.daily.towerAttempts = 0;
        state.missionProgress.daily.completed = {};
        // 주간 streak: 새로운 날 접속 시 +1 (주간 리셋 후라면 이미 1로 초기화됨)
        if (state.missionProgress.weekly) {
          state.missionProgress.weekly.loginStreak = (state.missionProgress.weekly.loginStreak || 0) + 1;
        }
      }
      // 오늘 첫 접속 시 loginDaily 플래그 설정 (리셋 없을 때도 체크)
      if (state.missionProgress.daily.loginDaily === undefined) {
        state.missionProgress.daily.loginDaily = true;
      }
      // loginDaily가 true인데 미션이 아직 완료 처리 안 됐으면 즉시 체크 (#20 fix)
      if (state.missionProgress.daily.loginDaily &&
          !(state.missionProgress.daily.completed && state.missionProgress.daily.completed['daily_login'])) {
        try { checkMissions('daily'); } catch(e) {}
      }
      if (state.missionProgress.daily.energy0Reached === undefined) {
        state.missionProgress.daily.energy0Reached = false;
      }

      if (state.missionProgress.weekly.lastResetWeek !== weekKey) {
        state.missionProgress.weekly.lastResetWeek = weekKey;
        state.missionProgress.weekly.scans = 0;
        state.missionProgress.weekly.actions = 0;
        state.missionProgress.weekly.hackSuccess = 0;
        state.missionProgress.weekly.riskHackSuccess = 0;
        state.missionProgress.weekly.extremeHackSuccess = 0;
        state.missionProgress.weekly.shopPurchases = 0;
        state.missionProgress.weekly.energySpent = 0;
        state.missionProgress.weekly.energy0Reached = false;
        state.missionProgress.weekly.levelReached = state.level;
        // Phase 1 신규 추적 필드
        state.missionProgress.weekly.loginStreak = 1; // 이번 주에 접속했으므로 1로 시작
        state.missionProgress.weekly.gearEnhance = 0;
        state.missionProgress.weekly.towerAttempts = 0;
        state.missionProgress.weekly.dailyMissionsCompleted = 0;
        state.missionProgress.weekly.completed = {};
      }
      // 기존 세이브에 energy0Reached 누락 시 기본값 보장
      if (state.missionProgress.weekly.energy0Reached === undefined) {
        state.missionProgress.weekly.energy0Reached = false;
      }

      if (state.missionProgress.month.lastResetMonth !== monthKey) {
        state.missionProgress.month.lastResetMonth = monthKey;
        state.missionProgress.month.scans = 0;
        state.missionProgress.month.actions = 0;
        state.missionProgress.month.hackSuccess = 0;
        state.missionProgress.month.riskHackSuccess = 0;
        state.missionProgress.month.extremeHackSuccess = 0;
        state.missionProgress.month.shopPurchases = 0;
        state.missionProgress.month.energySpent = 0;
        state.missionProgress.month.energy0Reached = false;
        state.missionProgress.month.levelReached = state.level;
        state.missionProgress.month.completed = {};
      }
      if (state.missionProgress.month.energy0Reached === undefined) {
        state.missionProgress.month.energy0Reached = false;
      }

      if (!state.missionProgress.general) {
        state.missionProgress.general = { completed: {} };
      }
      if (!state.missionProgress.general.completed) {
        state.missionProgress.general.completed = {};
      }
      ensureWeeklyChallengeDefaults();
      // AUTO-RUN 일일 사용 횟수 리셋
      resetAutoRunDaily();
    }

    function getMissionProgressValue(scope, type) {
      if (scope === 'daily' || scope === 'weekly' || scope === 'month') {
        const prog = state.missionProgress[scope];
        if (!prog) return 0;
        if (type === 'scans') return prog.scans;
        if (type === 'actions') return prog.actions || 0;
        if (type === 'hackSuccess') return prog.hackSuccess;
        if (type === 'energySpent') return prog.energySpent;
        if (type === 'level') return prog.levelReached;
        if (type === 'riskHackSuccess') return prog.riskHackSuccess || 0;
        if (type === 'extremeHackSuccess') return prog.extremeHackSuccess || 0;
        if (type === 'shopPurchases') return prog.shopPurchases || 0;
        if (type === 'creditsEarnedTotal') return state.stats.creditsEarnedTotal || 0;
        if (type === 'energy0Flag') return prog.energy0Reached ? 1 : 0;
        if (type === 'zeroDayRunCount') return prog.zeroDayRuns || 0;
        // Phase 1 신규 타입
        if (type === 'loginDaily') return prog.loginDaily ? 1 : 0;
        if (type === 'codeLevelUp') return prog.codeLevelUp || 0;
        if (type === 'gearEnhance') return prog.gearEnhance || 0;
        if (type === 'towerAttempts') return prog.towerAttempts || 0;
        if (type === 'loginStreak') return prog.loginStreak || 0;
        if (type === 'dailyMissionsCompleted') return prog.dailyMissionsCompleted || 0;
        return 0;
      }

      if (scope === 'general') {
        if (type === 'scans') return state.stats.scanCount;
        if (type === 'hackSuccess') return state.stats.hackSuccessCount;
        if (type === 'energySpentTotal') return state.stats.energySpentTotal;
        if (type === 'level') return state.level;
        if (type === 'cpuTier') return state.cpuTier;
        if (type === 'energyMax') return state.energyMax;
        if (type === 'shopPurchases') return state.stats.shopPurchaseCount;
        if (type === 'creditsEarnedTotal') return state.stats.creditsEarnedTotal;
        if (type === 'achievements') return Object.keys(state.achievements).length;
        if (type === 'missionsCompleted') return state.stats.missionsCompletedTotal;
        if (type === 'riskHackSuccess') return state.stats.riskHackSuccessCount;
        if (type === 'extremeHackSuccess') return state.stats.extremeHackSuccessCount || 0;
        if (type === 'gpuTier') return state.gpuTier || 1;
        if (type === 'hybridTier') return Math.min(state.cpuTier || 1, state.gpuTier || 1);
        if (type === 'stageHighest') return (state.stage && state.stage.highestCleared) || 0;
        if (type === 'stageClearCount') return state.stats.stageClearCount || 0;
        if (type === 'energy0Flag') return state.stats.energySpentTotal > 0 && state.energy === 0 ? 1 : 0;
      }
      return 0;
    }

    function checkMissions(scope) {
      const defs = missionDefs[scope];
      if (!defs) return;

      const prog = state.missionProgress[scope];
      if (!prog.completed) prog.completed = {};

      let anyCompleted = false;

      defs.forEach(def => {
        if (def.stub) return; // 미구현 미션 건너뜀 (#16 fix)
        if (prog.completed[def.id]) return;

        // energy0Flag는 getMissionProgressValue에서 통합 처리 (prog.energy0Reached 플래그 사용)

        const value = getMissionProgressValue(scope, def.type);
        if (value >= def.target) {
          prog.completed[def.id] = true;
          anyCompleted = true;

          const rewardCredits = def.rewardCredits || 0;
          if (rewardCredits > 0) {
            state.credits += rewardCredits;
            state.stats.creditsEarnedTotal += rewardCredits;
          }

          // 보조 보상: 에너지 팩
          if (def.rewardEnergyPack) {
            state.items = state.items || { energyPack: 0 };
            state.items.energyPack = (state.items.energyPack || 0) + def.rewardEnergyPack;
          }

          // 보조 보상: COIN
          if (def.rewardCoin) {
            state.items.coin = (state.items.coin || 0) + def.rewardCoin;
            state.stats.coinEarnedTotal = (state.stats.coinEarnedTotal || 0) + def.rewardCoin;
          }

          state.stats.missionsCompletedTotal++;

          const rewardTextParts = [];
          if (rewardCredits > 0) rewardTextParts.push(`크레딧 +${rewardCredits}`);
          if (def.rewardEnergyPack) rewardTextParts.push(`에너지 팩 +${def.rewardEnergyPack}`);
          if (def.rewardCoin) rewardTextParts.push(`COIN +${def.rewardCoin}`);
          const rewardText = rewardTextParts.length ? rewardTextParts.join(', ') : '보상 없음';

          log(
            `[미션 완료] ${scope.toUpperCase()} - ${def.name} (보상: ${rewardText})`,
            'system'
          );

          showToast(`미션 완료: ${def.name} (${rewardText})`, 'mission');

          if (scope === 'daily' && state.stats.missionsCompletedTotal >= 3) unlockAchievement('daily_mission_clear1');
          if (scope === 'weekly' && state.stats.missionsCompletedTotal >= 12) unlockAchievement('weekly_mission_clear1');
          // Phase 1: 일일 미션 완료 시 주간 추적
          if (scope === 'daily' && state.missionProgress.weekly) {
            state.missionProgress.weekly.dailyMissionsCompleted =
              (state.missionProgress.weekly.dailyMissionsCompleted || 0) + 1;
          }

          updateStatsUI();
        }
      });

      if (scope === 'month') {
        const allDone = missionDefs.month.every(def => prog.completed[def.id]);
        if (allDone) {
          unlockAchievement('month_mission_all');
        }
      }

      checkAchievements('missions');
      // v3.0.1: 미션 완료 시 즉시 로컬 저장 → 새로고침 후 상태 유실 방지
      if (anyCompleted) saveGame(true);
    }

    function renderMissions() {
      if (!missionListEl) return;
      missionListEl.innerHTML = '';
      const scope = missionScopeActive;
      const titleMap = {
        daily: t('missionHeaderDaily'),
        weekly: t('missionHeaderWeekly'),
        month: t('missionHeaderMonth'),
        general: t('missionHeaderGeneral')
      };

      const defs = missionDefs[scope];
      if (!defs) return;
      const sourceMeta = {
        daily:   { label: 'DAILY', className: 'mission-source-daily' },
        weekly:  { label: 'WEEKLY', className: 'mission-source-weekly' },
        month:   { label: 'SEASON', className: 'mission-source-season' },
        general: { label: 'GENERAL', className: 'mission-source-general' }
      }[scope] || { label: scope.toUpperCase(), className: 'mission-source-general' };

      const header = document.createElement('div');
      header.style.marginBottom = '4px';
      header.style.fontWeight = '600';
      header.textContent = titleMap[scope] || '';
      missionListEl.appendChild(header);

      defs.forEach(def => {
        if (def.stub) return; // 미구현 미션 숨김 (#16)
        const progVal = getMissionProgressValue(scope, def.type);
        const progObj = state.missionProgress[scope];
        const completed = !!(progObj && progObj.completed && progObj.completed[def.id]);

        const item = document.createElement('div');
        item.className = 'mission-item';

        const main = document.createElement('div');
        main.className = 'mission-main';
        main.innerHTML = `
          <div class="mission-title-row">
            <span class="mission-source-pill ${sourceMeta.className}">${sourceMeta.label}</span>
            <strong>${localizeMissionName(def)}</strong>
          </div>
          <div class="mission-progress">${localizeMissionDesc(def)} (${progVal} / ${def.target})</div>
          <div class="mission-reward">${t('reward')}: ${def.rewardCredits ? (t('credits') + ' +' + def.rewardCredits) : ''}${def.rewardEnergyPack ? ((def.rewardCredits ? ' / ' : '') + (t('energyPack') + ' +' + def.rewardEnergyPack)) : ''}${def.rewardCoin ? (((def.rewardCredits || def.rewardEnergyPack) ? ' / ' : '') + 'COIN +' + def.rewardCoin) : ''}${(!def.rewardCredits && !def.rewardEnergyPack && !def.rewardCoin) ? t('none') : ''}</div>
        `;

        const tag = document.createElement('span');
        tag.className = completed ? 'tag-complete' : 'tag-incomplete';
        tag.textContent = completed ? t('complete') : t('incomplete');

        item.appendChild(main);
        item.appendChild(tag);
        missionListEl.appendChild(item);
      });
    }

    function unlockAchievement(id) {
      if (state.achievements[id]) return;
      const def = achievementDefs.find(a => a.id === id);
      if (!def) return;
      state.achievements[id] = true;
      const achName = localizeAchievementName(def);
      playSfx('achievement');
      log(t('achievementLog', { name: achName }), 'system');
      showToast(t('toastAchievement', { name: achName }), 'achievement');
      renderAchievements();
      checkMissions('general'); // 업적 기반 GENERAL QUEST 체크
    }

    function getAchievementMetricValue(metric) {
      const discoveredCodes = getCodexDiscoveredCount();
      const legendaryCount = countCodesByRarity('LEGENDARY');
      const epicPlusCount = countCodesByRarity('EPIC') + legendaryCount;
      const map = {
        level: state.level || 1,
        scans: state.stats.scanCount || 0,
        hackSuccess: state.stats.hackSuccessCount || 0,
        riskHackSuccess: state.stats.riskHackSuccessCount || 0,
        extremeHackSuccess: state.stats.extremeHackSuccessCount || 0,
        creditsEarnedTotal: state.stats.creditsEarnedTotal || 0,
        shopPurchases: state.stats.shopPurchaseCount || 0,
        codexCount: discoveredCodes,
        highestPower: getHighestCodePower(),
        highestCodeLevel: getHighestCodeLevel(),
        codeUpgradeCount: state.stats.codeUpgradeCount || 0,
        codeSyncCount: state.stats.codeSyncCount || 0,
        codeEvolutionCount: state.stats.codeEvolutionCount || 0,
        codeShardsTotal: state.stats.codeShardsTotal || 0,
        cpuTier: state.cpuTier || 1,
        gpuTier: state.gpuTier || 1,
        hybridTier: Math.min(state.cpuTier || 1, state.gpuTier || 1),
        stageHighest: (state.stage && state.stage.highestCleared) || 0,
        stageClearCount: state.stats.stageClearCount || 0,
        chapterRewardCount: Object.keys((state.stage && state.stage.chapterRewardsClaimed) || {}).length,
        energySpentTotal: state.stats.energySpentTotal || 0,
        energyPacksUsed: state.stats.energyPacksUsed || 0,
        legendaryCount,
        epicPlusCount,
        missionsCompleted: state.stats.missionsCompletedTotal || 0
      };
      return map[metric] || 0;
    }

    function checkAchievements(reason) {
      if (state.level >= 9) unlockAchievement('reach_level3');
      if (state.level >= 30) unlockAchievement('reach_level10');

      if (state.stats.scanCount >= 30) unlockAchievement('scan_10');
      if (state.stats.scanCount >= 90) unlockAchievement('scan_30');
      if (state.stats.scanCount >= 150) unlockAchievement('scan_50');

      if (ownedCodes.length >= 9) unlockAchievement('collector_beginner');
      if (state.stats.hackSuccessCount >= 90) unlockAchievement('hack_30_success');
      if (state.energyMax >= 75) unlockAchievement('energy_max_25');
      if (state.stats.creditsEarnedTotal >= 15000) unlockAchievement('credits_5000');
      if (state.stats.creditsEarnedTotal >= 60000) unlockAchievement('credits_20000');
      if (state.stats.missionsCompletedTotal >= 30) unlockAchievement('mission_10');

      const discoveredCodes = getCodexDiscoveredCount();
      const highestPower = getHighestCodePower();
      const highestLevel = getHighestCodeLevel();
      const highestSync = getHighestSyncLevel();
      const legendaryCount = countCodesByRarity('LEGENDARY');
      const epicPlusCount = countCodesByRarity('EPIC') + legendaryCount;
      const rarePlusCount = countCodesByRarity('RARE') + epicPlusCount;
      const totalShards = state.stats.codeShardsTotal || 0;
      const upgrades = state.stats.codeUpgradeCount || 0;
      const syncs = state.stats.codeSyncCount || 0;
      const evolves = state.stats.codeEvolutionCount || 0;
      const packsUsed = state.stats.energyPacksUsed || 0;

      const thresholds = {
        scan: [
          ['scan_total_75', 225],
          ['scan_total_120', 360],
          ['scan_total_200', 600],
          ['scan_total_350', 1050],
          ['scan_total_500', 1500]
        ],
        hack: [
          ['hack_total_10', 30],
          ['hack_total_60', 180],
          ['hack_total_120', 360],
          ['hack_total_250', 750]
        ],
        level: [
          ['level_total_5', 15],
          ['level_total_15', 45],
          ['level_total_20', 60],
          ['level_total_25', 75]
        ],
        credits: [
          ['credits_total_1000', 3000],
          ['credits_total_10000', 30000],
          ['credits_total_50000', 150000]
        ],
        missions: [
          ['missions_total_25', 75],
          ['missions_total_50', 150],
          ['missions_total_100', 300]
        ],
        purchases: [
          ['shop_total_10', 30],
          ['shop_total_25', 75],
          ['shop_total_50', 150]
        ],
        energySpent: [
          ['energy_spent_100', 300],
          ['energy_spent_500', 1500],
          ['energy_spent_1000', 3000]
        ],
        risk: [
          ['risk_total_5', 15],
          ['risk_total_25', 75]
        ],
        codex: [
          ['codex_total_1', 4],
          ['codex_total_3', 8],
          ['codex_total_5', 12],
          ['codex_total_6', Object.keys(codeDefs).length]
        ],
        power: [
          ['code_power_30', 90],
          ['code_power_50', 150],
          ['code_power_80', 240]
        ],
        codeLevel: [
          ['code_level_3', 9],
          ['code_level_5', 15],
          ['code_level_10', 30]
        ],
        upgrades: [
          ['code_upgrade_1', 3],
          ['code_upgrade_5', 15],
          ['code_upgrade_15', 45]
        ],
        sync: [
          ['code_sync_1', 3],
          ['code_sync_3', 9],
          ['code_sync_8', 24]
        ],
        syncLevel: [
          ['sync_level_1', 3],
          ['sync_level_3', 9]
        ],
        evolves: [
          ['code_evolve_1', 3],
          ['code_evolve_3', 9]
        ],
        shards: [
          ['shards_total_10', 30],
          ['shards_total_30', 90]
        ],
        packs: [
          ['energy_pack_1', 3]
        ]
      };

      function unlockByThreshold(list, value) {
        list.forEach(([id, threshold]) => {
          if (value >= threshold) unlockAchievement(id);
        });
      }

      unlockByThreshold(thresholds.scan, state.stats.scanCount);
      unlockByThreshold(thresholds.hack, state.stats.hackSuccessCount);
      unlockByThreshold(thresholds.level, state.level);
      unlockByThreshold(thresholds.credits, state.stats.creditsEarnedTotal);
      unlockByThreshold(thresholds.missions, state.stats.missionsCompletedTotal);
      unlockByThreshold(thresholds.purchases, state.stats.shopPurchaseCount);
      unlockByThreshold(thresholds.energySpent, state.stats.energySpentTotal);
      unlockByThreshold(thresholds.risk, state.stats.riskHackSuccessCount);
      unlockByThreshold(thresholds.codex, discoveredCodes);
      unlockByThreshold(thresholds.power, highestPower);
      unlockByThreshold(thresholds.codeLevel, highestLevel);
      unlockByThreshold(thresholds.upgrades, upgrades);
      unlockByThreshold(thresholds.sync, syncs);
      unlockByThreshold(thresholds.syncLevel, highestSync);
      unlockByThreshold(thresholds.evolves, evolves);
      unlockByThreshold(thresholds.shards, totalShards);
      unlockByThreshold(thresholds.packs, packsUsed);

      if (countCodesByRarity('COMMON') >= 6) unlockAchievement('rarity_common_2');
      if (countCodesByRarity('RARE') >= 6) unlockAchievement('rarity_rare_2');
      if (epicPlusCount >= 6) unlockAchievement('rarity_epic_plus_2');
      if (legendaryCount >= 1) unlockAchievement('legendary_1');
      if (legendaryCount >= 2) unlockAchievement('legendary_2');
      if (rarePlusCount >= 12) unlockAchievement('rare_plus_4');
      if (state.cpuTier >= 15) unlockAchievement('cpu_tier_5_plus');
      if (state.cpuTier >= 30) unlockAchievement('cpu_tier_10_plus');
      if (state.energyMax >= 90) unlockAchievement('energy_max_30_plus');
      if (state.energyMax >= 120) unlockAchievement('energy_max_40_plus');

      achievementDefs.forEach(def => {
        if (!def.metric || !def.target) return;
        if (getAchievementMetricValue(def.metric) >= def.target) unlockAchievement(def.id);
      });
    }

    function renderAchievements() {
      if (!achievementListEl) return;
      achievementListEl.innerHTML = '';

      // v3.0.0: 6단계 난이도 (입문 / 일반 / 보통 / 어려움 / 혼돈 / 불가능)
      const diffLabel = {
        intro:      t('difficultyIntro'),       // 입문
        easy:       t('difficultyEasy'),         // 일반
        normal:     t('difficultyNormal'),       // 보통
        hard:       t('achievementDifficultyHard'), // 업적 난이도: 어려움
        chaos:      t('difficultyChaos'),        // 혼돈
        impossible: t('difficultyImpossible')    // 불가능
      };

      const filter = (state.ui && state.ui.achievementFilter) || 'incomplete';
      const showHidden = !!(state.ui && state.ui.showHiddenAchievements);
      achievementFilterButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.achievementFilter === filter);
      });
      if (chkShowHiddenAchievements) chkShowHiddenAchievements.checked = showHidden;

      achievementDefs.forEach(def => {
        const completed = !!state.achievements[def.id];
        if (filter === 'incomplete' && completed) return;
        if (filter === 'complete' && !completed) return;
        if (def.hidden && !completed && !showHidden) return;

        const item = document.createElement('div');
        item.className = 'achievement-item';

        const main = document.createElement('div');
        main.className = 'achievement-main';

        const displayName = def.hidden && !completed ? '???' : localizeAchievementName(def);
        const displayDesc = def.hidden && !completed
          ? t('hiddenAchievement')
          : localizeAchievementDesc(def);

        let diffClass = 'diff-easy';
        if (def.difficulty === 'normal') diffClass = 'diff-normal';
        else if (def.difficulty === 'hard') diffClass = 'diff-hard';

        main.innerHTML = `
          <div>
            ${displayName}
            <span class="diff-pill ${diffClass}">${diffLabel[def.difficulty] || ''}</span>
            ${def.hidden ? `<span class="diff-pill" style="background:#4b5563;color:#e5e7eb;">${t('hidden')}</span>` : ''}
          </div>
          <div class="mission-progress">${displayDesc}</div>
        `;

        const tag = document.createElement('span');
        tag.className = completed ? 'tag-complete' : 'tag-incomplete';
        tag.textContent = completed ? t('achieved') : t('notYet');

        item.appendChild(main);
        item.appendChild(tag);
        achievementListEl.appendChild(item);
      });
    }

    function saveCurrentLoadout() {
      const slot = loadoutSelect.value || '1';
      const code = getActiveCodeInstance();
      const server = getSelectedServer();
      state.loadouts[slot] = {
        codeId: code ? code.id : null,
        serverId: server ? server.id : null,
        hackMode: normalizeHackMode(state.hackMode)
      };
      log(t('loadoutSaved', { slot }), 'system');
    }

    function loadLoadout() {
      const slot = loadoutSelect.value || '1';
      const data = state.loadouts[slot];
      if (!data || (!data.codeId && !data.serverId)) {
        log(t('loadoutEmpty', { slot }), 'system');
        return;
      }
      if (data.codeId && getOwnedCode(data.codeId)) {
        state.activeCodeId = data.codeId;
      }
      if (data.serverId) {
        const s = servers.find(server => server.id === data.serverId);
        if (s) {
          serverSelect.value = data.serverId;
        }
      }
      state.hackMode = normalizeHackMode(data.hackMode || (data.riskMode ? 'risk' : 'normal'));
      state.riskMode = state.hackMode === 'risk';
      renderHackModeUI();
      log(t('loadoutLoaded', { slot }), 'system');
      updateStatsUI();
    }

    // 리사이저
    let isResizing = false;
    let currentResizer = null;

    function onMouseDownResizerLeft(e) {
      isResizing = true;
      currentResizer = 'left';
      e.preventDefault();
    }
    function onMouseDownResizerRight(e) {
      isResizing = true;
      currentResizer = 'right';
      e.preventDefault();
    }
    function onMouseMove(e) {
      if (!isResizing || !main) return;
      const rect = main.getBoundingClientRect();
      const totalWidth = rect.width;
      if (!totalWidth) return;

      if (currentResizer === 'left') {
        if (!leftPanel) return;
        let newLeftWidth = ((e.clientX - rect.left) / totalWidth) * 100;
        newLeftWidth = Math.max(10, Math.min(40, newLeftWidth));
        leftPanel.style.flex = `0 0 ${newLeftWidth}%`;
      } else if (currentResizer === 'right') {
        if (!rightPanel) return;
        let newRightWidth = ((rect.right - e.clientX) / totalWidth) * 100;
        newRightWidth = Math.max(15, Math.min(45, newRightWidth));
        rightPanel.style.flex = `0 0 ${newRightWidth}%`;
      }
    }
    function onMouseUp() {
      if (!isResizing) return;
      isResizing = false;
      currentResizer = null;
    }

    bind(resizerLeft, 'mousedown', onMouseDownResizerLeft);
    if (rightPanel) bind(resizerRight, 'mousedown', onMouseDownResizerRight);
    bind(window, 'mousemove', onMouseMove);
    bind(window, 'mouseup', onMouseUp);

    // LIST / 더보기 모달 탭
    function setActiveListTab(tabName) {
      const panelMap = {
        mission: tabMission,
        achievement: tabAchievement
      };
      Object.keys(panelMap).forEach(name => {
        if (!panelMap[name]) return;
        panelMap[name].classList.toggle('active', name === tabName);
      });
      listTabButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.listTab === tabName);
      });
      renderMissions();
      renderAchievements();
    }

    function setActiveMoreTab(tabName) {
      const tabSupport = document.getElementById('tabSupport');
      const panelMap = {
        codex: tabCodex,
        live: tabLiveNet,
        rank: tabRank,
        settings: tabSettings,
        save: tabSave,
        credits: tabCredits,
        manual: tabManual,
        support: tabSupport
      };
      if (tabName === 'support') {
        _supportPanelLoginState = undefined; // 탭 진입 시 항상 새로 렌더
        renderSupportPanel();
      }
      const activeTab = panelMap[tabName] ? tabName : 'codex';

      // v3.0.0 hotfix3: class-only switching could leave CODEX rendered
      // behind LIVE/RANK/SETTINGS/SAVE/CREDITS/MANUAL after modal scroll fixes.
      // Apply explicit display + hidden state so exactly one panel is visible.
      Object.keys(panelMap).forEach(name => {
        const panel = panelMap[name];
        if (!panel) return;
        const isActive = name === activeTab;
        panel.classList.toggle('active', isActive);
        panel.hidden = !isActive;
        panel.style.display = isActive ? 'flex' : 'none';
        panel.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      });
      moreTabButtons.forEach(btn => {
        const isActive = btn.dataset.tab === activeTab;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
      try {
        document.dispatchEvent(new CustomEvent('hcsig:more-tab', {
          detail: { tab: activeTab, open: !!(moreModalBackdrop && moreModalBackdrop.classList.contains('active')) }
        }));
      } catch (e) {}
    }

    listTabButtons.forEach(btn => {
      bind(btn, 'click', () => {
        const tab = btn.dataset.listTab || 'mission';
        setActiveListTab(tab);
      });
    });

    moreTabButtons.forEach(btn => {
      bind(btn, 'click', () => {
        const tab = btn.dataset.tab;
        setActiveMoreTab(tab);
      });
    });

    function renderUpdateLog() {
      if (!updateVersionTitle || !updateLinesList || !updateIndexLabel || !updateLogs.length) return;
      const entry = updateLogs[activeUpdateIndex];
      if (!entry) return;
      updateVersionTitle.textContent = entry.version;
      updateLinesList.innerHTML = '';
      entry.lines.forEach(line => {
        const li = document.createElement('li');
        li.textContent = line;
        updateLinesList.appendChild(li);
      });
      updateIndexLabel.textContent = `${activeUpdateIndex + 1} / ${updateLogs.length}`;
    }

    bind(btnUpdatePrev, 'click', () => {
      activeUpdateIndex = (activeUpdateIndex - 1 + updateLogs.length) % updateLogs.length;
      renderUpdateLog();
    });
    bind(btnUpdateNext, 'click', () => {
      activeUpdateIndex = (activeUpdateIndex + 1) % updateLogs.length;
      renderUpdateLog();
    });

    function openListModal(defaultTab = 'mission') {
      try {
        setActiveListTab(defaultTab);
        if (!listModalBackdrop) return;
        listModalBackdrop.classList.add('active');
      } catch (err) {
        console.error('[ListModal] open failed:', err);
        try { showToast('LIST를 여는 중 오류가 발생했습니다. (콘솔 확인)', 'warn'); } catch(e) {}
      }
    }

    function closeListModal() {
      if (!listModalBackdrop) return;
      listModalBackdrop.classList.remove('active');
    }

    function openEventModal() {
      try {
        renderWeeklyPanel();
        if (!eventModalBackdrop) return;
        eventModalBackdrop.classList.add('active');
        try { document.dispatchEvent(new CustomEvent('hcsig:event-open', { detail: { open: true } })); } catch(e) {}
      } catch (err) {
        console.error('[EventModal] open failed:', err);
        try { showToast('EVENT를 여는 중 오류가 발생했습니다. (콘솔 확인)', 'warn'); } catch(e) {}
      }
    }

    function closeEventModal() {
      if (!eventModalBackdrop) return;
      eventModalBackdrop.classList.remove('active');
      try { document.dispatchEvent(new CustomEvent('hcsig:event-open', { detail: { open: false } })); } catch(e) {}
    }

    function openPassModal() {
      try {
        renderPassPanel();
        if (!passModalBackdrop) return;
        passModalBackdrop.classList.add('active');
        try { document.dispatchEvent(new CustomEvent('hcsig:pass-open', { detail: { open: true } })); } catch(e) {}
      } catch (err) {
        console.error('[PassModal] open failed:', err);
        try { showToast('PASS를 여는 중 오류가 발생했습니다. (콘솔 확인)', 'warn'); } catch(e) {}
      }
    }

    function closePassModal() {
      if (!passModalBackdrop) return;
      passModalBackdrop.classList.remove('active');
      try { document.dispatchEvent(new CustomEvent('hcsig:pass-open', { detail: { open: false } })); } catch(e) {}
    }

    function openMoreModal(defaultTab = 'codex', showDontShowButton = false) {
      try {
        renderUpdateLog();
        if (btnUpdateDontShow) btnUpdateDontShow.style.display = showDontShowButton ? 'inline-block' : 'none';
        if (!moreModalBackdrop) return;
        moreModalBackdrop.classList.add('active');
        setActiveMoreTab(defaultTab);
      } catch (err) {
        console.error('[MoreModal] open failed:', err);
        try { showToast('더보기를 여는 중 오류가 발생했습니다. (콘솔 확인)', 'warn'); } catch(e) {}
      }
    }


    function closeMoreModal() {
      if (!moreModalBackdrop) return;
      moreModalBackdrop.classList.remove('active');
      try {
        document.dispatchEvent(new CustomEvent('hcsig:more-tab', { detail: { tab: 'closed', open: false } }));
      } catch (e) {}
    }

    // v1.6.2: 더보기 버튼 클릭 이슈 방지 (가드 + 이벤트 위임)
    bind(btnList, 'click', () => openListModal('mission'));
    bind(btnEvent, 'click', () => openEventModal());
    bind(btnMore, 'click', () => openMoreModal('codex', false));
    bind(document, 'click', (e) => {
      const listTarget = e.target.closest && e.target.closest('#btnList');
      if (listTarget) openListModal('mission');
      const eventTarget = e.target.closest && e.target.closest('#btnEvent');
      if (eventTarget) openEventModal();
      const passTarget = e.target.closest && e.target.closest('#btnPass');
      if (passTarget) openPassModal();
      const moreTarget = e.target.closest && e.target.closest('#btnMore');
      if (moreTarget) openMoreModal('codex', false);
      const homeLiveHint = e.target.closest && e.target.closest('#homeLiveHint');
      if (homeLiveHint) openMoreModal('live', false);
    });
    bind(btnListClose, 'click', closeListModal);
    bind(btnListClose2, 'click', closeListModal);
    bind(listModalBackdrop, 'click', (e) => {
      if (e.target === listModalBackdrop) closeListModal();
    });
    bind(btnEventClose, 'click', closeEventModal);
    bind(btnEventClose2, 'click', closeEventModal);
    bind(eventModalBackdrop, 'click', (e) => {
      if (e.target === eventModalBackdrop) closeEventModal();
    });
    bind(btnPass, 'click', () => openPassModal());
    bind(btnPassClose, 'click', closePassModal);
    bind(btnPassClose2, 'click', closePassModal);
    bind(passModalBackdrop, 'click', (e) => {
      if (e.target === passModalBackdrop) closePassModal();
    });
    // PASS 모달 내부 탭 전환
    document.querySelectorAll('[data-pass-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.dataset.passTab;
        document.querySelectorAll('[data-pass-tab]').forEach(b => b.classList.toggle('active', b.dataset.passTab === tabId));
        document.querySelectorAll('#passModal .event-tab-panel').forEach(p => p.classList.toggle('active', p.id === 'passTab' + tabId.charAt(0).toUpperCase() + tabId.slice(1)));
      });
    });
    bind(btnMoreClose, 'click', closeMoreModal);
    bind(btnMoreClose2, 'click', closeMoreModal);
    bind(moreModalBackdrop, 'click', (e) => {
      if (e.target === moreModalBackdrop) closeMoreModal();
    });

    function maybeShowUpdateOnStart() {
      return;
    }

    bind(btnUpdateDontShow, 'click', () => {
      localStorage.setItem(LAST_SEEN_VERSION_KEY, CURRENT_VERSION);
      closeMoreModal();
    });

    // 저장/불러오기
    const OFFLINE_ENERGY_MAX_MS = 60 * 60 * 1000;

    function persistLastSeenAt(ts = Date.now(), silent = true, saveOptions = null) {
      state.lastSeenAt = ts;
      try {
        const raw = localStorage.getItem(SAVE_KEY);
        if (raw) {
          const data = JSON.parse(raw);
          data.state = data.state || {};
          data.state.lastSeenAt = ts;
          if (!data.savedAt) data.savedAt = state.lastSavedAt || ts;
          localStorage.setItem(SAVE_KEY, JSON.stringify(data));
        }
      } catch (e) {
        console.warn('[OfflineEnergy] persistLastSeenAt failed:', e);
      }
      if (!silent) {
        const nextOptions = Object.assign({ critical: true, reason: 'presence-sync' }, saveOptions || {});
        saveGame(true, nextOptions);
      }
    }

    function applyOfflineEnergyRecovery() {
      const now = Date.now();
      const lastSeen = Number(state.lastSeenAt || state.lastSavedAt || 0);
      state.lastSeenAt = now;
      if (!lastSeen || !Number.isFinite(lastSeen) || now <= lastSeen) return;

      const elapsedMs = Math.min(now - lastSeen, OFFLINE_ENERGY_MAX_MS);
      if (elapsedMs <= 0) return;

      let recovered = 0;

      if (state.energy >= state.energyMax) {
        state.energy = state.energyMax;
        state.energyTimerMs = 0;
      } else {
        let remaining = elapsedMs;
        let timer = Number(state.energyTimerMs || 0);
        if (timer <= 0) timer = ENERGY_INTERVAL_MS;

        if (remaining >= timer) {
          remaining -= timer;
          state.energy = Math.min(state.energyMax, state.energy + 1);
          recovered += 1;
          while (state.energy < state.energyMax && remaining >= ENERGY_INTERVAL_MS) {
            remaining -= ENERGY_INTERVAL_MS;
            state.energy += 1;
            recovered += 1;
          }
        } else {
          timer -= remaining;
          remaining = 0;
        }

        if (state.energy >= state.energyMax) {
          state.energy = state.energyMax;
          state.energyTimerMs = 0;
        } else {
          state.energyTimerMs = (remaining > 0 ? remaining : timer);
          if (state.energyTimerMs <= 0 || !Number.isFinite(state.energyTimerMs)) {
            state.energyTimerMs = ENERGY_INTERVAL_MS;
          }
        }
      }

      if (recovered > 0) {
        const mins = Math.floor(elapsedMs / 60000);
        const secs = Math.floor((elapsedMs % 60000) / 1000);
        const label = mins > 0 ? `${mins}${t('minutes')} ${secs}${t('seconds')}` : `${secs}${t('seconds')}`;
        log(t('offlineRecoverLog', { v: recovered, label }), 'system');
        showToast(t('offlineRecoverToast', { v: recovered }), 'save');
      }
    }


    function refreshUiAfterStateRestore() {
      // v3.0.0: 세이브 로드 시 고아 타이머 정리 (서버 탭 전환 등 방지)
      try { stopZdDiscTimer(); stopZdHold(); } catch(_) {}
      ensureStageDefaults();
      ensureCampaignDefaults();
      ensureZeroDayDefaults();
      // v3.0.0 migration: 구 run 객체(depth/detection 필드) → 초기화
      if (state.zeroDay && state.zeroDay.pve && state.zeroDay.pve.active) {
        const r = state.zeroDay.pve.active;
        if (typeof r.depth !== 'undefined' || typeof r.detection !== 'undefined') {
          console.warn('[ZD] v3.0.0 migration: old run format detected — clearing active run');
          state.zeroDay.pve.active = null;
        }
      }
      ensureSupportDefaults();
      initAutoRunOnLoad();
      applySettings();
      syncSettingsUI();
      applyLanguageToUI();
      renderServers();
      renderShop();
      renderMissions();
      renderAchievements();
      renderCodex();
      renderCodeList();
      renderCodeDetail();
      renderUpdateLog();
      renderStagePanel();
      renderCampaignPanel();
      renderWeeklyPanel();
      renderZeroDayPanel();
      updateStatsUI();
      if (btnToggleLogs) {
        btnToggleLogs.textContent = logsHidden ? t('showLogs') : t('hideLogs');
      }
      try {
        window.dispatchEvent(new CustomEvent('hcsig:language-applied', { detail: { lang: getLang() } }));
      } catch (e) {}
    }

    function saveGame(silent = false, options = {}) {
      state.lastSavedAt = Date.now();
      state.lastSeenAt = state.lastSavedAt;
      state.hackMode = normalizeHackMode(state.hackMode);
      state.riskMode = state.hackMode === 'risk';
      ensureModifierDefaults();
      const saveData = {
        version: CURRENT_VERSION,
        savedAt: state.lastSavedAt,
        state: state,
        ownedCodes: ownedCodes,
        modifiers: modifiers
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
      localStorage.setItem(LAST_SEEN_VERSION_KEY, CURRENT_VERSION);

      try {
        window.dispatchEvent(new CustomEvent('hcsig:save', {
          detail: {
            silent,
            critical: !!(options && options.critical),
            reason: (options && options.reason) || null,
            saveData: JSON.parse(JSON.stringify(saveData))
          }
        }));
      } catch (e) {
        console.warn('[CloudBridge] save event dispatch failed:', e);
      }

      if (!silent) {
        log(t('saveStateSaved'), 'system');
        showToast(t('saveComplete'), 'save');
      } else if (state.ui && state.ui.autoSaveToast) {
        showToast(t('autosaveComplete'), 'save');
      }
      updateStatsUI();
    }

    let scheduledSilentSaveTimer = null;
    function scheduleSilentSave(delay = 5000) {
      clearTimeout(scheduledSilentSaveTimer);
      scheduledSilentSaveTimer = setTimeout(() => {
        scheduledSilentSaveTimer = null;
        saveGame(true);
      }, delay);
    }

    function loadGame(rawOverride = null) {
      let raw = null;
      let source = 'main';
      if (typeof rawOverride === 'string') {
        raw = rawOverride;
        source = 'override';
      } else {
        // v3.0.0 PC stability hotfix: choose the highest-progress save candidate.
        // This prevents a freshly-created low-progress v17 save from hiding a richer v16/backup save.
        const candidates = [
          { key: SAVE_KEY, source: 'main', raw: localStorage.getItem(SAVE_KEY) },
          { key: OLD_SAVE_KEY, source: 'old-key', raw: localStorage.getItem(OLD_SAVE_KEY) },
          { key: SAVE_BACKUP_KEY, source: 'backup', raw: getSaveBackup() },
          { key: SAVE_BACKUP_PREV_KEY, source: 'backup-prev', raw: getSaveBackupPrev() }
        ].filter(c => !!c.raw).map(c => {
          const migrated = migrateSave(c.raw);
          let parsed = migrated;
          if (!parsed) {
            try { parsed = JSON.parse(c.raw); } catch (e) { parsed = null; }
          }
          return Object.assign(c, { parsed, score: parsed ? getSaveScore(parsed) : -1 });
        }).filter(c => c.parsed);

        if (candidates.length) {
          candidates.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return Number((b.parsed && b.parsed.savedAt) || 0) - Number((a.parsed && a.parsed.savedAt) || 0);
          });
          const best = candidates[0];
          raw = best.raw;
          source = best.source;
          if (best.key !== SAVE_KEY) {
            pushSaveBackup(raw);
            localStorage.setItem(SAVE_KEY, raw);
            console.warn(`[LoadGame] selected ${best.source} save by progress score (${best.score})`);
          }
        }
      }
      // v3.0.0+: no save candidates -> do not write default state automatically.
      if (!raw) {
        // v3.0.0+: default state 로 자동 저장하지 않음 (사용자 행동 후에만 save)
        log(t('noSavedData'), 'system');
        return;
      }
      try {
        // v3.0.0+: 마이그레이션 적용 — 기존 raw도 백업 유지
        const data = migrateSave(raw) || JSON.parse(raw);
        const rawHasClaimFlags = !!(data.state && data.state.claimFlags);
        if (source !== 'backup') {
          // 정상 로드 — 마지막으로 성공한 raw를 백업
          try { pushSaveBackup(raw); } catch(e) { console.warn('[SaveBackup] pre-load backup failed:', e); }
        }
        if (data.savedAt) state.lastSavedAt = data.savedAt;
        if (data.state) {
          Object.assign(state, state, data.state);
        }
        if (Array.isArray(data.ownedCodes)) {
          ownedCodes.length = 0;
          data.ownedCodes.forEach(c => { c.shards = c.shards || 0; c.syncLevel = c.syncLevel || 0; ownedCodes.push(c); });
          data.stats = data.stats || {};
          data.stats.codeUpgradeCount = data.stats.codeUpgradeCount || 0;
          data.stats.codeSyncCount = data.stats.codeSyncCount || 0;
          data.stats.codeEvolutionCount = data.stats.codeEvolutionCount || 0;
          data.stats.energyPacksUsed = data.stats.energyPacksUsed || 0;
        }
        if (data.modifiers) {
          Object.assign(modifiers, data.modifiers);
        }
        ensureModifierDefaults();
        // 새 필드 기본값 보정
        state.stats = state.stats || {};
        state.stats.energySpentTotal ||= 0;
        state.stats.creditsEarnedTotal ||= 0;
        state.stats.missionsCompletedTotal ||= 0;
        state.stats.riskHackSuccessCount ||= 0;
        state.stats.extremeHackSuccessCount ||= 0;
        state.stats.gpuUpgradeCount ||= 0;
	        state.stats.codeShardsTotal ||= 0;
	        state.stats.stageAttemptCount ||= 0;
	        state.stats.stageClearCount ||= 0;
	        state.stats.weeklyAllClearCount ||= 0;
	        state.stats.codeShardsSpentTotal ||= 0;
	        state.stats.zeroDayRunCount ||= 0;
	        state.stats.zeroDayExtractCount ||= 0;
	        state.stats.zeroDayTraceCount ||= 0;
	        state.stats.zeroDayBestDepth ||= 0;
	        state.stats.zeroDayBestScore ||= 0;
	        state.stats.zeroDaySignalTotal ||= 0;
        state.gpuTier = Math.max(1, Number(state.gpuTier || 1));
        state.hackMode = normalizeHackMode(state.hackMode || (state.riskMode ? 'risk' : 'normal'));
        state.riskMode = state.hackMode === 'risk';
        state.missionProgress.daily = state.missionProgress.daily || {};
        state.missionProgress.weekly = state.missionProgress.weekly || {};
        state.missionProgress.month = state.missionProgress.month || {};
        state.missionProgress.daily.actions ||= 0;
        state.missionProgress.daily.riskHackSuccess ||= 0;
        state.missionProgress.daily.extremeHackSuccess ||= 0;
        state.missionProgress.daily.shopPurchases ||= 0;
        state.missionProgress.weekly.actions ||= 0;
        state.missionProgress.weekly.riskHackSuccess ||= 0;
        state.missionProgress.weekly.extremeHackSuccess ||= 0;
        state.missionProgress.weekly.shopPurchases ||= 0;
        state.missionProgress.month.actions ||= 0;
        state.missionProgress.month.riskHackSuccess ||= 0;
        state.missionProgress.month.extremeHackSuccess ||= 0;
        state.missionProgress.month.shopPurchases ||= 0;
        state.missionProgress.general = state.missionProgress.general || { completed: {} };
        state.missionProgress.general.completed = state.missionProgress.general.completed || {};

	        // v1.6.0 필드 보정
	        state.items = state.items || { energyPack: 0 };
	        state.items.energyPack = state.items.energyPack || 0;
	        state.items.weeklyToken = state.items.weeklyToken || 0;
        state.missionProgress.daily.actions = state.missionProgress.daily.actions || 0;

        // v1.6.1 UI 설정 보정
        state.ui = state.ui || { shopSortMode: 'update', shopCategory: 'all', codeSortMode: 'recent' };
        state.ui.shopSortMode = state.ui.shopSortMode || 'update';
        state.ui.shopCategory = state.ui.shopCategory || 'all';
        state.ui.codeSortMode = state.ui.codeSortMode || 'recent';

        // v1.6.5 UI 설정 보정
        state.ui.toastDurationMs = state.ui.toastDurationMs || 3000;
        state.ui.uiZoom = state.ui.uiZoom || 1;
        state.ui.fontScale = state.ui.fontScale || 100;
        state.ui.anim = (typeof state.ui.anim === 'boolean') ? state.ui.anim : true;
        state.ui.sfxEnabled = (typeof state.ui.sfxEnabled === 'boolean') ? state.ui.sfxEnabled : true;
        state.ui.sfxVolume = Number.isFinite(Number(state.ui.sfxVolume)) ? Math.max(0, Math.min(100, Number(state.ui.sfxVolume))) : 100;
        state.ui.autoSaveToast = !!state.ui.autoSaveToast;
        state.ui.logSearch = state.ui.logSearch || '';
        state.ui.achievementFilter = ['all', 'incomplete', 'complete'].includes(state.ui.achievementFilter) ? state.ui.achievementFilter : 'incomplete';
        state.ui.showHiddenAchievements = !!state.ui.showHiddenAchievements;
	        state.ui.liveNetworkEnabled = state.ui.liveNetworkEnabled !== false;
	        state.ui.liveNicknameMode = state.ui.liveNicknameMode === 'callsign' ? 'callsign' : 'nickname';
	        state.ui.weeklyFilter = ['all', 'incomplete', 'complete'].includes(state.ui.weeklyFilter) ? state.ui.weeklyFilter : 'incomplete';
	        state.weeklyChallenge = state.weeklyChallenge || { weekKey: null, progress: {}, claimed: {}, bonusClaimed: false, score: 0, badges: {} };
	        state.weeklyChallenge.progress = state.weeklyChallenge.progress || {};
	        state.weeklyChallenge.claimed = state.weeklyChallenge.claimed || {};
	        state.weeklyChallenge.badges = state.weeklyChallenge.badges || {};
	        state.weeklyChallenge.score = Math.max(0, Math.round(Number(state.weeklyChallenge.score || 0)));
	        state.weeklyChallenge.bonusClaimed = !!state.weeklyChallenge.bonusClaimed;

        state.loadouts = state.loadouts || {};
        ['1', '2', '3'].forEach(slot => {
          const loadout = state.loadouts[slot] || { codeId: null, serverId: null, hackMode: 'normal' };
          loadout.hackMode = normalizeHackMode(loadout.hackMode || (loadout.riskMode ? 'risk' : 'normal'));
          delete loadout.riskMode;
          state.loadouts[slot] = loadout;
        });

        // v3.0.0 field migrations
        state.targeting = state.targeting || { serverId: 'school_lab', route: 'internal' };
        state.targeting.serverId = state.targeting.serverId || 'school_lab';
        state.targeting.route = ['external','internal','core'].includes(state.targeting.route) ? state.targeting.route : 'internal';

        state.items = state.items || {};
        state.items.coin = state.items.coin || 0;
        state.items.zeroDayVulnerability = state.items.zeroDayVulnerability || 0;
        state.items.zeroDayVulnerabilityShard = state.items.zeroDayVulnerabilityShard || 0;
        state.items.oneDay = state.items.oneDay || 0;
        state.items.dailyBonusBox = state.items.dailyBonusBox || 0;
        state.items.rom = state.items.rom || 0;
        state.items.codeProtection = state.items.codeProtection || 0;
        state.items.pickResidualData = state.items.pickResidualData || 0;
        state.claimFlags = (state.claimFlags && typeof state.claimFlags === 'object') ? state.claimFlags : {};

        state.season = state.season || {};
        state.season.currentKey = state.season.currentKey || 'preseason';
        state.season.currentNumber = state.season.currentNumber || 0;
        state.season.passPoints = Math.max(0, Number(state.season.passPoints || 0));
        state.season.passTier = Math.max(0, Math.min(30, Number(state.season.passTier || 0)));
        state.season.passClaimed = state.season.passClaimed || {};
        state.season.shopPurchases = state.season.shopPurchases || {};
        state.season.pvpSeasonRecord = state.season.pvpSeasonRecord || {};

        state.weeklyChallenge.progressTierCurrent = state.weeklyChallenge.progressTierCurrent || 'foundation';
        state.weeklyChallenge.shopPurchases = state.weeklyChallenge.shopPurchases || {};

        state.ui.homeStatusCollapsed = !!state.ui.homeStatusCollapsed;
        state.ui.zeroDayCommandLocale = ['auto','english','korean'].includes(state.ui.zeroDayCommandLocale) ? state.ui.zeroDayCommandLocale : 'auto';

        state.missionProgress.daily.energyZeroReached = !!state.missionProgress.daily.energyZeroReached;
        state.missionProgress.weekly.energyZeroReached = !!state.missionProgress.weekly.energyZeroReached;
        state.missionProgress.month.energyZeroReached = !!state.missionProgress.month.energyZeroReached;

        state.stats.stageTurnWinCount = state.stats.stageTurnWinCount || 0;
        state.stats.zeroDayPveClearCount = state.stats.zeroDayPveClearCount || 0;
        state.stats.zeroDayPveEscapeCount = state.stats.zeroDayPveEscapeCount || 0;
        state.stats.zeroDayPvpAttackWinCount = state.stats.zeroDayPvpAttackWinCount || 0;
        state.stats.zeroDayPvpDefenseSuccessCount = state.stats.zeroDayPvpDefenseSuccessCount || 0;
        state.stats.zeroDayOneDayEarnedTotal = state.stats.zeroDayOneDayEarnedTotal || 0;
        state.stats.zeroDayOneDaySpentTotal = state.stats.zeroDayOneDaySpentTotal || 0;
        state.stats.zeroDayBestExtractDiff = state.stats.zeroDayBestExtractDiff || '';
        state.stats.zeroDayLowDetectionExtracts = state.stats.zeroDayLowDetectionExtracts || 0;
        state._vulnScanCount = state._vulnScanCount || 0;
        state.stats.coinEarnedTotal = state.stats.coinEarnedTotal || 0;
        state.stats.coinSpentTotal = state.stats.coinSpentTotal || 0;
        state.stats.passTierReached = state.stats.passTierReached || 0;
        state.stats.weeklyGoalClaimCount = state.stats.weeklyGoalClaimCount || 0;
        state.stats.weeklyTokensSpentTotal = state.stats.weeklyTokensSpentTotal || 0;
        state.stats.eventShopPurchaseCount = state.stats.eventShopPurchaseCount || 0;
        state.stats.routeExternalHackSuccessCount = state.stats.routeExternalHackSuccessCount || 0;
        state.stats.routeInternalHackSuccessCount = state.stats.routeInternalHackSuccessCount || 0;
        state.stats.routeCoreHackSuccessCount = state.stats.routeCoreHackSuccessCount || 0;

        // Migrate legacy zeroDay state from 2.3.0
        if (state.zeroDay && !state.zeroDay.pve) {
          state.zeroDay.legacyRunStats = {
            mode: state.zeroDay.mode,
            bestDepth: state.zeroDay.bestDepth,
            bestScore: state.zeroDay.bestScore,
            runs: state.zeroDay.runs,
            extracts: state.zeroDay.extracts,
            traces: state.zeroDay.traces,
            totalSignal: state.zeroDay.totalSignal
          };
          state.zeroDay.pve = { active: null, bestDepth: 0, bestScore: 0, runs: 0, extracts: 0, difficulty: 'easy' };
          state.zeroDay.pvp = { active: null, rating: 1000, seasonWins: 0, seasonLosses: 0, attacksTotal: 0, defensesTotal: 0 };
          state.zeroDay.defense = { slots: 3, cards: [], usesThisMatch: 0 };
          state.zeroDay.unlocks = {};
          state.zeroDay.tier = 1;
          state.zeroDay.skins = [];
          state.zeroDay.activeSkin = 'zero_shell';
          delete state.zeroDay.mode;
          delete state.zeroDay.active;
          delete state.zeroDay.bestDepth;
          delete state.zeroDay.bestScore;
          delete state.zeroDay.runs;
          delete state.zeroDay.extracts;
          delete state.zeroDay.traces;
          delete state.zeroDay.totalSignal;
          delete state.zeroDay.lastResult;
          delete state.zeroDay.bestSignal;
        }
        state.zeroDay.onboardingCompleted = !!state.zeroDay.onboardingCompleted;
        state.zeroDay.pve = state.zeroDay.pve || { active: null, bestDepth: 0, bestScore: 0, runs: 0, extracts: 0, difficulty: 'easy' };
        state.zeroDay.pvp = state.zeroDay.pvp || { active: null, rating: 1000, seasonWins: 0, seasonLosses: 0, attacksTotal: 0, defensesTotal: 0 };
        state.zeroDay.defense = state.zeroDay.defense || { slots: 3, cards: [], usesThisMatch: 0 };
        // v3.0.0+ fix: 잠긴 진행 중 battle/run 자동 정리 — 사용자가 EXIT 안 하고 페이지 닫은 경우
        // 다음 세션에서 새 도전을 시작할 수 있도록 stale 상태 클리어
        state.stage = state.stage || {};
        if (state.stage.activeBattle && !state.stage.activeBattle.over) {
          console.warn('[Load] Clearing stale Data Tower battle (over=false)');
          state.stage.activeBattle = null;
        } else {
          state.stage.activeBattle = state.stage.activeBattle || null;
        }
        if (state.zeroDay.pve && state.zeroDay.pve.active) {
          console.warn('[Load] Clearing stale ZERO-DAY PVE run');
          state.zeroDay.pve.active = null;
        }

        ensureTutorialDefaults();
        ensureStageDefaults();
        ensureZeroDayDefaults();
        state.lastSeenAt = Number(state.lastSeenAt || data.savedAt || 0) || null;
        state.energy = Math.min(state.energy, state.energyMax);
        applyOfflineEnergyRecovery();
        ensureMissionResets();
        const releaseResult = maybeApplyReleaseBundles({
          savedAt: data.savedAt || state.lastSavedAt || state.lastSeenAt || 0,
          version: data.version || '',
          source,
          hasRawClaimFlags: rawHasClaimFlags,
          forceDetectLegacy: !rawHasClaimFlags
        });
        if (releaseResult.changed) saveGame(true);
        refreshUiAfterStateRestore();
        flushReleaseNotices(releaseResult.notices);
        log(t('saveLoaded'), 'system');
      } catch (e) {
        console.error(e);
        log(t('saveLoadError'), 'system');
      }
    }

    function clearSave() {
      localStorage.removeItem(SAVE_KEY);
      log(t('saveDeleted'), 'system');
    }

    bind(btnSaveGame, 'click', saveGame);
    bind(btnLoadGame, 'click', loadGame);
    bind(btnClearSave, 'click', clearSave);

    bind(btnTutorialPrev, 'click', prevTutorialStep);
    bind(btnTutorialNext, 'click', nextTutorialStep);
    bind(btnTutorialFinish, 'click', () => closeTutorial(true));
    bind(btnTutorialSkip, 'click', () => closeTutorial(true));
    bind(btnOpenTutorial, 'click', () => openTutorial(true));

    bind(document, 'visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        persistLastSeenAt(Date.now(), false, { critical: true, reason: 'visibility-hidden' });
      }
    });
    bind(window, 'pagehide', () => {
      persistLastSeenAt(Date.now(), false, { critical: true, reason: 'pagehide' });
    });
    bind(window, 'beforeunload', () => {
      persistLastSeenAt(Date.now(), false, { critical: true, reason: 'beforeunload' });
    });
    bind(document, 'pointerdown', unlockSfx, { passive: true });
    bind(document, 'keydown', unlockSfx);
    bind(document, 'click', (e) => {
      const target = e.target && e.target.closest ? e.target.closest('button,[role="button"],select') : null;
      if (target && !target.disabled) playSfx('tap');
    });

    setInterval(() => {
      saveGame(true);
    }, 60000);

    // 로그 필터
    function bindLogFilterCheckbox(checkbox, key) {
      bind(checkbox, 'change', () => {
        state.logFilter[key] = checkbox.checked;
        applyLogFilter();
      });
    }
    bindLogFilterCheckbox(filterSystem, 'system');
    bindLogFilterCheckbox(filterScan, 'scan');
    bindLogFilterCheckbox(filterHack, 'hack');
    bindLogFilterCheckbox(filterShop, 'shop');
    bindLogFilterCheckbox(filterLevel, 'level');

    // 로그 초기화 / 숨기기
    bind(btnClearLogs, 'click', () => {
      if (logList) logList.innerHTML = '';
    });

    bind(btnToggleLogs, 'click', () => {
      logsHidden = !logsHidden;
      setNodeDisplay(logPanelBody, logsHidden ? 'none' : '');
      setNodeText(btnToggleLogs, logsHidden ? t('showLogs') : t('hideLogs'));
    });

    // 미션 스코프 버튼
    missionScopeButtons.forEach(btn => {
      bind(btn, 'click', () => {
        missionScopeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        missionScopeActive = btn.dataset.scope;
        renderMissions();
      });
    });

    // 기타 버튼

    // 상점 정렬
    if (shopSortSelect) {
      shopSortSelect.value = (state.ui && state.ui.shopSortMode) ? state.ui.shopSortMode : 'update';
      shopSortSelect.addEventListener('change', () => {
        state.ui = state.ui || { shopSortMode: 'update', shopCategory: 'all', codeSortMode: 'recent' };
        state.ui.shopSortMode = shopSortSelect.value;
        renderShop();
      });
    }

    // SHOP TYPE TABS (CREDITS / COIN / ONEDAY)
    const shopTypeTabButtons = document.querySelectorAll('.shop-type-tab');
    if (shopTypeTabButtons && shopTypeTabButtons.length) {
      shopTypeTabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const nextType = btn.dataset.shopType || 'credits';
          state.ui = state.ui || { shopSortMode: 'update', shopCategory: 'all', shopType: 'credits' };
          state.ui.shopType = nextType;
          shopTypeTabButtons.forEach(tab => tab.classList.toggle('active', tab === btn));
          renderShop();
          scheduleSilentSave();
          // BGM: 상점 탭 전환 알림
          try { document.dispatchEvent(new CustomEvent('hcsig:shop-type', { detail: { shopType: nextType } })); } catch(e) {}
        });
      });
    }

    if (shopCategoryTabButtons && shopCategoryTabButtons.length) {
      shopCategoryTabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const nextCategory = btn.dataset.category || 'all';
          state.ui = state.ui || { shopSortMode: 'update', shopCategory: 'all' };
          state.ui.shopCategory = nextCategory;
          shopCategoryTabButtons.forEach(tab => tab.classList.toggle('active', tab === btn));
          renderShop();
        });
      });
    }

    function applySettings() {
      const ui = state.ui || {};
      const fontScale = Number(ui.fontScale || 100);
      const zoom = Number(ui.uiZoom || 1);
      document.documentElement.style.setProperty('--font-scale', String(fontScale / 100));
      document.documentElement.style.setProperty('--ui-zoom', String(zoom));
      document.body.classList.toggle('no-anim', ui.anim === false);

    }

    function syncSettingsUI() {
      if (!setFontScale) return;
      const ui = state.ui || {};
      setFontScale.value = ui.fontScale || 100;
      setNodeText(setFontScaleLabel, `${setFontScale.value}%`);
      if (setUiZoom) setUiZoom.value = String(ui.uiZoom || 1);
      if (setAnim) setAnim.checked = ui.anim !== false;
      if (setSfx) setSfx.checked = ui.sfxEnabled !== false;
      if (setSfxVolume) setSfxVolume.value = String(Number.isFinite(Number(ui.sfxVolume)) ? Number(ui.sfxVolume) : 35);
      if (setSfxVolumeLabel) setNodeText(setSfxVolumeLabel, `${setSfxVolume ? setSfxVolume.value : 35}%`);
      if (setToastMs) setToastMs.value = String(ui.toastDurationMs || 3000);
      if (setAutoSaveToast) setAutoSaveToast.checked = !!ui.autoSaveToast;
      if (setLiveNetwork) setLiveNetwork.checked = ui.liveNetworkEnabled !== false;
      if (setLiveNicknameMode) setLiveNicknameMode.value = ui.liveNicknameMode === 'callsign' ? 'callsign' : 'nickname';
      if (setLanguage) setLanguage.value = ui.lang || 'ko';
      if (logSearchInput) logSearchInput.value = ui.logSearch || '';
    }

    
    if (setLanguage) {
      setLanguage.addEventListener('change', () => {
        // v3.0.0: 지원 언어 화이트리스트 (ko/en/ja)
        const next = setLanguage.value;
        state.ui.lang = ['ko', 'en', 'ja'].includes(next) ? next : 'ko';
        refreshUiAfterStateRestore();
        scheduleSilentSave(60);
      });
    }

    if (setFontScale) {
      setFontScale.addEventListener('input', () => {
        state.ui.fontScale = Number(setFontScale.value);
        setNodeText(setFontScaleLabel, `${setFontScale.value}%`);
        applySettings();
        scheduleSilentSave();
      });
    }

    if (setUiZoom) {
      setUiZoom.addEventListener('change', () => {
        state.ui.uiZoom = Number(setUiZoom.value);
        applySettings();
        scheduleSilentSave();
      });
    }
    if (setAnim) {
      setAnim.addEventListener('change', () => {
        state.ui.anim = !!setAnim.checked;
        applySettings();
        scheduleSilentSave();
      });
    }
    if (setSfx) {
      setSfx.addEventListener('change', () => {
        state.ui.sfxEnabled = !!setSfx.checked;
        if (state.ui.sfxEnabled) {
          unlockSfx();
          playSfx('success');
        }
        scheduleSilentSave();
      });
    }
    if (setSfxVolume) {
      setSfxVolume.addEventListener('input', () => {
        state.ui.sfxVolume = Number(setSfxVolume.value);
        setNodeText(setSfxVolumeLabel, `${setSfxVolume.value}%`);
      });
      setSfxVolume.addEventListener('change', () => {
        state.ui.sfxVolume = Number(setSfxVolume.value);
        unlockSfx();
        playSfx('tap');
        scheduleSilentSave();
      });
    }
    if (setToastMs) {
      setToastMs.addEventListener('change', () => {
        state.ui.toastDurationMs = Number(setToastMs.value);
        scheduleSilentSave();
      });
    }
    if (setAutoSaveToast) {
      setAutoSaveToast.addEventListener('change', () => {
        state.ui.autoSaveToast = !!setAutoSaveToast.checked;
        scheduleSilentSave();
      });
    }
    if (setLiveNetwork) {
      setLiveNetwork.addEventListener('change', () => {
        state.ui.liveNetworkEnabled = !!setLiveNetwork.checked;
        scheduleSilentSave(80);
      });
    }
    // BGM 토글
    const setBgm = document.getElementById('setBgm');
    if (setBgm) {
      // 초기값: localStorage에서 읽어 반영
      try {
        const lsVal = localStorage.getItem('HCSiG_BGM_enabled');
        setBgm.checked = lsVal === null ? true : lsVal !== 'false';
      } catch(e) {}
      setBgm.addEventListener('change', () => {
        if (window.HCSIG_BGM) window.HCSIG_BGM.setEnabled(!!setBgm.checked);
      });
    }
    if (setLiveNicknameMode) {
      setLiveNicknameMode.addEventListener('change', () => {
        state.ui.liveNicknameMode = setLiveNicknameMode.value === 'callsign' ? 'callsign' : 'nickname';
        scheduleSilentSave(80);
      });
    }

    // 로그 검색 + 핀
    if (logSearchInput) {
      logSearchInput.addEventListener('input', () => {
        state.ui.logSearch = logSearchInput.value || '';
        applyLogFilter();
        scheduleSilentSave(240);
      });
    }
    if (logList) {
      logList.addEventListener('click', (e) => {
        const entry = e.target.closest('.log-entry');
        if (!entry) return;
        const pinned = entry.dataset.pinned === '1';
        entry.dataset.pinned = pinned ? '0' : '1';
        entry.classList.toggle('pinned', !pinned);
        if (!pinned) logList.prepend(entry);
      });
    }

    // ── v3.0.1 Save Foundation: 충돌 다이얼로그 ──────────────────────────────
    // cloudSave.js가 브릿지를 통해 호출. 유저 선택을 Promise로 반환.
    // choice: 'use-local' | 'use-cloud' | 'safe-merge' | 'export-both'
    function showSaveConflictDialog(localSave, cloudSave) {
      return new Promise(resolve => {
        const bd  = document.getElementById('saveConflictBackdrop');
        if (!bd) { resolve('safe-merge'); return; }

        const localSum = getSaveSummary(localSave);
        const cloudSum = getSaveSummary(cloudSave);

        function fmt(ts) {
          if (!ts) return '-';
          try { return new Date(Number(ts)).toLocaleString(); } catch(e) { return '-'; }
        }
        function detail(sum) {
          return `Lv.${sum.level || 0}  크레딧 ${(sum.credits||0).toLocaleString()}  코드 ${sum.codeCount || 0}개`;
        }

        const localWins = localSum.score >= cloudSum.score;

        const elLocalScore  = document.getElementById('scLocalScore');
        const elLocalTime   = document.getElementById('scLocalTime');
        const elLocalDetail = document.getElementById('scLocalDetail');
        const elCloudScore  = document.getElementById('scCloudScore');
        const elCloudTime   = document.getElementById('scCloudTime');
        const elCloudDetail = document.getElementById('scCloudDetail');
        const localSide  = document.getElementById('scLocalSide');
        const cloudSide  = document.getElementById('scCloudSide');

        if (elLocalScore)  elLocalScore.textContent  = `점수: ${localSum.score}`;
        if (elLocalTime)   elLocalTime.textContent   = `저장: ${fmt(localSave && localSave.savedAt)}`;
        if (elLocalDetail) elLocalDetail.textContent = detail(localSum);
        if (elCloudScore)  elCloudScore.textContent  = `점수: ${cloudSum.score}`;
        if (elCloudTime)   elCloudTime.textContent   = `저장: ${fmt(cloudSave && cloudSave.savedAt)}`;
        if (elCloudDetail) elCloudDetail.textContent = detail(cloudSum);

        if (localSide)  localSide.classList.toggle('sc-winner', localWins);
        if (cloudSide)  cloudSide.classList.toggle('sc-winner', !localWins);

        bd.classList.add('active');

        function finish(choice) {
          bd.classList.remove('active');
          ['scUseLocal','scUseCloud','scSafeMerge','scExportBoth'].forEach(id => {
            const btn = document.getElementById(id);
            if (btn) btn.onclick = null;
          });
          resolve(choice);
        }

        const btnLocal  = document.getElementById('scUseLocal');
        const btnCloud  = document.getElementById('scUseCloud');
        const btnSafe   = document.getElementById('scSafeMerge');
        const btnExport = document.getElementById('scExportBoth');
        if (btnLocal)  btnLocal.onclick  = () => finish('use-local');
        if (btnCloud)  btnCloud.onclick  = () => finish('use-cloud');
        if (btnSafe)   btnSafe.onclick   = () => finish('safe-merge');
        if (btnExport) btnExport.onclick = () => finish('export-both');
      });
    }

    // ── v3.0.1 Save Foundation: 두 세이브 동시 내보내기 ─────────────────────
    function exportSaveFileWithData(saveObj, tag) {
      try {
        if (!saveObj) return;
        const sum  = getSaveSummary(saveObj);
        const data = JSON.stringify(Object.assign({}, saveObj, {
          exportMeta: { summary: sum, exportedAt: new Date().toISOString(), tag }
        }), null, 2);
        const blob = new Blob([data], { type: 'application/json;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        const d = new Date();
        a.download = `HCSiG_save_${tag}_${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}_s${sum.score}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(a.href);
      } catch(e) { console.error('[ExportWithData]', e); }
    }

    // ── v3.0.1 Save Foundation: 백업 복구 패널 ──────────────────────────────
    function showBackupRestorePanel() {
      const bd = document.getElementById('backupRestoreBackdrop');
      const list = document.getElementById('brBackupList');
      if (!bd || !list) return;

      function fmt(ts) {
        if (!ts) return '-';
        try { return new Date(Number(ts)).toLocaleString(); } catch(e) { return '-'; }
      }

      const backupSlots = [
        { label: '최신 백업 (BACKUP)', raw: getSaveBackup(),     key: 'recent' },
        { label: '이전 백업 (BACKUP_PREV)', raw: getSaveBackupPrev(), key: 'prev' }
      ];

      let html = '';
      let anySlot = false;
      backupSlots.forEach(slot => {
        if (!slot.raw) return;
        let parsed = null;
        try { parsed = JSON.parse(slot.raw); } catch(e) {}
        if (!parsed) return;
        anySlot = true;
        const sum = getSaveSummary(parsed);
        html += `
          <div class="br-slot">
            <div class="br-slot-info">
              <div class="br-slot-label">${slot.label}</div>
              <div class="br-slot-score">점수: ${sum.score}</div>
              <div class="br-slot-time">저장: ${fmt(parsed.savedAt)}</div>
              <div class="br-slot-detail">Lv.${sum.level||0} · 코드 ${sum.codeCount||0}개 · 크레딧 ${(sum.credits||0).toLocaleString()}</div>
            </div>
            <button class="br-restore-btn" data-br-key="${slot.key}">복구</button>
          </div>`;
      });
      if (!anySlot) {
        html = '<div class="br-empty">저장된 자동 백업이 없습니다.</div>';
      }
      list.innerHTML = html;

      // 복구 버튼 이벤트
      list.querySelectorAll('.br-restore-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const key = btn.dataset.brKey;
          const slot = backupSlots.find(s => s.key === key);
          if (!slot || !slot.raw) return;
          const isEn = getLang() === 'en';
          const msg = isEn
            ? 'Restore this backup? Current progress will be backed up first.'
            : '이 백업으로 복구할까요? 현재 진행 데이터는 먼저 백업됩니다.';
          if (!window.confirm(msg)) return;
          // 현재 세이브 먼저 백업
          const currentRaw = localStorage.getItem(SAVE_KEY);
          if (currentRaw) pushSaveBackup(currentRaw);
          // 복구
          localStorage.setItem(SAVE_KEY, slot.raw);
          loadGame(slot.raw);
          refreshUiAfterStateRestore();
          bd.style.display = 'none';
          showToast(isEn ? 'Backup restored.' : '백업 복구 완료.', 'save');
        });
      });

      // 닫기
      const closeBtn = document.getElementById('btnBrClose');
      if (closeBtn) closeBtn.onclick = () => { bd.style.display = 'none'; };

      bd.style.display = 'flex';
    }

    // 내보내기 / 불러오기
    function exportSaveFile() {
      try {
        // v3.0.0+: 현재 state 우선, 없으면 SAVE_KEY raw
        const live = {
          version: CURRENT_VERSION,
          saveVersion: CURRENT_VERSION,
          savedAt: state.lastSavedAt || Date.now(),
          state: JSON.parse(JSON.stringify(state)),
          ownedCodes: JSON.parse(JSON.stringify(ownedCodes)),
          modifiers: JSON.parse(JSON.stringify(modifiers))
        };
        // 요약 메타 포함 (사람이 읽기 위함)
        live.exportMeta = {
          summary: getSaveSummary(live),
          exportedAt: new Date().toISOString(),
          exportedFrom: navigator.userAgent.slice(0, 80)
        };
        const data = JSON.stringify(live, null, 2);
        const blob = new Blob([data], { type: 'application/json;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        const d = new Date();
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth()+1).padStart(2,'0');
        const dd = String(d.getDate()).padStart(2,'0');
        const score = live.exportMeta.summary.score;
        a.download = `HCSiG_save_${yyyy}${mm}${dd}_v${CURRENT_VERSION}_s${score}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(a.href);
        showToast(t('exportDone') + ' · score ' + score, 'save');
      } catch (e) {
        console.error(e);
        showToast(t('exportFail'), 'warn');
      }
    }

    function importSaveFromText(text) {
      try {
        const obj = JSON.parse(text);
        // v3.0.0+: 점수 비교 후 import — 현재보다 낮으면 경고
        const localSummary = getSaveSummary({
          version: CURRENT_VERSION,
          state: state,
          ownedCodes: ownedCodes,
          modifiers: modifiers
        });
        const importSummary = getSaveSummary(obj);
        const localScore = localSummary.score;
        const importScore = importSummary.score;
        if (localScore > importScore + 10) {
          const isEn = getLang() === 'en';
          const msg = isEn
            ? `Warning: Imported save has lower score (${importScore}) than current (${localScore}).\nImporting will OVERWRITE current progress.\n\nProceed?`
            : `경고: 불러올 데이터 진행도가 현재보다 낮습니다 (불러오기 ${importScore} < 현재 ${localScore}).\n현재 진행도가 덮어써집니다.\n\n그래도 진행할까요?`;
          if (!window.confirm(msg)) {
            showToast(isEn ? 'Import cancelled.' : '불러오기 취소됨.', 'system');
            return;
          }
        }
        // 백업 후 적용
        const currentRaw = localStorage.getItem(SAVE_KEY);
        if (currentRaw) pushSaveBackup(currentRaw);
        localStorage.setItem(SAVE_KEY, JSON.stringify(obj));
        loadGame();
        refreshUiAfterStateRestore();
        showToast(t('importDone') + ' · score ' + importScore, 'save');
      } catch (e) {
        console.error(e);
        showToast(t('importFail'), 'warn');
      }
    }

    bind(btnExportSave, 'click', exportSaveFile);

    const btnBackupRestore = document.getElementById('btnBackupRestore');
    bind(btnBackupRestore, 'click', showBackupRestorePanel);

    if (btnImportSaveFile && fileImportSave) {
      bind(btnImportSaveFile, 'click', () => fileImportSave.click());
      bind(fileImportSave, 'change', async () => {
        const f = fileImportSave.files && fileImportSave.files[0];
        if (!f) return;
        const text = await f.text();
        importSaveFromText(text);
        fileImportSave.value = '';
      });
    }

    if (btnImportSaveText && importSaveText) {
      bind(btnImportSaveText, 'click', () => {
        const text = (importSaveText.value || '').trim();
        if (!text) {
          showToast(t('emptyText'), 'warn');
          return;
        }
        importSaveFromText(text);
      });
    }

    bind(btnScan, 'click', scanForCode);
    bind(btnHack, 'click', doHack);
    bind(btnUpgradeCpu, 'click', upgradeCpu);
    bind(btnUpgradeGpu, 'click', upgradeGpu);
    bind(btnUpgradeCode, 'click', upgradeSelectedCode);
    bind(btnSyncCode, 'click', syncSelectedCode);
    bind(btnEvolveCode, 'click', evolveSelectedCode);
    bind(btnModalUpgradeCode, 'click', upgradeSelectedCode);
    bind(btnModalSyncCode, 'click', syncSelectedCode);
    bind(btnModalEvolveCode, 'click', evolveSelectedCode);
    bind(btnModalShardCode, 'click', shardEnhanceSelectedCode);
    bind(btnCodeDetailClose, 'click', closeCodeDetailModal);
    bind(codeDetailModalBackdrop, 'click', (e) => {
      if (e.target === codeDetailModalBackdrop) closeCodeDetailModal();
    });

    bind(btnUseEnergyPack, 'click', useEnergyPack);
    bind(document, 'hcsig:lab-ready', () => {
      renderStagePanel();
      renderWeeklyPanel();
    });
    bind(document, 'hcsig:extend-ready', () => {
      renderCampaignPanel();
      renderZeroDayPanel();
    });
    // v3.0.1: ITEMS 탭 클릭 시 ITEMS 패널 렌더
    bind(document, 'hcsig:render-items', () => { renderItemsPanel(); });
    bind(document, 'hcsig:zd-tab-open', () => {
      renderZeroDayPanel();
    });
    bind(document, 'hcsig:campaign-tab-open', () => {
      renderCampaignPanel();
    });
    bind(window, 'hcsig:language-applied', () => {
      renderStagePanel();
      renderCampaignPanel();
      renderWeeklyPanel();
      renderZeroDayPanel();
    });
    bind(document, 'click', (event) => {
      const btn = event.target.closest && event.target.closest('[data-weekly-filter]');
      if (!btn) return;
      state.ui = state.ui || {};
      state.ui.weeklyFilter = btn.dataset.weeklyFilter || 'incomplete';
      renderWeeklyPanel();
      scheduleSilentSave();
    });
    // v3.0.0 hotfix: removed legacy [data-zero-day-*] handler that called undefined startZeroDay/runZeroDayAction.
    setInterval(() => {
      if (document.body.classList.contains('app-view-lab') || (eventModalBackdrop && eventModalBackdrop.classList.contains('active'))) renderWeeklyPanel();
    }, 30000);

    hackModeButtons.forEach(btn => {
      bind(btn, 'click', () => {
        const mode = normalizeHackMode(btn.dataset.hackMode || 'normal');
        if (mode === 'extreme' && state.level < 5) {
          showToast(getLang() === 'en' ? 'EXTREME unlocks at Lv.5.' : 'EXTREME은 Lv.5 이상에서 해금됩니다.', 'warn');
          renderHackModeUI();
          return;
        }
        state.hackMode = mode;
        state.riskMode = mode === 'risk';
        playSfx('mode');
        log(t('hackModeLog', { mode: getHackModeInfo(mode).label }), 'system');
        renderHackModeUI();
        scheduleSilentSave();
      });
    });

    achievementFilterButtons.forEach(btn => {
      bind(btn, 'click', () => {
        state.ui = state.ui || {};
        state.ui.achievementFilter = btn.dataset.achievementFilter || 'incomplete';
        renderAchievements();
        scheduleSilentSave();
      });
    });

    bind(chkShowHiddenAchievements, 'change', () => {
      state.ui = state.ui || {};
      state.ui.showHiddenAchievements = !!chkShowHiddenAchievements.checked;
      renderAchievements();
      scheduleSilentSave();
    });

    bind(btnSaveLoadout, 'click', saveCurrentLoadout);
    bind(btnLoadLoadout, 'click', loadLoadout);

    // === v3.0.0 new UI wiring ===

    // 서버 선택 변경 → state.targeting.serverId 저장
    if (serverSelect) {
      serverSelect.addEventListener('change', () => {
        state.targeting = state.targeting || {};
        state.targeting.serverId = serverSelect.value || 'school_lab';
        scheduleSilentSave();
      });
    }

    // Route select (HOME ACTIONS)
    const routeSelectEl = document.getElementById('routeSelect');
    if (routeSelectEl) {
      routeSelectEl.addEventListener('change', () => {
        state.targeting = state.targeting || {};
        state.targeting.route = routeSelectEl.value || 'external';
        scheduleSilentSave();
      });
    }

    // Upgrade target select + single upgrade button (CPU / GPU)
    const upgradeTargetSelectEl = document.getElementById('upgradeTargetSelect');
    const btnUpgradeEl = document.getElementById('btnUpgrade');
    if (btnUpgradeEl) {
      bind(btnUpgradeEl, 'click', () => {
        const target = (upgradeTargetSelectEl && upgradeTargetSelectEl.value) || 'cpu';
        if (target === 'gpu') upgradeGpu();
        else upgradeCpu();
      });
    }

    // Collapsible system status → persist open/close to state
    const systemStatusDetailsEl = document.getElementById('systemStatusDetails');
    if (systemStatusDetailsEl) {
      systemStatusDetailsEl.addEventListener('toggle', () => {
        state.ui = state.ui || {};
        state.ui.homeStatusCollapsed = !systemStatusDetailsEl.open;
        scheduleSilentSave();
      });
    }

    // ZERO-DAY command locale select
    const zdCmdLocaleEl = document.getElementById('setZdCmdLocale');
    if (zdCmdLocaleEl) {
      zdCmdLocaleEl.addEventListener('change', () => {
        state.ui = state.ui || {};
        state.ui.zeroDayCommandLocale = zdCmdLocaleEl.value || 'auto';
        renderZeroDayPanel();
        scheduleSilentSave();
      });
    }

    // PROGRESS 난이도 선택 버튼 위임
    bind(document, 'click', (e) => {
      const btn = e.target.closest && e.target.closest('[data-progress-tier]');
      if (!btn) return;
      setProgressTier(btn.dataset.progressTier);
    });

    // 계정 서브탭 전환 (계정 및 클라우드 상태 / 계정 커스텀)
    bind(document, 'click', (e) => {
      const btn = e.target.closest && e.target.closest('[data-account-tab]');
      if (!btn) return;
      const tabId = btn.dataset.accountTab;
      document.querySelectorAll('.account-subtab-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.accountTab === tabId));
      document.querySelectorAll('.account-subpanel').forEach(p =>
        p.classList.toggle('active', p.id === 'accountPanel' + tabId.charAt(0).toUpperCase() + tabId.slice(1)));
    });

    // EVENT modal tab switching (WEEKLY / 특별 출석 / ROULETTE)
    bind(document, 'click', (e) => {
      const btn = e.target.closest && e.target.closest('[data-event-tab]');
      if (!btn) return;
      // PASS 모달 내 탭과 혼재 방지: EVENT 모달 내 클릭만 처리
      const eventModalEl = document.getElementById('eventModal');
      if (eventModalEl && !eventModalEl.contains(btn)) return;
      const tabId = btn.dataset.eventTab;
      // EVENT 모달 내 탭 버튼만 토글
      if (eventModalEl) {
        eventModalEl.querySelectorAll('.event-tab-btn').forEach(b => b.classList.toggle('active', b.dataset.eventTab === tabId));
        eventModalEl.querySelectorAll('.event-tab-panel').forEach(p => p.classList.toggle('active', p.id === 'eventTab' + tabId.charAt(0).toUpperCase() + tabId.slice(1)));
      }
    });

    // DATA TOWER turn-battle action delegation
    bind(document, 'click', (e) => {
      const btn = e.target.closest && e.target.closest('[data-battle-action]');
      if (!btn) return;
      try { doStageTurnAction(btn.dataset.battleAction); } catch(ex) { console.warn('[Battle]', ex); }
    });

    // PASS claim tier button delegation
    bind(document, 'click', (e) => {
      const btn = e.target.closest && e.target.closest('[data-claim-pass-tier]');
      if (!btn) return;
      const tier = parseInt(btn.dataset.claimPassTier, 10);
      try { claimPassTierReward(tier); } catch(ex) { console.warn('[Pass]', ex); }
    });

    // v3.0.0: Season shop buy delegation 제거됨 (시즌 상점 → COIN 상점으로 통합)

    // OPS shop buy delegation
    bind(document, 'click', (e) => {
      const btn = e.target.closest && e.target.closest('[data-ops-buy]');
      if (!btn) return;
      try { buyOpsShopItem(btn.dataset.opsBuy); } catch(ex) { console.warn('[OpsShop]', ex); }
    });

    // ZERO-DAY DISCOVERY v3.0.0: 구 data-zd-start 폴백 (레거시 HTML 호환)
    bind(document, 'click', (e) => {
      const btn = e.target.closest && e.target.closest('[data-zd-start]');
      if (!btn) return;
      try { startZdDiscRun(); } catch(ex) { console.warn('[ZD DISC]', ex); }
    });

    // mouseup 전역 핸들러: 홀드 인젝션 해제 (버튼 바깥 릴리스 대응)
    bind(document, 'mouseup', () => { try { stopZdHold(); } catch(_) {} });

    // Restore UI state: route, systemStatus open/close, zdCmdLocale
    window.addEventListener('hcsig:ready', () => {
      if (routeSelectEl && state.targeting && state.targeting.route) {
        routeSelectEl.value = state.targeting.route;
      }
      if (upgradeTargetSelectEl && state.targeting && state.targeting.upgradeTarget) {
        upgradeTargetSelectEl.value = state.targeting.upgradeTarget;
      }
      if (systemStatusDetailsEl) {
        systemStatusDetailsEl.open = !(state.ui && state.ui.homeStatusCollapsed);
      }
      if (zdCmdLocaleEl && state.ui && state.ui.zeroDayCommandLocale) {
        zdCmdLocaleEl.value = state.ui.zeroDayCommandLocale;
      }
    });

    // 인증 상태 추적 (계정 삭제 방지용)
    let authInitialized = false;
    let authUser = null;
    window.addEventListener('hcsig:auth-changed', (event) => {
      authInitialized = true;
      authUser = event.detail && event.detail.user ? event.detail.user : null;
    });

    function init() {
      addCodeInstanceFromTemplate('basic');
      state.requiredExp = requiredExp(state.level);
      ensureStageDefaults();
      ensureCampaignDefaults();
      ensureMissionResets();
      try { ensureSeasonState(); } catch(e) { console.warn('[Season] init error:', e); }

      // ① HCSIG_BRIDGE를 먼저 설정 (cloudSave.js가 대기 중)
      // v3.0.0+ 저장 안정성: score 함수 글로벌 노출 (cloudSave.js에서 점수 비교 사용)
      try {
        window.HCSIG_GET_SAVE_SCORE = getSaveScore;
        window.HCSIG_GET_SAVE_SUMMARY = getSaveSummary;
        window.HCSIG_MIGRATE_SAVE = migrateSave;
        window.HCSIG_GET_BACKUP = getSaveBackup;
        window.HCSIG_GET_BACKUP_PREV = getSaveBackupPrev;
      } catch(e) { console.warn('[HCSIG] Global bridge setup failed:', e); }
      try {
        window.HCSIG_BRIDGE = {
          version: CURRENT_VERSION,
          saveKey: SAVE_KEY,
          oldSaveKey: OLD_SAVE_KEY,
          getCurrentSaveData: () => ({
            version: CURRENT_VERSION,
            savedAt: state.lastSavedAt || Date.now(),
            state: JSON.parse(JSON.stringify(state)),
            ownedCodes: JSON.parse(JSON.stringify(ownedCodes)),
            modifiers: JSON.parse(JSON.stringify(modifiers))
          }),
          saveLocal: (silent = true) => saveGame(silent),
          loadFromRaw: (raw) => loadGame(raw),
          loadFromObject: (obj) => {
            if (!obj) return;
            localStorage.setItem(SAVE_KEY, JSON.stringify(obj));
            loadGame(JSON.stringify(obj));
            refreshUiAfterStateRestore();
          },
          getLanguage: () => getLang(),
          // v3.0.1 Save Foundation
          showConflictDialog: (localSave, cloudSave) => showSaveConflictDialog(localSave, cloudSave),
          exportSaveWithData: (saveObj, tag) => exportSaveFileWithData(saveObj, tag),
          getStateSummary: () => ({
            level: state.level,
            credits: state.credits,
            energy: state.energy,
            lastSavedAt: state.lastSavedAt || 0
          }),
          toast: (message, type = 'save') => showToast(message, type),
          log: (message, type = 'system') => log(message, type),
          refresh: () => {
            refreshUiAfterStateRestore();
          }
        };
      } catch (bridgeErr) {
        console.warn('[CloudBridge] bridge setup failed:', bridgeErr);
      }

      // ② hcsig:ready 이벤트 발생 (cloudSave.js가 초기 동기화 시작)
      try {
        window.dispatchEvent(new CustomEvent('hcsig:ready', {
          detail: {
            version: CURRENT_VERSION,
            hasLocalSave: !!localStorage.getItem(SAVE_KEY)
          }
        }));
      } catch (readyErr) {
        console.warn('[CloudBridge] ready event dispatch failed:', readyErr);
      }

      // ③ 인증 초기화 대기 (최대 3초)
      const authWaitStart = Date.now();
      const authCheckInterval = setInterval(() => {
        if (authInitialized || Date.now() - authWaitStart > 3000) {
          clearInterval(authCheckInterval);

          // v3.0.0+: 백업 우선 점검 — main save가 비어있는데 backup이 있으면 자동 복구 안 하고 사용자에게 보여줌
          const mainRaw = localStorage.getItem(SAVE_KEY);
          const oldRaw  = localStorage.getItem(OLD_SAVE_KEY);
          const backupRaw = getSaveBackup();

          // ④ 로컬 또는 백업 세이브 로드 — default state 자동 저장 절대 금지
          let releaseResult = { changed: false, notices: [] };
          if (mainRaw || oldRaw) {
            loadGame();
          } else if (backupRaw) {
            // main이 없는데 backup이 있는 비상 상황 → 자동 복구
            console.warn('[Init] main save missing, backup found — auto-restoring');
            loadGame(); // loadGame 내부에서 backup 처리
          } else {
            state.lastSeenAt = Date.now();
            // v3.0.0+: 기본 상태는 유지하되 자동 저장 안 함
            // (사용자가 행동/저장할 때까지 localStorage 건드리지 않음)
            releaseResult = maybeApplyReleaseBundles({
              savedAt: Date.now(),
              version: CURRENT_VERSION,
              source: 'fresh',
              hasRawClaimFlags: false,
              forceDetectLegacy: true
            });
            if (releaseResult.changed) saveGame(true);
          }

          // ⑤ UI 렌더
          refreshUiAfterStateRestore();
          flushReleaseNotices(releaseResult.notices);

          log(t('initLog'), 'system');
          maybeShowUpdateOnStart();
          setTimeout(() => {
            maybeStartTutorial();
          }, 180);
        }
      }, 50);
    }

    init();

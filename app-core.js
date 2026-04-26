const CURRENT_VERSION = '3.0.0';
const TUTORIAL_VERSION = 6;
    const ENERGY_INTERVAL_MS = 60000; // 에너지 1칸당 60초
    const SAVE_KEY = 'HCSiG_SAVE_v17';
const I18N = {
  ko: {
    appTitle: 'HCSiG - Hacking Code Simulator Game', subtitle: 'Hacking Code Simulator Game', list:'LIST', listTitle:'LIST', event:'EVENT', eventTitle:'EVENT', more: '더보기 ▾', moreTitle: '더보기', status:'Status', shop:'Shop', actions:'Actions', codeInventory:'코드 인벤토리', codeDetail:'코드 상세',
    level:'레벨', exp:'경험치', credits:'크레딧', cpuTier:'CPU 티어', gpuTier:'GPU 티어', energy:'에너지', nextRecovery:'다음 회복까지', energyPack:'에너지 팩', lastSave:'마지막 저장', use:'사용', sort:'정렬', category:'분류', all:'전체', system:'시스템', economy:'경제', utility:'유틸',
    codeScan:'코드 스캔', serverHack:'서버 해킹', cpuUpgrade:'CPU 업그레이드', gpuUpgrade:'GPU 업그레이드', targetServer:'타겟 서버', loadout:'로드아웃', saveSlot:'슬롯 저장', loadSlot:'슬롯 불러오기', hackMode:'해킹 모드',
    actionsDesc1:'· 에너지 1칸 = 120초, 0.1초 단위로 카운트다운 표시', actionsDesc2:'· 코드 스캔: 에너지 1, 스캔 EXP 소량 (희귀도별 스캔 시간 차등)', actionsDesc3:'· 서버 해킹: NORMAL/RISK/EXTREME 난이도 선택 가능', actionsDesc4:'· CPU는 성공률 안정, GPU는 반복/도전 보상 증폭을 담당합니다.',
    codeUpgrade:'코드 강화', codeSync:'코드 동기화', codeEvolve:'코드 진화', shardEnhance:'조각 강화', codeDesc1:'· 강화: 코드 레벨에 비례한 크레딧 소모, 파워 증가 (파괴 없음).', codeDesc2:'· 동기화: 중복 조각을 모아 성공률 보정과 파워를 함께 강화합니다.', codeDesc3:'· 진화: 일정 레벨 이상 시 희귀도 승급 (COMMON → UNCOMMON → … → LEGENDARY).',
    mission:'미션', achievement:'업적', codex:'코드 도감', logs:'로그', liveNet:'LIVE NET', rank:'RANK', settings:'설정', data:'클라우드 계정', quest:'퀘스트', records:'기록', liveNetRecords:'네트워크 관제', softRank:'소프트 랭킹', envSettings:'환경 설정', dataManage:'클라우드 계정', close:'닫기',
    logSearchHelp:'로그 검색 (로그 항목 클릭 → 핀/해제)', searchPlaceholder:'검색어 입력...', clearLogs:'로그 초기화', hideLogs:'로그 숨기기', showLogs:'로그 보이기', logFilter:'로그 필터',
    language:'언어', fontScale:'폰트 크기', snow:'눈 이펙트', uiScale:'UI 스케일', animation:'애니메이션', sfx:'효과음', sfxVolume:'효과음 볼륨', toastTime:'토스트 시간', autosaveToast:'자동저장 알림', liveNetwork:'LIVE NET', liveNicknameMode:'네트워크 표시명', nickname:'닉네임', callsign:'Callsign', enabled:'사용', settingsHelp:'· 설정은 저장 데이터에 포함되며, 새로고침 후에도 유지됩니다.',
    saveNow:'저장하기', loadNow:'불러오기', clearSave:'저장 데이터 삭제', exportSave:'내보내기', importFile:'파일 불러오기', importText:'텍스트로 불러오기', importTextPlaceholder:'여기에 JSON을 붙여넣고 불러오기를 누르세요.', importTextBtn:'텍스트 불러오기', saveHelp:'· 저장 위치: 클라우드 계정<br/>· 브라우저 내부 저장은 자동 캐시와 기존 세이브 이전에만 사용됩니다.',
    shopSortUpdate:'업데이트순', shopSortNew:'신규 우선', shopSortRarity:'희귀도순', shopSortPrice:'가격순', shopSortName:'이름순', codeSortRecent:'최신', codeSortRarity:'희귀도', codeSortPower:'파워', codeSortLevel:'레벨', codeSortName:'이름',
    codexSummary:'발견 {a} / {b}', discovered:'DISCOVERED', locked:'LOCKED', basePower:'기본 파워', ownedLvPwr:'보유 Lv.{lv} / PWR {pwr}', undiscoveredCode:'미발견 코드', undiscoveredDesc:'아직 발견하지 못한 코드입니다. 코드 스캔으로 해제하세요.', noCodes:'보유 코드 없음. [코드 스캔]으로 코드를 얻으세요.', selectCode:'보유 중인 코드를 선택하면 상세 정보가 표시됩니다.',
    levelLabel:'레벨: Lv.{v}', powerLabel:'파워: {v}', usageLabel:'사용 횟수: {v}', shardsLabel:'중복 조각: {v}', syncLabel:'동기화 단계: {v}', nextUpgrade:'다음 강화 비용: {v} 크레딧', nextSync:'다음 동기화 비용: 조각 {a} / 예상 성공률 보정 +{b}%', evolveReady:'진화 조건: 충족', evolveNeed:'진화 조건: Lv.5 이상 필요', ability:'능력', noDesc:'설명 없음.',
    missionHeaderDaily:'DAILY QUEST', missionHeaderWeekly:'WEEKLY QUEST', missionHeaderMonth:'MONTH QUEST', missionHeaderGeneral:'GENERAL QUEST', reward:'보상', none:'없음', complete:'완료', incomplete:'미완', achieved:'달성', notYet:'미달', hiddenAchievement:'히든 업적입니다. 달성 시 공개됩니다.', difficultyEasy:'일반', difficultyNormal:'보통', difficultyHard:'어려움', hidden:'HIDDEN', achievementAll:'전체', achievementIncomplete:'미완료', achievementComplete:'완료', achievementShowHidden:'숨김 포함',
    full:'FULL', seconds:'초', minutes:'분', visible:'표시', on:'ON', off:'OFF',
    saveStateSaved:'게임 상태가 클라우드 캐시에 저장되었습니다.', saveComplete:'클라우드 캐시 저장 완료', autosaveComplete:'✅ 자동 캐시 저장 완료', noSavedData:'저장된 데이터가 없습니다.', saveLoaded:'저장된 데이터를 불러왔습니다.', saveLoadError:'저장 데이터를 불러오는 중 오류가 발생했습니다.', saveDeleted:'저장 데이터가 삭제되었습니다.', exportFail:'내보내기 실패 (콘솔 확인)', hackModeLog:'해킹 모드: {mode}', riskPenaltyLog:'RISK 실패 페널티: 에너지가 추가로 1 소모되었습니다.', extremePenaltyLog:'EXTREME 실패 페널티: 에너지가 추가로 2 소모되었습니다.', gpuUpgradeLog:'GPU 업그레이드 완료! 현재 티어: {tier} (소모 크레딧 {cost})', gpuUpgradeFail:'GPU 업그레이드 실패: 크레딧이 부족합니다. (필요: {cost})', loadoutSaved:'로드아웃 슬롯 {slot}에 현재 설정을 저장했습니다.', loadoutEmpty:'로드아웃 슬롯 {slot}에 저장된 설정이 없습니다.', loadoutLoaded:'로드아웃 슬롯 {slot}을 불러왔습니다.',
    toastAchievement:'업적 달성: {name}', achievementLog:'[업적 달성] {name}', activeCode:'활성 코드 변경: {name}', levelUpLog:'레벨 업! Lv.{lv} 달성. 크레딧 +50 지급.', noEnergyPack:'에너지 팩이 없습니다.', energyFull:'이미 에너지가 가득 찼습니다.', usedEnergyPack:'에너지 팩 1개를 사용해 에너지를 최대치까지 회복했습니다.',
    noCodeSync:'동기화할 코드가 없습니다.', syncFailShards:'코드 동기화 실패: 중복 조각이 부족합니다. (필요: {need}, 보유: {have})', syncDone:'코드 동기화 완료: {name} 동기화 {lv}단계 달성. 파워 +{pwr}, 성공률 보정 +{rate}%.', syncToast:'{name} 동기화 {lv}단계', noCodeUpgrade:'강화할 코드가 없습니다. 먼저 코드를 스캔하세요.', upgradeFailCredits:'코드 강화 실패: 크레딧이 부족합니다. (필요: {cost})', upgradeDone:'코드 강화: {name} Lv.{lv} (파워 +5 → {pwr}), 크레딧 -{cost}.', noCodeEvolve:'진화할 코드가 없습니다.', maxRarity:'이미 최상위 희귀도(LEGENDARY)입니다. 더 이상 진화할 수 없습니다.', evolveNeedLv:'코드 진화 실패: 진화에는 최소 Lv.5 이상이 필요합니다.', evolveCannot:'진화를 처리할 수 없습니다.', evolveDone:'코드 진화 성공: {name}가 {rarity} 등급으로 승급, 파워 +10 → {pwr}.', shardEnhanceFail:'조각 강화 실패: 조각이 부족합니다. (필요: {need}, 보유: {have})', shardEnhanceDone:'조각 강화: {name} PWR +2 → {pwr}. 조각 -{cost}.', shardEnhanceCost:'조각 강화 비용: 조각 {cost} / PWR +2',
    noEnergyScan:'에너지가 부족하여 코드 스캔을 수행할 수 없습니다.', noEnergyHack:'에너지가 부족하여 서버 해킹을 수행할 수 없습니다.', energyPackToast:'에너지 팩 +1 (보유: {v})', offlineRecoverLog:'오프라인 동안 에너지 {v} 회복 ({label} 경과)', offlineRecoverToast:'오프라인 회복: 에너지 +{v}', exportDone:'저장 데이터 내보내기 완료', importDone:'저장 데이터 불러오기 완료', importFail:'불러오기 실패: JSON 형식을 확인하세요.', emptyText:'텍스트가 비어 있습니다.', logsHide:'로그 숨기기', logsShow:'로그 보이기', initLog:'HCSiG 초기화 완료. (언어 설정, 중복 조각/코드 동기화, 모바일 UI, 상점 분류 적용)', mobileHome:'HOME', mobileCodes:'CODES', mobileShop:'SHOP', mobileMore:'MORE', mobileLab:'LAB', mobileStage:'데이터 타워', mobileComing:'COMING SOON', tutorialReplay:'튜토리얼 다시 보기', comingSoonToast:'Coming Soon - 준비 중인 기능입니다.', buy:'구매', buyDone:'구매 완료', buyUnavailable:'구매 불가', buySpendTitle:'구매하면 크레딧이 소모됩니다.', buyDailyLimit:'오늘 구매 제한에 도달했습니다.', buyOnceLimit:'이미 구매한 영구 아이템입니다.', notEnoughCredits:'크레딧이 부족합니다.', shopLog:'[상점] {msg}', shopBought:'{name} 구매 (💰 -{cost})', missionDoneToast:'미션 완료: {name} ({reward})', missionDoneCredits:'크레딧 +{v}', missionDoneEnergyPack:'에너지 팩 +{v}', missionDoneBoth:'크레딧 +{c} / 에너지 팩 +{e}', serverOption:'{name} (보안 {sec}, Lv{lv}+)', serverLevelNeed:'해당 서버를 해킹하려면 최소 Lv.{lv} 이상이어야 합니다.', noOwnedCodes:'보유 코드가 없습니다. 먼저 코드 스캔으로 코드를 확보하세요.', scanFound:'새 코드 발견! {name} [{rarity}]', scanDuplicate:'중복 코드 감지: {name} [{rarity}] → 중복 조각 +{gain} (보유 {have}).', scanDone:'코드 스캔 완료: 경험치 +{exp}.', hackSuccessLog:'서버 해킹 성공! [{server}] 성공 확률 {chance}%. 크레딧 +{credits}, EXP +{exp}.', hackFailLog:'서버 해킹 실패. [{server}] 성공 확률 {chance}%였음.', logDailyShopReset:'[시스템] 일일 상점 제한이 초기화되었습니다. (05:00 리셋)', loadoutSlot:'슬롯 {n}', logPinHint:'로그 항목 클릭 → 핀/해제', saveToLocal:'현재 상태를 브라우저 LocalStorage에 저장합니다.', loadFromLocal:'LocalStorage에서 저장된 데이터를 불러옵니다.', deleteSave:'저장 데이터를 삭제합니다.', exportJson:'현재 저장 데이터를 JSON 파일로 내보냅니다.', importJsonFile:'JSON 저장 파일을 불러옵니다.', importJsonText:'텍스트(JSON)로 저장 데이터를 불러옵니다.', languageTitle:'게임 언어를 선택합니다.', uiScaleTitle:'전체 UI 배율을 조정합니다.', toastTitle:'화면 알림(토스트) 표시 시간을 설정합니다.', shopSortTitle:'상점 아이템 정렬 기준을 선택합니다.', codeSortTitle:'코드 인벤토리 정렬 기준을 선택합니다.', dailyResetLabel:'05:00 리셋 ({n}회)', onceLabel:'1회', dailyShort:'일일', onceShort:'1회', rarityCommon:'COMMON', rarityUncommon:'UNCOMMON', rarityRare:'RARE', rarityEpic:'EPIC', rarityLegendary:'LEGENDARY', rarityOperation:'OPERATION', routeExternal:'외부 루트', routeInternal:'내부 루트', routeCore:'코어 루트', targetRoute:'루트', upgradeTarget:'업그레이드 대상', systemStatus:'시스템 상태', creditsTab:'CREDITS', manualTab:'설명서', difficultyIntro:'입문', difficultyGeneral:'일반', difficultyStandard:'보통', difficultyHard:'어려움', difficultyChaos:'혼돈', difficultyImpossible:'불가능', passTab:'PASS', weeklyTab:'WEEKLY', seasonPass:'시즌 패스', passPoints:'패스 포인트', passTier:'패스 티어', seasonShop:'시즌 상점', opsShop:'OPS 상점', zeroDayOnboarding:'온보딩', zeroDayPve:'PVE', zeroDayPvp:'PVP', zeroDaySingle:'싱글', zeroDayCompete:'경쟁', vulnerability:'취약점', vulnerabilityShard:'취약점 조각', oneDay:'OneDay', coin:'COIN', token:'TOKEN', accountStatus:'계정 및 클라우드 상태', accountCustom:'계정 커스텀', comingSoonToastShort:'준비 중입니다.', zeroDayCmdLocale:'ZERO-DAY 명령어 표시', zdCmdAuto:'auto', zdCmdEn:'english', zdCmdKo:'korean', energyRecoveryDesc:'에너지 1칸 = 60초'
  },
  en: {
    appTitle: 'HCSiG - Hacking Code Simulator Game', subtitle: 'Hacking Code Simulator Game', list:'LIST', listTitle:'LIST', event:'EVENT', eventTitle:'EVENT', more: 'More ▾', moreTitle: 'More', status:'Status', shop:'Shop', actions:'Actions', codeInventory:'Code Inventory', codeDetail:'Code Detail',
    level:'Level', exp:'EXP', credits:'Credits', cpuTier:'CPU Tier', gpuTier:'GPU Tier', energy:'Energy', nextRecovery:'Next Recovery', energyPack:'Energy Pack', lastSave:'Last Save', use:'Use', sort:'Sort', category:'Category', all:'All', system:'System', economy:'Economy', utility:'Utility',
    codeScan:'Scan Code', serverHack:'Hack Server', cpuUpgrade:'Upgrade CPU', gpuUpgrade:'Upgrade GPU', targetServer:'Target Server', loadout:'Loadout', saveSlot:'Save Slot', loadSlot:'Load Slot', hackMode:'Hack Mode',
    actionsDesc1:'· 1 energy = 120 seconds, shown with 0.1-second countdown', actionsDesc2:'· Scan Code: costs 1 energy and grants scan EXP', actionsDesc3:'· Hack Server: choose NORMAL / RISK / EXTREME difficulty', actionsDesc4:'· CPU stabilizes success, GPU amplifies repeat/challenge rewards.',
    codeUpgrade:'Upgrade Code', codeSync:'Sync Code', codeEvolve:'Evolve Code', shardEnhance:'Shard Boost', codeDesc1:'· Upgrade: costs credits based on code level and raises power (no destruction).', codeDesc2:'· Sync: spend duplicate shards to raise success bonus and power together.', codeDesc3:'· Evolve: rank up at a required level (COMMON → UNCOMMON → … → LEGENDARY).',
    mission:'Mission', achievement:'Achievements', codex:'Code Codex', logs:'Logs', liveNet:'LIVE NET', rank:'RANK', settings:'Settings', data:'Cloud Account', quest:'Quests', records:'Records', liveNetRecords:'Network Control', softRank:'Soft Ranking', envSettings:'Settings', dataManage:'Cloud Account', close:'Close',
    logSearchHelp:'Search logs (click a log entry to pin/unpin)', searchPlaceholder:'Type to search...', clearLogs:'Clear Logs', hideLogs:'Hide Logs', showLogs:'Show Logs', logFilter:'Log Filter',
    language:'Language', fontScale:'Font Size', snow:'Snow Effect', uiScale:'UI Scale', animation:'Animation', sfx:'Sound Effects', sfxVolume:'SFX Volume', toastTime:'Toast Duration', autosaveToast:'Autosave Toast', liveNetwork:'LIVE NET', liveNicknameMode:'Network Name', nickname:'Nickname', callsign:'Callsign', enabled:'Enabled', settingsHelp:'· Settings are stored with save data and remain after refresh.',
    saveNow:'Save', loadNow:'Load', clearSave:'Delete Save Data', exportSave:'Export', importFile:'Import File', importText:'Import from Text', importTextPlaceholder:'Paste JSON here and press import.', importTextBtn:'Import Text', saveHelp:'· Save location: cloud account<br/>· Browser storage is used only for automatic cache and migration.',
    shopSortUpdate:'By Update', shopSortNew:'Newest First', shopSortRarity:'By Rarity', shopSortPrice:'By Price', shopSortName:'By Name', codeSortRecent:'Recent', codeSortRarity:'Rarity', codeSortPower:'Power', codeSortLevel:'Level', codeSortName:'Name',
    codexSummary:'Discovered {a} / {b}', discovered:'DISCOVERED', locked:'LOCKED', basePower:'Base Power', ownedLvPwr:'Owned Lv.{lv} / PWR {pwr}', undiscoveredCode:'Undiscovered Code', undiscoveredDesc:'You have not discovered this code yet. Unlock it by scanning codes.', noCodes:'No codes owned. Use [Scan Code] to get one.', selectCode:'Select an owned code to view details.',
    levelLabel:'Level: Lv.{v}', powerLabel:'Power: {v}', usageLabel:'Uses: {v}', shardsLabel:'Duplicate Shards: {v}', syncLabel:'Sync Level: {v}', nextUpgrade:'Next upgrade cost: {v} credits', nextSync:'Next sync cost: {a} shards / expected success bonus +{b}%', evolveReady:'Evolution requirement: Met', evolveNeed:'Evolution requirement: Need Lv.5+', ability:'Ability', noDesc:'No description.',
    missionHeaderDaily:'DAILY QUEST', missionHeaderWeekly:'WEEKLY QUEST', missionHeaderMonth:'MONTH QUEST', missionHeaderGeneral:'GENERAL QUEST', reward:'Reward', none:'None', complete:'Complete', incomplete:'Incomplete', achieved:'Achieved', notYet:'Not Yet', hiddenAchievement:'This is a hidden achievement. It will be revealed when completed.', difficultyEasy:'Easy', difficultyNormal:'Normal', difficultyHard:'Hard', hidden:'HIDDEN', achievementAll:'All', achievementIncomplete:'Incomplete', achievementComplete:'Complete', achievementShowHidden:'Include Hidden',
    full:'FULL', seconds:'sec', minutes:'min', visible:'Visible', on:'ON', off:'OFF',
    saveStateSaved:'Game state saved to cloud cache.', saveComplete:'Cloud cache saved', autosaveComplete:'✅ Autosave cache complete', noSavedData:'No saved data found.', saveLoaded:'Saved data loaded.', saveLoadError:'An error occurred while loading save data.', saveDeleted:'Save data deleted.', exportFail:'Export failed (check console)', hackModeLog:'Hack Mode: {mode}', riskPenaltyLog:'RISK failure penalty consumed 1 additional energy.', extremePenaltyLog:'EXTREME failure penalty consumed 2 additional energy.', gpuUpgradeLog:'GPU upgrade complete! Current tier: {tier} (Credits -{cost})', gpuUpgradeFail:'GPU upgrade failed: not enough credits. (Need: {cost})', loadoutSaved:'Saved current setup to loadout slot {slot}.', loadoutEmpty:'There is no saved setup in loadout slot {slot}.', loadoutLoaded:'Loaded loadout slot {slot}.',
    toastAchievement:'Achievement unlocked: {name}', achievementLog:'[Achievement] {name}', activeCode:'Active code changed: {name}', levelUpLog:'Level up! Reached Lv.{lv}. Credits +50.', noEnergyPack:'No energy packs available.', energyFull:'Energy is already full.', usedEnergyPack:'Used 1 energy pack and fully restored energy.',
    noCodeSync:'There is no code to sync.', syncFailShards:'Code sync failed: not enough duplicate shards. (Need: {need}, Have: {have})', syncDone:'Code sync complete: {name} reached sync stage {lv}. Power +{pwr}, success bonus +{rate}%.', syncToast:'{name} sync stage {lv}', noCodeUpgrade:'There is no code to upgrade. Scan a code first.', upgradeFailCredits:'Code upgrade failed: not enough credits. (Need: {cost})', upgradeDone:'Code upgraded: {name} Lv.{lv} (Power +5 → {pwr}), Credits -{cost}.', noCodeEvolve:'There is no code to evolve.', maxRarity:'Already at the highest rarity (LEGENDARY). It cannot evolve further.', evolveNeedLv:'Code evolution failed: evolution requires at least Lv.5.', evolveCannot:'Cannot process evolution.', evolveDone:'Code evolution success: {name} advanced to {rarity}, Power +10 → {pwr}.', shardEnhanceFail:'Shard boost failed: not enough shards. (Need: {need}, Have: {have})', shardEnhanceDone:'Shard boost: {name} PWR +2 → {pwr}. Shards -{cost}.', shardEnhanceCost:'Shard boost cost: {cost} shards / PWR +2',
    noEnergyScan:'Not enough energy to scan a code.', noEnergyHack:'Not enough energy to hack the server.', energyPackToast:'Energy Pack +1 (Owned: {v})', offlineRecoverLog:'Recovered {v} energy while offline ({label} elapsed)', offlineRecoverToast:'Offline recovery: Energy +{v}', exportDone:'Save data exported.', importDone:'Save data imported.', importFail:'Import failed: please check the JSON format.', emptyText:'The text box is empty.', logsHide:'Hide Logs', logsShow:'Show Logs', initLog:'HCSiG initialized. (language setting, duplicate shards/code sync, mobile UI, shop categories enabled)', mobileHome:'HOME', mobileCodes:'CODES', mobileShop:'SHOP', mobileComing:'COMING SOON', comingSoonToast:'Coming Soon - This feature is in preparation.', buy:'Buy', buyDone:'Purchase complete', buyUnavailable:'Unavailable', buySpendTitle:'Buying this item will consume credits.', buyDailyLimit:'You have reached today\'s purchase limit.', buyOnceLimit:'This permanent item has already been purchased.', notEnoughCredits:'Not enough credits.', shopLog:'[Shop] {msg}', shopBought:'Purchased {name} (💰 -{cost})', missionDoneToast:'Mission complete: {name} ({reward})', missionDoneCredits:'Credits +{v}', missionDoneEnergyPack:'Energy Pack +{v}', missionDoneBoth:'Credits +{c} / Energy Pack +{e}', serverOption:'{name} (Security {sec}, Lv{lv}+)', serverLevelNeed:'You must be at least Lv.{lv} to hack this server.', noOwnedCodes:'You do not own any codes yet. Scan codes first.', scanFound:'New code discovered! {name} [{rarity}]', scanDuplicate:'Duplicate code detected: {name} [{rarity}] → Duplicate Shards +{gain} (Owned {have}).', scanDone:'Code scan complete: EXP +{exp}.', hackSuccessLog:'Server hack success! [{server}] Success chance {chance}%. Credits +{credits}, EXP +{exp}.', hackFailLog:'Server hack failed. [{server}] Success chance was {chance}%.', logDailyShopReset:'[System] Daily shop limits have been reset. (05:00 reset)', loadoutSlot:'Slot {n}', logPinHint:'Click a log entry to pin/unpin it', saveToLocal:'Save the current state to browser LocalStorage.', loadFromLocal:'Load saved data from LocalStorage.', deleteSave:'Delete the saved data.', exportJson:'Export the current save data as a JSON file.', importJsonFile:'Load a JSON save file.', importJsonText:'Load save data from text (JSON).', languageTitle:'Select the game language.', uiScaleTitle:'Adjust the overall UI scale.', toastTitle:'Set how long toast notifications remain on screen.', shopSortTitle:'Choose how shop items are sorted.', codeSortTitle:'Choose how the code inventory is sorted.', dailyResetLabel:'05:00 reset ({n})', onceLabel:'one-time', dailyShort:'daily', onceShort:'once', rarityCommon:'COMMON', rarityUncommon:'UNCOMMON', rarityRare:'RARE', rarityEpic:'EPIC', rarityLegendary:'LEGENDARY', rarityOperation:'OPERATION', routeExternal:'External Route', routeInternal:'Internal Route', routeCore:'Core Route', targetRoute:'Route', upgradeTarget:'Upgrade Target', systemStatus:'System Status', creditsTab:'CREDITS', manualTab:'Manual', difficultyIntro:'Intro', difficultyGeneral:'General', difficultyStandard:'Standard', difficultyHard:'Hard', difficultyChaos:'Chaos', difficultyImpossible:'Impossible', passTab:'PASS', weeklyTab:'WEEKLY', seasonPass:'Season Pass', passPoints:'Pass Points', passTier:'Pass Tier', seasonShop:'Season Shop', opsShop:'OPS Shop', zeroDayOnboarding:'Onboarding', zeroDayPve:'PVE', zeroDayPvp:'PVP', zeroDaySingle:'Single', zeroDayCompete:'Compete', vulnerability:'Vulnerability', vulnerabilityShard:'Vuln. Shard', oneDay:'OneDay', coin:'COIN', token:'TOKEN', accountStatus:'Account & Cloud Status', accountCustom:'Account Custom', comingSoonToastShort:'In preparation.', zeroDayCmdLocale:'ZERO-DAY Command Display', zdCmdAuto:'auto', zdCmdEn:'english', zdCmdKo:'korean', energyRecoveryDesc:'1 energy = 60 seconds'
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
    missionHeaderDaily:'DAILY QUEST', missionHeaderWeekly:'WEEKLY QUEST', missionHeaderMonth:'MONTH QUEST', missionHeaderGeneral:'GENERAL QUEST', reward:'報酬', none:'なし', complete:'完了', incomplete:'未完了', achieved:'達成', notYet:'未達', hiddenAchievement:'隠し実績です。達成時に公開されます。', difficultyEasy:'一般', difficultyNormal:'普通', difficultyHard:'難しい', hidden:'HIDDEN', achievementAll:'全て', achievementIncomplete:'未完了', achievementComplete:'完了', achievementShowHidden:'隠し含む',
    full:'FULL', seconds:'秒', minutes:'分', visible:'表示', on:'ON', off:'OFF',
    saveStateSaved:'ゲーム状態がクラウドキャッシュに保存されました。', saveComplete:'クラウドキャッシュ保存完了', autosaveComplete:'✅ 自動キャッシュ保存完了', noSavedData:'保存データがありません。', saveLoaded:'保存データを読み込みました。', saveLoadError:'保存データの読み込み中にエラーが発生しました。', saveDeleted:'保存データを削除しました。', exportFail:'エクスポート失敗 (コンソール確認)', hackModeLog:'ハッキングモード: {mode}', riskPenaltyLog:'RISK失敗ペナルティ: エネルギーが追加で1消費されました。', extremePenaltyLog:'EXTREME失敗ペナルティ: エネルギーが追加で2消費されました。', gpuUpgradeLog:'GPUアップグレード完了！ 現在のティア: {tier} (消費クレジット {cost})', gpuUpgradeFail:'GPUアップグレード失敗: クレジットが不足しています。 (必要: {cost})', loadoutSaved:'ロードアウトスロット {slot} に現在の設定を保存しました。', loadoutEmpty:'ロードアウトスロット {slot} に保存された設定がありません。', loadoutLoaded:'ロードアウトスロット {slot} を読み込みました。',
    toastAchievement:'実績達成: {name}', achievementLog:'[実績達成] {name}', activeCode:'アクティブコード変更: {name}', levelUpLog:'レベルアップ！ Lv.{lv} 達成。 クレジット +50 付与。', noEnergyPack:'エネルギーパックがありません。', energyFull:'すでにエネルギーが満タンです。', usedEnergyPack:'エネルギーパックを1個使用してエネルギーを最大まで回復しました。',
    noCodeSync:'同期するコードがありません。', syncFailShards:'コード同期失敗: 重複シャードが不足しています。 (必要: {need}, 所持: {have})', syncDone:'コード同期完了: {name} 同期 {lv}段階達成。 パワー +{pwr}, 成功率補正 +{rate}%。', syncToast:'{name} 同期 {lv}段階', noCodeUpgrade:'強化するコードがありません。先にコードをスキャンしてください。', upgradeFailCredits:'コード強化失敗: クレジットが不足しています。 (必要: {cost})', upgradeDone:'コード強化: {name} Lv.{lv} (パワー +5 → {pwr}), クレジット -{cost}。', noCodeEvolve:'進化するコードがありません。', maxRarity:'すでに最上位レアリティ(LEGENDARY)です。これ以上進化できません。', evolveNeedLv:'コード進化失敗: 進化には最低Lv.5以上が必要です。', evolveCannot:'進化を処理できません。', evolveDone:'コード進化成功: {name} が {rarity} に昇格、 パワー +10 → {pwr}。', shardEnhanceFail:'シャード強化失敗: シャードが不足しています。 (必要: {need}, 所持: {have})', shardEnhanceDone:'シャード強化: {name} PWR +2 → {pwr}。 シャード -{cost}。', shardEnhanceCost:'シャード強化コスト: シャード {cost} / PWR +2',
    noEnergyScan:'エネルギーが不足しているためコードスキャンを実行できません。', noEnergyHack:'エネルギーが不足しているためサーバーハッキングを実行できません。', energyPackToast:'エネルギーパック +1 (所持: {v})', offlineRecoverLog:'オフライン中にエネルギー {v} 回復 ({label} 経過)', offlineRecoverToast:'オフライン回復: エネルギー +{v}', exportDone:'保存データのエクスポート完了', importDone:'保存データの読込完了', importFail:'読込失敗: JSON形式を確認してください。', emptyText:'テキストが空です。', logsHide:'ログを隠す', logsShow:'ログを表示', initLog:'HCSiG 初期化完了。 (言語設定、重複シャード/コード同期、モバイルUI、ショップ分類適用)', mobileHome:'HOME', mobileCodes:'CODES', mobileShop:'SHOP', mobileMore:'MORE', mobileLab:'LAB', mobileStage:'データタワー', mobileComing:'COMING SOON', tutorialReplay:'チュートリアル再表示', comingSoonToast:'Coming Soon - 準備中の機能です。', buy:'購入', buyDone:'購入完了', buyUnavailable:'購入不可', buySpendTitle:'購入するとクレジットが消費されます。', buyDailyLimit:'本日の購入制限に達しました。', buyOnceLimit:'すでに購入済みの永久アイテムです。', notEnoughCredits:'クレジットが不足しています。', shopLog:'[ショップ] {msg}', shopBought:'{name} 購入 (💰 -{cost})', missionDoneToast:'ミッション完了: {name} ({reward})', missionDoneCredits:'クレジット +{v}', missionDoneEnergyPack:'エネルギーパック +{v}', missionDoneBoth:'クレジット +{c} / エネルギーパック +{e}', serverOption:'{name} (セキュリティ {sec}, Lv{lv}+)', serverLevelNeed:'このサーバーをハックするには最低 Lv.{lv} 以上が必要です。', noOwnedCodes:'所持コードがありません。先にコードスキャンでコードを取得してください。', scanFound:'新コード発見！ {name} [{rarity}]', scanDuplicate:'重複コード検出: {name} [{rarity}] → 重複シャード +{gain} (所持 {have})。', scanDone:'コードスキャン完了: 経験値 +{exp}。', hackSuccessLog:'サーバーハッキング成功！ [{server}] 成功確率 {chance}%。 クレジット +{credits}, EXP +{exp}。', hackFailLog:'サーバーハッキング失敗。 [{server}] 成功確率 {chance}% でした。', logDailyShopReset:'[システム] デイリーショップ制限がリセットされました。 (05:00 リセット)', loadoutSlot:'スロット {n}', logPinHint:'ログ項目クリック → ピン留め/解除', saveToLocal:'現在の状態をブラウザの LocalStorage に保存します。', loadFromLocal:'LocalStorage から保存データを読み込みます。', deleteSave:'保存データを削除します。', exportJson:'現在の保存データを JSON ファイルにエクスポートします。', importJsonFile:'JSON 保存ファイルを読み込みます。', importJsonText:'テキスト(JSON)で保存データを読み込みます。', languageTitle:'ゲーム言語を選択します。', uiScaleTitle:'全体UIサイズを調整します。', toastTitle:'画面通知(トースト)の表示時間を設定します。', shopSortTitle:'ショップアイテムの並び順を選択します。', codeSortTitle:'コードインベントリの並び順を選択します。', dailyResetLabel:'05:00 リセット ({n}回)', onceLabel:'1回', dailyShort:'デイリー', onceShort:'1回', rarityCommon:'COMMON', rarityUncommon:'UNCOMMON', rarityRare:'RARE', rarityEpic:'EPIC', rarityLegendary:'LEGENDARY', rarityOperation:'OPERATION', routeExternal:'外部ルート', routeInternal:'内部ルート', routeCore:'コアルート', targetRoute:'ルート', upgradeTarget:'アップグレード対象', systemStatus:'システム状態', creditsTab:'CREDITS', manualTab:'マニュアル', difficultyIntro:'入門', difficultyGeneral:'一般', difficultyStandard:'普通', difficultyHard:'難しい', difficultyChaos:'混沌', difficultyImpossible:'不可能', passTab:'PASS', weeklyTab:'WEEKLY', seasonPass:'シーズンパス', passPoints:'パスポイント', passTier:'パスティア', seasonShop:'シーズンショップ', opsShop:'OPSショップ', zeroDayOnboarding:'オンボーディング', zeroDayPve:'PVE', zeroDayPvp:'PVP', zeroDaySingle:'シングル', zeroDayCompete:'競争', vulnerability:'脆弱性', vulnerabilityShard:'脆弱性シャード', oneDay:'OneDay', coin:'COIN', token:'TOKEN', accountStatus:'アカウントとクラウドステータス', accountCustom:'アカウントカスタム', comingSoonToastShort:'準備中です。', zeroDayCmdLocale:'ZERO-DAY コマンド表示', zdCmdAuto:'auto', zdCmdEn:'english', zdCmdKo:'korean', energyRecoveryDesc:'エネルギー1 = 60秒'
  }
};
function getLang(){ return (state && state.ui && state.ui.lang) ? state.ui.lang : 'ko'; }
function t(key, vars){ const lang=getLang(); let str=(I18N[lang]&&I18N[lang][key]) || I18N.ko[key] || key; if(vars){ for(const [k,v] of Object.entries(vars)){ str=str.replaceAll('{'+k+'}', String(v)); } } return str; }
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
  setText('btnScan', t('codeScan')); setText('btnHack', t('serverHack')); setText('btnUpgradeCpu', t('cpuUpgrade')); setText('btnUpgradeGpu', t('gpuUpgrade')); setText('labelTargetServer', t('targetServer')); setText('labelLoadout', t('loadout')); setText('btnSaveLoadout', t('saveSlot')); setText('btnLoadLoadout', t('loadSlot')); setText('labelHackMode', t('hackMode'));
  setText('actionsDesc1', t('actionsDesc1')); setText('actionsDesc2', t('actionsDesc2')); setText('actionsDesc3', t('actionsDesc3')); setText('actionsDesc4', t('actionsDesc4'));
  setText('btnUpgradeCode', t('codeUpgrade')); setText('btnSyncCode', t('codeSync')); setText('btnEvolveCode', t('codeEvolve')); setText('btnModalUpgradeCode', t('codeUpgrade')); setText('btnModalSyncCode', t('codeSync')); setText('btnModalEvolveCode', t('codeEvolve')); setText('btnModalShardCode', t('shardEnhance')); setText('codeDesc1', t('codeDesc1')); setText('codeDesc2', t('codeDesc2')); setText('codeDesc3', t('codeDesc3'));
  setText('tabBtnMission', t('mission')); setText('tabBtnAchievement', t('achievement')); setText('tabBtnCodex', t('codex')); setText('tabBtnLiveNet', t('liveNet')); setText('tabBtnRank', t('rank')); setText('tabBtnSettings', t('settings')); setText('tabBtnSave', t('data'));
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
  ['setSnow','setAnim','setSfx','setLiveNetwork'].forEach(id=>{ const input=document.getElementById(id); if(input && input.parentElement){ input.parentElement.lastChild.textContent = ' ' + t('enabled'); } });
  const ast=document.getElementById('setAutoSaveToast'); if(ast && ast.parentElement){ ast.parentElement.lastChild.textContent = ' ' + t('visible'); }
  const liveNameModeEl=document.getElementById('setLiveNicknameMode'); if(liveNameModeEl){ [...liveNameModeEl.options].forEach(opt=>{ if(opt.value==='nickname') opt.textContent=t('nickname'); if(opt.value==='callsign') opt.textContent=t('callsign'); }); }
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

    // 업데이트 로그
    const updateLogs = [

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
        version: '3.0.0',
        lines: [
          '메인 패널 순서를 SHOP / CODES / HOME / LAB / COMING SOON으로 재배치했습니다.',
          'EVENT를 PASS / WEEKLY CHALLENGE 2패널로 분리하고 월간 시즌제(2026-05부터 시즌 1)를 도입했습니다.',
          '데이터 타워를 BREACH / SHIELD / FOCUS / EXIT 4액션 턴제 전투로 전환하고 에너지 비용을 1로 낮췄습니다.',
          'ZERO-DAY를 온보딩 / PVE / PVP 3모드 정식 시스템으로 재출시했습니다. 터미널 UI와 취약점 재화를 추가했습니다.',
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
      items: { energyPack: 0, weeklyToken: 0, coin: 0, zeroDayVulnerability: 0, zeroDayVulnerabilityShard: 0, oneDay: 0 },
      lastSavedAt: null,
      lastSeenAt: null,
      tutorial: { completed: false, step: 0, seen: false, version: TUTORIAL_VERSION },
      stage: { selectedId: 'stage_001', chapterFilter: '1', highestCleared: 0, cleared: {}, chapterRewardsClaimed: {}, activeBattle: null },
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
      }
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
        { id: 'daily_scan5',   name: '일일 스캐너 I',     type: 'scans',         target: 5,   rewardCredits: 50,  desc: '코드 스캔 5회 수행' },
        { id: 'daily_scan10',  name: '일일 스캐너 II',    type: 'scans',         target: 10,  rewardCredits: 80,  desc: '코드 스캔 10회 수행' },
        { id: 'daily_hack3',   name: '일일 침입자 I',     type: 'hackSuccess',   target: 3,   rewardCredits: 80,  desc: '서버 해킹 성공 3회' },
        { id: 'daily_hack5',   name: '일일 침입자 II',    type: 'hackSuccess',   target: 5,   rewardCredits: 100, desc: '서버 해킹 성공 5회' },
        { id: 'daily_energy30',name: '에너지 소비자',      type: 'energySpent',   target: 30,  rewardCredits: 70,  desc: '에너지 30 소모하기' },
        { id: 'daily_action10_pack', name: '보급 루틴',    type: 'actions',       target: 10,  rewardCredits: 60,  rewardEnergyPack: 1, desc: '코드 스캔/서버 해킹 총 10회 수행' }
      ,
        { id: 'daily_risk1',     name: '일일 리스크',      type: 'riskHackSuccess', target: 1,   rewardCredits: 90,  desc: '위험 해킹 모드로 서버 해킹 성공 1회' },
        { id: 'daily_buy1',      name: '일일 조달',        type: 'shopPurchases',   target: 1,   rewardCredits: 50,  desc: '상점에서 1회 구매하기' }
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

    function getTutorialSteps() {
      if (getLang() === 'en') {
        return [
          {
            title: 'Welcome',
            goal: 'First loop: code -> active code -> NORMAL hack',
            text: 'Your first win is simple. Get one code, activate it, then clear one NORMAL server hack.',
            checklist: ['Energy is spent on scans and hacks.', 'Codes are your equipment.', 'Credits upgrade your setup.'],
            hint: 'Tap Next to start the first loop.'
          },
          {
            title: '1. Scan a Code',
            goal: 'Get your first code',
            text: 'On HOME, press Scan Code. A scan costs 1 energy and gives a small amount of EXP.',
            checklist: ['A new code is added to CODES.', 'Duplicate codes become shards.', 'Shards are used later for Sync.'],
            hint: 'The guide moves aside while you act. Press Scan Code now, or tap Next to keep reading.',
            waitAction: 'scan'
          },
          {
            title: '2. Activate a Code',
            goal: 'Choose the code you want to use',
            text: 'Open CODES and select one owned code. The active code affects hacking and Data Tower attempts.',
            checklist: ['Higher power helps more.', 'Sync raises success bonus.', 'Evolution raises rarity when the code is ready.'],
            hint: 'The guide will not block the screen. Tap a code card, or press Next to continue.',
            waitAction: 'selectCode'
          },
          {
            title: '3. Hack a Server',
            goal: 'Clear one NORMAL hack',
            text: 'Return HOME, keep NORMAL selected, choose an available server, then press Server Hack.',
            checklist: ['NORMAL is the safest starting mode.', 'Success gives credits and EXP.', 'Failure only means you try again after recovering energy.'],
            hint: 'Keep NORMAL selected and try Server Hack, or press Next to keep reading.',
            waitAction: 'hack'
          },
          {
            title: 'Hack Modes',
            goal: 'Pick the right risk level',
            text: 'NORMAL is stable. RISK lowers success for bigger credits. EXTREME opens at Lv.5 and rewards stronger runs.',
            checklist: ['Use NORMAL while learning.', 'Use RISK when your success chance feels safe.', 'Use EXTREME after Lv.5 and better upgrades.'],
            hint: 'You do not need EXTREME at the beginning.'
          },
          {
            title: 'CPU and GPU',
            goal: 'Understand your two upgrade paths',
            text: 'CPU is control and stability. GPU is reward output for repeated play and harder clears.',
            checklist: ['CPU helps success and safer runs.', 'GPU boosts repeat/challenge rewards.', 'Upgrade both over time.'],
            hint: 'Early on, CPU makes the game feel smoother. GPU shines as you repeat content.'
          },
          {
            title: 'Growing Codes',
            goal: 'Make one favorite code stronger',
            text: 'CODES is where you Upgrade, Sync, and Evolve codes. Pick a reliable active code and build around it.',
            checklist: ['Upgrade uses credits.', 'Sync uses duplicate shards.', 'Evolve requires enough level and raises rarity.'],
            hint: 'A focused code is usually better than many untouched codes.'
          },
          {
            title: 'SHOP',
            goal: 'Use the shop when progress slows down',
            text: 'SHOP sells energy, system, economy, and utility items. Filters keep the long list manageable.',
            checklist: ['Energy packs keep sessions moving.', 'Permanent items help long-term growth.', 'Check daily limits before spending.'],
            hint: 'If you are stuck with no energy, come back after recovery or use an energy pack.'
          },
          {
            title: 'LAB',
            goal: 'Open longer goals',
            text: 'LAB contains Data Tower and WEEKLY CHALLENGE. These are your main goals after the first hacks.',
            checklist: ['Data Tower has 100 stages.', 'Weekly Challenge resets Monday 05:00 KST.', 'Rewards are claimed manually.'],
            hint: 'Do not rush Data Tower. Upgrade first, then climb.'
          },
          {
            title: 'LIST, More, and Cloud',
            goal: 'Know where records and account tools live',
            text: 'LIST contains missions and achievements. More contains codex, logs, settings, cloud account, and tutorial replay.',
            checklist: ['Cloud account is the main save path.', 'Logs explain what just happened.', 'Tutorial replay is always in More.'],
            hint: 'GitHub Pages can reload often, so cloud login is the safest way to keep progress.'
          },
          {
            title: 'Ready',
            goal: 'Recommended first route',
            text: 'Scan until you own a code, activate it, clear NORMAL hacks, then use credits on code and CPU upgrades.',
            checklist: ['First: Scan Code.', 'Second: select the code in CODES.', 'Third: hack servers on NORMAL.'],
            hint: 'Tap Start. You are ready.'
          }
        ];
      }
      return [
        {
          title: '환영합니다',
          goal: '첫 루프: 코드 확보 → 활성 코드 선택 → NORMAL 해킹',
          text: '처음 목표는 간단합니다. 코드 1개를 얻고 활성화한 뒤 NORMAL 서버 해킹 1회를 성공시키면 게임 흐름이 잡힙니다.',
          checklist: ['에너지는 스캔과 해킹에 사용됩니다.', '코드는 장비처럼 성장합니다.', '크레딧으로 코드와 장비를 강화합니다.'],
          hint: '다음을 누르면 첫 플레이 루프부터 안내합니다.'
        },
        {
          title: '1. 코드 스캔',
          goal: '첫 코드를 확보하세요',
          text: 'HOME에서 코드 스캔 버튼을 누르세요. 스캔은 에너지 1을 사용하고 소량의 EXP를 줍니다.',
          checklist: ['새 코드는 CODES에 추가됩니다.', '이미 가진 코드는 중복 조각이 됩니다.', '조각은 나중에 동기화에 사용됩니다.'],
          hint: '안내창은 아래로 물러납니다. 지금 코드 스캔을 누르거나, 다음으로 넘겨도 됩니다.',
          waitAction: 'scan'
        },
        {
          title: '2. 활성 코드 선택',
          goal: '사용할 코드를 하나 고르세요',
          text: 'CODES로 이동해 보유 코드 하나를 선택하세요. 활성 코드는 해킹과 데이터 타워 도전에 영향을 줍니다.',
          checklist: ['파워가 높을수록 도움이 됩니다.', '동기화는 성공률 보정을 올립니다.', '진화는 준비된 코드를 더 높은 등급으로 올립니다.'],
          hint: '안내창이 화면 조작을 막지 않습니다. 코드 카드를 누르거나, 다음으로 넘겨도 됩니다.',
          waitAction: 'selectCode'
        },
        {
          title: '3. 서버 해킹',
          goal: 'NORMAL 해킹 1회를 시도하세요',
          text: 'HOME으로 돌아와 NORMAL을 유지하고, 입장 가능한 서버를 고른 뒤 서버 해킹 버튼을 누르세요.',
          checklist: ['NORMAL은 초반에 가장 안정적입니다.', '성공하면 크레딧과 EXP를 얻습니다.', '실패해도 회복 후 다시 시도하면 됩니다.'],
          hint: 'NORMAL을 유지하고 서버 해킹을 눌러보세요. 읽기만 하려면 다음으로 넘겨도 됩니다.',
          waitAction: 'hack'
        },
        {
          title: '해킹 난이도',
          goal: '상황에 맞는 위험도를 고르세요',
          text: 'NORMAL은 안정적입니다. RISK는 성공률이 낮아지는 대신 크레딧이 커지고, EXTREME은 Lv.5부터 열리는 고난도 선택입니다.',
          checklist: ['처음에는 NORMAL을 추천합니다.', '성공률이 충분하면 RISK를 사용하세요.', 'EXTREME은 Lv.5 이후 성장한 뒤 도전하세요.'],
          hint: '초반에는 EXTREME을 신경 쓰지 않아도 됩니다.'
        },
        {
          title: 'CPU와 GPU',
          goal: '두 성장 축을 구분하세요',
          text: 'CPU는 제어와 안정성, GPU는 반복 플레이와 고난도 성공 보상 증폭을 담당합니다.',
          checklist: ['CPU는 성공률과 안정감에 좋습니다.', 'GPU는 반복/도전 보상을 키웁니다.', '장기적으로 둘 다 올리는 것이 좋습니다.'],
          hint: '초반 체감은 CPU가 더 부드럽고, GPU는 반복 콘텐츠에서 빛납니다.'
        },
        {
          title: '코드 성장',
          goal: '마음에 드는 코드 하나를 키우세요',
          text: 'CODES에서는 강화, 동기화, 진화를 진행합니다. 먼저 믿을 만한 활성 코드 하나를 정하고 키우는 것이 좋습니다.',
          checklist: ['강화는 크레딧을 사용합니다.', '동기화는 중복 조각을 사용합니다.', '진화는 레벨 조건을 만족하면 등급을 올립니다.'],
          hint: '초반에는 여러 코드를 조금씩보다 한 코드를 확실히 키우는 편이 쉽습니다.'
        },
        {
          title: 'SHOP',
          goal: '막힐 때 상점을 확인하세요',
          text: 'SHOP에서는 에너지, 시스템, 경제, 유틸 아이템을 구매합니다. 목록이 길면 필터를 사용하세요.',
          checklist: ['에너지 팩은 플레이 흐름을 이어줍니다.', '영구 아이템은 장기 성장에 좋습니다.', '일일 제한과 1회 제한을 확인하세요.'],
          hint: '에너지가 부족하면 회복을 기다리거나 에너지 팩을 사용하면 됩니다.'
        },
        {
          title: 'LAB',
          goal: '장기 목표를 여세요',
          text: 'LAB에는 데이터 타워와 WEEKLY CHALLENGE가 있습니다. 기본 해킹에 익숙해진 뒤 도전하면 좋습니다.',
          checklist: ['데이터 타워는 100개 스테이지입니다.', '주간 챌린지는 월요일 05:00 KST에 갱신됩니다.', '주간 보상은 CLAIM 버튼으로 직접 받습니다.'],
          hint: '데이터 타워는 서두르지 말고 성장 후 올라가면 됩니다.'
        },
        {
          title: 'LIST, 더보기, 클라우드',
          goal: '기록과 계정 위치를 기억하세요',
          text: 'LIST에는 미션과 업적이 있습니다. 더보기에는 도감, 로그, 설정, 클라우드 계정, 튜토리얼 다시 보기가 있습니다.',
          checklist: ['클라우드 계정이 기본 저장 경로입니다.', '로그는 방금 일어난 일을 설명합니다.', '튜토리얼은 더보기에서 다시 볼 수 있습니다.'],
          hint: 'GitHub Pages는 새로고침이 잦을 수 있으니 클라우드 로그인 상태가 가장 안전합니다.'
        },
        {
          title: '준비 완료',
          goal: '추천 첫 진행 순서',
          text: '코드를 스캔하고, CODES에서 활성화한 뒤, NORMAL 해킹을 반복하며 크레딧으로 코드와 CPU를 강화하세요.',
          checklist: ['첫째: 코드 스캔.', '둘째: CODES에서 코드 선택.', '셋째: NORMAL 서버 해킹.'],
          hint: '시작하기를 누르면 바로 플레이할 수 있습니다.'
        }
      ];
    }

    function getDayKey() {
      return new Date().toISOString().slice(0, 10);
    }
    const DAY_MS = 24 * 60 * 60 * 1000;
    const KST_WEEK_RESET_OFFSET_MS = 4 * 60 * 60 * 1000; // UTC + 9h, then 05:00 KST reset.
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
    function getMonthKey() {
      const d = new Date();
      return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
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

    function setProgressTier(tierId) {
      if (!PROGRESS_TIERS[tierId]) return;
      ensureWeeklyChallengeDefaults();
      state.weeklyChallenge.progressTierCurrent = tierId;
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
      const weekKey = getWeekKey();
      if (wc.weekKey !== weekKey) {
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
      const isEn = getLang() === 'en';
      el.innerHTML = `
        <div class="progress-tier-header">
          <span class="badge">PROGRESS</span>
          <strong>${isEn ? 'Weekly Difficulty' : '주간 난이도'}</strong>
          <span class="progress-tier-note">${isEn ? '(applied next reset)' : '(다음 리셋 시 적용)'}</span>
        </div>
        <div class="progress-tier-grid">
          ${Object.values(PROGRESS_TIERS).map(tier => {
            const totalPicks = (tier.picks.normal||0) + (tier.picks.medium||0) + (tier.picks.hard||0);
            return `
            <button type="button" class="progress-tier-btn ${tier.id === currentTier.id ? 'active' : ''}"
              data-progress-tier="${tier.id}">
              <strong>${isEn ? tier.en : tier.ko}</strong>
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
    }


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
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      const now = ctx.currentTime + 0.005;
      const v = getSfxVolume();

      switch (name) {
        case 'tap':
          if (Date.now() - sfxState.lastTapAt < 55) return;
          sfxState.lastTapAt = Date.now();
          playTone(ctx, now, 520, 0.045, 'triangle', 0.035 * v, 760);
          break;
        case 'scanStart':
          playNoise(ctx, now, 0.11, 0.028 * v, 1800);
          playTone(ctx, now + 0.04, 440, 0.08, 'sawtooth', 0.018 * v, 880);
          break;
        case 'scanComplete':
          playTone(ctx, now, 660, 0.07, 'sine', 0.04 * v, 990);
          playTone(ctx, now + 0.065, 990, 0.08, 'sine', 0.032 * v, 1320);
          break;
        case 'success':
          playTone(ctx, now, 523.25, 0.08, 'triangle', 0.045 * v, 659.25);
          playTone(ctx, now + 0.07, 783.99, 0.11, 'triangle', 0.04 * v, 1046.5);
          break;
        case 'fail':
          playTone(ctx, now, 260, 0.12, 'sawtooth', 0.04 * v, 140);
          playNoise(ctx, now + 0.03, 0.10, 0.016 * v, 360);
          break;
        case 'upgrade':
          playTone(ctx, now, 392, 0.07, 'square', 0.026 * v, 587);
          playTone(ctx, now + 0.065, 784, 0.10, 'triangle', 0.042 * v, 1175);
          break;
        case 'achievement':
          playTone(ctx, now, 660, 0.08, 'sine', 0.038 * v, 880);
          playTone(ctx, now + 0.07, 990, 0.09, 'sine', 0.036 * v, 1320);
          playTone(ctx, now + 0.15, 1320, 0.12, 'triangle', 0.03 * v, 1760);
          break;
        case 'level':
          playTone(ctx, now, 392, 0.10, 'triangle', 0.035 * v, 523);
          playTone(ctx, now + 0.09, 659, 0.11, 'triangle', 0.04 * v, 880);
          playTone(ctx, now + 0.19, 1046, 0.13, 'sine', 0.032 * v, 1318);
          break;
        case 'mode':
          playTone(ctx, now, 330, 0.06, 'triangle', 0.028 * v, 660);
          playTone(ctx, now + 0.05, 440, 0.07, 'square', 0.018 * v, 880);
          break;
        case 'stage':
          playNoise(ctx, now, 0.08, 0.018 * v, 900);
          playTone(ctx, now + 0.035, 220, 0.09, 'sawtooth', 0.026 * v, 440);
          break;
        default:
          playTone(ctx, now, 600, 0.06, 'sine', 0.025 * v, 720);
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
      state.level++;
      state.requiredExp = requiredExp(state.level);
      state.credits += 50;
      state.stats.creditsEarnedTotal += 50;
      playSfx('level');
      log(t('levelUpLog', { lv: state.level }), 'level');

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
        state.missionProgress.weekly.energy0Reached = true;
        state.missionProgress.month.energy0Reached  = true;
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
        syncLevel: 0
      });
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
        meta.textContent = owned
          ? `[${localizeRarityLabel(def.rarity)}] ${t('basePower')} ${def.basePower} · ${t('ownedLvPwr', { lv: owned.level, pwr: owned.power })}`
          : `[${localizeRarityLabel(def.rarity)}] ${t('undiscoveredCode')}`;
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
        const nameEl = document.createElement('strong');
        nameEl.textContent = code.name;
        const rarityClass = 'rarity-' + code.rarity.toLowerCase();
        nameEl.classList.add(rarityClass);
        const shardEl = document.createElement('span');
        shardEl.textContent = `${localizeRarityLabel(code.rarity)} · 조각 ${code.shards || 0}`;
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
      return `
        <div class="code-modal-identity">
          <strong class="${rarityClass}">${code.name}</strong>
          <span class="rarity-tag ${rarityClass}">[${localizeRarityLabel(code.rarity)}]</span>
        </div>
        <div class="code-modal-stat-grid">
          <div class="small">${t('levelLabel', { v: code.level })}</div>
          <div class="small">${t('powerLabel', { v: code.power })}</div>
          <div class="small">${t('usageLabel', { v: usage })}</div>
          <div class="small">${t('shardsLabel', { v: shardCount })}</div>
          <div class="small">${t('syncLabel', { v: syncLevel })}</div>
        </div>
        <div class="code-modal-cost-grid">
          <div class="small code-next-meta">${t('nextUpgrade', { v: upgradeCost })}</div>
          <div class="small code-next-meta">${t('nextSync', { a: syncCost, b: syncBonusText })}</div>
          <div class="small code-next-meta">${t('shardEnhanceCost', { cost: shardBoostCost })}</div>
          <div class="small code-next-meta">${evolveReady ? t('evolveReady') : t('evolveNeed')}</div>
        </div>
        <div class="code-modal-ability">
          <div class="small">${t('ability')}</div>
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
    const SEASON_START_DATE = new Date('2026-05-01T05:00:00+09:00');

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
          : (getLang() === 'en' ? `New season: ${key} (PASS/PVP reset)` : `새 시즌: ${key} (PASS/PVP 리셋)`);
        log(`[SEASON] ${msg}`, 'system');
        try { showToast(msg, 'achievement'); } catch(e) {}
      }
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
      // v3.0.0: 티어 25 도달 시 Quartz Terminal 스킨 자동 해금 (시즌 보상)
      if (tNum >= 25 && state.season.currentNumber >= 1) {
        try { unlockZdSkin('quartz_terminal'); } catch(e) {}
      }
      const msg = getLang() === 'en'
        ? `Pass Tier ${tNum} claimed: ${reward.credits ? 'Credits +'+reward.credits : ''}${reward.energyPack ? ' EnergyPack +'+reward.energyPack : ''}${reward.coin ? ' COIN +'+reward.coin : ''}`
        : `패스 티어 ${tNum} 수령: ${reward.credits ? '크레딧 +'+reward.credits : ''}${reward.energyPack ? ' 에너지팩 +'+reward.energyPack : ''}${reward.coin ? ' COIN +'+reward.coin : ''}`;
      log(msg, 'system');
      showToast(msg, 'achievement');
      updateStatsUI();
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
      const seasonLabel = isPreseason
        ? (getLang()==='en' ? 'PRESEASON' : 'PRESEASON')
        : (getLang()==='en' ? `Season ${num} · ZERO-DAY` : `시즌 ${num} · ZERO-DAY`);

      // v3.0.0: 프리시즌 카운트다운 계산
      let preseasonDaysLeft = 0;
      if (isPreseason) {
        const msLeft = SEASON_START_DATE.getTime() - Date.now();
        preseasonDaysLeft = Math.max(0, Math.ceil(msLeft / (24 * 60 * 60 * 1000)));
      }

      el.innerHTML = `
        <div class="pass-header">
          <span class="badge">${seasonLabel}</span>
          ${!isPreseason ? '' : ''}
        </div>
        ${isPreseason ? `
        <!-- v3.0.0: 프리시즌 안내 카드 (여백 축소, 정보 밀도 향상) -->
        <div class="pass-preseason-card">
          <div class="pass-preseason-title">${getLang()==='en' ? 'Season 1 — ZERO-DAY' : '시즌 1 — ZERO-DAY'}</div>
          <div class="pass-preseason-countdown">${preseasonDaysLeft > 0
            ? (getLang()==='en' ? `Starts in ${preseasonDaysLeft} day(s)` : `시작까지 ${preseasonDaysLeft}일`)
            : (getLang()==='en' ? 'Starting soon' : '곧 시작')}</div>
          <div class="pass-preseason-date">${getLang()==='en' ? '2026-05-01 05:00 KST' : '2026-05-01 05:00 KST'}</div>
          <div class="pass-preseason-note small">${getLang()==='en' ? 'PASS rewards will unlock when Season 1 begins.' : '시즌 1이 시작되면 PASS 보상이 활성화됩니다.'}</div>
        </div>
        ` : `
        <div class="pass-progress-row">
          <span>${getLang()==='en' ? 'Tier' : '티어'} ${tier} / ${PASS_MAX_TIER}</span>
          <div class="pass-bar"><div class="pass-bar-fill" style="width:${Math.round(ptsInTier)}%"></div></div>
          <span>${ptsInTier} / ${PASS_POINTS_PER_TIER} pts</span>
        </div>
        <div class="pass-tier-list">
          ${passTierRewards.map(r => {
            const reached  = tier >= r.tier;
            const claimed  = !!state.season.passClaimed[String(r.tier)];
            const canClaim = reached && !claimed;
            const parts = [];
            if (r.credits)     parts.push(`+${r.credits}cr`);
            if (r.energyPack)  parts.push(`+${r.energyPack}EP`);
            if (r.weeklyToken) parts.push(`+${r.weeklyToken}TK`);
            if (r.coin)        parts.push(`+${r.coin}COIN`);
            return `<div class="pass-tier-row ${claimed ? 'claimed' : ''} ${canClaim ? 'can-claim' : ''} ${reached && !claimed ? 'reached' : ''}">
              <span class="pass-tier-num">T${r.tier}</span>
              <span class="pass-tier-reward">${parts.join(' ')}</span>
              <button type="button" data-claim-tier="${r.tier}" ${canClaim ? '' : 'disabled'}>${claimed ? (getLang()==='en' ? 'Claimed' : '수령') : (getLang()==='en' ? 'Claim' : '수령')}</button>
            </div>`;
          }).join('')}
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

    function renderOpsShopHTML() {
      const token = state.items.weeklyToken || 0;
      const score = state.weeklyChallenge ? (state.weeklyChallenge.score || 0) : 0;
      return `<div class="ops-shop">
        <h4 class="section-title">${getLang()==='en' ? 'OPS Shop' : 'OPS 상점'}</h4>
        <p class="small">${getLang()==='en' ? `TOKEN: ${token} · SCORE: ${score}` : `TOKEN: ${token} · SCORE: ${score}`}</p>
        <div class="ops-shop-list">
          ${opsShopDefs.map(item => {
            const locked  = score < item.scoreGate;
            const noToken = token < item.tokenCost;
            const name = getLang()==='en' ? item.nameEn : item.nameKo;
            const desc = getLang()==='en' ? item.descEn : item.desc;
            return `<div class="ops-shop-item ${locked ? 'locked' : ''}">
              <span class="item-name">${name}</span>
              <span class="item-cost">${item.tokenCost} TOKEN${item.scoreGate > 0 ? ` · SCORE ${item.scoreGate}+` : ''}</span>
              <span class="item-desc small">${desc}</span>
              <button type="button" data-ops-buy="${item.id}" ${(locked || noToken) ? 'disabled' : ''}>${locked ? (getLang()==='en' ? `Score ${item.scoreGate}+ needed` : `SCORE ${item.scoreGate}+ 필요`) : (getLang()==='en' ? 'Buy' : '구매')}</button>
            </div>`;
          }).join('')}
        </div>
      </div>`;
    }

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
    const ZD_CMDS = {
      scan:       { ko: '정찰', group: 'recon' },
      probe:      { ko: '탐지', group: 'recon' },
      enum:       { ko: '열거', group: 'recon' },
      breach:     { ko: '침투', group: 'infiltrate' },
      inject:     { ko: '주입', group: 'infiltrate' },
      elevate:    { ko: '승격', group: 'infiltrate' },
      bypass:     { ko: '우회', group: 'infiltrate' },
      mask:       { ko: '은폐', group: 'conceal' },
      cloak:      { ko: '차폐', group: 'conceal' },
      wipe:       { ko: '삭제', group: 'conceal' },
      scrub:      { ko: '정리', group: 'conceal' },
      spoof:      { ko: '위장', group: 'disrupt' },
      reroute:    { ko: '재경로', group: 'disrupt' },
      jam:        { ko: '교란', group: 'disrupt' },
      decoy:      { ko: '미끼', group: 'disrupt' },
      exfil:      { ko: '회수', group: 'exit' },
      exit:       { ko: '종료', group: 'exit' },
      disconnect: { ko: '절단', group: 'exit' }
    };

    function zdCmdDisplay(id) {
      const locale = (state.ui && state.ui.zeroDayCommandLocale) || 'auto';
      const lang = getLang();
      if (locale === 'english') return id;
      if (locale === 'korean')  return ZD_CMDS[id] ? ZD_CMDS[id].ko : id;
      // auto: match ui language
      if (lang === 'ko' && ZD_CMDS[id]) return ZD_CMDS[id].ko;
      return id;
    }

    function parseZdCmd(input) {
      const raw = String(input || '').trim().toLowerCase();
      if (ZD_CMDS[raw]) return raw;
      // Korean alias lookup
      for (const [id, def] of Object.entries(ZD_CMDS)) {
        if (raw === def.ko) return id;
      }
      return null;
    }

    // handleZdInput: bridge between text/button input and ZD action system
    function handleZdInput(raw) {
      const cmdId = parseZdCmd(raw);
      if (!cmdId) {
        // Unknown command — echo to terminal output if there's an active run
        const zd = state.zeroDay || {};
        if (zd.pve && zd.pve.active) {
          const el = document.getElementById('zeroDayPanel');
          if (el) {
            const out = el.querySelector('.zd-term-output');
            if (out) {
              const line = document.createElement('div');
              line.className = 'zd-line zd-error';
              line.textContent = `root@zeroday:~# ${raw}: command not found`;
              out.appendChild(line);
              out.scrollTop = out.scrollHeight;
            }
          }
        }
        return;
      }
      doZdPveAction(cmdId);
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

    // ── ZD Node Types (12종) ─────────────────────────────────────────────
    // detMult: detection gain multiplier for this node type
    // sigMult: signal gain multiplier
    // cpuCheck / gpuCheck: whether high CPU/GPU tier reduces detection
    const ZD_NODE_TYPES = {
      ENTRY:    { id:'ENTRY',    ko:'진입점', en:'Entry Point', detMult:0.5,  sigMult:0.3,  cpuCheck:false, gpuCheck:false },
      HUB:      { id:'HUB',     ko:'허브',   en:'Hub',         detMult:0.8,  sigMult:0.6,  cpuCheck:false, gpuCheck:false },
      CORE:     { id:'CORE',    ko:'코어',   en:'Core',        detMult:1.4,  sigMult:2.0,  cpuCheck:false, gpuCheck:false },
      FIREWALL: { id:'FIREWALL',ko:'방화벽', en:'Firewall',    detMult:1.6,  sigMult:0.8,  cpuCheck:true,  gpuCheck:false },
      IDS:      { id:'IDS',     ko:'침입탐지',en:'IDS',        detMult:2.0,  sigMult:1.0,  cpuCheck:false, gpuCheck:false },
      DECOY:    { id:'DECOY',   ko:'미끼',   en:'Decoy',       detMult:0.3,  sigMult:0.1,  cpuCheck:false, gpuCheck:false },
      CPU_LOCK: { id:'CPU_LOCK',ko:'CPU잠금',en:'CPU Lock',    detMult:1.4,  sigMult:1.2,  cpuCheck:true,  gpuCheck:false },
      GPU_LOCK: { id:'GPU_LOCK',ko:'GPU잠금',en:'GPU Lock',    detMult:1.4,  sigMult:1.2,  cpuCheck:false, gpuCheck:true  },
      CACHE:    { id:'CACHE',   ko:'캐시',   en:'Cache Node',  detMult:0.6,  sigMult:1.5,  cpuCheck:false, gpuCheck:false },
      WIPE:     { id:'WIPE',    ko:'와이프', en:'Wipe',        detMult:0.8,  sigMult:0.0,  cpuCheck:false, gpuCheck:false },
      TRAP:     { id:'TRAP',    ko:'트랩',   en:'Trap',        detMult:2.5,  sigMult:0.5,  cpuCheck:false, gpuCheck:false },
      EXIT:     { id:'EXIT',    ko:'출구',   en:'Exit Node',   detMult:0.2,  sigMult:0.0,  cpuCheck:false, gpuCheck:false }
    };

    // Node pools per difficulty: array of node type ids to sample from
    const ZD_NODE_POOLS = {
      intro:  ['ENTRY','HUB','CACHE','DECOY','EXIT'],
      easy:   ['ENTRY','HUB','HUB','CACHE','FIREWALL','EXIT'],
      normal: ['ENTRY','HUB','FIREWALL','IDS','CACHE','CPU_LOCK','GPU_LOCK','DECOY','EXIT'],
      hard:   ['ENTRY','FIREWALL','IDS','IDS','CPU_LOCK','GPU_LOCK','CORE','TRAP','CACHE','EXIT'],
      danger: ['ENTRY','FIREWALL','FIREWALL','IDS','IDS','CPU_LOCK','GPU_LOCK','CORE','TRAP','TRAP','WIPE','EXIT']
    };

    function generateZdNodeSequence(diff) {
      const pool = ZD_NODE_POOLS[diff] || ZD_NODE_POOLS.easy;
      const def  = ZD_PVE_DIFFICULTIES[diff] || ZD_PVE_DIFFICULTIES.easy;
      const len  = def.depthMax;
      const seq  = ['ENTRY'];
      const mid  = pool.filter(n => n !== 'ENTRY' && n !== 'EXIT');
      while (seq.length < len - 1) {
        seq.push(mid[Math.floor(Math.random() * mid.length)]);
      }
      seq.push('EXIT');
      return seq;
    }

    // ── Detection Stages (5단계) ─────────────────────────────────────────
    function getZdDetectionStage(detection) {
      if (detection >= 1.0)  return { id:'FAILED',   label:'FAILED',   ko:'실패',  color:'#ff2020' };
      if (detection >= 0.81) return { id:'LOCKDOWN', label:'LOCKDOWN', ko:'봉쇄',  color:'#ff6600' };
      if (detection >= 0.51) return { id:'PURSUIT',  label:'PURSUIT',  ko:'추적',  color:'#ffaa00' };
      if (detection >= 0.26) return { id:'CAUTION',  label:'CAUTION',  ko:'경계',  color:'#ffee00' };
      return                         { id:'SAFE',     label:'SAFE',     ko:'안전',  color:'#00ff88' };
    }

    // ── Code ZD Tags (5종 분류) ──────────────────────────────────────────
    const CODE_ZD_TAGS = {
      basic:'정찰',         port_scanner:'침투',     pulse_ping:'정찰',
      cache_sniffer:'정찰', shield_bypass:'침투',    stack_tracer:'침투',
      credit_siphon:'교란', fallback_node:'방어',    data_phantom:'침투',
      auto_patch:'방어',    trace_scrambler:'은폐',  null_rewriter:'교란',
      rapid_exploit:'침투', overflow_inject:'교란',  fortress_breaker:'침투',
      quantum_splice:'침투',ghost_script:'은폐',     singularity_root:'침투',
      scan_cache:'정찰',    rarity_lens:'정찰',      shard_magnet:'정찰',
      deep_indexer:'정찰',  prism_crawler:'정찰',    oracle_spider:'정찰',
      signal_anchor:'침투', kernel_probe:'침투',     handshake_forge:'침투',
      exploit_router:'침투',zero_day_seed:'침투',    root_oracle:'침투',
      coin_tap:'교란',      bounty_hook:'교란',      exp_stream:'교란',
      vault_siphon:'교란',  reward_kernel:'교란',    jackpot_daemon:'교란',
      risk_buffer:'방어',   trace_anchor:'방어',     extreme_buffer:'방어',
      overclock_guard:'방어',abyss_contract:'침투',  singular_gambit:'침투',
      stage_marker:'침투',  chapter_key:'침투',      trial_compass:'침투',
      boss_keygen:'침투',   repeat_engine:'침투',    stage_sovereign:'침투',
      operation_meridian:'침투', operation_blackout:'교란'
    };

    const ZD_PVE_DIFFICULTIES = {
      intro:  { label: '입문', labelEn: 'Intro',  depthMax: 6,  detectionRate: 0.08, signalPerNode: 8,  baseScore: 50,  free: true },
      easy:   { label: '쉬움', labelEn: 'Easy',   depthMax: 8,  detectionRate: 0.12, signalPerNode: 12, baseScore: 100 },
      normal: { label: '보통', labelEn: 'Normal', depthMax: 10, detectionRate: 0.16, signalPerNode: 18, baseScore: 180 },
      hard:   { label: '어려움',labelEn: 'Hard',  depthMax: 12, detectionRate: 0.22, signalPerNode: 25, baseScore: 280 },
      danger: { label: '위험', labelEn: 'Danger', depthMax: 14, detectionRate: 0.30, signalPerNode: 35, baseScore: 450 }
    };

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
        descKo:'정찰 명령(scan/probe/enum) 사용 시 탐지 -25%',
        descEn:'Recon commands (scan/probe/enum) cause -25% detection',
        condition:{ type:'pveRuns', target:30 },
        cost:{ currency:'oneDay', amount:300 },
        effect:{ reconDetectionMult:0.75 }
      },
      protocol_breaker: {
        id:'protocol_breaker',
        ko:'BREAKER', en:'BREAKER',
        descKo:'침투 명령(breach/inject/elevate/bypass) 성공률 +15%',
        descEn:'Infiltrate commands +15% success rate',
        condition:{ type:'pvpWins', target:5 },
        cost:{ currency:'oneDay', amount:500 },
        effect:{ infiltrateSuccessBonus:0.15 }
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

    function canStartZdPve() {
      const diff = (state.zeroDay.pve && state.zeroDay.pve.difficulty) || 'easy';
      const def = ZD_PVE_DIFFICULTIES[diff] || ZD_PVE_DIFFICULTIES.easy;
      if (def.free) {
        // intro: free once per day
        const todayKey = new Date().toISOString().slice(0,10);
        if ((state.zeroDay.pve.introDailyKey || '') === todayKey) {
          return { ok: false, reason: getLang()==='en' ? 'Intro free run already used today.' : '오늘 입문 무료 런을 이미 사용했습니다.' };
        }
        return { ok: true };
      }
      // v3.0.0 fix: 단일 게터 사용 (UI/검사 일관성 보장)
      if (getZdVulnCount() < 1) {
        return { ok: false, reason: getLang()==='en' ? 'Need 1 Vulnerability to start PVE.' : 'PVE 시작에 취약점 1개가 필요합니다.' };
      }
      return { ok: true };
    }

    function startZdPve() {
      ensureZeroDayDefaults();
      if (!state.zeroDay.onboardingCompleted) {
        showToast(getLang()==='en' ? 'Complete the onboarding first.' : '먼저 온보딩을 완료하세요.', 'warn');
        renderZeroDayPanel();
        return;
      }
      const check = canStartZdPve();
      if (!check.ok) { showToast(check.reason, 'warn'); return; }
      const diff = (state.zeroDay.pve && state.zeroDay.pve.difficulty) || 'easy';
      const def  = ZD_PVE_DIFFICULTIES[diff];
      // v3.0.0 fix: run 객체를 먼저 빌드, 성공 후 차감 (실패 시 차감 롤백)
      let nodeSeq, runActive;
      try {
        nodeSeq = generateZdNodeSequence(diff);
        if (!nodeSeq || !nodeSeq.length) throw new Error('empty node sequence');
        runActive = {
          diff,
          depth: 0,
          detection: 0,
          signal: 0,
          score: 0,
          nodes: nodeSeq,
          log: [`root@zeroday:~# info: ${getLang()==='en' ? 'Run started' : '런 시작'} · ${def.labelEn} · depth 0/${def.depthMax} · node: ${nodeSeq[0]}`],
          startedAt: Date.now()
        };
      } catch (err) {
        console.error('[ZD PVE] Failed to build run:', err);
        showToast(getLang()==='en' ? 'PVE start failed. Try again.' : 'PVE 시작 실패 — 다시 시도하세요.', 'warn');
        return; // ← 차감 안 함
      }

      // v3.0.0 fix: run 빌드 성공 → 이제 차감 (실패 시 vuln 보호)
      if (def.free) {
        const todayKey = new Date().toISOString().slice(0,10);
        state.zeroDay.pve.introDailyKey = todayKey;
      } else {
        if (!consumeZdVuln(1)) {
          showToast(getLang()==='en' ? 'Vulnerability count out of sync. Refreshing...' : '취약점 수가 일치하지 않습니다. 갱신 중...', 'warn');
          renderZeroDayPanel();
          return;
        }
      }

      state.zeroDay.pve.active = runActive;
      state.zeroDay.pve.runs = (state.zeroDay.pve.runs || 0) + 1;
      state.stats.zeroDayRunCount = (state.stats.zeroDayRunCount || 0) + 1;
      // Track in weekly/monthly mission progress
      state.missionProgress.weekly.zeroDayRuns = (state.missionProgress.weekly.zeroDayRuns || 0) + 1;
      state.missionProgress.month.zeroDayRuns  = (state.missionProgress.month.zeroDayRuns  || 0) + 1;
      checkMissions('weekly');
      checkMissions('month');
      playSfx('hack');
      renderZeroDayPanel();
      saveGame(true);
    }

    function doZdPveAction(cmdId) {
      ensureZeroDayDefaults();
      const run = state.zeroDay.pve.active;
      if (!run) return;
      const def = ZD_PVE_DIFFICULTIES[run.diff] || ZD_PVE_DIFFICULTIES.easy;
      const cmd = parseZdCmd(cmdId) || cmdId;
      const logPush = (line) => {
        run.log.push(line);
        if (run.log.length > 20) run.log.shift();
      };

      if (cmd === 'exfil' || cmd === 'exit' || cmd === 'disconnect') {
        const extracted = run.detection < 1.0;
        finishZdPveRun(extracted, run, def);
        return;
      }

      // Current node type
      const nodes    = run.nodes || [];
      const curNodeId = nodes[Math.min(run.depth, nodes.length - 1)] || 'HUB';
      const curNode  = ZD_NODE_TYPES[curNodeId] || ZD_NODE_TYPES.HUB;

      // Detection stage pressure
      const stage = getZdDetectionStage(run.detection);

      const group = ZD_CMDS[cmd] ? ZD_CMDS[cmd].group : 'infiltrate';
      let detectionGain = def.detectionRate * curNode.detMult;
      let signalGain    = 0;
      let depthGain     = 0;
      let extra         = '';

      // Stage pressure effects
      if (stage.id === 'LOCKDOWN') {
        detectionGain *= 1.5; // LOCKDOWN: extra pressure
      } else if (stage.id === 'PURSUIT') {
        detectionGain *= 1.2;
      }

      // CPU/GPU check: high tier reduces detection for locked nodes
      if (curNode.cpuCheck) {
        const cpuBonus = Math.max(0.3, 1 - 0.04 * Math.max(0, (state.cpuTier || 1) - 1));
        detectionGain *= cpuBonus;
      }
      if (curNode.gpuCheck) {
        const gpuBonus = Math.max(0.3, 1 - 0.04 * Math.max(0, (state.gpuTier || 1) - 1));
        detectionGain *= gpuBonus;
      }

      if (group === 'recon') {
        detectionGain *= 0.4;
        signalGain = Math.round(def.signalPerNode * curNode.sigMult * 0.5);
        extra = getLang()==='en'
          ? `ok: [${curNode.en}] recon data +${signalGain} sig`
          : `ok: [${curNode.ko}] 정찰 데이터 +${signalGain} sig`;
      } else if (group === 'infiltrate') {
        depthGain = 1;
        signalGain = Math.round(def.signalPerNode * curNode.sigMult);
        const nextNodeId = nodes[Math.min(run.depth + 1, nodes.length - 1)] || 'EXIT';
        extra = getLang()==='en'
          ? `ok: [${curNode.en}] breached → next: ${nextNodeId} · depth +1, signal +${signalGain}`
          : `ok: [${curNode.ko}] 침투 → 다음: ${nextNodeId} · 깊이 +1, 신호 +${signalGain}`;
      } else if (group === 'conceal') {
        // PURSUIT/LOCKDOWN: conceal is less effective
        const eff = stage.id === 'LOCKDOWN' ? 0.3 : stage.id === 'PURSUIT' ? 0.5 : 0.8;
        const reduce = def.detectionRate * eff;
        run.detection = Math.max(0, run.detection - reduce);
        detectionGain = 0;
        extra = getLang()==='en'
          ? `ok: detection reduced by ${Math.round(reduce*100)}% (stage: ${stage.label})`
          : `ok: 탐지율 ${Math.round(reduce*100)}% 감소 (단계: ${stage.ko})`;
      } else if (group === 'disrupt') {
        detectionGain *= 0.6;
        signalGain = Math.round(def.signalPerNode * curNode.sigMult * 0.5);
        extra = getLang()==='en'
          ? `ok: [${curNode.en}] disruption +${signalGain} sig`
          : `ok: [${curNode.ko}] 교란 +${signalGain} sig`;
      }

      run.detection = Math.min(1.0, run.detection + detectionGain);
      run.depth     = Math.min(def.depthMax, run.depth + depthGain);
      run.signal    += signalGain;
      run.score     += Math.round(signalGain * (1 + run.depth * 0.1));

      const newStage = getZdDetectionStage(run.detection);
      const detPct   = Math.round(run.detection * 100);
      logPush(`root@zeroday:~# ${zdCmdDisplay(cmd)}`);
      if (extra) logPush(extra);
      logPush(`info: ${newStage.label} ${detPct}% · depth ${run.depth}/${def.depthMax} · signal ${run.signal}`);

      if (run.detection >= 1.0) {
        logPush(`fatal: ${getLang()==='en' ? 'TRACE COMPLETE — connection terminated' : 'TRACE COMPLETE — 연결 종료'}`);
        finishZdPveRun(false, run, def);
        return;
      }

      renderZeroDayPanel();
      saveGame(true);
    }

    function finishZdPveRun(extracted, run, def) {
      const score = run.score || 0;
      const signal = run.signal || 0;
      const depth = run.depth || 0;
      const rewardCredits = extracted ? Math.round(def.baseScore * 0.8 + score * 0.5) : 0;
      // OneDay: 30–80 range for PVE (spec v3.0.0)
      let rewardOneDay = extracted
        ? Math.min(80, Math.max(30, Math.round(30 + 50 * (depth / Math.max(1, def.depthMax)))))
        : Math.round(depth * 2);
      // v3.0.0: OVERLORD 프로토콜 — 탈출 시 OneDay +20%
      const protoEff = getZdProtocolEffectSum();
      if (extracted && protoEff.exitOneDayBonus > 0) {
        rewardOneDay = Math.round(rewardOneDay * (1 + protoEff.exitOneDayBonus));
      }
      state.zeroDay.pve.active = null;
      state.zeroDay.pve.bestDepth = Math.max(state.zeroDay.pve.bestDepth || 0, depth);
      state.zeroDay.pve.bestScore = Math.max(state.zeroDay.pve.bestScore || 0, score);
      if (extracted) {
        state.zeroDay.pve.extracts = (state.zeroDay.pve.extracts || 0) + 1;
        state.stats.zeroDayPveClearCount  = (state.stats.zeroDayPveClearCount || 0) + 1;
        state.stats.zeroDayPveEscapeCount = (state.stats.zeroDayPveEscapeCount || 0) + 1;
        // Track difficulty for PVP recommendation
        const diffOrder = ['intro','easy','normal','hard','danger'];
        const diffIdx   = diffOrder.indexOf(run.diff);
        const bestDiffIdx = diffOrder.indexOf(state.stats.zeroDayBestExtractDiff || 'intro');
        if (diffIdx > bestDiffIdx) state.stats.zeroDayBestExtractDiff = run.diff;
        // Track clean extract with detection < 50% for PVP recommendation
        if ((run.detection || 0) < 0.5) {
          state.stats.zeroDayLowDetectionExtracts = (state.stats.zeroDayLowDetectionExtracts || 0) + 1;
        }
      }
      if (rewardCredits) { state.credits += rewardCredits; state.stats.creditsEarnedTotal += rewardCredits; }
      if (rewardOneDay)  { state.items.oneDay = (state.items.oneDay || 0) + rewardOneDay; state.stats.zeroDayOneDayEarnedTotal += rewardOneDay; }
      // pass points
      addPassPoints(extracted ? 60 : 20);
      const resultLine = extracted
        ? `result: ${getLang()==='en' ? 'CLEAN EXIT' : 'CLEAN EXIT'} · depth ${depth} · signal ${signal} · score ${score} · credits +${rewardCredits} · OneDay +${rewardOneDay}`
        : `result: ${getLang()==='en' ? 'TRACE COMPLETE' : 'TRACE COMPLETE'} · depth ${depth} · signal ${signal} · OneDay +${rewardOneDay}`;
      log(`[ZERO-DAY PVE] ${resultLine}`, 'hack');
      showToast(extracted ? (getLang()==='en' ? 'ZERO-DAY: Clean exit' : 'ZERO-DAY: 정식 탈출') : (getLang()==='en' ? 'ZERO-DAY: Traced' : 'ZERO-DAY: 추적됨'), extracted ? 'achievement' : 'warn');
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
      log(getLang()==='en' ? '[ZERO-DAY] Onboarding complete. Vulnerability x1 granted. PVE & PVP unlocked.' : '[ZERO-DAY] 온보딩 완료. 취약점 1개 지급. PVE & PVP 해금.', 'system');
      showToast(getLang()==='en' ? 'Onboarding done! +1 Vulnerability' : '온보딩 완료! 취약점 +1', 'achievement');
      updateStatsUI();
      renderZeroDayPanel();
      saveGame(true);
    }

    function renderZeroDayPanel() {
      ensureZeroDayDefaults();
      const el = document.getElementById('zeroDayPanel');
      if (!el) return;
      const zd = state.zeroDay;
      // v3.0.0 fix: 단일 게터 — 표시값과 검사값 동일 보장
      const vuln = getZdVulnCount();
      const shards = state.items.zeroDayVulnerabilityShard || 0;
      const oneDay = state.items.oneDay || 0;

      if (!zd.onboardingCompleted) {
        el.innerHTML = `
          <div class="zd-terminal">
            <div class="zd-term-output">
              <div class="zd-line">root@zeroday:~# info: ${getLang()==='en' ? 'ZERO-DAY system initializing...' : 'ZERO-DAY 시스템 초기화 중...'}</div>
              <div class="zd-line">info: ${getLang()==='en' ? 'Onboarding mode activated.' : '온보딩 모드 활성화.'}</div>
              <div class="zd-line">info: ${getLang()==='en' ? 'Complete training to unlock PVE & PVP.' : '훈련 완료 시 PVE & PVP 해금.'}</div>
              <div class="zd-line">info: ${getLang()==='en' ? 'Reward: 1 Vulnerability (entry ticket).' : '보상: 취약점 1개 (입장권).'}</div>
            </div>
            <button type="button" id="btnZdOnboarding" class="btn-primary">${getLang()==='en' ? 'Start Onboarding' : '온보딩 시작'}</button>
          </div>`;
        document.getElementById('btnZdOnboarding')?.addEventListener('click', completeZdOnboarding);
        return;
      }

      const activeRun = zd.pve.active;
      const diff = zd.pve.difficulty || 'easy';
      const diffDef = ZD_PVE_DIFFICULTIES[diff] || ZD_PVE_DIFFICULTIES.easy;

      if (activeRun) {
        // Active run UI
        const detPct   = Math.round((activeRun.detection || 0) * 100);
        const barW     = Math.min(100, detPct);
        const detStage = getZdDetectionStage(activeRun.detection || 0);
        const curDepth = activeRun.depth || 0;
        const nodeSeq  = activeRun.nodes || [];
        const curNodeId = nodeSeq[Math.min(curDepth, nodeSeq.length - 1)] || 'HUB';
        const curNode   = ZD_NODE_TYPES[curNodeId] || ZD_NODE_TYPES.HUB;
        const nodeLabel = getLang()==='en' ? curNode.en : curNode.ko;
        const actionGroups = [
          { label: getLang()==='en'?'Recon':'정찰',     cmds: ['scan','probe','enum'] },
          { label: getLang()==='en'?'Infiltrate':'침투', cmds: ['breach','inject','elevate','bypass'] },
          { label: getLang()==='en'?'Conceal':'은폐',   cmds: ['mask','cloak','wipe','scrub'] },
          { label: getLang()==='en'?'Disrupt':'교란',   cmds: ['spoof','reroute','jam','decoy'] },
          { label: getLang()==='en'?'Extract':'탈출',   cmds: ['exfil','exit','disconnect'] }
        ];
        el.innerHTML = `
          <div class="zd-terminal active-run">
            <div class="zd-status-bar">
              <span>${getLang()==='en'?'Depth':'깊이'} ${curDepth}/${diffDef.depthMax}</span>
              <span class="zd-node-badge">${nodeLabel}</span>
              <span>Signal ${activeRun.signal}</span>
              <span>Score ${activeRun.score}</span>
              <span class="zd-det-label" style="color:${detStage.color}">${getLang()==='en'?detStage.label:detStage.ko} ${detPct}%</span>
            </div>
            <div class="zd-detection-bar"><div class="zd-det-fill" style="width:${barW}%;background:${detStage.color}"></div></div>
            <div class="zd-term-output" id="zdTermOutput">
              ${activeRun.log.slice(-8).map(l=>`<div class="zd-line">${escapeHtml(l)}</div>`).join('')}
            </div>
            <div class="zd-cmd-groups">
              ${actionGroups.map(grp=>`
                <div class="zd-cmd-group">
                  <span class="zd-grp-label">${grp.label}</span>
                  ${grp.cmds.map(c=>`<button type="button" class="zd-cmd-btn" data-zd-cmd="${c}">${zdCmdDisplay(c)}</button>`).join('')}
                </div>
              `).join('')}
            </div>
          </div>`;
        el.querySelectorAll('[data-zd-cmd]').forEach(btn => {
          btn.addEventListener('click', () => doZdPveAction(btn.dataset.zdCmd));
        });
        return;
      }

      // Lobby UI — 난이도 버튼 그리드
      const check = canStartZdPve();
      const diffBtns = Object.entries(ZD_PVE_DIFFICULTIES).map(([id, d]) => {
        const label  = getLang()==='en' ? d.labelEn : d.label;
        const costTx = d.free ? (getLang()==='en'?'Free (1/day)':'무료 1일1회') : (getLang()==='en'?'1 Vuln':'취약점 1개');
        return `<button type="button" class="zd-diff-btn ${id===diff?'active':''}" data-zd-diff="${id}">
          <strong>${label}</strong><span>${costTx}</span>
        </button>`;
      }).join('');

      // v3.0.0: 방어 카드 / 스킨 / 프로토콜 UI 데이터
      zd.defense = zd.defense || { slots:3, cards:[], usesThisMatch:0 };
      zd.skins = zd.skins || [];
      zd.unlocks = zd.unlocks || {};
      zd.activeSkin = zd.activeSkin || 'zero_shell';

      const slotCount = zd.defense.slots || 3;
      const slotCards = zd.defense.cards || [];

      // 카드 슬롯 HTML
      const slotsHtml = Array.from({length:5}).map((_, i) => {
        const idx = i+1;
        const enabled = idx <= slotCount;
        const cardId = slotCards[i] || null;
        const card = cardId ? ZD_DEFENSE_CARDS[cardId] : null;
        const lockHtml = !enabled
          ? `<span class="zd-slot-lock">🔒 ${ZD_SLOT_EXPAND_COST[idx] || '?'} OneDay</span>`
          : '';
        const cardHtml = card
          ? `<strong>${getLang()==='en'?card.en:card.ko}</strong><span class="small">${getLang()==='en'?card.descEn:card.desc}</span>`
          : `<span class="small zd-slot-empty">${getLang()==='en'?'(empty)':'(비어있음)'}</span>`;
        return `<div class="zd-defense-slot ${enabled?'enabled':'locked'}" data-zd-slot="${idx}">
          <div class="zd-slot-num">SLOT ${idx}</div>
          ${enabled ? cardHtml : lockHtml}
          ${enabled ? `<button type="button" data-zd-slot-edit="${idx}">${card ? (getLang()==='en'?'Change':'변경') : (getLang()==='en'?'Equip':'장착')}</button>` : `<button type="button" data-zd-slot-expand="${idx}">${getLang()==='en'?'Expand':'확장'}</button>`}
        </div>`;
      }).join('');

      // 스킨 선택 HTML
      const skinsHtml = Object.values(ZD_SKINS).map(skin => {
        const owned = isZdSkinUnlocked(skin.id);
        const active = zd.activeSkin === skin.id;
        return `<div class="zd-skin-card ${active?'active':''} ${owned?'owned':'locked'}" data-zd-skin="${skin.id}">
          <strong>${getLang()==='en'?skin.en:skin.ko}</strong>
          <span class="small">${getLang()==='en'?skin.descEn:skin.desc}</span>
          ${active
            ? `<span class="zd-skin-badge">${getLang()==='en'?'ACTIVE':'사용 중'}</span>`
            : owned
              ? `<button type="button" data-zd-skin-equip="${skin.id}">${getLang()==='en'?'Equip':'장착'}</button>`
              : `<span class="zd-skin-badge locked">${getLang()==='en'?'LOCKED':'미해금'}</span>`}
        </div>`;
      }).join('');

      // 프로토콜 4종 HTML
      const protocolsHtml = Object.values(ZD_PROTOCOLS).map(p => {
        const unlocked = isZdProtocolUnlocked(p.id);
        const prog = getZdProtocolProgress(p.id);
        const condText = (() => {
          switch (p.condition.type) {
            case 'pveRuns': return getLang()==='en'?`PVE clears ${prog.current}/${prog.target}`:`PVE 클리어 ${prog.current}/${prog.target}`;
            case 'pvpWins': return getLang()==='en'?`PVP wins ${prog.current}/${prog.target}`:`PVP 승리 ${prog.current}/${prog.target}`;
            case 'lowDetectExtracts': return getLang()==='en'?`Low-detection extracts ${prog.current}/${prog.target}`:`저탐지 탈출 ${prog.current}/${prog.target}`;
            case 'passTier': return getLang()==='en'?`PASS tier ${prog.current}/${prog.target}`:`PASS 티어 ${prog.current}/${prog.target}`;
          }
        })();
        const canUnlock = !unlocked && prog.ok && (state.items[p.cost.currency] || 0) >= p.cost.amount;
        return `<div class="zd-protocol-card ${unlocked?'unlocked':''}" data-zd-protocol="${p.id}">
          <div class="zd-protocol-head">
            <strong>${getLang()==='en'?p.en:p.ko}</strong>
            ${unlocked ? `<span class="zd-protocol-badge">${getLang()==='en'?'UNLOCKED':'해금'}</span>` : ''}
          </div>
          <p class="small">${getLang()==='en'?p.descEn:p.descKo}</p>
          <div class="zd-protocol-meta small">
            <span>${condText}</span>
            <span>${p.cost.amount} ${p.cost.currency.toUpperCase()}</span>
          </div>
          ${unlocked ? '' : `<button type="button" data-zd-protocol-unlock="${p.id}" ${canUnlock?'':'disabled'}>${getLang()==='en'?'Unlock':'해금'}</button>`}
        </div>`;
      }).join('');

      // PVP 추천 조건 (기존 유지)
      const cond1 = ['normal','hard','danger'].includes(state.stats.zeroDayBestExtractDiff || '');
      const cond2 = (state.stats.zeroDayPveEscapeCount || 0) >= 1;
      const cond3 = (state.stats.zeroDayLowDetectionExtracts || 0) >= 1;
      const condsMet = [cond1, cond2, cond3].filter(Boolean).length;
      const pvpReady = condsMet >= 2;

      el.innerHTML = `
        <div class="zd-lobby">
          <div class="zd-inventory-row">
            <span>${getLang()==='en'?'Vulnerability':'취약점'}: <strong>${vuln}</strong></span>
            <span>${getLang()==='en'?'Shards':'조각'}: <strong>${shards}</strong>/50</span>
            <span>OneDay: <strong>${oneDay}</strong></span>
            ${shards >= 50 ? `<button type="button" id="btnCraftVuln">${getLang()==='en'?'Craft Vulnerability':'취약점 제작'}</button>` : ''}
          </div>
          <div class="zd-stats-row">
            <div><span>${getLang()==='en'?'PVE Runs':'PVE 런'}</span><strong>${zd.pve.runs||0}</strong></div>
            <div><span>${getLang()==='en'?'Best Depth':'최고 깊이'}</span><strong>${zd.pve.bestDepth||0}</strong></div>
            <div><span>${getLang()==='en'?'Extracts':'탈출'}</span><strong>${zd.pve.extracts||0}</strong></div>
            <div><span>${getLang()==='en'?'PVP Rating':'PVP 레이팅'}</span><strong>${zd.pvp.rating||1000}</strong></div>
          </div>
          <div class="zd-diff-section">
            <div class="zd-diff-label">${getLang()==='en'?'Select Difficulty':'난이도 선택'}</div>
            <div class="zd-diff-grid">${diffBtns}</div>
          </div>
          <div class="zd-start-row">
            <button type="button" id="btnStartZdPve" ${check.ok ? '' : 'disabled'}>${getLang()==='en'?'Start PVE':'PVE 시작'}</button>
            <span class="small zd-start-hint">${check.ok
              ? (getLang()==='en'?`Cost: ${diffDef.free?'Free (1/day)':'1 Vulnerability'}`:`비용: ${diffDef.free?'무료 (1일 1회)':'취약점 1개'}`)
              : `⚠ ${check.reason}`
            }</span>
          </div>

          <!-- v3.0.0: PVP 비동기 트레이닝 매치 -->
          <div class="zd-pvp-section">
            <h4>${getLang()==='en'?'PVP (Async)':'PVP (비동기)'}</h4>
            <p class="small">${getLang()==='en'?'Snapshot-based async duel against bot opponent (training mode). Cloud matchmaking expands later.':'스냅샷 기반 비동기 PVP — 봇 상대와 트레이닝 매치 (클라우드 매칭은 추후 확장).'}</p>
            <div class="zd-pvp-stats">
              <span>${getLang()==='en'?'Wins':'승'}: ${zd.pvp.seasonWins||0}</span>
              <span>${getLang()==='en'?'Losses':'패'}: ${zd.pvp.seasonLosses||0}</span>
              <span>${getLang()==='en'?'Rating':'레이팅'}: ${zd.pvp.rating||1000}</span>
              <span>${getLang()==='en'?'Conds':'준비도'}: ${condsMet}/3</span>
            </div>
            <button type="button" id="btnZdPvpMatch" ${pvpReady && getZdVulnCount() >= 1 ? '' : 'disabled'}>
              ${getLang()==='en'?'Match PVP (1 Vuln)':'PVP 매칭 (취약점 1)'}
            </button>
            ${!pvpReady ? `<span class="small">${getLang()==='en'?'Need 2+ readiness conditions':'준비도 2개 이상 필요'}</span>` : ''}
          </div>

          <!-- v3.0.0: 방어자 카드 슬롯 (3 기본 / 4슬롯 500 OneDay / 5슬롯 1500 OneDay) -->
          <div class="zd-defense-section">
            <h4>${getLang()==='en'?'Defense Loadout':'방어 로드아웃'}</h4>
            <p class="small">${getLang()==='en'?`Slots ${slotCount}/5 — used in PVP defense. 3 uses per match, no duplicates.`:`슬롯 ${slotCount}/5 — PVP 방어에서 사용. 매치당 3회, 중복 불가.`}</p>
            <div class="zd-defense-slots">${slotsHtml}</div>
          </div>

          <!-- v3.0.0: 스킨 선택 -->
          <div class="zd-skin-section">
            <h4>${getLang()==='en'?'Terminal Skin':'터미널 스킨'}</h4>
            <div class="zd-skin-grid">${skinsHtml}</div>
          </div>

          <!-- v3.0.0: ZERO-DAY 프로토콜 4종 -->
          <div class="zd-protocol-section">
            <h4>${getLang()==='en'?'ZERO-DAY Protocols':'ZERO-DAY 프로토콜'}</h4>
            <p class="small">${getLang()==='en'?'Unlock by meeting conditions and spending OneDay. Effects stack passively.':'조건 달성 + OneDay 소비로 해금. 효과는 패시브로 누적.'}</p>
            <div class="zd-protocol-grid">${protocolsHtml}</div>
          </div>
        </div>`;

      // 활성 스킨 적용
      applyActiveZdSkin();

      document.getElementById('btnStartZdPve')?.addEventListener('click', startZdPve);
      document.getElementById('btnCraftVuln')?.addEventListener('click', () => {
        if ((state.items.zeroDayVulnerabilityShard||0) >= 50) {
          state.items.zeroDayVulnerabilityShard -= 50;
          state.items.zeroDayVulnerability = (state.items.zeroDayVulnerability||0) + 1;
          showToast(getLang()==='en'?'Vulnerability crafted! +1':'취약점 제작 완료! +1', 'achievement');
          updateStatsUI(); renderZeroDayPanel(); saveGame(true);
        }
      });
      el.querySelectorAll('[data-zd-diff]').forEach(btn => {
        btn.addEventListener('click', () => {
          state.zeroDay.pve.difficulty = btn.dataset.zdDiff;
          renderZeroDayPanel();
          saveGame(true);
        });
      });

      // v3.0.0: 슬롯 확장 버튼
      el.querySelectorAll('[data-zd-slot-expand]').forEach(btn => {
        btn.addEventListener('click', () => {
          const slot = Number(btn.dataset.zdSlotExpand);
          const cost = ZD_SLOT_EXPAND_COST[slot];
          if (!cost) return;
          if ((state.items.oneDay || 0) < cost) {
            showToast(getLang()==='en'?`Need ${cost} OneDay`:`OneDay ${cost} 필요`, 'warn');
            return;
          }
          state.items.oneDay -= cost;
          state.stats.oneDaySpentTotal = (state.stats.oneDaySpentTotal || 0) + cost;
          state.stats.zeroDayOneDaySpentTotal = (state.stats.zeroDayOneDaySpentTotal || 0) + cost;
          state.zeroDay.defense.slots = slot;
          showToast(getLang()==='en'?`Slot ${slot} unlocked!`:`슬롯 ${slot} 해금!`, 'achievement');
          renderZeroDayPanel();
          saveGame(true);
        });
      });

      // v3.0.0: 슬롯 카드 장착/변경 (간단한 cycle: 카드 5종 순환)
      el.querySelectorAll('[data-zd-slot-edit]').forEach(btn => {
        btn.addEventListener('click', () => {
          const slot = Number(btn.dataset.zdSlotEdit);
          const idx = slot - 1;
          state.zeroDay.defense.cards = state.zeroDay.defense.cards || [];
          const cardIds = Object.keys(ZD_DEFENSE_CARDS);
          const current = state.zeroDay.defense.cards[idx];
          // 다음 카드로 cycle (중복 슬롯 방지)
          const used = new Set(state.zeroDay.defense.cards.filter((c,i) => i !== idx && c));
          let nextIdx = current ? (cardIds.indexOf(current) + 1) % (cardIds.length + 1) : 0;
          let attempt = 0;
          let next = null;
          while (attempt < cardIds.length + 1) {
            if (nextIdx >= cardIds.length) { next = null; break; } // empty
            const cand = cardIds[nextIdx];
            if (!used.has(cand)) { next = cand; break; }
            nextIdx = (nextIdx + 1) % (cardIds.length + 1);
            attempt++;
          }
          state.zeroDay.defense.cards[idx] = next;
          renderZeroDayPanel();
          saveGame(true);
        });
      });

      // v3.0.0: 스킨 장착
      el.querySelectorAll('[data-zd-skin-equip]').forEach(btn => {
        btn.addEventListener('click', () => {
          const skinId = btn.dataset.zdSkinEquip;
          if (!isZdSkinUnlocked(skinId)) return;
          state.zeroDay.activeSkin = skinId;
          renderZeroDayPanel();
          saveGame(true);
        });
      });

      // v3.0.0: 프로토콜 해금
      el.querySelectorAll('[data-zd-protocol-unlock]').forEach(btn => {
        btn.addEventListener('click', () => {
          const pid = btn.dataset.zdProtocolUnlock;
          const result = tryUnlockZdProtocol(pid);
          if (!result.ok) {
            const msg = result.reason === 'currency' ? (getLang()==='en'?'Not enough OneDay':'OneDay 부족')
              : result.reason === 'condition' ? (getLang()==='en'?'Condition not met':'조건 미충족')
              : (getLang()==='en'?'Cannot unlock':'해금 불가');
            showToast(msg, 'warn');
            return;
          }
          updateStatsUI();
          renderZeroDayPanel();
          saveGame(true);
        });
      });

      // v3.0.0: PVP 매칭 (트레이닝 봇 매치)
      document.getElementById('btnZdPvpMatch')?.addEventListener('click', startZdPvpMatch);
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

    function zeroCopy(ko, en) {
      return getLang() === 'en' ? en : ko;
    }

    function clampNumber(value, min, max) {
      return Math.max(min, Math.min(max, Number(value) || 0));
    }

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
              <p>${getLang() === 'en' ? selectedStage.chapter.titleEn : selectedStage.chapter.title} · ${selectedStage.chapter.from}-${selectedStage.chapter.to}</p>
            </div>
            <div class="stage-status-pill">${statusText}</div>
          </div>
          <div class="stage-meta-grid">
            <div><span>${stageCopy('추천 레벨', 'Recommended Level')}</span><strong>Lv.${selectedStage.recommendedLevel}</strong></div>
            <div><span>${stageCopy('추천 파워', 'Recommended Power')}</span><strong>${selectedStage.recommendedPower}</strong></div>
            <div><span>${stageCopy('보안값', 'Security')}</span><strong>${successInfo.security}</strong></div>
            <div><span>${stageCopy('에너지', 'Energy')}</span><strong>${selectedStage.energyCost}</strong></div>
            <div><span>${stageCopy('추천 코드', 'Suggested Code')}</span><strong>${selectedStage.chapter.hint}</strong></div>
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
          </div>
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
              <em>${chapter.from}-${chapter.to} · ${clearedInChapter}/10 · ${claimed ? stageCopy('보상 수령', 'Reward claimed') : getStageChapterRewardText(chapter.index)}</em>
            </button>
            <div class="stage-list" ${open ? '' : 'hidden'}>
              ${stages.map(stage => {
                const cleared = !!getStageClearInfo(stage);
                const active = stage.id === selectedStage.id;
                const status = cleared ? stageCopy('CLEAR', 'CLEAR') : stageCopy('READY', 'READY');
                return `
                  <button type="button" class="stage-card ${active ? 'active' : ''} ${cleared ? 'is-cleared' : ''} ${stage.boss ? 'is-boss' : ''}" data-stage-id="${stage.id}">
                    <span class="stage-card-top"><strong>${String(stage.number).padStart(3, '0')}</strong><em>${stage.boss ? 'BOSS' : chapter.theme}</em></span>
                    <span class="stage-card-meta">Lv.${stage.recommendedLevel} · PWR ${stage.recommendedPower}</span>
                    <span class="stage-card-status">${status}</span>
                  </button>
                `;
              }).join('')}
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

      // 이미 진행 중인 전투면 무시 (중복 클릭 방지)
      if (state.stage.activeBattle && !state.stage.activeBattle.over) {
        renderStagePanel();
        return;
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
        return;
      }

      code.shards = code.shards || 0;
      code.syncLevel = code.syncLevel || 0;

      const shardCost = getSyncShardCost(code.syncLevel);
      if (code.shards < shardCost) {
        log(t('syncFailShards', { need: shardCost, have: code.shards }), 'system');
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
      showToast(t('syncToast', { name: code.name, lv: code.syncLevel }), 'system');
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
        return;
      }
      const cost = 100 * code.level;
      if (state.credits < cost) {
        log(t('upgradeFailCredits', { cost }), 'system');
        return;
      }
      state.credits -= cost;
      code.level++;
      code.power += 5;
	      state.stats.codeUpgradeCount = (state.stats.codeUpgradeCount || 0) + 1;
	      trackWeeklyChallenge('code_upgrade', { codeId: code.id });
      playSfx('upgrade');
      log(t('upgradeDone', { name: code.name, lv: code.level, pwr: code.power, cost }), 'system');
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
        return;
      }
      if (code.rarity === 'LEGENDARY') {
        log(t('maxRarity'), 'system');
        return;
      }
      if (code.level < 5) {
        log(t('evolveNeedLv'), 'system');
        return;
      }
      const idx = rarityOrder.indexOf(code.rarity);
      if (idx === -1 || idx === rarityOrder.length - 1) {
        log(t('evolveCannot'), 'system');
        return;
      }
      const nextRarity = rarityOrder[idx + 1];
      code.rarity = nextRarity;
      code.power += 10;
	      state.stats.codeEvolutionCount = (state.stats.codeEvolutionCount || 0) + 1;
	      trackWeeklyChallenge('code_evolve', { codeId: code.id, rarity: nextRarity });
      playSfx('upgrade');
      log(t('evolveDone', { name: code.name, rarity: nextRarity, pwr: code.power }), 'system');

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
      showToast(t('shardEnhanceDone', { name: code.name, pwr: code.power, cost }), 'system');
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
        option.textContent = t('serverOption', { name: localizeServerName(s), sec: s.security, lv: s.minLevel });
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

      // SHOP TYPE 선택 (credits/coin/oneday)
      state.ui = state.ui || {};
      const shopType = state.ui.shopType || 'credits';
      let currentShopItems = shopItems;
      let currencySymbol = '💰';
      let currencyName = 'Credits';
      if (shopType === 'coin') {
        currentShopItems = coinShopItems;
        currencySymbol = '🪙';
        currencyName = 'COIN';
      } else if (shopType === 'oneday') {
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

      // SHOP TYPE 탭 업데이트
      const shopTypeTabButtons = document.querySelectorAll('.shop-type-tab');
      if (shopTypeTabButtons && shopTypeTabButtons.length) {
        shopTypeTabButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.shopType === shopType));
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

        const leftWrap = document.createElement('span');
        leftWrap.appendChild(raritySpan);
        leftWrap.appendChild(catSpan);
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
        }
        btn.addEventListener('click', () => {
          // purchase cap check (daily/once)
          const cap = canBuyShopItem(item.id);
          if (!cap.ok) {
            log(t('shopLog', { msg: cap.reason }), 'shop');
            showToast(cap.reason, 'shop');
            return;
          }

          // 통화별 확인
          let hasEnoughCurrency = false;
          if (shopType === 'credits') {
            hasEnoughCurrency = state.credits >= item.cost;
            if (!hasEnoughCurrency) {
              log(t('shopLog', { msg: `${t('notEnoughCredits')} (${getLang()==='en' ? 'Need' : '필요'}: ${item.cost})` }), 'shop');
              showToast(t('notEnoughCredits'), 'shop');
              return;
            }
          } else if (shopType === 'coin') {
            const coinBalance = state.items.coin || 0;
            hasEnoughCurrency = coinBalance >= item.cost;
            if (!hasEnoughCurrency) {
              const notEnoughMsg = getLang() === 'en' ? `Not enough COIN (Need: ${item.cost})` : `COIN이 부족합니다 (필요: ${item.cost})`;
              log(t('shopLog', { msg: notEnoughMsg }), 'shop');
              showToast(notEnoughMsg, 'shop');
              return;
            }
          } else if (shopType === 'oneday') {
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

          // 통화 차감
          if (shopType === 'credits') {
            state.credits -= item.cost;
          } else if (shopType === 'coin') {
            state.items.coin = (state.items.coin || 0) - item.cost;
            state.stats.coinSpentTotal = (state.stats.coinSpentTotal || 0) + item.cost;
          } else if (shopType === 'oneday') {
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
        state.missionProgress.daily.completed = {};
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

      defs.forEach(def => {
        if (prog.completed[def.id]) return;

        // energy0Flag는 getMissionProgressValue에서 통합 처리 (prog.energy0Reached 플래그 사용)

        const value = getMissionProgressValue(scope, def.type);
        if (value >= def.target) {
          prog.completed[def.id] = true;

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

      const header = document.createElement('div');
      header.style.marginBottom = '4px';
      header.style.fontWeight = '600';
      header.textContent = titleMap[scope] || '';
      missionListEl.appendChild(header);

      defs.forEach(def => {
        const progVal = getMissionProgressValue(scope, def.type);
        const progObj = state.missionProgress[scope];
        const completed = !!(progObj && progObj.completed && progObj.completed[def.id]);

        const item = document.createElement('div');
        item.className = 'mission-item';

        const main = document.createElement('div');
        main.className = 'mission-main';
        main.innerHTML = `
          <div>${localizeMissionName(def)}</div>
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
        hard:       t('difficultyHard'),         // 어려움
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
      const panelMap = {
        codex: tabCodex,
        live: tabLiveNet,
        rank: tabRank,
        settings: tabSettings,
        save: tabSave,
        credits: tabCredits,
        manual: tabManual
      };
      const activeTab = panelMap[tabName] ? tabName : 'codex';
      Object.keys(panelMap).forEach(name => {
        if (!panelMap[name]) return;
        panelMap[name].classList.toggle('active', name === activeTab);
      });
      moreTabButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === activeTab);
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
        try { renderPassPanel(); } catch(e){}
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

    function persistLastSeenAt(ts = Date.now(), silent = true) {
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
      if (!silent) saveGame(true);
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
      ensureStageDefaults();
      ensureZeroDayDefaults();
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

    function saveGame(silent = false) {
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
      let raw = typeof rawOverride === 'string' ? rawOverride : localStorage.getItem(SAVE_KEY);
      // v1.5.x 저장 데이터 자동 마이그레이션
      if (!raw) {
        raw = localStorage.getItem(OLD_SAVE_KEY);
        if (raw) {
          localStorage.setItem(SAVE_KEY, raw);
        }
      }
      if (!raw) {
        log(t('noSavedData'), 'system');
        return;
      }
      try {
        const data = JSON.parse(raw);
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
        state.stage.activeBattle = state.stage.activeBattle || null;

        ensureTutorialDefaults();
        ensureStageDefaults();
        ensureZeroDayDefaults();
        state.lastSeenAt = Number(state.lastSeenAt || data.savedAt || 0) || null;
        state.energy = Math.min(state.energy, state.energyMax);
        applyOfflineEnergyRecovery();
        ensureMissionResets();
        refreshUiAfterStateRestore();
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
      if (document.visibilityState === 'hidden') persistLastSeenAt(Date.now());
    });
    bind(window, 'pagehide', () => {
      persistLastSeenAt(Date.now());
    });
    bind(window, 'beforeunload', () => {
      persistLastSeenAt(Date.now());
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

    // 설정 적용
    function isChristmasSeason(d = new Date()) {
      // 로컬 기준: 12/1 ~ 1/7 (대략적인 시즌)
      const m = d.getMonth() + 1;
      const day = d.getDate();
      if (m === 12) return day >= 1;
      if (m === 1) return day <= 7;
      return false;
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

    // 내보내기 / 불러오기
    function exportSaveFile() {
      try {
        const raw = localStorage.getItem(SAVE_KEY);
        const data = raw ? raw : JSON.stringify({ version: CURRENT_VERSION, state, ownedCodes, modifiers });
        const blob = new Blob([data], { type: 'application/json;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        const d = new Date();
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth()+1).padStart(2,'0');
        const dd = String(d.getDate()).padStart(2,'0');
        a.download = `HCSiG_save_${yyyy}${mm}${dd}_${CURRENT_VERSION}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(a.href);
        showToast(t('exportDone'), 'save');
      } catch (e) {
        console.error(e);
        showToast(t('exportFail'), 'warn');
      }
    }

    function importSaveFromText(text) {
      try {
        const obj = JSON.parse(text);
        localStorage.setItem(SAVE_KEY, JSON.stringify(obj));
        loadGame();
        showToast(t('importDone'), 'save');
      } catch (e) {
        console.error(e);
        showToast(t('importFail'), 'warn');
      }
    }

    bind(btnExportSave, 'click', exportSaveFile);

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
      renderZeroDayPanel();
    });
    bind(document, 'hcsig:zd-tab-open', () => {
      renderZeroDayPanel();
    });
    bind(window, 'hcsig:language-applied', () => {
      renderStagePanel();
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
    bind(document, 'click', (event) => {
      const startBtn = event.target.closest && event.target.closest('[data-zero-day-start]');
      if (startBtn) {
        startZeroDay(startBtn.dataset.zeroDayStart || 'single');
        return;
      }
      const actionBtn = event.target.closest && event.target.closest('[data-zero-day-action]');
      if (!actionBtn) return;
      runZeroDayAction(actionBtn.dataset.zeroDayAction || '');
    });
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

    // EVENT modal tab switching (WEEKLY / PASS)
    bind(document, 'click', (e) => {
      const btn = e.target.closest && e.target.closest('[data-event-tab]');
      if (!btn) return;
      const tabId = btn.dataset.eventTab;
      document.querySelectorAll('.event-tab-btn').forEach(b => b.classList.toggle('active', b.dataset.eventTab === tabId));
      document.querySelectorAll('.event-tab-panel').forEach(p => p.classList.toggle('active', p.id === 'eventTab' + tabId.charAt(0).toUpperCase() + tabId.slice(1)));
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

    // ZERO-DAY terminal: PVE / PVP start buttons
    bind(document, 'click', (e) => {
      const btn = e.target.closest && e.target.closest('[data-zd-start]');
      if (!btn) return;
      const mode = btn.dataset.zdStart || 'pve';
      if (mode === 'pve') { try { startZdPve(); } catch(ex) { console.warn('[ZD PVE]', ex); } }
    });

    // ZERO-DAY terminal: PVE action buttons
    bind(document, 'click', (e) => {
      const btn = e.target.closest && e.target.closest('[data-zd-action]');
      if (!btn) return;
      try { doZdPveAction(btn.dataset.zdAction); } catch(ex) { console.warn('[ZD Action]', ex); }
    });

    // ZERO-DAY terminal: command input submit
    bind(document, 'click', (e) => {
      const btn = e.target.closest && e.target.closest('.zd-cmd-submit');
      if (!btn) return;
      const input = btn.closest('.zd-cmd-input-row') && btn.closest('.zd-cmd-input-row').querySelector('.zd-cmd-input');
      if (!input) return;
      const val = (input.value || '').trim();
      input.value = '';
      if (!val) return;
      try { handleZdInput(val); } catch(ex) { console.warn('[ZD CMD]', ex); }
    });
    bind(document, 'keydown', (e) => {
      if (e.key !== 'Enter') return;
      const input = e.target.closest && e.target.closest('.zd-cmd-input');
      if (!input) return;
      const val = (input.value || '').trim();
      input.value = '';
      if (!val) return;
      try { handleZdInput(val); } catch(ex) { console.warn('[ZD CMD]', ex); }
    });

    // ZERO-DAY quick-command buttons
    bind(document, 'click', (e) => {
      const btn = e.target.closest && e.target.closest('.zd-cmd-btn[data-zd-cmd]');
      if (!btn) return;
      try { handleZdInput(btn.dataset.zdCmd); } catch(ex) { console.warn('[ZD Quick CMD]', ex); }
    });

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
      ensureMissionResets();
      try { ensureSeasonState(); } catch(e) { console.warn('[Season] init error:', e); }

      // ① HCSIG_BRIDGE를 먼저 설정 (cloudSave.js가 대기 중)
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

          // ④ 로컬 또는 클라우드 세이브 로드
          if (localStorage.getItem(SAVE_KEY)) {
            loadGame();
          } else {
            state.lastSeenAt = Date.now();
            // 기본 상태는 유지
          }

          // ⑤ UI 렌더
          refreshUiAfterStateRestore();

          log(t('initLog'), 'system');
          maybeShowUpdateOnStart();
          setTimeout(() => {
            maybeStartTutorial();
          }, 180);
        }
      }, 50);
    }

    init();

const CURRENT_VERSION = 'v1.6.15-k6d0-a8b2-opt';
    const ENERGY_INTERVAL_MS = 120000; // 에너지 1칸당 120초
    const SAVE_KEY = 'HCSiG_SAVE_v16';
const I18N = {
  ko: {
    appTitle: 'HCSiG - Hacking Code Simulator Game', subtitle: 'Hacking Code Simulator Game', more: '더보기 ▾', moreTitle: '더보기', status:'Status', shop:'Shop', actions:'Actions', codeInventory:'코드 인벤토리', codeDetail:'코드 상세',
    level:'레벨', exp:'경험치', credits:'크레딧', cpuTier:'CPU 티어', energy:'에너지', nextRecovery:'다음 회복까지', energyPack:'에너지 팩', lastSave:'마지막 저장', use:'사용', sort:'정렬', category:'분류', all:'전체', system:'시스템', economy:'경제', utility:'유틸',
    codeScan:'코드 스캔', serverHack:'서버 해킹', cpuUpgrade:'CPU 업그레이드', targetServer:'타겟 서버', loadout:'로드아웃', saveSlot:'슬롯 저장', loadSlot:'슬롯 불러오기', riskMode:'위험 해킹 모드 (성공 확률 -15%p + 보정, 보상 크레딧 ×2, 실패 시 에너지 추가 -1)',
    actionsDesc1:'· 에너지 1칸 = 120초, 0.1초 단위로 카운트다운 표시', actionsDesc2:'· 코드 스캔: 에너지 1, 스캔 EXP 소량 (희귀도별 스캔 시간 차등)', actionsDesc3:'· 서버 해킹: 에너지 2, 성공 시 크레딧·EXP 획득', actionsDesc4:'· 레벨업 시 크레딧 +100, CPU 업그레이드 비용 = 500 × 티어 × 할인 계수',
    codeUpgrade:'코드 강화', codeSync:'코드 동기화', codeEvolve:'코드 진화', codeDesc1:'· 강화: 코드 레벨에 비례한 크레딧 소모, 파워 증가 (파괴 없음).', codeDesc2:'· 동기화: 중복 조각을 모아 성공률 보정과 파워를 함께 강화합니다.', codeDesc3:'· 진화: 일정 레벨 이상 시 희귀도 승급 (COMMON → UNCOMMON → … → LEGENDARY).',
    mission:'미션', achievement:'업적', codex:'코드 도감', logs:'로그', settings:'설정', data:'데이터', quest:'퀘스트', records:'기록', envSettings:'환경 설정', dataManage:'데이터 관리', close:'닫기',
    logSearchHelp:'로그 검색 (로그 항목 클릭 → 핀/해제)', searchPlaceholder:'검색어 입력...', clearLogs:'로그 초기화', hideLogs:'로그 숨기기', showLogs:'로그 보이기', logFilter:'로그 필터',
    language:'언어', fontScale:'폰트 크기', snow:'눈 이펙트', uiScale:'UI 스케일', animation:'애니메이션', toastTime:'토스트 시간', autosaveToast:'자동저장 알림', enabled:'사용', settingsHelp:'· 설정은 저장 데이터에 포함되며, 새로고침 후에도 유지됩니다.',
    saveNow:'저장하기', loadNow:'불러오기', clearSave:'저장 데이터 삭제', exportSave:'내보내기', importFile:'파일 불러오기', importText:'텍스트로 불러오기', importTextPlaceholder:'여기에 JSON을 붙여넣고 불러오기를 누르세요.', importTextBtn:'텍스트 불러오기', saveHelp:'· 저장 위치: 브라우저 LocalStorage (이 브라우저, 이 기기 한정)<br/>· 자동 저장: 약 60초마다 한 번씩 백그라운드 저장',
    shopSortUpdate:'업데이트순', shopSortNew:'신규 우선', shopSortRarity:'희귀도순', shopSortPrice:'가격순', shopSortName:'이름순', codeSortRecent:'최신', codeSortRarity:'희귀도', codeSortPower:'파워', codeSortLevel:'레벨', codeSortName:'이름',
    codexSummary:'발견 {a} / {b}', discovered:'DISCOVERED', locked:'LOCKED', basePower:'기본 파워', ownedLvPwr:'보유 Lv.{lv} / PWR {pwr}', undiscoveredCode:'미발견 코드', undiscoveredDesc:'아직 발견하지 못한 코드입니다. 코드 스캔으로 해제하세요.', noCodes:'보유 코드 없음. [코드 스캔]으로 코드를 얻으세요.', selectCode:'보유 중인 코드를 선택하면 상세 정보가 표시됩니다.',
    levelLabel:'레벨: Lv.{v}', powerLabel:'파워: {v}', usageLabel:'사용 횟수: {v}', shardsLabel:'중복 조각: {v}', syncLabel:'동기화 단계: {v}', nextUpgrade:'다음 강화 비용: {v} 크레딧', nextSync:'다음 동기화 비용: 조각 {a} / 예상 성공률 보정 +{b}%', evolveReady:'진화 조건: 충족', evolveNeed:'진화 조건: Lv.5 이상 필요', ability:'능력', noDesc:'설명 없음.',
    missionHeaderDaily:'DAILY QUEST', missionHeaderWeekly:'WEEKLY QUEST', missionHeaderMonth:'MONTH QUEST', missionHeaderGeneral:'GENERAL QUEST', reward:'보상', none:'없음', complete:'완료', incomplete:'미완', achieved:'달성', notYet:'미달', hiddenAchievement:'히든 업적입니다. 달성 시 공개됩니다.', difficultyEasy:'일반', difficultyNormal:'보통', difficultyHard:'어려움', hidden:'HIDDEN',
    full:'FULL', seconds:'초', minutes:'분', visible:'표시', on:'ON', off:'OFF',
    saveStateSaved:'게임 상태가 저장되었습니다.', saveComplete:'저장 완료', autosaveComplete:'✅ 자동 저장 완료', noSavedData:'저장된 데이터가 없습니다.', saveLoaded:'저장된 데이터를 불러왔습니다.', saveLoadError:'저장 데이터를 불러오는 중 오류가 발생했습니다.', saveDeleted:'저장 데이터가 삭제되었습니다.', exportFail:'내보내기 실패 (콘솔 확인)', riskModeLog:'위험 해킹 모드: {state}', riskPenaltyLog:'위험 해킹 모드 페널티: 실패로 인해 에너지가 추가로 1 소모되었습니다.', loadoutSaved:'로드아웃 슬롯 {slot}에 현재 설정을 저장했습니다.', loadoutEmpty:'로드아웃 슬롯 {slot}에 저장된 설정이 없습니다.', loadoutLoaded:'로드아웃 슬롯 {slot}을 불러왔습니다.',
    toastAchievement:'업적 달성: {name}', achievementLog:'[업적 달성] {name}', activeCode:'활성 코드 변경: {name}', levelUpLog:'레벨 업! Lv.{lv} 달성. 크레딧 +50 지급.', noEnergyPack:'에너지 팩이 없습니다.', energyFull:'이미 에너지가 가득 찼습니다.', usedEnergyPack:'에너지 팩 1개를 사용해 에너지를 최대치까지 회복했습니다.',
    noCodeSync:'동기화할 코드가 없습니다.', syncFailShards:'코드 동기화 실패: 중복 조각이 부족합니다. (필요: {need}, 보유: {have})', syncDone:'코드 동기화 완료: {name} 동기화 {lv}단계 달성. 파워 +{pwr}, 성공률 보정 +{rate}%.', syncToast:'{name} 동기화 {lv}단계', noCodeUpgrade:'강화할 코드가 없습니다. 먼저 코드를 스캔하세요.', upgradeFailCredits:'코드 강화 실패: 크레딧이 부족합니다. (필요: {cost})', upgradeDone:'코드 강화: {name} Lv.{lv} (파워 +5 → {pwr}), 크레딧 -{cost}.', noCodeEvolve:'진화할 코드가 없습니다.', maxRarity:'이미 최상위 희귀도(LEGENDARY)입니다. 더 이상 진화할 수 없습니다.', evolveNeedLv:'코드 진화 실패: 진화에는 최소 Lv.5 이상이 필요합니다.', evolveCannot:'진화를 처리할 수 없습니다.', evolveDone:'코드 진화 성공: {name}가 {rarity} 등급으로 승급, 파워 +10 → {pwr}.',
    noEnergyScan:'에너지가 부족하여 코드 스캔을 수행할 수 없습니다.', noEnergyHack:'에너지가 부족하여 서버 해킹을 수행할 수 없습니다.', energyPackToast:'에너지 팩 +1 (보유: {v})', offlineRecoverLog:'오프라인 동안 에너지 {v} 회복 ({label} 경과)', offlineRecoverToast:'오프라인 회복: 에너지 +{v}', exportDone:'저장 데이터 내보내기 완료', importDone:'저장 데이터 불러오기 완료', importFail:'불러오기 실패: JSON 형식을 확인하세요.', emptyText:'텍스트가 비어 있습니다.', logsHide:'로그 숨기기', logsShow:'로그 보이기', initLog:'HCSiG 초기화 완료. (언어 설정, 중복 조각/코드 동기화, 모바일 UI, 상점 분류 적용)', mobileHome:'HOME', mobileCodes:'CODES', mobileShop:'SHOP', mobileComing:'COMING SOON', comingSoonToast:'Coming Soon - 준비 중인 기능입니다.', buy:'구매', buyDone:'구매 완료', buyUnavailable:'구매 불가', buySpendTitle:'구매하면 크레딧이 소모됩니다.', buyDailyLimit:'오늘 구매 제한에 도달했습니다.', buyOnceLimit:'이미 구매한 영구 아이템입니다.', notEnoughCredits:'크레딧이 부족합니다.', shopLog:'[상점] {msg}', shopBought:'{name} 구매 (💰 -{cost})', missionDoneToast:'미션 완료: {name} ({reward})', missionDoneCredits:'크레딧 +{v}', missionDoneEnergyPack:'에너지 팩 +{v}', missionDoneBoth:'크레딧 +{c} / 에너지 팩 +{e}', serverOption:'{name} (보안 {sec}, Lv{lv}+)', serverLevelNeed:'해당 서버를 해킹하려면 최소 Lv.{lv} 이상이어야 합니다.', noOwnedCodes:'보유 코드가 없습니다. 먼저 코드 스캔으로 코드를 확보하세요.', scanFound:'새 코드 발견! {name} [{rarity}]', scanDuplicate:'중복 코드 감지: {name} [{rarity}] → 중복 조각 +{gain} (보유 {have}).', scanDone:'코드 스캔 완료: 경험치 +{exp}.', hackSuccessLog:'서버 해킹 성공! [{server}] 성공 확률 {chance}%. 크레딧 +{credits}, EXP +{exp}.', hackFailLog:'서버 해킹 실패. [{server}] 성공 확률 {chance}%였음.', logDailyShopReset:'[시스템] 일일 상점 제한이 초기화되었습니다. (05:00 리셋)', loadoutSlot:'슬롯 {n}', logPinHint:'로그 항목 클릭 → 핀/해제', saveToLocal:'현재 상태를 브라우저 LocalStorage에 저장합니다.', loadFromLocal:'LocalStorage에서 저장된 데이터를 불러옵니다.', deleteSave:'저장 데이터를 삭제합니다.', exportJson:'현재 저장 데이터를 JSON 파일로 내보냅니다.', importJsonFile:'JSON 저장 파일을 불러옵니다.', importJsonText:'텍스트(JSON)로 저장 데이터를 불러옵니다.', languageTitle:'게임 언어를 선택합니다.', uiScaleTitle:'전체 UI 배율을 조정합니다.', toastTitle:'화면 알림(토스트) 표시 시간을 설정합니다.', shopSortTitle:'상점 아이템 정렬 기준을 선택합니다.', codeSortTitle:'코드 인벤토리 정렬 기준을 선택합니다.', dailyResetLabel:'05:00 리셋 ({n}회)', onceLabel:'1회', dailyShort:'일일', onceShort:'1회', rarityCommon:'COMMON', rarityUncommon:'UNCOMMON', rarityRare:'RARE', rarityEpic:'EPIC', rarityLegendary:'LEGENDARY'
  },
  en: {
    appTitle: 'HCSiG - Hacking Code Simulator Game', subtitle: 'Hacking Code Simulator Game', more: 'More ▾', moreTitle: 'More', status:'Status', shop:'Shop', actions:'Actions', codeInventory:'Code Inventory', codeDetail:'Code Detail',
    level:'Level', exp:'EXP', credits:'Credits', cpuTier:'CPU Tier', energy:'Energy', nextRecovery:'Next Recovery', energyPack:'Energy Pack', lastSave:'Last Save', use:'Use', sort:'Sort', category:'Category', all:'All', system:'System', economy:'Economy', utility:'Utility',
    codeScan:'Scan Code', serverHack:'Hack Server', cpuUpgrade:'Upgrade CPU', targetServer:'Target Server', loadout:'Loadout', saveSlot:'Save Slot', loadSlot:'Load Slot', riskMode:'Risk Hack Mode (success -15%p + modifiers, reward credits ×2, failure costs +1 energy)',
    actionsDesc1:'· 1 energy = 120 seconds, shown with 0.1-second countdown', actionsDesc2:'· Scan Code: costs 1 energy, small scan EXP gain (scan time varies by rarity)', actionsDesc3:'· Hack Server: costs 2 energy, grants credits and EXP on success', actionsDesc4:'· Level up gives +50 credits, CPU upgrade cost = 500 × tier × discount factor',
    codeUpgrade:'Upgrade Code', codeSync:'Sync Code', codeEvolve:'Evolve Code', codeDesc1:'· Upgrade: costs credits based on code level and raises power (no destruction).', codeDesc2:'· Sync: spend duplicate shards to raise success bonus and power together.', codeDesc3:'· Evolve: rank up at a required level (COMMON → UNCOMMON → … → LEGENDARY).',
    mission:'Mission', achievement:'Achievements', codex:'Code Codex', logs:'Logs', settings:'Settings', data:'Data', quest:'Quests', records:'Records', envSettings:'Settings', dataManage:'Data Management', close:'Close',
    logSearchHelp:'Search logs (click a log entry to pin/unpin)', searchPlaceholder:'Type to search...', clearLogs:'Clear Logs', hideLogs:'Hide Logs', showLogs:'Show Logs', logFilter:'Log Filter',
    language:'Language', fontScale:'Font Size', snow:'Snow Effect', uiScale:'UI Scale', animation:'Animation', toastTime:'Toast Duration', autosaveToast:'Autosave Toast', enabled:'Enabled', settingsHelp:'· Settings are stored with save data and remain after refresh.',
    saveNow:'Save', loadNow:'Load', clearSave:'Delete Save Data', exportSave:'Export', importFile:'Import File', importText:'Import from Text', importTextPlaceholder:'Paste JSON here and press import.', importTextBtn:'Import Text', saveHelp:'· Save location: browser LocalStorage (this browser/device only)<br/>· Autosave: background save about once every 60 seconds',
    shopSortUpdate:'By Update', shopSortNew:'Newest First', shopSortRarity:'By Rarity', shopSortPrice:'By Price', shopSortName:'By Name', codeSortRecent:'Recent', codeSortRarity:'Rarity', codeSortPower:'Power', codeSortLevel:'Level', codeSortName:'Name',
    codexSummary:'Discovered {a} / {b}', discovered:'DISCOVERED', locked:'LOCKED', basePower:'Base Power', ownedLvPwr:'Owned Lv.{lv} / PWR {pwr}', undiscoveredCode:'Undiscovered Code', undiscoveredDesc:'You have not discovered this code yet. Unlock it by scanning codes.', noCodes:'No codes owned. Use [Scan Code] to get one.', selectCode:'Select an owned code to view details.',
    levelLabel:'Level: Lv.{v}', powerLabel:'Power: {v}', usageLabel:'Uses: {v}', shardsLabel:'Duplicate Shards: {v}', syncLabel:'Sync Level: {v}', nextUpgrade:'Next upgrade cost: {v} credits', nextSync:'Next sync cost: {a} shards / expected success bonus +{b}%', evolveReady:'Evolution requirement: Met', evolveNeed:'Evolution requirement: Need Lv.5+', ability:'Ability', noDesc:'No description.',
    missionHeaderDaily:'DAILY QUEST', missionHeaderWeekly:'WEEKLY QUEST', missionHeaderMonth:'MONTH QUEST', missionHeaderGeneral:'GENERAL QUEST', reward:'Reward', none:'None', complete:'Complete', incomplete:'Incomplete', achieved:'Achieved', notYet:'Not Yet', hiddenAchievement:'This is a hidden achievement. It will be revealed when completed.', difficultyEasy:'Easy', difficultyNormal:'Normal', difficultyHard:'Hard', hidden:'HIDDEN',
    full:'FULL', seconds:'sec', minutes:'min', visible:'Visible', on:'ON', off:'OFF',
    saveStateSaved:'Game state saved.', saveComplete:'Save complete', autosaveComplete:'✅ Autosave complete', noSavedData:'No saved data found.', saveLoaded:'Saved data loaded.', saveLoadError:'An error occurred while loading save data.', saveDeleted:'Save data deleted.', exportFail:'Export failed (check console)', riskModeLog:'Risk Hack Mode: {state}', riskPenaltyLog:'Risk Hack Mode penalty: failure consumed 1 additional energy.', loadoutSaved:'Saved current setup to loadout slot {slot}.', loadoutEmpty:'There is no saved setup in loadout slot {slot}.', loadoutLoaded:'Loaded loadout slot {slot}.',
    toastAchievement:'Achievement unlocked: {name}', achievementLog:'[Achievement] {name}', activeCode:'Active code changed: {name}', levelUpLog:'Level up! Reached Lv.{lv}. Credits +50.', noEnergyPack:'No energy packs available.', energyFull:'Energy is already full.', usedEnergyPack:'Used 1 energy pack and fully restored energy.',
    noCodeSync:'There is no code to sync.', syncFailShards:'Code sync failed: not enough duplicate shards. (Need: {need}, Have: {have})', syncDone:'Code sync complete: {name} reached sync stage {lv}. Power +{pwr}, success bonus +{rate}%.', syncToast:'{name} sync stage {lv}', noCodeUpgrade:'There is no code to upgrade. Scan a code first.', upgradeFailCredits:'Code upgrade failed: not enough credits. (Need: {cost})', upgradeDone:'Code upgraded: {name} Lv.{lv} (Power +5 → {pwr}), Credits -{cost}.', noCodeEvolve:'There is no code to evolve.', maxRarity:'Already at the highest rarity (LEGENDARY). It cannot evolve further.', evolveNeedLv:'Code evolution failed: evolution requires at least Lv.5.', evolveCannot:'Cannot process evolution.', evolveDone:'Code evolution success: {name} advanced to {rarity}, Power +10 → {pwr}.',
    noEnergyScan:'Not enough energy to scan a code.', noEnergyHack:'Not enough energy to hack the server.', energyPackToast:'Energy Pack +1 (Owned: {v})', offlineRecoverLog:'Recovered {v} energy while offline ({label} elapsed)', offlineRecoverToast:'Offline recovery: Energy +{v}', exportDone:'Save data exported.', importDone:'Save data imported.', importFail:'Import failed: please check the JSON format.', emptyText:'The text box is empty.', logsHide:'Hide Logs', logsShow:'Show Logs', initLog:'HCSiG initialized. (language setting, duplicate shards/code sync, mobile UI, shop categories enabled)', mobileHome:'HOME', mobileCodes:'CODES', mobileShop:'SHOP', mobileComing:'COMING SOON', comingSoonToast:'Coming Soon - This feature is in preparation.', buy:'Buy', buyDone:'Purchase complete', buyUnavailable:'Unavailable', buySpendTitle:'Buying this item will consume credits.', buyDailyLimit:'You have reached today\'s purchase limit.', buyOnceLimit:'This permanent item has already been purchased.', notEnoughCredits:'Not enough credits.', shopLog:'[Shop] {msg}', shopBought:'Purchased {name} (💰 -{cost})', missionDoneToast:'Mission complete: {name} ({reward})', missionDoneCredits:'Credits +{v}', missionDoneEnergyPack:'Energy Pack +{v}', missionDoneBoth:'Credits +{c} / Energy Pack +{e}', serverOption:'{name} (Security {sec}, Lv{lv}+)', serverLevelNeed:'You must be at least Lv.{lv} to hack this server.', noOwnedCodes:'You do not own any codes yet. Scan codes first.', scanFound:'New code discovered! {name} [{rarity}]', scanDuplicate:'Duplicate code detected: {name} [{rarity}] → Duplicate Shards +{gain} (Owned {have}).', scanDone:'Code scan complete: EXP +{exp}.', hackSuccessLog:'Server hack success! [{server}] Success chance {chance}%. Credits +{credits}, EXP +{exp}.', hackFailLog:'Server hack failed. [{server}] Success chance was {chance}%.', logDailyShopReset:'[System] Daily shop limits have been reset. (05:00 reset)', loadoutSlot:'Slot {n}', logPinHint:'Click a log entry to pin/unpin it', saveToLocal:'Save the current state to browser LocalStorage.', loadFromLocal:'Load saved data from LocalStorage.', deleteSave:'Delete the saved data.', exportJson:'Export the current save data as a JSON file.', importJsonFile:'Load a JSON save file.', importJsonText:'Load save data from text (JSON).', languageTitle:'Select the game language.', uiScaleTitle:'Adjust the overall UI scale.', toastTitle:'Set how long toast notifications remain on screen.', shopSortTitle:'Choose how shop items are sorted.', codeSortTitle:'Choose how the code inventory is sorted.', dailyResetLabel:'05:00 reset ({n})', onceLabel:'one-time', dailyShort:'daily', onceShort:'once', rarityCommon:'COMMON', rarityUncommon:'UNCOMMON', rarityRare:'RARE', rarityEpic:'EPIC', rarityLegendary:'LEGENDARY'
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
      exp_boost: { name:'EXP Amplifier', desc:'Permanently increases EXP gain by 20%.' },
      cpu_discount: { name:'CPU Upgrade Coupon', desc:'Reduces CPU upgrade cost by 10% (stacks).' },
      perm_credit_boost: { name:'Permanent Credit Multiplier', desc:'Permanently increases hack credit rewards by 15% (one-time purchase).' },
      risk_support: { name:'Risk Hack Supporter', desc:'Permanently adds +5%p success chance in Risk Hack Mode (one-time purchase).' },
      big_credit_pack: { name:'Data Credit Pack', desc:'Instantly grants +500 credits. (Daily purchase limit: 2)' },
      scanner_plus: { name:'Precision Scanner', desc:'Gain +1 extra EXP when scanning codes (permanent, one-time purchase).' },
      level_ticket: { name:'Simulation Level Ticket', desc:'Instantly raises your level by 1.' }
    }
  }
};

function localizeServerName(server){
  return (getLang()==='en' && TEXT_DATA.en.servers[server.id]) ? TEXT_DATA.en.servers[server.id] : server.name;
}
function localizeShopName(item){
  return (getLang()==='en' && TEXT_DATA.en.shop[item.id] && TEXT_DATA.en.shop[item.id].name) ? TEXT_DATA.en.shop[item.id].name : item.name;
}
function localizeShopDesc(item){
  return (getLang()==='en' && TEXT_DATA.en.shop[item.id] && TEXT_DATA.en.shop[item.id].desc) ? TEXT_DATA.en.shop[item.id].desc : item.desc;
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
  const map={COMMON:'rarityCommon',UNCOMMON:'rarityUncommon',RARE:'rarityRare',EPIC:'rarityEpic',LEGENDARY:'rarityLegendary'};
  return t(map[rarity] || rarity);
}
function localizeShopLimitLabel(info){
  if (!info) return '';
  if (info.type === 'daily') return t('dailyResetLabel', { n: info.limit });
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
    ['[data-view="home"], [data-mobile-tab="home"]', t('mobileHome')],
    ['[data-view="codes"], [data-mobile-tab="codes"]', t('mobileCodes')],
    ['[data-view="shop"], [data-mobile-tab="shop"]', t('mobileShop')],
    ['[data-view="soon"], [data-mobile-tab="coming"]', t('mobileComing')]
  ];
  selectors.forEach(([sel, label]) => {
    document.querySelectorAll(sel).forEach(el => { el.textContent = label; });
  });
}
function applyLanguageToUI(){
  try{ document.documentElement.lang = getLang(); document.title = t('appTitle'); }catch(e){}
  setText('subtitleText', t('subtitle')); setText('btnMore', t('more')); setText('moreTitle', t('moreTitle'));
  setText('titleStatus', t('status')); setText('titleShop', t('shop')); setText('titleActions', t('actions')); setText('titleCodeInventory', t('codeInventory')); setText('titleCodeDetail', t('codeDetail'));
  setText('labelLevel', t('level')); setText('labelExp', t('exp')); setText('labelCredits', t('credits')); setText('labelCpuTier', t('cpuTier')); setText('labelEnergy', t('energy')); setText('labelEnergyTimer', t('nextRecovery')); setText('labelEnergyPack', t('energyPack')); setText('labelLastSave', t('lastSave')); setText('btnUseEnergyPack', t('use'));
  setText('shopSortLabel', t('sort')); setText('shopCategoryLabel', t('category')); setText('shopCatAll', t('all')); setText('shopCatEnergy', t('energy')); setText('shopCatSystem', t('system')); setText('shopCatEconomy', t('economy')); setText('shopCatUtility', t('utility'));
  setText('btnScan', t('codeScan')); setText('btnHack', t('serverHack')); setText('btnUpgradeCpu', t('cpuUpgrade')); setText('labelTargetServer', t('targetServer')); setText('labelLoadout', t('loadout')); setText('btnSaveLoadout', t('saveSlot')); setText('btnLoadLoadout', t('loadSlot')); setText('riskModeText', t('riskMode'));
  setText('actionsDesc1', t('actionsDesc1')); setText('actionsDesc2', t('actionsDesc2')); setText('actionsDesc3', t('actionsDesc3')); setText('actionsDesc4', t('actionsDesc4'));
  setText('btnUpgradeCode', t('codeUpgrade')); setText('btnSyncCode', t('codeSync')); setText('btnEvolveCode', t('codeEvolve')); setText('codeDesc1', t('codeDesc1')); setText('codeDesc2', t('codeDesc2')); setText('codeDesc3', t('codeDesc3'));
  setText('tabBtnMission', t('mission')); setText('tabBtnAchievement', t('achievement')); setText('tabBtnCodex', t('codex')); setText('tabBtnLogs', t('logs')); setText('tabBtnSettings', t('settings')); setText('tabBtnSave', t('data'));
  setText('missionTabTitle', t('quest')); setText('achievementTabTitle', t('achievement')); setText('codexTabTitle', t('codex')); setText('logsTabTitle', t('records')); setText('settingsTabTitle', t('envSettings')); setText('saveTabTitle', t('dataManage')); setText('btnMoreClose2', t('close'));
  setText('logSearchHelp', t('logSearchHelp')); const lsi=document.getElementById('logSearchInput'); if(lsi) lsi.placeholder=t('searchPlaceholder'); setText('btnClearLogs', t('clearLogs')); const btnToggle=document.getElementById('btnToggleLogs'); if(btnToggle){ btnToggle.textContent = (window.logsHidden ? t('showLogs') : t('hideLogs')); } setText('logFilterTitle', t('logFilter'));
  setText('labelLanguage', t('language')); setText('labelFontScale', t('fontScale')); setText('labelSnow', t('snow')); setText('labelUiScale', t('uiScale')); setText('labelAnim', t('animation')); setText('labelToastMs', t('toastTime')); setText('labelAutoSaveToast', t('autosaveToast')); setHtml('settingsHelp', t('settingsHelp'));
  setText('btnSaveGame', t('saveNow')); setText('btnLoadGame', t('loadNow')); setText('btnClearSave', t('clearSave')); setText('btnExportSave', t('exportSave')); setText('btnImportSaveFile', t('importFile')); setText('importTextTitle', t('importText')); const ist=document.getElementById('importSaveText'); if(ist) ist.placeholder=t('importTextPlaceholder'); setText('btnImportSaveText', t('importTextBtn')); setHtml('saveHelp', t('saveHelp'));
  const shopSort=document.getElementById('shopSortSelect'); if(shopSort){ const map=['shopSortUpdate','shopSortNew','shopSortRarity','shopSortPrice','shopSortName']; [...shopSort.options].forEach((opt,i)=>opt.text=t(map[i])); shopSort.title=t('shopSortTitle'); }
  const codeSort=document.getElementById('codeSortSelect'); if(codeSort){ const map=['codeSortRecent','codeSortRarity','codeSortPower','codeSortLevel','codeSortName']; [...codeSort.options].forEach((opt,i)=>opt.text=t(map[i])); codeSort.title=t('codeSortTitle'); }
  const setLangEl=document.getElementById('setLanguage'); if(setLangEl){ setLangEl.title=t('languageTitle'); [...setLangEl.options].forEach(opt=>{ if(opt.value==='ko') opt.textContent = getLang()==='en' ? 'Korean' : '한국어'; if(opt.value==='en') opt.textContent = 'English'; }); }
  const setUiZoomEl=document.getElementById('setUiZoom'); if(setUiZoomEl) setUiZoomEl.title=t('uiScaleTitle');
  const setToastMsEl=document.getElementById('setToastMs'); if(setToastMsEl){ setToastMsEl.title=t('toastTitle'); [...setToastMsEl.options].forEach(opt=>{ const secs=Math.round(Number(opt.value||0)/1000); opt.textContent = `${secs}${getLang()==='en' ? ' sec' : '초'}`; }); }
  ['setSnow','setAnim'].forEach(id=>{ const input=document.getElementById(id); if(input && input.parentElement){ input.parentElement.lastChild.textContent = ' ' + t('enabled'); } });
  const ast=document.getElementById('setAutoSaveToast'); if(ast && ast.parentElement){ ast.parentElement.lastChild.textContent = ' ' + t('visible'); }
  const btnSaveGameEl=document.getElementById('btnSaveGame'); if(btnSaveGameEl) btnSaveGameEl.title=t('saveToLocal');
  const btnLoadGameEl=document.getElementById('btnLoadGame'); if(btnLoadGameEl) btnLoadGameEl.title=t('loadFromLocal');
  const btnClearSaveEl=document.getElementById('btnClearSave'); if(btnClearSaveEl) btnClearSaveEl.title=t('deleteSave');
  const btnExportSaveEl=document.getElementById('btnExportSave'); if(btnExportSaveEl) btnExportSaveEl.title=t('exportJson');
  const btnImportSaveFileEl=document.getElementById('btnImportSaveFile'); if(btnImportSaveFileEl) btnImportSaveFileEl.title=t('importJsonFile');
  const btnImportSaveTextEl=document.getElementById('btnImportSaveText'); if(btnImportSaveTextEl) btnImportSaveTextEl.title=t('importJsonText');
  const loadoutSelectEl=document.getElementById('loadoutSelect'); if(loadoutSelectEl){ [...loadoutSelectEl.options].forEach(opt=>{ opt.textContent=t('loadoutSlot',{n:opt.value}); }); }
  refreshMobileTabTexts();
  try { rerenderLogEntries(); } catch(e){}
  try { renderServers(); } catch(e){}
}
    const OLD_SAVE_KEY = 'HCSiG_SAVE_v15';
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
      }

    ];

    let activeUpdateIndex = updateLogs.length - 1;

    const state = {
      level: 1,
      exp: 0,
      requiredExp: 20,
      credits: 0,
      cpuTier: 1,
      energy: 20,
      energyMax: 20,
      energyTimerMs: 0,
      items: { energyPack: 0 },
      lastSavedAt: null,
      lastSeenAt: null,
      tutorial: { completed: true, step: 0, seen: true },
      activeCodeId: null,
      riskMode: false,
      missionProgress: {
        daily: {
          scans: 0,
          actions: 0,
          hackSuccess: 0,
          energySpent: 0,
          lastResetDay: null,
          completed: {}
        },
        weekly: {
          scans: 0,
          hackSuccess: 0,
          energySpent: 0,
          levelReached: 1,
          lastResetWeek: null,
          completed: {}
        },
        month: {
          scans: 0,
          hackSuccess: 0,
          energySpent: 0,
          levelReached: 1,
          lastResetMonth: null,
          completed: {}
        },
        general: {
          completed: {}
        }
      },
      achievements: {},
      loadouts: {
        1: { codeId: null, serverId: null, riskMode: false },
        2: { codeId: null, serverId: null, riskMode: false },
        3: { codeId: null, serverId: null, riskMode: false }
      },
      logFilter: {
        system: true,
        scan: true,
        hack: true,
        shop: true,
        level: true
      },
      ui: { lang: 'ko', shopSortMode: 'update', shopCategory: 'all', codeSortMode: 'recent', toastDurationMs: 3000, uiZoom: 1, fontScale: 100, anim: true, autoSaveToast: false, logSearch: '', snowEnabled: null },
      stats: {
        scanCount: 0,
        hackSuccessCount: 0,
        shopPurchaseCount: 0,
        energySpentTotal: 0,
        creditsEarnedTotal: 0,
        missionsCompletedTotal: 0,
        riskHackSuccessCount: 0,
        codeShardsTotal: 0,
        codeUpgradeCount: 0,
        codeSyncCount: 0,
        codeEvolutionCount: 0,
        energyPacksUsed: 0
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
      }
    };

    const rarityOrder = ['COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'LEGENDARY'];

    const rarityWeights = {
      COMMON: 70,
      UNCOMMON: 20,
      RARE: 7,
      EPIC: 2.5,
      LEGENDARY: 0.5
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
      {
        id: 'school_lab',
        name: '학교 실습 서버',
        security: 20,
        minReward: 10,
        maxReward: 25,
        minLevel: 1
      },
      {
        id: 'bank_backup',
        name: '은행 백업 노드',
        security: 35,
        minReward: 25,
        maxReward: 50,
        minLevel: 2
      },
      {
        id: 'gov_archive',
        name: '정부 기록 보관 노드',
        security: 50,
        minReward: 40,
        maxReward: 80,
        minLevel: 3
      },
      {
        id: 'central_core',
        name: '중앙 코어 그리드',
        security: 70,
        minReward: 70,
        maxReward: 140,
        minLevel: 4
      },
      {
        id: 'deep_space',
        name: '딥 스페이스 릴레이',
        security: 90,
        minReward: 100,
        maxReward: 200,
        minLevel: 5
      }
    ];

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
        desc: '즉시 크레딧 +300. (일일 구매 제한)',
        cost: 400,
        rarity: 'COMMON',
        category: 'ECONOMY',
        buy: () => {
          state.credits += 300;
          state.stats.creditsEarnedTotal += 300;
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

    // 상점/경험치 계수
    const modifiers = {
      creditMultiplierSession: 1.0,
      scanExtraExp: 0,
      creditMultiplierPermanent: 1.0,
      expMultiplier: 1.0,
      cpuUpgradeDiscount: 1.0,
      riskSuccessBonus: 0.0
    };

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
        { id: 'weekly_energy0',    name: '방전 습관',          type: 'energy0Flag', target: 1,   rewardCredits: 150, desc: '이번 주 최소 1회 에너지를 0까지 소모' }
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

      achievementDefs.forEach(def => {
        if (overrides[def.id]) {
          def.desc = overrides[def.id][0];
          def.difficulty = overrides[def.id][1];
          return;
        }
        for (const [prefix, values] of Object.entries(thresholdGroups)) {
          const idx = values.findIndex((_, i) => def.id === `${prefix}${def.id.slice(prefix.length)}`);
          if (def.id.startsWith(prefix)) {
            const suffix = def.id.slice(prefix.length);
            const pos = (thresholdGroups[prefix] || []).findIndex((_, i) => String(extraAchievementDefs.filter(x => x.id.startsWith(prefix))[i]?.id.slice(prefix.length) || '') === suffix);
            const newValue = pos >= 0 ? thresholdGroups[prefix][pos] : null;
            if (newValue != null && labelMap[prefix]) def.desc = labelMap[prefix].replace('{v}', newValue);
            break;
          }
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

    const btnMore = document.getElementById('btnMore');
    const moreModalBackdrop = document.getElementById('moreModalBackdrop');
    const btnMoreClose = document.getElementById('btnMoreClose');
    const btnMoreClose2 = document.getElementById('btnMoreClose2');

    const btnSaveGame = document.getElementById('btnSaveGame');
    const btnLoadGame = document.getElementById('btnLoadGame');
    const btnClearSave = document.getElementById('btnClearSave');

    const missionListEl = document.getElementById('missionList');
    const achievementListEl = document.getElementById('achievementList');
    const codexListEl = document.getElementById('codexList');
    const codexSummaryEl = document.getElementById('codexSummary');

    const chkRiskMode = document.getElementById('chkRiskMode');
    const loadoutSelect = document.getElementById('loadoutSelect');
    const btnSaveLoadout = document.getElementById('btnSaveLoadout');
    const btnLoadLoadout = document.getElementById('btnLoadLoadout');

    const filterSystem = document.getElementById('filterSystem');
    const filterScan = document.getElementById('filterScan');
    const filterHack = document.getElementById('filterHack');
    const filterShop = document.getElementById('filterShop');
    const filterLevel = document.getElementById('filterLevel');

    const moreTabButtons = document.querySelectorAll('.more-tab-button');
    const tabUpdate = document.getElementById('tabUpdate');
    const tabMission = document.getElementById('tabMission');
    const tabAchievement = document.getElementById('tabAchievement');
    const tabCodex = document.getElementById('tabCodex');
    const tabLogs = document.getElementById('tabLogs');
    const tabSettings = document.getElementById('tabSettings');
    const tabSave = document.getElementById('tabSave');

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
    const setToastMs = document.getElementById('setToastMs');
    const setAutoSaveToast = document.getElementById('setAutoSaveToast');

    const tutorialBackdrop = document.getElementById('tutorialBackdrop');
    const tutorialStepLabel = document.getElementById('tutorialStepLabel');
    const tutorialStepTitle = document.getElementById('tutorialStepTitle');
    const tutorialStepText = document.getElementById('tutorialStepText');
    const tutorialStepHint = document.getElementById('tutorialStepHint');
    const btnTutorialPrev = document.getElementById('btnTutorialPrev');
    const btnTutorialNext = document.getElementById('btnTutorialNext');
    const btnTutorialFinish = document.getElementById('btnTutorialFinish');
    const btnTutorialSkip = document.getElementById('btnTutorialSkip');
    const btnOpenTutorial = document.getElementById('btnOpenTutorial');

    const btnExportSave = document.getElementById('btnExportSave');
    const btnImportSaveFile = document.getElementById('btnImportSaveFile');
    const fileImportSave = document.getElementById('fileImportSave');
    const importSaveText = document.getElementById('importSaveText');
    const btnImportSaveText = document.getElementById('btnImportSaveText');

    // 상태
    let missionScopeActive = 'daily';
    let logsHidden = false;
    let scanRunning = false;
    let tutorialOpenedOnce = false;

    const tutorialSteps = [
      {
        title: '환영합니다',
        text: 'HCSiG에 오신 것을 환영합니다. 이 튜토리얼은 첫 플레이에서 필요한 핵심 루프만 짧게 안내합니다.',
        hint: '다음 버튼을 눌러 진행하세요.',
        waitAction: false
      },
      {
        title: 'HOME 확인',
        text: '여기서는 레벨, 경험치, 크레딧, 에너지, CPU 상태를 확인하고 주요 행동을 실행할 수 있습니다.',
        hint: '상태를 확인했다면 다음 단계로 이동하세요.',
        waitAction: false
      },
      {
        title: '코드 스캔 실행',
        text: '먼저 코드 스캔을 1회 실행해 보세요. 스캔은 새로운 코드를 찾거나 기존 코드를 강화하는 출발점입니다.',
        hint: 'HOME의 [코드 스캔] 버튼을 눌러 주세요. 완료되면 자동으로 다음 단계로 넘어갑니다.',
        waitAction: true
      },
      {
        title: '코드 선택',
        text: '획득한 코드는 코드 인벤토리에서 확인할 수 있습니다. 코드를 눌러 활성 코드로 바꾸고 상세 정보를 확인해 보세요.',
        hint: '코드 인벤토리의 항목을 한 번 클릭하면 자동으로 다음 단계로 넘어갑니다.',
        waitAction: true
      },
      {
        title: '서버 해킹',
        text: '선택한 코드와 CPU 성능을 바탕으로 서버 해킹을 시도할 수 있습니다. 해킹은 크레딧과 성장의 핵심 루프입니다.',
        hint: 'HOME의 [서버 해킹] 버튼을 눌러 1회 시도해 보세요. 성공 여부와 관계없이 다음 단계로 진행됩니다.',
        waitAction: true
      },
      {
        title: '성장과 상점',
        text: '크레딧을 모아 CPU를 업그레이드하고, 상점을 활용해 성장 속도를 조절할 수 있습니다. 이제 기본 흐름을 모두 익혔습니다.',
        hint: '시작하기를 누르면 튜토리얼이 종료되고 자유 플레이로 전환됩니다.',
        waitAction: false
      }
    ];

    function getDayKey() {
      return new Date().toISOString().slice(0, 10);
    }
    function getWeekKey() {
      return Math.floor(Date.now() / (7 * 24 * 3600 * 1000));
    }
    function getMonthKey() {
      const d = new Date();
      return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
    }

    function ensureTutorialDefaults() {
      state.tutorial = state.tutorial || {};
      if (typeof state.tutorial.completed !== 'boolean') state.tutorial.completed = true;
      if (!Number.isInteger(state.tutorial.step)) state.tutorial.step = 0;
      if (state.tutorial.step < 0) state.tutorial.step = 0;
      if (state.tutorial.step >= tutorialSteps.length) state.tutorial.step = tutorialSteps.length - 1;
      if (typeof state.tutorial.seen !== 'boolean') state.tutorial.seen = true;
    }

    function isTutorialOpen() {
      return !!(tutorialBackdrop && tutorialBackdrop.classList.contains('show'));
    }

    function renderTutorial() {
      if (!tutorialBackdrop) return;
      ensureTutorialDefaults();
      const idx = Math.min(Math.max(0, state.tutorial.step || 0), tutorialSteps.length - 1);
      const step = tutorialSteps[idx];
      tutorialStepLabel.textContent = `STEP ${idx + 1} / ${tutorialSteps.length}`;
      tutorialStepTitle.textContent = step.title;
      tutorialStepText.textContent = step.text;
      tutorialStepHint.textContent = step.hint || '';
      tutorialStepHint.style.display = step.hint ? '' : 'none';
      const interactive = !!step.waitAction;
      tutorialBackdrop.classList.toggle('interactive', interactive);
      document.body.classList.toggle('tutorial-interactive', interactive && isTutorialOpen());
      btnTutorialPrev.disabled = idx <= 0;
      const waiting = interactive;
      btnTutorialNext.style.display = idx === tutorialSteps.length - 1 ? 'none' : '';
      btnTutorialNext.disabled = waiting;
      btnTutorialFinish.style.display = idx === tutorialSteps.length - 1 ? '' : 'none';
    }

    function openTutorial(forceRestart = false) {
      state.tutorial = state.tutorial || {};
      state.tutorial.completed = true;
      state.tutorial.seen = true;
      if (tutorialBackdrop) {
        tutorialBackdrop.classList.remove('show');
        tutorialBackdrop.classList.remove('interactive');
        tutorialBackdrop.setAttribute('aria-hidden', 'true');
      }
      document.body.classList.remove('tutorial-open');
      document.body.classList.remove('tutorial-interactive');
    }

    function closeTutorial(markCompleted = false) {
      if (!tutorialBackdrop) return;
      if (markCompleted) {
        state.tutorial.completed = true;
        state.tutorial.step = tutorialSteps.length - 1;
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
      if (state.tutorial.step < tutorialSteps.length - 1) {
        state.tutorial.step += 1;
        renderTutorial();
        saveGame(true);
      }
    }

    function prevTutorialStep() {
      ensureTutorialDefaults();
      if (state.tutorial.step > 0) {
        state.tutorial.step -= 1;
        renderTutorial();
      }
    }

    function onTutorialAction(action) {
      state.tutorial = state.tutorial || {};
      state.tutorial.completed = true;
      return;
    }

    function maybeStartTutorial() {
      state.tutorial = state.tutorial || {};
      state.tutorial.completed = true;
      state.tutorial.seen = true;
      return;
    }

    let secondaryPanelsRaf = null;
    function flushSecondaryPanels() {
      secondaryPanelsRaf = null;
      renderCodeList();
      renderCodeDetail();
      renderMissions();
      renderAchievements();
      renderCodex();
    }

    function scheduleSecondaryPanelsRefresh() {
      if (secondaryPanelsRaf) return;
      secondaryPanelsRaf = requestAnimationFrame(flushSecondaryPanels);
    }

    function updateStatsUI() {
      statLevel.textContent = state.level;
      statExp.textContent = state.exp + ' / ' + state.requiredExp;
      statCredits.textContent = state.credits;
      statCpuTier.textContent = state.cpuTier;
      statEnergyValue.textContent = `${state.energy} / ${state.energyMax}`;

      if (state.energy >= state.energyMax) {
        statEnergyTimer.textContent = t('full');
      } else {
        const sec = state.energyTimerMs / 1000;
        statEnergyTimer.textContent = sec.toFixed(1) + ' ' + t('seconds');
      }

      const ratio = state.energy / state.energyMax;
      energyBarInner.style.width = (ratio * 100) + '%';

      chkRiskMode.checked = state.riskMode;

      // 에너지 팩 UI
      const packCount = state.items && typeof state.items.energyPack === 'number' ? state.items.energyPack : 0;
      statEnergyPack.textContent = packCount;
      const canUsePack = packCount > 0 && state.energy < state.energyMax;
      btnUseEnergyPack.disabled = !canUsePack;

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

      scheduleSecondaryPanelsRefresh();
    }


    function showToast(message, kind = 'info') {
      if (!toastContainer) return;
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

    function applyLogFilter() {
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

    function consumeEnergy(amount) {
      ensureMissionResets();
      if (state.energy < amount) return false;
      state.energy -= amount;
      state.stats.energySpentTotal += amount;

      state.missionProgress.daily.energySpent += amount;
      state.missionProgress.weekly.energySpent += amount;
      state.missionProgress.month.energySpent += amount;

      checkMissions('daily');
      checkMissions('weekly');
      checkMissions('month');
      checkMissions('general');

      if (state.energy <= 0) {
        state.energy = 0;
        unlockAchievement('energy_zero');
      }

      if (state.energy < state.energyMax && state.energyTimerMs <= 0) {
        state.energyTimerMs = ENERGY_INTERVAL_MS;
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
          if (state.energy < state.energyMax) {
            state.energyTimerMs = ENERGY_INTERVAL_MS;
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
        if (state.activeCodeId === code.id) li.classList.add('active');

        const left = document.createElement('span');
        left.textContent = code.name;
        const rarityClass = 'rarity-' + code.rarity.toLowerCase();
        left.classList.add(rarityClass);

        const right = document.createElement('span');
        right.className = 'meta';
        right.textContent = `[${localizeRarityLabel(code.rarity)}] Lv.${code.level} / PWR ${code.power}`;

        li.appendChild(left);
        li.appendChild(right);

        li.addEventListener('click', () => {
          state.activeCodeId = code.id;
          updateStatsUI();
          log(t('activeCode', { name: code.name }), 'system');
          onTutorialAction('selectCode');
          if (window.matchMedia('(max-width: 900px), (hover: none) and (pointer: coarse)').matches) {
            setTimeout(() => {
              const detailWrap = codeDetailEl && codeDetailEl.closest('.stat-box');
              if (detailWrap && typeof detailWrap.scrollIntoView === 'function') detailWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 20);
          }
        });

        codeListEl.appendChild(li);
      });
    }

    function renderCodeDetail() {
      const code = getActiveCodeInstance();
      if (!code) {
        codeDetailEl.innerHTML = `<div class="small">${t('selectCode')}</div>`;
        return;
      }
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
      const html = `
        <div style="margin-bottom:4px;">
          <strong class="${rarityClass}">${code.name}</strong>
          <span class="rarity-tag ${rarityClass}">[${localizeRarityLabel(code.rarity)}]</span>
        </div>
        <div class="small">${t('levelLabel', { v: code.level })}</div>
        <div class="small">${t('powerLabel', { v: code.power })}</div>
        <div class="small">${t('usageLabel', { v: usage })}</div>
        <div class="small">${t('shardsLabel', { v: shardCount })}</div>
        <div class="small">${t('syncLabel', { v: syncLevel })}</div>
        <div class="small code-next-meta">${t('nextUpgrade', { v: upgradeCost })}</div>
        <div class="small code-next-meta">${t('nextSync', { a: syncCost, b: syncBonusText })}</div>
        <div class="small code-next-meta">${evolveReady ? t('evolveReady') : t('evolveNeed')}</div>
        <div class="small" style="margin-top:6px; color:#a5b4fc;">${t('ability')}</div>
        <div class="small">${ability}</div>
      `;
      codeDetailEl.innerHTML = html;
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

      log(t('syncDone', { name: code.name, lv: code.syncLevel, pwr: powerBonus, rate: Math.round(getSyncSuccessBonus(code.syncLevel) * 100) }), 'system');
      showToast(t('syncToast', { name: code.name, lv: code.syncLevel }), 'system');
      updateStatsUI();
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
      log(t('upgradeDone', { name: code.name, lv: code.level, pwr: code.power, cost }), 'system');
      updateStatsUI();
      checkMissions('general');
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
      log(t('evolveDone', { name: code.name, rarity: nextRarity, pwr: code.power }), 'system');

      if (nextRarity === 'EPIC' || nextRarity === 'LEGENDARY') {
        unlockAchievement('get_epic_code');
      }
      updateStatsUI();
      checkMissions('general');
    }

    function renderServers() {
      serverSelect.innerHTML = '';
      servers.forEach(s => {
        const option = document.createElement('option');
        option.value = s.id;
        option.textContent = t('serverOption', { name: localizeServerName(s), sec: s.security, lv: s.minLevel });
        serverSelect.appendChild(option);
      });
    }

    
    // =========================
    // SHOP LIMITS (Daily / One-time)
    // =========================
    const SHOP_LIMITS = {
      // Daily cap
      energy_pack: { type: 'daily', limit: 3, label: '05:00 리셋 (3회)' },
      energy_boost_1: { type: 'daily', limit: 3, label: '05:00 리셋 (3회)' },
      energy_boost_2: { type: 'daily', limit: 2, label: '05:00 리셋 (2회)' },
      credit_boost_run: { type: 'daily', limit: 1, label: '05:00 리셋 (1회)' },
      scanner_module: { type: 'daily', limit: 1, label: '05:00 리셋 (1회)' },
      cpu_discount: { type: 'daily', limit: 1, label: '05:00 리셋 (1회)' },
      max_energy_up: { type: 'daily', limit: 1, label: '05:00 리셋 (1회)' },
      big_credit_pack: { type: 'daily', limit: 1, label: '05:00 리셋 (1회)' },
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

      const baseOrder = new Map();
      shopItems.forEach((it, idx) => baseOrder.set(it.id, idx));

      const mode = (state.ui && state.ui.shopSortMode) ? state.ui.shopSortMode : 'update';
      const categoryMode = (state.ui && state.ui.shopCategory) ? state.ui.shopCategory : 'all';
      if (codeSortSelect) {
      codeSortSelect.value = (state.ui && state.ui.codeSortMode) ? state.ui.codeSortMode : 'recent';
      codeSortSelect.addEventListener('change', () => {
        state.ui = state.ui || { shopSortMode: 'update', shopCategory: 'all', codeSortMode: 'recent' };
        state.ui.codeSortMode = codeSortSelect.value;
        renderCodeList();
      });
    }

    if (shopCategoryTabButtons && shopCategoryTabButtons.length) {
        shopCategoryTabButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.category === categoryMode));
      }
      const items = shopItems.filter(item => categoryMode === 'all' ? true : item.category === categoryMode);

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
        costSpan.textContent = `💰 ${item.cost}`;
        // limit badge (daily/once)
        const lim = getShopRemaining(item.id);
        if (lim) {
          const badge = document.createElement('span');
          badge.className = 'shop-limit-badge';
          badge.textContent = `${lim.used}/${lim.limit} (${localizeShopLimitLabel(lim)})`; 
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

          if (state.credits < item.cost) {
            log(t('shopLog', { msg: `${t('notEnoughCredits')} (${getLang()==='en' ? 'Need' : '필요'}: ${item.cost})` }), 'shop');
            showToast(t('notEnoughCredits'), 'shop');
            return;
          }
          // 고가/고희귀 구매 확인
          const rr = rarityRank[item.rarity] || 0;
          if (rr >= 4) {
            const ok = window.confirm(`${itemName} (${item.rarity})\n💰 ${item.cost}`);
            if (!ok) return;
          }
          state.credits -= item.cost;
          item.buy?.();
          // mark cap usage
          markShopPurchase(item.id);

          state.stats.shopPurchaseCount++;
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
    function rollRarity() {
      const total =
        rarityWeights.COMMON +
        rarityWeights.UNCOMMON +
        rarityWeights.RARE +
        rarityWeights.EPIC +
        rarityWeights.LEGENDARY;
      let r = Math.random() * total;
      for (const rar of rarityOrder) {
        const w = rarityWeights[rar];
        if (r < w) return rar;
        r -= w;
      }
      return 'COMMON';
    }

    function getScanDurationForRarity(rarity) {
      switch (rarity) {
        case 'COMMON': return 500;
        case 'UNCOMMON': return 650;
        case 'RARE': return 800;
        case 'EPIC': return 1000;
        case 'LEGENDARY': return 1200;
        default: return 600;
      }
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

      const energyCost = 1;
      if (!consumeEnergy(energyCost)) {
        log(t('noEnergyScan'), 'scan');
        return;
      }
      state.stats.scanCount++;
      state.missionProgress.daily.scans++;
      state.missionProgress.daily.actions++;
      state.missionProgress.weekly.scans++;
      state.missionProgress.month.scans++;
      checkMissions('daily');
      checkMissions('weekly');
      checkMissions('month');
      checkMissions('general');

      if (scanRunning) return;

      const rarity = rollRarity();
      const duration = getScanDurationForRarity(rarity);

      btnScan.disabled = true;
      btnHack.disabled = true;
      btnUpgradeCpu.disabled = true;

      runScanAnimation(duration, () => {
        const templates = Object.values(codeDefs).filter(d => d.rarity === rarity);
        let chosen = null;

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
            unlockAchievement('get_epic_code');
          }
        } else {
          const shardGain = getShardGainByRarity(rarity);
          existing.shards = (existing.shards || 0) + shardGain;
          state.stats.codeShardsTotal = (state.stats.codeShardsTotal || 0) + shardGain;
          log(t('scanDuplicate', { name: chosen.name, rarity, gain: shardGain, have: existing.shards }), 'scan');
          showToast(`${chosen.name} 조각 +${shardGain}`, 'scan');
          const def = codeDefs[existing.id];
          if (def && (def.rarity === 'EPIC' || def.rarity === 'LEGENDARY')) {
            unlockAchievement('get_epic_code');
          }
        }

        const expGain = 2 + modifiers.scanExtraExp;
        addExp(expGain);
        log(t('scanDone', { exp: expGain }), 'scan');
        onTutorialAction('scan');

        checkAchievements('scan');
        checkMissions('general');

        btnScan.disabled = false;
        btnHack.disabled = false;
        btnUpgradeCpu.disabled = false;
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

      const energyCost = 2;
      if (!consumeEnergy(energyCost)) {
        log(t('noEnergyHack'), 'hack');
        return;
      }

      state.missionProgress.daily.actions++;
      onTutorialAction('hack');

      let serverSec = server.security;
      let creditMultiplier = modifiers.creditMultiplierSession * modifiers.creditMultiplierPermanent;
      let successChanceBonus = getSyncSuccessBonus(code.syncLevel || 0);

      if (def) {
        if (def.id === 'port_scanner') serverSec = Math.floor(serverSec * 0.9);
        if (def.id === 'shield_bypass') serverSec = Math.floor(serverSec * 0.85);
        if (def.id === 'fortress_breaker') serverSec = Math.floor(serverSec * 0.75);

        if (def.id === 'pulse_ping') successChanceBonus += 0.03;
        if (def.id === 'stack_tracer') successChanceBonus += 0.05;
        if (def.id === 'data_phantom') successChanceBonus += 0.1;
        if (def.id === 'quantum_splice') successChanceBonus += 0.12;
        if (def.id === 'singularity_root') successChanceBonus += 0.1;

        if (def.id === 'credit_siphon') creditMultiplier *= 1.15;
        if (def.id === 'null_rewriter') creditMultiplier *= 1.25;
        if (def.id === 'overflow_inject') creditMultiplier *= 1.3;
        if (def.id === 'quantum_splice') creditMultiplier *= 1.2;
        if (def.id === 'singularity_root') creditMultiplier *= 1.4;
      }

      if (state.riskMode) {
        let riskPenalty = 0.15;
        if (def && def.id === 'trace_scrambler') riskPenalty -= 0.05;
        successChanceBonus -= riskPenalty;
        successChanceBonus += modifiers.riskSuccessBonus;
        creditMultiplier *= 2.0;
      }

      const effectivePower = code.power * (1 + 0.1 * (state.cpuTier - 1));
      let successChance = effectivePower / (effectivePower + serverSec);
      successChance += successChanceBonus;
      successChance = Math.max(0.05, Math.min(0.95, successChance));

      const success = Math.random() < successChance;
      code.usage = (code.usage || 0) + 1;

      if (success) {
        const rawReward =
          server.minReward + Math.random() * (server.maxReward - server.minReward);
        const economyNerf = state.riskMode ? 0.8 : 0.65;
        let rewardCredits = Math.max(1, Math.round(rawReward * creditMultiplier * economyNerf));
        let gainedExp = 6;
        if (def && def.id === 'cache_sniffer') rewardCredits += 5;
        if (def && def.id === 'rapid_exploit') gainedExp += 3;

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
        if (state.riskMode) {
          state.stats.riskHackSuccessCount++;
        }

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
        log(
          t('hackFailLog', { server: localizeServerName(server), chance: Math.round(successChance * 100) }),
          'hack'
        );

        if (def && def.id === 'overflow_inject') {
          state.energy = Math.max(0, state.energy - 1);
          state.stats.energySpentTotal += 1;
          if (state.energy < state.energyMax && state.energyTimerMs <= 0) {
            state.energyTimerMs = ENERGY_INTERVAL_MS;
          }
          log(getLang()==='en' ? 'Overflow_Inject penalty: consumed 1 additional energy.' : 'Overflow_Inject 페널티: 에너지가 추가로 1 소모되었습니다.', 'hack');
        }

        if (state.riskMode) {
          state.energy = Math.max(0, state.energy - 1);
          state.stats.energySpentTotal += 1;
          if (state.energy < state.energyMax && state.energyTimerMs <= 0) {
            state.energyTimerMs = ENERGY_INTERVAL_MS;
          }
          log(t('riskPenaltyLog'), 'hack');
          if (state.energy === 0) unlockAchievement('energy_zero');
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
      log(`CPU 업그레이드 완료! 현재 티어: ${state.cpuTier} (소모 크레딧 ${cost})`, 'system');
      if (state.cpuTier >= 15) {
        unlockAchievement('cpu_tier_5');
      }
      updateStatsUI();
      checkMissions('general');
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
        state.missionProgress.daily.energySpent = 0;
        state.missionProgress.daily.completed = {};
      }

      if (state.missionProgress.weekly.lastResetWeek !== weekKey) {
        state.missionProgress.weekly.lastResetWeek = weekKey;
        state.missionProgress.weekly.scans = 0;
        state.missionProgress.weekly.hackSuccess = 0;
        state.missionProgress.weekly.energySpent = 0;
        state.missionProgress.weekly.levelReached = state.level;
        state.missionProgress.weekly.completed = {};
      }

      if (state.missionProgress.month.lastResetMonth !== monthKey) {
        state.missionProgress.month.lastResetMonth = monthKey;
        state.missionProgress.month.scans = 0;
        state.missionProgress.month.hackSuccess = 0;
        state.missionProgress.month.energySpent = 0;
        state.missionProgress.month.levelReached = state.level;
        state.missionProgress.month.completed = {};
      }

      if (!state.missionProgress.general) {
        state.missionProgress.general = { completed: {} };
      }
      if (!state.missionProgress.general.completed) {
        state.missionProgress.general.completed = {};
      }
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
        if (type === 'riskHackSuccess') return state.stats.riskHackSuccessCount;
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

        if (scope === 'month' && def.type === 'energy0Flag') {
          if (state.energy === 0) {
            prog.completed[def.id] = true;
            state.credits += def.rewardCredits;
            state.stats.creditsEarnedTotal += def.rewardCredits;
            state.stats.missionsCompletedTotal++;
            log(
              `[미션 완료] MONTH - ${def.name} (보상: 크레딧 +${def.rewardCredits})`,
              'system'
            );
          
            showToast(t('missionDoneToast', { name: localizeMissionName(def), reward: t('missionDoneCredits', { v: def.rewardCredits }) }), 'mission');
}
          return;
        }

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

          state.stats.missionsCompletedTotal++;

          const rewardTextParts = [];
          if (rewardCredits > 0) rewardTextParts.push(`크레딧 +${rewardCredits}`);
          if (def.rewardEnergyPack) rewardTextParts.push(`에너지 팩 +${def.rewardEnergyPack}`);
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
          <div class="mission-reward">${t('reward')}: ${def.rewardCredits ? (t('credits') + ' +' + def.rewardCredits) : ''}${def.rewardEnergyPack ? ((def.rewardCredits ? ' / ' : '') + (t('energyPack') + ' +' + def.rewardEnergyPack)) : ''}${(!def.rewardCredits && !def.rewardEnergyPack) ? t('none') : ''}</div>
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
      log(t('achievementLog', { name: achName }), 'system');
      showToast(t('toastAchievement', { name: achName }), 'achievement');
      renderAchievements();
      checkMissions('general'); // 업적 기반 GENERAL QUEST 체크
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

      const completedAchievements = Object.keys(state.achievements).length;
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
        scan: [225, 360, 600, 1050, 1500, 2400, 3600, 6000],
        hack: [30, 180, 360, 750, 1200, 2100],
        level: [15, 45, 60, 75, 90, 120, 150],
        credits: [3000, 30000, 150000, 300000, 750000],
        missions: [75, 150, 300, 480],
        purchases: [30, 75, 150, 240, 360],
        energySpent: [300, 1500, 3000, 7500, 12000],
        risk: [15, 75, 150, 300, 540],
        codex: [4, 8, 12, 18],
        power: [90, 150, 240, 360],
        codeLevel: [9, 15, 30, 45],
        upgrades: [3, 15, 45, 90],
        sync: [3, 9, 24, 45],
        syncLevel: [3, 9, 15],
        evolves: [3, 9, 18],
        shards: [30, 90, 180, 360],
        packs: [3, 15],
        achievement: [15, 30, 45, 60, 75]
      };

      thresholds.scan.forEach(v => { if (state.stats.scanCount >= v) unlockAchievement(`scan_total_${Math.round(v / 3)}`); });
      thresholds.hack.forEach(v => { if (state.stats.hackSuccessCount >= v) unlockAchievement(`hack_total_${Math.round(v / 3)}`); });
      thresholds.level.forEach(v => { if (state.level >= v) unlockAchievement(`level_total_${Math.round(v / 3)}`); });
      thresholds.credits.forEach(v => { if (state.stats.creditsEarnedTotal >= v) unlockAchievement(`credits_total_${Math.round(v / 3)}`); });
      thresholds.missions.forEach(v => { if (state.stats.missionsCompletedTotal >= v) unlockAchievement(`missions_total_${Math.round(v / 3)}`); });
      thresholds.purchases.forEach(v => { if (state.stats.shopPurchaseCount >= v) unlockAchievement(`shop_total_${Math.round(v / 3)}`); });
      thresholds.energySpent.forEach(v => { if (state.stats.energySpentTotal >= v) unlockAchievement(`energy_spent_${Math.round(v / 3)}`); });
      thresholds.risk.forEach(v => { if (state.stats.riskHackSuccessCount >= v) unlockAchievement(`risk_total_${Math.round(v / 3)}`); });
      thresholds.codex.forEach(v => { if (discoveredCodes >= v) unlockAchievement(`codex_total_${Math.round(v / 3)}`); });
      thresholds.power.forEach(v => { if (highestPower >= v) unlockAchievement(`code_power_${Math.round(v / 3)}`); });
      thresholds.codeLevel.forEach(v => { if (highestLevel >= v) unlockAchievement(`code_level_${Math.round(v / 3)}`); });
      thresholds.upgrades.forEach(v => { if (upgrades >= v) unlockAchievement(`code_upgrade_${Math.round(v / 3)}`); });
      thresholds.sync.forEach(v => { if (syncs >= v) unlockAchievement(`code_sync_${Math.round(v / 3)}`); });
      thresholds.syncLevel.forEach(v => { if (highestSync >= v) unlockAchievement(`sync_level_${Math.round(v / 3)}`); });
      thresholds.evolves.forEach(v => { if (evolves >= v) unlockAchievement(`code_evolve_${Math.round(v / 3)}`); });
      thresholds.shards.forEach(v => { if (totalShards >= v) unlockAchievement(`shards_total_${Math.round(v / 3)}`); });
      thresholds.packs.forEach(v => { if (packsUsed >= v) unlockAchievement(`energy_pack_${Math.round(v / 3)}`); });
      thresholds.achievement.forEach(v => { if (completedAchievements >= v) unlockAchievement(`achievement_total_${Math.round(v / 3)}`); });

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
    }

    function renderAchievements() {
      achievementListEl.innerHTML = '';

      const diffLabel = {
        easy: t('difficultyEasy'),
        normal: t('difficultyNormal'),
        hard: t('difficultyHard')
      };

      achievementDefs.forEach(def => {
        const completed = !!state.achievements[def.id];

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
        riskMode: state.riskMode
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
      state.riskMode = !!data.riskMode;
      chkRiskMode.checked = state.riskMode;
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
      if (!isResizing) return;
      const rect = main.getBoundingClientRect();
      const totalWidth = rect.width;

      if (currentResizer === 'left') {
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

    resizerLeft.addEventListener('mousedown', onMouseDownResizerLeft);
    if (resizerRight && rightPanel) resizerRight.addEventListener('mousedown', onMouseDownResizerRight);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // 더보기 모달 / 탭
    function setActiveTab(tabName) {
      const panelMap = {
        mission: tabMission,
        achievement: tabAchievement,
        codex: tabCodex,
        logs: tabLogs,
        settings: tabSettings,
        save: tabSave
      };
      Object.keys(panelMap).forEach(name => {
        if (!panelMap[name]) return;
        panelMap[name].classList.toggle('active', name === tabName);
      });
      moreTabButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
      });
    }

    moreTabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        setActiveTab(tab);
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

    if (btnUpdatePrev) btnUpdatePrev.addEventListener('click', () => {
      activeUpdateIndex = (activeUpdateIndex - 1 + updateLogs.length) % updateLogs.length;
      renderUpdateLog();
    });
    if (btnUpdateNext) btnUpdateNext.addEventListener('click', () => {
      activeUpdateIndex = (activeUpdateIndex + 1) % updateLogs.length;
      renderUpdateLog();
    });

        function openMoreModal(defaultTab = 'mission', showDontShowButton = false) {
      try {
        moreModalBackdrop.classList.add('active');
        setActiveTab(defaultTab);
        renderUpdateLog();
        if (btnUpdateDontShow) btnUpdateDontShow.style.display = showDontShowButton ? 'inline-block' : 'none';
      } catch (err) {
        console.error('[MoreModal] open failed:', err);
        try { showToast('더보기를 여는 중 오류가 발생했습니다. (콘솔 확인)', 'warn'); } catch(e) {}
      }
    }


    function closeMoreModal() {
      moreModalBackdrop.classList.remove('active');
    }

        // v1.6.2: 더보기 버튼 클릭 이슈 방지 (가드 + 이벤트 위임)
    if (btnMore) btnMore.addEventListener('click', () => openMoreModal('mission', false));
    document.addEventListener('click', (e) => {
      const t = e.target.closest && e.target.closest('#btnMore');
      if (t) openMoreModal('mission', false);
    });
    if (btnMoreClose) btnMoreClose.addEventListener('click', closeMoreModal);
        if (btnMoreClose2) btnMoreClose2.addEventListener('click', closeMoreModal);
    moreModalBackdrop.addEventListener('click', (e) => {
      if (e.target === moreModalBackdrop) closeMoreModal();
    });

    function maybeShowUpdateOnStart() {
      return;
    }

    if (btnUpdateDontShow) btnUpdateDontShow.addEventListener('click', () => {
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
      updateStatsUI();
      flushSecondaryPanels();
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
    function scheduleSilentSave(delay = 180) {
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
        // 새 필드 기본값 보정
        state.stats.energySpentTotal ||= 0;
        state.stats.creditsEarnedTotal ||= 0;
        state.stats.missionsCompletedTotal ||= 0;
        state.stats.riskHackSuccessCount ||= 0;
        state.stats.codeShardsTotal ||= 0;
        state.missionProgress.general = state.missionProgress.general || { completed: {} };
        state.missionProgress.general.completed = state.missionProgress.general.completed || {};

        // v1.6.0 필드 보정
        state.items = state.items || { energyPack: 0 };
        state.items.energyPack = state.items.energyPack || 0;
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
        state.ui.snowEnabled = (typeof state.ui.snowEnabled === 'boolean') ? state.ui.snowEnabled : null;
        state.ui.anim = (typeof state.ui.anim === 'boolean') ? state.ui.anim : true;
        state.ui.autoSaveToast = !!state.ui.autoSaveToast;
        state.ui.logSearch = state.ui.logSearch || '';

        ensureTutorialDefaults();
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

    btnSaveGame.addEventListener('click', saveGame);
    btnLoadGame.addEventListener('click', loadGame);
    btnClearSave.addEventListener('click', clearSave);

    if (btnTutorialPrev) btnTutorialPrev.addEventListener('click', prevTutorialStep);
    if (btnTutorialNext) btnTutorialNext.addEventListener('click', nextTutorialStep);
    if (btnTutorialFinish) btnTutorialFinish.addEventListener('click', () => closeTutorial(true));
    if (btnTutorialSkip) btnTutorialSkip.addEventListener('click', () => closeTutorial(true));
    if (btnOpenTutorial) btnOpenTutorial.addEventListener('click', () => openTutorial(true));

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') persistLastSeenAt(Date.now());
    });
    window.addEventListener('pagehide', () => {
      persistLastSeenAt(Date.now());
    });
    window.addEventListener('beforeunload', () => {
      persistLastSeenAt(Date.now());
    });

    setInterval(() => {
      saveGame(true);
    }, 60000);

    // 로그 필터
    function bindLogFilterCheckbox(checkbox, key) {
      checkbox.addEventListener('change', () => {
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
    btnClearLogs.addEventListener('click', () => {
      logList.innerHTML = '';
    });

    btnToggleLogs.addEventListener('click', () => {
      logsHidden = !logsHidden;
      logPanelBody.style.display = logsHidden ? 'none' : '';
      btnToggleLogs.textContent = logsHidden ? t('showLogs') : t('hideLogs');
    });

    // 미션 스코프 버튼
    missionScopeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
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

      // v1.6.6: 크리스마스 눈 이펙트 on/off (시즌 자동 + 수동 오버라이드)
      const snowOn = (typeof ui.snowEnabled === 'boolean') ? ui.snowEnabled : isChristmasSeason();
      const snowCanvas = document.getElementById('snow-canvas');
      if (snowCanvas) snowCanvas.style.display = snowOn ? '' : 'none';
      if (window.__snowFX && window.__snowFX.setEnabled) {
        window.__snowFX.setEnabled(!!snowOn);
      }
    }

    function syncSettingsUI() {
      if (!setFontScale) return;
      const ui = state.ui || {};
      setFontScale.value = ui.fontScale || 100;
      setFontScaleLabel.textContent = `${setFontScale.value}%`;
      if (setSnow) {
        const snowOn = (typeof ui.snowEnabled === 'boolean') ? ui.snowEnabled : isChristmasSeason();
        setSnow.checked = !!snowOn;
        // 자동 모드(null)일 땐 체크박스에 미세한 힌트(회색 표시)
        setSnow.indeterminate = (typeof ui.snowEnabled !== 'boolean');
      }
      setUiZoom.value = String(ui.uiZoom || 1);
      setAnim.checked = ui.anim !== false;
      setToastMs.value = String(ui.toastDurationMs || 3000);
      setAutoSaveToast.checked = !!ui.autoSaveToast;
      if (setLanguage) setLanguage.value = ui.lang || 'ko';
      if (logSearchInput) logSearchInput.value = ui.logSearch || '';
    }

    
    if (setLanguage) {
      setLanguage.addEventListener('change', () => {
        state.ui.lang = setLanguage.value || 'ko';
        refreshUiAfterStateRestore();
        scheduleSilentSave(60);
      });
    }

    if (setFontScale) {
      setFontScale.addEventListener('input', () => {
        state.ui.fontScale = Number(setFontScale.value);
        setFontScaleLabel.textContent = `${setFontScale.value}%`;
        applySettings();
        scheduleSilentSave();
      });
    }

    if (setSnow) {
      setSnow.addEventListener('change', () => {
        // 체크/해제 시 수동 모드로 고정
        state.ui.snowEnabled = !!setSnow.checked;
        // indeterminate(자동) 해제
        setSnow.indeterminate = false;
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

    if (btnExportSave) btnExportSave.addEventListener('click', exportSaveFile);

    if (btnImportSaveFile && fileImportSave) {
      btnImportSaveFile.addEventListener('click', () => fileImportSave.click());
      fileImportSave.addEventListener('change', async () => {
        const f = fileImportSave.files && fileImportSave.files[0];
        if (!f) return;
        const text = await f.text();
        importSaveFromText(text);
        fileImportSave.value = '';
      });
    }

    if (btnImportSaveText && importSaveText) {
      btnImportSaveText.addEventListener('click', () => {
        const text = (importSaveText.value || '').trim();
        if (!text) {
          showToast(t('emptyText'), 'warn');
          return;
        }
        importSaveFromText(text);
      });
    }

    btnScan.addEventListener('click', scanForCode);
    btnHack.addEventListener('click', doHack);
    btnUpgradeCpu.addEventListener('click', upgradeCpu);
    btnUpgradeCode.addEventListener('click', upgradeSelectedCode);
    if (btnSyncCode) btnSyncCode.addEventListener('click', syncSelectedCode);
    btnEvolveCode.addEventListener('click', evolveSelectedCode);

    btnUseEnergyPack.addEventListener('click', useEnergyPack);

    chkRiskMode.addEventListener('change', () => {
      state.riskMode = chkRiskMode.checked;
      log(t('riskModeLog', { state: state.riskMode ? t('on') : t('off') }), 'system');
    });

    btnSaveLoadout.addEventListener('click', saveCurrentLoadout);
    btnLoadLoadout.addEventListener('click', loadLoadout);

    function init() {
      addCodeInstanceFromTemplate('basic');
      state.requiredExp = requiredExp(state.level);
      ensureMissionResets();

      if (localStorage.getItem(SAVE_KEY)) {
        loadGame();
      } else {
        state.lastSeenAt = Date.now();
        refreshUiAfterStateRestore();
      }

      log(t('initLog'), 'system');
      maybeShowUpdateOnStart();
      setTimeout(() => {
        maybeStartTutorial();
      }, 180);

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
        window.dispatchEvent(new CustomEvent('hcsig:ready', {
          detail: {
            version: CURRENT_VERSION,
            hasLocalSave: !!localStorage.getItem(SAVE_KEY)
          }
        }));
      } catch (bridgeErr) {
        console.warn('[CloudBridge] ready event dispatch failed:', bridgeErr);
      }
    }

    init();

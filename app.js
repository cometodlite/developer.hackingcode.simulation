// Split from 배포용 index.html on 2026-03-09
// Original inline scripts concatenated in source order.


// --- Early viewport/layout fix (iOS Safari first-paint jump) ---
(function(){
  try{
    if('scrollRestoration' in history) history.scrollRestoration = 'manual';
    document.documentElement.style.setProperty('--appH', Math.ceil(window.innerHeight) + 'px');
  }catch(e){}
})();



// --- Layout vars sync (header/tabs/viewport). Fixes initial "pushed up" until a UI event happens. ---
(function(){
  const root = document.documentElement;
  const isMobile = window.matchMedia('(max-width: 900px), (hover: none) and (pointer: coarse)').matches;

  function px(n){ return Math.max(0, Math.round(n)) + 'px'; }

  function setAppH(){
    const vv = window.visualViewport;
    const h = vv ? vv.height : window.innerHeight;
    root.style.setProperty('--appH', px(h));
  }

  function setHeaderTabs(){
    const header = document.querySelector('header');
    const tabs = document.querySelector('.mobile-tabs');

    if(header){
      root.style.setProperty('--headerH', px(header.getBoundingClientRect().height));
    }
    if(isMobile){
      if(tabs){
        const th = tabs.getBoundingClientRect().height;
        root.style.setProperty('--tabsH', px(th));
        // bottom space that content must avoid (tabs + gap + safe area)
        root.style.setProperty('--tabsInset', `calc(${px(th)} + 20px + env(safe-area-inset-bottom))`);
        root.style.setProperty('--tabsPad',   `calc(${px(th)} + 28px + env(safe-area-inset-bottom))`);
      }else{
        root.style.setProperty('--tabsH', '92px');
        root.style.setProperty('--tabsInset', 'calc(92px + 20px + env(safe-area-inset-bottom))');
        root.style.setProperty('--tabsPad',   'calc(92px + 28px + env(safe-area-inset-bottom))');
      }
    }
  }

  function kick(){
    setAppH();
    setHeaderTabs();
    // remove tiny scroll offsets that look like the whole UI is shifted upward
    try{ if(window.scrollY !== 0) window.scrollTo(0,0); }catch(e){}
  }

  // run ASAP
  kick();
  document.addEventListener('DOMContentLoaded', kick);
  window.addEventListener('load', kick);

  const vv = window.visualViewport;
  if(vv){
    vv.addEventListener('resize', kick);
    vv.addEventListener('scroll', kick);
  }
  window.addEventListener('resize', kick);
  window.addEventListener('orientationchange', ()=>setTimeout(kick, 250));
  window.addEventListener('pageshow', ()=>setTimeout(kick, 60));

  // ResizeObserver catches font-load/header wrap changes that happen AFTER first paint
  try{
    const ro = new ResizeObserver(()=>kick());
    const header = document.querySelector('header');
    if(header) ro.observe(header);
    const tabs = document.querySelector('.mobile-tabs');
    if(tabs) ro.observe(tabs);
  }catch(e){}

  // Last resort: re-kick a couple times shortly after first render
  setTimeout(kick, 80);
  setTimeout(kick, 220);
  setTimeout(kick, 650);
})();



    const CURRENT_VERSION = 'v1.6.11(j)';
    const ENERGY_INTERVAL_MS = 120000; // 에너지 1칸당 120초
    const SAVE_KEY = 'HCSiG_SAVE_v16';
    const OLD_SAVE_KEY = 'HCSiG_SAVE_v15';
    const LAST_SEEN_VERSION_KEY = 'HCSiG_LAST_SEEN_VERSION';

    // 업데이트 로그
    const updateLogs = [
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
      tutorial: { completed: false, step: 0, seen: false },
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
      ui: { shopSortMode: 'update', toastDurationMs: 3000, uiZoom: 1, fontScale: 100, anim: true, autoSaveToast: false, logSearch: '', snowEnabled: null },
      stats: {
        scanCount: 0,
        hackSuccessCount: 0,
        shopPurchaseCount: 0,
        energySpentTotal: 0,
        creditsEarnedTotal: 0,
        missionsCompletedTotal: 0,
        riskHackSuccessCount: 0
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
      data_phantom: {
        id: 'data_phantom',
        name: 'Data_Phantom',
        rarity: 'RARE',
        basePower: 22,
        description: '해킹 성공 확률을 +10%p 증가시킵니다.'
      },
      overflow_inject: {
        id: 'overflow_inject',
        name: 'Overflow_Inject',
        rarity: 'EPIC',
        basePower: 26,
        description: '성공 시 크레딧 +30%, 실패 시 에너지를 1 추가로 소모합니다.'
      },
      ghost_script: {
        id: 'ghost_script',
        name: 'Ghost_Script',
        rarity: 'LEGENDARY',
        basePower: 30,
        description: '해킹 성공 시 추가 레벨 업 1회를 발생시킵니다.'
      },
      auto_patch: {
        id: 'auto_patch',
        name: 'AutoPatch()',
        rarity: 'RARE',
        basePower: 20,
        description: '해킹 실패 시 20% 확률로 경험치 +1 보정을 제공합니다.'
      }
    };

    const rarityOrder = ['COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'LEGENDARY'];

    const rarityWeights = {
      COMMON: 50,
      UNCOMMON: 25,
      RARE: 15,
      EPIC: 7,
      LEGENDARY: 3
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
        desc: '즉시 크레딧 +500. (일일 구매 제한: 2회)',
        cost: 400,
        rarity: 'COMMON',
        category: 'ECONOMY',
        buy: () => {
          state.credits += 500;
          state.stats.creditsEarnedTotal += 500;
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
      ],
      weekly: [
        { id: 'weekly_scan30',   name: '주간 스캐너',        type: 'scans',       target: 30,  rewardCredits: 120, desc: '코드 스캔 30회 수행' },
        { id: 'weekly_scan50',   name: '집요한 스캐너',      type: 'scans',       target: 50,  rewardCredits: 180, desc: '코드 스캔 50회 수행' },
        { id: 'weekly_hack20',   name: '주간 침입자',        type: 'hackSuccess', target: 20,  rewardCredits: 200, desc: '서버 해킹 성공 20회' },
        { id: 'weekly_energy100',name: '에너지 소모왕',       type: 'energySpent', target: 100, rewardCredits: 200, desc: '에너지 100 소모하기' },
        { id: 'weekly_level10',  name: '주간 성장',          type: 'level',       target: 10,  rewardCredits: 250, desc: '플레이어 레벨 10 달성' }
      ],
      month: [
        { id: 'month_scan100',     name: '월간 스캐너',        type: 'scans',           target: 100, rewardCredits: 300, desc: '코드 스캔 100회 수행' },
        { id: 'month_scan200',     name: '광적인 분석가',      type: 'scans',           target: 200, rewardCredits: 500, desc: '코드 스캔 200회 수행' },
        { id: 'month_hack50',      name: '월간 침입자',        type: 'hackSuccess',     target: 50,  rewardCredits: 400, desc: '서버 해킹 성공 50회' },
        { id: 'month_energy300',   name: '에너지 브레이커',     type: 'energySpent',     target: 300, rewardCredits: 450, desc: '에너지 300 소모하기' },
        { id: 'month_level15',     name: '월간 성장',          type: 'level',           target: 15,  rewardCredits: 500, desc: '플레이어 레벨 15 달성' },
        { id: 'month_scan_risk',   name: '위험한 분석',        type: 'riskHackSuccess', target: 30,  rewardCredits: 500, desc: '위험 해킹 모드로 서버 해킹 성공 30회' },
        { id: 'month_energy0',     name: '한계 돌파',          type: 'energy0Flag',     target: 1,   rewardCredits: 350, desc: '한 달 동안 최소 1회 에너지를 0까지 소모' }
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
      ]
    };

    // 업적 정의 (확장)
    const achievementDefs = [
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
    const btnEvolveCode = document.getElementById('btnEvolveCode');

    const shopList = document.getElementById('shopList');
    const shopSortSelect = document.getElementById('shopSortSelect');
    const serverSelect = document.getElementById('serverSelect');

    const codeListEl = document.getElementById('codeList');
    const codeDetailEl = document.getElementById('codeDetail');

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
      if (typeof state.tutorial.completed !== 'boolean') state.tutorial.completed = false;
      if (!Number.isInteger(state.tutorial.step)) state.tutorial.step = 0;
      if (state.tutorial.step < 0) state.tutorial.step = 0;
      if (state.tutorial.step >= tutorialSteps.length) state.tutorial.step = tutorialSteps.length - 1;
      if (typeof state.tutorial.seen !== 'boolean') state.tutorial.seen = false;
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
      btnTutorialPrev.disabled = idx <= 0;
      const waiting = !!step.waitAction;
      btnTutorialNext.style.display = idx === tutorialSteps.length - 1 ? 'none' : '';
      btnTutorialNext.disabled = waiting;
      btnTutorialFinish.style.display = idx === tutorialSteps.length - 1 ? '' : 'none';
    }

    function openTutorial(forceRestart = false) {
      if (!tutorialBackdrop) return;
      ensureTutorialDefaults();
      if (forceRestart) {
        state.tutorial.completed = false;
        state.tutorial.step = 0;
      }
      renderTutorial();
      tutorialBackdrop.classList.add('show');
      tutorialBackdrop.setAttribute('aria-hidden', 'false');
      document.body.classList.add('tutorial-open');
      tutorialOpenedOnce = true;
    }

    function closeTutorial(markCompleted = false) {
      if (!tutorialBackdrop) return;
      if (markCompleted) {
        state.tutorial.completed = true;
        state.tutorial.step = tutorialSteps.length - 1;
      }
      tutorialBackdrop.classList.remove('show');
      tutorialBackdrop.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('tutorial-open');
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
      ensureTutorialDefaults();
      if (state.tutorial.completed) return;
      const mapping = { scan: 2, selectCode: 3, hack: 4 };
      const expected = mapping[action];
      if (expected === undefined) return;
      if (state.tutorial.step !== expected) return;
      const followUp = () => {
        nextTutorialStep();
        if (!isTutorialOpen()) openTutorial(false);
      };
      if (isTutorialOpen()) {
        followUp();
      } else {
        openTutorial(false);
        setTimeout(followUp, 0);
      }
    }

    function maybeStartTutorial() {
      ensureTutorialDefaults();
      if (state.tutorial.completed || tutorialOpenedOnce) return;
      state.tutorial.seen = true;
      openTutorial(false);
    }

    function updateStatsUI() {
      statLevel.textContent = state.level;
      statExp.textContent = state.exp + ' / ' + state.requiredExp;
      statCredits.textContent = state.credits;
      statCpuTier.textContent = state.cpuTier;
      statEnergyValue.textContent = `${state.energy} / ${state.energyMax}`;

      if (state.energy >= state.energyMax) {
        statEnergyTimer.textContent = 'FULL';
      } else {
        const sec = state.energyTimerMs / 1000;
        statEnergyTimer.textContent = sec.toFixed(1) + '초';
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

      renderCodeList();
      renderCodeDetail();
      renderMissions();
      renderAchievements();
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
      textSpan.textContent = ' ' + message;

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
      return 20 + (level - 1) * 10;
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
      state.credits += 100;
      state.stats.creditsEarnedTotal += 100;
      log(`레벨 업! Lv.${state.level} 달성. 크레딧 +100 지급.`, 'level');

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
        log('에너지 팩이 없습니다.', 'system');
        return;
      }
      if (state.energy >= state.energyMax) {
        log('이미 에너지가 가득 찼습니다.', 'system');
        return;
      }

      state.items.energyPack = packCount - 1;
      state.energy = state.energyMax;
      state.energyTimerMs = 0;

      state.stats.energyPacksUsed = (state.stats.energyPacksUsed || 0) + 1;

      log('에너지 팩 1개를 사용해 에너지를 최대치까지 회복했습니다.', 'system');
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
        usage: 0
      });
    }

    function renderCodeList() {
      codeListEl.innerHTML = '';
      if (ownedCodes.length === 0) {
        const li = document.createElement('li');
        li.textContent = '보유 코드 없음. [코드 스캔]으로 코드를 얻으세요.';
        li.style.opacity = '0.7';
        codeListEl.appendChild(li);
        return;
      }

      ownedCodes.forEach(code => {
        const li = document.createElement('li');
        if (state.activeCodeId === code.id) li.classList.add('active');

        const left = document.createElement('span');
        left.textContent = code.name;
        const rarityClass = 'rarity-' + code.rarity.toLowerCase();
        left.classList.add(rarityClass);

        const right = document.createElement('span');
        right.className = 'meta';
        right.textContent = `[${code.rarity}] Lv.${code.level} / PWR ${code.power}`;

        li.appendChild(left);
        li.appendChild(right);

        li.addEventListener('click', () => {
          state.activeCodeId = code.id;
          updateStatsUI();
          log(`활성 코드 변경: ${code.name}`, 'system');
          onTutorialAction('selectCode');
        });

        codeListEl.appendChild(li);
      });
    }

    function renderCodeDetail() {
      const code = getActiveCodeInstance();
      if (!code) {
        codeDetailEl.innerHTML = '<div class="small">보유 중인 코드를 선택하면 상세 정보가 표시됩니다.</div>';
        return;
      }
      const def = codeDefs[code.id];
      const ability = def ? def.description : '설명 없음.';
      const usage = code.usage || 0;
      const rarityClass = 'rarity-' + code.rarity.toLowerCase();

      const html = `
        <div style="margin-bottom:4px;">
          <strong class="${rarityClass}">${code.name}</strong>
          <span class="rarity-tag ${rarityClass}">[${code.rarity}]</span>
        </div>
        <div class="small">레벨: Lv.${code.level}</div>
        <div class="small">파워: ${code.power}</div>
        <div class="small">사용 횟수: ${usage}</div>
        <div class="small" style="margin-top:6px; color:#a5b4fc;">능력</div>
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

    function upgradeSelectedCode() {
      const code = getActiveCodeInstance();
      if (!code) {
        log('강화할 코드가 없습니다. 먼저 코드를 스캔하세요.', 'system');
        return;
      }
      const cost = 100 * code.level;
      if (state.credits < cost) {
        log(`코드 강화 실패: 크레딧이 부족합니다. (필요: ${cost})`, 'system');
        return;
      }
      state.credits -= cost;
      code.level++;
      code.power += 5;
      log(`코드 강화: ${code.name} Lv.${code.level} (파워 +5 → ${code.power}), 크레딧 -${cost}.`, 'system');
      updateStatsUI();
      checkMissions('general');
    }

    function evolveSelectedCode() {
      const code = getActiveCodeInstance();
      if (!code) {
        log('진화할 코드가 없습니다.', 'system');
        return;
      }
      if (code.rarity === 'LEGENDARY') {
        log('이미 최상위 희귀도(LEGENDARY)입니다. 더 이상 진화할 수 없습니다.', 'system');
        return;
      }
      if (code.level < 5) {
        log('코드 진화 실패: 진화에는 최소 Lv.5 이상이 필요합니다.', 'system');
        return;
      }
      const idx = rarityOrder.indexOf(code.rarity);
      if (idx === -1 || idx === rarityOrder.length - 1) {
        log('진화를 처리할 수 없습니다.', 'system');
        return;
      }
      const nextRarity = rarityOrder[idx + 1];
      code.rarity = nextRarity;
      code.power += 10;
      log(`코드 진화 성공: ${code.name}가 ${nextRarity} 등급으로 승급, 파워 +10 → ${code.power}.`, 'system');

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
        option.textContent = `${s.name} (보안 ${s.security}, Lv${s.minLevel}+ )`;
        serverSelect.appendChild(option);
      });
    }

    
    // =========================
    // SHOP LIMITS (Daily / One-time)
    // =========================
    const SHOP_LIMITS = {
      // Daily cap
      big_credit_pack: { type: 'daily', limit: 2, label: '05:00 리셋 (2회)' },
      // One-time (no stacking)
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
        log('[시스템] 일일 상점 제한이 초기화되었습니다. (05:00 리셋)', 'system');
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
        return { ok: false, reason: info.type === 'daily' ? '오늘 구매 제한에 도달했습니다.' : '이미 구매한 영구 아이템입니다.' };
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
        ENERGY: '에너지',
        UTILITY: '유틸',
        ECONOMY: '경제',
        SYSTEM: '시스템'
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
      const items = shopItems.slice();

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
          const na = String(a.name || '');
          const nb = String(b.name || '');
          const c = na.localeCompare(nb, 'ko');
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
        raritySpan.textContent = item.rarity;

        const catSpan = document.createElement('span');
        catSpan.className = 'shop-cat-pill';
        catSpan.textContent = categoryLabel[item.category] || item.category || '';

        const leftWrap = document.createElement('span');
        leftWrap.appendChild(raritySpan);
        leftWrap.appendChild(catSpan);
        leftWrap.appendChild(document.createTextNode(item.name));

        const costSpan = document.createElement('span');
        costSpan.className = 'shop-cost';
        costSpan.textContent = `💰 ${item.cost}`;
        // limit badge (daily/once)
        const lim = getShopRemaining(item.id);
        if (lim) {
          const badge = document.createElement('span');
          badge.className = 'shop-limit-badge';
          badge.textContent = `${lim.used}/${lim.limit} (${lim.label})`;
          badge.style.marginLeft = '8px';
          badge.style.opacity = '0.85';
          costSpan.appendChild(badge);
        }

        nameSpan.appendChild(leftWrap);

        head.appendChild(nameSpan);
        head.appendChild(costSpan);

        const desc = document.createElement('div');
        desc.className = 'shop-desc';
        desc.textContent = item.desc;

        const btn = document.createElement('button');
        btn.className = 'shop-buy';
        btn.textContent = '구매';
        btn.title = '구매하면 크레딧이 소모됩니다.';
        const lim2 = getShopRemaining(item.id);
        if (lim2 && lim2.remaining <= 0) {
          btn.disabled = true;
          btn.textContent = '구매 불가';
          btn.title = lim2.type === 'daily' ? '오늘 구매 제한에 도달했습니다.' : '이미 구매한 영구 아이템입니다.';
        }
        btn.addEventListener('click', () => {
          // purchase cap check (daily/once)
          const cap = canBuyShopItem(item.id);
          if (!cap.ok) {
            log(`[상점] ${cap.reason}`, 'shop');
            showToast(cap.reason, 'shop');
            return;
          }

          if (state.credits < item.cost) {
            log(`[상점] 크레딧이 부족합니다. (필요: ${item.cost})`, 'shop');
            showToast('크레딧이 부족합니다.', 'shop');
            return;
          }
          // 고가/고희귀 구매 확인
          const rr = rarityRank[item.rarity] || 0;
          if (rr >= 4) {
            const ok = window.confirm(`${item.name} (${item.rarity}) 을(를) 구매할까요?\n💰 ${item.cost} 크레딧이 소모됩니다.`);
            if (!ok) return;
          }
          state.credits -= item.cost;
          item.buy?.();
          // mark cap usage
          markShopPurchase(item.id);

          state.stats.shopPurchaseCount++;
          log(`[상점] ${item.name} 구매 (💰 -${item.cost})`, 'shop');
          if (item.id === 'energy_pack') {
            showToast(`에너지 팩 +1 (보유: ${state.items.energyPack})`, 'shop');
          } else {
            showToast(`${item.name} 구매 완료`, 'shop');
          }
          unlockAchievement('shop_first_buy');
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
        log('에너지가 부족하여 코드 스캔을 수행할 수 없습니다.', 'scan');
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
          log(`새 코드 발견! ${chosen.name} [${chosen.rarity}]`, 'scan');
          const def = codeDefs[chosen.id];
          if (def && (def.rarity === 'EPIC' || def.rarity === 'LEGENDARY')) {
            unlockAchievement('get_epic_code');
          }
        } else {
          const addPower = rarityPowerUp[rarity] || 1;
          existing.power += addPower;
          log(`중복 코드 감지: ${chosen.name} [${rarity}] → 파워 +${addPower} (현재 ${existing.power})`, 'scan');
          const def = codeDefs[existing.id];
          if (def && (def.rarity === 'EPIC' || def.rarity === 'LEGENDARY')) {
            unlockAchievement('get_epic_code');
          }
        }

        const expGain = 2 + modifiers.scanExtraExp;
        addExp(expGain);
        log(`코드 스캔 완료: 경험치 +${expGain}.`, 'scan');
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

      const energyCost = 2;
      if (!consumeEnergy(energyCost)) {
        log('에너지가 부족하여 서버 해킹을 수행할 수 없습니다.', 'hack');
        return;
      }

      state.missionProgress.daily.actions++;

      const code = getActiveCodeInstance();
      if (!code) {
        log('보유 코드가 없습니다. 먼저 코드 스캔으로 코드를 확보하세요.', 'hack');
        return;
      }
      const def = codeDefs[code.id];
      const server = getSelectedServer();
      if (!server) {
        log('타겟 서버 선택에 실패했습니다.', 'hack');
        return;
      }
      onTutorialAction('hack');
      if (state.level < server.minLevel) {
        log(`해당 서버를 해킹하려면 최소 Lv.${server.minLevel} 이상이어야 합니다.`, 'hack');
        return;
      }

      let serverSec = server.security;
      let creditMultiplier = modifiers.creditMultiplierSession * modifiers.creditMultiplierPermanent;
      let successChanceBonus = 0;

      if (def && def.id === 'port_scanner') {
        serverSec = Math.floor(serverSec * 0.9);
      }
      if (def && def.id === 'data_phantom') {
        successChanceBonus += 0.1;
      }
      if (def && def.id === 'overflow_inject') {
        creditMultiplier *= 1.3;
      }

      if (state.riskMode) {
        successChanceBonus -= 0.15;
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
        const rewardCredits = Math.round(rawReward * creditMultiplier);
        const gainedExp = 8;

        state.credits += rewardCredits;
        state.stats.creditsEarnedTotal += rewardCredits;
        addExp(gainedExp);

        log(
          `서버 해킹 성공! [${server.name}] 성공 확률 ${Math.round(successChance * 100)}%. ` +
          `크레딧 +${rewardCredits}, 경험치 +${gainedExp}.`,
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
          levelUp();
          log('Ghost_Script 효과: 추가 레벨 업 발생!', 'hack');
        }
      } else {
        log(
          `서버 해킹 실패. [${server.name}] 성공 확률 ${Math.round(successChance * 100)}%였음.`,
          'hack'
        );

        if (def && def.id === 'overflow_inject') {
          state.energy = Math.max(0, state.energy - 1);
          state.stats.energySpentTotal += 1;
          if (state.energy < state.energyMax && state.energyTimerMs <= 0) {
            state.energyTimerMs = ENERGY_INTERVAL_MS;
          }
          log('Overflow_Inject 페널티: 에너지가 추가로 1 소모되었습니다.', 'hack');
        }

        if (state.riskMode) {
          state.energy = Math.max(0, state.energy - 1);
          state.stats.energySpentTotal += 1;
          if (state.energy < state.energyMax && state.energyTimerMs <= 0) {
            state.energyTimerMs = ENERGY_INTERVAL_MS;
          }
          log('위험 해킹 모드 페널티: 실패로 인해 에너지가 추가로 1 소모되었습니다.', 'hack');
          if (state.energy === 0) unlockAchievement('energy_zero');
        }

        if (def && def.id === 'auto_patch' && Math.random() < 0.2) {
          state.exp += 1;
          log('AutoPatch() 효과: 해킹 실패 보정으로 경험치 +1.', 'hack');
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
        log(`CPU 업그레이드 실패: 크레딧이 부족합니다. (필요: ${cost})`, 'system');
        return;
      }
      state.credits -= cost;
      state.cpuTier += 1;
      log(`CPU 업그레이드 완료! 현재 티어: ${state.cpuTier} (소모 크레딧 ${cost})`, 'system');
      if (state.cpuTier >= 5) {
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
          
            showToast(`미션 완료: ${def.name} (크레딧 +${def.rewardCredits})`, 'mission');
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

          if (scope === 'daily') unlockAchievement('daily_mission_clear1');
          if (scope === 'weekly') unlockAchievement('weekly_mission_clear1');

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
        daily: 'DAILY QUEST',
        weekly: 'WEEKLY QUEST',
        month: 'MONTH QUEST',
        general: 'GENERAL QUEST'
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
          <div>${def.name}</div>
          <div class="mission-progress">${def.desc} (${progVal} / ${def.target})</div>
          <div class="mission-reward">보상: ${def.rewardCredits ? ('크레딧 +' + def.rewardCredits) : ''}${def.rewardEnergyPack ? ((def.rewardCredits ? ' / ' : '') + ('에너지 팩 +' + def.rewardEnergyPack)) : ''}${(!def.rewardCredits && !def.rewardEnergyPack) ? '없음' : ''}</div>
        `;

        const tag = document.createElement('span');
        tag.className = completed ? 'tag-complete' : 'tag-incomplete';
        tag.textContent = completed ? '완료' : '미완';

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
      log(`[업적 달성] ${def.name}`, 'system');
      showToast(`업적 달성: ${def.name}`, 'achievement');
      renderAchievements();
      checkMissions('general'); // 업적 기반 GENERAL QUEST 체크
    }

    function checkAchievements(reason) {
      if (state.level >= 3) unlockAchievement('reach_level3');
      if (state.level >= 10) unlockAchievement('reach_level10');

      if (state.stats.scanCount >= 10) unlockAchievement('scan_10');
      if (state.stats.scanCount >= 30) unlockAchievement('scan_30');
      if (state.stats.scanCount >= 50) unlockAchievement('scan_50');

      if (ownedCodes.length >= 3) unlockAchievement('collector_beginner');

      if (state.stats.hackSuccessCount >= 30) unlockAchievement('hack_30_success');

      if (state.energyMax >= 25) unlockAchievement('energy_max_25');

      if (state.stats.creditsEarnedTotal >= 5000) unlockAchievement('credits_5000');
      if (state.stats.creditsEarnedTotal >= 20000) unlockAchievement('credits_20000');

      if (state.stats.missionsCompletedTotal >= 10) unlockAchievement('mission_10');
    }

    function renderAchievements() {
      achievementListEl.innerHTML = '';

      const diffLabel = {
        easy: '일반',
        normal: '보통',
        hard: '어려움'
      };

      achievementDefs.forEach(def => {
        const completed = !!state.achievements[def.id];

        const item = document.createElement('div');
        item.className = 'achievement-item';

        const main = document.createElement('div');
        main.className = 'achievement-main';

        const displayName = def.hidden && !completed ? '???' : def.name;
        const displayDesc = def.hidden && !completed
          ? '히든 업적입니다. 달성 시 공개됩니다.'
          : def.desc;

        let diffClass = 'diff-easy';
        if (def.difficulty === 'normal') diffClass = 'diff-normal';
        else if (def.difficulty === 'hard') diffClass = 'diff-hard';

        main.innerHTML = `
          <div>
            ${displayName}
            <span class="diff-pill ${diffClass}">${diffLabel[def.difficulty] || ''}</span>
            ${def.hidden ? '<span class="diff-pill" style="background:#4b5563;color:#e5e7eb;">HIDDEN</span>' : ''}
          </div>
          <div class="mission-progress">${displayDesc}</div>
        `;

        const tag = document.createElement('span');
        tag.className = completed ? 'tag-complete' : 'tag-incomplete';
        tag.textContent = completed ? '달성' : '미달';

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
      log(`로드아웃 슬롯 ${slot}에 현재 설정을 저장했습니다.`, 'system');
    }

    function loadLoadout() {
      const slot = loadoutSelect.value || '1';
      const data = state.loadouts[slot];
      if (!data || (!data.codeId && !data.serverId)) {
        log(`로드아웃 슬롯 ${slot}에 저장된 설정이 없습니다.`, 'system');
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
      log(`로드아웃 슬롯 ${slot}을 불러왔습니다.`, 'system');
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
        update: tabUpdate,
        mission: tabMission,
        achievement: tabAchievement,
        logs: tabLogs,
        settings: tabSettings,
        save: tabSave
      };
      Object.keys(panelMap).forEach(name => {
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

    btnUpdatePrev.addEventListener('click', () => {
      activeUpdateIndex = (activeUpdateIndex - 1 + updateLogs.length) % updateLogs.length;
      renderUpdateLog();
    });
    btnUpdateNext.addEventListener('click', () => {
      activeUpdateIndex = (activeUpdateIndex + 1) % updateLogs.length;
      renderUpdateLog();
    });

        function openMoreModal(defaultTab = 'update', showDontShowButton = false) {
      try {
        moreModalBackdrop.classList.add('active');
        setActiveTab(defaultTab);
        renderUpdateLog();
        btnUpdateDontShow.style.display = showDontShowButton ? 'inline-block' : 'none';
      } catch (err) {
        console.error('[MoreModal] open failed:', err);
        try { showToast('더보기를 여는 중 오류가 발생했습니다. (콘솔 확인)', 'warn'); } catch(e) {}
      }
    }


    function closeMoreModal() {
      moreModalBackdrop.classList.remove('active');
    }

        // v1.6.2: 더보기 버튼 클릭 이슈 방지 (가드 + 이벤트 위임)
    if (btnMore) btnMore.addEventListener('click', () => openMoreModal('update', false));
    document.addEventListener('click', (e) => {
      const t = e.target.closest && e.target.closest('#btnMore');
      if (t) openMoreModal('update', false);
    });
    if (btnMoreClose) btnMoreClose.addEventListener('click', closeMoreModal);
        if (btnMoreClose2) btnMoreClose2.addEventListener('click', closeMoreModal);
    moreModalBackdrop.addEventListener('click', (e) => {
      if (e.target === moreModalBackdrop) closeMoreModal();
    });

    function maybeShowUpdateOnStart() {
      const lastSeen = localStorage.getItem(LAST_SEEN_VERSION_KEY);
      if (lastSeen !== CURRENT_VERSION) {
        activeUpdateIndex = updateLogs.length - 1;
        renderUpdateLog();
        openMoreModal('update', true);
      }
    }

    btnUpdateDontShow.addEventListener('click', () => {
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
        const label = mins > 0 ? `${mins}분 ${secs}초` : `${secs}초`;
        log(`오프라인 동안 에너지 ${recovered} 회복 (${label} 경과)`, 'system');
        showToast(`오프라인 회복: 에너지 +${recovered}`, 'save');
      }
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

      if (!silent) {
        log('게임 상태가 저장되었습니다.', 'system');
        showToast('저장 완료', 'save');
      } else if (state.ui && state.ui.autoSaveToast) {
        showToast('✅ 자동 저장 완료', 'save');
      }
      updateStatsUI();
    }

    function loadGame() {
      let raw = localStorage.getItem(SAVE_KEY);
      // v1.5.x 저장 데이터 자동 마이그레이션
      if (!raw) {
        raw = localStorage.getItem(OLD_SAVE_KEY);
        if (raw) {
          localStorage.setItem(SAVE_KEY, raw);
        }
      }
      if (!raw) {
        log('저장된 데이터가 없습니다.', 'system');
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
          data.ownedCodes.forEach(c => ownedCodes.push(c));
        }
        if (data.modifiers) {
          Object.assign(modifiers, data.modifiers);
        }
        // 새 필드 기본값 보정
        state.stats.energySpentTotal ||= 0;
        state.stats.creditsEarnedTotal ||= 0;
        state.stats.missionsCompletedTotal ||= 0;
        state.stats.riskHackSuccessCount ||= 0;
        state.missionProgress.general = state.missionProgress.general || { completed: {} };
        state.missionProgress.general.completed = state.missionProgress.general.completed || {};

        // v1.6.0 필드 보정
        state.items = state.items || { energyPack: 0 };
        state.items.energyPack = state.items.energyPack || 0;
        state.missionProgress.daily.actions = state.missionProgress.daily.actions || 0;

        // v1.6.1 UI 설정 보정
        state.ui = state.ui || { shopSortMode: 'update' };
        state.ui.shopSortMode = state.ui.shopSortMode || 'update';

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
        applySettings();
        syncSettingsUI();
        updateStatsUI();
        log('저장된 데이터를 불러왔습니다.', 'system');
      } catch (e) {
        console.error(e);
        log('저장 데이터를 불러오는 중 오류가 발생했습니다.', 'system');
      }
    }

    function clearSave() {
      localStorage.removeItem(SAVE_KEY);
      log('저장 데이터가 삭제되었습니다.', 'system');
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
      btnToggleLogs.textContent = logsHidden ? '로그 보이기' : '로그 숨기기';
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
        state.ui = state.ui || { shopSortMode: 'update' };
        state.ui.shopSortMode = shopSortSelect.value;
        renderShop();
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
      if (logSearchInput) logSearchInput.value = ui.logSearch || '';
    }

    if (setFontScale) {
      setFontScale.addEventListener('input', () => {
        state.ui.fontScale = Number(setFontScale.value);
        setFontScaleLabel.textContent = `${setFontScale.value}%`;
        applySettings();
        saveGame(true);
      });
    }

    if (setSnow) {
      setSnow.addEventListener('change', () => {
        // 체크/해제 시 수동 모드로 고정
        state.ui.snowEnabled = !!setSnow.checked;
        // indeterminate(자동) 해제
        setSnow.indeterminate = false;
        applySettings();
        saveGame(true);
      });
    }
    if (setUiZoom) {
      setUiZoom.addEventListener('change', () => {
        state.ui.uiZoom = Number(setUiZoom.value);
        applySettings();
        saveGame(true);
      });
    }
    if (setAnim) {
      setAnim.addEventListener('change', () => {
        state.ui.anim = !!setAnim.checked;
        applySettings();
        saveGame(true);
      });
    }
    if (setToastMs) {
      setToastMs.addEventListener('change', () => {
        state.ui.toastDurationMs = Number(setToastMs.value);
        saveGame(true);
      });
    }
    if (setAutoSaveToast) {
      setAutoSaveToast.addEventListener('change', () => {
        state.ui.autoSaveToast = !!setAutoSaveToast.checked;
        saveGame(true);
      });
    }

    // 로그 검색 + 핀
    if (logSearchInput) {
      logSearchInput.addEventListener('input', () => {
        state.ui.logSearch = logSearchInput.value || '';
        applyLogFilter();
        saveGame(true);
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
        showToast('저장 데이터 내보내기 완료', 'save');
      } catch (e) {
        console.error(e);
        showToast('내보내기 실패 (콘솔 확인)', 'warn');
      }
    }

    function importSaveFromText(text) {
      try {
        const obj = JSON.parse(text);
        localStorage.setItem(SAVE_KEY, JSON.stringify(obj));
        loadGame();
        showToast('저장 데이터 불러오기 완료', 'save');
      } catch (e) {
        console.error(e);
        showToast('불러오기 실패: JSON 형식을 확인하세요.', 'warn');
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
          showToast('텍스트가 비어 있습니다.', 'warn');
          return;
        }
        importSaveFromText(text);
      });
    }

    btnScan.addEventListener('click', scanForCode);
    btnHack.addEventListener('click', doHack);
    btnUpgradeCpu.addEventListener('click', upgradeCpu);
    btnUpgradeCode.addEventListener('click', upgradeSelectedCode);
    btnEvolveCode.addEventListener('click', evolveSelectedCode);

    btnUseEnergyPack.addEventListener('click', useEnergyPack);

    chkRiskMode.addEventListener('change', () => {
      state.riskMode = chkRiskMode.checked;
      log(`위험 해킹 모드: ${state.riskMode ? 'ON' : 'OFF'}`, 'system');
    });

    btnSaveLoadout.addEventListener('click', saveCurrentLoadout);
    btnLoadLoadout.addEventListener('click', loadLoadout);

    function init() {
      addCodeInstanceFromTemplate('basic');
      state.requiredExp = requiredExp(state.level);
      renderServers();
      renderShop();
      ensureMissionResets();
      applySettings();
      syncSettingsUI();
      updateStatsUI();
      log('HCSiG 초기화 완료. (v1.6.11(j) Tutorial Update)', 'system');

      if (localStorage.getItem(SAVE_KEY)) {
        loadGame();
      } else {
        state.lastSeenAt = Date.now();
        updateStatsUI();
      }

      renderUpdateLog();
      maybeShowUpdateOnStart();
      setTimeout(() => {
        maybeStartTutorial();
      }, 180);
    }

    init();
  


// === MOBILE PATCH: disable resizers on touch devices ===
(function(){
  const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  if(isTouch){
    document.querySelectorAll('.resizer,.resize-bar').forEach(el=>el.remove());
    window.addEventListener('load', ()=>{
      const lp = document.getElementById('leftPanel');
      const rp = document.getElementById('rightPanel');
      if(lp) lp.style.flex = 'none';
      if(rp) rp.style.flex = 'none';
    });
  }
})();



// === MOBILE UI MODE: Tabbed panels ===
(function(){
  const isMobile = window.matchMedia('(max-width: 900px), (hover: none) and (pointer: coarse)').matches;
  if(!isMobile) return;

  // IMPORTANT: This build uses the newer 5-tab "MOBILE VIEWS" system.
  // The legacy 3-tab (left/center/right) switcher can create an invisible overlay that blocks taps on iOS
  // until a relayout event (like opening "More") happens. Disable it entirely.
  return;

  // (legacy code below intentionally unreachable)

  if(!document.body.classList.contains('mobile-tab-left') &&
     !document.body.classList.contains('mobile-tab-center') &&
     !document.body.classList.contains('mobile-tab-right')){
    document.body.classList.add('mobile-tab-center');
  }

  function setTab(tab){
    document.body.classList.remove('mobile-tab-left','mobile-tab-center','mobile-tab-right');
    document.body.classList.add('mobile-tab-'+tab);
    document.querySelectorAll('.mobile-tabs button').forEach(b=>{
      b.classList.toggle('active', b.dataset.tab === tab);
    });
    const panelId = tab==='left'?'leftPanel':tab==='center'?'centerPanel':'rightPanel';
    const p = document.getElementById(panelId);
    if(p) p.scrollTop = 0;
  }

  const wrap = document.createElement('div');
  wrap.className = 'mobile-tabs';
  wrap.innerHTML = `
    <button type="button" data-tab="left" aria-label="Status">STATUS</button>
    <button type="button" data-tab="center" aria-label="Action">ACTION</button>
    <button type="button" data-tab="right" aria-label="Log">LOG</button>
  `;
  document.body.appendChild(wrap);

  wrap.querySelectorAll('button').forEach(btn=>{
    btn.addEventListener('click', ()=>setTab(btn.dataset.tab));
  });

  const btnMore = document.getElementById('btnMore');
  if(btnMore){
    btnMore.addEventListener('click', ()=>setTab('right'));
  }

  const initial = document.body.classList.contains('mobile-tab-left')?'left':
                  document.body.classList.contains('mobile-tab-right')?'right':'center';
  setTab(initial);

  window.addEventListener('resize', ()=>{
    const stillMobile = window.matchMedia('(max-width: 900px), (hover: none) and (pointer: coarse)').matches;
    if(!stillMobile){
      const mt = document.querySelector('.mobile-tabs');
      if(mt) mt.remove();
      document.body.classList.remove('mobile-tab-left','mobile-tab-center','mobile-tab-right');
    }
  });
})();



// === MOBILE VIEWS: split PC layout into mobile tabs ===
(function(){
  const isMobile = window.matchMedia('(max-width: 900px), (hover: none) and (pointer: coarse)').matches;
  if(!isMobile) return;

  // helper
  const byText = (root, sel, txt) => {
    const els = Array.from(root.querySelectorAll(sel));
    return els.find(e => (e.textContent||'').trim().toLowerCase() === txt.toLowerCase());
  };

  // Create mobile view containers
  const views = [
    ['Status','mobileViewStatus'],
    ['Action','mobileViewAction'],
    ['Codes','mobileViewCodes'],
    ['Shop','mobileViewShop'],
    ['Log','mobileViewLog'],
  ];
  const main = document.getElementById('main') || document.querySelector('#main') || document.body;

  views.forEach(([_,id])=>{
    if(document.getElementById(id)) return;
    const v = document.createElement('div');
    v.id = id;
    v.className = 'mobile-view';
    main.insertBefore(v, main.firstChild);
  });

  // Move leftPanel -> Status + Shop
  const left = document.getElementById('leftPanel');
  if(left){
    const shopTitle = Array.from(left.querySelectorAll('.section-title')).find(t => (t.textContent||'').trim()==='Shop');
    const statusView = document.getElementById('mobileViewStatus');
    const shopView = document.getElementById('mobileViewShop');

    if(shopTitle){
      // nodes before Shop go to Status
      let node = left.firstChild;
      const toMoveStatus = [];
      while(node && node !== shopTitle){
        const next = node.nextSibling;
        toMoveStatus.push(node);
        node = next;
      }
      toMoveStatus.forEach(n=>statusView.appendChild(n));

      // Shop title and everything after -> Shop
      let node2 = shopTitle;
      const toMoveShop = [];
      while(node2){
        const next = node2.nextSibling;
        toMoveShop.push(node2);
        node2 = next;
      }
      toMoveShop.forEach(n=>shopView.appendChild(n));
    }else{
      // fallback: whole left panel in Status
      statusView.appendChild(left);
    }
  }

  // Move centerPanel -> Action + Codes
  const center = document.getElementById('centerPanel');
  if(center){
    const actionView = document.getElementById('mobileViewAction');
    const codesView  = document.getElementById('mobileViewCodes');

    const codeInvTitle = Array.from(center.querySelectorAll('.section-title')).find(t => (t.textContent||'').trim()==='코드 인벤토리');
    let codeBlock = null;
    if(codeInvTitle){
      // typically inside a flex-row container
      codeBlock = codeInvTitle.closest('.flex-row') || codeInvTitle.closest('.stat-box') || codeInvTitle.parentElement;
    }

    if(codeBlock){
      // move nodes before codeBlock into Action
      let node = center.firstChild;
      const toMoveAction = [];
      while(node && node !== codeBlock){
        const next = node.nextSibling;
        toMoveAction.push(node);
        node = next;
      }
      toMoveAction.forEach(n=>actionView.appendChild(n));

      // move codeBlock and after into Codes
      let node2 = codeBlock;
      const toMoveCodes = [];
      while(node2){
        const next = node2.nextSibling;
        toMoveCodes.push(node2);
        node2 = next;
      }
      toMoveCodes.forEach(n=>codesView.appendChild(n));
    }else{
      // fallback: whole center in Action
      actionView.appendChild(center);
    }
  }

  // LOG view: try to use existing logBox if present, else open "더보기" logs
  const logView = document.getElementById('mobileViewLog');
  const logBox = document.getElementById('logBox');
  if(logBox){
    logView.appendChild(logBox.closest('.stat-box') ? logBox.closest('.stat-box') : logBox);
  } else {
    const tip = document.createElement('div');
    tip.className = 'stat-box';
    tip.innerHTML = '<div class="section-title">Log</div><div class="small">LOG는 상단의 “더보기”에서 확인할 수 있습니다.</div>';
    logView.appendChild(tip);
  }

  // Replace tab bar with 5 tabs
  const oldTabs = document.querySelector('.mobile-tabs');
  if(oldTabs) oldTabs.remove();

  const wrap = document.createElement('div');
  wrap.className = 'mobile-tabs';
  wrap.innerHTML = `
    <button type="button" data-view="status">STATUS</button>
    <button type="button" data-view="action">ACTION</button>
    <button type="button" data-view="codes">CODES</button>
    <button type="button" data-view="shop">SHOP</button>
    <button type="button" data-view="log">LOG</button>
  `;
  document.body.appendChild(wrap);

  function setView(v){
    document.body.classList.remove('mobile-view-status','mobile-view-action','mobile-view-codes','mobile-view-shop','mobile-view-log');
    document.body.classList.add('mobile-view-'+v);
    wrap.querySelectorAll('button').forEach(b=>b.classList.toggle('active', b.dataset.view===v));
    const id = 'mobileView' + v.charAt(0).toUpperCase() + v.slice(1);
    const panel = document.getElementById(id);
    if(panel) panel.scrollTop = 0;

    // If LOG chosen and logs are in more modal, try open it
    if(v==='log'){
      const btnMore = document.getElementById('btnMore');
      if(btnMore && !document.getElementById('logBox')) btnMore.click();
    }
  }

  wrap.querySelectorAll('button').forEach(btn=>{
    btn.addEventListener('click', ()=>setView(btn.dataset.view));
  });

  // When a code is tapped, auto-scroll to detail inside codes view
  const codeList = document.getElementById('codeList');
  const codeDetail = document.getElementById('codeDetail');
  if(codeList && codeDetail){
    codeList.addEventListener('click', (e)=>{
      const li = e.target.closest('li');
      if(!li) return;
      // ensure we're on Codes view
      setView('codes');
      setTimeout(()=>codeDetail.scrollIntoView({behavior:'smooth', block:'start'}), 50);
    });
  }

  // default view
  setView('status');
})();



// === SAFE-AREA / TABS HEIGHT CALIBRATION ===
(function(){
  const isMobile = window.matchMedia('(max-width: 900px), (hover: none) and (pointer: coarse)').matches;
  if(!isMobile) return;

  function setTabsHeightVar(){
    const tabs = document.querySelector('.mobile-tabs');
    if(!tabs) return;
    const h = Math.ceil(tabs.getBoundingClientRect().height);
    document.documentElement.style.setProperty('--mobileTabsH', h + 'px');
  }

  // Run now and after layout settles
  window.addEventListener('load', ()=>{ setTabsHeightVar(); setTimeout(setTabsHeightVar, 250); setTimeout(setTabsHeightVar, 800); });
  window.addEventListener('resize', ()=>{ setTabsHeightVar(); });
  window.addEventListener('orientationchange', ()=>{ setTimeout(setTabsHeightVar, 300); });

  // iOS Safari sometimes changes viewport when address bar hides/shows while scrolling
  document.addEventListener('scroll', ()=>{
    // light throttle
    if(window.__tabsH_to) return;
    window.__tabsH_to = setTimeout(()=>{ window.__tabsH_to = null; setTabsHeightVar(); }, 250);
  }, {passive:true});
})();



// === MOBILE TABS AUTO-HIDE on scroll ===
(function(){
  const isMobile = window.matchMedia('(max-width: 900px), (hover: none) and (pointer: coarse)').matches;
  if(!isMobile) return;

  function activeViewEl(){
    const ids = ['mobileViewStatus','mobileViewAction','mobileViewCodes','mobileViewShop','mobileViewLog'];
    for(const id of ids){
      const el = document.getElementById(id);
      if(!el) continue;
      const st = window.getComputedStyle(el);
      if(st.display !== 'none') return el;
    }
    return null;
  }

  let lastTop = 0;
  let hidden = false;
  let ticking = false;

  function showTabs(){
    if(!hidden) return;
    hidden = false;
    document.body.classList.remove('mobile-tabs-hidden');
  }
  function hideTabs(){
    if(hidden) return;
    hidden = true;
    document.body.classList.add('mobile-tabs-hidden');
  }

  function onScroll(){
    if(ticking) return;
    ticking = true;
    requestAnimationFrame(()=>{
      const el = activeViewEl();
      if(!el){ ticking=false; return; }
      const top = el.scrollTop || 0;
      const delta = top - lastTop;

      if(top <= 4){ showTabs(); lastTop = top; ticking=false; return; }
      if(Math.abs(delta) < 6){ ticking=false; return; }

      if(delta > 0) hideTabs();
      else showTabs();

      lastTop = top;
      ticking = false;
    });
  }

  function attach(){
    const ids = ['mobileViewStatus','mobileViewAction','mobileViewCodes','mobileViewShop','mobileViewLog'];
    ids.forEach(id=>{
      const el = document.getElementById(id);
      if(!el) return;
      if(el.__hcsigHideAttached) return;
      el.__hcsigHideAttached = true;
      el.addEventListener('scroll', onScroll, {passive:true});
      el.addEventListener('touchstart', showTabs, {passive:true});
    });
  }

  document.addEventListener('click', (e)=>{
    const btn = e.target.closest('.mobile-tabs button');
    if(btn) showTabs();
  });

  window.addEventListener('load', attach);
  window.addEventListener('resize', attach);
  setTimeout(attach, 600);
})();



// === ANDROID: VisualViewport keyboard handling + UA class ===
(function(){
  const isMobile = window.matchMedia('(max-width: 900px), (hover: none) and (pointer: coarse)').matches;
  if(!isMobile) return;

  const ua = navigator.userAgent || '';
  if(/Android/i.test(ua)) document.body.classList.add('is-android');
  if(/iPhone|iPad|iPod/i.test(ua)) document.body.classList.add('is-ios');

  const vv = window.visualViewport;
  if(!vv) return;

  function update(){
    // keyboard offset roughly equals viewport "missing" height
    const kb = Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop));
    document.documentElement.style.setProperty('--vvKeyboardOffset', kb + 'px');
    if(kb > 40) document.body.classList.add('keyboard-open');
    else document.body.classList.remove('keyboard-open');
  }

  vv.addEventListener('resize', update);
  vv.addEventListener('scroll', update);
  window.addEventListener('resize', update);
  window.addEventListener('orientationchange', ()=>setTimeout(update, 250));
  setTimeout(update, 250);
  setTimeout(update, 900);
})();



/* === CHRISTMAS SNOW EFFECT (v1.6.6: toggle + stop) === */
(function(){
  const canvas = document.getElementById('snow-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');

  let w = 0, h = 0;
  let rafId = null;
  let enabled = false;

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, {passive:true});

  const flakes = Array.from({length: 80}, () => ({
    x: Math.random()*w,
    y: Math.random()*h,
    r: Math.random()*2+1,
    s: Math.random()*0.5+0.5,
    o: Math.random()*0.5+0.3
  }));

  function tick(){
    if(!enabled){ rafId = null; return; }
    ctx.clearRect(0,0,w,h);
    for(const f of flakes){
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(255,255,255,${f.o})`;
      ctx.fill();
      f.y += f.s;
      if(f.y > h){ f.y = -5; f.x = Math.random()*w; }
    }
    rafId = requestAnimationFrame(tick);
  }

  function start(){
    if(enabled && !rafId) rafId = requestAnimationFrame(tick);
  }

  function stop(){
    enabled = false;
    if(rafId){ cancelAnimationFrame(rafId); rafId = null; }
    try { ctx.clearRect(0,0,w,h); } catch(e) {}
  }

  window.__snowFX = {
    setEnabled(on){
      enabled = !!on;
      if(enabled){
        start();
      } else {
        stop();
      }
    }
  };

  // 초기 상태는 applySettings()에서 결정
  try { if (typeof applySettings === 'function') applySettings(); } catch(e) {}
})();

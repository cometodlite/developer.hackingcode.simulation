# HCSiG — Hacking Code Simulator Game

웹 기반 해킹 시뮬레이션 게임입니다. 코드를 스캔하고 서버를 해킹하며 데이터 타워를 돌파하세요.

**플레이:** https://cometodlite.github.io/developer.hackingcode.simulation/

---

## 최신 업데이트

### v3.0.0 save migration / persistence fix — 2026-04-26

업데이트/커밋 후 게임 재접속 시 OPERATION 코드 등 진행 기록이 사라지던 치명 버그를 수정했습니다.

**저장 안정성 패치**
- `localStorage` 저장 키를 `HCSiG_SAVE_v17`로 고정 — 더 이상 키가 변경되지 않습니다.
- 진행도 점수 계산 함수(`getSaveScore`)를 도입했습니다. 보유 코드 / OPERATION·LEGENDARY 보유 / 도감 / 레벨 / 재화 / 데이터 타워 / ZERO-DAY를 종합 점수화합니다.
- `migrateSave()` 명시적 마이그레이션 함수를 추가했습니다. 1.x / 2.x / 이전 3.0.0 구조를 자동 변환하고, 누락된 필드만 default를 merge합니다 — 기존 획득/진행 데이터는 절대 삭제하지 않습니다.
- OPERATION 코드 legacy ID 매핑을 추가했습니다 (`op_meridian` → `operation_meridian` 등).
- `HCSiG_SAVE_BACKUP` 자동 백업을 도입했습니다. 마이그레이션 전 raw save를 보관하고, main이 비면 자동 복구합니다.
- 앱 시작 시 default state를 자동 저장하지 않도록 init 흐름을 정리했습니다 — 사용자 행동/저장이 있을 때까지 `localStorage`를 건드리지 않습니다.

**Cross-device 동기화 안전화**
- 클라우드 저장 자동 적용 시 점수 비교가 적용됩니다. 진행도 낮은 save가 진행도 높은 save를 자동으로 덮지 못합니다.
- 점수 차가 ±10 이내면 시간 기준, 차이가 크면 점수 기준으로 결정합니다.
- 수동 클라우드 저장(PUSH) / 클라우드 적용(PULL) / Import 시 점수 차가 큰 경우 사용자에게 확인 다이얼로그를 띄웁니다.
- Export 파일에 진행도 요약(score / level / OPERATION 보유 수 등)을 포함합니다. 파일 이름에도 `_s<score>` 접미사가 붙습니다.

**확인 기준**
- 업데이트 전 OPERATION 코드 보유 상태가 새 커밋 반영 후에도 그대로 유지됩니다.
- 크레딧 / 에너지 팩 / 코드 인벤토리 / 도감 / 퀘스트 진행도 / ZERO-DAY 상태가 보존됩니다.
- 새로 빌드된 빈 save가 클라우드의 진행도 높은 save를 덮어쓰지 못합니다.

---

### v3.0.0 — 2026-04-25

이번 업데이트는 꽤 큰 변화가 있었습니다. 단순히 콘텐츠를 추가한 게 아니라 전반적인 게임 흐름을 다시 정비했습니다.

**홈 / 화면 구성**
- 탭 순서를 새로 잡았습니다 — SHOP / CODES / HOME / LAB / COMING SOON 순으로 바뀌었어요. COMING SOON은 이제 탭을 눌러도 화면이 이동하지 않고 "추후 공개" 토스트만 뜹니다.
- 홈의 STATUS 패널에서 레벨, 경험치, 에너지를 제외한 나머지 정보는 접을 수 있게 바뀌었습니다. 화면이 좀 더 시원해졌어요.
- CPU/GPU 업그레이드 버튼을 하나로 통합했고, 로드아웃 UI는 걷어냈습니다.
- 타겟 서버 옆에 외부 / 내부 / 코어 루트를 선택할 수 있게 됐습니다. 새로고침해도 선택이 유지됩니다.

**에너지**
- 에너지 회복 속도가 120초에서 60초로 빨라졌습니다.
- 에너지가 0이 되면 숫자가 빨간색으로 깜빡여서 한눈에 보이게 했습니다.

**코드 / 스캔**
- 코드 목록에서 카드를 클릭하면 팝업 없이 우측 패널에서 바로 상세 정보가 보입니다.
- 코드 등급이 OPERATION을 추가해 6종 체계로 확장됐습니다.
- OPERATION 등급 코드 2종이 추가됐습니다. 스캔 중 0.1% 확률로 등장합니다.

**퀘스트 / 업적**
- GENERAL 퀘스트가 30종 넘게 추가됐습니다.
- 업적 난이도가 입문 / 일반 / 보통 / 어려움 / 혼돈 / 불가능 6단계로 나뉘었습니다.
- WEEKLY 퀘스트 중 '방전 습관' 미션이 클리어되지 않던 버그를 고쳤습니다.

**이벤트 / PASS**
- EVENT 탭이 WEEKLY CHALLENGE와 PASS로 나뉘었습니다.
- WEEKLY CHALLENGE에 PROGRESS 난이도를 고를 수 있게 됐습니다 — 기초 / 견습 / 심화 / 전문가 4종이고, 선택한 난이도에 따라 다음 리셋부터 목표 구성이 달라집니다.
- PASS는 30티어로 구성된 시즌 패스입니다. Season 1은 2026년 5월부터 시작합니다.

**데이터 타워**
- 클리어에 에너지가 2에서 1로 줄었습니다.
- 그냥 확률 판정으로 끝나던 방식 대신 BREACH / SHIELD / FOCUS / EXIT 4가지 행동을 직접 선택하는 턴제 전투로 바뀌었습니다.
- 반복 보상이 대폭 줄었습니다. 첫 클리어 위주로 가시는 걸 권장합니다.

**ZERO-DAY**
- 터미널 형태의 UI로 교체됐습니다. `root@zeroday:~#` 프롬프트에서 명령어를 입력하거나 버튼을 눌러 진행합니다.
- 온보딩을 완료하면 PVE / PVP가 열리고 취약점 재화 1개가 지급됩니다.

**설정 / 계정**
- 클라우드 계정 탭이 "계정 및 클라우드 상태"와 "계정 커스텀" 두 패널로 나뉘었습니다.
- 효과음 기본 볼륨이 100%로 올라갔습니다.
- 자동저장 주기가 5초로 줄었습니다.
- 눈 이펙트를 제거했습니다.
- 일본어가 추가됐습니다.

**튜토리얼**
- 따라야 할 버튼에 하이라이트(파란색 테두리 + 펄스)가 생겼습니다.
- 튜토리얼을 다시 볼 때 화면에 짧은 글리치 효과가 나타납니다.

---

## 플레이 방법

1. HOME에서 **코드 스캔**으로 코드를 획득합니다
2. CODES에서 사용할 코드를 선택합니다
3. HOME에서 타겟 서버와 루트를 고르고 **서버 해킹**을 실행합니다
4. 크레딧을 모아 CPU / GPU / 상점 아이템으로 능력을 올립니다
5. LAB에서 **데이터 타워**와 **ZERO-DAY**에 도전합니다

---

## 기술 스택

- HTML / CSS / JavaScript (빌드 툴 없음)
- Firebase Firestore — 클라우드 저장
- GitHub Pages — 배포

---

© 2025–2026 COMET. 개발: COMET DEVELOPS / COMETODLITE

## v3.0.0 PC stability hotfix - 2026-04-26

- Fixed server dropdown placeholder leakage where `{name}`, `{sec}`, `{lv}` could appear instead of real server labels.
- Fixed CODES detail/CODEX placeholder leakage where `{v}`, `{cost}`, `{b}`, `{lv}`, `{pwr}` could appear in code detail panels.
- Removed the legacy ZERO-DAY click handler that called undefined `startZeroDay()` / `runZeroDayAction()` and kept the newer `data-zd-*` handler path.
- Split achievement hard difficulty i18n key from weekly challenge difficulty key to remove duplicated `difficultyHard` entries.
- Corrected the English energy recovery description from 120 seconds to 60 seconds.
- Added modal toolbar layering CSS so LIST / EVENT / More top controls stay visible while long lists scroll.
- Strengthened save loading to compare v17, v16, and backup save candidates by progress score before choosing the source save.


## v3.0.0 modal toolbar clipping hotfix - 2026-04-26

- Fixed the More modal top tab/toolbar clipping where the tab row could collapse into a thin green bar.
- Reworked LIST / EVENT / More modal CSS so header and toolbar areas remain in the layout while only long content lists scroll.
- Protected CODEX, Mission/Achievement, and WEEKLY/PASS scroll areas from overlapping the modal toolbar.

### v3.0.0 More modal tab isolation hotfix
- 더보기 모달에서 CODEX 목록이 LIVE NET / RANK / 설정 / 클라우드 계정 / CREDITS / 설명서 탭 뒤에 계속 남아 보이는 문제를 수정했습니다.
- More 탭 전환 시 모든 패널에 `active`, `hidden`, `display`, `aria-hidden` 상태를 명시적으로 적용하여 한 번에 하나의 패널만 렌더링되도록 보강했습니다.
- CSS에서 비활성 `.more-tab-panel`을 강제로 숨겨 CODEX 리스트와 하위 탭 콘텐츠가 겹치는 현상을 방지했습니다.

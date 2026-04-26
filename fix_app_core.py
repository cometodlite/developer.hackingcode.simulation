import re
import shutil

# 백업 생성
shutil.copy('app-core.js', 'app-core.js.bak')
print("백업 생성: app-core.js.bak")

with open('app-core.js', 'r', encoding='utf-8') as f:
    content = f.read()
    lines = content.split('\n')

changes = []

# ============================================================
# 수정 1: I18N 중복 키 difficultyHard 제거
# 라인 19(ko), 39(en), 60(ja)에서 difficultyHard 항목 제거
# (라인 24/44/65에 이미 동일 값으로 존재하므로 앞의 것을 제거)
# ============================================================

# 각 언어별로 첫 번째 선언 라인(19, 39, 60)에서 difficultyHard 항목 제거
target_lines = {
    19: "ko",
    39: "en",
    60: "ja",
}

for lineno, lang in target_lines.items():
    idx = lineno - 1
    original = lines[idx]
    
    # difficultyHard:'...' 패턴 제거 (앞의 쉼표+공백 포함)
    # 패턴: ", difficultyHard:'값'" 또는 "difficultyHard:'값', "
    new_line = re.sub(r",\s*difficultyHard:'[^']*'", '', original)
    
    if new_line != original:
        lines[idx] = new_line
        changes.append(f"  [수정1-{lang}] 라인 {lineno}: difficultyHard 중복 키 제거")
        print(f"✅ 수정1-{lang}: 라인 {lineno} difficultyHard 중복 키 제거")
    else:
        print(f"⚠️  수정1-{lang}: 라인 {lineno} 패턴 미발견")

# ============================================================
# 수정 2: actionsDesc1 에너지 시간 불일치 수정
# 라인 10(ko): '120초' → '60초'
# 라인 30(en): '120 seconds' → '60 seconds'
# ============================================================

# 라인 10 (ko)
idx10 = 10 - 1
original10 = lines[idx10]
new10 = original10.replace("에너지 1칸 = 120초", "에너지 1칸 = 60초")
if new10 != original10:
    lines[idx10] = new10
    changes.append("  [수정2-ko] 라인 10: actionsDesc1 '120초' → '60초'")
    print("✅ 수정2-ko: 라인 10 actionsDesc1 120초 → 60초")
else:
    print("⚠️  수정2-ko: 라인 10 패턴 미발견")

# 라인 30 (en)
idx30 = 30 - 1
original30 = lines[idx30]
new30 = original30.replace("1 energy = 120 seconds", "1 energy = 60 seconds")
if new30 != original30:
    lines[idx30] = new30
    changes.append("  [수정2-en] 라인 30: actionsDesc1 '120 seconds' → '60 seconds'")
    print("✅ 수정2-en: 라인 30 actionsDesc1 120 seconds → 60 seconds")
else:
    print("⚠️  수정2-en: 라인 30 패턴 미발견")

# ============================================================
# 수정 3: 미정의 함수 호출 블록 제거
# 라인 8826~8835: startZeroDay / runZeroDayAction 호출 블록 제거
# ============================================================

# 해당 블록을 찾아서 제거
# 블록 내용:
# bind(document, 'click', (event) => {
#   const startBtn = event.target.closest && event.target.closest('[data-zero-day-start]');
#   if (startBtn) {
#     startZeroDay(startBtn.dataset.zeroDayStart || 'single');
#     return;
#   }
#   const actionBtn = event.target.closest && event.target.closest('[data-zero-day-action]');
#   if (!actionBtn) return;
#   runZeroDayAction(actionBtn.dataset.zeroDayAction || '');
# });

block_start_pattern = r"bind\(document, 'click', \(event\) => \{"
block_content_check = "startZeroDay"

# 라인 8826~8835 범위에서 블록 찾기
found_block_start = -1
for i in range(8820, 8840):
    if i < len(lines) and re.search(r"bind\(document,\s*'click',\s*\(event\)\s*=>\s*\{", lines[i]):
        # 이 블록이 startZeroDay를 포함하는지 확인
        block_text = '\n'.join(lines[i:i+15])
        if 'startZeroDay' in block_text:
            found_block_start = i
            break

if found_block_start >= 0:
    # 블록 끝 찾기 (});)
    block_end = -1
    for j in range(found_block_start + 1, found_block_start + 20):
        if j < len(lines) and lines[j].strip() == '});':
            block_end = j
            break
    
    if block_end >= 0:
        print(f"✅ 수정3: 라인 {found_block_start+1}~{block_end+1} startZeroDay/runZeroDayAction 블록 제거")
        changes.append(f"  [수정3] 라인 {found_block_start+1}~{block_end+1}: 미정의 함수 호출 블록 제거")
        # 해당 라인들을 빈 줄로 대체 (삭제 시 라인 번호 변동 방지)
        for k in range(found_block_start, block_end + 1):
            lines[k] = ''
    else:
        print(f"⚠️  수정3: 블록 끝 미발견 (시작: {found_block_start+1})")
else:
    print("⚠️  수정3: startZeroDay 블록 미발견")

# ============================================================
# 결과 저장
# ============================================================
new_content = '\n'.join(lines)
with open('app-core.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("\n=== 수정 완료 ===")
for c in changes:
    print(c)
print(f"\n총 {len(changes)}개 수정 적용")

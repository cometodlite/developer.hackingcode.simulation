import re

with open('app-core.js', 'r', encoding='utf-8') as f:
    content = f.read()
    lines = content.split('\n')

print("=" * 70)
print("app-core.js 오류 심층 분석 보고서")
print("=" * 70)

# ============================================================
# 1. I18N 중복 키 분석
# ============================================================
print("\n[1] I18N 객체 중복 키 오류")
print("-" * 50)

# 각 언어 블록 범위 파악
# ko: 라인 6~25, en: 라인 26~46, ja: 라인 47~73
lang_blocks = {
    'ko': (6, 25),
    'en': (26, 46),
    'ja': (47, 73),
}

for lang, (start, end) in lang_blocks.items():
    block_lines = lines[start-1:end]
    block_text = '\n'.join(block_lines)
    
    # 모든 키 추출
    keys = re.findall(r"(\w+)\s*:", block_text)
    
    # 중복 찾기
    seen = {}
    duplicates = {}
    for i, line in enumerate(block_lines, start):
        found = re.findall(r"(\w+)\s*:'[^']*'", line)
        for k in found:
            if k in seen:
                if k not in duplicates:
                    duplicates[k] = [seen[k]]
                duplicates[k].append(i)
            else:
                seen[k] = i
    
    if duplicates:
        print(f"\n  언어 '{lang}' 블록 (라인 {start}~{end}):")
        for key, line_nums in duplicates.items():
            print(f"    중복 키: '{key}' → 라인 {line_nums}")
            for ln in line_nums:
                m = re.search(rf"{key}:'([^']*)'", lines[ln-1])
                if m:
                    print(f"      라인 {ln}: {key}:'{m.group(1)}'")

# ============================================================
# 2. 미정의 함수/변수 오류
# ============================================================
print("\n\n[2] 미정의 함수/변수 오류 (no-undef)")
print("-" * 50)

undef_items = {
    'escapeHtml': 5289,
    'startZeroDay': 8829,
    'runZeroDayAction': 8834,
}

for name, lineno in undef_items.items():
    line = lines[lineno - 1].strip()
    print(f"\n  '{name}' (라인 {lineno})")
    print(f"  코드: {line[:120]}")
    
    # 정의 여부 검색
    defined_lines = []
    for i, l in enumerate(lines, 1):
        if re.search(rf'function\s+{name}\s*\(|const\s+{name}\s*=|let\s+{name}\s*=|var\s+{name}\s*=', l):
            defined_lines.append(i)
    
    if defined_lines:
        print(f"  정의 위치: 라인 {defined_lines}")
    else:
        print(f"  → 파일 내 정의 없음 (다른 파일에서 정의되어야 함)")

# ============================================================
# 3. 미사용 변수/함수 중 중요한 것들
# ============================================================
print("\n\n[3] 주요 미사용 함수/변수 (no-unused-vars)")
print("-" * 50)

important_unused = {
    'renderOpsShopHTML': 4570,
    'CODE_ZD_TAGS': 4772,
    'zeroCopy': 5715,
    'clampNumber': 5719,
    'attemptStage': 6301,
    'isChristmasSeason': 8552,
}

for name, lineno in important_unused.items():
    line = lines[lineno - 1].strip()
    print(f"\n  '{name}' (라인 {lineno})")
    print(f"  코드: {line[:120]}")

# ============================================================
# 4. 논리적 오류 - actionsDesc1 불일치
# ============================================================
print("\n\n[4] 문서/설명 불일치 오류")
print("-" * 50)

# actionsDesc1에서 에너지 회복 시간 불일치 확인
for i, line in enumerate(lines, 1):
    if 'actionsDesc1' in line or 'energyRecoveryDesc' in line:
        m_ko = re.search(r"actionsDesc1:'([^']*)'", line)
        m_en = re.search(r"actionsDesc1:'([^']*)'", line)
        m_rec = re.search(r"energyRecoveryDesc:'([^']*)'", line)
        if m_rec:
            print(f"  라인 {i}: energyRecoveryDesc = '{m_rec.group(1)}'")
        if m_ko:
            print(f"  라인 {i}: actionsDesc1 = '{m_ko.group(1)[:80]}'")

# ENERGY_INTERVAL_MS 확인
for i, line in enumerate(lines, 1):
    if 'ENERGY_INTERVAL_MS' in line and ('=' in line or 'const' in line):
        print(f"\n  에너지 인터벌 상수 (라인 {i}): {line.strip()}")

# ============================================================
# 5. 잠재적 논리 오류 - 빈 catch 블록
# ============================================================
print("\n\n[5] 빈 catch 블록 (잠재적 오류 은폐)")
print("-" * 50)

empty_catch_count = 0
for i, line in enumerate(lines, 1):
    if re.search(r'catch\s*\(\s*e\s*\)\s*\{\s*\}', line):
        empty_catch_count += 1
        if empty_catch_count <= 10:
            print(f"  라인 {i}: {line.strip()[:100]}")

print(f"\n  총 빈 catch 블록 수: {empty_catch_count}개")

# ============================================================
# 6. app-ui.js의 't' 미정의 오류
# ============================================================
print("\n\n[6] app-ui.js 미정의 변수 't'")
print("-" * 50)

with open('app-ui.js', 'r', encoding='utf-8') as f:
    ui_lines = f.readlines()

t_undef_lines = [249, 517, 518, 519, 520, 521]
for ln in t_undef_lines:
    if ln <= len(ui_lines):
        print(f"  라인 {ln}: {ui_lines[ln-1].strip()[:120]}")

# t 함수 정의 위치 확인
print("\n  't' 함수 정의 검색:")
for i, line in enumerate(ui_lines, 1):
    if re.search(r'function\s+t\s*\(|const\s+t\s*=|let\s+t\s*=|var\s+t\s*=', line):
        print(f"    라인 {i}: {line.strip()[:100]}")

# ============================================================
# 7. liveOps.js == 대신 === 사용
# ============================================================
print("\n\n[7] liveOps.js 동등 비교 오류 (== 대신 ===)")
print("-" * 50)

with open('liveOps.js', 'r', encoding='utf-8') as f:
    live_lines = f.readlines()

for i, line in enumerate(live_lines, 1):
    if re.search(r'[^=!<>]==[^=]', line) and '!=' not in line:
        print(f"  라인 {i}: {line.strip()[:120]}")

print("\n분석 완료.")

import re

with open('app-core.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print("=== app-core.js 중복 키 오류 분석 ===\n")

# ESLint가 보고한 오류 라인: 24(col 2516), 44(col 3118), 65(col 2545)
error_lines = [(24, 2516), (44, 3118), (65, 2545)]

for lineno, col in error_lines:
    line = lines[lineno - 1]
    # 해당 컬럼 주변 컨텍스트
    start = max(0, col - 60)
    end = min(len(line), col + 80)
    context = line[start:end]
    
    # 해당 라인에서 difficultyHard 모든 위치
    positions = [(m.start(), m.end()) for m in re.finditer(r"difficultyHard:'[^']*'", line)]
    
    print(f"--- 라인 {lineno}, 컬럼 {col} ---")
    print(f"컨텍스트: ...{context}...")
    print(f"해당 라인의 difficultyHard 항목들:")
    for s, e in positions:
        print(f"  col {s}: {line[s:e]}")
    print()

# 전체 파일에서 I18N 객체 내 각 언어별 difficultyHard 중복 분석
print("\n=== 전체 파일 difficultyHard 출현 라인 ===")
for i, line in enumerate(lines, 1):
    count = line.count("difficultyHard")
    if count > 0:
        positions = [(m.start(), m.end()) for m in re.finditer(r"difficultyHard:'[^']*'", line)]
        print(f"라인 {i}: {count}회 출현")
        for s, e in positions:
            print(f"  col {s}: {line[s:e]}")

# 추가: no-undef 오류 분석 (escapeHtml, startZeroDay, runZeroDayAction)
print("\n=== 미정의 함수/변수 오류 분석 ===")
undef_items = ['escapeHtml', 'startZeroDay', 'runZeroDayAction']
for item in undef_items:
    print(f"\n'{item}' 검색:")
    for i, line in enumerate(lines, 1):
        if item in line:
            print(f"  라인 {i}: {line.strip()[:120]}")

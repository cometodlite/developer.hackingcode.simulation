import re

with open('app-core.js', 'r', encoding='utf-8') as f:
    content = f.read()
    lines = content.split('\n')

print("=== I18N 객체 언어 블록 라인 범위 분석 ===\n")

# 각 언어 블록의 시작 라인 찾기
lang_starts = {}
for i, line in enumerate(lines, 1):
    # ko:, en:, ja: 같은 언어 키 찾기
    m = re.match(r'\s+(ko|en|ja)\s*:\s*\{', line)
    if m:
        lang_starts[m.group(1)] = i
        print(f"언어 '{m.group(1)}' 시작: 라인 {i}")

print()

# 각 언어별로 difficultyHard 키가 몇 번 나오는지 확인
# 라인 19, 24 = ko 블록 (두 번 등장 = 중복)
# 라인 39, 44 = en 블록 (두 번 등장 = 중복)
# 라인 60, 65 = ja 블록 (두 번 등장 = 중복)

print("=== 각 언어 블록 내 difficultyHard 출현 위치 ===")
for lang, start_line in lang_starts.items():
    print(f"\n언어: {lang} (시작 라인: {start_line})")
    for i in range(start_line, min(start_line + 100, len(lines))):
        if 'difficultyHard' in lines[i-1]:
            print(f"  라인 {i}: {lines[i-1].strip()[:150]}")

print("\n=== 라인 19 vs 24 비교 (ko 블록) ===")
print(f"라인 19 (col 317): difficultyHard:'어려움'")
print(f"라인 24 (col 2514): difficultyHard:'어려움'")
print()

# 라인 19 주변 컨텍스트
line19 = lines[18]
# difficultyHard 앞 키들 찾기
idx = line19.find('difficultyHard')
start = max(0, idx - 100)
print(f"라인 19 주변: ...{line19[start:idx+50]}...")

print()
line24 = lines[23]
idx = line24.find('difficultyHard')
start = max(0, idx - 100)
print(f"라인 24 주변: ...{line24[start:idx+50]}...")

print("\n=== 라인 19 전체 키 목록 (앞부분) ===")
# 라인 19에서 모든 키 추출
keys19 = re.findall(r"(\w+):'[^']*'", line19)
print(f"총 {len(keys19)}개 키")
# difficulty 관련 키만
diff_keys = [k for k in keys19 if 'difficulty' in k.lower()]
print(f"difficulty 관련 키: {diff_keys}")

print("\n=== 라인 24 전체 키 목록 (앞부분) ===")
keys24 = re.findall(r"(\w+):'[^']*'", line24)
print(f"총 {len(keys24)}개 키")
diff_keys24 = [k for k in keys24 if 'difficulty' in k.lower()]
print(f"difficulty 관련 키: {diff_keys24}")

# 두 라인에서 공통 키 찾기 (중복 키 확인)
common = set(keys19) & set(keys24)
if common:
    print(f"\n라인 19와 24에 공통으로 있는 키 (중복 가능성): {sorted(common)}")

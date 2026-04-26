import re

files = {
    'app-core.js': open('app-core.js', 'r', encoding='utf-8').read(),
    'app-ui.js': open('app-ui.js', 'r', encoding='utf-8').read(),
    'auth.js': open('auth.js', 'r', encoding='utf-8').read(),
    'cloudSave.js': open('cloudSave.js', 'r', encoding='utf-8').read(),
    'liveOps.js': open('liveOps.js', 'r', encoding='utf-8').read(),
    'index.html': open('index.html', 'r', encoding='utf-8').read(),
}

print("=== startZeroDay / runZeroDayAction 전체 검색 ===\n")

for item in ['startZeroDay', 'runZeroDayAction', 'ZeroDay', 'zeroDay', 'zeroDayStart', 'zeroDayAction']:
    print(f"'{item}' 검색:")
    for fname, content in files.items():
        lines = content.split('\n')
        for i, line in enumerate(lines, 1):
            if item in line:
                print(f"  [{fname}:{i}] {line.strip()[:120]}")
    print()

print("\n=== app-core.js 라인 8820~8850 컨텍스트 ===")
core_lines = files['app-core.js'].split('\n')
for i in range(8815, min(8855, len(core_lines))):
    print(f"  {i+1}: {core_lines[i]}")

print("\n=== liveOps.js에서 ZeroDay 관련 함수 정의 ===")
live_lines = files['liveOps.js'].split('\n')
for i, line in enumerate(live_lines, 1):
    if re.search(r'function\s+\w*[Zz]ero\w*|function\s+\w*[Dd]ay\w*', line):
        print(f"  라인 {i}: {line.strip()[:120]}")

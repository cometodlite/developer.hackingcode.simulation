import re

files = {
    'app-core.js': open('app-core.js', 'r', encoding='utf-8').read(),
    'app-ui.js': open('app-ui.js', 'r', encoding='utf-8').read(),
    'auth.js': open('auth.js', 'r', encoding='utf-8').read(),
    'cloudSave.js': open('cloudSave.js', 'r', encoding='utf-8').read(),
    'liveOps.js': open('liveOps.js', 'r', encoding='utf-8').read(),
    'index.html': open('index.html', 'r', encoding='utf-8').read(),
}

search_items = ['escapeHtml', 'startZeroDay', 'runZeroDayAction', 't(', 'function t(', 'window.t']

print("=== 미정의 함수 전체 파일 검색 ===\n")

for item in ['escapeHtml', 'startZeroDay', 'runZeroDayAction']:
    print(f"'{item}' 정의 검색:")
    found_any = False
    for fname, content in files.items():
        lines = content.split('\n')
        for i, line in enumerate(lines, 1):
            if re.search(rf'function\s+{item}\s*\(|const\s+{item}\s*=|let\s+{item}\s*=|var\s+{item}\s*=|window\.{item}\s*=', line):
                print(f"  [{fname}] 라인 {i}: {line.strip()[:100]}")
                found_any = True
    if not found_any:
        print(f"  → 어떤 파일에도 정의 없음!")
    print()

print("\n=== 't' 함수 정의 검색 ===")
for fname, content in files.items():
    lines = content.split('\n')
    for i, line in enumerate(lines, 1):
        if re.search(r'function\s+t\s*\(|const\s+t\s*=\s*|window\.t\s*=|^t\s*=', line):
            print(f"  [{fname}] 라인 {i}: {line.strip()[:100]}")

print("\n=== index.html에서 스크립트 로딩 순서 확인 ===")
html = files['index.html']
script_tags = re.findall(r'<script[^>]*src=["\']([^"\']+)["\'][^>]*>', html)
for s in script_tags:
    print(f"  {s}")

print("\n=== app-core.js에서 't' 함수 정의 확인 ===")
core_lines = files['app-core.js'].split('\n')
for i, line in enumerate(core_lines, 1):
    if re.search(r'\bfunction\s+t\b|\bconst\s+t\s*=|\blet\s+t\s*=|\bvar\s+t\s*=', line):
        print(f"  라인 {i}: {line.strip()[:120]}")
    if i > 200:
        break

# t 함수가 어디 있는지 전체 검색
print("\n  전체 파일에서 't' 함수 정의 검색:")
for i, line in enumerate(core_lines, 1):
    if re.search(r'^function\s+t\b|^\s+function\s+t\b|const\s+t\s*=\s*function|const\s+t\s*=\s*\(', line):
        print(f"  라인 {i}: {line.strip()[:120]}")

print("\n=== actionsDesc1 120초 vs 60초 불일치 요약 ===")
for fname, content in files.items():
    lines = content.split('\n')
    for i, line in enumerate(lines, 1):
        if 'actionsDesc1' in line and '120' in line:
            print(f"  [{fname}] 라인 {i}: {line.strip()[:150]}")
        if 'actionsDesc1' in line and '60' in line:
            print(f"  [{fname}] 라인 {i}: {line.strip()[:150]}")

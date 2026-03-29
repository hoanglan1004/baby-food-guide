# 하윤이 이유식 가이드

## 프로젝트 개요
- **목적**: 초보 엄마(홍란님)가 "오늘 뭘 먹이지?" 고민 없이 과학적 이유식을 따라할 수 있는 PWA
- **주 사용자**: 홍란님 (민호님은 집에서 확인)
- **기술 스택**: 순수 HTML/CSS/JS, PWA (Service Worker), localStorage
- **호스팅**: GitHub Pages (무료)
- **정보 소스**: WHO, AAP, 대한소아청소년과학회, ESPGHAN (과학적 근거 우선)

## 핵심 파일 구조
```
baby-food-guide/
├── index.html              ← 메인: 오늘의 이유식 + 반응 기록
├── weekly.html             ← 주간 식단표 + 장보기 목록
├── ingredients.html        ← 식재료 사전 (카테고리/검색)
├── journal.html            ← 이유식 일지 (달력 + 기록)
├── guide.html              ← 단계별 가이드 (농도/크기/스케줄)
├── css/style.css           ← 모바일 우선 스타일 (CSS 변수 테마)
├── js/
│   ├── data.js             ← 핵심! 식재료 DB + 주간 식단 템플릿 (8주분)
│   ├── app.js              ← 월령 계산, 식단 엔진, 일지 CRUD
│   └── sw-register.js      ← Service Worker 등록
├── sw.js                   ← 오프라인 캐싱
├── manifest.json           ← PWA 매니페스트
└── docs/                   ← PDCA 문서
```

## 진입점 및 실행 방법
- 로컬: `npx serve .` 또는 `python -m http.server 8080`
- 배포: GitHub Pages (`Settings > Pages > main branch`)
- PWA: 모바일 브라우저에서 "홈 화면에 추가"

## 데이터 저장
- **localStorage 키**: `hayun_babyfood`
- 구조: `{ babyName, babyBirthday, journal: {날짜: {meals}}, triedIngredients: {id: {count, reaction}} }`
- 서버 없음, 모든 데이터는 사용자 기기에만 저장
- 백업: journal.html에서 JSON 내보내기/가져오기

## 핵심 설계 원칙
1. **편식 방지**: 5색 식재료(빨/초/노/흰/보라) + 5대 식품군 골고루 배치
2. **3일 규칙**: 새 식재료는 3일 연속 같은 것만 → 알레르기 관찰
3. **시각 우선**: 텍스트 최소화, 이모지/색상 코딩으로 정보 전달
4. **과학적 근거**: 모든 정보에 출처 표시 (WHO, AAP 등)

## 주간 식단 데이터 (data.js)
- `WEEKLY_PLANS`: 초기 이유식 8주분 식단 템플릿
- 키 형식: `initial_w1` ~ `initial_w8`
- 각 주: 7일 식단 + 장보기 목록 + 영양 포커스 + 출처
- 확장: 중기/후기/완료기 식단 추가 필요 (`middle_w1`, `late_w1` 등)

## 알려진 제한사항
- 초기 이유식(8주분)만 식단 데이터 존재 → 중기/후기/완료기 추가 필요
- PWA 아이콘이 SVG placeholder → 실제 PNG 아이콘 제작 필요
- 기기 간 데이터 동기화 미지원 (v1 범위 외)

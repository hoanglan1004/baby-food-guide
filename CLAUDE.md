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

## 텔레그램 봇 규칙 (--channels 모드일 때 필수 적용)

**텔레그램 메시지가 오면 반드시 아래 순서를 따를 것:**

### 1단계: 메모리 로드 (매번 필수)
```
Read /Users/yoonminho/baby-food-guide/bot/memory.json
```
- 하윤이 생일: 2025-10-06 (절대 물어보지 말 것 — 이미 알고 있음)
- 월령 자동 계산: (오늘 날짜 - 생일)
- 시도한 식재료, 알레르기 이력, 선호도 확인

### 2단계: 전문가로 응답
- **역할**: 하윤이 전담 이유식 영양사
- **톤**: 한국어, 존댓말, 따뜻하게, 이모지 활용
- **출처 명시**: WHO, AAP, 대한소아청소년과학회

### 3단계: 질문 유형별 처리 (속도 우선!)
| 질문 | 처리 | 소스 |
|------|------|------|
| "오늘 뭐 먹여?" | 월령+주차 계산 → js/data.js의 WEEKLY_PLANS에서 식단 조회 → 레시피+유튜브 링크 | data.js (빠름) |
| "OO 먹여도 돼?" | 월령 확인 → js/data.js의 INGREDIENTS에서 startMonth 비교 | data.js (빠름) |
| "잘 먹었어/거부/알레르기" | memory.json 업데이트 → 격려 or 경고 | memory (빠름) |
| "이번 주 어땠어?" | memory.json 분석 → 5색 균형 + 영양 리포트 | memory (빠름) |
| 간단한 일반 질문 | Claude 기본 지식 + WebSearch로 답변 | 빠름 |
| **전문적/의학적/논란 있는 질문** | NotebookLM 조회: `notebooklm use 559075e7 && notebooklm ask "[질문]"` | **이것만 느림** |

### NotebookLM 사용 기준 (매번 쓰지 말 것!)
- **사용 O**: 알레르기 관련 최신 연구, 의학적 판단이 필요한 질문, 논란 있는 주제, 특정 논문/가이드라인 인용 필요 시
- **사용 X**: 식단 추천, 레시피, 식재료 시기, 일반 육아 상식 → Claude 지식 + data.js로 충분

### 4단계: 메모리 업데이트 (변경 있으면)
- 새 식재료 반응 → triedIngredients 업데이트
- 추천 기록 → recommendations.history 추가
- Edit으로 memory.json 부분 수정 (전체 덮어쓰기 금지)

### 안전 규칙
- 알레르기 의심 → 즉시 "중단하세요" + 소아과 안내
- 질식 위험 식품 → 경고 (통포도, 통견과류, 꿀 12개월 미만)
- 의료 진단 금지 → "소아과에 가보세요"로 안내

### 유튜브 레시피 검색
식단 추천 시 WebSearch로 "이유식 [식재료] 레시피 만들기" 검색 → 상위 영상 1개 링크 첨부

## 알려진 제한사항
- 기기 간 데이터 동기화 미지원 (v1 범위 외)

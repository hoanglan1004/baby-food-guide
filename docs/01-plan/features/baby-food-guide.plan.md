# baby-food-guide Planning Document

> **Summary**: 초보 엄마도 쉽게 따라할 수 있는 시각 중심 이유식 가이드 PWA
>
> **Project**: 하윤이 이유식 가이드
> **Version**: 0.1.0
> **Author**: 윤민호
> **Date**: 2026-03-29
> **Status**: Draft

---

## Executive Summary

| Perspective | Content |
|-------------|---------|
| **Problem** | "오늘 뭘 먹이지?" — 초보 엄마의 매일 반복되는 고민. 책은 두껍고, 영양학 지식도 없고, 매번 검색하기 지침 |
| **Solution** | 과학적 근거 기반 주간 식단 자동 추천 PWA. 고민 없이 따라만 하면 체계적 영양 섭취 완성. 시각 중심 + 오프라인 지원 |
| **Function/UX Effect** | 앱 열면 "오늘의 이유식"이 바로 표시. 주간 식단표로 장보기도 편리. 반응 기록은 터치 한 번 |
| **Core Value** | 홍란님이 영양학/의학 고민 없이, "앱이 알려주는 대로" 따라만 하면 하윤이에게 최적의 이유식 제공 |

---

## 1. Overview

### 1.1 Purpose

생후 6개월부터 시작하는 이유식을 초보 엄마(홍란님)가 **책 없이도** 쉽게 따라할 수 있는 시각 중심 가이드 앱을 만든다.

핵심 문제:
- 이유식 책은 200~300페이지 → 필요한 정보를 찾는 데 시간 소요
- 텍스트 중심 → 농도, 크기, 양을 직관적으로 이해하기 어려움
- 오프라인(마트, 외출 중) 접근 불가
- 먹인 기록을 별도 앱/노트로 관리해야 하는 불편

### 1.2 Background

- 하윤이: 2025년생, 현재 약 5개월 → 6개월(2026년 4월~5월경) 이유식 시작 예정
- 주 사용자: 홍란님 (초보 엄마, 기술에 익숙하지 않을 수 있음)
- 부 사용자: 민호님 (집에서 홍란님 폰으로 확인)
- 기존에 용접 지식 백과(정적 웹사이트) 경험 → 같은 기술 스택 활용 가능

### 1.3 Related Documents

- 정보 소스:
  - WHO Complementary Feeding Guidelines
  - AAP (American Academy of Pediatrics) Recommendations
  - 대한소아청소년과학회 이유식 가이드라인
  - 소아과 의사 가이드 (정선모, 하정훈 등)
  - 이유식 베스트셀러 참고

---

## 2. Scope

### 2.1 In Scope

- [ ] 월령별 이유식 단계 가이드 (초기/중기/후기/완료기) — 시각 중심
- [ ] 식재료 사전 (월령별 허용 목록, 알레르기 표시, 영양 정보)
- [ ] 이유식 일지 (식재료 반응 기록, 달력 히스토리)
- [ ] 단계별 레시피 (시각적 단계 가이드)
- [ ] 농도/크기 시각 가이드 (단계별 비교)
- [ ] PWA 설정 (오프라인 지원, 홈화면 추가)
- [ ] 모바일 최적화 UI (홍란님 폰이 주 사용 환경)
- [ ] GitHub Pages 무료 호스팅

### 2.2 Out of Scope

- 서버/백엔드 (localStorage만 사용, 서버리스)
- 기기 간 데이터 동기화 (v1에서는 단일 기기)
- 사용자 인증/로그인
- 푸시 알림 (v2 고려)
- 이유식 배송/구매 연동

---

## 3. Requirements

### 3.1 Functional Requirements

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-01 | 월령별 단계 가이드: 초기(6m)/중기(7-8m)/후기(9-11m)/완료기(12m+) 시각 표시 | High | Pending |
| FR-02 | 식재료 사전: 월령별 허용 식재료 목록 + 검색 | High | Pending |
| FR-03 | 알레르기 주의 식재료 시각적 경고 표시 (빨강/노랑/초록 코딩) | High | Pending |
| FR-04 | 이유식 일지: 날짜별 먹인 식재료 + 반응 기록 | High | Pending |
| FR-05 | 반응 기록: 잘 먹음(초록) / 거부(노랑) / 알레르기 의심(빨강) 원터치 입력 | High | Pending |
| FR-06 | 달력 뷰: 이유식 기록 히스토리 시각화 | Medium | Pending |
| FR-07 | 단계별 레시피: 재료 + 조리 단계 시각 가이드 | Medium | Pending |
| FR-08 | 농도/크기 시각 가이드: 단계별 비교 이미지 | High | Pending |
| FR-09 | 식재료 검색: 이름으로 빠른 검색 | Medium | Pending |
| FR-10 | 하윤이 생일 기반 자동 월령 계산 | Medium | Pending |
| **FR-11** | **주간 식단표 자동 추천: 매일 뭘 먹일지 고민 없이 따라만 하면 되는 식단** | **High** | **Pending** |
| **FR-12** | **오늘의 이유식: 앱 열면 바로 "오늘 먹일 것" 표시** | **High** | **Pending** |
| FR-13 | 주간 장보기 목록: 이번 주 식단에 필요한 재료 자동 생성 | Medium | Pending |
| FR-14 | 새 식재료 도입 스케줄: 3일 규칙(같은 재료 3일 관찰) 자동 관리 | High | Pending |

### 3.2 Non-Functional Requirements

| Category | Criteria | Measurement Method |
|----------|----------|-------------------|
| Performance | 첫 로딩 3초 이내, 이후 즉시 로딩 | Lighthouse |
| 오프라인 | Service Worker 캐싱으로 100% 오프라인 동작 | 비행기 모드 테스트 |
| 모바일 UX | 엄지 한 손 조작 가능, 터치 타겟 48px 이상 | 실기기 테스트 |
| 시각 접근성 | 충분한 색상 대비, 아이콘+색상 이중 코딩 | 색약 시뮬레이션 |
| 데이터 안전 | localStorage 데이터 내보내기/가져오기 지원 | 수동 테스트 |

---

## 4. Success Criteria

### 4.1 Definition of Done

- [ ] 모든 FR(기능 요구사항) 구현 완료
- [ ] 홍란님 폰에서 PWA 설치 및 오프라인 동작 확인
- [ ] 홍란님이 설명 없이 혼자서 사용 가능 (직관성 테스트)
- [ ] GitHub Pages 배포 완료
- [ ] 이유식 정보 과학적 소스 검증 완료

### 4.2 Quality Criteria

- [ ] Lighthouse PWA 점수 90+
- [ ] 모바일 Performance 점수 80+
- [ ] 주요 브라우저 호환 (Safari iOS, Chrome Android)
- [ ] 오프라인 모드 정상 동작

---

## 5. Risks and Mitigation

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| 이유식 정보 정확성 | High | Medium | WHO/AAP/소아과학회 공식 가이드라인만 1차 소스로 사용. 출처 명시 |
| localStorage 데이터 손실 (폰 초기화 등) | Medium | Low | 데이터 내보내기(JSON) 기능 제공 |
| 홍란님 사용성 부족 | High | Medium | 프로토타입 단계에서 홍란님 직접 테스트 → 피드백 반영 |
| 정보 과부하 (책처럼 복잡해짐) | Medium | Medium | "지금 필요한 것만" 원칙. 월령 자동 감지로 해당 단계만 우선 표시 |
| iOS Safari PWA 제한사항 | Low | Medium | 필수 기능만 PWA로, 나머지는 웹 기능으로 대체 |

---

## 6. Architecture Considerations

### 6.1 Project Level Selection

| Level | Characteristics | Recommended For | Selected |
|-------|-----------------|-----------------|:--------:|
| **Starter** | Simple structure (`components/`, `lib/`, `types/`) | 정적 사이트, 포트폴리오 | **O** |
| Dynamic | Feature-based modules, BaaS integration | 로그인 있는 웹앱 | |
| Enterprise | Strict layer separation, microservices | 대규모 시스템 | |

**Starter 선택 이유**: 서버 불필요, 순수 HTML/CSS/JS + PWA. 용접 지식 백과와 동일한 기술 수준으로 민호님이 유지보수 가능.

### 6.2 Key Architectural Decisions

| Decision | Options | Selected | Rationale |
|----------|---------|----------|-----------|
| Framework | Next.js / React / 순수 HTML/CSS/JS | **순수 HTML/CSS/JS** | 빌드 도구 불필요, 용접 백과와 동일 스택, 유지보수 용이 |
| 스타일링 | Tailwind / CSS 프레임워크 / 순수 CSS | **순수 CSS** | 의존성 최소화, CSS 변수로 테마 관리 |
| 데이터 저장 | 서버 DB / IndexedDB / localStorage | **localStorage** | 가장 간단, 이유식 기록 데이터 소량 |
| 호스팅 | Vercel / Netlify / GitHub Pages | **GitHub Pages** | 무료, 민호님 익숙, 자동 배포 |
| 시각화 | Chart.js / CSS only / SVG | **CSS + SVG + Emoji** | 외부 라이브러리 의존 최소화, 가벼움 |
| PWA | Workbox / 직접 구현 | **직접 구현** | Service Worker 직접 작성 (간단한 캐싱만) |

### 6.3 프로젝트 구조

```
baby-food-guide/
├── index.html              ← 메인 페이지 (월령별 대시보드)
├── stages.html             ← 단계별 상세 가이드
├── ingredients.html        ← 식재료 사전
├── recipes.html            ← 레시피 모음
├── journal.html            ← 이유식 일지 (기록)
├── css/
│   └── style.css           ← 전체 스타일 (CSS 변수 테마)
├── js/
│   ├── app.js              ← 앱 초기화, 라우팅
│   ├── data.js             ← 이유식 데이터 (식재료, 레시피)
│   ├── journal.js          ← 일지 CRUD (localStorage)
│   └── sw-register.js      ← Service Worker 등록
├── sw.js                   ← Service Worker (오프라인 캐싱)
├── manifest.json           ← PWA 매니페스트
├── icons/                  ← PWA 아이콘
├── images/                 ← 시각 가이드 이미지 (SVG)
├── data/
│   └── ingredients.json    ← 식재료 데이터베이스
├── docs/                   ← PDCA 문서
└── CLAUDE.md               ← 프로젝트 가이드
```

---

## 7. UI/UX 설계 원칙

### 7.1 시각화 전략 (핵심)

| 요소 | 시각화 방식 | 예시 |
|------|-----------|------|
| **이유식 단계** | 컬러 타임라인 + 프로그레스 바 | 초기(연두) → 중기(주황) → 후기(코랄) → 완료(보라) |
| **식재료 허용 여부** | 트래픽 라이트 색상 | 🟢 OK / 🟡 주의 / 🔴 금지 |
| **알레르기 위험** | 아이콘 + 빨간 테두리 | ⚠️ 알레르기 주의 배지 |
| **농도 단계** | 그라데이션 바 + 텍스처 일러스트 | 물 같은 미음 → 되직한 죽 → 진밥 (시각 비교) |
| **크기 단계** | 실물 크기 비교 SVG | 으깬 것 → 5mm → 1cm (손가락 비교) |
| **반응 기록** | 이모지 버튼 + 색상 | 😋 잘먹음 / 😐 거부 / 🚨 알레르기 |
| **달력** | 색상 도트 달력 | 초록 점(기록 있음), 빨간 점(알레르기 반응) |
| **영양소** | 아이콘 뱃지 | 🥩 철분 / 🥛 칼슘 / 🍊 비타민C |

### 7.2 모바일 UX 원칙

- **원핸드 조작**: 하단 네비게이션, 엄지로 닿는 영역에 주요 버튼
- **큰 터치 타겟**: 최소 48px, 식재료 카드는 가로 전체 활용
- **최소 텍스트**: 아이콘 + 짧은 레이블, 상세 설명은 펼침(accordion)
- **빠른 접근**: 오늘 날짜 기준 하윤이 월령 자동 계산 → 해당 단계 바로 표시
- **부드러운 전환**: CSS 트랜지션으로 페이지/탭 전환

### 7.3 컬러 팔레트

```
주 색상:  #FF9A76 (따뜻한 살구)  ← 이유식 느낌, 따뜻함
보조:     #FFDCB8 (연한 피치)
배경:     #FFF8F0 (크림 화이트)
텍스트:   #5D4E37 (따뜻한 브라운)
성공:     #7BC67E (부드러운 초록)
경고:     #FFD93D (따뜻한 노랑)
위험:     #FF6B6B (부드러운 빨강)
```

---

## 8. 정보 소스 전략

### 8.1 1차 소스 (과학적 근거, 필수)

| 소스 | 활용 범위 |
|------|----------|
| WHO Complementary Feeding Guidelines | 이유식 시작 시기, 기본 원칙 |
| AAP (미국소아과학회) | 알레르기 식품 도입 시기, 영양 권장량 |
| 대한소아청소년과학회 | 한국 실정에 맞는 이유식 가이드, 식재료 권장 |
| ESPGHAN (유럽소아소화기영양학회) | 보완식 관련 최신 논문/메타분석 |

### 8.2 2차 소스 (실용 보완)

| 소스 | 활용 범위 |
|------|----------|
| 소아과 의사 가이드 (하정훈 등) | 한국 이유식 현실 가이드 |
| 이유식 베스트셀러 | 레시피, 실전 팁 |
| 검증된 육아 커뮤니티 | 실사용자 피드백 반영 |

### 8.3 정보 표시 원칙

- 모든 핵심 정보에 **출처 표시** (예: "WHO 권장", "소아과학회 가이드")
- 1차 소스와 2차 소스가 충돌 시 → **1차 소스 우선**
- "~설이 있다" 같은 불확실한 정보 → 포함하지 않음
- 최신 연구 반영 (예: 알레르기 식품 조기 도입 등 최근 변경된 가이드라인)

---

## 9. Next Steps

1. [ ] Design 문서 작성 (`baby-food-guide.design.md`) — 상세 UI 설계
2. [ ] 이유식 데이터 수집 (WHO/AAP/소아과학회 가이드라인 기반)
3. [ ] 프로토타입 구현 (index.html 메인 페이지)
4. [ ] 홍란님 사용성 테스트 → 피드백 반영
5. [ ] GitHub Pages 배포

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 0.1 | 2026-03-29 | 초기 기획안 — 민호님과 논의 기반 | 윤민호 |

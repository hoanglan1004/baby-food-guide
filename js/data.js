/**
 * 하윤이 이유식 가이드 — 식재료 & 식단 데이터
 *
 * 정보 소스:
 * - WHO Complementary Feeding Guidelines (2023)
 * - AAP (American Academy of Pediatrics) 2024
 * - 대한소아청소년과학회 이유식 가이드라인
 * - ESPGHAN Position Paper on Complementary Feeding
 *
 * 영양 균형 설계 원칙:
 * 1. 5대 식품군 골고루 (곡류, 채소, 과일, 단백질, 유제품)
 * 2. 5색 식재료 순환 (빨강, 초록, 노랑, 흰색, 보라)
 * 3. 새 식재료 3일 규칙 (관찰 기간)
 * 4. 철분 공급 우선 (생후 6개월 이후 철분 요구량 급증)
 */

// ─── 이유식 단계 정의 ──────────────────────────────
const STAGES = {
  initial: {
    name: '초기',
    label: '초기 이유식',
    monthStart: 6,
    monthEnd: 6,
    color: '#A8E6CF',
    mealsPerDay: 1,
    texture: '묽은 미음 (10배죽)',
    amount: '1~2숟가락 → 30~50ml',
    tip: '모유/분유는 평소대로 유지. 이유식은 수유 전에 먹이기',
    source: '대한소아청소년과학회'
  },
  middle: {
    name: '중기',
    label: '중기 이유식',
    monthStart: 7,
    monthEnd: 8,
    color: '#FFD3A5',
    mealsPerDay: 2,
    texture: '걸쭉한 죽 (7배죽), 2~3mm 입자',
    amount: '50~80ml × 2회',
    tip: '혀로 으깰 수 있는 부드러운 덩어리 시작',
    source: 'WHO 보완식 가이드라인'
  },
  late: {
    name: '후기',
    label: '후기 이유식',
    monthStart: 9,
    monthEnd: 11,
    color: '#FF8B94',
    mealsPerDay: 3,
    texture: '진밥 (5배죽), 5~7mm 덩어리',
    amount: '100~120ml × 3회',
    tip: '잇몸으로 씹는 연습. 손으로 잡아먹기(핑거푸드) 시작',
    source: 'AAP Recommendations'
  },
  complete: {
    name: '완료기',
    label: '완료기 이유식',
    monthStart: 12,
    monthEnd: 18,
    color: '#C3AED6',
    mealsPerDay: 3,
    texture: '진밥~일반밥, 1cm 덩어리',
    amount: '유아식으로 전환',
    tip: '가족 식사와 함께. 간은 최소한으로',
    source: 'ESPGHAN'
  }
};

// ─── 영양소 정의 ──────────────────────────────────
const NUTRIENTS = {
  iron: { name: '철분', icon: '🥩', color: '#D32F2F' },
  protein: { name: '단백질', icon: '💪', color: '#7B1FA2' },
  calcium: { name: '칼슘', icon: '🦴', color: '#F5F5F5' },
  vitaminA: { name: '비타민A', icon: '👁️', color: '#FF8F00' },
  vitaminC: { name: '비타민C', icon: '🍊', color: '#F57F17' },
  vitaminD: { name: '비타민D', icon: '☀️', color: '#FDD835' },
  fiber: { name: '식이섬유', icon: '🌿', color: '#388E3C' },
  carbs: { name: '탄수화물', icon: '⚡', color: '#FF6F00' },
  fat: { name: '지방', icon: '🫒', color: '#FBC02D' },
  zinc: { name: '아연', icon: '🛡️', color: '#455A64' }
};

// ─── 식재료 데이터베이스 ──────────────────────────────
// colorGroup: 5색 분류 (red/green/yellow/white/purple)
// allergyRisk: none / low / medium / high
const INGREDIENTS = [
  // ── 곡류 ──
  {
    id: 'rice', name: '쌀', emoji: '🍚',
    category: 'grain', colorGroup: 'white',
    startMonth: 6, allergyRisk: 'none',
    nutrients: ['carbs', 'iron'],
    stages: {
      initial: { form: '10배죽 (미음)', amount: '1~3숟가락' },
      middle:  { form: '7배죽', amount: '50~80g' },
      late:    { form: '5배죽 (진밥)', amount: '90~120g' },
      complete: { form: '진밥', amount: '적정량' }
    },
    tip: '이유식의 기본. 쌀미음부터 시작',
    source: '대한소아청소년과학회'
  },
  {
    id: 'oatmeal', name: '오트밀', emoji: '🥣',
    category: 'grain', colorGroup: 'yellow',
    startMonth: 6, allergyRisk: 'low',
    nutrients: ['carbs', 'iron', 'fiber'],
    stages: {
      initial: { form: '곱게 간 오트밀죽', amount: '1~2숟가락' },
      middle:  { form: '오트밀죽', amount: '50~80g' }
    },
    tip: '철분 함량이 높아 AAP에서도 초기 이유식으로 권장',
    source: 'AAP 2024'
  },

  // ── 채소 (5색 균형) ──
  {
    id: 'sweet_potato', name: '고구마', emoji: '🍠',
    category: 'vegetable', colorGroup: 'yellow',
    startMonth: 6, allergyRisk: 'none',
    nutrients: ['carbs', 'vitaminA', 'fiber'],
    stages: {
      initial: { form: '으깬 퓨레', amount: '1숟가락' },
      middle:  { form: '작은 덩어리', amount: '20~30g' }
    },
    tip: '달콤해서 아기가 잘 먹음. 비타민A 풍부',
    source: 'WHO'
  },
  {
    id: 'zucchini', name: '애호박', emoji: '🥬',
    category: 'vegetable', colorGroup: 'green',
    startMonth: 6, allergyRisk: 'none',
    nutrients: ['vitaminC', 'fiber'],
    stages: {
      initial: { form: '으깬 퓨레', amount: '1숟가락' },
      middle:  { form: '잘게 다진 것', amount: '20~30g' }
    },
    tip: '부드럽고 소화가 잘 됨. 초기 이유식 대표 채소',
    source: '대한소아청소년과학회'
  },
  {
    id: 'carrot', name: '당근', emoji: '🥕',
    category: 'vegetable', colorGroup: 'red',
    startMonth: 6, allergyRisk: 'none',
    nutrients: ['vitaminA', 'fiber'],
    stages: {
      initial: { form: '으깬 퓨레', amount: '1숟가락' },
      middle:  { form: '잘게 다진 것', amount: '20~30g' }
    },
    tip: '베타카로틴(비타민A) 풍부. 푹 익혀서 으깨기',
    source: 'WHO'
  },
  {
    id: 'broccoli', name: '브로콜리', emoji: '🥦',
    category: 'vegetable', colorGroup: 'green',
    startMonth: 6, allergyRisk: 'none',
    nutrients: ['vitaminC', 'iron', 'calcium'],
    stages: {
      initial: { form: '꽃 부분만 곱게 간 것', amount: '1숟가락' },
      middle:  { form: '잘게 다진 것', amount: '20~30g' }
    },
    tip: '철분+비타민C 조합으로 철분 흡수율 UP',
    source: 'AAP'
  },
  {
    id: 'potato', name: '감자', emoji: '🥔',
    category: 'vegetable', colorGroup: 'white',
    startMonth: 6, allergyRisk: 'none',
    nutrients: ['carbs', 'vitaminC'],
    stages: {
      initial: { form: '으깬 퓨레', amount: '1숟가락' },
      middle:  { form: '작은 덩어리', amount: '20~30g' }
    },
    tip: '포만감이 좋고 다른 재료와 섞기 좋음',
    source: 'WHO'
  },
  {
    id: 'spinach', name: '시금치', emoji: '🥬',
    category: 'vegetable', colorGroup: 'green',
    startMonth: 7, allergyRisk: 'none',
    nutrients: ['iron', 'vitaminA', 'calcium'],
    stages: {
      middle:  { form: '데쳐서 곱게 다진 것', amount: '15~20g' },
      late:    { form: '잘게 다진 것', amount: '20~30g' }
    },
    tip: '철분과 칼슘이 풍부. 데쳐서 옥살산 제거 후 사용',
    source: '대한소아청소년과학회'
  },
  {
    id: 'cabbage', name: '양배추', emoji: '🥬',
    category: 'vegetable', colorGroup: 'green',
    startMonth: 7, allergyRisk: 'none',
    nutrients: ['vitaminC', 'fiber'],
    stages: {
      middle:  { form: '푹 익혀 곱게 다진 것', amount: '15~20g' },
      late:    { form: '잘게 다진 것', amount: '20~30g' }
    },
    tip: '소화에 좋고 비타민C 풍부',
    source: 'WHO'
  },
  {
    id: 'beet', name: '비트', emoji: '🟣',
    category: 'vegetable', colorGroup: 'purple',
    startMonth: 7, allergyRisk: 'none',
    nutrients: ['iron', 'fiber'],
    stages: {
      middle:  { form: '으깬 퓨레', amount: '10~15g' },
      late:    { form: '작은 덩어리', amount: '15~20g' }
    },
    tip: '보라색 영양소(안토시아닌) 풍부. 소량부터',
    source: 'WHO'
  },
  {
    id: 'pumpkin', name: '단호박', emoji: '🎃',
    category: 'vegetable', colorGroup: 'yellow',
    startMonth: 6, allergyRisk: 'none',
    nutrients: ['vitaminA', 'carbs', 'fiber'],
    stages: {
      initial: { form: '으깬 퓨레', amount: '1숟가락' },
      middle:  { form: '작은 덩어리', amount: '20~30g' }
    },
    tip: '달콤하고 부드러워 아기가 좋아함. 비타민A 풍부',
    source: '대한소아청소년과학회'
  },

  // ── 과일 ──
  {
    id: 'apple', name: '사과', emoji: '🍎',
    category: 'fruit', colorGroup: 'red',
    startMonth: 6, allergyRisk: 'none',
    nutrients: ['vitaminC', 'fiber'],
    stages: {
      initial: { form: '갈아서 즙/퓨레', amount: '1숟가락' },
      middle:  { form: '으깬 것', amount: '20~30g' }
    },
    tip: '익혀서 주면 더 소화가 잘 됨',
    source: 'WHO'
  },
  {
    id: 'banana', name: '바나나', emoji: '🍌',
    category: 'fruit', colorGroup: 'yellow',
    startMonth: 6, allergyRisk: 'none',
    nutrients: ['carbs', 'vitaminC'],
    stages: {
      initial: { form: '으깬 퓨레', amount: '1숟가락' },
      middle:  { form: '잘게 자른 것', amount: '20~30g' }
    },
    tip: '조리 없이 바로 으깨서 줄 수 있어 편리',
    source: 'AAP'
  },
  {
    id: 'pear', name: '배', emoji: '🍐',
    category: 'fruit', colorGroup: 'white',
    startMonth: 6, allergyRisk: 'none',
    nutrients: ['vitaminC', 'fiber'],
    stages: {
      initial: { form: '갈아서 즙/퓨레', amount: '1숟가락' },
      middle:  { form: '으깬 것', amount: '20~30g' }
    },
    tip: '수분이 많고 순해서 소화가 잘 됨',
    source: '대한소아청소년과학회'
  },
  {
    id: 'avocado', name: '아보카도', emoji: '🥑',
    category: 'fruit', colorGroup: 'green',
    startMonth: 6, allergyRisk: 'none',
    nutrients: ['fat', 'vitaminC'],
    stages: {
      initial: { form: '으깬 퓨레', amount: '1숟가락' },
      middle:  { form: '잘게 자른 것', amount: '20~30g' }
    },
    tip: '건강한 지방 풍부. 두뇌 발달에 좋음',
    source: 'AAP'
  },
  {
    id: 'plum', name: '자두', emoji: '🟣',
    category: 'fruit', colorGroup: 'purple',
    startMonth: 7, allergyRisk: 'none',
    nutrients: ['vitaminC', 'fiber'],
    stages: {
      middle:  { form: '익혀서 으깬 것', amount: '15~20g' }
    },
    tip: '변비 예방에 효과적',
    source: 'WHO'
  },

  // ── 단백질 ──
  {
    id: 'beef', name: '소고기', emoji: '🥩',
    category: 'protein', colorGroup: 'red',
    startMonth: 6, allergyRisk: 'none',
    nutrients: ['iron', 'protein', 'zinc'],
    stages: {
      initial: { form: '곱게 간 퓨레', amount: '1숟가락(10g)' },
      middle:  { form: '잘게 다진 것', amount: '15~20g' },
      late:    { form: '작은 덩어리', amount: '20~30g' }
    },
    tip: '헴철(흡수율 높은 철분) 공급원. 6개월부터 적극 권장',
    source: 'AAP 2024 — 생후 6개월 이후 철분 보충 필수'
  },
  {
    id: 'chicken', name: '닭가슴살', emoji: '🍗',
    category: 'protein', colorGroup: 'white',
    startMonth: 7, allergyRisk: 'none',
    nutrients: ['protein', 'zinc'],
    stages: {
      middle:  { form: '곱게 간 것', amount: '15~20g' },
      late:    { form: '잘게 다진 것', amount: '20~30g' }
    },
    tip: '지방이 적고 담백. 육수로 죽 끓여도 좋음',
    source: '대한소아청소년과학회'
  },
  {
    id: 'egg_yolk', name: '달걀노른자', emoji: '🥚',
    category: 'protein', colorGroup: 'yellow',
    startMonth: 6, allergyRisk: 'medium',
    allergyNote: '완숙으로 익혀서. 흰자보다 노른자 먼저. 최근 AAP는 조기 도입 권장',
    nutrients: ['iron', 'protein', 'vitaminD', 'fat'],
    stages: {
      initial: { form: '완숙 노른자 으깬 것', amount: '1/4개' },
      middle:  { form: '완숙 노른자', amount: '1/2개' }
    },
    tip: '철분+비타민D+단백질 한 번에. 알레르기 조기 도입이 예방에 도움',
    source: 'AAP 2024 — 알레르기 식품 조기 도입 권장'
  },
  {
    id: 'tofu', name: '두부', emoji: '🧈',
    category: 'protein', colorGroup: 'white',
    startMonth: 7, allergyRisk: 'low',
    allergyNote: '대두 알레르기 가능성. 소량부터 시작',
    nutrients: ['protein', 'calcium', 'iron'],
    stages: {
      middle:  { form: '으깬 것', amount: '20~30g' },
      late:    { form: '작은 큐브', amount: '30~40g' }
    },
    tip: '부드럽고 단백질+칼슘 풍부. 식물성 단백질 대표',
    source: '대한소아청소년과학회'
  },
  {
    id: 'white_fish', name: '흰살생선(대구)', emoji: '🐟',
    category: 'protein', colorGroup: 'white',
    startMonth: 7, allergyRisk: 'low',
    nutrients: ['protein', 'vitaminD'],
    stages: {
      middle:  { form: '삶아서 곱게 으깬 것', amount: '10~15g' },
      late:    { form: '잘게 으깬 것', amount: '15~20g' }
    },
    tip: '가시 완벽히 제거 필수. DHA 풍부',
    source: 'WHO'
  },

  // ── 유제품 ──
  {
    id: 'yogurt', name: '플레인 요거트', emoji: '🥛',
    category: 'dairy', colorGroup: 'white',
    startMonth: 7, allergyRisk: 'medium',
    allergyNote: '유제품 알레르기 주의. 무가당 플레인만',
    nutrients: ['calcium', 'protein', 'fat'],
    stages: {
      middle:  { form: '플레인 요거트', amount: '1~2숟가락' },
      late:    { form: '플레인 요거트', amount: '50~80g' }
    },
    tip: '칼슘+유산균. 반드시 무가당 플레인으로',
    source: 'AAP'
  },
  {
    id: 'cheese', name: '치즈', emoji: '🧀',
    category: 'dairy', colorGroup: 'yellow',
    startMonth: 9, allergyRisk: 'medium',
    allergyNote: '유제품 알레르기 주의. 저염 치즈 선택',
    nutrients: ['calcium', 'protein', 'fat'],
    stages: {
      late:    { form: '작은 조각', amount: '10~15g' },
      complete: { form: '핑거푸드', amount: '적정량' }
    },
    tip: '나트륨 낮은 모차렐라, 리코타 추천',
    source: '대한소아청소년과학회'
  },

  // ── 중기 추가 식재료 (NotebookLM 소스 검증) ──
  {
    id: 'lentil', name: '렌틸콩', emoji: '🫘',
    category: 'protein', colorGroup: 'red',
    startMonth: 7, allergyRisk: 'none',
    nutrients: ['iron', 'protein', 'fiber'],
    stages: {
      middle:  { form: '푹 삶아 으깬 것', amount: '15~20g' },
      late:    { form: '잘게 으깬 것', amount: '20~30g' }
    },
    tip: '식물성 철분+단백질 동시 보충. 비타민C와 함께 먹으면 흡수율 UP',
    source: 'NotebookLM 소스 — 소아과 전문의 정유미'
  },
  {
    id: 'mushroom', name: '표고버섯', emoji: '🍄',
    category: 'vegetable', colorGroup: 'white',
    startMonth: 7, allergyRisk: 'none',
    nutrients: ['vitaminD', 'fiber'],
    stages: {
      middle:  { form: '곱게 다진 것', amount: '10~15g' },
      late:    { form: '잘게 다진 것', amount: '15~20g' }
    },
    tip: '비타민D 함유. 감칠맛이 있어 아기가 좋아함',
    source: 'NotebookLM 소스 — 대한소아청소년과학회'
  },
  {
    id: 'pea', name: '완두콩', emoji: '🟢',
    category: 'vegetable', colorGroup: 'green',
    startMonth: 7, allergyRisk: 'none',
    nutrients: ['protein', 'fiber', 'iron'],
    stages: {
      middle:  { form: '껍질 벗겨 으깬 것', amount: '15~20g' },
      late:    { form: '으깬 것', amount: '20~30g' }
    },
    tip: '단백질+식이섬유 풍부. 껍질은 벗겨서 주기',
    source: 'NotebookLM 소스 — 소아과 전문의'
  },
  {
    id: 'egg_white', name: '달걀흰자(완전)', emoji: '🥚',
    category: 'protein', colorGroup: 'white',
    startMonth: 8, allergyRisk: 'medium',
    allergyNote: '노른자 안전 확인 후 전란 시도. LEAP 연구 기반 조기 도입 권장',
    nutrients: ['protein'],
    stages: {
      middle:  { form: '완숙 전란 잘게 으깬 것', amount: '1/2개' },
      late:    { form: '완숙 전란', amount: '1개' }
    },
    tip: '노른자를 안전하게 먹은 후 흰자 포함 전란으로 확대',
    source: 'NotebookLM 소스 — AAP & LEAP Study'
  },

  // ── 후기 추가 식재료 (NotebookLM 소스 검증) ──
  {
    id: 'pork', name: '돼지고기', emoji: '🥓',
    category: 'protein', colorGroup: 'red',
    startMonth: 9, allergyRisk: 'none',
    nutrients: ['protein', 'iron', 'zinc'],
    stages: {
      late:    { form: '잘게 다진 것', amount: '20~30g' },
      complete: { form: '작은 덩어리', amount: '적정량' }
    },
    tip: '지방이 적은 안심/등심 부위 사용. 비타민B1 풍부',
    source: 'NotebookLM 소스 — 소아과 전문의'
  },
  {
    id: 'salmon', name: '연어', emoji: '🐟',
    category: 'protein', colorGroup: 'red',
    startMonth: 9, allergyRisk: 'low',
    nutrients: ['protein', 'fat'],
    stages: {
      late:    { form: '삶아서 잘게 으깬 것', amount: '15~20g' },
      complete: { form: '작은 덩어리', amount: '적정량' }
    },
    tip: '오메가-3(DHA) 풍부 → 두뇌 발달에 좋음. 가시 제거 필수',
    source: 'NotebookLM 소스 — 소아과 전문의 정유미'
  },
  {
    id: 'shrimp', name: '새우', emoji: '🦐',
    category: 'protein', colorGroup: 'red',
    startMonth: 9, allergyRisk: 'high',
    allergyNote: '갑각류 알레르기 주의. 반드시 소량부터 3일 관찰',
    nutrients: ['protein', 'zinc'],
    stages: {
      late:    { form: '곱게 다진 것', amount: '10~15g' }
    },
    tip: '갑각류는 알레르기 위험 높음. 소량 시도 후 3~5일 관찰',
    source: 'NotebookLM 소스 — AAP'
  },
  {
    id: 'pasta', name: '파스타면', emoji: '🍝',
    category: 'grain', colorGroup: 'yellow',
    startMonth: 9, allergyRisk: 'low',
    allergyNote: '밀 알레르기 확인 후 시도',
    nutrients: ['carbs', 'protein'],
    stages: {
      late:    { form: '잘게 자른 것 (1cm)', amount: '적정량' },
      complete: { form: '유아용 파스타', amount: '적정량' }
    },
    tip: '밀을 이미 안전하게 먹었다면 시도. 소금 없이 삶기',
    source: 'NotebookLM 소스 — 소아과 전문의'
  },
  {
    id: 'grape', name: '포도', emoji: '🍇',
    category: 'fruit', colorGroup: 'purple',
    startMonth: 9, allergyRisk: 'none',
    nutrients: ['vitaminC', 'fiber'],
    stages: {
      late:    { form: '껍질+씨 제거, 세로 4등분', amount: '적정량' }
    },
    tip: '⚠️ 질식 위험! 반드시 세로로 4등분. 통째 절대 금지',
    source: 'NotebookLM 소스 — 질식 위험 식품 가이드'
  },
  {
    id: 'blueberry', name: '블루베리', emoji: '🫐',
    category: 'fruit', colorGroup: 'purple',
    startMonth: 9, allergyRisk: 'none',
    nutrients: ['vitaminC', 'fiber'],
    stages: {
      late:    { form: '으깨거나 반으로 자른 것', amount: '적정량' }
    },
    tip: '안토시아닌 풍부. 보라색 영양소 대표. 으깨서 주기',
    source: 'WHO'
  }
];

// ─── 카테고리 정의 ──────────────────────────────────
const CATEGORIES = {
  grain:    { name: '곡류', emoji: '🍚', color: '#F5E6CC' },
  vegetable: { name: '채소', emoji: '🥬', color: '#D4EDDA' },
  fruit:    { name: '과일', emoji: '🍎', color: '#FFF3CD' },
  protein:  { name: '단백질', emoji: '🥩', color: '#F8D7DA' },
  dairy:    { name: '유제품', emoji: '🥛', color: '#D6EAF8' }
};

// ─── 5색 식재료 그룹 ──────────────────────────────────
const COLOR_GROUPS = {
  red:    { name: '빨강', hex: '#FF6B6B', benefit: '항산화, 면역력' },
  green:  { name: '초록', hex: '#7BC67E', benefit: '비타민, 미네랄' },
  yellow: { name: '노랑', hex: '#FFD93D', benefit: '에너지, 비타민A' },
  white:  { name: '흰색', hex: '#F5F0E8', benefit: '면역, 소화' },
  purple: { name: '보라', hex: '#C3AED6', benefit: '안토시아닌, 항산화' }
};

// ─── 주간 식단 템플릿 ──────────────────────────────────
// 편식 방지 설계: 매주 5색 + 5대 식품군 + 새 식재료 3일 규칙
const WEEKLY_PLANS = {
  // ── 초기 이유식 (6개월) ──
  initial_w1: {
    stage: 'initial', week: 1,
    title: '🍚 첫걸음 — 쌀 미음으로 시작',
    desc: '처음 1주일은 쌀 미음만 먹입니다. 숟가락에 익숙해지는 연습이에요.',
    source: 'WHO — 단일 곡물로 시작, 3일간 관찰',
    newIngredients: ['rice'],
    days: [
      { meals: [{ base: 'rice', side: null, amount: '1숟가락' }] },
      { meals: [{ base: 'rice', side: null, amount: '1~2숟가락' }] },
      { meals: [{ base: 'rice', side: null, amount: '2숟가락' }] },
      { meals: [{ base: 'rice', side: null, amount: '2~3숟가락' }] },
      { meals: [{ base: 'rice', side: null, amount: '3숟가락' }] },
      { meals: [{ base: 'rice', side: null, amount: '3숟가락' }] },
      { meals: [{ base: 'rice', side: null, amount: '3숟가락' }] }
    ],
    shopping: ['쌀가루 (또는 불린 쌀)'],
    nutritionFocus: '탄수화물 → 에너지 공급 시작'
  },
  initial_w2: {
    stage: 'initial', week: 2,
    title: '🥬 첫 채소 — 애호박',
    desc: '쌀미음에 애호박 퓨레를 추가합니다. 새 식재료는 3일간 같은 것만!',
    source: '대한소아청소년과학회 — 채소부터 도입 (과일 먼저 시 편식 우려)',
    newIngredients: ['zucchini'],
    days: [
      { meals: [{ base: 'rice', side: 'zucchini', amount: '미음3 + 애호박1숟가락', newItem: 'zucchini', newDay: 1 }] },
      { meals: [{ base: 'rice', side: 'zucchini', amount: '미음3 + 애호박1숟가락', newItem: 'zucchini', newDay: 2 }] },
      { meals: [{ base: 'rice', side: 'zucchini', amount: '미음3 + 애호박2숟가락', newItem: 'zucchini', newDay: 3 }] },
      { meals: [{ base: 'rice', side: 'zucchini', amount: '미음4 + 애호박2숟가락' }] },
      { meals: [{ base: 'rice', side: 'zucchini', amount: '미음4 + 애호박2숟가락' }] },
      { meals: [{ base: 'rice', side: 'zucchini', amount: '미음4 + 애호박2숟가락' }] },
      { meals: [{ base: 'rice', side: 'zucchini', amount: '미음4 + 애호박2숟가락' }] }
    ],
    shopping: ['쌀가루', '애호박 1개'],
    nutritionFocus: '탄수화물 + 비타민C, 식이섬유 추가'
  },
  initial_w3: {
    stage: 'initial', week: 3,
    title: '🥕 빨간색 등장 — 당근',
    desc: '이제 당근을 추가해요! 5색 균형의 첫 번째 빨간색이에요.',
    source: 'WHO — 다양한 색상의 채소 도입 권장',
    newIngredients: ['carrot'],
    days: [
      { meals: [{ base: 'rice', side: 'carrot', amount: '미음4 + 당근1숟가락', newItem: 'carrot', newDay: 1 }] },
      { meals: [{ base: 'rice', side: 'carrot', amount: '미음4 + 당근1숟가락', newItem: 'carrot', newDay: 2 }] },
      { meals: [{ base: 'rice', side: 'carrot', amount: '미음4 + 당근2숟가락', newItem: 'carrot', newDay: 3 }] },
      { meals: [{ base: 'rice', side: 'zucchini', amount: '미음4 + 애호박2숟가락' }] },
      { meals: [{ base: 'rice', side: 'carrot', amount: '미음4 + 당근2숟가락' }] },
      { meals: [{ base: 'rice', side: 'zucchini', amount: '미음4 + 애호박2숟가락' }] },
      { meals: [{ base: 'rice', side: 'carrot', amount: '미음5 + 당근2숟가락' }] }
    ],
    shopping: ['쌀가루', '당근 1개', '애호박 1개'],
    nutritionFocus: '+ 비타민A (베타카로틴). 초록+빨강 2색 달성'
  },
  initial_w4: {
    stage: 'initial', week: 4,
    title: '🥩 철분 보충 — 소고기 등장!',
    desc: '6개월 이후 철분 요구량이 급증해요. 소고기로 철분을 보충합니다.',
    source: 'AAP 2024 — 생후 6개월부터 철분 풍부 식품(육류) 적극 도입',
    newIngredients: ['beef'],
    days: [
      { meals: [{ base: 'rice', side: 'beef', amount: '미음4 + 소고기1숟가락', newItem: 'beef', newDay: 1 }] },
      { meals: [{ base: 'rice', side: 'beef', amount: '미음4 + 소고기1숟가락', newItem: 'beef', newDay: 2 }] },
      { meals: [{ base: 'rice', side: 'beef', amount: '미음4 + 소고기1.5숟가락', newItem: 'beef', newDay: 3 }] },
      { meals: [{ base: 'rice', side: 'carrot', extra: 'beef', amount: '미음4 + 당근2 + 소고기1' }] },
      { meals: [{ base: 'rice', side: 'zucchini', extra: 'beef', amount: '미음4 + 애호박2 + 소고기1' }] },
      { meals: [{ base: 'rice', side: 'carrot', amount: '미음5 + 당근2' }] },
      { meals: [{ base: 'rice', side: 'zucchini', extra: 'beef', amount: '미음5 + 애호박2 + 소고기1.5' }] }
    ],
    shopping: ['쌀가루', '소고기(안심/사태) 100g', '당근 1개', '애호박 1개'],
    nutritionFocus: '🔑 철분! + 단백질, 아연. 곡류+채소+단백질 3군 달성'
  },
  initial_w5: {
    stage: 'initial', week: 5,
    title: '🍠 노란색 추가 — 고구마',
    desc: '달콤한 고구마로 노란색을 채워요. 비타민A가 풍부합니다.',
    source: 'WHO — 비타민A 풍부 식품 권장',
    newIngredients: ['sweet_potato'],
    days: [
      { meals: [{ base: 'rice', side: 'sweet_potato', amount: '죽5 + 고구마1숟가락', newItem: 'sweet_potato', newDay: 1 }] },
      { meals: [{ base: 'rice', side: 'sweet_potato', amount: '죽5 + 고구마1숟가락', newItem: 'sweet_potato', newDay: 2 }] },
      { meals: [{ base: 'rice', side: 'sweet_potato', amount: '죽5 + 고구마2숟가락', newItem: 'sweet_potato', newDay: 3 }] },
      { meals: [{ base: 'rice', side: 'carrot', extra: 'beef', amount: '죽5 + 당근2 + 소고기1.5' }] },
      { meals: [{ base: 'rice', side: 'sweet_potato', extra: 'beef', amount: '죽5 + 고구마2 + 소고기1' }] },
      { meals: [{ base: 'rice', side: 'zucchini', extra: 'beef', amount: '죽5 + 애호박2 + 소고기1.5' }] },
      { meals: [{ base: 'rice', side: 'sweet_potato', amount: '죽5 + 고구마2 + 당근1' }] }
    ],
    shopping: ['쌀가루', '고구마 1개', '소고기 100g', '당근', '애호박'],
    nutritionFocus: '5색 중 4색 달성 (흰+초록+빨강+노랑). 비타민A 강화'
  },
  initial_w6: {
    stage: 'initial', week: 6,
    title: '🥦 영양 챔피언 — 브로콜리',
    desc: '비타민C + 철분 + 칼슘 삼박자! 소고기와 함께 먹으면 철분 흡수율 UP.',
    source: 'AAP — 비타민C가 철분 흡수를 돕는다',
    newIngredients: ['broccoli'],
    days: [
      { meals: [{ base: 'rice', side: 'broccoli', amount: '죽5 + 브로콜리1숟가락', newItem: 'broccoli', newDay: 1 }] },
      { meals: [{ base: 'rice', side: 'broccoli', amount: '죽5 + 브로콜리1숟가락', newItem: 'broccoli', newDay: 2 }] },
      { meals: [{ base: 'rice', side: 'broccoli', extra: 'beef', amount: '죽5 + 브로콜리2 + 소고기1', newItem: 'broccoli', newDay: 3 }] },
      { meals: [{ base: 'rice', side: 'sweet_potato', extra: 'beef', amount: '죽5 + 고구마2 + 소고기1.5' }] },
      { meals: [{ base: 'rice', side: 'broccoli', extra: 'beef', amount: '죽5 + 브로콜리2 + 소고기1.5' }] },
      { meals: [{ base: 'rice', side: 'carrot', extra: 'beef', amount: '죽5 + 당근2 + 소고기1.5' }] },
      { meals: [{ base: 'rice', side: 'zucchini', extra: 'broccoli', amount: '죽5 + 애호박2 + 브로콜리1' }] }
    ],
    shopping: ['쌀가루', '브로콜리 1송이', '소고기 100g', '고구마', '당근', '애호박'],
    nutritionFocus: '비타민C + 철분 시너지. 5가지 채소 완성!'
  },
  initial_w7: {
    stage: 'initial', week: 7,
    title: '🍎 첫 과일 — 사과',
    desc: '드디어 과일! 채소에 충분히 익숙해진 후 과일을 시작합니다.',
    source: '대한소아청소년과학회 — 과일은 채소 후 도입 (편식 방지)',
    newIngredients: ['apple'],
    days: [
      { meals: [{ base: 'rice', side: 'apple', amount: '죽5 + 사과퓨레1숟가락', newItem: 'apple', newDay: 1 }] },
      { meals: [{ base: 'rice', side: 'apple', amount: '죽5 + 사과퓨레1숟가락', newItem: 'apple', newDay: 2 }] },
      { meals: [{ base: 'rice', side: 'apple', amount: '죽5 + 사과퓨레2숟가락', newItem: 'apple', newDay: 3 }] },
      { meals: [{ base: 'rice', side: 'broccoli', extra: 'beef', amount: '죽6 + 브로콜리2 + 소고기1.5' }] },
      { meals: [{ base: 'rice', side: 'carrot', extra: 'beef', amount: '죽6 + 당근2 + 소고기1.5' }] },
      { meals: [{ base: 'rice', side: 'sweet_potato', extra: 'apple', amount: '죽6 + 고구마2 + 사과1' }] },
      { meals: [{ base: 'rice', side: 'zucchini', extra: 'beef', amount: '죽6 + 애호박2 + 소고기1.5' }] }
    ],
    shopping: ['쌀가루', '사과 1개', '소고기 100g', '브로콜리', '당근', '고구마', '애호박'],
    nutritionFocus: '과일 도입! 5대 식품군 중 4군 달성 (곡류+채소+과일+단백질)'
  },
  initial_w8: {
    stage: 'initial', week: 8,
    title: '🥚 달걀노른자 — 알레르기 조기 도입',
    desc: '최신 연구에 따르면 알레르기 식품을 일찍 도입하면 오히려 예방에 도움이 됩니다.',
    source: 'AAP 2024 & LEAP Study — 알레르기 식품 조기 도입이 예방에 효과적',
    newIngredients: ['egg_yolk'],
    days: [
      { meals: [{ base: 'rice', side: 'egg_yolk', amount: '죽6 + 노른자1/4개', newItem: 'egg_yolk', newDay: 1 }] },
      { meals: [{ base: 'rice', side: 'egg_yolk', amount: '죽6 + 노른자1/4개', newItem: 'egg_yolk', newDay: 2 }] },
      { meals: [{ base: 'rice', side: 'egg_yolk', amount: '죽6 + 노른자1/3개', newItem: 'egg_yolk', newDay: 3 }] },
      { meals: [{ base: 'rice', side: 'broccoli', extra: 'beef', amount: '죽6 + 브로콜리2 + 소고기2' }] },
      { meals: [{ base: 'rice', side: 'carrot', extra: 'egg_yolk', amount: '죽6 + 당근2 + 노른자1/3' }] },
      { meals: [{ base: 'rice', side: 'sweet_potato', extra: 'beef', amount: '죽6 + 고구마2 + 소고기2' }] },
      { meals: [{ base: 'rice', side: 'apple', extra: 'zucchini', amount: '죽6 + 애호박2 + 사과1' }] }
    ],
    shopping: ['쌀가루', '달걀 4개', '소고기 100g', '브로콜리', '당근', '고구마', '사과', '애호박'],
    nutritionFocus: '🔑 달걀 = 철분+비타민D+단백질+지방 올인원! 5대 영양소 완성'
  },

  // ── 중기 이유식 (7~8개월) — 하루 2회, 7배죽, 3mm 입자 ──
  middle_w1: {
    stage: 'middle', week: 1,
    title: '🐟 흰살생선 도입 — 두부와 함께',
    desc: '7개월! 하루 2회로 늘어나요. 흰살생선과 두부로 단백질을 강화합니다.',
    source: 'NotebookLM 소스 — 소아과 전문의 정유미',
    newIngredients: ['white_fish', 'tofu'],
    days: [
      { meals: [{ base: 'rice', side: 'white_fish', amount: '죽60g + 생선10g', newItem: 'white_fish', newDay: 1 }, { base: 'rice', side: 'sweet_potato', extra: 'beef', amount: '죽60g + 고구마20g + 소고기15g' }] },
      { meals: [{ base: 'rice', side: 'white_fish', amount: '죽60g + 생선10g', newItem: 'white_fish', newDay: 2 }, { base: 'rice', side: 'broccoli', extra: 'egg_yolk', amount: '죽60g + 브로콜리20g + 노른자1/2' }] },
      { meals: [{ base: 'rice', side: 'white_fish', amount: '죽60g + 생선15g', newItem: 'white_fish', newDay: 3 }, { base: 'rice', side: 'carrot', extra: 'beef', amount: '죽60g + 당근20g + 소고기15g' }] },
      { meals: [{ base: 'rice', side: 'tofu', amount: '죽60g + 두부20g', newItem: 'tofu', newDay: 1 }, { base: 'rice', side: 'zucchini', extra: 'white_fish', amount: '죽60g + 애호박20g + 생선15g' }] },
      { meals: [{ base: 'rice', side: 'tofu', amount: '죽60g + 두부25g', newItem: 'tofu', newDay: 2 }, { base: 'rice', side: 'sweet_potato', extra: 'beef', amount: '죽60g + 고구마20g + 소고기15g' }] },
      { meals: [{ base: 'rice', side: 'tofu', extra: 'carrot', amount: '죽60g + 두부25g + 당근15g', newItem: 'tofu', newDay: 3 }, { base: 'rice', side: 'broccoli', extra: 'egg_yolk', amount: '죽60g + 브로콜리20g + 노른자1/2' }] },
      { meals: [{ base: 'rice', side: 'white_fish', extra: 'zucchini', amount: '죽70g + 생선15g + 애호박15g' }, { base: 'rice', side: 'tofu', extra: 'carrot', amount: '죽70g + 두부20g + 당근15g' }] }
    ],
    shopping: ['쌀', '대구(흰살생선) 150g', '두부 1모', '소고기 100g', '달걀', '브로콜리', '당근', '애호박', '고구마'],
    nutritionFocus: '단백질 3종(소고기+생선+두부) 순환! 5대 식품군 완성'
  },
  middle_w2: {
    stage: 'middle', week: 2,
    title: '🥬 시금치 + 요거트 — 철분과 칼슘',
    desc: '시금치로 식물성 철분, 요거트로 칼슘을 보충합니다.',
    source: '대한소아청소년과학회 — 철분+칼슘 동시 보충',
    newIngredients: ['spinach', 'yogurt'],
    days: [
      { meals: [{ base: 'rice', side: 'spinach', extra: 'beef', amount: '죽70g + 시금치15g + 소고기15g', newItem: 'spinach', newDay: 1 }, { base: 'rice', side: 'tofu', extra: 'carrot', amount: '죽70g + 두부20g + 당근15g' }] },
      { meals: [{ base: 'rice', side: 'spinach', extra: 'egg_yolk', amount: '죽70g + 시금치15g + 노른자1/2', newItem: 'spinach', newDay: 2 }, { base: 'rice', side: 'white_fish', extra: 'zucchini', amount: '죽70g + 생선15g + 애호박20g' }] },
      { meals: [{ base: 'rice', side: 'spinach', extra: 'beef', amount: '죽70g + 시금치20g + 소고기15g', newItem: 'spinach', newDay: 3 }, { base: 'rice', side: 'sweet_potato', extra: 'apple', amount: '죽70g + 고구마20g + 사과15g' }] },
      { meals: [{ base: 'yogurt', side: 'banana', amount: '요거트30g + 바나나20g', newItem: 'yogurt', newDay: 1 }, { base: 'rice', side: 'broccoli', extra: 'beef', amount: '죽70g + 브로콜리20g + 소고기20g' }] },
      { meals: [{ base: 'yogurt', side: 'apple', amount: '요거트30g + 사과퓨레20g', newItem: 'yogurt', newDay: 2 }, { base: 'rice', side: 'spinach', extra: 'white_fish', amount: '죽70g + 시금치15g + 생선15g' }] },
      { meals: [{ base: 'yogurt', side: 'banana', amount: '요거트40g + 바나나20g', newItem: 'yogurt', newDay: 3 }, { base: 'rice', side: 'carrot', extra: 'tofu', amount: '죽70g + 당근20g + 두부20g' }] },
      { meals: [{ base: 'rice', side: 'spinach', extra: 'beef', amount: '죽80g + 시금치20g + 소고기20g' }, { base: 'yogurt', side: 'sweet_potato', amount: '요거트40g + 고구마퓨레20g' }] }
    ],
    shopping: ['쌀', '시금치 1단', '플레인 요거트(무가당)', '소고기 150g', '대구 100g', '두부', '달걀', '바나나', '사과', '브로콜리', '당근', '애호박', '고구마'],
    nutritionFocus: '철분(시금치+소고기) + 칼슘(요거트) 강화. 5색 중 보라만 남음'
  },
  middle_w3: {
    stage: 'middle', week: 3,
    title: '🟣 보라색 완성 — 비트 + 완두콩',
    desc: '비트로 보라색을 채우고, 완두콩으로 식물성 단백질을 추가합니다. 5색 완성!',
    source: 'WHO — 다양한 색상의 식재료 권장',
    newIngredients: ['beet', 'pea'],
    days: [
      { meals: [{ base: 'rice', side: 'beet', extra: 'beef', amount: '죽70g + 비트10g + 소고기15g', newItem: 'beet', newDay: 1 }, { base: 'rice', side: 'spinach', extra: 'tofu', amount: '죽70g + 시금치15g + 두부20g' }] },
      { meals: [{ base: 'rice', side: 'beet', extra: 'egg_yolk', amount: '죽70g + 비트10g + 노른자1/2', newItem: 'beet', newDay: 2 }, { base: 'rice', side: 'carrot', extra: 'white_fish', amount: '죽70g + 당근20g + 생선15g' }] },
      { meals: [{ base: 'rice', side: 'beet', extra: 'beef', amount: '죽70g + 비트15g + 소고기20g', newItem: 'beet', newDay: 3 }, { base: 'yogurt', side: 'banana', amount: '요거트40g + 바나나20g' }] },
      { meals: [{ base: 'rice', side: 'pea', extra: 'beef', amount: '죽70g + 완두콩15g + 소고기15g', newItem: 'pea', newDay: 1 }, { base: 'rice', side: 'broccoli', extra: 'tofu', amount: '죽70g + 브로콜리20g + 두부20g' }] },
      { meals: [{ base: 'rice', side: 'pea', extra: 'carrot', amount: '죽70g + 완두콩15g + 당근15g', newItem: 'pea', newDay: 2 }, { base: 'rice', side: 'sweet_potato', extra: 'white_fish', amount: '죽70g + 고구마20g + 생선15g' }] },
      { meals: [{ base: 'rice', side: 'pea', extra: 'spinach', amount: '죽80g + 완두콩20g + 시금치15g', newItem: 'pea', newDay: 3 }, { base: 'yogurt', side: 'apple', amount: '요거트40g + 사과퓨레20g' }] },
      { meals: [{ base: 'rice', side: 'beet', extra: 'beef', amount: '죽80g + 비트15g + 소고기20g' }, { base: 'rice', side: 'pea', extra: 'tofu', amount: '죽80g + 완두콩15g + 두부20g' }] }
    ],
    shopping: ['쌀', '비트 1개', '완두콩(냉동 OK)', '소고기 150g', '대구 100g', '두부', '달걀', '시금치', '브로콜리', '당근', '고구마', '바나나', '사과', '요거트'],
    nutritionFocus: '🎨 5색 완성! 빨(당근)+초(시금치)+노(고구마)+흰(쌀)+보라(비트)'
  },
  middle_w4: {
    stage: 'middle', week: 4,
    title: '🍄 버섯 + 양배추 — 면역력 강화',
    desc: '표고버섯으로 비타민D, 양배추로 비타민C를 보충합니다.',
    source: '대한소아청소년과학회',
    newIngredients: ['mushroom', 'cabbage'],
    days: [
      { meals: [{ base: 'rice', side: 'mushroom', extra: 'beef', amount: '죽80g + 버섯10g + 소고기20g', newItem: 'mushroom', newDay: 1 }, { base: 'rice', side: 'spinach', extra: 'tofu', amount: '죽80g + 시금치15g + 두부20g' }] },
      { meals: [{ base: 'rice', side: 'mushroom', extra: 'carrot', amount: '죽80g + 버섯10g + 당근15g', newItem: 'mushroom', newDay: 2 }, { base: 'yogurt', side: 'banana', amount: '요거트50g + 바나나20g' }] },
      { meals: [{ base: 'rice', side: 'mushroom', extra: 'white_fish', amount: '죽80g + 버섯15g + 생선15g', newItem: 'mushroom', newDay: 3 }, { base: 'rice', side: 'beet', extra: 'egg_yolk', amount: '죽80g + 비트10g + 노른자1/2' }] },
      { meals: [{ base: 'rice', side: 'cabbage', extra: 'beef', amount: '죽80g + 양배추15g + 소고기20g', newItem: 'cabbage', newDay: 1 }, { base: 'rice', side: 'pea', extra: 'tofu', amount: '죽80g + 완두콩15g + 두부20g' }] },
      { meals: [{ base: 'rice', side: 'cabbage', extra: 'white_fish', amount: '죽80g + 양배추15g + 생선15g', newItem: 'cabbage', newDay: 2 }, { base: 'rice', side: 'sweet_potato', extra: 'apple', amount: '죽80g + 고구마20g + 사과15g' }] },
      { meals: [{ base: 'rice', side: 'cabbage', extra: 'egg_yolk', amount: '죽80g + 양배추20g + 노른자1/2', newItem: 'cabbage', newDay: 3 }, { base: 'rice', side: 'broccoli', extra: 'beef', amount: '죽80g + 브로콜리20g + 소고기20g' }] },
      { meals: [{ base: 'rice', side: 'mushroom', extra: 'beef', amount: '죽80g + 버섯15g + 소고기20g' }, { base: 'rice', side: 'cabbage', extra: 'tofu', amount: '죽80g + 양배추20g + 두부25g' }] }
    ],
    shopping: ['쌀', '표고버섯 4개', '양배추 1/4통', '소고기 200g', '대구 100g', '두부', '달걀', '시금치', '브로콜리', '당근', '고구마', '바나나', '사과', '요거트', '비트', '완두콩'],
    nutritionFocus: '비타민D(버섯) + 비타민C(양배추). 면역력 강화 주간'
  },

  // ── 후기 이유식 (9~11개월) — 하루 3회, 5배죽, 5mm 덩어리 ──
  late_w1: {
    stage: 'late', week: 1,
    title: '🥓 돼지고기 + 연어 — 단백질 다양화',
    desc: '9개월! 하루 3회. 돼지고기와 연어로 단백질 종류를 넓힙니다.',
    source: 'NotebookLM 소스 — 소아과 전문의',
    newIngredients: ['pork', 'salmon'],
    days: [
      { meals: [{ base: 'rice', side: 'pork', extra: 'carrot', amount: '진밥100g + 돼지고기20g + 당근20g', newItem: 'pork', newDay: 1 }, { base: 'rice', side: 'tofu', extra: 'spinach', amount: '진밥100g + 두부25g + 시금치15g' }, { base: 'yogurt', side: 'banana', amount: '요거트50g + 바나나' }] },
      { meals: [{ base: 'rice', side: 'pork', extra: 'broccoli', amount: '진밥100g + 돼지고기20g + 브로콜리20g', newItem: 'pork', newDay: 2 }, { base: 'rice', side: 'white_fish', extra: 'zucchini', amount: '진밥100g + 생선15g + 애호박20g' }, { base: 'rice', side: 'apple', amount: '사과 30g' }] },
      { meals: [{ base: 'rice', side: 'pork', extra: 'cabbage', amount: '진밥100g + 돼지고기25g + 양배추20g', newItem: 'pork', newDay: 3 }, { base: 'rice', side: 'egg_yolk', extra: 'sweet_potato', amount: '진밥100g + 전란1/2 + 고구마20g' }, { base: 'yogurt', side: 'pear', amount: '요거트50g + 배' }] },
      { meals: [{ base: 'rice', side: 'salmon', extra: 'spinach', amount: '진밥100g + 연어15g + 시금치15g', newItem: 'salmon', newDay: 1 }, { base: 'rice', side: 'beef', extra: 'carrot', amount: '진밥100g + 소고기20g + 당근20g' }, { base: 'rice', side: 'banana', amount: '바나나 30g' }] },
      { meals: [{ base: 'rice', side: 'salmon', extra: 'broccoli', amount: '진밥100g + 연어15g + 브로콜리20g', newItem: 'salmon', newDay: 2 }, { base: 'rice', side: 'tofu', extra: 'mushroom', amount: '진밥100g + 두부25g + 버섯15g' }, { base: 'yogurt', side: 'apple', amount: '요거트50g + 사과' }] },
      { meals: [{ base: 'rice', side: 'salmon', extra: 'pea', amount: '진밥100g + 연어20g + 완두콩15g', newItem: 'salmon', newDay: 3 }, { base: 'rice', side: 'pork', extra: 'zucchini', amount: '진밥100g + 돼지고기20g + 애호박20g' }, { base: 'rice', side: 'sweet_potato', amount: '고구마 30g' }] },
      { meals: [{ base: 'rice', side: 'beef', extra: 'beet', amount: '진밥110g + 소고기25g + 비트10g' }, { base: 'rice', side: 'salmon', extra: 'cabbage', amount: '진밥110g + 연어20g + 양배추20g' }, { base: 'yogurt', side: 'banana', amount: '요거트50g + 바나나' }] }
    ],
    shopping: ['쌀', '돼지고기(안심) 200g', '연어 150g', '소고기 150g', '대구 100g', '두부', '달걀', '시금치', '브로콜리', '당근', '양배추', '애호박', '고구마', '버섯', '완두콩', '비트', '바나나', '사과', '배', '요거트'],
    nutritionFocus: '단백질 5종 순환(소·돼지·생선·두부·달걀). 오메가3(연어) 추가'
  },
  late_w2: {
    stage: 'late', week: 2,
    title: '🦐 새우 도입 + 핑거푸드 시작',
    desc: '새우를 소량 시도하고, 핑거푸드(부드러운 스틱)를 시작합니다.',
    source: 'NotebookLM 소스 — AAP + 핑거푸드 가이드',
    newIngredients: ['shrimp'],
    days: [
      { meals: [{ base: 'rice', side: 'shrimp', extra: 'carrot', amount: '진밥100g + 새우10g + 당근20g', newItem: 'shrimp', newDay: 1 }, { base: 'rice', side: 'beef', extra: 'spinach', amount: '진밥100g + 소고기25g + 시금치15g' }, { base: 'yogurt', side: 'banana', amount: '요거트50g + 바나나' }] },
      { meals: [{ base: 'rice', side: 'shrimp', extra: 'broccoli', amount: '진밥100g + 새우10g + 브로콜리20g', newItem: 'shrimp', newDay: 2 }, { base: 'rice', side: 'salmon', extra: 'cabbage', amount: '진밥100g + 연어20g + 양배추20g' }, { base: 'rice', side: 'pear', amount: '배 30g' }] },
      { meals: [{ base: 'rice', side: 'shrimp', extra: 'zucchini', amount: '진밥100g + 새우15g + 애호박20g', newItem: 'shrimp', newDay: 3 }, { base: 'rice', side: 'pork', extra: 'mushroom', amount: '진밥100g + 돼지고기20g + 버섯15g' }, { base: 'yogurt', side: 'apple', amount: '요거트50g + 사과' }] },
      { meals: [{ base: 'rice', side: 'beef', extra: 'pea', amount: '진밥110g + 소고기25g + 완두콩15g' }, { base: 'rice', side: 'tofu', extra: 'carrot', amount: '진밥110g + 두부25g + 당근20g' }, { base: 'rice', side: 'banana', amount: '바나나 핑거푸드' }] },
      { meals: [{ base: 'rice', side: 'salmon', extra: 'spinach', amount: '진밥110g + 연어20g + 시금치15g' }, { base: 'rice', side: 'pork', extra: 'sweet_potato', amount: '진밥110g + 돼지고기25g + 고구마20g' }, { base: 'yogurt', side: 'avocado', amount: '요거트50g + 아보카도' }] },
      { meals: [{ base: 'rice', side: 'white_fish', extra: 'beet', amount: '진밥110g + 생선15g + 비트10g' }, { base: 'rice', side: 'beef', extra: 'broccoli', amount: '진밥110g + 소고기25g + 브로콜리20g' }, { base: 'rice', side: 'apple', amount: '사과 핑거푸드' }] },
      { meals: [{ base: 'rice', side: 'shrimp', extra: 'tofu', amount: '진밥110g + 새우15g + 두부20g' }, { base: 'rice', side: 'pork', extra: 'cabbage', amount: '진밥110g + 돼지고기25g + 양배추20g' }, { base: 'yogurt', side: 'banana', amount: '요거트50g + 바나나' }] }
    ],
    shopping: ['쌀', '새우(껍질 벗긴 것) 100g', '소고기 200g', '돼지고기 150g', '연어 100g', '대구 100g', '두부', '달걀', '시금치', '브로콜리', '당근', '양배추', '애호박', '고구마', '버섯', '완두콩', '비트', '바나나', '사과', '배', '아보카도', '요거트'],
    nutritionFocus: '갑각류(새우) 안전 도입 + 핑거푸드로 자기주도 식사 시작'
  }
};

// ─── 요일 이름 ──────────────────────────────────
const DAY_NAMES = ['월', '화', '수', '목', '금', '토', '일'];

// ─── 알레르기 주의 식품 (별도 관리) ──────────────────
const ALLERGY_FOODS = [
  { name: '달걀', emoji: '🥚', note: '노른자부터, 완숙으로', startMonth: 6 },
  { name: '우유/유제품', emoji: '🥛', note: '요거트/치즈 OK, 생우유는 12개월+', startMonth: 7 },
  { name: '밀', emoji: '🌾', note: '소량부터 천천히', startMonth: 7 },
  { name: '대두(두부)', emoji: '🫘', note: '두부로 소량 시작', startMonth: 7 },
  { name: '땅콩', emoji: '🥜', note: '땅콩버터를 물에 희석. 통땅콩 금지(질식위험)', startMonth: 6 },
  { name: '생선', emoji: '🐟', note: '흰살생선부터. 등푸른생선은 9개월+', startMonth: 7 },
  { name: '갑각류', emoji: '🦐', note: '새우 소량부터', startMonth: 9 },
  { name: '견과류', emoji: '🌰', note: '갈아서 소량만. 통째 금지(질식)', startMonth: 9 }
];

// ─── 절대 금지 식품 ──────────────────────────────────
const FORBIDDEN_FOODS = [
  { name: '꿀', emoji: '🍯', reason: '보툴리눔 독소 — 12개월 미만 절대 금지', untilMonth: 12 },
  { name: '생우유', emoji: '🥛', reason: '소화 부담, 철분 흡수 방해', untilMonth: 12 },
  { name: '소금/설탕', emoji: '🧂', reason: '신장 부담, 단맛 중독 → 편식 유발', untilMonth: 12 },
  { name: '꿀/물엿', emoji: '🍬', reason: '단맛 중독 → 편식 유발', untilMonth: 24 },
  { name: '통 견과류', emoji: '🥜', reason: '질식 위험 — 반드시 갈아서', untilMonth: 36 }
];

// ─── 레시피 데이터 ──────────────────────────────────
const RECIPES = [
  // ── 초기 (6개월) ──
  {
    id: 'rice_porridge', name: '쌀 미음 (10배죽)', emoji: '🍚',
    stage: 'initial', category: 'base',
    ingredients: ['쌀가루 1큰술 (또는 불린 쌀 15g)', '물 150ml'],
    steps: [
      { text: '쌀을 30분 이상 불린다 (쌀가루면 생략)', icon: '💧' },
      { text: '불린 쌀을 믹서에 곱게 간다', icon: '🔄' },
      { text: '냄비에 간 쌀 + 물 넣고 약불에서 저어가며 끓인다', icon: '🔥' },
      { text: '10분 정도 걸쭉해지면 체에 한 번 거른다', icon: '🥣' },
      { text: '미지근하게 식혀서 먹인다', icon: '✅' }
    ],
    tip: '처음엔 묽게, 점점 되직하게 농도 조절',
    source: '대한소아청소년과학회'
  },
  {
    id: 'veggie_puree', name: '채소 퓨레 (애호박/당근/고구마)', emoji: '🥕',
    stage: 'initial', category: 'side',
    ingredients: ['채소 30g (애호박, 당근, 또는 고구마)', '물 적당량'],
    steps: [
      { text: '채소를 깨끗이 씻어 껍질을 벗긴다', icon: '🧹' },
      { text: '작게 잘라 푹 익힌다 (찌거나 삶기)', icon: '🔥' },
      { text: '익은 채소를 믹서나 절구에 곱게 간다', icon: '🔄' },
      { text: '삶은 물을 조금 넣어 농도를 조절한다', icon: '💧' },
      { text: '미음에 1숟가락씩 섞어 먹인다', icon: '🥣' }
    ],
    tip: '채소마다 따로 만들어 냉동 보관하면 편해요 (1주일분)',
    source: 'WHO'
  },
  {
    id: 'beef_puree', name: '소고기 퓨레', emoji: '🥩',
    stage: 'initial', category: 'protein',
    ingredients: ['소고기(안심/사태) 30g', '물 적당량'],
    steps: [
      { text: '소고기 핏물을 빼고 (30분 찬물 담그기)', icon: '💧' },
      { text: '냄비에 물 넣고 푹 삶는다 (20분 이상)', icon: '🔥' },
      { text: '삶은 고기를 믹서에 곱게 간다', icon: '🔄' },
      { text: '육수를 넣어 걸쭉한 퓨레로 만든다', icon: '🥣' },
      { text: '미음에 1숟가락씩 섞어 먹인다', icon: '✅' }
    ],
    tip: '육수는 다른 죽에도 활용 가능. 한번에 여러 끼 만들어 냉동',
    source: 'AAP — 6개월부터 철분 보충 필수'
  },

  // ── 중기 (7-8개월) ──
  {
    id: 'veggie_beef_porridge', name: '소고기 채소 죽', emoji: '🥩',
    stage: 'middle', category: 'main',
    ingredients: ['쌀 30g', '소고기 다진 것 20g', '당근 15g', '애호박 15g', '물 200ml'],
    steps: [
      { text: '쌀을 30분 불린다', icon: '💧' },
      { text: '소고기, 당근, 애호박을 3mm로 잘게 다진다', icon: '🔪' },
      { text: '냄비에 참기름 살짝 두르고 소고기를 볶는다', icon: '🔥' },
      { text: '쌀과 채소, 물을 넣고 약불에서 20분 끓인다', icon: '🫕' },
      { text: '걸쭉해지면 완성! 식혀서 먹인다', icon: '✅' }
    ],
    tip: '참기름을 살짝 넣으면 고소하고 철분 흡수도 도움',
    source: '대한소아청소년과학회'
  },
  {
    id: 'fish_broccoli', name: '흰살생선 브로콜리 죽', emoji: '🐟',
    stage: 'middle', category: 'main',
    ingredients: ['쌀 30g', '대구살 15g', '브로콜리 꽃 부분 15g', '물 200ml'],
    steps: [
      { text: '대구를 삶아 뼈와 가시를 완벽히 제거한다', icon: '🐟' },
      { text: '브로콜리 꽃 부분만 데쳐 잘게 다진다', icon: '🥦' },
      { text: '불린 쌀과 물을 넣고 죽을 끓인다', icon: '🔥' },
      { text: '다진 생선과 브로콜리를 넣고 5분 더 끓인다', icon: '🫕' },
      { text: '잘 저어 완성', icon: '✅' }
    ],
    tip: '비타민C(브로콜리)가 철분 흡수를 도와줘요',
    source: 'NotebookLM 소스'
  },
  {
    id: 'tofu_spinach', name: '두부 시금치 죽', emoji: '🧈',
    stage: 'middle', category: 'main',
    ingredients: ['쌀 30g', '두부 25g', '시금치 15g', '물 200ml'],
    steps: [
      { text: '시금치를 끓는 물에 데쳐 옥살산을 제거한다', icon: '🥬' },
      { text: '데친 시금치를 잘게 다진다', icon: '🔪' },
      { text: '두부를 으깬다', icon: '🧈' },
      { text: '불린 쌀과 물로 죽을 끓인다', icon: '🔥' },
      { text: '두부와 시금치를 넣고 5분 더 끓인다', icon: '✅' }
    ],
    tip: '시금치는 반드시 데쳐서! 옥살산이 칼슘 흡수를 방해해요',
    source: '대한소아청소년과학회'
  },

  // ── 후기 (9-11개월) ──
  {
    id: 'salmon_veggie_rice', name: '연어 채소 진밥', emoji: '🐟',
    stage: 'late', category: 'main',
    ingredients: ['밥 100g', '연어 20g', '브로콜리 15g', '당근 15g'],
    steps: [
      { text: '연어를 삶아 뼈를 제거하고 5mm로 으깬다', icon: '🐟' },
      { text: '브로콜리, 당근을 5mm로 잘게 썬다', icon: '🔪' },
      { text: '채소를 먼저 익힌다 (찌거나 볶기)', icon: '🔥' },
      { text: '진밥에 연어와 채소를 섞는다', icon: '🍚' },
      { text: '잘 섞어 완성', icon: '✅' }
    ],
    tip: '오메가3(DHA)가 두뇌 발달에 좋아요',
    source: 'NotebookLM 소스'
  },
  {
    id: 'pork_mushroom', name: '돼지고기 버섯 진밥', emoji: '🥓',
    stage: 'late', category: 'main',
    ingredients: ['밥 100g', '돼지고기(안심) 25g', '표고버섯 15g', '양배추 15g'],
    steps: [
      { text: '돼지고기를 5mm로 다진다', icon: '🔪' },
      { text: '버섯, 양배추를 5mm로 다진다', icon: '🍄' },
      { text: '팬에 기름 살짝, 고기를 먼저 볶는다', icon: '🔥' },
      { text: '채소를 넣고 함께 볶는다', icon: '🫕' },
      { text: '진밥과 섞어 완성', icon: '✅' }
    ],
    tip: '비타민B1(돼지고기) + 비타민D(버섯) 조합',
    source: '대한소아청소년과학회'
  },
  {
    id: 'finger_food_banana', name: '바나나 핑거푸드', emoji: '🍌',
    stage: 'late', category: 'snack',
    ingredients: ['바나나 1/2개'],
    steps: [
      { text: '바나나를 세로로 길게 자른다 (아기 손에 잡히는 크기)', icon: '🔪' },
      { text: '아기 앞에 놓아 스스로 잡게 한다', icon: '👶' },
      { text: '아기가 스스로 먹는 것을 지켜본다', icon: '👀' }
    ],
    tip: '핑거푸드는 소근육 발달 + 자기주도 식사 연습. 항상 옆에서 지켜보세요!',
    source: 'NotebookLM 소스 — BLW(아기주도이유식) 가이드'
  }
];

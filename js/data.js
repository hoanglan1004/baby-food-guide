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

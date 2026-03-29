/**
 * 하윤이 이유식 가이드 — 핵심 앱 로직
 * 월령 계산, 식단 추천 엔진, localStorage 관리
 */

// ─── 저장소 키 ──────────────────────────────────
const STORAGE_KEY = 'hayun_babyfood';

// ─── 앱 상태 ──────────────────────────────────
const App = {
  /** localStorage에서 설정 로드 */
  getSettings() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  /** 설정 저장 */
  saveSettings(data) {
    const current = this.getSettings() || {};
    const merged = { ...current, ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    return merged;
  },

  /** 초기 설정 완료 여부 */
  isSetupDone() {
    const s = this.getSettings();
    return s && s.babyBirthday;
  },

  /** 생일로부터 월령 계산 (일 단위 정밀) */
  getMonthAge(birthday) {
    const birth = new Date(birthday);
    const today = new Date();
    const months = (today.getFullYear() - birth.getFullYear()) * 12
      + (today.getMonth() - birth.getMonth());
    const dayDiff = today.getDate() - birth.getDate();
    return dayDiff < 0 ? months - 1 : months;
  },

  /** 월령으로 현재 단계 결정 */
  getCurrentStage(monthAge) {
    if (monthAge < 7) return 'initial';
    if (monthAge < 9) return 'middle';
    if (monthAge < 12) return 'late';
    return 'complete';
  },

  /** 이유식 시작일로부터 몇 주차인지 계산 */
  getWeekNumber(birthday) {
    const startDate = new Date(birthday);
    startDate.setMonth(startDate.getMonth() + 6); // 생후 6개월
    const today = new Date();
    const diffMs = today - startDate;
    if (diffMs < 0) return 0; // 아직 시작 전
    return Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000)) + 1;
  },

  /** 이번 주 시작일(월요일) 계산 */
  getWeekStart(date) {
    const d = new Date(date || new Date());
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
  },

  /** 현재 주차에 맞는 식단 템플릿 가져오기 */
  getCurrentPlan(weekNum) {
    // 초기(1~8주) → 중기(9~12주) → 후기(13~14주)
    let planKey;
    if (weekNum <= 8) {
      planKey = `initial_w${weekNum}`;
    } else if (weekNum <= 12) {
      planKey = `middle_w${weekNum - 8}`;
    } else if (weekNum <= 14) {
      planKey = `late_w${weekNum - 12}`;
    }
    return planKey ? (WEEKLY_PLANS[planKey] || null) : null;
  },

  /** 오늘 요일 인덱스 (0=월, 6=일) */
  getTodayIndex() {
    const day = new Date().getDay();
    return day === 0 ? 6 : day - 1;
  },

  /** 식재료 ID로 식재료 정보 가져오기 */
  getIngredient(id) {
    return INGREDIENTS.find(i => i.id === id);
  },

  /** 현재 월령에 먹을 수 있는 식재료 목록 */
  getAvailableIngredients(monthAge) {
    return INGREDIENTS.filter(i => i.startMonth <= monthAge);
  },

  /** 아직 이른 식재료 목록 */
  getLockedIngredients(monthAge) {
    return INGREDIENTS.filter(i => i.startMonth > monthAge);
  }
};

// ─── 일지 관리 ──────────────────────────────────
const Journal = {
  /** 전체 일지 가져오기 */
  getAll() {
    const s = App.getSettings();
    return (s && s.journal) || {};
  },

  /** 특정 날짜 일지 */
  getDay(dateStr) {
    const journal = this.getAll();
    return journal[dateStr] || null;
  },

  /** 오늘 날짜 문자열 */
  todayStr() {
    return new Date().toISOString().split('T')[0];
  },

  /** 반응 기록 저장 */
  saveReaction(dateStr, ingredientId, ingredientName, amount, reaction) {
    const s = App.getSettings() || {};
    if (!s.journal) s.journal = {};
    if (!s.journal[dateStr]) s.journal[dateStr] = { meals: [] };

    // 같은 식재료 기존 기록 업데이트 또는 추가
    const existing = s.journal[dateStr].meals
      .findIndex(m => m.ingredient === ingredientId);
    const entry = { ingredient: ingredientId, name: ingredientName, amount, reaction };

    if (existing >= 0) {
      s.journal[dateStr].meals[existing] = entry;
    } else {
      s.journal[dateStr].meals.push(entry);
    }

    // 시도한 식재료 현황 업데이트
    if (!s.triedIngredients) s.triedIngredients = {};
    if (!s.triedIngredients[ingredientId]) {
      s.triedIngredients[ingredientId] = {
        firstTried: dateStr,
        tryCount: 0,
        lastReaction: reaction
      };
    }
    s.triedIngredients[ingredientId].tryCount++;
    s.triedIngredients[ingredientId].lastReaction = reaction;

    App.saveSettings(s);
  },

  /** 식재료 시도 현황 */
  getTriedStatus(ingredientId) {
    const s = App.getSettings();
    if (!s || !s.triedIngredients) return 'untried';
    const tried = s.triedIngredients[ingredientId];
    if (!tried) return 'untried';
    if (tried.lastReaction === 'allergy') return 'allergy';
    if (tried.tryCount >= 3) return 'safe';
    return 'trying';
  },

  /** 시도한 식재료 전체 목록 */
  getTriedIngredients() {
    const s = App.getSettings();
    return (s && s.triedIngredients) || {};
  }
};

// ─── 5색 균형 체크 ──────────────────────────────
function getColorBalance(plan) {
  const colors = { red: false, green: false, yellow: false, white: false, purple: false };
  if (!plan || !plan.days) return colors;

  plan.days.forEach(day => {
    day.meals.forEach(meal => {
      [meal.base, meal.side, meal.extra].forEach(id => {
        if (!id) return;
        const ing = App.getIngredient(id);
        if (ing) colors[ing.colorGroup] = true;
      });
    });
  });
  return colors;
}

// ─── 영양소 균형 체크 ──────────────────────────────
function getNutritionBalance(plan) {
  const nutrients = {};
  if (!plan || !plan.days) return nutrients;

  plan.days.forEach(day => {
    day.meals.forEach(meal => {
      [meal.base, meal.side, meal.extra].forEach(id => {
        if (!id) return;
        const ing = App.getIngredient(id);
        if (ing) {
          ing.nutrients.forEach(n => {
            nutrients[n] = (nutrients[n] || 0) + 1;
          });
        }
      });
    });
  });
  return nutrients;
}

// ─── 날짜 포맷 ──────────────────────────────────
function formatDate(date) {
  const d = new Date(date);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const weekday = ['일', '월', '화', '수', '목', '금', '토'][d.getDay()];
  return `${month}월 ${day}일 ${weekday}요일`;
}

function formatMonthAge(months) {
  if (months < 1) return '신생아';
  return `생후 ${months}개월`;
}

// ─── 식단에서 오늘 먹을 것 가져오기 ──────────────────
function getTodayMeal(plan) {
  if (!plan || !plan.days) return null;
  const idx = App.getTodayIndex();
  return plan.days[idx] || null;
}

// ─── 식단의 식재료를 읽기 쉬운 문자열로 변환 ──────────
function mealToText(meal) {
  const parts = [];
  if (meal.base) {
    const ing = App.getIngredient(meal.base);
    if (ing) parts.push(`${ing.emoji} ${ing.name}`);
  }
  if (meal.side) {
    const ing = App.getIngredient(meal.side);
    if (ing) parts.push(`${ing.emoji} ${ing.name}`);
  }
  if (meal.extra) {
    const ing = App.getIngredient(meal.extra);
    if (ing) parts.push(`${ing.emoji} ${ing.name}`);
  }
  return parts.join(' + ');
}

// ─── 폰트 크기 조절 ──────────────────────────────
const FontControl = {
  sizes: ['', 'font-large', 'font-xlarge'],
  labels: ['가', '가+', '가++'],

  init() {
    const saved = localStorage.getItem('hayun_fontsize') || 0;
    this.current = parseInt(saved);
    this.apply();
    this.render();
  },

  apply() {
    document.documentElement.classList.remove('font-large', 'font-xlarge');
    if (this.sizes[this.current]) {
      document.documentElement.classList.add(this.sizes[this.current]);
    }
  },

  cycle() {
    this.current = (this.current + 1) % this.sizes.length;
    localStorage.setItem('hayun_fontsize', this.current);
    this.apply();
    this.render();
  },

  render() {
    const btn = document.getElementById('font-toggle');
    if (btn) btn.textContent = this.labels[this.current];
  }
};

// ─── 이미지 라이트박스 ──────────────────────────────
const Lightbox = {
  el: null,
  imgEl: null,
  counterEl: null,
  images: [],
  idx: 0,

  init() {
    this.el = document.getElementById('lightbox');
    if (!this.el) return;
    this.imgEl = this.el.querySelector('img');
    this.counterEl = this.el.querySelector('.lightbox-counter');

    this.el.addEventListener('click', (e) => {
      if (e.target === this.el || e.target.classList.contains('lightbox-close')) {
        this.close();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!this.el.classList.contains('open')) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowRight') this.next();
      if (e.key === 'ArrowLeft') this.prev();
    });
  },

  open(src, group) {
    if (group) {
      this.images = group;
      this.idx = group.indexOf(src);
      if (this.idx < 0) this.idx = 0;
    } else {
      this.images = [src];
      this.idx = 0;
    }
    this.show();
  },

  show() {
    this.imgEl.src = this.images[this.idx];
    this.counterEl.textContent =
      this.images.length > 1 ? `${this.idx + 1} / ${this.images.length}` : '';
    this.el.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  close() {
    this.el.classList.remove('open');
    document.body.style.overflow = '';
  },

  next() {
    if (this.images.length <= 1) return;
    this.idx = (this.idx + 1) % this.images.length;
    this.show();
  },

  prev() {
    if (this.images.length <= 1) return;
    this.idx = (this.idx - 1 + this.images.length) % this.images.length;
    this.show();
  }
};

// ─── 페이지 로드 시 초기화 ──────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  FontControl.init();
  Lightbox.init();
});

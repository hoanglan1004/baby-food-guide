/**
 * Service Worker — 오프라인 캐싱
 * 네트워크 우선, 오프라인 시 캐시 사용
 */

const CACHE_NAME = 'babyfood-v4';
const CACHE_FILES = [
  './',
  './recipes.html',
  './index.html',
  './weekly.html',
  './ingredients.html',
  './journal.html',
  './guide.html',
  './css/style.css',
  './js/data.js',
  './js/app.js',
  './manifest.json',
  './assets/audio-overview.mp3'
];

// 설치: 모든 파일 캐싱
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CACHE_FILES))
      .then(() => self.skipWaiting())
  );
});

// 활성화: 이전 캐시 정리
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// 요청: 네트워크 우선, 실패 시 캐시
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // 네트워크 성공 → 캐시 업데이트
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

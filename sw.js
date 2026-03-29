/**
 * Service Worker — 오프라인 캐싱
 * 모든 페이지와 리소스를 캐싱해서 인터넷 없이도 100% 동작
 */

const CACHE_NAME = 'babyfood-v1';
const CACHE_FILES = [
  './',
  './index.html',
  './weekly.html',
  './ingredients.html',
  './journal.html',
  './guide.html',
  './css/style.css',
  './js/data.js',
  './js/app.js',
  './manifest.json'
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

// 요청: 캐시 우선, 없으면 네트워크
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
      .catch(() => caches.match('./index.html'))
  );
});

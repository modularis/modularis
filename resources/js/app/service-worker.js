const config = {
  version: '0.0.1',
  staticCacheItems: [
    '/css/index.css',
    '/js/index.js'
  ],
  cachePathPattern: /^\/(.*)$/
};

function cacheName(key, opts) {
  return `${opts.version}-${key}`;
}

function addToCache(cacheKey, request, response) {
  if (response.ok) {
    const copy = response.clone();
    caches.open(cacheKey).then((cache) => {
      cache.put(request, copy);
    });
  }
  return response;
}

function fetchFromCache(event) {
  return caches.match(event.request).then((response) => {
    if (!response) {
      throw Error(`${event.request.url} not found in cache`);
    }
    return response;
  });
}

function shouldHandleFetch(event, opts) {
  const request = event.request;
  const url = new URL(request.url);
  const criteria = {
    matchesPathPattern: opts.cachePathPattern.test(url.pathname),
    isGETRequest: request.method === 'GET',
    isFromMyOrigin: url.origin === self.location.origin
  };
  const failingCriteria = Object.keys(criteria).filter(criteriaKey => !criteria[criteriaKey]);
  return !failingCriteria.length;
}

function onFetch(event, opts) {
  const request = event.request;
  const acceptHeader = request.headers.get('Accept');
  let resourceType = 'static';
  let cacheKey = null;

  if (acceptHeader.indexOf('text/html') !== -1) {
    resourceType = 'content';
  } else if (acceptHeader.indexOf('image') !== -1) {
    resourceType = 'image';
  }

  cacheKey = cacheName(resourceType, opts);

  if (resourceType === 'content') {
    event.respondWith(
      fetch(request)
        .then(response => addToCache(cacheKey, request, response))
        .catch(() => fetchFromCache(event))
        // .catch(() => offlineResponse(resourceType, opts))
    );
  } else {
    event.respondWith(
      fetchFromCache(event)
        .catch(() => fetch(request))
        .then(response => addToCache(cacheKey, request, response))
        // .catch(() => offlineResponse(resourceType, opts))
    );
  }
}

function onInstall(event, opts) {
  const cacheKey = cacheName('static', opts);
  return caches.open(cacheKey).then((cache) => cache.addAll(opts.staticCacheItems));
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    onInstall(event, config).then(() => self.skipWaiting())
  );
});

self.addEventListener('fetch', event => {
  if (shouldHandleFetch(event, config)) {
    onFetch(event, config);
  }
});

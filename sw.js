let staticCacheName = 'restaurant-cache';
let cacheUrls = [
    './',
    './index.html',
    './restaurant.html',
    './css/styles.css',
    './js/main.js',
    './js/restaurant_info.js',
    './js/dbhelper.js',
    './js/sw_register.js',
    './data/restaurants.json',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg',
];

// Installing service worker
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(staticCacheName).then(function(cache) {
			return cache.addAll(cacheUrls);
		})
	);
});

// Fetching contents in case tne network is offline
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

// Activating service worker
self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys()
		.then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function(cacheName) {
					return cacheName.startsWith('restaurant-') &&
						   cacheName != staticCacheName;
				}).map(function(cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
})

// self.addEventListener('fetch', function(event) {
// 	event.respondWith(
// 		caches.match(event.request)
// 		.then(function(response) {
//             //return response || fetch(event.request);
//             if (response) {
//                 console.log('Found ', + event.request + ' in cache');
//                 return response;
//             } else {
//                 console.log('Could not find' + event.request + ' in cache, fetching!');
//                 return fetch(event.request).then(function(res) {
//                     caches.open(staticCacheName).then(function(cache) {
//                         cache.put(event.request, res);
//                     })
//                     return res;
//                 })
//                 .catch (function(err) {
//                     console.error(err);
//                 })
//             }
// 		})
// 	);
// });
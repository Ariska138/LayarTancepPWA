'use strict';

const cacheVersion = 'pwa-dasar-v1';

const filesToCache = [
    'index.html',
    'pages/settings.html',
    'libs/css/materialize.min.css',
    'css/style.css',
    'libs/js/materialize.min.js',
    'libs/js/jquery-3.4.1.min.js',
    'js/script.js',
    'assets/img/film.png',
    'assets/img/badge.png'
];

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(cacheVersion)
        .then(function(cache){
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request)
        .then(function(res){
            console.log(res);
            if(res)return res;
            
            return fetch(event.request);
        })
    )
});

self.addEventListener('push', function(event){

console.log(`info push "${event.data.text()}"`);

let title = 'Info Layar Tancep';
let option = {
    'body'  : event.data.text(),
    'badge' : 'assets/img/badge.png',
    'icon'  : 'assets/img/logo.jpg',
    actions: [
        {action: 'oke', title: 'Oke'},
        {action: 'google', title: 'Google'}]
};



event.waitUntil(self.registration.showNotification(title, option));
});


self.addEventListener('notificationclick', function(event) {
    if(!event.action){
        // click diluar action
        console.log('klik diluar area');
    }
    
    switch(event.action){
        case 'oke':
            console.log('klick OKE');
            break;
        case 'google':
                event.notification.close();
                event.waitUntil(clients.openWindow('https://google.com'));
            break;
        default:
            console.log(`action yg dipilih tidak dikenali'${event.action}'`);
            break;
    }
})
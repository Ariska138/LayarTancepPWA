'use strict';

const setupServiceWorker = () => {
    if (!navigator.serviceWorker) {
      console.log('service worker not support');
      return;
    }

  navigator.serviceWorker.register('/sw.js')
    .then(function(reg) {
      console.info('SW is registered.', reg);
    })
    .catch(function() {
      console.error('Failed to register SW.');
    });
};


setupServiceWorker();
'use strict';

const setupServiceWorker = () => {
    if (!navigator.serviceWorker) {
      console.log('service worker not support');
      return;
    }

    navigator.serviceWorker.register('sw.js')
    .then(function(reg) {
      console.info('SW is registered.', reg);
      swReg = reg;
      checkStatusSubscription();
    })
    .catch(function() {
      console.info('Failed to register SW.');
    });
};


setupServiceWorker();
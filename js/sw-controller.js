'use strict';

const APIPublicKey = '';
let swReg = null;
let isSubscribed = false;

const urlB64touint8array = (base64string) => {
  const padding = '='.repeat((4-base64string.length % 4) % 4);
  const base64 = (base64string + padding)
  .replace(/\-/g, '+')
  .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i=0; i<rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

const setupNotification = () => {
  if(!window.PushManager) {
    console.log('notification is not support');
    return;
  }

  console.log('notification is support');
  swReg.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = (subscription !== null);

    if(isSubscribed) {
      console.log('user is subcribed');
    }else{
      console.log('user is not subscribed');
    }
  });

};

const setupServiceWorker = () => {
    if (!navigator.serviceWorker) {
      console.log('service worker not support');
      return;
    }

  navigator.serviceWorker.register('/sw.js')
    .then(function(reg) {
      console.info('SW is registered.', reg);
      swReg = reg;
      setupNotification();
    })
    .catch(function() {
      console.error('Failed to register SW.');
    });
};


setupServiceWorker();
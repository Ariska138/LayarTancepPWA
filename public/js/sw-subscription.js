'use strict';

const btnNotification = document.querySelector('.js-btn-notification');
btnNotification.disabled = true;

const infoNotification = document.querySelector('.js-notification-info');

const publicKey = 'BGyeou9eViNyGJJodeu3jB9LvpNQVs1nS6rSGwXx3XlOn4uTOUDBdMeiFX-2JdDyX0r3m3o-EBFYxLpT3Gxmp5I';
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
};

const subscriptionUser = () => {
    console.log('dari public key');
    console.log(publicKey);
    const serverKey = urlB64touint8array(publicKey)
    console.log(serverKey);
    swReg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: serverKey  
    })
    .then(function(subscription){
        checkStatusSubscription();
    })
    .catch(function(err) {
        infoNotification.textContent = 'user is fail to subscribed';
        console.log('user is fail to subscribed with error:'+err);
    });
};

const unsubscriptionUser = () => {
    swReg.pushManager.getSubscription()
    .then(function(subscription) {
        if(subscription) {
            return subscription.unsubscribe();
        }
    })
    .catch(function(error){
        console.log('error unsubscribing', error);
    })
    .then(function(){
        checkStatusSubscription();
    });
};

const checkStatusSubscription = () => {
    if(!window.PushManager) {
        infoNotification.textContent = 'notification is not support on your browser';
        btnNotification.textContent = 'Notification Not Support';
        console.log('notification is not support');
        return;
      }

      if(Notification.permission === 'denied') {
          infoNotification.textContent = 'notification telah anda blokir';
          btnNotification.textContent = 'Notification Blocked';
          return;
      }

  console.log('notification is support');
  swReg.pushManager.getSubscription()
  .then(function(subscription) {
      isSubscribed = (subscription !== null);

    if(isSubscribed) {
        // munculkan code untuk push notification dan tampilan button disable
        infoNotification.textContent = 'user is subcribed';
        btnNotification.textContent = 'Disable Notificaation';
        console.log('user is subcribed');
        console.log('public key');
        console.log(publicKey);
        console.log('code push on server');
        console.log(JSON.stringify(subscription));
        console.log('check to https://web-push-codelab.glitch.me/');
    }else{
        infoNotification.textContent = 'user is not subscribed';
        btnNotification.textContent = 'Enable Notification';
        console.log('user is not subscribed');
    }
  });

  btnNotification.disabled = false;
};

const setupServiceWorker = () => {
    if (!navigator.serviceWorker) {
        btnNotification.disabled = true;
        infoNotification.textContent = 'service worker is not support on your browser';
        btnNotification.textContent = 'Notification Not Support';
      console.log('service worker not support');
      return;
    }

  navigator.serviceWorker.register('../sw.js')
    .then(function(reg) {
      console.info('SW is registered.', reg);
      swReg = reg;
      checkStatusSubscription();
    })
    .catch(function() {
      console.error('Failed to register SW.');
    });
};

setupServiceWorker();

btnNotification.addEventListener('click', function() {
    btnNotification.disabled = true;
    infoNotification.textContent = '';
    if(isSubscribed){
        unsubscriptionUser();
    }else{
        subscriptionUser();
    }
});
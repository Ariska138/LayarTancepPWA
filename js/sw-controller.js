const setupSW = () => {
    if (!navigator.serviceWorker) return;

  navigator.serviceWorker.register('/sw.js')
    .then(function(reg) {
      console.info('SW is registered.', reg);
    })
    .catch(function() {
      console.error('Failed to register SW.');
    });
};

setupSW();
self.addEventListener('push', function(event){

console.log(`info push "${event.data.text()}"`);

$title = 'Info Layar Tancep';
$option = {
    'body'  : event.data.text(),
    'badge' : '../assets/img/badge.png',
    'icon'  : '../assets/img/logo.jpg',
    actions: [
        {action: 'oke', title: 'Oke'},
        {action: 'google', title: 'Google'}]
};



event.waitUntil(self.registration.showNotification($title, $option));
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
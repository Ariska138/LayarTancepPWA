self.addEventListener('push', function(event){

console.log(`info push "${event.data.text()}"`);

$title = 'Info Layar Tancep';
$option = {
    'body'  : event.data.text(),
    'badge' : '../assets/img/badge.png',
    'icon'  : '../assets/img/logo.jpg'
};

event.waitUntil(self.registration.showNotification($title, $option));
});
console.log('Service worker loaded!');

self.addEventListener('push', e => {
    const data = e.data.json();
    console.log('Push recieved!');
    self.registration.showNotification(data.title, {
        body: 'Notified by Jurian',
        icon: 'https://i.pinimg.com/originals/cf/e3/05/cfe3053cb050c80183fd812322dd4ae3.jpg'
    });
});
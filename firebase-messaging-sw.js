importScripts("https://www.gstatic.com/firebasejs/7.20.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.20.0/firebase-messaging.js");

//Using singleton breaks instantiating messaging()
// App firebase = FirebaseWeb.instance.app;


firebase.initializeApp({
  apiKey: 'AIzaSyCHK7HwSX-u0NutZozdehhoDHsG3LOHP0I',
  authDomain: 'auth-2fa-demo.firebaseapp.com',
  databaseURL: 'https://auth-2fa-demo.firebaseio.com',
  projectId: 'auth-2fa-demo',
  storageBucket: 'auth-2fa-demo.appspot.com',
  messagingSenderId: '1065407780171',
  appId: '1:1065407780171:web:df97ebaf1136914ccb04ce',
  measurementId: 'G-2R0V6ZLHXT',
});

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            return registration.showNotification("New Message");
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});
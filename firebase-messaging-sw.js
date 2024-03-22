importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyBNuPX74xnSJWb6788zA66I25ssqpbgc6Q",
    authDomain: "attendance-system-parents.firebaseapp.com",
    projectId: "attendance-system-parents",
    storageBucket: "attendance-system-parents.appspot.com",
    messagingSenderId: "154472242217",
    appId: "1:154472242217:web:d97254d119622d1e98d038"
  };
  

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

const firebase = require('firebase');

const configFirebase = {
  apiKey: "AIzaSyAyFVQmjDbrkFFYYWgcm9XttUA3dLZKmM8",
  authDomain: "desarrolloweb-40fd8.firebaseapp.com",
  databaseURL: "https://desarrolloweb-40fd8.firebaseio.com",
  projectId: "desarrolloweb-40fd8",
  storageBucket: "desarrolloweb-40fd8.appspot.com",
  messagingSenderId: "407977792929"
};

const appFirebase = firebase.initializeApp(configFirebase);

module.exports = appFirebase.database();

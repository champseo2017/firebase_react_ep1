import firebase from 'firebase/app'
import "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyC0mJhdWJO81AZCX1yAV3TPHgUXC8AWv68",
    authDomain: "siam-remote-iot-44279.firebaseapp.com",
    databaseURL: "https://siam-remote-iot-44279.firebaseio.com",
    projectId: "siam-remote-iot-44279",
    storageBucket: "siam-remote-iot-44279.appspot.com",
    messagingSenderId: "973555100317",
    appId: "1:973555100317:web:6542e1240033cc42118274"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();
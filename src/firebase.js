import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAwX06Kias590q7OoL6kHFAS7utut8sWDw",
    authDomain: "crudfotografos.firebaseapp.com",
    projectId: "crudfotografos",
    storageBucket: "crudfotografos.appspot.com",
    messagingSenderId: "663767717671",
    appId: "1:663767717671:web:c0e833bc4863f86102bb02"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export {firebase}
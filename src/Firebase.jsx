import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCLflvnYPxEKAceI_mDDqhVYyBgPNt_EIA",
    authDomain: "discord-clone-b06d5.firebaseapp.com",
    projectId: "discord-clone-b06d5",
    storageBucket: "discord-clone-b06d5.appspot.com",
    messagingSenderId: "293654406697",
    appId: "1:293654406697:web:8e36eac6d3ce6258439e38",
    measurementId: "G-QDJ2C4P8Z9"
  };
const firebaseApp=firebase.initializeApp(firebaseConfig);
const db =firebaseApp.firestore();

const auth=firebase.auth();
const provider=new firebase.auth.GoogleAuthProvider();

export {auth , provider};
export default db;
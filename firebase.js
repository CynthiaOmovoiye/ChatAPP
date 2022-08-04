import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDmWJNb9buYt7mYS2BxjNOITwZlIXaBpc0',
  authDomain: 'vigilanceapp-bcd12.firebaseapp.com',
  projectId: 'vigilanceapp-bcd12',
  storageBucket: 'vigilanceapp-bcd12.appspot.com',
  messagingSenderId: '60899023961',
  appId: '1:60899023961:web:884167b1a87899beb62548',
};
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const db = app.firestore();
const auth = firebase.auth();

export {db, auth};

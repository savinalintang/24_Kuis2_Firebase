import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyBpnp_JMIvhtbwE994zvMszQwsJFbwT0Kg",
  authDomain: "kuis-2-1031f.firebaseapp.com",
  projectId: "kuis-2-1031f",
  storageBucket: "kuis-2-1031f.appspot.com",
  messagingSenderId: "632674675241",
  appId: "1:632674675241:web:25594f16443dbdf70e4a38",
  measurementId: "G-XL5W0VRSGJ",
  databaseURL: "https://kuis-2-1031f-default-rtdb.firebaseio.com/"
};

firebase.initializeApp(config);
firebase.firestore().settings(settings);

export default firebase;

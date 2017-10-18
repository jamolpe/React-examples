import * as firebase from 'firebase';

var config = {
  apiKey: "",
  authDomain: "goalcoach-abccc.firebaseapp.com",
  databaseURL: "https://goalcoach-abccc.firebaseio.com",
  projectId: "goalcoach-abccc",
  storageBucket: "goalcoach-abccc.appspot.com",
  messagingSenderId: "409252231646"
};

  export const firebaseApp = firebase.initializeApp(config);
  export const goalRef = firebase.database().ref('goals');

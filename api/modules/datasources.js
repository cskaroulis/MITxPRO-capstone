// FIREBASE
const firebase = require("firebase");

firebase.initializeApp({
  appId: process.env.FIREBASE_APIID,
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
});

const db = firebase.firestore();

const isAuthenticated = () => {
  const user = firebase.auth().currentUser;
  const result = { isAuthenticated: !!user, user };
  console.log("auth check:", !!user);
  return result;
};

module.exports = { firebase, db, isAuthenticated };

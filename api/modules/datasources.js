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

const collectionNames = {
  userAccounts: "UserAccounts",
  bankingAccounts: "BankingAccounts",
  bankingTransactions: "BankingTransactions",
};

module.exports = {
  firebase,
  db,
  collectionNames,
};

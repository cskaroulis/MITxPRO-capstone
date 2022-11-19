// User Sessions Data Access Layer

const { firebase, db, collectionNames } = require("../datasources");

const create = (data) => {
  const { email, password } = data;
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        const { uid } = result.user;
        return db
          .collection(collectionNames.userAccounts)
          .where("userCredentialsId", "==", uid)
          .get();
      })
      .then((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ userAccountId: doc.id, ...doc.data(), email });
        });
        resolve({
          userAccounts: docs,
        });
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

const discard = () => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = { create, discard };

// User Accounts Data Access Layer

const { firebase, db } = require("../datasources");
const { snapshotToArray, getDocRef } = require("../helpers");

// constants

const collectionName = "UserAccounts";

// methods

const create = (data) => {
  const { email, password, firstName, lastName, phoneNumber } = data;
  const result = {};
  return new Promise((resolve, reject) => {
    // create credentials
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const userCredentialsId = userCredential?.user?.uid;
        result.userCredentialsId = userCredentialsId;
        result.isAuthenticated = true;
        // create user account
        return db
          .collection(collectionName)
          .add({ userCredentialsId, firstName, lastName, phoneNumber });
      })
      .then((docRef) => {
        result.userAccountId = docRef.id;
        return resolve(result);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

const getOne = (data) => {
  const { userAccountId } = data;
  return new Promise((resolve, reject) => {
    db.collection(collectionName)
      .doc(userAccountId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return resolve([{ ...doc.data() }]);
        } else {
          return reject({
            errorCode: "not found",
            errorMessage: "user account not found",
          });
        }
      })
      .catch((error) => {
        console.error(error);
        return reject(error);
      });
  });
};

const update = (data) => {
  const { userAccountId, firstName, lastName, phoneNumber } = data;
  return new Promise((resolve, reject) => {
    const docRef = db.collection(collectionName).doc(userAccountId);
    return docRef
      .update({
        firstName,
        lastName,
        phoneNumber,
      })
      .then(() => {
        return resolve("user account updated");
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

const discard = (data) => {
  const { userAccountId } = data;
  return new Promise((resolve, reject) => {
    const docRef = db.collection(collectionName).doc(userAccountId);
    return docRef
      .delete()
      .then(() => {
        return resolve("user account updated");
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

module.exports = { create, getOne, update, discard };

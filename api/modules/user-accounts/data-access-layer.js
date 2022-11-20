// User Accounts
// Data Access Layer
const { firebase, db, collectionNames } = require("../../common/datasources");

// create method

const create = (data) => {
  const { email, password, firstName, lastName, phoneNumber } = data;
  const result = data;
  return new Promise((resolve, reject) => {
    // create credentials first THEN the user account
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const userCredentialsId = userCredential?.user?.uid;
        result.userCredentialsId = userCredentialsId;
        // create user account
        return db
          .collection(collectionNames.userAccounts)
          .add({ userCredentialsId, firstName, lastName, phoneNumber });
      })
      .then((docRef) => {
        result.userAccountId = docRef.id;
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// getOne method

const getOne = (data) => {
  const { userAccountId } = data;
  return new Promise((resolve, reject) => {
    db.collection(collectionNames.userAccounts)
      .doc(userAccountId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          resolve([{ ...doc.data() }]);
        } else {
          reject({
            errorMessage: "user account not found",
          });
        }
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

// update method

const update = (data) => {
  const { userAccountId, firstName, lastName, phoneNumber } = data;
  return new Promise((resolve, reject) => {
    const docRef = db
      .collection(collectionNames.userAccounts)
      .doc(userAccountId);
    return docRef
      .update({
        firstName,
        lastName,
        phoneNumber,
      })
      .then(() => {
        resolve("user account updated");
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const discard = (data) => {
  const { userAccountId } = data;
  return new Promise((resolve, reject) => {
    const docRef = db
      .collection(collectionNames.userAccounts)
      .doc(userAccountId);
    return docRef
      .delete()
      .then(() => {
        resolve("user account updated");
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = {
  create,
  getOne,
  update,
  discard,
};

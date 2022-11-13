// Banking Account Data Access Layer
const { db } = require("../datasources");
const { snapshotToArray } = require("../helpers");

// constants

const collectionName = "BankingAccounts";

// methods

const create = (data) => {
  const { userAccountId, balance, type } = data;
  const result = {};
  return new Promise((resolve, reject) => {
    db.collection(collectionName)
      .add({ userAccountId, balance, type })
      .then((docRef) => {
        result.bankingAccountId = docRef.id;
        return resolve(result);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

const getOne = (data) => {
  const { bankingAccountId } = data;
  return new Promise((resolve, reject) => {
    db.collection(collectionName)
      .doc(bankingAccountId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return resolve([{ ...doc.data() }]);
        } else {
          return reject({
            errorCode: "not found",
            errorMessage: "banking account not found",
          });
        }
      })
      .catch((error) => {
        console.error(error);
        return reject(error);
      });
  });
};

const getAll = (data) => {
  const { userAccountId } = data;
  return new Promise((resolve, reject) => {
    db.collection(collectionName)
      .where("userAccountId", "==", userAccountId)
      .get()
      .then((querySnapshot) => {
        return resolve({
          accounts: snapshotToArray(querySnapshot),
        });
      })
      .catch((error) => {
        console.error(error);
        return reject(error);
      });
  });
};

const update = (data) => {
  const { bankingAccountId, balance } = data;
  return new Promise((resolve, reject) => {
    const docRef = db.collection(collectionName).doc(bankingAccountId);
    return docRef
      .update({
        balance,
      })
      .then(() => {
        return resolve("bank account updated");
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

const discard = (data) => {
  const { bankingAccountId } = data;
  return new Promise((resolve, reject) => {
    const docRef = db.collection(collectionName).doc(bankingAccountId);
    return docRef
      .delete()
      .then(() => {
        return resolve("bank account updated");
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

module.exports = { create, getOne, getAll, update, discard };

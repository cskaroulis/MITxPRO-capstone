// Banking Transactions Data Access Layer

const { db, collectionNames } = require("../datasources");

// methods

const create = (data) => {
  const { userAccountId, bankingAccountId, type, amount } = data;
  const result = { userAccountId, bankingAccountId, type, amount };
  return new Promise((resolve, reject) => {
    // create credentials
    db.collection(collectionNames.bankingTransactions)
      .add({ userAccountId, bankingAccountId, type, amount })
      .then((docRef) => {
        result.transactionId = docRef.id;
        return resolve(result);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

const getOne = (data) => {
  const { transactionId } = data;
  return new Promise((resolve, reject) => {
    db.collection(collectionNames.bankingTransactions)
      .doc(transactionId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return resolve([{ ...doc.data() }]);
        } else {
          return reject({
            errorCode: "not found",
            errorMessage: "banking transaction not found",
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
  const { bankingAccountId } = data;
  return new Promise((resolve, reject) => {
    db.collection(collectionNames.bankingTransactions)
      .where("bankingAccountId", "==", bankingAccountId)
      .get()
      .then((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ bankingTransactionId: doc.id, ...doc.data() });
        });
        return resolve({
          bankingTransactions: docs,
        });
      })
      .catch((error) => {
        console.error(error);
        return reject(error);
      });
  });
};

module.exports = { create, getOne, getAll };

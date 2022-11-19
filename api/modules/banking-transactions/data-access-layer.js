// Banking Transactions Data Access Layer

const { db, collectionNames } = require("../datasources");

// methods

const create = (data) => {
  const { userAccountId, bankingAccountId, type, amount } = data;
  const result = data;

  return new Promise(function (resolve, reject) {
    // ensure we have sufficient funds for withdrawals
    if (type === "withdrawal") {
      calculateBankingAccountBalance(bankingAccountId).then(({ balance }) => {
        if (balance < amount) {
          reject({
            errorMessage: "Insufficient funds. Please deposit more money.",
          });
        }
      });
    }

    db.collection(collectionNames.bankingTransactions)
      .add({ userAccountId, bankingAccountId, type, amount })
      .then((docRef) => {
        result.transactionId = docRef.id;
        resolve(result);
      })
      .catch((error) => {
        reject(error);
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
          resolve([{ ...doc.data() }]);
        } else {
          reject({
            errorCode: "not found",
            errorMessage: "banking transaction not found",
          });
        }
      })
      .catch((error) => {
        console.error(error);
        reject(error);
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
        return docs;
      })
      .then(async (docs) => {
        try {
          const { balance } = await calculateBankingAccountBalance(
            bankingAccountId
          );
          resolve({
            balance,
            bankingTransactions: docs,
          });
        } catch (error) {
          reject(error);
        }
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

const calculateBankingAccountBalance = (bankingAccountId) => {
  return new Promise((resolve, reject) => {
    db.collection(collectionNames.bankingTransactions)
      .where("bankingAccountId", "==", bankingAccountId)
      .get()
      .then((querySnapshot) => {
        let balance = 0;
        querySnapshot.forEach((doc) => {
          const { type, amount } = doc.data();
          balance = type === "deposit" ? balance + amount : balance - amount;
        });
        resolve({ balance });
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

module.exports = { create, getOne, getAll, calculateBankingAccountBalance };
